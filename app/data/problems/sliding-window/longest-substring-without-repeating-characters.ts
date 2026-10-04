import type { Problem } from '~/types/content';

export const longestSubstringWithoutRepeatingCharacters: Problem = {
  slug: 'longest-substring-without-repeating-characters',
  title: {
    id: 'Substring Terpanjang Tanpa Karakter Berulang',
    en: 'Longest Substring Without Repeating Characters',
  },
  difficulty: 'medium',
  trackId: 'sliding-window',
  order: 3,
  functionName: 'lengthOfLongestSubstring',
  parameters: [{ name: 's', type: 'string' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan string \`s\`.

Kembalikan **panjang substring terpanjang** yang tidak memuat karakter berulang.

Substring adalah potongan karakter yang bersebelahan: urutannya tidak boleh diubah dan tidak
boleh ada karakter yang dilewati di tengahnya. Ini berbeda dari subsequence.

Batasan: \`0 <= s.length <= 10^5\`, dan \`s\` hanya berisi huruf, angka, tanda baca, serta spasi
(karakter ASCII yang dapat dicetak).

Target: O(n) waktu.`,
    en: `You are given a string \`s\`.

Return the **length of the longest substring** that contains no repeated character.

A substring is a run of consecutive characters: the order cannot change and no character in
the middle may be skipped. This is different from a subsequence.

Constraints: \`0 <= s.length <= 10^5\`, and \`s\` contains only letters, digits, punctuation,
and spaces (printable ASCII characters).

Target: O(n) time.`,
  },
  examples: [
    {
      input: 's = "abcabcbb"',
      output: '3',
      explanation: {
        id: 'Jawabannya adalah "abc" dengan panjang 3. Setiap kali satu karakter baru masuk, ia mengulang salah satu dari tiga karakter yang sedang ada di jendela.',
        en: 'The answer is "abc" with length 3. Each time a new character enters, it repeats one of the three already in the window.',
      },
    },
    {
      input: 's = "bbbbb"',
      output: '1',
      explanation: {
        id: 'Semua karakternya sama, jadi jendela terpanjang hanya boleh memuat satu karakter.',
        en: 'Every character is the same, so the longest valid window holds just one character.',
      },
    },
    {
      input: 's = "pwwkew"',
      output: '3',
      explanation: {
        id: 'Jawabannya "wke". Perhatikan bahwa "pwke" bukan substring, karena huruf-hurufnya tidak bersebelahan pada string asli.',
        en: 'The answer is "wke". Note that "pwke" is not a substring, since those letters are not consecutive in the original string.',
      },
    },
  ],
  hints: {
    id: [
      'Perbesar jendela satu karakter setiap langkah, lalu tanyakan: apakah karakter yang baru masuk sudah ada di dalam jendela?',
      'Kalau ada, batas kirilah yang harus bergerak — bukan dengan mengosongkan seluruh jendela.',
      'Simpan **posisi terakhir** setiap karakter di dalam map, sehingga kamu bisa melompat langsung ke posisi setelah kemunculan terakhirnya.',
      'Hati-hati: posisi terakhir sebuah karakter bisa saja sudah berada sebelum batas kiri jendela. Bandingkan dengan \`left\` sebelum melompat.',
    ],
    en: [
      'Grow the window by one character each step, then ask: is the character that just entered already inside the window?',
      'If it is, the left boundary is what has to move — not the whole window cleared out.',
      'Store the **last position** of every character in a map, so you can jump straight past that character\u2019s previous occurrence.',
      'Careful: a character\u2019s last position may already sit before the left boundary. Compare against \`left\` before jumping.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Jendela dinamis "terpanjang" dengan satu map posisi terakhir.

\`right\` menelusuri string satu karakter per langkah. Untuk setiap karakter:

1. Lihat posisi terakhir karakter itu di dalam map.
2. Kalau posisi itu ada **dan tidak lebih kecil dari \`left\`**, berarti karakter itu masih
   berada di dalam jendela. Geser \`left\` ke \`posisi + 1\`.
3. Simpan posisi karakter saat ini sebagai posisi terakhirnya.
4. Perbarui jawaban dengan panjang jendela \`right - left + 1\`.

Langkah 2 adalah bagian yang paling mudah salah. Posisi terakhir sebuah karakter bisa saja
sudah berada di luar jendela, yaitu sebelum \`left\`. Dalam kasus itu tidak ada pengulangan
nyata di dalam jendela, dan menggeser \`left\` mundur akan merusak jawaban — perhatikan input
\`"abba"\`, di mana \`left\` sudah berada di indeks 2 saat huruf \`a\` muncul lagi.

Karena \`left\` hanya bergerak maju, setiap indeks keluar dari jendela paling banyak sekali,
sehingga total pekerjaannya O(n).

## Kompleksitas

- Waktu: O(n) — \`right\` bergerak n kali, \`left\` bergerak maju paling banyak n kali total.
- Ruang: O(min(n, σ)) — map posisi terakhir, dengan σ ukuran alfabet yang dipakai.

## Kesalahan yang sering terjadi

- Menggeser \`left\` ke belakang ketika menemukan karakter berulang, sehingga jendela bergerak
  mundur dan jawabannya salah pada input seperti \`"abba"\`.
- Mengosongkan map setiap kali menemukan pengulangan. Hasilnya masih benar untuk sebagian
  kasus, tetapi kompleksitasnya menjadi O(n²).
- Menyalin isi jendela dengan \`slice\` di dalam loop untuk memeriksa keunikan. Itu juga O(n²).
- Memperbarui jawaban sebelum jendela disesuaikan, sehingga panjang yang tercatat memuat
  karakter berulang.`,
    en: `## Approach

The "longest" dynamic window with one last-seen map.

\`right\` walks the string one character per step. For each character:

1. Look up that character\u2019s last position in the map.
2. If the position exists **and is not smaller than \`left\`**, the character is still inside
   the window. Move \`left\` to \`position + 1\`.
3. Store the current index as that character\u2019s last position.
4. Update the answer with the window length \`right - left + 1\`.

Step 2 is the easiest part to get wrong. A character\u2019s last position may already be outside
the window, that is, before \`left\`. In that case there is no real repetition inside the
window, and moving \`left\` backward breaks the answer — look at \`"abba"\`, where \`left\` is
already at index 2 when the letter \`a\` shows up again.

Because \`left\` only moves forward, every index leaves the window at most once, so the total
work is O(n).

## Complexity

- Time: O(n) — \`right\` moves n times, \`left\` moves forward at most n times in total.
- Space: O(min(n, σ)) — the last-seen map, where σ is the alphabet actually used.

## Common mistakes

- Moving \`left\` backward when a repeat is found, letting the window move in reverse and
  producing wrong answers on inputs like \`"abba"\`.
- Clearing the map on every repeat. That is still correct for some inputs but degrades to
  O(n²).
- Copying the window with \`slice\` inside the loop to test uniqueness. That is O(n²) as well.
- Updating the answer before the window is adjusted, so the recorded length still contains the
  repeated character.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function lengthOfLongestSubstring(s) {
  // write your solution here
}
`,
      solution: `function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    const previous = lastSeen.get(ch);

    if (previous !== undefined && previous >= left) {
      left = previous + 1;
    }

    lastSeen.set(ch, right);

    if (right - left + 1 > best) {
      best = right - left + 1;
    }
  }

  return best;
}
`,
    },
    {
      language: 'python',
      template: `def lengthOfLongestSubstring(s):
    # write your solution here
    pass
`,
      solution: `def lengthOfLongestSubstring(s):
    last_seen = {}
    left = 0
    best = 0

    for right, ch in enumerate(s):
        previous = last_seen.get(ch)

        if previous is not None and previous >= left:
            left = previous + 1

        last_seen[ch] = right

        if right - left + 1 > best:
            best = right - left + 1

    return best
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: ['abcabcbb'],
      expected: 3,
    },
    {
      id: 'c2',
      input: ['bbbbb'],
      expected: 1,
    },
    {
      id: 'c3',
      input: ['pwwkew'],
      expected: 3,
    },
    {
      id: 'c4',
      input: [''],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c5',
      input: [' '],
      expected: 1,
      hidden: true,
    },
    {
      id: 'c6',
      input: ['abba'],
      expected: 2,
      hidden: true,
    },
    {
      id: 'c7',
      input: ['dvdf'],
      expected: 3,
      hidden: true,
    },
    {
      id: 'c8',
      input: ['abcdefghijklmnopqrstuvwxyz'],
      expected: 26,
      hidden: true,
    },
  ],
};
