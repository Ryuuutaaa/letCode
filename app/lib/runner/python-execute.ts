import type { PyodideInterface } from 'pyodide';
import type { WorkerCaseOutcome, WorkerTestCaseInput } from './protocol';
import { normalizeError } from './errors.ts';

const MAX_LOG_LINES = 200;

export type PythonExecuteOutcome
  = | { ok: true; cases: Array<WorkerCaseOutcome>; logs: Array<string> }
    | { ok: false; message: string };

/**
 * Menjalankan kode Python terhadap daftar test case di atas instance Pyodide.
 * Kode dijalankan di namespace baru supaya definisi antar eksekusi tidak bocor.
 */
export function executePythonCases(
  pyodide: PyodideInterface,
  code: string,
  functionName: string,
  testCases: Array<WorkerTestCaseInput>,
): PythonExecuteOutcome {
  const logs: Array<string> = [];

  const originalStdout = pyodide.setStdout({
    batched: (text) => {
      if (logs.length < MAX_LOG_LINES) {
        logs.push(text);
      }
    },
  });
  const originalStderr = pyodide.setStderr({
    batched: (text) => {
      if (logs.length < MAX_LOG_LINES) {
        logs.push(text);
      }
    },
  });

  let namespace: ReturnType<PyodideInterface['globals']['get']> | undefined;

  try {
    namespace = pyodide.globals.get('dict')();
    pyodide.runPython(code, { globals: namespace });
  } catch (error) {
    restoreStreams();
    return { ok: false, message: normalizeError(error).message };
  }

  const fn = namespace.get(functionName);

  if (typeof fn !== 'function') {
    destroySafe(namespace);
    restoreStreams();

    return {
      ok: false,
      message: `Fungsi ${functionName} tidak ditemukan di dalam kode.`,
    };
  }

  const callable = fn as (...args: Array<unknown>) => unknown;

  const cases = testCases.map((testCase): WorkerCaseOutcome => {
    const startedAt = performance.now();
    const args = testCase.input.map((value) => pyodide.toPy(value));
    let actual: unknown;
    let errorMessage: string | undefined;

    try {
      const result = callable(...args);
      actual = isPyProxy(result) ? result.toJs() : result;
      destroySafe(result);
    } catch (error) {
      errorMessage = normalizeError(error).message;
    } finally {
      destroyAll(args);
    }

    return {
      testCaseId: testCase.id,
      actual,
      error: errorMessage,
      durationMs: Math.round(performance.now() - startedAt),
    };
  });

  destroySafe(namespace);
  restoreStreams();

  return { ok: true, cases, logs };

  function restoreStreams(): void {
    pyodide.setStdout(originalStdout);
    pyodide.setStderr(originalStderr);
  }
}

function isPyProxy(value: unknown): value is { toJs: () => unknown } {
  return typeof value === 'object' && value !== null && 'toJs' in value;
}

function destroyAll(values: Array<unknown>): void {
  for (const value of values) {
    if (isPyProxy(value) && 'destroy' in value && typeof value.destroy === 'function') {
      value.destroy();
    }
  }
}

function destroySafe(value: unknown): void {
  if (
    typeof value === 'object'
    && value !== null
    && 'destroy' in value
    && typeof value.destroy === 'function'
  ) {
    value.destroy();
  }
}
