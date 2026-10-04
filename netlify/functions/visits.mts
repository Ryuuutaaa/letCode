import { getStore } from '@netlify/blobs';
import {
  normalizePath,
  readSummary,
  recordVisit,
  REGION,
  STORE_NAME,
  todayKey,
} from '../lib/visit-counter.mts';

function jsonResponse(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Angka kunjungan tidak boleh di-cache.
      'cache-control': 'no-store',
    },
  });
}

function openStore() {
  return getStore({
    name: STORE_NAME,
    // Tanpa ini, pembacaan bisa tertinggal sampai 60 detik sehingga angka
    // kunjungan terlihat mundur di mata pengunjung.
    consistency: 'strong',
    region: REGION,
  });
}

export default async (request: Request): Promise<Response> => {
  const store = openStore();

  if (request.method === 'GET') {
    const { summary } = await readSummary(store);
    return jsonResponse({ total: summary.total });
  }

  if (request.method === 'POST') {
    const body = (await request.json().catch(() => null)) as { path?: unknown } | null;
    const path = normalizePath(body?.path);
    const summary = await recordVisit(store, path, todayKey());

    if (summary === null) {
      return jsonResponse({ total: null, error: 'counter-busy' });
    }

    return jsonResponse({ total: summary.total });
  }

  return new Response('Method Not Allowed', { status: 405 });
};
