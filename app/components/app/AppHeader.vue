<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <header class="border-b border-neutral-200 dark:border-neutral-800">
    <div class="mx-auto px-4 flex gap-4 h-14 max-w-5xl items-center justify-between">
      <NuxtLink
        to="/"
        class="text-sm text-neutral-900 tracking-tight font-semibold dark:text-neutral-100"
      >
        LetCode
      </NuxtLink>

      <nav class="flex gap-1 items-center">
        <NuxtLink
          to="/tracks"
          class="text-sm text-neutral-600 px-3 py-1.5 rounded-md transition-colors dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {{ t('header.tracks') }}
        </NuxtLink>
        <NuxtLink
          to="/problems"
          class="text-sm text-neutral-600 px-3 py-1.5 rounded-md transition-colors dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {{ t('header.problems') }}
        </NuxtLink>

        <div class="ml-2 flex gap-2 items-center">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  </header>
</template>
