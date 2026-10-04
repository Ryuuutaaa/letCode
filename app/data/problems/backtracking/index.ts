import type { Problem } from '~/types/content';
import { combinationSum } from './combination-sum';
import { letterCombinationsOfAPhoneNumber } from './letter-combinations-of-a-phone-number';
import { permutations } from './permutations';
import { subsets } from './subsets';
import { wordSearch } from './word-search';

export const backtrackingProblems: Array<Problem> = [
  subsets,
  permutations,
  combinationSum,
  letterCombinationsOfAPhoneNumber,
  wordSearch,
];
