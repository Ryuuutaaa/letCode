# LetCode App — Catatan Diskusi

Dokumen ini adalah catatan diskusi konsep (hulu → hilir) sebelum masuk ke struktur kode.
Status: **masih fase diskusi**, belum ada keputusan arsitektur final.

---

## 1. Ide Dasar

Website latihan coding (mirip LeetCode) dengan soal logika dari **easy → expert**,
dilengkapi **materi step by step**, dan user bisa **live coding langsung di browser**.

Ide ini sebenarnya menempelkan tiga produk dalam satu platform:

1. **Platform konten** — katalog soal + kurikulum bertingkat dengan jalur belajar.
2. **Editor + runner** — pengalaman menulis kode, klik Run, lihat hasil (bagian "live coding").
3. **Judge / sandbox** — mesin yang menjalankan kode user dengan aman dan memberi verdict objektif.

Bagian tersulit dan paling menentukan adalah nomor 3, bukan nomor 1 atau 2.

---

## 2. Keputusan yang Sudah Dikunci

| Topik | Keputusan |
| --- | --- |
| Target pengguna utama | **Persiapan / latihan interview kerja** |
| Biaya | **Nol** — tidak mau keluar biaya sepeser pun |
| Bahasa pemrograman awal | **Python + JavaScript** |
| Sifat situs | **Personal / portofolio dulu**, publik menyusul |
| Strategi eksekusi kode | **Browser-first** (belum pakai server) |
| Gaya soal | **Function signature ala LeetCode** (bukan stdin/stdout ala Codeforces) |
| Toolchain frontend | **Nuxt (Vue 3) + TypeScript** |
| Editor kode | **Monaco** |

---

## 3. Hulu — Kenapa & Untuk Siapa

Target utama adalah **interview prep**, jadi:

- Konten harus selaras pola soal industri (algoritma & struktur data).
- Bahasa populer: Python dan JavaScript.
- Penilaian objektif lewat test case.
- Jalur belajar dirancang sebagai **roadmap DSA**, bukan kumpulan soal acak.

Catatan: satu platform tidak bisa optimal untuk semua audiens. Target lain (pemula
belajar logika, sekolah/kampus B2B) punya kebutuhan yang berbeda dan sengaja tidak
diambil sekarang.

---

## 4. Moat: Konten, Bukan Editor

Editor itu komoditas (tinggal pakai Monaco). Yang benar-benar membedakan produk adalah
**kualitas konten dan kualitas feedback**. Karena v1 dirancang tanpa backend, moat
sepenuhnya ada di konten.

Implikasi: konten bukan pekerjaan "nanti", konten adalah produknya itu sendiri.

---

## 5. Domain Model (level konsep, bukan skema DB)

**Track/Materi → Soal → Test Case (sample terlihat + hidden) → Submission → Verdict**

Ditambah:
- User
- Progress per track
- (Nanti) pembahasan solusi & diskusi orang lain

Jangan lebih rumit dari ini di awal.

---

## 6. Hilir — Mesin Eksekusi

### Kenapa browser-first

Karena target awal personal dan biaya wajib nol, eksekusi dilakukan di browser:

- **JavaScript** — dijalankan di Web Worker, batas waktu via `terminate()`.
- **Python** — via **Pyodide** (Python dikompilasi ke WebAssembly), juga di Web Worker.
- Test case dikirim ikut ke browser, verdict dihitung di sisi klien.

Keuntungan: nol server, nol database, nol biaya, bisa deploy ke hosting statis gratis.

### Trade-off yang diterima sadar

- Hidden test case **tidak benar-benar tersembunyi** di browser (bisa diobfuscate, tapi
  tidak pernah aman). Cukup untuk latihan pribadi, **tidak cukup** untuk penilaian kelas.
- Limit waktu longgar → TLE hanya penanda kasar.
- Bahasa terbatas: Python & JS oke; C++/Java tidak praktis di browser.

