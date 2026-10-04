import type { Problem } from '~/types/content';
import { climbingStairs } from './climbing-stairs';
import { coinChange } from './coin-change';
import { houseRobber } from './house-robber';
import { longestIncreasingSubsequence } from './longest-increasing-subsequence';
import { uniquePaths } from './unique-paths';

export const dynamicProgrammingProblems: Array<Problem> = [
  climbingStairs,
  uniquePaths,
  houseRobber,
  coinChange,
  longestIncreasingSubsequence,
];
