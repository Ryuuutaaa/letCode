import type { Problem } from '~/types/content';

export const groupAnagrams: Problem = {
  slug: 'group-anagrams',
  title: 'Group Anagrams',
  difficulty: 'medium',
  trackId: 'arrays-hashing',
  order: 5,
  functionName: 'groupAnagrams',
  parameters: [{ name: 'strs', type: 'string[]' }],
  returnType: 'string[][]',
  timeLimitMs: 2000,
  statement: `Diberikan sebuah array string \`strs\`.

Kelompokkan string yang saling anagram ke dalam grup yang sama.

Kembalikan daftar grup. **Urutan grup maupun urutan string di dalam grup tidak penting** —
yang dinilai adalah isi tiap grup.`,
  examples: [
    {
      input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
      output: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
      explanation: 'Urutan grup bisa berbeda, isinya yang sama.',
    },
    {
      input: 'strs = [""]',
      output: '[[""]]',
    },
  ],
  hints: [
    'Apa yang membuat dua string bisa dimasukkan ke grup yang sama?',
    'Kalau setiap kata diubah ke bentuk yang seragam, kata yang anagram akan menghasilkan bentuk yang identik.',
    'Urutkan huruf tiap kata, lalu pakai hasilnya sebagai kunci hash.',
  ],
  explanation: `## Pendekatan

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
  templates: [
    {
      language: 'javascript',
      template: `function groupAnagrams(strs) {
  // tulis solusimu di sini
}
`,
      solution: `function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    const key = word.split('').sort().join('');
    const group = groups.get(key);
    if (group) {
      group.push(word);
    }
    else {
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
    # tulis solusimu di sini
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
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c2',
      input: [['']],
      expected: [['']],
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c3',
      input: [['a']],
      expected: [['a']],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c4',
      input: [['abc', 'bca', 'cab', 'xyz']],
      expected: [['abc', 'bca', 'cab'], ['xyz']],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
    {
      id: 'c5',
      input: [['', '']],
      expected: [['', '']],
      hidden: true,
      comparator: 'unorderedDeepEqual',
    },
  ],
};
