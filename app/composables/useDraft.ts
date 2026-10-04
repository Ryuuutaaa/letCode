import type { LanguageId } from '~/types/content';
import { readText, removeKey, writeText } from '~/utils/storage';

const DRAFT_PREFIX = 'letcode:draft:';

function draftKey(slug: string, language: LanguageId): string {
  return `${DRAFT_PREFIX}${slug}:${language}`;
}

export function useDraft() {
  function get(slug: string, language: LanguageId): string | null {
    return readText(draftKey(slug, language));
  }

  function set(slug: string, language: LanguageId, code: string): void {
    writeText(draftKey(slug, language), code);
  }

  function clear(slug: string, language: LanguageId): void {
    removeKey(draftKey(slug, language));
  }

  return { clear, get, set };
}
