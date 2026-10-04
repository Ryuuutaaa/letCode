import type { Problem } from '~/types/content';

export const letterCombinationsOfAPhoneNumber: Problem = {
  slug: 'letter-combinations-of-a-phone-number',
  title: {
    id: 'Kombinasi Huruf Nomor Telepon',
    en: 'Letter Combinations of a Phone Number',
  },
  difficulty: 'medium',
  trackId: 'backtracking',
  order: 4,
  functionName: 'letterCombinations',
  parameters: [{ name: 'digits', type: 'string' }],
  returnType: 'string[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan string \`digits\` yang hanya berisi angka \`2\` sampai \`9\`. Bayangkan papan tombol
telepon lama, di mana setiap angka mewakili beberapa huruf:

\`\`\`text
2: abc    3: def    4: ghi    5: jkl
6: mno    7: pqrs   8: tuv    9: wxyz
\`\`\`

Kembalikan **semua kombinasi huruf** yang bisa dibentuk, dengan aturan: satu huruf diambil dari
setiap angka, mengikuti urutan \`digits\`.

Contoh: \`digits = "23"\` menghasilkan 9 string, mulai dari \`"ad"\` sampai \`"cf"\` — pilih satu
huruf dari \`"abc"\` untuk angka pertama, lalu satu huruf dari \`"def"\` untuk angka kedua.

**Urutan string di dalam hasil tidak penting.**

Kalau \`digits\` kosong, kembalikan array kosong \`[]\`. Perhatikan bahwa hasilnya bukan
\`[""]\` — tidak ada kombinasi yang bisa dibentuk dari nol angka.

Jumlah string yang dihasilkan sama dengan hasil kali banyaknya huruf di setiap angka, jadi
paling besar 4ⁿ untuk \`digits\` sepanjang n.`,
    en: `You are given a string \`digits\` containing only the digits \`2\` through \`9\`. Picture the
keypad of an old phone, where every digit stands for a few letters:

\`\`\`text
2: abc    3: def    4: ghi    5: jkl
6: mno    7: pqrs   8: tuv    9: wxyz
\`\`\`

Return **every letter combination** you can form, taking one letter from each digit, in the
order the digits appear in \`digits\`.

For example \`digits = "23"\` yields 9 strings, from \`"ad"\` to \`"cf"\` — pick one letter from
\`"abc"\` for the first digit, then one from \`"def"\` for the second.

**The order of the strings in your result does not matter.**

If \`digits\` is empty, return an empty array \`[]\`. Note that the answer is not \`[""]\` — there
is no combination to build from zero digits.

The number of strings equals the product of the letter counts of each digit, so at most 4ⁿ for a
\`digits\` string of length n.`,
  },
  examples: [
    {
      input: 'digits = "23"',
      output: '["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]',
      explanation: {
        id: 'Tiga huruf dari angka 2 dikalikan tiga huruf dari angka 3 menghasilkan 9 kombinasi. Urutan penulisannya bebas.',
        en: 'Three letters from the digit 2 times three letters from 3 gives 9 combinations. The order you write them in is free.',
      },
    },
    {
      input: 'digits = ""',
      output: '[]',
      explanation: {
        id: 'Tidak ada angka, sehingga tidak ada kombinasi. Jawabannya array kosong, bukan array berisi satu string kosong.',
        en: 'No digits means no combinations. The answer is an empty array, not an array holding one empty string.',
      },
    },
    {
      input: 'digits = "7"',
      output: '["p", "q", "r", "s"]',
      explanation: {
        id: 'Angka 7 punya empat huruf, lebih banyak dari angka lain. Panjang hasil mengikuti panjang input.',
        en: 'The digit 7 carries four letters, more than the others. The output length follows the input length.',
      },
    },
  ],
  hints: {
    id: [
      'Setiap angka hanya menyumbang satu huruf. Apa artinya itu untuk panjang setiap string hasil?',
      'Telusuri `digits` dari kiri ke kanan. Pada posisi `index`, coba setiap huruf milik `digits[index]`.',
      'Ketika `index` sudah sama dengan panjang `digits`, kombinasi selesai — simpan salinan jalurnya sebagai string.',
      'Tangani `digits` kosong di awal dan kembalikan `[]`. Kalau tidak, versi rekursifmu akan menyimpan satu string kosong.',
    ],
    en: [
      'Each digit contributes exactly one letter. What does that say about the length of every output string?',
      'Walk `digits` from left to right. At position `index`, try each letter that belongs to `digits[index]`.',
      'Once `index` equals the length of `digits` the combination is complete — record a copy of the path as a string.',
      'Handle empty `digits` up front and return `[]`. Otherwise the recursive version records one empty string.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Ini adalah kerangka backtracking yang sama dengan permutasi, tetapi daftar pilihannya
**berbeda di setiap langkah**: pada posisi ke-\`index\` pilihannya adalah huruf-huruf milik
\`digits[index]\`.

\`\`\`js
const letters = {
  2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',
  6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz',
};

function backtrack(index) {
  if (index === digits.length) {           // semua angka sudah dipakai
    result.push(path.join(''));
    return;
  }

  for (const ch of letters[digits[index]]) {
    path.push(ch);                         // pilih
    backtrack(index + 1);                  // jelajahi
    path.pop();                            // batalkan
  }
}
\`\`\`

Perhatikan perbedaan penting dari pola sebelumnya: **kedalaman rekursi ditentukan oleh
\`index\`, bukan oleh isi \`path\`**. Karena setiap angka menyumbang tepat satu huruf, \`path\`
selalu bertambah satu setiap kali masuk lebih dalam, sehingga syarat berhentinya adalah
\`index === digits.length\`.

Dua kasus tepi yang wajib ditangani:

1. **\`digits\` kosong.** Tanpa penanganan khusus, rekursi langsung berhenti dan menyimpan satu
   string kosong, sehingga hasilnya \`[""]\` — bukan yang diminta. Kembalikan \`[]\` lebih dulu.
2. **Angka 7 dan 9 punya empat huruf.** Loop harus mengikuti panjang string huruf itu, bukan
   mengasumsikan selalu tiga huruf.

Alternatif tanpa rekursi: mulai dari \`['']\`, lalu untuk setiap angka ganti setiap string yang
ada dengan semua kemungkinan penambahannya (pendekatan *breadth-first*). Hasilnya sama, tetapi
memori tambahannya sebesar seluruh hasil perantara.

## Kompleksitas

- Waktu: O(n · 4ⁿ) — ada paling banyak 4ⁿ kombinasi, dan setiap kombinasi disimpan sebagai
  string yang panjangnya n.
- Ruang: O(n) untuk \`path\` dan kedalaman rekursi, di luar hasil. Hasilnya sendiri sebesar
  O(n · 4ⁿ).

## Kesalahan umum

- Mengembalikan \`[""]\` untuk input kosong, padahal seharusnya \`[]\`.
- Memakai \`return\` alih-alih melanjutkan loop, sehingga hanya kombinasi pertama yang muncul
  (gejala: hasilnya tepat n string).
- Lupa \`path.pop()\`, sehingga semua kombinasi panjangnya bertambah terus.
- Menyimpan \`path\` (array) alih-alih hasil \`join\`-nya, sehingga hasil akhirnya berisi karakter
  terpisah.
- Menganggap semua angka punya tiga huruf, sehingga \`"7"\` dan \`"9"\` kehilangan satu huruf
  untuk setiap kemungkinan.`,
    en: `## Approach

This is the same backtracking skeleton as permutations, except the option list **changes at
every step**: at position \`index\` the options are the letters that belong to \`digits[index]\`.

\`\`\`js
const letters = {
  2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',
  6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz',
};

function backtrack(index) {
  if (index === digits.length) {           // every digit has been consumed
    result.push(path.join(''));
    return;
  }

  for (const ch of letters[digits[index]]) {
    path.push(ch);                         // choose
    backtrack(index + 1);                  // explore
    path.pop();                            // undo
  }
}
\`\`\`

Note an important difference from the earlier patterns: **the recursion depth is driven by
\`index\`, not by the contents of \`path\`**. Since each digit contributes exactly one letter,
\`path\` grows by one on every descent, so the stopping condition is \`index === digits.length\`.

Two edge cases must be handled:

1. **Empty \`digits\`.** Without special handling the recursion stops immediately and records one
   empty string, giving \`[""]\` — not what was asked. Return \`[]\` first.
2. **The digits 7 and 9 carry four letters.** The loop must follow the actual string, not assume
   three letters everywhere.

An iterative alternative: start from \`['']\` and, for each digit, replace every existing string
with all possible extensions (a *breadth-first* approach). The result is the same, but the extra
memory grows with all the intermediate results.

## Complexity

- Time: O(n · 4ⁿ) — there are at most 4ⁿ combinations and each is stored as a string of length n.
- Space: O(n) for \`path\` and the recursion depth, beyond the output. The output itself is
  O(n · 4ⁿ).

## Common mistakes

- Returning \`[""]\` for empty input when \`[]\` is expected.
- Using \`return\` instead of continuing the loop, so only the first combination appears (the
  symptom is a result of exactly n strings).
- Forgetting \`path.pop()\`, so every combination keeps growing.
- Storing \`path\` (an array) instead of its joined string, so the result holds separate
  characters.
- Assuming every digit has three letters, which drops one letter from every possibility for
  \`"7"\` and \`"9"\`.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function letterCombinations(digits) {
  // write your solution here
}
`,
      solution: `function letterCombinations(digits) {
  if (digits.length === 0) {
    return [];
  }

  const letters = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  const result = [];
  const path = [];

  function backtrack(index) {
    if (index === digits.length) {
      result.push(path.join(''));
      return;
    }

    for (const ch of letters[digits[index]]) {
      path.push(ch);
      backtrack(index + 1);
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
      template: `def letterCombinations(digits):
    # write your solution here
    pass
`,
      solution: `def letterCombinations(digits):
    if len(digits) == 0:
        return []

    letters = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
    }

    result = []
    path = []

    def backtrack(index):
        if index == len(digits):
            result.append("".join(path))
            return

        for ch in letters[digits[index]]:
            path.append(ch)
            backtrack(index + 1)
            path.pop()

    backtrack(0)

    return result
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: ['23'],
      expected: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c2',
      input: [''],
      expected: [],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c3',
      input: ['2'],
      expected: ['a', 'b', 'c'],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c4',
      input: ['7'],
      expected: ['p', 'q', 'r', 's'],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c5',
      input: ['79'],
      expected: [
        'pw',
        'px',
        'py',
        'pz',
        'qw',
        'qx',
        'qy',
        'qz',
        'rw',
        'rx',
        'ry',
        'rz',
        'sw',
        'sx',
        'sy',
        'sz',
      ],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c6',
      input: ['234'],
      expected: [
        'adg',
        'adh',
        'adi',
        'aeg',
        'aeh',
        'aei',
        'afg',
        'afh',
        'afi',
        'bdg',
        'bdh',
        'bdi',
        'beg',
        'beh',
        'bei',
        'bfg',
        'bfh',
        'bfi',
        'cdg',
        'cdh',
        'cdi',
        'ceg',
        'ceh',
        'cei',
        'cfg',
        'cfh',
        'cfi',
      ],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c7',
      input: ['99'],
      expected: [
        'ww',
        'wx',
        'wy',
        'wz',
        'xw',
        'xx',
        'xy',
        'xz',
        'yw',
        'yx',
        'yy',
        'yz',
        'zw',
        'zx',
        'zy',
        'zz',
      ],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
  ],
};
