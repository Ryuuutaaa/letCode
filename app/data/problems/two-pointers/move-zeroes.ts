import type { Problem } from '~/types/content';

export const moveZeroes: Problem = {
  slug: 'move-zeroes',
  title: {
    id: 'Move Zeroes',
    en: 'Move Zeroes',
  },
  difficulty: 'easy',
  trackId: 'two-pointers',
  order: 2,
  functionName: 'moveZeroes',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan sebuah array bilangan bulat \`nums\`.

Pindahkan semua angka nol ke bagian akhir array sambil **mempertahankan urutan relatif**
elemen yang bukan nol.

Kerjakan **di tempat**, tanpa membuat salinan array. Kembalikan array yang sudah diubah
supaya bisa diperiksa.`,
    en: `You are given an array of integers \`nums\`.

Move every zero to the end of the array while **keeping the relative order** of the
non-zero elements.

Do it **in place**, without making a copy of the array. Return the modified array so it
can be checked.`,
  },
  examples: [
    {
      input: 'nums = [0, 1, 0, 3, 12]',
      output: '[1, 3, 12, 0, 0]',
      explanation: {
        id: 'Angka bukan nol tetap berurutan 1, 3, 12; sisanya diisi nol.',
        en: 'The non-zero values stay in the order 1, 3, 12; the rest is filled with zeros.',
      },
    },
    {
      input: 'nums = [0]',
      output: '[0]',
    },
  ],
  hints: {
    id: [
      'Bayangkan kamu menulis ulang array dari kiri ke kanan. Di posisi mana elemen berikutnya yang bukan nol harus diletakkan?',
      'Simpan satu indeks yang menunjuk posisi tulis berikutnya, lalu lintasi array dengan indeks baca.',
      'Setelah semua elemen bukan nol dipindahkan, sisa array tinggal diisi nol.',
    ],
    en: [
      'Imagine rewriting the array from left to right. Where should the next non-zero element go?',
      'Keep one index for the next write position, then walk the array with a read index.',
      'Once every non-zero element has been moved, the rest of the array is just filled with zeros.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Ini pola **slow & fast**. Dua indeks bergerak searah:

- \`read\` menelusuri seluruh array.
- \`write\` menunjuk posisi tempat elemen bukan nol berikutnya harus diletakkan.

Setiap kali \`read\` menemukan nilai bukan nol, salin ke posisi \`write\`, lalu naikkan
\`write\`. Setelah lintasan selesai, semua elemen bukan nol sudah berada di depan dengan
urutan terjaga, dan posisi \`write\` ke atas tinggal diisi nol.

## Kompleksitas

- Waktu: O(n) — dua lintasan dangkal.
- Ruang: O(1) — hanya dua indeks, tidak ada array bantu.

## Kenapa urutan relatifnya terjaga

Karena \`read\` menelusuri dari kiri ke kanan dan setiap nilai bukan nol ditulis ke posisi
\`write\` secara berurutan, urutan kemunculannya tidak pernah berubah.

## Kesalahan yang sering terjadi

Menukar alih-alih menyalin. Kalau memakai swap, kamu harus sangat hati-hati agar nilai
bukan nol tidak tertukar ke belakang. Cara salin lalu isi nol di akhir lebih sederhana
dan lebih sulit salah.`,
    en: `## Approach

This is the **slow & fast** pattern. Two indices move in the same direction:

- \`read\` walks the whole array.
- \`write\` marks where the next non-zero element should go.

Every time \`read\` finds a non-zero value, copy it to the \`write\` position, then advance
\`write\`. After the walk, every non-zero element sits at the front in its original order,
and everything from \`write\` onward just needs to be filled with zeros.

## Complexity

- Time: O(n) — two shallow passes.
- Space: O(1) — two indices only, no helper array.

## Why the relative order survives

Because \`read\` moves left to right and each non-zero value is written to the \`write\`
position in sequence, the order in which they appear never changes.

## Common mistakes

Swapping instead of copying. With swaps you have to be very careful not to push a
non-zero value to the back. Copy first and fill zeros at the end is simpler and harder to
get wrong.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function moveZeroes(nums) {
  // write your solution here
}
`,
      solution: `function moveZeroes(nums) {
  let write = 0;

  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      nums[write] = nums[read];
      write++;
    }
  }

  for (let i = write; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}
`,
    },
    {
      language: 'python',
      template: `def moveZeroes(nums):
    # write your solution here
    pass
`,
      solution: `def moveZeroes(nums):
    write = 0

    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1

    for i in range(write, len(nums)):
        nums[i] = 0

    return nums
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
    { id: 'c2', input: [[0]], expected: [0] },
    { id: 'c3', input: [[1]], expected: [1], hidden: true },
    { id: 'c4', input: [[0, 0, 1]], expected: [1, 0, 0], hidden: true },
    { id: 'c5', input: [[1, 2, 3]], expected: [1, 2, 3], hidden: true },
    { id: 'c6', input: [[]], expected: [], hidden: true },
  ],
};
