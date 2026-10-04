import type { LanguageId, TestCase } from './content';

export interface RunRequest {
  language: LanguageId;
  code: string;
  functionName: string;
  testCases: Array<TestCase>;
  timeLimitMs: number;
}

export type CaseStatus = 'passed' | 'failed' | 'error' | 'timeout';

export interface CaseResult {
  testCaseId: string;
  hidden: boolean;
  status: CaseStatus;
  input?: Array<unknown>;
  expected?: unknown;
  actual?: unknown;
  error?: string;
  durationMs: number;
}

export type RunStatus
  = | 'accepted'
    | 'wrong-answer'
    | 'runtime-error'
    | 'time-limit-exceeded'
    | 'compile-error'
    | 'internal-error';

export interface RunResult {
  status: RunStatus;
  cases: Array<CaseResult>;
  logs: Array<string>;
  durationMs: number;
}

export interface JudgeDriver {
  id: string;
  supports: (language: LanguageId) => boolean;
  run: (request: RunRequest) => Promise<RunResult>;
  warmup?: () => Promise<void>;
}
