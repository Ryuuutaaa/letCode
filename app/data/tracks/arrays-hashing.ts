import type { Track } from '~/types/content';

export const arraysHashing: Track = {
  id: 'arrays-hashing',
  order: 1,
  title: {
    id: 'Arrays & Hashing',
    en: 'Arrays & Hashing',
  },
  summary: {
    id: 'Fondasi semua struktur data. Belajar memakai array dan hash map untuk menukar waktu dengan ruang.',
    en: 'The foundation of every data structure. Learn to trade time for space with arrays and hash maps.',
  },
  sections: [
    {
      id: 'kenapa',
      title: {
        id: 'Kenapa topik ini dulu',
        en: 'Why this topic first',
      },
      body: {
        id: `Hampir semua soal interview yang sulit dibangun dari dua hal ini: menelusuri array
dan mencari sesuatu dengan cepat. Kalau dua ini sudah lancar, topik berikutnya jauh
lebih ringan.

Topik ini juga tempat sebagian besar pola lain bermuara. Two pointers, sliding window,
dan dynamic programming semuanya bekerja di atas array. Jadi waktu yang kamu habiskan
di sini akan terbayar berkali-kali.`,
        en: `Almost every hard interview problem is built from two things: walking through an
array and looking something up quickly. Once these two feel natural, everything after
this gets lighter.

This is also where most other patterns end up. Two pointers, sliding window, and dynamic
programming all operate on arrays. Time spent here pays back many times over.`,
      },
    },
    {
      id: 'array',
      title: {
        id: 'Array',
        en: 'Array',
      },
      body: {
        id: `Array menyimpan elemen berurutan dan bisa diakses lewat indeks.

- Akses lewat indeks: O(1)
- Mencari nilai tertentu: O(n)
- Menambah atau menghapus di tengah: O(n)

Konsekuensi yang paling sering terlewat: **menyisipkan di awal array itu mahal**, karena
semua elemen setelahnya harus digeser. Kalau kamu mendapati diri sering melakukan itu,
kemungkinan besar ada struktur lain yang lebih tepat.

Array juga punya **locality** yang baik — elemennya tersimpan berdampingan di memori —
sehingga menelusuri array dari awal ke akhir jauh lebih cepat daripada menelusuri
linked list. Ini alasan praktis mengapa array sering menang meski kompleksitasnya sama.`,
        en: `An array stores elements in order and lets you reach them by index.

- Access by index: O(1)
- Looking for a specific value: O(n)
- Inserting or removing in the middle: O(n)

The consequence people miss most: **inserting at the front of an array is expensive**,
because every element after it has to shift. If you catch yourself doing that often, there
is probably a better structure for the job.

Arrays also have good **locality** — their elements sit next to each other in memory — so
walking an array front to back is far faster than walking a linked list. That is the
practical reason arrays often win even when the complexity looks the same.`,
      },
    },
    {
      id: 'hash-map',
      title: {
        id: 'Hash map',
        en: 'Hash map',
      },
      body: {
        id: `Hash map (objek, \`Map\`, atau dictionary) menyimpan pasangan kunci-nilai dan mencari
berdasarkan kunci.

- Menyisipkan: O(1) rata-rata
- Mencari berdasarkan kunci: O(1) rata-rata
- Menghapus: O(1) rata-rata

Kata **rata-rata** penting di sini. Kalau banyak kunci bertabrakan, operasinya bisa
memburuk sampai O(n). Di interview kamu hampir selalu boleh menganggapnya O(1), tapi
sebutkan asumsinya supaya terlihat kamu tahu.

Kunci hash map harus **hashable**. Di Python, list tidak bisa jadi kunci — pakai tuple.
Di JavaScript, objek dan array dibandingkan berdasarkan referensi, bukan isi, sehingga
menggunakannya sebagai kunci hampir selalu bug. Ubah dulu ke string.`,
        en: `A hash map (object, \`Map\`, or dictionary) stores key-value pairs and looks values up
by key.

- Insert: O(1) on average
- Lookup by key: O(1) on average
- Remove: O(1) on average

The word **average** matters here. If many keys collide, operations can degrade to O(n).
In interviews you may almost always treat it as O(1), but stating the assumption shows
you know the difference.

Hash map keys must be **hashable**. In Python a list cannot be a key — use a tuple
instead. In JavaScript, objects and arrays compare by reference rather than contents, so
using them as keys is almost always a bug. Convert to a string first.`,
      },
    },
    {
      id: 'pola',
      title: {
        id: 'Pola yang paling sering muncul',
        en: 'The patterns you will see most',
      },
      body: {
        id: `**Trade-off waktu dengan ruang.** Kalau kamu melakukan pencarian berulang di dalam
loop, itu tanda kamu butuh hash map. Contoh: mencari pasangan yang jumlahnya sama dengan
target bisa dilakukan dalam satu kali lintasan, bukan dua loop bersarang.

**Menghitung kemunculan.** Saat soal menyebut "berapa kali", "apakah sama isinya", atau
"kelompokkan", hash map biasanya jawabannya.

**Kunci yang dinormalkan.** Untuk membandingkan dua hal yang bisa punya banyak bentuk
(misalnya anagram), ubah dulu ke bentuk yang seragam, lalu jadikan kunci hash.

**Prefix dan suffix.** Banyak soal array sebenarnya meminta hasil gabungan dari kiri dan
kanan. Daripada menghitung ulang tiap posisi, simpan hasil lintasan maju, lalu lengkapi
dengan lintasan mundur.`,
        en: `**Trading space for time.** If you keep searching inside a loop, that is your signal
to reach for a hash map. For example, finding a pair that sums to a target can be done in
a single pass instead of two nested loops.

**Counting occurrences.** When a problem says "how many times", "are these the same", or
"group these", a hash map is usually the answer.

**Normalized keys.** To compare two things that can take many shapes (anagrams, for
instance), convert them to one canonical form first, then use that as the hash key.

**Prefix and suffix.** Many array problems really ask for a combination of the left side
and the right side. Instead of recomputing at every position, store the result of one
forward pass, then finish it with a backward pass.`,
      },
    },
    {
      id: 'ingat',
      title: {
        id: 'Yang perlu diingat',
        en: 'Keep in mind',
      },
      body: {
        id: `- Loop bersarang biasanya adalah tanda solusi O(n²) yang bisa diperbaiki.
- Kalau soal meminta O(n) dan kamu butuh pencarian cepat, hash map hampir selalu jawabannya.
- Untuk soal berikutnya, coba tanyakan: **apa yang bisa saya ubah menjadi kunci?**

## Latihan yang disarankan

Kerjakan soal di bawah berurutan. Dua soal pertama membangun kebiasaan memakai hash map,
dua berikutnya melatih lintasan maju-mundur, dan soal terakhir menggabungkan keduanya.`,
        en: `- Nested loops usually signal an O(n²) solution that can be improved.
- When a problem asks for O(n) and you need fast lookups, a hash map is almost always it.
- For the next problem, ask yourself: **what here can I turn into a key?**

## Suggested practice

Work through the problems below in order. The first two build the habit of reaching for a
hash map, the next two train forward-and-backward passes, and the last one combines both.`,
      },
    },
  ],
  problemSlugs: [
    'two-sum',
    'contains-duplicate',
    'valid-anagram',
    'product-except-self',
    'group-anagrams',
  ],
};
