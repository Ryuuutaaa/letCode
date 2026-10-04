import type { Problem } from '~/types/content';

export const maxSumSubarraySizeK: Problem = {
  slug: 'max-sum-subarray-size-k',
  title: {
    id: 'Jumlah Terbesar Subarray Berukuran K',
    en: 'Maximum Sum Subarray of Size K',
  },
  difficulty: 'easy',
  trackId: 'sliding-window',
  order: 2,
  functionName: 'maxSumSubarraySizeK',
  parameters: [
    { name: 'nums', type: 'number[]' },
    { name: 'k', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\` dan bilangan bulat \`k\`.

Kembalikan **jumlah terbesar** dari sebuah subarray bersebelahan yang panjangnya tepat \`k\`.

"Bersebelahan" berarti elemennya harus berurutan pada array asli; kamu tidak boleh mengubah
urutan atau melompati elemen. Subarray di sini tidak boleh kosong.

Batasan: \`1 <= k <= nums.length <= 10^5\` dan \`-10^4 <= nums[i] <= 10^4\`.

Target: O(n), bukan O(n·k).`,
    en: `You are given an array of integers \`nums\` and an integer \`k\`.

Return the **largest sum** of a contiguous subarray whose length is exactly \`k\`.

"Contiguous" means the elements must be consecutive in the original array; you may not
reorder them or skip any. The subarray must not be empty.

Constraints: \`1 <= k <= nums.length <= 10^5\` and \`-10^4 <= nums[i] <= 10^4\`.

Target: O(n), not O(n·k).`,
  },
  examples: [
    {
      input: 'nums = [2, 1, 5, 1, 3, 2], k = 3',
      output: '9',
      explanation: {
        id: 'Subarray [5, 1, 3] berjumlah 9, lebih besar daripada [2, 1, 5] = 8, [1, 5, 1] = 7, dan [1, 3, 2] = 6.',
        en: 'The subarray [5, 1, 3] sums to 9, beating [2, 1, 5] = 8, [1, 5, 1] = 7, and [1, 3, 2] = 6.',
      },
    },
    {
      input: 'nums = [-3, -1, -2, -5], k = 2',
      output: '-3',
      explanation: {
        id: 'Semua nilai negatif, jadi jumlah terbesar datang dari pasangan yang paling tidak negatif: [-1, -2] = -3. Jawaban \`0\` akan salah di sini.',
        en: 'All values are negative, so the largest sum comes from the least negative pair: [-1, -2] = -3. An answer of \`0\` would be wrong here.',
      },
    },
    {
      input: 'nums = [5], k = 1',
      output: '5',
      explanation: {
        id: 'Hanya ada satu jendela yang mungkin, yaitu elemen tunggal itu sendiri.',
        en: 'Only one window is possible: the single element itself.',
      },
    },
  ],
  hints: {
    id: [
      'Hitung jumlah jendela pertama secara langsung — itu titik awal yang murah.',
      'Setelah itu kamu tidak perlu menjumlahkan ulang: jendela berikutnya hanya menukar satu elemen.',
      'Jendela baru = jendela lama + elemen yang masuk di kanan − elemen yang keluar di kiri.',
      'Jangan memulai jawaban dari \`0\`, karena semua nilai bisa negatif.',
    ],
    en: [
      'Compute the sum of the first window directly — that is a cheap starting point.',
      'After that you never need to re-add: the next window just swaps one element.',
      'New window = old window + the element entering on the right − the element leaving on the left.',
      'Do not seed the answer with \`0\`, because every value may be negative.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Jendela tetap yang paling dasar.

1. Jumlahkan \`nums[0] .. nums[k - 1]\` untuk mendapatkan jendela pertama. Ini O(k), dibayar
   sekali saja.
2. Simpan jumlah itu sebagai jawaban sementara.
3. Untuk \`i\` dari \`k\` sampai \`nums.length - 1\`:
   - \`window = window + nums[i] - nums[i - k]\`
   - perbarui jawaban kalau \`window\` lebih besar.

Rumus pemindahan itulah inti polanya: satu elemen masuk, satu elemen keluar, dan jumlahnya
diperbarui dalam O(1). Menghitung ulang \`k\` elemen di setiap langkah membawa kompleksitas
kembali ke O(n·k) — masih benar, tapi lambat pada input besar.

## Kompleksitas

- Waktu: O(n) — jendela pertama O(k), lalu \`n - k\` langkah O(1) masing-masing.
- Ruang: O(1) — hanya satu penampung jumlah dan satu jawaban.

## Kesalahan yang sering terjadi

- Menghitung ulang jumlah setiap jendela. Benar, tetapi O(n·k) dan gagal pada \`k\` besar.
- Batas loop keliru: \`i\` harus mulai dari \`k\`, dan elemen yang keluar adalah \`nums[i - k]\`,
  bukan \`nums[i - 1]\`.
- Memulai jawaban dari \`0\`. Kalau semua nilai negatif, jawaban sebenarnya negatif dan \`0\`
  akan salah bertahan.
- Lupa bahwa \`k\` bisa sama dengan panjang array, sehingga hanya ada satu jendela dan loop
  kedua tidak berjalan sama sekali.`,
    en: `## Approach

The most basic fixed window.

1. Sum \`nums[0] .. nums[k - 1]\` to get the first window. That is O(k), paid once.
2. Keep that sum as the running answer.
3. For \`i\` from \`k\` to \`nums.length - 1\`:
   - \`window = window + nums[i] - nums[i - k]\`
   - update the answer when \`window\` is larger.

That slide formula is the heart of the pattern: one element in, one element out, and the sum
updated in O(1). Re-summing \`k\` elements on every step takes the complexity back to O(n·k) —
still correct, but slow on large inputs.

## Complexity

- Time: O(n) — O(k) for the first window, then \`n - k\` steps of O(1).
- Space: O(1) — one accumulator and one answer.

## Common mistakes

- Recomputing the sum for every window. Correct, but O(n·k) and too slow when \`k\` is large.
- Wrong loop boundary: \`i\` must start at \`k\`, and the element leaving is \`nums[i - k]\`, not
  \`nums[i - 1]\`.
- Seeding the answer with \`0\`. When every value is negative the true answer is negative, and
  \`0\` incorrectly survives.
- Forgetting that \`k\` can equal the array length, leaving a single window and a second loop
  that never runs.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function maxSumSubarraySizeK(nums, k) {
  // write your solution here
}
`,
      solution: `function maxSumSubarraySizeK(nums, k) {
  let window = 0;

  for (let i = 0; i < k; i++) {
    window += nums[i];
  }

  let best = window;

  for (let i = k; i < nums.length; i++) {
    window += nums[i] - nums[i - k];

    if (window > best) {
      best = window;
    }
  }

  return best;
}
`,
    },
    {
      language: 'python',
      template: `def maxSumSubarraySizeK(nums, k):
    # write your solution here
    pass
`,
      solution: `def maxSumSubarraySizeK(nums, k):
    window = 0

    for i in range(k):
        window += nums[i]

    best = window

    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]

        if window > best:
            best = window

    return best
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[2, 1, 5, 1, 3, 2], 3],
      expected: 9,
    },
    {
      id: 'c2',
      input: [[-3, -1, -2, -5], 2],
      expected: -3,
    },
    {
      id: 'c3',
      input: [[5], 1],
      expected: 5,
    },
    {
      id: 'c4',
      input: [[-1, -2, -3, -4], 2],
      expected: -3,
      hidden: true,
    },
    {
      id: 'c5',
      input: [[1, 2, 3, 4, 5], 5],
      expected: 15,
      hidden: true,
    },
    {
      id: 'c6',
      input: [[0, 0, 0], 2],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c7',
      input: [[1000000, 1000000, 1000000], 2],
      expected: 2000000,
      hidden: true,
    },
    {
      id: 'c8',
      input: [[7, -3, 2, 9, -5, 4], 3],
      expected: 8,
      hidden: true,
    },
  ],
};
