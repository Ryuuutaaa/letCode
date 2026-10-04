<script setup lang="ts">
const tracks = listTracks();
</script>

<template>
  <div class="mx-auto px-4 py-10 max-w-5xl space-y-6">
    <header class="space-y-2">
      <h1 class="text-xl tracking-tight font-semibold">
        Roadmap
      </h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        Urutan topik yang disarankan, dari fondasi sampai lanjutan.
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
