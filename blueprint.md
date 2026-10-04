# LetCode App — Blueprint Logic

Dokumen ini adalah rancangan **logika** (bukan implementasi kode): fitur, halaman, fungsi,
dan alur tiap fungsi. Turunan dari `note.md`.

Aturan: **function signature ala LeetCode**, **browser-first**, **tanpa backend**,
**Nuxt 4 + TS + UnoCSS + Monaco + perkakas**.

---

## 1. Arsitektur Logika — 4 Lapis

Pisahkan empat lapis ini sejak awal. Ini yang membuat pindah ke server nanti tidak
merusak apa-apa.

| Lapis | Isi | Tahu tentang |
| --- | --- | --- |
| **1. Content** | Data track/soal/test case + loader | tidak tahu UI, tidak tahu runner |
| **2. Runner (judge)** | Eksekusi kode, komparator, verdict | tahu `RunRequest`/`RunResult` saja |
| **3. State** | Progress, draft, submission | `localStorage`, tidak tahu UI |
| **4. UI** | Halaman + komponen | memanggil 1–3 |

Aturan penting: **UI tidak pernah memanggil Worker langsung**. UI → state → runner.
Runner tidak pernah menyentuh `localStorage`. Content tidak pernah menyentuh runner.

---

## 2. Fitur

### Fase 0 — inti yang harus jalan
1. **Katalog track** — daftar track roadmap DSA + progres tiap track.
2. **Daftar soal per track** — judul, difficulty, status (belum/selesai).
3. **Halaman soal (workspace)** — deskripsi + contoh + editor + panel hasil.
4. **Run (sample test)** — jalankan kode terhadap test case yang terlihat.
5. **Submit (semua test)** — verdict lengkap, menandai soal selesai.
6. **Editor Monaco** — syntax highlight, template awal per bahasa, reset.
7. **Draft otomatis** — kode tersimpan per soal per bahasa di `localStorage`.
8. **Progress** — soal selesai/gagal disimpan lokal, progres track terhitung.

### Fase 1
9. **Python (Pyodide)** — bahasa kedua, dimuat hanya saat dipilih.
10. **Panel konsol** — log `console.log` / `print` user.
11. **Pembahasan solusi** — terbuka setelah soal Accepted.
12. **Hint bertingkat** — dibuka bertahap.

### Fase 2
13. **Deploy statis** + tambah track.
14. **Filter & pencarian soal** (difficulty/status/tag).
15. **Riwayat submission** per soal.

### Fase 3 (publik)
16. Auth, leaderboard, diskusi, judge self-host, penilaian yang bisa dipercaya.

---

## 3. Halaman (route Nuxt `app/pages/`)

| Route | File | Isi |
| --- | --- | --- |
| `/` | `index.vue` | Dashboard: progres keseluruhan + kartu track |
| `/tracks` | `tracks/index.vue` | Semua track sebagai roadmap berurutan |
| `/tracks/[trackId]` | `tracks/[trackId].vue` | Materi singkat track + daftar soal + progres track |
| `/problems` | `problems/index.vue` | Semua soal + filter difficulty/status |
| `/problems/[slug]` | `problems/[slug].vue` | **Workspace**: split deskripsi \| editor + panel hasil |
| `/about` | `about.vue` | Opsional |
| — | `error.vue` | 404 |

Layout workspace (`problems/[slug].vue`):
```
┌───────────────┬──────────────────────────────┐
│ Deskripsi     │ Toolbar: [bahasa] [Reset]     │
│ - pernyataan  │ ┌──────────────────────────┐ │
│ - contoh      │ │ Monaco Editor            │ │
│ - hint        │ └──────────────────────────┘ │
│ - (solusi)    │ [Run sample] [Submit]         │
│               │ ┌──────────────────────────┐ │
│               │ │ Panel hasil per test case │ │
│               │ │ + konsol log              │ │
│               │ └──────────────────────────┘ │
└───────────────┴──────────────────────────────┘
```

---

## 4. Domain Model (types)

