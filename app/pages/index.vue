<script setup lang="ts">
const { overallProgress } = useProgress();
const { t } = useI18n();

const tracks = listTracks();
const overall = computed(() => overallProgress());
</script>

<template>
  <div class="mx-auto px-4 py-10 max-w-5xl space-y-10">
    <section class="space-y-4">
      <div class="space-y-2">
        <h1 class="text-xl tracking-tight font-semibold">
          {{ t('dashboard.title') }}
        </h1>
        <p class="text-sm text-neutral-500 leading-relaxed max-w-2xl dark:text-neutral-400">
          {{ t('dashboard.subtitle') }}
        </p>
      </div>

      <div class="max-w-sm space-y-2">
        <div class="text-xs text-neutral-500 flex items-center justify-between dark:text-neutral-400">
          <span>{{ t('dashboard.overall') }}</span>
          <span class="tabular-nums">{{ overall.solved }}/{{ overall.total }}</span>
        </div>
        <BaseProgressBar :percent="overall.percent" />
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-sm text-neutral-500 font-medium dark:text-neutral-400">
        {{ t('dashboard.tracks') }}
      </h2>
      <div class="gap-3 grid">
        <TrackCard
          v-for="track in tracks"
          :key="track.id"
          :track="track"
        />
      </div>
    </section>
  </div>
</template>
