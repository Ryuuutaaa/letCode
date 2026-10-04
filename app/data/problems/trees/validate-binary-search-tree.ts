import type { Problem } from '~/types/content';

export const validateBinarySearchTree: Problem = {
  slug: 'validate-binary-search-tree',
  title: {
    id: 'Validasi Binary Search Tree',
    en: 'Validate Binary Search Tree',
  },
  difficulty: 'medium',
  trackId: 'trees',
  order: 5,
  functionName: 'isValidBST',
  parameters: [{ name: 'root', type: 'Array<number | null>' }],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Pohon biner di soal ini dikirim sebagai **array level-order** dengan \`null\` untuk anak
yang kosong. Contoh: \`[2,1,3]\` berarti akar 2 dengan anak kiri 1 dan anak kanan 3.

Cara membaca array itu: elemen pertama adalah akar; untuk setiap node yang keluar dari
antrian, dua elemen berikutnya adalah anak kiri dan anak kanannya. \`null\` berarti tidak ada
anak, dan anak yang tidak ada tidak memakai dua slot berikutnya.

Sebuah pohon disebut **binary search tree (BST)** yang valid jika untuk **setiap** node berlaku:

- semua nilai di subtree kirinya **lebih kecil** dari nilai node itu, dan
- semua nilai di subtree kanannya **lebih besar** dari nilai node itu.

Perhatikan kata "semua nilai di subtree", bukan hanya anak langsungnya. Nilai kembar tidak
diperbolehkan: perbandingannya tegas.

Tugasmu: definisikan kelas \`TreeNode\` di dalam kodemu, bangun pohonnya dari array
level-order, lalu kembalikan \`true\` jika pohon itu BST yang valid. Pohon kosong \`[]\` dianggap
BST yang valid.

**Jebakan utama soal ini**: memeriksa \`left < node < right\` untuk anak langsung saja tidak
cukup. Pohon \`[5,1,4,null,null,3,6]\` lolos pemeriksaan itu, padahal tidak valid karena 3
berada di subtree kanan milik 5 sementara 3 < 5.`,
    en: `The binary tree in this problem arrives as a **level-order array** with \`null\` for a
missing child. For example \`[2,1,3]\` means root 2 with left child 1 and right child 3.

To read the array: the first element is the root; for every node that leaves a queue, the next
two elements are its left and right child. A \`null\` means the child is absent, and an absent
child does not consume the next two slots.

A tree is a **valid binary search tree (BST)** when, for **every** node:

- every value in its left subtree is **smaller** than the node's value, and
- every value in its right subtree is **larger** than the node's value.

Note the words "every value in the subtree", not just the direct child. Equal values are not
allowed: the comparisons are strict.

Your job: define a \`TreeNode\` class inside your code, build the tree from the level-order
array, then return \`true\` when the tree is a valid BST. The empty tree \`[]\` counts as valid.

**The main trap**: checking \`left < node < right\` against direct children only is not enough.
The tree \`[5,1,4,null,null,3,6]\` passes that check while being invalid, because 3 sits in the
right subtree of 5 even though 3 < 5.`,
  },
  examples: [
    {
      input: 'root = [2,1,3]',
      output: 'true',
      explanation: {
        id: 'Anak kiri 1 lebih kecil dari 2, anak kanan 3 lebih besar dari 2, dan keduanya adalah daun. BST valid.',
        en: 'The left child 1 is smaller than 2, the right child 3 is larger than 2, and both are leaves. A valid BST.',
      },
    },
    {
      input: 'root = [5,1,4,null,null,3,6]',
      output: 'false',
      explanation: {
        id: 'Node 4 memang lebih kecil dari 5, tetapi anak kirinya bernilai 3. Karena 3 berada di subtree kanan 5, seharusnya 3 > 5. Jadi tidak valid.',
        en: 'Node 4 is indeed smaller than 5, but its left child holds 3. Since 3 lives in the right subtree of 5 it would have to be larger than 5. So the tree is invalid.',
      },
    },
    {
      input: 'root = [10,5,15,null,null,6,20]',
      output: 'false',
      explanation: {
        id: 'Node 6 adalah anak kiri dari 15, jadi 6 harus lebih besar dari 10 (karena berada di subtree kanan 10). Karena 6 < 10, pohonnya tidak valid.',
        en: 'Node 6 is the left child of 15, so it must be larger than 10 (it sits in the right subtree of 10). Since 6 < 10, the tree is invalid.',
      },
    },
  ],
  hints: {
    id: [
      'Coba uji gagasanmu pada [5,1,4,null,null,3,6]: apakah cukup membandingkan setiap node dengan anak langsungnya?',
      'Setiap node sebenarnya punya rentang nilai yang masih boleh ia pakai, yang diwarisi dari leluhurnya. Bawa rentang itu saat turun.',
      'Saat turun ke kiri, batas atasnya menjadi nilai node sekarang. Saat turun ke kanan, batas bawahnya menjadi nilai node sekarang. Perbandingannya tegas, jadi nilai kembar membuat pohon tidak valid.',
    ],
    en: [
      'Test your idea on [5,1,4,null,null,3,6]: is comparing every node with its direct children enough?',
      'Each node actually has a range of values it is still allowed to hold, inherited from its ancestors. Carry that range downwards.',
      'Going left tightens the upper bound to the current value; going right tightens the lower bound to it. The comparisons are strict, so an equal value makes the tree invalid.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Bawa **batas bawah dan batas atas** saat menelusuri pohon. Setiap node tidak cukup hanya lebih
besar dari anak kirinya; ia harus lebih besar dari seluruh isi subtree kiri, dan seluruh isi
subtree kanannya harus lebih besar darinya.

\`\`\`js
function valid(node, low, high) {
  if (node === null) return true;
  if (low !== null && node.val <= low) return false;
  if (high !== null && node.val >= high) return false;

  return valid(node.left, low, node.val)   // batas atas mengetat
      && valid(node.right, node.val, high); // batas bawah mengetat
}
\`\`\`

Di sini \`null\` dipakai sebagai "belum ada batas". Memakai bilangan sentinel seperti
\`-Infinity\`/Infinity atau nilai minimum bilangan bulat juga bisa, tetapi sentinel bilangan bulat
bisa salah pada input yang memakai nilai ekstrem. \`null\` lebih aman dan lebih jelas.

## Kompleksitas

- Waktu: O(n) — setiap node diperiksa sekali, dan pemeriksaan berhenti lebih awal begitu ada
  pelanggaran.
- Ruang: O(h) untuk rekursi (\`h\` = tinggi pohon), idealnya O(log n) pada pohon seimbang.

## Pendekatan alternatif: inorder

Pada BST, hasil inorder selalu **menaik tegas**. Jadi kamu bisa menelusuri inorder sambil
mengingat nilai terakhir yang dilihat, lalu menolak bila nilai berikutnya tidak lebih besar.
Keunggulannya: hanya butuh satu variabel tambahan, bukan sepasang batas. Versi iteratif
dengan stack sendiri (atau Morris traversal untuk ruang O(1)) membuatnya aman untuk pohon
yang sangat dalam.

## Kesalahan umum

- **Membandingkan hanya dengan anak langsung.** Inilah jebakan utama. Setiap nilai harus
  dibandingkan dengan rentang yang diwarisi dari leluhurnya, bukan hanya dengan orang tuanya.
- Mengizinkan nilai kembar dengan memakai \`<=\` atau \`>=\` pada sisi yang salah. BST yang sah
  menolak nilai kembar.
- Memakai sentinel bilangan bulat minimum/maksimum yang justru bertabrakan dengan nilai pada
  input ekstrem. Gunakan \`null\`/\`None\` atau \`Infinity\`/\`float('-inf')\`.
- Menyalin subtree ke array lalu memeriksa urutannya, tapi lupa memeriksa ketegasan urutan.
- Lupa bahwa pohon kosong dianggap valid, atau sebaliknya menganggap pohon satu node tidak valid.
- Memeriksa hanya di satu arah, misalnya hanya batas atas saat turun ke kiri.`,
    en: `## Approach

Carry a **lower and an upper bound** as you walk down. A node is not merely larger than its
left child: it must be larger than everything in its left subtree, and everything in its right
subtree must be larger than it.

\`\`\`js
function valid(node, low, high) {
  if (node === null) return true;
  if (low !== null && node.val <= low) return false;
  if (high !== null && node.val >= high) return false;

  return valid(node.left, low, node.val)   // upper bound tightens
      && valid(node.right, node.val, high); // lower bound tightens
}
\`\`\`

\`null\` here means "no bound yet". Integer sentinels such as \`-Infinity\`/\`Infinity\` (or the
smallest possible integer) also work, but integer sentinels can break on inputs that use
extreme values. \`null\` is both safer and clearer.

## Complexity

- Time: O(n) — every node is checked once, and the walk exits early on the first violation.
- Space: O(h) for the recursion (\`h\` = tree height), ideally O(log n) on a balanced tree.

## Alternative approach: inorder

On a BST the inorder output is **strictly increasing**. So you can walk inorder while remembering
the previous value and reject any value that is not larger. It needs a single extra variable
instead of a pair of bounds, and an iterative version with your own stack (or a Morris traversal
for O(1) space) makes it safe on very deep trees.

## Common mistakes

- **Comparing with direct children only.** This is the trap. Every value must be checked against
  the range inherited from its ancestors, not just against its parent.
- Allowing duplicates by using \`<=\` or \`>=\` on the wrong side. A valid BST rejects equal values.
- Using smallest/largest integer sentinels that collide with extreme values in the input. Use
  \`null\`/\`None\` or \`Infinity\`/\`float('-inf')\`.
- Copying subtrees into arrays and checking ordering, while forgetting that the order must be
  strict.
- Forgetting that an empty tree is valid — or, the other way round, declaring a single-node tree
  invalid.
- Checking only one direction, for instance only the upper bound while descending left.`,
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

// The tree arrives as a level-order array. Return true when it is a valid BST.
function isValidBST(root) {
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

function isValidBST(root) {
  const tree = buildTree(root);

  // low and high are the bounds inherited from the ancestors; null means "no bound".
  function valid(node, low, high) {
    if (node === null) {
      return true;
    }

    if (low !== null && node.val <= low) {
      return false;
    }

    if (high !== null && node.val >= high) {
      return false;
    }

    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  }

  return valid(tree, null, null);
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


# The tree arrives as a level-order list. Return True when it is a valid BST.
# A missing child arrives as JavaScript null, which Python sees as a JsNull sentinel:
# detect it with: value is None or type(value).__name__ == 'JsNull'.
def isValidBST(root):
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


def isValidBST(root):
    tree = build_tree(root)

    # low and high are the bounds inherited from the ancestors; None means "no bound".
    def valid(node, low, high):
        if node is None:
            return True
        if low is not None and node.val <= low:
            return False
        if high is not None and node.val >= high:
            return False
        return valid(node.left, low, node.val) and valid(node.right, node.val, high)

    return valid(tree, None, None)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[2, 1, 3]], expected: true },
    { id: 'c2', input: [[5, 1, 4, null, null, 3, 6]], expected: false },
    { id: 'c3', input: [[1]], expected: true },
    { id: 'c4', input: [[]], expected: true, hidden: true },
    { id: 'c5', input: [[2, 2, 2]], expected: false, hidden: true },
    { id: 'c6', input: [[1, null, 1]], expected: false, hidden: true },
    { id: 'c7', input: [[10, 5, 15, null, null, 6, 20]], expected: false, hidden: true },
    { id: 'c8', input: [[3, 1, 5, 0, 2, 4, 6]], expected: true, hidden: true },
    { id: 'c9', input: [[5, 4, 6, null, null, 3, 7]], expected: false, hidden: true },
    { id: 'c10', input: [[-2147483648, null, 2147483647]], expected: true, hidden: true },
    { id: 'c11', input: [[2147483647, 2147483647, null]], expected: false, hidden: true },
  ],
};
