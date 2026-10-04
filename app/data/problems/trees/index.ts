import type { Problem } from '~/types/content';
import { binaryTreeLevelOrderTraversal } from './binary-tree-level-order-traversal';
import { invertBinaryTree } from './invert-binary-tree';
import { maximumDepthOfBinaryTree } from './maximum-depth-of-binary-tree';
import { sameTree } from './same-tree';
import { validateBinarySearchTree } from './validate-binary-search-tree';

export const treesProblems: Array<Problem> = [
  maximumDepthOfBinaryTree,
  invertBinaryTree,
  sameTree,
  binaryTreeLevelOrderTraversal,
  validateBinarySearchTree,
];
