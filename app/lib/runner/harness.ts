export function buildJavaScriptHarness(code: string, functionName: string): string {
  return `${code}\n;return typeof ${functionName} === 'function' ? ${functionName} : undefined;`;
}
