import type { PyodideInterface } from 'pyodide';
import type { WorkerInboundMessage, WorkerOutboundMessage } from '../lib/runner/protocol';
import { executePythonCases } from '../lib/runner/python-execute';

const PYODIDE_BASE = '/pyodide/';

interface WorkerScope {
  addEventListener: (
    type: 'message',
    listener: (event: MessageEvent<WorkerInboundMessage>) => void,
  ) => void;
  postMessage: (message: WorkerOutboundMessage) => void;
}

const scope = globalThis as unknown as WorkerScope;

let pyodidePromise: Promise<PyodideInterface> | null = null;

function getPyodide(): Promise<PyodideInterface> {
  pyodidePromise ??= (async () => {
    // Loader dan file runtime disajikan dari /pyodide/ (hasil scripts/sync-pyodide.mjs).
    const loader = await import(/* @vite-ignore */ `${PYODIDE_BASE}pyodide.mjs`);
    return loader.loadPyodide({ indexURL: PYODIDE_BASE });
  })();

  return pyodidePromise;
}

scope.addEventListener('message', async (event) => {
  const request = event.data;

  try {
    if (request.type === 'load') {
      await getPyodide();
      scope.postMessage({ type: 'ready' });
      return;
    }

    if (request.type !== 'run') {
      return;
    }

    const pyodide = await getPyodide();
    const outcome = executePythonCases(
      pyodide,
      request.code,
      request.functionName,
      request.testCases,
    );

    if (!outcome.ok) {
      scope.postMessage({ type: 'error', kind: 'compile', message: outcome.message });
      return;
    }

    scope.postMessage({ type: 'result', cases: outcome.cases, logs: outcome.logs });
  } catch (error) {
    scope.postMessage({
      type: 'error',
      kind: 'compile',
      message: error instanceof Error ? error.message : String(error),
    });
  }
});
