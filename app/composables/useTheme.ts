import type { ThemeMode } from '~/types/state';
import { readText, writeText } from '~/utils/storage';

const THEME_KEY = 'letcode:theme:v1';
const TRANSITION_MS = 200;

function readStored(): ThemeMode | null {
  const raw = readText(THEME_KEY);
  return raw === 'light' || raw === 'dark' ? raw : null;
}

function systemMode(): ThemeMode {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const mode = ref<ThemeMode>(readStored() ?? systemMode());

function applyTheme(next: ThemeMode, animate: boolean): void {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const shouldAnimate = animate && !prefersReducedMotion();

  if (shouldAnimate) {
    root.classList.add('theme-transition');
  }

  root.classList.toggle('dark', next === 'dark');
  root.style.colorScheme = next;

  if (shouldAnimate) {
    window.setTimeout(() => root.classList.remove('theme-transition'), TRANSITION_MS);
  }
}

export function useTheme() {
  function setMode(next: ThemeMode, animate = true): void {
    mode.value = next;
    writeText(THEME_KEY, next);
    applyTheme(next, animate);
  }

  function toggle(): void {
    setMode(mode.value === 'dark' ? 'light' : 'dark');
  }

  function init(): void {
    applyTheme(mode.value, false);

    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (readStored() !== null) {
        return;
      }

      mode.value = event.matches ? 'dark' : 'light';
      applyTheme(mode.value, true);
    });
  }

  return { init, mode, setMode, toggle };
}
