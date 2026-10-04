import type { Problem } from '~/types/content';

export const maxAreaOfIsland: Problem = {
  slug: 'max-area-of-island',
  title: {
    id: 'Luas Pulau Terbesar',
    en: 'Max Area of Island',
  },
  difficulty: 'medium',
  trackId: 'graphs',
  order: 3,
  functionName: 'maxAreaOfIsland',
  parameters: [{ name: 'grid', type: 'number[][]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Kamu diberi matriks 2D \`grid\` berisi \`0\` (air) dan \`1\` (daratan). Sel daratan yang
bersentuhan **horizontal atau vertikal** membentuk satu pulau; sentuhan diagonal tidak
menghitung.

Kembalikan **luas pulau terbesar**, yaitu jumlah sel \`1\` pada pulau terluas di papan itu.
Kalau tidak ada daratan sama sekali, kembalikan \`0\`.

Contoh kecil: pada

\`\`\`
1 1 0
0 1 0
0 0 1
\`\`\`

ada dua pulau dengan luas 3 dan 1, jadi jawabannya 3.

Batasan: \`0 <= grid.length, grid[0].length <= 50\`.`,
    en: `You are given a 2D matrix \`grid\` holding \`0\` (water) and \`1\` (land). Land cells that touch
**horizontally or vertically** form one island; diagonal contact does not count.

Return the **area of the largest island**, that is the number of \`1\` cells in the biggest island
on the board. If there is no land at all, return \`0\`.

A small example: on

\`\`\`
1 1 0
0 1 0
0 0 1
\`\`\`

there are two islands with areas 3 and 1, so the answer is 3.

Constraints: \`0 <= grid.length, grid[0].length <= 50\`.`,
  },
  examples: [
    {
      input: 'grid = [[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,0,1,1]]',
      output: '5',
      explanation: {
        id: 'Ada dua pulau. Pulau kiri atas berluas 3, sedangkan pulau di kanan berluas 5 karena sel di baris kedua paling kanan menyambung ke blok kanan bawah. Yang terbesar 5.',
        en: 'There are two islands. The top-left island has area 3, while the right island has area 5 because the rightmost cell of the second row connects down into the bottom-right block. The largest is 5.',
      },
    },
    {
      input: 'grid = [[0,0,0],[0,0,0]]',
      output: '0',
      explanation: {
        id: 'Tidak ada daratan, jadi luas terbesarnya 0.',
        en: 'There is no land, so the largest area is 0.',
      },
    },
    {
      input: 'grid = [[1,0,1],[0,1,0],[1,0,1]]',
      output: '1',
      explanation: {
        id: 'Lima sel daratan, tetapi tidak ada dua yang bersentuhan secara horizontal atau vertikal. Semuanya pulau berluas 1.',
        en: 'Five land cells, but no two of them touch horizontally or vertically. Every island has area 1.',
      },
    },
  ],
  hints: {
    id: [
      'Penelusurannya identik dengan soal menghitung jumlah pulau. Yang baru hanya satu hal: kamu perlu mengukur, bukan sekadar menandai.',
      'Setiap kali menemukan sel `1` yang belum dikunjungi, jalankan flood fill dari sel itu dan hitung berapa sel yang berhasil dikunjungi.',
      'Simpan luas terbesar yang pernah kamu lihat di sebuah variabel, lalu perbarui setiap kali satu pulau selesai diukur.',
      'Perhatikan kondisi papan tanpa daratan: luas terbaik tetap 0, dan itu jawaban yang benar.',
    ],
    en: [
      'The traversal is identical to counting islands. Only one thing is new: you measure instead of merely marking.',
      'Each time you meet a \`1\` cell you have never visited, run a flood fill from it and count how many cells it reaches.',
      'Keep the largest area seen so far in a variable, and update it whenever an island finishes being measured.',
      'Mind the board with no land at all: the best area stays 0, and that is the correct answer.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Kerangkanya sama dengan **Jumlah Pulau**: iterasi seluruh sel, dan setiap kali menemukan \`1\`
yang belum dikunjungi, jalankan satu flood fill untuk menghabiskan seluruh pulau itu. Bedanya,
kali ini penelusurannya **menghitung** berapa sel yang tersentuh, lalu luas itu dibandingkan
dengan luas terbaik yang sudah tercatat.

\`\`\`js
let area = 0;
const stack = [[row, col]];
visited[row][col] = true;

while (stack.length > 0) {
  const [r, c] = stack.pop();
  area++;                       // hitung sel ini

  // untuk setiap tetangga yang sah, masih 1, dan belum dikunjungi:
  //   visited[nr][nc] = true; stack.push([nr, nc]);
}

best = Math.max(best, area);
\`\`\`

Pastikan penambahan \`area\` terjadi **tepat sekali per sel**, yaitu saat sel keluar dari stack,
dan penandaan \`visited\` terjadi saat sel masuk. Kalau penandaan dilakukan saat keluar, sel yang
sama bisa dihitung berkali-kali dan luasnya membengkak.

Seperti pada soal sebelumnya, flood fill di sini memakai **stack eksplisit**. Papan 50×50 yang
penuh daratan punya lintasan sepanjang 2500 sel; rekursi tanpa pengaturan kedalaman bisa
menyerah, stack tidak.

## Kompleksitas

- Waktu: O(rows × cols) — setiap sel diperiksa paling banyak sekali.
- Ruang: O(rows × cols) untuk \`visited\` dan untuk isi stack pada kasus terburuk.

## Alternatif: menenggelamkan pulau

Alih-alih matriks \`visited\`, kamu bisa mengubah setiap \`1\` yang dikunjungi menjadi \`0\`. Papan
yang tersisa otomatis bersih, dan loop luar tidak perlu memeriksa penanda apa pun. Hanya perlu
diingat bahwa papan input ikut berubah, sehingga fungsi itu tidak idempoten kalau dipanggil dua
kali pada papan yang sama.

## Kesalahan umum

- **Menghitung sel berkali-kali.** Kalau \`visited\` baru ditandai saat sel keluar dari stack,
  tetangga yang sama bisa mendorongnya beberapa kali dan luasnya jadi terlalu besar.
- **Lupa membandingkan dengan luas terbaik.** Menyimpan luas pulau terakhir, bukan yang terbesar,
  adalah salah satu bug paling sering di soal ini.
- Mengembalikan \`-1\` atau nilai lain ketika tidak ada daratan, padahal jawabannya \`0\`.
- Menghitung diagonal sebagai tetangga.
- Salah batas grid, atau lupa menangani papan kosong \`[]\`.
- Memakai BFS padahal DFS sudah cukup. Keduanya benar di sini, tetapi soal ini tidak meminta
  jarak, jadi tidak ada keuntungan memakai antrian.`,
    en: `## Approach

The skeleton is the same as **Number of Islands**: scan every cell, and each time you meet an
unvisited \`1\`, run one flood fill to consume that whole island. The difference is that this time
the traversal **measures** how many cells it touches, and that area is compared against the best
one recorded so far.

\`\`\`js
let area = 0;
const stack = [[row, col]];
visited[row][col] = true;

while (stack.length > 0) {
  const [r, c] = stack.pop();
  area++;                       // count this cell

  // for every valid neighbour that is still 1 and unvisited:
  //   visited[nr][nc] = true; stack.push([nr, nc]);
}

best = Math.max(best, area);
\`\`\`

Make sure \`area\` grows **exactly once per cell**, when the cell leaves the stack, and that
\`visited\` is set when the cell enters. If marking happens on the way out, the same cell can be
counted more than once and the area inflates.

As in the previous problem, the flood fill uses an **explicit stack**. A 50×50 board full of land
has a path of 2500 cells; recursion without a raised depth limit may give up, the stack will not.

## Complexity

- Time: O(rows × cols) — every cell is inspected at most once.
- Space: O(rows × cols) for \`visited\` and for the stack contents in the worst case.

## Alternative: sink the island

Instead of a \`visited\` matrix you can flip every \`1\` you visit into \`0\`. The remaining board
cleans itself up and the outer loop needs no check at all. Just remember the input board changes
too, so the function is not idempotent when called twice on the same board.

## Common mistakes

- **Counting cells more than once.** If \`visited\` is only set when a cell leaves the stack, the
  same neighbour can push it repeatedly and the area comes out too large.
- **Forgetting to compare against the best area.** Storing the area of the last island instead of
  the largest one is one of the most common bugs here.
- Returning \`-1\` or something similar when there is no land, when the answer is \`0\`.
- Treating diagonals as neighbours.
- Getting the grid bounds wrong, or forgetting to handle an empty board \`[]\`.
- Reaching for BFS when DFS is enough. Both are correct, but this problem asks for no distance, so
  a queue buys you nothing.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function maxAreaOfIsland(grid) {
  // write your solution here
}
`,
      solution: `function maxAreaOfIsland(grid) {
  if (grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  let best = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== 1 || visited[row][col]) {
        continue;
      }

      visited[row][col] = true;
      const stack = [[row, col]];
      let area = 0;

      while (stack.length > 0) {
        const [r, c] = stack.pop();
        area++;

        const neighbours = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];

        for (const [nr, nc] of neighbours) {
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
            continue;
          }

          if (visited[nr][nc] || grid[nr][nc] !== 1) {
            continue;
          }

          visited[nr][nc] = true;
          stack.push([nr, nc]);
        }
      }

      best = Math.max(best, area);
    }
  }

  return best;
}
`,
    },
    {
      language: 'python',
      template: `def maxAreaOfIsland(grid):
    # write your solution here
    pass
`,
      solution: `def maxAreaOfIsland(grid):
    if not grid or not grid[0]:
        return 0

    rows = len(grid)
    cols = len(grid[0])
    visited = [[False] * cols for _ in range(rows)]
    best = 0

    for row in range(rows):
        for col in range(cols):
            if grid[row][col] != 1 or visited[row][col]:
                continue

            visited[row][col] = True
            stack = [(row, col)]
            area = 0

            while stack:
                r, c = stack.pop()
                area += 1

                for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                    if nr < 0 or nr >= rows or nc < 0 or nc >= cols:
                        continue

                    if visited[nr][nc] or grid[nr][nc] != 1:
                        continue

                    visited[nr][nc] = True
                    stack.append((nr, nc))

            best = max(best, area)

    return best
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1], [0, 0, 1, 1]]],
      expected: 5,
    },
    {
      id: 'c2',
      input: [[[0, 0, 0], [0, 0, 0]]],
      expected: 0,
    },
    {
      id: 'c3',
      input: [[[1, 0, 1], [0, 1, 0], [1, 0, 1]]],
      expected: 1,
    },
    {
      id: 'c4',
      input: [[]],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c5',
      input: [[[1]]],
      expected: 1,
      hidden: true,
    },
    {
      id: 'c6',
      input: [[[1, 1, 1], [1, 1, 1], [1, 1, 1]]],
      expected: 9,
      hidden: true,
    },
    {
      id: 'c7',
      input: [[[1], [1], [0], [1], [1], [1]]],
      expected: 3,
      hidden: true,
    },
    {
      id: 'c8',
      input: [[[1, 1, 1, 1, 1, 1, 1, 1]]],
      expected: 8,
      hidden: true,
    },
    {
      id: 'c9',
      input: [
        Array.from({ length: 100 }, () => Array.from({ length: 100 }).fill(1)),
      ],
      expected: 10000,
      hidden: true,
    },
    {
      id: 'c10',
      input: [
        Array.from({ length: 100 }, (_, row) => Array.from({ length: 100 }, (_, col) => (
          row === 0 || row === 99 || col === 0 || col === 99 ? 1 : 0
        ))),
      ],
      expected: 396,
      hidden: true,
    },
  ],
};
