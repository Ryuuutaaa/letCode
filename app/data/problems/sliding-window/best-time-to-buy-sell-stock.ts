import type { Problem } from '~/types/content';

export const bestTimeToBuySellStock: Problem = {
  slug: 'best-time-to-buy-sell-stock',
  title: {
    id: 'Waktu Terbaik Membeli dan Menjual Saham',
    en: 'Best Time to Buy and Sell Stock',
  },
  difficulty: 'easy',
  trackId: 'sliding-window',
  order: 1,
  functionName: 'maxProfit',
  parameters: [{ name: 'prices', type: 'number[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array \`prices\`. Elemen ke-\`i\` adalah harga satu lembar saham pada hari
ke-\`i\`.

Kamu boleh melakukan **satu transaksi saja**: membeli satu lembar saham pada suatu hari, lalu
menjualnya pada hari **yang lebih akhir**. Kembalikan keuntungan maksimum yang bisa didapat.

Kalau tidak ada transaksi yang menguntungkan, kembalikan \`0\`.

Batasan: \`0 <= prices.length <= 10^5\` dan \`0 <= prices[i] <= 10^4\`.

Target: satu kali lintasan, O(n) waktu dan O(1) ruang tambahan.`,
    en: `You are given an array \`prices\`. Element \`i\` is the price of one share of a stock on
day \`i\`.

You may complete **one transaction only**: buy one share on some day, then sell it on a
**later** day. Return the maximum profit you can make.

If no profitable transaction exists, return \`0\`.

Constraints: \`0 <= prices.length <= 10^5\` and \`0 <= prices[i] <= 10^4\`.

Target: a single pass, O(n) time and O(1) extra space.`,
  },
  examples: [
    {
      input: 'prices = [7, 1, 5, 3, 6, 4]',
      output: '5',
      explanation: {
        id: 'Beli pada hari ke-2 dengan harga 1, jual pada hari ke-5 dengan harga 6. Keuntungannya 6 - 1 = 5. Harga 7 pada hari pertama tidak berguna karena tidak ada hari sebelumnya untuk membeli.',
        en: 'Buy on day 2 at price 1 and sell on day 5 at price 6. The profit is 6 - 1 = 5. The price of 7 on day 1 is useless because there is no earlier day to buy on.',
      },
    },
    {
      input: 'prices = [7, 6, 4, 3, 1]',
      output: '0',
      explanation: {
        id: 'Harga terus menurun, jadi setiap hari jual selalu lebih murah daripada hari beli mana pun sebelumnya. Tidak ada transaksi yang menguntungkan.',
        en: 'Prices only fall, so every selling day is cheaper than any earlier buying day. No profitable transaction exists.',
      },
    },
    {
      input: 'prices = [2, 4, 1]',
      output: '2',
      explanation: {
        id: 'Beli di hari pertama dengan harga 2 dan jual di hari kedua dengan harga 4. Harga 1 di hari terakhir tidak bisa dipakai karena tidak ada hari setelahnya untuk menjual.',
        en: 'Buy on the first day at 2 and sell on the second day at 4. The price of 1 on the last day is unusable because there is no later day to sell on.',
      },
    },
  ],
  hints: {
    id: [
      'Untuk setiap hari jual, harga beli terbaik adalah harga **terendah** yang pernah kamu lihat sebelum hari itu.',
      'Jadi kamu hanya perlu satu variabel tambahan: harga minimum sejauh ini.',
      'Selama menelusuri, perbarui harga minimum, lalu hitung selisih harga hari ini dengan minimum tersebut dan simpan yang terbesar.',
      'Hati-hati dengan urutan: hari yang menjadi harga minimum baru tidak boleh sekaligus dianggap sebagai hari jual.',
    ],
    en: [
      'For each selling day, the best buying price is the **lowest** price you have seen before that day.',
      'So you need exactly one extra variable: the minimum price so far.',
      'While scanning, update the minimum, then compute today\u2019s price minus that minimum and keep the largest result.',
      'Watch the order: a day that sets a new minimum must not also be treated as a selling day.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Ini bentuk paling sederhana dari sliding window: jendelanya membentang dari hari dengan harga
terendah sampai hari ini, dan lebarnya tidak pernah menyusut.

Pertahankan dua nilai sambil menelusuri array sekali dari kiri ke kanan:

- \`minPrice\` — harga terendah yang terlihat sejauh ini.
- \`best\` — keuntungan terbaik yang terlihat sejauh ini.

Untuk setiap harga \`p\`:

1. Kalau \`p < minPrice\`, perbarui \`minPrice\`. Hari itu menjadi kandidat hari beli baru, dan
   hari beli lama tidak lagi berguna karena harganya lebih mahal.
2. Kalau tidak, hitung \`p - minPrice\` sebagai kandidat keuntungan dan simpan yang terbesar.

Urutan pemeriksaan penting. Saat \`p\` lebih murah daripada semua harga sebelumnya, \`p\` tidak
boleh sekaligus dianggap sebagai hari jual — itu sama dengan membeli dan menjual di hari yang
sama, atau menjual sebelum membeli.

## Kompleksitas

- Waktu: O(n) — satu lintasan, setiap harga diperiksa satu kali.
- Ruang: O(1) — dua variabel angka.

## Kesalahan yang sering terjadi

- Mencari nilai maksimum dan minimum secara terpisah. Yang benar adalah harga minimum harus
  muncul **sebelum** harga maksimum, dan urutan itu tidak dijamin kalau keduanya dicari
  sendiri-sendiri.
- Memperbarui \`best\` sebelum membandingkan dengan \`minPrice\` dari hari-hari sebelumnya,
  sehingga hari beli bisa saja berada di masa depan.
- Mengembalikan selisih negatif (misalnya \`-6\` pada harga yang terus turun) alih-alih \`0\`.`,
    en: `## Approach

This is the simplest shape of a sliding window: the window stretches from the lowest price
seen so far to today, and it never shrinks.

Keep two values while scanning the array once from left to right:

- \`minPrice\` — the lowest price seen so far.
- \`best\` — the best profit seen so far.

For every price \`p\`:

1. If \`p < minPrice\`, update \`minPrice\`. That day becomes the new candidate buying day, and
   the old one is useless because it is more expensive.
2. Otherwise compute \`p - minPrice\` as a profit candidate and keep the largest.

The order matters. When \`p\` is cheaper than everything before it, \`p\` must not also be
treated as a selling day — that would mean buying and selling on the same day, or selling
before buying.

## Complexity

- Time: O(n) — one pass, each price examined once.
- Space: O(1) — two numeric variables.

## Common mistakes

- Finding the maximum and the minimum independently. The minimum must occur **before** the
  maximum, and that ordering is not guaranteed when the two are searched separately.
- Updating \`best\` before comparing against the minimum of the earlier days, which lets the
  buying day sit in the future.
- Returning a negative difference (say \`-6\` on steadily falling prices) instead of \`0\`.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function maxProfit(prices) {
  // write your solution here
}
`,
      solution: `function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > best) {
      best = price - minPrice;
    }
  }

  return best;
}
`,
    },
    {
      language: 'python',
      template: `def maxProfit(prices):
    # write your solution here
    pass
`,
      solution: `def maxProfit(prices):
    min_price = float('inf')
    best = 0

    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > best:
            best = price - min_price

    return best
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[7, 1, 5, 3, 6, 4]],
      expected: 5,
    },
    {
      id: 'c2',
      input: [[7, 6, 4, 3, 1]],
      expected: 0,
    },
    {
      id: 'c3',
      input: [[2, 4, 1]],
      expected: 2,
    },
    {
      id: 'c4',
      input: [[1]],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c5',
      input: [[]],
      expected: 0,
      hidden: true,
    },
    {
      id: 'c6',
      input: [[3, 3, 5, 0, 0, 3, 1, 4]],
      expected: 4,
      hidden: true,
    },
    {
      id: 'c7',
      input: [[1, 2]],
      expected: 1,
      hidden: true,
    },
    {
      id: 'c8',
      input: [[1000000, 1, 999999]],
      expected: 999998,
      hidden: true,
    },
  ],
};
