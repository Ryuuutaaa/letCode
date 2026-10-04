<script setup lang="ts">
import { uv } from 'unocss-variants';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    size?: 'md' | 'sm';
    type?: 'button' | 'submit';
    variant?: 'danger' | 'ghost' | 'primary';
  }>(),
  {
    disabled: false,
    size: 'md',
    type: 'button',
    variant: 'primary',
  },
);

const button = uv({
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
  variants: {
    size: {
      md: 'h-10 px-4 text-sm',
      sm: 'h-8 px-3 text-sm',
    },
    variant: {
      danger: 'bg-red-600 text-white hover:bg-red-700',
      ghost:
        'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    },
  },
});
</script>

<template>
  <button
    :class="button({ size: props.size, variant: props.variant })"
    :disabled="props.disabled"
    :type="props.type"
  >
    <slot />
  </button>
</template>
