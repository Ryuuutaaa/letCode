import type { LanguageId } from '~/types/content';
import type { ProblemRecord, ProblemStatus, ProgressStore } from '~/types/state';
import { readJson, writeJson } from '~/utils/storage';

const PROGRESS_KEY = 'letcode:progress:v1';

function emptyStore(): ProgressStore {
  return { version: 1, problems: {} };
}

function loadStore(): ProgressStore {
  const stored = readJson<ProgressStore>(PROGRESS_KEY);

  if (!stored || stored.version !== 1 || typeof stored.problems !== 'object' || stored.problems === null) {
    return emptyStore();
  }

  return stored;
}

const store = ref<ProgressStore>(loadStore());

export function useProgress() {
  function getRecord(slug: string): ProblemRecord | undefined {
    return store.value.problems[slug];
  }

  function getStatus(slug: string): ProblemStatus {
    return store.value.problems[slug]?.status ?? 'unsolved';
  }

  function isSolved(slug: string): boolean {
    return getStatus(slug) === 'solved';
  }

  function persist(): void {
    writeJson(PROGRESS_KEY, store.value);
  }

  function markAttempted(slug: string, language: LanguageId): void {
    const current = store.value.problems[slug];

    store.value.problems[slug] = {
      slug,
      status: current?.status === 'solved' ? 'solved' : 'attempted',
      attempts: (current?.attempts ?? 0) + 1,
      solvedAt: current?.solvedAt,
      lastLanguage: language,
    };

    persist();
  }

  function markSolved(slug: string, language: LanguageId): void {
    const current = store.value.problems[slug];

    store.value.problems[slug] = {
      slug,
      status: 'solved',
      attempts: (current?.attempts ?? 0) + 1,
      solvedAt: current?.solvedAt ?? Date.now(),
      lastLanguage: language,
    };

    persist();
  }

  function trackProgress(trackId: string): { percent: number; solved: number; total: number } {
    const slugs = getTrack(trackId)?.problemSlugs ?? [];
    const solved = slugs.filter((slug) => isSolved(slug)).length;
    const total = slugs.length;

    return { solved, total, percent: total === 0 ? 0 : Math.round((solved / total) * 100) };
  }

  function overallProgress(): { percent: number; solved: number; total: number } {
    const all = listAllProblems();
    const solved = all.filter((problem) => isSolved(problem.slug)).length;
    const total = all.length;

    return { solved, total, percent: total === 0 ? 0 : Math.round((solved / total) * 100) };
  }

  function resetProgress(): void {
    store.value = emptyStore();
    persist();
  }

  function exportProgress(): string {
    return JSON.stringify(store.value, null, 2);
  }

  function importProgress(json: string): boolean {
    try {
      const parsed = JSON.parse(json) as ProgressStore;

      if (parsed.version !== 1 || typeof parsed.problems !== 'object' || parsed.problems === null) {
        return false;
      }

      store.value = parsed;
      persist();
      return true;
    } catch {
      return false;
    }
  }

  return {
    store,
    exportProgress,
    getRecord,
    getStatus,
    importProgress,
    isSolved,
    markAttempted,
    markSolved,
    overallProgress,
    resetProgress,
    trackProgress,
  };
}
