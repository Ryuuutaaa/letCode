import type { Problem } from '~/types/content';

export const permutations: Problem = {
  slug: 'permutations',
  title: {
    id: 'Permutasi',
    en: 'Permutations',
  },
  difficulty: 'medium',
  trackId: 'backtracking',
  order: 2,
  functionName: 'permutations',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\` yang **semua elemennya berbeda**.

Kembalikan **semua permutasi yang mungkin** dari \`nums\`. Setiap permutasi memuat seluruh
elemen \`nums\` tepat satu kali, dengan urutan yang berbeda-beda.

Jumlah permutasi dari n elemen adalah n!, jadi untuk n = 4 hasilnya 24 baris. Setiap urutan
harus muncul tepat satu kali.

**Urutan baris di dalam hasil tidak penting** — misalnya \`[[1,2],[2,1]]\` dan
\`[[2,1],[1,2]]\` dinilai sama. Yang penting setiap permutasi muncul tepat sekali, dan urutan
angka **di dalam** setiap baris tetap seperti yang kamu hasilkan.

Perhatikan kasus tepi: array kosong menghasilkan satu permutasi, yaitu array kosong itu
sendiri, sehingga jawabannya \`[[]]\` — bukan \`[]\`.`,
    en: `You are given an array of integers \`nums\` whose elements are **all distinct**.

Return **every possible permutation** of \`nums\`. Each permutation contains all elements of
\`nums\` exactly once, in a different order.

An array of n elements has n! permutations, so for n = 4 the answer holds 24 rows. Every order
must appear exactly once.

**The order of the rows does not matter** — for example \`[[1,2],[2,1]]\` and
\`[[2,1],[1,2]]\` are considered equal. What matters is that each permutation appears exactly
once, and the order of the numbers **inside** each row is whatever you produce.

Watch the edge case: an empty array has exactly one permutation, the empty array itself, so the
answer is \`[[]]\`, not \`[]\`.`,
  },
  examples: [
    {
      input: 'nums = [1, 2, 3]',
      output: '[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]',
      explanation: {
        id: 'Enam permutasi, sesuai 3! = 6. Urutan barisnya bebas.',
        en: 'Six permutations, matching 3! = 6. The order of the rows is free.',
      },
    },
    {
      input: 'nums = [0, 1]',
      output: '[[0,1], [1,0]]',
      explanation: {
        id: 'Elemen 0 tetap harus dipakai; ia hanya berpindah posisi.',
        en: 'The 0 must still be used; it only changes position.',
      },
    },
    {
      input: 'nums = []',
      output: '[[]]',
      explanation: {
        id: 'Satu-satunya permutasi dari array kosong adalah array kosong itu sendiri.',
        en: 'The only permutation of an empty array is the empty array itself.',
      },
    },
  ],
  hints: {
    id: [
      'Setiap posisi diisi satu elemen. Apa informasi yang harus kamu bawa agar satu elemen tidak dipakai dua kali?',
      'Simpan array boolean `used` sepanjang `nums`. Di dalam loop, lewati indeks yang sudah terpakai.',
      'Berhenti dan simpan hasil ketika panjang `path` sama dengan panjang `nums` — jangan menunggu indeks melewati batas.',
      'Jangan lupa mengembalikan `used[i]` menjadi `false` setelah rekursi, bersama `path.pop()`.',
    ],
    en: [
      'Every position gets one element. What information must you carry so that no element is used twice?',
      'Keep a boolean array `used` as long as `nums`. Inside the loop, skip any index that is already taken.',
      'Stop and record the result once `path` is as long as `nums` — do not wait for an index to run off the end.',
      'Remember to set `used[i]` back to `false` after the recursion, together with `path.pop()`.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Permutasi adalah kasus di mana **urutan penting** dan **semua elemen dipakai**. Karena itu
indeks \`start\` seperti pada subset tidak berlaku: setelah memilih elemen pertama, semua elemen
lain masih mungkin dipilih, termasuk yang indeksnya lebih kecil.

Yang dibutuhkan adalah penanda "sudah dipakai":

\`\`\`js
function backtrack() {
  if (path.length === nums.length) {      // keputusan lengkap
    result.push([...path]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;                       // pilih
    path.push(nums[i]);
    backtrack();                          // jelajahi
    path.pop();                           // batalkan
    used[i] = false;
  }
}
\`\`\`

Perhatikan dua hal. Pertama, syarat berhenti memeriksa **panjang jalur**, bukan indeks
iterasi — karena setiap pemanggilan rekursi memulai loop dari nol. Kedua, \`used\` dan \`path\`
harus dibatalkan bersama; kalau salah satu tertinggal, cabang berikutnya mewarisi keadaan yang
salah.

Alternatif klasik adalah **tukar-menukar**: pada posisi \`i\`, tukar \`nums[i]\` dengan
\`nums[pos]\`, rekursi untuk \`pos + 1\`, lalu tukar kembali. Versi itu tidak memerlukan array
\`used\` sama sekali — penandaannya tersirat dalam urutan array — tetapi mengubah susunan array
masukan, jadi salin dulu kalau \`nums\` dipakai lagi setelahnya.

## Kompleksitas

- Waktu: O(n · n!) — ada n! permutasi dan setiap penyimpanan menyalin n nilai.
  Kalau dihitung per pemanggilan rekursi, ada sekitar n! · e pemanggilan.
- Ruang: O(n) untuk \`path\`, \`used\`, dan kedalaman rekursi, di luar hasil.
  Hasilnya sendiri berukuran O(n · n!).

## Kesalahan umum

- Memakai \`result.push(path)\` tanpa menyalin, sehingga seluruh hasil berubah saat \`path\`
  dimutasi.
- Lupa mengembalikan \`used[i] = false\`, sehingga cabang berikutnya terlihat "kehabisan"
  elemen — gejalanya hasil terlalu sedikit.
- Memakai \`start\` seperti pada subset, sehingga hanya permutasi menaik yang muncul.
- Berhenti ketika \`path.length === nums.length - 1\` lalu menambahkan elemen terakhir secara
  manual; ini mudah membuat kasus kosong dan kasus satu elemen salah.
- Lupa menangani array kosong, sehingga \`[]\` menghasilkan \`[]\` padahal seharusnya \`[[]]\`.`,
    en: `## Approach

Permutations are the case where **order matters** and **every element is used**. That makes the
\`start\` index from the subsets pattern useless: after choosing the first element, all other
elements are still candidates, including ones with smaller indices.

What you need instead is a "already taken" marker:

\`\`\`js
function backtrack() {
  if (path.length === nums.length) {      // decisions complete
    result.push([...path]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;                       // choose
    path.push(nums[i]);
    backtrack();                          // explore
    path.pop();                           // undo
    used[i] = false;
  }
}
\`\`\`

Two things to notice. First, the stopping condition checks the **length of the path**, not the
loop index — because each recursive call restarts the loop from zero. Second, \`used\` and
\`path\` must be undone together; if either one lags behind, the next branch inherits a broken
state.

The classic alternative is **swapping**: at position \`i\`, swap \`nums[i]\` with \`nums[pos]\`,
recurse for \`pos + 1\`, then swap back. That version needs no \`used\` array at all — the marking
is implicit in the array's order — but it rearranges the input array, so copy it first if
\`nums\` is needed afterwards.

## Complexity

- Time: O(n · n!) — there are n! permutations and each stored result copies n values.
  Counted per recursive call, there are about n! · e calls.
- Space: O(n) for \`path\`, \`used\` and the recursion depth, beyond the output.
  The output itself is O(n · n!).

## Common mistakes

- Writing \`result.push(path)\` without copying, so every entry changes as \`path\` mutates.
- Forgetting to restore \`used[i] = false\`, so later branches look "out of elements" — the
  symptom is a result that is too small.
- Using \`start\` as in the subsets pattern, so only increasing permutations appear.
- Stopping at \`path.length === nums.length - 1\` and appending the last element manually; that
  frequently breaks the empty case and the single-element case.
- Not handling the empty array, so \`[]\` returns \`[]\` instead of \`[[]]\`.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function permutations(nums) {
  // write your solution here
}
`,
      solution: `function permutations(nums) {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }

      used[i] = true;
      path.push(nums[i]);

      backtrack();

      path.pop();
      used[i] = false;
    }
  }

  backtrack();

  return result;
}
`,
    },
    {
      language: 'python',
      template: `def permutations(nums):
    # write your solution here
    pass
`,
      solution: `def permutations(nums):
    result = []
    path = []
    used = [False] * len(nums)

    def backtrack():
        if len(path) == len(nums):
            result.append(list(path))
            return

        for i in range(len(nums)):
            if used[i]:
                continue

            used[i] = True
            path.append(nums[i])

            backtrack()

            path.pop()
            used[i] = False

    backtrack()

    return result
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[1, 2, 3]],
      expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c2',
      input: [[0, 1]],
      expected: [[0, 1], [1, 0]],
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
      input: [[7]],
      expected: [[7]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c5',
      input: [[-1, 0, 1]],
      expected: [
        [-1, 0, 1],
        [-1, 1, 0],
        [0, -1, 1],
        [0, 1, -1],
        [1, -1, 0],
        [1, 0, -1],
      ],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c6',
      input: [[1, 2, 3, 4]],
      expected: [
        [1, 2, 3, 4],
        [1, 2, 4, 3],
        [1, 3, 2, 4],
        [1, 3, 4, 2],
        [1, 4, 2, 3],
        [1, 4, 3, 2],
        [2, 1, 3, 4],
        [2, 1, 4, 3],
        [2, 3, 1, 4],
        [2, 3, 4, 1],
        [2, 4, 1, 3],
        [2, 4, 3, 1],
        [3, 1, 2, 4],
        [3, 1, 4, 2],
        [3, 2, 1, 4],
        [3, 2, 4, 1],
        [3, 4, 1, 2],
        [3, 4, 2, 1],
        [4, 1, 2, 3],
        [4, 1, 3, 2],
        [4, 2, 1, 3],
        [4, 2, 3, 1],
        [4, 3, 1, 2],
        [4, 3, 2, 1],
      ],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
  ],
};
