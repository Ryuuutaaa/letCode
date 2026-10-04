<script setup lang="ts">
const { t } = useI18n();

const tracks = listTracks();
</script>

<template>
  <div class="mx-auto px-4 py-10 max-w-5xl space-y-6">
    <header class="space-y-2">
      <h1 class="text-xl tracking-tight font-semibold">
        {{ t('tracks.title') }}
      </h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        {{ t('tracks.subtitle') }}
      </p>
    </header>

    <div class="gap-3 grid">
      <TrackCard
        v-for="track in tracks"
        :key="track.id"
        :track="track"
      />
    </div>
  </div>
</template>
