import type { Problem } from '~/types/content';

export const rottingOranges: Problem = {
  slug: 'rotting-oranges',
  title: {
    id: 'Jeruk Membusuk',
    en: 'Rotting Oranges',
  },
  difficulty: 'medium',
  trackId: 'graphs',
  order: 4,
  functionName: 'orangesRotting',
  parameters: [{ name: 'grid', type: 'number[][]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Sebuah kotak jeruk ditulis sebagai matriks \`grid\`:

- \`0\` = sel kosong,
- \`1\` = jeruk segar,
- \`2\` = jeruk busuk.

Setiap **menit**, setiap jeruk busuk membuat semua jeruk segar yang bersentuhan **horizontal atau
vertikal** dengannya ikut membusuk. Jeruk yang membusuk pada menit yang sama ikut menularkan pada
menit berikutnya, jadi penyebarannya bergerak seperti gelombang.

Kembalikan berapa menit yang dibutuhkan sampai tidak ada lagi jeruk segar di dalam kotak.

- Kalau masih ada jeruk segar yang tidak mungkin terjangkau, kembalikan \`-1\`.
- Kalau sejak awal tidak ada jeruk segar — termasuk kotak yang kosong — kembalikan \`0\`.

Batasan: \`0 <= grid.length, grid[0].length <= 100\`.`,
    en: `A crate of oranges is written as a matrix \`grid\`:

- \`0\` = an empty cell,
- \`1\` = a fresh orange,
- \`2\` = a rotten orange.

Every **minute**, each rotten orange makes every fresh orange that touches it **horizontally or
vertically** rot as well. Oranges that rot during the same minute keep spreading on the following
minute, so the rot travels like a wave.

Return how many minutes pass until no fresh orange is left in the crate.

- If some fresh orange can never be reached, return \`-1\`.
- If there is no fresh orange from the start — including an empty crate — return \`0\`.

Constraints: \`0 <= grid.length, grid[0].length <= 100\`.`,
  },
  examples: [
    {
      input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
      output: '4',
      explanation: {
        id: 'Gelombangnya: menit 1 membusukkan dua jeruk pertama, menit 2 dan 3 menyebar lebih jauh, menit 4 menghabiskan sisa jeruk terakhir di sudut kanan bawah.',
        en: 'The wave: minute 1 rots the first two oranges, minutes 2 and 3 push further, and minute 4 finishes the last orange in the bottom-right corner.',
      },
    },
    {
      input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]',
      output: '-1',
      explanation: {
        id: 'Jeruk di kiri bawah terkurung dua sel kosong, jadi ia tidak akan pernah bisa dicapai.',
        en: 'The orange at the bottom left is walled in by empty cells, so it can never be reached.',
      },
    },
    {
      input: 'grid = [[0,2]]',
      output: '0',
      explanation: {
        id: 'Tidak ada jeruk segar sama sekali, jadi tidak ada menit yang perlu dihitung.',
        en: 'There is no fresh orange at all, so there is no minute to count.',
      },
    },
  ],
  hints: {
    id: [
      'Penyebaran ini melebar satu lapis setiap menit. Struktur data apa yang secara alami bekerja per lapisan?',
      'Pakai BFS. Masukkan **semua** jeruk busuk ke dalam antrian di awal — merekalah sumber penyebaran pada menit ke-0.',
      'Hitung jumlah jeruk segar yang tersisa. Setiap putaran BFS memproses tepat satu lapisan, dan satu lapisan berarti satu menit.',
      'Ada dua kasus batas yang mudah terlewat: tidak ada jeruk segar sejak awal (jawabannya 0), dan setelah BFS masih ada jeruk segar (jawabannya -1).',
    ],
    en: [
      'This rot widens one layer per minute. Which data structure naturally works layer by layer?',
      'Use BFS. Push **every** rotten orange into the queue up front — they are the sources at minute 0.',
      'Track how many fresh oranges are left. Each BFS round processes exactly one layer, and one layer means one minute.',
      'Two edge cases are easy to miss: no fresh orange from the start (answer 0), and fresh oranges still left after BFS (answer -1).',
    ],
  },
  explanation: {
    id: `## Pendekatan

Penyebaran ini adalah **BFS multi-sumber**. Kata kuncinya "setiap menit": semua jeruk yang busuk
pada waktu yang sama adalah satu lapisan, dan satu lapisan berarti satu menit. DFS tidak bisa
menjawab "berapa menit" — ia hanya tahu apakah sebuah jeruk bisa dicapai, bukan seberapa cepat.

1. Pindai seluruh papan. Kumpulkan **semua** sel bernilai \`2\` ke dalam antrian, dan hitung
   berapa banyak sel bernilai \`1\` (\`fresh\`).
2. Kalau \`fresh === 0\`, jawabannya \`0\`.
3. Selama antrian belum habis dan masih ada jeruk segar, proses **satu lapisan penuh**: simpan
   \`size = queue.length - head\` sebelum putaran, naikkan \`minutes\`, lalu proses tepat \`size\`
   jeruk. Setiap tetangga yang segar diubah menjadi busuk: kurangi \`fresh\`, lalu dorong sel itu
   ke antrian sebagai bagian dari lapisan berikutnya.
4. Setelah loop, periksa \`fresh\`. Kalau masih ada sisa, sebagian jeruk tak terjangkau →
   \`-1\`. Kalau habis, jawabannya \`minutes\`.

\`\`\`js
while (head < queue.length && fresh > 0) {
  const size = queue.length - head; // satu lapisan = satu menit
  minutes++;

  for (let i = 0; i < size; i++) {
    const [r, c] = queue[head];
    head++;
    // tetangga yang masih segar: tandai, kurangi fresh, dorong
  }
}

return fresh === 0 ? minutes : -1;
\`\`\`

Karena semua sumber dimasukkan sekaligus di awal, satu putaran BFS memang mewakili satu menit
yang sama untuk seluruh papan. Inilah yang membedakannya dari BFS satu sumber biasa.

## Kompleksitas

- Waktu: O(rows × cols) — setiap sel masuk ke antrian paling banyak sekali dan memeriksa 4
  tetangganya.
- Ruang: O(rows × cols) untuk antrian dan matriks penanda.

## Kesalahan umum

- **Menghitung menit per jeruk, bukan per lapisan.** Kalau \`minutes\` naik setiap kali satu jeruk
  diproses, jawabannya jauh lebih besar dari yang seharusnya. Ukuran lapisan harus dikunci di awal
  putaran.
- **Memasukkan hanya satu jeruk busuk ke antrian.** Padahal semua jeruk busuk adalah sumber yang
  menyebar **bersamaan**. BFS satu sumber akan melebihkan jumlah menit.
- **Lupa \`-1\`.** BFS selesai bukan berarti semua jeruk busuk; sebagian bisa terkurung sel kosong.
- **Lupa kasus \`fresh === 0\`.** Tanpa itu, papan seperti \`[[0,2]]\` mengembalikan \`1\`, bukan \`0\`.
- **Memakai \`queue.shift()\`.** Di JS, \`shift()\` memindahkan seluruh isi array setiap pemanggilan,
  sehingga BFS-nya menjadi O(V²). Pakai indeks \`head\` seperti contoh di atas.
- **Mengubah nilai papan sebagai penanda kunjungan** lalu lupa bahwa papan input ikut berubah.
  Referensi di sini menyimpan penanda di matriks terpisah supaya papan tetap utuh.`,
    en: `## Approach

This spread is a **multi-source BFS**. The key phrase is "every minute": all oranges that rot at the
same time form one layer, and one layer means one minute. DFS cannot answer "how many minutes" — it
knows whether an orange is reachable, not how fast it rots.

1. Scan the whole board. Collect **every** cell holding \`2\` into the queue, and count how many cells
   hold \`1\` (\`fresh\`).
2. If \`fresh === 0\`, the answer is \`0\`.
3. While the queue is not empty and fresh oranges remain, process **one whole layer**: store
   \`size = queue.length - head\` before the round, advance \`minutes\`, then process exactly \`size\`
   oranges. Every fresh neighbour turns rotten: decrement \`fresh\`, then push that cell into the
   queue as part of the next layer.
4. After the loop, check \`fresh\`. If any are left, some oranges were unreachable → \`-1\`. If none are
   left, the answer is \`minutes\`.

\`\`\`js
while (head < queue.length && fresh > 0) {
  const size = queue.length - head; // one layer = one minute
  minutes++;

  for (let i = 0; i < size; i++) {
    const [r, c] = queue[head];
    head++;
    // fresh neighbours: mark them, decrement fresh, push them
  }
}

return fresh === 0 ? minutes : -1;
\`\`\`

Because every source enters the queue up front, one BFS round really does represent the same
minute across the whole board. That is what separates this from ordinary single-source BFS.

## Complexity

- Time: O(rows × cols) — every cell enters the queue at most once and checks its 4 neighbours.
- Space: O(rows × cols) for the queue and the marker matrix.

## Common mistakes

- **Counting minutes per orange instead of per layer.** If \`minutes\` advances once per processed
  orange, the answer comes out far too large. The layer size must be locked in before the round.
- **Pushing only one rotten orange into the queue.** Every rotten orange is a source spreading
  **simultaneously**. A single-source BFS overstates the number of minutes.
- **Forgetting \`-1\`.** BFS finishing does not mean every orange rotted; some may be walled in by
  empty cells.
- **Forgetting the \`fresh === 0\` case.** Without it, a board like \`[[0,2]]\` returns \`1\` instead of \`0\`.
- **Using \`queue.shift()\`.** In JS, \`shift()\` moves the whole array on every call, turning the BFS
  into O(V²). Use a \`head\` index as in the snippet above.
- **Marking visits by rewriting the board**, then forgetting the input changes with it. The
  reference solution keeps its markers in a separate matrix so the board stays intact.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function orangesRotting(grid) {
  // write your solution here
}
`,
      solution: `function orangesRotting(grid) {
  if (grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const rotten = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const queue = [];
  let fresh = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 2) {
        rotten[row][col] = true;
        queue.push([row, col]); // every rotten orange is a source
      } else if (grid[row][col] === 1) {
        fresh++;
      }
    }
  }

  if (fresh === 0) {
    return 0;
  }

  let head = 0;
  let minutes = 0;

  while (head < queue.length && fresh > 0) {
    const size = queue.length - head; // one whole layer = one minute
    minutes++;

    for (let i = 0; i < size; i++) {
      const [r, c] = queue[head];
      head++;

      const neighbours = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];

      for (const [nr, nc] of neighbours) {
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
          continue;
        }

        if (grid[nr][nc] !== 1 || rotten[nr][nc]) {
          continue;
        }

        rotten[nr][nc] = true;
        fresh--;
        queue.push([nr, nc]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}
`,
    },
    {
      language: 'python',
      template: `def orangesRotting(grid):
    # write your solution here
    pass
`,
      solution: `from collections import deque


def orangesRotting(grid):
    if not grid or not grid[0]:
        return 0

    rows = len(grid)
    cols = len(grid[0])
    rotten = [[False] * cols for _ in range(rows)]
    queue = deque()
    fresh = 0

    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 2:
                rotten[row][col] = True
                queue.append((row, col))  # every rotten orange is a source
            elif grid[row][col] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    minutes = 0

    while queue and fresh > 0:
        size = len(queue)  # one whole layer = one minute
        minutes += 1

        for _ in range(size):
            r, c = queue.popleft()

            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if nr < 0 or nr >= rows or nc < 0 or nc >= cols:
                    continue

                if grid[nr][nc] != 1 or rotten[nr][nc]:
                    continue

                rotten[nr][nc] = True
                fresh -= 1
                queue.append((nr, nc))

    return minutes if fresh == 0 else -1
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]],
      expected: 4,
    },
    {
      id: 'c2',
      input: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]],
      expected: -1,
    },
    {
      id: 'c3',
      input: [[[0, 2]]],
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
      input: [[[]]],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c6',
      input: [[[1]]],
      expected: -1,
      hidden: true,
    },
    {
      id: 'c7',
      input: [[[2]]],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c8',
      input: [[[2, 1], [1, 1]]],
      expected: 2,
      hidden: true,
    },
    {
      id: 'c9',
      input: [[[2, 0, 2], [1, 1, 1]]],
      expected: 2,
      hidden: true,
    },
    {
      id: 'c10',
      input: [[[1, 2, 0, 1]]],
      expected: -1,
      hidden: true,
    },
    {
      id: 'c11',
      input: [
        Array.from({ length: 100 }, (_, row) => Array.from({ length: 100 }, (_, col) => (
          row === 0 && col === 0 ? 2 : 1
        ))),
      ],
      expected: 198,
      hidden: true,
    },
    {
      id: 'c12',
      input: [
        Array.from({ length: 100 }, () => Array.from({ length: 100 }).fill(2)),
      ],
      expected: 0,
      hidden: true,
    },
  ],
};
