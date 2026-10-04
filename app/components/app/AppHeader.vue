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
          Track
        </NuxtLink>
        <NuxtLink
          to="/problems"
          class="text-sm text-neutral-600 px-3 py-1.5 rounded-md transition-colors dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Soal
        </NuxtLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
