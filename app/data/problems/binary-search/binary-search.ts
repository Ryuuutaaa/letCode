import type { Problem } from '~/types/content';

export const binarySearch: Problem = {
  slug: 'binary-search',
  title: {
    id: 'Pencarian Biner',
    en: 'Binary Search',
  },
  difficulty: 'easy',
  trackId: 'binary-search',
  order: 1,
  functionName: 'search',
  parameters: [
    { name: 'nums', type: 'number[]' },
    { name: 'target', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\` yang terurut menaik dan sebuah bilangan
\`target\`.

Kembalikan **indeks** posisi \`target\` di dalam \`nums\`, atau \`-1\` jika \`target\` tidak ada.

Seluruh nilai di dalam \`nums\` berbeda, dan array bisa kosong.

Solusi kamu wajib berjalan dalam O(log n). Memeriksa elemen satu per satu dari depan memang
menghasilkan jawaban yang benar, tetapi bukan penyelesaian yang diterima di sini.

Ini adalah bentuk paling dasar dari binary search: rentang pencarian dipegang oleh dua
variabel, dan setiap perbandingan membuang separuh kandidat.`,
    en: `You are given an array of integers \`nums\` sorted in ascending order, and an integer
\`target\`.

Return the **index** of \`target\` inside \`nums\`, or \`-1\` if \`target\` is not present.

Every value in \`nums\` is distinct, and the array may be empty.

Your solution must run in O(log n). Checking elements one by one from the front produces the
right answer, but it is not the accepted solution here.

This is the most basic form of binary search: two variables hold the search range, and each
comparison throws away half of the candidates.`,
  },
  examples: [
    {
      input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
      output: '4',
      explanation: {
        id: 'Pemeriksaan pertama melihat indeks 2 (nilai 3), yang lebih kecil dari 9, sehingga separuh kiri dibuang. Pemeriksaan kedua menemukan 9.',
        en: 'The first probe looks at index 2 (value 3), which is smaller than 9, so the left half is discarded. The second probe finds 9.',
      },
    },
    {
      input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2',
      output: '-1',
      explanation: {
        id: 'Tidak ada elemen bernilai 2. Rentangnya mengecil sampai kosong, dan fungsi mengembalikan -1.',
        en: 'No element equals 2. The range shrinks until it is empty and the function returns -1.',
      },
    },
    {
      input: 'nums = [], target = 7',
      output: '-1',
      explanation: {
        id: 'Array kosong: rentangnya sudah kosong sejak awal, jadi loop tidak pernah dijalankan.',
        en: 'The empty array starts with an empty range, so the loop never runs.',
      },
    },
  ],
  hints: {
    id: [
      'Alih-alih memeriksa dari indeks 0, periksa elemen di tengah rentang lebih dulu.',
      'Kalau nums[mid] lebih besar dari target, di mana lagi target mungkin berada? Ingat array-nya terurut.',
      'Simpan rentang sebagai dua indeks yang selalu mengecil. Berhenti ketika rentangnya kosong.',
      'Perhatikan perbedaan `while (lo <= hi)` dengan `while (lo < hi)`: yang pertama memeriksa mid di dalam loop, yang kedua tidak selalu.',
    ],
    en: [
      'Instead of scanning from index 0, probe the element in the middle of the range first.',
      'If nums[mid] is greater than target, where else can target possibly be? Remember the array is sorted.',
      'Keep the range as two indices that always shrink. Stop once the range is empty.',
      'Mind the difference between `while (lo <= hi)` and `while (lo < hi)`: the first examines mid inside the loop, the second does not always.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Pakai rentang inklusif \`lo = 0\` sampai \`hi = nums.length - 1\`. Selama \`lo <= hi\`:

1. Hitung \`mid = lo + Math.floor((hi - lo) / 2)\`.
2. Kalau \`nums[mid] === target\`, kembalikan \`mid\`.
3. Kalau \`nums[mid] < target\`, seluruh indeks \`0..mid\` pasti terlalu kecil, jadi
   \`lo = mid + 1\`.
4. Kalau \`nums[mid] > target\`, seluruh indeks \`mid..hi\` pasti terlalu besar, jadi
   \`hi = mid - 1\`.

Kalau loop selesai tanpa menemukan apa pun, berarti rentangnya kosong dan target memang tidak
ada, jadi kembalikan \`-1\`.

Invariant yang harus selalu benar: **kalau target ada, indeksnya berada di dalam \`[lo, hi]\`**.

## Kompleksitas

- Waktu: O(log n) — setiap langkah membuang separuh kandidat.
- Ruang: O(1) — hanya dua indeks dan satu variabel tengah.

## Kesalahan yang sering terjadi

- Menulis \`(lo + hi) / 2\` tanpa \`Math.floor\`. Di JavaScript hasilnya bisa pecahan, dan
  \`nums[2.5]\` bernilai \`undefined\` sehingga perbandingan selalu salah tanpa error apa pun.
- Memakai \`while (lo < hi)\` bersama \`hi = mid - 1\`. Kombinasi itu bisa melewatkan elemen
  terakhir, karena rentang yang tersisa satu elemen tidak pernah diperiksa.
- Menulis \`lo = mid\` (bukan \`lo = mid + 1\`) saat \`nums[mid] < target\`. \`mid\` sudah diperiksa
  dan terbukti bukan jawaban, jadi mempertahankannya hanya membuang satu langkah — dan pada
  pola batas, kebiasaan ini berubah menjadi loop tak berhenti.
- Lupa memeriksa array kosong: dengan \`hi = nums.length - 1\`, nilainya menjadi \`-1\` dan loop
  \`while (lo <= hi)\` sudah menangani itu dengan benar. Ketahuilah alasannya, jangan sekadar
  mengandalkannya.`,
    en: `## Approach

Use the inclusive range \`lo = 0\` through \`hi = nums.length - 1\`. While \`lo <= hi\`:

1. Compute \`mid = lo + Math.floor((hi - lo) / 2)\`.
2. If \`nums[mid] === target\`, return \`mid\`.
3. If \`nums[mid] < target\`, every index \`0..mid\` is too small, so \`lo = mid + 1\`.
4. If \`nums[mid] > target\`, every index \`mid..hi\` is too large, so \`hi = mid - 1\`.

If the loop ends without a hit, the range is empty and the target is genuinely absent, so
return \`-1\`.

The invariant that must always hold: **if the target exists, its index is inside \`[lo, hi]\`**.

## Complexity

- Time: O(log n) — every step discards half of the candidates.
- Space: O(1) — two indices and one midpoint variable.

## Common mistakes

- Writing \`(lo + hi) / 2\` without \`Math.floor\`. In JavaScript that can be a fraction, and
  \`nums[2.5]\` is \`undefined\`, so every comparison fails silently.
- Using \`while (lo < hi)\` together with \`hi = mid - 1\`. That combination can skip the last
  element, because a range holding a single element is never examined.
- Writing \`lo = mid\` (instead of \`lo = mid + 1\`) when \`nums[mid] < target\`. \`mid\` has already
  been examined and ruled out; keeping it only wastes a step — and in the bound pattern the
  same habit becomes an endless loop.
- Forgetting the empty array: with \`hi = nums.length - 1\` it becomes \`-1\`, and
  \`while (lo <= hi)\` handles it correctly. Know why, instead of relying on luck.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function search(nums, target) {
  // write your solution here
}
`,
      solution: `function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return -1;
}
`,
    },
    {
      language: 'python',
      template: `def search(nums, target):
    # write your solution here
    pass
`,
      solution: `def search(nums, target):
    lo, hi = 0, len(nums) - 1

    while lo <= hi:
        mid = lo + (hi - lo) // 2

        if nums[mid] == target:
            return mid

        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
    { id: 'c2', input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
    { id: 'c3', input: [[5], 5], expected: 0, hidden: true },
    { id: 'c4', input: [[], 7], expected: -1, hidden: true },
    { id: 'c5', input: [[-10, -3, 0, 4, 7, 11, 15, 20], 20], expected: 7, hidden: true },
    { id: 'c6', input: [[1, 2, 3, 4, 5], 1], expected: 0, hidden: true },
    { id: 'c7', input: [[-50, -20, -1, 0, 33, 41, 99], -50], expected: 0, hidden: true },
  ],
};
