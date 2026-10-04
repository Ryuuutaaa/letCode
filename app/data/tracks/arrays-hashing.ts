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
  material: {
    id: `## Kenapa topik ini dulu

Hampir semua soal interview yang sulit dibangun dari dua hal ini: menelusuri array dan
mencari sesuatu dengan cepat. Kalau dua ini sudah lancar, topik berikutnya jauh lebih ringan.

## Array

Array menyimpan elemen berurutan dan bisa diakses lewat indeks.

- Akses lewat indeks: O(1)
- Mencari nilai tertentu: O(n)
- Menambah atau menghapus di tengah: O(n)

## Hash map

Hash map (objek, Map, atau dictionary) menyimpan pasangan kunci-nilai dan mencari
berdasarkan kunci.

- Menyisipkan: O(1) rata-rata
- Mencari berdasarkan kunci: O(1) rata-rata
- Menghapus: O(1) rata-rata

## Pola yang paling sering muncul

**Trade-off waktu dengan ruang.** Kalau kamu melakukan pencarian berulang di dalam loop,
itu tanda kamu butuh hash map. Contoh: mencari pasangan yang jumlahnya sama dengan target
bisa dilakukan dalam satu kali lintasan, bukan dua loop bersarang.

**Menghitung kemunculan.** Saat soal menyebut "berapa kali", "apakah sama isinya", atau
"kelompokkan", hash map biasanya jawabannya.

**Kunci yang dinormalkan.** Untuk membandingkan dua hal yang bisa punya banyak bentuk
(misalnya anagram), ubah dulu ke bentuk yang seragam, lalu jadikan kunci hash.

## Yang perlu diingat

- Loop bersarang biasanya adalah tanda solusi O(n²) yang bisa diperbaiki.
- Kalau soal meminta O(n) dan kamu butuh pencarian cepat, hash map hampir selalu jawabannya.
- Untuk soal berikutnya, coba tanyakan: apa yang bisa saya ubah menjadi kunci?`,
    en: `## Why this topic first

Almost every hard interview problem is built from two things: walking through an array and
looking something up quickly. Once these two feel natural, everything after this gets lighter.

## Array

An array stores elements in order and lets you reach them by index.

- Access by index: O(1)
- Looking for a specific value: O(n)
- Inserting or removing in the middle: O(n)

## Hash map

A hash map (object, Map, or dictionary) stores key-value pairs and looks values up by key.

- Insert: O(1) on average
- Lookup by key: O(1) on average
- Remove: O(1) on average

## The patterns you will see most

**Trading space for time.** If you keep searching inside a loop, that is your signal to
reach for a hash map. For example, finding a pair that sums to a target can be done in a
single pass instead of two nested loops.

**Counting occurrences.** When a problem says "how many times", "are these the same", or
"group these", a hash map is usually the answer.

**Normalized keys.** To compare two things that can take many shapes (anagrams, for
instance), convert them to one canonical form first, then use that as the hash key.

## Keep in mind

- Nested loops usually signal an O(n²) solution that can be improved.
- When a problem asks for O(n) and you need fast lookups, a hash map is almost always it.
- For the next problem, ask yourself: what here can I turn into a key?`,
  },
  problemSlugs: [
    'two-sum',
    'contains-duplicate',
    'valid-anagram',
    'product-except-self',
    'group-anagrams',
  ],
};
