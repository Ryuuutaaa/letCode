<script setup lang="ts">
import type { Example } from '~/types/content';

const props = defineProps<{
  example: Example;
  index: number;
}>();

const { localized, t } = useI18n();
</script>

<template>
  <div class="p-3 rounded-md bg-neutral-100 space-y-1.5 dark:bg-neutral-800/60">
    <p class="text-xs text-neutral-500 font-medium dark:text-neutral-400">
      {{ t('problem.example', { number: props.index }) }}
    </p>
    <p class="text-xs text-neutral-700 font-mono dark:text-neutral-300">
      <span class="text-neutral-500">{{ t('result.input') }}:</span> {{ example.input }}
    </p>
    <p class="text-xs text-neutral-700 font-mono dark:text-neutral-300">
      <span class="text-neutral-500">{{ t('result.output') }}:</span> {{ example.output }}
    </p>
    <p
      v-if="example.explanation"
      class="text-xs text-neutral-500 leading-relaxed dark:text-neutral-400"
    >
      {{ localized(example.explanation) }}
    </p>
  </div>
</template>
