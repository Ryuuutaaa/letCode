import type { Locale } from '~/types/i18n';

const id = {
  'action.reset': 'Reset',
  'action.run': 'Run',
  'action.submit': 'Submit',

  'console.title': 'Konsol',

  'dashboard.overall': 'Progres keseluruhan',
  'dashboard.subtitle':
    'Kerjakan soal langsung di browser tanpa perlu setup. Progres dan kode tersimpan otomatis di perangkat ini.',
  'dashboard.title': 'Latihan interview',
  'dashboard.tracks': 'Track',

  'difficulty.empty.description': 'Belum ada soal yang cocok dengan filter ini.',
  'difficulty.empty.title': 'Tidak ada soal',

  'editor.loading': 'Menyiapkan editor…',

  'error.home': 'Kembali ke dashboard',
  'error.notFound': 'Halaman tidak ditemukan.',

  'filter.all': 'Semua',
  'filter.solved': 'Selesai',
  'filter.unsolved': 'Belum',

  'header.problems': 'Soal',
  'header.tracks': 'Track',

  'hint.reveal': 'Buka hint',
  'hint.revealNext': 'Buka hint berikutnya',

  'problem.example': 'Contoh {number}',
  'problem.notFound.description': 'Periksa kembali tautannya.',
  'problem.notFound.title': 'Soal tidak ditemukan',
  'problem.solution': 'Pembahasan',
  'problem.solved': 'Selesai',

  'problems.subtitle': 'Semua soal dari seluruh track, dari easy sampai expert.',
  'problems.title': 'Semua soal',

  'result.expected': 'Diharapkan',
  'result.hiddenCase': 'Test case tersembunyi.',
  'result.input': 'Input',
  'result.latest': 'Hasil',
  'result.output': 'Hasil',
  'result.passedCount': '{passed}/{total} lulus',
  'result.running': 'Menjalankan…',
  'result.empty.description':
    'Klik Run untuk menguji contoh, atau Submit untuk menilai seluruh test case.',
  'result.empty.title': 'Belum ada hasil',
  'result.caseNumber': 'Kasus {number}',

  'status.attempted': 'Pernah dicoba',
  'status.error': 'Error',
  'status.failed': 'Gagal',
  'status.passed': 'Lulus',
  'status.timeout': 'Waktu habis',

  'theme.toDark': 'Ganti ke tema gelap',
  'theme.toLight': 'Ganti ke tema terang',

  'track.back': '← Semua track',
  'track.notFound.description': 'Periksa kembali tautannya.',
  'track.notFound.title': 'Track tidak ditemukan',
  'track.problems': 'Soal',
  'tracks.subtitle': 'Urutan topik yang disarankan, dari fondasi sampai lanjutan.',
  'tracks.title': 'Roadmap',
} as const;

export type MessageKey = keyof typeof id;

const en: Record<MessageKey, string> = {
  'action.reset': 'Reset',
  'action.run': 'Run',
  'action.submit': 'Submit',

  'console.title': 'Console',

  'dashboard.overall': 'Overall progress',
  'dashboard.subtitle':
    'Solve problems right in the browser with no setup. Your progress and code are saved on this device.',
  'dashboard.title': 'Interview practice',
  'dashboard.tracks': 'Tracks',

  'difficulty.empty.description': 'No problems match this filter yet.',
  'difficulty.empty.title': 'No problems',

  'editor.loading': 'Preparing editor…',

  'error.home': 'Back to dashboard',
  'error.notFound': 'Page not found.',

  'filter.all': 'All',
  'filter.solved': 'Solved',
  'filter.unsolved': 'Unsolved',

  'header.problems': 'Problems',
  'header.tracks': 'Tracks',

  'hint.reveal': 'Show hint',
  'hint.revealNext': 'Show next hint',

  'problem.example': 'Example {number}',
  'problem.notFound.description': 'Check the link again.',
  'problem.notFound.title': 'Problem not found',
  'problem.solution': 'Solution',
  'problem.solved': 'Solved',

  'problems.subtitle': 'Every problem across all tracks, from easy to expert.',
  'problems.title': 'All problems',

  'result.expected': 'Expected',
  'result.hiddenCase': 'Hidden test case.',
  'result.input': 'Input',
  'result.latest': 'Result',
  'result.output': 'Output',
  'result.passedCount': '{passed}/{total} passed',
  'result.running': 'Running…',
  'result.empty.description':
    'Press Run to test the examples, or Submit to judge every test case.',
  'result.empty.title': 'No result yet',
  'result.caseNumber': 'Case {number}',

  'status.attempted': 'Attempted',
  'status.error': 'Error',
  'status.failed': 'Failed',
  'status.passed': 'Passed',
  'status.timeout': 'Timed out',

  'theme.toDark': 'Switch to dark theme',
  'theme.toLight': 'Switch to light theme',

  'track.back': '← All tracks',
  'track.notFound.description': 'Check the link again.',
  'track.notFound.title': 'Track not found',
  'track.problems': 'Problems',
  'tracks.subtitle': 'Recommended topic order, from foundations to advanced.',
  'tracks.title': 'Roadmap',
};

export const messages: Record<Locale, Record<MessageKey, string>> = { en, id };
