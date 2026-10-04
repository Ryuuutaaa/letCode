import type { Track } from '~/types/content';

export const heap: Track = {
  id: 'heap',
  order: 8,
  title: {
    id: 'Heap / Priority Queue',
    en: 'Heap / Priority Queue',
  },
  summary: {
    id: 'Menyimpan data dengan urutan sebagian saja: selalu tahu elemen terbesar atau terkecil tanpa mengurutkan seluruhnya.',
    en: 'Keep a partial order only: always know the largest or smallest element without sorting everything.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa heap dipakai (dan kapan kamu tidak memerlukannya)',
        en: 'Why heaps matter (and when you do not need one)',
      },
      body: {
        id: `Sampai di sini kamu sudah punya array, hash map, dan pengurutan. Pertanyaan
berikutnya: **apakah kamu benar-benar butuh seluruh data terurut?**

Biasanya tidak. Kamu hanya perlu jawaban atas satu pertanyaan kecil, berulang kali:
"siapa yang paling besar sekarang?". Contohnya:

- ambil \`k\` elemen terbesar dari sejuta data;
- selalu ambil dua elemen terkecil, gabungkan, lalu masukkan hasilnya kembali;
- kerjakan tugas yang paling sering muncul lebih dulu supaya total jedanya minimal.

Mengurutkan seluruh data memakan O(n log n) dan memaksa kamu menyentuh semua elemen,
padahal yang kamu pakai hanya sebagian kecil. Heap menjawab "siapa yang paling
besar/terkecil" dalam **O(1)**, dan memperbarui jawabannya dalam **O(log n)**.

Tiga alasan heap muncul terus di interview:

1. **Data mengalir (streaming).** Kalau elemen datang satu per satu, kamu tidak bisa
   mengurutkan "seluruh data" karena sisanya belum ada. Heap memperbarui jawabannya
   sambil jalan, dengan memori yang hanya sebesar \`k\` elemen kalau memang itu yang
   dibutuhkan.
2. **Kamu hanya butuh urutan sebagian.** Untuk mencari \`k\` terkecil dari \`n\` elemen,
   heap berukuran \`k\` memberi O(n log k) — jauh lebih ringan daripada O(n log n) saat
   \`k\` kecil dibanding \`n\`.
3. **Greedy butuh "yang terbaik saat ini".** Banyak algoritma greedy berbunyi: ambil
   pilihan terbaik yang tersedia, ubah keadaan, ulangi. Heap adalah cara standar untuk
   mengambil pilihan itu, dan sekaligus menaruh hasil perubahan kembali ke dalam antrean.

Kapan heap **bukan** jawabannya:

- \`n\` kecil (katakanlah di bawah beberapa ribu). Mengurutkan sekali lalu membaca dari
  ujung biasanya lebih cepat, lebih pendek, dan lebih sulit salah. Konstanta operasi heap
  cukup besar, apalagi kalau kamu menulis heap-nya sendiri di JavaScript.
- Kamu memang perlu **seluruh urutan**, bukan hanya ujungnya. Itu pekerjaan pengurutan.
- Kamu hanya perlu elemen terbaik **satu kali** dan datanya sudah ada semua. Satu
  lintasan O(n) sudah cukup; heap malah menambah kerja.

Jadi posisi heap: alat untuk **urutan sebagian yang berubah terus**, bukan pengganti
pengurutan.`,
        en: `By now you have arrays, hash maps, and sorting. The next question is: **do you really
need the data to be fully sorted?**

Usually not. All you need is the answer to one small question, over and over: "who is the
largest right now?". For example:

- take the \`k\` largest elements out of a million;
- repeatedly take the two smallest values, combine them, and put the result back;
- run the most frequent task first so that the total idle time is minimal.

Sorting everything costs O(n log n) and forces you to touch every element, even though you
only consume a small part of it. A heap answers "who is the largest/smallest" in **O(1)**
and updates that answer in **O(log n)**.

Three reasons heaps keep coming up in interviews:

1. **The data streams in.** If elements arrive one at a time you cannot sort "everything",
   because the rest does not exist yet. A heap updates its answer as it goes, using memory
   proportional to \`k\` when that is all you need.
2. **You only need a partial order.** To find the \`k\` smallest out of \`n\` elements, a heap
   of size \`k\` gives O(n log k) — much lighter than O(n log n) when \`k\` is small next to
   \`n\`.
3. **Greedy needs "the best right now".** Many greedy algorithms read: take the best choice
   available, change the state, repeat. A heap is the standard way to take that choice and
   to put the updated state back into the queue.

When a heap is **not** the answer:

- \`n\` is small (say a few thousand or less). Sorting once and reading from one end is
  usually faster, shorter, and harder to get wrong. Heap operations have real constants,
  especially when you write the heap yourself in JavaScript.
- You genuinely need the **whole order**, not just one end. That is sorting's job.
- You need the best element **once** and all the data is already available. A single O(n)
  pass is enough; a heap only adds work.

So the place of a heap is: a tool for a **partial order that keeps changing**, not a
replacement for sorting.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Konsep heap dan operasi dasarnya',
        en: 'Heap concepts and its basic operations',
      },
      body: {
        id: `## Bentuknya: pohon lengkap di dalam array

Binary heap adalah pohon biner **lengkap** (semua level penuh, kecuali level terakhir
yang terisi dari kiri) yang disimpan dalam satu array. Karena bentuknya teratur, posisi
anak dan induk bisa dihitung tanpa pointer:

- anak kiri dari indeks \`i\`: \`2 * i + 1\`
- anak kanan dari indeks \`i\`: \`2 * i + 2\`
- induk dari indeks \`i\`: \`(i - 1) >> 1\`

**Sifat heap (min-heap):** setiap induk lebih kecil atau sama dengan anak-anaknya. Yang
**tidak** dijanjikan: hubungan antara anak kiri dan anak kanan. Jadi heap hanya menyimpan
**urutan parsial** — akarnya pasti elemen terkecil, tapi sisa array-nya berantakan. Itulah
rahasia kenapa heap murah: dia tidak pernah menyelesaikan pekerjaan yang tidak kamu minta.

## Tiga operasi dasar

- **\`push(value)\`** — taruh nilai di ujung array, lalu **sift up**: tukar dengan induknya
  selama masih lebih kecil dari induk. Berhenti di posisi yang benar. O(log n), karena
  tinggi pohon adalah O(log n).
- **\`pop()\`** — simpan akar sebagai hasil, pindahkan elemen terakhir ke posisi akar,
  panjang array dikurangi satu, lalu **sift down**: tukar dengan anak terkecil selama
  masih lebih besar dari anak itu. O(log n).
- **\`peek()\`** — baca akar tanpa mengubah apa pun. O(1).

| Operasi | Waktu |
| --- | --- |
| \`peek\` | O(1) |
| \`push\` | O(log n) |
| \`pop\` | O(log n) |
| membangun heap dari array (Floyd) | O(n) |
| \`n\` kali \`push\` berurutan | O(n log n) |
| heapsort (build + \`n\` kali \`pop\`) | O(n log n) |

Perhatikan baris keempat dan kelima: **membangun heap dari array yang sudah ada hanya
O(n)**, bukan O(n log n). Caranya: anggap array-nya sudah pohon lengkap, lalu sift down
setiap simpul dari tengah array ke belakang (induk terakhir sampai akar). Sebagian besar
simpul ada di level bawah dan hanya turun satu-dua langkah.

## Heap di JavaScript tidak ada bawaannya

Python punya \`heapq\` (min-heap; untuk max-heap simpan nilai **negatif**), Java punya
\`PriorityQueue\`, C++ punya \`priority_queue\`. JavaScript tidak punya priority queue di
lingkungan standard — jadi kalau soal memang butuh heap, kamu menulisnya sendiri, dan
implementasinya pendek:

\`\`\`js
class MinHeap {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  peek() {
    return this.items[0];
  }

  push(value) {
    const items = this.items;
    items.push(value);
    let child = items.length - 1;

    while (child > 0) {
      const parent = (child - 1) >> 1;
      if (items[parent] <= items[child]) break;
      [items[parent], items[child]] = [items[child], items[parent]];
      child = parent;
    }
  }

  pop() {
    const items = this.items;
    const top = items[0];
    const last = items.pop();
    if (items.length === 0) return top;

    items[0] = last;
    let parent = 0;

    for (;;) {
      const left = 2 * parent + 1;
      const right = left + 1;
      let smallest = parent;
      if (left < items.length && items[left] < items[smallest]) smallest = left;
      if (right < items.length && items[right] < items[smallest]) smallest = right;
      if (smallest === parent) return top;
      [items[parent], items[smallest]] = [items[smallest], items[parent]];
      parent = smallest;
    }
  }
}
\`\`\`

Untuk **max-heap** ada dua cara: balik semua perbandingan (ubah \`<=\` menjadi \`>=\` dan
\`<\` menjadi \`>\`), atau simpan angka yang dinegasikan. Cara kedua lebih pendek dan sering
dipakai di kontes, tapi hati-hati saat membaca kembali nilainya: \`-heap.peek()\` adalah
nilai aslinya.

Kalau isi heap bukan angka tunggal, simpan **pasangan** \`[prioritas, data]\` dan
bandingkan hanya elemen pertama. Jangan menaruh objek lalu berharap heap tahu cara
mengurutkannya.`,
        en: `## The shape: a complete tree inside an array

A binary heap is a **complete** binary tree (every level full except the last one, filled
from the left) stored in a single array. Because the shape is regular, child and parent
positions can be computed without pointers:

- left child of index \`i\`: \`2 * i + 1\`
- right child of index \`i\`: \`2 * i + 2\`
- parent of index \`i\`: \`(i - 1) >> 1\`

**Heap property (min-heap):** every parent is less than or equal to its children. What is
**not** promised: any relationship between the left and the right child. So a heap stores
only a **partial order** — the root is definitely the smallest element, but the rest of the
array is jumbled. That is the secret of why heaps are cheap: they never do work you did not
ask for.

## The three basic operations

- **\`push(value)\`** — append the value at the end of the array, then **sift up**: swap it
  with its parent while it is smaller than the parent. Stop when it lands correctly.
  O(log n), because the tree height is O(log n).
- **\`pop()\`** — remember the root as the result, move the last element into the root slot,
  shrink the array by one, then **sift down**: swap with the smaller child while it is
  larger than that child. O(log n).
- **\`peek()\`** — read the root without changing anything. O(1).

| Operation | Time |
| --- | --- |
| \`peek\` | O(1) |
| \`push\` | O(log n) |
| \`pop\` | O(log n) |
| building a heap from an array (Floyd) | O(n) |
| \`n\` sequential \`push\` calls | O(n log n) |
| heapsort (build + \`n\` pops) | O(n log n) |

Look at rows four and five: **building a heap from an existing array is only O(n)**, not
O(n log n). The trick is to treat the array as a complete tree already, then sift down every
node from the middle of the array backwards (last parent down to the root). Most nodes live
near the bottom and only move one or two steps.

## JavaScript has no built-in heap

Python has \`heapq\` (min-heap; store **negated** values for a max-heap), Java has
\`PriorityQueue\`, C++ has \`priority_queue\`. JavaScript ships no priority queue in the
standard environment — so when a problem truly needs one, you write it yourself, and it is
short:

\`\`\`js
class MinHeap {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  peek() {
    return this.items[0];
  }

  push(value) {
    const items = this.items;
    items.push(value);
    let child = items.length - 1;

    while (child > 0) {
      const parent = (child - 1) >> 1;
      if (items[parent] <= items[child]) break;
      [items[parent], items[child]] = [items[child], items[parent]];
      child = parent;
    }
  }

  pop() {
    const items = this.items;
    const top = items[0];
    const last = items.pop();
    if (items.length === 0) return top;

    items[0] = last;
    let parent = 0;

    for (;;) {
      const left = 2 * parent + 1;
      const right = left + 1;
      let smallest = parent;
      if (left < items.length && items[left] < items[smallest]) smallest = left;
      if (right < items.length && items[right] < items[smallest]) smallest = right;
      if (smallest === parent) return top;
      [items[parent], items[smallest]] = [items[smallest], items[parent]];
      parent = smallest;
    }
  }
}
\`\`\`

For a **max-heap** there are two routes: flip every comparison (\`<=\` becomes \`>=\`, \`<\`
becomes \`>\`), or store negated numbers. The second is shorter and popular in contests, but
be careful when reading values back: \`-heap.peek()\` is the real value.

If your heap holds more than a bare number, store a **pair** \`[priority, payload]\` and
compare only the first element. Never drop an object in and hope the heap knows how to order
it.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Empat pola utama',
        en: 'The four main patterns',
      },
      body: {
        id: `**1. Top-K (menjaga k kandidat terbaik).** Kamu tidak butuh semua data terurut,
hanya \`k\` teratas. Simpan heap berukuran tepat \`k\`:

- mencari **k terbesar** → pakai **min-heap** berukuran \`k\`;
- mencari **k terkecil** → pakai **max-heap** berukuran \`k\`.

Terasa terbalik, tapi alasannya jelas: yang harus berada di puncak adalah kandidat yang
**paling mungkin dibuang**. Untuk "k terbesar", elemen terkecil di antara \`k\` kandidat
adalah yang paling rentan digantikan pendatang baru — jadi dia yang kita simpan di akar.

Alurnya: \`push\` setiap elemen, lalu kalau ukuran heap melebihi \`k\`, \`pop\`. Setelah semua
elemen diproses, isi heap adalah jawabannya. Biaya O(n log k), memori O(k). Ini juga versi
yang benar untuk data yang mengalir, karena kamu tidak perlu menyimpan seluruh input.

**2. Penggabungan bertahap.** Ambil yang terbaik, ubah, kembalikan ke kumpulan. Dua bentuk
yang sering muncul:

- **k-way merge**: gabungkan \`k\` daftar terurut dengan heap berisi kepala setiap daftar.
  Ambil yang terkecil, lalu masukkan elemen berikutnya dari daftar yang sama. O(N log k)
  untuk N total elemen — jauh lebih baik daripada menyalin semuanya lalu mengurutkan, dan
  ini satu-satunya cara kalau daftarnya berupa stream.
- **ambil dua terbaik lalu gabungkan**: soal seperti melempar batu, menggabungkan tali, atau
  Huffman coding. Ambil dua elemen ekstrem, gabungkan, masukkan hasilnya kembali, ulangi.
  Setiap langkah O(log n), total O(n log n).

**3. Dua heap untuk median (running median).** Satu max-heap menyimpan separuh bawah data,
satu min-heap menyimpan separuh atas. Aturannya: \`max-heap.size === min-heap.size\` atau
\`max-heap.size === min-heap.size + 1\`. Setiap penambahan: taruh di heap yang sesuai, lalu
pindahkan satu elemen ke heap satunya supaya ukurannya tetap seimbang. Mediannya ada di
puncak salah satu heap (atau rata-rata kedua puncak) — O(1) untuk membacanya, O(log n)
untuk menambah. Pola yang sama dipakai untuk median jendela bergeser dan untuk soal
"bagi data menjadi dua bagian seimbang".

**4. Greedy dengan pilihan terbaik berulang.** Ini keluarga terbesar. Ciri soalnya:
keputusan diambil langkah demi langkah, dan di setiap langkah kamu butuh ekstrem dari
kumpulan kandidat yang tersisa. Contoh: penjadwalan tugas dengan cooldown, ruang rapat
terbanyak (heap berisi waktu selesai), mencapai gedung terjauh, menyusun ulang string tanpa
karakter kembar bersebelahan.

Pertanyaan yang harus kamu jawab dulu sebelum memakai heap: **apakah pilihan terbaik
sekarang selalu aman?** Kalau pilihan itu bisa jadi salah dan harus dibatalkan nanti, kamu
butuh DP atau struktur lain, bukan heap.

Catatan praktis: untuk pola top-K, kalau ukuran datanya sedang (beberapa ribu), mengurutkan
seluruh nilai lalu mengambil \`k\` pertama jauh lebih mudah ditulis dan sering lebih cepat.
Heap baru memberi keunggulan nyata saat \`k\` jauh lebih kecil dari \`n\`, datanya mengalir,
atau kamu memang perlu mengambil satu per satu tanpa menunggu data selesai.`,
        en: `**1. Top-K (keeping the k best candidates).** You do not need all the data sorted,
just the top \`k\`. Keep a heap of exactly size \`k\`:

- find the **k largest** → use a **min-heap** of size \`k\`;
- find the **k smallest** → use a **max-heap** of size \`k\`.

It feels backwards, but the reason is clear: whatever sits at the root should be the
candidate **most likely to be discarded**. For "k largest", the smallest element among the
\`k\` candidates is the one most vulnerable to a newcomer — so that is what we keep at the
root.

The loop: \`push\` each element, and whenever the heap grows past \`k\`, \`pop\`. After every
element has been processed, the heap holds the answer. Cost O(n log k), memory O(k). It is
also the version that works on streaming data, because you never need to store the whole
input.

**2. Incremental merging.** Take the best, change it, put it back. Two shapes show up often:

- **k-way merge**: combine \`k\` sorted lists with a heap holding the head of each list.
  Extract the smallest, then push the next element of the same list. O(N log k) for N total
  elements — far better than copying everything and sorting, and the only option when the
  lists are streams.
- **take the two best and combine them**: problems like smashing stones, joining ropes, or
  Huffman coding. Take the two extreme elements, combine them, push the result back, repeat.
  Each step is O(log n), so O(n log n) overall.

**3. Two heaps for the median (running median).** One max-heap holds the lower half of the
data, one min-heap holds the upper half. The invariant: \`maxHeap.size === minHeap.size\` or
\`maxHeap.size === minHeap.size + 1\`. On every insert: put the value in the right heap, then
move one element to the other heap so the sizes stay balanced. The median sits at the top of
one of the heaps (or is the average of both tops) — O(1) to read, O(log n) to insert. The
same pattern drives the sliding-window median and problems that split data into two balanced
parts.

**4. Greedy with a repeated best choice.** This is the biggest family. The signature: you
decide step by step, and at each step you need the extreme of the remaining candidates.
Examples: task scheduling with a cooldown, the most meeting rooms (heap of end times),
reaching the farthest building, rearranging a string so no two identical characters are
adjacent.

The question to answer before reaching for a heap: **is the best choice right now always
safe?** If a choice can turn out wrong and must be undone later, you need DP or another
structure, not a heap.

A practical note on top-K: when the input is moderate (a few thousand), sorting the values
and taking the first \`k\` is far easier to write and often faster. The heap only earns its
keep when \`k\` is much smaller than \`n\`, when the data streams in, or when you truly need
to extract items one at a time before the input finishes.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**1. Memilih heap yang salah untuk top-K.** Ini kesalahan nomor satu. Untuk
mencari **k terbesar**, kamu butuh **min-heap** — bukan max-heap. Max-heap berukuran \`k\`
akan membuang elemen terkecil di antara para kandidat, padahal justru elemen itulah yang
paling sering harus dibuang. Aturannya: puncak heap harus berisi kandidat **yang paling
layak dibuang**, supaya \`pop\` membuang yang benar.

**2. Menaruh hal yang salah ke dalam heap.** Beberapa bentuk yang sering muncul:

- **Angka dibandingkan sebagai string.** \`[10, 9, 100].sort()\` menghasilkan
  \`[10, 100, 9]\` karena JavaScript mengubahnya ke string dulu. Selalu tulis komparator:
  \`.sort((a, b) => a - b)\`.
- **Objek tanpa kunci pembanding.** Heap tidak tahu cara mengurutkan \`{x, y}\`. Simpan
  pasangan \`[prioritas, data]\` atau bandingkan field tertentu dengan komparator eksplisit.
- **Nilai yang diubah setelah masuk heap.** Kalau kamu mengubah field yang dipakai untuk
  mengurutkan sementara elemen itu masih di dalam heap, sifat heap rusak diam-diam dan
  \`peek\` bisa berbohong. Aturannya: \`pop\` dulu, ubah, lalu \`push\` kembali.
- **Priori salah arah.** Untuk k-way merge kamu butuh yang terkecil; untuk penjadwalan kamu
  butuh yang tersisa paling banyak. Pastikan kunci yang kamu masukkan memang yang ingin
  diurutkan, bukan indeksnya.

**3. Kompleksitas: build heap O(n) vs \`push\` satu-satu O(n log n).** Ketika heap-nya
dibuat dari array yang sudah ada, jangan mengulang \`push\` \`n\` kali. Sift down dari tengah
array ke belakang, dan biayanya turun menjadi O(n).

Alasan intuitifnya: setengah simpul adalah daun dan tidak pernah turun sama sekali, seperempat
simpul turun paling banyak satu langkah, dan hanya akar yang bisa turun O(log n) langkah.
Totalnya deret yang konvergen ke O(n), bukan O(n log n). Untuk \`n\` sedang perbedaannya
tidak terasa, tapi ini pertanyaan favorit penguji karena memisahkan yang hafal dari yang
paham.

**4. Boros saat \`k\` sangat kecil.** Kalau \`k = 1\`, tidak ada heap yang lebih cepat
daripada satu variabel berisi nilai terbaik sejauh ini. Begitu juga: untuk membuang kandidat
buruk, bandingkan dulu dengan \`peek()\` sebelum \`push\`, sehingga heap tidak perlu diubah:

\`\`\`js
if (heap.size < k) heap.push(value);
else if (value > heap.peek()) { heap.pop(); heap.push(value); }
\`\`\`

**5. Lupa membuang elemen basi (lazy deletion).** Kalau kamu menandai sesuatu sebagai tidak
valid tanpa menghapusnya dari heap, elemen itu tetap muncul di puncak. Selalu periksa dulu
apakah puncaknya masih valid, baru dipakai — lalu \`pop\` kalau sudah tidak relevan. Jangan
mengubah isi heap di tengah traversal hanya karena ingin menghapus; itu O(n) dan sering
menyebabkan bug.

**6. Menganggap heap otomatis mengurutkan.** Keluaran \`pop\` memang terurut menaik (atau
menurun untuk max-heap), tapi **isi array heap bukan array terurut**. Soal yang meminta
"kembalikan dalam urutan apa pun" tidak boleh dijawab dengan menyerahkan array internal
heap-nya.

**7. Tidak mendukung duplikat atau pengosongan.** Pastikan kodemu benar untuk input kosong,
satu elemen, dan nilai kembar. Perhatikan \`pop\` pada heap berisi satu elemen: elemen
terakhir diambil, dan fungsi harus berhenti sebelum melakukan sift down pada array kosong.`,
        en: `**1. Picking the wrong heap for top-K.** This is mistake number one. To find the
**k largest** you need a **min-heap** — not a max-heap. A size-\`k\` max-heap throws away the
smallest candidate, but that smallest candidate is exactly the one that should be evicted
most often. The rule: the heap root must hold the candidate **most deserving of removal**, so
that \`pop\` removes the right one.

**2. Putting the wrong thing in the heap.** Common shapes:

- **Numbers compared as strings.** \`[10, 9, 100].sort()\` yields \`[10, 100, 9]\` because
  JavaScript stringifies first. Always pass a comparator: \`.sort((a, b) => a - b)\`.
- **Objects with no comparison key.** A heap cannot guess how to order \`{x, y}\`. Store a
  \`[priority, payload]\` pair, or compare a specific field with an explicit comparator.
- **Mutating a value after it was inserted.** If you change the field the heap orders by
  while the element is still inside, the heap property breaks silently and \`peek\` starts
  lying. The rule: \`pop\` first, change it, then \`push\` it back.
- **The wrong direction of priority.** k-way merge wants the smallest; scheduling wants the
  one with the most work left. Make sure the key you store is the thing you actually want
  ordered, not an index.

**3. Complexity: O(n) build versus O(n log n) pushes.** When you already have an array,
do not build the heap by calling \`push\` \`n\` times. Sift down from the middle of the array
backwards and the cost drops to O(n).

The intuition: half of the nodes are leaves that never move, a quarter move at most one step
down, and only the root can travel O(log n) steps. The sum converges to O(n), not
O(n log n). For moderate \`n\` nobody notices, but interviewers love this question because it
separates memorization from understanding.

**4. Overkill when \`k\` is tiny.** If \`k = 1\`, no heap beats a single variable holding the
best value seen so far. Likewise, screen bad candidates against \`peek()\` before pushing, so
the heap does not have to change at all:

\`\`\`js
if (heap.size < k) heap.push(value);
else if (value > heap.peek()) { heap.pop(); heap.push(value); }
\`\`\`

**5. Forgetting to remove stale entries (lazy deletion).** If you mark something invalid
without taking it out of the heap, it can still surface at the root. Always check that the
root is still valid before using it, and \`pop\` it when it is not. Never remove from the
middle of a heap by hand; that is O(n) and a classic source of bugs.

**6. Assuming a heap is a sorted array.** Repeated \`pop\` calls do come out in sorted order
(ascending for a min-heap), but the **internal array is not sorted**. A problem that accepts
"any order" still cannot be answered by handing back the heap's internal array.

**7. Not handling duplicates or emptying.** Make sure your code is right for empty input, a
single element, and repeated values. Watch \`pop\` on a one-element heap: the last element is
returned, and the function must stop before sifting down on an empty array.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Ringkasan dan latihan yang disarankan',
        en: 'Summary and suggested practice',
      },
      body: {
        id: `## Yang perlu diingat

- Heap = **urutan parsial**. Akar selalu ekstrem, sisanya tidak terurut. Itu bukan
  kekurangan, itu sumber efisiensinya.
- \`push\` dan \`pop\` masing-masing O(log n), \`peek\` O(1), build dari array O(n).
- Untuk **k terbesar** pakai **min-heap** berukuran \`k\`; untuk **k terkecil** pakai
  **max-heap**. Puncak = kandidat paling layak dibuang.
- JavaScript tidak punya priority queue bawaan: tulis heap sendiri (± 30 baris) kalau
  kuncinya kompleks atau datanya mengalir.
- **Untuk input berukuran sedang, mengurutkan sering lebih baik.** Sortir adalah O(n log n)
  dengan konstanta kecil dan kode yang pendek; heap baru menang saat \`k\` jauh lebih kecil
  dari \`n\`, saat data mengalir, atau saat kamu perlu mengambil elemen satu per satu sambil
  state-nya berubah. Menulis solusi pengurutan yang benar lebih baik daripada menulis heap
  yang salah.
- Kalau soal meminta median dari data yang bertambah, atau "bagi dua bagian seimbang",
  pikiran pertamamu: dua heap.

## Latihan yang disarankan

Lima soal berikut disusun dari yang paling santai:

1. **Last Stone Weight** — simulasi greedy dengan selalu mengambil dua elemen terbesar.
   Cocok untuk membiasakan pola "ambil ekstrem, ubah, masukkan lagi". Karena \`n\`-nya kecil,
   versi pengurutan juga benar dan lebih mudah ditulis di JavaScript; bandingkan dengan versi
   heap-nya di halaman penjelasan.
2. **Top K Frequent Elements** — pola top-K yang didahului oleh penghitungan frekuensi.
   Perhatikan bahwa yang masuk heap hanyalah nilai uniknya, bukan seluruh array.
3. **Kth Largest Element in an Array** — pola top-K paling murni, sekaligus tempat yang tepat
   untuk latihan menulis min-heap berukuran \`k\` sendiri.
4. **K Closest Points to Origin** — top-K dengan kunci berupa jarak kuadrat. Di sini terlihat
   kenapa "urutan lengkap" tidak dibutuhkan: yang penting hanya perbandingannya.
5. **Task Scheduler** — greedy dengan max-heap berisi sisa jumlah tugas. Soal paling sulit di
   track ini karena kamu harus menemukan dulu bentuk blok \`n + 1\` sebelum heap-nya berguna.

Setelah kelima soal ini, coba lanjutkan sendiri ke **Merge k Sorted Lists** (penggabungan
bertahap) dan **Find Median from Data Stream** (dua heap) — keduanya langsung memakai pola
di atas dengan satu tambahan kecil.`,
        en: `## Keep in mind

- A heap is a **partial order**. The root is always the extreme, the rest is unsorted. That
  is not a limitation, it is where the efficiency comes from.
- \`push\` and \`pop\` are O(log n) each, \`peek\` is O(1), and building from an array is O(n).
- For the **k largest** use a size-\`k\` **min-heap**; for the **k smallest** use a
  **max-heap**. The root is the candidate most deserving of removal.
- JavaScript has no built-in priority queue: write the heap yourself (about 30 lines) when
  the key is complex or the data streams in.
- **For moderate input sizes, sorting is often better.** Sorting is O(n log n) with a small
  constant and short code; a heap only wins when \`k\` is much smaller than \`n\`, when the
  data streams in, or when you must extract elements one at a time while their state
  changes. A correct sorting solution beats a broken heap.
- If a problem asks for the median of growing data, or to split data into two balanced
  halves, your first thought should be: two heaps.

## Suggested practice

The five problems below go from easiest to hardest:

1. **Last Stone Weight** — greedy simulation that keeps taking the two heaviest elements.
   A good way to absorb the "take the extreme, change it, put it back" loop. Because \`n\`
   is tiny, the sorting version is also correct and easier to write in JavaScript; compare it
   with the heap version in the explanation page.
2. **Top K Frequent Elements** — the top-K pattern preceded by a frequency count. Notice
   that only the distinct values go into the heap, not the whole array.
3. **Kth Largest Element in an Array** — the purest top-K problem, and the right place to
   practice writing your own min-heap of size \`k\`.
4. **K Closest Points to Origin** — top-K with a squared-distance key. Here you can see why
   the full order is unnecessary: only comparisons matter.
5. **Task Scheduler** — greedy with a max-heap of remaining task counts. The hardest problem
   in this track, because you have to discover the \`n + 1\` block shape before the heap
   becomes useful.

After these five, continue on your own with **Merge k Sorted Lists** (incremental merging)
and **Find Median from Data Stream** (two heaps) — both reuse the patterns above with one
small twist.`,
      },
    },
  ],
  problemSlugs: [
    'last-stone-weight',
    'top-k-frequent-elements',
    'kth-largest-element-in-an-array',
    'k-closest-points-to-origin',
    'task-scheduler',
  ],
};
