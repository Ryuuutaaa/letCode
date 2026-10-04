import type { Problem } from '~/types/content';

export const subsets: Problem = {
  slug: 'subsets',
  title: {
    id: 'Subset (Power Set)',
    en: 'Subsets (Power Set)',
  },
  difficulty: 'medium',
  trackId: 'backtracking',
  order: 1,
  functionName: 'subsets',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\` yang **semua elemennya berbeda**.

Kembalikan **semua subset yang mungkin** (disebut juga *power set*), termasuk subset kosong
dan array itu sendiri.

Setiap subset adalah daftar nilai yang muncul di \`nums\` dengan urutan asli dipertahankan.
Tidak boleh ada subset kembar.

**Urutan subset di dalam hasil tidak penting** — yang dinilai adalah himpunan subset yang kamu
hasilkan. Jadi \`[[],[1],[2],[1,2]]\` dan \`[[1],[2],[],[1,2]]\` dinilai sama.

Jumlah subset dari n elemen adalah 2ⁿ, jadi biaya minimalnya memang eksponensial. Tugasmu
adalah memastikan setiap subset dihasilkan **tepat satu kali**.`,
    en: `You are given an array of integers \`nums\` whose elements are **all distinct**.

Return **every possible subset** (also called the *power set*), including the empty subset and
the array itself.

Each subset is a list of values taken from \`nums\` with their relative original order
preserved. No subset may appear twice.

**The order of the subsets in your result does not matter** — only the set of subsets you
produce is judged. So \`[[],[1],[2],[1,2]]\` and \`[[1],[2],[],[1,2]]\` are considered equal.

An array of n elements has 2ⁿ subsets, so an exponential cost is unavoidable. Your job is to
make sure every subset is produced **exactly once**.`,
  },
  examples: [
    {
      input: 'nums = [1, 2, 3]',
      output: '[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]',
      explanation: {
        id: 'Delapan subset: satu kosong, tiga berisi satu elemen, tiga berisi dua elemen, dan satu berisi ketiganya. Urutan penulisannya bebas.',
        en: 'Eight subsets: one empty, three with a single element, three with two elements, and one with all three. The order you write them in is free.',
      },
    },
    {
      input: 'nums = [0]',
      output: '[[], [0]]',
      explanation: {
        id: 'Hanya dua pilihan: memakai 0 atau tidak. Nilai 0 bukan berarti "kosong".',
        en: 'Only two options: take the 0 or leave it. The value 0 does not mean "empty".',
      },
    },
    {
      input: 'nums = []',
      output: '[[]]',
      explanation: {
        id: 'Array kosong punya tepat satu subset, yaitu subset kosong itu sendiri. Hasilnya [ [] ], bukan [].',
        en: 'An empty array has exactly one subset: the empty subset itself. The result is [ [] ], not [].',
      },
    },
  ],
  hints: {
    id: [
      'Bayangkan setiap elemen sebagai satu keputusan: diambil atau tidak. Berapa banyak pola keputusan yang mungkin?',
      'Bangun jawaban secara bertahap: pada setiap langkah kamu memilih satu elemen yang indeksnya lebih besar dari elemen terakhir yang dipilih.',
      'Simpan isi jalur saat ini setiap kali kamu masuk ke sebuah node — bukan hanya di ujung rekursi. Dan ingat untuk menyalin isinya sebelum menyimpan.',
      'Array kosong tetap menghasilkan satu subset: subset kosong.',
    ],
    en: [
      'Think of each element as one decision: taken or not taken. How many patterns of decisions are there?',
      'Build the answer incrementally: at each step you pick one element whose index is larger than the index of the last picked element.',
      'Record the current path every time you enter a node — not only at the bottom of the recursion. And remember to copy it before storing.',
      'An empty array still yields one subset: the empty one.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Pohon keputusannya begini: pada setiap node kita memegang sebuah \`path\` (subset yang sedang
dibangun) dan sebuah indeks \`start\` (batas bawah kandidat berikutnya).

\`\`\`js
function backtrack(start) {
  result.push([...path]);                 // setiap node adalah satu subset yang sah
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);                   // pilih
    backtrack(i + 1);                     // jelajahi: elemen berikutnya harus setelah i
    path.pop();                           // batalkan
  }
}
\`\`\`

Dua hal yang membuat versi ini rapi:

1. **Setiap node disimpan**, bukan hanya daunnya. Subset lengkap ada di seluruh node pohon,
   bukan hanya di ujung. Akar pohon (dengan \`path\` kosong) juga disimpan, dan itulah subset
   kosong.
2. **\`start\` mencegah kebalikan.** Karena rekursi hanya menerima indeks yang lebih besar,
   \`[1,2]\` bisa dihasilkan sementara \`[2,1]\` tidak. Tanpa \`start\`, dua urutan pengambilan
   yang sama akan muncul dua kali.

Alternatif yang setara secara hasil: untuk setiap elemen, pilih "ambil" atau "jangan ambil",
lalu rekursi ke elemen berikutnya. Itu menghasilkan pohon biner dengan 2ⁿ daun, berbeda dari
pohon di atas yang menyimpan hasil di setiap node, tetapi himpunan subset yang dihasilkan sama.

## Kompleksitas

- Waktu: O(n · 2ⁿ) — ada 2ⁿ node, dan setiap kali menyimpan hasil kita menyalin \`path\` yang
  panjangnya sampai n.
- Ruang: O(n) untuk kedalaman rekursi dan \`path\`, di luar hasil.
  Hasilnya sendiri berukuran O(n · 2ⁿ).

## Kesalahan umum

- Menyimpan \`path\` tanpa menyalinnya. Semua isi hasil akan berubah mengikuti keadaan
  \`path\` terakhir.
- Memakai penyimpanan di daun saja, sehingga seluruh cabang yang lebih pendek hilang.
- Tidak memakai \`start\`, sehingga \`[1,2]\` dan \`[2,1]\` dianggap subset yang berbeda.
- Lupa bahwa array kosong tetap menghasilkan \`[[]]\`.
- Memakai rekursi "ambil atau tidak ambil" tetapi menaruh \`path.pop()\` di tempat yang salah,
  sehingga elemen tertinggal di jalur berikutnya.`,
    en: `## Approach

The decision tree works like this: at each node we hold a \`path\` (the subset being built) and a
\`start\` index (the lower bound for the next candidate).

\`\`\`js
function backtrack(start) {
  result.push([...path]);                 // every node is a valid subset
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);                   // choose
    backtrack(i + 1);                     // explore: the next element must come after i
    path.pop();                           // undo
  }
}
\`\`\`

Two details make this version clean:

1. **Every node is recorded**, not just the leaves. The complete subsets live at all nodes of
   the tree, not only at the bottom. The root (with an empty \`path\`) is recorded too, and that
   is the empty subset.
2. **\`start\` prevents reversals.** Because the recursion only accepts larger indices, \`[1,2]\`
   can be produced while \`[2,1]\` cannot. Without \`start\`, two ways of picking the same elements
   would both appear.

An equivalent alternative: for each element decide "take it" or "skip it", then recurse to the
next element. That gives a binary tree with 2ⁿ leaves, unlike the tree above that records at
every node — yet the set of subsets produced is identical.

## Complexity

- Time: O(n · 2ⁿ) — there are 2ⁿ nodes, and each time we record a result we copy a \`path\` of up
  to n values.
- Space: O(n) for the recursion depth and \`path\`, beyond the output.
  The output itself is O(n · 2ⁿ).

## Common mistakes

- Storing \`path\` without copying it. Every entry in the result then mutates along with the
  final state of \`path\`.
- Recording only at the leaves, which drops every shorter branch.
- Not using \`start\`, so \`[1,2]\` and \`[2,1]\` are treated as different subsets.
- Forgetting that an empty array still yields \`[[]]\`.
- Using the "take it or skip it" recursion but placing \`path.pop()\` in the wrong spot, leaving
  an element behind on the next branch.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function subsets(nums) {
  // write your solution here
}
`,
      solution: `function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);

  return result;
}
`,
    },
    {
      language: 'python',
      template: `def subsets(nums):
    # write your solution here
    pass
`,
      solution: `def subsets(nums):
    result = []
    path = []

    def backtrack(start):
        result.append(list(path))

        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1)
            path.pop()

    backtrack(0)

    return result
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[1, 2, 3]],
      expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c2',
      input: [[0]],
      expected: [[], [0]],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c3',
      input: [[]],
      expected: [[]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c4',
      input: [[-1, 1]],
      expected: [[], [-1], [-1, 1], [1]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c5',
      input: [[1, 2, 3, 4]],
      expected: [
        [],
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 4],
        [1, 3],
        [1, 3, 4],
        [1, 4],
        [2],
        [2, 3],
        [2, 3, 4],
        [2, 4],
        [3],
        [3, 4],
        [4],
      ],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c6',
      input: [[5, 6, 7]],
      expected: [[], [5], [5, 6], [5, 6, 7], [5, 7], [6], [6, 7], [7]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c7',
      input: [[-1000000000, 1000000000]],
      expected: [[], [-1000000000], [-1000000000, 1000000000], [1000000000]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
  ],
};
