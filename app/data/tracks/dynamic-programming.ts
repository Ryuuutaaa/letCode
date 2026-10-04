import type { Track } from '~/types/content';

export const dynamicProgramming: Track = {
  id: 'dynamic-programming',
  order: 10,
  title: {
    id: 'Dynamic Programming',
    en: 'Dynamic Programming',
  },
  summary: {
    id: 'Menyimpan jawaban submasalah yang berulang supaya pohon rekursi yang eksponensial menjadi linear.',
    en: 'Store the answers to repeating subproblems so an exponential recursion tree collapses into a linear one.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa DP terasa sulit',
        en: 'Why DP feels hard',
      },
      body: {
        id: `Dynamic programming adalah tempat sebagian besar orang berhenti di tengah jalan belajar
algoritma. Bukan karena materinya butuh struktur data baru, tapi karena DP menuntut satu
keterampilan yang tidak dilatih oleh topik sebelumnya: **merumuskan** masalah, bukan
menghafal teknik.

Di track sebelumnya jawabannya hampir selalu "pakai hash map", "pakai dua pointer", atau
"pakai stack". Begitu kamu tahu tekniknya, sisa pekerjaannya mekanis. Di DP, tekniknya hanya
dua baris — simpan jawaban submasalah yang sama — dan hampir semua kerja kerasnya ada di
langkah sebelum itu: menentukan "situasi" yang akan kamu simpan.

## Kenapa terasa sulit

Tiga sebab yang paling sering.

1. **Submasalahnya tidak terlihat di permukaan soal.** Pada soal array, kamu melihat array.
   Pada soal DP, kamu harus mengarang sendiri objek yang tidak tertulis di soal — state —
   lalu menebak apakah ia cukup menggambarkan sisa masalah.
2. **Kamu harus memercayai rekursi.** Menulis \`cara(n) = cara(n-1) + cara(n-2)\` terasa
   seperti melompat: bagaimana mungkin fungsi yang belum selesai dipakai sebagai bahan?
   Kuncinya, kamu tidak perlu tahu *bagaimana* submasalah itu nanti diselesaikan. Cukup
   percaya bahwa untuk ukuran yang lebih kecil, fungsi itu mengembalikan jawaban yang benar.
3. **Penjelasan di internet melompat langsung ke tabel.** Kebanyakan solusi memperlihatkan
   \`dp[i][j]\` lengkap dengan loopnya, tanpa menunjukkan bagaimana bentuk tabel itu
   ditemukan. Tabel adalah hasil akhir; yang dinilai interviewer adalah proses menemukannya.

## Cara berpikirnya

Resepnya selalu sama, dan urutannya tidak boleh dibalik:

1. **Tulis versi rekursif naif lebih dulu.** Satu fungsi yang menerima seluruh input dan
   mengembalikan jawaban akhir. Lupakan performa untuk sementara.
2. **Tanyakan: apa keputusan terakhir yang saya ambil?** Jawaban pertanyaan ini langsung
   memberi hubungan rekurensinya. Cara lengkapnya ada di sub-bab pola.
3. **Lihat bahwa cabang-cabangnya menanyakan hal yang sama.** Kalau \`cara(3)\` dipanggil
   dari dua jalan yang berbeda, di situlah DP mulai bekerja.
4. **Simpan jawaban tiap state.** Hitung sekali, pakai berkali-kali.

Setelah empat langkah itu, biaya solusimu bisa dihitung tanpa menghitung pohon rekursinya:
waktu = (jumlah state) × (kerja per transisi), ruang = jumlah state.

## Kenapa topik ini sering ditanya

Soal DP jarang muncul sebagai soal dasar. Biasanya ia muncul sebagai **lanjutan**: kandidat
menulis solusi brute force, lalu interviewer bertanya "bisakah lebih cepat?". Di titik itu
kamu harus mengenali dua sinyal sekaligus. Pertama, jawabannya meminta **menghitung**
sesuatu ("berapa banyak cara"), **mengoptimalkan** sesuatu ("biaya minimum"), atau
**kelayakan** ("apakah mungkin"). Kedua, submasalahnya **tumpang tindih** — pertanyaan yang
sama muncul berulang dari jalan yang berbeda. Kalau dua sinyal itu ada, DP adalah kandidat
pertama.

Kalau kamu bisa menjelaskan bagaimana state dan transisi diturunkan dari soal yang belum
pernah kamu lihat, kamu sudah melewati bagian tersulit dari wawancara DP.`,
        en: `Dynamic programming is where most people stall on the road to learning algorithms. Not
because it needs a new data structure, but because it demands a skill the earlier topics never
trained: **formulating** a problem rather than recalling a technique.

In the earlier tracks the answer was almost always "use a hash map", "use two pointers", or
"use a stack". Once you know the technique, the rest is mechanical. In DP the technique is two
lines long — store the answer to a subproblem you have already seen — and almost all of the
hard work sits in the step before that: deciding which "situation" you are going to store.

## Why it feels hard

Three reasons show up again and again.

1. **The subproblem is not visible on the surface.** With an array problem you can see the
   array. In a DP problem you have to invent an object that the statement never mentions — the
   state — and then guess whether it captures the whole remaining problem.
2. **You have to trust recursion.** Writing \`ways(n) = ways(n-1) + ways(n-2)\` feels like a
   leap: how can a function that is not finished yet be used as an ingredient? The key is that
   you do not need to know *how* that subproblem gets solved. You only need to trust that for a
   smaller input, the function returns the correct answer.
3. **Online explanations jump straight to a table.** Most solutions show the finished
   \`dp[i][j]\` and its loops, without showing how that table shape was discovered. The table is
   the output; what an interviewer grades is the process of finding it.

## How to think about it

The recipe never changes, and the order matters:

1. **Write the naive recursive version first.** One function that takes the whole input and
   returns the final answer. Ignore performance for now.
2. **Ask: what was the last decision I made?** The answer to that question hands you the
   recurrence. The full recipe lives in the patterns section.
3. **Notice that the branches ask the same question.** If \`ways(3)\` gets called from two
   different routes, that is where DP starts paying off.
4. **Store the answer to every state.** Compute once, reuse many times.

After those four steps you can price your solution without ever counting the recursion tree:
time = (number of states) × (work per transition), space = number of states.

## Why interviewers love it

DP rarely shows up as a warm-up question. It usually shows up as a **follow-up**: the candidate
writes a brute-force solution, and the interviewer asks "can you do better?". At that moment you
need to spot two signals together. First, the answer asks you to **count** something ("how many
ways"), **optimize** something ("minimum cost"), or decide **feasibility** ("is it possible").
Second, the subproblems **overlap** — the same question keeps coming back from different routes.
When both signals are present, DP is the first suspect.

If you can explain how the state and the transition are derived from a problem you have never
seen before, you have cleared the hardest part of a DP interview.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'State, transisi, base case',
        en: 'State, transition, base case',
      },
      body: {
        id: `## Tiga keputusan sebelum menulis kode

Setiap solusi DP adalah tiga keputusan, dan ketiganya harus jelas sebelum kamu menyentuh
keyboard.

**1. State — apa yang disimpan.** State adalah deskripsi lengkap sebuah submasalah: cukup
spesifik sehingga jawabannya tunggal, cukup umum sehingga dipakai berkali-kali. Pada soal
tangga, state-nya berbunyi "berapa banyak cara mencapai anak tangga ke-\`k\`", dan \`k\`
adalah parameternya. Perhatikan bahwa state selalu punya **dimensi**: satu angka, dua indeks,
atau satu indeks ditambah satu sisa kapasitas.

**2. Transisi — bagaimana state dihitung dari state lain.** Inilah hubungan rekurensinya, dan
bentuknya selalu "jawaban state ini adalah gabungan jawaban state yang lebih kecil":

\`\`\`
cara(k) = cara(k - 1) + cara(k - 2)
\`\`\`

**3. Base case — di mana rekursi berhenti.** State terkecil yang jawabannya sudah diketahui
tanpa memanggil state lain. Pada soal tangga: \`cara(1) = 1\`, dan \`cara(0) = 1\` karena
"tidak melangkah sama sekali" tetap dihitung sebagai satu cara (urutan langkah kosong). Base
case adalah fondasi seluruh tabel: satu nilai yang salah akan merambat ke semua sel di atasnya
dan jawabannya salah **tanpa satu pun pesan error**.

## Dari rekursi naif ke penyimpanan

Tulis dulu versi yang jelas benar, walaupun lambat:

\`\`\`
function climbStairs(n) {
  if (n <= 1) return 1
  return climbStairs(n - 1) + climbStairs(n - 2)
}
\`\`\`

Ini benar, tetapi setiap panggilan bercabang dua: untuk \`n = 45\` jumlah pemanggilannya lebih
dari satu miliar. Penyebabnya bukan rekursinya, melainkan **pengulangan**. \`climbStairs(40)\`
dihitung berkali-kali lewat jalan yang berbeda.

Padahal jumlah submasalah yang **berbeda** hanya \`n\`. Kalau tiap submasalah dihitung sekali
saja, seluruh soal selesai dalam O(n). Itulah memoization:

\`\`\`
function climbStairs(n) {
  const memo = new Map()
  const ways = (k) => {
    if (k <= 1) return 1
    if (memo.has(k)) return memo.get(k)
    const result = ways(k - 1) + ways(k - 2)
    memo.set(k, result)
    return result
  }
  return ways(n)
}
\`\`\`

Dua hal membuat memoization benar-benar bekerja: hasilnya **disimpan sebelum dikembalikan**,
dan kunci memo memuat **semua** yang memengaruhi jawaban. Kalau state punya dua parameter,
memo-nya harus berkunci dua angka — bukan satu.

## Rekurensinya satu, implementasinya dua

Perhatikan bahwa \`cara(k) = cara(k - 1) + cara(k - 2)\` hanyalah pernyataan matematis.
Memoization (top-down) dan tabulasi (bottom-up) adalah dua cara menjalankannya. Versi
bottom-up mengisi tabel dari base case ke atas:

\`\`\`
function climbStairs(n) {
  const table = new Array(n + 1).fill(0)
  table[0] = 1
  table[1] = 1
  for (let k = 2; k <= n; k++) {
    table[k] = table[k - 1] + table[k - 2]
  }
  return table[n]
}
\`\`\`

Karena \`table[k]\` hanya membutuhkan dua nilai sebelumnya, tabelnya bisa dipangkas menjadi dua
variabel dan ruangnya menjadi O(1):

\`\`\`
function climbStairs(n) {
  let twoBack = 1
  let oneBack = 1
  for (let k = 2; k <= n; k++) {
    const next = twoBack + oneBack
    twoBack = oneBack
    oneBack = next
  }
  return oneBack
}
\`\`\`

Inilah alasan bottom-up sering terasa lebih nyaman untuk jawaban akhir: saat tabel penuh
terlihat di depan mata, pemangkasan ruang seperti ini jadi jelas. Bentuk rekurensinya tidak
berubah sedikit pun.

## Membaca kompleksitas dari state

- **Waktu** = jumlah state × kerja per transisi. Tabel tangga punya \`n\` state dengan transisi
  O(1), jadi O(n). Tabel \`dp[i][j]\` dua dimensi dengan transisi O(1) berarti O(i × j).
- **Ruang** = jumlah state, sebelum dipangkas. Tabel pada grid \`m × n\` memakai O(m × n),
  tetapi sering cukup satu baris — O(n) — karena baris yang sudah selesai tidak dibutuhkan lagi.

Menghitung dua angka ini **sebelum** menulis kode adalah cara tercepat memastikan solusimu masuk
batas waktu, dan cara tercepat menjelaskan ke interviewer kenapa solusimu cukup cepat.`,
        en: `## Three decisions before you write any code

Every DP solution is three decisions, and all three should be settled before you touch the
keyboard.

**1. State — what you store.** A state is a complete description of a subproblem: specific
enough that its answer is unique, general enough that it gets reused. For the staircase problem
the state reads "how many ways are there to reach step \`k\`", and \`k\` is its parameter. Notice
that a state always has a **dimension**: a single number, two indices, or one index plus a
remaining capacity.

**2. Transition — how a state is computed from other states.** This is the recurrence, and its
shape is always "the answer for this state is a combination of the answers of smaller states":

\`\`\`
ways(k) = ways(k - 1) + ways(k - 2)
\`\`\`

**3. Base case — where the recursion stops.** The smallest states whose answers are known
without asking any other state. For the staircase: \`ways(1) = 1\`, and \`ways(0) = 1\` because
"take no step at all" still counts as one way (the empty sequence of steps). Base cases are the
foundation of the whole table: one wrong value propagates into every cell above it and the
answer comes out wrong **with no error message at all**.

## From naive recursion to storage

Write the version that is obviously correct first, even if it is slow:

\`\`\`
function climbStairs(n) {
  if (n <= 1) return 1
  return climbStairs(n - 1) + climbStairs(n - 2)
}
\`\`\`

It is correct, but each call forks into two: for \`n = 45\` the number of calls passes one
billion. The culprit is not the recursion, it is the **repetition**. \`climbStairs(40)\` is
computed again and again through different routes.

Yet the number of **distinct** subproblems is only \`n\`. If each subproblem were computed once,
the whole thing would finish in O(n). That is memoization:

\`\`\`
function climbStairs(n) {
  const memo = new Map()
  const ways = (k) => {
    if (k <= 1) return 1
    if (memo.has(k)) return memo.get(k)
    const result = ways(k - 1) + ways(k - 2)
    memo.set(k, result)
    return result
  }
  return ways(n)
}
\`\`\`

Two details make memoization actually work: the result is **stored before it is returned**, and
the memo key contains **everything** the answer depends on. If the state has two parameters, the
memo must be keyed by both — not by one.

## One recurrence, two implementations

Notice that \`ways(k) = ways(k - 1) + ways(k - 2)\` is just a mathematical statement.
Memoization (top-down) and tabulation (bottom-up) are two ways of running it. The bottom-up
version fills the table from the base cases upwards:

\`\`\`
function climbStairs(n) {
  const table = new Array(n + 1).fill(0)
  table[0] = 1
  table[1] = 1
  for (let k = 2; k <= n; k++) {
    table[k] = table[k - 1] + table[k - 2]
  }
  return table[n]
}
\`\`\`

Because \`table[k]\` only needs the two previous values, the table can be cut down to two
variables, which makes the space O(1):

\`\`\`
function climbStairs(n) {
  let twoBack = 1
  let oneBack = 1
  for (let k = 2; k <= n; k++) {
    const next = twoBack + oneBack
    twoBack = oneBack
    oneBack = next
  }
  return oneBack
}
\`\`\`

That is why bottom-up tends to feel better for the final answer: with the full table in front of
you, space cuts like this become obvious. The recurrence itself does not change one bit.

## Reading complexity off the state

- **Time** = number of states × work per transition. The staircase table has \`n\` states with
  O(1) transitions, so O(n). A two-dimensional \`dp[i][j]\` table with O(1) transitions means
  O(i × j).
- **Space** = number of states, before pruning. A table over an \`m × n\` grid costs O(m × n),
  but one row is often enough — O(n) — because finished rows are never read again.

Working out those two numbers **before** writing code is the fastest way to know your solution
fits the time limit, and the fastest way to explain to an interviewer why it is fast enough.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Menurunkan rekurens dan pola utamanya',
        en: 'Deriving the recurrence and the main patterns',
      },
      body: {
        id: `## Pertanyaan yang membuka semua pintu

Hampir semua hubungan rekurens DP diturunkan dengan satu pertanyaan yang sama. Bayangkan kamu
sudah berada di akhir proses, lalu tanyakan:

**"Apa keputusan terakhir yang saya ambil, dan submasalah apa yang tersisa setelah keputusan
itu?"**

Langkahnya selalu tiga: sebutkan keputusan terakhir, untuk setiap kemungkinan keputusan sebutkan
sisa masalahnya, lalu tulis jawaban sebagai gabungan dari "pilihan terakhir + jawaban sisa
masalah".

## 1D DP — satu dimensi, satu keputusan

Pada soal tangga, keputusan terakhirmu adalah langkah terakhir: naik 1 atau 2 anak tangga. Dua
kemungkinan, dan sisa masalahnya adalah tangga dengan \`k-1\` atau \`k-2\` anak tangga:

\`\`\`
cara(k) = cara(k - 1) + cara(k - 2)
\`\`\`

Pada **House Robber**, keputusan terakhirnya adalah sikapmu terhadap rumah ke-\`i\`: merampoknya
(rumah ke-\`i-1\` otomatis batal, sisanya sampai rumah ke-\`i-2\`) atau melewatinya (sisa
masalahnya rumah ke-\`i-1\`):

\`\`\`
ambil(i) = nilai[i] + dp[i - 2]
lewat(i) = dp[i - 1]
dp[i]    = max(ambil(i), lewat(i))
\`\`\`

Inilah pola "ambil atau lewat", dan ia muncul di banyak soal lain: memilih subset, memilih
proyek, menjadwalkan tugas.

## 2D DP — dua indeks, biasanya posisi di grid atau dua awalan string

Pada **Unique Paths**, keputusan terakhirnya adalah langkah terakhir robot: masuk dari atas atau
dari kiri. Jadi state-nya butuh dua indeks:

\`\`\`
paths(r, c) = paths(r - 1, c) + paths(r, c - 1)
\`\`\`

Baris pertama dan kolom pertama menjadi base case: hanya ada satu jalan, jadi nilainya 1. Pola
dua dimensi yang sama juga dipakai untuk **dua awalan string** (jarak edit, subsequence bersama
terpanjang), dengan arti state "jawaban untuk \`s[0..i]\` dan \`t[0..j]\`". Kalau transisi 2D
terasa membingungkan, tanyakan: "pada sel \`(i, j)\`, langkah terakhir membandingkan apa?"

## Knapsack — kapasitas, bukan posisi

Model aslinya: ada tas berkapasitas \`W\` dan sekumpulan barang dengan berat serta nilai; pilih
sebagian barang agar nilainya maksimum tanpa melebihi kapasitas. State-nya adalah "(barang yang
sudah dipertimbangkan, sisa kapasitas)".

Pada **Coin Change**, state-nya adalah "sisa nilai yang harus dibentuk", dan keputusan
terakhirnya adalah **koin terakhir** yang dipakai:

\`\`\`
dp[a] = min(1 + dp[a - coin]) untuk setiap coin <= a
\`\`\`

Perhatikan bedanya dengan 1D DP biasa. Di sini setiap koin boleh dipakai berkali-kali
(*unbounded*), sehingga pengulangan \`a\` boleh menaik dari kecil ke besar dan satu baris tabel
sudah cukup. Bandingkan dengan knapsack 0/1, di mana setiap barang hanya boleh dipakai sekali:
di sana pengulangan kapasitas harus **menurun** dari besar ke kecil supaya barang yang sama tidak
terpakai dua kali di baris yang sama.

## Subsequence — "pilih sebagian elemen, urutan tetap"

Kalau soal meminta LIS, LCS, atau subsequence apa pun, transisinya hampir selalu berbentuk
"elemen terakhir yang saya pilih adalah \`nums[i]\`, jadi saya cari state sebelumnya yang elemen
terakhirnya lebih kecil". Pada **Longest Increasing Subsequence**:

\`\`\`
dp[i] = panjang LIS yang berakhir tepat di indeks i
      = 1 + max(dp[j]) untuk semua j < i dengan nums[j] < nums[i]
\`\`\`

Dua catatan penting. Pertama, state-nya berbunyi **berakhir di \`i\`**, bukan "di dalam prefiks
\`i\`", karena transisinya butuh tahu nilai elemen terakhir. Kedua, jawabannya adalah
\`max(dp[i])\`, bukan \`dp[n - 1]\`, karena subsequence terpanjang bisa berakhir di indeks mana
pun.

Versi di atas O(n²). Ada versi O(n log n) memakai array bantuan berisi nilai penutup terkecil
untuk setiap panjang, dan itu yang dituntut soal terakhir di track ini.

## Memilih top-down atau bottom-up

Keduanya menjalankan rekurens yang sama; yang berbeda adalah cara berpikirmu dan biaya
implementasinya.

**Top-down (memoization).**

- Kamu menulis rekurensinya apa adanya, dan urutan perhitungan tidak perlu dipikirkan.
- Hanya state yang benar-benar dibutuhkan yang dihitung. Kalau sebagian besar tabel ternyata
  tidak relevan, ini menghemat banyak.
- Biayanya: satu pemanggilan fungsi per state, kedalaman rekursi terbatas (\`n\` besar bisa
  menumpuk call stack; di Python bahkan memunculkan \`RecursionError\`), dan tabel memo biasanya
  tidak bisa dipangkas menjadi beberapa variabel.

**Bottom-up (tabulasi).**

- Tabel diisi berurutan, semua state dihitung, tanpa pemanggilan rekursif.
- Urutan pengisian harus kamu pastikan sendiri: setiap sel hanya boleh membaca sel yang sudah
  selesai. Karena itu tabulasi memaksa kamu memikirkan arah iterasi, dan kesalahan arah di sini
  adalah sumber bug klasik.
- Pemangkasan ruang jadi mudah: kalau \`dp[i]\` hanya butuh \`dp[i-1]\` dan \`dp[i-2]\`, tabelnya
  bisa menyusut menjadi dua variabel.

Saran praktis: **turunkan rekurensinya secara top-down, lalu tulis jawaban akhirnya bottom-up**
kalau urutan ketergantungannya sudah jelas. Untuk soal dua dimensi yang urutannya rumit, pakai
top-down dulu sampai kamu melihat pola ketergantungannya, baru ubah ke tabulasi.`,
        en: `## The question that unlocks every door

Almost every DP recurrence is derived from the same question. Imagine you are standing at the end
of the process, then ask:

**"What was the last decision I made, and what subproblem is left after that decision?"**

The steps are always three: name the last decision, write down the remaining problem for each
possible decision, then express the answer as a combination of "final choice + answer of the
remaining problem".

## 1D DP — one dimension, one decision

In the staircase problem your last decision is the final step: climb 1 or climb 2. Two
possibilities, and each one leaves you with a staircase of \`k-1\` or \`k-2\` steps:

\`\`\`
ways(k) = ways(k - 1) + ways(k - 2)
\`\`\`

In **House Robber**, the last decision is what you do about house \`i\`: rob it (house \`i-1\` is
then out of the question and the problem shrinks to houses up to \`i-2\`) or skip it (the problem
shrinks to houses up to \`i-1\`):

\`\`\`
take(i) = value[i] + dp[i - 2]
skip(i) = dp[i - 1]
dp[i]   = max(take(i), skip(i))
\`\`\`

This is the "take it or leave it" pattern, and it reappears in many other problems: choosing a
subset, picking projects, scheduling jobs.

## 2D DP — two indices, usually a grid position or two string prefixes

In **Unique Paths**, the last decision is the robot's final move: enter from above or from the
left. That needs two indices:

\`\`\`
paths(r, c) = paths(r - 1, c) + paths(r, c - 1)
\`\`\`

The first row and the first column are the base cases: there is exactly one way to reach them, so
their value is 1. The same two-dimensional shape is used for **two string prefixes** (edit
distance, longest common subsequence), where the state means "the answer for \`s[0..i]\` and
\`t[0..j]\`". If a 2D transition confuses you, ask: "at cell \`(i, j)\`, what does the last step
compare?"

## Knapsack — capacity instead of position

The original model: a bag of capacity \`W\` and a set of items with weights and values; pick
some items to maximize total value without exceeding the capacity. The state is "(items
considered so far, capacity left)".

In **Coin Change** the state is "the amount still to be made", and the last decision is the
**last coin** you used:

\`\`\`
dp[a] = min(1 + dp[a - coin]) for every coin <= a
\`\`\`

Notice how this differs from ordinary 1D DP. Here every coin may be reused, which is why the
amount loop may run upwards from small to large and a single row of the table is enough. Compare
that with 0/1 knapsack, where each item may be picked only once: there the capacity loop must run
**downwards** from large to small, so the same item is not used twice in one row.

## Subsequence — "keep some elements, order preserved"

Whenever a problem says LIS, LCS, or subsequence of any kind, the transition is almost always
"the last element I picked is \`nums[i]\`, so I look for an earlier state whose last element is
smaller". For **Longest Increasing Subsequence**:

\`\`\`
dp[i] = length of the longest increasing subsequence ending exactly at index i
      = 1 + max(dp[j]) for every j < i with nums[j] < nums[i]
\`\`\`

Two notes matter. First, the state says **ending at \`i\`**, not "inside prefix \`i\`", because
the transition needs to know the value of the last element. Second, the answer is
\`max(dp[i])\`, not \`dp[n - 1]\`, because the longest subsequence may end at any index.

That version is O(n²). There is an O(n log n) version that keeps a helper array of the smallest
possible tail for every length, and that is what the last problem in this track asks for.

## Choosing top-down or bottom-up

Both run the same recurrence; what differs is how you think and what you pay for.

**Top-down (memoization).**

- You write the recurrence exactly as it reads, and you never worry about evaluation order.
- Only the states you actually need get computed. If most of the table turns out to be
  irrelevant, this saves real work.
- The costs: one function call per state, a hard limit on recursion depth (a large \`n\` can
  overflow the call stack; in Python it raises \`RecursionError\`), and a memo table that usually
  cannot be pruned down to a couple of variables.

**Bottom-up (tabulation).**

- The table is filled in order, every state is computed, and no function is called recursively.
- You must get the filling order right yourself: a cell may only read cells that are already
  finished. That is why tabulation forces you to reason about iteration direction, and why a
  wrong direction is a classic source of bugs.
- Space cuts become easy: if \`dp[i]\` only needs \`dp[i-1]\` and \`dp[i-2]\`, the table shrinks
  to two variables.

Practical advice: **derive the recurrence top-down, then write the final answer bottom-up** once
the dependency order is clear. For two-dimensional problems with a tricky order, start top-down
until you can see the dependency pattern, then convert to tabulation.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `## Salah mendefinisikan state

Ini kesalahan nomor satu, dan yang paling mahal karena kodenya tetap berjalan tanpa error.
State harus memuat **semua** informasi yang dibutuhkan transisi.

Contoh pada LIS: \`dp[i]\` yang berarti "panjang LIS di dalam prefiks \`0..i\`" tidak bisa
dipakai untuk bertransisi, karena kamu tidak tahu nilai elemen terakhir subsequence itu.
Definisi yang benar adalah "panjang LIS yang **berakhir** di \`i\`". Cara mendeteksinya: tanyakan
"kalau saya hanya tahu state ini, apakah keputusan berikutnya bisa dihitung tanpa informasi
lain?" Kalau jawabannya tidak, state-mu kurang satu dimensi.

Gejala khasnya: hasilnya benar untuk contoh kecil yang kamu hafal, lalu salah untuk input acak.
Biasanya bukan bug di loop, melainkan state yang tidak lengkap.

## Lupa atau salah base case

Base case adalah fondasi. Kesalahan di sana menghasilkan angka yang salah di seluruh tabel tanpa
satu pun pesan error.

- Pada soal tangga, \`cara(0)\` harus **1**, bukan 0. "Tidak melangkah" adalah satu urutan langkah
  yang sah. Menulis 0 membuat semua jawaban kurang satu.
- Pada Coin Change, \`dp[0] = 0\` berarti "nol koin untuk membentuk nilai 0" dan itu benar,
  sedangkan nilai selebihnya diinisialisasi sebagai tak hingga supaya nilai 0 tidak dianggap
  solusi.
- Pada House Robber, base case-nya adalah "belum ada rumah sama sekali", dan jawabannya 0.
- Melupakan base case khusus untuk **input kosong** sering baru ketahuan saat test case berisi
  array kosong.

## Menghitung ulang tanpa memo

Menulis rekursi yang cantik lalu lupa menyimpannya sama saja dengan tidak mengerjakan DP:

\`\`\`
function rob(i) {
  if (i < 0) return 0
  return Math.max(rob(i - 1), nums[i] + rob(i - 2))
}
\`\`\`

Kode ini benar, tapi O(2^n) karena setiap panggilan bercabang dua. Kesalahan yang mirip dan sama
fatalnya: memo didefinisikan **di dalam** fungsi rekursif, sehingga setiap panggilan mendapat
memo baru yang kosong.

\`\`\`
function rob(i) {
  const memo = new Map() // salah: memo baru setiap panggilan
  // ...
}
\`\`\`

Ingat juga bahwa memoization gratis di beberapa bahasa — \`functools.lru_cache\` di Python,
\`Map\` di JavaScript. Yang tidak gratis adalah memastikan kunci memo memuat semua parameter
state.

## Salah arah iterasi atau rekursi

Tabulasi hanya benar kalau arah loopnya sesuai dengan ketergantungan antar-state.

- **Knapsack 0/1**: kapasitas diiterasi **menurun**, karena \`dp[w]\` membaca \`dp[w - berat]\`
  dari baris yang sama dan barang itu belum boleh dipakai lagi.
- **Unbounded knapsack (Coin Change)**: kapasitas justru diiterasi **menaik**, karena koin yang
  sama memang boleh dipakai berulang.
- **Kombinasi versus permutasi**: kalau soal menanyakan banyaknya kombinasi, loop barang harus di
  luar dan loop kapasitas di dalam. Kalau posisinya dibalik, urutan yang berbeda akan dihitung
  sebagai solusi berbeda.
- **Rekursi yang salah arah**: \`solve(i)\` yang memanggil \`solve(i + 1)\` dengan base case di
  \`n\` itu sah, tetapi mencampur dua arah (\`i - 1\` dan \`i + 1\` di satu fungsi) membuat state
  saling bergantung. Pilih satu arah dan konsisten.

## Salah membaca sel jawaban

- Pada LIS, jawabannya \`max(dp)\`, bukan \`dp[n - 1]\`.
- Pada DP dua awalan string, jawabannya di \`dp[len(s)][len(t)]\`, bukan di sel terbesar mana pun.
  Kebiasaan "ambil nilai maksimum di seluruh tabel" hanya benar untuk soal yang jawabannya boleh
  berakhir di mana saja.
- Pada House Robber yang diiterasi dari depan, jawabannya ada di variabel rolling terakhir, bukan
  di nilai pertama.

## Mencampur sentinel dengan nilai sah

Menandai "belum dihitung" dengan \`-1\` berbahaya kalau jawaban yang sah bisa bernilai \`-1\`,
karena \`-1 + 1\` bernilai 0 dan 0 terlihat seperti jawaban yang masuk akal. Pada Coin Change,
pakai tak hingga — \`Infinity\` di JavaScript, \`float('inf')\` di Python — untuk state yang belum
bisa dibentuk, lalu konversikan ke \`-1\` hanya sekali di akhir.

## Menghitung kompleksitas dari kode, bukan dari state

"Loop bersarang berarti O(n²)" tidak berlaku di DP. Yang menentukan adalah jumlah state dikalikan
kerja per transisi. Menghitung dengan cara ini menyelamatkanmu dari dua hal sekaligus: optimasi
yang tidak perlu, dan solusi terlalu lambat yang tidak kamu sadari.`,
        en: `## Defining the state wrongly

This is mistake number one, and the most expensive one because the code still runs without any
error. A state must carry **every** piece of information the transition needs.

Take LIS: a \`dp[i]\` meaning "length of the longest increasing subsequence inside prefix
\`0..i\`" cannot be used for a transition, because you do not know the value of that subsequence's
last element. The correct definition is "the longest increasing subsequence that **ends** at
\`i\`". To detect this class of bug, ask: "if I only know this state, can I compute the next
decision without any other information?" If not, the state is missing a dimension.

The typical symptom: correct on the small examples you memorized, wrong on random input. That is
usually not a loop bug but an incomplete state.

## Forgetting or miswriting a base case

Base cases are the foundation. Get one wrong and every number in the table is wrong, with no error
message anywhere.

- For the staircase, \`ways(0)\` must be **1**, not 0. "Take no step" is a valid sequence of
  steps. Writing 0 makes every answer one too small.
- For Coin Change, \`dp[0] = 0\` means "zero coins to make amount 0" and that is correct, while
  every other cell starts at infinity so that 0 is never mistaken for a solution.
- For House Robber the base case is "no houses at all", whose answer is 0.
- Forgetting the special case of an **empty input** usually only surfaces when a test case feeds
  you an empty array.

## Recomputing without a memo

Writing a beautiful recursion and forgetting to store anything is the same as not doing DP at all:

\`\`\`
function rob(i) {
  if (i < 0) return 0
  return Math.max(rob(i - 1), nums[i] + rob(i - 2))
}
\`\`\`

This is correct but O(2^n), because every call forks in two. A closely related and equally fatal
mistake: declaring the memo **inside** the recursive function, so every call gets a fresh, empty
one.

\`\`\`
function rob(i) {
  const memo = new Map() // wrong: a brand new memo on every call
  // ...
}
\`\`\`

Also remember that memoization is cheap to add in most languages — \`functools.lru_cache\` in
Python, \`Map\` in JavaScript. What is not free is making sure the memo key contains every state
parameter.

## Iterating or recursing in the wrong direction

Tabulation is only correct when the loop direction matches the dependencies between states.

- **0/1 knapsack**: iterate capacity **downwards**, because \`dp[w]\` reads \`dp[w - weight]\`
  from the same row and the item must not be reused.
- **Unbounded knapsack (Coin Change)**: iterate capacity **upwards**, because the same coin may
  be used again and again.
- **Combinations versus permutations**: if the question counts combinations, the item loop must
  be outside and the capacity loop inside. Reverse them and different orderings get counted as
  different solutions.
- **Recursion in a mixed direction**: a \`solve(i)\` that calls \`solve(i + 1)\` with the base
  case at \`n\` is fine, but mixing directions (\`i - 1\` and \`i + 1\` inside one function) makes
  states depend on each other. Pick one direction and stay consistent.

## Reading the answer from the wrong cell

- For LIS the answer is \`max(dp)\`, not \`dp[n - 1]\`.
- For DP over two string prefixes the answer sits at \`dp[len(s)][len(t)]\`, not in whichever cell
  is largest. The habit of "take the maximum over the whole table" is only correct when the answer
  is allowed to end anywhere.
- For House Robber iterated from the front, the answer is the final value of the rolling
  variables, not the first one.

## Mixing sentinels with valid values

Marking "not computed yet" with \`-1\` is dangerous when a legitimate answer can be \`-1\`, because
\`-1 + 1\` is 0 and 0 looks like a perfectly reasonable answer. In Coin Change, use infinity —
\`Infinity\` in JavaScript, \`float('inf')\` in Python — for amounts that cannot be formed yet,
and convert to \`-1\` once, at the very end.

## Reading complexity from the code instead of the state

"Nested loops mean O(n²)" does not hold in DP. What decides is the number of states multiplied by
the work per transition. Reasoning that way saves you twice over: from optimizations you do not
need, and from solutions that are too slow without you noticing.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- DP bukan kumpulan trik, melainkan satu resep: **tulis rekursi naif → tentukan keputusan
  terakhir → simpan jawaban tiap state → rakit dari bawah**.
- Tulis definisi state dalam satu kalimat sebelum menulis kode, dan pastikan kalimat itu memuat
  semua yang dibutuhkan transisi.
- Hubungan rekurens selalu berbentuk "state ini = gabungan state yang lebih kecil".
- Memoization dan tabulasi adalah dua implementasi dari rekurens yang sama. Top-down untuk
  menemukan bentuknya, bottom-up untuk jawaban akhir dan pemangkasan ruang.
- Waktu = jumlah state × kerja per transisi. Ruang = jumlah state, sebelum dipangkas.
- Base case adalah fondasi; periksa satu per satu dan cocokkan dengan arti state-nya.
- Kalau jawaban boleh berakhir di mana saja, jangan lupa mengambil nilai maksimum di akhir.

## Latihan yang disarankan

Lima soal di track ini disusun sebagai tangga yang lengkap dari yang paling mekanis sampai yang
paling menuntut.

1. **Climbing Stairs** (\`n\` anak tangga) — 1D DP paling dasar. Tulis dulu versi rekursif tanpa
   memo, rasakan lambatnya, lalu tambahkan memo dan ubah menjadi dua variabel bergulir.
2. **Unique Paths** (\`m\` baris dan \`n\` kolom) — DP dua dimensi. Latih kebiasaan memangkas tabel
   2D menjadi satu baris.
3. **House Robber** (\`nums\`) — pola ambil atau lewat, plus base case untuk input kosong dan nilai
   yang tidak menguntungkan.
4. **Coin Change** — knapsack tak terbatas dengan kemungkinan mustahil. Latih penggunaan tak
   hingga sebagai penanda dan konversinya menjadi \`-1\` di akhir.
5. **Longest Increasing Subsequence** — subsequence dengan target O(n log n). Yang paling
   menuntut: state-nya "berakhir di \`i\`", jawabannya bukan \`dp[n - 1]\`, dan versi cepatnya butuh
   satu langkah berpikir tambahan.

Setelah setiap soal, tulis satu kalimat definisi state-nya di catatanmu. Setelah lima soal kamu
punya lima kalimat yang bisa dipakai ulang saat wawancara.`,
        en: `- DP is not a bag of tricks, it is one recipe: **write the naive recursion → find the last
  decision → store the answer of every state → assemble from the bottom up**.
- Write the state definition as a single sentence before writing code, and make sure that
  sentence mentions everything the transition needs.
- A recurrence always reads "this state = a combination of smaller states".
- Memoization and tabulation are two implementations of the same recurrence. Top-down to discover
  the shape, bottom-up for the final answer and for space cuts.
- Time = number of states × work per transition. Space = number of states, before pruning.
- Base cases are the foundation; check them one by one against the meaning of the state.
- If the answer is allowed to end anywhere, do not forget to take a maximum at the end.

## Suggested practice

The five problems in this track form a complete ladder, from the most mechanical to the most
demanding.

1. **Climbing Stairs** (\`n\` steps) — the simplest 1D DP. Write the memo-less recursion first,
   feel how slow it is, then add a memo and reshape it into two rolling variables.
2. **Unique Paths** (\`m\` rows and \`n\` columns) — two-dimensional DP. Practise cutting a 2D
   table down to a single row.
3. **House Robber** (\`nums\`) — the take-or-skip pattern, plus base cases for an empty input and
   for values that are not worth taking.
4. **Coin Change** — unbounded knapsack with an impossible case. Practise using infinity as the
   marker and converting it to \`-1\` at the end.
5. **Longest Increasing Subsequence** — a subsequence problem with an O(n log n) target. The
   hardest of the five: its state says "ending at \`i\`", the answer is not \`dp[n - 1]\`, and the
   fast version needs one extra insight.

After every problem, write one sentence describing its state in your notes. After five problems
you own five sentences you can reuse in an interview.`,
      },
    },
  ],
  problemSlugs: [
    'climbing-stairs',
    'unique-paths',
    'house-robber',
    'coin-change',
    'longest-increasing-subsequence',
  ],
};
