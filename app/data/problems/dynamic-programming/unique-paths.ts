import type { Problem } from '~/types/content';

export const uniquePaths: Problem = {
  slug: 'unique-paths',
  title: {
    id: 'Jalur Unik di Grid',
    en: 'Unique Paths',
  },
  difficulty: 'easy',
  trackId: 'dynamic-programming',
  order: 2,
  functionName: 'uniquePaths',
  parameters: [
    { name: 'm', type: 'number' },
    { name: 'n', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Sebuah robot berada di sudut kiri atas grid berukuran \`m × n\`: \`m\` baris dan \`n\`
kolom. Posisi awalnya adalah sel \`(0, 0)\`, tujuannya sel \`(m - 1, n - 1)\` di sudut kanan
bawah.

Setiap langkah robot hanya bisa bergerak **ke kanan** atau **ke bawah**. Langkah ke kiri dan ke
atas tidak tersedia.

Kembalikan **banyaknya jalur berbeda** dari sudut kiri atas ke sudut kanan bawah.

Target: O(m × n). Dengan satu baris tabel bergulir, ruangnya bisa ditekan menjadi O(n).`,
    en: `A robot sits in the top-left corner of an \`m × n\` grid: \`m\` rows and \`n\` columns. It
starts at cell \`(0, 0)\` and its destination is cell \`(m - 1, n - 1)\` in the bottom-right
corner.

On every move the robot may only go **right** or **down**. Moving left or up is not available.

Return the **number of distinct paths** from the top-left corner to the bottom-right corner.

Target: O(m × n). With a single rolling row, that space drops to O(n).`,
  },
  examples: [
    {
      input: 'm = 3, n = 7',
      output: '28',
      explanation: {
        id: 'Setiap jalur memakai 7 - 1 = 6 langkah ke kanan dan 3 - 1 = 2 langkah ke bawah, jadi yang dihitung adalah banyaknya cara menempatkan 2 langkah ke bawah di antara 8 langkah: 28.',
        en: 'Every path uses 7 - 1 = 6 moves right and 3 - 1 = 2 moves down, so the count is the number of ways to place 2 downward moves among 8 moves in total: 28.',
      },
    },
    {
      input: 'm = 3, n = 2',
      output: '3',
      explanation: {
        id: 'Grid 3×2: tiga jalur, yaitu kanan-bawah-bawah, bawah-kanan-bawah, dan bawah-bawah-kanan.',
        en: 'A 3×2 grid has three paths: right-down-down, down-right-down, and down-down-right.',
      },
    },
    {
      input: 'm = 1, n = 5',
      output: '1',
      explanation: {
        id: 'Grid hanya satu baris. Karena tidak bisa naik atau turun, satu-satunya jalur adalah bergerak ke kanan sampai ujung.',
        en: 'The grid is a single row. Since moving up or down is impossible, the only path is to keep going right to the end.',
      },
    },
  ],
  hints: {
    id: [
      'Lihat sel tujuan. Dari sel mana saja robot bisa masuk ke situ pada langkah terakhirnya?',
      'Hanya ada dua kemungkinan: dari sel tepat di atasnya `(r - 1, c)` atau dari sel tepat di kirinya `(r, c - 1)`. Jadi `jalur(r, c) = jalur(r - 1, c) + jalur(r, c - 1)`.',
      'Base case-nya baris pertama dan kolom pertama: menuju sel mana pun di sana hanya ada satu jalur, karena robot tidak punya pilihan arah.',
      'Kalau tabelnya diisi baris demi baris, kamu hanya perlu satu baris data. Saat mengerjakan baris `row`, `dp[col]` masih berisi nilai dari baris di atasnya, sementara `dp[col - 1]` sudah berisi baris saat ini — jadi `dp[col] = dp[col] + dp[col - 1]` langsung benar.',
    ],
    en: [
      'Look at the destination cell. Which cells could the robot have entered it from on its final move?',
      'Only two: the cell directly above, `(r - 1, c)`, or the cell directly to its left, `(r, c - 1)`. So `paths(r, c) = paths(r - 1, c) + paths(r, c - 1)`.',
      'The base cases are the first row and the first column: every cell there has exactly one path, because the robot has no choice of direction.',
      'If the table is filled row by row, a single row of data is enough. While working on row `row`, `dp[col]` still holds the value from the row above, while `dp[col - 1]` already holds the current row — so `dp[col] = dp[col] + dp[col - 1]` is exactly right.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Pertanyaan yang sama seperti biasa: **apa keputusan terakhir yang saya ambil?** Langkah terakhir
robot menuju sel \`(r, c)\` hanya bisa berupa langkah dari atas atau langkah dari kiri. Dua
kemungkinan itu saling lepas, jadi:

\`\`\`
jalur(r, c) = jalur(r - 1, c) + jalur(r, c - 1)
\`\`\`

Base case-nya adalah baris pertama dan kolom pertama, yang nilainya 1 semua: dari sudut kiri atas,
menuju sel mana pun di baris pertama hanya bisa lewat langkah ke kanan, dan menuju sel mana pun di
kolom pertama hanya bisa lewat langkah ke bawah.

Jawabannya ada di sel pojok kanan bawah, yaitu \`dp[m - 1][n - 1]\`.

Versi tabel penuh memakai O(m × n) ruang. Karena \`dp[r][c]\` hanya membaca sel di atas dan sel di
kiri, satu baris cukup:

\`\`\`
let dp = new Array(n).fill(1)          // baris pertama
for (let r = 1; r < m; r++)
  for (let c = 1; c < n; c++)
    dp[c] = dp[c] + dp[c - 1]          // atas + kiri
return dp[n - 1]
\`\`\`

## Kompleksitas

- Waktu: O(m × n) — setiap sel dihitung sekali dengan kerja O(1).
- Ruang: O(n) dengan baris bergulir, atau O(m × n) kalau tabel penuh dipertahankan.

## Kesalahan umum

- **Rekursi tanpa memo.** Menelusuri semua jalur secara rekursif memanggil fungsi yang sama
  berkali-kali dan berbiaya eksponensial; pada grid 18×18 solusinya kehabisan waktu.
- **Menginisialisasi seluruh tabel dengan 1.** Hanya baris pertama dan kolom pertama yang bernilai
  1. Kalau semua sel diisi 1, sel di tengah akan menambahkan jalur yang sebenarnya tidak ada.
- **Menukar m dan n.** Untuk soal ini hasilnya kebetulan simetris, sehingga kesalahan itu tidak
  terlihat pada jawaban — tapi ia muncul saat rumusnya dipakai untuk memangkas tabel menjadi satu
  baris, karena ukuran baris yang disimpan harus n.
- **Membaca sel yang salah sebagai jawaban.** Jawabannya di sel tujuan \`(m - 1, n - 1)\`, bukan
  nilai terbesar di dalam tabel.
- **Lupa grid satu baris atau satu kolom.** Kasus \`m = 1\` atau \`n = 1\` harus tetap menghasilkan
  1, jadi loop-nya tidak boleh berjalan sampai mengindeks di luar tabel.`,
    en: `## Approach

The same question as always: **what was the last decision I made?** The robot's final move into
cell \`(r, c)\` either came from above or from the left. Those two cases are disjoint, so:

\`\`\`
paths(r, c) = paths(r - 1, c) + paths(r, c - 1)
\`\`\`

The base cases are the first row and the first column, all worth 1: starting from the top-left
corner, any cell in the first row can only be reached by moving right, and any cell in the first
column only by moving down.

The answer lives in the bottom-right cell, \`dp[m - 1][n - 1]\`.

The full table costs O(m × n) space. Because \`dp[r][c]\` only reads the cell above and the cell
to its left, one row is enough:

\`\`\`
let dp = new Array(n).fill(1)          // first row
for (let r = 1; r < m; r++)
  for (let c = 1; c < n; c++)
    dp[c] = dp[c] + dp[c - 1]          // above + left
return dp[n - 1]
\`\`\`

## Complexity

- Time: O(m × n) — every cell is computed once with O(1) work.
- Space: O(n) with a rolling row, or O(m × n) if the full table is kept.

## Common mistakes

- **Recursion without memoization.** Walking every path recursively calls the same function over
  and over at exponential cost; on an 18×18 grid the solution runs out of time.
- **Initializing the whole table to 1.** Only the first row and the first column are 1. If every
  cell starts at 1, middle cells add paths that do not exist.
- **Swapping m and n.** The final number happens to be symmetric, so this error stays hidden in
  the answer — but it shows up the moment the formula is used to reduce the table to one row,
  because the stored row must be sized n.
- **Reading the wrong cell as the answer.** The answer is at the destination \`(m - 1, n - 1)\`,
  not the largest value in the table.
- **Forgetting single-row and single-column grids.** The cases \`m = 1\` or \`n = 1\` must still
  return 1, so the loop must never index outside the table.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function uniquePaths(m, n) {
  // write your solution here
}
`,
      solution: `function uniquePaths(m, n) {
  const ways = new Array(n).fill(1);

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      ways[col] += ways[col - 1];
    }
  }

  return ways[n - 1];
}
`,
    },
    {
      language: 'python',
      template: `def uniquePaths(m, n):
    # write your solution here
    pass
`,
      solution: `def uniquePaths(m, n):
    ways = [1] * n

    for _ in range(1, m):
        for col in range(1, n):
            ways[col] += ways[col - 1]

    return ways[-1]
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [3, 7], expected: 28 },
    { id: 'c2', input: [3, 2], expected: 3 },
    { id: 'c3', input: [1, 5], expected: 1 },
    { id: 'c4', input: [1, 1], expected: 1, hidden: true },
    { id: 'c5', input: [3, 3], expected: 6, hidden: true },
    { id: 'c6', input: [7, 3], expected: 28, hidden: true },
    { id: 'c7', input: [10, 10], expected: 48620, hidden: true },
    { id: 'c8', input: [18, 18], expected: 2333606220, hidden: true },
  ],
};
