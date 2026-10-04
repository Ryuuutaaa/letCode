import type { Problem } from '~/types/content';

export const sameTree: Problem = {
  slug: 'same-tree',
  title: {
    id: 'Dua Pohon yang Sama',
    en: 'Same Tree',
  },
  difficulty: 'medium',
  trackId: 'trees',
  order: 3,
  functionName: 'isSameTree',
  parameters: [
    { name: 'p', type: 'Array<number | null>' },
    { name: 'q', type: 'Array<number | null>' },
  ],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Fungsi ini menerima **dua** pohon, masing-masing sebagai array level-order dengan \`null\`
untuk anak yang kosong. Contoh: \`[1,2,3]\` adalah pohon dengan akar 1, anak kiri 2, dan anak
kanan 3.

Cara membaca array itu: elemen pertama adalah akar; untuk setiap node yang keluar dari
antrian, dua elemen berikutnya adalah anak kiri dan anak kanannya. \`null\` berarti tidak ada
anak, dan anak yang tidak ada tidak memakai dua slot berikutnya.

Tugasmu: definisikan kelas \`TreeNode\` di dalam kodemu, bangun **kedua** pohon itu, lalu
kembalikan \`true\` hanya jika keduanya sama persis — **struktur dan nilai** setiap node harus
identik, termasuk posisi anak kiri dan anak kanan.

Ingat bahwa dua array yang berbeda bisa menggambarkan pohon yang sama (misalnya \`[1,2]\` dan
\`[1,2,null,null]\`), jadi bandingkan pohonnya setelah dibangun, bukan string array mentahnya.`,
    en: `This function receives **two** trees, each as a level-order array with \`null\` for a missing
child. For example \`[1,2,3]\` is a tree with root 1, left child 2, and right child 3.

To read the array: the first element is the root; for every node that leaves a queue, the next
two elements are its left and right child. A \`null\` means the child is absent, and an absent
child does not consume the next two slots.

Your job: define a \`TreeNode\` class inside your code, build **both** trees, then return \`true\`
only when they are exactly alike — **structure and values** must match, including which side
each child sits on.

Remember that two different arrays can describe the same tree (for instance \`[1,2]\` and
\`[1,2,null,null]\`), so compare the built trees rather than the raw array text.`,
  },
  examples: [
    {
      input: 'p = [1,2,3], q = [1,2,3]',
      output: 'true',
      explanation: {
        id: 'Kedua array membentuk pohon yang persis sama: akar 1 dengan anak kiri 2 dan anak kanan 3.',
        en: 'Both arrays build exactly the same tree: root 1 with left child 2 and right child 3.',
      },
    },
    {
      input: 'p = [1,2], q = [1,null,2]',
      output: 'false',
      explanation: {
        id: 'Nilainya sama-sama 1 dan 2, tetapi bentuknya berbeda: yang pertama menaruh 2 di kiri, yang kedua di kanan.',
        en: 'Both contain the values 1 and 2, but the shapes differ: the first puts 2 on the left, the second on the right.',
      },
    },
    {
      input: 'p = [1,2,1], q = [1,1,2]',
      output: 'false',
      explanation: {
        id: 'Struktur pohonnya identik, tetapi anak kiri dan anak kanan dari akar bertukar nilai, jadi pohonnya tidak sama.',
        en: 'The shapes are identical, but the root swaps the values of its left and right child, so the trees differ.',
      },
    },
  ],
  hints: {
    id: [
      'Bangun dulu kedua pohonnya, lalu bandingkan sepasang node secara bersamaan.',
      'Base case-nya harus menangani anak kosong: kalau salah satu node kosong, keduanya harus kosong supaya bisa dianggap sama.',
      'Bandingkan nilai kedua node, lalu lanjutkan pemeriksaan ke pasangan anak kiri dan pasangan anak kanan.',
    ],
    en: [
      'Build both trees first, then compare a pair of nodes at the same time.',
      'The base case must handle missing children: if either node is empty, both must be empty for the pair to match.',
      'Compare the two values, then continue with the pair of left children and the pair of right children.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Bandingkan kedua pohon berjalan bersamaan, satu pasangan node per langkah (postorder).

\`\`\`js
function identical(a, b) {
  if (a === null || b === null) return a === b;
  if (a.val !== b.val) return false;
  return identical(a.left, b.left) && identical(a.right, b.right);
}
\`\`\`

Baris base case \`a === b\` itu yang paling penting. Ia menangani tiga situasi sekaligus:
keduanya kosong (berarti sama), hanya \`a\` kosong, dan hanya \`b\` kosong (dua yang terakhir
berarti bentuk pohonnya berbeda). Menulis base case terpisah seperti
\`if (a === null) return true;\` adalah kesalahan paling sering di soal seperti ini.

Perhatikan juga bahwa urutannya **berpasangan**: anak kiri dibandingkan dengan anak kiri, anak
kanan dengan anak kanan. Tidak boleh dibalik.

## Kompleksitas

- Waktu: O(n) untuk membangun kedua pohon, lalu O(min(n, m)) untuk membandingkannya; berhenti
  lebih awal begitu ada perbedaan.
- Ruang: O(h) untuk rekursi, dengan \`h\` = tinggi pohon yang lebih dangkal, ditambah antrian
  pembangunan pohon.

## Kesalahan umum

- Base case yang hanya memeriksa satu sisi: \`if (a === null) return true;\` membuat pohon kosong
  dianggap sama dengan semua pohon.
- Membandingkan nilai tanpa memeriksa struktur (atau sebaliknya). Keduanya harus diperiksa.
- Menyelesaikan soal dengan membandingkan array input sebagai string. Dua array berbeda bisa
  menggambarkan pohon yang sama, dan pemeriksaan seperti itu juga tidak bisa berhenti di tengah
  jalan.
- Membalik pasangan anak (membandingkan kiri dengan kanan), yang membuat pohon cermin dianggap
  sama.
- Lupa membangun pohon untuk argumen kedua.`,
    en: `## Approach

Walk both trees at the same time, one pair of nodes per step (postorder).

\`\`\`js
function identical(a, b) {
  if (a === null || b === null) return a === b;
  if (a.val !== b.val) return false;
  return identical(a.left, b.left) && identical(a.right, b.right);
}
\`\`\`

The \`a === b\` base case carries the weight. It covers three situations at once: both empty
(equal), only \`a\` empty, and only \`b\` empty — the last two mean the shapes differ. Splitting it
into something like \`if (a === null) return true;\` is the single most common mistake here.

Notice as well that the pairing matters: left is compared with left, right with right. Never
crossed.

## Complexity

- Time: O(n) to build both trees, then O(min(n, m)) to compare them, stopping early on the
  first difference.
- Space: O(h) for the recursion, where \`h\` is the height of the shallower tree, plus the
  building queues.

## Common mistakes

- Checking only one side in the base case: \`if (a === null) return true;\` makes an empty tree
  equal to everything.
- Comparing values without checking structure (or the reverse). Both matter.
- Solving it by comparing the input arrays as strings. Different arrays can describe the same
  tree, and such a check cannot exit early either.
- Crossing the pairs (left against right), which makes mirrored trees look identical.
- Forgetting to build the tree for the second argument.`,
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

// Both trees arrive as level-order arrays. Build them, then compare them.
function isSameTree(p, q) {
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

function isSameTree(p, q) {
  const first = buildTree(p);
  const second = buildTree(q);

  function identical(a, b) {
    if (a === null || b === null) {
      return a === b;
    }

    if (a.val !== b.val) {
      return false;
    }

    return identical(a.left, b.left) && identical(a.right, b.right);
  }

  return identical(first, second);
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


# Both trees arrive as level-order lists. Build them, then compare them.
# A missing child arrives as JavaScript null, which Python sees as a JsNull sentinel:
# detect it with: value is None or type(value).__name__ == 'JsNull'.
def isSameTree(p, q):
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


def isSameTree(p, q):
    first = build_tree(p)
    second = build_tree(q)

    def identical(a, b):
        if a is None or b is None:
            return a is b
        if a.val != b.val:
            return False
        return identical(a.left, b.left) and identical(a.right, b.right)

    return identical(first, second)
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [[1, 2, 3], [1, 2, 3]], expected: true },
    { id: 'c2', input: [[1, 2], [1, null, 2]], expected: false },
    { id: 'c3', input: [[1, 2, 1], [1, 1, 2]], expected: false },
    { id: 'c4', input: [[], []], expected: true, hidden: true },
    { id: 'c5', input: [[1], []], expected: false, hidden: true },
    { id: 'c6', input: [[1, null, 2], [1, null, 2]], expected: true, hidden: true },
    { id: 'c7', input: [[5, 5, 5], [5, 5, 5]], expected: true, hidden: true },
    { id: 'c8', input: [[1, 2, 3, 4], [1, 2, 3, null, 4]], expected: false, hidden: true },
    { id: 'c9', input: [[-1, -2, null, -3], [-1, -2, null, -3]], expected: true, hidden: true },
    { id: 'c10', input: [[2, 1, 3], [2, 3, 1]], expected: false, hidden: true },
    { id: 'c11', input: [[2147483647, null, -2147483648], [2147483647, null, -2147483648]], expected: true, hidden: true },
  ],
};
