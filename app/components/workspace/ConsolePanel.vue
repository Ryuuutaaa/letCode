<script setup lang="ts">
const props = defineProps<{
  logs: Array<string>;
}>();
</script>

<template>
  <div
    v-if="props.logs.length > 0"
    class="border-t border-neutral-200 dark:border-neutral-800"
  >
    <div class="px-3 py-2 flex gap-2 items-center">
      <span
        class="i-lucide-terminal text-neutral-400 size-3.5"
        aria-hidden="true"
      />
      <span class="text-xs text-neutral-500 font-medium dark:text-neutral-400">
        Konsol
      </span>
    </div>
    <pre class="text-xs text-neutral-600 leading-relaxed font-mono px-3 pb-3 max-h-40 overflow-auto dark:text-neutral-400">{{ props.logs.join('\n') }}</pre>
  </div>
</template>
