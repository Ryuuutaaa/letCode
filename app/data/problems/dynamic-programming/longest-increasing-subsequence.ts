import type { Problem } from '~/types/content';

export const longestIncreasingSubsequence: Problem = {
  slug: 'longest-increasing-subsequence',
  title: {
    id: 'Longest Increasing Subsequence',
    en: 'Longest Increasing Subsequence',
  },
  difficulty: 'hard',
  trackId: 'dynamic-programming',
  order: 5,
  functionName: 'lengthOfLIS',
  parameters: [{ name: 'nums', type: 'number[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat \`nums\`.

**Subsequence** adalah barisan yang diperoleh dengan membuang sebagian elemen dari \`nums\` tanpa
mengubah urutan sisanya. Elemen yang kamu pilih tidak perlu bersebelahan, hanya indeksnya yang
harus selalu menaik.

Kembalikan **panjang** subsequence **menaik ketat** (strictly increasing) terpanjang.

Array \`nums\` boleh kosong; jawabannya 0.

**Target: O(n log n).** Versi O(n²) adalah titik awal yang baik untuk menemukan polanya, tetapi
salah satu test case berisi 30.000 angka, sehingga solusi kuadratik kehabisan waktu.`,
    en: `You are given an array of integers \`nums\`.

A **subsequence** is a sequence obtained by deleting some elements from \`nums\` without changing
the order of the rest. The elements you keep do not have to be adjacent; only their indices must be
increasing.

Return the **length** of the longest **strictly increasing** subsequence.

\`nums\` may be empty; then the answer is 0.

**Target: O(n log n).** The O(n²) version is a good starting point for finding the pattern, but one
of the test cases holds 30,000 numbers, so a quadratic solution runs out of time.`,
  },
  examples: [
    {
      input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]',
      output: '4',
      explanation: {
        id: 'Subsequence terpanjang adalah `[2, 3, 7, 101]` (atau `[2, 3, 7, 18]`), keduanya panjangnya 4. Perhatikan bahwa elemen-elemen itu melompati banyak angka di antaranya.',
        en: 'The longest subsequence is `[2, 3, 7, 101]` (or `[2, 3, 7, 18]`), both of length 4. Notice how those elements jump over many numbers in between.',
      },
    },
    {
      input: 'nums = [0, 1, 0, 3, 2, 3]',
      output: '4',
      explanation: {
        id: 'Salah satu jawabannya `[0, 1, 2, 3]`. Angka 0 yang kedua dipakai karena terletak setelah 1, bukan karena nilainya berbeda.',
        en: 'One valid answer is `[0, 1, 2, 3]`. The second 0 is picked because it sits after the 1, not because its value differs.',
      },
    },
    {
      input: 'nums = [7, 7, 7, 7]',
      output: '1',
      explanation: {
        id: 'Subsequence harus menaik **ketat**, jadi nilai yang sama tidak boleh memperpanjangnya. Semua subsequence di sini hanya boleh berisi satu elemen.',
        en: 'The subsequence must be **strictly** increasing, so an equal value cannot extend it. Every subsequence here may only hold a single element.',
      },
    },
  ],
  hints: {
    id: [
      'Coba definisikan state: `dp[i]` adalah jawaban untuk subsequence yang elemen terakhirnya `nums[i]`. Kenapa harus "berakhir di `i`" dan bukan "di dalam prefiks `i`"?',
      'Karena elemen terakhirnya diketahui, transisinya bisa memeriksa semua kandidat sebelumnya: `dp[i] = 1 + max(dp[j])` untuk setiap `j < i` dengan `nums[j] < nums[i]`. Kalau tidak ada kandidat, `dp[i] = 1`.',
      'Jawabannya adalah `max(dp)`, bukan `dp[n - 1]`, karena subsequence terpanjang bisa berakhir di indeks mana pun.',
      'Untuk versi O(n log n): simpan array `tails` yang berisi nilai penutup terkecil untuk setiap panjang, lalu cari posisi `nums[i]` di dalamnya dengan binary search.',
    ],
    en: [
      'Try defining the state first: `dp[i]` is the answer for subsequences whose last element is `nums[i]`. Why must it be "ending at `i`" rather than "inside prefix `i`"?',
      'Because the last element is known, the transition can inspect every earlier candidate: `dp[i] = 1 + max(dp[j])` for each `j < i` with `nums[j] < nums[i]`. If no candidate fits, `dp[i] = 1`.',
      'The answer is `max(dp)`, not `dp[n - 1]`, because the longest subsequence may end at any index.',
      'For the O(n log n) version: keep a `tails` array holding the smallest possible tail for each length, then locate the position of `nums[i]` inside it with binary search.',
    ],
  },
  explanation: {
    id: `## Pendekatan

State-nya: \`dp[i]\` adalah panjang subsequence menaik terpanjang yang **berakhir tepat di indeks
\`i\`**. Definisi ini penting. Kalau state-nya hanya "di dalam prefiks \`0..i\`", transisinya tidak
punya informasi tentang nilai elemen terakhir, sehingga elemen berikutnya tidak bisa dibandingkan.

Dengan state itu, keputusan terakhirnya adalah elemen terakhir sebelum \`i\`, yaitu indeks \`j\`
terbaik dengan \`j < i\` dan \`nums[j] < nums[i]\`:

\`\`\`
dp[i] = 1 + max(dp[j]) untuk semua j < i dengan nums[j] < nums[i]
dp[i] = 1 kalau tidak ada j seperti itu
\`\`\`

Jawabannya \`max(dp)\`, bukan \`dp[n - 1]\`, karena subsequence terpanjang boleh berakhir di indeks
mana pun. Versi ini O(n²).

### Versi O(n log n)

Ganti tabel \`dp\` dengan array \`tails\`, di mana \`tails[k]\` adalah nilai penutup **terkecil** yang
mungkin untuk subsequence menaik sepanjang \`k + 1\`. Array ini selalu terurut menaik, sehingga
setiap angka cukup diproses dengan binary search: cari posisi pertama di \`tails\` yang nilainya
tidak lebih kecil dari angka saat ini, lalu timpa posisi itu. Kalau angkanya lebih besar dari semua
isi \`tails\`, tambahkan di belakang.

\`\`\`
tails = []
for (const value of nums) {
  let lo = 0, hi = tails.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (tails[mid] < value) lo = mid + 1
    else hi = mid
  }
  if (lo === tails.length) tails.push(value)
  else tails[lo] = value
}
return tails.length
\`\`\`

Perhatikan perbandingan **ketat** (\`< value\`). Karena subsequence-nya harus menaik ketat, nilai
yang sama tidak boleh memperpanjang subsequence, tetapi tetap boleh menggantikan nilai penutup yang
lebih besar supaya kemungkinan berikutnya lebih luas. Panjang \`tails\` di akhir adalah jawabannya.

## Kompleksitas

- Versi DP: O(n²) waktu, O(n) ruang.
- Versi tails: O(n log n) waktu — satu binary search per elemen — dan O(n) ruang.

## Kesalahan umum

- **State yang tidak lengkap.** \`dp[i]\` yang berarti "LIS di dalam prefiks \`0..i\`" tidak bisa
  ditransisi, karena nilai elemen terakhirnya tidak diketahui. Yang benar adalah "berakhir di \`i\`".
- **Mengembalikan \`dp[n - 1]\`.** Jawabannya \`max(dp)\`. Pada \`[1, 2, 3, 0]\` nilai \`dp[n - 1]\`
  hanya 1, padahal jawaban yang benar 3, dan kode seperti itu tidak melempar error apa pun.
- **Menganggap subsequence harus bersebelahan.** Itu subarray, bukan subsequence. Di sini elemen
  boleh melompat.
- **Perbandingan tidak ketat pada versi tails.** Dengan \`<=\`, input yang penuh duplikat seperti
  \`[7, 7, 7, 7]\` menghasilkan 4, padahal jawabannya 1.
- **Tetap memakai O(n²) pada input besar.** Test case terbesar berisi 30.000 angka; DP kuadratik
  kehabisan waktu sebelum selesai, jadi naikkan ke versi binary search.`,
    en: `## Approach

The state is: \`dp[i]\` is the length of the longest increasing subsequence that **ends exactly at
index \`i\`**. That definition matters. If the state were only "inside prefix \`0..i\`", the
transition would have no information about the value of the last element, so the next element could
never be compared.

With that state, the last decision is the element right before \`i\` — the best index \`j\` with
\`j < i\` and \`nums[j] < nums[i]\`:

\`\`\`
dp[i] = 1 + max(dp[j]) for every j < i with nums[j] < nums[i]
dp[i] = 1 when no such j exists
\`\`\`

The answer is \`max(dp)\`, not \`dp[n - 1]\`, because the longest subsequence may end at any index.
This version is O(n²).

### The O(n log n) version

Replace the \`dp\` table with a \`tails\` array, where \`tails[k]\` is the **smallest** possible tail
value of an increasing subsequence of length \`k + 1\`. That array is always sorted ascending, so
each number can be handled with a binary search: find the first position in \`tails\` whose value is
not smaller than the current number, then overwrite that position. If the number is larger than
everything in \`tails\`, append it at the end.

\`\`\`
tails = []
for (const value of nums) {
  let lo = 0, hi = tails.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (tails[mid] < value) lo = mid + 1
    else hi = mid
  }
  if (lo === tails.length) tails.push(value)
  else tails[lo] = value
}
return tails.length
\`\`\`

Note the **strict** comparison (\`< value\`). Because the subsequence must be strictly increasing, an
equal value may not extend it — but it may still replace a larger tail so that later numbers have
more room. The length of \`tails\` at the end is the answer.

## Complexity

- DP version: O(n²) time, O(n) space.
- Tails version: O(n log n) time — one binary search per element — and O(n) space.

## Common mistakes

- **An incomplete state.** A \`dp[i]\` meaning "LIS inside prefix \`0..i\`" cannot be transitioned,
  because the value of its last element is unknown. The correct reading is "ending at \`i\`".
- **Returning \`dp[n - 1]\`.** The answer is \`max(dp)\`. On \`[1, 2, 3, 0]\` the value \`dp[n - 1]\`
  is just 1 while the correct answer is 3, and such code never raises an error.
- **Assuming the subsequence must be contiguous.** That would be a subarray, not a subsequence.
  Here elements are allowed to jump.
- **A non-strict comparison in the tails version.** With \`<=\`, a duplicate-heavy input such as
  \`[7, 7, 7, 7]\` yields 4 when the answer is 1.
- **Staying with O(n²) on a large input.** The biggest test case holds 30,000 numbers; a quadratic
  DP runs out of time long before it finishes, so move up to the binary-search version.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function lengthOfLIS(nums) {
  // write your solution here
}
`,
      solution: `function lengthOfLIS(nums) {
  const tails = [];

  for (const value of nums) {
    let lo = 0;
    let hi = tails.length;

    while (lo < hi) {
      const mid = (lo + hi) >> 1;

      if (tails[mid] < value) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    if (lo === tails.length) {
      tails.push(value);
    } else {
      tails[lo] = value;
    }
  }

  return tails.length;
}
`,
    },
    {
      language: 'python',
      template: `def lengthOfLIS(nums):
    # write your solution here
    pass
`,
      solution: `def lengthOfLIS(nums):
    tails = []

    for value in nums:
        lo, hi = 0, len(tails)

        while lo < hi:
            mid = (lo + hi) // 2

            if tails[mid] < value:
                lo = mid + 1
            else:
                hi = mid

        if lo == len(tails):
            tails.append(value)
        else:
            tails[lo] = value

    return len(tails)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
    { id: 'c2', input: [[0, 1, 0, 3, 2, 3]], expected: 4 },
    { id: 'c3', input: [[7, 7, 7, 7]], expected: 1 },
    { id: 'c4', input: [[]], expected: 0, hidden: true },
    { id: 'c5', input: [[1]], expected: 1, hidden: true },
    { id: 'c6', input: [[-5, -3, -1, -2, 0]], expected: 4, hidden: true },
    { id: 'c7', input: [[3, 4, 5, 1, 2]], expected: 3, hidden: true },
    // Large hidden case: an O(n^2) solution cannot finish it within the time limit.
    // It is generated by an expression so this file does not carry 30000 literal numbers.
    {
      id: 'c8',
      input: [Array.from({ length: 30000 }, (_, index) => (index * 7919) % 100003 - 50000)],
      expected: 163,
      hidden: true,
    },
  ],
};
