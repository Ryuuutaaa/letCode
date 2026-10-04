import type { Problem } from '~/types/content';
import { kClosestPointsToOrigin } from './k-closest-points-to-origin';
import { kthLargestElementInAnArray } from './kth-largest-element-in-an-array';
import { lastStoneWeight } from './last-stone-weight';
import { taskScheduler } from './task-scheduler';
import { topKFrequentElements } from './top-k-frequent-elements';

export const heapProblems: Array<Problem> = [
  lastStoneWeight,
  topKFrequentElements,
  kthLargestElementInAnArray,
  kClosestPointsToOrigin,
  taskScheduler,
];
