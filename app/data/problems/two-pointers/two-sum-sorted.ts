import type { Problem } from '~/types/content';

export const twoSumSorted: Problem = {
  slug: 'two-sum-sorted',
  title: {
    id: 'Two Sum II — Array Terurut',
    en: 'Two Sum II — Sorted Array',
  },
  difficulty: 'medium',
  trackId: 'two-pointers',
  order: 3,
  functionName: 'twoSumSorted',
  parameters: [
    { name: 'numbers', type: 'number[]' },
    { name: 'target', type: 'number' },
  ],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array \`numbers\` yang **sudah terurut menaik** dan sebuah bilangan \`target\`.

Temukan dua angka yang jumlahnya sama dengan \`target\`, lalu kembalikan **indeksnya
(dimulai dari 0) dalam urutan menaik**.

Setiap input punya tepat satu jawaban, dan satu elemen tidak boleh dipakai dua kali.

Karena array sudah terurut, kerjakan dengan **O(1) ruang tambahan** — jangan memakai
hash map.`,
    en: `You are given an array \`numbers\` that is **already sorted in ascending order**, and an
integer \`target\`.

Find two numbers that add up to \`target\`, then return **their indices (0-based) in
ascending order**.

Every input has exactly one answer, and the same element may not be used twice.

Because the array is already sorted, solve it with **O(1) extra space** — do not use a
hash map.`,
  },
  examples: [
    {
      input: 'numbers = [2, 7, 11, 15], target = 9',
      output: '[0, 1]',
      explanation: {
        id: 'numbers[0] + numbers[1] = 2 + 7 = 9.',
        en: 'numbers[0] + numbers[1] = 2 + 7 = 9.',
      },
    },
    {
      input: 'numbers = [2, 3, 4], target = 6',
      output: '[0, 2]',
      explanation: {
        id: 'numbers[0] + numbers[2] = 2 + 4 = 6. Perhatikan bahwa 3 + 3 tidak boleh karena satu elemen dipakai dua kali.',
        en: 'numbers[0] + numbers[2] = 2 + 4 = 6. Note that 3 + 3 is not allowed because it would reuse one element.',
      },
    },
  ],
  hints: {
    id: [
      'Coba mulai dari dua ujung array. Bagaimana jumlahnya dibandingkan target?',
      'Kalau jumlahnya terlalu kecil, di mana kamu harus mencari angka yang lebih besar?',
      'Kalau jumlahnya terlalu kecil, geser pointer kiri ke kanan. Kalau terlalu besar, geser pointer kanan ke kiri.',
    ],
    en: [
      'Start from the two ends of the array. How does their sum compare with the target?',
      'If the sum is too small, where would a bigger number be?',
      'If the sum is too small, move the left pointer right. If it is too big, move the right pointer left.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Letakkan satu pointer di ujung kiri dan satu di ujung kanan. Pada setiap langkah, periksa
jumlah keduanya:

- **Sama dengan target** → itulah jawabannya.
- **Lebih kecil dari target** → angka terkecil yang tersedia tidak mungkin menjadi bagian
  jawaban bersama pointer kanan mana pun. Geser pointer kiri ke kanan.
- **Lebih besar dari target** → sebaliknya, geser pointer kanan ke kiri.

Setiap langkah membuang satu kandidat secara pasti, sehingga total langkah paling banyak n.

## Kompleksitas

- Waktu: O(n) — setiap langkah menggeser salah satu pointer minimal satu posisi.
- Ruang: O(1) — hanya dua indeks.

## Kenapa ini benar

Ketika jumlahnya lebih kecil dari target, \`numbers[left]\` dipasangkan dengan nilai
terbesar yang tersedia (\`numbers[right]\`) pun masih kurang. Maka \`numbers[left]\` tidak
mungkin menjadi bagian jawaban sama sekali, dan aman dibuang. Alasan yang simetris berlaku
untuk sisi kanan.

## Kesalahan yang sering terjadi

Memakai hash map karena kebiasaan dari soal Two Sum sebelumnya. Itu tetap benar, tapi
memakai O(n) ruang tambahan, sementara keterurutan array memungkinkan solusi tanpa ruang
ekstra. Saat interview, sebutkan bahwa kamu memanfaatkan sifat terurut itu.`,
    en: `## Approach

Put one pointer at the far left and one at the far right. At each step, check their sum:

- **Equals the target** → that is the answer.
- **Smaller than the target** → the smallest available number cannot be part of the answer
  with any right pointer. Move the left pointer right.
- **Larger than the target** → symmetrically, move the right pointer left.

Every step discards one candidate for certain, so there are at most n steps.

## Complexity

- Time: O(n) — each step moves one pointer by at least one position.
- Space: O(1) — two indices only.

## Why it is correct

When the sum is below the target, \`numbers[left]\` paired with the largest available value
(\`numbers[right]\`) is still too small. So \`numbers[left]\` cannot be part of any answer and
can be discarded safely. The mirror argument holds for the right side.

## Common mistakes

Reaching for a hash map out of habit from the earlier Two Sum problem. That still works,
but it costs O(n) extra space, while the sorted order allows a solution with none. In an
interview, say out loud that you are exploiting the sorted property.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function twoSumSorted(numbers, target) {
  // write your solution here
}
`,
      solution: `function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left, right];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
`,
    },
    {
      language: 'python',
      template: `def twoSumSorted(numbers, target):
    # write your solution here
    pass
`,
      solution: `def twoSumSorted(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]

        if total == target:
            return [left, right]

        if total < target:
            left += 1
        else:
            right -= 1

    return []
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { id: 'c2', input: [[2, 3, 4], 6], expected: [0, 2] },
    { id: 'c3', input: [[-1, 0], -1], expected: [0, 1], hidden: true },
    { id: 'c4', input: [[1, 2, 3, 4, 5], 9], expected: [3, 4], hidden: true },
    { id: 'c5', input: [[5, 25, 75], 100], expected: [1, 2], hidden: true },
    { id: 'c6', input: [[3, 3], 6], expected: [0, 1], hidden: true },
  ],
};
