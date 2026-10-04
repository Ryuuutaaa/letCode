import type { WorkerCaseOutcome, WorkerTestCaseInput } from './protocol';
import { normalizeError } from './errors.ts';

const MAX_LOG_LINES = 200;

export type ExecuteOutcome
  = | { ok: true; cases: Array<WorkerCaseOutcome>; logs: Array<string> }
    | { ok: false; message: string };

function stringifyLog(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/**
 * Menjalankan kode peserta terhadap daftar test case.
 * Murni fungsi: tidak menyentuh Worker maupun DOM, sehingga bisa diuji langsung.
 */
export function executeCases(
  code: string,
  functionName: string,
  testCases: Array<WorkerTestCaseInput>,
): ExecuteOutcome {
  const logs: Array<string> = [];

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  const capture = (...args: Array<unknown>): void => {
    if (logs.length < MAX_LOG_LINES) {
      logs.push(args.map((item) => stringifyLog(item)).join(' '));
    }
  };

  console.log = capture;
  console.warn = capture;
  console.error = capture;

  try {
    let fn: unknown;

    try {
      // Harness wajib menyusun ulang kode peserta, jadi Function constructor memang dipakai.
      // eslint-disable-next-line no-new-func
      fn = new Function(code)();
    } catch (error) {
      return { ok: false, message: normalizeError(error).message };
    }

    if (typeof fn !== 'function') {
      return {
        ok: false,
        message: `Fungsi ${functionName} tidak ditemukan di dalam kode.`,
      };
    }

    const callable = fn as (...args: Array<unknown>) => unknown;

    const cases = testCases.map((testCase): WorkerCaseOutcome => {
      const startedAt = performance.now();
      let actual: unknown;
      let errorMessage: string | undefined;

      try {
        actual = callable(...testCase.input);
      } catch (error) {
        errorMessage = normalizeError(error).message;
      }

      return {
        testCaseId: testCase.id,
        actual,
        error: errorMessage,
        durationMs: Math.round(performance.now() - startedAt),
      };
    });

    return { ok: true, cases, logs };
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  }
}
