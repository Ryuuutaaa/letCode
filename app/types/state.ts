import type { LanguageId } from './content';

export type ProblemStatus = 'unsolved' | 'attempted' | 'solved';

export type ThemeMode = 'light' | 'dark';

export interface ProblemRecord {
  slug: string;
  status: ProblemStatus;
  attempts: number;
  solvedAt?: number;
  lastLanguage?: LanguageId;
}

export interface ProgressStore {
  version: 1;
  problems: Record<string, ProblemRecord>;
}

export interface SettingsStore {
  version: 1;
  preferredLanguage: LanguageId;
}
