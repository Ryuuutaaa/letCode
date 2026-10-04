import type { Problem } from '~/types/content';

export const validParentheses: Problem = {
  slug: 'valid-parentheses',
  title: {
    id: 'Valid Parentheses',
    en: 'Valid Parentheses',
  },
  difficulty: 'easy',
  trackId: 'stack',
  order: 1,
  functionName: 'isValid',
  parameters: [{ name: 's', type: 'string' }],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan string \`s\` yang hanya berisi karakter \`(\`, \`)\`, \`[\`, \`]\`, \`{\`, dan \`}\`.

Kembalikan \`true\` kalau string itu **valid**, yaitu memenuhi semua syarat berikut:

1. Setiap pembuka punya penutup dengan jenis yang sama.
2. Pembuka ditutup dalam urutan yang benar — pasangan tidak boleh saling menyilang.
3. Setiap penutup punya pembuka yang cocok.

Target: satu lintasan dengan **O(n)** waktu.`,
    en: `You are given a string \`s\` containing only the characters \`(\`, \`)\`, \`[\`, \`]\`, \`{\`,
and \`}\`.

Return \`true\` if the string is **valid**, meaning all of the following hold:

1. Every opening bracket is closed by a bracket of the same type.
2. Open brackets are closed in the correct order — pairs must not cross.
3. Every closing bracket has a matching opening bracket.

Target: a single pass with **O(n)** time.`,
  },
  examples: [
    {
      input: 's = "()[]{}"',
      output: 'true',
      explanation: {
        id: 'Tiga pasangan yang masing-masing segera ditutup, semuanya berjenis sama dan tidak menyilang.',
        en: 'Three pairs, each closed immediately, all of the same type and none crossing.',
      },
    },
    {
      input: 's = "(]"',
      output: 'false',
      explanation: {
        id: 'Pembuka `(` ditutup oleh `]`, jadi jenisnya tidak cocok meskipun jumlahnya seimbang.',
        en: 'The opener `(` is closed by `]`, so the types do not match even though the counts balance.',
      },
    },
    {
      input: 's = "([)]"',
      output: 'false',
      explanation: {
        id: 'Jumlah tiap jenis seimbang, tetapi pasangannya menyilang: `[` harus ditutup sebelum `)` muncul.',
        en: 'Every type is balanced, but the pairs cross: `[` must be closed before `)` appears.',
      },
    },
  ],
  hints: {
    id: [
      'Saat kamu bertemu penutup, informasi apa yang kamu butuhkan untuk memutuskan apakah dia sah?',
      'Kamu perlu tahu pembuka terakhir yang belum ditutup. Struktur apa yang menyimpan "yang terakhir" dengan mudah?',
      'Simpan pembuka di sebuah stack. Penutup harus cocok dengan elemen puncak; kalau tidak, langsung jawab `false`.',
      'Ada dua hal yang mudah terlupa: memeriksa stack kosong sebelum membandingkan, dan memastikan stack benar-benar kosong setelah semua karakter diproses.',
    ],
    en: [
      'When you meet a closing bracket, what information do you need in order to decide whether it is legal?',
      'You need the most recent opener that is still unclosed. Which structure gives you "the most recent" for free?',
      'Keep openers on a stack. A closer must match the top element; otherwise answer `false` immediately.',
      'Two easy things to forget: checking the stack is non-empty before comparing, and confirming the stack is empty once every character is processed.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Kuncinya adalah kalimat "yang terakhir dibuka, yang pertama ditutup" — persis definisi stack.

Telusuri karakter satu per satu:

1. Kalau karakter adalah pembuka (\`(\`, \`[\`, \`{\`), dorong ke stack.
2. Kalau karakter adalah penutup, lihat puncak stack. Kalau stack kosong, atau puncaknya
   bukan pembuka dengan jenis yang sama, jawabannya \`false\` — tidak ada cara memperbaiki
   keadaan ini di langkah berikutnya. Kalau cocok, buang puncaknya.
3. Setelah semua karakter diproses, string valid hanya kalau stack **kosong**.

Pemeriksaan terakhir itu bukan formalitas. Pada input \`"["\` tidak ada satu pun penutup yang
salah, tapi ada pembuka yang tidak pernah ditutup, jadi jawabannya tetap \`false\`.

## Kompleksitas

- Waktu: O(n) — setiap karakter di-push atau di-pop paling banyak sekali.
- Ruang: O(n) — kasus terburuk saat seluruh string berisi pembuka, misalnya \`"((((...((("\`.

## Kesalahan umum

- Melupakan pemeriksaan stack kosong sebelum membaca puncak. Ini melempar error pada input
  seperti \`"]"\`.
- Melupakan pemeriksaan stack kosong di akhir, sehingga \`"["\` dinilai valid.
- Hanya mencocokkan "sama-sama pembuka" atau menghitung keseimbangan jumlah, tanpa
  memeriksa jenis dan urutan. \`"([)]"\` seimbang secara jumlah, tapi tetap tidak valid.
- Menyimpan pasangan pembuka dan penutup sekaligus lalu membandingkan keduanya; yang perlu
  dibandingkan hanyalah penutup saat ini dengan puncak stack.`,
    en: `## Approach

The key is the sentence "the last one opened is the first one closed" — that is the
definition of a stack.

Walk through the characters one by one:

1. If the character is an opener (\`(\`, \`[\`, \`{\`), push it.
2. If it is a closer, look at the top of the stack. If the stack is empty, or the top is not
   an opener of the same type, the answer is \`false\` — nothing later can repair this. If it
   matches, pop it.
3. When every character is processed, the string is valid only if the stack is **empty**.

That last check is not a formality. On the input \`"["\` no closer was ever wrong, yet an
opener was never closed, so the answer is still \`false\`.

## Complexity

- Time: O(n) — each character is pushed and popped at most once.
- Space: O(n) — worst case when the whole string is openers, for example \`"((((...((("\`.

## Common mistakes

- Forgetting the empty check before reading the top. It throws on inputs such as \`"]"\`.
- Forgetting the final empty check, so that \`"["\` is judged valid.
- Comparing only "both are brackets" or counting how many of each type appear, without
  checking type and order. \`"([)]"\` is balanced by count and still invalid.
- Storing both the opener and the closer and comparing them; the only comparison needed is
  between the current closer and the top of the stack.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function isValid(s) {
  // write your solution here
}
`,
      solution: `function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
      continue;
    }

    if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
      return false;
    }

    stack.pop();
  }

  return stack.length === 0;
}
`,
    },
    {
      language: 'python',
      template: `def isValid(s):
    # write your solution here
    pass
`,
      solution: `def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for ch in s:
        if ch in '([{':
            stack.append(ch)
            continue

        if not stack or stack[-1] != pairs[ch]:
            return False

        stack.pop()

    return not stack
`,
    },
  ],
  testCases: [
    { id: 'c1', input: ['()[]{}'], expected: true },
    { id: 'c2', input: ['(]'], expected: false },
    { id: 'c3', input: ['([)]'], expected: false, hidden: true },
    { id: 'c4', input: ['{[]}'], expected: true, hidden: true },
    { id: 'c5', input: [']'], expected: false, hidden: true },
    { id: 'c6', input: [''], expected: true, hidden: true },
    { id: 'c7', input: ['('], expected: false, hidden: true },
    {
      id: 'c8',
      input: [`${'('.repeat(500)}${')'.repeat(500)}`],
      expected: true,
      hidden: true,
    },
  ],
};
