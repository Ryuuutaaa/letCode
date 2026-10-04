import type { Problem } from '~/types/content';

export const twoSum: Problem = {
  slug: 'two-sum',
  title: 'Two Sum',
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
  statement: `Kamu diberi sebuah array bilangan bulat \`nums\` dan sebuah bilangan \`target\`.

Temukan dua indeks berbeda \`i\` dan \`j\` sehingga \`nums[i] + nums[j] === target\`.

Setiap soal punya tepat satu jawaban, dan satu elemen tidak boleh dipakai dua kali.

Kembalikan kedua indeks tersebut **dalam urutan menaik**.`,
  examples: [
    {
      input: 'nums = [2, 7, 11, 15], target = 9',
      output: '[0, 1]',
      explanation: 'nums[0] + nums[1] = 2 + 7 = 9.',
    },
    {
      input: 'nums = [3, 2, 4], target = 6',
      output: '[1, 2]',
      explanation: 'nums[1] + nums[2] = 2 + 4 = 6.',
    },
  ],
  hints: [
    'Cara paling sederhana adalah mencoba semua pasangan. Berapa biayanya?',
    'Kalau kamu sudah tahu satu angka, angka kedua yang dibutuhkan sudah pasti. Bagaimana cara mengecek keberadaannya dengan cepat?',
    'Simpan angka yang sudah dilewati beserta indeksnya di dalam hash map.',
  ],
  explanation: `## Pendekatan

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
  templates: [
    {
      language: 'javascript',
      template: `function twoSum(nums, target) {
  // tulis solusimu di sini
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
    # tulis solusimu di sini
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
