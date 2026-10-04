import type { LanguageId, TestCase } from '~/types/content';
import type { RunResult } from '~/types/runner';
import { run as executeRun, supportedLanguages, warmupDriver } from '~/lib/runner';

const DRAFT_DEBOUNCE_MS = 500;

export function useProblemWorkspace(slug: string) {
  const { setPreferredLanguage, settings } = useSettings();
  const progress = useProgress();
  const draft = useDraft();

  const problem = computed(() => getProblem(slug));
  const adjacent = computed(() => getAdjacentProblems(slug));
  const isSolved = computed(() => progress.isSolved(slug));
  const solutionUnlocked = computed(() => isSolved.value);

  const language = ref<LanguageId>('javascript');
  const code = ref('');
  const status = ref<'done' | 'idle' | 'running'>('idle');
  const result = ref<RunResult | null>(null);

  let token = 0;
  let draftTimer: ReturnType<typeof setTimeout> | undefined;
  let ignoreDraftChanges = 0;

  function templateFor(target: LanguageId): string {
    return problem.value?.templates.find((item) => item.language === target)?.template ?? '';
  }

  /**
   * Mengisi kode dari sistem (template atau draft), bukan dari ketikan pengguna.
   * Penanda hanya dipasang bila nilainya benar-benar berubah, supaya tidak ada
   * penanda yang tersisa dan ikut menelan ketikan berikutnya.
   */
  function applyCode(next: string): void {
    if (code.value !== next) {
      ignoreDraftChanges += 1;
    }

    code.value = next;
  }

  function initialize(): void {
    const current = problem.value;

    if (!current) {
      return;
    }

    const preferred
      = progress.getRecord(slug)?.lastLanguage ?? settings.value.preferredLanguage;
    const target = supportedLanguages.includes(preferred) ? preferred : 'javascript';

    language.value = target;
    applyCode(draft.get(slug, target) ?? templateFor(target));
    status.value = 'idle';
    result.value = null;
  }

  function setLanguage(next: LanguageId): void {
    if (next === language.value || !problem.value) {
      return;
    }

    draft.set(slug, language.value, code.value);

    language.value = next;
    applyCode(draft.get(slug, next) ?? templateFor(next));
    status.value = 'idle';
    result.value = null;

    setPreferredLanguage(next);
    warmupDriver(next);
  }

  function resetCode(): void {
    code.value = templateFor(language.value);
  }

  watch(code, (value) => {
    if (ignoreDraftChanges > 0) {
      ignoreDraftChanges -= 1;
      return;
    }

    if (draftTimer !== undefined) {
      clearTimeout(draftTimer);
    }

    draftTimer = setTimeout(() => {
      draft.set(slug, language.value, value);
    }, DRAFT_DEBOUNCE_MS);
  });

  onScopeDispose(() => {
    if (draftTimer !== undefined) {
      clearTimeout(draftTimer);
    }
  });

  async function execute(testCases: Array<TestCase>): Promise<RunResult | null> {
    const current = problem.value;

    if (!current || status.value === 'running') {
      return null;
    }

    const activeToken = ++token;

    status.value = 'running';
    result.value = null;

    const outcome = await executeRun({
      code: code.value,
      functionName: current.functionName,
      language: language.value,
      testCases,
      timeLimitMs: current.timeLimitMs,
    });

    if (activeToken !== token) {
      return null;
    }

    result.value = outcome;
    status.value = 'done';

    return outcome;
  }

  async function runSample(): Promise<void> {
    const current = problem.value;

    if (!current) {
      return;
    }

    await execute(getSampleCases(current));
  }

  async function submit(): Promise<void> {
    const current = problem.value;

    if (!current) {
      return;
    }

    const outcome = await execute(current.testCases);

    if (!outcome) {
      return;
    }

    if (outcome.status === 'accepted') {
      progress.markSolved(slug, language.value);
    } else {
      progress.markAttempted(slug, language.value);
    }
  }

  return {
    adjacent,
    code,
    initialize,
    isSolved,
    language,
    problem,
    resetCode,
    result,
    runSample,
    setLanguage,
    solutionUnlocked,
    status,
    submit,
  };
}
