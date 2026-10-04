import type { Problem } from '~/types/content';

export const mergeTwoSortedLists: Problem = {
  slug: 'merge-two-sorted-lists',
  title: {
    id: 'Merge Two Sorted Lists',
    en: 'Merge Two Sorted Lists',
  },
  difficulty: 'easy',
  trackId: 'linked-list',
  order: 2,
  functionName: 'mergeTwoLists',
  parameters: [
    { name: 'list1', type: 'number[]' },
    { name: 'list2', type: 'number[]' },
  ],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan dua linked list yang sudah terurut menaik, ditulis sebagai array \`list1\`
dan \`list2\`. Contoh: \`[1,2,4]\` berarti rantai node \`1 → 2 → 4\`.

Gabungkan keduanya menjadi satu linked list terurut menaik, lalu kembalikan hasilnya
**sebagai array**.

Karena input dikirim sebagai array JSON (bukan pointer), fungsi kamu harus:

1. **Membangun** dua linked list dari \`list1\` dan \`list2\` memakai kelas \`ListNode\` yang
   kamu definisikan sendiri di dalam kode (kerangkanya tersedia di template).
2. **Menggabungkan** keduanya dengan menyambung ulang pointer \`next\` — bukan dengan
   menggabungkan dua array lalu memanggil \`sort\`.
3. **Menelusuri** hasilnya dan mengembalikannya sebagai array.

Salah satu list (bahkan keduanya) boleh kosong. Target: O(n + m) waktu dan O(1) ruang
tambahan.`,
    en: `You are given two linked lists sorted in ascending order, written as the arrays \`list1\`
and \`list2\`. For example, \`[1,2,4]\` means the chain of nodes \`1 → 2 → 4\`.

Merge them into a single ascending linked list, then return the result **as an array**.

Because the input arrives as JSON arrays (no pointers), your function has to:

1. **Build** two linked lists from \`list1\` and \`list2\` using a \`ListNode\` class you define
   inside your code (a skeleton is available in the template).
2. **Merge** them by re-linking the \`next\` pointers — not by joining two arrays and calling
   \`sort\`.
3. **Walk** the result and return it as an array.

Either list may be empty (both of them too). Target: O(n + m) time and O(1) extra space.`,
  },
  examples: [
    {
      input: 'list1 = [1,2,4], list2 = [1,3,4]',
      output: '[1,1,2,3,4,4]',
      explanation: {
        id: 'Nilai 1 dari kedua list muncul dua kali dan keduanya harus ikut.',
        en: 'The value 1 appears in both lists and both copies belong in the result.',
      },
    },
    {
      input: 'list1 = [], list2 = [0]',
      output: '[0]',
      explanation: {
        id: 'List kosong tidak menyumbang node, jadi hasilnya hanya list kedua.',
        en: 'An empty list contributes no nodes, so the result is just the second list.',
      },
    },
    {
      input: 'list1 = [1,2,3], list2 = [-1]',
      output: '[-1,1,2,3]',
      explanation: {
        id: 'Node baru bisa datang dari list mana pun, dan sisa list yang belum habis langsung disambungkan.',
        en: 'A new node can come from either list, and whatever remains is appended as-is.',
      },
    },
  ],
  hints: {
    id: [
      'Karena kedua list sudah terurut, kamu hanya perlu membandingkan node paling depan dari keduanya.',
      'Ambil node dengan nilai lebih kecil, sambungkan ke hasil, lalu majukan pointer list itu saja.',
      'Pakai dummy head (`new ListNode(0)`) supaya node pertama hasil tidak perlu ditangani khusus.',
      'Kalau salah satu list habis, sisanya sudah terurut — sambungkan seluruhnya tanpa loop tambahan.',
    ],
    en: [
      'Since both lists are already sorted, you only ever compare their front nodes.',
      'Take the node with the smaller value, attach it to the result, then advance only that list.',
      'Use a dummy head (`new ListNode(0)`) so the first node of the result needs no special case.',
      'When one list runs out, the rest of the other is already sorted — append it without any extra loop.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Karena kedua list sudah terurut, tidak ada pengurutan ulang yang dibutuhkan. Bandingkan
node terdepan kedua list, ambil yang lebih kecil, lalu majukan **hanya** pointer list itu.

Pola dummy head membuat semuanya rapi: kamu berpijak pada node buatan, dan kepala hasilnya
adalah \`dummy.next\`.

\`\`\`js
const dummy = new ListNode(0);
let tail = dummy;
let a = list1;
let b = list2;

while (a !== null && b !== null) {
  if (a.val <= b.val) {
    tail.next = a;
    a = a.next;
  } else {
    tail.next = b;
    b = b.next;
  }
  tail = tail.next;
}

tail.next = a !== null ? a : b; // ekor yang belum habis
return toArray(dummy.next);
\`\`\`

Loop berhenti saat salah satu list habis. Karena keduanya terurut, sisa list yang lain pasti
lebih besar atau sama dengan node terakhir yang dipasang, sehingga bisa disambungkan
langsung.

## Kompleksitas

- Waktu: O(n + m) — setiap node dilihat paling banyak sekali.
- Ruang: O(1) tambahan; node disambung ulang, bukan disalin.

## Kesalahan umum

- Menggabungkan dua array lalu memanggil \`sort\`. Hasilnya benar, tapi O((n+m) log(n+m)) dan
  latihan pointer-nya hilang.
- Lupa menyambungkan sisa list setelah loop.
- Tidak memakai dummy head, lalu lupa memperbarui kepala ketika node pertama diambil dari
  \`list2\`.
- Membaca \`a.val\` tanpa memastikan \`a\` bukan \`null\`.
`,
    en: `## Approach

Since both lists are already sorted, no re-sorting is needed. Compare the front nodes of the
two lists, take the smaller one, and advance **only** that list's pointer.

The dummy head pattern keeps it clean: you work from a throwaway node, and the head of the
result is \`dummy.next\`.

\`\`\`js
const dummy = new ListNode(0);
let tail = dummy;
let a = list1;
let b = list2;

while (a !== null && b !== null) {
  if (a.val <= b.val) {
    tail.next = a;
    a = a.next;
  } else {
    tail.next = b;
    b = b.next;
  }
  tail = tail.next;
}

tail.next = a !== null ? a : b; // the tail that has not run out
return toArray(dummy.next);
\`\`\`

The loop stops when one list runs out. Because both lists are sorted, the rest of the other
list is guaranteed to be greater than or equal to the last node you attached, so it can be
linked in one step.

## Complexity

- Time: O(n + m) — every node is visited at most once.
- Space: O(1) extra; nodes are re-linked, not copied.

## Common mistakes

- Joining two arrays and calling \`sort\`. The answer is right, but it costs
  O((n+m) log(n+m)) and the pointer exercise is gone.
- Forgetting to attach the leftover list after the loop.
- Skipping the dummy head and then forgetting to update the head when the first node comes
  from \`list2\`.
- Reading \`a.val\` without checking that \`a\` is not \`null\`.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `// Both lists arrive as plain arrays, e.g. [1, 2, 3] means 1 -> 2 -> 3.
// Build linked lists with this class, process them, then return an array.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(list1, list2) {
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

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;
  let a = buildList(list1);
  let b = buildList(list2);

  while (a !== null && b !== null) {
    if (a.val <= b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }

  tail.next = a !== null ? a : b;

  return toArray(dummy.next);
}
`,
    },
    {
      language: 'python',
      template: `# Both lists arrive as plain arrays, e.g. [1, 2, 3] means 1 -> 2 -> 3.
# Build linked lists with this class, process them, then return an array.
class ListNode:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt


def mergeTwoLists(list1, list2):
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


def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    tail = dummy
    a, b = build_list(list1), build_list(list2)

    while a is not None and b is not None:
        if a.val <= b.val:
            tail.next = a
            a = a.next
        else:
            tail.next = b
            b = b.next
        tail = tail.next

    tail.next = a if a is not None else b

    return to_array(dummy.next)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
    { id: 'c2', input: [[], []], expected: [] },
    { id: 'c3', input: [[], [0]], expected: [0] },
    {
      id: 'c4',
      input: [[-5, -1, 3], [-3, 0, 9]],
      expected: [-5, -3, -1, 0, 3, 9],
      hidden: true,
    },
    { id: 'c5', input: [[0, 0, 0], [0, 0]], expected: [0, 0, 0, 0, 0], hidden: true },
    {
      id: 'c6',
      input: [[1000000], [999999, 1000000]],
      expected: [999999, 1000000, 1000000],
      hidden: true,
    },
    { id: 'c7', input: [[1, 2, 3], [-1]], expected: [-1, 1, 2, 3], hidden: true },
  ],
};
