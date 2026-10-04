import type { MessageKey } from '~/i18n/messages';
import type { Locale, Localized } from '~/types/i18n';
import { messages } from '~/i18n/messages';
import { DEFAULT_LOCALE } from '~/types/i18n';
import { readText, writeText } from '~/utils/storage';

const LOCALE_KEY = 'letcode:locale:v1';

function detectLocale(): Locale {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const candidates = navigator.languages ?? [navigator.language];

  return candidates.some((language) => language?.toLowerCase().startsWith('en')) ? 'en' : 'id';
}

function readStored(): Locale | null {
  const raw = readText(LOCALE_KEY);
  return raw === 'id' || raw === 'en' ? raw : null;
}

const locale = ref<Locale>(readStored() ?? detectLocale());

function applyLang(next: Locale): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = next;
  }
}

export function useI18n() {
  function setLocale(next: Locale): void {
    locale.value = next;
    writeText(LOCALE_KEY, next);
    applyLang(next);
  }

  function init(): void {
    applyLang(locale.value);
  }

  function t(key: MessageKey, params?: Record<string, number | string>): string {
    const template = messages[locale.value][key];

    if (!params) {
      return template;
    }

    return template.replaceAll(/\{(\w+)\}/g, (match, name: string) => {
      const value = params[name];
      return value === undefined ? match : String(value);
    });
  }

  /** Mengambil teks konten sesuai bahasa aktif. */
  function localized<T>(value: Localized<T>): T {
    return value[locale.value];
  }

  return { init, locale, localized, setLocale, t };
}
