import type { Problem } from '~/types/content';
import { containerWithMostWater } from './container-with-most-water';
import { moveZeroes } from './move-zeroes';
import { threeSum } from './three-sum';
import { twoSumSorted } from './two-sum-sorted';
import { validPalindrome } from './valid-palindrome';

export const twoPointersProblems: Array<Problem> = [
  validPalindrome,
  moveZeroes,
  twoSumSorted,
  containerWithMostWater,
  threeSum,
];
