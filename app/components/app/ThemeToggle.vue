<script setup lang="ts">
const { mode, toggle } = useTheme();
</script>

<template>
  <button
    type="button"
    class="text-neutral-600 rounded-md inline-flex size-8 transition-colors items-center justify-center dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
    :aria-label="mode === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'"
    @click="toggle"
  >
    <span
      class="size-4"
      :class="mode === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
      aria-hidden="true"
    />
  </button>
</template>
