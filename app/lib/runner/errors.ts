export type ErrorKind = 'compile' | 'runtime';

export interface NormalizedError {
  kind: ErrorKind;
  message: string;
}

export function normalizeError(error: unknown): NormalizedError {
  if (error instanceof SyntaxError) {
    return { kind: 'compile', message: error.message };
  }

  if (error instanceof Error) {
    return { kind: 'runtime', message: `${error.name}: ${error.message}` };
  }

  return { kind: 'runtime', message: String(error) };
}