### Content
```ts
type LanguageId = 'javascript' | 'python';
type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
type ComparatorId = 'deepEqual' | 'unorderedDeepEqual' | 'floatApprox';

interface Track {
  id: string; // 'arrays-hashing'
  title: string;
  order: number;
  summary: string;
  material: string; // markdown teori singkat
  problemSlugs: Array<string>; // urutan belajar
}

interface TestCase {
  id: string;
  input: Array<unknown>; // array argumen fungsi
  expected: unknown;
  hidden?: boolean;
  comparator?: ComparatorId; // override per soal
  tolerance?: number;
}

interface Example {
  input: string; // tampilan manusia
  output: string;
  explanation?: string;
}

interface CodeTemplate {
  language: LanguageId;
  template: string; // starter, sudah berisi function signature
  solution: string; // reference solution (untuk validasi konten)
}

interface Problem {
  slug: string;
  title: string;
  difficulty: Difficulty;
  trackId: string;
  order: number;
  statement: string; // markdown
  examples: Array<Example>;
  functionName: string;
  parameters: Array<{ name: string; type: string }>;
  returnType: string;
  timeLimitMs: number;
  hints: Array<string>;
  explanation?: string; // markdown, muncul setelah Accepted
  templates: Array<CodeTemplate>;
  testCases: Array<TestCase>;
}
```

### Runner
```ts
interface RunRequest {
  language: LanguageId;
  code: string;
  functionName: string;
  testCases: Array<TestCase>;
  timeLimitMs: number;
}

type CaseStatus = 'passed' | 'failed' | 'error' | 'timeout';

interface CaseResult {
  testCaseId: string;
  hidden: boolean;
  status: CaseStatus;
  input?: Array<unknown>; // disembunyikan kalau hidden
  expected?: unknown;
  actual?: unknown;
  error?: string;
  durationMs: number;
}

type RunStatus
  = | 'accepted'
    | 'wrong-answer'
    | 'runtime-error'
    | 'time-limit-exceeded'
    | 'compile-error'
    | 'internal-error';

interface RunResult {
  status: RunStatus;
  cases: Array<CaseResult>;
  logs: Array<string>;
  durationMs: number;
}
```

### State
```ts
type ProblemStatus = 'unsolved' | 'attempted' | 'solved';

interface ProblemRecord {
  slug: string;
  status: ProblemStatus;
  attempts: number;
  solvedAt?: number;
  lastLanguage?: LanguageId;
}

interface ProgressStore {
  version: 1;
  problems: Record<string, ProblemRecord>;
}
```

---

## 5. Fungsi per Lapis

### Lapis 1 — Content (`app/utils/content.ts`)
| Fungsi | Tanggung jawab |
| --- | --- |
| `listTracks(): Track[]` | semua track, terurut `order` |
| `getTrack(id): Track \| undefined` | satu track |
| `getProblem(slug): Problem \| undefined` | satu soal |
| `listProblemsByTrack(trackId): Problem[]` | soal track, terurut `order` |
| `listAllProblems(): Problem[]` | seluruh soal |
| `getAdjacentProblems(slug)` | `{ prev?, next? }` untuk tombol navigasi |
| `getSampleCases(problem)` | test case yang `hidden !== true` |
| `getHiddenCases(problem)` | sisa test case |

### Lapis 2 — Runner (`app/utils/runner/`)
| Fungsi | Tanggung jawab |
| --- | --- |
| `run(request): Promise<RunResult>` | **facade** — pilih driver, jalankan, rangkum |
| `resolveDriver(language): JudgeDriver` | pilih `browser-js` / `browser-pyodide` |
| `runInWorker(factory, payload, timeoutMs)` | spawn worker, kirim pesan, timer, `terminate()` |
| `buildJavaScriptHarness(code, fnName)` | bungkus kode user agar fungsinya bisa dipanggil |
| `buildPythonHarness(code, fnName)` | sama untuk Python |
| `compare(actual, expected, comparator, tolerance)` | samakan hasil (pakai `perkakas`) |
| `deriveVerdict(cases): RunStatus` | tentukan verdict akhir dari semua case |
| `normalizeError(err): { kind, message }` | bedakan syntax / runtime / timeout |

