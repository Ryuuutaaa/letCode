import type { Problem } from '~/types/content';

export const removeNthNodeFromEnd: Problem = {
  slug: 'remove-nth-node-from-end',
  title: {
    id: 'Remove Nth Node From End',
    en: 'Remove Nth Node From End',
  },
  difficulty: 'medium',
  trackId: 'linked-list',
  order: 4,
  functionName: 'removeNthFromEnd',
  parameters: [
    { name: 'head', type: 'number[]' },
    { name: 'n', type: 'number' },
  ],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan sebuah linked list yang ditulis sebagai array \`head\`, plus bilangan bulat
\`n\`. Contoh: \`[1,2,3,4,5]\` berarti rantai node \`1 → 2 → 3 → 4 → 5\`.

Hapus node **ke-n dari belakang** (\`n = 1\` berarti node terakhir), lalu kembalikan linked
list hasilnya **sebagai array**.

Karena input dikirim sebagai array JSON (bukan pointer), fungsi kamu harus:

1. **Membangun** linked list dari \`head\` memakai kelas \`ListNode\` yang kamu definisikan
   sendiri di dalam kode (kerangkanya tersedia di template).
2. **Menemukan node sasaran** dengan dua pointer berjarak tetap \`n\`: jauhkan pointer depan
   sebanyak \`n\` langkah lebih dulu, baru geser keduanya bersamaan.
3. **Menelusuri** hasilnya dan mengembalikannya sebagai array.

\`n\` selalu valid, yaitu \`1 ≤ n ≤ jumlah node\`. Node kepala boleh ikut terhapus, dan itu
bagian yang paling sering membuat solusi orang gagal. Target: satu lintasan, O(n) waktu dan
O(1) ruang tambahan.`,
    en: `You are given a linked list written as the array \`head\`, plus an integer \`n\`. For
example, \`[1,2,3,4,5]\` means the chain of nodes \`1 → 2 → 3 → 4 → 5\`.

Remove the node **n-th from the end** (\`n = 1\` means the last node), then return the
resulting linked list **as an array**.

Because the input arrives as a JSON array (no pointers), your function has to:

1. **Build** a linked list from \`head\` using a \`ListNode\` class you define inside your code
   (a skeleton is available in the template).
2. **Find the target node** with two pointers at a fixed gap of \`n\`: move the front pointer
   \`n\` steps ahead first, then advance both together.
3. **Walk** the result and return it as an array.

\`n\` is always valid, that is \`1 ≤ n ≤ number of nodes\`. The head node may be the one being
removed, and that is the case that breaks most attempts. Target: a single pass, O(n) time
and O(1) extra space.`,
  },
  examples: [
    {
      input: 'head = [1,2,3,4,5], n = 2',
      output: '[1,2,3,5]',
      explanation: {
        id: 'Node ke-2 dari belakang adalah 4, sehingga rantai menjadi 1 → 2 → 3 → 5.',
        en: 'The 2nd node from the end is 4, so the chain becomes 1 → 2 → 3 → 5.',
      },
    },
    {
      input: 'head = [1], n = 1',
      output: '[]',
      explanation: {
        id: 'Satu-satunya node dihapus, jadi hasilnya list kosong.',
        en: 'The only node is removed, so the result is an empty list.',
      },
    },
    {
      input: 'head = [1,2], n = 2',
      output: '[2]',
      explanation: {
        id: 'Menghapus kepala: node kedua menjadi kepala baru.',
        en: 'Removing the head: the second node becomes the new head.',
      },
    },
  ],
  hints: {
    id: [
      'Kalau dua pointer berjarak tepat `n` node, apa yang terjadi ketika pointer depan sampai di node terakhir?',
      'Pakai dummy head supaya menghapus node pertama tidak jadi kasus khusus.',
      'Kunci jaraknya lebih dulu: geser pointer depan `n` langkah, baru geser keduanya bersamaan sampai pointer depan berada di node terakhir.',
      'Pointer belakang akan berhenti di node **sebelum** sasaran, jadi cukup `slow.next = slow.next.next`.',
    ],
    en: [
      'If two pointers keep a gap of exactly `n` nodes, what happens when the front pointer reaches the last node?',
      'Use a dummy head so that removing the first node needs no special case.',
      'Lock the gap first: move the front pointer `n` steps, then advance both together until the front one sits on the last node.',
      'The back pointer stops on the node **before** the target, so `slow.next = slow.next.next` is enough.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Dua pointer berjarak tetap, dengan dummy head sebagai pijakan:

\`\`\`js
const dummy = new ListNode(0);
dummy.next = buildList(head);
let fast = dummy;
let slow = dummy;

for (let i = 0; i < n; i++) {
  fast = fast.next; // kunci jarak n langkah
}

while (fast.next !== null) {
  fast = fast.next;
  slow = slow.next;
}

slow.next = slow.next.next; // hapus node sasaran
return toArray(dummy.next);
\`\`\`

Setelah langkah 2, jarak \`fast\` ke \`slow\` tepat \`n\` node. Ketika \`fast\` berada di node
terakhir, \`slow\` berada tepat **sebelum** node sasaran — posisi yang kamu butuhkan untuk
mengubah \`next\`.

Dummy head menyelesaikan kasus paling licin: kalau \`n\` sama dengan panjang list, yang
dihapus adalah kepala, dan kepalanya adalah \`dummy.next\`.

## Kompleksitas

- Waktu: O(n) — \`fast\` berjalan \`n\` langkah lebih dulu, lalu keduanya berjalan bersama
  sampai ujung. Total tetap satu lintasan.
- Ruang: O(1) tambahan, hanya dua pointer dan satu dummy.

## Kesalahan umum

- Menggeser \`fast\` sebanyak \`n - 1\` atau \`n + 1\` langkah, sehingga node yang terhapus
  salah (off-by-one).
- Lupa dummy head, lalu hasilnya salah ketika kepala yang harus dihapus.
- Menulis \`slow.next = slow.next.next\` tanpa menyadari \`slow.next\` bisa \`null\`.
- Mengembalikan \`dummy\` alih-alih \`dummy.next\`.
- Menghitung panjang list lebih dulu, berjalan ke depan lalu ke belakang: tetap O(n) tetapi
  dua lintasan, bukan satu.`,
    en: `## Approach

Two pointers at a fixed gap, with a dummy head as the foothold:

\`\`\`js
const dummy = new ListNode(0);
dummy.next = buildList(head);
let fast = dummy;
let slow = dummy;

for (let i = 0; i < n; i++) {
  fast = fast.next; // lock the gap at n steps
}

while (fast.next !== null) {
  fast = fast.next;
  slow = slow.next;
}

slow.next = slow.next.next; // unlink the target node
return toArray(dummy.next);
\`\`\`

After step 2 the gap between \`fast\` and \`slow\` is exactly \`n\` nodes. When \`fast\` sits on
the last node, \`slow\` sits right **before** the target — exactly the position you need to
rewire \`next\`.

The dummy head handles the slippery case: when \`n\` equals the list length, the head itself
is removed, and the head is \`dummy.next\`.

## Complexity

- Time: O(n) — \`fast\` runs \`n\` steps ahead, then both walk to the end together. Still one
  pass overall.
- Space: O(1) extra, just two pointers and one dummy.

## Common mistakes

- Moving \`fast\` by \`n - 1\` or \`n + 1\` steps, so the wrong node gets removed (off-by-one).
- Skipping the dummy head and getting a wrong answer when the head is the one removed.
- Writing \`slow.next = slow.next.next\` without realising \`slow.next\` can be \`null\`.
- Returning \`dummy\` instead of \`dummy.next\`.
- Counting the length first and walking twice: still O(n), but two passes instead of one.`,
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

function removeNthFromEnd(head, n) {
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

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = buildList(head);

  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  return toArray(dummy.next);
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


def removeNthFromEnd(head, n):
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


def removeNthFromEnd(head, n):
    dummy = ListNode(0, build_list(head))

    fast = dummy
    slow = dummy

    for _ in range(n):
        fast = fast.next

    while fast.next is not None:
        fast = fast.next
        slow = slow.next

    slow.next = slow.next.next

    return to_array(dummy.next)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
    { id: 'c2', input: [[1], 1], expected: [] },
    { id: 'c3', input: [[1, 2], 1], expected: [1] },
    { id: 'c4', input: [[1, 2], 2], expected: [2], hidden: true },
    { id: 'c5', input: [[-5, -3, -1], 3], expected: [-3, -1], hidden: true },
    { id: 'c6', input: [[7, 7, 7, 7], 2], expected: [7, 7, 7], hidden: true },
    {
      id: 'c7',
      input: [[1000000, -1000000, 0, 999999], 4],
      expected: [-1000000, 0, 999999],
      hidden: true,
    },
  ],
};
