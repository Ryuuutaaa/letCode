import type { WorkerOutboundMessage, WorkerRunRequest } from './protocol';
import type { JudgeDriver, RunRequest, RunResult } from '~/types/runner';
import { buildCaseResults, buildFailureResult, buildRunResult } from './build-result';
import { buildJavaScriptHarness } from './harness';
import { runInWorker } from './run-in-worker';

function createWorker(): Worker {
  return new Worker(new URL('../../workers/js-runner.ts', import.meta.url), { type: 'module' });
}

export function createJsDriver(): JudgeDriver {
  return {
    id: 'browser-js',
    supports: (language) => language === 'javascript',
    async run(request: RunRequest): Promise<RunResult> {
      const startedAt = Date.now();

      const payload: WorkerRunRequest = {
        type: 'run',
        code: buildJavaScriptHarness(request.code, request.functionName),
        functionName: request.functionName,
        testCases: request.testCases.map((testCase) => ({ id: testCase.id, input: testCase.input })),
      };

      const outcome = await runInWorker<WorkerOutboundMessage>({
        payload,
        terminateOnFinish: true,
        timeoutMs: request.timeLimitMs,
        worker: createWorker(),
      });

      if (!outcome.ok) {
        return outcome.reason === 'timeout'
          ? buildFailureResult(
              request,
              'time-limit-exceeded',
              'Waktu eksekusi habis. Periksa kemungkinan loop tanpa henti.',
              startedAt,
            )
          : buildFailureResult(
              request,
              'runtime-error',
              outcome.message ?? 'Worker gagal dijalankan.',
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
          logs: ['Worker mengirim pesan yang tidak dikenali.'],
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
