<script setup lang="ts">
const props = defineProps<{
  hints: Array<string>;
}>();

const { t } = useI18n();

const revealed = ref(0);

function reveal(): void {
  if (revealed.value < props.hints.length) {
    revealed.value += 1;
  }
}
</script>

<template>
  <div
    v-if="hints.length > 0"
    class="space-y-2"
  >
    <div
      v-for="(hint, index) in hints.slice(0, revealed)"
      :key="index"
      class="text-xs text-amber-900 leading-relaxed p-3 rounded-md bg-amber-50 flex gap-2 dark:text-amber-200 dark:bg-amber-950/50"
    >
      <span
        class="i-lucide-lightbulb mt-0.5 shrink-0 size-3.5"
        aria-hidden="true"
      />
      <p>{{ hint }}</p>
    </div>

    <BaseButton
      v-if="revealed < hints.length"
      variant="ghost"
      size="sm"
      @click="reveal"
    >
      <span
        class="i-lucide-lightbulb size-4"
        aria-hidden="true"
      />
      {{ revealed === 0 ? t('hint.reveal') : t('hint.revealNext') }}
    </BaseButton>
  </div>
</template>
