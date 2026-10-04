import type { Track } from '~/types/content';

export const stack: Track = {
  id: 'stack',
  order: 4,
  title: {
    id: 'Stack',
    en: 'Stack',
  },
  summary: {
    id: 'Struktur LIFO untuk mencocokkan pasangan, mencari elemen berikutnya yang lebih besar, dan mengevaluasi ekspresi.',
    en: 'The LIFO structure for matching pairs, finding the next greater element, and evaluating expressions.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa stack muncul di banyak soal',
        en: 'Why stacks show up everywhere',
      },
      body: {
        id: `Banyak soal interview tidak butuh struktur data yang rumit. Yang mereka butuhkan
adalah cara menyimpan **urutan pekerjaan yang belum selesai**, dan stack adalah bentuk
paling sederhana dari itu: kamu hanya boleh menambah dan mengambil dari satu ujung.

Stack muncul terus karena banyak proses itu **bersarang**. Saat kamu membuka tanda kurung,
memanggil fungsi, atau memulai blok yang harus selesai sebelum blok sebelumnya, kamu sedang
menumpuk pekerjaan. Aturan yang berlaku selalu sama: yang terakhir dibuka adalah yang
pertama harus ditutup. Itulah arti LIFO (*last in, first out*).

Di interview, stack jarang muncul sebagai soal "buat kelas Stack". Yang lebih sering:

- **pencocokan pasangan** — tanda kurung, tag HTML, pasangan buka/tutup apa pun;
- **"elemen berikutnya yang lebih besar"** — suhu harian, harga saham, span;
- **evaluasi ekspresi** — kalkulator, notasi Polandia terbalik, prioritas operator;
- **simulasi dengan riwayat** — editor dengan undo, state machine, pemanggilan bersarang.

Keempatnya kelihatan tidak berhubungan, tapi akarnya sama: kamu perlu tahu **apa yang
paling akhir dibuka dan belum terselesaikan**. Kalau kamu bisa menamai "sesuatu yang
menunggu untuk ditutup" di dalam soal, kemungkinan besar jawabannya stack.`,
        en: `Many interview problems do not need a fancy data structure. What they need is a way to
keep track of **unfinished business**, and a stack is the simplest form of that: you may
only add and remove at one end.

Stacks keep showing up because so much of computing is **nested**. When you open a bracket,
call a function, or start a block that must finish before the previous one, you are piling
up work. The rule is always the same: the last thing opened is the first thing closed. That
is what LIFO (*last in, first out*) means.

In interviews, a stack rarely appears as "implement a Stack class". More often it shows up as:

- **pair matching** — brackets, HTML tags, any open/close pair;
- **"next greater element"** — daily temperatures, stock spans, price ranges;
- **expression evaluation** — calculators, reverse Polish notation, operator precedence;
- **history-based simulation** — undo stacks, state machines, nested calls.

These four look unrelated, but they share one root: you need to know **what was opened last
and is still unresolved**. If you can point at the "thing waiting to be closed" in a problem,
a stack is probably the answer.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Stack dan operasi dasarnya',
        en: 'The stack and its basic operations',
      },
      body: {
        id: `Stack adalah kumpulan elemen dengan aturan akses di satu ujung saja, yang disebut
**puncak** (*top*). Operasi dasarnya:

- \`push(x)\` — menaruh \`x\` di puncak.
- \`pop()\` — mengambil dan membuang elemen di puncak.
- \`peek()\` atau \`top()\` — melihat puncak tanpa membuangnya.
- \`isEmpty()\` — memeriksa apakah stack kosong.

Semuanya **O(1)**. Tidak ada pencarian, tidak ada pergeseran; hanya satu ujung yang berubah.
Itu sebabnya stack murah dipakai di dalam loop.

Di JavaScript, array sudah cukup: \`push\` dan \`pop\` bekerja di ujung kanan. Hati-hati,
\`shift\`/\`unshift\` (ujung kiri) berbiaya O(n) karena semua elemen bergeser — itulah salah
satu kesalahan paling umum saat orang mencoba membuat queue dengan array. Di Python, pakai
\`list\` dengan \`append\` dan \`pop\`; \`pop(0)\` juga O(n).

**Apa yang disimpan?** Ini keputusan desain yang paling penting. Stack sering kali tidak
menyimpan nilai, tapi **indeks** atau **pasangan nilai**:

- Untuk "elemen berikutnya yang lebih besar", simpan indeks supaya kamu bisa menghitung
  jarak.
- Untuk pencocokan pasangan, simpan posisi pembuka supaya kamu tahu pasangannya.
- Untuk nilai minimum, simpan "minimum sampai kedalaman ini" bersama nilainya.

Terakhir: **rekursi memakai stack**. Call stack bahasa adalah stack sungguhan, itulah
sebabnya rekursi bisa berubah menjadi iterasi + stack eksplisit. Kalau interviewer bertanya
"bisa tanpa rekursi?", jawabannya hampir selalu versi loop dengan stack buatan sendiri.`,
        en: `A stack is a collection with access at one end only, called the **top**. Its basic
operations:

- \`push(x)\` — put \`x\` on top.
- \`pop()\` — remove and return the top element.
- \`peek()\` or \`top()\` — look at the top without removing it.
- \`isEmpty()\` — check whether the stack is empty.

All of them are **O(1)**. There is no search and no shifting; only one end changes. That is
why stacks are cheap to use inside a loop.

In JavaScript a plain array is enough: \`push\` and \`pop\` work on the right end. Be careful
with \`shift\`/\`unshift\` (the left end) — they cost O(n) because every element shifts, which
is one of the most common mistakes when people try to build a queue out of an array. In
Python use a \`list\` with \`append\` and \`pop\`; \`pop(0)\` is O(n) too.

**What gets stored?** This is the most important design decision. A stack often stores
**indices** or **pairs**, not plain values:

- For "next greater element", store indices so you can compute distances.
- For pair matching, store the position of the opener so you know its partner.
- For a running minimum, store "the minimum down to this depth" next to the value.

Finally: **recursion uses a stack**. The language call stack is a real stack, which is why
any recursion can be rewritten as a loop plus an explicit stack. If an interviewer asks
"can you do it without recursion?", the answer is almost always the loop version with a
stack you manage yourself.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Tiga pola utama',
        en: 'The three main patterns',
      },
      body: {
        id: `## 1. Pencocokan pasangan

Aturan umumnya: **pembuka di-push, penutup harus cocok dengan puncak**. Kalau penutup
datang saat stack kosong, atau puncaknya bukan pasangannya, strukturnya tidak valid.
Di akhir, stack harus kosong.

\`\`\`
untuk setiap karakter c:
  jika c pembuka  -> push(c)
  jika c penutup  -> jika stack kosong atau pop() bukan pasangan c, gagalkan
di akhir: valid hanya jika stack kosong
\`\`\`

Waktu O(n), ruang O(n) — ruang terburuk saat semua karakter adalah pembuka.

## 2. Monotonik stack

Ini pola yang paling sering keluar di soal medium dan hard. Stack dijaga supaya isinya
**selalu terurut** (menaik atau menurun) dari bawah ke puncak. Saat elemen baru datang,
pop semua elemen yang "kalah" sebelum menaruh elemen baru.

Contoh untuk "elemen berikutnya yang lebih besar": simpan indeks dengan suhu **menurun**
dari bawah ke puncak. Saat suhu baru lebih tinggi dari puncak, puncak itu akhirnya menemukan
jawabannya — pop, catat jarak indeksnya, lalu periksa puncak berikutnya. Karena setiap
indeks di-push sekali dan di-pop paling banyak sekali, total waktunya **O(n)**, bukan O(n²),
meskipun ada loop di dalam loop.

Tiga hal yang harus kamu putuskan sebelum menulis kode:

1. Urutan stack menaik atau menurun? (Menurun untuk "yang berikutnya lebih besar".)
2. Perbandingan pakai \`>\` atau \`>=\` untuk elemen yang sama?
3. Apa yang tersisa di stack di akhir, dan bagaimana cara menyelesaikannya?

## 3. Evaluasi ekspresi

Untuk notasi Polandia terbalik (RPN), polanya sederhana: **angka di-push, operator
mem-pop dua angka**. Hasilnya di-push kembali. Untuk ekspresi infix dengan tanda kurung
dan prioritas operator, kamu butuh dua stack (angka dan operator) atau konversi ke RPN dulu
— inilah *shunting-yard*.

Detail kecil yang sering menjatuhkan solusi: **urutan operand**. Yang di-pop pertama adalah
operan **kanan**, jadi \`a - b\` ditulis \`const b = pop(); const a = pop(); push(a - b)\`.
Sama untuk pembagian, dan ingat pembagian bilangan bulat dipotong **ke arah nol**, bukan
dibulatkan ke bawah.

## Kapan memakai yang mana

| Sinyal di soal | Pola |
| --- | --- |
| Ada pasangan buka/tutup | Pencocokan pasangan |
| Cari elemen lebih besar/kecil berikutnya atau sebelumnya | Monotonik stack |
| Butuh lebar rentang tempat sebuah elemen menjadi minimum/maksimum | Monotonik stack |
| Ada notasi prefix/postfix, atau prioritas operator | Evaluasi ekspresi |
| Ada riwayat yang bisa dibatalkan | Stack simulasi |`,
        en: `## 1. Pair matching

The general rule: **push openers, and every closer must match the top**. If a closer arrives
on an empty stack, or the top is not its partner, the structure is invalid. At the end the
stack must be empty.

\`\`\`
for each character c:
  if c is an opener -> push(c)
  if c is a closer -> if the stack is empty or pop() is not c's partner, fail
at the end: valid only if the stack is empty
\`\`\`

Time O(n), space O(n) — worst case when every character is an opener.

## 2. Monotonic stack

This is the pattern behind most medium and hard problems. The stack is kept **ordered**
(increasing or decreasing) from bottom to top. When a new element arrives, pop everything
that "loses" to it before pushing it.

For "next greater element": store indices with **decreasing** temperatures from bottom to
top. When a warmer day arrives, the top finally has its answer — pop it, record the index
distance, then check the new top. Because every index is pushed once and popped at most
once, the total work is **O(n)**, not O(n²), even though there is a loop inside a loop.

Three things to decide before writing code:

1. Increasing or decreasing order? (Decreasing for "next greater".)
2. Do you compare with \`>\` or \`>=\` for equal elements?
3. What is left on the stack at the end, and how do you resolve it?

## 3. Expression evaluation

For reverse Polish notation (RPN) the pattern is short: **push numbers, and an operator pops
two numbers**. Push the result back. For infix expressions with parentheses and precedence
you need two stacks (values and operators) or a conversion to RPN first — that is
*shunting-yard*.

The small detail that sinks most solutions: **operand order**. The first value popped is the
**right** operand, so \`a - b\` is \`const b = pop(); const a = pop(); push(a - b)\`. The same
holds for division, and remember integer division truncates **toward zero** rather than
rounding down.

## Which one to reach for

| Signal in the problem | Pattern |
| --- | --- |
| There are open/close pairs | Pair matching |
| Find the next or previous greater/smaller element | Monotonic stack |
| Need the width of the span where an element is the minimum/maximum | Monotonic stack |
| Prefix/postfix notation, or operator precedence | Expression evaluation |
| There is a history that can be undone | Simulation stack |`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**Mengakses stack yang kosong.** Ini penyebab error paling sering. Setiap
\`pop\` atau \`peek\` harus didahului pemeriksaan kosong. Contoh klasik: input \`"]"\` pada soal
valid parentheses — penutup datang pertama, dan stack belum punya apa pun. Dan ingat, di
akhir pemrosesan stack juga **harus kosong**; input \`"["\` lolos dari error tapi tetap tidak
valid.

**Urutan operand yang tertukar.** Pada evaluasi ekspresi, \`pop\` pertama menghasilkan operan
kanan. Untuk \`+\` dan \`*\` kesalahan ini tidak terasa (sifat komutatif), jadi ia baru muncul
di test case yang memakai \`-\` atau \`/\`. Selalu uji dengan pengurangan. Berhubungan dengan
itu: pembagian bilangan bulat di banyak bahasa **memotong ke arah nol** (\`7 / -3 = -2\`),
sementara \`//\` di Python membulatkan ke bawah (\`7 // -3 = -3\`). Pilih satu definisi dan
terapkan konsisten.

**Monotonik stack yang tidak konsisten.** Dua kesalahan halus di sini:

1. **Campur memakai \`<\` dan \`<=\`.** Keduanya bisa benar untuk soal berbeda, tapi kalau
   kamu memilih satu untuk push dan yang lain untuk pop, elemen yang nilainya sama akan
   dihitung dua kali atau rentangnya terpotong. Tentukan sikapmu terhadap nilai kembar
   sejak awal dan pakai perbandingan yang sama di semua tempat.
2. **Lupa menguras stack di akhir.** Setelah input habis, masih ada indeks di stack yang
   belum pernah menemukan jawabannya. Untuk soal jarak, jawabannya 0. Untuk soal rentang
   seperti "persegi panjang terbesar", sisa itu justru menyimpan kandidat terbaik — cara
   rapi menanganinya adalah menambahkan **sentinel**: elemen yang lebih kecil dari semuanya
   (misalnya 0 untuk tinggi bangunan) di akhir array.

**Memakai struktur yang salah.** Stack bukan queue. Kalau kamu butuh memproses yang paling
**dulu** datang, gunakan queue — dan jangan memakai \`shift()\` pada array di dalam loop,
karena itu O(n) per operasi dan mengubah solusi O(n) menjadi O(n²).

**Terlalu cepat menyimpulkan "butuh stack".** Kalau soal tidak punya konsep penutupan atau
pembatalan, stack biasanya hanya menambah kode tanpa mengurangi kompleksitas. Tanyakan dulu:
apa yang disimpan stack ini, dan mengapa informasi itu tidak bisa dihitung sambil jalan?`,
        en: `**Reaching into an empty stack.** This is the most common crash. Every \`pop\` or
\`peek\` needs an emptiness check first. The classic example: the input \`"]"\` in a
valid-parentheses problem — a closer arrives first and the stack has nothing. And remember
that at the end of processing the stack must also be **empty**; the input \`"["\` raises no
error but is still invalid.

**Swapping the operands.** In expression evaluation the first \`pop\` yields the right
operand. For \`+\` and \`*\` the bug hides (they commute), so it only shows up in a test case
that uses \`-\` or \`/\`. Always test with subtraction. Related: integer division in many
languages **truncates toward zero** (\`7 / -3 = -2\`), while Python's \`//\` rounds down
(\`7 // -3 = -3\`). Pick one definition and apply it everywhere.

**An inconsistent monotonic stack.** Two subtle mistakes here:

1. **Mixing \`<\` and \`<=\`.** Either one can be correct, but if you use one for the push
   decision and the other for the pop decision, equal elements get counted twice or their
   span gets clipped. Decide how you treat duplicates up front and use the same comparison
   in every branch.
2. **Forgetting to drain the stack at the end.** After the input runs out, some indices are
   still on the stack and never found their answer. For distance problems the answer is 0.
   For span problems like "largest rectangle", those leftovers hold the best candidates —
   the tidy way to handle them is a **sentinel**: an element smaller than everything else
   (say 0 for building heights) appended to the array.

**Using the wrong structure.** A stack is not a queue. If you need to process what arrived
**first**, use a queue — and do not call \`shift()\` on an array inside a loop, because that
is O(n) per operation and turns an O(n) solution into O(n²).

**Calling it "a stack problem" too early.** If a problem has no notion of closing or
undoing, a stack usually just adds code without reducing complexity. Ask first: what does
this stack hold, and why can that information not be computed on the fly?`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Stack cocok kalau ada **pekerjaan bersarang** yang harus ditutup dalam urutan
  terbalik, atau riwayat yang bisa dibatalkan.
- Semua operasi dasar stack **O(1)**; kalau kodemu menyentuh ujung kiri array di dalam loop,
  kamu kehilangan keunggulan itu.
- Stack sering menyimpan **indeks**, bukan nilai — jarak dan rentang butuh posisi.
- Monotonik stack mengubah pencarian kuadratik menjadi **O(n)** karena setiap elemen masuk
  dan keluar paling banyak sekali.
- Sebelum menulis kode monotonik, putuskan: arah urutan, sikap terhadap nilai kembar, dan
  apa yang terjadi pada sisa stack di akhir.
- Selalu periksa stack kosong sebelum \`pop\`/\`peek\`, dan periksa kekosongan stack di akhir
  saat soal membutuhkan pencocokan sempurna.

## Latihan yang disarankan

Mulai dari **Valid Parentheses** untuk membiasakan pola pencocokan pasangan dan pemeriksaan
stack kosong. Lanjut ke **Min Stack Operations**, soal simulasi yang memaksa kamu memikirkan
apa yang harus disimpan bersama setiap elemen — di sinilah ide "stack kedua" tumbuh. Setelah
itu **Evaluate Reverse Polish Notation** melatih evaluasi ekspresi dan urutan operand.

Dua soal terakhir adalah inti track ini. **Daily Temperatures** adalah bentuk paling polos
dari monotonik stack: cari elemen berikutnya yang lebih besar sambil menghitung jarak.
**Largest Rectangle in Histogram** adalah versi kerasnya — kamu harus menghitung lebar
rentang tempat setiap batang menjadi minimum, dan di situlah sentinel serta perbandingan
yang konsisten menentukan apakah solusimu benar atau gagal di test case tersembunyi.`,
        en: `- A stack fits when there is **nested work** that must be closed in reverse order, or a
  history that can be undone.
- Every basic stack operation is **O(1)**; if your code touches the left end of an array
  inside a loop, you have thrown that advantage away.
- A stack often stores **indices**, not values — distances and spans need positions.
- A monotonic stack turns a quadratic search into **O(n)** because each element enters and
  leaves at most once.
- Before writing monotonic code, decide: the ordering direction, the treatment of equal
  values, and what happens to whatever is left on the stack at the end.
- Always check for emptiness before \`pop\`/\`peek\`, and check the stack is empty at the end
  when the problem demands a perfect match.

## Suggested practice

Start with **Valid Parentheses** to get used to pair matching and empty-stack checks. Then
**Min Stack Operations**, a simulation problem that forces you to decide what travels with
every element — that is where the "second stack" idea is born. **Evaluate Reverse Polish
Notation** follows and drills expression evaluation and operand order.

The last two are the heart of this track. **Daily Temperatures** is the plainest form of a
monotonic stack: find the next greater element while measuring the distance.
**Largest Rectangle in Histogram** is the hard version — you must compute the width of the
span in which each bar is the minimum, and that is exactly where the sentinel and a
consistent comparison decide whether your solution passes the hidden cases.`,
      },
    },
  ],
  problemSlugs: [
    'valid-parentheses',
    'min-stack-ops',
    'evaluate-reverse-polish-notation',
    'daily-temperatures',
    'largest-rectangle-in-histogram',
  ],
};
