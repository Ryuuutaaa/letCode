const BOOT_SCRIPT = '(function(){try{var tKey=\'letcode:theme:v1\';var stored=localStorage.getItem(tKey);var mode=(stored===\'light\'||stored===\'dark\')?stored:(window.matchMedia(\'(prefers-color-scheme: dark)\').matches?\'dark\':\'light\');var root=document.documentElement;root.classList.toggle(\'dark\',mode===\'dark\');root.style.colorScheme=mode;var lKey=\'letcode:locale:v1\';var storedLang=localStorage.getItem(lKey);var lang=(storedLang===\'id\'||storedLang===\'en\')?storedLang:(((navigator.languages||[navigator.language]).join(\',\').toLowerCase().indexOf(\'en\')>-1)?\'en\':\'id\');root.lang=lang;}catch(e){}})();';

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
      // Dipasang sebelum paint supaya tidak ada kedipan tema dan bahasa
      // sudah sesuai sebelum aplikasi hidrasi.
      script: [{ innerHTML: BOOT_SCRIPT, tagPosition: 'head', tagPriority: -1 }],
    },
  },
});