Worker (bukan fungsi, tapi bagian lapis ini):
- `app/workers/js-runner.ts`
- `app/workers/python-runner.ts`

```ts
interface JudgeDriver {
  id: 'browser-js' | 'browser-pyodide';
  supports: (language: LanguageId) => boolean;
  run: (request: RunRequest) => Promise<RunResult>;
  warmup?: () => Promise<void>; // Pyodide: preload
}
```

### Lapis 3 — State (`app/composables/`)
| Fungsi | Tanggung jawab |
| --- | --- |
| `useProgress()` | baca/tulis status soal ke `localStorage` |
| `useDraft(slug, language)` | simpan & ambil draft kode |
| `useRunner()` | status `idle/running/done`, hasil, `run()`, `cancel()` |
| `useProblemWorkspace(slug)` | gabungkan problem + kode + run/submit + progress |

Detail `useProgress()`:
```
isSolved(slug): boolean
getStatus(slug): ProblemStatus
markAttempted(slug, language): void
markSolved(slug, language): void
trackProgress(trackId): { solved, total, percent }
overallProgress(): { solved, total, percent }
resetProgress(): void
exportProgress(): string        // JSON, untuk backup
importProgress(json): void
```

Detail `useProblemWorkspace(slug)`:
```
problem: ComputedRef<Problem>
language: Ref<LanguageId>
code: Ref<string>
result: Ref<RunResult | null>
status: Ref<'idle'|'running'|'done'>
setLanguage(lang): void
resetCode(): void
runSample(): Promise<void>
submit(): Promise<void>
```

### Lapis 4 — UI
Komponen (`app/components/`):
`AppHeader`, `TrackCard`, `TrackProgressBar`, `ProblemListItem`, `DifficultyBadge`,
`ProblemStatement`, `CodeEditor`, `LanguageSelect`, `WorkspaceToolbar`,
`ResultPanel`, `TestCaseRow`, `VerdictBadge`, `ConsolePanel`, `HintAccordion`,
`SolutionPanel`, `EmptyState`.

### Pendukung — Validasi Konten (`scripts/validate-content.ts`)
| Fungsi | Tanggung jawab |
| --- | --- |
| `validateProblem(problem): Result` | jalankan reference solution ke semua test case |
| `validateAll(): Result` | semua soal |
| `runReference(solution, problem, language)` | eksekusi reference di Node (JS) / Pyodide node (Python) |
| `assertWellFormed(problem)` | cek field wajib dan template cocok dengan signature |

Soal yang gagal validasi = tidak boleh ikut build.

---

## 6. Alur Tiap Fungsi Kunci

### 6.1 `run(request)` — inti
```
1. Validasi request:
   - language didukung? code tidak kosong? testCases ada?
   - jika gagal → return RunResult{ status:'internal-error', ... }
2. driver = resolveDriver(request.language)
3. driver.run(request):
   a. harness = build{JavaScript|Python}Harness(code, functionName)
   b. payload = { code: harness, functionName, testCases, timeLimitMs }
   c. hasil = runInWorker(factory, payload, timeLimitMs)
   d. map hasil mentah → CaseResult[] (jalankan compare per case)
4. status = deriveVerdict(cases)
5. return { status, cases, logs, durationMs }
```

### 6.2 `runInWorker(...)` — pengelolaan worker & timeout
```
1. worker = factory()          // JS: worker baru; Python: worker Pyodide tetap
2. mulai timer(timeoutMs)
3. worker.postMessage(payload)
4. tunggu salah satu:
   a. pesan hasil → bersihkan timer
   b. timer habis → worker.terminate() → hasil = semua case 'timeout'
   c. pesan error  → hasil = semua case 'error'
5. JS: terminate worker setiap selesai
   Python: JANGAN terminate (Pyodide mahal dimuat ulang), reset state saja
6. return hasil
```

