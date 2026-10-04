<script setup lang="ts">
import type { RunResult } from '~/types/runner';

const props = defineProps<{
  result: RunResult | null;
  running: boolean;
}>();

const { t } = useI18n();

const passedCount = computed(
  () => props.result?.cases.filter((item) => item.status === 'passed').length ?? 0,
);
</script>

<template>
  <div class="flex flex-1 flex-col min-h-0">
    <div
      class="px-3 py-2 border-b border-neutral-200 flex gap-3 items-center justify-between dark:border-neutral-800"
    >
      <span class="text-xs text-neutral-500 font-medium dark:text-neutral-400">
        {{ t('result.latest') }}
      </span>
      <div
        v-if="props.result"
        class="flex gap-2 items-center"
      >
        <span class="text-xs text-neutral-400 tabular-nums dark:text-neutral-500">
          {{ t('result.passedCount', { passed: passedCount, total: props.result.cases.length }) }}
        </span>
        <VerdictBadge :status="props.result.status" />
      </div>
    </div>

    <div
      v-if="props.running"
      class="text-sm text-neutral-500 px-3 py-8 flex gap-2 items-center dark:text-neutral-400"
    >
      <BaseSpinner />
      {{ t('result.running') }}
    </div>

    <BaseEmptyState
      v-else-if="!props.result"
      :title="t('result.empty.title')"
      :description="t('result.empty.description')"
    />

    <template v-else>
      <div class="flex-1 min-h-0 overflow-auto">
        <TestCaseRow
          v-for="(item, index) in props.result.cases"
          :key="item.testCaseId"
          :index="index + 1"
          :item="item"
        />
      </div>
      <ConsolePanel :logs="props.result.logs" />
    </template>
  </div>
</template>
