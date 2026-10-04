import type { Track } from '~/types/content';

export const linkedList: Track = {
  id: 'linked-list',
  order: 6,
  title: {
    id: 'Linked List',
    en: 'Linked List',
  },
  summary: {
    id: 'Menguasai node, pointer, dan tiga pola wajibnya: dummy head, dua pointer slow-fast, serta pembalikan di tempat.',
    en: 'Master nodes, pointers, and the three must-know patterns: dummy head, slow-fast two pointers, and in-place reversal.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa linked list masih ditanya',
        en: 'Why linked lists are still asked about',
      },
      body: {
        id: `Linked list lebih tua dari hampir semua teknologi yang kamu pakai sekarang. Jarang ada
produk baru yang memilihnya sebagai struktur data utama, jadi wajar kalau kamu bertanya
kenapa topik ini masih muncul di hampir setiap interview algoritma.

Jawabannya: linked list bukan soal "struktur data apa yang dipakai di produksi", tapi soal
**cara kamu berpikir tentang referensi**.

## Apa yang sebenarnya diukur

1. **Manipulasi pointer.** Mengubah \`next\` berarti memindahkan satu ujung rantai. Kalau
   kamu menimpa \`next\` sebelum menyimpan penerusnya, sisa list hilang tanpa pesan error.
   Interviewer ingin melihat apakah kamu sadar urutan operasinya.
2. **Penalaran spasial.** Pertanyaan seperti "sekarang \`slow\` ada di node mana?" tidak bisa
   dijawab dengan hafalan; kamu harus melacaknya. Kandidat yang menggambar node di kertas
   menyelesaikan soal ini jauh lebih cepat.
3. **Analisis trade-off yang jujur.** Menyisipkan di depan memang O(1), tapi mencari node
   ke-i adalah O(n). Interviewer sering memancing di titik ini untuk melihat apakah kamu
   menyebut harga yang dibayar, bukan cuma rumusnya.
4. **Rekursi.** Reverse linked list adalah contoh terkecil yang membuat perbedaan loop dan
   rekursi benar-benar terasa, termasuk biaya stack O(n) yang membuat ruangnya tidak lagi
   konstan.

## Kenapa latihannya tetap layak

Pola yang kamu latih di sini muncul di topik lain: **slow & fast** untuk deteksi siklus
adalah versi satu dimensi dari pencarian siklus pada graf, dan **dummy head** adalah
sentinel node yang juga dipakai saat menggabungkan atau memotong struktur apa pun.

## Bagaimana linked list muncul di platform ini

Semua input dan output di sini harus bisa dikirim sebagai JSON, jadi tidak ada pointer dan
tidak ada objek kustom. Linked list **ditulis sebagai array**: \`[1,2,3]\` berarti
\`1 → 2 → 3\`.

Artinya setiap soal punya tiga langkah tetap:

1. Fungsi menerima array.
2. Bangun linked list dari array itu memakai kelas \`ListNode\` yang kamu definisikan di
   dalam kode.
3. Proses linked list-nya, lalu kembalikan hasil sebagai array lagi.

Kedengarannya tambahan pekerjaan, dan memang begitu. Kabar baiknya: membangun dan
menelusuri rantai node dari array adalah latihan yang persis sama dengan bagian tersulit
soal interview yang asli.`,
        en: `Linked lists are older than almost every technology you use today. Few new products pick
them as their primary data structure, so it is fair to ask why the topic still shows up in
nearly every algorithm interview.

The answer: linked lists are not about "which data structure does production use", they are
about **how you reason about references**.

## What is actually being measured

1. **Pointer manipulation.** Changing \`next\` moves the end of a chain. If you overwrite
   \`next\` before saving the successor, the rest of the list disappears with no error
   message. The interviewer wants to see whether you know the order of operations.
2. **Spatial reasoning.** Questions like "where is \`slow\` right now?" cannot be answered
   from memory; you have to trace it. Candidates who draw the nodes on paper finish these
   problems far faster.
3. **Honest trade-off analysis.** Inserting at the front is O(1), but reaching the i-th node
   is O(n). Interviewers poke at exactly this to see whether you name the cost you pay
   instead of reciting formulas.
4. **Recursion.** Reversing a linked list is the smallest example where the difference
   between a loop and recursion truly shows, including the O(n) stack cost that stops the
   space from being constant.

## Why the practice is still worth it

The patterns you train here show up elsewhere: **slow & fast** cycle detection is the
one-dimensional version of cycle finding in graphs, and **dummy head** is the sentinel node
used whenever you merge or cut any structure.

## How linked lists appear on this platform

Every input and output here has to be JSON, so there are no pointers and no custom objects.
A linked list is **written as an array**: \`[1,2,3]\` means \`1 → 2 → 3\`.

So every problem has the same three steps:

1. Your function receives an array.
2. You build a linked list from it using a \`ListNode\` class you define inside your code.
3. You process the list, then return the result as an array again.

That sounds like extra work, and it is. The good news: building and traversing a chain of
nodes from an array is exactly the skill that the hard part of the original interview
problem tests.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Node dan pointer dari nol',
        en: 'Nodes and pointers from scratch',
      },
      body: {
        id: `## Node: satu nilai, satu penunjuk

Linked list adalah rantai **node**. Setiap node menyimpan dua hal: nilainya (\`val\`) dan
referensi ke node berikutnya (\`next\`). Node terakhir menyimpan \`null\` sebagai penanda
akhir rantai.

\`\`\`js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
\`\`\`

\`\`\`python
class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next
\`\`\`

Perhatikan bahwa \`next\` menyimpan **referensi**, bukan salinan nilai. Dua variabel bisa
menunjuk ke node yang sama, dan mengubah \`next\` lewat satu variabel mengubah rantai yang
dilihat variabel lainnya. Ganti \`val\` node lewat salah satu variabel pun terlihat oleh
yang lain — inilah yang membuat soal "deteksi siklus" bisa dijawab tanpa memori tambahan.

## Membangun list dari array

Karena input di platform ini berupa array, langkah pertama setiap soal adalah menyambung
node satu per satu. Trik paling rapi adalah **dummy head**: satu node buatan yang tidak
pernah dikembalikan, hanya dipakai sebagai tempat berpijak.

\`\`\`js
function buildList(values) {
  const dummy = new ListNode(0);
  let tail = dummy;

  for (const value of values) {
    tail.next = new ListNode(value);
    tail = tail.next;
  }

  return dummy.next;
}
\`\`\`

Bandingkan dengan versi tanpa dummy: kamu butuh cabang khusus untuk node pertama (\`head\`
masih kosong), dan setiap cabang adalah tempat bug bersembunyi. Perhatikan juga bahwa
\`dummy.next\` adalah kepala list, sedangkan \`dummy\` sendiri bukan bagian dari hasil.

## Menelusuri kembali ke array

\`\`\`js
function toArray(head) {
  const result = [];
  let node = head;

  while (node !== null) {
    result.push(node.val);
    node = node.next;
  }

  return result;
}
\`\`\`

Loop berhenti di \`null\`. Terlihat sepele sampai kamu harus memutuskan kondisi berhenti
untuk dua pointer — di sana "node terakhir" dan "\`null\`" bukan hal yang sama, dan itulah
sumber kesalahan off-by-one yang paling umum.

## Array vs linked list

| Operasi | Array | Linked list (referensi node sudah dipegang) |
| --- | --- | --- |
| Akses elemen ke-i | O(1) | O(n) |
| Sisip/hapus di awal | O(n) | O(1) |
| Sisip/hapus setelah node yang diketahui | O(n) | O(1) |
| Mencari nilai tertentu | O(n) | O(n) |
| Memori per elemen | lebih padat (kontigu) | lebih besar (nilai + pointer) |

Kesimpulannya bukan "linked list lebih cepat", tapi "linked list lebih murah begitu kamu
memegang posisinya". Karena itu soal interview biasanya memberimu posisi, atau memintamu
menemukannya dengan dua pointer.

## Satu pegangan, tidak ada jalan pintas

\`head\` biasanya satu-satunya pegangan ke seluruh list. Begitu kamu menimpanya atau memutus
\`next\` sebelum menyimpan penerusnya, sisa list menjadi memori yang tidak bisa dijangkau
lagi. Kebiasaan yang menyelamatkan: **simpan penerus dulu, baru ubah pointer**.`,
        en: `## A node: one value, one pointer

A linked list is a chain of **nodes**. Each node holds two things: its value (\`val\`) and a
reference to the next node (\`next\`). The last node stores \`null\` to mark the end of the
chain.

\`\`\`js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
\`\`\`

\`\`\`python
class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next
\`\`\`

Note that \`next\` holds a **reference**, not a copy of a value. Two variables can point at
the same node, and changing \`next\` through one variable changes the chain that the other
variable sees. Mutating a node's \`val\` through either variable is visible from the other
too — that is exactly what lets cycle detection work without extra memory.

## Building a list from an array

Since input here arrives as an array, the first step of every problem is linking nodes one
by one. The cleanest trick is the **dummy head**: a throwaway node that is never returned,
used purely as a place to stand.

\`\`\`js
function buildList(values) {
  const dummy = new ListNode(0);
  let tail = dummy;

  for (const value of values) {
    tail.next = new ListNode(value);
    tail = tail.next;
  }

  return dummy.next;
}
\`\`\`

Compare that with a version without the dummy: you need a special branch for the very first
node (because \`head\` is still empty), and every branch is a place for bugs. Notice also
that \`dummy.next\` is the head of the list while \`dummy\` itself is not part of the result.

## Walking back to an array

\`\`\`js
function toArray(head) {
  const result = [];
  let node = head;

  while (node !== null) {
    result.push(node.val);
    node = node.next;
  }

  return result;
}
\`\`\`

The loop stops at \`null\`. That looks trivial until you have to pick a stopping condition
for two pointers — there, "the last node" and "\`null\`" are not the same thing, and that is
where the most common off-by-one bugs come from.

## Array vs linked list

| Operation | Array | Linked list (with a node reference in hand) |
| --- | --- | --- |
| Access the i-th element | O(1) | O(n) |
| Insert/delete at the front | O(n) | O(1) |
| Insert/delete after a known node | O(n) | O(1) |
| Find a particular value | O(n) | O(n) |
| Memory per element | tighter (contiguous) | larger (value + pointer) |

The conclusion is not "linked lists are faster" but "linked lists are cheaper once you hold
the position". That is why interview problems either hand you a position or make you find
it with two pointers.

## One handle, no shortcuts

\`head\` is usually the only handle on the whole list. The moment you overwrite it or cut
\`next\` before saving the successor, the rest of the list becomes unreachable memory. The
habit that saves you: **save the successor first, then rewire**.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Pola wajib linked list',
        en: 'The essential linked list patterns',
      },
      body: {
        id: `Empat pola inti berikut (plus satu bonus) menutup hampir semua soal linked list
tingkat interview.

## 1. Dummy head (node sentinel)

Buat node buatan di depan, kerjakan semuanya dengan berpijak padanya, lalu kembalikan
\`dummy.next\`. Pola ini dipakai ketika **hasilnya adalah list baru** (menggabungkan,
memfilter, mempartisi) atau ketika **node pertama bisa ikut berubah atau terhapus**.

Tanpa dummy, "hapus node pertama" selalu jadi kasus khusus yang butuh \`if\` tambahan, dan
di situlah bug paling sering muncul.

## 2. Dua pointer berkecepatan berbeda (slow & fast)

\`slow\` bergerak satu langkah, \`fast\` dua langkah. Dari satu lintasan ini kamu dapat tiga
jawaban berbeda:

- **Mencari tengah.** Saat \`fast\` sampai ujung, \`slow\` berada di tengah — atau di tengah
  kedua kalau jumlah node genap. Waktu O(n), ruang O(1).
- **Deteksi siklus (Floyd).** Kalau ada siklus, \`fast\` akan menyusul \`slow\` dan keduanya
  bertemu pada node yang sama. Kalau tidak ada, \`fast\` berhenti di \`null\`. Sekali lagi
  O(n) waktu, O(1) ruang — inilah jawaban yang diharapkan, bukan hash set O(n).
- **Mencari node ke-n dari belakang.** Jauhkan kedua pointer sejauh \`n\`, lalu geser
  keduanya bersamaan; ketika yang depan sampai ujung, yang belakang tepat sebelum sasaran.

## 3. Dua pointer berjarak tetap

Ini varian slow & fast yang paling sering ditanya untuk "hapus node ke-n dari belakang".
Kuncinya: **kunci jaraknya dulu dengan loop terpisah**, baru jalankan keduanya bersamaan.
Mencoba menghitung jarak sambil berjalan hampir selalu berakhir dengan off-by-one.

\`\`\`js
let fast = dummy;
let slow = dummy;

for (let i = 0; i < n; i++) {
  fast = fast.next; // kunci jarak n langkah
}

while (fast.next !== null) {
  fast = fast.next;
  slow = slow.next; // keduanya berjalan bersamaan
}
\`\`\`

## 4. Pembalikan di tempat

Hanya butuh tiga variabel: \`prev\`, \`current\`, dan \`next\`.

\`\`\`js
let prev = null;
let current = head;

while (current !== null) {
  const next = current.next; // 1. simpan penerus dulu
  current.next = prev;       // 2. baru putus dan balik arahnya
  prev = current;            // 3. majukan prev
  current = next;            // 4. majukan current
}

return prev; // current kini null, prev adalah kepala baru
\`\`\`

Empat langkah itu tidak bisa ditukar. Kalau langkah 2 dijalankan lebih dulu, sisa list
hilang. Waktu O(n), ruang O(1) — dan itu sebabnya soal ini sering dipakai sebagai pemanasan
sekaligus penyaring.

## 5. Bonus: rekursi

Reverse dan merge juga bisa ditulis rekursif: selesaikan ekornya dulu, lalu perbaiki satu
pointer saat kembali. Kodenya lebih pendek, tetapi setiap panggilan tertahan di stack
sehingga ruangnya O(n). Untuk list panjang itu berujung stack overflow. Sebutkan trade-off
ini di interview — ini nilai tambah yang mudah didapat.`,
        en: `The four core patterns below (plus a bonus) cover almost every interview-level linked
list problem.

## 1. Dummy head (sentinel node)

Create a throwaway node at the front, do all your work from that foothold, and return
\`dummy.next\`. Use it when **the answer is a new list** (merging, filtering, partitioning)
or when **the first node can change or be removed**.

Without a dummy, "remove the first node" is always a special case that needs an extra
\`if\`, and that is where bugs love to hide.

## 2. Two pointers at different speeds (slow & fast)

\`slow\` moves one step, \`fast\` moves two. That single pass answers three different
questions:

- **Find the middle.** When \`fast\` reaches the end, \`slow\` sits on the middle — or on the
  second middle when the node count is even. O(n) time, O(1) space.
- **Detect a cycle (Floyd).** If a cycle exists, \`fast\` catches up with \`slow\` and they
  meet on the same node. If not, \`fast\` stops at \`null\`. Again O(n) time and O(1) space —
  that is the expected answer, not an O(n) hash set.
- **Find the n-th node from the end.** Separate the pointers by \`n\`, then move them
  together; when the front one hits the end, the back one is right before the target.

## 3. Two pointers at a fixed gap

This is the slow & fast variant most often asked as "remove the n-th node from the end".
The key: **lock the gap first in its own loop**, then advance both together. Trying to
count the gap while walking almost always ends in an off-by-one.

\`\`\`js
let fast = dummy;
let slow = dummy;

for (let i = 0; i < n; i++) {
  fast = fast.next; // lock the gap at n steps
}

while (fast.next !== null) {
  fast = fast.next;
  slow = slow.next; // both move together
}
\`\`\`

## 4. In-place reversal

It takes just three variables: \`prev\`, \`current\`, and \`next\`.

\`\`\`js
let prev = null;
let current = head;

while (current !== null) {
  const next = current.next; // 1. save the successor first
  current.next = prev;       // 2. only then cut and flip the link
  prev = current;            // 3. advance prev
  current = next;            // 4. advance current
}

return prev; // current is null now, prev is the new head
\`\`\`

Those four steps cannot be reordered. Run step 2 first and the rest of the list is gone.
O(n) time, O(1) space — which is why this problem works both as a warm-up and as a filter.

## 5. Bonus: recursion

Reverse and merge can be written recursively too: solve the tail first, then fix one pointer
on the way back. The code is shorter, but every call stays on the stack, so space is O(n).
On a long list that ends in a stack overflow. Mention this trade-off in an interview — it
is cheap extra credit.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `## 1. Kehilangan referensi

Kesalahan paling mahal, dan paling sulit dilacak karena tidak melempar error apa pun:

\`\`\`js
current.next = prev;      // sisa list masih terjangkau? Tidak, sudah ditimpa
current = current.next;   // sekarang menunjuk ke belakang, bukan ke depan
\`\`\`

Perbaikannya selalu sama: \`const next = current.next;\` **sebelum** menimpa \`next\`.

## 2. Dereference null

\`fast.next.next\` hanya aman kalau \`fast\` **dan** \`fast.next\` bukan \`null\`. Karena \`&&\`
berhenti di kondisi pertama yang salah, urutan ini benar:

\`\`\`js
while (fast !== null && fast.next !== null) { ... }
\`\`\`

Menukar urutannya (\`fast.next !== null && fast !== null\`) tetap meledak pada list kosong,
karena bagian pertama sudah membaca \`fast.next\` dari \`null\`.

## 3. Lupa menyimpan \`next\` sebelum memutus rantai

Bentuk lain dari nomor 1, muncul saat menghapus node: menulis \`node.next = node.next.next\`
padahal \`node.next\` bisa \`null\`. Simpan dulu penerusnya di variabel, baru sambung ulang.
Gunakan dummy head agar kasus "hapus node pertama" tidak jadi pengecualian.

## 4. Berhenti satu langkah terlalu cepat atau terlalu lambat

Untuk "hapus node ke-n dari belakang", jarak awal menentukan apakah pointer belakang
berhenti **di** node sasaran atau **sebelumnya**. Kamu ingin berhenti sebelumnya, karena
kamu harus mengubah \`next\` milik node sebelumnya. Kalau ragu, gambar dua node kecil di
kertas dan jalankan loop-nya sekali secara manual.

## 5. Membandingkan nilai, bukan identitas node

Deteksi siklus harus membandingkan **node**, bukan \`val\`. Dua node dengan nilai sama tetap
dua node berbeda: list \`[5,5,5]\` tanpa siklus tidak boleh dilaporkan bersiklus. Di
JavaScript bandingkan dengan \`===\`, di Python dengan \`is\`.

## 6. Mengembalikan kepala yang salah

Setelah pembalikan, kepala baru adalah \`prev\`, bukan \`current\` (yang sudah \`null\`).
Setelah memakai dummy head, kepala hasilnya adalah \`dummy.next\`, bukan \`dummy\`. Kedua
kesalahan ini menghasilkan output yang aneh tapi tidak error, jadi pemeriksaannya harus
sadar.

## 7. Mengubah list sambil melacaknya

Di soal seperti mencari titik tengah, jangan memodifikasi pointer apa pun. Kalau node yang
sedang kamu lacak ikut kamu ubah, traversal berikutnya membaca rantai yang berbeda. Kalau
ragu, pegang referensi di variabel terpisah dan perlakukan list sebagai read-only.

## 8. Lupa mengembalikan array

Karena representasi di platform ini adalah array, mengembalikan node (objek) akan gagal
dibandingkan. Telusuri hasilnya dengan \`toArray\` sebelum return.`,
        en: `## 1. Losing a reference

The most expensive mistake, and the hardest to trace because it throws nothing:

\`\`\`js
current.next = prev;      // is the rest of the list still reachable? No, it was overwritten
current = current.next;   // now it points backwards, not forwards
\`\`\`

The fix is always the same: \`const next = current.next;\` **before** you overwrite \`next\`.

## 2. Dereferencing null

\`fast.next.next\` is only safe when \`fast\` **and** \`fast.next\` are not \`null\`. Because
\`&&\` short-circuits on the first falsy condition, this order is correct:

\`\`\`js
while (fast !== null && fast.next !== null) { ... }
\`\`\`

Swap the order (\`fast.next !== null && fast !== null\`) and it still blows up on an empty
list, because the first part already reads \`fast.next\` off \`null\`.

## 3. Forgetting to save \`next\` before cutting the chain

Another shape of the first trap, and it shows up during deletion: writing
\`node.next = node.next.next\` when \`node.next\` may be \`null\`. Save the successor in a
variable first, then re-link. Use a dummy head so that "remove the first node" is not a
special case.

## 4. Stopping one step too early or too late

For "remove the n-th node from the end", the initial gap decides whether the back pointer
stops **on** the target node or **before** it. You want before it, because you must change
the previous node's \`next\`. When in doubt, draw two small nodes on paper and run the loop
by hand once.

## 5. Comparing values instead of node identity

Cycle detection must compare **nodes**, not \`val\`. Two nodes with equal values are still
two different nodes: the list \`[5,5,5]\` with no cycle must not be reported as cyclic. In
JavaScript compare with \`===\`, in Python with \`is\`.

## 6. Returning the wrong head

After a reversal the new head is \`prev\`, not \`current\` (which is \`null\`). After using a
dummy head, the resulting head is \`dummy.next\`, not \`dummy\`. Both mistakes produce
strange-looking output instead of an error, so you have to check for them deliberately.

## 7. Mutating the list while tracing it

In problems like finding the middle, do not modify a single pointer. If a node you are
tracking changes, the next traversal walks a different chain. When unsure, hold the
reference in a separate variable and treat the list as read-only.

## 8. Forgetting to return an array

Because the representation on this platform is an array, returning a node (an object) will
fail the comparison. Walk the result through \`toArray\` before returning.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `## Ringkasan

- Node = \`{ val, next }\`, dan rantai berakhir di \`null\`.
- Aturan pertama setiap iterasi: **simpan penerus dulu**, baru ubah pointer.
- Tiga pola yang harus keluar otomatis: **dummy head** untuk hasil baru atau penghapusan
  kepala, **slow & fast** untuk tengah/siklus/node ke-n dari belakang, dan
  **prev/current/next** untuk pembalikan di tempat.
- Kompleksitas yang paling sering diminta: tengah dan deteksi siklus O(n) waktu / O(1)
  ruang; pembalikan O(n) / O(1); merge dua list terurut O(n + m) / O(1) tambahan.
- Kondisi aman saat melangkah dua kali: \`fast !== null && fast.next !== null\`.
- Di platform ini linked list datang dan pergi sebagai array, jadi kuasai juga
  \`buildList\` dan \`toArray\`.

## Checklist sebelum menekan submit

1. Apakah list kosong dan list satu node sudah kamu pikirkan?
2. Apakah node pertama bisa berubah atau terhapus? Kalau ya, pakai dummy head.
3. Apakah kamu mengubah \`next\` sebelum menyimpan penerusnya?
4. Apakah loop-mu berhenti di node terakhir, atau butuh berhenti di \`null\`?
5. Apakah fungsi mengembalikan **array**, bukan node?

## Latihan yang disarankan

Kerjakan berurutan, karena setiap soal menambah satu keterampilan baru:

1. **Reverse Linked List** — urutan \`prev/current/next\` dan membangun list dari array.
2. **Merge Two Sorted Lists** — pola dummy head plus penanganan list kosong.
3. **Middle of Linked List** — slow & fast pertama; di sini kondisi berhenti \`fast\` dilatih.
4. **Remove Nth Node From End** — dua pointer berjarak tetap sekaligus kasus hapus kepala.
5. **Linked List Cycle** — deteksi siklus Floyd; \`pos\` hanya dipakai saat membangun list
   untuk pengujian, bukan untuk menelusurinya.`,
        en: `## Summary

- A node is \`{ val, next }\`, and a chain ends at \`null\`.
- The first rule of every iteration: **save the successor first**, then rewire.
- Three patterns should come out automatically: **dummy head** for a new result list or for
  head removal, **slow & fast** for the middle/cycles/n-th from the end, and
  **prev/current/next** for in-place reversal.
- The complexity answers interviewers ask for most: middle and cycle detection O(n) time /
  O(1) space; reversal O(n) / O(1); merging two sorted lists O(n + m) / O(1) extra.
- The safe condition before a double step: \`fast !== null && fast.next !== null\`.
- On this platform linked lists arrive and leave as arrays, so know \`buildList\` and
  \`toArray\` as well.

## Checklist before hitting submit

1. Have you thought about the empty list and the single-node list?
2. Can the first node change or be removed? If so, use a dummy head.
3. Are you overwriting \`next\` before saving the successor?
4. Does your loop stop at the last node, or does it need to stop at \`null\`?
5. Does the function return an **array**, not a node?

## Suggested practice

Work through them in order, because each problem adds one new skill:

1. **Reverse Linked List** — the \`prev/current/next\` order and building a list from an array.
2. **Merge Two Sorted Lists** — the dummy head pattern plus empty-list handling.
3. **Middle of Linked List** — your first slow & fast; this is where the \`fast\` stopping
   condition gets trained.
4. **Remove Nth Node From End** — fixed-gap two pointers together with head removal.
5. **Linked List Cycle** — Floyd's cycle detection; \`pos\` is only used while building the
   test list, never while traversing it.`,
      },
    },
  ],
  problemSlugs: [
    'reverse-linked-list',
    'merge-two-sorted-lists',
    'middle-of-linked-list',
    'remove-nth-node-from-end',
    'linked-list-cycle',
  ],
};
