import type { CaseResult, RunStatus } from '~/types/runner';

export function deriveVerdict(cases: Array<CaseResult>): RunStatus {
  if (cases.length === 0) {
    return 'internal-error';
  }

  if (cases.some((item) => item.status === 'timeout')) {
    return 'time-limit-exceeded';
  }

  if (cases.some((item) => item.status === 'error')) {
    return 'runtime-error';
  }

  if (cases.some((item) => item.status === 'failed')) {
    return 'wrong-answer';
  }

  return 'accepted';
}
