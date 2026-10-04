<script setup lang="ts">
import type { MaterialSection } from '~/types/content';

const props = defineProps<{
  sections: Array<MaterialSection>;
}>();

const { localized, t } = useI18n();

const rendered = computed(() =>
  props.sections.map((section) => ({
    id: section.id,
    title: localized(section.title),
    html: renderMarkdown(localized(section.body)),
  })),
);
</script>

<template>
  <section class="space-y-10">
    <nav class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
      <p class="text-xs text-neutral-500 font-medium dark:text-neutral-400">
        {{ t('track.toc') }}
      </p>
      <ul class="mt-2 space-y-1">
        <li
          v-for="section in rendered"
          :key="section.id"
        >
          <a
            :href="`#${section.id}`"
            class="text-sm text-neutral-700 dark:text-neutral-300 hover:underline"
          >
            {{ section.title }}
          </a>
        </li>
      </ul>
    </nav>

    <article
      v-for="section in rendered"
      :id="section.id"
      :key="section.id"
      class="scroll-mt-6 space-y-3"
    >
      <h2 class="text-base text-neutral-900 tracking-tight font-semibold dark:text-neutral-100">
        {{ section.title }}
      </h2>
      <div
        class="markdown text-sm text-neutral-700 leading-relaxed dark:text-neutral-300"
        v-html="section.html"
      />
    </article>
  </section>
</template>
