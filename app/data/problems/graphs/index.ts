import type { Problem } from '~/types/content';
import { courseSchedule } from './course-schedule';
import { floodFill } from './flood-fill';
import { maxAreaOfIsland } from './max-area-of-island';
import { numberIslands } from './number-of-islands';
import { rottingOranges } from './rotting-oranges';

export const graphsProblems: Array<Problem> = [
  floodFill,
  numberIslands,
  maxAreaOfIsland,
  rottingOranges,
  courseSchedule,
];
