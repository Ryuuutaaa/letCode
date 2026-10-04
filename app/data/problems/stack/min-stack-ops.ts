import type { Problem } from '~/types/content';

export const minStackOps: Problem = {
  slug: 'min-stack-ops',
  title: {
    id: 'Min Stack Operations',
    en: 'Min Stack Operations',
  },
  difficulty: 'easy',
  trackId: 'stack',
  order: 2,
  functionName: 'runMinStack',
  parameters: [
    { name: 'operations', type: 'string[]' },
    { name: 'args', type: 'number[][]' },
  ],
  returnType: 'number[]',
  timeLimitMs: 2000,
  statement: {
    id: `Di sini kamu tidak menulis kelas, melainkan **menjalankan sederet operasi** pada sebuah
stack yang bisa melaporkan nilai minimumnya, lalu mengembalikan seluruh hasilnya.

Operasinya adalah \`"push"\`, \`"pop"\`, \`"top"\`, dan \`"getMin"\`:

- \`push(x)\` menaruh \`x\` di puncak stack, lalu mengembalikan **jumlah elemen** stack setelah
  push — sama seperti \`Array.prototype.push\` di JavaScript.
- \`pop()\` membuang elemen puncak dan **mengembalikan nilai yang dibuang** itu.
- \`top()\` mengembalikan nilai puncak tanpa membuangnya.
- \`getMin()\` mengembalikan nilai **terkecil** di seluruh isi stack saat itu.

## Bagaimana operasi direpresentasikan

Karena fungsimu hanya menerima argumen JSON, urutan operasi dikirim sebagai **dua array yang
sejajar** (elemen ke-\`i\` di kedua array menjelaskan satu operasi yang sama):

| Parameter | Isi |
| --- | --- |
| \`operations\` | nama operasi: \`"push"\`, \`"pop"\`, \`"top"\`, atau \`"getMin"\` |
| \`args\` | daftar argumen untuk operasi itu |

\`push\` butuh satu angka, operasi lain tidak butuh argumen sama sekali. Karena itu
**setiap elemen \`args\` selalu berupa array**: \`args[i] = [x]\` untuk \`push\`, dan
\`args[i] = []\` untuk \`pop\`, \`top\`, serta \`getMin\`.

Contoh bentuk masukannya:

\`\`\`
operations = ["push", "getMin", "pop"]
args       = [[7],    [],       []]
\`\`\`

Artinya: panggil \`push(7)\`, lalu \`getMin()\`, lalu \`pop()\`.

## Yang harus dikembalikan

Kembalikan array \`number[]\` dengan panjang sama dengan \`operations\`, satu entri per operasi.
Karena setiap operasi di atas mengembalikan sebuah bilangan, tidak ada nilai kosong di dalam
hasil:

- \`push\` → panjang stack yang baru;
- \`pop\` → nilai yang dibuang;
- \`top\` → nilai puncak saat itu;
- \`getMin\` → nilai terkecil saat itu.

Semua operasi dijamin sah: \`pop\`, \`top\`, dan \`getMin\` tidak akan pernah dipanggil ketika
stack sedang kosong.

Target: setiap operasi **O(1)**.`,
    en: `Here you do not write a class. Instead you **run a sequence of operations** on a stack that
can report its minimum value, and return every result.

The operations are \`"push"\`, \`"pop"\`, \`"top"\`, and \`"getMin"\`:

- \`push(x)\` puts \`x\` on top of the stack, then returns the **number of elements** after the
  push — exactly like \`Array.prototype.push\` in JavaScript.
- \`pop()\` removes the top element and **returns the value that was removed**.
- \`top()\` returns the top value without removing it.
- \`getMin()\` returns the **smallest** value currently in the stack.

## How the operations are represented

Because your function only receives JSON arguments, the operation sequence is sent as **two
parallel arrays** (element \`i\` of both arrays describes the same single operation):

| Parameter | Contents |
| --- | --- |
| \`operations\` | operation name: \`"push"\`, \`"pop"\`, \`"top"\`, or \`"getMin"\` |
| \`args\` | argument list for that operation |

\`push\` needs one number, while the other operations need no argument at all. That is why
**every element of \`args\` is an array**: \`args[i] = [x]\` for \`push\`, and \`args[i] = []\`
for \`pop\`, \`top\`, and \`getMin\`.

An example input shape:

\`\`\`
operations = ["push", "getMin", "pop"]
args       = [[7],    [],       []]
\`\`\`

This means: call \`push(7)\`, then \`getMin()\`, then \`pop()\`.

## What to return

Return a \`number[]\` with the same length as \`operations\`, one entry per operation. Since every
operation above returns a number, the result contains no empty values:

- \`push\` → the new stack length;
- \`pop\` → the value that was removed;
- \`top\` → the current top value;
- \`getMin\` → the current smallest value.

Every operation is guaranteed to be legal: \`pop\`, \`top\`, and \`getMin\` are never called while
the stack is empty.

Target: **O(1)** per operation.`,
  },
  examples: [
    {
      input: 'operations = ["push","push","push","getMin","pop","top","getMin"], args = [[-2],[0],[-3],[],[],[],[]]',
      output: '[1, 2, 3, -3, -3, 0, -2]',
      explanation: {
        id: 'Tiga `push` pertama menghasilkan panjang 1, 2, dan 3. Isi stack dari bawah ke atas adalah -2, 0, -3 sehingga minimumnya -3. `pop` mengembalikan -3 yang baru dibuang, lalu puncaknya 0 dan minimumnya kembali -2 — nilai minimum harus bisa "dipulihkan" setelah pop.',
        en: 'The first three `push` calls report lengths 1, 2, and 3. The stack holds -2, 0, -3 from bottom to top, so the minimum is -3. `pop` returns the -3 it just removed, after which the top is 0 and the minimum is back to -2 — the minimum must be "recoverable" after a pop.',
      },
    },
    {
      input: 'operations = ["push","push","top","getMin","pop","getMin"], args = [[5],[1],[],[],[],[]]',
      output: '[1, 2, 1, 1, 1, 5]',
      explanation: {
        id: '`top` dan `getMin` sering bernilai sama; di sini keduanya 1 sebelum pop. `pop` mengembalikan 1 yang dibuang, dan setelah itu minimumnya menjadi 5.',
        en: '`top` and `getMin` often coincide; here both are 1 before the pop. `pop` returns the 1 it removed, and afterwards the minimum becomes 5.',
      },
    },
    {
      input: 'operations = ["push","push","push","pop","pop","getMin"], args = [[2],[2],[9],[],[],[]]',
      output: '[1, 2, 3, 9, 2, 2]',
      explanation: {
        id: 'Setelah 9 dan satu buah 2 dibuang, masih ada satu 2 di dalam stack, jadi `getMin` tetap 2. Nilai kembar membuat perhitungan minimum dengan satu variabel jadi rapuh.',
        en: 'After 9 and one copy of 2 are removed, a 2 is still inside the stack, so `getMin` stays 2. Duplicate values are what make a single-variable minimum fragile.',
      },
    },
  ],
  hints: {
    id: [
      '`getMin` harus O(1), jadi kamu tidak boleh memindai seluruh stack saat dipanggil. Informasi apa yang perlu disimpan bersama setiap elemen ketika dia di-push?',
      'Kalau kamu hanya menyimpan satu variabel "nilai minimum saat ini", apa yang terjadi ketika nilai itu di-pop?',
      'Simpan stack kedua yang sejajar: `minimums[i]` adalah nilai terkecil dari dasar sampai kedalaman `i`. Saat push, nilai barunya adalah `min(x, minimums.top)`.',
      'Perhatikan kontrak pengembaliannya: `push` mengembalikan panjang stack yang baru, `pop` mengembalikan nilai yang dibuang, dan array hasil harus sepanjang `operations`.',
    ],
    en: [
      '`getMin` must be O(1), so you cannot scan the whole stack when it is called. What information should travel with each element when it is pushed?',
      'If you keep only one "current minimum" variable, what happens when that value is popped?',
      'Keep a second, parallel stack: `minimums[i]` is the smallest value from the bottom up to depth `i`. On push, the new value is `min(x, minimums.top)`.',
      'Mind the return contract: `push` returns the new stack length, `pop` returns the value it removed, and the result array must be as long as `operations`.',
    ],
  },
  explanation: {
    id: `## Pendekatan

\`push\`, \`pop\`, dan \`top\` sudah O(1) dengan array biasa. Yang sulit hanya \`getMin\`: kalau
kamu menyimpan satu variabel minimum, variabel itu menjadi salah begitu nilai minimum
di-pop — kamu tidak tahu nilai terkecil berikutnya tanpa memindai ulang seluruh stack, dan
itu O(n) per panggilan.

Solusinya: simpan **minimum sampai kedalaman itu** bersama setiap elemen, di stack kedua
yang sejajar. Saat \`push(x)\`, hitung \`baru = min(x, minimums.top)\` lalu dorong ke
\`minimums\`. Saat \`pop\`, buang puncak kedua stack. \`getMin\` cukup membaca puncak
\`minimums\` — tidak perlu memindai apa pun, dan minimum sebelumnya otomatis pulih setelah
pop.

Teknik "stack kedua yang sejajar" ini muncul berkali-kali saat soal meminta agregat
(minimum, maksimum, jumlah) yang harus konsisten dengan isi stack saat ini.

Satu detail implementasi: karena satu operasi menghasilkan satu angka, kerjakan seluruhnya
dalam satu loop atas \`operations\` dan dorong hasilnya ke array \`result\` di saat yang sama.

## Kompleksitas

- Waktu: O(n) untuk n operasi, yaitu O(1) per operasi.
- Ruang: O(n) — dua stack yang panjangnya mengikuti jumlah push.

## Kesalahan umum

- Menyimpan hanya satu nilai minimum, lalu memindai ulang seluruh stack di setiap
  \`getMin\`. Benar, tetapi O(n) per panggilan dan totalnya O(n²).
- Mengira \`push\` mengembalikan nilai yang baru dimasukkan, padahal yang diminta adalah
  **panjang stack** setelah push. Salah di sini membuat hampir semua test case gagal.
- Lupa bahwa \`pop\` mengembalikan nilai yang dibuang, bukan nilai puncak yang baru.
- Membaca \`args[i]\` sebagai angka, padahal setiap elemennya adalah array — untuk \`push\`
  nilainya ada di \`args[i][0]\`.
- Memakai \`min(x, minimums.top)\` tanpa memeriksa stack kosong saat push pertama. Karena
  semua operasi dijamin sah, stack kosong hanya mungkin tepat sebelum \`push\` pertama.`,
    en: `## Approach

\`push\`, \`pop\`, and \`top\` are already O(1) with a plain array. The hard one is \`getMin\`: if
you keep a single minimum variable, it becomes wrong the moment that minimum is popped — you
cannot know the next smallest value without rescanning the whole stack, which is O(n) per
call.

The fix is to store **the minimum down to each depth** next to every element, in a second
parallel stack. On \`push(x)\` compute \`next = min(x, minimums.top)\` and push it onto
\`minimums\`. On \`pop\`, drop the top of both stacks. \`getMin\` just reads the top of
\`minimums\` — no scanning at all, and the previous minimum is restored automatically by the
pop.

This "second parallel stack" trick keeps coming back whenever a problem asks for an aggregate
(minimum, maximum, sum) that must stay consistent with the current contents.

One implementation detail: since each operation yields exactly one number, do everything in a
single loop over \`operations\` and append to the \`result\` array as you go.

## Complexity

- Time: O(n) for n operations, that is O(1) per operation.
- Space: O(n) — two stacks whose length follows the number of pushes.

## Common mistakes

- Keeping a single minimum value and rescanning the whole stack on every \`getMin\`. Correct,
  but O(n) per call and O(n²) overall.
- Assuming \`push\` returns the value that was pushed, when the contract asks for the **stack
  length** after the push. Getting this wrong fails almost every test case.
- Forgetting that \`pop\` returns the value that was removed, not the new top.
- Reading \`args[i]\` as a number when each entry is an array — for \`push\` the value lives at
  \`args[i][0]\`.
- Using \`min(x, minimums.top)\` without handling the empty stack on the very first push.
  Because every operation is guaranteed legal, an empty stack can only happen right before
  that first \`push\`.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function runMinStack(operations, args) {
  // write your solution here
}
`,
      solution: `function runMinStack(operations, args) {
  const stack = [];
  const minimums = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];

    if (operation === 'push') {
      const value = args[i][0];
      stack.push(value);

      const previous = minimums.length === 0 ? value : minimums[minimums.length - 1];
      minimums.push(Math.min(previous, value));
      result.push(stack.length);
    } else if (operation === 'pop') {
      const removed = stack.pop();
      minimums.pop();
      result.push(removed);
    } else if (operation === 'top') {
      result.push(stack[stack.length - 1]);
    } else {
      result.push(minimums[minimums.length - 1]);
    }
  }

  return result;
}
`,
    },
    {
      language: 'python',
      template: `def runMinStack(operations, args):
    # write your solution here
    pass
`,
      solution: `def runMinStack(operations, args):
    stack = []
    minimums = []
    result = []

    for index, operation in enumerate(operations):
        if operation == 'push':
            value = args[index][0]
            stack.append(value)
            minimums.append(value if not minimums else min(minimums[-1], value))
            result.append(len(stack))
        elif operation == 'pop':
            result.append(stack.pop())
            minimums.pop()
        elif operation == 'top':
            result.append(stack[-1])
        else:
            result.append(minimums[-1])

    return result
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [
        ['push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
        [[-2], [0], [-3], [], [], [], []],
      ],
      expected: [1, 2, 3, -3, -3, 0, -2],
    },
    {
      id: 'c2',
      input: [
        ['push', 'push', 'top', 'getMin', 'pop', 'getMin'],
        [[5], [1], [], [], [], []],
      ],
      expected: [1, 2, 1, 1, 1, 5],
    },
    {
      id: 'c3',
      input: [['push', 'getMin'], [[7], []]],
      expected: [1, 7],
      hidden: true,
    },
    {
      id: 'c4',
      input: [
        ['push', 'push', 'push', 'getMin', 'pop', 'getMin', 'pop', 'getMin'],
        [[-2], [-2], [-3], [], [], [], [], []],
      ],
      expected: [1, 2, 3, -3, -3, -2, -2, -2],
      hidden: true,
    },
    {
      id: 'c5',
      input: [
        ['push', 'push', 'getMin', 'top', 'pop', 'getMin'],
        [[2147483647], [-2147483648], [], [], [], []],
      ],
      expected: [1, 2, -2147483648, -2147483648, -2147483648, 2147483647],
      hidden: true,
    },
    {
      id: 'c6',
      input: [
        ['push', 'push', 'push', 'top', 'getMin', 'pop', 'top', 'pop', 'top', 'getMin'],
        [[3], [2], [1], [], [], [], [], [], [], []],
      ],
      expected: [1, 2, 3, 1, 1, 1, 2, 2, 3, 3],
      hidden: true,
    },
  ],
};
