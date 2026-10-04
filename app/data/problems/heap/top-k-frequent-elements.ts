import type { Problem } from '~/types/content';

export const topKFrequentElements: Problem = {
  slug: 'top-k-frequent-elements',
  title: {
    id: 'K Elemen Paling Sering Muncul',
    en: 'Top K Frequent Elements',
  },
  difficulty: 'easy',
  trackId: 'heap',
  order: 2,
  functionName: 'topKFrequent',
  parameters: [
    { name: 'nums', type: 'number[]' },
    { name: 'k', type: 'number' },
  ],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\` dan bilangan bulat \`k\`. Kembalikan \`k\` nilai
yang paling sering muncul di \`nums\`.

- **Urutan hasil tidak penting** — yang dinilai adalah himpunan nilai yang kamu kembalikan.
- \`k\` selalu bernilai antara 1 dan banyaknya nilai unik di \`nums\`, dan jawabannya dijamin
  unik (tidak ada dua nilai berbeda dengan jumlah kemunculan yang sama di batas \`k\`).
- \`nums\` boleh memuat nilai negatif, nilai duplikat, dan nilai yang sangat besar.

Soal ini dinilai berdasarkan nilai yang dikembalikan, bukan caranya. Menghitung frekuensi
lalu mengurutkan nilai uniknya sudah lebih dari cukup; min-heap berukuran \`k\` adalah versi
yang lebih hemat saat \`k\` jauh lebih kecil daripada banyaknya nilai unik.`,
    en: `You are given an array of integers \`nums\` and an integer \`k\`. Return the \`k\` values
that appear most often in \`nums\`.

- **The order of the result does not matter** — only the set of values you return is judged.
- \`k\` is always between 1 and the number of distinct values in \`nums\`, and the answer is
  guaranteed to be unique (no two different values share a count at the \`k\` boundary).
- \`nums\` may contain negative values, duplicates, and very large values.

Only the returned values are graded, not the technique. Counting frequencies and then sorting
the distinct values is more than enough; a min-heap of size \`k\` is the leaner version when
\`k\` is much smaller than the number of distinct values.`,
  },
  examples: [
    {
      input: 'nums = [1, 1, 1, 2, 2, 3], k = 2',
      output: '[1, 2]',
      explanation: {
        id: 'Nilai 1 muncul 3 kali dan nilai 2 muncul 2 kali, jadi keduanya adalah dua nilai paling sering. Nilai 3 hanya muncul sekali.',
        en: 'The value 1 appears 3 times and 2 appears 2 times, so those are the two most frequent values. The value 3 appears only once.',
      },
    },
    {
      input: 'nums = [4, 4, 4, 4, 9], k = 1',
      output: '[4]',
      explanation: {
        id: 'Nilai 4 muncul 4 kali, jauh lebih sering daripada 9 yang hanya sekali.',
        en: 'The value 4 appears 4 times, far more often than the single 9.',
      },
    },
    {
      input: 'nums = [7], k = 1',
      output: '[7]',
      explanation: {
        id: 'Hanya ada satu nilai unik, jadi hasilnya pasti nilai itu.',
        en: 'There is only one distinct value, so it has to be the answer.',
      },
    },
  ],
  hints: {
    id: [
      'Sebelum memikirkan heap, hitung dulu berapa kali setiap nilai muncul. Struktur data apa yang cocok untuk pasangan nilai dan jumlahnya?',
      'Setelah frekuensinya diketahui, kamu hanya perlu memproses nilai uniknya. Jumlahnya biasanya jauh lebih kecil daripada panjang array.',
      'Urutkan pasangan (jumlah, nilai) dari yang paling sering, lalu ambil k pasangan pertama. Kalau k jauh lebih kecil daripada jumlah nilai unik, min-heap berukuran k memberi hasil yang sama dengan kerja yang lebih sedikit.',
    ],
    en: [
      'Before thinking about heaps, count how often each value appears. Which data structure fits a value-to-count mapping?',
      'Once you have the counts you only need to process the distinct values, and there are usually far fewer of them than array entries.',
      'Sort the (count, value) pairs from most frequent, then take the first k. When k is much smaller than the number of distinct values, a min-heap of size k gets the same answer with less work.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Dua langkah yang jelas terpisah:

1. **Hitung frekuensi** setiap nilai memakai hash map (\`Map\` di JavaScript, \`Counter\` di
   Python). Biayanya O(n) dan sekaligus membuang semua duplikat dari pertimbangan.
2. **Pilih \`k\` teratas.** Solusi referensi mengurutkan daftar \`(nilai, jumlah)\` menurun,
   lalu mengambil \`k\` elemen pertama.

Alternatif langkah 2 dengan heap: masukkan setiap pasangan \`(jumlah, nilai)\` ke **min-heap**
berukuran \`k\`. Kalau ukurannya melebihi \`k\`, \`pop\` — yang terbuang adalah pasangan dengan
jumlah terkecil di antara kandidat, persis yang kamu inginkan. Setelah selesai, isi heap adalah
jawabannya.

## Kompleksitas

- Menghitung frekuensi: O(n) waktu, O(d) ruang, dengan \`d\` = banyaknya nilai unik.
- Versi pengurutan (solusi referensi): O(d log d).
- Versi heap berukuran \`k\`: O(d log k).

## Kenapa pengurutan sudah cukup

Ini soal yang sering dijadikan contoh priority queue, padahal datanya justru menguntungkan
pengurutan: yang diurutkan hanya nilai uniknya, bukan seluruh array. Di JavaScript
\`Map\` + \`sort\` hanya beberapa baris dan hampir tidak mungkin salah, sementara priority queue
harus kamu tulis sendiri karena JavaScript tidak menyediakannya.

Jawaban wawancara yang bagus menyebut kedua versi: "Saya hitung frekuensinya dengan hash map,
lalu urutkan nilai uniknya — cukup dan sederhana. Kalau jumlah nilai uniknya jauh lebih besar
daripada \`k\`, saya ganti pengurutannya dengan min-heap berukuran \`k\` supaya jadi
O(d log k)." Dengan begitu kamu menunjukkan bahwa struktur data tambahan dipakai karena
alasan, bukan karena hafalan.

## Kesalahan yang sering terjadi

- Mengurutkan seluruh \`nums\` (panjang \`n\`) padahal cukup nilai uniknya saja (\`d\` elemen).
- Memakai **max-heap** berukuran \`k\`: heap yang benar untuk "k terbesar" adalah min-heap,
  supaya yang paling kecil di antara para kandidat bisa dibuang lebih dulu.
- Membandingkan frekuensi sebagai string. \`[10, 9].sort()\` memberi \`[10, 9]\` di JavaScript;
  selalu tulis komparator angka.
- Menganggap urutan hasil penting lalu mengembalikan nilai terurut — tidak salah, tapi
  membuang waktu; soal menerima urutan apa pun.
- Memakai array berukuran nilai maksimum untuk menghitung frekuensi, padahal nilai bisa
  negatif atau sangat besar.`,
    en: `## Approach

Two clearly separated steps:

1. **Count frequencies** with a hash map (\`Map\` in JavaScript, \`Counter\` in Python). This
   costs O(n) and also removes every duplicate from further consideration.
2. **Pick the top \`k\`.** The reference solution sorts the \`(value, count)\` list in
   descending order and takes the first \`k\` entries.

The heap alternative for step 2: push every \`(count, value)\` pair into a **min-heap** of size
\`k\`. Whenever the size exceeds \`k\`, \`pop\` — the pair that leaves is the one with the
smallest count among the candidates, which is exactly what you want. When the loop ends, the
heap holds the answer.

## Complexity

- Counting frequencies: O(n) time, O(d) space, where \`d\` is the number of distinct values.
- Sorting version (the reference solution): O(d log d).
- Heap version with size \`k\`: O(d log k).

## Why sorting is enough here

This problem is often used to showcase priority queues, yet its shape actually favors
sorting: only the distinct values get sorted, not the whole array. In JavaScript
\`Map\` + \`sort\` is a few lines and nearly impossible to get wrong, while a priority queue has
to be written by hand because JavaScript does not ship one.

A strong interview answer mentions both versions: "I count frequencies with a hash map, then
sort the distinct values — simple and sufficient. If the number of distinct values were much
larger than \`k\`, I would replace the sort with a min-heap of size \`k\` to get O(d log k)."
That shows you reach for extra data structures for a reason instead of by habit.

## Common mistakes

- Sorting all of \`nums\` (\`n\` items) when only the distinct values (\`d\` items) need sorting.
- Using a **max-heap** of size \`k\`: the correct heap for "k largest" is a min-heap, so that
  the smallest of the candidates is evicted first.
- Comparing counts as strings. \`[10, 9].sort()\` gives \`[10, 9]\` in JavaScript; always pass a
  numeric comparator.
- Believing the output order matters and sorting it — not wrong, but wasted work, since any
  order is accepted.
- Using an array indexed by value to count frequencies when values can be negative or huge.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function topKFrequent(nums, k) {
  // write your solution here
}
`,
      solution: `function topKFrequent(nums, k) {
  const counts = new Map();

  for (const value of nums) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  // Only the distinct values are sorted, and the result order does not matter.
  const byFrequency = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  return byFrequency.slice(0, k).map(entry => entry[0]);
}
`,
    },
    {
      language: 'python',
      template: `def topKFrequent(nums, k):
    # write your solution here
    pass
`,
      solution: `from collections import Counter


def topKFrequent(nums, k):
    # most_common already orders the distinct values by descending frequency.
    return [value for value, _ in Counter(nums).most_common(k)]
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[1, 1, 1, 2, 2, 3], 2],
      expected: [1, 2],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c2',
      input: [[4, 4, 4, 4, 9], 1],
      expected: [4],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c3',
      input: [[7], 1],
      expected: [7],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c4',
      input: [[1, 2], 2],
      expected: [1, 2],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c5',
      input: [[-1, -1, -2], 1],
      expected: [-1],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c6',
      input: [[1000000000, 1000000000, -1000000000, 1000000000], 2],
      expected: [1000000000, -1000000000],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c7',
      input: [[5, 5, 5, 5, 5, 3, 3, 3, 9, 9, 7], 3],
      expected: [5, 3, 9],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
  ],
};
