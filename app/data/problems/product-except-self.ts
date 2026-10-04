import type { Problem } from '~/types/content';

export const productExceptSelf: Problem = {
  slug: 'product-except-self',
  title: 'Product of Array Except Self',
  difficulty: 'medium',
  trackId: 'arrays-hashing',
  order: 4,
  functionName: 'productExceptSelf',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: `Diberikan sebuah array bilangan bulat \`nums\`.

Kembalikan array \`output\` dengan panjang yang sama, di mana \`output[i]\` adalah hasil
kali **semua elemen \`nums\` kecuali \`nums[i]\`**.

Kerjakan dalam O(n) tanpa memakai operasi pembagian.

Catatan: karena ada test case yang memuat angka nol, pendekatan yang mengandalkan
pembagian total akan gagal.`,
  examples: [
    {
      input: 'nums = [1, 2, 3, 4]',
      output: '[24, 12, 8, 6]',
      explanation:
        'output[0] = 2*3*4, output[1] = 1*3*4, output[2] = 1*2*4, output[3] = 1*2*3.',
    },
    {
      input: 'nums = [-1, 1, 0, -3, 3]',
      output: '[0, 0, 9, 0, 0]',
    },
  ],
  hints: [
    'Untuk setiap posisi, hasilnya adalah hasil kali semua elemen di kiri dikali semua elemen di kanan.',
    'Hitung hasil kali kiri untuk semua posisi dalam satu lintasan maju.',
    'Lalu lintasi mundur sambil membawa hasil kali kanan, dan kalikan langsung ke output.',
  ],
  explanation: `## Pendekatan

Untuk posisi \`i\`, jawabannya adalah \`(hasil kali semua di kiri i) * (hasil kali semua di kanan i)\`.

**Lintasan maju:** simpan hasil kali elemen sebelum \`i\` ke dalam \`output[i]\`.
Setelah lintasan ini, \`output[i]\` berisi hasil kali seluruh elemen di kiri \`i\`.

**Lintasan mundur:** bawa satu variabel berisi hasil kali seluruh elemen di kanan \`i\`,
lalu kalikan ke \`output[i]\`. Setelah keduanya, \`output[i]\` berisi jawaban lengkap.

## Kompleksitas

- Waktu: O(n) — dua kali lintasan.
- Ruang: O(1) tambahan, di luar array output. Ini yang membuat pendekatan ini menang.

## Kesalahan yang sering terjadi

Memakai pembagian total lalu membagi dengan \`nums[i]\`. Cara itu langsung gagal begitu
ada angka nol di dalam array, dan juga tidak menjawab syarat O(n) tambahan ruang.`,
  templates: [
    {
      language: 'javascript',
      template: `function productExceptSelf(nums) {
  // tulis solusimu di sini
}
`,
      solution: `function productExceptSelf(nums) {
  const n = nums.length;
  const output = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    output[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= suffix;
    suffix *= nums[i];
  }

  return output;
}
`,
    },
    {
      language: 'python',
      template: `def productExceptSelf(nums):
    # tulis solusimu di sini
    pass
`,
      solution: `def productExceptSelf(nums):
    n = len(nums)
    output = [1] * n

    prefix = 1
    for i in range(n):
        output[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        output[i] *= suffix
        suffix *= nums[i]

    return output
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
    { id: 'c2', input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    { id: 'c3', input: [[2, 3]], expected: [3, 2], hidden: true },
    { id: 'c4', input: [[5]], expected: [1], hidden: true },
    { id: 'c5', input: [[0, 0]], expected: [0, 0], hidden: true },
  ],
};
