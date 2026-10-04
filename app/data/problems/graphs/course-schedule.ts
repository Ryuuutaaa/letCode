import type { Problem } from '~/types/content';

export const courseSchedule: Problem = {
  slug: 'course-schedule',
  title: {
    id: 'Jadwal Mata Kuliah',
    en: 'Course Schedule',
  },
  difficulty: 'hard',
  trackId: 'graphs',
  order: 5,
  functionName: 'canFinish',
  parameters: [
    { name: 'numCourses', type: 'number' },
    { name: 'prerequisites', type: 'number[][]' },
  ],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Ada \`numCourses\` mata kuliah yang dinomori dari \`0\` sampai \`numCourses - 1\` dan harus kamu
ambil semuanya. Sebagian mata kuliah punya prasyarat, ditulis sebagai daftar pasangan
\`prerequisites\`, di mana pasangan \`[a, b]\` berarti **"untuk mengambil mata kuliah \`a\`, kamu
harus menyelesaikan mata kuliah \`b\` lebih dulu"**.

Kembalikan \`true\` kalau ada urutan pengambilan yang membuat semua mata kuliah bisa diselesaikan,
atau \`false\` kalau tidak ada.

Kalau prasyaratnya membentuk lingkaran, tidak ada urutan yang sah. Misalnya \`numCourses = 3\` dengan
prasyarat \`[[0,1],[1,2],[2,0]]\`: 0 butuh 1, 1 butuh 2, dan 2 butuh 0 — kamu tidak bisa mulai dari
mana pun. Kasus khusus yang juga termasuk lingkaran adalah mata kuliah yang menjadi prasyarat bagi
dirinya sendiri, seperti \`[3, 3]\`.

Batasan: \`1 <= numCourses <= 2000\`, \`0 <= prerequisites.length <= 5000\`, dan setiap angka di
dalam \`prerequisites\` berada di antara \`0\` dan \`numCourses - 1\`.`,
    en: `There are \`numCourses\` courses numbered from \`0\` to \`numCourses - 1\` and you must take all of
them. Some courses have prerequisites, given as a list of pairs \`prerequisites\`, where the pair
\`[a, b]\` means **"to take course \`a\` you must first finish course \`b\`"**.

Return \`true\` when there is an order in which every course can be completed, or \`false\` when there
is none.

When the prerequisites form a loop, no valid order exists. For example \`numCourses = 3\` with
prerequisites \`[[0,1],[1,2],[2,0]]\`: 0 needs 1, 1 needs 2, and 2 needs 0 — you cannot start
anywhere. A special case that also counts as a loop is a course that is a prerequisite for itself,
such as \`[3, 3]\`.

Constraints: \`1 <= numCourses <= 2000\`, \`0 <= prerequisites.length <= 5000\`, and every number in
\`prerequisites\` lies between \`0\` and \`numCourses - 1\`.`,
  },
  examples: [
    {
      input: 'numCourses = 2, prerequisites = [[1,0]]',
      output: 'true',
      explanation: {
        id: 'Ambil mata kuliah 0 dulu, baru 1. Tidak ada yang menghalangi.',
        en: 'Take course 0 first, then course 1. Nothing stands in the way.',
      },
    },
    {
      input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
      output: 'false',
      explanation: {
        id: 'Mata kuliah 1 butuh 0, dan 0 butuh 1. Keduanya saling menunggu, jadi tidak ada titik awal.',
        en: 'Course 1 needs 0, and 0 needs 1. They wait on each other, so there is no starting point.',
      },
    },
    {
      input: 'numCourses = 5, prerequisites = [[1,4],[2,4],[3,1],[3,2]]',
      output: 'true',
      explanation: {
        id: 'Urutan yang sah misalnya 4 → 0 → 1 → 2 → 3. Mata kuliah 3 boleh diambil paling akhir karena butuh 1 dan 2.',
        en: 'A valid order is 4 → 0 → 1 → 2 → 3. Course 3 can only be taken last because it needs both 1 and 2.',
      },
    },
  ],
  hints: {
    id: [
      'Terjemahkan dulu soalnya: apa simpulnya, dan ke arah mana sisinya? Setelah itu pertanyaan "bisakah semua diambil?" menjadi pertanyaan yang jauh lebih dikenal.',
      'Kamu sedang mencari **siklus pada graf berarah**. Kalau tidak ada siklus, selalu ada urutan yang sah.',
      'Coba mulai dari mata kuliah yang tidak punya prasyarat. Setelah satu mata kuliah diambil, mata kuliah yang tadinya menunggunya jadi lebih longgar.',
      'Hitung berapa banyak prasyarat yang belum selesai untuk setiap mata kuliah. Setiap kali satu mata kuliah diambil, kurangi angka itu pada mata kuliah yang bergantung padanya. Kalau angkanya mencapai nol, mata kuliah itu siap diambil.',
    ],
    en: [
      'Translate the problem first: what are the nodes, and which way do the edges point? After that "can everything be taken?" becomes a question you already know.',
      'You are looking for a **cycle in a directed graph**. When there is no cycle, a valid order always exists.',
      'Try starting from a course that has no prerequisites. Once a course is taken, the courses waiting on it become less constrained.',
      'Count how many unfinished prerequisites each course still has. Whenever a course is taken, decrement that number on the courses depending on it. When the number hits zero, that course is ready to take.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Soal ini adalah **deteksi siklus pada graf berarah**. Simpulnya mata kuliah, dan pasangan
\`[a, b]\` menjadi sisi berarah \`b → a\` (dari prasyarat ke mata kuliah yang membutuhkannya).
Kalau grafnya bersiklus, semua mata kuliah di siklus itu saling menunggu dan tidak ada yang bisa
dimulai; kalau tidak bersiklus, selalu ada urutan yang sah.

Cara paling langsung adalah **algoritma Kahn** (topological sort dengan BFS):

1. Bangun daftar adjacency \`adj[b].push(a)\` dan hitung \`inDegree[a]\` — banyaknya prasyarat
   yang belum selesai untuk mata kuliah \`a\`.
2. Masukkan semua mata kuliah dengan \`inDegree\` nol ke antrian. Mereka bisa diambil sekarang.
3. Selama antrian tidak kosong: keluarkan satu mata kuliah, hitung sebagai "sudah diambil", lalu
   untuk setiap mata kuliah yang bergantung padanya kurangi derajat masuknya. Kalau jadi nol,
   masukkan ke antrian — sekarang ia siap.
4. Kalau jumlah mata kuliah yang berhasil diambil sama dengan \`numCourses\`, seluruh graf bisa
   diselesaikan. Kalau kurang, sisanya saling menunggu: ada siklus.

\`\`\`js
while (head < queue.length) {
  const course = queue[head];
  head++;
  taken++;

  for (const next of adjacency[course]) {
    inDegree[next]--;
    if (inDegree[next] === 0) queue.push(next);
  }
}

return taken === numCourses;
\`\`\`

Algoritma ini sekaligus menghasilkan **topological sort**: urutan keluarnya mata kuliah dari
antrian adalah salah satu urutan pengambilan yang sah.

**Alternatif: DFS tiga warna.** Telusuri dengan status *putih* (belum dikunjungi), *abu-abu*
(sedang ada di lintasan yang sekarang) dan *hitam* (selesai). Sisi menuju simpul abu-abu berarti
siklus; sisi menuju simpul hitam aman. Perhatikan bahwa \`visited\` biasa tidak cukup di sini —
simpul yang sudah selesai dikunjungi bukan bukti adanya siklus.

## Kompleksitas

- Waktu: O(V + E) — setiap mata kuliah masuk antrian sekali, dan setiap prasyarat diproses sekali.
  Dengan V = \`numCourses\` dan E = \`prerequisites.length\`.
- Ruang: O(V + E) untuk daftar adjacency, derajat masuk, dan antrian.

## Kesalahan umum

- **Memasukkan sisi dengan arah terbalik.** \`[a, b]\` berarti \`b → a\`. Kalau arahnya dibalik,
  hasilnya masih \`true\` pada banyak kasus, tetapi salah pada graf yang punya siklus. Periksa arah
  sisi dengan contoh kecil sebelum menulis kode panjang.
- **Menggunakan \`visited\` biasa untuk mencari siklus pada graf berarah.** Bertemu simpul yang
  sudah pernah dikunjungi bukan bukti adanya siklus; yang perlu dideteksi adalah bertemu simpul
  yang sedang ada di jalur saat ini.
- **Lupa menangani graf dengan beberapa komponen.** Sebuah siklus di komponen kecil tetap membuat
  jawabannya \`false\`, walaupun komponen besar lainnya sehat. Karena itu penghitungannya harus
  global: \`taken === numCourses\`.
- **Menambah derajat masuk berkali-kali untuk sisi kembar.** Kalau \`[1,0]\` muncul dua kali,
  \`inDegree[1]\` bernilai 2 dan penurunannya juga harus dua kali. Perhitungan yang simetris seperti
  di atas otomatis benar.
- **Menjawab \`true\` hanya karena antriannya tidak kosong di awal.** Yang menentukan adalah apakah
  **semua** simpul berhasil dilepas, bukan sekadar ada simpul yang bisa mulai.
- **Menganggap \`numCourses = 1\` tanpa prasyarat itu tidak valid.** Justru itu kasus paling mudah:
  \`true\`.`,
    en: `## Approach

This is **cycle detection on a directed graph**. The nodes are courses, and the pair \`[a, b]\` becomes
the directed edge \`b → a\` (from the prerequisite to the course that needs it). If the graph has a
cycle, all the courses on that cycle wait on each other and none can start; if there is no cycle, a
valid order always exists.

The most direct route is **Kahn's algorithm** (topological sort with BFS):

1. Build the adjacency list with \`adj[b].push(a)\` and compute \`inDegree[a]\` — how many unfinished
   prerequisites course \`a\` still has.
2. Push every course with \`inDegree\` zero into the queue. Those can be taken right now.
3. While the queue is not empty: pop a course, count it as "taken", then for every course depending
   on it decrement the in-degree. If it drops to zero, push that course — it is ready now.
4. If the number of taken courses equals \`numCourses\`, the whole graph can be completed. If it is
   smaller, the leftovers wait on each other: there is a cycle.

\`\`\`js
while (head < queue.length) {
  const course = queue[head];
  head++;
  taken++;

  for (const next of adjacency[course]) {
    inDegree[next]--;
    if (inDegree[next] === 0) queue.push(next);
  }
}

return taken === numCourses;
\`\`\`

The algorithm also produces a **topological sort** on the side: the order in which courses leave the
queue is one valid plan of study.

**Alternative: three-colour DFS.** Walk with the states *white* (unvisited), *grey* (currently on
this path) and *black* (finished). An edge into a grey node means a cycle; an edge into a black node
is safe. Note that a plain \`visited\` flag is not enough here — a node you already finished is not
evidence of a cycle.

## Complexity

- Time: O(V + E) — every course enters the queue once and every prerequisite is processed once,
  with V = \`numCourses\` and E = \`prerequisites.length\`.
- Space: O(V + E) for the adjacency list, the in-degrees, and the queue.

## Common mistakes

- **Inserting the edges backwards.** \`[a, b]\` means \`b → a\`. With the direction flipped the answer is
  still \`true\` in many cases, but wrong on graphs that do contain a cycle. Check the direction on a
  tiny example before writing long code.
- **Using a plain \`visited\` flag to find a cycle in a directed graph.** Meeting an already-visited
  node is not evidence of a cycle; what you must detect is meeting a node on the current path.
- **Forgetting graphs with several components.** A cycle inside a small component still makes the
  answer \`false\`, even when the large component is healthy. That is why the count must be global:
  \`taken === numCourses\`.
- **Counting the in-degree several times for twin edges.** If \`[1,0]\` appears twice, \`inDegree[1]\` is
  2 and it must be decremented twice as well. A symmetric computation as above handles this
  automatically.
- **Answering \`true\` just because the queue was not empty at the start.** What decides the answer is
  whether **every** node was released, not whether some node could start.
- **Assuming \`numCourses = 1\` with no prerequisites is invalid.** It is in fact the easiest case:
  \`true\`.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function canFinish(numCourses, prerequisites) {
  // write your solution here
}
`,
      solution: `function canFinish(numCourses, prerequisites) {
  const adjacency = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    adjacency[prerequisite].push(course); // prerequisite -> course
    inDegree[course]++;
  }

  const queue = [];

  for (let course = 0; course < numCourses; course++) {
    if (inDegree[course] === 0) {
      queue.push(course);
    }
  }

  let head = 0;
  let taken = 0;

  while (head < queue.length) {
    const course = queue[head];
    head++;
    taken++;

    for (const next of adjacency[course]) {
      inDegree[next]--;

      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  // Courses left waiting on each other form a cycle.
  return taken === numCourses;
}
`,
    },
    {
      language: 'python',
      template: `def canFinish(numCourses, prerequisites):
    # write your solution here
    pass
`,
      solution: `from collections import deque


def canFinish(numCourses, prerequisites):
    adjacency = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses

    for course, prerequisite in prerequisites:
        adjacency[prerequisite].append(course)  # prerequisite -> course
        in_degree[course] += 1

    queue = deque(course for course in range(numCourses) if in_degree[course] == 0)
    taken = 0

    while queue:
        course = queue.popleft()
        taken += 1

        for following in adjacency[course]:
            in_degree[following] -= 1

            if in_degree[following] == 0:
                queue.append(following)

    # Courses left waiting on each other form a cycle.
    return taken == numCourses
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [2, [[1, 0]]],
      expected: true,
    },
    {
      id: 'c2',
      input: [2, [[1, 0], [0, 1]]],
      expected: false,
    },
    {
      id: 'c3',
      input: [5, [[1, 4], [2, 4], [3, 1], [3, 2]]],
      expected: true,
    },
    {
      id: 'c4',
      input: [1, []],
      expected: true,
      hidden: true,
    },
    {
      id: 'c5',
      input: [3, [[0, 1], [1, 2], [2, 0]]],
      expected: false,
      hidden: true,
    },
    {
      id: 'c6',
      input: [4, [[1, 0], [2, 1], [3, 2]]],
      expected: true,
      hidden: true,
    },
    {
      id: 'c7',
      input: [1, [[0, 0]]],
      expected: false,
      hidden: true,
    },
    {
      id: 'c8',
      input: [6, [[1, 0], [2, 1], [1, 2], [4, 5]]],
      expected: false,
      hidden: true,
    },
    {
      id: 'c9',
      input: [5, [[1, 0], [2, 0], [3, 1], [4, 3], [2, 4]]],
      expected: true,
      hidden: true,
    },
    {
      id: 'c10',
      input: [3, [[1, 0], [1, 0], [2, 1]]],
      expected: true,
      hidden: true,
    },
    {
      id: 'c11',
      input: [
        2000,
        Array.from({ length: 1999 }, (_, index) => [index + 1, index]),
      ],
      expected: true,
      hidden: true,
    },
    {
      id: 'c12',
      input: [
        2000,
        [...Array.from({ length: 1999 }, (_, index) => [index + 1, index]), [0, 1999]],
      ],
      expected: false,
      hidden: true,
    },
  ],
};
