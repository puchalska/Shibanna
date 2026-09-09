// GitHub Pages serves this project from /<repo>/, so every /public asset URL
// needs the base path prepended. next.config.ts exposes it here.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
