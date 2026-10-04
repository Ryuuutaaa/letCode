import type { WorkerCaseOutcome } from './protocol';
import type { CaseResult, RunRequest, RunResult, RunStatus } from '~/types/runner';
import { compare } from './compare';
import { deriveVerdict } from './verdict';

export function buildCaseResults(
  request: RunRequest,
  outcomes: Array<WorkerCaseOutcome>,
): Array<CaseResult> {
  const byId = new Map(outcomes.map((item) => [item.testCaseId, item]));

  return request.testCases.map((testCase): CaseResult => {
    const hidden = testCase.hidden === true;
    const raw = byId.get(testCase.id);

    if (!raw || raw.error !== undefined) {
      return {
        testCaseId: testCase.id,
        hidden,
        status: 'error',
        error: raw?.error ?? 'Test case tidak dijalankan.',
        durationMs: raw?.durationMs ?? 0,
      };
    }

    const passed = compare(raw.actual, testCase.expected, testCase.comparator, testCase.tolerance);

    return {
      testCaseId: testCase.id,
      hidden,
      status: passed ? 'passed' : 'failed',
      input: hidden ? undefined : testCase.input,
      expected: hidden ? undefined : testCase.expected,
      actual: hidden ? undefined : raw.actual,
      durationMs: raw.durationMs,
    };
  });
}

export function buildRunResult(
  cases: Array<CaseResult>,
  logs: Array<string>,
  startedAt: number,
): RunResult {
  return {
    status: deriveVerdict(cases),
    cases,
    logs,
    durationMs: Date.now() - startedAt,
  };
}

export function buildFailureResult(
  request: RunRequest,
  status: RunStatus,
  message: string,
  startedAt: number,
): RunResult {
  const isTimeout = status === 'time-limit-exceeded';

  return {
    status,
    cases: request.testCases.map((testCase): CaseResult => ({
      testCaseId: testCase.id,
      hidden: testCase.hidden === true,
      status: isTimeout ? 'timeout' : 'error',
      error: message,
      durationMs: 0,
    })),
    logs: [],
    durationMs: Date.now() - startedAt,
  };
}
