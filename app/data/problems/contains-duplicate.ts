import type { Problem } from '~/types/content';

export const containsDuplicate: Problem = {
  slug: 'contains-duplicate',
  title: 'Contains Duplicate',
  difficulty: 'easy',
  trackId: 'arrays-hashing',
  order: 2,
  functionName: 'containsDuplicate',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: `Diberikan sebuah array bilangan bulat \`nums\`.

Kembalikan \`true\` jika ada nilai yang muncul **lebih dari satu kali** di dalam array,
dan \`false\` jika semua nilai unik.`,
  examples: [
    {
      input: 'nums = [1, 2, 3, 1]',
      output: 'true',
      explanation: 'Angka 1 muncul dua kali.',
    },
    {
      input: 'nums = [1, 2, 3, 4]',
      output: 'false',
      explanation: 'Semua nilai berbeda.',
    },
  ],
  hints: [
    'Bagaimana cara mengetahui sebuah nilai sudah pernah dilihat sebelumnya?',
    'Hitung jumlah nilai unik, lalu bandingkan dengan panjang array.',
  ],
  explanation: `## Pendekatan

Kalau semua nilai unik, maka jumlah nilai unik sama dengan panjang array. Jadi cukup
ubah array menjadi himpunan, lalu bandingkan ukurannya.

## Kompleksitas

- Waktu: O(n) — satu kali lintasan untuk membangun himpunan.
- Ruang: O(n) — kasus terburuk saat semua nilai unik.

## Alternatif

Menyalin array, mengurutkannya, lalu memeriksa pasangan bersebelahan. Kompleksitas
waktunya O(n log n) dan ruangnya bisa O(1) tambahan, tapi solusi himpunan lebih sederhana
dan lebih cepat.`,
  templates: [
    {
      language: 'javascript',
      template: `function containsDuplicate(nums) {
  // tulis solusimu di sini
}
`,
      solution: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}
`,
    },
    {
      language: 'python',
      template: `def containsDuplicate(nums):
    # tulis solusimu di sini
    pass
`,
      solution: `def containsDuplicate(nums):
    return len(set(nums)) != len(nums)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 3, 1]], expected: true },
    { id: 'c2', input: [[1, 2, 3, 4]], expected: false },
    { id: 'c3', input: [[]], expected: false, hidden: true },
    { id: 'c4', input: [[0]], expected: false, hidden: true },
    { id: 'c5', input: [[0, 0]], expected: true, hidden: true },
    { id: 'c6', input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true, hidden: true },
  ],
};
