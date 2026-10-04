import type { Problem } from '~/types/content';

export const houseRobber: Problem = {
  slug: 'house-robber',
  title: {
    id: 'Perampok Rumah',
    en: 'House Robber',
  },
  difficulty: 'medium',
  trackId: 'dynamic-programming',
  order: 3,
  functionName: 'rob',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Deretan rumah berdiri sepanjang satu jalan. Rumah ke-\`i\` berisi uang sebesar
\`nums[i]\`.

Malam ini kamu ingin mengambil uang dari rumah-rumah itu, dengan satu aturan keras: **dua rumah
yang bersebelahan tidak boleh diambil pada malam yang sama**, karena alarmnya saling terhubung.

Kembalikan **jumlah uang terbesar** yang bisa kamu bawa pulang.

Dua catatan penting:

- Urutan pengambilan tidak penting; yang dinilai hanya himpunan rumah yang kamu pilih.
- Nilai di dalam \`nums\` boleh **nol atau negatif**. Nilai negatif berarti rumah itu justru
  merugikan, jadi kamu boleh melewatinya. Kamu juga selalu boleh memutuskan untuk tidak mengambil
  apa pun, sehingga jawabannya tidak pernah negatif.

Array \`nums\` boleh kosong; untuk input kosong jawabannya 0.

Target: O(n) waktu dan O(1) ruang tambahan.`,
    en: `A row of houses stands along a single street. House \`i\` holds \`nums[i]\` in cash.

Tonight you want to take money from those houses under one hard rule: **two neighbouring houses
cannot both be hit on the same night**, because their alarms are wired together.

Return the **largest total amount** you can walk away with.

Two notes matter:

- The order of the robberies is irrelevant; only the set of houses you pick is judged.
- The values in \`nums\` may be **zero or negative**. A negative value means that house would cost
  you money, so you may skip it. You may also always decide to take nothing at all, so the answer
  is never negative.

\`nums\` may be empty; for an empty input the answer is 0.

Target: O(n) time and O(1) extra space.`,
  },
  examples: [
    {
      input: 'nums = [1, 2, 3, 1]',
      output: '4',
      explanation: {
        id: 'Ambil rumah ke-1 dan ke-3 (nilai 1 + 3 = 4). Keduanya tidak bersebelahan. Kalau rumah ke-2 juga diambil, jumlahnya 3 + 2 = 5 tetapi dua rumah itu bersebelahan.',
        en: 'Take houses 1 and 3 (values 1 + 3 = 4). They are not neighbours. Adding house 2 as well would give 3 + 2 = 5, but those two houses are adjacent.',
      },
    },
    {
      input: 'nums = [2, 7, 9, 3, 1]',
      output: '12',
      explanation: {
        id: 'Ambil rumah ke-1, ke-3, dan ke-5: 2 + 9 + 1 = 12. Tidak ada rumah bersebelahan di dalam himpunan itu.',
        en: 'Take houses 1, 3, and 5: 2 + 9 + 1 = 12. No two of them are adjacent.',
      },
    },
    {
      input: 'nums = [2, 1, 1, 2]',
      output: '4',
      explanation: {
        id: 'Ambil rumah ke-1 dan ke-4: 2 + 2 = 4. Perhatikan bahwa pilihan terbaik melompati dua rumah sekaligus, jadi aturan "ambil semua rumah bernomor ganjil" tidak berlaku.',
        en: 'Take houses 1 and 4: 2 + 2 = 4. Notice that the best pick skips two houses at once, so the "take every other house" shortcut does not hold.',
      },
    },
  ],
  hints: {
    id: [
      'Untuk rumah terakhir dalam urutan, hanya ada dua kemungkinan: uangnya kamu ambil atau kamu lewati. Coba pikirkan sisa masalah untuk masing-masing kemungkinan.',
      'Kalau rumah ke-`i` diambil, rumah ke-`i-1` otomatis batal dan sisanya adalah masalah untuk rumah `0..i-2`. Kalau dilewati, sisanya masalah untuk rumah `0..i-1`.',
      'Jadi `dp[i] = max(dp[i - 1], nums[i] + dp[i - 2])`, dengan `dp[0] = 0` sebagai base case "belum ada rumah".',
      'Karena `dp[i]` hanya butuh dua nilai sebelumnya, simpan dua angka bergulir. Mulailah keduanya dari 0 supaya aturan "boleh tidak mengambil apa pun" otomatis berlaku untuk nilai negatif.',
    ],
    en: [
      'For the last house in the row there are only two possibilities: you take its money or you skip it. Think through the remaining problem in each case.',
      'If house `i` is taken, house `i-1` is out and the rest is the problem over houses `0..i-2`. If it is skipped, the rest is the problem over houses `0..i-1`.',
      'So `dp[i] = max(dp[i - 1], nums[i] + dp[i - 2])`, with `dp[0] = 0` as the base case meaning "no houses considered yet".',
      'Because `dp[i]` only needs the two previous values, keep two rolling numbers. Start both at 0 so that "take nothing" is automatically allowed when values are negative.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Keputusan terakhir pada rumah ke-\`i\` hanya ada dua, dan keduanya saling lepas:

- **Ambil** uang di rumah ke-\`i\`. Rumah ke-\`i-1\` otomatis tidak boleh diambil, jadi sisa
  masalahnya adalah rumah \`0..i-2\`:
  \`ambil = nums[i] + dp[i - 2]\`.
- **Lewati** rumah ke-\`i\`. Sisa masalahnya adalah rumah \`0..i-1\`:
  \`lewat = dp[i - 1]\`.

Karena yang dicari nilai terbesar:

\`\`\`
dp[0] = 0
dp[1] = max(0, nums[0])
dp[i] = max(dp[i - 1], nums[i - 1] + dp[i - 2])
\`\`\`

Base case \`dp[0] = 0\` berarti "belum ada rumah yang dipertimbangkan". Karena melewati rumah selalu
mungkin, \`dp\` tidak pernah turun di bawah 0, dan itu sekaligus menjelaskan perilaku untuk nilai
negatif: rumah yang merugikan tidak pernah membantu, jadi kalau semua nilainya negatif jawabannya
0.

Karena setiap \`dp[i]\` hanya butuh dua nilai sebelumnya, tabelnya bisa dipangkas menjadi dua
variabel bergulir. Versi itu yang dipakai di solusi referensi.

## Kompleksitas

- Waktu: O(n) — satu lintasan dengan kerja O(1) per rumah.
- Ruang: O(1) — dua variabel bergulir, bukan tabel.

## Kesalahan umum

- **Menganggap jawabannya "semua rumah bernomor genap" atau "semua bernomor ganjil".** Input
  seperti \`[2, 1, 1, 2]\` menunjukkan pilihan terbaik bisa melompati dua rumah sekaligus; keputusan
  harus diambil per rumah.
- **Rekursi tanpa memo.** \`rob(i - 1)\` dan \`rob(i - 2)\` tanpa simpanan berbiaya O(2^n) dan
  kehabisan waktu pada array yang panjang.
- **Base case yang salah untuk nilai negatif.** Kalau solusimu menganggap rumah pertama harus
  diambil (misalnya mulai dari \`nums[0]\`), input seperti \`[-2, -1, -3]\` menghasilkan jawaban
  negatif padahal jawaban yang benar 0.
- **Lupa input kosong.** \`nums\` kosong berarti tidak ada rumah sama sekali; jawabannya 0.
- **Menggeser variabel dengan urutan terbalik.** Kalau nilai lama dari variabel "satu rumah
  sebelumnya" terhapus sebelum dipakai untuk variabel "dua rumah sebelumnya", langkah berikutnya
  membaca nilai yang salah.`,
    en: `## Approach

The last decision about house \`i\` has only two options, and they are disjoint:

- **Take** the money in house \`i\`. House \`i-1\` is then excluded, so the remaining problem covers
  houses \`0..i-2\`:
  \`take = nums[i] + dp[i - 2]\`.
- **Skip** house \`i\`. The remaining problem covers houses \`0..i-1\`:
  \`skip = dp[i - 1]\`.

Since we want the largest total:

\`\`\`
dp[0] = 0
dp[1] = max(0, nums[0])
dp[i] = max(dp[i - 1], nums[i - 1] + dp[i - 2])
\`\`\`

The base case \`dp[0] = 0\` means "no houses considered yet". Because skipping is always allowed,
\`dp\` never drops below 0, which also explains the behaviour with negative values: a house that
costs you money never helps, so an all-negative input answers 0.

Every \`dp[i]\` only needs the two values before it, so the table can be cut down to two rolling
variables. That is the version used in the reference solution.

## Complexity

- Time: O(n) — a single pass with O(1) work per house.
- Space: O(1) — two rolling variables instead of a table.

## Common mistakes

- **Assuming the answer is "all even-indexed houses" or "all odd-indexed houses".** An input like
  \`[2, 1, 1, 2]\` shows the best pick can skip two houses at once; the decision has to be made per
  house.
- **Recursion without memoization.** \`rob(i - 1)\` plus \`rob(i - 2)\` with no storage costs O(2^n)
  and times out on a long array.
- **A base case that breaks on negative values.** If your solution insists on taking the first
  house (for example by starting from \`nums[0]\`), an input such as \`[-2, -1, -3]\` returns a
  negative number when the correct answer is 0.
- **Forgetting the empty input.** An empty \`nums\` means no houses at all; the answer is 0.
- **Rotating the variables in the wrong order.** If the old value of "one house back" is
  overwritten before it is copied into "two houses back", the next step reads the wrong number.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function rob(nums) {
  // write your solution here
}
`,
      solution: `function rob(nums) {
  let bestTwoBack = 0;
  let bestOneBack = 0;

  for (const amount of nums) {
    const take = bestTwoBack + amount;
    const skip = bestOneBack;
    const best = Math.max(skip, take);
    bestTwoBack = bestOneBack;
    bestOneBack = best;
  }

  return bestOneBack;
}
`,
    },
    {
      language: 'python',
      template: `def rob(nums):
    # write your solution here
    pass
`,
      solution: `def rob(nums):
    best_two_back = 0
    best_one_back = 0

    for amount in nums:
        take = best_two_back + amount
        skip = best_one_back
        best = max(skip, take)
        best_two_back = best_one_back
        best_one_back = best

    return best_one_back
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 3, 1]], expected: 4 },
    { id: 'c2', input: [[2, 7, 9, 3, 1]], expected: 12 },
    { id: 'c3', input: [[2, 1, 1, 2]], expected: 4 },
    { id: 'c4', input: [[]], expected: 0, hidden: true },
    { id: 'c5', input: [[5]], expected: 5, hidden: true },
    { id: 'c6', input: [[-2, -1, -3]], expected: 0, hidden: true },
    { id: 'c7', input: [[0, 0, 0, 0]], expected: 0, hidden: true },
    { id: 'c8', input: [[100, 1, 1, 100]], expected: 200, hidden: true },
    { id: 'c9', input: [[4, 1, 1, 4, 2, 1]], expected: 9, hidden: true },
    { id: 'c10', input: [[2, 1, 1, 4]], expected: 6, hidden: true },
  ],
};
