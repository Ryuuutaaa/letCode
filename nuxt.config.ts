const THEME_SCRIPT = '(function(){try{var key=\'letcode:theme:v1\';var stored=localStorage.getItem(key);var mode=(stored===\'light\'||stored===\'dark\')?stored:(window.matchMedia(\'(prefers-color-scheme: dark)\').matches?\'dark\':\'light\');var root=document.documentElement;root.classList.toggle(\'dark\',mode===\'dark\');root.style.colorScheme=mode;}catch(e){}})();';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt'],
  ssr: false,
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'LetCode',
      meta: [
        {
          name: 'description',
          content:
            'Latihan soal coding untuk persiapan interview, langsung di browser.',
        },
      ],
      // Dipasang sebelum paint supaya tidak ada kedipan tema.
      script: [{ innerHTML: THEME_SCRIPT, tagPosition: 'head', tagPriority: -1 }],
    },
  },
});
