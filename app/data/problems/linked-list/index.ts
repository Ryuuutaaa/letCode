import type { Problem } from '~/types/content';
import { linkedListCycle } from './linked-list-cycle';
import { mergeTwoSortedLists } from './merge-two-sorted-lists';
import { middleOfLinkedList } from './middle-of-linked-list';
import { removeNthNodeFromEnd } from './remove-nth-node-from-end';
import { reverseLinkedList } from './reverse-linked-list';

export const linkedListProblems: Array<Problem> = [
  reverseLinkedList,
  mergeTwoSortedLists,
  middleOfLinkedList,
  removeNthNodeFromEnd,
  linkedListCycle,
];
