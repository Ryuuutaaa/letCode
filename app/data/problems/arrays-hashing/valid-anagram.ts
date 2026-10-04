import type { Problem } from '~/types/content';

export const validAnagram: Problem = {
  slug: 'valid-anagram',
  title: {
    id: 'Valid Anagram',
    en: 'Valid Anagram',
  },
  difficulty: 'easy',
  trackId: 'arrays-hashing',
  order: 3,
  functionName: 'isAnagram',
  parameters: [
    { name: 's', type: 'string' },
    { name: 't', type: 'string' },
  ],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Dua string disebut **anagram** jika keduanya tersusun dari huruf yang sama
dengan jumlah kemunculan yang sama, hanya urutannya yang berbeda.

Diberikan dua string \`s\` dan \`t\`. Kembalikan \`true\` jika \`t\` adalah anagram dari \`s\`.`,
    en: `Two strings are **anagrams** if they are made of the same letters with the same
counts, only the order differs.

You are given two strings \`s\` and \`t\`. Return \`true\` if \`t\` is an anagram of \`s\`.`,
  },
  examples: [
    {
      input: 's = "anagram", t = "nagaram"',
      output: 'true',
    },
    {
      input: 's = "rat", t = "car"',
      output: 'false',
    },
  ],
  hints: {
    id: [
      'Kalau panjang keduanya berbeda, apakah mungkin anagram?',
      'Hitung kemunculan setiap huruf di string pertama, lalu kurangi dengan string kedua.',
    ],
    en: [
      'If the lengths differ, can they still be anagrams?',
      'Count each letter in the first string, then subtract while walking the second.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Pertama, kalau panjang kedua string berbeda, jawabannya pasti \`false\`. Ini menghemat
banyak kerja.

Setelah itu, hitung kemunculan setiap huruf di \`s\`, lalu telusuri \`t\` dan kurangi
hitungannya. Kalau ada huruf yang hitungannya habis atau tidak pernah ada, berarti
bukan anagram.

## Kompleksitas

- Waktu: O(n) — dua kali lintasan, dengan n panjang string.
- Ruang: O(k) — k jumlah huruf unik. Untuk alfabet terbatas, ini praktis O(1).

## Alternatif

Mengurutkan kedua string lalu membandingkannya. Kompleksitasnya O(n log n), lebih lambat
tapi jauh lebih pendek untuk ditulis.`,
    en: `## Approach

First, if the two lengths differ the answer is always \`false\`. That saves a lot of work.

After that, count every letter in \`s\`, then walk \`t\` and decrement the counts. If a letter
runs out or was never there, the strings are not anagrams.

## Complexity

- Time: O(n) — two passes, where n is the length of the string.
- Space: O(k) — k is the number of distinct letters. For a fixed alphabet this is O(1).

## Alternative

Sort both strings and compare them. That is O(n log n) — slower, but far shorter to write.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function isAnagram(s, t) {
  // write your solution here
}
`,
      solution: `function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const count = new Map();
  for (const ch of s) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }

  for (const ch of t) {
    const left = count.get(ch);
    if (!left) {
      return false;
    }
    count.set(ch, left - 1);
  }

  return true;
}
`,
    },
    {
      language: 'python',
      template: `def isAnagram(s, t):
    # write your solution here
    pass
`,
      solution: `def isAnagram(s, t):
    if len(s) != len(t):
        return False

    count = {}
    for ch in s:
        count[ch] = count.get(ch, 0) + 1

    for ch in t:
        if count.get(ch, 0) == 0:
            return False
        count[ch] -= 1

    return True
`,
    },
  ],
  testCases: [
    { id: 'c1', input: ['anagram', 'nagaram'], expected: true },
    { id: 'c2', input: ['rat', 'car'], expected: false },
    { id: 'c3', input: ['', ''], expected: true, hidden: true },
    { id: 'c4', input: ['a', 'aa'], expected: false, hidden: true },
    { id: 'c5', input: ['aacc', 'ccac'], expected: false, hidden: true },
  ],
};
