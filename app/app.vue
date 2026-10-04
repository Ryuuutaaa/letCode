<script setup lang="ts">
const { init: initTheme } = useTheme();
const { init: initI18n } = useI18n();

onMounted(() => {
  initTheme();
  initI18n();
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
    <AppFooter />
  </div>
</template>
