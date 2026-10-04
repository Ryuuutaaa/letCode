<script setup lang="ts">
import { uv } from 'unocss-variants';

const props = withDefaults(
  defineProps<{
    tone?: 'accent' | 'danger' | 'muted' | 'success' | 'warning';
  }>(),
  {
    tone: 'muted',
  },
);

const badge = uv({
  base: 'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium',
  defaultVariants: {
    tone: 'muted',
  },
  variants: {
    tone: {
      accent: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
      danger: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
      muted: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
      success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    },
  },
});
</script>

<template>
  <span :class="badge({ tone: props.tone })">
    <slot />
  </span>
</template>
