import type { Track } from '~/types/content';

export const trees: Track = {
  id: 'trees',
  order: 7,
  title: {
    id: 'Pohon Biner',
    en: 'Binary Trees',
  },
  summary: {
    id: 'Struktur data hierarkis: membangun pohon dari array level-order, menelusurinya dengan rekursi atau antrian, dan memanfaatkan sifat terurut BST.',
    en: 'Hierarchical data: build a tree from a level-order array, walk it with recursion or a queue, and exploit the ordered property of a BST.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa pohon biner penting',
        en: 'Why binary trees matter',
      },
      body: {
        id: `Pohon biner adalah struktur data pertama yang **rekursif**: sebuah pohon biner terdiri
dari satu node akar dan dua pohon biner yang lebih kecil. Begitu kamu bisa membaca definisi
itu, hampir semua soal pohon selesai dengan satu fungsi yang memanggil dirinya sendiri dua
kali.

Karena itulah interviewer menyukainya. Dalam satu soal mereka bisa melihat tiga hal
sekaligus: apakah kamu menemukan **base case** yang benar, apakah kamu bisa mendefinisikan
"apa yang dikembalikan fungsi ini" dengan tajam, dan apakah kamu menyadari **kedalaman
rekursi** beserta biaya memorinya.

Selain itu banyak struktur produksi berbentuk pohon: heap (dasar priority queue), BST (dasar
ordered map dan index basis data), trie (autocomplete), pohon ekspresi di compiler, AST di
parser dan linter, sampai struktur DOM serta direktori di disk. Semuanya memakai ide yang
sama — hierarki yang membuat pencarian tidak perlu menelusuri seluruh data.

Bagi banyak orang, soal pohon adalah soal pertama yang memaksa berhenti memakai array dan
mulai memakai pointer ke node. Di situlah kesalahan paling dasar muncul: base case yang
lupa ditulis, dan nilai yang tertukar antara kedalaman dan tinggi.`,
        en: `A binary tree is the first truly **recursive** data structure you meet: a binary tree is
one root node plus two smaller binary trees. Once you can read that definition, almost every
tree problem boils down to one function that calls itself twice.

That is exactly why interviewers like it. A single problem shows them three things at once:
whether you find the right **base case**, whether you can state "what does this function
return" precisely, and whether you are aware of **recursion depth** and its memory cost.

Binary trees are also everywhere in production code: heaps (the basis of priority queues),
BSTs (the basis of ordered maps and database indexes), tries (autocomplete), expression
trees in compilers, ASTs in parsers and linters, plus the DOM and the file system. They all
share the same idea — a hierarchy that lets you search without scanning everything.

For many people, tree problems are the first place where arrays stop working and pointers to
nodes take over. That is where the most basic mistakes appear: a forgotten base case, and
depth confused with height.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Konsep pohon dan kedalaman',
        en: 'Tree concepts and depth',
      },
      body: {
        id: `## Apa itu pohon biner

Pohon biner adalah kumpulan node dengan satu node sebagai **akar** (root). Setiap node
menyimpan satu nilai dan punya **paling banyak dua anak**: \`left\` dan \`right\`, yang boleh
kosong. Node tanpa anak disebut **daun** (leaf). Sebuah node bersama seluruh keturunannya
membentuk **subtree** yang juga merupakan pohon biner.

Perhatikan kata "paling banyak dua": node dengan satu anak saja tetap pohon biner yang sah.

## Kedalaman, tinggi, dan satuan yang dipakai

Dua istilah ini mengukur hal yang sama dari arah berlawanan, dan tertukar keduanya membuat
jawabanmu meleset satu:

- **Kedalaman (depth) sebuah node**: banyak sisi dari akar ke node itu. Akar punya kedalaman 0.
- **Tinggi (height) sebuah node**: banyak sisi dari node itu turun ke daun terjauh di bawahnya. Daun punya tinggi 0.
- **Kedalaman maksimum pohon**: banyak **node** pada lintasan terpanjang dari akar ke daun. Untuk \`[3,9,20,null,null,15,7]\` jawabannya 3, karena lintasan \`3 → 20 → 15\` memuat tiga node; dalam satuan sisi, tingginya 2.

Jadi sebelum menulis kode, putuskan satuannya: menghitung node atau menghitung sisi. Semua
soal di track ini memakai satuan **node**, sehingga pohon kosong berkedalaman 0 dan pohon
satu node berkedalaman 1.

Bentuk pohon sangat memengaruhi biayanya. Untuk \`n\` node, tinggi pohon bisa sedekat
\`log n\` (seimbang) atau sejauh \`n - 1\` (miring seperti linked list). Karena hampir semua
algoritma pohon memakai ruang sebesar tingginya, perbedaan ini nyata: rekursi pada pohon
miring bisa menghabiskan tumpukan pemanggilan.

## Representasi: array level-order

Pohon tidak bisa dikirim sebagai pointer karena input dan output di platform ini harus
JSON-serializable. Karena itu pohon ditulis sebagai **array level-order**, dengan \`null\`
untuk anak yang kosong. Contoh:

\`[3,9,20,null,null,15,7]\`

Artinya: akar bernilai 3, anak kiri 9, anak kanan 20; node 9 tidak punya anak, sedangkan
node 20 punya anak kiri 15 dan anak kanan 7.

Cara membacanya: elemen pertama adalah akar. Masukkan akar ke antrian, lalu **untuk setiap
node yang keluar dari antrian**, dua elemen berikutnya adalah anak kiri dan anak kanannya.
Nilai \`null\` berarti anak itu tidak ada — dan anak yang tidak ada **tidak memakai** dua slot
berikutnya.

Aturan terakhir itu yang sering dilupakan: array ini **bukan** tata letak pohon penuh
(perfect/complete layout), jadi jangan menghitung anak dengan \`2 * i + 1\` dan \`2 * i + 2\`.
Pada contoh di atas, indeks 5 berisi 15 dan itu bukan anak dari node 9.

Kerangka membangun pohon dari array seperti itu selalu sama:

1. Buat satu node untuk setiap nilai yang bukan \`null\` (definisikan kelas \`TreeNode\` di dalam kodemu).
2. Simpan akar, lalu telusuri array dengan dua penunjuk: satu menunjuk posisi di array, satu menunjuk node yang sedang diberi anak.
3. Untuk setiap node yang keluar dari antrian, ambil dua nilai berikutnya sebagai anak kiri dan anak kanan; hanya anak yang bukan \`null\` yang dimasukkan kembali ke antrian.

Bentuk node-nya cukup sesederhana ini:

\`\`\`js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
\`\`\`

## Kompleksitas

Menelusuri seluruh pohon selalu O(n) waktu, karena setiap node dikunjungi tepat sekali.
Ruang tambahannya bergantung cara penelusuran:

- Rekursi DFS: O(h) tumpukan pemanggilan, dengan \`h\` = tinggi pohon (bisa \`n\` bila miring).
- BFS: O(w) untuk antriannya, dengan \`w\` = lebar level terlebar (bisa \`n/2\` pada pohon penuh).`,
        en: `## What a binary tree is

A binary tree is a set of nodes with one node as the **root**. Each node stores one value and
has **at most two children**: \`left\` and \`right\`, either of which may be absent. A node with
no children is a **leaf**. A node together with all of its descendants forms a **subtree**,
which is itself a binary tree.

Note the words "at most two": a node with a single child is still a perfectly valid binary
tree.

## Depth, height, and the unit you count in

These two terms measure the same thing in opposite directions, and swapping them makes your
answer off by one:

- **Depth of a node**: the number of edges from the root down to that node. The root has depth 0.
- **Height of a node**: the number of edges from that node down to its deepest leaf. A leaf has height 0.
- **Maximum depth of a tree**: the number of **nodes** on the longest path from the root to a leaf. For \`[3,9,20,null,null,15,7]\` the answer is 3, because the path \`3 → 20 → 15\` holds three nodes; measured in edges its height would be 2.

So decide the unit before writing code: are you counting nodes or edges? Every problem in this
track counts **nodes**, which means an empty tree has depth 0 and a single-node tree has
depth 1.

Shape matters too. With \`n\` nodes a tree can be as shallow as \`log n\` (balanced) or as deep as
\`n - 1\` (a skewed tree that looks like a linked list). Since almost every tree algorithm uses
space proportional to the height, that difference is real: recursion on a skewed tree can
exhaust the call stack.

## Representation: the level-order array

Trees cannot be passed around as pointers here, because every input and output must be
JSON-serializable. Instead a tree is written as a **level-order array** with \`null\` for a
missing child. For example:

\`[3,9,20,null,null,15,7]\`

That means: the root holds 3, its left child is 9 and its right child is 20; node 9 has no
children, while node 20 has left child 15 and right child 7.

To read it: the first element is the root. Put the root in a queue, then **for every node that
leaves that queue**, the next two elements are its left and right child. A \`null\` means the
child is absent — and an absent child does **not** consume the next two slots.

That last rule is the one people forget: this array is **not** a packed tree layout, so do not
compute children with \`2 * i + 1\` and \`2 * i + 2\`. In the example above index 5 holds 15, and
15 is not a child of node 9.

Building a tree from such an array always follows the same recipe:

1. Create one node per non-\`null\` value (define the \`TreeNode\` class inside your code).
2. Keep the root, then walk the array with two pointers: one for the array position, one for the node currently receiving children.
3. For each node that leaves the queue, take the next two values as its left and right child; only non-\`null\` children go back into the queue.

The node itself can stay this simple:

\`\`\`js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
\`\`\`

## Complexity

Walking a whole tree always costs O(n) time, because every node is visited exactly once. The
extra space depends on how you walk it:

- Recursive DFS: O(h) call frames, where \`h\` is the height (which can be \`n\` for a skewed tree).
- BFS: O(w) for the queue, where \`w\` is the widest level (up to \`n/2\` for a full tree).`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Traversal dan pola utama',
        en: 'Traversals and the main patterns',
      },
      body: {
        id: `## Empat urutan penelusuran

Ambil pohon kecil \`[1,2,3]\`: akar 1 dengan anak kiri 2 dan anak kanan 3.

**Preorder** — node dulu, lalu anak kiri, lalu anak kanan: \`1, 2, 3\`. Urutannya mengalir dari
akar ke bawah, jadi cocok untuk menyalin dan menyerialkan pohon, atau untuk keputusan yang
diwariskan ke anak (misalnya rentang nilai yang boleh dipakai sebuah subtree).

**Inorder** — anak kiri, node, anak kanan: \`2, 1, 3\`. Pada BST urutan ini **selalu menaik**,
sehingga dipakai untuk mencari nilai ke-\`k\` terkecil atau mengubah pohon menjadi array terurut.

**Postorder** — anak kiri, anak kanan, node: \`2, 3, 1\`. Dipakai ketika kamu butuh hasil anak
lebih dulu: menghitung tinggi, jumlah nilai subtree, atau memeriksa validitas subtree.

**Level-order (BFS)** — level demi level: \`1, 2, 3\`. Dipakai untuk soal per level, jarak dari
akar, atau saat kamu ingin menghindari rekursi dalam.

Tiga yang pertama adalah DFS, dan kerangkanya berbeda hanya pada urutan tiga baris:

\`\`\`js
function walk(node) {
  if (node === null) return;   // base case
  // preorder  : kerjakan node di sini
  walk(node.left);
  // inorder   : kerjakan node di sini
  walk(node.right);
  // postorder : kerjakan node di sini
}
\`\`\`

## Pola 1: rekursi DFS dengan nilai kembali

Seperti pada two pointers, kekuatan pola ini berasal dari satu kalimat jelas: **apa yang
dikembalikan fungsi ini?** Tentukan itu dulu, tulis base case-nya, baru gabungkan hasil anak.

Contoh pada soal kedalaman maksimum: \`depth(node)\` mengembalikan kedalaman maksimum subtree
berakar di \`node\`. Base case: \`node === null\` mengembalikan 0. Gabungan:
\`1 + max(depth(node.left), depth(node.right))\`.

Pola yang sama dipakai berulang kali:

- Jumlah node subtree: \`1 + kiri + kanan\`.
- Apakah dua pohon identik: bandingkan nilai, lalu \`kiri && kanan\`.
- Apakah BST valid: kembalikan rentang nilai yang masih diizinkan untuk subtree itu.

## Pola 2: BFS dengan antrian

BFS memakai antrian berisi node yang belum diproses. Untuk soal per level, kunci dulu jumlah
node di level sekarang sebelum memproses:

\`\`\`js
const queue = [root];
let head = 0;
const levels = [];

while (head < queue.length) {
  const size = queue.length - head;
  const level = [];

  for (let i = 0; i < size; i++) {
    const node = queue[head++];
    level.push(node.val);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  levels.push(level);
}
\`\`\`

Trik \`size = queue.length - head\` itulah yang memisahkan level satu dengan level berikutnya:
anak-anak yang dimasukkan di dalam loop tidak akan ikut terhitung di level yang sama.

## Pola 3: BST dan sifat terurutnya

BST (binary search tree) adalah pohon biner dengan satu janji tambahan: untuk setiap node,
**semua** nilai di subtree kirinya lebih kecil dan **semua** nilai di subtree kanannya lebih
besar. Konsekuensinya sangat menguntungkan:

- Inorder menghasilkan urutan menaik.
- Pencarian hanya menyusuri satu jalur: O(h), idealnya O(log n) bila pohon seimbang.
- Nilai terkecil ada di node paling kiri, terbesar di paling kanan.
- Insert dan delete juga O(h), karena keduanya mencari posisi dulu.

Untuk **memeriksa** keabsahan BST, satu-satunya cara yang aman adalah membawa ekspektasi
rentang nilai: setiap node punya batas bawah dan batas atas, dan saat turun ke kiri batas
atasnya menjadi nilai node itu, saat turun ke kanan batas bawahnya menjadi nilai node itu.
Alternatifnya, periksa bahwa hasil inorder benar-benar menaik — tapi itu memerlukan memori
tambahan O(n) kalau hasilnya dikumpulkan.

## Kapan memakai yang mana

- Butuh hasil anak lebih dulu (tinggi, jumlah, validitas subtree) → DFS postorder.
- Butuh mewariskan informasi dari akar ke bawah (rentang nilai, lintasan) → DFS preorder.
- Butuh urutan nilai BST atau nilai ke-\`k\` → inorder.
- Soal berbicara level, lebar, atau jarak → BFS level-order.
- Tinggi pohon bisa mencapai puluhan ribu → tulis iteratif (stack sendiri, atau Morris traversal untuk inorder dengan O(1) ruang).

## Kompleksitas

Semua penelusuran memakai O(n) waktu. Ruang tambahan: O(h) untuk rekursi atau stack DFS, dan
O(w) untuk antrian BFS.`,
        en: `## The four traversal orders

Take the small tree \`[1,2,3]\`: root 1 with left child 2 and right child 3.

**Preorder** — node first, then left, then right: \`1, 2, 3\`. The order flows from the root
downwards, which makes it right for copying and serialising a tree, or for decisions a node
passes down to its children (a range of allowed values, for instance).

**Inorder** — left, node, right: \`2, 1, 3\`. On a BST this order is **always increasing**, which
is why it is used for the k-th smallest value or for turning a tree into a sorted array.

**Postorder** — left, right, node: \`2, 3, 1\`. Use it when you need your children's results
first: heights, subtree sums, subtree validity.

**Level-order (BFS)** — level by level: \`1, 2, 3\`. Use it for anything phrased per level, for
distance from the root, or when you want to avoid deep recursion.

The first three are DFS, and their skeletons differ only in the order of three lines:

\`\`\`js
function walk(node) {
  if (node === null) return;   // base case
  // preorder  : handle node here
  walk(node.left);
  // inorder   : handle node here
  walk(node.right);
  // postorder : handle node here
}
\`\`\`

## Pattern 1: DFS recursion with a return value

As with two pointers, the strength of this pattern comes from one clear sentence: **what does
this function return?** Decide that first, write the base case, then combine the children.

For maximum depth: \`depth(node)\` returns the maximum depth of the subtree rooted at \`node\`.
Base case: \`node === null\` returns 0. Combination:
\`1 + max(depth(node.left), depth(node.right))\`.

The same shape repeats everywhere:

- Subtree node count: \`1 + left + right\`.
- Are two trees identical: compare values, then \`left && right\`.
- Is a BST valid: return the range of values that subtree is still allowed to contain.

## Pattern 2: BFS with a queue

BFS keeps a queue of nodes that have not been processed yet. For per-level problems, lock in
the size of the current level before processing it:

\`\`\`js
const queue = [root];
let head = 0;
const levels = [];

while (head < queue.length) {
  const size = queue.length - head;
  const level = [];

  for (let i = 0; i < size; i++) {
    const node = queue[head++];
    level.push(node.val);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  levels.push(level);
}
\`\`\`

\`size = queue.length - head\` is what separates one level from the next: children appended
inside the loop are deliberately not counted as part of the current level.

## Pattern 3: BST and its ordered promise

A BST (binary search tree) is a binary tree with one extra guarantee: for every node, **all**
values in its left subtree are smaller and **all** values in its right subtree are larger.
That pays off in several ways:

- Inorder produces an increasing sequence.
- Search follows a single path: O(h), ideally O(log n) when the tree is balanced.
- The smallest value sits in the leftmost node, the largest in the rightmost.
- Insert and delete are O(h) too, because both search for a position first.

To **validate** a BST, the only safe approach is to carry an expected range: every node has a
lower and an upper bound, and going left tightens the upper bound to the node's value while
going right tightens the lower bound. The alternative is checking that the inorder output is
strictly increasing — but that costs O(n) extra memory if you collect it.

## Which one to pick

- Need children's results first (height, count, subtree validity) → DFS postorder.
- Need to pass information from the root downwards (value ranges, paths) → DFS preorder.
- Need BST values in order, or the k-th value → inorder.
- The problem talks about levels, width, or distance → BFS level-order.
- The height may reach tens of thousands → write it iteratively (your own stack, or Morris traversal for O(1) inorder).

## Complexity

Every traversal costs O(n) time. Extra space: O(h) for DFS recursion or an explicit stack, and
O(w) for the BFS queue.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**Lupa base case.** DFS tanpa \`if (node === null) return ...\` akan melempar error saat
mencapai anak kosong. Tulis base case sebelum logika lainnya.

**Base case yang mengembalikan nilai salah.** Saat membandingkan dua pohon, "salah satu atau
keduanya kosong" harus ditangani dalam satu pemeriksaan: \`if (p === null || q === null) return p === q;\`.
Menulis \`if (p === null) return true;\` membuat pohon kosong dianggap sama dengan pohon apa pun.

**Mencampur kedalaman dan tinggi.** Akar berkedalaman 0 tetapi tingginya setinggi pohon; daun
punya tinggi 0 tetapi kedalamannya bisa besar. Salah satunya membuat jawaban meleset satu:
pohon satu node dijawab 0, atau pohon kosong dijawab 1.

**Memvalidasi BST hanya dengan anak langsung.** Pola \`node.left.val < node.val && node.val < node.right.val\`
gagal pada \`[5,1,4,null,null,3,6]\`: node 3 memang anak kiri dari 4, tetapi 4 < 5 sehingga 3
sebenarnya berada di subtree kanan milik 5. Nilai di subtree kanan harus lebih besar dari
**seluruh** leluhurnya, bukan hanya dari orang tuanya. Perhatikan juga duplikat: BST yang sah
tidak boleh menyimpan nilai kembar, jadi pakai perbandingan tegas (\`<\` dan \`>\`), bukan \`<=\`.

**Menganggap array level-order sebagai tata letak pohon penuh.** Rumus anak \`2 * i + 1\` dan
\`2 * i + 2\` hanya benar kalau tidak ada \`null\` di tengah. Pada \`[3,9,20,null,null,15,7]\`,
15 bukan anak dari 9.

**Urutan traversal yang tertukar.** Kalau kamu butuh nilai anak sebelum mengolah node (tinggi,
jumlah subtree), urutannya harus postorder. Memakai preorder berarti nilainya belum dihitung
saat dipakai.

**Rekursi pada pohon miring.** Pohon seperti \`[1,2,null,3,null,4]\` tingginya \`n\`. Batas
rekursi Python default 1000, dan tumpukan JavaScript biasanya penuh di puluhan ribu
pemanggilan. Kalau input bisa sedalam itu, pakai stack sendiri atau Morris traversal.

**Antrian yang mahal.** \`array.shift()\` adalah O(n), sehingga BFS menjadi O(n²). Pakai penunjuk
\`head\` yang bergerak maju.

**Mengubah pohon milik pemanggil.** Solusi \`in place\` yang membalik \`left\` dan \`right\` pada
pohon input mengubah data yang mungkin masih dipakai penguji. Kalau soal meminta pohon hasil
baru, buat node baru.

**Lupa memangkas \`null\` di ujung array.** Saat mengembalikan pohon sebagai array level-order,
\`null\` di akhir tidak perlu ditulis. Menulis \`[1,null,2,null,null]\` untuk pohon bernilai
\`[1,null,2]\` membuat jawabanmu dianggap berbeda.`,
        en: `**Forgetting the base case.** DFS without \`if (node === null) return ...\` throws as soon
as it reaches a missing child. Write the base case before anything else.

**A base case that returns the wrong thing.** When comparing two trees, "either one is empty"
must be handled in a single check: \`if (p === null || q === null) return p === q;\`.
Writing \`if (p === null) return true;\` treats an empty tree as equal to every other tree.

**Mixing up depth and height.** The root has depth 0 but the height of the whole tree; a leaf
has height 0 but a possibly large depth. Confusing them costs you exactly one: a single-node
tree answered as 0, or an empty tree answered as 1.

**Validating a BST against direct children only.** The pattern
\`node.left.val < node.val && node.val < node.right.val\` fails on \`[5,1,4,null,null,3,6]\`:
node 3 is indeed the left child of 4, but 4 < 5, so 3 actually sits inside 5's right subtree.
Values in a right subtree must exceed **every** ancestor, not just the parent. Watch duplicates
too: a valid BST stores no equal values, so compare strictly (\`<\` and \`>\`), never \`<=\`.

**Reading the level-order array as a packed layout.** The child formulas \`2 * i + 1\` and
\`2 * i + 2\` only hold when there are no \`null\` gaps. In \`[3,9,20,null,null,15,7]\`, 15 is not
a child of 9.

**Swapped traversal orders.** If you need a child's result before handling the node (heights,
subtree sums), you must go postorder. With preorder that value has not been computed yet.

**Recursion on a skewed tree.** A tree like \`[1,2,null,3,null,4]\` is \`n\` deep. Python's default
recursion limit is 1000, and a JavaScript stack usually overflows in the tens of thousands. If
the input can be that deep, use your own stack or Morris traversal.

**An expensive queue.** \`array.shift()\` is O(n), which turns BFS into O(n²). Keep a \`head\`
index that only moves forward.

**Mutating the caller's tree.** An \`in place\` solution that swaps \`left\` and \`right\` on the input
tree rewrites data the judge may still be using. If the problem asks for a new tree, build new
nodes.

**Not trimming trailing \`null\`s.** When returning a tree as a level-order array, trailing
\`null\`s are unnecessary. Writing \`[1,null,2,null,null]\` for the tree \`[1,null,2]\` makes your
answer count as different.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Pohon biner itu rekursif: tentukan **apa yang dikembalikan** fungsimu, tulis base case, baru gabungkan hasil anak.
- Traversal: preorder (atas ke bawah), inorder (BST = menaik), postorder (bawah ke atas), level-order (per level, memakai antrian).
- Kedalaman diukur dari akar dan tinggi diukur ke daun; putuskan satuannya (node atau sisi) sebelum menulis kode.
- BST mewajibkan semua nilai subtree kiri lebih kecil dan semua nilai subtree kanan lebih besar — validasinya butuh batas bawah/atas atau urutan inorder.
- Biaya standar: O(n) waktu untuk semua penelusuran, O(h) ruang untuk DFS, O(w) ruang untuk BFS.
- Di track ini pohon masuk sebagai array level-order dengan \`null\`; bangun pohonnya lebih dulu dengan kelas \`TreeNode\` di dalam kodemu, lalu kembalikan hasilnya sebagai array atau nilai tunggal.

## Latihan yang disarankan

Mulai dari \`maximum-depth-of-binary-tree\` untuk membiasakan diri dengan base case dan
penggabungan hasil anak, lanjut ke \`invert-binary-tree\` yang memaksa kamu mengubah struktur
pohon. Setelah itu \`same-tree\` melatih membandingkan dua pohon dalam satu lintasan, lalu
\`binary-tree-level-order-traversal\` memperkenalkan BFS dengan antrian. Tutup dengan
\`validate-binary-search-tree\`, yang langsung salah kalau kamu hanya membandingkan node dengan
anak langsungnya.`,
        en: `- A binary tree is recursive: decide **what the function returns**, write the base case, then combine the children's results.
- Traversals: preorder (top-down), inorder (BST = increasing), postorder (bottom-up), level-order (per level, using a queue).
- Depth is measured from the root, height towards the leaves; pick your unit (nodes or edges) before writing code.
- A BST requires every left-subtree value to be smaller and every right-subtree value to be larger — validating it needs lower/upper bounds or an inorder pass.
- Standard costs: O(n) time for any traversal, O(h) space for DFS, O(w) space for BFS.
- In this track a tree arrives as a level-order array with \`null\`; build it first with a \`TreeNode\` class defined inside your code, then return the result as an array or a single value.

## Suggested practice

Start with \`maximum-depth-of-binary-tree\` to get comfortable with base cases and combining
children, then \`invert-binary-tree\`, which forces you to restructure the tree. Next,
\`same-tree\` trains you to compare two trees in a single walk, and
\`binary-tree-level-order-traversal\` introduces BFS with a queue. Finish with
\`validate-binary-search-tree\`, which fails immediately if you only compare a node with its
direct children.`,
      },
    },
  ],
  problemSlugs: [
    'maximum-depth-of-binary-tree',
    'invert-binary-tree',
    'same-tree',
    'binary-tree-level-order-traversal',
    'validate-binary-search-tree',
  ],
};
