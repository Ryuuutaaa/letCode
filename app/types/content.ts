import type { Localized } from './i18n';

export type LanguageId = 'javascript' | 'python';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

/**
 * `unorderedDeepEqual` mengabaikan urutan **koleksi terluar** saja, isi tiap elemen
 * tetap dibandingkan apa adanya. Dipakai ketika urutan hasil tidak penting tapi isi
 * tiap hasil punya makna (mis. `[x, y]` pada titik koordinat, atau urutan dalam satu
 * permutasi).
 *
 * `unorderedAllLevels` mengabaikan urutan di **semua tingkat**, untuk soal yang
 * hasilnya benar-benar himpunan (mis. daftar kombinasi, daftar triplet).
 */
export type ComparatorId = 'deepEqual' | 'unorderedDeepEqual' | 'unorderedAllLevels' | 'floatApprox';

/** Satu sub-bab materi. `id` dipakai sebagai anchor daftar isi. */
export interface MaterialSection {
  id: string;
  title: Localized<string>;
  body: Localized<string>;
}

export interface Track {
  id: string;
  title: Localized<string>;
  order: number;
  summary: Localized<string>;
  sections: Array<MaterialSection>;
  problemSlugs: Array<string>;
}

export interface TestCase {
  id: string;
  input: Array<unknown>;
  expected: unknown;
  hidden?: boolean;
  comparator?: ComparatorId;
  tolerance?: number;
}

export interface Example {
  input: string;
  output: string;
  explanation?: Localized<string>;
}

export interface CodeTemplate {
  language: LanguageId;
  template: string;
  solution: string;
}

export interface ProblemParameter {
  name: string;
  type: string;
}

export interface Problem {
  slug: string;
  title: Localized<string>;
  difficulty: Difficulty;
  trackId: string;
  order: number;
  statement: Localized<string>;
  examples: Array<Example>;
  functionName: string;
  parameters: Array<ProblemParameter>;
  returnType: string;
  timeLimitMs: number;
  hints: Localized<Array<string>>;
  explanation?: Localized<string>;
  templates: Array<CodeTemplate>;
  testCases: Array<TestCase>;
}
