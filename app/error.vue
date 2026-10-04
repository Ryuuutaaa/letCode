<script setup lang="ts">
const error = useError();
const { t } = useI18n();

const { init: initI18n } = useI18n();

onMounted(() => {
  initI18n();
});

function goHome(): void {
  clearError({ redirect: '/' });
}
</script>

<template>
  <div
    class="text-neutral-900 px-4 text-center bg-white flex flex-col gap-4 min-h-screen items-center justify-center dark:text-neutral-100 dark:bg-neutral-950"
  >
    <p class="text-4xl font-semibold tabular-nums">
      {{ error?.statusCode ?? 404 }}
    </p>
    <p class="text-sm text-neutral-500 dark:text-neutral-400">
      {{ error?.statusMessage || t('error.notFound') }}
    </p>
    <BaseButton @click="goHome">
      {{ t('error.home') }}
    </BaseButton>
  </div>
</template>
