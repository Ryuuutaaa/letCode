/**
 * Logika penghitung kunjungan, dipisahkan dari handler Netlify Function
 * supaya bisa diuji tanpa menjalankan serverless runtime.
 */

export const STORE_NAME = 'letcode-visits';
export const SUMMARY_KEY = 'summary';
/** Singapore — latensi lebih baik untuk pengunjung Indonesia. */
export const REGION = 'ap-southeast-1';

const MAX_ATTEMPTS = 5;
const MAX_TRACKED_PAGES = 300;
const MAX_TRACKED_DAYS = 400;
const MAX_PATH_LENGTH = 160;

export interface VisitSummary {
  total: number;
  /** Kunjungan per halaman, mis. `{ "/": 12, "/problems/two-sum": 3 }`. */
  pages: Record<string, number>;
  /** Kunjungan per hari (UTC), mis. `{ "2026-10-04": 25 }`. */
  days: Record<string, number>;
}

/** Bentuk minimal store yang dibutuhkan; cukup untuk di-mock saat pengujian. */
export interface VisitStore {
  getWithMetadata: (
    key: string,
    options: { type: 'json' },
  ) => Promise<{ data: unknown; etag?: string } | null>;
  setJSON: (
    key: string,
    value: unknown,
    options?: { onlyIfMatch?: string; onlyIfNew?: boolean },
  ) => Promise<{ modified: boolean }>;
}

export function emptySummary(): VisitSummary {
  return { total: 0, pages: {}, days: {} };
}

/** Membaca ringkasan yang sudah ada, dengan validasi bentuk. */
export async function readSummary(
  store: VisitStore,
): Promise<{ summary: VisitSummary; etag?: string }> {
  const entry = await store.getWithMetadata(SUMMARY_KEY, { type: 'json' });

  if (!entry || typeof entry.data !== 'object' || entry.data === null) {
    return { summary: emptySummary() };
  }

  const data = entry.data as Partial<VisitSummary>;

  return {
    summary: {
      total: typeof data.total === 'number' && Number.isFinite(data.total) ? data.total : 0,
      pages: isCountMap(data.pages) ? data.pages : {},
      days: isCountMap(data.days) ? data.days : {},
    },
    etag: typeof entry.etag === 'string' ? entry.etag : undefined,
  };
}

function isCountMap(value: unknown): value is Record<string, number> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Membersihkan path yang dikirim klien. Klien tidak boleh dipercaya, jadi
 * panjang dibatasi dan hanya bentuk path absolut yang diterima.
 */
export function normalizePath(value: unknown): string {
  if (typeof value !== 'string') {
    return '/';
  }

  const withoutQuery = value.split('?')[0]?.split('#')[0] ?? '/';
  const trimmed = withoutQuery.slice(0, MAX_PATH_LENGTH);

  if (!trimmed.startsWith('/')) {
    return '/';
  }

  return trimmed === '' ? '/' : trimmed;
}

export function todayKey(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function bumpKey(
  map: Record<string, number>,
  key: string,
  limit: number,
): Record<string, number> {
  const next = { ...map };

  if (next[key] !== undefined) {
    next[key] += 1;
  } else if (Object.keys(next).length < limit) {
    next[key] = 1;
  }

  return next;
}

/**
 * Menaikkan hitungan satu kali.
 *
 * Netlify Blobs tidak punya operasi increment atomik dan memakai aturan
 * "last write wins", jadi read-modify-write biasa bisa kehilangan hitungan saat
 * ada permintaan bersamaan. Karena itu penulisan memakai `onlyIfMatch` (etag),
 * dan diulang bila ada yang mendahului. Bila setelah beberapa percobaan masih
 * bentrok, fungsi mengembalikan `null` — lebih baik kehilangan satu hitungan
 * daripada menampilkan angka yang salah.
 */
export async function recordVisit(
  store: VisitStore,
  path: string,
  day: string,
): Promise<VisitSummary | null> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // Retry harus berurutan: percobaan berikutnya bergantung pada etag terbaru,
    // jadi tidak boleh dijalankan paralel.
    // eslint-disable-next-line no-await-in-loop
    const { summary, etag } = await readSummary(store);

    const next: VisitSummary = {
      total: summary.total + 1,
      pages: bumpKey(summary.pages, path, MAX_TRACKED_PAGES),
      days: bumpKey(summary.days, day, MAX_TRACKED_DAYS),
    };

    // eslint-disable-next-line no-await-in-loop
    const result = await store.setJSON(
      SUMMARY_KEY,
      next,
      etag === undefined ? { onlyIfNew: true } : { onlyIfMatch: etag },
    );

    if (result.modified) {
      return next;
    }
  }

  return null;
}
