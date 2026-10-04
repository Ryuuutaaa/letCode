import type { Problem } from '~/types/content';

export const numberIslands: Problem = {
  slug: 'number-of-islands',
  title: {
    id: 'Jumlah Pulau',
    en: 'Number of Islands',
  },
  difficulty: 'medium',
  trackId: 'graphs',
  order: 2,
  functionName: 'numIslands',
  parameters: [{ name: 'grid', type: 'string[][]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Peta laut ditulis sebagai matriks 2D \`grid\` berisi karakter \`'1'\` (daratan) dan \`'0'\`
(air). Daratan dianggap menyatu menjadi **satu pulau** kalau sel-selnya bisa saling dicapai
dengan bergerak **horizontal atau vertikal** (bukan diagonal).

Hitung berapa banyak pulau yang ada di peta itu.

Ingat: sel diagonal tidak dihitung bertetangga. Papan seperti

\`\`\`
1 0 1
0 1 0
1 0 1
\`\`\`

memuat **lima** pulau, bukan satu.

Kalau grid kosong, jawabannya 0.

Batasan: \`0 <= grid.length, grid[0].length <= 300\`.`,
    en: `A sea chart is written as a 2D matrix \`grid\` holding the characters \`'1'\` (land) and \`'0'\`
(water). Land cells belong to the **same island** when one can be reached from the other by
moving **horizontally or vertically** (not diagonally).

Count how many islands the chart contains.

Note that diagonal cells are not neighbours. A board like

\`\`\`
1 0 1
0 1 0
1 0 1
\`\`\`

holds **five** islands, not one.

If the grid is empty, the answer is 0.

Constraints: \`0 <= grid.length, grid[0].length <= 300\`.`,
  },
  examples: [
    {
      input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: '3',
      explanation: {
        id: 'Satu pulau besar di kiri atas, satu sel tunggal di tengah, dan sepasang sel di kanan bawah.',
        en: 'One large island at the top left, a single cell in the middle, and a pair of cells at the bottom right.',
      },
    },
    {
      input: 'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]',
      output: '1',
      explanation: {
        id: 'Bentuk cincin: sel tengah menyambungkan seluruh daratan menjadi satu pulau.',
        en: 'A ring shape: the middle cell links all the land into a single island.',
      },
    },
    {
      input: 'grid = [["0"]]',
      output: '0',
      explanation: {
        id: 'Hanya ada air, jadi tidak ada pulau sama sekali.',
        en: 'There is only water, so there are no islands at all.',
      },
    },
  ],
  hints: {
    id: [
      'Satu pulau bisa terdiri dari ribuan sel. Bagaimana caramu menandai seluruh isi satu pulau supaya tidak dihitung berkali-kali?',
      'Iterasi seluruh sel. Setiap kali kamu menemukan `\'1\'` yang belum pernah dikunjungi, itu pasti pulau baru.',
      'Dari sel itu, telusuri semua `\'1\'` yang terhubung lewat empat arah. Setiap sel yang berhasil dikunjungi ditandai, lalu tidak pernah diproses lagi.',
      'Pakai stack eksplisit, bukan rekursi, supaya papan besar tidak menghabiskan kedalaman pemanggilan fungsi.',
    ],
    en: [
      'A single island can hold thousands of cells. How will you mark the whole island so it is never counted twice?',
      'Scan every cell. Each time you meet a `\'1\'` you have never visited, it is a brand new island.',
      'From that cell, walk every connected `\'1\'` in the four directions. Every cell you reach gets marked and is never processed again.',
      'Use an explicit stack rather than recursion, so a large grid cannot exhaust the call depth.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Soal ini adalah pencacahan **komponen terhubung** pada graf implisit: simpulnya sel daratan,
sisinya ketetanggaan 4 arah. Karena itu alatnya adalah penelusuran graf yang sudah kamu kenal.

1. Iterasi seluruh sel papan dari kiri atas ke kanan bawah.
2. Setiap kali menemukan sel bernilai \`'1'\` yang **belum dikunjungi**, itu awal pulau baru —
   tambahkan penghitung, lalu telusuri seluruh daratan yang terhubung dengannya.
3. Telusuri dengan stack: keluarkan satu sel, lalu dorong semua tetangganya yang sah, masih
   \`'1'\`, dan belum dikunjungi. Tandai setiap sel **saat ia didorong** supaya tidak ada sel yang
   masuk ke stack dua kali.
4. Setelah penelusuran selesai, semua sel pulau itu sudah ditandai, jadi loop luar tidak akan
   menghitungnya lagi.

Dua cara menandai sel yang sudah dikunjungi:

\`\`\`js
// Cara 1: matriks visited terpisah — input tidak berubah.
const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

// Cara 2: "tenggelamkan" pulau dengan mengubah '1' menjadi '0'.
grid[row][col] = '0';
\`\`\`

Referensi di soal ini memakai cara pertama supaya papan yang kamu terima tetap utuh. Cara kedua
lebih hemat memori dan lebih pendek, tetapi papan input ikut berubah.

## Kompleksitas

- Waktu: O(rows × cols) — setiap sel masuk dan keluar dari stack paling banyak sekali, dan setiap
  sel memeriksa 4 tetangga.
- Ruang: O(rows × cols) untuk matriks \`visited\` ditambah isi stack pada kasus terburuk.

## Kesalahan umum

- **Menghitung diagonal sebagai tetangga.** Ketentuan soalnya 4 arah. Papan catur \`'1'-'0'\`
  bergantian akan menghasilkan 5000 pulau pada papan 100×100, bukan 1.
- **Lupa menandai sebelum mendorong ke stack atau antrian.** Satu sel bisa didorong berkali-kali
  oleh tetangganya, sehingga penghitungnya membengkak atau stacknya meledak.
- **Memakai rekursi pada papan besar.** Grid 300×300 berisi daratan penuh bisa butuh 90.000
  pemanggilan bersarang; stack eksplisit aman untuk itu.
- **Salah batas**: memakai \`<=\` atau menukar baris dengan kolom pada papan yang bukan persegi.
- **Lupa menangani grid kosong** \`[]\`, yang membuat \`grid[0].length\` melempar error.
- Menempatkan penambahan penghitung di dalam penelusuran, sehingga satu pulau terhitung beberapa
  kali. Penghitung harus naik **sekali** per pulau, tepat ketika pulau itu pertama kali ditemukan.`,
    en: `## Approach

This is **connected-component counting** on an implicit graph: the nodes are land cells and the
edges are 4-way neighbourhoods. So the tool is a graph traversal you already know.

1. Scan every cell of the board from top-left to bottom-right.
2. Each time you meet a \`'1'\` cell that has **not been visited**, it starts a brand new island —
   bump the counter, then walk every piece of land connected to it.
3. Walk with a stack: pop one cell, then push all of its neighbours that are in bounds, still
   \`'1'\`, and unvisited. Mark each cell **when it is pushed** so no cell ever enters the stack
   twice.
4. When that walk finishes, the whole island is marked, so the outer loop will never count it
   again.

Two ways to record visited cells:

\`\`\`js
// Option 1: a separate visited matrix — the input stays untouched.
const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

// Option 2: "sink" the island by flipping '1' to '0'.
grid[row][col] = '0';
\`\`\`

The reference solution here uses the first option so the board you were given stays intact. The
second is shorter and uses less memory, but it mutates the input board.

## Complexity

- Time: O(rows × cols) — every cell is pushed and popped at most once, and each cell checks its
  4 neighbours.
- Space: O(rows × cols) for the \`visited\` matrix plus the stack contents in the worst case.

## Common mistakes

- **Treating diagonals as neighbours.** The problem says 4 directions. A checkerboard of
  alternating \`'1'\`/\`'0'\` gives 5000 islands on a 100×100 board, not 1.
- **Forgetting to mark before pushing** onto the stack or queue. A single cell can be pushed many
  times by its neighbours, inflating the counter or blowing up the stack.
- **Using recursion on a large board.** A fully land-covered 300×300 grid can need 90,000 nested
  calls; an explicit stack is safe for that.
- **Getting the bounds wrong**: using \`<=\`, or swapping row and column on a non-square board.
- **Not handling an empty grid** \`[]\`, which makes \`grid[0].length\` throw.
- Incrementing the counter inside the traversal, so one island gets counted several times. The
  counter must go up **once per island**, exactly when the island is first discovered.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function numIslands(grid) {
  // write your solution here
}
`,
      solution: `function numIslands(grid) {
  if (grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  let islands = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== '1' || visited[row][col]) {
        continue;
      }

      // A land cell we have never seen: a brand new island.
      islands++;
      visited[row][col] = true;
      const stack = [[row, col]];

      while (stack.length > 0) {
        const [r, c] = stack.pop();
        const neighbours = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];

        for (const [nr, nc] of neighbours) {
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
            continue;
          }

          if (visited[nr][nc] || grid[nr][nc] !== '1') {
            continue;
          }

          visited[nr][nc] = true; // mark before pushing
          stack.push([nr, nc]);
        }
      }
    }
  }

  return islands;
}
`,
    },
    {
      language: 'python',
      template: `def numIslands(grid):
    # write your solution here
    pass
`,
      solution: `def numIslands(grid):
    if not grid or not grid[0]:
        return 0

    rows = len(grid)
    cols = len(grid[0])
    visited = [[False] * cols for _ in range(rows)]
    islands = 0

    for row in range(rows):
        for col in range(cols):
            if grid[row][col] != '1' or visited[row][col]:
                continue

            # A land cell we have never seen: a brand new island.
            islands += 1
            visited[row][col] = True
            stack = [(row, col)]

            while stack:
                r, c = stack.pop()

                for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                    if nr < 0 or nr >= rows or nc < 0 or nc >= cols:
                        continue

                    if visited[nr][nc] or grid[nr][nc] != '1':
                        continue

                    visited[nr][nc] = True  # mark before pushing
                    stack.append((nr, nc))

    return islands
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']]],
      expected: 3,
    },
    {
      id: 'c2',
      input: [[['1', '1', '1'], ['0', '1', '0'], ['1', '1', '1']]],
      expected: 1,
    },
    {
      id: 'c3',
      input: [[['0']]],
      expected: 0,
    },
    {
      id: 'c4',
      input: [[]],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c5',
      input: [[['1', '0', '1'], ['0', '1', '0'], ['1', '0', '1']]],
      expected: 5,
      hidden: true,
    },
    {
      id: 'c6',
      input: [[['1', '1', '1', '1'], ['1', '1', '1', '1'], ['1', '1', '1', '1'], ['1', '1', '1', '1']]],
      expected: 1,
      hidden: true,
    },
    {
      id: 'c7',
      input: [[['1', '0', '1', '1', '0', '1']]],
      expected: 3,
      hidden: true,
    },
    {
      id: 'c8',
      input: [[['1'], ['0'], ['1'], ['1'], ['0'], ['1']]],
      expected: 3,
      hidden: true,
    },
    {
      id: 'c9',
      input: [
        Array.from({ length: 100 }, () => Array.from({ length: 100 }).fill('0')),
      ],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c10',
      input: [
        Array.from({ length: 100 }, (_, row) => Array.from({ length: 100 }, (_, col) => ((row + col) % 2 === 0 ? '1' : '0'))),
      ],
      expected: 5000,
      hidden: true,
    },
    {
      id: 'c11',
      input: [
        Array.from({ length: 100 }, () => Array.from({ length: 100 }).fill('1')),
      ],
      expected: 1,
      hidden: true,
    },
  ],
};
