import type { Problem } from '~/types/content';

export const largestRectangleInHistogram: Problem = {
  slug: 'largest-rectangle-in-histogram',
  title: {
    id: 'Largest Rectangle in Histogram',
    en: 'Largest Rectangle in Histogram',
  },
  difficulty: 'hard',
  trackId: 'stack',
  order: 5,
  functionName: 'largestRectangleArea',
  parameters: [{ name: 'heights', type: 'number[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat non-negatif \`heights\`. Bayangkan sederet batang
berdiri berjajar, masing-masing selebar 1 satuan, dengan \`heights[i]\` sebagai tingginya.
Batang-batang yang berdekatan saling menempel tanpa celah.

Kembalikan **luas persegi panjang terbesar** yang seluruhnya berada di dalam histogram itu.
Sisi-sisinya harus sejajar dengan sumbu: lebar mengikuti arah deretan batang, tinggi mengikuti
tinggi batang. Artinya, sebuah persegi panjang jadi ditentukan oleh sebuah rentang batang yang
kontinu dan dibatasi tinggi batang **terendah** di dalam rentang itu:

\`\`\`
luas = (tinggi minimum dalam rentang) * (jumlah batang dalam rentang)
\`\`\`

Contoh: pada \`[2,1,5,6,2,3]\`, rentang batang ke-2 sampai ke-3 (\`5\` dan \`6\`) punya tinggi
minimum 5 dan lebar 2, sehingga luasnya 10.

Target: **O(n)**.`,
    en: `You are given an array of non-negative integers \`heights\`. Picture a row of adjacent bars,
each one unit wide, with \`heights[i]\` as its height. Neighbouring bars touch with no gap
between them.

Return the **area of the largest rectangle** that fits entirely inside that histogram. Its
sides are axis-aligned: the width runs along the row of bars, the height follows the bar
heights. That means a rectangle is determined by a contiguous range of bars and limited by the
**shortest** bar inside that range:

\`\`\`
area = (minimum height in the range) * (number of bars in the range)
\`\`\`

For example, in \`[2,1,5,6,2,3]\` the range of bars 2 through 3 (\`5\` and \`6\`) has a minimum
height of 5 and a width of 2, so its area is 10.

Target: **O(n)**.`,
  },
  examples: [
    {
      input: 'heights = [2,1,5,6,2,3]',
      output: '10',
      explanation: {
        id: 'Rentang `5, 6` memberi 5 × 2 = 10; ini yang terbesar. Rentang `2,1,5,6,2,3` seluruhnya hanya setinggi 1, dan rentang `5,6,2` hanya setinggi 2 karena dibatasi batang 2.',
        en: 'The range `5, 6` gives 5 × 2 = 10, which is the largest. The whole array is limited to height 1, and the range `5,6,2` is limited to height 2 by that last bar.',
      },
    },
    {
      input: 'heights = [2,4]',
      output: '4',
      explanation: {
        id: 'Dua pilihan: persegi panjang setinggi 4 dan lebar 1 (luas 4), atau setinggi 2 dan lebar 2 (luas 4). Keduanya sama-sama menghasilkan 4.',
        en: 'Two options: a rectangle of height 4 and width 1 (area 4), or height 2 and width 2 (area 4). Both come out to 4.',
      },
    },
    {
      input: 'heights = [6,2,5,4,5,1,6]',
      output: '12',
      explanation: {
        id: 'Kandidat terbaik adalah batang `5,4,5` dengan tinggi minimum 4 dan lebar 3, sehingga luasnya 12.',
        en: 'The best candidate is the run `5,4,5` with minimum height 4 and width 3, giving an area of 12.',
      },
    },
  ],
  hints: {
    id: [
      'Kalau sebuah batang dipakai sebagai penentu tinggi persegi panjang, seberapa lebar rentang yang boleh dipakai?',
      'Selebar mungkin, sampai bertemu batang yang **lebih rendah** di kiri dan di kanan. Jadi pertanyaannya berubah menjadi: untuk setiap batang, di mana batang lebih rendah terdekat di kiri dan kanannya?',
      'Itu pertanyaan monotonik stack. Simpan indeks dengan tinggi **menaik**. Saat batang yang lebih rendah datang, batang-batang di puncak baru saja menemukan batas kanannya, dan batas kirinya adalah elemen berikutnya di stack.',
      'Tambahkan satu sentinel bernilai 0 di akhir array supaya semua batang selesai dihitung tanpa kode khusus. Kalau stack menjadi kosong setelah pop, berarti batang itu adalah yang terendah dari awal array, sehingga lebarnya sama dengan indeks saat ini.',
    ],
    en: [
      'If a bar sets the height of the rectangle, how wide may the range be?',
      'As wide as possible, until a **lower** bar appears on the left and on the right. So the question becomes: for every bar, where is the nearest lower bar on each side?',
      'That is a monotonic stack question. Store indices with **increasing** heights. When a shorter bar arrives, the bars on top just found their right bound, and their left bound is the next element down the stack.',
      'Append one sentinel of value 0 at the end so every bar is settled without special cases. If the stack becomes empty after a pop, that bar is the shortest from the start of the array, so its width is the current index.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Setiap persegi panjang yang mungkin punya satu batang dengan tinggi terkecil. Kalau kita tahu
batang mana itu, lebarnya sudah pasti: selama mungkin ke kiri dan ke kanan sampai bertemu
batang yang lebih pendek. Jadi soal ini sama dengan mencari, untuk setiap \`i\`, batas kiri dan
kanan tempat \`heights[i]\` masih menjadi minimum.

Brute force-nya O(n²). Monotonik stack menurunkannya menjadi O(n).

Simpan indeks di stack dengan invarian: tinggi pada indeks-indeks itu **menaik** dari dasar ke
puncak. Untuk setiap batang baru \`i\`:

1. Selama stack tidak kosong dan \`heights[stack.top] > heights[i]\`, pop indeks \`j\`. Batang
   \`j\` baru saja menemukan batas kanannya, yaitu \`i\`. Batas kirinya adalah elemen berikutnya
   di stack (indeks pertama di kiri yang tingginya lebih kecil), atau \`-1\` kalau stack kosong.
   Lebarnya \`i - kiri - 1\`, kalau stack kosong berarti \`i\`.
2. Hitung \`heights[j] * lebar\` dan perbarui jawaban.
3. Push \`i\`.

Supaya batang yang tersisa di akhir tidak tertinggal, tambahkan **sentinel** bernilai \`0\` di
ujung array. Sentinel lebih kecil dari semua tinggi, jadi ia menguras seluruh stack tanpa kode
tambahan. Perhatikan bahwa batang setinggi 0 tidak pernah menyumbang luas karena hasilnya 0.

Cara membaca invariant-nya: elemen yang tetap tinggal di stack saat \`j\` di-pop adalah batang
pertama di sebelah kiri dengan tinggi **lebih kecil** dari \`heights[j]\`, karena semua batang
yang lebih tinggi sudah dibuang sebelumnya.

## Kompleksitas

- Waktu: O(n) — setiap indeks di-push sekali dan di-pop paling banyak sekali. Loop di dalam
  loop tidak membuatnya O(n²).
- Ruang: O(n) — stack bisa memuat seluruh indeks pada input yang menaik, misalnya
  \`[1,2,3,...,n]\`.

## Kesalahan umum

- **Lupa sentinel.** Tanpa batang penutup, indeks yang tersisa di stack tidak pernah dihitung,
  sehingga jawaban terlalu kecil pada input seperti \`[2,4]\`.
- **Lebar yang salah.** Batas kiri bukan \`stack.top\` itu sendiri, melainkan elemen berikutnya
  setelah pop. Karena itu lebarnya \`i - stack.top - 1\`, bukan \`i - stack.top\`.
- **Tidak menangani stack kosong setelah pop.** Saat stack kosong, batang yang di-pop adalah
  minimum dari awal array, jadi lebarnya adalah \`i\`, bukan \`0\`.
- **Tinggi kembar.** Perbandingan \`>\` yang ketat membuat batang yang tingginya sama tetap
  berada di stack, sehingga rentangnya melebar ke kiri dan luasnya tetap benar. Kalau kamu
  memilih \`>=\`, rumus lebarnya harus konsisten dengan pilihan itu — yang berbahaya adalah
  memakai satu aturan untuk pop dan aturan lain untuk menghitung lebar.
- **Menganggap tinggi 0 sebagai kasus khusus.** Tidak perlu; sentinel dengan nilai 0 sudah
  menanganinya secara alami.`,
    en: `## Approach

Every possible rectangle has one bar with the smallest height. Once you know which bar that is,
the width is forced: extend as far as possible left and right until a shorter bar appears. So
this problem is really about finding, for each \`i\`, the left and right bounds within which
\`heights[i]\` is still the minimum.

The brute-force version is O(n²). A monotonic stack brings it down to O(n).

Keep indices on a stack with this invariant: the heights at those indices are **increasing**
from bottom to top. For each new bar \`i\`:

1. While the stack is not empty and \`heights[stack.top] > heights[i]\`, pop index \`j\`. Bar
   \`j\` just found its right bound, which is \`i\`. Its left bound is the next element down the
   stack (the first index on the left with a smaller height), or \`-1\` when the stack is empty.
   The width is \`i - left - 1\`, which becomes \`i\` when the stack is empty.
2. Update the answer with \`heights[j] * width\`.
3. Push \`i\`.

So that the bars still on the stack at the end are not left behind, append a **sentinel** of
value \`0\`. The sentinel is shorter than everything, so it drains the whole stack with no extra
code. Note that a bar of height 0 never contributes area anyway, since its product is 0.

How to read the invariant: the element still on the stack when \`j\` is popped is the first bar
to its left whose height is **smaller** than \`heights[j]\`, because every taller bar was already
discarded.

## Complexity

- Time: O(n) — every index is pushed once and popped at most once. The nested loop does not
  make it O(n²).
- Space: O(n) — the stack can hold every index on an increasing input such as
  \`[1,2,3,...,n]\`.

## Common mistakes

- **Forgetting the sentinel.** Without a closing bar, indices left on the stack are never
  settled, so the answer comes out too small on inputs like \`[2,4]\`.
- **Wrong width.** The left bound is not \`stack.top\` itself, but the element below it after the
  pop. Hence the width is \`i - stack.top - 1\`, not \`i - stack.top\`.
- **Not handling an empty stack after the pop.** When the stack is empty, the popped bar is the
  minimum from the start of the array, so the width is \`i\`, not \`0\`.
- **Equal heights.** A strict \`>\` keeps an equal-height bar on the stack, which widens the span
  to the left and still gives the right area. If you choose \`>=\` instead, the width formula must
  be consistent with that choice — the real danger is using one rule to pop and another to
  compute the width.
- **Treating height 0 as a special case.** It needs none; a sentinel of value 0 handles it
  naturally.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function largestRectangleArea(heights) {
  // write your solution here
}
`,
      solution: `function largestRectangleArea(heights) {
  const bars = [...heights, 0];
  const stack = [];
  let best = 0;

  for (let i = 0; i < bars.length; i++) {
    while (stack.length > 0 && bars[stack[stack.length - 1]] > bars[i]) {
      const height = bars[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      best = Math.max(best, height * width);
    }

    stack.push(i);
  }

  return best;
}
`,
    },
    {
      language: 'python',
      template: `def largestRectangleArea(heights):
    # write your solution here
    pass
`,
      solution: `def largestRectangleArea(heights):
    bars = list(heights) + [0]
    stack = []
    best = 0

    for i, bar in enumerate(bars):
        while stack and bars[stack[-1]] > bar:
            height = bars[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            best = max(best, height * width)

        stack.append(i)

    return best
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[2, 1, 5, 6, 2, 3]], expected: 10 },
    { id: 'c2', input: [[2, 4]], expected: 4 },
    { id: 'c3', input: [[]], expected: 0, hidden: true },
    { id: 'c4', input: [[0]], expected: 0, hidden: true },
    { id: 'c5', input: [[1]], expected: 1, hidden: true },
    { id: 'c6', input: [[5, 5, 5]], expected: 15, hidden: true },
    { id: 'c7', input: [[6, 2, 5, 4, 5, 1, 6]], expected: 12, hidden: true },
    { id: 'c8', input: [[4, 2, 0, 3, 2, 5]], expected: 6, hidden: true },
    {
      id: 'c9',
      input: [[10000, 10000, 10000]],
      expected: 30000,
      hidden: true,
    },
  ],
};
