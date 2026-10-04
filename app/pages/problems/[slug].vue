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
const running = computed(() => status.value === 'running');

// Dipanggil di setup, bukan onMounted: hook onMounted milik komponen anak berjalan
// lebih dulu, sehingga editor akan membaca nilai yang masih kosong.
initialize();
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-6xl">
    <BaseEmptyState
      v-if="!problem"
      title="Soal tidak ditemukan"
      description="Periksa kembali tautannya."
    />

    <div
      v-else
      class="gap-8 grid lg:grid-cols-2"
    >
      <section class="space-y-6">
        <header class="space-y-3">
          <div class="flex flex-wrap gap-3 items-center">
            <h1 class="text-lg tracking-tight font-semibold">
              {{ problem.title }}
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
              Selesai
            </BaseBadge>
          </div>

          <nav class="text-xs text-neutral-500 flex gap-4 items-center dark:text-neutral-400">
            <NuxtLink
              v-if="adjacent.prev"
              :to="`/problems/${adjacent.prev.slug}`"
              class="hover:underline"
            >
              ← {{ adjacent.prev.title }}
            </NuxtLink>
            <NuxtLink
              v-if="adjacent.next"
              :to="`/problems/${adjacent.next.slug}`"
              class="ml-auto hover:underline"
            >
              {{ adjacent.next.title }} →
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

        <HintAccordion :hints="problem.hints" />

        <SolutionPanel
          v-if="solutionUnlocked"
          :explanation="problem.explanation"
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
