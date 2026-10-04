import type { Problem } from '~/types/content';

export const floodFill: Problem = {
  slug: 'flood-fill',
  title: {
    id: 'Flood Fill',
    en: 'Flood Fill',
  },
  difficulty: 'easy',
  trackId: 'graphs',
  order: 1,
  functionName: 'floodFill',
  parameters: [
    { name: 'image', type: 'number[][]' },
    { name: 'sr', type: 'number' },
    { name: 'sc', type: 'number' },
    { name: 'color', type: 'number' },
  ],
  returnType: 'number[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Sebuah gambar bitmap ditulis sebagai matriks bilangan bulat \`image\`; setiap angka mewakili
satu warna. Kamu juga diberi satu titik awal \`(sr, sc)\` dan sebuah warna baru \`color\`.

Isi ulang seluruh **wilayah** yang memuat titik awal itu dengan warna baru. Wilayah adalah
sel \`(sr, sc)\` ditambah semua sel yang bisa dicapai darinya dengan bergerak naik, turun, ke
kiri, atau ke kanan, **selama warna setiap sel yang dilewati sama dengan warna sel awal**.

Kembalikan matriks hasilnya.

Perhatikan kasus ketika \`image[sr][sc]\` sudah sama dengan \`color\`: tidak ada yang berubah,
dan fungsimu harus langsung selesai. Kalau tidak, penelusuran yang menandai sel dengan
mengubah nilainya akan berputar tanpa henti.

Batasan: \`1 <= image.length, image[0].length <= 50\` dan \`0 <= image[r][c], color <= 65535\`.`,
    en: `A bitmap image is written as a matrix of integers \`image\`; each number stands for one color.
You are also given a starting pixel \`(sr, sc)\` and a new color \`color\`.

Repaint the whole **region** containing that starting pixel with the new color. The region is
the cell \`(sr, sc)\` plus every cell reachable from it by moving up, down, left, or right,
**as long as the color of every cell along the way equals the color of the starting cell**.

Return the resulting matrix.

Watch the case where \`image[sr][sc]\` already equals \`color\`: nothing changes, and your
function must stop right away. Otherwise a traversal that marks cells by rewriting their value
will loop forever.

Constraints: \`1 <= image.length, image[0].length <= 50\` and \`0 <= image[r][c], color <= 65535\`.`,
  },
  examples: [
    {
      input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2',
      output: '[[2,2,2],[2,2,0],[2,0,1]]',
      explanation: {
        id: 'Wilayah berwarna 1 yang memuat (1,1) terdiri dari lima sel; sel berbentuk 0 dan sel 1 yang terpisah di sudut tidak tersentuh.',
        en: 'The region of color 1 containing (1,1) is made of five cells; the 0 cells and the isolated 1 in the corner stay untouched.',
      },
    },
    {
      input: 'image = [[0,0,0],[0,1,0],[0,0,0]], sr = 1, sc = 1, color = 9',
      output: '[[0,0,0],[0,9,0],[0,0,0]]',
      explanation: {
        id: 'Titik awal dikelilingi warna lain, jadi hanya satu sel yang berubah.',
        en: 'The starting pixel is surrounded by a different color, so only that single cell changes.',
      },
    },
    {
      input: 'image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0',
      output: '[[0,0,0],[0,0,0]]',
      explanation: {
        id: 'Warna baru sama dengan warna lama. Tidak ada pekerjaan yang tersisa, dan gambar harus dikembalikan apa adanya.',
        en: 'The new color equals the old one. There is no work left to do, and the image must come back unchanged.',
      },
    },
  ],
  hints: {
    id: [
      'Warna pembandingnya adalah warna **sel awal**, bukan warna sel yang baru saja kamu kunjungi.',
      'Pilih cara penelusuran: DFS dengan stack, atau BFS dengan antrian. Keduanya sama baiknya untuk soal ini.',
      'Tandai sel yang sudah diproses dengan menulis warna baru ke sel itu. Karena warna barunya berbeda dari warna lama, sel itu tidak akan tersentuh lagi.',
      'Sebelum apa pun, periksa apakah `image[sr][sc]` sudah sama dengan `color`. Kalau sama dan kamu menandai sel dengan mengubah warnanya, tidak ada yang berubah dan penelusuran tidak akan pernah berhenti.',
    ],
    en: [
      'The color you compare against is the color of the **starting** cell, not of the cell you just stepped into.',
      'Pick a traversal: DFS with a stack, or BFS with a queue. Both are equally good here.',
      'Mark a cell as processed by writing the new color into it. Since the new color differs from the old one, that cell is never picked up again.',
      'Before anything else, check whether `image[sr][sc]` already equals `color`. If it does and you mark cells by rewriting their color, nothing changes and the traversal never stops.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Soal ini adalah **flood fill**: satu penelusuran pada graf implisit yang simpulnya adalah sel
gambar dan sisinya adalah ketetanggaan 4 arah.

1. Baca warna sel awal: \`startColor = image[sr][sc]\`.
2. Kalau \`startColor === color\`, tidak ada yang perlu diisi — langsung kembalikan \`image\`.
3. Mulai dari \`(sr, sc)\`, telusuri ke empat arah. Suatu sel hanya boleh dimasuki kalau ia masih
   berada di dalam papan dan warnanya sama dengan \`startColor\`.
4. Setiap kali masuk ke sebuah sel, tulis \`color\` ke sel itu. Penulisan ini sekaligus menjadi
   penanda "sudah dikunjungi", sehingga tidak perlu matriks \`visited\` terpisah.

\`\`\`js
const stack = [[sr, sc]];

while (stack.length > 0) {
  const [row, col] = stack.pop();
  if (outOfBounds) continue;            // di luar papan
  if (image[row][col] !== startColor) continue; // sudah warna lain

  image[row][col] = color;              // tandai sekaligus warnai
  stack.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]);
}
\`\`\`

Di sini dipakai **stack eksplisit**, bukan rekursi. Keduanya menghasilkan jawaban yang sama,
tetapi rekursi pada papan besar (misalnya satu wilayah berisi 2500 sel) bisa menabrak batas
kedalaman; stack eksplisit tidak punya masalah itu.

## Kompleksitas

- Waktu: O(rows × cols) — setiap sel diperiksa paling banyak sekali, dan setiap sel punya
  4 tetangga.
- Ruang: O(rows × cols) pada kasus terburuk untuk isi stack, karena hampir seluruh papan bisa
  masuk ke stack pada wilayah yang sangat berkelok.

## Kesalahan umum

- **Lupa kasus \`startColor === color\`.** Karena penanda kunjungannya adalah warna itu sendiri,
  tidak ada yang berubah, sel yang sama didorong lagi, dan penelusuran berputar selamanya.
- Membandingkan dengan warna **tetangga** alih-alih warna sel awal, sehingga penyebarannya
  berhenti di tempat yang salah.
- Salah batas: memakai \`<=\` sehingga indeks menyentuh \`rows\`/\`cols\`, atau menukar baris dan
  kolom pada papan yang bukan persegi.
- Menyimpan penanda kunjungan di array terpisah padahal nilainya sudah cukup: menulis warna
  baru adalah penanda yang paling murah.
- Membuat salinan papan, lalu mengembalikan salinan itu. Bukan salah, tetapi soal ini memang
  dirancang untuk kamu kerjakan di papan yang diberikan.`,
    en: `## Approach

This is a **flood fill**: one traversal of an implicit graph whose nodes are image pixels and
whose edges are 4-way neighbourhoods.

1. Read the color of the starting pixel: \`startColor = image[sr][sc]\`.
2. If \`startColor === color\`, there is nothing to repaint — return \`image\` immediately.
3. Starting from \`(sr, sc)\`, walk in all four directions. A cell may be entered only when it is
   inside the board and still has color \`startColor\`.
4. Every time you enter a cell, write \`color\` into it. That write doubles as the "already
   visited" marker, so no separate \`visited\` matrix is needed.

\`\`\`js
const stack = [[sr, sc]];

while (stack.length > 0) {
  const [row, col] = stack.pop();
  if (outOfBounds) continue;            // outside the board
  if (image[row][col] !== startColor) continue; // repainted already

  image[row][col] = color;              // mark and paint in one step
  stack.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]);
}
\`\`\`

An **explicit stack** is used instead of recursion. Both give the same answer, but recursion on a
large board (say one region holding 2500 cells) can hit the call-depth limit; an explicit stack
never does.

## Complexity

- Time: O(rows × cols) — every cell is inspected at most once, and each cell has 4 neighbours.
- Space: O(rows × cols) in the worst case for the stack contents, since a winding region can put
  almost the entire board on the stack.

## Common mistakes

- **Forgetting the \`startColor === color\` case.** Because the visited marker *is* the color,
  nothing changes, the same cell is pushed again, and the traversal spins forever.
- Comparing against the **neighbour's** color instead of the starting cell's color, so the fill
  stops in the wrong place.
- Off-by-one bounds: using \`<=\`, so the index reaches \`rows\`/\`cols\`, or swapping row and column
  on a non-square board.
- Keeping a separate visited array when the value itself is enough: writing the new color is the
  cheapest marker available.
- Copying the board and returning the copy. That is not wrong, but this problem is designed for
  you to work on the board you were given.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function floodFill(image, sr, sc, color) {
  // write your solution here
}
`,
      solution: `function floodFill(image, sr, sc, color) {
  const startColor = image[sr][sc];

  // Nothing to repaint: painting again would loop forever.
  if (startColor === color) {
    return image;
  }

  const rows = image.length;
  const cols = image[0].length;
  const stack = [[sr, sc]];

  while (stack.length > 0) {
    const [row, col] = stack.pop();

    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      continue;
    }

    if (image[row][col] !== startColor) {
      continue;
    }

    image[row][col] = color;
    stack.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]);
  }

  return image;
}
`,
    },
    {
      language: 'python',
      template: `def floodFill(image, sr, sc, color):
    # write your solution here
    pass
`,
      solution: `def floodFill(image, sr, sc, color):
    start_color = image[sr][sc]

    # Nothing to repaint: painting again would loop forever.
    if start_color == color:
        return image

    rows = len(image)
    cols = len(image[0])
    stack = [(sr, sc)]

    while stack:
        row, col = stack.pop()

        if row < 0 or row >= rows or col < 0 or col >= cols:
            continue

        if image[row][col] != start_color:
            continue

        image[row][col] = color
        stack.append((row + 1, col))
        stack.append((row - 1, col))
        stack.append((row, col + 1))
        stack.append((row, col - 1))

    return image
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2],
      expected: [[2, 2, 2], [2, 2, 0], [2, 0, 1]],
    },
    {
      id: 'c2',
      input: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]], 1, 1, 9],
      expected: [[0, 0, 0], [0, 9, 0], [0, 0, 0]],
    },
    {
      id: 'c3',
      input: [[[0, 0, 0], [0, 0, 0]], 0, 0, 0],
      expected: [[0, 0, 0], [0, 0, 0]],
    },
    {
      id: 'c4',
      input: [[[3]], 0, 0, 5],
      expected: [[5]],
      hidden: true,
    },
    {
      id: 'c5',
      input: [[[1, 1], [1, 1]], 0, 0, 1],
      expected: [[1, 1], [1, 1]],
      hidden: true,
    },
    {
      id: 'c6',
      input: [[[1, 0, 1], [1, 0, 0], [0, 1, 1]], 0, 0, 3],
      expected: [[3, 0, 1], [3, 0, 0], [0, 1, 1]],
      hidden: true,
    },
    {
      id: 'c7',
      input: [[[2, 2, 2], [2, 0, 2], [2, 2, 2]], 0, 0, 0],
      expected: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      hidden: true,
    },
    {
      id: 'c8',
      input: [[[1, 1, 1, 1]], 0, 2, 7],
      expected: [[7, 7, 7, 7]],
      hidden: true,
    },
    {
      id: 'c9',
      input: [[[1], [0], [1], [1]], 0, 0, 4],
      expected: [[4], [0], [1], [1]],
      hidden: true,
    },
    {
      id: 'c10',
      input: [[[1, 1, 0, 1]], 0, 0, 8],
      expected: [[8, 8, 0, 1]],
      hidden: true,
    },
    {
      id: 'c11',
      input: [
        [
          [1, 1, 1, 0, 0],
          [1, 1, 0, 0, 1],
          [1, 0, 0, 1, 1],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0],
        ],
        0,
        0,
        5,
      ],
      expected: [
        [5, 5, 5, 0, 0],
        [5, 5, 0, 0, 1],
        [5, 0, 0, 1, 1],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      hidden: true,
    },
    {
      id: 'c12',
      input: [
        Array.from({ length: 50 }, () => Array.from({ length: 50 }).fill(1)),
        25,
        25,
        65535,
      ],
      expected: Array.from({ length: 50 }, () => Array.from({ length: 50 }).fill(65535)),
      hidden: true,
    },
  ],
};
