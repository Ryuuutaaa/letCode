import type { Problem } from '~/types/content';

export const containsDuplicate: Problem = {
  slug: 'contains-duplicate',
  title: {
    id: 'Contains Duplicate',
    en: 'Contains Duplicate',
  },
  difficulty: 'easy',
  trackId: 'arrays-hashing',
  order: 2,
  functionName: 'containsDuplicate',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan sebuah array bilangan bulat \`nums\`.

Kembalikan \`true\` jika ada nilai yang muncul **lebih dari satu kali** di dalam array,
dan \`false\` jika semua nilai unik.`,
    en: `You are given an array of integers \`nums\`.

Return \`true\` if any value appears **more than once** in the array, and \`false\` if every
element is distinct.`,
  },
  examples: [
    {
      input: 'nums = [1, 2, 3, 1]',
      output: 'true',
      explanation: {
        id: 'Angka 1 muncul dua kali.',
        en: 'The value 1 appears twice.',
      },
    },
    {
      input: 'nums = [1, 2, 3, 4]',
      output: 'false',
      explanation: {
        id: 'Semua nilai berbeda.',
        en: 'Every value is distinct.',
      },
    },
  ],
  hints: {
    id: [
      'Bagaimana cara mengetahui sebuah nilai sudah pernah dilihat sebelumnya?',
      'Hitung jumlah nilai unik, lalu bandingkan dengan panjang array.',
    ],
    en: [
      'How do you know whether a value has been seen before?',
      'Count the distinct values, then compare that with the length of the array.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Kalau semua nilai unik, maka jumlah nilai unik sama dengan panjang array. Jadi cukup
ubah array menjadi himpunan, lalu bandingkan ukurannya.

## Kompleksitas

- Waktu: O(n) — satu kali lintasan untuk membangun himpunan.
- Ruang: O(n) — kasus terburuk saat semua nilai unik.

## Alternatif

Menyalin array, mengurutkannya, lalu memeriksa pasangan bersebelahan. Kompleksitas
waktunya O(n log n) dan ruangnya bisa O(1) tambahan, tapi solusi himpunan lebih sederhana
dan lebih cepat.`,
    en: `## Approach

If every value is distinct, the number of distinct values equals the length of the array.
So just turn the array into a set and compare the sizes.

## Complexity

- Time: O(n) — a single pass to build the set.
- Space: O(n) — worst case when every value is distinct.

## Alternative

Copy the array, sort it, then check adjacent pairs. That runs in O(n log n) time and can
use O(1) extra space, but the set solution is simpler and faster.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function containsDuplicate(nums) {
  // write your solution here
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
    # write your solution here
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
