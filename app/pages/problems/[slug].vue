<script setup lang="ts">
const route = useRoute();

definePageMeta({
  key: (route) => route.fullPath,
});

const {
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
} = useProblemWorkspace(String(route.params.slug));

const { mode } = useTheme();
const { localized, t } = useI18n();

// Dipanggil di setup, bukan onMounted: hook onMounted milik komponen anak berjalan
// lebih dulu, sehingga editor akan membaca nilai yang masih kosong.
initialize();

const running = computed(() => status.value === 'running');
const title = computed(() => (problem.value ? localized(problem.value.title) : ''));
const hints = computed(() => (problem.value ? localized(problem.value.hints) : []));
const explanation = computed(() =>
  problem.value?.explanation ? localized(problem.value.explanation) : undefined,
);
const prevTitle = computed(() =>
  adjacent.value.prev ? localized(adjacent.value.prev.title) : '',
);
const nextTitle = computed(() =>
  adjacent.value.next ? localized(adjacent.value.next.title) : '',
);
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-6xl">
    <BaseEmptyState
      v-if="!problem"
      :title="t('problem.notFound.title')"
      :description="t('problem.notFound.description')"
    />

    <div
      v-else
      class="gap-8 grid lg:grid-cols-2"
    >
      <section class="space-y-6">
        <header class="space-y-3">
          <div class="flex flex-wrap gap-3 items-center">
            <h1 class="text-lg tracking-tight font-semibold">
              {{ title }}
            </h1>
            <DifficultyBadge :difficulty="problem.difficulty" />
            <BaseBadge
              v-if="isSolved"
              tone="success"
            >
              <span
                class="i-lucide-check size-3"
                aria-hidden="true"
              />
              {{ t('problem.solved') }}
            </BaseBadge>
          </div>

          <nav class="text-xs text-neutral-500 flex gap-4 items-center dark:text-neutral-400">
            <NuxtLink
              v-if="adjacent.prev"
              :to="`/problems/${adjacent.prev.slug}`"
              class="hover:underline"
            >
              ← {{ prevTitle }}
            </NuxtLink>
            <NuxtLink
              v-if="adjacent.next"
              :to="`/problems/${adjacent.next.slug}`"
              class="ml-auto hover:underline"
            >
              {{ nextTitle }} →
            </NuxtLink>
          </nav>
        </header>

        <ProblemStatement :problem="problem" />

        <div class="space-y-2">
          <ProblemExample
            v-for="(example, index) in problem.examples"
            :key="index"
            :index="index + 1"
            :example="example"
          />
        </div>

        <HintAccordion :hints="hints" />

        <SolutionPanel
          v-if="solutionUnlocked"
          :explanation="explanation"
        />
      </section>

      <section class="flex flex-col gap-3">
        <WorkspaceToolbar
          :language="language"
          :running="running"
          @update:language="setLanguage"
          @reset="resetCode"
          @run="runSample"
          @submit="submit"
        />

        <div class="border border-neutral-200 rounded-lg h-80 overflow-hidden dark:border-neutral-800">
          <CodeEditor
            v-model:value="code"
            :language="language"
            :theme="mode"
          />
        </div>

        <div class="border border-neutral-200 rounded-lg bg-white flex flex-col min-h-64 overflow-hidden dark:border-neutral-800 dark:bg-neutral-900">
          <ResultPanel
            :result="result"
            :running="running"
          />
        </div>
      </section>
    </div>
  </div>
</template>
