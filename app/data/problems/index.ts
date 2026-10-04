import type { Problem } from '~/types/content';
import { arraysHashingProblems } from './arrays-hashing';
import { backtrackingProblems } from './backtracking';
import { binarySearchProblems } from './binary-search';
import { dynamicProgrammingProblems } from './dynamic-programming';
import { graphsProblems } from './graphs';
import { heapProblems } from './heap';
import { linkedListProblems } from './linked-list';
import { slidingWindowProblems } from './sliding-window';
import { stackProblems } from './stack';
import { treesProblems } from './trees';
import { twoPointersProblems } from './two-pointers';

/**
 * Agregasi seluruh soal dari semua track.
 * Saat menambah track baru, buat folder `app/data/problems/<track-id>/`
 * lalu daftarkan ekspornya di sini.
 */
export const problems: Array<Problem> = [
  ...arraysHashingProblems,
  ...twoPointersProblems,
  ...slidingWindowProblems,
  ...stackProblems,
  ...binarySearchProblems,
  ...linkedListProblems,
  ...treesProblems,
  ...heapProblems,
  ...graphsProblems,
  ...dynamicProgrammingProblems,
  ...backtrackingProblems,
];
