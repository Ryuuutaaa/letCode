<script setup lang="ts">
const props = defineProps<{
  explanation?: string;
}>();

const { t } = useI18n();

const html = computed(() =>
  props.explanation ? renderMarkdown(props.explanation) : '',
);
</script>

<template>
  <section
    v-if="html"
    class="space-y-3"
  >
    <h2 class="text-sm text-neutral-900 font-semibold dark:text-neutral-100">
      {{ t('problem.solution') }}
    </h2>
    <div
      class="markdown text-sm text-neutral-700 leading-relaxed dark:text-neutral-300"
      v-html="html"
    />
  </section>
</template>
