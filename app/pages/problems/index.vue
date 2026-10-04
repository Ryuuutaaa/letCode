<script setup lang="ts">
type Filter = 'all' | 'solved' | 'unsolved';

const { getStatus } = useProgress();
const { t } = useI18n();

const all = listAllProblems();
const filter = ref<Filter>('all');

const FILTERS = computed<Array<{ label: string; value: Filter }>>(() => [
  { label: t('filter.all'), value: 'all' },
  { label: t('filter.solved'), value: 'solved' },
  { label: t('filter.unsolved'), value: 'unsolved' },
]);

const visible = computed(() =>
  all.filter((problem) => {
    if (filter.value === 'all') {
      return true;
    }

    const solved = getStatus(problem.slug) === 'solved';
    return filter.value === 'solved' ? solved : !solved;
  }),
);
</script>

<template>
  <div class="mx-auto px-4 py-10 max-w-3xl space-y-6">
    <header class="space-y-3">
      <h1 class="text-xl tracking-tight font-semibold">
        {{ t('problems.title') }}
      </h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        {{ t('problems.subtitle') }}
      </p>
      <div class="flex gap-1 items-center">
        <button
          v-for="option in FILTERS"
          :key="option.value"
          type="button"
          class="text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
          :class="
            option.value === filter
              ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
              : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
          "
          :aria-pressed="option.value === filter"
          @click="filter = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </header>

    <BaseEmptyState
      v-if="visible.length === 0"
      :title="t('difficulty.empty.title')"
      :description="t('difficulty.empty.description')"
    />

    <div
      v-else
      class="space-y-1"
    >
      <ProblemListItem
        v-for="(problem, index) in visible"
        :key="problem.slug"
        :index="index + 1"
        :problem="problem"
      />
    </div>
  </div>
</template>
