<script setup lang="ts">
import type { Difficulty } from '~/types/content';

const props = defineProps<{
  difficulty: Difficulty;
}>();

const TONES: Record<Difficulty, 'accent' | 'danger' | 'success' | 'warning'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
  expert: 'accent',
};

const LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
};
</script>

<template>
  <BaseBadge :tone="TONES[props.difficulty]">
    {{ LABELS[props.difficulty] }}
  </BaseBadge>
</template>
