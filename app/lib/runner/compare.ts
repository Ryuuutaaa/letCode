import type { ComparatorId } from '~/types/content';
import { isDeepEqual } from '@vinicunca/perkakas';

const DEFAULT_TOLERANCE = 1e-6;

function stableKey(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/**
 * Mengurutkan array pada satu tingkat saja, sehingga isi setiap elemen tetap utuh.
 * Ini yang membuat `[1, 2]` dan `[2, 1]` tetap dianggap berbeda.
 */
function sortTopLevel(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return [...value].sort((a, b) => {
    const left = stableKey(a);
    const right = stableKey(b);

    if (left === right) {
      return 0;
    }

    return left < right ? -1 : 1;
  });
}

/** Mengurutkan array pada semua tingkat, untuk hasil yang benar-benar himpunan. */
function sortAllLevels(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value
    .map((item) => sortAllLevels(item))
    .sort((a, b) => {
      const left = stableKey(a);
      const right = stableKey(b);

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
      return isDeepEqual(sortTopLevel(actual), sortTopLevel(expected));
    case 'unorderedAllLevels':
      return isDeepEqual(sortAllLevels(actual), sortAllLevels(expected));
    case 'floatApprox':
      return compareFloat(actual, expected, tolerance);
    default:
      return isDeepEqual(actual, expected);
  }
}
