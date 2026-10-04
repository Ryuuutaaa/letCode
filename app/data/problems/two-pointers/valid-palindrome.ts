import type { Problem } from '~/types/content';

export const validPalindrome: Problem = {
  slug: 'valid-palindrome',
  title: {
    id: 'Valid Palindrome',
    en: 'Valid Palindrome',
  },
  difficulty: 'easy',
  trackId: 'two-pointers',
  order: 1,
  functionName: 'isPalindrome',
  parameters: [{ name: 's', type: 'string' }],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Sebuah string disebut **palindrom** jika setelah semua huruf diubah menjadi huruf
kecil dan semua karakter selain huruf serta angka dibuang, string itu terbaca sama dari
depan maupun belakang.

Diberikan string \`s\`. Kembalikan \`true\` jika \`s\` adalah palindrom.

Kerjakan tanpa membuat string baru — bandingkan langsung pada string aslinya.`,
    en: `A string is a **palindrome** if, after converting every letter to lowercase and
removing every character that is not a letter or a digit, it reads the same forwards and
backwards.

You are given a string \`s\`. Return \`true\` if \`s\` is a palindrome.

Do it without building a new string — compare directly on the original.`,
  },
  examples: [
    {
      input: 's = "A man, a plan, a canal: Panama"',
      output: 'true',
      explanation: {
        id: 'Setelah dibersihkan menjadi "amanaplanacanalpanama", yang merupakan palindrom.',
        en: 'Cleaned up it becomes "amanaplanacanalpanama", which is a palindrome.',
      },
    },
    {
      input: 's = "race a car"',
      output: 'false',
      explanation: {
        id: 'Setelah dibersihkan menjadi "raceacar", yang bukan palindrom.',
        en: 'Cleaned up it becomes "raceacar", which is not a palindrome.',
      },
    },
  ],
  hints: {
    id: [
      'Coba bandingkan karakter paling kiri dengan paling kanan. Kalau sama, apa yang bisa kamu simpulkan tentang keduanya?',
      'Bagaimana memperlakukan karakter yang bukan huruf atau angka?',
      'Kalau salah satu ujung bukan huruf atau angka, lewati saja ujung itu tanpa menggeser ujung lainnya.',
    ],
    en: [
      'Try comparing the leftmost character with the rightmost one. If they match, what can you conclude about both?',
      'How should characters that are neither letters nor digits be treated?',
      'If one end is not a letter or digit, skip just that end without moving the other.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Pakai dua pointer: satu di awal, satu di akhir. Setiap langkah:

1. Kalau karakter kiri bukan huruf atau angka, geser kiri.
2. Kalau karakter kanan bukan huruf atau angka, geser kanan.
3. Kalau keduanya huruf atau angka, bandingkan dalam huruf kecil. Beda berarti bukan
   palindrom.

Berhenti ketika kedua pointer bertemu atau bersilangan.

## Kompleksitas

- Waktu: O(n) — setiap karakter diperiksa paling banyak sekali.
- Ruang: O(1) — hanya dua indeks, tanpa string baru.

## Kesalahan yang sering terjadi

- Hanya memeriksa huruf, lalu mengabaikan angka. String seperti \`"0P"\` akan salah dinilai.
- Membuat string baru hasil pembersihan. Itu membuat ruangnya menjadi O(n) dan melanggar
  syarat soal.`,
    en: `## Approach

Use two pointers: one at the start, one at the end. At each step:

1. If the left character is not a letter or digit, move left forward.
2. If the right character is not a letter or digit, move right backward.
3. If both are letters or digits, compare them in lowercase. A mismatch means it is not a
   palindrome.

Stop when the two pointers meet or cross.

## Complexity

- Time: O(n) — each character is examined at most once.
- Space: O(1) — two indices only, no new string.

## Common mistakes

- Checking only letters and ignoring digits. A string like \`"0P"\` would be judged wrongly.
- Building a cleaned copy of the string. That makes space O(n) and breaks the requirement.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function isPalindrome(s) {
  // write your solution here
}
`,
      solution: `function isPalindrome(s) {
  const isAlnum = ch => /[a-z0-9]/i.test(ch);
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (!isAlnum(s[left])) {
      left++;
      continue;
    }
    if (!isAlnum(s[right])) {
      right--;
      continue;
    }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
`,
    },
    {
      language: 'python',
      template: `def isPalindrome(s):
    # write your solution here
    pass
`,
      solution: `def isPalindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        if not s[left].isalnum():
            left += 1
            continue
        if not s[right].isalnum():
            right -= 1
            continue
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1

    return True
`,
    },
  ],
  testCases: [
    { id: 'c1', input: ['A man, a plan, a canal: Panama'], expected: true },
    { id: 'c2', input: ['race a car'], expected: false },
    { id: 'c3', input: [''], expected: true, hidden: true },
    { id: 'c4', input: [' '], expected: true, hidden: true },
    { id: 'c5', input: ['0P'], expected: false, hidden: true },
    { id: 'c6', input: ['ab_a'], expected: true, hidden: true },
  ],
};
