import type { Track } from '~/types/content';

export const graphs: Track = {
  id: 'graphs',
  order: 9,
  title: {
    id: 'Graf dan Grid',
    en: 'Graphs and Grids',
  },
  summary: {
    id: 'Menelusuri hubungan antar simpul: representasi graf, DFS, BFS, flood fill pada grid, dan deteksi siklus.',
    en: 'Walk the relationships between nodes: graph representations, DFS, BFS, grid flood fill, and cycle detection.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa topik ini penting',
        en: 'Why this topic matters',
      },
      body: {
        id: `Sampai di sini kamu sudah punya array, hash map, dua pointer, sliding window, stack, dan pohon.
Graf adalah topik yang menyatukan semuanya: hampir semua soal graf diselesaikan dengan salah satu
dari tiga alat yang sudah kamu kenal — rekursi, stack, atau antrian.

Kenapa graf hampir selalu muncul di interview?

1. **Graf adalah cara paling umum memodelkan relasi.** Peta jalan, jaringan pertemanan, prasyarat
   mata kuliah, dependensi paket, penyebaran pesan — semuanya graf. Begitu kamu bisa melihat graf
   di balik sebuah cerita soal, kamu bisa memakai alat yang sama berulang-ulang.
2. **Banyak soal grid yang terlihat seperti soal matriks sebenarnya soal graf.** "Hitung pulau",
   "isi warna", "berapa lama jeruk membusuk" — semuanya penelusuran graf dengan simpul berupa sel.
3. **Graf menguji kehati-hatian.** Di pohon kamu tidak perlu memikirkan siklus; di graf kamu wajib.
   Salah menandai simpul yang sudah dikunjungi adalah penyebab bug nomor satu di soal graf, dan
   pewawancara sengaja mencarinya.

Kabar baiknya: pola kodenya sedikit dan berulang. Kalau kamu menguasai satu kerangka DFS dan satu
kerangka BFS, sebagian besar soal graf di interview sudah bisa kamu kerjakan.`,
        en: `By now you have arrays, hash maps, two pointers, sliding windows, stacks, and trees. Graphs tie
them together: almost every graph problem is solved with one of three tools you already know —
recursion, a stack, or a queue.

Why do graphs show up in interviews almost every time?

1. **A graph is the most general model of a relationship.** Road maps, friendship networks, course
   prerequisites, package dependencies, the spread of a rumour — all graphs. Once you can see the
   graph behind the story, the same handful of tools keeps working.
2. **Many grid problems that look like matrix problems are really graph problems.** "Count islands",
   "fill a color", "how long until the oranges rot" — all graph traversals where the nodes are cells.
3. **Graphs test carefulness.** In a tree you never worry about cycles; in a graph you must. Forgetting
   to mark a node as visited is the number one source of bugs in graph problems, and interviewers
   look for it on purpose.

The good news: the code patterns are few and repetitive. Master one DFS skeleton and one BFS
skeleton, and most interview graph problems become solvable.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Cara graf dikirim ke kodemu',
        en: 'How a graph reaches your code',
      },
      body: {
        id: `**Istilah dasar.** Graf terdiri dari **simpul** (vertex, node) dan **sisi** (edge) yang
menghubungkan dua simpul. Sisi bisa **berarah** (satu arah, seperti prasyarat mata kuliah) atau
**tak berarah** (dua arah, seperti pertemanan), dan bisa punya **bobot** (jarak, biaya, waktu).

Di interview graf jarang datang sebagai gambar. Biasanya salah satu dari tiga bentuk ini:

**1. Daftar sisi (edge list)** — \`[[0,1], [1,2], [2,0]]\`. Paling ringkas dan paling sering jadi
format input; contohnya \`prerequisites\` pada soal jadwal kuliah, di mana \`[a, b]\` berarti
"a bergantung pada b". Kelemahannya: menjawab "siapa saja tetangga simpul u?" butuh memindai
seluruh daftar, jadi hampir selalu kita ubah dulu menjadi daftar adjacency.

**2. Matriks adjacency** — \`matrix[u][v] === 1\` berarti ada sisi dari u ke v. Memeriksa satu sisi
O(1) dan kodenya pendek, tetapi memorinya O(V²). Cocok kalau jumlah simpul kecil (di bawah sekitar
1000) atau grafnya rapat. Untuk graf tak berarah, isi kedua arah:
\`matrix[u][v] = matrix[v][u] = 1\`.

**3. Daftar adjacency** — \`adj[u] = [v1, v2, ...]\`. Ini pilihan default: memori O(V + E) dan
menelusuri tetangga butuh waktu sebanding dengan derajat simpulnya. Untuk graf berbobot, simpan
pasangan \`[tujuan, bobot]\`. Dari daftar sisi, membangunnya sesederhana ini:

\`\`\`js
const adj = Array.from({ length: n }, () => []);
for (const [a, b] of edges) {
  adj[a].push(b);
  adj[b].push(a); // hapus baris ini untuk graf berarah
}
\`\`\`

**Grid adalah graf implisit.** Papan 2D seperti \`grid[r][c]\` adalah graf yang daftar tetangganya
tidak pernah disimpan: setiap sel adalah simpul, dan sisinya hanya ke sel atas, bawah, kiri, dan
kanan (untuk 8 arah, tambahkan diagonal). Tetangga dihitung dari indeks: \`(r-1, c)\`, \`(r+1, c)\`,
\`(r, c-1)\`, \`(r, c+1)\`. Karena itu grid disebut graf implisit.

Konsekuensinya penting untuk kompleksitas. Pada graf dengan V simpul dan E sisi, penelusuran
memakan waktu **O(V + E)**: setiap simpul dan setiap sisi diperiksa paling banyak sekali. Pada grid
berukuran \`rows × cols\`, V = rows × cols dan setiap sel punya paling banyak 4 sisi, jadi waktunya
**O(rows × cols)** dan ruangnya juga O(rows × cols) untuk penanda kunjungan.

**Bedanya dengan pohon.** Pohon adalah graf tanpa siklus, jadi penelusurannya tidak mungkin
berputar-putar. Graf bisa bersiklus, sehingga kamu **wajib** menyimpan simpul mana yang sudah
dikunjungi. Pada soal grid, penanda itu bisa berupa matriks \`visited\` terpisah atau — lebih hemat —
dengan mengubah nilai selnya sendiri (misalnya \`'1'\` menjadi \`'0'\`).`,
        en: `**Basic vocabulary.** A graph is a set of **nodes** (vertices) plus **edges** connecting pairs of
them. Edges can be **directed** (one way, like a course prerequisite) or **undirected** (both ways,
like a friendship), and they can carry a **weight** (distance, cost, time).

In interviews a graph rarely arrives as a picture. It comes in one of three shapes:

**1. Edge list** — \`[[0,1], [1,2], [2,0]]\`. The most compact form and the most common input format;
think of \`prerequisites\` in a course-scheduling problem, where \`[a, b]\` means "a depends on b".
The downside: answering "who are the neighbours of u?" means scanning the whole list, so you almost
always convert it into an adjacency list first.

**2. Adjacency matrix** — \`matrix[u][v] === 1\` means an edge from u to v. Testing a single edge is
O(1) and the code is short, but the memory is O(V²). It fits when the node count is small (under
roughly 1000) or the graph is dense. For an undirected graph, fill both directions:
\`matrix[u][v] = matrix[v][u] = 1\`.

**3. Adjacency list** — \`adj[u] = [v1, v2, ...]\`. This is the default choice: O(V + E) memory, and
scanning the neighbours costs time proportional to that node's degree. For weighted graphs store
\`[target, weight]\` pairs. Building it from an edge list is this simple:

\`\`\`js
const adj = Array.from({ length: n }, () => []);
for (const [a, b] of edges) {
  adj[a].push(b);
  adj[b].push(a); // drop this line for a directed graph
}
\`\`\`

**A grid is an implicit graph.** A 2D board like \`grid[r][c]\` is a graph whose neighbour lists are
never stored: every cell is a node, and its edges go only to the cell above, below, left, and right
(add the diagonals for 8 directions). Neighbours are computed from indices: \`(r-1, c)\`, \`(r+1, c)\`,
\`(r, c-1)\`, \`(r, c+1)\`. That is why we call a grid an implicit graph.

The complexity consequence matters. On a graph with V nodes and E edges, a traversal costs
**O(V + E)** time: every node and every edge is examined at most once. On a grid of
\`rows × cols\`, V = rows × cols and each cell has at most 4 edges, so the traversal is
**O(rows × cols)** time and also O(rows × cols) space for the visited markers.

**How this differs from trees.** A tree is a graph without cycles, so a traversal can never loop.
A graph can contain cycles, which means you **must** record which nodes you have already visited.
On grid problems that record can be a separate \`visited\` matrix or — cheaper — the cell values
themselves (for instance flipping \`'1'\` to \`'0'\`).`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Pola utama dan kapan memakainya',
        en: 'The main patterns and when to use them',
      },
      body: {
        id: `Sebelum menulis kode, jawab tiga pertanyaan ini:

1. **Apa simpulnya dan apa sisinya?** (Sel grid? Mata kuliah? Angka?)
2. **Berapa titik masuknya?** Satu simpul awal, atau banyak (semua sel bernilai 2, semua simpul
   berderajat masuk nol)?
3. **Yang diminta apa?** "Ada atau tidak", "berapa banyak", "apakah semua terjangkau" → DFS cukup.
   "Berapa jarak/waktu/langkah minimum" → BFS.

## DFS rekursif

Kerangka DFS pada grid: tandai sel sekarang, lalu panggil dirimu sendiri untuk setiap tetangga yang
masih belum dikunjungi. \`floodFill\` dan \`numIslands\` di track ini adalah bentuk paling telanjang
dari pola ini.

\`\`\`js
function dfs(r, c) {
  if (outOfBounds(r, c) || visited[r][c]) return;

  visited[r][c] = true;
  dfs(r + 1, c);
  dfs(r - 1, c);
  dfs(r, c + 1);
  dfs(r, c - 1);
}
\`\`\`

**Rekursi atau stack eksplisit?** Rekursi lebih pendek dan lebih mudah dibaca, dan itu sebabnya
jawaban interview biasanya mulai dari versi rekursif. Tetapi kedalaman rekursinya sama dengan
panjang lintasan terpanjang — pada grid 300×300 yang seluruhnya daratan itu 90.000 pemanggilan
bersarang, dan JS maupun Python akan menabrak batas stack. Untuk grid besar, tulis DFS dengan
**stack eksplisit**:

\`\`\`js
const stack = [[r, c]];
visited[r][c] = true;

while (stack.length > 0) {
  const [row, col] = stack.pop();
  // untuk setiap tetangga yang sah dan belum dikunjungi:
  //   tandai, lalu masukkan ke stack
}
\`\`\`

## BFS dengan queue

BFS memakai antrian dan mengunjungi simpul **per lapisan**: semua simpul berjarak 1 lebih dulu, lalu
jarak 2, lalu jarak 3, dan seterusnya.

\`\`\`js
const queue = [start];
visited[start] = true; // tandai SEBELUM masuk ke antrian

let head = 0;
while (head < queue.length) {
  const node = queue[head];
  head++;

  for (const next of neighbours(node)) {
    if (visited[next]) continue;
    visited[next] = true;
    queue.push(next);
  }
}
\`\`\`

Untuk menghitung lapisan, simpan ukuran antrian di awal setiap putaran
(\`const size = queue.length - head\`) lalu proses tepat \`size\` elemen. Satu putaran = satu satuan
waktu atau satu langkah jarak. Memakai indeks \`head\` lebih hemat daripada \`shift()\`, yang
memindahkan seluruh isi array setiap kali dipanggil.

## Kapan DFS dan kapan BFS

Ini pertanyaan yang paling menentukan jawabanmu benar atau salah.

- **Butuh jarak atau waktu minimum pada graf tanpa bobot → BFS.** BFS mengunjungi simpul dalam
  urutan jarak, jadi simpul tujuan yang pertama kali ia lihat pasti yang terdekat. DFS tidak punya
  jaminan itu: ia bisa menemukan tujuan lewat lintasan panjang lebih dulu, dan lintasan pertama yang
  ia temukan biasanya bukan yang terpendek.
- **"Waktu menyebar" — jeruk membusuk, api menjalar, banjir → BFS multi-sumber.** Semua sumber
  dimasukkan ke antrian di awal, lalu setiap lapisan BFS adalah satu satuan waktu. Jumlah lapisan
  sebelum antrian habis = waktu penyebaran. Mengerjakannya dengan DFS berulang jauh lebih mahal.
- **Hanya perlu "ada atau tidak", "hitung komponen", "ukur luas" → DFS.** Tidak ada keuntungan jarak
  yang bisa dipanen, dan DFS lebih hemat memori: kedalamannya sepanjang satu lintasan, bukan selebar
  seluruh lapisan.
- **Grid dengan 4 arah tetangga**: DFS dengan stack eksplisit adalah pilihan paling aman untuk soal
  "hitung wilayah" dan "ukur wilayah", karena tidak ada kedalaman rekursi yang perlu dikhawatirkan.

**BFS multi-sumber** layak dihafal sebagai pola tersendiri:

\`\`\`js
const queue = [];
for (const source of sources) {
  queue.push(source); // semua sumber sekaligus, di awal
}

let head = 0;
let minutes = 0;

while (head < queue.length && targetsLeft > 0) {
  const size = queue.length - head; // ukuran satu lapisan
  minutes++;

  for (let i = 0; i < size; i++) {
    // proses satu simpul: tandai tetangga baru, dorong ke antrian,
    // dan kurangi targetsLeft setiap kali ada target baru yang tercapai
  }
}

return targetsLeft === 0 ? minutes : -1;
\`\`\`

## Deteksi siklus dan topological sort

Untuk graf **berarah**, dua alat ini menjawab pertanyaan yang sama: apakah grafnya punya siklus?

**Kahn (BFS dengan derajat masuk).** Hitung \`inDegree\` setiap simpul, masukkan semua simpul
berderajat masuk nol ke antrian, lalu "lepaskan" satu per satu sambil mengurangi derajat masuk
tetangganya. Kalau jumlah simpul yang berhasil dilepas lebih sedikit dari jumlah seluruh simpul,
sisanya saling menunggu — berarti ada siklus.

\`\`\`js
// antrian habis tetapi taken < numCourses  =>  ada siklus
return taken === numCourses;
\`\`\`

**DFS tiga warna.** Warnai simpul *putih* (belum dikunjungi), *abu-abu* (sedang ada di lintasan yang
sekarang ditelusuri), dan *hitam* (selesai). Kalau kamu menemukan sisi menuju simpul **abu-abu**,
di situlah siklusnya. Warnai hitam setelah semua tetangganya selesai. Inilah alasan \`visited\`
biasa tidak cukup: bertemu simpul hitam itu aman, bertemu simpul abu-abu berarti bersiklus.

Urutan keluaran kedua algoritma ini adalah **topological sort**: urutan di mana setiap simpul muncul
sebelum semua simpul yang bergantung padanya. Itu juga sebabnya Kahn tidak hanya menjawab
"bisa/tidak", tetapi langsung memberi urutan jadwal yang valid.`,
        en: `Before writing code, answer three questions:

1. **What are the nodes and what are the edges?** (Grid cells? Courses? Numbers?)
2. **How many entry points are there?** One start node, or many (every cell holding a 2, every node
   with in-degree zero)?
3. **What is being asked?** "Does it exist", "how many", "is everything reachable" → DFS is enough.
   "What is the minimum distance/time/number of steps" → BFS.

## Recursive DFS

The grid DFS skeleton: mark the current cell, then call yourself on every neighbour that has not
been visited yet. \`floodFill\` and \`numIslands\` in this track are the barest form of this pattern.

\`\`\`js
function dfs(r, c) {
  if (outOfBounds(r, c) || visited[r][c]) return;

  visited[r][c] = true;
  dfs(r + 1, c);
  dfs(r - 1, c);
  dfs(r, c + 1);
  dfs(r, c - 1);
}
\`\`\`

**Recursion or an explicit stack?** Recursion is shorter and easier to read, which is why interview
answers usually start there. But its depth equals the longest path — on a 300×300 grid that is all
land, that is 90,000 nested calls, and both JS and Python will hit their stack limit. For large
grids, write DFS with an **explicit stack**:

\`\`\`js
const stack = [[r, c]];
visited[r][c] = true;

while (stack.length > 0) {
  const [row, col] = stack.pop();
  // for every valid, unvisited neighbour:
  //   mark it, then push it onto the stack
}
\`\`\`

## BFS with a queue

BFS uses a queue and visits nodes **layer by layer**: everything at distance 1 first, then distance
2, then 3, and so on.

\`\`\`js
const queue = [start];
visited[start] = true; // mark BEFORE it enters the queue

let head = 0;
while (head < queue.length) {
  const node = queue[head];
  head++;

  for (const next of neighbours(node)) {
    if (visited[next]) continue;
    visited[next] = true;
    queue.push(next);
  }
}
\`\`\`

To count layers, store the queue size at the start of each round
(\`const size = queue.length - head\`) and process exactly \`size\` elements. One round equals one unit
of time or one step of distance. Using a \`head\` index is cheaper than \`shift()\`, which moves the
whole array every time it is called.

## When to use DFS and when to use BFS

This single question decides whether your answer is right or wrong.

- **You need a minimum distance or time on an unweighted graph → BFS.** BFS visits nodes in order of
  distance, so the first time it sees the target it is guaranteed to be the closest one. DFS offers
  no such promise: it may reach the target along a long path first, and the first path it finds is
  usually not the shortest.
- **"Spreading time" — rotting oranges, spreading fire, a flood → multi-source BFS.** Push every
  source into the queue up front, and then each BFS layer is one unit of time. The number of layers
  until the queue drains is the spreading time. Doing this with repeated DFS is far more expensive.
- **You only need "does it exist", "count the components", "measure the area" → DFS.** There is no
  distance bonus to collect, and DFS uses less memory: its depth is one path, not a whole layer.
- **Grids with 4-way neighbours**: DFS with an explicit stack is the safest choice for "count the
  regions" and "measure the regions" problems, since there is no recursion depth to worry about.

**Multi-source BFS** is worth memorising as a pattern of its own:

\`\`\`js
const queue = [];
for (const source of sources) {
  queue.push(source); // every source at once, up front
}

let head = 0;
let minutes = 0;

while (head < queue.length) {
  const size = queue.length - head;
  let spread = false; // did this layer reach anything new?

  for (let i = 0; i < size; i++) {
    // process one cell, mark new neighbours, push them
  }

  if (spread) minutes++; // one layer = one unit of time
}
\`\`\`

## Cycle detection and topological sort

For a **directed** graph, these two tools answer the same question: does the graph contain a cycle?

**Kahn (BFS by in-degree).** Compute \`inDegree\` for every node, push every node with in-degree zero
into the queue, then "release" them one at a time while decrementing the in-degree of their
neighbours. If the number of released nodes is smaller than the total number of nodes, the leftovers
are waiting on each other — there is a cycle.

\`\`\`js
// queue drained but taken < numCourses  =>  there is a cycle
return taken === numCourses;
\`\`\`

**Three-colour DFS.** Colour nodes *white* (unvisited), *grey* (currently on the path being
explored), and *black* (finished). If you ever follow an edge into a **grey** node, you have found a
cycle. Colour a node black only after all of its neighbours are done. This is exactly why a plain
\`visited\` flag is not enough: meeting a black node is fine, meeting a grey one means a cycle.

The output of both algorithms is a **topological sort**: an order in which every node appears before
everything that depends on it. That is also why Kahn does not merely answer "possible or not" — it
hands you a valid schedule order as a side effect.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**1. Lupa menandai \`visited\` sebelum masuk antrian.** Ini penyebab bug nomor satu di BFS. Kalau
kamu menandai simpul saat ia *keluar* dari antrian, simpul yang sama bisa didorong berkali-kali oleh
tetangga yang berbeda, dan antriannya meledak — pada grid besar jumlah entri bisa jauh melebihi
jumlah sel sampai memori habis. Aturannya: **tandai saat mendorong, bukan saat mengambil.**

\`\`\`js
visited[next] = true;
queue.push(next); // urutan dua baris ini tidak boleh dibalik
\`\`\`

**2. Menandai "sudah dikunjungi" terlalu awal pada penelusuran yang butuh backtracking.** Untuk
sekadar menjelajah, menandai sekali dan tidak pernah menghapusnya adalah benar. Tetapi pada soal
yang harus mencoba banyak jalur (mencari kata di dalam grid, mencari semua lintasan), penandaan itu
bersifat sementara: tandai saat masuk, **hapus saat keluar**. Kalau tidak dihapus, penelusuran
menutup jalur yang sebenarnya sah lewat sel tersebut.

Hal serupa muncul di deteksi siklus graf berarah: "sudah pernah dikunjungi" (hitam) dan "sedang ada
di jalur sekarang" (abu-abu) adalah dua keadaan berbeda. Menyamakan keduanya membuat graf yang aman
dianggap bersiklus.

**3. Salah menghitung batas grid.** Tiga rasa kesalahan yang paling sering:

- memakai \`<=\` sehingga indeks menyentuh nilai \`rows\` atau \`cols\` dan hasilnya \`undefined\`;
- menukar baris dan kolom (\`grid[c][r]\`) pada grid yang bukan persegi;
- membaca \`grid[0].length\` pada grid kosong \`[]\`, yang langsung melempar error.

Tulis syaratnya eksplisit, \`r >= 0 && r < rows && c >= 0 && c < cols\`, dan tangani grid kosong di
awal fungsi.

**4. Menghitung lapisan BFS dengan cara yang salah.** Menaikkan penghitung waktu setiap kali satu
simpul diproses (bukan setiap lapisan) memberi angka yang jauh lebih besar. Simpan \`size\` di awal
lapisan dan naikkan waktu setelah seluruh lapisan selesai diproses.

**5. Soal "menyebar" yang mustahil tidak ditangani.** Setelah BFS habis, masih ada target yang belum
tersentuh. Fungsinya harus mengembalikan \`-1\`, bukan jumlah langkah yang sudah dijalani. Karena itu
hitung **sisa target**, bukan hanya hitung langkah.

**6. Menganggap semua sisi dua arah padahal grafnya berarah.** Menambahkan sisi balik pada input
seperti \`prerequisites\` membuat hampir semua graf tampak bersiklus. Tentukan arah sisi dari rumus
soalnya, lalu konsisten di seluruh kode.

**7. Menandai kunjungan dengan mengubah input, lalu lupa konsekuensinya.** Mengubah \`'1'\` menjadi
\`'0'\` di papan adalah trik yang sah dan hemat memori, tetapi papan inputnya ikut berubah. Kalau
fungsimu bisa dipanggil lebih dari sekali dengan papan yang sama, pakai matriks \`visited\` terpisah
supaya hasilnya tidak bergantung pada keadaan papan sebelumnya.`,
        en: `**1. Forgetting to mark \`visited\` before enqueueing.** This is the number one BFS bug. If you mark a
node when it *leaves* the queue, the same node can be pushed several times by different neighbours
and the queue explodes — on a large grid the number of entries can far exceed the number of cells
until memory runs out. The rule: **mark when you push, not when you pop.**

\`\`\`js
visited[next] = true;
queue.push(next); // these two lines must never swap
\`\`\`

**2. Marking "visited" too early in a traversal that needs backtracking.** For plain exploration,
marking once and never clearing it is correct. But in problems that must try many paths (searching
for a word inside a grid, enumerating all routes) the mark is temporary: set it on entry, **clear it
on exit**. Without clearing, the search closes off paths that are legitimately allowed through that
cell.

Something similar appears in directed-cycle detection: "already visited" (black) and "currently on
the path" (grey) are two different states. Treating them as one makes safe graphs look cyclic.

**3. Getting the grid bounds wrong.** The three most common flavours:

- using \`<=\`, so the index reaches \`rows\` or \`cols\` and you read \`undefined\`;
- swapping row and column (\`grid[c][r]\`) on a non-square grid;
- touching \`grid[0].length\` on an empty grid \`[]\`, which throws immediately.

Write the check out in full, \`r >= 0 && r < rows && c >= 0 && c < cols\`, and handle an empty grid at
the top of the function.

**4. Counting BFS layers the wrong way.** Advancing the time counter once per processed node instead
of once per layer produces a number that is far too large. Store \`size\` at the start of the layer and
advance the clock only after the whole layer is done.

**5. Not handling a "spread" that is impossible.** When BFS drains, some target cells are still
untouched. The function must return \`-1\`, not the number of steps it walked. So count the **remaining
targets**, not just the steps.

**6. Treating every edge as two-way when the graph is directed.** Adding reverse edges to an input
such as \`prerequisites\` makes almost any graph look cyclic. Read the edge direction from the problem
statement and stay consistent.

**7. Marking visits by mutating the input and then forgetting the consequences.** Turning \`'1'\` into
\`'0'\` on the board is a legitimate, memory-cheap trick, but the caller's grid changes with it. If your
function can be called more than once with the same board, use a separate \`visited\` matrix so the
result does not depend on the board's previous state.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Graf = simpul + sisi. Representasi: **daftar sisi**, **matriks adjacency** (O(V²) memori), dan
  **daftar adjacency** (default, O(V + E) memori).
- Grid adalah graf implisit 4 arah: tetangganya dihitung, bukan disimpan. Penelusurannya
  O(rows × cols) waktu dan ruang.
- Penanda \`visited\` wajib ada di graf. Untuk BFS, tandai **sebelum** mendorong ke antrian.
- **DFS** untuk keberadaan, cacah komponen, ukur luas, dan deteksi siklus. **BFS** untuk jarak atau
  waktu minimum pada graf tanpa bobot, karena BFS mengunjungi per lapisan.
- **BFS multi-sumber** untuk "waktu menyebar": masukkan semua sumber sekaligus, lalu hitung lapisan.
- **Deteksi siklus berarah**: Kahn (derajat masuk) atau DFS tiga warna (putih/abu-abu/hitam).
- Untuk grid besar, tulis DFS dengan stack eksplisit agar tidak menabrak batas kedalaman rekursi.
- Kompleksitas yang perlu disebut saat interview: **O(V + E)** waktu, **O(V)** ruang.

## Latihan yang disarankan

Mulai dari **Flood Fill** untuk membiasakan batas grid dan penandaan kunjungan, lanjut ke
**Number of Islands** untuk mencacah komponen, lalu **Max Area of Island** yang menambahkan
perhitungan ukuran di tengah flood fill. Setelah itu **Rotting Oranges** memaksa kamu pindah ke BFS
multi-sumber, dan **Course Schedule** menutup rangkaian ini dengan deteksi siklus pada graf berarah.

Urutannya sengaja: tiga soal pertama memakai DFS pada grid, dua terakhir memakai BFS dan graf
berarah — persis perbedaan yang paling sering ditanyakan pewawancara.`,
        en: `- A graph is nodes plus edges. Representations: **edge list**, **adjacency matrix** (O(V²) memory),
  and **adjacency list** (the default, O(V + E) memory).
- A grid is an implicit 4-way graph: neighbours are computed, not stored. A traversal costs
  O(rows × cols) time and space.
- A \`visited\` marker is mandatory on a graph. For BFS, mark **before** pushing into the queue.
- **DFS** for existence, counting components, measuring areas, and cycle detection. **BFS** for
  minimum distance or time on an unweighted graph, because BFS visits layer by layer.
- **Multi-source BFS** for "spreading time": push all sources at once, then count the layers.
- **Directed cycle detection**: Kahn (in-degrees) or three-colour DFS (white/grey/black).
- For large grids, write DFS with an explicit stack so you never hit the recursion depth limit.
- The complexity line to quote in an interview: **O(V + E)** time, **O(V)** space.

## Suggested practice

Start with **Flood Fill** to get comfortable with grid bounds and visit markers, continue with
**Number of Islands** to count components, then **Max Area of Island**, which adds a size
computation inside the flood fill. After that **Rotting Oranges** forces you to switch to
multi-source BFS, and **Course Schedule** closes the series with cycle detection on a directed
graph.

The order is deliberate: the first three use DFS on grids, the last two use BFS and a directed
graph — exactly the distinction interviewers ask about most.`,
      },
    },
  ],
  problemSlugs: [
    'flood-fill',
    'number-of-islands',
    'max-area-of-island',
    'rotting-oranges',
    'course-schedule',
  ],
};
