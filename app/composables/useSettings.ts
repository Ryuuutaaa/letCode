import type { LanguageId } from '~/types/content';
import type { SettingsStore } from '~/types/state';
import { readJson, writeJson } from '~/utils/storage';

const SETTINGS_KEY = 'letcode:settings:v1';

function loadSettings(): SettingsStore {
  const stored = readJson<SettingsStore>(SETTINGS_KEY);

  if (!stored || stored.version !== 1) {
    return { version: 1, preferredLanguage: 'javascript' };
  }

  return stored;
}

const settings = ref<SettingsStore>(loadSettings());

export function useSettings() {
  function setPreferredLanguage(language: LanguageId): void {
    settings.value = { ...settings.value, preferredLanguage: language };
    writeJson(SETTINGS_KEY, settings.value);
  }

  return { setPreferredLanguage, settings };
}
