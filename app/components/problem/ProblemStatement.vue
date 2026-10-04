<script setup lang="ts">
import type { Problem } from '~/types/content';

const props = defineProps<{
  problem: Problem;
}>();

const html = computed(() => renderMarkdown(props.problem.statement));
</script>

<template>
  <div
    class="markdown text-sm text-neutral-700 leading-relaxed dark:text-neutral-300"
    v-html="html"
  />
</template>
