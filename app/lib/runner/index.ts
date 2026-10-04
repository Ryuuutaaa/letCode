import type { JudgeDriver, LanguageId, RunRequest, RunResult } from '~/types/runner';
import { createJsDriver } from './js-driver';
import { createPyodideDriver } from './pyodide-driver';

export const supportedLanguages: Array<LanguageId> = ['javascript', 'python'];

const drivers: Array<JudgeDriver> = [createJsDriver(), createPyodideDriver()];

export function resolveDriver(language: LanguageId): JudgeDriver | undefined {
  return drivers.find((driver) => driver.supports(language));
}

/**
 * Memuat runtime bahasa di belakang layar tanpa menunggu hasilnya.
 * Dipakai saat pengguna memilih bahasa, supaya eksekusi pertama tidak terasa lambat.
 */
export function warmupDriver(language: LanguageId): void {
  const driver = resolveDriver(language);

  if (driver?.warmup) {
    void driver.warmup();
  }
}

function internalError(message: string): RunResult {
  return {
    status: 'internal-error',
    cases: [],
    logs: [message],
    durationMs: 0,
  };
}

export async function run(request: RunRequest): Promise<RunResult> {
  if (request.code.trim().length === 0) {
    return internalError('Kode masih kosong.');
  }

  if (request.testCases.length === 0) {
    return internalError('Tidak ada test case untuk dijalankan.');
  }

  const driver = resolveDriver(request.language);

  if (!driver) {
    return internalError(`Bahasa ${request.language} belum didukung.`);
  }

  return driver.run(request);
}
