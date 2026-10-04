import type { Track } from '~/types/content';
import { arraysHashing } from './arrays-hashing';
import { backtracking } from './backtracking';
import { binarySearch } from './binary-search';
import { dynamicProgramming } from './dynamic-programming';
import { graphs } from './graphs';
import { heap } from './heap';
import { linkedList } from './linked-list';
import { slidingWindow } from './sliding-window';
import { stack } from './stack';
import { trees } from './trees';
import { twoPointers } from './two-pointers';

export const tracks: Array<Track> = [
  arraysHashing,
  twoPointers,
  slidingWindow,
  stack,
  binarySearch,
  linkedList,
  trees,
  heap,
  graphs,
  dynamicProgramming,
  backtracking,
];
