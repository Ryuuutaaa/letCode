export type LanguageId = 'javascript' | 'python';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type ComparatorId = 'deepEqual' | 'unorderedDeepEqual' | 'floatApprox';

export interface Track {
  id: string;
  title: string;
  order: number;
  summary: string;
  material: string;
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
  explanation?: string;
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
  title: string;
  difficulty: Difficulty;
  trackId: string;
  order: number;
  statement: string;
  examples: Array<Example>;
  functionName: string;
  parameters: Array<ProblemParameter>;
  returnType: string;
  timeLimitMs: number;
  hints: Array<string>;
  explanation?: string;
  templates: Array<CodeTemplate>;
  testCases: Array<TestCase>;
}
