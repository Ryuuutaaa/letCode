import type { Track } from '~/types/content';

export const binarySearch: Track = {
  id: 'binary-search',
  order: 5,
  title: {
    id: 'Binary Search',
    en: 'Binary Search',
  },
  summary: {
    id: 'Memotong ruang pencarian menjadi dua setiap langkah, lalu memakai pola yang sama untuk menebak nilai jawaban — bukan hanya mencari elemen.',
    en: 'Halve the search space at every step, then reuse the same pattern to guess an answer value instead of only looking up an element.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa topik ini penting',
        en: 'Why this topic matters',
      },
      body: {
        id: `Binary search sering diringkas menjadi "mencari nilai di array terurut". Ringkasan itu
terlalu sempit, dan justru itulah yang membuat banyak orang melewatkan kekuatan aslinya.

Yang sebenarnya dilakukan binary search adalah **memotong ruang pencarian menjadi dua**
setiap kali kita mengajukan satu pertanyaan ya/tidak. Selama pertanyaan itu **monoton** —
sekali berubah dari "tidak" menjadi "ya", ia tidak pernah kembali lagi — titik perubahannya
bisa ditemukan dalam O(log n) langkah. Array terurut hanya salah satu cara mendapatkan
sifat monoton itu.

Karena itu binary search muncul di soal yang tidak memuat kata "cari" sama sekali:
kecepatan makan minimum, kapasitas kapal minimum, jumlah hari minimum, ukuran maksimum
yang sekecil mungkin. Yang dicari bukan elemen, melainkan sebuah **nilai ambang** di dalam
rentang jawaban.

Di interview topik ini disukai karena murah diuji tetapi kejam pada detail. Semua kandidat
bisa menjelaskan idenya; yang membedakan adalah apakah implementasinya tetap benar untuk
array kosong, satu elemen, target di ujung, dan target yang tidak ada. Kesalahan pada binary
search hampir selalu berupa **off-by-one**, bukan kesalahan logika besar.

Ukuran manfaatnya mudah dihitung: satu miliar data hanya butuh sekitar 30 langkah, karena
2^30 > 10^9. Tidak banyak struktur data yang bisa menandingi itu sambil tetap memakai
memori O(1).`,
        en: `Binary search is usually summarized as "look up a value in a sorted array". That summary
is too narrow, and it is exactly what makes people miss the real power of the technique.

What binary search actually does is **cut the search space in half** every time it asks one
yes/no question. As long as that question is **monotone** — once it flips from "no" to
"yes" it never flips back — the flip point can be found in O(log n) steps. A sorted array
is only one way to earn that monotone behaviour.

That is why binary search shows up in problems that never say "search": minimum eating
speed, minimum ship capacity, minimum number of days, the smallest possible maximum. What
is being searched for is not an element but a **threshold value** inside a range of
answers.

Interviews love this topic because it is cheap to test and brutal on detail. Every candidate
can explain the idea; what separates them is whether the implementation still holds for an
empty array, a single element, a target at either end, and a target that is not there.
Mistakes in binary search are almost always **off-by-one**, not broken logic.

The payoff is easy to measure: a billion items take about 30 steps, because 2^30 > 10^9.
Not many data structures can match that while keeping memory at O(1).`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Ruang pencarian dan syarat monotonisitas',
        en: 'The search space and the monotonicity requirement',
      },
      body: {
        id: `## Tiga hal yang selalu ada

1. **Ruang pencarian** — rentang kandidat jawaban, biasanya disimpan sebagai \`lo\` dan \`hi\`.
2. **Predikat** — satu pertanyaan ya/tidak yang bisa dievaluasi pada satu kandidat.
3. **Invariant** — kalimat yang benar sebelum dan sesudah setiap iterasi, misalnya
   "jawaban selalu berada di dalam \`[lo, hi]\`".

Setiap iterasi memeriksa titik tengah \`mid\`, mengevaluasi predikat, lalu **membuang separuh
ruang** yang sudah pasti tidak memuat jawaban. Ukuran ruang menyusut
\`n -> n/2 -> n/4 -> ... -> 1\`, jadi jumlah langkahnya log2(n).

## Syarat monotonisitas

Pemotongan hanya boleh dilakukan kalau kita punya **jaminan** tentang bagian yang dibuang.
Jaminan itu selalu berbentuk sama: predikat harus berpola

\`tidak, tidak, ..., tidak, ya, ya, ..., ya\`

dan setelah berubah menjadi "ya" ia tidak boleh kembali "tidak".

- Pada array terurut menaik, predikat \`nums[i] >= target\` monoton. Keterurutan array yang
  memberikannya, bukan binary search itu sendiri.
- Pada **binary search di jawaban**, predikatnya bukan tentang array, melainkan tentang
  kandidat jawaban \`x\`: "apakah pekerjaan selesai kalau kapasitasnya \`x\`?". Kalau kapasitas
  yang lebih besar tidak pernah memperburuk keadaan, predikat itu monoton.

Kalau syarat ini tidak dipenuhi, binary search **tidak melempar error** — ia hanya
mengembalikan jawaban yang salah secara diam-diam. Karena itu kebiasaan yang baik adalah
menuliskan kalimat pembuktian monotonisitasnya dulu, sebelum menulis satu baris kode pun.

## Dua gaya batas: inklusif dan setengah terbuka

**Kedua ujung inklusif, \`[lo, hi]\`:**

- mulai dengan \`lo = 0\`, \`hi = n - 1\`
- loop dengan \`while (lo <= hi)\`
- saat membuang, pakai \`hi = mid - 1\` atau \`lo = mid + 1\`
- \`mid\` selalu diperiksa di dalam loop, jadi loop boleh berhenti kapan saja

**Setengah terbuka, \`[lo, hi)\`:**

- mulai dengan \`lo = 0\`, \`hi = n\` — \`hi\` boleh bernilai sama dengan panjang array
- loop dengan \`while (lo < hi)\`
- hanya \`hi = mid\` atau \`lo = mid + 1\`; \`hi\` tidak pernah ditulis \`mid - 1\`
- saat loop selesai, \`lo === hi\` adalah **jumlah elemen yang lebih kecil dari target**

Gaya kedua lebih nyaman untuk pencarian batas, karena bisa mengembalikan \`n\` (posisi sisip
paling belakang) tanpa kasus khusus. Yang paling berbahaya adalah mencampur keduanya:
\`while (lo <= hi)\` dengan \`hi = mid\` mudah berujung loop yang tidak pernah berhenti.

## Menghitung mid

Selalu tulis \`mid = lo + Math.floor((hi - lo) / 2)\`.

- \`(lo + hi) / 2\` bisa melewati batas bilangan bulat 32-bit di Java, C++, atau Go. Di
  JavaScript angka adalah floating point, jadi tidak meluap — tetapi kebiasaan ini yang
  dinilai pewawancara, dan kode kamu harus tetap benar kalau dipindahkan ke bahasa lain.
- \`Math.floor\` wajib. Tanpa itu \`mid\` bisa bernilai seperti \`2.5\`, dan \`nums[2.5]\` adalah
  \`undefined\`; semua perbandingan menjadi \`false\` tanpa satu pun pesan error.
- Untuk mencari **kemunculan terakhir** yang memenuhi predikat, pembulatannya dibalik:
  \`mid = lo + Math.floor((hi - lo + 1) / 2)\`.

## Kompleksitas

- Pencarian murni: O(log n) waktu, O(1) ruang tambahan.
- Binary search di jawaban: O(n log R), dengan n = biaya satu evaluasi kelayakan dan
  R = lebar rentang jawaban.`,
        en: `## Three ingredients

1. **A search space** — the range of candidate answers, usually stored as \`lo\` and \`hi\`.
2. **A predicate** — a single yes/no question you can evaluate on one candidate.
3. **An invariant** — a sentence that stays true before and after every iteration, such as
   "the answer is always inside \`[lo, hi]\`".

Each iteration looks at the midpoint \`mid\`, evaluates the predicate, and then **discards
half of the space** that provably cannot contain the answer. The space shrinks
\`n -> n/2 -> n/4 -> ... -> 1\`, so the number of steps is log2(n).

## The monotonicity requirement

Discarding a half is only legal when you have a **guarantee** about the part you throw away.
That guarantee always takes the same shape: the predicate must look like

\`no, no, ..., no, yes, yes, ..., yes\`

and once it flips to "yes" it must never flip back.

- On an ascending array the predicate \`nums[i] >= target\` is monotone. The ordering of the
  array provides that, not binary search itself.
- In a **binary search on the answer**, the predicate is not about an array but about a
  candidate answer \`x\`: "does the job finish if the capacity is \`x\`?". If a larger capacity
  never makes things worse, the predicate is monotone.

When this condition breaks, binary search **does not throw** — it quietly returns a wrong
answer. That is why the healthy habit is to write the one-sentence monotonicity argument
before writing a single line of code.

## Two bound styles: inclusive and half-open

**Both ends inclusive, \`[lo, hi]\`:**

- start with \`lo = 0\`, \`hi = n - 1\`
- loop with \`while (lo <= hi)\`
- when discarding, use \`hi = mid - 1\` or \`lo = mid + 1\`
- \`mid\` is always examined inside the loop, so the loop may stop at any time

**Half-open, \`[lo, hi)\`:**

- start with \`lo = 0\`, \`hi = n\` — \`hi\` is allowed to equal the array length
- loop with \`while (lo < hi)\`
- only \`hi = mid\` or \`lo = mid + 1\`; \`hi\` is never written as \`mid - 1\`
- when the loop ends, \`lo === hi\` is the **number of elements smaller than the target**

The second style is friendlier for bound searches because it can return \`n\` (the insertion
point at the very end) with no special case. The most dangerous move is mixing the two:
\`while (lo <= hi)\` together with \`hi = mid\` easily turns into a loop that never ends.

## Computing mid

Always write \`mid = lo + Math.floor((hi - lo) / 2)\`.

- \`(lo + hi) / 2\` can overflow a 32-bit integer in Java, C++, or Go. JavaScript numbers are
  floating point, so nothing overflows — but this is the habit interviewers score, and your
  code should stay correct if it is ported to another language.
- \`Math.floor\` is mandatory. Without it \`mid\` can be a value like \`2.5\`, and \`nums[2.5]\` is
  \`undefined\`; every comparison becomes \`false\` with no error message at all.
- To find the **last** occurrence that satisfies the predicate, round the other way:
  \`mid = lo + Math.floor((hi - lo + 1) / 2)\`.

## Complexity

- Pure lookup: O(log n) time, O(1) extra space.
- Binary search on the answer: O(n log R), where n is the cost of one feasibility check and
  R is the width of the answer range.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Tiga pola utama',
        en: 'The three main patterns',
      },
      body: {
        id: `## Pola 1: pencarian eksak

Bentuk paling dasar, dipakai untuk menjawab "di indeks berapa nilai ini berada, atau tidak
ada sama sekali". Ruangnya inklusif \`[lo, hi]\` dengan \`while (lo <= hi)\`, karena \`mid\` sudah
diperiksa langsung di dalam loop.

Bentuk kodenya:

\`while (lo <= hi) { const mid = lo + ((hi - lo) >> 1); if (nums[mid] === target) return mid; if (nums[mid] < target) lo = mid + 1; else hi = mid - 1; } return -1;\`

Satu perbandingan membuang separuh kandidat karena array terurut: kalau \`nums[mid] < target\`,
seluruh indeks di kiri \`mid\` pasti juga lebih kecil dari \`target\`.

## Pola 2: pencarian batas kiri / kanan

Di sini kita tidak berhenti ketika nilainya ketemu. Kita mencari **indeks pertama** yang
memenuhi sebuah predikat:

- **Batas kiri (lower bound):** indeks pertama dengan \`nums[i] >= target\`.
- **Batas kanan (upper bound):** indeks pertama dengan \`nums[i] > target\`.

Triknya: kondisi "ketemu" tidak menghentikan loop, tetapi dipakai untuk mempersempit. Ketika
\`nums[mid] >= target\`, kita belum tahu apakah \`mid\` yang paling kiri, jadi kita simpan
\`hi = mid\` dan terus maju sampai \`lo === hi\`. Hasil akhirnya adalah \`lo\`.

Kerangka ini jauh lebih umum daripada pola 1, karena banyak soal sebenarnya berbunyi
"temukan titik ketika keadaan berubah":

- posisi sisip pada array terurut (indeks pertama dengan \`nums[i] >= target\`),
- versi pertama yang rusak (\`isBadVersion(i)\` mulai bernilai \`true\`),
- indeks pertama elemen yang melewati batas tertentu.

Di Python, \`bisect_left\` dan \`bisect_right\` menyediakan ini. Di JavaScript tidak ada
bawaannya, tetapi lower bound dan upper bound bersama-sama memberi rentang kemunculan
semua duplikat: \`[lowerBound, upperBound)\`.

## Pola 3: binary search pada jawaban

Inilah pola yang paling sering mengejutkan pemula, dan justru yang paling sering muncul
sebagai soal medium sampai hard.

**Idenya:** kalau soal meminta "nilai minimum (atau maksimum) yang memenuhi syarat", dan
syarat itu monoton terhadap nilai tersebut, maka nilai itu bisa dicari dengan binary search —
walaupun tidak ada array terurut di dalam soal sama sekali.

**Resep empat langkah:**

1. **Tentukan rentang jawaban** \`[lo, hi]\` dari batas yang pasti benar. \`lo\` adalah nilai
   terkecil yang mungkin (sering 1), \`hi\` adalah nilai terbesar yang mungkin (sering nilai
   maksimum di input). Pastikan dulu jawabannya dijamin berada di dalam rentang itu.
2. **Tulis fungsi kelayakan** \`bisa(x)\` yang menjawab "kalau kandidatnya \`x\`, apakah
   syaratnya terpenuhi?". Ini biasanya hanya satu lintasan O(n).
3. **Buktikan monotonisitasnya.** Misalnya: kalau semua pisang habis dengan kecepatan \`k\`,
   maka kecepatan \`k + 1\` juga pasti sanggup. Jadi \`bisa(x)\` berpola
   \`salah, salah, ..., benar, benar\`, dan yang dicari adalah \`x\` **terkecil** yang layak.
4. **Cari batasnya, bukan nilainya.** Karena yang dicari kandidat pertama yang layak, ini
   persis masalah lower bound — hanya saja array-nya virtual. Pakai \`while (lo < hi)\` dengan
   \`hi = mid\` ketika layak dan \`lo = mid + 1\` ketika tidak.

Bentuk kodenya:

\`let lo = 1, hi = maxNilai; while (lo < hi) { const mid = lo + ((hi - lo) >> 1); if (bisa(mid)) hi = mid; else lo = mid + 1; } return lo;\`

**Contoh konkret (Koko makan pisang).** Ada tumpukan \`piles\` dan batas jam \`h\`. Untuk
kandidat kecepatan \`k\`, jumlah jam yang dibutuhkan adalah \`sum(ceil(pile / k))\`. Nilai ini
menurun ketika \`k\` naik, sehingga syarat \`sum(ceil(pile / k)) <= h\` monoton: begitu benar,
selamanya benar untuk nilai yang lebih besar. Rentang jawabannya \`[1, max(piles)]\`, dan
total kompleksitasnya O(n log(max(piles))).

Perhatikan hal yang paling sering membuat pemula bingung: **jawabannya tidak harus ada di
dalam array**. Pada Koko, jawaban bisa berupa kecepatan yang tidak sama dengan ukuran
tumpukan mana pun, karena yang kita telusuri adalah nilai, bukan elemen.

Soal lain yang memakai pola yang sama: kapasitas minimum kapal dalam \`d\` hari, jumlah hari
minimum untuk membuat \`m\` buket, nilai maksimum yang sekecil mungkin pada "split array
largest sum", dan pencarian median dua array terurut.

**Cara mengenalinya:** soal berbunyi "cari **nilai terkecil** sedemikian sehingga sesuatu
**masih mungkin**", dan menaikkan nilai itu selalu membuat syaratnya lebih mudah dipenuhi.
Kalau dua ciri itu ada, curigai binary search pada jawaban.

## Ruang pencarian yang bukan array satu dimensi

Ruang pencarian tidak harus berupa array biasa. Syaratnya hanya dua: kandidatnya bisa
diurutkan secara konsisten, dan predikatnya monoton.

- **Matriks terurut** yang baris-barisnya saling berurutan (elemen pertama tiap baris lebih
  besar dari elemen terakhir baris sebelumnya) bisa dipandang sebagai array satu dimensi
  sepanjang \`m * n\`: indeks \`i\` dipetakan ke \`matrix[floor(i / n)][i % n]\`. Binary
  search-nya O(log(m·n)), lebih baik daripada penelusuran tangga O(m + n).
- **Array terurut yang dirotasi** kehilangan keterurutan global, tetapi tetap punya satu titik
  perubahan yang monoton. Daripada mencari "nilai minimum", kita mencari **indeks pertama**
  tempat keadaan berbalik — dan itu kembali ke pola batas.`,
        en: `## Pattern 1: exact lookup

The most basic shape, used to answer "at which index does this value live, or is it absent
entirely". The space is inclusive, \`[lo, hi]\` with \`while (lo <= hi)\`, because \`mid\` is
examined directly inside the loop.

The code shape:

\`while (lo <= hi) { const mid = lo + ((hi - lo) >> 1); if (nums[mid] === target) return mid; if (nums[mid] < target) lo = mid + 1; else hi = mid - 1; } return -1;\`

One comparison discards half the candidates because the array is sorted: if
\`nums[mid] < target\`, every index left of \`mid\` also holds a value smaller than \`target\`.

## Pattern 2: lower and upper bound

Here we do not stop when the value is found. We look for the **first index** that satisfies
a predicate:

- **Lower bound:** the first index with \`nums[i] >= target\`.
- **Upper bound:** the first index with \`nums[i] > target\`.

The trick: a hit does not end the loop, it only narrows it. When \`nums[mid] >= target\` we
still do not know whether \`mid\` is the leftmost such index, so we keep \`hi = mid\` and keep
going until \`lo === hi\`. The answer is \`lo\`.

This framework is far more general than pattern 1, because many problems actually say
"find the point where the state changes":

- the insertion position in a sorted array (first index with \`nums[i] >= target\`),
- the first broken version (\`isBadVersion(i)\` starts returning \`true\`),
- the first element that exceeds some threshold.

Python ships \`bisect_left\` and \`bisect_right\` for this. JavaScript has nothing built in,
but lower bound and upper bound together give the range of every duplicate:
\`[lowerBound, upperBound)\`.

## Pattern 3: binary search on the answer

This is the pattern that surprises beginners the most, and the one that shows up most often
as a medium or hard interview question.

**The idea:** when a problem asks for the "minimum (or maximum) value that satisfies a
condition", and that condition is monotone in the value, the value can be found with binary
search — even if the problem contains no sorted array at all.

**The four-step recipe:**

1. **Pick the answer range** \`[lo, hi]\` from bounds you are sure about. \`lo\` is the smallest
   possible value (often 1), \`hi\` is the largest possible one (often the maximum in the
   input). First make sure the true answer is guaranteed to sit inside that range.
2. **Write the feasibility function** \`canDo(x)\` answering "if the candidate is \`x\`, is the
   condition met?". This is usually a single O(n) pass.
3. **Prove monotonicity.** For example: if all bananas can be finished at speed \`k\`, then
   speed \`k + 1\` certainly can too. So \`canDo(x)\` looks like
   \`false, false, ..., true, true\`, and we want the **smallest** \`x\` that is feasible.
4. **Search for the boundary, not for a value.** Since we want the first feasible candidate,
   this is exactly a lower-bound search — only the array is virtual. Use \`while (lo < hi)\`
   with \`hi = mid\` when feasible and \`lo = mid + 1\` when not.

The code shape:

\`let lo = 1, hi = maxValue; while (lo < hi) { const mid = lo + ((hi - lo) >> 1); if (canDo(mid)) hi = mid; else lo = mid + 1; } return lo;\`

**A concrete example (Koko eating bananas).** Given \`piles\` and an hour budget \`h\`, the hours
needed for a candidate speed \`k\` are \`sum(ceil(pile / k))\`. That quantity decreases as \`k\`
grows, so the condition \`sum(ceil(pile / k)) <= h\` is monotone: once it holds, it holds for
every larger speed. The answer range is \`[1, max(piles)]\` and the total complexity is
O(n log(max(piles))).

Notice the part that confuses beginners most: **the answer does not need to appear in the
array**. For Koko the answer can be a speed that equals no pile size at all, because what we
are walking over is the value range, not the elements.

Other problems built on the same pattern: the minimum ship capacity within \`d\` days, the
minimum number of days to make \`m\` bouquets, the smallest possible maximum in "split array
largest sum", and finding the median of two sorted arrays.

**How to recognise it:** the problem asks for the **smallest value** such that something is
**still possible**, and raising that value always makes the condition easier to satisfy.
When both signals are present, suspect a binary search on the answer.

## Search spaces that are not a plain 1D array

The search space does not have to be an ordinary array. Only two things are required: the
candidates can be ordered consistently, and the predicate is monotone.

- **A sorted matrix** whose rows chain together (the first element of each row is greater
  than the last element of the previous row) can be viewed as a one-dimensional array of
  length \`m * n\`: index \`i\` maps to \`matrix[floor(i / n)][i % n]\`. The binary search runs in
  O(log(m·n)), better than the staircase walk at O(m + n).
- **A rotated sorted array** loses global ordering but still has exactly one monotone
  turning point. Instead of looking for "the minimum value", look for the **first index**
  where the state flips — which brings us back to the bound pattern.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**Mid yang tidak menyusutkan rentang.** Ini penyebab nomor satu loop tak berhenti. Pada
\`while (lo < hi)\` dengan \`hi = mid\`, kalau cabang satunya menulis \`lo = mid\`, maka untuk
rentang dua elemen (\`hi === lo + 1\`) nilai \`mid\` selalu sama dengan \`lo\` dan rentangnya tidak
pernah berubah. Aturannya: kalau satu cabang memakai \`mid\` polos, cabang lainnya wajib
memakai \`mid ± 1\`.

**Salah arah pembulatan saat mencari kemunculan terakhir.** Untuk mencari kandidat
**terakhir** yang memenuhi predikat, \`mid\` harus dibulatkan ke atas:
\`lo + Math.floor((hi - lo + 1) / 2)\`. Memakai pembulatan ke bawah bersama \`lo = mid\`
mengulang masalah loop tadi.

**Mencampur batas inklusif dan eksklusif.** \`while (lo <= hi)\` berpasangan dengan
\`hi = mid - 1\`; \`while (lo < hi)\` berpasangan dengan \`hi = mid\`. Mencampurnya — misalnya
\`lo <= hi\` tetapi \`hi = mid\` — membuat loop berputar selamanya pada saat \`mid\` sama dengan
\`hi\`. Tulis pilihanmu sekali, lalu patuhi sampai selesai.

**Overflow saat menghitung mid.** \`(lo + hi) / 2\` meluap di bahasa dengan bilangan bulat
32-bit seperti Java dan C++ ketika \`lo\` dan \`hi\` besar. Pakai \`lo + (hi - lo) / 2\`. Di
JavaScript hal ini tidak meledak, tetapi pewawancara tetap menilai kebiasaannya.

**Lupa \`Math.floor\`.** Di JavaScript, \`(0 + 3) / 2\` adalah \`1.5\`. Mengakses \`nums[1.5]\`
menghasilkan \`undefined\`, seluruh perbandingan menjadi \`false\`, dan loop berjalan ke arah
yang salah tanpa satu pun pesan error.

**Tidak menguji n = 0, n = 1, dan jawaban di ujung rentang.** Di kasus-kasus itulah perbedaan
\`hi = length - 1\` dan \`hi = length\` terlihat. Selalu uji: array kosong, satu elemen, target
di indeks 0, target di indeks terakhir, target lebih kecil dari semua elemen, target lebih
besar dari semua elemen, dan nilai negatif.

**Mengira jawaban harus ada di dalam array.** Pada binary search di jawaban, kandidat \`x\`
tidak diambil dari array — array hanya dipakai untuk menghitung kelayakan. Kesalahan
umumnya adalah menyetel \`hi = piles.length\` atau memakai elemen array sebagai \`lo\`, padahal
rentang jawabannya adalah \`[1, max(piles)]\`. Jawaban Koko bisa berupa kecepatan yang tidak
sama dengan ukuran tumpukan mana pun.

**Rentang jawaban yang terlalu sempit atau terlalu lebar.** \`hi\` yang lebih kecil dari
jawaban sebenarnya membuat pencarian mengembalikan nilai yang salah, bukan error. Contohnya
\`hi = max(piles) - 1\` akan gagal pada kasus \`h === piles.length\`, di mana jawabannya persis
\`max(piles)\`.

**Predikat yang tidak benar-benar monoton.** Binary search pada predikat tidak monoton tidak
melempar exception — ia hanya mengembalikan jawaban yang salah. Contohnya mencari \`target\`
di array yang belum terurut. Sebelum memakai pola ini, tulis satu kalimat: "jika \`x\` layak,
maka semua nilai di atas \`x\` juga layak" — lalu periksa apakah kalimat itu benar.

**Fungsi kelayakan yang terlalu mahal.** Kalau \`bisa(x)\` memakan O(n log n), totalnya menjadi
O(n log n log R) dan bisa melewati batas waktu. Kelayakan harus satu lintasan O(n), dan
jangan menyortir ulang di dalamnya padahal urutannya tidak berubah antar kandidat.`,
        en: `**A mid that does not shrink the range.** This is cause number one of an endless loop. In
\`while (lo < hi)\` with \`hi = mid\`, if the other branch writes \`lo = mid\`, then for a
two-element range (\`hi === lo + 1\`) the value of \`mid\` is always \`lo\` and the range never
moves. The rule: if one branch uses a bare \`mid\`, the other must use \`mid ± 1\`.

**Rounding the wrong way when looking for the last hit.** To find the **last** candidate
that satisfies a predicate, \`mid\` must round up:
\`lo + Math.floor((hi - lo + 1) / 2)\`. Rounding down together with \`lo = mid\` reproduces the
endless loop above.

**Mixing inclusive and exclusive bounds.** \`while (lo <= hi)\` pairs with \`hi = mid - 1\`;
\`while (lo < hi)\` pairs with \`hi = mid\`. Mixing them — say \`lo <= hi\` with \`hi = mid\` —
spins forever whenever \`mid\` equals \`hi\`. Decide once, then stay consistent.

**Overflow while computing mid.** \`(lo + hi) / 2\` overflows in languages with 32-bit
integers such as Java and C++ once \`lo\` and \`hi\` get large. Use \`lo + (hi - lo) / 2\`. It
cannot blow up in JavaScript, but interviewers still score the habit.

**Forgetting \`Math.floor\`.** In JavaScript \`(0 + 3) / 2\` is \`1.5\`. Reading \`nums[1.5]\` yields
\`undefined\`, every comparison turns \`false\`, and the loop walks off in the wrong direction
with no error message at all.

**Never testing n = 0, n = 1, and answers at the edges of the range.** Those are exactly the
cases where \`hi = length - 1\` and \`hi = length\` stop being interchangeable. Always test: an
empty array, a single element, the target at index 0, the target at the last index, a target
smaller than everything, a target larger than everything, and negative values.

**Assuming the answer lives inside the array.** In a binary search on the answer, the
candidate \`x\` is not read from the array — the array is only used to evaluate feasibility.
The usual slip is setting \`hi = piles.length\` or seeding \`lo\` from an element, while the real
answer range is \`[1, max(piles)]\`. Koko's answer can be a speed that matches no pile size.

**An answer range that is too narrow or too wide.** An \`hi\` below the true answer makes the
search return a wrong number rather than an error. For instance \`hi = max(piles) - 1\` fails
on the case \`h === piles.length\`, where the answer is exactly \`max(piles)\`.

**A predicate that is not actually monotone.** Binary search over a non-monotone predicate
does not throw — it just returns a wrong answer. Searching for \`target\` in an unsorted array
is the classic example. Before using the pattern, write one sentence — "if \`x\` is feasible,
then every value above \`x\` is feasible too" — and check whether it is true.

**A feasibility function that costs too much.** If \`canDo(x)\` takes O(n log n), the total
becomes O(n log n log R) and may blow the time limit. Feasibility should be a single O(n)
pass, and you should not re-sort inside it when the order never changes between candidates.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Binary search adalah cara **membuang separuh ruang pencarian** memakai satu predikat
  monoton, bukan sekadar mencari nilai di array terurut.
- Tulis invariantnya lebih dulu: "jawaban selalu berada di dalam \`[lo, hi]\`".
- Pilih satu gaya batas dan taati: \`[lo, hi]\` dengan \`lo <= hi\`, atau \`[lo, hi)\` dengan
  \`lo < hi\`.
- Setiap cabang harus mempersempit rentang. Kalau satu cabang memakai \`mid\` polos, cabang
  lainnya wajib \`mid ± 1\`.
- Selalu \`mid = lo + Math.floor((hi - lo) / 2)\`. Pembulatan ke atas hanya untuk mencari
  kemunculan terakhir.
- Kompleksitas pencarian murni O(log n) waktu dan O(1) ruang; binary search di jawaban
  O(n log R) dengan R = lebar rentang jawaban dan n = biaya satu evaluasi kelayakan.
- Pola "cari nilai terkecil yang masih memungkinkan" adalah sinyal paling kuat untuk binary
  search di jawaban — dan di situ jawabannya tidak harus berasal dari array.
- Uji selalu: kosong, satu elemen, jawaban di ujung bawah, jawaban di ujung atas, dan
  jawaban yang tidak ada.

## Latihan yang disarankan

Track ini disusun mengikuti perkembangan polanya. Soal pertama melatih bentuk paling dasar
sekaligus kebiasaan memilih gaya batas secara sadar. Soal kedua memakai pola lower bound di
mana jawaban yang sah bisa berada tepat di luar indeks terakhir. Soal ketiga menunjukkan
bahwa ruang pencarian boleh berbentuk dua dimensi selama pemetaan indeksnya konsisten. Soal
keempat melatih binary search di ruang yang sudah berubah bentuk, dan mengajarkan bahwa yang
dicari seringkali sebuah **batas**, bukan sebuah nilai. Soal terakhir memakai pola binary
search di jawaban secara utuh: kita tidak mencari angka di dalam array, melainkan menebak
nilai minimum yang membuat simulasi tetap layak, lalu menguji setiap tebakan dalam O(n).`,
        en: `- Binary search is a way to **discard half of the search space** using one monotone
  predicate, not merely a way to look up a value in a sorted array.
- Write the invariant first: "the answer is always inside \`[lo, hi]\`".
- Pick one bound style and commit to it: \`[lo, hi]\` with \`lo <= hi\`, or \`[lo, hi)\` with
  \`lo < hi\`.
- Every branch must shrink the range. If one branch uses a bare \`mid\`, the other must use
  \`mid ± 1\`.
- Always \`mid = lo + Math.floor((hi - lo) / 2)\`. Round up only when searching for the last
  occurrence.
- Complexity: O(log n) time and O(1) space for a pure lookup; O(n log R) for a binary search
  on the answer, where R is the width of the answer range and n is the cost of one
  feasibility check.
- "Find the smallest value that is still possible" is the strongest signal for a binary
  search on the answer — and there the answer need not come from the array.
- Always test: empty, one element, the answer at the lower edge, the answer at the upper
  edge, and an answer that does not exist.

## Suggested practice

The problems are ordered to follow the pattern as it grows. The first drills the most basic
shape and the habit of choosing a bound style on purpose. The second uses the lower bound
pattern, where a valid answer can sit just past the final index. The third shows that the
search space may be two-dimensional as long as the index mapping stays consistent. The
fourth trains binary search over a reshaped space and teaches that what we are looking for is
often a **boundary** rather than a value. The last one uses the binary-search-on-the-answer
pattern end to end: instead of finding a number inside an array, we guess the minimum value
that keeps a simulation feasible, then test every guess in O(n).`,
      },
    },
  ],
  problemSlugs: [
    'binary-search',
    'search-insert-position',
    'search-a-2d-matrix',
    'find-minimum-in-rotated-sorted-array',
    'koko-eating-bananas',
  ],
};
