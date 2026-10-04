import type { Problem } from '~/types/content';

export const searchA2dMatrix: Problem = {
  slug: 'search-a-2d-matrix',
  title: {
    id: 'Pencarian di Matriks Terurut',
    en: 'Search a 2D Matrix',
  },
  difficulty: 'medium',
  trackId: 'binary-search',
  order: 3,
  functionName: 'searchMatrix',
  parameters: [
    { name: 'matrix', type: 'number[][]' },
    { name: 'target', type: 'number' },
  ],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan matriks bilangan bulat \`matrix\` berukuran \`m\` baris dan \`n\` kolom dengan
dua sifat berikut:

1. Setiap baris terurut menaik dari kiri ke kanan.
2. Elemen pertama setiap baris selalu lebih besar dari elemen terakhir baris sebelumnya.

Kembalikan \`true\` jika \`target\` ada di dalam matriks, atau \`false\` jika tidak.

Matriks bisa kosong; dalam hal itu jawabannya \`false\`.

Solusi kamu harus berjalan dalam O(log(m·n)). Penelusuran tangga (mulai dari kanan atas lalu
bergerak ke kiri atau ke bawah) memang benar, tetapi O(m + n) dan bukan target di sini.`,
    en: `You are given an integer matrix \`matrix\` with \`m\` rows and \`n\` columns satisfying two
properties:

1. Every row is sorted in ascending order from left to right.
2. The first element of each row is always greater than the last element of the previous row.

Return \`true\` if \`target\` is present in the matrix, or \`false\` if it is not.

The matrix may be empty; in that case the answer is \`false\`.

Your solution must run in O(log(m·n)). The staircase walk (start at the top-right corner and
move left or down) is correct but costs O(m + n), which is not the goal here.`,
  },
  examples: [
    {
      input: 'matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 3',
      output: 'true',
      explanation: {
        id: 'Nilai 3 berada di baris pertama, kolom kedua. Dibaca sebagai satu deret, ia adalah elemen ke-1 dari 12.',
        en: 'The value 3 sits in the first row, second column. Read as a single sequence it is element 1 of 12.',
      },
    },
    {
      input: 'matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 13',
      output: 'false',
      explanation: {
        id: 'Dua sifat matriks membuat seluruh isinya terurut menaik jika dibaca baris demi baris, dan 13 jatuh di antara 11 dan 16 sehingga tidak ada.',
        en: 'The two matrix properties make the whole thing ascending when read row by row, and 13 falls between 11 and 16, so it is absent.',
      },
    },
  ],
  hints: {
    id: [
      'Dua sifat di soal menghasilkan satu fakta penting: matriks ini terurut menaik kalau dibaca baris demi baris.',
      'Kalau seluruh isi matriks sudah terurut dalam satu deret, berapa panjang deret itu?',
      'Jangan susun array baru. Petakan indeks deret `i` ke posisi matriks yang sebenarnya, yaitu baris `Math.floor(i / n)` dan kolom `i % n`.',
      'Binary search-nya sama seperti pencarian di array satu dimensi, hanya saja nilai tengahnya diambil lewat pemetaan itu.',
    ],
    en: [
      'The two stated properties produce one important fact: this matrix is ascending when read row by row.',
      'If the entire matrix is one sorted sequence, how long is that sequence?',
      'Do not build a new array. Map sequence index `i` to its real position: row `Math.floor(i / n)` and column `i % n`.',
      'The binary search is the same as on a one-dimensional array; only the midpoint is fetched through that mapping.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Gabungkan dua sifat matriks:

- Karena setiap baris terurut, elemen terakhir baris \`r\` adalah elemen terbesar di baris itu.
- Karena elemen pertama baris \`r + 1\` lebih besar dari elemen terakhir baris \`r\`, tidak ada satu
  pun elemen baris \`r + 1\` yang lebih kecil dari elemen baris \`r\`.

Kesimpulannya: **matriks ini terurut menaik jika dibaca baris demi baris**, jadi ia setara
dengan array satu dimensi sepanjang \`m * n\`.

Karena itu kita bisa melakukan binary search pada **indeks deret** \`0\` sampai \`m * n - 1\`, lalu
menerjemahkan \`mid\` ke posisi matriks saat membacanya:

\`kuadran_kiri = Math.floor(mid / n)\` dan \`kolom = mid % n\`

Sisanya persis pola pencarian eksak: \`mid\` diperiksa di dalam loop rentang inklusif, paruh
yang tidak mungkin dibuang, dan kalau rentangnya habis berarti target tidak ada.

## Kompleksitas

- Waktu: O(log(m·n)) — setiap langkah membuang separuh dari seluruh isi matriks.
- Ruang: O(1) — tidak ada array baru; terjemahan indeks dihitung langsung.

## Kesalahan yang sering terjadi

- Menyalin seluruh matriks ke array datar lebih dulu. Hasilnya masih O(log(m·n)), tetapi
  memori tambahannya O(m·n) dan itu tidak perlu.
- Memakai penelusuran tangga (O(m + n)) karena lebih mudah diingat. Soal meminta O(log(m·n)),
  dan penelusuran tangga memang lebih lambat.
- Memakai \`m\` sebagai pembagi padahal yang dibutuhkan lebar baris, yaitu \`n\`. Pastikan tahu
  mana yang baris dan mana yang kolom: \`matrix.length\` adalah jumlah baris,
  \`matrix[0].length\` adalah jumlah kolom.
- Membaca \`matrix[0].length\` tanpa memeriksa matriks kosong lebih dulu. Ini melempar error,
  bukan mengembalikan \`false\`.
- Menulis \`mid % n\` tetapi lupa \`Math.floor\` pada pembagiannya. \`Math.floor(mid / n)\` harus
  berupa bilangan bulat, kalau tidak indeksnya menjadi pecahan.`,
    en: `## Approach

Combine the two matrix properties:

- Because each row is sorted, the last element of row \`r\` is the largest value in that row.
- Because the first element of row \`r + 1\` is greater than the last element of row \`r\`, no
  value in row \`r + 1\` is smaller than any value in row \`r\`.

The conclusion: **the matrix is ascending when read row by row**, so it is equivalent to a
one-dimensional array of length \`m * n\`.

That means we can binary search over the **sequence index** \`0\` through \`m * n - 1\`, and
translate \`mid\` to its real position while reading:

\`row = Math.floor(mid / n)\` and \`column = mid % n\`

From there it is the exact lookup pattern again: \`mid\` is examined inside the loop of an
inclusive range, the impossible half is discarded, and an empty range means the target is
absent.

## Complexity

- Time: O(log(m·n)) — each step discards half of the whole matrix.
- Space: O(1) — no new array; the index translation is computed on the fly.

## Common mistakes

- Flattening the matrix into a new array first. The result is still O(log(m·n)), but the extra
  memory is O(m·n) and it is simply unnecessary.
- Falling back on the staircase walk (O(m + n)) because it is easier to remember. The problem
  asks for O(log(m·n)), and the staircase is genuinely slower.
- Dividing by \`m\` instead of the row width \`n\`. Keep straight which is which:
  \`matrix.length\` is the number of rows, \`matrix[0].length\` is the number of columns.
- Reading \`matrix[0].length\` before checking for an empty matrix. That throws instead of
  returning \`false\`.
- Writing \`mid % n\` but forgetting the \`Math.floor\` on the division. \`Math.floor(mid / n)\` must
  be a whole number, otherwise the row index becomes a fraction.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function searchMatrix(matrix, target) {
  // write your solution here
}
`,
      solution: `function searchMatrix(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const rows = matrix.length;
  const columns = matrix[0].length;
  let lo = 0;
  let hi = rows * columns - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const value = matrix[Math.floor(mid / columns)][mid % columns];

    if (value === target) {
      return true;
    }

    if (value < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return false;
}
`,
    },
    {
      language: 'python',
      template: `def searchMatrix(matrix, target):
    # write your solution here
    pass
`,
      solution: `def searchMatrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    rows, columns = len(matrix), len(matrix[0])
    lo, hi = 0, rows * columns - 1

    while lo <= hi:
        mid = lo + (hi - lo) // 2
        value = matrix[mid // columns][mid % columns]

        if value == target:
            return True

        if value < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return False
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3],
      expected: true,
    },
    {
      id: 'c2',
      input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13],
      expected: false,
    },
    { id: 'c3', input: [[[1]], 1], expected: true, hidden: true },
    { id: 'c4', input: [[[1]], 0], expected: false, hidden: true },
    { id: 'c5', input: [[[1], [3]], 3], expected: true, hidden: true },
    { id: 'c6', input: [[[1, 2, 3], [4, 5, 6]], 6], expected: true, hidden: true },
    { id: 'c7', input: [[[-5, -3], [-1, 0], [2, 4]], -1], expected: true, hidden: true },
    { id: 'c8', input: [[], 5], expected: false, hidden: true },
    {
      id: 'c9',
      input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 60],
      expected: true,
      hidden: true,
    },
  ],
};
