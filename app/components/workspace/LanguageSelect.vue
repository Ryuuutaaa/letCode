<script setup lang="ts">
import type { LanguageId } from '~/types/content';
import { supportedLanguages } from '~/lib/runner';

const props = defineProps<{
  modelValue: LanguageId;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: LanguageId];
}>();

const LABELS: Record<LanguageId, string> = {
  javascript: 'JavaScript',
  python: 'Python',
};
</script>

<template>
  <div class="p-1 rounded-md bg-neutral-100 flex gap-1 items-center dark:bg-neutral-800">
    <button
      v-for="language in supportedLanguages"
      :key="language"
      type="button"
      class="text-xs font-medium px-3 py-1 rounded transition-colors"
      :class="
        language === props.modelValue
          ? 'bg-white text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100'
          : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
      "
      @click="emit('update:modelValue', language)"
    >
      {{ LABELS[language] }}
    </button>
  </div>
</template>
