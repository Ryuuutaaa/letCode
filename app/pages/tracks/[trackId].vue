<script setup lang="ts">
const route = useRoute();
const trackId = computed(() => String(route.params.trackId));

const { localized, t } = useI18n();

const track = computed(() => getTrack(trackId.value));
const problems = computed(() => listProblemsByTrack(trackId.value));
const title = computed(() => (track.value ? localized(track.value.title) : ''));
const summary = computed(() => (track.value ? localized(track.value.summary) : ''));
const materialHtml = computed(() =>
  track.value ? renderMarkdown(localized(track.value.material)) : '',
);
</script>

<template>
  <div class="mx-auto px-4 py-10 max-w-3xl space-y-10">
    <BaseEmptyState
      v-if="!track"
      :title="t('track.notFound.title')"
      :description="t('track.notFound.description')"
    />

    <template v-else>
      <header class="space-y-3">
        <NuxtLink
          to="/tracks"
          class="text-xs text-neutral-500 inline-block dark:text-neutral-400 hover:underline"
        >
          {{ t('track.back') }}
        </NuxtLink>
        <h1 class="text-xl tracking-tight font-semibold">
          {{ title }}
        </h1>
        <p class="text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">
          {{ summary }}
        </p>
      </header>

      <section
        class="markdown text-sm text-neutral-700 leading-relaxed dark:text-neutral-300"
        v-html="materialHtml"
      />

      <section class="space-y-1">
        <h2 class="text-sm text-neutral-500 font-medium px-3 pb-2 dark:text-neutral-400">
          {{ t('track.problems') }}
        </h2>
        <ProblemListItem
          v-for="(problem, index) in problems"
          :key="problem.slug"
          :index="index + 1"
          :problem="problem"
        />
      </section>
    </template>
  </div>
</template>
