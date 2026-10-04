export type WorkerOutcome<T>
  = | { ok: true; data: T }
    | { ok: false; reason: 'timeout' | 'error'; message?: string };

export interface RunInWorkerOptions {
  payload: unknown;
  terminateOnFinish: boolean;
  timeoutMs: number;
  worker: Worker;
}

export function runInWorker<T>(options: RunInWorkerOptions): Promise<WorkerOutcome<T>> {
  const { payload, terminateOnFinish, timeoutMs, worker } = options;

  return new Promise<WorkerOutcome<T>>((resolve) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    function settle(outcome: WorkerOutcome<T>): void {
      if (settled) {
        return;
      }

      settled = true;

      if (timer !== undefined) {
        clearTimeout(timer);
      }

      worker.removeEventListener('message', onMessage);
      worker.removeEventListener('error', onError);

      if (terminateOnFinish) {
        worker.terminate();
      }

      resolve(outcome);
    }

    function onMessage(event: MessageEvent): void {
      settle({ ok: true, data: event.data as T });
    }

    function onError(event: ErrorEvent): void {
      settle({ ok: false, reason: 'error', message: event.message });
    }

    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', onError);

    timer = setTimeout(settle, timeoutMs, { ok: false, reason: 'timeout' });
    worker.postMessage(payload);
  });
}
