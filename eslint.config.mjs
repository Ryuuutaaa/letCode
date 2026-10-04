import { vinicuncaESLint } from '@vinicunca/eslint-config';

export default vinicuncaESLint(
  {
    vue: true,
    typescript: true,
    unocss: true,
    ignores: ['.commandcode/**', 'blueprint.md', 'note.md', 'PRD.md'],
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      // Konten markdown berasal dari repo sendiri dan dirender dengan html: false,
      // sehingga tidak ada HTML mentah yang bisa lolos.
      'vue/no-v-html': 'off',
    },
  },
);
