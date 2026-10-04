import type { Problem } from '~/types/content';

export const kthLargestElementInAnArray: Problem = {
  slug: 'kth-largest-element-in-an-array',
  title: {
    id: 'Elemen Terbesar ke-K',
    en: 'Kth Largest Element in an Array',
  },
  difficulty: 'medium',
  trackId: 'heap',
  order: 3,
  functionName: 'findKthLargest',
  parameters: [
    { name: 'nums', type: 'number[]' },
    { name: 'k', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\` dan bilangan bulat \`k\`. Kembalikan
**elemen terbesar ke-\`k\`** menurut urutan menurun.

Yang dihitung adalah **posisi**, bukan nilai unik. Pada \`nums = [7, 7, 7]\` dengan \`k = 2\`,
jawabannya tetap \`7\`, karena urutan menurunya adalah \`[7, 7, 7]\` dan posisi kedua juga 7.

\`k\` selalu bernilai antara 1 dan panjang \`nums\`, dan \`nums\` boleh memuat nilai negatif
serta duplikat.

Tantangannya: jangan mengurutkan seluruh array kalau tidak perlu. Min-heap berukuran \`k\`
memberi O(n log k); quickselect memberi rata-rata O(n). Solusi O(n log n) yang mengurutkan
semua elemen tetap diterima — untuk data berukuran sedang justru itu yang paling mudah
ditulis dengan benar.`,
    en: `You are given an array of integers \`nums\` and an integer \`k\`. Return the **k-th largest
element** in descending order.

What counts is the **position**, not distinct values. For \`nums = [7, 7, 7]\` and \`k = 2\`
the answer is still \`7\`, because the descending order is \`[7, 7, 7]\` and the second
position also holds 7.

\`k\` is always between 1 and the length of \`nums\`, and \`nums\` may contain negative values
and duplicates.

The challenge: do not sort the whole array when you do not have to. A min-heap of size \`k\`
gives O(n log k); quickselect gives O(n) on average. An O(n log n) solution that sorts every
element is still accepted — for moderate input sizes it is the easiest version to get right.`,
  },
  examples: [
    {
      input: 'nums = [3, 2, 1, 5, 6, 4], k = 2',
      output: '5',
      explanation: {
        id: 'Urutan menurunya adalah [6, 5, 4, 3, 2, 1], jadi elemen terbesar kedua adalah 5.',
        en: 'The descending order is [6, 5, 4, 3, 2, 1], so the second largest element is 5.',
      },
    },
    {
      input: 'nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4',
      output: '4',
      explanation: {
        id: 'Urutan menurunya adalah [6, 5, 5, 4, 3, 3, 2, 2, 1]. Posisi keempat ditempati oleh 4.',
        en: 'The descending order is [6, 5, 5, 4, 3, 3, 2, 2, 1]. Position four holds 4.',
      },
    },
    {
      input: 'nums = [7, 7, 7], k = 2',
      output: '7',
      explanation: {
        id: 'Semua elemen sama, jadi berapa pun k, jawabannya 7. Ini contoh bahwa yang dihitung adalah posisi, bukan nilai unik.',
        en: 'Every element is equal, so any k gives 7. This shows that positions are counted, not distinct values.',
      },
    },
  ],
  hints: {
    id: [
      'Kalau kamu hanya butuh satu elemen, apakah seluruh array perlu diurutkan? Pikirkan cara menyimpan hanya k kandidat teratas sambil membaca array sekali saja.',
      'Simpan k nilai terbesar yang sejauh ini terlihat di dalam min-heap. Akar heap adalah yang paling kecil di antara kandidat — itulah yang dibuang ketika muncul nilai yang lebih besar.',
      'Mulai dari heap kosong: masukkan setiap nilai, lalu kalau ukuran heap melebihi k, keluarkan akarnya. Setelah semua nilai diproses, akar heap adalah jawabannya.',
    ],
    en: [
      'If you only need one element, does the whole array have to be sorted? Think about keeping just the top k candidates in one pass.',
      'Store the k largest values seen so far in a min-heap. The heap root is the smallest of those candidates — that is what leaves when a bigger value shows up.',
      'Start with an empty heap: push every value, and whenever the heap size exceeds k, pop the root. When all values are processed, the root is the answer.',
    ],
  },
  explanation: {
    id: `## Pendekatan

**Min-heap berukuran \`k\` (solusi referensi).**

Bayangkan kamu menyimpan \`k\` nilai terbesar yang sudah kamu lihat. Yang paling sering
harus dibuang dari kumpulan itu adalah anggota **terkecil**, jadi simpan kandidat di
**min-heap**: akarnya selalu anggota terkecil, dan itulah yang \`pop\` keluarkan.

1. Buat min-heap kosong.
2. Untuk setiap nilai: \`push\`.
3. Kalau ukuran heap melebihi \`k\`, \`pop\` akarnya.
4. Setelah semua nilai diproses, heap berisi tepat \`k\` nilai terbesar dan akarnya adalah
   elemen ke-\`k\`.

Perhatikan bahwa keputusan \`push\` bisa dihemat: kalau ukuran heap sudah \`k\` dan nilai baru
lebih kecil dari \`peek()\`, nilai itu pasti tidak masuk kandidat — tidak perlu menyentuh heap
sama sekali.

**Alternatif yang sama sahnya.**

- **Urutkan seluruh array** lalu ambil indeks \`nums.length - k\`. O(n log n), satu baris,
  dan untuk \`n\` sedang ini yang paling praktis di JavaScript karena tidak butuh menulis heap.
- **Quickselect**: partisi seperti quicksort, tapi hanya masuk ke sisi yang memuat jawaban.
  Rata-rata O(n), sayangnya kasus terburuknya O(n²) dan implementasinya lebih rawan salah
  (pivot buruk, batas indeks).

## Kompleksitas

- Min-heap berukuran \`k\`: O(n log k) waktu, O(k) ruang. Ini yang terbaik saat \`k\` kecil.
- Pengurutan: O(n log n) waktu, O(n) ruang.
- Quickselect: rata-rata O(n), kasus terburuk O(n²), ruang O(1).

## Kenapa heap lebih baik daripada mengurutkan di sini

Karena kamu tidak butuh urutan lengkap, hanya satu posisi. Menyimpan \`k\` elemen memberi dua
keuntungan sekaligus: biayanya turun menjadi O(n log k), dan memori yang dipakai hanya O(k).
Kalau \`n\` = 1.000.000 dan \`k\` = 5, perbedaannya besar. Kalau \`k\` mendekati \`n\`,
keduanya jadi setara dan mengurutkan lebih sederhana — sebutkan itu di wawancara supaya
terlihat kamu memilih berdasarkan angka, bukan kebiasaan.

## Kesalahan yang sering terjadi

- Memakai **max-heap**: yang paling sering harus dibuang di sini adalah elemen terkecil di
  antara kandidat, jadi heap-nya harus min-heap.
- Memakai **min-heap tanpa batas ukuran**, lalu mengambil elemen ke-\`k\` dengan cara mengeluarkan
  semua elemen — itu O(n log n) dan lebih ribet daripada mengurutkan.
- Lupa \`pop\` ketika ukuran sudah melebihi \`k\`, sehingga heap berisi seluruh array dan akarnya
  justru elemen paling kecil dari semuanya.
- Menganggap nilai unik: \`[7, 7, 7]\` dengan \`k = 2\` tetap 7.
- Menulis heap tanpa memeriksa kasus heap hanya berisi satu elemen saat \`pop\`, sehingga sift
  down dijalankan pada array kosong.`,
    en: `## Approach

**A min-heap of size \`k\` (the reference solution).**

Picture keeping the \`k\` largest values you have seen. The member most likely to leave that
set is the **smallest** one, so keep the candidates in a **min-heap**: its root is always the
smallest member, and that is what \`pop\` removes.

1. Create an empty min-heap.
2. For each value: \`push\` it.
3. Whenever the heap size exceeds \`k\`, \`pop\` the root.
4. After the whole array is processed the heap holds exactly the \`k\` largest values, and its
   root is the k-th largest.

Note that the push can be skipped often: if the heap is already full and the new value is
smaller than \`peek()\`, it cannot be a candidate, so the heap does not need to be touched.

**Equally valid alternatives.**

- **Sort the whole array** and read index \`nums.length - k\`. O(n log n), one line, and for
  moderate \`n\` the most practical option in JavaScript because no heap has to be written.
- **Quickselect**: partition like quicksort but recurse only into the side that contains the
  answer. O(n) on average, but O(n²) in the worst case and easier to get wrong (bad pivots,
  index bounds).

## Complexity

- Min-heap of size \`k\`: O(n log k) time, O(k) space. Best when \`k\` is small.
- Sorting: O(n log n) time, O(n) space.
- Quickselect: O(n) average, O(n²) worst case, O(1) space.

## Why a heap beats sorting here

Because you do not need the full order, only one position. Keeping \`k\` elements pays off
twice: the cost drops to O(n log k) and the memory used is O(k). If \`n\` is 1,000,000 and
\`k\` is 5, the difference is large. If \`k\` is close to \`n\`, both approaches are equivalent
and sorting is simpler — say that out loud in an interview so it is clear you choose based on
the numbers, not on habit.

## Common mistakes

- Reaching for a **max-heap**: the member that leaves most often here is the smallest of the
  candidates, so the heap must be a min-heap.
- Using an **unbounded min-heap** and then popping elements one by one to reach the k-th — that
  is O(n log n) with extra code compared to a plain sort.
- Forgetting to \`pop\` once the size exceeds \`k\`, so the heap holds the entire array and its
  root is the smallest value overall.
- Treating values as distinct: \`[7, 7, 7]\` with \`k = 2\` is still 7.
- Writing a heap that does not guard \`pop\` on a single-element heap, so it sifts down on an
  empty array.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function findKthLargest(nums, k) {
  // write your solution here
}
`,
      solution: `class MinHeap {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  peek() {
    return this.items[0];
  }

  push(value) {
    const items = this.items;
    items.push(value);
    let child = items.length - 1;

    while (child > 0) {
      const parent = (child - 1) >> 1;
      if (items[parent] <= items[child]) {
        break;
      }
      [items[parent], items[child]] = [items[child], items[parent]];
      child = parent;
    }
  }

  pop() {
    const items = this.items;
    const top = items[0];
    const last = items.pop();

    if (items.length === 0) {
      return top;
    }

    items[0] = last;
    let parent = 0;

    for (;;) {
      const left = 2 * parent + 1;
      const right = left + 1;
      let smallest = parent;

      if (left < items.length && items[left] < items[smallest]) {
        smallest = left;
      }
      if (right < items.length && items[right] < items[smallest]) {
        smallest = right;
      }
      if (smallest === parent) {
        return top;
      }

      [items[parent], items[smallest]] = [items[smallest], items[parent]];
      parent = smallest;
    }
  }
}

function findKthLargest(nums, k) {
  // Keep the k largest values seen so far. The heap root is the smallest of them,
  // which is exactly the k-th largest once the whole array has been read.
  const heap = new MinHeap();

  for (const value of nums) {
    heap.push(value);

    if (heap.size > k) {
      heap.pop();
    }
  }

  return heap.peek();
}
`,
    },
    {
      language: 'python',
      template: `def findKthLargest(nums, k):
    # write your solution here
    pass
`,
      solution: `import heapq


def findKthLargest(nums, k):
    # Min-heap that never holds more than k values: its root is the k-th largest.
    heap = []

    for value in nums:
        heapq.heappush(heap, value)

        if len(heap) > k:
            heapq.heappop(heap)

    return heap[0]
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
    { id: 'c2', input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
    { id: 'c3', input: [[1], 1], expected: 1, hidden: true },
    { id: 'c4', input: [[-1, -2, -3], 2], expected: -2, hidden: true },
    { id: 'c5', input: [[7, 7, 7], 3], expected: 7, hidden: true },
    { id: 'c6', input: [[1000000000, -1000000000, 0], 3], expected: -1000000000, hidden: true },
    { id: 'c7', input: [[2, 1], 1], expected: 2, hidden: true },
    {
      id: 'c8',
      input: [
        [
          5,
          12,
          3,
          44,
          7,
          19,
          23,
          2,
          90,
          56,
          31,
          8,
          14,
          67,
          25,
          41,
          9,
          73,
          60,
          18,
        ],
        6,
      ],
      expected: 44,
      hidden: true,
    },
  ],
};
