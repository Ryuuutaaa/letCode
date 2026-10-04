<script setup lang="ts">
const { locale, t } = useI18n();

const total = ref<number | null>(null);

const formatted = computed(() => {
  if (total.value === null) {
    return null;
  }

  return new Intl.NumberFormat(locale.value).format(total.value);
});

onMounted(async () => {
  try {
    const response = await fetch('/api/visits', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname }),
    });

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as { total?: unknown };

    if (typeof data.total === 'number') {
      total.value = data.total;
    }
  } catch {
    // Endpoint ini hanya ada di Netlify. Saat `pnpm dev` lokal, biarkan kosong.
  }
});
</script>

<template>
  <p
    v-if="formatted"
    class="text-xs text-neutral-400 dark:text-neutral-500"
  >
    {{ t('footer.visits', { count: formatted }) }}
  </p>
</template>
