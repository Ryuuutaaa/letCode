import type { Problem } from '~/types/content';
import { binarySearch } from './binary-search';
import { findMinimumInRotatedSortedArray } from './find-minimum-in-rotated-sorted-array';
import { kokoEatingBananas } from './koko-eating-bananas';
import { searchA2dMatrix } from './search-a-2d-matrix';
import { searchInsertPosition } from './search-insert-position';

export const binarySearchProblems: Array<Problem> = [
  binarySearch,
  searchInsertPosition,
  searchA2dMatrix,
  findMinimumInRotatedSortedArray,
  kokoEatingBananas,
];
