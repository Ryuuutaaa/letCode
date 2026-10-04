import type { Track } from '~/types/content';

export const twoPointers: Track = {
  id: 'two-pointers',
  order: 2,
  title: {
    id: 'Two Pointers',
    en: 'Two Pointers',
  },
  summary: {
    id: 'Mengubah dua loop bersarang menjadi satu lintasan dengan dua penunjuk yang bergerak terkoordinasi.',
    en: 'Turn two nested loops into a single pass with two pointers moving in coordination.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa topik ini penting',
        en: 'Why this topic matters',
      },
      body: {
        id: `Setelah kamu bisa memakai hash map, jebakan berikutnya adalah **loop bersarang**.
Solusinya seringkali bukan struktur data baru, tapi cara menelusuri yang lebih pintar.

Two pointers menurunkan O(n²) menjadi O(n) tanpa memori tambahan. Ini muncul sangat sering
di interview karena menguji apakah kamu bisa memanfaatkan **keterurutan** data.

Bedanya dengan hash map: hash map menukar ruang dengan waktu (butuh O(n) memori).
Two pointers menukar **struktur data yang terurut** dengan waktu, dan gratis secara memori.`,
        en: `Once you are comfortable with hash maps, the next trap is the **nested loop**. The fix
is often not a new data structure, but a smarter way to walk the data.

Two pointers bring O(n²) down to O(n) without extra memory. It shows up constantly in
interviews because it tests whether you can exploit the fact that the data is **ordered**.

The difference from a hash map: a hash map trades space for time (it needs O(n) memory).
Two pointers trade **sorted input** for time, and cost nothing in memory.`,
      },
    },
    {
      id: 'konsep',
      title: {
        id: 'Kapan dua pointer dipakai',
        en: 'When two pointers apply',
      },
      body: {
        id: `Tiga syarat yang biasanya muncul bersamaan:

1. **Data terurut**, atau punya struktur yang membuat pergerakan pointer bermakna.
2. **Mencari pasangan atau rentang** yang memenuhi suatu syarat.
3. **Bisa membuang sebagian kemungkinan** setiap kali satu pointer bergerak.

Poin ketiga yang paling menentukan. Dua pointer hanya berguna kalau setiap langkah
membuat kita **yakin** membuang beberapa kandidat sekaligus. Kalau tidak, tidak ada
yang dihemat.

Contoh: pada array terurut, kalau jumlah dua ujung terlalu kecil, menaikkan pointer kiri
membuang seluruh pasangan yang memakai nilai kiri itu — karena pasangannya dengan pointer
kanan mana pun akan tetap terlalu kecil.`,
        en: `Three conditions usually show up together:

1. The data is **sorted**, or has structure that makes pointer movement meaningful.
2. You are looking for a **pair or a range** that satisfies some condition.
3. You can **rule out part of the search space** every time a pointer moves.

The third point decides everything. Two pointers only help when each step lets you
**confidently discard** several candidates at once. Otherwise nothing is saved.

For example: on a sorted array, if the sum of the two ends is too small, moving the left
pointer discards every pair that uses that left value — because pairing it with any
right pointer would still be too small.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Tiga pola utama',
        en: 'The three main patterns',
      },
      body: {
        id: `**Berlawanan arah.** Satu pointer di awal, satu di akhir, keduanya bergerak ke
tengah. Dipakai untuk pencarian pasangan pada array terurut, pengecekan palindrom, dan
pembalikan di tempat. Syaratnya data terurut (atau simetris).

**Searah (slow & fast).** Keduanya mulai dari awal, tapi bergerak dengan kecepatan
berbeda. Dipakai untuk memindahkan elemen, menghapus duplikat di tempat, dan deteksi
siklus. Syaratnya tidak perlu terurut.

**Sliding window.** Sebenarnya ini kasus khusus dua pointer searah yang mempertahankan
sebuah jendela. Dibahas terpisah di track berikutnya karena punya ritme sendiri.

Untuk tiga angka (seperti 3Sum), polanya adalah **satu loop + dua pointer**. Kamu kunci
satu nilai, lalu selesaikan sisanya sebagai masalah dua pointer. Ini pola yang sangat
umum: mengurangi dimensi sampai masalahnya jadi bentuk yang sudah kamu kenal.`,
        en: `**Opposite ends.** One pointer at the start, one at the end, both moving inward. Used
for pair search on sorted arrays, palindrome checks, and in-place reversal. Requires
sorted (or symmetric) data.

**Same direction (slow & fast).** Both start at the beginning but move at different
speeds. Used for moving elements, removing duplicates in place, and cycle detection.
Ordering is not required.

**Sliding window.** Really a special case of the same-direction pattern that maintains a
window. It is covered separately in the next track because it has its own rhythm.

For three numbers (like 3Sum) the pattern is **one loop plus two pointers**. You fix one
value, then solve the rest as a two-pointer problem. This is a very general move: reduce
the dimension until the problem becomes a shape you already recognize.`,
      },
    },
    {
      id: 'jebakan',
      title: {
        id: 'Jebakan yang sering terjadi',
        en: 'Common traps',
      },
      body: {
        id: `**Lupa mengurutkan lebih dulu.** Two pointers pada array terurut sangat berbeda
dengan pada array acak. Kalau memakai pendekatan ini pada masalah 3Sum, pastikan
pengurutannya benar dan sadari bahwa indeks jawaban tidak lagi sesuai input asli.

**Pointer saling menyalip.** Untuk pola berlawanan arah, kondisinya biasanya \`left < right\`,
bukan \`left <= right\`. Memakai \`<=\` membuat satu elemen dipakai dua kali.

**Tidak melewatkan duplikat.** Pada 3Sum, setelah menemukan satu jawaban kamu harus
menggeser pointer melewati semua nilai yang sama, kalau tidak hasilnya berisi jawaban
kembar.

**Menggerakkan pointer yang salah.** Aturannya bukan "geser keduanya", tapi "geser yang
membuat keadaan lebih baik". Kalau jumlah terlalu kecil, geser kiri. Kalau terlalu besar,
geser kanan.`,
        en: `**Forgetting to sort first.** Two pointers on a sorted array behave very differently
from two pointers on a random one. If you use this on a 3Sum-style problem, make sure the
sort is correct and remember that the answer indices no longer match the original input.

**Pointers crossing each other.** For the opposite-ends pattern the condition is usually
\`left < right\`, not \`left <= right\`. With \`<=\` a single element gets used twice.

**Not skipping duplicates.** In 3Sum, after finding one answer you must move the pointer
past every equal value; otherwise the result contains duplicate answers.

**Moving the wrong pointer.** The rule is not "move both", it is "move the one that
makes the situation better". If the sum is too small, move the left pointer. If it is too
large, move the right one.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Dua pointer adalah alat untuk **membuang kandidat**, bukan sekadar dua variabel indeks.
- Tanpa keterurutan (atau struktur lain yang sepadan), pattern ini kehilangan kekuatannya.
- Kalau soal meminta **di tempat** dan **O(1) ruang tambahan**, dua pointer adalah tersangka utama.
- Pola "satu loop + dua pointer" adalah cara standar menurunkan masalah tiga dimensi menjadi dua.

## Latihan yang disarankan

Mulai dari soal palindrom untuk membiasakan pola berlawanan arah, lanjut ke pemindahan
elemen untuk pola searah, lalu tiga soal terakhir menggabungkan keduanya dengan tingkat
kesulitan yang meningkat.`,
        en: `- Two pointers is a tool for **discarding candidates**, not just two index variables.
- Without ordering (or equivalent structure), the pattern loses its power.
- If a problem asks for **in place** and **O(1) extra space**, two pointers is the prime suspect.
- The "one loop plus two pointers" move is the standard way to reduce a three-dimensional
  problem to two.

## Suggested practice

Start with the palindrome problem to get used to the opposite-ends pattern, move on to the
in-place element shifting for the same-direction pattern, then the last three combine both
with increasing difficulty.`,
      },
    },
  ],
  problemSlugs: [
    'valid-palindrome',
    'move-zeroes',
    'two-sum-sorted',
    'container-with-most-water',
    'three-sum',
  ],
};
