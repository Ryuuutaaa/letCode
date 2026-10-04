import type { Problem } from '~/types/content';

export const lastStoneWeight: Problem = {
  slug: 'last-stone-weight',
  title: {
    id: 'Berat Batu Terakhir',
    en: 'Last Stone Weight',
  },
  difficulty: 'easy',
  trackId: 'heap',
  order: 1,
  functionName: 'lastStoneWeight',
  parameters: [{ name: 'stones', type: 'number[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Kamu punya sekumpulan batu; beratnya ada di array \`stones\`. Ulangi langkah berikut
sampai tersisa paling banyak satu batu:

1. Ambil **dua batu terberat** yang masih ada.
2. Kalau berat keduanya sama, keduanya hancur dan tidak menyisakan apa pun.
3. Kalau berbeda, batu yang lebih ringan hancur dan batu yang lebih berat berubah menjadi
   **selisih** berat keduanya.

Kembalikan berat batu yang tersisa di akhir, atau \`0\` kalau semua batu sudah hancur.

Semua berat adalah bilangan bulat positif. Kalau ada beberapa batu dengan berat sama,
mengambil yang mana pun memberi hasil yang sama.`,
    en: `You have a pile of stones; their weights are in the array \`stones\`. Repeat the
following until at most one stone is left:

1. Take the **two heaviest** stones still in the pile.
2. If their weights are equal, both are destroyed and nothing remains.
3. If they differ, the lighter stone is destroyed and the heavier stone becomes the
   **difference** of the two weights.

Return the weight of the stone left at the end, or \`0\` if every stone was destroyed.

All weights are positive integers. If several stones share the same weight, picking any of
them leads to the same result.`,
  },
  examples: [
    {
      input: 'stones = [2, 7, 4, 1, 8, 1]',
      output: '1',
      explanation: {
        id: 'Ambil 8 dan 7, sisanya 1. Kumpulan menjadi [2, 4, 1, 1, 1]. Lalu 4 dan 2 menyisakan 2, dilanjutkan 2 dan 1 menyisakan 1. Batu 1 dan 1 hancur bersama, dan tersisa satu batu berbobot 1.',
        en: 'Take 8 and 7, leaving 1. The pile becomes [2, 4, 1, 1, 1]. Then 4 and 2 leave 2, and 2 and 1 leave 1. The stones 1 and 1 destroy each other, leaving a single stone of weight 1.',
      },
    },
    {
      input: 'stones = [2, 2]',
      output: '0',
      explanation: {
        id: 'Kedua batu berbobot sama, jadi keduanya hancur dan tidak ada yang tersisa.',
        en: 'Both stones weigh the same, so they destroy each other and nothing is left.',
      },
    },
    {
      input: 'stones = [1]',
      output: '1',
      explanation: {
        id: 'Hanya ada satu batu dan tidak ada pasangan untuk dibandingkan, jadi batu itu langsung menjadi jawabannya.',
        en: 'There is only one stone and no partner to compare it with, so it is the answer as is.',
      },
    },
  ],
  hints: {
    id: [
      'Setiap langkah butuh dua elemen terbesar saat ini. Struktur data apa yang menyediakan elemen terbesar dengan cepat?',
      'Simpan batu di max-heap: ambil dua puncak, hitung selisihnya, lalu masukkan kembali selisih itu kalau lebih besar dari nol.',
      'JavaScript tidak punya priority queue bawaan. Karena jumlah batu sangat sedikit, mengurutkan array sekali lalu memasukkan selisih ke posisi yang benar sudah lebih dari cukup.',
    ],
    en: [
      'Every step needs the two largest elements right now. Which data structure hands you the largest one quickly?',
      'Keep the stones in a max-heap: pop two tops, compute the difference, and push it back when it is greater than zero.',
      'JavaScript has no built-in priority queue. Since the pile is tiny, sorting the array once and inserting the difference in the right spot is more than enough.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Yang diminta soal ini sesungguhnya sederhana: berulang kali ambil elemen terbesar. Ada dua
cara yang wajar.

**Versi heap (O(n log n)).**

1. Masukkan semua berat ke max-heap.
2. Selama isinya lebih dari satu: ambil dua puncak, sebut \`a\` dan \`b\`, hitung \`a - b\`,
   dan masukkan kembali selisihnya kalau nilainya lebih besar dari nol.
3. Jawabannya adalah satu-satunya elemen yang tersisa, atau \`0\` kalau heap kosong.

**Versi pengurutan (cukup untuk soal ini).**

1. Urutkan salinan array menaik, sehingga dua elemen terakhir adalah yang terberat.
2. \`pop\` dua elemen terakhir, hitung selisihnya, lalu sisipkan kembali ke posisi yang benar
   dengan pencarian biner.
3. Ulangi sampai tersisa paling banyak satu elemen.

## Kompleksitas

- Versi heap: O(n log n) waktu, O(n) ruang.
- Versi pengurutan: O(n²) waktu karena menyisipkan ke dalam array, O(n) ruang.

## Heap atau pengurutan?

Di JavaScript kamu harus menulis heap sendiri, sementara Python sudah punya \`heapq\`.
Karena batas soal ini sangat kecil (paling banyak 30 batu), **versi pengurutan lebih
pendek, lebih mudah dibaca, dan pasti benar** — solusi referensi JavaScript di bawah memakai
cara ini. Heap baru menang saat datanya besar atau mengalir; versi heap untuk Python ada di
bawah juga karena \`heapq\` membuatnya singkat.

Di Python ingat bahwa \`heapq\` adalah min-heap, jadi untuk max-heap simpan berat sebagai
bilangan **negatif**.

## Kesalahan yang sering terjadi

- Memakai min-heap untuk mencari yang terberat, sehingga yang diambil justru dua batu paling
  ringan.
- Lupa memasukkan kembali selisihnya ketika masih lebih besar dari nol (batu itu masih ada).
- Mengembalikan \`0\` karena heap sudah kosong, padahal masih ada satu batu tersisa.
- Mengubah array input langsung; bekerja pada salinan lebih aman dan tidak mengejutkan
  pemanggil fungsi.`,
    en: `## Approach

The problem really asks for one thing repeatedly: give me the largest element. There are two
reasonable ways to get it.

**Heap version (O(n log n)).**

1. Push every weight into a max-heap.
2. While it holds more than one element: pop two tops, call them \`a\` and \`b\`, compute
   \`a - b\`, and push the difference back when it is greater than zero.
3. The answer is the single remaining element, or \`0\` when the heap is empty.

**Sorting version (enough for this problem).**

1. Sort a copy of the array in ascending order, so the last two elements are the heaviest.
2. Pop the last two elements, compute the difference, and insert it back in the right spot
   with a binary search.
3. Repeat until at most one element is left.

## Complexity

- Heap version: O(n log n) time, O(n) space.
- Sorting version: O(n²) time because of the array insertion, O(n) space.

## Heap or sorting?

In JavaScript you have to write the heap yourself, while Python ships \`heapq\`. Since this
problem's bounds are tiny (fewer than 30 stones), the **sorting version is shorter, easier to
read, and guaranteed correct** — the JavaScript reference solution below uses it. A heap only
wins once the data is large or streaming; the heap version for Python is below too, because
\`heapq\` makes it short.

In Python, remember that \`heapq\` is a min-heap, so store weights as **negative** numbers to
get a max-heap.

## Common mistakes

- Using a min-heap when looking for the heaviest stone, so the two lightest are taken instead.
- Forgetting to push the difference back when it is greater than zero (that stone is still in
  the pile).
- Returning \`0\` because the heap is empty while one stone is still left.
- Mutating the input array in place; working on a copy is safer and does not surprise the
  caller.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function lastStoneWeight(stones) {
  // write your solution here
}
`,
      solution: `function lastStoneWeight(stones) {
  // Keep the pile sorted ascending, so the two heaviest stones sit at the end.
  const pile = [...stones].sort((a, b) => a - b);

  while (pile.length > 1) {
    const heaviest = pile.pop();
    const secondHeaviest = pile.pop();
    const leftover = heaviest - secondHeaviest;

    if (leftover === 0) {
      continue;
    }

    // Put the leftover stone back, keeping the pile sorted (binary search + insert).
    let low = 0;
    let high = pile.length;

    while (low < high) {
      const mid = (low + high) >> 1;
      if (pile[mid] < leftover) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    pile.splice(low, 0, leftover);
  }

  return pile.length === 1 ? pile[0] : 0;
}
`,
    },
    {
      language: 'python',
      template: `def lastStoneWeight(stones):
    # write your solution here
    pass
`,
      solution: `import heapq


def lastStoneWeight(stones):
    # heapq is a min-heap, so negate the weights to make it behave as a max-heap.
    heap = [-weight for weight in stones]
    heapq.heapify(heap)

    while len(heap) > 1:
        heaviest = -heapq.heappop(heap)
        second_heaviest = -heapq.heappop(heap)
        leftover = heaviest - second_heaviest

        if leftover > 0:
            heapq.heappush(heap, -leftover)

    return -heap[0] if heap else 0
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[2, 7, 4, 1, 8, 1]], expected: 1 },
    { id: 'c2', input: [[1]], expected: 1 },
    { id: 'c3', input: [[2, 2]], expected: 0, hidden: true },
    { id: 'c4', input: [[5, 5, 5, 5]], expected: 0, hidden: true },
    { id: 'c5', input: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]], expected: 1, hidden: true },
    { id: 'c6', input: [[31, 26, 33, 21, 40]], expected: 9, hidden: true },
    { id: 'c7', input: [[2, 2, 2, 2, 2, 2, 2]], expected: 2, hidden: true },
  ],
};
