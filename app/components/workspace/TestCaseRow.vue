<script setup lang="ts">
import type { CaseResult } from '~/types/runner';

const props = defineProps<{
  index: number;
  item: CaseResult;
}>();

const STATUS_META: Record<
  CaseResult['status'],
  { icon: string; label: string; tone: string }
> = {
  passed: {
    icon: 'i-lucide-check',
    label: 'Lulus',
    tone: 'text-emerald-600 dark:text-emerald-400',
  },
  failed: {
    icon: 'i-lucide-x',
    label: 'Gagal',
    tone: 'text-red-600 dark:text-red-400',
  },
  timeout: {
    icon: 'i-lucide-clock',
    label: 'Waktu habis',
    tone: 'text-amber-600 dark:text-amber-400',
  },
  error: {
    icon: 'i-lucide-triangle-alert',
    label: 'Error',
    tone: 'text-red-600 dark:text-red-400',
  },
};

const meta = computed(() => STATUS_META[props.item.status]);

function format(value: unknown): string {
  const text = JSON.stringify(value);
  return text === undefined ? String(value) : text;
}
</script>

<template>
  <div class="px-3 py-3 border-t border-neutral-200 space-y-2 dark:border-neutral-800 first:border-t-0">
    <div class="flex gap-2 items-center">
      <span
        class="shrink-0 size-3.5"
        :class="[meta.icon, meta.tone]"
        aria-hidden="true"
      />
      <span
        class="text-xs font-medium"
        :class="meta.tone"
      >{{ meta.label }}</span>
      <span class="text-xs text-neutral-400 dark:text-neutral-500">
        Kasus {{ props.index }}
      </span>
      <span class="text-xs text-neutral-400 ml-auto tabular-nums dark:text-neutral-500">
        {{ props.item.durationMs }} ms
      </span>
    </div>

    <p
      v-if="props.item.error"
      class="text-xs text-red-600 leading-relaxed font-mono dark:text-red-400"
    >
      {{ props.item.error }}
    </p>

    <p
      v-else-if="props.item.hidden"
      class="text-xs text-neutral-400 dark:text-neutral-500"
    >
      Test case tersembunyi.
    </p>

    <div
      v-else
      class="text-xs font-mono gap-1 grid"
    >
      <p class="text-neutral-500 dark:text-neutral-400">
        Input: <span class="text-neutral-800 dark:text-neutral-200">{{ format(props.item.input) }}</span>
      </p>
      <p class="text-neutral-500 dark:text-neutral-400">
        Diharapkan: <span class="text-neutral-800 dark:text-neutral-200">{{ format(props.item.expected) }}</span>
      </p>
      <p class="text-neutral-500 dark:text-neutral-400">
        Hasil: <span class="text-neutral-800 dark:text-neutral-200">{{ format(props.item.actual) }}</span>
      </p>
    </div>
  </div>
</template>
