<script setup lang="ts">
const { init } = useTheme();

onMounted(() => {
  init();
});
</script>

<template>
  <div
    class="text-neutral-900 bg-white flex flex-col min-h-screen dark:text-neutral-100 dark:bg-neutral-950"
  >
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
  </div>
</template>
