import type { Problem } from '~/types/content';

export const maximumDepthOfBinaryTree: Problem = {
  slug: 'maximum-depth-of-binary-tree',
  title: {
    id: 'Kedalaman Maksimum Pohon Biner',
    en: 'Maximum Depth of Binary Tree',
  },
  difficulty: 'easy',
  trackId: 'trees',
  order: 1,
  functionName: 'maxDepth',
  parameters: [{ name: 'root', type: 'Array<number | null>' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Pohon biner di soal ini **tidak** dikirim sebagai objek node, melainkan sebagai
**array level-order** dengan \`null\` untuk anak yang kosong. Contoh:

\`[3,9,20,null,null,15,7]\`

Artinya akar bernilai 3, anak kiri 9, anak kanan 20; node 9 tidak punya anak, sedangkan node
20 punya anak kiri 15 dan anak kanan 7.

Cara membaca array itu: elemen pertama adalah akar. Masukkan akar ke antrian, lalu untuk
setiap node yang keluar dari antrian, dua elemen berikutnya adalah anak kiri dan anak
kanannya. \`null\` berarti tidak ada anak, dan anak yang tidak ada tidak memakai dua slot
berikutnya.

Tugasmu: definisikan kelas \`TreeNode\` di dalam kodemu, bangun pohonnya dari array
level-order, lalu kembalikan **kedalaman maksimum** pohon itu — banyaknya node pada lintasan
terpanjang dari akar sampai daun.

Kembalikan satu angka (bukan array). Pohon kosong \`[]\` berkedalaman 0, dan pohon satu node
berkedalaman 1.`,
    en: `In this problem a binary tree is **not** handed to you as a node object. It arrives as a
**level-order array** with \`null\` marking a missing child. For example:

\`[3,9,20,null,null,15,7]\`

That means the root holds 3, its left child is 9 and its right child is 20; node 9 has no
children, while node 20 has left child 15 and right child 7.

To read the array: the first element is the root. Put the root in a queue, then for every node
that leaves that queue the next two elements are its left and right child. A \`null\` means the
child is absent, and an absent child does not consume the next two slots.

Your job: define a \`TreeNode\` class inside your code, build the tree from the level-order
array, then return the **maximum depth** of that tree — the number of nodes on the longest path
from the root down to a leaf.

Return a single number (not an array). The empty tree \`[]\` has depth 0, and a single-node tree
has depth 1.`,
  },
  examples: [
    {
      input: 'root = [3,9,20,null,null,15,7]',
      output: '3',
      explanation: {
        id: 'Lintasan terpanjang adalah 3 → 20 → 15 (atau 3 → 20 → 7), yang memuat tiga node.',
        en: 'The longest path is 3 → 20 → 15 (or 3 → 20 → 7), which contains three nodes.',
      },
    },
    {
      input: 'root = [1,null,2]',
      output: '2',
      explanation: {
        id: 'Pohonnya miring ke kanan: 1 → 2. Lintasan itu memuat dua node, jadi kedalamannya 2.',
        en: 'The tree leans to the right: 1 → 2. That path holds two nodes, so the depth is 2.',
      },
    },
    {
      input: 'root = []',
      output: '0',
      explanation: {
        id: 'Tidak ada node sama sekali, jadi kedalaman maksimumnya 0.',
        en: 'There are no nodes at all, so the maximum depth is 0.',
      },
    },
  ],
  hints: {
    id: [
      'Sebelum menelusuri, kamu perlu membangun pohonnya dulu dari array level-order. Pakai antrian: setiap node yang keluar mengambil dua nilai berikutnya sebagai anak.',
      'Pikirkan base case-nya: berapa kedalaman subtree kosong? Lalu pertanyaan yang sama bisa ditanyakan ke anak kiri dan anak kanan.',
      'Kedalaman sebuah node adalah 1 + kedalaman maksimum dari dua anaknya. Ambil yang lebih dalam.',
    ],
    en: [
      'Before traversing anything you must build the tree from the level-order array. Use a queue: each node that leaves it takes the next two values as its children.',
      'Think about the base case: what is the depth of an empty subtree? The same question can then be asked of the left and right child.',
      'The depth of a node is 1 + the larger depth of its two children. Take the deeper branch.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Bangun pohonnya dulu, lalu telusuri dengan DFS rekursif.

Membangun dari array level-order:

1. Buat node untuk elemen pertama, masukkan ke antrian.
2. Keluarkan sebuah node dari antrian, lalu ambil dua nilai berikutnya: yang pertama jadi anak kiri, yang kedua jadi anak kanan.
3. Setiap anak yang bukan \`null\` dibuatkan node dan dimasukkan ke antrian; anak \`null\` dilewati tanpa membuat node.

Setelah pohon terbentuk, kedalaman dihitung dari bawah ke atas (postorder):

\`\`\`js
function depth(node) {
  if (node === null) return 0;
  return 1 + Math.max(depth(node.left), depth(node.right));
}
\`\`\`

Base case-nya adalah subtree kosong dengan kedalaman 0, sehingga pohon kosong otomatis
menghasilkan 0 tanpa pemeriksaan khusus.

## Kompleksitas

- Waktu: O(n) — setiap node dibangun sekali dan dikunjungi sekali.
- Ruang: O(h) untuk tumpukan rekursi (\`h\` = tinggi pohon) ditambah O(w) untuk antrian saat
  pembangunan. Pada pohon seimbang keduanya O(log n); pada pohon miring pembangunan memakai
  antrian kecil tetapi rekursinya O(n).

## Kesalahan umum

- Mengembalikan \`0\` untuk pohon kosong tetapi lupa bahwa satu node harus menghasilkan \`1\`
  (satuan yang dipakai adalah jumlah node, bukan jumlah sisi).
- Menghitung anak dengan \`2 * i + 1\` dan \`2 * i + 2\`, seolah array level-order adalah tata
  letak pohon penuh. Itu salah begitu ada \`null\` di tengah.
- Menggeser penunjuk array dengan jumlah yang salah: node \`null\` tetap memakai slotnya
  sendiri, tetapi tidak memakai slot anak.
- Lupa base case \`node === null\` sehingga rekursi melempar error saat mencapai daun.`,
    en: `## Approach

Build the tree first, then walk it with recursive DFS.

Building from the level-order array:

1. Create a node for the first element and put it in a queue.
2. Take a node out of the queue and read the next two values: the first becomes its left child, the second its right child.
3. Every non-\`null\` child gets a node and goes into the queue; a \`null\` child is skipped.

Once the tree exists, compute the depth bottom-up (postorder):

\`\`\`js
function depth(node) {
  if (node === null) return 0;
  return 1 + Math.max(depth(node.left), depth(node.right));
}
\`\`\`

The base case is an empty subtree with depth 0, so an empty tree yields 0 with no special
handling.

## Complexity

- Time: O(n) — every node is built once and visited once.
- Space: O(h) for the recursion stack (\`h\` = tree height) plus O(w) for the queue while
  building. On a balanced tree both are O(log n); on a skewed tree the queue stays small but the
  recursion becomes O(n).

## Common mistakes

- Returning \`0\` for an empty tree but forgetting that a single node must give \`1\` (the unit is
  node count, not edge count).
- Computing children with \`2 * i + 1\` and \`2 * i + 2\` as if the level-order array were a packed
  tree layout. That breaks as soon as a \`null\` sits in the middle.
- Advancing the array pointer incorrectly: a \`null\` still occupies its own slot, but it does not
  occupy child slots.
- Forgetting the \`node === null\` base case, so the recursion throws when it reaches a leaf.`,
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

// The tree arrives as a level-order array, for example [3,9,20,null,null,15,7].
// Build the tree first, then return its maximum depth.
function maxDepth(root) {
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

function maxDepth(root) {
  const tree = buildTree(root);

  function depth(node) {
    if (node === null) {
      return 0;
    }

    return 1 + Math.max(depth(node.left), depth(node.right));
  }

  return depth(tree);
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


# The tree arrives as a level-order list, for example [3, 9, 20, None, None, 15, 7].
# A missing child arrives as JavaScript null, which Python sees as a JsNull sentinel:
# detect it with: value is None or type(value).__name__ == 'JsNull'.
# Build the tree first, then return its maximum depth.
def maxDepth(root):
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


def maxDepth(root):
    tree = build_tree(root)

    def depth(node):
        if node is None:
            return 0
        return 1 + max(depth(node.left), depth(node.right))

    return depth(tree)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
    { id: 'c2', input: [[1, null, 2]], expected: 2 },
    { id: 'c3', input: [[]], expected: 0 },
    { id: 'c4', input: [[1]], expected: 1, hidden: true },
    { id: 'c5', input: [[1, 2, 3, 4, null, null, 5, 6]], expected: 4, hidden: true },
    { id: 'c6', input: [[-5, -3, null, -2, null, -1]], expected: 4, hidden: true },
    { id: 'c7', input: [[1, 2, null, 3, null, 4, null, 5]], expected: 5, hidden: true },
    { id: 'c8', input: [[0]], expected: 1, hidden: true },
  ],
};
