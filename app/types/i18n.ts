export type Locale = 'id' | 'en';

export type Localized<T> = Record<Locale, T>;

export const LOCALES: Array<Locale> = ['id', 'en'];

export const LOCALE_LABELS: Record<Locale, string> = {
  id: 'ID',
  en: 'EN',
};

export const DEFAULT_LOCALE: Locale = 'id';