### Opsi yang dipertimbangkan tapi belum dipilih

- **API publik Piston (emkc.org)** — gratis tanpa kunci, tapi ToS melarang untuk
  production dan dibagi ke seluruh internet. Hanya untuk coba-coba.
- **Judge0 hosted (RapidAPI)** — free tier ±50 eksekusi/hari, praktis tidak kepakai.
- **Tier self-host** — Piston (open source, sudah pakai `isolate`) atau Judge0 CE
  self-hosted di Docker, jalan di VM gratis permanen (mis. Oracle Cloud Always Free).
  Memberi hidden test asli + limit nyata, tapi butuh maintenance dan pendaftaran
  Oracle butuh kartu kredit untuk verifikasi.

### Prinsip desain

Rancang satu **antarmuka judge yang bisa ditukar** — `run(submission) → verdict` —
supaya bisa mulai dari browser, lalu pindah ke self-host tanpa mengubah bagian lain.

---

## 7. Kurikulum "Step by Step"

Urutan mengikuti roadmap DSA yang terbukti:

> Arrays & Hashing → Two Pointers → Sliding Window → Stack → Binary Search →
> Linked List → Trees → Heap/Priority Queue → Graphs → Dynamic Programming

Setiap topik punya tiga lapis:

1. **Materi singkat** — konsep + kompleksitas + pola khas.
2. **Contoh berguided** — 2–3 soal yang dibahas solusinya step by step.
3. **Latihan mandiri**.

---

## 8. Spesifikasi Kontrak Soal (function-signature style)

Tiap soal butuh lebih dari sekadar pernyataan. Minimal:

- Nama fungsi, parameter & tipe, tipe nilai balik.
- Daftar test case: input → output.
- Toleransi perbandingan (angka desimal, urutan tidak penting, dsb).

Ini juga yang membuat mesin di browser sederhana: cukup panggil `fungsi(...inputJSON)`
lalu bandingkan hasilnya.

### Verdict dasar

- Accepted
- Wrong Answer
- Time Limit Exceeded
- Runtime Error

---

## 9. Validasi Konten (wajib otomatis)

Setiap soal harus punya **reference solution**. Ada langkah validasi yang menjalankan
reference solution terhadap semua test case — kalau ada yang gagal, soal belum layak
tayang. Tanpa ini, cepat atau lambat akan tayang soal yang tidak punya jawaban benar
atau test case-nya salah.

---

## 10. Rencana Bertahap

- **Fase 0** — situs statis, 1 track, JavaScript saja, Monaco, Run sample,
  progress di `localStorage`.
- **Fase 1** — tambah Python (Pyodide), Submit + verdict lengkap, halaman pembahasan solusi.
- **Fase 2** — deploy gratis, tambah track, rapikan UX jalur belajar.
- **Fase 3** — pertimbangkan backend + DB + judge self-host saat mau publik atau butuh
  kepercayaan penilaian.

### Catatan UX/Teknis

- Pyodide besar (unduhan beberapa MB) → **jangan dimuat di awal**, muat hanya saat user
  memilih Python.
- Satu Web Worker per eksekusi, `terminate()` saat lewat batas waktu.

---

## 11. Risiko

1. ~~Biaya & keamanan sandbox~~ → sudah dimitigasi oleh pilihan browser-first.
2. **Menulis konten yang cukup banyak dan tetap benar** — risiko terbesar saat ini.
   Ini pekerjaan editorial, bukan teknis. Proyek seperti ini biasanya berhenti di 5 soal.
3. Terlalu banyak bahasa/soal di awal sampai tidak ada yang tamat.

---

## 12. Pertanyaan Terbuka

- **Sumber konten**: tulis sendiri (aman secara legal, lebih lama) vs adaptasi dari
  dataset soal yang beredar di internet (cepat, tapi lisensinya abu-abu dan berisiko
  kalau dibuka publik).
  Rekomendasi awal: tulis sendiri **20–30 soal untuk satu topik**, ikuti roadmap DSA
  umum sebagai urutan. Konsep bebas dipakai; yang tidak boleh adalah menyalin pernyataan
  soal orang lain apa adanya.
