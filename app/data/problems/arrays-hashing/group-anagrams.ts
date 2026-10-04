import type { Problem } from '~/types/content';

export const groupAnagrams: Problem = {
  slug: 'group-anagrams',
  title: {
    id: 'Group Anagrams',
    en: 'Group Anagrams',
  },
  difficulty: 'medium',
  trackId: 'arrays-hashing',
  order: 5,
  functionName: 'groupAnagrams',
  parameters: [{ name: 'strs', type: 'string[]' }],
  returnType: 'string[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan sebuah array string \`strs\`.

Kelompokkan string yang saling anagram ke dalam grup yang sama.

Kembalikan daftar grup. **Urutan grup maupun urutan string di dalam grup tidak penting** —
yang dinilai adalah isi tiap grup.`,
    en: `You are given an array of strings \`strs\`.

Group the strings that are anagrams of each other into the same group.

Return the list of groups. **Neither the order of the groups nor the order of the strings
inside a group matters** — only the contents of each group are judged.`,
  },
  examples: [
    {
      input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
      output: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
      explanation: {
        id: 'Urutan grup bisa berbeda, isinya yang sama.',
        en: 'The order of the groups may differ; the contents are what matter.',
      },
    },
    {
      input: 'strs = [""]',
      output: '[[""]]',
    },
  ],
  hints: {
    id: [
      'Apa yang membuat dua string bisa dimasukkan ke grup yang sama?',
      'Kalau setiap kata diubah ke bentuk yang seragam, kata yang anagram akan menghasilkan bentuk yang identik.',
      'Urutkan huruf tiap kata, lalu pakai hasilnya sebagai kunci hash.',
    ],
    en: [
      'What makes two strings belong to the same group?',
      'If every word is converted to one canonical form, anagrams will produce identical results.',
      'Sort the letters of each word, then use that as the hash key.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Agar kata yang anagram menghasilkan kunci yang sama, ubah setiap kata ke bentuk
terurutnya: \`"eat"\` menjadi \`"aet"\`, dan \`"tea"\` juga menjadi \`"aet"\`.

Pakai bentuk terurut itu sebagai kunci hash map, dengan nilai berupa array kata.
Setelah semua kata diproses, nilai-nilai hash map itulah jawabannya.

## Kompleksitas

- Waktu: O(n · k log k) — n jumlah kata, k panjang kata terpanjang, faktor log k dari pengurutan.
- Ruang: O(n · k) — menyimpan semua kata.

## Catatan

Karena urutan tidak penting, penilaian memakai perbandingan yang mengabaikan urutan
di semua tingkat. Jadi jangan khawatir soal urutan grup.

## Alternatif

Alih-alih mengurutkan huruf, hitung kemunculan tiap huruf dan jadikan itu kunci.
Pendekatan ini menurunkan waktunya menjadi O(n · k), dengan tambahan sedikit kode.`,
    en: `## Approach

To make anagrams produce the same key, convert each word to its sorted form:
\`"eat"\` becomes \`"aet"\`, and \`"tea"\` also becomes \`"aet"\`.

Use that sorted form as the hash map key, with an array of words as the value.
Once every word is processed, the hash map values are the answer.

## Complexity

- Time: O(n · k log k) — n words, k the longest word length, with log k from sorting.
- Space: O(n · k) — storing every word.

## Note

Because order does not matter, grading uses a comparison that ignores ordering at every
level. So do not worry about the order of the groups.

## Alternative

Instead of sorting letters, count the occurrences of each letter and use that as the key.
That brings the time down to O(n · k) for a little extra code.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function groupAnagrams(strs) {
  // write your solution here
}
`,
      solution: `function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    const key = word.split('').sort().join('');
    const group = groups.get(key);
    if (group) {
      group.push(word);
    } else {
      groups.set(key, [word]);
    }
  }

  return [...groups.values()];
}
`,
    },
    {
      language: 'python',
      template: `def groupAnagrams(strs):
    # write your solution here
    pass
`,
      solution: `def groupAnagrams(strs):
    groups = {}

    for word in strs:
        key = "".join(sorted(word))
        groups.setdefault(key, []).append(word)

    return list(groups.values())
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
      expected: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c2',
      input: [['']],
      expected: [['']],
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c3',
      input: [['a']],
      expected: [['a']],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c4',
      input: [['abc', 'bca', 'cab', 'xyz']],
      expected: [['abc', 'bca', 'cab'], ['xyz']],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
    {
      id: 'c5',
      input: [['', '']],
      expected: [['', '']],
      hidden: true,
      comparator: 'unorderedAllLevels',
    },
  ],
};