### 6.3 Worker JS — per test case
```
1. terima payload
2. alihkan console.log → tampung ke array logs
3. kompilasi kode user:
   fn = new Function(`${code}; return ${functionName}`)()
4. untuk tiap testCase:
   a. t0 = now()
   b. actual = fn(...input)        // input sudah berupa array argumen
   c. durasi = now() - t0
   d. catat { testCaseId, actual, durationMs }
      catch → catat 'error' + normalizeError(err)
5. postMessage({ cases, logs })
```
Catatan: panggilan yang bisa menggantung (infinite loop) **tidak** ditangani di dalam
worker — itu tugas `runInWorker` lewat `terminate()`.

### 6.4 Worker Python — per test case
```
1. (sekali) lazy-load Pyodide, tampilkan status "menyiapkan Python…"
2. setStdout → tampung print ke logs
3. pyodide.runPython(code)          // definisi fungsi user
4. fn = pyodide.globals.get(functionName)
5. untuk tiap testCase:
   a. pyArgs = input.map(x => pyodide.toPy(x))
   b. t0 = now()
   c. hasil = fn(...pyArgs)
   d. actual = hasil.toJs()          // konversi balik ke JS
   e. catat { testCaseId, actual, durationMs }
      catch → 'error'
6. postMessage({ cases, logs })
```

### 6.5 `compare(actual, expected, comparator, tolerance)`
```
switch comparator:
  'deepEqual'          → P.isDeepEqual(actual, expected)
  'unorderedDeepEqual' → urutkan kedua array dulu, lalu P.isDeepEqual
  'floatApprox'        → jika array → bandingkan per elemen dengan |a-b| <= tolerance
                         selain itu pakai deepEqual
default                → deepEqual
```
Ini alasan `@vinicunca/perkakas` dipakai: `isDeepEqual` sudah menangani array & objek
bersarang. Jangan tulis komparator sendiri.

### 6.6 `deriveVerdict(cases)`
```
1. ada case 'timeout'?      → 'time-limit-exceeded'
2. ada case 'error'?        → 'runtime-error'
3. ada case 'failed'?       → 'wrong-answer'
4. semua 'passed'           → 'accepted'
5. cases kosong             → 'internal-error'
```
Prioritas sengaja: timeout/error dianggap lebih informatif daripada wrong answer.

### 6.7 `submit()` — alur paling penting dari sisi produk
```
1. status = 'running'; result = null
2. kode = code.value; problem = problem.value
3. result = await run({ language, code, functionName, testCases: SEMUA case, timeLimitMs })
4. tampilkan result
5. jika result.status === 'accepted':
     progress.markSolved(slug, language)
     tampilkan SolutionPanel (problem.explanation)
   selain itu:
     progress.markAttempted(slug, language)
6. status = 'done'
```

### 6.8 `runSample()` — sama, tapi tidak mengubah progress
```
1. status = 'running'
2. cases = getSampleCases(problem)
3. result = await run({ ..., testCases: cases })
4. tampilkan; TIDAK memanggil markSolved/markAttempted
```

### 6.9 `setLanguage(lang)` — ganti bahasa
```
1. simpan draft bahasa lama: draft.set(languageLama, code.value)
2. language.value = lang
3. kode baru = draft.get(lang) ?? template(problem, lang)
4. editor.setLanguage(lang)      // reconfigure Monaco
5. jika lang === 'python': runner.warmup() di belakang layar (prefetch Pyodide)
6. result = null; status = 'idle'
```

### 6.10 `useDraft` — autosave
```
1. watch(code) → debounce 500ms
2. draft.set(slug, language, value)  → localStorage:
     key: `letcode:draft:{slug}:{language}`
3. saat mount: draft.get(...) ?? template
```
Debounce dipakai supaya `localStorage` tidak ditulis tiap ketikan.

### 6.11 `useProgress` — persistensi
```
markSolved(slug, language):
  1. store = readStore()
  2. store.problems[slug] = { slug, status:'solved', attempts: +1, solvedAt: now, lastLanguage }
  3. writeStore(store) + perbarui ref reaktif (agar progres track ikut berubah)
  4. key: `letcode:progress:v1`

trackProgress(trackId):
  1. slugs = getTrack(trackId).problemSlugs
  2. solved = slugs.filter(isSolved).length
  3. return { solved, total: slugs.length, percent }
```
Seluruh store disimpan sebagai satu JSON, dengan `version` untuk migrasi nanti.