- Cakupan track pertama yang mau dikerjakan.
- Detail UX halaman soal (layout editor, output, pembahasan).

---

## 13. Aturan Diskusi

Sesuai permintaan: **diskusi dulu dari hulu ke hilir, jangan langsung ke struktur kode
apalagi kode.** Dokumen ini diperbarui seiring diskusi berjalan.

---

## 14. Tech Stack & Komponen yang Perlu Disiapkan

Ada tiga hal berbeda yang jangan dicampur:

1. Toolchain untuk membangun web-nya (yang kita pakai).
2. Mesin eksekusi (yang menjalankan kode user).
3. Konten (soal, test case, pembahasan).

### A. Toolchain pengembangan

- **Nuxt (Vue 3) + TypeScript** — situs statis, tanpa backend.
- **Monaco** — editor kode di dalam web.
- **@nuxtjs/tailwindcss** — styling.
- **Pinia** — state (standar Nuxt); bisa juga cukup composable kalau minimal.
- Routing bawaan Nuxt (file-based), tidak perlu React Router.
- Node.js + package manager.
- **Vitest** (terutama untuk runner & komparator), ESLint, Prettier.

### B. Catatan khusus Nuxt (titik gesekan yang harus diantisipasi)

- **Monaco dan Pyodide itu browser-only.** Di Nuxt wajib dimuat client-side saja
  (dynamic import / `<ClientOnly>`) supaya tidak bentrok dengan SSR.
- Rekomendasi: jalankan sebagai **SPA (`ssr: false`) + generate statis (`nuxt generate`)**.
  Hampir semua fitur (editor, runner, `localStorage`) memang client-side, jadi SSR tidak
  memberi nilai dan hanya menambah masalah hidrasi.
- **Monaco butuh konfigurasi bundling untuk worker-nya** (plugin Vite atau setup worker
  manual). Ini kerjaan tersendiri, bukan "tinggal install".

### C. Editor & panel output

- Monaco untuk menulis kode.
- Karena gaya soal adalah function signature, **tidak ada terminal/stdin**. Yang disiapkan
  adalah **panel output**: hasil per test case (lulus/gagal), log `print`/`console.log`,
  dan pesan error.

### D. Mesin eksekusi (runner)

- **JS Worker** dan **Python Worker (Pyodide)**, masing-masing menerima kode user + nama
  fungsi + test case, lalu mengembalikan hasil dalam JSON.
- Protokol pesan UI ↔ Worker yang jelas: `{status, results, logs}`.
- Batas waktu via `terminate()` untuk infinite loop.
- **Komparator** dengan toleransi (float, urutan tidak penting).
- Pembedaan error: syntax error vs runtime error vs timeout.
- Pyodide besar → **jangan dimuat di awal**, muat hanya saat user memilih Python.

### E. Konten

- **Skema soal bertipe** (TS + Zod): nama fungsi, parameter & tipe, return, test case,
  toleransi perbandingan.
- **Reference solution** per soal.
- **Pipeline validasi** — menjalankan reference solution ke semua test case; tidak lolos
  berarti soal belum layak tayang.

### F. Penyimpanan & deploy

- `localStorage` untuk progress (tanpa DB, tanpa auth).
- `nuxt generate` → output statis → hosting gratis (Cloudflare Pages / Vercel / Netlify /
  GitHub Pages).

### G. Belum perlu disiapkan sekarang

Backend, database, auth, Docker, Piston/Judge0, Redis, queue, WebSocket, CI/CD rumit.
Semua itu baru relevan di Fase 3.

### H. Prioritas Fase 0

Nuxt + TS, Monaco, JS Worker runner, komparator, skema soal + 20–30 soal satu track,
`localStorage`, deploy statis. Python/Pyodide masuk Fase 1.
