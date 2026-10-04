<script setup lang="ts">
import { LOCALE_LABELS, LOCALES } from '~/types/i18n';

const { locale, setLocale } = useI18n();
</script>

<template>
  <div class="p-1 rounded-md bg-neutral-100 flex gap-1 items-center dark:bg-neutral-800">
    <button
      v-for="option in LOCALES"
      :key="option"
      type="button"
      class="text-xs font-medium px-2 py-0.5 rounded transition-colors"
      :class="
        option === locale
          ? 'bg-white text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100'
          : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
      "
      :aria-pressed="option === locale"
      @click="setLocale(option)"
    >
      {{ LOCALE_LABELS[option] }}
    </button>
  </div>
</template>
