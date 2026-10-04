import type { Problem } from '~/types/content';

export const containerWithMostWater: Problem = {
  slug: 'container-with-most-water',
  title: {
    id: 'Container With Most Water',
    en: 'Container With Most Water',
  },
  difficulty: 'medium',
  trackId: 'two-pointers',
  order: 4,
  functionName: 'maxArea',
  parameters: [{ name: 'height', type: 'number[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array \`height\` dengan panjang n. Di posisi \`i\` berdiri sebuah garis
vertikal setinggi \`height[i]\`.

Pilih dua garis yang, bersama sumbu horizontal, membentuk sebuah wadah. Wadah itu
menampung air sebanyak:

\`\`\`
lebar × tinggi air = (j - i) × min(height[i], height[j])
\`\`\`

Kembalikan **volume air maksimum** yang bisa ditampung. Wadah tidak boleh dimiringkan.`,
    en: `You are given an array \`height\` of length n. At position \`i\` stands a vertical line
of height \`height[i]\`.

Choose two lines that, together with the horizontal axis, form a container. That container
holds this much water:

\`\`\`
width × water level = (j - i) × min(height[i], height[j])
\`\`\`

Return the **maximum amount of water** the container can hold. The container cannot be
tilted.`,
  },
  examples: [
    {
      input: 'height = [1,8,6,2,5,4,8,3,7]',
      output: '49',
      explanation: {
        id: 'Garis di indeks 1 dan 8: lebar 7, tinggi air min(8, 7) = 7, sehingga 49.',
        en: 'The lines at indices 1 and 8: width 7, water level min(8, 7) = 7, giving 49.',
      },
    },
    {
      input: 'height = [1, 1]',
      output: '1',
      explanation: {
        id: 'Lebar 1 dan tinggi air 1.',
        en: 'Width 1 and water level 1.',
      },
    },
  ],
  hints: {
    id: [
      'Kalau kamu memilih dua garis, apa yang menentukan tinggi air? Yang lebih tinggi atau yang lebih pendek?',
      'Mulai dari wadah terlebar: dua ujung array. Bisakah kamu memperbaikinya?',
      'Ketika kamu menggeser pointer, lebarnya selalu berkurang. Jadi satu-satunya harapan memperbaiki adalah menaikkan tinggi air — artinya geser garis yang lebih pendek.',
    ],
    en: [
      'When you pick two lines, which one decides the water level — the taller or the shorter?',
      'Start from the widest container: the two ends of the array. Can you improve on it?',
      'When you move a pointer the width always shrinks. So the only hope of improving is a higher water level — which means moving the shorter line.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Tinggi air selalu ditentukan oleh **garis yang lebih pendek**. Jadi kalau salah satu garis
pendek, garis itu membatasi seluruh wadah, tidak peduli setinggi apa garis di sebelahnya.

Mulai dari dua ujung array — wadah terlebar yang mungkin. Lalu:

1. Hitung luas saat ini.
2. Geser **garis yang lebih pendek** ke dalam.
3. Ulangi sampai kedua pointer bertemu.

## Kenapa menggeser garis yang lebih pendek itu benar

Misalkan \`height[left] <= height[right]\`. Untuk setiap pasangan yang memakai \`left\`
dengan \`j\` mana pun di sebelah kiri \`right\`, lebarnya lebih kecil dan tinggi airnya
paling tinggi \`height[left]\` — jadi luasnya tidak mungkin melebihi yang sekarang.
Artinya \`left\` sudah tidak berguna, dan aman ditinggalkan.

Menggeser garis yang lebih tinggi justru salah: lebarnya berkurang sementara tinggi air
tetap dibatasi garis pendek yang tidak bergerak, sehingga luasnya pasti mengecil.

## Kompleksitas

- Waktu: O(n) — setiap langkah menggeser satu pointer.
- Ruang: O(1).

## Kesalahan yang sering terjadi

Menggeser pointer yang lebih tinggi, atau memakai loop bersarang untuk memeriksa semua
pasangan. Yang kedua memang benar, tapi O(n²) dan akan gagal pada input besar.`,
    en: `## Approach

The water level is always set by the **shorter line**. So if one line is short, it caps the
entire container no matter how tall its partner is.

Start from the two ends of the array — the widest container possible. Then:

1. Measure the current area.
2. Move the **shorter line** inward.
3. Repeat until the pointers meet.

## Why moving the shorter line is correct

Suppose \`height[left] <= height[right]\`. For every pair that uses \`left\` with any \`j\`
to the left of \`right\`, the width is smaller and the water level is at most
\`height[left]\` — so the area can never beat the current one. That means \`left\` is
useless and can be abandoned safely.

Moving the taller line instead is wrong: the width shrinks while the water level is still
capped by the short line that did not move, so the area is guaranteed to drop.

## Complexity

- Time: O(n) — each step moves one pointer.
- Space: O(1).

## Common mistakes

Moving the taller pointer, or using nested loops to check every pair. The latter is
correct but O(n²) and will fail on large inputs.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function maxArea(height) {
  // write your solution here
}
`,
      solution: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const area = Math.min(height[left], height[right]) * width;

    if (area > best) {
      best = area;
    }

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return best;
}
`,
    },
    {
      language: 'python',
      template: `def maxArea(height):
    # write your solution here
    pass
`,
      solution: `def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = min(height[left], height[right]) * (right - left)

        if area > best:
            best = area

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
    { id: 'c2', input: [[1, 1]], expected: 1 },
    { id: 'c3', input: [[4, 3, 2, 1, 4]], expected: 16, hidden: true },
    { id: 'c4', input: [[1, 2, 1]], expected: 2, hidden: true },
    { id: 'c5', input: [[1, 1, 1, 1]], expected: 3, hidden: true },
    { id: 'c6', input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17, hidden: true },
  ],
};
