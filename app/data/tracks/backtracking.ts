import type { Track } from '~/types/content';

export const backtracking: Track = {
  id: 'backtracking',
  order: 11,
  title: {
    id: 'Backtracking',
    en: 'Backtracking',
  },
  summary: {
    id: 'Menelusuri pohon keputusan dengan pola pilih → jelajahi → batalkan, lalu memangkas cabang yang tidak mungkin menghasilkan jawaban.',
    en: 'Walk the decision tree with choose → explore → undo, then prune the branches that cannot lead to an answer.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa topik ini penting',
        en: 'Why this topic matters',
      },
      body: {
        id: `Backtracking adalah cara **sistematis** untuk menelusuri semua pilihan tanpa menulis
loop bersarang yang jumlahnya berubah-ubah. Kalau kamu pernah bingung "bagaimana membuat
loop sebanyak n kali padahal n baru diketahui saat runtime", jawabannya ada di sini:
loop digantikan oleh **rekursi**, dan variabel loop digantikan oleh **pohon keputusan**.

Topik ini muncul di interview karena menguji empat hal sekaligus:

1. Apakah kamu bisa memecah masalah menjadi rangkaian keputusan kecil.
2. Apakah kamu bisa menulis rekursi yang berhenti di tempat yang benar.
3. Apakah kamu sadar bahwa setiap cabang yang dieksplorasi harus **dibersihkan** setelahnya.
4. Apakah kamu bisa memangkas, sehingga program selesai sebelum waktu habis.

Poin keempat yang membedakan jawaban "benar" dengan jawaban yang diterima. Hampir semua
soal backtracking punya batas masukan yang membuat versi tanpa pemangkasan menjadi terlalu
lambat. Jadi jangan berhenti setelah solusimu benar — pikirkan apa yang bisa dibuang.`,
        en: `Backtracking is a **systematic** way to enumerate choices without writing nested loops
whose depth you cannot know in advance. If you have ever wondered "how do I write n nested
loops when n is only known at runtime", this is the answer: the loops become **recursion**,
and the loop variables become a **decision tree**.

It shows up in interviews because it tests four things at once:

1. Can you break a problem into a sequence of small decisions?
2. Can you write recursion that stops in exactly the right place?
3. Are you aware that every branch you explore must be **cleaned up** afterwards?
4. Can you prune, so the program finishes before the clock runs out?

The fourth point separates an answer that is merely correct from one that is accepted. Almost
every backtracking problem has input limits that make the unpruned version too slow. So do not
stop when your solution becomes correct — ask what can be thrown away.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Pohon keputusan dan tiga langkah',
        en: 'The decision tree and the three steps',
      },
      body: {
        id: `Bayangkan setiap keadaan pencarian sebagai **node** di sebuah pohon:

- **Akar** = keadaan awal, belum ada keputusan yang diambil.
- **Cabang** = satu pilihan yang mungkin diambil pada langkah ini.
- **Daun** = keadaan di mana keputusan sudah lengkap (atau sudah tidak mungkin dilanjutkan).

Solusi adalah salah satu (atau semua) daun yang memenuhi syarat. Backtracking menjelajahi
pohon itu sampai kedalaman penuh, lalu mundur satu langkah dan mencoba cabang berikutnya.

Kerangkanya selalu tiga langkah, dan urutannya tidak pernah berubah:

\`\`\`text
1. PILIH     — tambahkan satu kandidat ke keadaan sekarang
2. JELAJAHI  — panggil rekursi untuk memutuskan langkah berikutnya
3. BATALKAN  — keluarkan kandidat tadi, supaya keadaan kembali seperti semula
\`\`\`

Dalam kode:

\`\`\`js
function backtrack(keadaan) {
  if (kondisiSelesai(keadaan)) {
    simpanSalinan(keadaan);
    return;
  }

  for (const pilihan of daftarPilihan(keadaan)) {
    terapkan(keadaan, pilihan);     // PILIH
    backtrack(keadaanBaru);         // JELAJAHI
    batalkan(keadaan, pilihan);     // BATALKAN
  }
}
\`\`\`

Perhatikan bahwa keadaan yang dimutasi hanyalah **satu** objek (biasanya array \`path\`),
bukan salinan baru di setiap cabang. Langkah "batalkan" itulah yang membuat satu objek bisa
dipakai ulang untuk seluruh pohon, sehingga ruang tambahannya hanya sebesar kedalaman
rekursi, bukan sebesar jumlah daun.

Penting juga: **pohon keputusan bukanlah struktur data yang kamu bangun.** Kamu tidak pernah
membuat objek node. Pohon itu hanya cara berpikir; yang benar-benar ada hanyalah pemanggilan
fungsi yang bersarang, dan \`path\` yang naik-turun isinya.`,
        en: `Picture every search state as a **node** in a tree:

- **Root** = the initial state, no decision made yet.
- **Branch** = one choice that could be made at this step.
- **Leaf** = a state where the decisions are complete (or where nothing further is possible).

A solution is one (or all) of the leaves that satisfy the requirements. Backtracking walks the
tree down to full depth, then steps back one level and tries the next branch.

The skeleton is always three steps, and the order never changes:

\`\`\`text
1. CHOOSE   — add one candidate to the current state
2. EXPLORE  — recurse so the next decision can be made
3. UNDO     — remove that candidate so the state is exactly as it was
\`\`\`

In code:

\`\`\`js
function backtrack(state) {
  if (isComplete(state)) {
    saveCopy(state);
    return;
  }

  for (const choice of options(state)) {
    apply(state, choice);     // CHOOSE
    backtrack(nextState);     // EXPLORE
    undo(state, choice);      // UNDO
  }
}
\`\`\`

Notice that the mutated state is a **single** object (usually an array called \`path\`), not a
fresh copy handed to each branch. That "undo" step is what lets one object serve the whole
tree, so the extra space is the depth of the recursion rather than the number of leaves.

One more thing: the **decision tree is not a data structure you build.** You never create node
objects. The tree is just a way of thinking; what actually exists is nested function calls and a
\`path\` array whose contents rise and fall.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Empat pola, satu kerangka',
        en: 'Four patterns, one skeleton',
      },
      body: {
        id: `Semua soal backtracking memakai kerangka **pilih → rekursi → batalkan** yang sama.
Yang berbeda hanya dua hal: **cara memangkas** dan **cara menyimpan hasil**. Kalau kamu
hafal kerangkanya, soal baru hanya perlu dipetakan ke salah satu pola berikut.

## 1. Subset / kombinasi

Setiap elemen punya dua kemungkinan: diambil atau tidak. Versi paling ringkas memakai
indeks \`start\`, sehingga setiap elemen hanya bisa diambil sekali dan kombinasi yang sama
tidak muncul terbalik:

\`\`\`js
function backtrack(start) {
  simpanSalinan(path);              // setiap node adalah satu subset
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);             // pilih
    backtrack(i + 1);               // jelajahi, mulai dari i + 1 agar tidak mundur
    path.pop();                     // batalkan
  }
}
\`\`\`

Kalau elemen boleh dipakai berulang (seperti *Combination Sum*), rekursinya memakai \`i\`,
bukan \`i + 1\`: setelah memilih \`nums[i]\`, pilihan yang sama masih tersedia. Kalau daftar
masukan memuat nilai kembar dan hasil harus unik, urutkan dulu lalu lewati \`i\` ketika
\`nums[i] === nums[i - 1]\` pada tingkat rekursi yang sama.

## 2. Permutasi

Semua elemen akan dipakai, jadi \`start\` tidak berguna. Yang dibutuhkan adalah daftar
\`used\`, karena urutan penting dan satu elemen tidak boleh muncul dua kali:

\`\`\`js
for (let i = 0; i < nums.length; i++) {
  if (used[i]) continue;
  used[i] = true;  path.push(nums[i]);
  backtrack();
  path.pop();      used[i] = false;
}
\`\`\`

Cara lain: tukar elemen ke posisi saat ini, rekursi untuk posisi berikutnya, lalu tukar
kembali. Keduanya sah — tukar-menukar lebih hemat memori, sedangkan \`used\` lebih mudah
dibaca ketika ada syarat tambahan (misalnya nilai kembar harus dilewati).

## 3. Pencarian di grid 2D

Grid adalah graf: setiap sel terhubung ke empat tetangganya. Backtracking-nya adalah
penelusuran, dan "batalkan" berarti **menghapus penandaan**:

\`\`\`js
const saved = board[r][c];
board[r][c] = '#';         // tandai: sel ini sedang dipakai
const found = cobaEmpatArah(r, c);
board[r][c] = saved;       // lepaskan penandaan — inilah langkah batalkan
\`\`\`

Penandaan di tempat (in place) memberi ruang O(1) di luar kedalaman rekursi, dan lebih
cepat daripada membuat \`Set\` berisi pasangan koordinat. Kalau grid tidak boleh diubah,
pakai matriks \`visited\` terpisah dan reset saat mundur.

## 4. Pemangkasan

Pemangkasan adalah alasan backtracking sering disebut "coba-coba yang cerdas". Ada tiga
jenis yang paling berguna:

- **Batas matematis.** Kalau sisa target bernilai negatif, cabang ini tidak mungkin berhasil —
  \`return\` sekarang juga. Kalau kandidat sudah diurutkan, hentikan loop begitu
  \`kandidat > sisa\` karena semua kandidat berikutnya pasti juga terlalu besar.
- **Pemangkasan kardinalitas.** Kalau butuh tepat \`k\` elemen dan \`path\` sudah lebih panjang,
  mundur saja.
- **Deteksi duplikat.** Urutkan masukan lalu lewati nilai kembar pada tingkat yang sama.
  Ini memangkas seluruh sub-pohon, bukan hanya satu cabang.

Satu aturan praktis: lakukan pemangkasan **sebelum** rekursi, bukan sesudah. Memangkas di
awal badan fungsi menghemat seluruh biaya pemanggilan berikutnya.`,
        en: `Every backtracking problem uses the same **choose → recurse → undo** skeleton. Only two
things change: **how you prune** and **how you store the result**. If you know the skeleton by
heart, a new problem is just a matter of mapping it onto one of the following patterns.

## 1. Subsets / combinations

Each element is either taken or not. The most compact version uses a \`start\` index, so every
element can be taken at most once and the same combination never appears in reverse:

\`\`\`js
function backtrack(start) {
  saveCopy(path);                   // every node is one subset
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);             // choose
    backtrack(i + 1);               // explore, starting at i + 1 so we never go back
    path.pop();                     // undo
  }
}
\`\`\`

When an element may be reused (as in *Combination Sum*), the recursion passes \`i\` instead of
\`i + 1\`: after choosing \`nums[i]\` the same choice is still available. When the input holds
duplicate values and the output must be unique, sort first and skip \`i\` whenever
\`nums[i] === nums[i - 1]\` at the same recursion level.

## 2. Permutations

Every element gets used, so \`start\` is useless. What you need is a \`used\` list, because order
matters and a single element must not appear twice:

\`\`\`js
for (let i = 0; i < nums.length; i++) {
  if (used[i]) continue;
  used[i] = true;  path.push(nums[i]);
  backtrack();
  path.pop();      used[i] = false;
}
\`\`\`

The alternative is swapping the element into the current position, recursing for the next
position, then swapping back. Both are fine — swapping uses less memory, while \`used\` is easier
to read once extra conditions appear (skipping duplicates, for instance).

## 3. Search on a 2D grid

A grid is a graph: each cell connects to four neighbours. Backtracking becomes a traversal,
and "undo" means **clearing the mark**:

\`\`\`js
const saved = board[r][c];
board[r][c] = '#';         // mark: this cell is currently in use
const found = tryFourDirections(r, c);
board[r][c] = saved;       // clear the mark — this is the undo step
\`\`\`

Marking in place gives O(1) auxiliary space beyond the recursion depth, and it is faster than
maintaining a \`Set\` of coordinate pairs. If the grid must stay untouched, use a separate
\`visited\` matrix and reset it as you unwind.

## 4. Pruning

Pruning is why backtracking is often described as "smart brute force". Three kinds matter most:

- **Mathematical bound.** If the remaining target goes negative, this branch cannot succeed —
  \`return\` right away. If the candidates are sorted, break out of the loop as soon as
  \`candidate > remaining\`, because every later candidate is even larger.
- **Cardinality pruning.** If you need exactly \`k\` elements and \`path\` is already longer, back
  out.
- **Duplicate detection.** Sort the input, then skip equal values at the same level. That
  prunes whole sub-trees rather than single branches.

One practical rule: prune **before** recursing, not after. Pruning at the top of the function
body saves the entire cost of the call you would otherwise make.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**Lupa membatalkan pilihan.** Ini kesalahan nomor satu. Kalau \`path.pop()\` hilang,
perjalanan berikutnya mewarisi sisa perjalanan sebelumnya, dan hasilnya berisi kombinasi
yang tidak mungkin. Gejalanya khas: hasilnya benar untuk cabang pertama lalu berantakan
setelahnya. Cara mendeteksinya: cek bahwa panjang \`path\` kembali ke nilai sebelumnya
tepat setelah rekursi — kalau perlu, tambahkan \`console.log\` sementara.

**Menyimpan referensi, bukan salinan.** \`result.push(path)\` menyimpan **pointer** ke array
yang sama. Karena \`path\` terus berubah, semua hasil akan terlihat seperti keadaan akhir
(evaluasi lazy di console browser bisa menyesatkan). Selalu salin:
\`result.push([...path])\` di JavaScript, \`result.append(list(path))\` di Python. Ini juga
berlaku untuk keadaan lain yang kamu mutasi, seperti grid atau array \`used\`.

**Memodifikasi koleksi yang sedang diiterasi.** \`for (const x of path)\` lalu \`path.push(...)\`
di dalamnya membuat iterasi tidak terdefinisi. Jangan menghapus atau menambah elemen ke
koleksi yang sedang diiterasi; mutasi hanya di luar loop, atau iterasikan indeks \`i\` atas
masukan (bukan atas \`path\`).

**Tidak memangkas sehingga lambat.** Backtracking tanpa pemangkasan tetap benar, tapi
kompleksitasnya bisa meledak: jumlah kandidat pangkat kedalaman. Urutkan kandidat lebih dulu
supaya pemangkasan berbasis perbandingan bisa dipakai.

**Salah memilih titik berhenti.** Dua pilihan yang sering tertukar: "berhenti setelah
keputusan lengkap" (subsets, permutations) versus "berhenti ketika syarat terpenuhi"
(combination sum dengan sisa target nol). Salah satu menghasilkan hasil duplikat atau
kehilangan hasil.

**Melupakan \`continue\`/\`break\` di dalam loop.** Setelah melewati nilai kembar, kamu masih
harus memproses indeks yang lain. Menulis \`return\` padahal maksudnya \`continue\` memotong
seluruh sisa loop.

**Menyalin seluruh keadaan di setiap cabang.** Membuat array baru untuk setiap cabang membuat
ruangnya menjadi sebesar jumlah daun. Mutasi satu \`path\` lalu batalkan itu jauh lebih hemat.`,
        en: `**Forgetting to undo.** This is mistake number one. If \`path.pop()\` is missing, the next
walk inherits the leftovers of the previous one and the output contains combinations that
cannot exist. The symptom is distinctive: the first branch looks right and everything after it
is scrambled. To catch it, assert that \`path\` has the same length right after the recursive
call — a temporary \`console.log\` is enough.

**Saving a reference instead of a copy.** \`result.push(path)\` stores a **pointer** to the same
array. Since \`path\` keeps changing, every entry ends up looking like the final state (the
browser console's lazy evaluation can mislead you here). Always copy:
\`result.push([...path])\` in JavaScript, \`result.append(list(path))\` in Python. The same holds
for any other state you mutate, such as the grid or the \`used\` array.

**Mutating a collection while iterating it.** \`for (const x of path)\` with a \`path.push(...)\`
inside makes the iteration undefined. Never add or remove elements from the collection you are
walking; mutate only outside the loop, or iterate over an index \`i\` into the input rather than
over \`path\`.

**Not pruning, so it is too slow.** Backtracking without pruning is still correct, but its cost
can explode: branching factor to the power of depth. Sort the candidates first so that
comparison-based pruning becomes possible.

**Choosing the wrong stopping point.** Two options are easily confused: "stop once the decision
is complete" (subsets, permutations) versus "stop when the requirement is met" (combination sum
with a remaining target of zero). Picking the wrong one yields duplicates or drops results.

**Forgetting to keep looping after a skip.** After skipping equal values you still have to
process the remaining indices. Writing \`return\` where you meant \`continue\` cuts off the whole
rest of the loop.

**Copying the entire state in every branch.** Building a fresh array per branch makes the space
cost proportional to the number of leaves. Mutating one \`path\` and undoing it is far cheaper.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Backtracking = **pohon keputusan** + tiga langkah: pilih, jelajahi, **batalkan**.
- Kerangkanya hampir selalu sama. Yang kamu sesuaikan hanya cara memangkas dan cara menyimpan
  hasil.
- Kalau soal meminta **semua** jawaban, curigai backtracking. Kalau meminta jumlah atau
  optimum, curigai pemrograman dinamis atau greedy.
- Rumus kasar biayanya: \`(jumlah cabang) ^ kedalaman\` sebelum pemangkasan. Sebutkan angka itu
  saat menjelaskan kompleksitas, lalu jelaskan mengapa pemangkasan menurunkannya.
- Salin hasil sebelum menyimpan: \`[...path]\` atau \`list(path)\`.
- Penandaan di tempat (\`board[r][c] = '#'\`) adalah cara standar menandai sel yang sedang
  dipakai pada pencarian di grid.
- Rekursi bisa diganti stack eksplisit, tapi versi rekursif hampir selalu lebih mudah dibaca —
  dan kedalaman rekursi yang wajar biasanya masih aman.

## Latihan yang disarankan

Kerjakan berurutan; masing-masing menambahkan satu ide baru di atas yang sebelumnya.

1. **Subsets** — bentuk paling telanjang dari pola ini: setiap node adalah jawaban, tanpa
   syarat tambahan.
2. **Permutations** — memperkenalkan array \`used\` karena urutan penting dan setiap elemen
   harus dipakai tepat sekali.
3. **Combination Sum** — memperkenalkan pemangkasan berbasis sisa target dan aturan "elemen
   yang sama boleh dipakai berulang" (rekursi memakai \`i\`, bukan \`i + 1\`).
4. **Letter Combinations of a Phone Number** — memperkenalkan rekursi atas **beberapa daftar
   pilihan**, satu per posisi.
5. **Word Search** — memindahkan semuanya ke grid 2D, dengan penandaan di tempat dan
   pembatalan penandaan.`,
        en: `- Backtracking = a **decision tree** plus three steps: choose, explore, **undo**.
- The skeleton is almost always the same. You only adjust how you prune and how you store the
  result.
- If a problem asks for **every** answer, suspect backtracking. If it asks for a count or an
  optimum, suspect dynamic programming or greedy.
- A rough cost formula: \`(number of branches) ^ depth\` before pruning. Quote that figure when
  you explain the complexity, then explain how pruning lowers it.
- Copy before storing: \`[...path]\` or \`list(path)\`.
- In-place marking (\`board[r][c] = '#'\`) is the standard way to mark a cell as currently used
  during a grid search.
- Recursion can be replaced by an explicit stack, but the recursive version is nearly always
  easier to read — and reasonable recursion depth is usually safe.

## Suggested practice

Work through them in order; each one adds a single new idea on top of the previous.

1. **Subsets** — the naked form of the pattern: every node is an answer, with no extra
   requirement.
2. **Permutations** — introduces the \`used\` array, because order matters and every element must
   appear exactly once.
3. **Combination Sum** — introduces pruning on the remaining target and the "the same element
   may be reused" rule (recursion passes \`i\`, not \`i + 1\`).
4. **Letter Combinations of a Phone Number** — introduces recursion over **several option
   lists**, one per position.
5. **Word Search** — moves everything onto a 2D grid, with in-place marking and unmarking.`,
      },
    },
  ],
  problemSlugs: [
    'subsets',
    'permutations',
    'combination-sum',
    'letter-combinations-of-a-phone-number',
    'word-search',
  ],
};
