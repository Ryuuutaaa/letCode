import type { Track } from '~/types/content';

export const slidingWindow: Track = {
  id: 'sliding-window',
  order: 3,
  title: {
    id: 'Sliding Window',
    en: 'Sliding Window',
  },
  summary: {
    id: 'Menjaga satu jendela yang selalu bergerak maju di atas data, memperluas dan menyempitkannya sambil memperbarui keadaan jendela secara bertahap.',
    en: 'Keep a single window that always moves forward over the data, growing and shrinking it while updating the window state incrementally.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa topik ini penting',
        en: 'Why this topic matters',
      },
      body: {
        id: `Kalau kamu hanya punya waktu mempelajari satu pola untuk interview, sliding window
adalah kandidat terkuatnya. Hampir setiap paket soal punya satu soal berbentuk "cari
potongan bersebelahan yang paling ...": substring terpanjang tanpa pengulangan, subarray
dengan jumlah terbesar, atau jendela terkecil yang memuat sekumpulan huruf.

Kekuatannya ada pada perubahan kompleksitas. Pendekatan naif adalah memeriksa semua rentang;
ada O(n²) rentang, dan memeriksa satu rentang bisa memakan O(n), sehingga totalnya bisa
mencapai O(n³). Sliding window menurunkannya menjadi **O(n)** dengan satu kali lintasan dan
ruang tambahan O(1) sampai O(k), bergantung pada keadaan yang dipelihara.

Yang diuji pewawancara bukan apakah kamu pernah melihat soalnya, melainkan apakah kamu bisa
menjaga **invarian**. Setiap kali batas jendela bergeser, ada keadaan yang harus ikut
diperbarui. Kalau kamu bisa menjelaskan mengapa keadaan itu tetap benar setelah setiap
langkah, kamu benar-benar memahami polanya — bukan sekadar menghafalnya.`,
        en: `If you only had time to learn one pattern for interviews, the sliding window would be
the strongest candidate. Almost every problem set contains one that reads "find the
contiguous piece that is the most ...": the longest substring without repeats, the subarray
with the largest sum, or the smallest window that contains a set of letters.

Its power lies in the change in complexity. The naive approach inspects every range; there
are O(n²) ranges, and checking a single range can cost O(n), so the total can reach O(n³).
The sliding window brings that down to **O(n)** with a single pass and O(1) to O(k) extra
space, depending on the state you maintain.

What the interviewer is testing is not whether you have seen the problem before, but whether
you can hold an **invariant**. Every time a window boundary moves, some state has to move
with it. If you can explain why that state is still correct after each step, you genuinely
understand the pattern instead of memorizing it.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Jendela dan dua pointer searah',
        en: 'The window and two forward pointers',
      },
      body: {
        id: `## Jendela

Jendela adalah **potongan bersebelahan** dari data: \`[left, right]\`, dengan \`left\` sebagai
batas kiri dan \`right\` sebagai batas kanan. Panjangnya adalah \`right - left + 1\`.

Jendela bukan array baru. Ia hanya dua indeks, dan isinya dibaca langsung dari data asli,
sehingga tidak ada biaya penyalinan.

## Dua pointer searah

Berbeda dari pola dua pointer berlawanan arah, di sini **kedua pointer hanya bergerak maju**:

- \`right\` maju untuk **memasukkan** satu elemen baru ke dalam jendela.
- \`left\` maju untuk **mengeluarkan** elemen paling tua dari jendela.

Tidak ada pointer yang bergerak mundur. Karena itu setiap elemen masuk tepat sekali dan
keluar paling banyak sekali. Total pekerjaan sepanjang lintasan tetap O(n) — bukan O(n²) —
meskipun ada loop di dalam loop.

## Invarian

Bagian yang paling sering diabaikan. Sebelum menulis kode, tanyakan: *keadaan apa yang harus
selalu benar tentang isi jendela?*

Contohnya: "semua karakter di dalam jendela unik", atau "jendela memuat paling sedikit satu
contoh dari setiap huruf yang dibutuhkan". Keadaan itulah yang diperbarui di setiap langkah.
Kalau kamu tidak bisa menyebutkannya dalam satu kalimat, biasanya kodenya akan kacau.

## Syarat berlakunya

Sliding window bekerja kalau syaratnya **monoton**: begitu sebuah jendela tidak valid,
memperbesar jendela itu tidak akan membuatnya valid kembali. Kalau \`[left, right]\` gagal,
maka \`[left, right + 1]\` dan semua yang lebih lebar juga gagal.

Kalau sifat itu tidak berlaku, memperbesar jendela bisa memperbaiki keadaan dan kebijakan
"geser kiri sampai valid" kehilangan dasar pembenarannya. Soal seperti itu biasanya butuh
prefix sum, pemrograman dinamis, atau hash map penuh.

Cara berpikir yang berguna: \`right\` hanya bergerak maju. Untuk setiap posisi \`right\`, kita
mencari \`left\` **terbaik** yang membuat jendela valid — dan \`left\` terbaik itu juga tidak
pernah bergerak mundur. Itulah sebabnya keduanya bisa dikelola dalam satu lintasan.`,
        en: `## The window

A window is a **contiguous piece** of the data: \`[left, right]\`, where \`left\` is the left
boundary and \`right\` is the right one. Its length is \`right - left + 1\`.

A window is not a new array. It is just two indices; its contents are read straight from the
original data, so nothing is copied.

## Two forward pointers

Unlike the opposite-ends pattern, here **both pointers only move forward**:

- \`right\` advances to **add** one new element to the window.
- \`left\` advances to **remove** the oldest element from the window.

Neither pointer ever moves backward. So every element enters exactly once and leaves at most
once. The total work across the whole pass stays O(n) — not O(n²) — even though there is a
loop inside a loop.

## The invariant

This is the part people skip most often. Before writing code, ask: *what must always be true
about the contents of the window?*

For example: "every character inside the window is unique", or "the window holds at least one
copy of every letter I need". That is the state you update on each step. If you cannot state
it in one sentence, your code will usually fall apart.

## When it applies

The sliding window works when the condition is **monotone**: once a window is invalid,
growing that window will not make it valid again. If \`[left, right]\` fails, then
\`[left, right + 1]\` and anything wider also fails.

When that property does not hold, growing the window can fix things, and the rule "advance
left until valid" loses its justification. Those problems usually need prefix sums, dynamic
programming, or a full hash map instead.

A useful way to think about it: \`right\` only moves forward. For each position of \`right\`,
we look for the **best** \`left\` that makes the window valid — and that best \`left\` never
moves backward either. That is what lets both of them be managed in a single pass.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Jendela tetap vs jendela dinamis',
        en: 'Fixed window vs dynamic window',
      },
      body: {
        id: `Ada dua keluarga besar, dan bedanya menentukan bentuk loop-mu.

## Jendela tetap

Ukuran jendela sudah diketahui: \`k\`. Jendela digeser satu langkah setiap kali.

1. Hitung jendela pertama \`[0, k - 1]\` secara langsung. Ini O(k), sekali saja.
2. Untuk setiap posisi berikutnya, **tambah** elemen yang masuk di kanan dan **buang**
   elemen yang keluar di kiri.

Kuncinya adalah tidak menghitung ulang isi jendela setiap langkah. Untuk nilai seperti
jumlah, rata-rata, atau frekuensi, penambahan dan pengurangan masing-masing O(1), sehingga
seluruh lintasan menjadi O(n), bukan O(n·k).

Contoh soal: jumlah terbesar dari subarray yang panjangnya tepat \`k\`.

## Jendela dinamis

Ukuran jendela **tidak diketahui** — justru itu yang dicari. Ada dua ritmenya.

**Mencari jendela terpanjang yang memenuhi syarat.** \`right\` selalu maju. Setiap kali jendela
menjadi tidak valid, majukan \`left\` sampai valid kembali. Jawaban dicatat **setelah**
pembersihan.

\`\`\`text
for right = 0 .. n - 1:
  tambahkan elemen ke jendela
  while jendela tidak valid:
    keluarkan elemen paling kiri
  perbarui jawaban dengan panjang jendela
\`\`\`

**Mencari jendela terpendek yang memenuhi syarat.** Kebalikannya: majukan \`right\` sampai
jendela valid, lalu majukan \`left\` selama masih valid sambil mencatat setiap kandidat.
Jawaban dicatat **di dalam** \`while\`.

\`\`\`text
for right = 0 .. n - 1:
  tambahkan elemen ke jendela
  while jendela valid:
    catat panjang jendela sebagai kandidat
    keluarkan elemen paling kiri
\`\`\`

Tempat pencatatan jawaban inilah yang membedakan keduanya. Salah menaruhnya adalah sumber bug
yang paling umum pada soal jendela minimum.

## Pola hitungan dengan penghitung sisa

Untuk jendela dinamis yang memakai frekuensi karakter, jangan bandingkan seluruh peta
frekuensi di setiap langkah — itu menambah faktor O(σ) pada kompleksitas. Simpan satu angka
\`missing\` yang berarti "berapa banyak karakter yang masih kurang agar jendela valid". Angka
itu turun ketika kita memasukkan karakter yang dibutuhkan, dan naik ketika kita membuang
karakter yang dibutuhkan. Dengan begitu pemeriksaan validitas menjadi O(1).

Untuk alfabet tetap seperti A–Z, cukup array 26 angka: \`counts[ch.charCodeAt(0) - 65]\`.
Untuk jendela dengan huruf besar dan kecil, pakai map atau array 128.`,
        en: `There are two big families, and the difference decides the shape of your loop.

## Fixed window

The window size is known up front: \`k\`. The window slides one step at a time.

1. Compute the first window \`[0, k - 1]\` directly. That is O(k), paid once.
2. For every following position, **add** the element entering on the right and **drop** the
   element leaving on the left.

The key is never recomputing the window contents. For values such as a sum, an average, or a
frequency count, the addition and the subtraction are each O(1), so the whole pass is O(n)
instead of O(n·k).

Example problem: the largest sum of a subarray whose length is exactly \`k\`.

## Dynamic window

The window size is **unknown** — finding it is the whole point. There are two rhythms.

**Finding the longest valid window.** \`right\` always advances. Whenever the window becomes
invalid, advance \`left\` until it is valid again. The answer is recorded **after** that
cleanup.

\`\`\`text
for right = 0 .. n - 1:
  add the element to the window
  while the window is invalid:
    remove the leftmost element
  update the answer with the window length
\`\`\`

**Finding the shortest valid window.** The mirror image: advance \`right\` until the window is
valid, then advance \`left\` while it stays valid, recording every candidate. The answer is
recorded **inside** the \`while\`.

\`\`\`text
for right = 0 .. n - 1:
  add the element to the window
  while the window is valid:
    record the window length as a candidate
    remove the leftmost element
\`\`\`

Where you record the answer is what separates the two. Putting it in the wrong place is the
most common source of bugs on minimum-window problems.

## The counting pattern with a deficit counter

For dynamic windows that track character frequencies, do not compare the entire frequency map
on every step — that adds an O(σ) factor to your complexity. Keep a single number \`missing\`
meaning "how many characters are still needed for the window to be valid". It goes down when
you take in a needed character and up when you drop one. Validity checking then costs O(1).

For a fixed alphabet such as A–Z, a plain array of 26 counts is enough:
\`counts[ch.charCodeAt(0) - 65]\`. For mixed case, use a map or a 128-slot array.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**Lupa mengecilkan jendela.** Kesalahan nomor satu. Kalau \`left\` tidak pernah maju
setelah jendela menjadi tidak valid, jendela akan terus membesar dan jawabannya hampir selalu
terlalu besar. Setiap kali kamu menambah elemen di kanan, tanyakan: "apakah syaratnya masih
terpenuhi? kalau tidak, apa yang harus dikeluarkan?"

**Memakai \`if\` padahal butuh \`while\`.** Menyempitkan jendela seringkali butuh beberapa
langkah sekaligus. \`if\` hanya membuang satu elemen, sehingga jendela bisa tetap tidak valid
saat loop utama lanjut ke iterasi berikutnya. Uji kasus yang memaksa menyempit dua kali atau
lebih — misalnya \`"abcabcbb"\` atau karakter duplikat beruntun — akan langsung menangkap bug
ini.

**Salah mengelola hitungan karakter.** Hanya kurangi \`missing\` ketika stok karakter itu
sebelumnya masih positif. Kalau kamu mengurangi \`missing\` pada setiap kemunculan, karakter
berlebih membuat \`missing\` mencapai nol terlalu cepat dan jendela dinyatakan valid padahal
belum. Sebaliknya saat membuang elemen di kiri, hanya tambah \`missing\` ketika stok karakter
itu benar-benar berubah dari cukup menjadi kurang. Untuk itu, biarkan stok menjadi negatif
supaya kelebihan karakter tetap terlihat alih-alih dipangkas ke nol.

**Salah menghitung panjang.** Untuk indeks inklusif, panjang jendela adalah
\`right - left + 1\`. Lupa menambahkan satu membuat jawaban selalu kurang satu; kesalahan ini
sering lolos pada contoh kecil yang kebetulan benar dan baru muncul di test case lain.

**Mencatat jawaban di tempat yang salah.** Pada variasi jendela terpendek, jawaban hanya boleh
dicatat saat jendela **valid**. Pada variasi terpanjang, jawaban dicatat setelah jendela
dibersihkan, bukan sebelum. Menukar keduanya menghasilkan kandidat palsu.

**Menyalin isi jendela setiap langkah.** \`s.slice(left, right + 1)\` di dalam loop membuat
kompleksitas melonjak kembali ke O(n²) dan boros memori. Simpan indeks awal dan panjangnya,
lalu potong sekali di akhir.

**Melupakan kasus kosong.** String kosong menghasilkan 0, array kosong menghasilkan 0 atau
tidak ada jawaban, dan \`t\` kosong pada soal jendela minimum berarti jendela kosong. Tangani
kasus ini di awal, bukan setelah kode gagal.`,
        en: `**Forgetting to shrink the window.** The number one mistake. If \`left\` never advances
after the window becomes invalid, the window keeps growing and the answer is almost always
too large. Every time you add an element on the right, ask: "is the condition still met? if
not, what has to leave?"

**Using \`if\` when you need \`while\`.** Shrinking often takes several steps in a row. An
\`if\` removes just one element, so the window can still be invalid when the main loop moves
on to the next iteration. Test cases that force two or more shrinks — something like
\`"abcabcbb"\` or a run of duplicate characters — catch this bug immediately.

**Mismanaging the character counts.** Only decrease \`missing\` when the stock for that
character was still positive. If you decrease it on every occurrence, surplus characters push
\`missing\` to zero too early and the window is declared valid when it is not. Symmetrically,
when removing from the left, only increase \`missing\` when the stock truly crosses from
sufficient back to insufficient. To make that possible, let the stock go negative so surplus
characters remain visible instead of being clamped to zero.

**Computing the length wrong.** For inclusive indices the window length is
\`right - left + 1\`. Leaving out the plus one makes every answer short by one; the bug often
hides on small examples that happen to be right and only shows up on other test cases.

**Recording the answer in the wrong place.** In the shortest-window variant, the answer may
only be recorded while the window is **valid**. In the longest-window variant, it is recorded
after the window has been cleaned up, not before. Swapping the two produces bogus candidates.

**Copying the window contents on every step.** \`s.slice(left, right + 1)\` inside the loop
pushes the complexity back to O(n²) and wastes memory. Store the start index and the length,
then slice once at the end.

**Forgetting the empty cases.** An empty string yields 0, an empty array yields 0 or no answer,
and an empty \`t\` in a minimum-window problem means an empty window. Handle these up front,
not after the code fails.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Sliding window = dua pointer searah yang menjaga sebuah **rentang bersebelahan**.
- Setiap elemen masuk sekali dan keluar paling banyak sekali, jadi totalnya O(n) meski ada
  loop di dalam loop.
- Keadaan jendela (jumlah, frekuensi, penghitung kekurangan) diperbarui bertahap, bukan
  dihitung ulang.
- **Jendela tetap**: hitung jendela pertama, lalu tambah yang masuk dan buang yang keluar.
- **Jendela dinamis terpanjang**: perbesar dulu, kecilkan dengan \`while\` sampai valid, catat
  jawaban setelah itu.
- **Jendela dinamis terpendek**: perbesar sampai valid, kecilkan dengan \`while\` sambil
  mencatat jawaban di dalamnya.
- Ruang tambahan biasanya O(1) untuk nilai angka, atau O(σ) untuk peta frekuensi dengan σ
  ukuran alfabet.

## Latihan yang disarankan

Lima soal di bawah ini disusun dari yang paling sederhana. Mulai dari soal saham untuk
merasakan satu lintasan dengan satu keadaan yang harus dipelihara. Lanjut ke jendela tetap,
tempat kamu berlatih mengganti penghitungan ulang dengan rumus \`masuk - keluar\`. Setelah itu
dua soal jendela dinamis "terpanjang" dengan tingkat kesulitan berbeda: yang pertama memakai
map posisi terakhir, yang kedua memakai array frekuensi dan satu penghitung maksimum. Tutup
dengan soal jendela terpendek, yang menggabungkan semuanya sekaligus: peta kebutuhan,
penghitung kekurangan yang boleh negatif, dan pencatatan kandidat di dalam \`while\`.`,
        en: `- A sliding window is two forward pointers maintaining a **contiguous range**.
- Every element enters once and leaves at most once, so the total is O(n) even with a loop
  inside a loop.
- Window state (a sum, frequencies, a deficit counter) is updated incrementally, never
  recomputed.
- **Fixed window**: compute the first window, then add what enters and drop what leaves.
- **Longest dynamic window**: grow first, shrink with a \`while\` until valid, record the
  answer after that.
- **Shortest dynamic window**: grow until valid, shrink with a \`while\` inside which you
  record the answer.
- Extra space is usually O(1) for numeric state, or O(σ) for a frequency map where σ is the
  alphabet size.

## Suggested practice

The five problems below are ordered from simplest to hardest. Start with the stock problem to
feel a single pass with one piece of state to maintain. Then the fixed window, where you
practice replacing recomputation with the \`incoming - outgoing\` formula. After that come two
"longest" dynamic windows of increasing difficulty: the first uses a last-seen map, the
second a frequency array with a running maximum. Finish with the shortest-window problem,
which combines everything at once: a needs map, a deficit counter allowed to go negative, and
candidate recording inside the \`while\`.`,
      },
    },
  ],
  problemSlugs: [
    'best-time-to-buy-sell-stock',
    'max-sum-subarray-size-k',
    'longest-substring-without-repeating-characters',
    'longest-repeating-character-replacement',
    'minimum-window-substring',
  ],
};
