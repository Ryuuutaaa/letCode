import type { Problem } from '~/types/content';

export const wordSearch: Problem = {
  slug: 'word-search',
  title: {
    id: 'Pencarian Kata di Grid',
    en: 'Word Search',
  },
  difficulty: 'hard',
  trackId: 'backtracking',
  order: 5,
  functionName: 'exist',
  parameters: [
    { name: 'board', type: 'string[][]' },
    { name: 'word', type: 'string' },
  ],
  returnType: 'boolean',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan papan dua dimensi \`board\` berisi huruf, dan sebuah \`word\`.

Kembalikan \`true\` kalau \`word\` bisa disusun dari huruf-huruf di papan dengan aturan:

1. Huruf pertama \`word\` boleh diambil dari sel mana saja.
2. Huruf berikutnya harus berasal dari sel yang **bersebelahan secara horizontal atau
   vertikal** dengan sel huruf sebelumnya. Diagonal **tidak** termasuk.
3. **Satu sel hanya boleh dipakai satu kali** dalam satu penyusunan.

Huruf pertama dan terakhir boleh berada di mana saja selama rantai di atas terpenuhi.

Contoh papan 3×4:

\`\`\`text
A B C E
S F C S
A D E E
\`\`\`

Kata \`"ABCCED"\` bisa disusun: A di (0,0), B di (0,1), C di (0,2), C di (1,2), E di (2,2),
D di (2,1) — setiap langkah berpindah ke sel tetangga.

Kata \`"ABCB"\` tidak bisa: setelah A-B-C, huruf berikutnya harus B, tetapi satu-satunya B yang
bersebelahan dengan C di (0,2) adalah B di (0,1) yang sudah dipakai.

Papan selalu punya paling sedikit satu sel, dan \`word\` paling sedikit satu karakter.`,
    en: `You are given a two-dimensional \`board\` of letters and a \`word\`.

Return \`true\` when \`word\` can be built from letters on the board under these rules:

1. The first letter of \`word\` may come from any cell.
2. Every following letter must come from a cell **horizontally or vertically adjacent** to the
   cell of the previous letter. Diagonals **do not** count.
3. **A single cell may be used only once** in one build.

The first and last letters can be anywhere as long as the chain above holds.

A 3×4 board for example:

\`\`\`text
A B C E
S F C S
A D E E
\`\`\`

The word \`"ABCCED"\` can be built: A at (0,0), B at (0,1), C at (0,2), C at (1,2), E at (2,2),
D at (2,1) — every step moves to a neighbouring cell.

The word \`"ABCB"\` cannot: after A-B-C the next letter must be B, but the only B adjacent to the
C at (0,2) is the B at (0,1), which is already used.

The board always has at least one cell and \`word\` at least one character.`,
  },
  examples: [
    {
      input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
      output: 'true',
      explanation: {
        id: 'Jalurnya bisa dilacak: (0,0) A → (0,1) B → (0,2) C → (1,2) C → (2,2) E → (2,1) D.',
        en: 'The path can be traced: (0,0) A → (0,1) B → (0,2) C → (1,2) C → (2,2) E → (2,1) D.',
      },
    },
    {
      input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
      output: 'true',
      explanation: {
        id: 'S di (1,3), lalu E di (2,3), lalu E di (2,2). Perhatikan bahwa huruf yang sama boleh muncul berkali-kali di papan, selama selnya berbeda.',
        en: 'S at (1,3), then E at (2,3), then E at (2,2). The same letter may appear many times on the board as long as the cells differ.',
      },
    },
    {
      input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
      output: 'false',
      explanation: {
        id: 'Satu-satunya kelanjutan dari A-B-C adalah B di (0,1) yang sudah dipakai. Inilah gunanya penandaan sel: tanpa itu, sel yang sama akan dipakai dua kali.',
        en: 'The only continuation of A-B-C is the B at (0,1), which is already used. This is exactly why cells are marked: without it the same cell would be reused.',
      },
    },
  ],
  hints: {
    id: [
      'Cari huruf pertama di seluruh papan, lalu coba lanjutkan dari sel itu ke empat arah.',
      'Karena satu sel tidak boleh dipakai dua kali, kamu perlu menandai sel yang sedang dipakai — lalu **melepas** penandaan itu ketika kembali.',
      'Tandai di tempat: simpan huruf aslinya, ganti dengan karakter khusus, lalu kembalikan setelah rekursi selesai.',
      'Hentikan lebih awal kalau `index` sudah sama dengan panjang `word` (berarti seluruh kata ditemukan), dan kembalikan `false` untuk sel di luar papan atau yang hurufnya tidak cocok.',
    ],
    en: [
      'Finding the first letter anywhere and trying the continuation from that cell in four directions is enough.',
      'Because a cell may not be used twice you must mark the cells currently in use — and **clear** the mark on the way back.',
      'Mark in place: keep the original letter, overwrite it with a special character, and restore it once the recursion returns.',
      'Stop early when `index` equals the length of `word` (the whole word is found), and return `false` for out-of-bounds cells or cells whose letter does not match.',
    ],
  },
  explanation: {
    id: `## Pendekatan

Coba setiap sel sebagai titik awal, lalu telusuri kata huruf demi huruf. Fungsi rekursif
membawa posisi \`(r, c)\` dan posisi huruf yang sedang dicari, \`index\`.

\`\`\`js
function walk(r, c, index) {
  if (index === word.length) {
    return true;                                   // seluruh kata sudah cocok
  }
  if (r < 0 || r >= rows || c < 0 || c >= cols) {
    return false;                                  // keluar papan
  }
  if (board[r][c] !== word[index]) {
    return false;                                  // huruf tidak cocok
  }

  const saved = board[r][c];
  board[r][c] = '#';                               // PILIH: tandai sel ini terpakai

  const found
    = walk(r + 1, c, index + 1)
    || walk(r - 1, c, index + 1)
    || walk(r, c + 1, index + 1)
    || walk(r, c - 1, index + 1);

  board[r][c] = saved;                             // BATALKAN: lepaskan penandaan

  return found;
}
\`\`\`

Inti soalnya ada di langkah "batalkan". Karena satu sel tidak boleh dipakai dua kali, sel yang
sedang ditelusuri harus ditandai. Kalau penandaannya tidak dilepas, sel itu tertutup untuk
seluruh pencarian berikutnya dan jawaban yang sah akan hilang. Kalau penandaan tidak pernah
dipasang, sel yang sama bisa dipakai berkali-kali dan kata yang seharusnya gagal justru lolos.

Perhatikan bahwa operator \`||\` sudah memberi pemangkasan alami: begitu satu arah berhasil,
tiga arah lainnya tidak dicoba.

Pendekatan alternatif: matriks \`visited\` terpisah berukuran m×n, atau \`Set\` berisi kunci
\`"r,c"\`. Keduanya benar, tetapi biaya memorinya lebih besar dan lebih lambat, karena penandaan
di tempat hanya menukar satu karakter.

## Kompleksitas

- Waktu: O(m · n · 3^L) di mana L adalah panjang \`word\`. Ada m · n kemungkinan titik awal, dan
  dari setiap sel penelusuran bercabang ke paling banyak 3 arah baru (arah kembali ke sel
  asal sudah tertutup oleh penandaan). Untuk L yang kecil dibanding jumlah sel, biaya efektifnya
  jauh di bawah batas ini.
- Ruang: O(L) untuk kedalaman rekursi dan penandaan di tempat. Tanpa struktur tambahan apa pun.

## Kesalahan umum

- **Tidak melepas penandaan.** Ini kesalahan paling berbahaya di soal ini: hasilnya salah
  hanya untuk kata yang butuh mundur, sehingga sering lolos dari uji coba sederhana.
- Memakai \`Set\` tetapi lupa menghapus kunci saat mundur — sama saja dengan poin di atas.
- Membuat salinan papan di setiap cabang. Benar, tetapi lambat dan boros; penandaan di tempat
  lebih baik.
- Salah batas: memeriksa \`(r, c)\` setelah membaca \`board[r][c]\`, sehingga muncul error indeks.
- Menganggap diagonal sebagai arah yang sah.
- Tidak menghentikan pencarian setelah kata lengkap, sehingga seluruh papan tetap ditelusuri.
- Menandai sel **sebelum** memeriksa apakah hurufnya cocok, lalu mengembalikan \`false\` tanpa
  membersihkan penandaan.
- Menukar tanda \`#\` dengan huruf yang mungkin ada di papan, sehingga sel yang sah jadi dianggap
  terpakai. Gunakan penanda yang tidak mungkin muncul di papan.`,
    en: `## Approach

Try every cell as a starting point, then walk the word letter by letter. The recursive function
carries a position \`(r, c)\` and the position of the letter being matched, \`index\`.

\`\`\`js
function walk(r, c, index) {
  if (index === word.length) {
    return true;                                   // the whole word matched
  }
  if (r < 0 || r >= rows || c < 0 || c >= cols) {
    return false;                                  // off the board
  }
  if (board[r][c] !== word[index]) {
    return false;                                  // letter mismatch
  }

  const saved = board[r][c];
  board[r][c] = '#';                               // CHOOSE: mark this cell as used

  const found
    = walk(r + 1, c, index + 1)
    || walk(r - 1, c, index + 1)
    || walk(r, c + 1, index + 1)
    || walk(r, c - 1, index + 1);

  board[r][c] = saved;                             // UNDO: clear the mark

  return found;
}
\`\`\`

The whole problem lives in the undo step. Since a cell may not be used twice, the cell currently
being walked must be marked. If the mark is never cleared, that cell stays closed for the rest
of the search and valid answers disappear. If the mark is never placed, the same cell can be
reused and words that should fail end up passing.

Note that the \`||\` chain prunes naturally: as soon as one direction succeeds the other three are
never tried.

Alternatives: a separate m×n \`visited\` matrix, or a \`Set\` holding \`"r,c"\` keys. Both are correct
but cost more memory and more time, because in-place marking swaps a single character.

## Complexity

- Time: O(m · n · 3^L) where L is the length of \`word\`. There are m · n possible starting cells,
  and from each cell the search branches into at most 3 new directions (the direction back to
  the previous cell is closed by the mark). For an L small compared with the number of cells the
  effective cost sits well below that bound.
- Space: O(L) for the recursion depth, with in-place marking and no extra structure at all.

## Common mistakes

- **Not clearing the mark.** The most dangerous mistake here: the answer is only wrong for words
  that need to backtrack, so simple tests often pass anyway.
- Using a \`Set\` but forgetting to delete the key on the way back — same problem as above.
- Copying the board in every branch. Correct, but slow and wasteful; in-place marking is better.
- Out-of-order bounds checks: reading \`board[r][c]\` before validating \`(r, c)\`, which throws an
  index error.
- Treating diagonals as valid moves.
- Not stopping once the word is complete, so the whole board is still explored.
- Marking the cell **before** checking whether its letter matches, then returning \`false\` without
  clearing the mark.
- Using a \`#\` marker that could actually occur on the board, so a legitimate cell looks used.
  Pick a sentinel that cannot appear in the input.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function exist(board, word) {
  // write your solution here
}
`,
      solution: `function exist(board, word) {
  const rows = board.length;
  const cols = rows > 0 ? board[0].length : 0;

  function walk(r, c, index) {
    if (index === word.length) {
      return true;
    }

    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return false;
    }

    if (board[r][c] !== word[index]) {
      return false;
    }

    const saved = board[r][c];
    board[r][c] = '#';

    const found
      = walk(r + 1, c, index + 1)
      || walk(r - 1, c, index + 1)
      || walk(r, c + 1, index + 1)
      || walk(r, c - 1, index + 1);

    board[r][c] = saved;

    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (walk(r, c, 0)) {
        return true;
      }
    }
  }

  return false;
}
`,
    },
    {
      language: 'python',
      template: `def exist(board, word):
    # write your solution here
    pass
`,
      solution: `def exist(board, word):
    rows = len(board)
    cols = len(board[0]) if rows > 0 else 0

    def walk(r, c, index):
        if index == len(word):
            return True

        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False

        if board[r][c] != word[index]:
            return False

        saved = board[r][c]
        board[r][c] = "#"

        found = (
            walk(r + 1, c, index + 1)
            or walk(r - 1, c, index + 1)
            or walk(r, c + 1, index + 1)
            or walk(r, c - 1, index + 1)
        )

        board[r][c] = saved

        return found

    for r in range(rows):
        for c in range(cols):
            if walk(r, c, 0):
                return True

    return False
`,
    },
  ],
  testCases: [
    {
      id: 'c1',
      input: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCCED',
      ],
      expected: true,
    },
    {
      id: 'c2',
      input: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'SEE',
      ],
      expected: true,
    },
    {
      id: 'c3',
      input: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCB',
      ],
      expected: false,
    },
    {
      id: 'c4',
      input: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'E', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCESEEEFS',
      ],
      expected: true,
      hidden: true,
    },
    {
      id: 'c5',
      input: [[['A']], 'A'],
      expected: true,
      hidden: true,
    },
    {
      id: 'c6',
      input: [[['A']], 'B'],
      expected: false,
      hidden: true,
    },
    {
      id: 'c7',
      input: [[['a', 'a']], 'AAA'],
      expected: false,
      hidden: true,
    },
    {
      id: 'c8',
      input: [
        [
          ['C', 'A', 'A'],
          ['A', 'A', 'A'],
          ['B', 'C', 'D'],
        ],
        'AAB',
      ],
      expected: true,
      hidden: true,
    },
    {
      id: 'c9',
      input: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCCEDX',
      ],
      expected: false,
      hidden: true,
    },
    {
      id: 'c10',
      input: [
        [
          ['A', 'B'],
          ['C', 'D'],
        ],
        'ABDC',
      ],
      expected: true,
      hidden: true,
    },
    {
      id: 'c11',
      input: [
        [
          ['A', 'B'],
          ['C', 'D'],
        ],
        'ABCD',
      ],
      expected: false,
      hidden: true,
    },
    {
      id: 'c12',
      input: [
        [
          ['a', 'a', 'a'],
          ['a', 'a', 'a'],
          ['a', 'a', 'a'],
        ],
        'aaaaaaaa',
      ],
      expected: true,
      hidden: true,
    },
    {
      id: 'c13',
      input: [
        [
          ['a', 'a', 'a'],
          ['a', 'a', 'a'],
          ['a', 'a', 'a'],
        ],
        'aaaaaaaaaa',
      ],
      expected: false,
      hidden: true,
    },
  ],
};
