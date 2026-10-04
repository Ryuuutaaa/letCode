<script setup lang="ts">
const error = useError();

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
      {{ error?.statusMessage || 'Halaman tidak ditemukan.' }}
    </p>
    <BaseButton @click="goHome">
      Kembali ke dashboard
    </BaseButton>
  </div>
</template>
