<script setup lang="ts">
import type { Problem } from '~/types/content';

const props = defineProps<{
  index: number;
  problem: Problem;
}>();

const { getStatus } = useProgress();
const status = computed(() => getStatus(props.problem.slug));
</script>

<template>
  <NuxtLink
    :to="`/problems/${problem.slug}`"
    class="px-3 py-2.5 rounded-md flex gap-3 transition-colors items-center hover:bg-neutral-100 dark:hover:bg-neutral-800"
  >
    <span class="text-xs text-neutral-400 shrink-0 w-5 tabular-nums dark:text-neutral-500">
      {{ index }}
    </span>

    <span class="text-sm text-neutral-900 flex-1 truncate dark:text-neutral-100">
      {{ problem.title }}
    </span>

    <span
      v-if="status === 'solved'"
      class="i-lucide-check text-emerald-600 shrink-0 size-4 dark:text-emerald-400"
      aria-label="Selesai"
    />
    <span
      v-else-if="status === 'attempted'"
      class="i-lucide-clock text-amber-600 shrink-0 size-4 dark:text-amber-400"
      aria-label="Pernah dicoba"
    />

    <DifficultyBadge :difficulty="problem.difficulty" />
  </NuxtLink>
</template>
