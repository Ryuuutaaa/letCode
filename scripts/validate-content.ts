import type { Problem, Track } from '../app/types/content.ts';
import { readdir } from 'node:fs/promises';
import process from 'node:process';
import { loadPyodide } from 'pyodide';
import { compare } from '../app/lib/runner/compare.ts';
import { buildJavaScriptHarness } from '../app/lib/runner/harness.ts';
import { executePythonCases } from '../app/lib/runner/python-execute.ts';

interface ValidationIssue {
  problem: string;
  message: string;
}

function isProblem(value: unknown): value is Problem {
  return (
    typeof value === 'object'
    && value !== null
    && 'slug' in value
    && 'functionName' in value
    && 'templates' in value
    && 'testCases' in value
  );
}

function isTrack(value: unknown): value is Track {
  return (
    typeof value === 'object'
    && value !== null
    && 'id' in value
    && 'problemSlugs' in value
  );
}

async function loadFrom<T>(dir: URL, guard: (value: unknown) => value is T): Promise<Array<T>> {
  const names = (await readdir(dir)).filter(
    (name) => name.endsWith('.ts') && name !== 'index.ts',
  );

  const modules = await Promise.all(
    names.map((name) => import(new URL(name, dir).href)),
  );

  return modules.flatMap((mod) => Object.values(mod)).filter(guard);
}

const problems = await loadFrom(new URL('../app/data/problems/', import.meta.url), isProblem);
const tracks = await loadFrom(new URL('../app/data/tracks/', import.meta.url), isTrack);

function assertWellFormed(problem: Problem): Array<ValidationIssue> {
  const issues: Array<ValidationIssue> = [];
  const add = (message: string) => issues.push({ problem: problem.slug, message });

  if (!problem.slug) {
    add('slug kosong');
  }
  if (!problem.functionName) {
    add('functionName kosong');
  }
  if (problem.testCases.length === 0) {
    add('tidak punya test case');
  }
  if (problem.templates.length === 0) {
    add('tidak punya template');
  }

  const ids = new Set<string>();
  for (const testCase of problem.testCases) {
    if (ids.has(testCase.id)) {
      add(`id test case duplikat: ${testCase.id}`);
    }
    ids.add(testCase.id);

    if (!Array.isArray(testCase.input)) {
      add(`test case ${testCase.id}: input harus berupa array argumen`);
    }
  }

  const languages = new Set<string>();
  for (const template of problem.templates) {
    if (languages.has(template.language)) {
      add(`template duplikat untuk bahasa ${template.language}`);
    }
    languages.add(template.language);

    if (!template.template.includes(problem.functionName)) {
      add(`template ${template.language} tidak memuat nama fungsi ${problem.functionName}`);
    }
    if (!template.solution.includes(problem.functionName)) {
      add(`reference solution ${template.language} tidak memuat nama fungsi ${problem.functionName}`);
    }
  }

  return issues;
}

function validateJavaScript(problem: Problem): Array<ValidationIssue> {
  const issues: Array<ValidationIssue> = [];
  const template = problem.templates.find((item) => item.language === 'javascript');

  if (!template) {
    return issues;
  }

  let fn: unknown;

  try {
    // Harness wajib menyusun ulang kode peserta, jadi Function constructor memang dipakai.
    // eslint-disable-next-line no-new-func
    fn = new Function(buildJavaScriptHarness(template.solution, problem.functionName))();
  } catch (error) {
    return [{ problem: problem.slug, message: `reference solution gagal dikompilasi: ${String(error)}` }];
  }

  if (typeof fn !== 'function') {
    return [{ problem: problem.slug, message: `reference solution tidak menghasilkan fungsi ${problem.functionName}` }];
  }

  const callable = fn as (...args: Array<unknown>) => unknown;

  for (const testCase of problem.testCases) {
    try {
      const actual = callable(...testCase.input);
      const passed = compare(actual, testCase.expected, testCase.comparator, testCase.tolerance);

      if (!passed) {
        issues.push({
          problem: problem.slug,
          message: `test case ${testCase.id} gagal — diharapkan ${JSON.stringify(testCase.expected)}, didapat ${JSON.stringify(actual)}`,
        });
      }
    } catch (error) {
      issues.push({
        problem: problem.slug,
        message: `test case ${testCase.id} melempar error: ${String(error)}`,
      });
    }
  }

  return issues;
}

async function validatePython(pyodide: Awaited<ReturnType<typeof loadPyodide>>, problem: Problem): Promise<Array<ValidationIssue>> {
  const issues: Array<ValidationIssue> = [];
  const template = problem.templates.find((item) => item.language === 'python');

  if (!template) {
    return issues;
  }

  const outcome = executePythonCases(
    pyodide,
    template.solution,
    problem.functionName,
    problem.testCases.map((testCase) => ({ id: testCase.id, input: testCase.input })),
  );

  if (!outcome.ok) {
    return [{ problem: problem.slug, message: `reference solution Python gagal: ${outcome.message}` }];
  }

  for (const testCase of problem.testCases) {
    const raw = outcome.cases.find((item) => item.testCaseId === testCase.id);

    if (!raw || raw.error !== undefined) {
      issues.push({
        problem: problem.slug,
        message: `test case ${testCase.id} Python melempar error: ${raw?.error ?? 'tidak dijalankan'}`,
      });
      continue;
    }

    const passed = compare(raw.actual, testCase.expected, testCase.comparator, testCase.tolerance);

    if (!passed) {
      issues.push({
        problem: problem.slug,
        message: `test case ${testCase.id} Python gagal — diharapkan ${JSON.stringify(testCase.expected)}, didapat ${JSON.stringify(raw.actual)}`,
      });
    }
  }

  return issues;
}

function validateStructure(): Array<ValidationIssue> {
  const issues: Array<ValidationIssue> = [];
  const slugs = new Set(problems.map((problem) => problem.slug));
  const trackIds = new Set(tracks.map((track) => track.id));

  for (const problem of problems) {
    if (!trackIds.has(problem.trackId)) {
      issues.push({ problem: problem.slug, message: `trackId ${problem.trackId} tidak ditemukan` });
    }
  }

  for (const track of tracks) {
    for (const slug of track.problemSlugs) {
      if (!slugs.has(slug)) {
        issues.push({ problem: track.id, message: `problemSlugs memuat slug yang tidak ada: ${slug}` });
      }
    }
  }

  return issues;
}

const pyodide = await loadPyodide();

const allIssues: Array<ValidationIssue> = [
  ...validateStructure(),
  ...(
    await Promise.all(
      problems.map(async (problem) => [
        ...assertWellFormed(problem),
        ...validateJavaScript(problem),
        ...(await validatePython(pyodide, problem)),
      ]),
    )
  ).flat(),
];

if (allIssues.length > 0) {
  console.error(`Validasi konten gagal: ${allIssues.length} masalah\n`);
  for (const issue of allIssues) {
    console.error(`  [${issue.problem}] ${issue.message}`);
  }
  process.exit(1);
}

console.log(
  `Validasi konten lolos: ${problems.length} soal di ${tracks.length} track, seluruh reference solution sesuai test case.`,
);
