<script setup lang="ts">
defineProps<{
  description?: string;
  title: string;
}>();
</script>

<template>
  <div class="px-6 py-12 text-center flex flex-col gap-2 items-center">
    <p class="text-sm text-neutral-900 font-medium dark:text-neutral-100">
      {{ title }}
    </p>
    <p
      v-if="description"
      class="text-sm text-neutral-500 max-w-md dark:text-neutral-400"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>
