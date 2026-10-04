import type { Problem } from '~/types/content';

export const invertBinaryTree: Problem = {
  slug: 'invert-binary-tree',
  title: {
    id: 'Membalik Pohon Biner',
    en: 'Invert Binary Tree',
  },
  difficulty: 'easy',
  trackId: 'trees',
  order: 2,
  functionName: 'invertTree',
  parameters: [{ name: 'root', type: 'Array<number | null>' }],
  returnType: 'Array<number | null>',
  timeLimitMs: 2000,
  statement: {
    id: `Pohon biner di soal ini dikirim sebagai **array level-order** dengan \`null\` untuk anak
yang kosong, misalnya \`[4,2,7,1,3,6,9]\`. Artinya akar 4, anak kiri 2, anak kanan 7, lalu
anak-anak dari 2 adalah 1 dan 3, dan anak-anak dari 7 adalah 6 dan 9.

Cara membaca array itu: elemen pertama adalah akar; untuk setiap node yang keluar dari
antrian, dua elemen berikutnya adalah anak kiri dan anak kanannya. \`null\` berarti tidak ada
anak, dan anak yang tidak ada tidak memakai dua slot berikutnya.

Tugasmu: definisikan kelas \`TreeNode\` di dalam kodemu, bangun pohonnya dari array
level-order, lalu **balik pohon itu seperti bayangan di cermin** — yaitu tukar anak kiri dan
anak kanan di **setiap** node, bukan hanya di akar.

Kembalikan pohon hasilnya sebagai **array level-order** dengan aturan yang sama: tulis \`null\`
hanya bila di posisi itu memang ada anak yang kosong, dan jangan meninggalkan \`null\` yang
menganggur di ujung array.`,
    en: `In this problem the binary tree arrives as a **level-order array** with \`null\` for a
missing child, for example \`[4,2,7,1,3,6,9]\`. That means the root is 4, its left child is 2
and its right child is 7, the children of 2 are 1 and 3, and the children of 7 are 6 and 9.

To read the array: the first element is the root; for every node that leaves a queue, the next
two elements are its left and right child. A \`null\` means the child is absent, and an absent
child does not consume the next two slots.

Your job: define a \`TreeNode\` class inside your code, build the tree from the level-order
array, then **mirror the tree** — swap the left and right child of **every** node, not just the
root.

Return the resulting tree as a **level-order array** using the same convention: write \`null\`
only where a child is actually missing, and do not leave idle \`null\` values at the end of the
array.`,
  },
  examples: [
    {
      input: 'root = [4,2,7,1,3,6,9]',
      output: '[4,7,2,9,6,3,1]',
      explanation: {
        id: 'Setiap node menukar anaknya: anak 4 yang semula 2 dan 7 menjadi 7 dan 2, lalu anak 7 yang semula 6 dan 9 menjadi 9 dan 6, dan seterusnya.',
        en: 'Every node swaps its children: 4 keeps children 2 and 7 but in the order 7 and 2, then 7 swaps 6 and 9 into 9 and 6, and so on.',
      },
    },
    {
      input: 'root = [2,1,3]',
      output: '[2,3,1]',
      explanation: {
        id: 'Pohon dua level: hanya anak kiri dan kanan dari akar yang bertukar tempat.',
        en: 'A two-level tree: only the root swaps its left and right child.',
      },
    },
    {
      input: 'root = [1,null,2]',
      output: '[1,2]',
      explanation: {
        id: 'Pohon yang miring ke kanan menjadi miring ke kiri: node 2 berpindah dari anak kanan ke anak kiri. Karena 2 tidak punya anak, null di ujung array dibuang dan hasilnya cukup [1,2].',
        en: 'A tree leaning right becomes one leaning left: node 2 moves from the right child to the left one. Since 2 has no children, the trailing null is dropped and the answer is just [1,2].',
      },
    },
  ],
  hints: {
    id: [
      'Bangun dulu pohonnya dari array level-order, sama seperti soal sebelumnya.',
      'Membalik pohon bisa dikerjakan saat traversal: setiap kali kamu mengunjungi sebuah node, tukar dulu pointer kiri dan kanannya.',
      'Untuk mengembalikan jawaban, tulis ulang pohonnya dengan BFS level-order, lalu buang nilai null yang menganggur di ujung array.',
    ],
    en: [
      'Build the tree from the level-order array first, exactly like the previous problem.',
      'Mirroring can be done during a traversal: every time you visit a node, swap its left and right pointers before walking further.',
      'To return the answer, write the tree back out with a level-order BFS, then drop the idle null values at the end of the array.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Bentuk soal ini adalah DFS yang **tidak** mengembalikan nilai: setiap node dimodifikasi saat
dikunjungi. Urutan kunjungannya bebas, yang penting setiap node tepat sekali.

\`\`\`js
function invert(node) {
  if (node === null) return;
  [node.left, node.right] = [node.right, node.left];
  invert(node.left);
  invert(node.right);
}
\`\`\`

Base case \`node === null\` wajib ada supaya rekursi berhenti di anak yang kosong.

Langkah mengembalikan hasil tidak kalah penting: susun ulang pohon menjadi array dengan BFS.
Setiap node menuliskan dua nilai — anak kiri lalu anak kanan, \`null\` bila tidak ada. Setelah
selesai, buang \`null\` di ujung array, karena tidak ada node setelah itu yang membutuhkannya.

## Kompleksitas

- Waktu: O(n) — membangun, membalik, dan menulis ulang masing-masing menyentuh setiap node sekali.
- Ruang: O(h) untuk rekursi pembalikan, ditambah O(w) untuk antrian BFS (\`w\` = lebar level terlebar).

## Kesalahan umum

- Menganggap membalik cukup dengan menukar anak-anak akar. Setiap node harus ditukar, termasuk
  node di level terdalam.
- Lupa base case \`node === null\`, sehingga kode menyentuh anak kosong.
- Membalik nilai (\`val\`) alih-alih pointer anak.
- Lupa memangkas \`null\` di ujung: \`[1,null,2,null,null]\` bukan jawaban yang sama dengan
  \`[1,null,2]\`.
- Menyusun ulang hasil tanpa memperhatikan posisi: setelah pembalikan, anak kanan lama harus
  ditulis sebagai anak kiri, bukan sekadar diurutkan ulang.`,
    en: `## Approach

This is a DFS that returns **nothing**: each node is modified as it is visited. The visit order
does not matter as long as every node is visited exactly once.

\`\`\`js
function invert(node) {
  if (node === null) return;
  [node.left, node.right] = [node.right, node.left];
  invert(node.left);
  invert(node.right);
}
\`\`\`

The \`node === null\` base case is what stops the recursion at missing children.

Writing the answer back is just as important: rebuild the array with a BFS. Every node emits
two values — its left child then its right child, \`null\` when absent. Afterwards, drop the
trailing \`null\`s, since no node after them needs those slots.

## Complexity

- Time: O(n) — building, inverting, and writing back each touch every node once.
- Space: O(h) for the inversion recursion, plus O(w) for the BFS queue (\`w\` = widest level).

## Common mistakes

- Thinking it is enough to swap the root's children. Every node must be swapped, including the
  deepest ones.
- Forgetting the \`node === null\` base case, so the code touches a missing child.
- Swapping the stored values instead of the child pointers.
- Forgetting to trim trailing \`null\`s: \`[1,null,2,null,null]\` is not the same answer as
  \`[1,null,2]\`.
- Rebuilding the output carelessly: after inverting, the old right child must be written as the
  left child, not simply re-sorted.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// The tree arrives as a level-order array; return the mirrored tree in the same format.
function invertTree(root) {
  // write your solution here
}
`,
      solution: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Builds a binary tree from a level-order array; null marks a missing child.
function buildTree(values) {
  if (!Array.isArray(values) || values.length === 0 || values[0] === null) {
    return null;
  }

  const root = new TreeNode(values[0]);
  const queue = [root];
  let head = 0;
  let index = 1;

  while (head < queue.length) {
    const node = queue[head];
    head++;

    if (index < values.length) {
      const leftValue = values[index];
      index++;

      if (leftValue !== null && leftValue !== undefined) {
        node.left = new TreeNode(leftValue);
        queue.push(node.left);
      }
    }

    if (index < values.length) {
      const rightValue = values[index];
      index++;

      if (rightValue !== null && rightValue !== undefined) {
        node.right = new TreeNode(rightValue);
        queue.push(node.right);
      }
    }
  }

  return root;
}

// Writes a binary tree back out as a level-order array without trailing nulls.
function serialize(root) {
  if (root === null) {
    return [];
  }

  const result = [root.val];
  const queue = [root];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head];
    head++;

    result.push(node.left === null ? null : node.left.val);
    result.push(node.right === null ? null : node.right.val);

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

function invertTree(root) {
  const tree = buildTree(root);

  function invert(node) {
    if (node === null) {
      return;
    }

    const left = node.left;
    node.left = node.right;
    node.right = left;

    invert(node.left);
    invert(node.right);
  }

  invert(tree);

  return serialize(tree);
}
`,
    },
    {
      language: 'python',
      template: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


# The tree arrives as a level-order list; return the mirrored tree in the same format.
# A missing child arrives as JavaScript null, which Python sees as a JsNull sentinel:
# detect it with: value is None or type(value).__name__ == 'JsNull'.
def invertTree(root):
    # write your solution here
    pass
`,
      solution: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def is_missing(value):
    # A missing child arrives as JavaScript null (a JsNull sentinel in Python).
    return value is None or type(value).__name__ == 'JsNull'


def build_tree(values):
    if not values or is_missing(values[0]):
        return None

    root = TreeNode(values[0])
    queue = [root]
    head = 0
    index = 1
    total = len(values)

    while head < len(queue):
        node = queue[head]
        head += 1

        if index < total:
            value = values[index]
            index += 1
            if not is_missing(value):
                node.left = TreeNode(value)
                queue.append(node.left)

        if index < total:
            value = values[index]
            index += 1
            if not is_missing(value):
                node.right = TreeNode(value)
                queue.append(node.right)

    return root


def serialize(root):
    if root is None:
        return []

    result = [root.val]
    queue = [root]
    head = 0

    while head < len(queue):
        node = queue[head]
        head += 1

        result.append(node.left.val if node.left is not None else None)
        result.append(node.right.val if node.right is not None else None)

        if node.left is not None:
            queue.append(node.left)
        if node.right is not None:
            queue.append(node.right)

    while result and result[-1] is None:
        result.pop()

    return result


def invertTree(root):
    tree = build_tree(root)

    def invert(node):
        if node is None:
            return
        node.left, node.right = node.right, node.left
        invert(node.left)
        invert(node.right)

    invert(tree)

    return serialize(tree)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
    { id: 'c2', input: [[2, 1, 3]], expected: [2, 3, 1] },
    { id: 'c3', input: [[]], expected: [] },
    { id: 'c4', input: [[1]], expected: [1], hidden: true },
    { id: 'c5', input: [[1, 2, 3]], expected: [1, 3, 2], hidden: true },
    { id: 'c6', input: [[5, 3, 8, 1, 4, 7, 9]], expected: [5, 8, 3, 9, 7, 4, 1], hidden: true },
    { id: 'c7', input: [[1, 2, 3, 4, 5, 6, 7]], expected: [1, 3, 2, 7, 6, 5, 4], hidden: true },
    { id: 'c8', input: [[-1, -2, -3]], expected: [-1, -3, -2], hidden: true },
    {
      id: 'c9',
      input: [[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]],
      expected: [10, 30, 20, 70, 60, 50, 40, 150, 140, 130, 120, 110, 100, 90, 80],
      hidden: true,
    },
    { id: 'c10', input: [[1, 2]], expected: [1, null, 2], hidden: true },
    { id: 'c11', input: [[1, null, 2]], expected: [1, 2], hidden: true },
    { id: 'c12', input: [[3, 1, null, null, 2]], expected: [3, null, 1, 2], hidden: true },
  ],
};
