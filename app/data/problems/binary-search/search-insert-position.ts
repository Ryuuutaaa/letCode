import type { Problem } from '~/types/content';

export const searchInsertPosition: Problem = {
  slug: 'search-insert-position',
  title: {
    id: 'Posisi Sisip',
    en: 'Search Insert Position',
  },
  difficulty: 'easy',
  trackId: 'binary-search',
  order: 2,
  functionName: 'searchInsert',
  parameters: [
    { name: 'nums', type: 'number[]' },
    { name: 'target', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\` yang terurut menaik dan seluruh elemennya
berbeda, serta sebuah bilangan \`target\`.

Kembalikan indeks \`target\` jika ia ada di dalam \`nums\`. Jika tidak ada, kembalikan indeks
tempat \`target\` harus disisipkan agar \`nums\` tetap terurut menaik.

Dengan kata lain: kembalikan **jumlah elemen yang nilainya lebih kecil dari** \`target\`.

Perhatikan bahwa jawabannya bisa sama dengan panjang array — tepatnya ketika \`target\` lebih
besar dari semua elemen.

Array bisa kosong. Solusi kamu harus berjalan dalam O(log n).`,
    en: `You are given an array of integers \`nums\` sorted in ascending order with all values
distinct, plus an integer \`target\`.

Return the index of \`target\` if it exists in \`nums\`. Otherwise return the index where
\`target\` would have to be inserted to keep \`nums\` sorted in ascending order.

In other words: return the **number of elements whose value is smaller than** \`target\`.

Note that the answer can equal the length of the array — exactly when \`target\` is greater
than every element.

The array may be empty. Your solution must run in O(log n).`,
  },
  examples: [
    {
      input: 'nums = [1, 3, 5, 6], target = 5',
      output: '2',
      explanation: {
        id: 'Target ada di indeks 2, dan kebetulan jumlah elemen yang lebih kecil darinya juga 2.',
        en: 'The target sits at index 2, and the number of elements smaller than it happens to be 2 as well.',
      },
    },
    {
      input: 'nums = [1, 3, 5, 6], target = 2',
      output: '1',
      explanation: {
        id: 'Hanya angka 1 yang lebih kecil dari 2, jadi target harus disisipkan di indeks 1 dan mendorong 3 ke kanan.',
        en: 'Only the value 1 is smaller than 2, so the target goes in at index 1 and pushes 3 to the right.',
      },
    },
    {
      input: 'nums = [1, 3, 5, 6], target = 7',
      output: '4',
      explanation: {
        id: 'Target lebih besar dari semua elemen dan disisipkan di akhir, jadi jawabannya sama dengan panjang array.',
        en: 'The target is larger than everything, so it goes at the end and the answer equals the array length.',
      },
    },
  ],
  hints: {
    id: [
      'Soal ini bukan tentang menemukan nilai, tetapi tentang menemukan posisi di mana keadaan berubah.',
      'Cari indeks **pertama** yang nilainya lebih besar atau sama dengan target.',
      'Kalau `nums[mid] >= target`, jangan langsung berhenti — `mid` bisa saja bukan yang paling kiri, jadi persempit ke kiri dengan `hi = mid`.',
      'Mulai dengan `hi = nums.length` (batas setengah terbuka) supaya jawaban yang sama dengan panjang array tetap bisa dikembalikan.',
    ],
    en: [
      'This is not about finding a value, it is about finding the position where the state flips.',
      'Look for the **first** index whose value is greater than or equal to the target.',
      'When `nums[mid] >= target` do not stop — `mid` may not be the leftmost such index, so narrow left with `hi = mid`.',
      'Start with `hi = nums.length` (a half-open bound) so an answer equal to the array length is still reachable.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Soal ini adalah **lower bound**: indeks pertama dengan \`nums[i] >= target\`. Perhatikan bahwa
rumus itu menjawab dua hal sekaligus. Kalau \`nums[i] === target\`, kita mendapat indeks target
itu sendiri. Kalau tidak ada yang sama, kita mendapat posisi sisip yang benar.

Pakai rentang setengah terbuka \`[lo, hi)\` dengan \`lo = 0\` dan \`hi = nums.length\`:

1. Selama \`lo < hi\`, hitung \`mid = lo + Math.floor((hi - lo) / 2)\`.
2. Kalau \`nums[mid] < target\`, maka \`mid\` dan semua di kiri \`mid\` pasti lebih kecil, jadi
   \`lo = mid + 1\`.
3. Kalau \`nums[mid] >= target\`, \`mid\` masih kandidat, jadi \`hi = mid\` (tanpa \`- 1\`).
4. Loop berhenti saat \`lo === hi\`, dan nilai itu adalah jawabannya.

Rentang setengah terbuka inilah yang membuat kasus "lebih besar dari semua elemen" tidak butuh
perlakuan khusus: \`hi\` mulai dari \`nums.length\`, dan \`lo\` boleh tumbuh sampai nilai itu.

Invariant yang dipegang: \`lo\` selalu berisi indeks pertama yang mungkin menjadi jawaban, dan
semua indeks sebelum \`lo\` sudah dipastikan bukan jawaban.

## Kompleksitas

- Waktu: O(log n) — satu pemeriksaan membuang separuh kandidat.
- Ruang: O(1).

## Kesalahan yang sering terjadi

- Berhenti dan langsung mengembalikan \`mid\` saat \`nums[mid] === target\`. Pada array dengan
  nilai berbeda hasilnya kebetulan benar, tetapi kerangkanya salah — kebiasaan ini gagal
  begitu muncul duplikat, karena yang diminta adalah indeks paling kiri.
- Memakai \`hi = nums.length - 1\` lalu mengembalikan \`lo\`. Untuk \`target\` yang lebih besar dari
  semua elemen, jawaban yang benar \`nums.length\` tidak pernah masuk rentang.
- Menulis \`hi = mid - 1\` di dalam loop \`while (lo < hi)\`. Rentang yang tersisa satu elemen
  menjadi kosong tanpa pernah diperiksa, dan jawabannya bisa meleset satu.
- Menambahkan cabang khusus untuk array kosong atau untuk \`target\` yang lebih besar dari
  semua elemen. Dengan rentang setengah terbuka, keduanya sudah tertangani.`,
    en: `## Approach

This problem is a **lower bound**: the first index with \`nums[i] >= target\`. Notice that this
single definition answers both halves of the question. If some \`nums[i] === target\` we get
that target's own index. If nothing matches, we get the correct insertion position.

Use the half-open range \`[lo, hi)\` with \`lo = 0\` and \`hi = nums.length\`:

1. While \`lo < hi\`, compute \`mid = lo + Math.floor((hi - lo) / 2)\`.
2. If \`nums[mid] < target\`, then \`mid\` and everything left of it is smaller, so
   \`lo = mid + 1\`.
3. If \`nums[mid] >= target\`, \`mid\` is still a candidate, so \`hi = mid\` (no \`- 1\`).
4. The loop stops when \`lo === hi\`, and that value is the answer.

The half-open range is what removes the special case for "larger than everything": \`hi\`
starts at \`nums.length\` and \`lo\` is allowed to grow up to it.

The invariant: \`lo\` always points at the first index that may still be the answer, and every
index before \`lo\` is already ruled out.

## Complexity

- Time: O(log n) — one probe discards half of the candidates.
- Space: O(1).

## Common mistakes

- Breaking out and returning \`mid\` on \`nums[mid] === target\`. On distinct values the output
  happens to be right, but the framework is wrong — and it fails the moment duplicates show
  up, because the leftmost index is what is actually required.
- Using \`hi = nums.length - 1\` and then returning \`lo\`. For a \`target\` larger than every
  element, the correct answer \`nums.length\` never enters the range.
- Writing \`hi = mid - 1\` inside a \`while (lo < hi)\` loop. A range holding a single element
  becomes empty without being examined, and the answer can be off by one.
- Adding a special branch for an empty array or for a \`target\` bigger than everything. With a
  half-open range, both are already covered.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function searchInsert(nums, target) {
  // write your solution here
}
`,
      solution: `function searchInsert(nums, target) {
  let lo = 0;
  let hi = nums.length;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
}
`,
    },
    {
      language: 'python',
      template: `def searchInsert(nums, target):
    # write your solution here
    pass
`,
      solution: `def searchInsert(nums, target):
    lo, hi = 0, len(nums)

    while lo < hi:
        mid = lo + (hi - lo) // 2

        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid

    return lo
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 3, 5, 6], 5], expected: 2 },
    { id: 'c2', input: [[1, 3, 5, 6], 2], expected: 1 },
    { id: 'c3', input: [[1, 3, 5, 6], 7], expected: 4, hidden: true },
    { id: 'c4', input: [[1, 3, 5, 6], 0], expected: 0, hidden: true },
    { id: 'c5', input: [[], 3], expected: 0, hidden: true },
    { id: 'c6', input: [[2, 4, 6, 8, 10], 9], expected: 4, hidden: true },
    { id: 'c7', input: [[-5], -7], expected: 0, hidden: true },
    { id: 'c8', input: [[-5], 0], expected: 1, hidden: true },
  ],
};
