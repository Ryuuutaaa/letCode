function hasStorage(): boolean {
  return typeof localStorage !== 'undefined';
}

export function readJson<T>(key: string): T | null {
  if (!hasStorage()) {
    return null;
  }

  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown): void {
  if (!hasStorage()) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Penyimpanan penuh atau diblokir: abaikan, data tetap aman di memori.
  }
}

export function readText(key: string): string | null {
  if (!hasStorage()) {
    return null;
  }

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeText(key: string, value: string): void {
  if (!hasStorage()) {
    return;
  }

  try {
    localStorage.setItem(key, value);
  } catch {
    // Penyimpanan penuh atau diblokir: abaikan.
  }
}

export function removeKey(key: string): void {
  if (!hasStorage()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch {
    // Abaikan.
  }
}
