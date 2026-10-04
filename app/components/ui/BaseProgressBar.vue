<script setup lang="ts">
const props = defineProps<{
  percent: number;
}>();
</script>

<template>
  <div class="rounded-full bg-neutral-200 h-1.5 w-full overflow-hidden dark:bg-neutral-800">
    <div
      class="rounded-full bg-indigo-600 h-full transition-[width] duration-200"
      :style="{ width: `${props.percent}%` }"
    />
  </div>
</template>
