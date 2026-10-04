import type { Problem } from '~/types/content';

export const threeSum: Problem = {
  slug: 'three-sum',
  title: {
    id: '3Sum',
    en: '3Sum',
  },
  difficulty: 'medium',
  trackId: 'two-pointers',
  order: 5,
  functionName: 'threeSum',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\`.

Kembalikan **semua triplet unik** \`[nums[i], nums[j], nums[k]]\` dengan \`i\`, \`j\`, \`k\`
berbeda, sehingga \`nums[i] + nums[j] + nums[k] === 0\`.

Hasil tidak boleh memuat triplet kembar.

**Urutan triplet maupun urutan angka di dalam triplet tidak penting** — yang dinilai
adalah himpunan triplet yang kamu hasilkan.

Target: O(n²), bukan O(n³).`,
    en: `You are given an array of integers \`nums\`.

Return **all unique triplets** \`[nums[i], nums[j], nums[k]]\` with distinct \`i\`, \`j\`, \`k\`
such that \`nums[i] + nums[j] + nums[k] === 0\`.

The result must not contain duplicate triplets.

**Neither the order of the triplets nor the order within a triplet matters** — only the
set of triplets you produce is judged.

Target: O(n²), not O(n³).`,
  },
  examples: [
    {
      input: 'nums = [-1, 0, 1, 2, -1, -4]',
      output: '[[-1, -1, 2], [-1, 0, 1]]',
      explanation: {
        id: 'Dua triplet yang berbeda; semua kombinasi lain tidak berjumlah nol atau kembar.',
        en: 'Two distinct triplets; every other combination either does not sum to zero or is a duplicate.',
      },
    },
    {
      input: 'nums = [0, 1, 1]',
      output: '[]',
      explanation: {
        id: 'Tidak ada triplet yang berjumlah nol.',
        en: 'No triplet sums to zero.',
      },
    },
  ],
  hints: {
    id: [
      'Bagaimana kalau array-nya terurut dulu?',
      'Setelah terurut, kunci satu angka, lalu selesaikan sisanya sebagai masalah dua angka.',
      'Setelah menemukan satu jawaban, geser kedua pointer melewati semua nilai yang sama supaya tidak ada triplet kembar.',
    ],
    en: [
      'What if the array were sorted first?',
      'Once sorted, fix one number, then solve the remainder as a two-number problem.',
      'After finding one answer, move both pointers past every equal value so no duplicate triplet appears.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Urutkan array terlebih dahulu. Pengurutan membuka dua hal sekaligus: dua pointer menjadi
mungkin, dan deteksi duplikat menjadi mudah karena angka yang sama selalu bersebelahan.

Lalu, untuk setiap indeks \`i\`:

1. Lewati \`i\` kalau nilainya sama dengan \`i - 1\`.
2. Pasang dua pointer: \`left = i + 1\` dan \`right = n - 1\`.
3. Hitung \`nums[i] + nums[left] + nums[right]\`:
   - Sama dengan nol → simpan triplet, lalu geser kedua pointer melewati nilai kembar.
   - Terlalu kecil → geser \`left\` ke kanan.
   - Terlalu besar → geser \`right\` ke kiri.

## Kompleksitas

- Waktu: O(n²) — pengurutan O(n log n), lalu satu loop dengan dua pointer di dalamnya.
- Ruang: O(1) tambahan di luar hasil dan biaya pengurutan.

## Kenapa duplikat harus ditangani di dua tempat

Ada dua sumber triplet kembar:

1. **Nilai \`i\` yang sama** dipakai dua kali. Dicegah dengan melewati \`i\` jika sama dengan
   sebelumnya.
2. **Pointer yang tetap pada nilai yang sama** setelah menemukan jawaban. Dicegah dengan
   menggeser \`left\` dan \`right\` melewati semua nilai kembar sebelum lanjut.

Melewatkan salah satunya akan menghasilkan triplet kembar pada input seperti \`[0, 0, 0, 0]\`.

## Kesalahan yang sering terjadi

- Memakai loop tiga tingkat. Benar tetapi O(n³) dan akan kehabisan waktu.
- Lupa mengurutkan, sehingga dua pointer tidak bermakna.
- Mengembalikan indeks, padahal soal meminta nilai.`,
    en: `## Approach

Sort the array first. Sorting unlocks two things at once: two pointers become possible,
and duplicate detection becomes easy because equal values sit next to each other.

Then, for every index \`i\`:

1. Skip \`i\` if its value equals the one at \`i - 1\`.
2. Set two pointers: \`left = i + 1\` and \`right = n - 1\`.
3. Compute \`nums[i] + nums[left] + nums[right]\`:
   - Equals zero → record the triplet, then move both pointers past equal values.
   - Too small → move \`left\` right.
   - Too large → move \`right\` left.

## Complexity

- Time: O(n²) — O(n log n) to sort, then one loop with two pointers inside.
- Space: O(1) extra beyond the result and the sorting cost.

## Why duplicates must be handled in two places

There are two sources of duplicate triplets:

1. **The same \`i\` value** used twice. Prevented by skipping \`i\` when it equals the previous.
2. **Pointers resting on the same value** after a hit. Prevented by moving \`left\` and
   \`right\` past all equal values before continuing.

Missing either one produces duplicate triplets on inputs like \`[0, 0, 0, 0]\`.

## Common mistakes

- Using three nested loops. Correct but O(n³) and it will time out.
- Forgetting to sort, which makes two pointers meaningless.
- Returning indices when the problem asks for values.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function threeSum(nums) {
  // write your solution here
}
`,
      solution: `function threeSum(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length - 2; i++) {
    if (sorted[i] > 0) {
      break;
    }
    if (i > 0 && sorted[i] === sorted[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];

      if (sum === 0) {
        result.push([sorted[i], sorted[left], sorted[right]]);

        while (left < right && sorted[left] === sorted[left + 1]) {
          left++;
        }
        while (left < right && sorted[right] === sorted[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
`,
    },
    {
      language: 'python',
      template: `def threeSum(nums):
    # write your solution here
    pass
`,
      solution: `def threeSum(nums):
    ordered = sorted(nums)
    result = []

    for i in range(len(ordered) - 2):
        if ordered[i] > 0:
            break
        if i > 0 and ordered[i] == ordered[i - 1]:
            continue

        left, right = i + 1, len(ordered) - 1

        while left < right:
            total = ordered[i] + ordered[left] + ordered[right]

            if total == 0:
                result.append([ordered[i], ordered[left], ordered[right]])

                while left < right and ordered[left] == ordered[left + 1]:
                    left += 1
                while left < right and ordered[right] == ordered[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[-1, 0, 1, 2, -1, -4]],
      expected: [[-1, -1, 2], [-1, 0, 1]],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c2',
      input: [[0, 1, 1]],
      expected: [],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c3',
      input: [[0, 0, 0]],
      expected: [[0, 0, 0]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c4',
      input: [[0, 0, 0, 0]],
      expected: [[0, 0, 0]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c5',
      input: [[-2, 0, 1, 1, 2]],
      expected: [[-2, 0, 2], [-2, 1, 1]],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c6',
      input: [[1, 2, 3]],
      expected: [],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
  ],
};
