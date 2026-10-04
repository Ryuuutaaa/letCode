export interface WorkerTestCaseInput {
  id: string;
  input: Array<unknown>;
}

export interface WorkerRunRequest {
  type: 'run';
  code: string;
  functionName: string;
  testCases: Array<WorkerTestCaseInput>;
}

export interface WorkerLoadRequest {
  type: 'load';
}

export type WorkerInboundMessage = WorkerRunRequest | WorkerLoadRequest;

export interface WorkerCaseOutcome {
  testCaseId: string;
  actual?: unknown;
  error?: string;
  durationMs: number;
}

export interface WorkerResultMessage {
  type: 'result';
  cases: Array<WorkerCaseOutcome>;
  logs: Array<string>;
}

export interface WorkerReadyMessage {
  type: 'ready';
}

export interface WorkerErrorMessage {
  type: 'error';
  kind: 'compile';
  message: string;
}

export type WorkerOutboundMessage
  = | WorkerResultMessage
    | WorkerReadyMessage
    | WorkerErrorMessage;
