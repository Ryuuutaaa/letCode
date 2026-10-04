import type { Problem } from '~/types/content';

export const kClosestPointsToOrigin: Problem = {
  slug: 'k-closest-points-to-origin',
  title: {
    id: 'K Titik Terdekat dari Titik Asal',
    en: 'K Closest Points to Origin',
  },
  difficulty: 'medium',
  trackId: 'heap',
  order: 4,
  functionName: 'kClosest',
  parameters: [
    { name: 'points', type: 'number[][]' },
    { name: 'k', type: 'number' },
  ],
  returnType: 'number[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array \`points\`, dengan \`points[i] = [xi, yi]\` adalah sebuah titik pada
bidang, dan bilangan bulat \`k\`. Kembalikan \`k\` titik yang paling dekat dengan titik asal
\`(0, 0)\`.

- Jarak diukur dengan jarak Euclidean biasa. Karena yang kamu butuhkan hanya perbandingan
  besar-kecil, cukup pakai **kuadrat jaraknya** \`x² + y²\` — akar kuadrat tidak perlu dihitung
  dan jawabannya sama.
- **Urutan titik pada hasil tidak penting.**
- Jawabannya dijamin unik: tidak ada nilai jarak yang seri tepat di batas \`k\`, jadi
  himpunan titik yang benar hanya ada satu.
- \`k\` selalu antara 1 dan panjang \`points\`, dan boleh ada titik yang sama persis lebih dari
  sekali.

Target: O(n log n) dari pengurutan sudah cukup; max-heap berukuran \`k\` memberi O(n log k)
dengan memori hanya O(k).`,
    en: `You are given an array \`points\`, where \`points[i] = [xi, yi]\` is a point in the plane,
and an integer \`k\`. Return the \`k\` points closest to the origin \`(0, 0)\`.

- Distances are plain Euclidean distances. Since all you need is a comparison, use the
  **squared distance** \`x² + y²\` — the square root is unnecessary and the result is the same.
- **The order of the points in the answer does not matter.**
- The answer is guaranteed to be unique: no distance ties sit exactly at the \`k\` boundary, so
  there is only one correct set of points.
- \`k\` is always between 1 and the length of \`points\`, and the same point may appear more
  than once.

Target: O(n log n) via sorting is enough; a max-heap of size \`k\` gives O(n log k) with only
O(k) memory.`,
  },
  examples: [
    {
      input: 'points = [[1, 3], [-2, 2]], k = 1',
      output: '[[-2, 2]]',
      explanation: {
        id: 'Jarak kuadrat [1, 3] adalah 10, sedangkan [-2, 2] hanya 8. Titik terdekat adalah [-2, 2], dan tanda minus tidak membuat jaraknya lebih jauh.',
        en: 'The squared distance of [1, 3] is 10, while [-2, 2] is only 8. The closest point is [-2, 2] — a negative coordinate does not push it further away.',
      },
    },
    {
      input: 'points = [[3, 3], [5, -1], [-2, 4]], k = 2',
      output: '[[3, 3], [-2, 4]]',
      explanation: {
        id: 'Jarak kuadratnya 18, 26, dan 20. Dua yang terkecil adalah 18 dan 20, jadi titik yang terpilih adalah [3, 3] dan [-2, 4].',
        en: 'The squared distances are 18, 26, and 20. The two smallest are 18 and 20, so the chosen points are [3, 3] and [-2, 4].',
      },
    },
    {
      input: 'points = [[1, 1]], k = 1',
      output: '[[1, 1]]',
      explanation: {
        id: 'Hanya ada satu titik dan satu yang diminta, jadi tidak ada pilihan lain.',
        en: 'There is a single point and only one is requested, so there is nothing to choose between.',
      },
    },
  ],
  hints: {
    id: [
      'Rumus jarak memakai akar kuadrat. Kalau kamu hanya membandingkan dua jarak, apakah akarnya benar-benar dibutuhkan?',
      'Bandingkan x² + y² saja. Urutannya sama persis, tapi kamu terhindar dari bilangan pecahan.',
      'Untuk k terkecil, simpan kandidat di max-heap berukuran k: akarnya adalah kandidat terburuk, jadi mudah diganti. Tapi mengurutkan seluruh titik dulu juga cukup dan lebih pendek.',
    ],
    en: [
      'The distance formula uses a square root. If you are only comparing two distances, is the square root really needed?',
      'Compare x² + y² instead. The ordering is identical, and you avoid fractions entirely.',
      'For the k smallest, keep candidates in a max-heap of size k: its root is the worst candidate, so replacing it is easy. Sorting every point first is also enough and shorter to write.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Kuncinya adalah menyadari bahwa soal ini hanya butuh **perbandingan**, bukan nilai jarak yang
sesungguhnya. Jadi hitung \`x² + y²\` sebagai kunci, bukan \`sqrt(x² + y²)\`.

**Versi pengurutan (solusi referensi).** Hitung kuadrat jarak setiap titik, urutkan menaik,
ambil \`k\` yang pertama. O(n log n), beberapa baris, dan tidak butuh struktur data tambahan.

**Versi heap (O(n log k)).** Karena yang dicari adalah \`k\` **terkecil**, simpan kandidat di
**max-heap** berukuran \`k\`. Akarnya adalah kandidat terburuk.

1. Untuk setiap titik: kalau heap belum penuh, \`push\`; kalau sudah penuh dan kuadrat jarak
   titik ini lebih kecil daripada \`peek()\`, \`pop\` lalu \`push\`.
2. Setelah semua titik diproses, isi heap adalah jawabannya.

Perhatikan cerminannya dengan top-K biasa: di sini yang dibuang adalah yang **terjauh**,
jadi puncaknya harus kandidat terjauh — yaitu max-heap.

## Kompleksitas

- Pengurutan: O(n log n) waktu, O(n) ruang.
- Max-heap berukuran \`k\`: O(n log k) waktu, O(k) ruang.

## Kenapa pengurutan sering sudah cukup

Selisih O(n log k) dengan O(n log n) baru berarti kalau \`n\` besar dan \`k\` kecil. Untuk data
berukuran sedang, mengurutkan berarti satu baris kode yang jelas, sementara heap menuntut kamu
menulis priority queue sendiri di JavaScript. Yang penting di wawancara: sebutkan kedua versi
beserta biayanya, lalu pilih berdasarkan nilai \`k\` yang masuk akal untuk soal itu.

Tip lain: bandingkan kuadrat jarak dengan pembanding **integer**. Tidak ada risiko pembulatan
seperti pada bilangan pecahan, dan ini juga menghindari perhitungan akar yang tak perlu.

## Kesalahan yang sering terjadi

- Memakai **min-heap** untuk "k terkecil" — yang benar adalah max-heap, supaya kandidat
  terjauh yang dibuang.
- Lupa \`pop\` sebelum \`push\` saat heap sudah penuh, sehingga ukuran heap membengkak dan
  jawabannya jadi \`k\` + 1 titik atau lebih.
- Mengurutkan tanpa komparator angka (\`points.sort()\`) — JavaScript mengubah setiap titik
  menjadi string \`"1,3"\`, sehingga urutannya berdasarkan teks, bukan jarak.
- Mengembalikan jaraknya, bukan titiknya.
- Menghitung jarak bertipe pecahan lalu membandingkannya dengan toleransi. Kuadrat jarak
  membuat semuanya bilangan bulat dan perbandingannya eksak.`,
    en: `## Approach

The key insight is that this problem only needs **comparisons**, not actual distances. So use
\`x² + y²\` as the key, not \`sqrt(x² + y²)\`.

**Sorting version (the reference solution).** Compute the squared distance of every point, sort
ascending, and take the first \`k\`. O(n log n), a few lines, no extra data structure.

**Heap version (O(n log k)).** Since we want the \`k\` **smallest**, keep the candidates in a
**max-heap** of size \`k\`. Its root is the worst candidate.

1. For each point: \`push\` while the heap is not full; when it is full and this point's squared
   distance is smaller than \`peek()\`, \`pop\` and then \`push\`.
2. Once every point has been processed, the heap holds the answer.

Notice the mirror image of ordinary top-K: here the element that leaves is the **farthest**,
so the root must be the farthest candidate — a max-heap.

## Complexity

- Sorting: O(n log n) time, O(n) space.
- Max-heap of size \`k\`: O(n log k) time, O(k) space.

## Why sorting is often good enough

The gap between O(n log k) and O(n log n) only matters when \`n\` is large and \`k\` is small.
For moderate input sizes, sorting is one clear line of code, while a heap forces you to write a
priority queue in JavaScript. What matters in an interview: state both versions with their
costs, then choose based on what \`k\` plausibly looks like for that problem.

Another tip: compare squared distances as **integers**. There is no rounding risk as with
floating point, and it also avoids an unnecessary square root.

## Common mistakes

- Using a **min-heap** for "k smallest" — a max-heap is correct, so the farthest candidate is
  the one evicted.
- Forgetting to \`pop\` before \`push\` when the heap is full, so the heap keeps growing and the
  answer ends up with \`k\` + 1 points or more.
- Sorting without a numeric comparator (\`points.sort()\`) — JavaScript stringifies each point
  into \`"1,3"\`, so the order follows text, not distance.
- Returning the distances instead of the points.
- Computing floating-point distances and then comparing them with a tolerance. Squared
  distances keep everything integral and comparisons exact.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function kClosest(points, k) {
  // write your solution here
}
`,
      solution: `function kClosest(points, k) {
  // Only the ordering of the squared distances matters, so never take a square root.
  const squaredDistance = point => point[0] * point[0] + point[1] * point[1];

  // Sorting is O(n log n) and is the version least likely to hide a bug.
  return [...points]
    .sort((a, b) => squaredDistance(a) - squaredDistance(b))
    .slice(0, k)
    .map(point => [point[0], point[1]]);
}
`,
    },
    {
      language: 'python',
      template: `def kClosest(points, k):
    # write your solution here
    pass
`,
      solution: `import heapq


def kClosest(points, k):
    def squared_distance(point):
        x, y = point
        return x * x + y * y

    # nsmallest keeps a heap of size k internally, so this stays O(n log k).
    return [list(point) for point in heapq.nsmallest(k, points, key=squared_distance)]
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[[1, 3], [-2, 2]], 1],
      expected: [[-2, 2]],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c2',
      input: [[[3, 3], [5, -1], [-2, 4]], 2],
      expected: [[3, 3], [-2, 4]],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c3',
      input: [[[1, 1]], 1],
      expected: [[1, 1]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c4',
      input: [[[0, 0]], 1],
      expected: [[0, 0]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c5',
      input: [[[-5, -5], [5, 5], [1, 1]], 1],
      expected: [[1, 1]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c6',
      input: [[[1000000, 1000000], [-1, -1], [2, 3]], 2],
      expected: [[-1, -1], [2, 3]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c7',
      input: [[[2, 2], [2, 2], [3, 3]], 2],
      expected: [[2, 2], [2, 2]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
  ],
};
