import type { Problem } from '~/types/content';
import { containsDuplicate } from './contains-duplicate';
import { groupAnagrams } from './group-anagrams';
import { productExceptSelf } from './product-except-self';
import { twoSum } from './two-sum';
import { validAnagram } from './valid-anagram';

export const problems: Array<Problem> = [
  twoSum,
  containsDuplicate,
  validAnagram,
  productExceptSelf,
  groupAnagrams,
];
