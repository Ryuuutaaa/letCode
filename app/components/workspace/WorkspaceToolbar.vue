<script setup lang="ts">
import type { LanguageId } from '~/types/content';

const props = defineProps<{
  language: LanguageId;
  running: boolean;
}>();

const emit = defineEmits<{
  'reset': [];
  'run': [];
  'submit': [];
  'update:language': [value: LanguageId];
}>();

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center justify-between">
    <LanguageSelect
      :model-value="props.language"
      @update:model-value="emit('update:language', $event)"
    />

    <div class="flex gap-2 items-center">
      <BaseButton
        variant="ghost"
        size="sm"
        :disabled="props.running"
        @click="emit('reset')"
      >
        <span
          class="i-lucide-rotate-ccw size-4"
          aria-hidden="true"
        />
        {{ t('action.reset') }}
      </BaseButton>

      <BaseButton
        variant="ghost"
        size="sm"
        :disabled="props.running"
        @click="emit('run')"
      >
        <span
          class="i-lucide-play size-4"
          aria-hidden="true"
        />
        {{ t('action.run') }}
      </BaseButton>

      <BaseButton
        size="sm"
        :disabled="props.running"
        @click="emit('submit')"
      >
        <span
          class="i-lucide-send size-4"
          aria-hidden="true"
        />
        {{ t('action.submit') }}
      </BaseButton>
    </div>
  </div>
</template>
