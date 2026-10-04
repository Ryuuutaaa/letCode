<script setup lang="ts">
import type { Track } from '~/types/content';

const props = defineProps<{
  track: Track;
}>();

const { trackProgress } = useProgress();
const progress = computed(() => trackProgress(props.track.id));
</script>

<template>
  <NuxtLink
    :to="`/tracks/${track.id}`"
    class="block"
  >
    <BaseCard
      class="p-4 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      <div class="flex gap-4 items-start justify-between">
        <div class="space-y-1">
          <h3 class="text-sm text-neutral-900 font-semibold dark:text-neutral-100">
            {{ track.title }}
          </h3>
          <p class="text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">
            {{ track.summary }}
          </p>
        </div>
        <span class="text-xs text-neutral-500 shrink-0 tabular-nums dark:text-neutral-400">
          {{ progress.solved }}/{{ progress.total }}
        </span>
      </div>

      <BaseProgressBar
        class="mt-4"
        :percent="progress.percent"
      />
    </BaseCard>
  </NuxtLink>
</template>
