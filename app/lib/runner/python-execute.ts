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
 *
 * Argumen dan nilai kembalian melewati JSON, bukan `toPy`/`toJs`. Alasannya:
 * `toPy` mengubah `null` menjadi sentinel `JsNull` (bukan `None`), dan `toJs`
 * mengubah `None` menjadi `undefined` (bukan `null`). Lewat JSON, `null` dan
 * `None` bolak-balik dengan benar, dan itu penting untuk soal pohon dan linked list.
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

  const callable = namespace.get(functionName);

  if (typeof callable !== 'function') {
    destroySafe(callable);
    destroySafe(namespace);
    restoreStreams();

    return {
      ok: false,
      message: `Fungsi ${functionName} tidak ditemukan di dalam kode.`,
    };
  }

  destroySafe(callable);

  const cases = testCases.map((testCase): WorkerCaseOutcome => {
    const startedAt = performance.now();
    let actual: unknown;
    let errorMessage: string | undefined;

    try {
      const script = [
        'import json as _letcode_json',
        `_letcode_args = _letcode_json.loads(${JSON.stringify(JSON.stringify(testCase.input))})`,
        `_letcode_out = ${functionName}(*_letcode_args)`,
        '_letcode_json.dumps(_letcode_out, default=str)',
      ].join('\n');

      const serialized = pyodide.runPython(script, { globals: namespace });
      actual = JSON.parse(serialized);
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

  destroySafe(namespace);
  restoreStreams();

  return { ok: true, cases, logs };

  function restoreStreams(): void {
    pyodide.setStdout(originalStdout);
    pyodide.setStderr(originalStderr);
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
