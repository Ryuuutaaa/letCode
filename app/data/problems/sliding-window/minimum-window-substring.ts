import type { Problem } from '~/types/content';

export const minimumWindowSubstring: Problem = {
  slug: 'minimum-window-substring',
  title: {
    id: 'Substring Jendela Minimum',
    en: 'Minimum Window Substring',
  },
  difficulty: 'hard',
  trackId: 'sliding-window',
  order: 5,
  functionName: 'minWindow',
  parameters: [
    { name: 's', type: 'string' },
    { name: 't', type: 'string' },
  ],
  returnType: 'string',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan dua string, \`s\` dan \`t\`.

Kembalikan **substring terpendek** dari \`s\` yang memuat **semua** karakter \`t\` beserta
jumlah kemunculannya. Artinya, kalau \`t\` memuat huruf \`a\` dua kali, jendela jawaban juga
harus memuat paling sedikit dua huruf \`a\`.

Kalau tidak ada jendela seperti itu, kembalikan string kosong \`""\`. Kalau \`t\` kosong,
kembalikan \`""\` juga.

Setiap test case dijamin punya tepat satu jawaban terpendek.

Batasan: \`0 <= s.length, t.length <= 10^5\`, dan kedua string hanya berisi huruf besar dan
huruf kecil.

Target: O(n + m) waktu dengan n = panjang \`s\` dan m = panjang \`t\`.`,
    en: `You are given two strings, \`s\` and \`t\`.

Return the **shortest substring** of \`s\` that contains **every** character of \`t\` including
its multiplicity. In other words, if \`t\` contains the letter \`a\` twice, the answer window
must also contain at least two copies of \`a\`.

If no such window exists, return the empty string \`""\`. If \`t\` is empty, return \`""\` as
well.

Every test case is guaranteed to have exactly one shortest answer.

Constraints: \`0 <= s.length, t.length <= 10^5\`, and both strings contain uppercase and
lowercase letters only.

Target: O(n + m) time where n = \`s.length\` and m = \`t.length\`.`,
  },
  examples: [
    {
      input: 's = "ADOBECODEBANC", t = "ABC"',
      output: '"BANC"',
      explanation: {
        id: 'Jendela "BANC" memuat A, B, dan C, dan tidak ada jendela yang lebih pendek yang memuat ketiganya.',
        en: 'The window "BANC" contains A, B, and C, and no shorter window contains all three.',
      },
    },
    {
      input: 's = "a", t = "a"',
      output: '"a"',
      explanation: {
        id: 'Satu-satunya jendela yang mungkin adalah karakter itu sendiri.',
        en: 'The only possible window is the character itself.',
      },
    },
    {
      input: 's = "a", t = "aa"',
      output: '""',
      explanation: {
        id: '`t` membutuhkan dua huruf "a", sedangkan `s` hanya punya satu. Tidak ada jawaban.',
        en: '\`t\` requires two copies of "a" while \`s\` has only one. There is no answer.',
      },
    },
  ],
  hints: {
    id: [
      'Mulai dengan menghitung berapa kali setiap karakter di \`t\` dibutuhkan.',
      'Simpan satu angka: berapa banyak karakter yang **masih kurang**. Jendela dinyatakan valid ketika angka itu nol.',
      'Setelah jendela valid, jangan langsung lanjut. Coba kecilkan dari kiri selama masih valid, dan catat setiap kandidat.',
      'Saat membuang karakter dari kiri, tambah jumlah kekurangan hanya kalau stok karakter itu benar-benar berubah dari cukup menjadi kurang. Membiarkan stok menjadi negatif membuat perbedaan ini terlihat.',
    ],
    en: [
      'Start by counting how many times each character of \`t\` is needed.',
      'Keep a single number: how many characters are **still missing**. The window is valid when that number is zero.',
      'Once the window is valid, do not move on immediately. Try shrinking it from the left while it stays valid, recording every candidate.',
      'When removing from the left, increase the deficit only if the stock truly crossed from sufficient to insufficient. Letting the stock go negative is what makes that distinction visible.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Jendela dinamis "terpendek" dengan peta kebutuhan dan penghitung kekurangan.

**Persiapan.** Hitung frekuensi setiap karakter \`t\` ke dalam \`need\`, lalu set
\`missing = t.length\` — jumlah karakter yang masih kurang agar jendela valid.

**Perbesar.** Untuk setiap \`right\`:

1. Kalau \`s[right]\` dibutuhkan **dan** stoknya masih positif, kurangi \`missing\`.
2. Kurangi stok karakter itu di \`need\`. Nilainya sengaja dibiarkan boleh negatif; negatif
   berarti ada kelebihan karakter tersebut di dalam jendela.

**Kecilkan.** Selama \`missing === 0\`:

1. Perbarui jawaban kalau panjang jendela saat ini lebih pendek dari yang tercatat.
2. Keluarkan \`s[left]\`. Kalau karakter itu dibutuhkan, kembalikan stoknya dan tambah
   \`missing\` **hanya jika** stoknya kembali menjadi positif.
3. Majukan \`left\`.

Nilai negatif di \`need\` adalah inti keindahan solusi ini: ia membedakan "karakter ini berlebih
di dalam jendela" dari "karakter ini masih kurang". Kalau kamu memangkasnya dengan nol, saat
jendela menyempit kamu akan menambah \`missing\` untuk kelebihan karakter dan jendela yang
sebenarnya masih valid akan dianggap tidak valid.

## Kompleksitas

- Waktu: O(n + m) — penghitungan awal O(m), lalu \`right\` dan \`left\` masing-masing maju
  paling banyak n kali.
- Ruang: O(σ) — peta kebutuhan, dengan σ jumlah karakter berbeda (paling banyak 52 untuk huruf
  besar dan kecil).

## Kesalahan yang sering terjadi

- Mengurangi \`missing\` pada setiap kemunculan karakter, bukan hanya ketika stoknya masih
  positif. Karakter berlebih membuat \`missing\` mencapai nol terlalu cepat, sehingga jendela
  dinyatakan valid padahal belum.
- Menambah \`missing\` setiap kali membuang karakter yang dibutuhkan, tanpa memeriksa apakah
  stoknya benar-benar kembali positif.
- Mencatat jawaban sebelum jendela dipastikan valid, atau lupa mencatatnya di dalam \`while\`.
- Menyalin substring di setiap langkah (\`s.slice(left, right + 1)\`). Simpan indeks awal dan
  panjangnya, lalu potong sekali di akhir.
- Menghitung ulang seluruh peta \`need\` untuk memeriksa validitas, sehingga kompleksitasnya
  membengkak menjadi O(n·σ).`,
    en: `## Approach

The "shortest" dynamic window with a needs map and a deficit counter.

**Setup.** Count the frequency of every character of \`t\` into \`need\`, then set
\`missing = t.length\` — the number of characters still missing for the window to be valid.

**Grow.** For each \`right\`:

1. If \`s[right]\` is needed **and** its stock is still positive, decrement \`missing\`.
2. Decrement that character\u2019s stock in \`need\`. It is deliberately allowed to go negative;
   a negative value means the window holds a surplus of that character.

**Shrink.** While \`missing === 0\`:

1. Update the answer if the current window is shorter than the best recorded so far.
2. Remove \`s[left]\`. If it is needed, give its stock back and increment \`missing\` **only if**
   the stock becomes positive again.
3. Advance \`left\`.

The negative values in \`need\` are the heart of this solution: they separate "this character is
in surplus inside the window" from "this character is still short". If you clamp them with
zero, then while shrinking you will count surplus characters as shortages and treat a window
that is still valid as invalid.

## Complexity

- Time: O(n + m) — O(m) to build the counts, then \`right\` and \`left\` each advance at most
  n times.
- Space: O(σ) — the needs map, where σ is the number of distinct characters (at most 52 for
  letters in both cases).

## Common mistakes

- Decrementing \`missing\` on every occurrence instead of only when the stock is still positive.
  Surplus characters drive \`missing\` to zero too early, so the window is declared valid when
  it is not.
- Incrementing \`missing\` on every removal of a needed character without checking whether the
  stock truly becomes positive again.
- Recording the answer before the window is known to be valid, or forgetting to record it
  inside the \`while\`.
- Copying the substring on every step (\`s.slice(left, right + 1)\`). Store the start index and
  length, then slice once at the end.
- Recomputing the entire \`need\` map to test validity, which blows the complexity up to
  O(n·σ).`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function minWindow(s, t) {
  // write your solution here
}
`,
      solution: `function minWindow(s, t) {
  if (t.length === 0 || s.length < t.length) {
    return '';
  }

  const need = new Map();

  for (const ch of t) {
    need.set(ch, (need.get(ch) ?? 0) + 1);
  }

  let missing = t.length;
  let left = 0;
  let bestStart = 0;
  let bestLength = Infinity;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    if (need.has(ch)) {
      const stock = need.get(ch);

      if (stock > 0) {
        missing--;
      }

      need.set(ch, stock - 1);
    }

    while (missing === 0) {
      if (right - left + 1 < bestLength) {
        bestLength = right - left + 1;
        bestStart = left;
      }

      const leftChar = s[left];

      if (need.has(leftChar)) {
        const stock = need.get(leftChar);

        need.set(leftChar, stock + 1);

        if (stock >= 0) {
          missing++;
        }
      }

      left++;
    }
  }

  return bestLength === Infinity ? '' : s.slice(bestStart, bestStart + bestLength);
}
`,
    },
    {
      language: 'python',
      template: `def minWindow(s, t):
    # write your solution here
    pass
`,
      solution: `def minWindow(s, t):
    if len(t) == 0 or len(s) < len(t):
        return ''

    need = {}

    for ch in t:
        need[ch] = need.get(ch, 0) + 1

    missing = len(t)
    left = 0
    best_start = 0
    best_length = float('inf')

    for right, ch in enumerate(s):
        if ch in need:
            stock = need[ch]

            if stock > 0:
                missing -= 1

            need[ch] = stock - 1

        while missing == 0:
            if right - left + 1 < best_length:
                best_length = right - left + 1
                best_start = left

            left_char = s[left]

            if left_char in need:
                stock = need[left_char]

                need[left_char] = stock + 1

                if stock >= 0:
                    missing += 1

            left += 1

    if best_length == float('inf'):
        return ''

    return s[best_start:best_start + best_length]
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: ['ADOBECODEBANC', 'ABC'],
      expected: 'BANC',
    },
    {
      id: 'c2',
      input: ['a', 'a'],
      expected: 'a',
    },
    {
      id: 'c3',
      input: ['a', 'aa'],
      expected: '',
    },
    {
      id: 'c4',
      input: ['aa', 'aa'],
      expected: 'aa',
      hidden: true,
    },
    {
      id: 'c5',
      input: ['a', 'b'],
      expected: '',
      hidden: true,
    },
    {
      id: 'c6',
      input: ['bba', 'ab'],
      expected: 'ba',
      hidden: true,
    },
    {
      id: 'c7',
      input: ['cccbba', 'abc'],
      expected: 'cbba',
      hidden: true,
    },
    {
      id: 'c8',
      input: ['ab', ''],
      expected: '',
      hidden: true,
    },
    {
      id: 'c9',
      input: ['ADOBECODEBANC', 'AABC'],
      expected: 'ADOBECODEBA',
      hidden: true,
    },
  ],
};
