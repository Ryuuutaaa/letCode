import type { Problem } from '~/types/content';

export const linkedListCycle: Problem = {
  slug: 'linked-list-cycle',
  title: {
    id: 'Linked List Cycle',
    en: 'Linked List Cycle',
  },
  difficulty: 'medium',
  trackId: 'linked-list',
  order: 5,
  functionName: 'hasCycle',
  parameters: [
    { name: 'head', type: 'number[]' },
    { name: 'pos', type: 'number' },
  ],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan sebuah linked list yang ditulis sebagai array \`head\`, ditambah bilangan
\`pos\`.

Array itu menggambarkan rantai node seperti biasa, sedangkan \`pos\` menentukan ke node mana
ekor rantai menyambung kembali:

- \`pos = -1\` berarti rantai berakhir normal di \`null\` (tidak ada siklus).
- \`pos = k\` dengan \`k ≥ 0\` berarti \`next\` dari node terakhir menunjuk kembali ke node
  berindeks \`k\`, sehingga rantai berputar tanpa ujung.

Kembalikan \`true\` kalau linked list itu bersiklus, dan \`false\` kalau tidak.

Karena input dikirim sebagai array JSON (bukan pointer), fungsi kamu harus:

1. **Membangun** linked list dari \`head\` memakai kelas \`ListNode\` yang kamu definisikan
   sendiri di dalam kode (kerangkanya tersedia di template), lalu menyambungkan ekornya ke
   node indeks \`pos\` kalau \`pos >= 0\`. Langkah ini menggantikan pointer yang pada soal
   aslinya dikirim langsung oleh penguji.
2. **Mendeteksi siklus** dengan algoritma Floyd (kura-kura dan kelinci): \`slow\` melangkah
   satu node, \`fast\` melangkah dua node. Kalau ada siklus keduanya pasti bertemu; kalau
   tidak, \`fast\` mencapai \`null\`.
3. **Mengembalikan** \`true\` atau \`false\` — \`pos\` bukan petunjuk untuk menebak jawaban,
   pakailah hanya saat membangun list.

Target: O(n) waktu dan O(1) ruang tambahan, jadi jangan menyimpan node yang sudah dilihat di
sebuah \`Set\` atau list.`,
    en: `You are given a linked list written as the array \`head\`, plus an integer \`pos\`.

The array describes a chain of nodes as usual, while \`pos\` decides which node the tail links
back to:

- \`pos = -1\` means the chain ends normally at \`null\` (no cycle).
- \`pos = k\` with \`k ≥ 0\` means the last node's \`next\` points back to the node at index
  \`k\`, so the chain loops forever.

Return \`true\` if that linked list has a cycle, and \`false\` if it does not.

Because the input arrives as a JSON array (no pointers), your function has to:

1. **Build** a linked list from \`head\` using a \`ListNode\` class you define inside your code
   (a skeleton is available in the template), then link the tail back to the node at index
   \`pos\` when \`pos >= 0\`. This step replaces the pointer the original problem hands you
   directly.
2. **Detect the cycle** with Floyd's algorithm (tortoise and hare): \`slow\` moves one node,
   \`fast\` moves two. If a cycle exists they must meet; if not, \`fast\` reaches \`null\`.
3. **Return** \`true\` or \`false\` — \`pos\` is not a hint for guessing the answer, use it only
   while building the list.

Target: O(n) time and O(1) extra space, so do not store visited nodes in a \`Set\` or a
list.`,
  },
  examples: [
    {
      input: 'head = [3,2,0,-4], pos = 1',
      output: 'true',
      explanation: {
        id: 'Ekor -4 menyambung kembali ke node indeks 1 (nilai 2), sehingga terbentuk siklus 2 → 0 → -4 → 2.',
        en: 'The tail -4 links back to the node at index 1 (value 2), forming the cycle 2 → 0 → -4 → 2.',
      },
    },
    {
      input: 'head = [1,2], pos = -1',
      output: 'false',
      explanation: {
        id: 'Tidak ada sambungan balik; rantai berakhir normal di null.',
        en: 'There is no link back; the chain ends normally at null.',
      },
    },
    {
      input: 'head = [1], pos = 0',
      output: 'true',
      explanation: {
        id: 'Satu node yang menunjuk ke dirinya sendiri sudah cukup membentuk siklus.',
        en: 'A single node pointing at itself is already a cycle.',
      },
    },
  ],
  hints: {
    id: [
      'Menyimpan setiap node yang dilewati di sebuah `Set` itu benar dan O(n), tetapi ruangnya O(n). Bisakah lebih hemat?',
      'Kalau `fast` bergerak dua kali lebih cepat daripada `slow`, di dalam siklus ia pasti menyusul dan bertemu `slow`.',
      'Kondisi aman sebelum melangkah dua: `while (fast !== null && fast.next !== null)`.',
      'Bandingkan **node**-nya, bukan nilainya: dua node berbeda boleh punya `val` yang sama.',
    ],
    en: [
      'Storing every visited node in a `Set` works and is O(n), but it costs O(n) space. Can you do better?',
      'If `fast` moves twice as fast as `slow`, inside a cycle it must catch up with `slow`.',
      'The safe condition before a double step: `while (fast !== null && fast.next !== null)`.',
      'Compare **nodes**, not values: two different nodes may hold equal `val`.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Floyd's cycle detection (kura-kura dan kelinci):

\`\`\`js
let slow = start;
let fast = start;

while (fast !== null && fast.next !== null) {
  slow = slow.next;      // 1 langkah
  fast = fast.next.next; // 2 langkah

  if (slow === fast) {
    return true; // bertemu berarti ada siklus
  }
}

return false; // fast keluar dari rantai berarti tidak ada siklus
\`\`\`

Kenapa pasti bertemu kalau ada siklus? Di dalam siklus, \`fast\` bergerak relatif satu node
lebih dekat ke \`slow\` setiap iterasi. Jaraknya berkurang satu terus-menerus, jadi paling
lambat setelah satu putaran penuh keduanya berada di node yang sama. Kalau tidak ada siklus,
\`fast\` selalu lebih dulu keluar dari rantai dan berhenti di \`null\`.

Perhatikan dua hal teknis:

1. Pemeriksaan \`slow === fast\` dilakukan **setelah** keduanya melangkah, bukan sebelum,
   karena sebelum loop keduanya memang sudah sama.
2. Saat membangun list untuk pengujian, kamu perlu menyimpan semua node di array supaya bisa
   menyambungkan ekor ke node indeks \`pos\`. Ruang O(n) itu milik proses pembangunan, bukan
   bagian dari algoritma deteksinya — deteksinya tetap O(1).

## Kompleksitas

- Waktu: O(n) — \`fast\` menempuh paling banyak dua kali panjang list sebelum bertemu atau
  keluar.
- Ruang: O(1) tambahan untuk deteksi (hanya dua pointer).

## Kesalahan umum

- Membandingkan \`val\` node, bukan identitas node. List \`[5,5,5]\` tanpa siklus akan salah
  dilaporkan bersiklus.
- Memakai hash set padahal soal meminta O(1) ruang. Solusinya benar, tetapi persyaratannya
  dilanggar.
- Menulis kondisi \`fast.next !== null && fast !== null\`; urutan ini error pada list kosong.
- Mengembalikan \`true\` hanya karena \`pos >= 0\`. \`pos\` ada untuk membangun list, bukan untuk
  menjawab.
- Memeriksa kesamaan sebelum melangkah, sehingga list tanpa siklus pun langsung dianggap
  bersiklus.`,
    en: `## Approach

Floyd's cycle detection (tortoise and hare):

\`\`\`js
let slow = start;
let fast = start;

while (fast !== null && fast.next !== null) {
  slow = slow.next;      // 1 step
  fast = fast.next.next; // 2 steps

  if (slow === fast) {
    return true; // they met, so a cycle exists
  }
}

return false; // fast fell off the chain, so there is no cycle
\`\`\`

Why must they meet when a cycle exists? Inside the cycle, \`fast\` moves relatively one node
closer to \`slow\` on every iteration. The gap shrinks by one each time, so within at most one
full lap they stand on the same node. Without a cycle, \`fast\` always leaves the chain first
and stops at \`null\`.

Two technical details matter:

1. The \`slow === fast\` check happens **after** both have moved, never before, because before
   the loop they are trivially equal.
2. While building the test list you need to keep every node in an array so the tail can be
   linked back to the node at index \`pos\`. That O(n) space belongs to the setup, not to the
   detection algorithm — the detection itself stays O(1).

## Complexity

- Time: O(n) — \`fast\` covers at most twice the list length before it meets \`slow\` or exits.
- Space: O(1) extra for the detection (two pointers only).

## Common mistakes

- Comparing a node's \`val\` instead of the node identity. The list \`[5,5,5]\` with no cycle
  gets reported as cyclic.
- Using a hash set when O(1) space is required. It is correct, but it breaks the constraint.
- Writing the condition as \`fast.next !== null && fast !== null\`; that order crashes on an
  empty list.
- Returning \`true\` just because \`pos >= 0\`. \`pos\` builds the list, it does not answer the
  question.
- Checking for equality before moving, which marks a cycle-free list as cyclic immediately.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `// The list arrives as a plain array, e.g. [1, 2, 3] means 1 -> 2 -> 3.
// pos is the index the last node links back to, or -1 when there is no cycle.
// Build the linked list with this class, then detect the cycle.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head, pos) {
  // write your solution here
}
`,
      solution: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function buildCycleList(values, pos) {
  if (values.length === 0) {
    return null;
  }

  const nodes = values.map(value => new ListNode(value));

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (pos >= 0) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}

function hasCycle(head, pos) {
  const start = buildCycleList(head, pos);
  let slow = start;
  let fast = start;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
`,
    },
    {
      language: 'python',
      template: `# The list arrives as a plain array, e.g. [1, 2, 3] means 1 -> 2 -> 3.
# pos is the index the last node links back to, or -1 when there is no cycle.
# Build the linked list with this class, then detect the cycle.
class ListNode:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt


def hasCycle(head, pos):
    # write your solution here
    pass
`,
      solution: `class ListNode:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt


def build_cycle_list(values, pos):
    if not values:
        return None

    nodes = [ListNode(value) for value in values]

    for index in range(len(nodes) - 1):
        nodes[index].next = nodes[index + 1]

    if pos >= 0:
        nodes[-1].next = nodes[pos]

    return nodes[0]


def hasCycle(head, pos):
    start = build_cycle_list(head, pos)
    slow = start
    fast = start

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

        if slow is fast:
            return True

    return False
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[3, 2, 0, -4], 1], expected: true },
    { id: 'c2', input: [[1, 2], -1], expected: false },
    { id: 'c3', input: [[1], 0], expected: true },
    { id: 'c4', input: [[], -1], expected: false, hidden: true },
    { id: 'c5', input: [[1], -1], expected: false, hidden: true },
    { id: 'c6', input: [[1, 2, 3, 4], 0], expected: true, hidden: true },
    { id: 'c7', input: [[-1, -2, -3], 2], expected: true, hidden: true },
    { id: 'c8', input: [[5, 5, 5], -1], expected: false, hidden: true },
  ],
};
