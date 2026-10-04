import type { Problem } from '~/types/content';

export const longestRepeatingCharacterReplacement: Problem = {
  slug: 'longest-repeating-character-replacement',
  title: {
    id: 'Penggantian Karakter untuk Substring Terpanjang',
    en: 'Longest Repeating Character Replacement',
  },
  difficulty: 'medium',
  trackId: 'sliding-window',
  order: 4,
  functionName: 'characterReplacement',
  parameters: [
    { name: 's', type: 'string' },
    { name: 'k', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan string \`s\` yang hanya berisi huruf kapital A–Z, dan bilangan bulat \`k\`.

Kamu boleh melakukan operasi berikut **paling banyak \`k\` kali**: pilih satu posisi di dalam
\`s\` dan ganti karakternya menjadi huruf kapital apa pun. Dua operasi boleh menyasar posisi
yang sama.

Setelah semua operasi selesai, carilah **substring terpanjang yang seluruh karakternya sama**.
Kembalikan panjang substring tersebut.

Kamu tidak perlu menuliskan hasil akhir string-nya; cukup tentukan panjang maksimumnya.

Batasan: \`0 <= s.length <= 10^5\`, \`0 <= k <= s.length\`.

Target: O(n) waktu dan O(1) ruang tambahan (di luar alfabet yang tetap).`,
    en: `You are given a string \`s\` containing only uppercase letters A–Z, and an integer \`k\`.

You may perform the following operation **at most \`k\` times**: pick a position in \`s\` and
change its character to any other uppercase letter. Two operations may target the same
position.

After all operations, find the **longest substring whose characters are all the same**. Return
that length.

You do not need to print the resulting string; only the maximum length is required.

Constraints: \`0 <= s.length <= 10^5\`, \`0 <= k <= s.length\`.

Target: O(n) time and O(1) extra space (beyond the fixed alphabet).`,
  },
  examples: [
    {
      input: 's = "ABAB", k = 2',
      output: '4',
      explanation: {
        id: 'Ganti kedua huruf B menjadi A, sehingga seluruh string menjadi "AAAA". Panjangnya 4.',
        en: 'Change both B characters into A, turning the whole string into "AAAA". Its length is 4.',
      },
    },
    {
      input: 's = "AABABBA", k = 1',
      output: '4',
      explanation: {
        id: 'Ganti huruf B di posisi ketiga menjadi A, sehingga potongan "AABA" berubah menjadi "AAAA" dengan panjang 4. Tidak ada potongan panjang 5 yang bisa diseragamkan hanya dengan satu penggantian.',
        en: 'Change the B at index 2 into an A, turning the piece "AABA" into "AAAA" of length 4. No length-5 piece can be made uniform with a single replacement.',
      },
    },
    {
      input: 's = "ABCDE", k = 0',
      output: '1',
      explanation: {
        id: 'Tanpa penggantian, tidak ada dua huruf bersebelahan yang sama, jadi substring seragam terpanjang hanya satu karakter.',
        en: 'With no replacements, no two neighbours are equal, so the longest uniform substring is a single character.',
      },
    },
  ],
  hints: {
    id: [
      'Di dalam jendela yang baik selalu ada satu huruf yang mendominasi. Sisanya adalah karakter yang harus diganti.',
      'Sebuah jendela bisa diseragamkan dengan \`k\` penggantian tepat ketika \`panjang jendela - frekuensi huruf terbanyak <= k\`.',
      'Pertahankan frekuensi tiap huruf dan satu nilai frekuensi maksimum, supaya pengecekan validitas tetap O(1).',
      'Saat jendela menyempit, kamu cukup mengurangi frekuensi huruf yang keluar. Nilai maksimum yang tercatat boleh tetap dan tidak perlu dihitung ulang.',
    ],
    en: [
      'A good window always has one dominant letter. Everything else is what has to be replaced.',
      'A window can be made uniform with \`k\` replacements exactly when \`window length - highest frequency inside <= k\`.',
      'Keep a frequency count per letter plus one running maximum frequency, so the validity check stays O(1).',
      'When the window shrinks, just decrement the frequency of the letter leaving. The recorded maximum may stay as it is and does not need recomputation.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Jendela dinamis "terpanjang" dengan array frekuensi berukuran 26.

Keadaan yang dipelihara: \`counts\` berisi frekuensi setiap huruf di dalam jendela saat ini,
dan \`maxCount\` berisi frekuensi terbesar di antara huruf-huruf itu. Jendela \`[left, right]\`
dapat diseragamkan dengan \`k\` penggantian tepat ketika

\`\`\`text
panjang jendela - maxCount <= k
\`\`\`

sebab semua karakter selain huruf dominan, yang jumlahnya \`panjang - maxCount\`, harus
diganti.

Langkahnya:

1. Majukan \`right\`, tambahkan frekuensi huruf barunya, dan perbarui \`maxCount\`.
2. Selama \`panjang - maxCount > k\`, majukan \`left\` dan kurangi frekuensi huruf yang keluar.
3. Setelah jendela dijamin valid, perbarui jawaban dengan panjangnya.

## Kompleksitas

- Waktu: O(n) — \`right\` dan \`left\` masing-masing maju paling banyak n kali, dan setiap
  pemeriksaan validitas O(1).
- Ruang: O(1) — array 26 angka, tidak bergantung pada panjang string.

## Mengapa maxCount tidak perlu dikembalikan saat jendela menyempit

Bagian ini yang paling sering membingungkan.

Yang dicari adalah panjang **maksimum**, sehingga jendela tidak perlu pernah mengecil di bawah
panjang maksimum yang sudah tercatat. Ketika \`maxCount\` tampak terlalu besar untuk isi
jendela saat ini, tujuannya hanya menjaga panjang jendela agar tidak bertambah, bukan
memperkecilnya. Menghitung ulang \`maxCount\` tidak akan pernah menghasilkan panjang jawaban
yang lebih besar, jadi nilai lama yang lebih tinggi aman dipakai.

Kalau kamu kurang yakin, versi yang menghitung ulang \`maxCount\` dari 26 huruf setiap langkah
tetap berada pada O(26·n) = O(n) dan juga benar. Yang penting adalah jangan mengambil
\`maxCount\` dari seluruh string, karena itu bukan lagi keadaan dari jendela saat ini.

## Kesalahan yang sering terjadi

- Memakai panjang jendela sebagai syarat, bukan \`panjang - maxCount\`.
- Menyempitkan jendela dengan \`if\` sehingga jendela bisa tetap tidak valid pada iterasi
  berikutnya.
- Menghitung \`maxCount\` dari seluruh string, bukan dari isi jendela saat ini.
- Memperbarui jawaban sebelum jendela disempitkan, sehingga panjang yang belum valid ikut
  tercatat.
- Mengalokasikan penghitung hanya untuk huruf yang muncul di \`s\`, lalu lupa bahwa indeks
  huruf dihitung dari \`'A'\`.`,
    en: `## Approach

The "longest" dynamic window with a frequency array of size 26.

The maintained state is \`counts\`, the frequency of each letter inside the current window,
together with \`maxCount\`, the largest of those frequencies. The window \`[left, right]\` can
be made uniform with \`k\` replacements exactly when

\`\`\`text
window length - maxCount <= k
\`\`\`

because everything except the dominant letter, which is \`length - maxCount\` characters, has
to be replaced.

The steps:

1. Advance \`right\`, bump the frequency of the new letter, and update \`maxCount\`.
2. While \`length - maxCount > k\`, advance \`left\` and decrement the frequency of the letter
   leaving.
3. Once the window is guaranteed valid, update the answer with its length.

## Complexity

- Time: O(n) — \`right\` and \`left\` each advance at most n times, and every validity check is
  O(1).
- Space: O(1) — an array of 26 numbers, independent of the string length.

## Why maxCount need not be restored when the window shrinks

This is the part that confuses people most.

What we want is the **maximum** length, so the window never needs to shrink below the largest
length already recorded. When \`maxCount\` looks too large for the current contents, the only
goal is to keep the window from growing, not to make it smaller. Recomputing \`maxCount\` can
never yield a larger answer, so the older, higher value is safe to keep.

If you are not comfortable with that, a version that recomputes \`maxCount\` from all 26
letters on every step is still O(26·n) = O(n) and also correct. The one thing you must not do
is take \`maxCount\` from the whole string, because that is no longer state of the current
window.

## Common mistakes

- Using the window length as the condition instead of \`length - maxCount\`.
- Shrinking with an \`if\`, which leaves the window possibly invalid on the next iteration.
- Taking \`maxCount\` from the entire string instead of the current window.
- Updating the answer before shrinking, so a length that is not yet valid gets recorded.
- Allocating counters only for the letters that appear in \`s\` and forgetting that letter
  indices are measured from \`'A'\`.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function characterReplacement(s, k) {
  // write your solution here
}
`,
      solution: `function characterReplacement(s, k) {
  const counts = new Array(26).fill(0);
  let left = 0;
  let best = 0;
  let maxCount = 0;

  for (let right = 0; right < s.length; right++) {
    const index = s.charCodeAt(right) - 65;
    counts[index]++;
    maxCount = Math.max(maxCount, counts[index]);

    while (right - left + 1 - maxCount > k) {
      counts[s.charCodeAt(left) - 65]--;
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
`,
    },
    {
      language: 'python',
      template: `def characterReplacement(s, k):
    # write your solution here
    pass
`,
      solution: `def characterReplacement(s, k):
    counts = [0] * 26
    left = 0
    best = 0
    max_count = 0

    for right, ch in enumerate(s):
        index = ord(ch) - 65
        counts[index] += 1
        max_count = max(max_count, counts[index])

        while right - left + 1 - max_count > k:
            counts[ord(s[left]) - 65] -= 1
            left += 1

        best = max(best, right - left + 1)

    return best
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: ['ABAB', 2],
      expected: 4,
    },
    {
      id: 'c2',
      input: ['AABABBA', 1],
      expected: 4,
    },
    {
      id: 'c3',
      input: ['ABCDE', 0],
      expected: 1,
    },
    {
      id: 'c4',
      input: ['', 0],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c5',
      input: ['AAAA', 0],
      expected: 4,
      hidden: true,
    },
    {
      id: 'c6',
      input: ['ABBB', 2],
      expected: 4,
      hidden: true,
    },
    {
      id: 'c7',
      input: ['BAAAB', 2],
      expected: 5,
      hidden: true,
    },
    {
      id: 'c8',
      input: ['ABAA', 0],
      expected: 2,
      hidden: true,
    },
  ],
};
