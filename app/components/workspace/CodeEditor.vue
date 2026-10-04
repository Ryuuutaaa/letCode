<script setup lang="ts">
import type { LanguageId } from '~/types/content';
import type { ThemeMode } from '~/types/state';

const props = defineProps<{
  language: LanguageId;
  theme: ThemeMode;
  value: string;
}>();

const emit = defineEmits<{
  'update:value': [value: string];
}>();

const container = ref<HTMLElement | null>(null);
const ready = ref(false);
const editor = useCodeEditor();

onMounted(async () => {
  if (!container.value) {
    return;
  }

  await editor.mount(container.value, {
    language: props.language,
    onChange: (value) => emit('update:value', value),
    theme: props.theme,
    value: props.value,
  });

  // Monaco dimuat secara asinkron, jadi nilai yang terbaca saat mount bisa sudah basi.
  // Sinkronkan ulang dengan nilai terbaru sebelum editor ditampilkan.
  editor.setValue(props.value);

  ready.value = true;
});

onBeforeUnmount(() => {
  editor.dispose();
});

watch(
  () => props.language,
  (language) => editor.setLanguage(language),
);

watch(
  () => props.theme,
  (theme) => editor.setTheme(theme),
);

watch(
  () => props.value,
  (value) => editor.setValue(value),
);
</script>

<template>
  <div class="h-full relative">
    <div
      ref="container"
      class="h-full w-full"
    />

    <div
      v-if="!ready"
      class="text-sm text-neutral-500 bg-white flex gap-2 items-center inset-0 justify-center absolute dark:text-neutral-400 dark:bg-neutral-900"
    >
      <BaseSpinner />
      Menyiapkan editor…
    </div>
  </div>
</template>
