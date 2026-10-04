import type { Problem } from '~/types/content';

export const twoSum: Problem = {
  slug: 'two-sum',
  title: {
    id: 'Two Sum',
    en: 'Two Sum',
  },
  difficulty: 'easy',
  trackId: 'arrays-hashing',
  order: 1,
  functionName: 'twoSum',
  parameters: [
    { name: 'nums', type: 'number[]' },
    { name: 'target', type: 'number' },
  ],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Kamu diberi sebuah array bilangan bulat \`nums\` dan sebuah bilangan \`target\`.

Temukan dua indeks berbeda \`i\` dan \`j\` sehingga \`nums[i] + nums[j] === target\`.

Setiap soal punya tepat satu jawaban, dan satu elemen tidak boleh dipakai dua kali.

Kembalikan kedua indeks tersebut **dalam urutan menaik**.`,
    en: `You are given an array of integers \`nums\` and an integer \`target\`.

Find two distinct indices \`i\` and \`j\` such that \`nums[i] + nums[j] === target\`.

Every input has exactly one answer, and the same element may not be used twice.

Return the two indices **in ascending order**.`,
  },
  examples: [
    {
      input: 'nums = [2, 7, 11, 15], target = 9',
      output: '[0, 1]',
      explanation: {
        id: 'nums[0] + nums[1] = 2 + 7 = 9.',
        en: 'nums[0] + nums[1] = 2 + 7 = 9.',
      },
    },
    {
      input: 'nums = [3, 2, 4], target = 6',
      output: '[1, 2]',
      explanation: {
        id: 'nums[1] + nums[2] = 2 + 4 = 6.',
        en: 'nums[1] + nums[2] = 2 + 4 = 6.',
      },
    },
  ],
  hints: {
    id: [
      'Cara paling sederhana adalah mencoba semua pasangan. Berapa biayanya?',
      'Kalau kamu sudah tahu satu angka, angka kedua yang dibutuhkan sudah pasti. Bagaimana cara mengecek keberadaannya dengan cepat?',
      'Simpan angka yang sudah dilewati beserta indeksnya di dalam hash map.',
    ],
    en: [
      'The simplest way is to try every pair. What does that cost?',
      'Once you know one number, the number you need is already determined. How can you check for it quickly?',
      'Keep the numbers you have already passed, together with their indices, in a hash map.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Untuk setiap angka \`n\`, satu-satunya angka yang bisa melengkapinya adalah \`target - n\`.
Jadi kita tidak perlu mencari pasangan — kita hanya perlu mengecek apakah pelengkap itu
sudah pernah kita lihat.

Simpan setiap angka yang sudah dilewati ke dalam hash map: angka sebagai kunci, indeks
sebagai nilai. Sebelum menyimpan angka saat ini, cek dulu apakah pelengkapnya sudah ada.

## Kompleksitas

- Waktu: O(n) — satu kali lintasan, dan setiap pencarian di hash map O(1) rata-rata.
- Ruang: O(n) — ukuran hash map.

## Kesalahan yang sering terjadi

- Memakai elemen yang sama dua kali. Karena kita mengecek pelengkap **sebelum** menyimpan
  angka saat ini, hal itu tidak mungkin terjadi.
- Mengembalikan indeks dengan urutan terbalik. Cek pelengkap selalu berada di indeks yang
  lebih kecil, jadi kembalikan pelengkap lebih dulu.`,
    en: `## Approach

For each number \`n\`, the only number that can complete it is \`target - n\`.
So you never have to search for a pair — you only need to check whether that complement
has already been seen.

Store every number you have passed in a hash map: number as key, index as value. Before
storing the current number, check whether its complement is already there.

## Complexity

- Time: O(n) — a single pass, with O(1) average lookups in the hash map.
- Space: O(n) — the size of the hash map.

## Common mistakes

- Using the same element twice. Because you check the complement **before** storing the
  current number, that cannot happen.
- Returning the indices in reverse order. The complement is always at the smaller index,
  so return it first.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function twoSum(nums, target) {
  // write your solution here
}
`,
      solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
`,
    },
    {
      language: 'python',
      template: `def twoSum(nums, target):
    # write your solution here
    pass
`,
      solution: `def twoSum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], i]
        seen[n] = i
    return []
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { id: 'c2', input: [[3, 2, 4], 6], expected: [1, 2] },
    { id: 'c3', input: [[3, 3], 6], expected: [0, 1], hidden: true },
    { id: 'c4', input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], hidden: true },
    { id: 'c5', input: [[0, 4, 3, 0], 0], expected: [0, 3], hidden: true },
  ],
};
