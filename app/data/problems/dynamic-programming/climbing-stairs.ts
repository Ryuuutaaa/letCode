import type { Problem } from '~/types/content';

export const climbingStairs: Problem = {
  slug: 'climbing-stairs',
  title: {
    id: 'Climbing Stairs',
    en: 'Climbing Stairs',
  },
  difficulty: 'easy',
  trackId: 'dynamic-programming',
  order: 1,
  functionName: 'climbStairs',
  parameters: [{ name: 'n', type: 'number' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Kamu berdiri di dasar tangga dengan \`n\` anak tangga. Setiap langkah kaki menaiki **1
atau 2** anak tangga sekaligus, tidak lebih dan tidak kurang.

Kembalikan **banyaknya cara berbeda** untuk sampai ke anak tangga teratas. Dua cara dianggap
berbeda kalau urutan panjang langkahnya berbeda: \`1 + 2\` dan \`2 + 1\` adalah dua cara yang
berbeda, sementara \`1 + 2\` dan \`1 + 2\` adalah cara yang sama.

Nilai \`n\` minimal 1.

Target: **O(n) waktu** dan **O(1) ruang tambahan** dengan dua variabel bergulir.`,
    en: `You are standing at the bottom of a staircase with \`n\` steps. Every move takes you up
**1 or 2** steps at a time, never anything else.

Return the **number of distinct ways** to reach the top step. Two ways are different when the
sequence of step sizes differs: \`1 + 2\` and \`2 + 1\` are two different ways, while \`1 + 2\`
and \`1 + 2\` are the same one.

The value of \`n\` is at least 1.

Target: **O(n) time** and **O(1) extra space** using two rolling variables.`,
  },
  examples: [
    {
      input: 'n = 2',
      output: '2',
      explanation: {
        id: 'Dua cara: `1 + 1` dan `2`.',
        en: 'Two ways: `1 + 1` and `2`.',
      },
    },
    {
      input: 'n = 3',
      output: '3',
      explanation: {
        id: 'Tiga cara: `1 + 1 + 1`, `1 + 2`, dan `2 + 1`.',
        en: 'Three ways: `1 + 1 + 1`, `1 + 2`, and `2 + 1`.',
      },
    },
    {
      input: 'n = 5',
      output: '8',
      explanation: {
        id: 'Jawabannya membentuk deret 1, 1, 2, 3, 5, 8: deret Fibonacci yang digeser satu langkah.',
        en: 'The answers form the sequence 1, 1, 2, 3, 5, 8: the Fibonacci numbers shifted by one step.',
      },
    },
  ],
  hints: {
    id: [
      'Kalau kamu sudah berdiri di anak tangga teratas, dari anak tangga mana langkah terakhirmu berasal?',
      'Sampai di anak tangga ke-`k` hanya mungkin dari anak tangga ke-`k-1` (langkah 1) atau ke-`k-2` (langkah 2). Jadi tulis dulu `cara(k) = cara(k - 1) + cara(k - 2)`.',
      'Tentukan dua syarat berhenti: `cara(1) = 1` dan `cara(0) = 1`. Nilai `cara(0) = 1` berarti "sudah berada di titik awal sebelum melangkah" tetap dihitung sebagai satu cara.',
      'Setelah tabelnya jalan, perhatikan bahwa setiap sel hanya butuh dua sel sebelumnya. Ganti tabelnya dengan dua variabel bergulir.',
    ],
    en: [
      'Once you are standing on the top step, which step did your final move start from?',
      'Step `k` can only be reached from step `k-1` (a move of 1) or step `k-2` (a move of 2). So start by writing `ways(k) = ways(k - 1) + ways(k - 2)`.',
      'Pin down the two stopping points: `ways(1) = 1` and `ways(0) = 1`. The value `ways(0) = 1` means "already at the start before moving" still counts as one way.',
      'Once the table works, notice that each cell only needs the two cells before it. Replace the table with two rolling variables.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Soal ini diturunkan dengan pertanyaan yang sama seperti semua soal DP: **apa keputusan terakhir
yang saya ambil?**

Keputusan terakhir untuk sampai ke anak tangga \`k\` adalah panjang langkah terakhir: naik 1 atau
naik 2. Kedua kemungkinan itu tidak saling tumpang tindih dan bersama-sama mencakup semua cara,
jadi jawabannya adalah jumlah keduanya:

\`\`\`
cara(0) = 1
cara(1) = 1
cara(k) = cara(k - 1) + cara(k - 2)
\`\`\`

\`cara(0) = 1\` berarti "sudah berada di titik awal, belum melangkah" dihitung sebagai satu cara
(urutan langkah kosong). Ini base case yang paling sering salah ditulis; memakai 0 membuat semua
jawaban kurang satu.

## Kompleksitas

- Waktu: O(n) — setiap nilai dari 2 sampai n dihitung tepat sekali.
- Ruang: O(1) — hanya dua nilai terakhir yang dibutuhkan, jadi tidak perlu tabel penuh. Versi
  tabel penuh memakai O(n).

## Kesalahan umum

- **Rekursi tanpa memo.** \`climbStairs(n - 1) + climbStairs(n - 2)\` benar, tapi setiap panggilan
  bercabang dua sehingga biayanya O(2^n). Untuk n = 45 jumlah pemanggilannya melewati satu miliar
  dan solusinya kehabisan waktu.
- **Base case salah.** \`cara(0) = 0\` membuat seluruh jawaban kurang satu, tanpa error apa pun.
- **Menganggap urutan tidak penting.** Soal ini menghitung urutan langkah, jadi \`1 + 2\` dan
  \`2 + 1\` berbeda. Kalau kamu menghitungnya secara kombinatorik (mencari banyaknya pasangan
  \`(a, b)\` dengan \`a + 2b = n\`), hasilnya lebih kecil karena banyak urutan yang hilang.
- **Tetap memakai tabel penuh padahal sudah tahu polanya.** Tabel O(n) tetap diterima, tapi
  menyadari bahwa hanya dua nilai terakhir dipakai adalah latihan yang berguna untuk soal DP yang
  lebih besar.`,
    en: `## Approach

This problem is derived with the same question as every DP problem: **what was the last decision
I made?**

The last decision on the way to step \`k\` is the size of the final move: up 1 or up 2. Those two
possibilities never overlap and together they cover every way, so the answer is their sum:

\`\`\`
ways(0) = 1
ways(1) = 1
ways(k) = ways(k - 1) + ways(k - 2)
\`\`\`

\`ways(0) = 1\` means "already at the start, having moved zero times" counts as one way (the empty
sequence of moves). This is the base case people most often get wrong; writing 0 makes every
answer one too small.

## Complexity

- Time: O(n) — each value from 2 to n is computed exactly once.
- Space: O(1) — only the last two values are needed, so no full table is required. The full-table
  version costs O(n).

## Common mistakes

- **Recursion without memoization.** \`climbStairs(n - 1) + climbStairs(n - 2)\` is correct but
  every call forks in two, costing O(2^n). For n = 45 the call count passes one billion and the
  solution runs out of time.
- **A wrong base case.** \`ways(0) = 0\` makes every answer one too small, with no error message.
- **Treating order as irrelevant.** This problem counts sequences of moves, so \`1 + 2\` and
  \`2 + 1\` differ. Counting it combinatorially instead (the number of pairs \`(a, b)\` with
  \`a + 2b = n\`) gives a smaller number because many orderings are lost.
- **Keeping the whole table after the pattern is clear.** An O(n) table is still accepted, but
  noticing that only two values are ever read is good practice for larger DP problems.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function climbStairs(n) {
  // write your solution here
}
`,
      solution: `function climbStairs(n) {
  let twoBack = 1;
  let oneBack = 1;

  for (let step = 2; step <= n; step++) {
    const next = twoBack + oneBack;
    twoBack = oneBack;
    oneBack = next;
  }

  return oneBack;
}
`,
    },
    {
      language: 'python',
      template: `def climbStairs(n):
    # write your solution here
    pass
`,
      solution: `def climbStairs(n):
    two_back, one_back = 1, 1

    for _ in range(2, n + 1):
        two_back, one_back = one_back, two_back + one_back

    return one_back
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [2], expected: 2 },
    { id: 'c2', input: [3], expected: 3 },
    { id: 'c3', input: [5], expected: 8 },
    { id: 'c4', input: [1], expected: 1, hidden: true },
    { id: 'c5', input: [4], expected: 5, hidden: true },
    { id: 'c6', input: [10], expected: 89, hidden: true },
    { id: 'c7', input: [45], expected: 1836311903, hidden: true },
  ],
};
