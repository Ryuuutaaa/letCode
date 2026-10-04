import type { ComparatorId } from '~/types/content';
import { isDeepEqual } from '@vinicunca/perkakas';

const DEFAULT_TOLERANCE = 1e-6;

function canonicalize(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value
    .map((item) => canonicalize(item))
    .sort((a, b) => {
      const left = JSON.stringify(a) ?? '';
      const right = JSON.stringify(b) ?? '';
      if (left === right) {
        return 0;
      }
      return left < right ? -1 : 1;
    });
}

function compareFloat(actual: unknown, expected: unknown, tolerance: number): boolean {
  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) <= tolerance;
  }

  if (Array.isArray(actual) && Array.isArray(expected)) {
    return (
      actual.length === expected.length
      && actual.every((item, index) => compareFloat(item, expected[index], tolerance))
    );
  }

  return isDeepEqual(actual, expected);
}

export function compare(
  actual: unknown,
  expected: unknown,
  comparator: ComparatorId = 'deepEqual',
  tolerance: number = DEFAULT_TOLERANCE,
): boolean {
  switch (comparator) {
    case 'unorderedDeepEqual':
      return isDeepEqual(canonicalize(actual), canonicalize(expected));
    case 'floatApprox':
      return compareFloat(actual, expected, tolerance);
    default:
      return isDeepEqual(actual, expected);
  }
}
