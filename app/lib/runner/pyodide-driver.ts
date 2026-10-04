import type { WorkerOutboundMessage, WorkerRunRequest } from './protocol';
import type { JudgeDriver, RunRequest, RunResult } from '~/types/runner';
import { buildCaseResults, buildFailureResult, buildRunResult } from './build-result';
import { runInWorker } from './run-in-worker';

const LOAD_TIMEOUT_MS = 120_000;

let pythonWorker: Worker | null = null;

function getWorker(): Worker {
  pythonWorker ??= new Worker(
    new URL('../../workers/python-runner.ts', import.meta.url),
    { type: 'module' },
  );

  return pythonWorker;
}

function resetWorker(): void {
  pythonWorker?.terminate();
  pythonWorker = null;
}

export function createPyodideDriver(): JudgeDriver {
  async function warmup(): Promise<void> {
    await runInWorker({
      payload: { type: 'load' },
      terminateOnFinish: false,
      timeoutMs: LOAD_TIMEOUT_MS,
      worker: getWorker(),
    });
  }

  return {
    id: 'browser-pyodide',
    supports: (language) => language === 'python',
    warmup,
    async run(request: RunRequest): Promise<RunResult> {
      const startedAt = Date.now();

      const payload: WorkerRunRequest = {
        type: 'run',
        code: request.code,
        functionName: request.functionName,
        testCases: request.testCases.map((testCase) => ({ id: testCase.id, input: testCase.input })),
      };

      const outcome = await runInWorker<WorkerOutboundMessage>({
        payload,
        // Worker Python dipertahankan karena memuat Pyodide itu mahal.
        terminateOnFinish: false,
        // Ditambah waktu muat pertama kali supaya unduhan Pyodide tidak ikut terhitung.
        timeoutMs: request.timeLimitMs + LOAD_TIMEOUT_MS,
        worker: getWorker(),
      });

      if (!outcome.ok) {
        if (outcome.reason === 'timeout') {
          // Satu-satunya cara menghentikan kode Python yang menggantung adalah
          // mematikan worker-nya, lalu memuat ulang Pyodide pada eksekusi berikutnya.
          resetWorker();

          return buildFailureResult(
            request,
            'time-limit-exceeded',
            'Waktu eksekusi habis. Periksa kemungkinan loop tanpa henti.',
            startedAt,
          );
        }

        resetWorker();

        return buildFailureResult(
          request,
          'runtime-error',
          outcome.message ?? 'Worker Python gagal dijalankan.',
          startedAt,
        );
      }

      const message = outcome.data;

      if (message.type === 'error') {
        return buildFailureResult(request, 'compile-error', message.message, startedAt);
      }

      if (message.type !== 'result') {
        return {
          status: 'internal-error',
          cases: [],
          logs: ['Worker Python mengirim pesan yang tidak dikenali.'],
          durationMs: Date.now() - startedAt,
        };
      }

      return buildRunResult(
        buildCaseResults(request, message.cases),
        message.logs,
        startedAt,
      );
    },
  };
}
