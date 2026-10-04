import type { Problem } from '~/types/content';

export const coinChange: Problem = {
  slug: 'coin-change',
  title: {
    id: 'Coin Change',
    en: 'Coin Change',
  },
  difficulty: 'medium',
  trackId: 'dynamic-programming',
  order: 4,
  functionName: 'coinChange',
  parameters: [
    { name: 'coins', type: 'number[]' },
    { name: 'amount', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Kamu diberi daftar nilai koin \`coins\` dan sebuah nilai target \`amount\`. Setiap jenis koin
boleh dipakai **berkali-kali**; persediaannya tidak terbatas.

Kembalikan **jumlah koin paling sedikit** yang nilainya berjumlah tepat \`amount\`. Kalau nilai itu
tidak mungkin dibentuk dari koin yang tersedia, kembalikan \`-1\`.

**Kenapa \`-1\` dan bukan \`null\`?** Karena jumlah koin minimum tidak pernah negatif, \`-1\` sudah
cukup sebagai penanda "mustahil". Tipe nilai kembaliannya tetap satu angka di kedua bahasa,
sehingga pemanggil hanya perlu memeriksa satu kasus khusus dan tidak perlu membedakan "kosong"
dari "tidak ada jawaban". \`null\` juga sah secara teknis, tetapi membuat tipe kembaliannya
menjadi nullable untuk satu-satunya kasus ini.

Perhatikan bahwa \`amount = 0\` selalu bisa dibentuk: dengan nol koin.

Target: O(amount × jumlah koin).`,
    en: `You are given a list of coin values \`coins\` and a target value \`amount\`. Every
denomination may be used **any number of times**; the supply is unlimited.

Return the **smallest number of coins** whose values sum to exactly \`amount\`. If that value cannot
be formed from the available coins, return \`-1\`.

**Why \`-1\` and not \`null\`?** Because the minimum number of coins is never negative, \`-1\` is
already an unambiguous marker for "impossible". The return type stays a single number in both
languages, so the caller checks exactly one special case and never has to tell "empty" apart from
"no answer". \`null\` is technically fine too, but it makes the return type nullable for this one
case only.

Note that \`amount = 0\` can always be formed: with zero coins.

Target: O(amount × number of coins).`,
  },
  examples: [
    {
      input: 'coins = [1, 2, 5], amount = 11',
      output: '3',
      explanation: {
        id: 'Kombinasi terbaik adalah 5 + 5 + 1, memakai 3 koin. Dua koin tidak cukup karena nilai terbesar yang bisa dibentuk dua koin adalah 10.',
        en: 'The best combination is 5 + 5 + 1, using 3 coins. Two coins are not enough, because the largest sum two coins can make is 10.',
      },
    },
    {
      input: 'coins = [2], amount = 3',
      output: '-1',
      explanation: {
        id: 'Semua koin bernilai genap, jadi tidak ada jumlah koin berapa pun yang bisa membentuk nilai ganjil 3.',
        en: 'Every coin has an even value, so no number of coins can ever form the odd value 3.',
      },
    },
    {
      input: 'coins = [1], amount = 0',
      output: '0',
      explanation: {
        id: 'Nilai 0 dibentuk dengan nol koin. Ini base case-nya, bukan kasus mustahil.',
        en: 'The value 0 is formed with zero coins. That is the base case, not an impossible case.',
      },
    },
  ],
  hints: {
    id: [
      'Bayangkan koin terakhir yang kamu letakkan di meja. Kalau koin itu bernilai `c`, berapa nilai yang masih harus dibentuk sebelum koin itu?',
      'Sisa nilainya adalah `amount - c`, jadi `dp[a] = min(1 + dp[a - c])` untuk setiap koin `c` yang tidak melebihi `a`. Isi tabel dari nilai kecil ke besar karena koin yang sama boleh dipakai berulang.',
      'Base case-nya `dp[0] = 0`: nol koin untuk nilai nol. Nilai lain diinisialisasi sebagai tak hingga, bukan 0, supaya nilai yang belum bisa dibentuk tidak dianggap punya solusi.',
      'Jangan memakai -1 sebagai penanda "belum bisa dibentuk" selama perhitungan, karena `-1 + 1` bernilai 0 dan terlihat seperti solusi yang sah. Konversikan ke -1 hanya sekali di akhir, dan jangan pernah mengembalikan nilai tak hingga.',
    ],
    en: [
      'Picture the last coin you place on the table. If that coin is worth `c`, how much is still left to form before it?',
      'The remainder is `amount - c`, so `dp[a] = min(1 + dp[a - c])` for every coin `c` that does not exceed `a`. Fill the table from small values upward, because the same coin may be reused.',
      'The base case is `dp[0] = 0`: zero coins for the value zero. Every other entry starts at infinity, not 0, so an amount that cannot be formed is not mistaken for a solved one.',
      'Do not use -1 as the "not formed yet" marker during the computation, because `-1 + 1` is 0 and looks like a valid answer. Convert to -1 once, at the very end, and never return infinity.',
    ],
  },
  explanation: {
    id: `## Pendekatan

State-nya adalah "sisa nilai yang harus dibentuk": \`dp[a]\` berarti jumlah koin paling sedikit untuk
membentuk nilai \`a\`. Keputusan terakhirnya adalah **koin terakhir** yang dipakai, sehingga:

\`\`\`
dp[0] = 0
dp[a] = min(1 + dp[a - c]) untuk setiap koin c dengan c <= a
\`\`\`

Karena setiap koin boleh dipakai berkali-kali (knapsack tak terbatas), nilai \`a\` boleh diisi dari
kecil ke besar: saat menghitung \`dp[a]\`, semua \`dp[a - c]\` sudah final karena \`a - c < a\`.

Nilai yang belum bisa dibentuk diisi tak hingga — \`Infinity\` di JavaScript, \`float('inf')\` di
Python. Setelah loop selesai, \`dp[amount]\` yang masih tak hingga berarti nilainya mustahil
dibentuk, dan jawabannya \`-1\`.

Soal ini juga contoh yang baik untuk membedakan **penanda** dari **nilai sah**. Karena jawaban
yang sah tidak pernah negatif, \`-1\` aman dipakai sebagai penanda hasil, tetapi berbahaya kalau
dipakai sebagai penanda di tengah perhitungan: \`-1 + 1\` bernilai 0 dan 0 terlihat seperti solusi
yang sah.

## Kompleksitas

- Waktu: O(amount × jumlah koin) — setiap nilai target memeriksa setiap koin sekali.
- Ruang: O(amount) — satu baris tabel.

## Kesalahan umum

- **Memakai -1 sebagai tak hingga.** Nilai yang mustahil ikut dihitung sebagai "0 koin + 1", dan
  jawabannya salah pada input yang tidak bisa dibentuk.
- **Menginisialisasi seluruh tabel dengan 0.** Kalau semua sel dimulai dari 0, nilai yang belum
  bisa dibentuk dianggap selesai dengan 0 koin, sehingga jawabannya selalu 0.
- **Greedy mengambil koin terbesar lebih dulu.** Contoh tandingannya klasik: koin \`[1, 3, 4]\` dan
  nilai 6. Greedy memberi 4 + 1 + 1 = 3 koin, sedangkan jawaban terbaik adalah 3 + 3 = 2 koin.
- **Lupa \`amount = 0\`.** Nilai nol dibentuk dengan nol koin, dan itu base case-nya.
- **Memakai arah iterasi knapsack 0/1.** Di sini koin boleh dipakai berulang, jadi arah yang benar
  adalah dari nilai kecil ke besar. Arah menurun masih memberi jawaban benar untuk fungsi minimum,
  tetapi begitu soalnya berubah menjadi "berapa banyak kombinasi", arah dan urutan loop langsung
  menentukan benar atau salahnya.
- **Mengembalikan nilai tak hingga.** Nilai itu tidak punya bentuk dalam JSON dan akan berubah
  menjadi \`null\` saat melewati batas proses. Konversikan ke \`-1\` sebelum dikembalikan.`,
    en: `## Approach

The state is "the amount still to be formed": \`dp[a]\` means the smallest number of coins that
sums to exactly \`a\`. The last decision is the **last coin** used, which gives:

\`\`\`
dp[0] = 0
dp[a] = min(1 + dp[a - c]) for every coin c with c <= a
\`\`\`

Because every coin may be reused (unbounded knapsack), the amount \`a\` can be filled from small to
large: when \`dp[a]\` is computed, every \`dp[a - c]\` is already final since \`a - c < a\`.

Amounts that cannot be formed yet are filled with infinity — \`Infinity\` in JavaScript,
\`float('inf')\` in Python. After the loop, a \`dp[amount]\` that is still infinite means the value
is impossible and the answer is \`-1\`.

This problem is also a good place to separate a **marker** from a **valid value**. Since a valid
answer is never negative, \`-1\` is safe as the final marker, but dangerous in the middle of the
computation: \`-1 + 1\` is 0, and 0 looks like a perfectly valid solution.

## Complexity

- Time: O(amount × number of coins) — every target value inspects every coin once.
- Space: O(amount) — a single row of the table.

## Common mistakes

- **Using -1 as infinity.** Impossible amounts then get counted as "0 coins plus 1", and the
  answer is wrong on inputs that cannot be formed.
- **Initializing the whole table to 0.** If every cell starts at 0, unformed amounts look solved
  with zero coins, so the answer is always 0.
- **Greedily taking the largest coin first.** The classic counterexample is coins \`[1, 3, 4]\` with
  the value 6. Greedy gives 4 + 1 + 1 = 3 coins, while the optimal answer is 3 + 3 = 2 coins.
- **Forgetting \`amount = 0\`.** The value zero is formed with zero coins, and that is the base case.
- **Borrowing the 0/1 knapsack direction.** Here coins may be reused, so the correct direction is
  from small amounts upward. A descending loop still gives the right number for a minimum, but the
  moment the question becomes "how many combinations", the direction and nesting of the loops
  decide correctness.
- **Returning infinity.** It has no JSON representation and turns into \`null\` when it crosses a
  process boundary. Convert it to \`-1\` before returning.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function coinChange(coins, amount) {
  // write your solution here
}
`,
      solution: `function coinChange(coins, amount) {
  const unreachable = Infinity;
  const best = new Array(amount + 1).fill(unreachable);
  best[0] = 0;

  for (let value = 1; value <= amount; value++) {
    for (const coin of coins) {
      if (coin <= value && best[value - coin] + 1 < best[value]) {
        best[value] = best[value - coin] + 1;
      }
    }
  }

  return best[amount] === unreachable ? -1 : best[amount];
}
`,
    },
    {
      language: 'python',
      template: `def coinChange(coins, amount):
    # write your solution here
    pass
`,
      solution: `def coinChange(coins, amount):
    unreachable = float('inf')
    best = [unreachable] * (amount + 1)
    best[0] = 0

    for value in range(1, amount + 1):
        for coin in coins:
            if coin <= value and best[value - coin] + 1 < best[value]:
                best[value] = best[value - coin] + 1

    return -1 if best[amount] == unreachable else best[amount]
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 5], 11], expected: 3 },
    { id: 'c2', input: [[2], 3], expected: -1 },
    { id: 'c3', input: [[1], 0], expected: 0 },
    { id: 'c4', input: [[3, 7], 5], expected: -1, hidden: true },
    { id: 'c5', input: [[2, 5, 10, 1], 27], expected: 4, hidden: true },
    { id: 'c6', input: [[186, 419, 83, 408], 6249], expected: 20, hidden: true },
    { id: 'c7', input: [[5, 7], 1], expected: -1, hidden: true },
    { id: 'c8', input: [[], 0], expected: 0, hidden: true },
    { id: 'c9', input: [[1, 1, 2], 3], expected: 2, hidden: true },
    { id: 'c10', input: [[1, 2, 5], 10000], expected: 2000, hidden: true },
  ],
};
