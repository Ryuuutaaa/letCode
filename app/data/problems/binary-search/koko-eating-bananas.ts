import type { Problem } from '~/types/content';

export const kokoEatingBananas: Problem = {
  slug: 'koko-eating-bananas',
  title: {
    id: 'Kecepatan Makan Minimum',
    en: 'Koko Eating Bananas',
  },
  difficulty: 'hard',
  trackId: 'binary-search',
  order: 5,
  functionName: 'minEatingSpeed',
  parameters: [
    { name: 'piles', type: 'number[]' },
    { name: 'h', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Ada \`piles.length\` tumpukan pisang. Tumpukan ke-\`i\` berisi \`piles[i]\` pisang.

Kamu punya \`h\` jam untuk menghabiskan semuanya. Setiap jam, kamu memilih **satu** tumpukan
dan memakan paling banyak \`k\` pisang darinya:

- Kalau tumpukan itu masih berisi \`k\` pisang atau lebih, kamu memakan tepat \`k\` pisang dan
  tumpukan itu tetap ada untuk jam berikutnya.
- Kalau isinya kurang dari \`k\`, kamu menghabiskan tumpukan itu dan **tidak boleh** berpindah
  ke tumpukan lain pada jam yang sama.

Kembalikan **nilai \`k\` terkecil** sehingga seluruh pisang habis dalam \`h\` jam atau kurang.

Dijamin \`h >= piles.length\`, jadi jawabannya selalu ada. Nilai \`k\` selalu bilangan bulat.

Perhatikan: jawaban yang benar belum tentu sama dengan ukuran salah satu tumpukan.`,
    en: `There are \`piles.length\` piles of bananas. Pile number \`i\` holds \`piles[i]\` bananas.

You have \`h\` hours to finish all of them. In each hour you pick **one** pile and eat at most
\`k\` bananas from it:

- If the pile still holds \`k\` bananas or more, you eat exactly \`k\` and the pile remains for a
  later hour.
- If it holds fewer than \`k\`, you finish the pile and **may not** move on to another pile
  during the same hour.

Return the **smallest value of \`k\`** such that every banana is gone within \`h\` hours or less.

It is guaranteed that \`h >= piles.length\`, so the answer always exists. The value of \`k\` is
always a whole number.

Note that the correct answer does not have to equal any of the pile sizes.`,
  },
  examples: [
    {
      input: 'piles = [3, 6, 7, 11], h = 8',
      output: '4',
      explanation: {
        id: 'Dengan k = 4, kebutuhan jamnya ceil(3/4) + ceil(6/4) + ceil(7/4) + ceil(11/4) = 1 + 2 + 2 + 3 = 8 jam, tepat pas. Dengan k = 3 menjadi 1 + 2 + 3 + 4 = 10 jam, terlalu lama.',
        en: 'With k = 4 the hours needed are ceil(3/4) + ceil(6/4) + ceil(7/4) + ceil(11/4) = 1 + 2 + 2 + 3 = 8, exactly the budget. With k = 3 it becomes 1 + 2 + 3 + 4 = 10 hours, which is too slow.',
      },
    },
    {
      input: 'piles = [30, 11, 23, 4, 20], h = 5',
      output: '30',
      explanation: {
        id: 'Karena jumlah tumpukan sama dengan jumlah jam, setiap jam hanya boleh dipakai untuk satu tumpukan. Tumpukan terbesar (30) harus habis dalam satu jam, jadi k minimal adalah 30.',
        en: 'The number of piles equals the number of hours, so each hour can only handle a single pile. The largest pile (30) must be finished in one hour, so the smallest k is 30.',
      },
    },
    {
      input: 'piles = [7, 5, 3], h = 5',
      output: '4',
      explanation: {
        id: 'Dengan k = 4 dibutuhkan 2 + 2 + 1 = 5 jam. Dengan k = 3 dibutuhkan 3 + 2 + 1 = 6 jam, kelebihan. Perhatikan bahwa 4 bukan ukuran tumpukan mana pun.',
        en: 'With k = 4 the cost is 2 + 2 + 1 = 5 hours. With k = 3 it is 3 + 2 + 1 = 6 hours, one too many. Notice that 4 matches no pile size.',
      },
    },
  ],
  hints: {
    id: [
      'Jawabannya berupa sebuah angka, dan angka itu berada di suatu rentang. Berapa nilai terkecil dan terbesar yang mungkin masuk akal?',
      'Coba tebak satu nilai k, lalu hitung berapa jam yang dibutuhkan: jumlahkan ceil(pile / k) untuk setiap tumpukan.',
      'Apakah menaikkan k bisa membuat keadaan menjadi lebih buruk? Kalau tidak, tebakan yang layak berarti semua nilai di atasnya juga layak. Jadi yang dicari adalah tebakan terkecil yang masih layak — persis seperti lower bound, hanya saja kandidatnya angka, bukan elemen array.',
      'Pakai `while (lo < hi)` dengan `hi = mid` ketika tebakannya layak dan `lo = mid + 1` ketika tidak. Rentang awalnya `[1, max(piles)]`.',
    ],
    en: [
      'The answer is a number, and that number lives inside some range. What are the smallest and largest values that could possibly make sense?',
      'Guess one value of k, then count the hours it needs: sum ceil(pile / k) over every pile.',
      'Can raising k ever make the situation worse? If not, a feasible guess means every larger value is feasible too. So we want the smallest guess that still works — exactly like a lower bound, except the candidates are numbers rather than array slots.',
      'Use `while (lo < hi)` with `hi = mid` when the guess works and `lo = mid + 1` when it does not. The starting range is `[1, max(piles)]`.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Ini adalah **binary search pada jawaban**. Yang ditelusuri bukan array \`piles\`, melainkan
rentang nilai \`k\` yang mungkin.

**Langkah 1 — tentukan rentangnya.** Nilai \`k = 0\` tidak masuk akal, jadi \`lo = 1\`. Nilai
terbesar yang perlu dipertimbangkan adalah \`max(piles)\`: dengan kecepatan sebesar itu setiap
tumpukan selesai dalam satu jam, sehingga totalnya \`piles.length\` jam, dan syarat
\`h >= piles.length\` menjaminnya cukup. Jadi rentangnya \`[1, max(piles)]\`.

**Langkah 2 — tulis fungsi kelayakan.** Untuk kecepatan \`k\`, jam yang dibutuhkan tumpukan
\`p\` adalah \`ceil(p / k)\`. Jadi:

\`jamDibutuhkan(k) = sum(ceil(p / k) untuk setiap p di piles)\`

Fungsi ini bisa dihitung dalam satu lintasan O(n), tanpa menyortir dan tanpa simulasi
jam-per-jam.

**Langkah 3 — buktikan monotonisitasnya.** Kalau \`k\` cukup, maka \`k + 1\` juga cukup, karena
setiap suku \`ceil(p / k)\` tidak pernah bertambah ketika pembaginya membesar. Jadi predikatnya
berpola \`tidak, tidak, ..., ya, ya\` dan yang dicari adalah nilai \`k\` **terkecil** yang layak.

**Langkah 4 — cari batasnya.** Karena yang dicari kandidat layak yang pertama, pakai kerangka
lower bound:

\`\`\`
let lo = 1, hi = max(piles)
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2)
  if (jamDibutuhkan(mid) <= h) hi = mid
  else lo = mid + 1
}
return lo
\`\`\`

Perhatikan bahwa \`hi = mid\`, bukan \`mid - 1\`: tebakan \`mid\` bisa saja jawabannya, jadi tidak
boleh dibuang.

## Kompleksitas

- Waktu: O(n · log(max(piles))) — setiap tebakan butuh satu lintasan O(n), dan jumlah tebakan
  adalah logaritma dari lebar rentang jawaban.
- Ruang: O(1) tambahan.

## Kesalahan yang sering terjadi

- Menganggap jawabannya harus salah satu nilai di dalam \`piles\`. Pada contoh ketiga, jawabannya
  4 sementara isi array adalah 7, 5, dan 3. Yang ditelusuri adalah rentang nilai, bukan array.
- Menyetel \`hi = max(piles) - 1\`. Pada kasus \`h === piles.length\` jawabannya justru
  \`max(piles)\`, sehingga jawaban itu di luar rentang dan pencariannya mengembalikan nilai yang
  salah tanpa error apa pun.
- Menyetel \`hi = h\` atau \`hi = piles.length\`. Keduanya tidak berhubungan dengan skala
  jawaban; rentang harus berasal dari ukuran tumpukan terbesar.
- Memakai pembagian biasa lalu membulatkan ke bawah: \`Math.floor(p / k)\` akan menghitung jam
  lebih sedikit dari yang sebenarnya. Yang benar adalah pembulatan ke atas,
  \`Math.ceil(p / k)\`.
- Menulis \`lo = mid\` alih-alih \`lo = mid + 1\` pada cabang yang tidak layak. Rentang dua
  elemen tidak akan pernah menyusut, dan program berhenti karena batas waktu.
- Menghitung kelayakan dengan mensimulasikan jam demi jam. Cara itu benar tetapi O(h) per
  tebakan, sehingga totalnya bisa jauh melewati batas waktu.`,
    en: `## Approach

This is a **binary search on the answer**. What gets searched is not the \`piles\` array but the
range of possible values for \`k\`.

**Step 1 — pick the range.** A speed of \`k = 0\` makes no sense, so \`lo = 1\`. The largest value
worth considering is \`max(piles)\`: at that speed every pile is finished within one hour, so
the total is \`piles.length\` hours, and the guarantee \`h >= piles.length\` makes that enough.
The range is \`[1, max(piles)]\`.

**Step 2 — write the feasibility function.** At speed \`k\`, pile \`p\` needs \`ceil(p / k)\` hours.
So:

\`hoursNeeded(k) = sum(ceil(p / k) for every p in piles)\`

That function is one O(n) pass — no sorting, no hour-by-hour simulation.

**Step 3 — prove monotonicity.** If \`k\` is fast enough, so is \`k + 1\`, because every term
\`ceil(p / k)\` never grows when the divisor grows. The predicate therefore looks like
\`no, no, ..., yes, yes\` and we want the **smallest** feasible \`k\`.

**Step 4 — search for the boundary.** Since we want the first feasible candidate, use the lower
bound framework:

\`\`\`
let lo = 1, hi = max(piles)
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2)
  if (hoursNeeded(mid) <= h) hi = mid
  else lo = mid + 1
}
return lo
\`\`\`

Note that it is \`hi = mid\`, not \`mid - 1\`: the guess \`mid\` may itself be the answer, so it must
not be discarded.

## Complexity

- Time: O(n · log(max(piles))) — every guess costs one O(n) pass, and the number of guesses is
  the logarithm of the answer range width.
- Space: O(1) extra.

## Common mistakes

- Assuming the answer must be one of the values inside \`piles\`. In the third example the answer
  is 4 while the array holds 7, 5, and 3. What we walk over is a value range, not the array.
- Setting \`hi = max(piles) - 1\`. On the case \`h === piles.length\` the answer is exactly
  \`max(piles)\`, so the true answer falls outside the range and the search returns a wrong
  number with no error at all.
- Setting \`hi = h\` or \`hi = piles.length\`. Neither is related to the scale of the answer; the
  range must come from the largest pile.
- Using plain division rounded down: \`Math.floor(p / k)\` counts fewer hours than reality. The
  correct operation is rounding up, \`Math.ceil(p / k)\`.
- Writing \`lo = mid\` instead of \`lo = mid + 1\` on the infeasible branch. A two-element range
  then never shrinks and the program dies on the time limit.
- Computing feasibility by simulating hour after hour. It is correct but O(h) per guess, which
  can blow far past the time limit.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function minEatingSpeed(piles, h) {
  // write your solution here
}
`,
      solution: `function minEatingSpeed(piles, h) {
  const hoursNeeded = speed => piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);

  let hi = 0;
  for (const pile of piles) {
    hi = Math.max(hi, pile);
  }

  let lo = 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (hoursNeeded(mid) <= h) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
}
`,
    },
    {
      language: 'python',
      template: `def minEatingSpeed(piles, h):
    # write your solution here
    pass
`,
      solution: `def minEatingSpeed(piles, h):
    def hours_needed(speed):
        return sum((pile + speed - 1) // speed for pile in piles)

    lo, hi = 1, max(piles)

    while lo < hi:
        mid = (lo + hi) // 2

        if hours_needed(mid) <= h:
            hi = mid
        else:
            lo = mid + 1

    return lo
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[3, 6, 7, 11], 8], expected: 4 },
    { id: 'c2', input: [[30, 11, 23, 4, 20], 5], expected: 30 },
    { id: 'c3', input: [[30, 11, 23, 4, 20], 6], expected: 23, hidden: true },
    { id: 'c4', input: [[1], 1], expected: 1, hidden: true },
    { id: 'c5', input: [[1000000000], 2], expected: 500000000, hidden: true },
    { id: 'c6', input: [[7, 5, 3], 5], expected: 4, hidden: true },
    { id: 'c7', input: [[5, 5, 5, 5], 4], expected: 5, hidden: true },
    { id: 'c8', input: [[312884470], 968709470], expected: 1, hidden: true },
  ],
};
