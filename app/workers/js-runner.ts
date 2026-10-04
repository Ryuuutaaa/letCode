import type { WorkerInboundMessage, WorkerOutboundMessage } from '../lib/runner/protocol';
import { executeCases } from '../lib/runner/execute-cases';

interface WorkerScope {
  addEventListener: (
    type: 'message',
    listener: (event: MessageEvent<WorkerInboundMessage>) => void,
  ) => void;
  postMessage: (message: WorkerOutboundMessage) => void;
}

const scope = globalThis as unknown as WorkerScope;

scope.addEventListener('message', (event) => {
  const request = event.data;

  if (request.type !== 'run') {
    return;
  }

  const outcome = executeCases(request.code, request.functionName, request.testCases);

  if (!outcome.ok) {
    scope.postMessage({ type: 'error', kind: 'compile', message: outcome.message });
    return;
  }

  scope.postMessage({ type: 'result', cases: outcome.cases, logs: outcome.logs });
});
