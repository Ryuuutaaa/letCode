import type { Problem } from '~/types/content';

export const dailyTemperatures: Problem = {
  slug: 'daily-temperatures',
  title: {
    id: 'Daily Temperatures',
    en: 'Daily Temperatures',
  },
  difficulty: 'medium',
  trackId: 'stack',
  order: 4,
  functionName: 'dailyTemperatures',
  parameters: [{ name: 'temperatures', type: 'number[]' }],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan array bilangan bulat positif \`temperatures\`, di mana \`temperatures[i]\` adalah
suhu pada hari ke-\`i\`.

Untuk setiap hari, hitung berapa hari lagi sampai muncul hari dengan suhu **lebih tinggi**.
Kalau tidak ada hari seperti itu setelahnya, jawabannya \`0\`.

Kembalikan array \`answer\` dengan panjang sama, di mana \`answer[i]\` adalah jumlah hari yang
harus ditunggu setelah hari ke-\`i\`.

Dua hal yang sering menyesatkan:

- Yang dihitung adalah **jarak hari**, bukan selisih suhu.
- Suhu harus **lebih tinggi secara ketat**. Hari dengan suhu sama tidak dianggap lebih hangat.

Target: **O(n)**, bukan O(n²).`,
    en: `You are given an array of positive integers \`temperatures\`, where \`temperatures[i]\` is the
temperature on day \`i\`.

For every day, work out how many days you must wait until a day with a **higher** temperature
arrives. If no such day comes, the answer is \`0\`.

Return an array \`answer\` of the same length, where \`answer[i]\` is the number of days to wait
after day \`i\`.

Two things that mislead people:

- What is counted is the **day distance**, not the temperature difference.
- The temperature must be **strictly higher**. A day with an equal temperature is not warmer.

Target: **O(n)**, not O(n²).`,
  },
  examples: [
    {
      input: 'temperatures = [73,74,75,71,69,72,76,73]',
      output: '[1,1,4,2,1,1,0,0]',
      explanation: {
        id: 'Hari 0 (73) menunggu 1 hari sampai 74. Hari 2 (75) menunggu 4 hari sampai 76 di indeks 6. Dua hari terakhir tidak pernah kedatangan suhu yang lebih tinggi, jadi jawabannya 0.',
        en: 'Day 0 (73) waits 1 day for 74. Day 2 (75) waits 4 days for 76 at index 6. The last two days never see a warmer day, so their answers are 0.',
      },
    },
    {
      input: 'temperatures = [30,40,50,60]',
      output: '[1,1,1,0]',
      explanation: {
        id: 'Suhu naik terus, jadi setiap hari hanya menunggu satu hari. Hari terakhir tidak punya hari berikutnya, jadi 0.',
        en: 'Temperatures climb steadily, so every day waits exactly one day. The last day has no day after it, hence 0.',
      },
    },
    {
      input: 'temperatures = [90,80,70]',
      output: '[0,0,0]',
      explanation: {
        id: 'Suhu terus menurun sehingga tidak ada hari yang pernah lebih hangat dari hari sebelumnya.',
        en: 'Temperatures keep falling, so no day is ever warmer than an earlier one.',
      },
    },
  ],
  hints: {
    id: [
      'Mulai dari cara sederhana: untuk setiap hari, telusuri hari-hari berikutnya sampai menemukan yang lebih hangat. Berapa biayanya, dan di mana pemborosan utamanya?',
      'Hari yang lebih hangat menjawab **semua** hari sebelumnya yang lebih dingin dan belum terjawab — bukan hanya hari tepat sebelumnya.',
      'Simpan indeks hari yang belum terjawab di stack, dengan suhu menurun dari bawah ke puncak. Saat suhu hari ini lebih tinggi dari puncak, pop indeks itu dan catat `i - indeks`.',
      'Indeks yang tersisa di stack setelah input habis tidak punya hari yang lebih hangat. Jika array jawaban diinisialisasi dengan 0, sisa itu sudah tertangani.',
    ],
    en: [
      'Start simple: for each day, scan forward until you find a warmer one. What does that cost, and where is the main waste?',
      'A warmer day answers **every** earlier colder day that is still unresolved — not only the day right before it.',
      'Keep unresolved day indices on a stack, with temperatures decreasing from bottom to top. When today is warmer than the top, pop that index and record `i - index`.',
      'Indices left on the stack once the input ends never see a warmer day. If the answer array starts filled with 0, those leftovers are already handled.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Cara brute force memeriksa ke depan untuk setiap hari, sehingga O(n²): pada array yang terus
menurun, setiap hari memindai seluruh sisa array dan tidak menemukan apa pun.

Perhatikan apa yang dilakukan hari yang lebih hangat. Saat suhu hari ini lebih tinggi daripada
hari-hari sebelumnya yang lebih dingin, hari ini menjawab **mereka semua sekaligus**. Jadi kita
tidak perlu menyimpan nilai suhunya saja — kita perlu menyimpan **daftar hari yang menunggu**.

Simpan indeks hari (bukan suhunya, karena kita butuh jarak) di stack dengan invarian: suhu
pada indeks-indeks itu **menurun** dari dasar ke puncak. Untuk setiap hari \`i\`:

1. Selama stack tidak kosong dan \`temperatures[i] > temperatures[stack.top]\`, pop indeks \`j\`
   dari stack dan isi \`answer[j] = i - j\`. Hari \`i\` lebih hangat, jadi hari \`j\` selesai
   menunggu.
2. Push \`i\` ke stack.

Indeks yang tersisa di stack di akhir tidak punya jawaban, dan karena \`answer\` diinisialisasi
\`0\`, tidak ada langkah tambahan yang diperlukan.

Perbandingan memakai \`>\` (bukan \`>=\`): suhu yang sama tidak dianggap lebih hangat, dan dengan
\`>=\` hari-hari bersuhu sama akan saling "menjawab" dengan salah pada input seperti
\`[50,50,50]\`.

## Kompleksitas

- Waktu: O(n). Meskipun ada loop di dalam loop, setiap indeks di-push sekali dan di-pop paling
  banyak sekali, jadi total pekerjaan kedua loop adalah O(n).
- Ruang: O(n) untuk stack dan array jawaban.

## Kesalahan umum

- Memakai \`>=\` sehingga hari bersuhu sama dianggap lebih hangat.
- Menyimpan suhu di stack, lalu bingung mengapa jarak hari tidak bisa dihitung. Simpan
  **indeks**; suhu tetap bisa dibaca dari array.
- Mengembalikan selisih suhu, padahal soal meminta jumlah hari.
- Menambahkan langkah khusus untuk "sisa stack" padahal array jawaban yang diinisialisasi \`0\`
  sudah benar.`,
    en: `## Approach

The brute-force way scans forward for every day, which is O(n²): on an array that keeps
falling, every day walks the whole remaining input and finds nothing.

Look at what a warmer day actually does. When today is warmer than the earlier colder days,
today answers **all of them at once**. So we should not store only temperature values — we
need to keep the **list of days still waiting**.

Store day indices (not temperatures, because we need distances) on a stack with this
invariant: the temperatures at those indices are **decreasing** from bottom to top. For every
day \`i\`:

1. While the stack is not empty and \`temperatures[i] > temperatures[stack.top]\`, pop index
   \`j\` and set \`answer[j] = i - j\`. Day \`i\` is warmer, so day \`j\` is done waiting.
2. Push \`i\`.

Indices left on the stack at the end have no answer, and since \`answer\` starts filled with
\`0\`, no extra step is needed.

The comparison uses \`>\` (not \`>=\`): an equal temperature is not warmer, and with \`>=\` days
of equal temperature would wrongly "answer" each other on inputs like \`[50,50,50]\`.

## Complexity

- Time: O(n). Even though there is a loop inside a loop, every index is pushed once and popped
  at most once, so the total work of both loops is O(n).
- Space: O(n) for the stack and the answer array.

## Common mistakes

- Using \`>=\`, so a day with an equal temperature counts as warmer.
- Storing temperatures on the stack, then wondering why the day distance cannot be computed.
  Store **indices**; the temperature is still readable from the array.
- Returning the temperature difference when the problem asks for a number of days.
- Adding special handling for the "leftover stack" even though an answer array initialized to
  \`0\` is already correct.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function dailyTemperatures(temperatures) {
  // write your solution here
}
`,
      solution: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const index = stack.pop();
      answer[index] = i - index;
    }

    stack.push(i);
  }

  return answer;
}
`,
    },
    {
      language: 'python',
      template: `def dailyTemperatures(temperatures):
    # write your solution here
    pass
`,
      solution: `def dailyTemperatures(temperatures):
    answer = [0] * len(temperatures)
    stack = []

    for i, temperature in enumerate(temperatures):
        while stack and temperature > temperatures[stack[-1]]:
            index = stack.pop()
            answer[index] = i - index

        stack.append(i)

    return answer
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [[73, 74, 75, 71, 69, 72, 76, 73]],
      expected: [1, 1, 4, 2, 1, 1, 0, 0],
    },
    { id: 'c2', input: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
    { id: 'c3', input: [[30, 60, 90]], expected: [1, 1, 0], hidden: true },
    { id: 'c4', input: [[90, 80, 70]], expected: [0, 0, 0], hidden: true },
    { id: 'c5', input: [[30]], expected: [0], hidden: true },
    { id: 'c6', input: [[]], expected: [], hidden: true },
    {
      id: 'c7',
      input: [[41, 42, 41, 43, 40, 45]],
      expected: [1, 2, 1, 2, 1, 0],
      hidden: true,
    },
    { id: 'c8', input: [[50, 50, 50]], expected: [0, 0, 0], hidden: true },
    {
      id: 'c9',
      input: [[100000, 99999, 100000]],
      expected: [0, 1, 0],
      hidden: true,
    },
  ],
};
