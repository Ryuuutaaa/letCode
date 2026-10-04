<script setup lang="ts">
import type { RunStatus } from '~/types/runner';

const props = defineProps<{
  status: RunStatus;
}>();

const TONES: Record<RunStatus, 'danger' | 'muted' | 'success' | 'warning'> = {
  'accepted': 'success',
  'wrong-answer': 'danger',
  'runtime-error': 'danger',
  'time-limit-exceeded': 'warning',
  'compile-error': 'danger',
  'internal-error': 'muted',
};

const LABELS: Record<RunStatus, string> = {
  'accepted': 'Accepted',
  'wrong-answer': 'Wrong Answer',
  'runtime-error': 'Runtime Error',
  'time-limit-exceeded': 'Time Limit Exceeded',
  'compile-error': 'Compile Error',
  'internal-error': 'Internal Error',
};
</script>

<template>
  <BaseBadge :tone="TONES[props.status]">
    {{ LABELS[props.status] }}
  </BaseBadge>
</template>
