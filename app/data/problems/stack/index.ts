import type { Problem } from '~/types/content';
import { dailyTemperatures } from './daily-temperatures';
import { evaluateReversePolishNotation } from './evaluate-reverse-polish-notation';
import { largestRectangleInHistogram } from './largest-rectangle-in-histogram';
import { minStackOps } from './min-stack-ops';
import { validParentheses } from './valid-parentheses';

export const stackProblems: Array<Problem> = [
  validParentheses,
  minStackOps,
  evaluateReversePolishNotation,
  dailyTemperatures,
  largestRectangleInHistogram,
];
