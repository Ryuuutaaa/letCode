import type { Problem } from '~/types/content';

export const reverseLinkedList: Problem = {
  slug: 'reverse-linked-list',
  title: {
    id: 'Reverse Linked List',
    en: 'Reverse Linked List',
  },
  difficulty: 'easy',
  trackId: 'linked-list',
  order: 1,
  functionName: 'reverseList',
  parameters: [{ name: 'head', type: 'number[]' }],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan sebuah linked list yang ditulis sebagai array \`head\`. Contoh: \`[1,2,3]\`
berarti rantai node \`1 → 2 → 3\`.

Balikkan urutan seluruh node, lalu kembalikan linked list hasilnya **sebagai array**.

Karena nilai yang dikirim platform adalah array JSON biasa (bukan pointer), fungsi kamu
harus melakukan tiga langkah:

1. **Membangun** linked list dari \`head\` memakai kelas \`ListNode\` yang kamu definisikan
   sendiri di dalam kode (kerangka kelasnya sudah tersedia di template).
2. **Membalik** rantai node itu dengan mengubah pointer \`next\` — bukan dengan menyalin
   nilainya ke array baru lalu membalik array tersebut.
3. **Menelusuri** hasilnya dari kepala baru dan mengembalikannya sebagai array.

Target: O(n) waktu dan O(1) ruang tambahan untuk proses pembalikan.

Klasik tapi paling sering ditanya: di sini urutan operasi pointer-mu diuji.`,
    en: `You are given a linked list written as an array \`head\`. For example, \`[1,2,3]\` means
the chain of nodes \`1 → 2 → 3\`.

Reverse the order of every node, then return the resulting linked list **as an array**.

Because the platform only sends plain JSON arrays (no pointers), your function has to do
three steps:

1. **Build** a linked list from \`head\` using a \`ListNode\` class you define inside your code
   (a skeleton of the class is provided in the template).
2. **Reverse** that chain of nodes by rewiring the \`next\` pointers — not by copying the
   values into a new array and reversing that array.
3. **Walk** the result from the new head and return it as an array.

Target: O(n) time and O(1) extra space for the reversal.

A classic, but the most frequently asked one: it is where the order of your pointer
operations gets judged.`,
  },
  examples: [
    {
      input: 'head = [1,2,3,4,5]',
      output: '[5,4,3,2,1]',
      explanation: {
        id: 'Rantai dibalik sehingga node terakhir menjadi kepala baru.',
        en: 'The chain is reversed so the last node becomes the new head.',
      },
    },
    {
      input: 'head = []',
      output: '[]',
      explanation: {
        id: 'List kosong tidak punya node, jadi hasilnya array kosong.',
        en: 'An empty list has no nodes, so the result is an empty array.',
      },
    },
    {
      input: 'head = [7]',
      output: '[7]',
      explanation: {
        id: 'Satu node tidak berubah, tetapi fungsinya tetap harus mengembalikan array.',
        en: 'A single node stays the same, but the function still has to return an array.',
      },
    },
  ],
  hints: {
    id: [
      'Gambar tiga node dulu: `1 → 2 → 3`. Kalau kamu mengubah `1.next` supaya menunjuk ke belakang, apa yang hilang?',
      'Kamu butuh tiga variabel: node sebelumnya (`prev`), node sekarang (`current`), dan penerusnya (`next`).',
      'Simpan `current.next` di variabel sebelum menimpanya, baru balik panahnya, lalu majukan `prev` dan `current`.',
      'Setelah loop selesai, `current` bernilai `null`; kepala baru adalah `prev`.',
    ],
    en: [
      'Draw three nodes first: `1 → 2 → 3`. If you make `1.next` point backwards, what gets lost?',
      'You need three variables: the previous node (`prev`), the current one (`current`), and its successor (`next`).',
      'Store `current.next` in a variable before overwriting it, then flip the link, then advance `prev` and `current`.',
      'When the loop ends, `current` is `null`; the new head is `prev`.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Bangun linked list dari array input dengan loop sederhana, lalu balik rantainya memakai tiga
variabel:

\`\`\`js
let prev = null;
let current = head;

while (current !== null) {
  const next = current.next; // 1. simpan penerus dulu
  current.next = prev;       // 2. baru balik arah panahnya
  prev = current;            // 3. majukan prev
  current = next;            // 4. majukan current
}
\`\`\`

Setelah loop selesai, \`current\` bernilai \`null\` dan \`prev\` menunjuk node terakhir dari
list asli — itulah kepala baru. Tinggal telusuri dari \`prev\` ke array hasil.

## Kompleksitas

- Waktu: O(n) — satu lintasan untuk membangun, satu untuk membalik, satu untuk menelusuri.
- Ruang: O(1) tambahan untuk pembalikan (node hasil pembangunan input sendiri memakai O(n)
  ruang, dan itu tidak bisa dihindari karena input datang sebagai array).

## Kesalahan umum

- Menimpa \`current.next\` sebelum menyimpan penerusnya, sehingga sisa list hilang tanpa
  error.
- Mengembalikan \`current\` (yang sudah \`null\`) alih-alih \`prev\`.
- Mengembalikan node, padahal yang diminta array.
- Membalik nilai lewat array baru. Hasilnya benar, tetapi inti latihan pointer-nya hilang.`,
    en: `## Approach

Build the linked list from the input array with a simple loop, then reverse the chain with
three variables:

\`\`\`js
let prev = null;
let current = head;

while (current !== null) {
  const next = current.next; // 1. save the successor first
  current.next = prev;       // 2. only then flip the link
  prev = current;            // 3. advance prev
  current = next;            // 4. advance current
}
\`\`\`

When the loop ends, \`current\` is \`null\` and \`prev\` points at the last node of the original
list — that is the new head. Then walk from \`prev\` into the result array.

## Complexity

- Time: O(n) — one pass to build, one to reverse, one to walk out.
- Space: O(1) extra for the reversal (the nodes built from the input take O(n) space, which
  is unavoidable since the input arrives as an array).

## Common mistakes

- Overwriting \`current.next\` before saving the successor, so the rest of the list vanishes
  without any error.
- Returning \`current\` (which is \`null\`) instead of \`prev\`.
- Returning a node when an array is expected.
- Reversing values through a fresh array. The answer is right, but the point of the pointer
  exercise is lost.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `// The linked list arrives as a plain array, e.g. [1, 2, 3] means 1 -> 2 -> 3.
// Build a linked list with this class, process it, then return an array.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // write your solution here
}
`,
      solution: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function buildList(values) {
  const dummy = new ListNode(0);
  let tail = dummy;

  for (const value of values) {
    tail.next = new ListNode(value);
    tail = tail.next;
  }

  return dummy.next;
}

function toArray(head) {
  const result = [];
  let node = head;

  while (node !== null) {
    result.push(node.val);
    node = node.next;
  }

  return result;
}

function reverseList(head) {
  let prev = null;
  let current = buildList(head);

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return toArray(prev);
}
`,
    },
    {
      language: 'python',
      template: `# The linked list arrives as a plain array, e.g. [1, 2, 3] means 1 -> 2 -> 3.
# Build a linked list with this class, process it, then return an array.
class ListNode:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt


def reverseList(head):
    # write your solution here
    pass
`,
      solution: `class ListNode:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt


def build_list(values):
    dummy = ListNode(0)
    tail = dummy

    for value in values:
        tail.next = ListNode(value)
        tail = tail.next

    return dummy.next


def to_array(head):
    values = []
    node = head

    while node is not None:
        values.append(node.val)
        node = node.next

    return values


def reverseList(head):
    prev = None
    current = build_list(head)

    while current is not None:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt

    return to_array(prev)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
    { id: 'c2', input: [[1, 2]], expected: [2, 1] },
    { id: 'c3', input: [[]], expected: [] },
    { id: 'c4', input: [[42]], expected: [42], hidden: true },
    { id: 'c5', input: [[-3, 0, 5, -3]], expected: [-3, 5, 0, -3], hidden: true },
    {
      id: 'c6',
      input: [[1000000, -1000000, 0, 7]],
      expected: [7, 0, -1000000, 1000000],
      hidden: true,
    },
    { id: 'c7', input: [[0, 0]], expected: [0, 0], hidden: true },
  ],
};
