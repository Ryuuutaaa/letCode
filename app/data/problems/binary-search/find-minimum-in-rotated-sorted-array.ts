import type { Problem } from '~/types/content';

export const findMinimumInRotatedSortedArray: Problem = {
  slug: 'find-minimum-in-rotated-sorted-array',
  title: {
    id: 'Minimum di Array Terurut yang Dirotasi',
    en: 'Find Minimum in Rotated Sorted Array',
  },
  difficulty: 'medium',
  trackId: 'binary-search',
  order: 4,
  functionName: 'findMin',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Sebuah array berisi \`n\` bilangan bulat berbeda yang mula-mula terurut menaik, lalu
dirotasi sebanyak \`k\` posisi, dengan \`0 <= k < n\`. Rotasi memindahkan \`k\` elemen pertama ke
belakang, sehingga array berbentuk:

\`[nums[k], nums[k + 1], ..., nums[n - 1], nums[0], ..., nums[k - 1]]\`

Diberikan array hasil rotasi tersebut. Kembalikan **elemen terkecil** di dalamnya.

Array berisi minimal satu elemen. Nilainya bisa negatif. Solusi kamu harus berjalan dalam
O(log n) — memindai seluruh array tidak diterima.

Karena \`k\` boleh bernilai 0, array bisa saja dalam keadaan masih terurut sepenuhnya.`,
    en: `An array of \`n\` distinct integers was sorted in ascending order and then rotated by \`k\`
positions, with \`0 <= k < n\`. The rotation moves the first \`k\` elements to the back, so the
array looks like:

\`[nums[k], nums[k + 1], ..., nums[n - 1], nums[0], ..., nums[k - 1]]\`

You are given that rotated array. Return the **smallest element** in it.

The array holds at least one element. Values may be negative. Your solution must run in
O(log n) — scanning the whole array is not accepted.

Because \`k\` may be 0, the array can also still be fully sorted.`,
  },
  examples: [
    {
      input: 'nums = [3, 4, 5, 1, 2]',
      output: '1',
      explanation: {
        id: 'Array aslinya [1, 2, 3, 4, 5] dirotasi 3 posisi. Minimumnya 1 dan berada setelah titik penurunan 5 -> 1.',
        en: 'The original array [1, 2, 3, 4, 5] was rotated by 3. The minimum is 1 and sits right after the drop from 5 to 1.',
      },
    },
    {
      input: 'nums = [4, 5, 6, 7, 0, 1, 2]',
      output: '0',
      explanation: {
        id: 'Array aslinya [0, 1, 2, 4, 5, 6, 7] dirotasi 4 posisi. Titik penurunannya adalah 7 -> 0.',
        en: 'The original array [0, 1, 2, 4, 5, 6, 7] was rotated by 4. The drop happens at 7 -> 0.',
      },
    },
    {
      input: 'nums = [11, 13, 15, 17]',
      output: '11',
      explanation: {
        id: 'Tidak ada rotasi sama sekali (k = 0), sehingga elemen terkecil ada di indeks 0.',
        en: 'There is no rotation at all (k = 0), so the smallest element is at index 0.',
      },
    },
  ],
  hints: {
    id: [
      'Array ini tidak terurut secara global, tetapi tidak sepenuhnya acak. Coba bandingkan elemen tengah dengan elemen terakhir.',
      'Kalau `nums[mid] > nums[hi]`, di mana minimum pasti berada? Apakah mungkin ia ada di kiri `mid`?',
      'Kalau `nums[mid] <= nums[hi]`, maka separuh kanan sudah terurut menaik, sehingga minimum tidak mungkin ada di sana — kecuali di `mid` itu sendiri.',
      'Pakai rentang setengah terbuka dengan `hi = mid` (tanpa `- 1`) pada cabang yang menyimpan `mid`, lalu berhenti ketika `lo === hi`.',
    ],
    en: [
      'The array is not globally sorted, but it is far from random. Try comparing the middle element with the last element.',
      'If `nums[mid] > nums[hi]`, where must the minimum live? Can it possibly be left of `mid`?',
      'If `nums[mid] <= nums[hi]`, the right half is already ascending, so the minimum cannot be there — except at `mid` itself.',
      'Use a half-open range with `hi = mid` (no `- 1`) on the branch that keeps `mid`, then stop when `lo === hi`.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Rotasi menggantikan satu bagian array yang sebelumnya terurut dengan pola "besar dulu, kecil
kemudian". Karena nilainya berbeda, array hasil rotasi selalu berbentuk dua bagian naik:
bagian atas lalu bagian bawah, dan **elemen terkecil tepat berada di awal bagian kedua**.

Yang kita cari sebenarnya bukan sebuah nilai, melainkan **indeks tempat keadaan berbalik** —
dan itu pola pencarian batas.

Simpan \`lo = 0\` dan \`hi = nums.length - 1\`, lalu ulangi selama \`lo < hi\`:

1. \`mid = lo + Math.floor((hi - lo) / 2)\`
2. Kalau \`nums[mid] > nums[hi]\`, berarti bagian penurunan ada di kanan \`mid\`. Mengapa?
   Karena \`nums[hi]\` lebih kecil dari \`nums[mid]\`, sementara di sebelah kiri \`mid\` semuanya lebih
   besar dari \`nums[hi]\` — jadi minimum pasti berada di \`mid + 1\` sampai \`hi\`.
3. Kalau \`nums[mid] <= nums[hi]\`, maka rentang \`mid\` sampai \`hi\` sudah terurut menaik, jadi
   minimum tidak mungkin di kanan \`mid\`. Kita pindahkan \`hi = mid\`, bukan \`mid - 1\`, karena
   \`mid\` sendiri masih bisa menjadi minimum.
4. Loop berhenti ketika \`lo === hi\`, dan \`nums[lo]\` adalah jawabannya.

Selalu bandingkan dengan \`nums[hi]\`, bukan \`nums[lo]\`. Memakai \`nums[lo]\` sebagai pembanding memang
bisa dibuat benar, tetapi memerlukan penanganan khusus untuk kasus tanpa rotasi.

## Kompleksitas

- Waktu: O(log n) — separuh ruang dibuang setiap langkah.
- Ruang: O(1).

## Kesalahan yang sering terjadi

- Memakai \`hi = mid - 1\` pada cabang \`nums[mid] <= nums[hi]\`. Kalau \`mid\` justru elemen
  minimumnya, nilainya terbuang dan jawabannya meleset.
- Memakai \`lo = mid\` pada cabang \`nums[mid] > nums[hi]\`. Karena \`mid\` sudah terbukti bukan
  minimum, mempertahankannya membuat rentang dua elemen tidak pernah menyusut alias loop tak
  berhenti.
- Membandingkan dengan \`nums[lo]\` tanpa memikirkan keadaan "tidak dirotasi sama sekali",
  sehingga array yang sudah terurut penuh menghasilkan jawaban yang salah.
- Berasumsi array selalu terurut menaik lalu mengembalikan \`nums[0]\`. Benar hanya untuk
  \`k = 0\`, dan salah untuk setiap rotasi lain.
- Melupakan kasus satu elemen. Dengan \`while (lo < hi)\`, \`lo\` dan \`hi\` sama-sama 0, loop tidak
  berjalan, dan \`nums[0]\` langsung dikembalikan — jadi sudah benar, tetapi pastikan tahu
  alasannya.`,
    en: `## Approach

A rotation replaces one ascending stretch with a "high first, low after" pattern. Because the
values are distinct, the rotated array always looks like two ascending pieces — the high part
followed by the low part — and **the smallest element sits exactly at the start of the second
piece**.

What we are looking for is not really a value but the **index where the state flips** — the
bound search pattern.

Keep \`lo = 0\` and \`hi = nums.length - 1\`, then repeat while \`lo < hi\`:

1. \`mid = lo + Math.floor((hi - lo) / 2)\`
2. If \`nums[mid] > nums[hi]\`, the descent lies to the right of \`mid\`. Why? Because \`nums[hi]\`
   is smaller than \`nums[mid]\` while everything left of \`mid\` is bigger than \`nums[hi]\` — so
   the minimum must be between \`mid + 1\` and \`hi\`.
3. If \`nums[mid] <= nums[hi]\`, the range from \`mid\` to \`hi\` is already ascending, so the
   minimum cannot lie right of \`mid\`. Move \`hi = mid\`, not \`mid - 1\`, because \`mid\` itself
   may still be the minimum.
4. The loop stops when \`lo === hi\`, and \`nums[lo]\` is the answer.

Always compare against \`nums[hi]\`, not \`nums[lo]\`. Comparing against \`nums[lo]\` can be made
correct, but it needs a special case for the unrotated array.

## Complexity

- Time: O(log n) — half the space is discarded at every step.
- Space: O(1).

## Common mistakes

- Using \`hi = mid - 1\` on the \`nums[mid] <= nums[hi]\` branch. If \`mid\` happens to hold the
  minimum, that value is thrown away and the answer is off.
- Using \`lo = mid\` on the \`nums[mid] > nums[hi]\` branch. Since \`mid\` is already proven not to
  be the minimum, keeping it freezes a two-element range forever — an endless loop.
- Comparing against \`nums[lo]\` without thinking about the "never rotated" state, so a fully
  sorted array yields the wrong answer.
- Assuming the array is ascending and returning \`nums[0]\`. That is right only for \`k = 0\` and
  wrong for every other rotation.
- Forgetting the single-element case. With \`while (lo < hi)\`, both \`lo\` and \`hi\` are 0, the
  loop never runs, and \`nums[0]\` is returned — already correct, but know why.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function findMin(nums) {
  // write your solution here
}
`,
      solution: `function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (nums[mid] > nums[hi]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return nums[lo];
}
`,
    },
    {
      language: 'python',
      template: `def findMin(nums):
    # write your solution here
    pass
`,
      solution: `def findMin(nums):
    lo, hi = 0, len(nums) - 1

    while lo < hi:
        mid = lo + (hi - lo) // 2

        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid

    return nums[lo]
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[3, 4, 5, 1, 2]], expected: 1 },
    { id: 'c2', input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
    { id: 'c3', input: [[11, 13, 15, 17]], expected: 11, hidden: true },
    { id: 'c4', input: [[2, 1]], expected: 1, hidden: true },
    { id: 'c5', input: [[1]], expected: 1, hidden: true },
    { id: 'c6', input: [[-50, -3, -200, -150, -100]], expected: -200, hidden: true },
    { id: 'c7', input: [[2, 3, 4, 5, 6, 7, 1]], expected: 1, hidden: true },
    { id: 'c8', input: [[5, 1, 2, 3, 4]], expected: 1, hidden: true },
  ],
};
