import type { Track } from '~/types/content';

export const arraysHashing: Track = {
  id: 'arrays-hashing',
  title: 'Arrays & Hashing',
  order: 1,
  summary:
    'Fondasi semua struktur data. Belajar memakai array dan hash map untuk menukar waktu dengan ruang.',
  material: `## Kenapa topik ini dulu

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
  problemSlugs: [
    'two-sum',
    'contains-duplicate',
    'valid-anagram',
    'product-except-self',
    'group-anagrams',
  ],
};