### 6.12 `validateProblem(problem)` — penjaga kualitas konten
```
1. assertWellFormed(problem): field wajib, template cocok dengan functionName
2. untuk tiap bahasa di problem.templates:
   a. reference = template.solution
   b. untuk tiap testCase: jalankan reference → actual
   c. compare(actual, expected, comparator) harus true
   d. gagal → kumpulkan error
3. return { ok, errors }
```
Dijalankan sebagai script sebelum build. Ini satu-satunya pertahanan terhadap soal cacat.

---

## 7. Urutan Pembangunan (step by step)

Tiap langkah menghasilkan sesuatu yang bisa dilihat/dijalankan.

**A. Fondasi data**
1. Tulis types (bagian 4).
2. Tulis 1 track + 3–5 soal (template JS + reference solution + test case).
3. Tulis fungsi content (bagian 5, lapis 1).
4. Halaman `/tracks` dan `/tracks/[trackId]` — baru daftar, belum ada editor.

**B. Runner JS (tanpa UI dulu)**
5. `js-runner.ts` + protokol pesan + `runInWorker` (timeout/terminate).
6. `buildJavaScriptHarness` + `compare` (pakai perkakas) + `deriveVerdict`.
7. Uji lewat halaman debug/dev, atau script kecil, pakai reference solution.

**C. Editor & hasil**
8. Integrasi Monaco (client-only) + template per bahasa + Reset.
9. `ResultPanel` + `TestCaseRow` + `VerdictBadge` + `ConsolePanel`.
10. `runSample()` end-to-end dari halaman soal.

**D. Submit & progress**
11. `submit()` (semua test case).
12. `useProgress` + `useDraft`.
13. Progres track di `/tracks` dan dashboard `/`.
14. `SolutionPanel` setelah Accepted.

**E. Python**
15. `python-runner.ts` + lazy-load Pyodide + `warmup()`.
16. `buildPythonHarness` + konversi tipe JS↔Python.
17. `setLanguage()` + prefetch.

**F. Kualitas & rilis**
18. `scripts/validate-content.ts` + jalankan sebelum build.
19. `ssr: false` + `nuxt generate` + deploy statis.
20. Perbaiki `note.md` (lihat bagian 9).

---

## 8. Keputusan yang Masih Perlu Diambil

1. **Render markdown** untuk `statement`/`material`/`explanation`:
   `@nuxt/content`, `markdown-it`, atau simpan sebagai struktur data?
   (Rekomendasi: `markdown-it` ringan, konten tetap di TS.)
2. **Pinia atau composables?**
   (Rekomendasi: composables dulu; Pinia belum perlu di skala ini.)
3. **Hidden test case**: di browser tidak bisa benar-benar disembunyikan.
   Terima sebagai batasan (cukup untuk latihan pribadi) atau pisahkan chunk-nya?
4. **Komparator default per soal** — siapa yang menentukan? Bagian dari konten soal.
5. **Batas waktu** — nilai default (mis. 2000 ms) dan apakah per soal bisa beda.
6. **Track pertama** yang dikerjakan (kandidat: Arrays & Hashing).

---

## 9. Koreksi `note.md` yang Sudah Tidak Akurat

Bagian 14 `note.md` perlu diperbarui:

- Tertulis `@nuxtjs/tailwindcss` → yang dipakai **UnoCSS** (`@vinicunca/unocss-preset`).
- Tertulis **Prettier** → tidak dipakai; `@vinicunca/eslint-config` sudah menangani
  formatting sendiri.
- Tertulis **Pinia** → masih keputusan terbuka (lihat bagian 8).
- Belum tercatat: `@vinicunca/perkakas` (dipakai untuk `isDeepEqual` di komparator),
  `@unocss/eslint-plugin` (untuk `unocss: true`), dan `eslint-plugin-sonarjs`.

Tambahan yang perlu dicatat: proyek sebaiknya dijalankan **`ssr: false`** karena
Monaco, Pyodide, dan `localStorage` semuanya client-only.
