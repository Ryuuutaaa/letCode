import type { Problem } from '~/types/content';

export const combinationSum: Problem = {
  slug: 'combination-sum',
  title: {
    id: 'Jumlah Kombinasi',
    en: 'Combination Sum',
  },
  difficulty: 'medium',
  trackId: 'backtracking',
  order: 3,
  functionName: 'combinationSum',
  parameters: [
    { name: 'candidates', type: 'number[]' },
    { name: 'target', type: 'number' },
  ],
  returnType: 'number[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array \`candidates\` berisi bilangan bulat **positif yang semuanya berbeda**,
dan sebuah bilangan bulat \`target\`.

Kembalikan **semua kombinasi unik** dari \`candidates\` yang jumlahnya tepat \`target\`.

Aturan pengambilan: satu nilai di \`candidates\` boleh dipakai **berkali-kali sebanyak yang
kamu mau**. Yang tidak boleh adalah memakai nilai itu lebih dari sekali "per salinan" —
artinya kalau \`candidates = [2,3]\` dan target 7, kombinasi \`[2,2,3]\` sah, tetapi kombinasi
yang sama tidak boleh muncul dua kali.

Kombinasi yang sama dianggap sama walau urutannya berbeda: \`[2,2,3]\` dan \`[2,3,2]\` dihitung
satu kombinasi. **Urutan kombinasi di dalam hasil maupun urutan angka di dalam satu kombinasi
tidak dinilai** — yang dinilai adalah himpunan kombinasi yang kamu hasilkan.

Catatan efisiensi: tanpa pemangkasan, penelusuran bisa masuk sangat dalam. Urutkan
\`candidates\` lebih dulu, lalu tinggalkan cabang yang sisa targetnya tidak mungkin tercapai.`,
    en: `You are given an array \`candidates\` of **distinct positive integers** and an integer
\`target\`.

Return **every unique combination** of \`candidates\` that sums to exactly \`target\`.

The rule for picking: a value in \`candidates\` may be used **as many times as you like**. What
you may not do is produce the same combination twice — so with \`candidates = [2,3]\` and target
7 the combination \`[2,2,3]\` is valid, but it may not appear twice in the result.

Combinations with the same values in a different order count as one: \`[2,2,3]\` and \`[2,3,2]\`
are the same combination. **Neither the order of the combinations nor the order of the numbers
within a combination is judged** — only the set of combinations you produce.

A note on efficiency: unpruned exploration can go very deep. Sort \`candidates\` first, then
abandon any branch whose remaining target can no longer be reached.`,
  },
  examples: [
    {
      input: 'candidates = [2, 3, 6, 7], target = 7',
      output: '[[2, 2, 3], [7]]',
      explanation: {
        id: 'Dua kombinasi berjumlah 7. Nilai 6 tidak dipakai karena 6 + 2 > 7 dan 6 + 6 > 7.',
        en: 'Two combinations reach 7. The value 6 is never used because 6 + 2 > 7 and 6 + 6 > 7.',
      },
    },
    {
      input: 'candidates = [2, 3, 5], target = 8',
      output: '[[2, 2, 2, 2], [2, 3, 3], [3, 5]]',
      explanation: {
        id: '3 + 3 + 2 = 8 dan 5 + 3 = 8 terwakili; setiap kombinasi hanya muncul sekali, tanpa versi urutan terbalik.',
        en: '3 + 3 + 2 = 8 and 5 + 3 = 8 are represented; each combination appears once, with no reversed duplicates.',
      },
    },
    {
      input: 'candidates = [8, 4, 2], target = 6',
      output: '[[2, 2, 2], [2, 4]]',
      explanation: {
        id: 'Kandidat 8 langsung dibuang karena lebih besar dari target. Daftar yang belum terurut tidak masalah.',
        en: 'The candidate 8 is discarded immediately because it exceeds the target. An unsorted list is fine.',
      },
    },
  ],
  hints: {
    id: [
      'Kombinasi 2 + 2 + 3 dan 2 + 3 + 2 isinya sama. Aturan apa yang bisa mencegah keduanya dihasilkan?',
      'Bawa indeks `start`: setelah memilih `candidates[i]`, nilai berikutnya tidak boleh berasal dari indeks yang lebih kecil.',
      'Karena satu nilai boleh dipakai berkali-kali, rekursinya memakai `i`, bukan `i + 1`.',
      'Berhenti ketika sisa target sama dengan 0 (simpan jalurnya) atau negatif (tinggalkan). Kalau sudah diurutkan, `break` begitu `candidates[i] > sisa`.',
    ],
    en: [
      'The combinations 2 + 2 + 3 and 2 + 3 + 2 hold the same values. What rule prevents both from being produced?',
      'Carry a `start` index: after choosing `candidates[i]`, the next value may not come from a smaller index.',
      'Because a value may be reused, the recursion passes `i`, not `i + 1`.',
      'Stop when the remaining target is 0 (record the path) or negative (abandon it). Once sorted, `break` as soon as `candidates[i] > remaining`.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Pohon keputusannya: setiap node memegang \`path\`, sebuah \`start\`, dan sisa target yang masih
harus dicapai.

\`\`\`js
function backtrack(start, remaining) {
  if (remaining === 0) {
    result.push([...path]);        // kombinasi sah, dan setiap node ini unik
    return;
  }

  for (let i = start; i < sorted.length; i++) {
    if (sorted[i] > remaining) {
      break;                       // pemangkasan: semua kandidat berikutnya lebih besar
    }
    path.push(sorted[i]);
    backtrack(i, remaining - sorted[i]);   // i, bukan i + 1 → boleh dipakai lagi
    path.pop();
  }
}
\`\`\`

Tiga keputusan desain yang menentukan:

1. **\`start\` menjaga urutan menaik.** Kombinasi hanya dibangun dengan indeks yang tidak
   menurun, sehingga \`[2,2,3]\` bisa muncul sementara \`[2,3,2]\` tidak. Inilah yang membuat
   hasilnya unik tanpa perlu \`Set\`.
2. **Rekursi memakai \`i\`.** Nilai yang baru saja dipilih masih tersedia di langkah berikutnya,
   jadi sebuah nilai bisa dipakai berkali-kali.
3. **Pengurutan + \`break\`.** Setelah \`candidates\` terurut, begitu satu kandidat melebihi sisa
   target, semua kandidat setelahnya pasti juga melebihi. \`break\` di sini memangkas seluruh
   sisa loop, bukan hanya satu cabang.

## Kompleksitas

- Waktu: eksponensial, kira-kira O(n^(T/m)) di mana T adalah target dan m nilai terkecil di
  \`candidates\` — itu batas kedalaman penelusuran tanpa pemangkasan. Pengurutan menambah
  O(n log n). Pemangkasan memotong banyak cabang, tetapi kasus terburuknya tetap eksponensial
  karena jumlah jawaban sendiri bisa eksponensial (contoh: \`candidates = [1]\`).
- Ruang: O(T/m) untuk kedalaman rekursi dan \`path\`, di luar hasil.

## Kesalahan umum

- Meneruskan \`i + 1\` ke rekursi, sehingga setiap nilai hanya boleh dipakai sekali. Hasilnya
  kehilangan kombinasi seperti \`[2,2,3]\`.
- Meneruskan \`start\` yang salah, misalnya selalu 0, sehingga kombinasi yang sama muncul
  berkali-kali dalam urutan berbeda.
- Lupa membatalkan \`path.pop()\`, sehingga kombinasi berikutnya menempel pada sisa sebelumnya.
- Menyimpan \`path\` tanpa menyalin.
- Tidak memangkas: \`remaining < 0\` dibiarkan berlanjut, atau loop tidak di-\`break\` padahal
  kandidat sudah terlalu besar. Ini yang paling sering membuat waktu habis.
- Menangani \`target = 0\` secara khusus padahal rekursi sudah menanganinya lewat
  \`remaining === 0\` di awal.`,
    en: `## Approach

The decision tree: each node holds a \`path\`, a \`start\` index, and the remaining target still to
be reached.

\`\`\`js
function backtrack(start, remaining) {
  if (remaining === 0) {
    result.push([...path]);        // a valid combination, and this node is unique
    return;
  }

  for (let i = start; i < sorted.length; i++) {
    if (sorted[i] > remaining) {
      break;                       // pruning: every later candidate is even larger
    }
    path.push(sorted[i]);
    backtrack(i, remaining - sorted[i]);   // i, not i + 1 → may be reused
    path.pop();
  }
}
\`\`\`

Three design decisions do the heavy lifting:

1. **\`start\` keeps the order non-decreasing.** Combinations are only built from indices that
   never go backwards, so \`[2,2,3]\` can appear while \`[2,3,2]\` cannot. That is what makes the
   output unique without a \`Set\`.
2. **The recursion passes \`i\`.** The value just chosen is still available on the next step, so
   a value can be reused any number of times.
3. **Sort, then \`break\`.** Once \`candidates\` is sorted, as soon as one candidate exceeds the
   remaining target every later candidate does too. The \`break\` prunes the rest of the loop, not
   just one branch.

## Complexity

- Time: exponential, roughly O(n^(T/m)) where T is the target and m the smallest value in
  \`candidates\` — that bounds the unpruned search depth. Sorting adds O(n log n). Pruning cuts
  many branches, but the worst case stays exponential because the number of answers itself can
  be exponential (for instance \`candidates = [1]\`).
- Space: O(T/m) for the recursion depth and \`path\`, beyond the output.

## Common mistakes

- Passing \`i + 1\` into the recursion, so each value may be used only once. That loses
  combinations such as \`[2,2,3]\`.
- Passing the wrong \`start\` — always 0, for instance — so the same combination shows up several
  times in different orders.
- Forgetting \`path.pop()\`, so the next combination sticks to the leftovers of the previous one.
- Storing \`path\` without copying it.
- Not pruning: letting \`remaining < 0\` continue, or not \`break\`ing once the candidate is too
  large. This is the most common cause of a timeout.
- Special-casing \`target = 0\` when the recursion already handles it through the
  \`remaining === 0\` check at the top.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function combinationSum(candidates, target) {
  // write your solution here
}
`,
      solution: `function combinationSum(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result = [];
  const path = [];

  function backtrack(start, remaining) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remaining) {
        break;
      }

      path.push(sorted[i]);
      backtrack(i, remaining - sorted[i]);
      path.pop();
    }
  }

  backtrack(0, target);

  return result;
}
`,
    },
    {
      language: 'python',
      template: `def combinationSum(candidates, target):
    # write your solution here
    pass
`,
      solution: `def combinationSum(candidates, target):
    ordered = sorted(candidates)
    result = []
    path = []

    def backtrack(start, remaining):
        if remaining == 0:
            result.append(list(path))
            return

        for i in range(start, len(ordered)):
            if ordered[i] > remaining:
                break

            path.append(ordered[i])
            backtrack(i, remaining - ordered[i])
            path.pop()

    backtrack(0, target)

    return result
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[2, 3, 6, 7], 7],
      expected: [[2, 2, 3], [7]],
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c2',
      input: [[2, 3, 5], 8],
      expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c3',
      input: [[2], 1],
      expected: [],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c4',
      input: [[1], 2],
      expected: [[1, 1]],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c5',
      input: [[8, 4, 2], 6],
      expected: [[2, 2, 2], [2, 4]],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c6',
      input: [[2, 3, 5], 12],
      expected: [[2, 2, 2, 2, 2, 2], [2, 2, 2, 3, 3], [2, 2, 3, 5], [2, 5, 5], [3, 3, 3, 3]],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c7',
      input: [[7, 3, 2], 18],
      expected: [
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 3, 3],
        [2, 2, 2, 2, 3, 7],
        [2, 2, 2, 3, 3, 3, 3],
        [2, 2, 7, 7],
        [2, 3, 3, 3, 7],
        [3, 3, 3, 3, 3, 3],
      ],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
  ],
};
