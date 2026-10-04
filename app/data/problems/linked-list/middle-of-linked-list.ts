import type { Problem } from '~/types/content';

export const middleOfLinkedList: Problem = {
  slug: 'middle-of-linked-list',
  title: {
    id: 'Middle of Linked List',
    en: 'Middle of Linked List',
  },
  difficulty: 'medium',
  trackId: 'linked-list',
  order: 3,
  functionName: 'middleNode',
  parameters: [{ name: 'head', type: 'number[]' }],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan sebuah linked list yang ditulis sebagai array \`head\`. Contoh: \`[1,2,3]\`
berarti rantai node \`1 → 2 → 3\`.

Kembalikan **setengah kedua** linked list itu, dimulai dari node tengah, sebagai array.
Kalau jumlah node genap, ada dua node tengah; yang dipakai adalah **node tengah yang
kedua**.

Contoh: \`[1,2,3,4,5]\` → node tengah \`3\` → jawabannya \`[3,4,5]\`.
\`[1,2,3,4]\` → node tengah kedua \`3\` → jawabannya \`[3,4]\`.

Karena input dikirim sebagai array JSON (bukan pointer), fungsi kamu harus:

1. **Membangun** linked list dari \`head\` memakai kelas \`ListNode\` yang kamu definisikan
   sendiri di dalam kode (kerangkanya tersedia di template).
2. **Mencari node tengah** dengan dua pointer berkecepatan berbeda: \`slow\` melangkah satu
   node, \`fast\` melangkah dua node.
3. **Menelusuri** dari node tengah itu sampai ujung, lalu mengembalikan nilainya sebagai
   array.

Target: O(n) waktu dan O(1) ruang tambahan. Jangan menghitung panjang list lebih dulu dan
jangan menyalin seluruh node ke array — selesaikan dengan satu lintasan.`,
    en: `You are given a linked list written as the array \`head\`. For example, \`[1,2,3]\` means
the chain of nodes \`1 → 2 → 3\`.

Return the **second half** of that linked list, starting at the middle node, as an array.
When the node count is even there are two middle nodes; use the **second** one.

Example: \`[1,2,3,4,5]\` → the middle node is \`3\` → answer \`[3,4,5]\`.
\`[1,2,3,4]\` → the second middle node is \`3\` → answer \`[3,4]\`.

Because the input arrives as a JSON array (no pointers), your function has to:

1. **Build** a linked list from \`head\` using a \`ListNode\` class you define inside your code
   (a skeleton is available in the template).
2. **Find the middle node** with two pointers at different speeds: \`slow\` moves one node,
   \`fast\` moves two.
3. **Walk** from that middle node to the end and return the values as an array.

Target: O(n) time and O(1) extra space. Do not count the length first and do not copy the
whole list into an array — solve it in a single pass.`,
  },
  examples: [
    {
      input: 'head = [1,2,3,4,5]',
      output: '[3,4,5]',
      explanation: {
        id: 'Panjang ganjil: hanya ada satu node tengah, yaitu 3.',
        en: 'Odd length: there is only one middle node, namely 3.',
      },
    },
    {
      input: 'head = [1,2,3,4]',
      output: '[3,4]',
      explanation: {
        id: 'Panjang genap: node 2 dan 3 sama-sama di tengah, dan yang dipakai adalah 3.',
        en: 'Even length: nodes 2 and 3 both sit in the middle, and 3 is the one used.',
      },
    },
    {
      input: 'head = [1]',
      output: '[1]',
      explanation: {
        id: 'Satu node berarti node itu sendiri adalah tengahnya.',
        en: 'With one node, that node is the middle itself.',
      },
    },
  ],
  hints: {
    id: [
      'Kalau `slow` melangkah satu node dan `fast` melangkah dua node, di mana `slow` berada saat `fast` mencapai ujung?',
      'Kondisi loop yang aman: `while (fast !== null && fast.next !== null)`.',
      'Setelah loop, `slow` sudah tepat di node tengah; tinggal telusuri dari sana.',
      'Untuk list kosong, loop tidak berjalan sama sekali dan hasilnya array kosong.',
    ],
    en: [
      'If `slow` moves one node and `fast` moves two, where is `slow` when `fast` reaches the end?',
      'The safe loop condition is `while (fast !== null && fast.next !== null)`.',
      'After the loop, `slow` already sits on the middle node; just walk from there.',
      'For an empty list the loop never runs and the answer is an empty array.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Jalan cepat: dua pointer.

\`\`\`js
let slow = head;
let fast = head;

while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}

return toArray(slow);
\`\`\`

\`fast\` selalu menempuh jarak dua kali lipat \`slow\`, jadi ketika \`fast\` berhenti, \`slow\`
berada tepat di tengah. Untuk panjang ganjil \`fast\` berhenti di node terakhir; untuk
panjang genap \`fast\` berhenti di \`null\` dan \`slow\` sudah maju satu langkah lebih jauh —
persis aturan "tengah yang kedua".

## Kompleksitas

- Waktu: O(n) — satu lintasan.
- Ruang: O(1) tambahan, hanya dua variabel pointer.

Alternatif yang juga benar: hitung panjangnya dulu, lalu berjalan \`n/2\` langkah. Tetap O(n)
waktu dan O(1) ruang, tetapi butuh dua lintasan, jadi sebut versi dua pointer lebih dulu di
interview.

## Kesalahan umum

- Menulis kondisi \`fast.next !== null && fast !== null\`; urutan ini membuat error pada list
  kosong karena sudah membaca \`fast.next\` dari \`null\`.
- Menggeser \`slow\` dua kali supaya "seimbang" dengan \`fast\`; itu merusak seluruh idenya.
- Memilih node tengah pertama untuk panjang genap.
- Menyalin semua nilai ke array lalu mengambil \`slice\` dari tengah: hasilnya benar, tetapi
  ruangnya jadi O(n) dan syarat O(1) dilanggar.`,
    en: `## Approach

The fast route: two pointers.

\`\`\`js
let slow = head;
let fast = head;

while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}

return toArray(slow);
\`\`\`

\`fast\` always covers twice the distance of \`slow\`, so when \`fast\` stops, \`slow\` sits
exactly on the middle. For an odd length \`fast\` stops on the last node; for an even length
\`fast\` stops at \`null\` and \`slow\` has moved one step further — exactly the "second
middle" rule.

## Complexity

- Time: O(n) — a single pass.
- Space: O(1) extra, just two pointer variables.

An alternative that also works: count the length first, then walk \`n/2\` steps. Still O(n)
time and O(1) space, but it needs two passes, so mention the two-pointer version first in
an interview.

## Common mistakes

- Writing the condition as \`fast.next !== null && fast !== null\`; that order crashes on an
  empty list because it already reads \`fast.next\` off \`null\`.
- Advancing \`slow\` twice "to keep up" with \`fast\`; that destroys the whole idea.
- Picking the first middle node when the length is even.
- Copying every value into an array and slicing from the middle: the answer is right, but
  space becomes O(n) and the O(1) requirement is broken.`,
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

function middleNode(head) {
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

function middleNode(head) {
  let slow = buildList(head);
  let fast = slow;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return toArray(slow);
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


def middleNode(head):
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


def middleNode(head):
    slow = build_list(head)
    fast = slow

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

    return to_array(slow)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 3, 4, 5]], expected: [3, 4, 5] },
    { id: 'c2', input: [[1, 2, 3, 4]], expected: [3, 4] },
    { id: 'c3', input: [[42]], expected: [42] },
    { id: 'c4', input: [[]], expected: [], hidden: true },
    {
      id: 'c5',
      input: [[-9, -7, -5, -3, -1, 0, 2]],
      expected: [-3, -1, 0, 2],
      hidden: true,
    },
    { id: 'c6', input: [[5, 5, 5, 5]], expected: [5, 5], hidden: true },
    { id: 'c7', input: [[1000000, -1000000]], expected: [-1000000], hidden: true },
  ],
};
