import type { Problem } from '~/types/content';

export const taskScheduler: Problem = {
  slug: 'task-scheduler',
  title: {
    id: 'Penjadwalan Tugas dengan Jeda',
    en: 'Task Scheduler',
  },
  difficulty: 'hard',
  trackId: 'heap',
  order: 5,
  functionName: 'leastInterval',
  parameters: [
    { name: 'tasks', type: 'string[]' },
    { name: 'n', type: 'number' },
  ],
  returnType: 'number',
  timeLimitMs: 2000,
  statement: {
    id: `Diberikan daftar tugas \`tasks\`, di mana setiap tugas adalah satu huruf kapital dari
\`'A'\` sampai \`'Z'\`, dan bilangan bulat \`n\`.

Dalam satu satuan waktu, CPU menjalankan **satu** tugas, atau menganggur kalau tidak ada tugas
yang boleh dijalankan. Ada satu aturan tambahan:

> Dua tugas dengan **nama yang sama** harus dipisahkan oleh minimal \`n\` satuan waktu.

Satuan waktu di antara keduanya boleh dipakai tugas lain atau dibiarkan menganggur. Tugas
dengan nama berbeda bebas dijalankan berurutan tanpa jeda.

Kembalikan **jumlah minimum satuan waktu** yang dibutuhkan untuk menyelesaikan seluruh tugas
(termasuk satuan waktu yang terpaksa menganggur).

Contoh: \`tasks = ["A","A","A","B","B","B"]\` dengan \`n = 2\` bisa dijalankan sebagai
\`A B _ A B _ A B\`, sehingga butuh 8 satuan waktu. Tanda \`_\` berarti CPU menganggur.`,
    en: `You are given a list of tasks \`tasks\`, where each task is a single uppercase letter from
\`'A'\` to \`'Z'\`, and an integer \`n\`.

In one unit of time the CPU runs **one** task, or idles when no task is allowed to run. There
is one extra rule:

> Two tasks with the **same name** must be separated by at least \`n\` units of time.

The units in between may run other tasks or be left idle. Tasks with different names can run
back to back with no gap.

Return the **minimum number of time units** needed to finish every task (including the units
where the CPU is forced to idle).

Example: \`tasks = ["A","A","A","B","B","B"]\` with \`n = 2\` can run as
\`A B _ A B _ A B\`, so it takes 8 units. The \`_\` marks an idle unit.`,
  },
  examples: [
    {
      input: 'tasks = ["A", "A", "A", "B", "B", "B"], n = 2',
      output: '8',
      explanation: {
        id: 'Jadwal A B _ A B _ A B memenuhi jeda dua satuan untuk A maupun B, dengan dua satuan menganggur. Totalnya 8 satuan.',
        en: 'The schedule A B _ A B _ A B satisfies the two-unit gap for both A and B, with two idle units. That makes 8 units in total.',
      },
    },
    {
      input: 'tasks = ["A", "C", "A", "B", "D", "B"], n = 1',
      output: '6',
      explanation: {
        id: 'A C A B D B sudah memenuhi jeda satu satuan untuk setiap tugas yang berulang, jadi seluruh enam tugas bisa dijalankan tanpa menganggur.',
        en: 'A C A B D B already respects the one-unit gap for every repeated task, so all six tasks run with no idle time at all.',
      },
    },
    {
      input: 'tasks = ["A", "A", "A", "B", "B", "B"], n = 0',
      output: '6',
      explanation: {
        id: 'Dengan jeda nol, tugas yang sama boleh langsung berurutan, sehingga seluruh tugas selesai tanpa waktu menganggur.',
        en: 'With a zero gap, identical tasks may run back to back, so everything finishes with no idle time.',
      },
    },
  ],
  hints: {
    id: [
      'Tugas yang paling sering muncul adalah yang paling menentukan: dialah yang memaksa adanya celah.',
      'Pikirkan blok berukuran n + 1 satuan. Setelah menjalankan sebuah tugas, n satuan berikutnya tidak boleh memakai tugas yang sama, jadi satu tugas menutup satu blok.',
      'Di dalam setiap blok, jalankan dulu tugas dengan sisa jumlah terbanyak. Max-heap berisi sisa jumlah setiap jenis tugas membuat pilihan itu selalu tersedia dalam O(log d).',
    ],
    en: [
      'The most frequent task is the one that decides everything: it is what forces gaps into the schedule.',
      'Think in blocks of n + 1 time units. After running a task, the next n units cannot use that same task, so one task closes off one block.',
      'Inside each block, run the task with the most remaining copies first. A max-heap of the remaining counts per task type keeps that choice available in O(log d).',
    ],
  },
  explanation: {
    id: `## Pendekatan

Pembatasnya hanya satu tugas: **tugas yang paling sering muncul**. Kalau sebuah tugas harus
dijalankan \`c\` kali dengan jeda \`n\`, ia memaksa \`c - 1\` jeda di antaranya. Tugas lain yang
jumlahnya lebih sedikit bisa "menumpang" di jeda itu.

Cara membaca soalnya sebagai blok: setelah satu tugas dijalankan, \`n\` satuan berikutnya tidak
boleh memakai tugas yang sama. Jadi setiap tugas membuka satu **jendela** \`n + 1\` satuan
(termasuk satuan tempat ia berjalan). Dari sini muncul strategi greedy: di dalam setiap jendela,
kerjakan tugas dengan **sisa jumlah terbanyak**.

**Solusi referensi: greedy + max-heap.**

1. Hitung sisa jumlah setiap jenis tugas dengan hash map, lalu masukkan semua sisa itu ke
   **max-heap** (di Python dengan \`heapq\` berisi nilai negatif; di JavaScript dengan heap
   kecil yang juga dibangun dari nilai negatif, seperti pada solusi di bawah).
2. Selama heap tidak kosong, lakukan satu putaran: ambil sampai \`n + 1\` tugas dari puncak heap
   (paling banyak dulu), kurangi jumlahnya satu, dan masukkan kembali yang sisanya masih ada.
3. Tambahkan waktu. Kalau setelah putaran itu heap masih berisi tugas, putaran tersebut terpakai
   penuh \`n + 1\` satuan — sisanya menganggur. Kalau heap sudah kosong, putaran terakhir hanya
   butuh sepanjang jumlah tugas yang benar-benar dijalankan; tidak ada gunanya membayar waktu
   menganggur di akhir.

Langkah 3 adalah bagian paling mudah salah: **putaran terakhir tidak selalu penuh \`n + 1\`**.

**Alternatif O(T): rumus langsung.** Karena hanya tugas tersering yang menentukan, jawabannya
sama dengan:

\`\`\`
max(jumlah_tugas, (maxCount - 1) * (n + 1) + banyak_jenis_dengan_jumlah_maxCount)
\`\`\`

Rumus ini sangat cepat dan sering dipakai di pembahasan, tetapi ia hanya berlaku untuk aturan
"jeda berlaku bagi nama yang sama". Versi simulasi lebih umum: kalau aturannya berubah (misalnya
setiap jenis tugas punya jeda berbeda), simulasi greedy masih bekerja sementara rumusnya tidak.

## Kompleksitas

- Simulasi heap: O(T log d) waktu dan O(d) ruang, dengan \`T\` = jumlah seluruh tugas dan \`d\` =
  banyaknya jenis tugas (paling banyak 26). Setiap tugas keluar-masuk heap paling banyak satu kali,
  dan banyaknya putaran dibatasi oleh jumlah tugas terbanyak.
- Rumus: O(T) waktu untuk menghitung frekuensi, O(d) ruang.

## Kesalahan yang sering terjadi

- Menganggap jawabannya selalu \`tasks.length\`. Jeda sering memaksa adanya waktu menganggur.
- Menjumlahkan waktu menganggur pada putaran terakhir, sehingga hasilnya kelebihan sampai
  \`n\` satuan.
- Menganggap aturan jeda berlaku antar semua tugas. Yang dibatasi hanya dua tugas dengan nama
  **sama**; tugas berbeda boleh berurutan rapat.
- Memakai **min-heap** sehingga yang dijalankan lebih dulu justru tugas yang tersisa paling
  sedikit, dan tugas tersering menumpuk di akhir.
- Lupa menangani \`n = 0\`: dengan jeda nol, jawabannya tepat \`tasks.length\`.
- Menyimpan sisa jumlah di heap tapi mengurangi nilainya tanpa mengeluarkannya lebih dulu —
  sifat heap jadi rusak. Aturannya selalu \`pop\`, ubah, lalu \`push\` kembali.`,
    en: `## Approach

A single task decides the whole schedule: **the most frequent one**. If a task must run \`c\`
times with a gap of \`n\`, it forces \`c - 1\` gaps between its runs. Less frequent tasks can ride
along inside those gaps.

Reading the problem in blocks: after a task runs, the next \`n\` units cannot use that same
task. So each run opens a **window** of \`n + 1\` units (including the unit it runs in). That
leads straight to the greedy strategy: inside every window, run the task with the **most
remaining copies**.

**Reference solution: greedy + max-heap.**

1. Count the remaining copies per task type with a hash map, then push all those counts into a
   **max-heap** (in Python through negative values with \`heapq\`; in JavaScript through a small
   heap built on negative values as well, as in the solution below).
2. While the heap is not empty, do one round: pop up to \`n + 1\` tasks from the heap (largest
   counts first), decrement each count, and push back the ones that still have copies left.
3. Add the time. If the heap still holds tasks after that round, the round consumed a full
   \`n + 1\` units — the remainder idles. If the heap is empty, the final round only needs as
   many units as tasks actually ran; paying for idle time at the very end is pointless.

Step 3 is where bugs live: **the last round is not always \`n + 1\` units long**.

**O(T) alternative: a closed-form formula.** Because only the most frequent task matters, the
answer equals:

\`\`\`
max(total_tasks, (maxCount - 1) * (n + 1) + number_of_types_with_maxCount)
\`\`\`

That is very fast and popular in editorial write-ups, but it only holds for the rule "the gap
applies to identical names". The simulation is more general: change the rule (say each task type
gets its own gap) and the greedy simulation still works while the formula no longer does.

## Complexity

- Heap simulation: O(T log d) time and O(d) space, where \`T\` is the total number of tasks and
  \`d\` the number of distinct types (at most 26). Each task enters and leaves the heap at most
  once, and the number of rounds is bounded by the largest count.
- Formula: O(T) time to count frequencies, O(d) space.

## Common mistakes

- Assuming the answer is always \`tasks.length\`. Gaps frequently force idle time.
- Charging idle units to the last round, overshooting by up to \`n\` units.
- Believing the gap applies between any two tasks. Only two tasks with the **same** name are
  restricted; different tasks may run back to back.
- Using a **min-heap**, so the task with the fewest copies left runs first and the frequent task
  piles up at the end.
- Forgetting \`n = 0\`: with a zero gap the answer is exactly \`tasks.length\`.
- Decrementing a count while it is still inside the heap — that silently breaks the heap
  property. The rule is always \`pop\`, change, then \`push\` back.`,
  },
  templates: [
    {
      language: 'javascript',
      template: `function leastInterval(tasks, n) {
  // write your solution here
}
`,
      solution: `function leastInterval(tasks, n) {
  const counts = new Map();

  for (const task of tasks) {
    counts.set(task, (counts.get(task) ?? 0) + 1);
  }

  // Max-heap of the remaining counts, built by negating the values.
  const heap = [...counts.values()].map(count => -count);

  const siftDown = (start, size) => {
    let parent = start;

    for (;;) {
      const left = 2 * parent + 1;
      const right = left + 1;
      let smallest = parent;

      if (left < size && heap[left] < heap[smallest]) {
        smallest = left;
      }
      if (right < size && heap[right] < heap[smallest]) {
        smallest = right;
      }
      if (smallest === parent) {
        return;
      }

      [heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
      parent = smallest;
    }
  };

  const push = (value) => {
    heap.push(value);
    let child = heap.length - 1;

    while (child > 0) {
      const parent = (child - 1) >> 1;
      if (heap[parent] <= heap[child]) {
        return;
      }
      [heap[parent], heap[child]] = [heap[child], heap[parent]];
      child = parent;
    }
  };

  const pop = () => {
    const top = heap[0];
    const last = heap.pop();

    if (heap.length === 0) {
      return top;
    }

    heap[0] = last;
    siftDown(0, heap.length);
    return top;
  };

  // Floyd's build-heap: O(d) instead of d separate O(log d) pushes.
  for (let i = (heap.length >> 1) - 1; i >= 0; i--) {
    siftDown(i, heap.length);
  }

  let time = 0;

  while (heap.length > 0) {
    const round = [];

    // One round is a window of n + 1 units: the same task cannot appear twice.
    for (let slot = 0; slot < n + 1 && heap.length > 0; slot++) {
      round.push(pop());
    }

    for (const count of round) {
      // A count of -1 means the last copy was just scheduled.
      if (count + 1 < 0) {
        push(count + 1);
      }
    }

    // The final round is shorter than n + 1 when no work is left over.
    time += heap.length > 0 ? n + 1 : round.length;
  }

  return time;
}
`,
    },
    {
      language: 'python',
      template: `def leastInterval(tasks, n):
    # write your solution here
    pass
`,
      solution: `from collections import Counter
import heapq


def leastInterval(tasks, n):
    # heapq is a min-heap, so negate the counts to get a max-heap of remaining work.
    heap = [-count for count in Counter(tasks).values()]
    heapq.heapify(heap)

    time = 0

    while heap:
        # One round is a window of n + 1 units: the same task cannot appear twice.
        round_tasks = []

        for _ in range(n + 1):
            if not heap:
                break
            round_tasks.append(-heapq.heappop(heap))

        for count in round_tasks:
            if count > 1:
                heapq.heappush(heap, -(count - 1))

        # The final round is shorter than n + 1 when no work is left over.
        time += n + 1 if heap else len(round_tasks)

    return time
`,
    },
  ],
  testCases: [
    { id: 'c1', input: [['A', 'A', 'A', 'B', 'B', 'B'], 2], expected: 8 },
    { id: 'c2', input: [['A', 'C', 'A', 'B', 'D', 'B'], 1], expected: 6 },
    { id: 'c3', input: [['A', 'A', 'A', 'B', 'B', 'B'], 0], expected: 6, hidden: true },
    { id: 'c4', input: [['A'], 2], expected: 1, hidden: true },
    {
      id: 'c5',
      input: [['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2],
      expected: 16,
      hidden: true,
    },
    { id: 'c6', input: [['A', 'A', 'B', 'B'], 2], expected: 5, hidden: true },
    { id: 'c7', input: [['A', 'B', 'C', 'D'], 3], expected: 4, hidden: true },
    { id: 'c8', input: [['A', 'A', 'A', 'A'], 3], expected: 13, hidden: true },
    {
      id: 'c9',
      input: [['A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'], 3],
      expected: 9,
      hidden: true,
    },
    {
      id: 'c10',
      input: [
        [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
        ],
        1,
      ],
      expected: 26,
      hidden: true,
    },
  ],
};
