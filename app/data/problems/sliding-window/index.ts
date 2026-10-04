import type { Problem } from '~/types/content';
import { bestTimeToBuySellStock } from './best-time-to-buy-sell-stock';
import { longestRepeatingCharacterReplacement } from './longest-repeating-character-replacement';
import { longestSubstringWithoutRepeatingCharacters } from './longest-substring-without-repeating-characters';
import { maxSumSubarraySizeK } from './max-sum-subarray-size-k';
import { minimumWindowSubstring } from './minimum-window-substring';

export const slidingWindowProblems: Array<Problem> = [
  bestTimeToBuySellStock,
  maxSumSubarraySizeK,
  longestSubstringWithoutRepeatingCharacters,
  longestRepeatingCharacterReplacement,
  minimumWindowSubstring,
];
