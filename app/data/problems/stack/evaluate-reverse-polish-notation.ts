import type { Problem } from '~/types/content';

export const evaluateReversePolishNotation: Problem = {
  slug: 'evaluate-reverse-polish-notation',
  title: {
    id: 'Evaluate Reverse Polish Notation',
    en: 'Evaluate Reverse Polish Notation',
  },
  difficulty: 'medium',
  trackId: 'stack',
  order: 3,
  functionName: 'evalRPN',
  parameters: [{ name: 'tokens', type: 'string[]' }],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Ekspresi aritmetika biasanya ditulis dalam bentuk infix, misalnya \`(2 + 1) * 3\`. Dalam
**notasi Polandia terbalik** (RPN, juga disebut postfix), operator ditulis **setelah** kedua
operandnya, sehingga ekspresi yang sama menjadi \`2 1 + 3 *\`. Tanda kurung tidak diperlukan
lagi karena urutan operasinya sudah tidak ambigu.

Diberikan array string \`tokens\` yang merepresentasikan satu ekspresi RPN yang sah.
Setiap token adalah salah satu dari:

- bilangan bulat, yang bisa negatif dan ditulis apa adanya seperti \`"13"\` atau \`"-3"\`;
- operator: tepat salah satu dari \`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`.

Kembalikan hasil evaluasinya sebagai bilangan bulat.

Aturan yang berlaku:

- Pembagian selalu **memotong ke arah nol** (truncate), bukan membulatkan ke bawah.
  Contoh: \`7 / -3\` menghasilkan \`-2\`, dan \`-7 / 3\` juga menghasilkan \`-2\`.
- Tidak ada pembagian dengan nol, dan ekspresi tidak pernah kekurangan operand.
- Semua hasil antara tetap berada dalam rentang bilangan bulat 32-bit.

Target: satu lintasan, **O(n)**.`,
    en: `Arithmetic expressions are usually written in infix form, for example \`(2 + 1) * 3\`. In
**reverse Polish notation** (RPN, also called postfix) the operator is written **after** both
of its operands, so the same expression becomes \`2 1 + 3 *\`. Parentheses are no longer needed
because the order of operations is unambiguous.

You are given an array of strings \`tokens\` representing one valid RPN expression. Every token
is either:

- an integer, possibly negative, written plainly such as \`"13"\` or \`"-3"\`;
- an operator: exactly one of \`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`.

Return the evaluated result as an integer.

The rules:

- Division always **truncates toward zero**, it does not round down. For example \`7 / -3\`
  gives \`-2\`, and \`-7 / 3\` also gives \`-2\`.
- There is no division by zero, and the expression never runs out of operands.
- Every intermediate result fits in a signed 32-bit integer.

Target: a single pass, **O(n)**.`,
  },
  examples: [
    {
      input: 'tokens = ["2","1","+","3","*"]',
      output: '9',
      explanation: {
        id: 'Operator `+` mengambil dua angka terakhir (2 dan 1) menjadi 3, lalu `*` mengambil 3 dan 3 menjadi 9. Inilah `(2 + 1) * 3`.',
        en: 'The operator `+` takes the last two numbers (2 and 1) and makes 3, then `*` takes 3 and 3 and makes 9. This is `(2 + 1) * 3`.',
      },
    },
    {
      input: 'tokens = ["4","13","5","/","+"]',
      output: '6',
      explanation: {
        id: '`13 / 5` dipotong ke arah nol menjadi 2, bukan 2.6. Setelah itu `4 + 2 = 6`.',
        en: '`13 / 5` is truncated toward zero to 2, not 2.6. After that `4 + 2 = 6`.',
      },
    },
    {
      input: 'tokens = ["10","2","8","*","-"]',
      output: '-6',
      explanation: {
        id: '`2 * 8 = 16` muncul lebih dulu, sehingga ekspresinya `10 - 16`. Pengurangan tidak komutatif: urutan operand menentukan hasilnya.',
        en: '`2 * 8 = 16` is computed first, so the expression is `10 - 16`. Subtraction is not commutative: operand order decides the answer.',
      },
    },
  ],
  hints: {
    id: [
      'Setiap angka boleh "menunggu" sampai operatornya muncul. Bagaimana kamu menyimpan angka-angka yang menunggu?',
      'Gunakan stack: angka di-push, dan saat operator datang, ambil dua angka terakhir dari stack.',
      'Hati-hati urutan operand: yang di-pop pertama adalah operan kanan (`b`), yang di-pop kedua operan kiri (`a`), dan hasilnya adalah `a op b`.',
      'Untuk pembagian, potong ke arah nol. `Math.floor` di JavaScript dan `//` di Python membulatkan ke bawah, sehingga salah untuk tanda yang berbeda.',
    ],
    en: [
      'Every number may "wait" until its operator shows up. How do you store the numbers that are waiting?',
      'Use a stack: push numbers, and when an operator arrives take the last two numbers off the stack.',
      'Watch the operand order: the first value popped is the right operand (`b`), the second is the left operand (`a`), and the result is `a op b`.',
      'For division, truncate toward zero. `Math.floor` in JavaScript and `//` in Python round down, which is wrong when the signs differ.',
    ],
  },
  explanation: {
    id: `## Pendekatan

RPN dirancang supaya bisa dievaluasi dengan satu stack, tanpa aturan prioritas operator.

Telusuri token satu per satu:

1. Kalau token adalah angka, ubah ke bilangan bulat lalu \`push\`.
2. Kalau token adalah operator, \`pop\` dua kali. Nilai pertama adalah operan **kanan** \`b\`,
   nilai kedua operan **kiri** \`a\`. Hitung \`a op b\`, lalu \`push\` hasilnya.
3. Setelah semua token diproses, stack berisi tepat satu nilai — itulah jawabannya.

Perhatikan cara membedakan token: operatornya sangat sedikit (\`+\`, \`-\`, \`*\`, \`/\`), jadi
paling aman memeriksa apakah token ada di himpunan operator. Jangan mengandalkan \`Number(token)\`
bernilai \`NaN\`: konversi \`NaN\` juga terjadi untuk input lain, dan \`-\` bisa muncul sebagai
operator maupun sebagai bagian dari angka negatif.

## Kompleksitas

- Waktu: O(n) — setiap token diproses sekali.
- Ruang: O(n) — stack menyimpan operand; pada ekspresi yang sah kedalamannya kira-kira
  setengah jumlah angka.

## Kesalahan umum

- **Menukar urutan operand.** \`b\` adalah hasil \`pop\` pertama. Untuk \`+\` dan \`*\` kesalahan
  ini tidak terlihat, tetapi untuk \`-\` dan \`/\` hasilnya langsung salah. Selalu uji dengan
  pengurangan, seperti contoh ketiga.
- **Pembulatan yang salah pada pembagian.** \`Math.floor(-7 / 3)\` bernilai \`-3\`, padahal
  jawabannya \`-2\`. Python \`-7 // 3\` juga \`-3\`. Gunakan pemotongan ke arah nol:
  \`Math.trunc(a / b)\` atau \`int(a / b)\`.
- **Menganggap \`-\` selalu operator.** Token \`"-3"\` adalah angka; bandingkan dengan himpunan
  operator, bukan dengan "karakter pertama".
- **Menangani ekspresi satu token sebagai kasus khusus.** Sebenarnya tidak perlu: loop yang
  sama akan menaruh angka itu di stack, dan mengembalikan puncak stack tetap benar.`,
    en: `## Approach

RPN is designed so it can be evaluated with a single stack and no operator precedence rules.

Walk the tokens one at a time:

1. If the token is a number, parse it to an integer and \`push\` it.
2. If the token is an operator, \`pop\` twice. The first value is the **right** operand \`b\`,
   the second is the **left** operand \`a\`. Compute \`a op b\` and \`push\` the result.
3. Once every token is processed the stack holds exactly one value — that is the answer.

Note how to tell tokens apart: there are only four operators (\`+\`, \`-\`, \`*\`, \`/\`), so the
safest check is membership in that operator set. Do not rely on \`Number(token)\` being \`NaN\`:
other inputs also convert to \`NaN\`, and \`-\` can be an operator or part of a negative number.

## Complexity

- Time: O(n) — each token is processed once.
- Space: O(n) — the stack holds operands; for a valid expression its depth is roughly half the
  number of number tokens.

## Common mistakes

- **Swapping the operands.** \`b\` is the first \`pop\`. The bug is invisible for \`+\` and \`*\` but
  immediately wrong for \`-\` and \`/\`. Always test with subtraction, like the third example.
- **Wrong rounding on division.** \`Math.floor(-7 / 3)\` is \`-3\` when the answer is \`-2\`.
  Python's \`-7 // 3\` is \`-3\` as well. Truncate toward zero instead: \`Math.trunc(a / b)\` or
  \`int(a / b)\`.
- **Assuming \`-\` is always an operator.** The token \`"-3"\` is a number; compare against the
  operator set rather than against "the first character".
- **Special-casing a single-token expression.** It is unnecessary: the same loop leaves that
  number on the stack, and returning the stack top is still correct.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function evalRPN(tokens) {
  // write your solution here
}
`,
      solution: `function evalRPN(tokens) {
  const operators = new Set(['+', '-', '*', '/']);
  const stack = [];

  for (const token of tokens) {
    if (!operators.has(token)) {
      stack.push(Number(token));
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();
    let value;

    if (token === '+') {
      value = a + b;
    } else if (token === '-') {
      value = a - b;
    } else if (token === '*') {
      value = a * b;
    } else {
      value = Math.trunc(a / b);
    }

    stack.push(value);
  }

  return stack[stack.length - 1];
}
`,
    },
    {
      language: 'python',
      template: `def evalRPN(tokens):
    # write your solution here
    pass
`,
      solution: `def evalRPN(tokens):
    operators = {'+', '-', '*', '/'}
    stack = []

    for token in tokens:
        if token not in operators:
            stack.append(int(token))
            continue

        b = stack.pop()
        a = stack.pop()

        if token == '+':
            stack.append(a + b)
        elif token == '-':
            stack.append(a - b)
        elif token == '*':
            stack.append(a * b)
        else:
            stack.append(int(a / b))

    return stack[-1]
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [['2', '1', '+', '3', '*']], expected: 9 },
    { id: 'c2', input: [['4', '13', '5', '/', '+']], expected: 6 },
    { id: 'c3', input: [['3']], expected: 3, hidden: true },
    { id: 'c4', input: [['7', '-3', '/']], expected: -2, hidden: true },
    { id: 'c5', input: [['-4', '-2', '/']], expected: 2, hidden: true },
    {
      id: 'c6',
      input: [['5', '1', '2', '+', '4', '*', '+', '3', '-']],
      expected: 14,
      hidden: true,
    },
    { id: 'c7', input: [['10', '2', '8', '*', '-']], expected: -6, hidden: true },
    {
      id: 'c8',
      input: [['2000', '3000', '*', '7', '-']],
      expected: 5999993,
      hidden: true,
    },
  ],
};
