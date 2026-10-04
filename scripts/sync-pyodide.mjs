import { cp, mkdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import process from 'node:process';

const require = createRequire(import.meta.url);

const FILES = [
  'pyodide.mjs',
  'pyodide.asm.mjs',
  'pyodide.asm.wasm',
  'python_stdlib.zip',
  'pyodide-lock.json',
];

const sourceDir = new URL('../node_modules/pyodide/', import.meta.url);
const targetDir = new URL('../public/pyodide/', import.meta.url);

await rm(targetDir, { force: true, recursive: true });
await mkdir(targetDir, { recursive: true });

await Promise.all(
  FILES.map((file) => cp(new URL(file, sourceDir), new URL(file, targetDir))),
);

const version = require('pyodide/package.json').version;

console.log(`Pyodide ${version} disalin ke public/pyodide (${FILES.length} file).`);
process.exitCode = 0;
