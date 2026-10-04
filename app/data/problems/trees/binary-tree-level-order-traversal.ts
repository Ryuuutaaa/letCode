import type { Problem } from '~/types/content';

export const binaryTreeLevelOrderTraversal: Problem = {
  slug: 'binary-tree-level-order-traversal',
  title: {
    id: 'Traversal Level-order',
    en: 'Binary Tree Level Order Traversal',
  },
  difficulty: 'medium',
  trackId: 'trees',
  order: 4,
  functionName: 'levelOrder',
  parameters: [{ name: 'root', type: 'Array<number | null>' }],
  returnType: 'number[][]',
  timeLimitMs: 2000,
  statement: {
    id: `Pohon biner di soal ini dikirim sebagai **array level-order** dengan \`null\` untuk anak
yang kosong. Contoh: \`[3,9,20,null,null,15,7]\` berarti akar 3, anak kiri 9, anak kanan 20,
node 9 tanpa anak, dan node 20 beranak 15 (kiri) serta 7 (kanan).

Cara membaca array itu: elemen pertama adalah akar; untuk setiap node yang keluar dari
antrian, dua elemen berikutnya adalah anak kiri dan anak kanannya. \`null\` berarti tidak ada
anak, dan anak yang tidak ada tidak memakai dua slot berikutnya.

Tugasmu: definisikan kelas \`TreeNode\` di dalam kodemu, bangun pohonnya dari array
level-order, lalu kembalikan nilai setiap node **dikelompokkan per level**, dari atas ke
bawah dan dari kiri ke kanan di dalam setiap level.

Bentuk jawabannya adalah array dari array: elemen ke-\`i\` berisi nilai semua node pada level
ke-\`i\`. Pohon kosong menghasilkan array kosong \`[]\`.

Soal ini meminta penelusuran **BFS** (breadth-first), bukan DFS: kunjungi seluruh level dulu
baru turun ke level berikutnya.`,
    en: `The binary tree in this problem arrives as a **level-order array** with \`null\` for a
missing child. For example \`[3,9,20,null,null,15,7]\` means root 3, left child 9, right child
20, node 9 without children, and node 20 with children 15 (left) and 7 (right).

To read the array: the first element is the root; for every node that leaves a queue, the next
two elements are its left and right child. A \`null\` means the child is absent, and an absent
child does not consume the next two slots.

Your job: define a \`TreeNode\` class inside your code, build the tree from the level-order
array, then return every node value **grouped by level**, from top to bottom and left to right
inside each level.

The answer is an array of arrays: entry \`i\` holds the values of all nodes on level \`i\`. An
empty tree produces an empty array \`[]\`.

This problem asks for a **BFS** (breadth-first) walk rather than DFS: finish a whole level
before descending.`,
  },
  examples: [
    {
      input: 'root = [3,9,20,null,null,15,7]',
      output: '[[3],[9,20],[15,7]]',
      explanation: {
        id: 'Level 0 berisi akar (3), level 1 berisi 9 dan 20, level 2 berisi 15 dan 7.',
        en: 'Level 0 holds the root (3), level 1 holds 9 and 20, level 2 holds 15 and 7.',
      },
    },
    {
      input: 'root = [1]',
      output: '[[1]]',
      explanation: {
        id: 'Hanya ada satu level dengan satu nilai.',
        en: 'There is a single level with a single value.',
      },
    },
    {
      input: 'root = []',
      output: '[]',
      explanation: {
        id: 'Pohon kosong tidak punya level sama sekali.',
        en: 'An empty tree has no levels at all.',
      },
    },
  ],
  hints: {
    id: [
      'Bangun pohonnya lebih dulu dari array level-order, sama seperti soal-soal sebelumnya.',
      'Penelusuran per level paling mudah dikerjakan dengan antrian yang berisi node, bukan nilai.',
      'Sebelum memproses sebuah level, catat dulu berapa node yang ada di antrian saat itu. Anak-anak yang kamu masukkan nanti akan berada di level berikutnya.',
    ],
    en: [
      'Build the tree from the level-order array first, just like the earlier problems.',
      'A per-level walk is easiest with a queue that holds nodes rather than values.',
      'Before processing a level, note how many nodes are in the queue at that moment. Children you append belong to the next level.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Bangun pohonnya dulu, lalu lakukan BFS dengan antrian.

Kunci soal ini adalah memisahkan level yang sekarang dari level berikutnya. Caranya: simpan
jumlah node yang ada di antrian **sebelum** loop level dimulai, lalu proses tepat sebanyak itu.
Anak-anak yang kamu masukkan di dalam loop tidak akan ikut terhitung.

\`\`\`js
const queue = [root];
let head = 0;

while (head < queue.length) {
  const size = queue.length - head;   // hanya level sekarang
  const level = [];

  for (let i = 0; i < size; i++) {
    const node = queue[head];
    head++;
    level.push(node.val);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  levels.push(level);
}
\`\`\`

Perhatikan juga bahwa antrian hanya menyimpan node yang benar-benar ada: anak \`null\` tidak
pernah dimasukkan, sehingga tidak ada nilai kosong yang mengotori hasil.

## Kompleksitas

- Waktu: O(n) — setiap node masuk dan keluar antrian satu kali.
- Ruang: O(w) untuk antriannya, dengan \`w\` = jumlah node di level terlebar (bisa \`n/2\` pada
  pohon penuh). Bandingkan dengan DFS yang memakai O(h) ruang: pada pohon yang lebar dan
  dangkal, BFS justru lebih boros memori.

## Kesalahan umum

- Memakai \`array.shift()\`. Di JavaScript \`shift()\` adalah O(n) karena seluruh elemen bergeser,
  sehingga BFS-nya menjadi O(n²). Pakai penunjuk \`head\` yang hanya maju.
- Lupa memisahkan level, sehingga hasilnya satu array panjang berisi semua nilai.
- Memasukkan \`null\` ke dalam antrian. Node kosong tidak punya nilai, jadi hasilnya berisi
  entri palsu; cukup lewati anak yang kosong.
- Memakai DFS lalu mencoba mengelompokkan lewat kedalaman, padahal urutan kiri-ke-kanan per
  level lebih natural dengan antrian.
- Menghitung ulang level dengan rumus indeks array, yang salah karena representasi level-order
  tidak sama dengan tata letak pohon penuh.`,
    en: `## Approach

Build the tree first, then run a BFS with a queue.

The key is separating the current level from the next one: record how many nodes are in the
queue **before** the level loop starts, then process exactly that many. Children appended
inside the loop are deliberately excluded.

\`\`\`js
const queue = [root];
let head = 0;

while (head < queue.length) {
  const size = queue.length - head;   // current level only
  const level = [];

  for (let i = 0; i < size; i++) {
    const node = queue[head];
    head++;
    level.push(node.val);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  levels.push(level);
}
\`\`\`

Note that the queue only ever holds real nodes: \`null\` children are never enqueued, so no empty
value can pollute the output.

## Complexity

- Time: O(n) — every node enters and leaves the queue once.
- Space: O(w) for the queue, where \`w\` is the number of nodes on the widest level (up to \`n/2\`
  for a full tree). Compare that with DFS, which needs O(h): on a wide, shallow tree BFS is the
  more expensive one.

## Common mistakes

- Reaching for \`array.shift()\`. In JavaScript \`shift()\` is O(n) because every element moves, so
  the BFS becomes O(n²). Keep a \`head\` index that only moves forward.
- Losing the level boundaries, so the result is one flat array of every value.
- Enqueuing \`null\`. An empty node has no value, so the output fills up with fake entries; simply
  skip missing children.
- Using DFS and then trying to group by depth, when left-to-right order per level comes for free
  with a queue.
- Recomputing levels with array index formulas, which break because the level-order array is not
  a packed tree layout.`,
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

// The tree arrives as a level-order array; return node values grouped by level.
function levelOrder(root) {
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

function levelOrder(root) {
  const tree = buildTree(root);

  if (tree === null) {
    return [];
  }

  const levels = [];
  const queue = [tree];
  let head = 0;

  while (head < queue.length) {
    const size = queue.length - head;
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue[head];
      head++;

      level.push(node.val);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    levels.push(level);
  }

  return levels;
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


# The tree arrives as a level-order list; return node values grouped by level.
# A missing child arrives as JavaScript null, which Python sees as a JsNull sentinel:
# detect it with: value is None or type(value).__name__ == 'JsNull'.
def levelOrder(root):
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


def levelOrder(root):
    tree = build_tree(root)

    if tree is None:
        return []

    levels = []
    queue = [tree]
    head = 0

    while head < len(queue):
        size = len(queue) - head
        level = []

        for _ in range(size):
            node = queue[head]
            head += 1

            level.append(node.val)

            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)

        levels.append(level)

    return levels
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
    { id: 'c2', input: [[1]], expected: [[1]] },
    { id: 'c3', input: [[]], expected: [] },
    { id: 'c4', input: [[1, 2, 3, 4, null, null, 5]], expected: [[1], [2, 3], [4, 5]], hidden: true },
    { id: 'c5', input: [[1, null, 2, null, 3]], expected: [[1], [2], [3]], hidden: true },
    { id: 'c6', input: [[-1, -2, -3, 0]], expected: [[-1], [-2, -3], [0]], hidden: true },
    { id: 'c7', input: [[7, 3, 15, null, null, 9, 20]], expected: [[7], [3, 15], [9, 20]], hidden: true },
    { id: 'c8', input: [[1, 2, null, 3]], expected: [[1], [2], [3]], hidden: true },
    { id: 'c9', input: [[0]], expected: [[0]], hidden: true },
  ],
};
