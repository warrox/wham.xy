export type Photo = { src: string; caption: string };

// Placeholder pool. Replace with real photos in /public/photos/
// and update /public/photos/manifest.json.
export const FALLBACK_POOL: Photo[] = [
  { src: '/photos/placeholder-01.svg', caption: 'Paris · 2024' },
  { src: '/photos/placeholder-02.svg', caption: 'Berlin · 2024' },
  { src: '/photos/placeholder-03.svg', caption: 'Lisbon · 2023' },
  { src: '/photos/placeholder-04.svg', caption: 'SF offsite' },
  { src: '/photos/placeholder-05.svg', caption: 'home studio' },
  { src: '/photos/placeholder-06.svg', caption: 'festival · 2023' },
  { src: '/photos/placeholder-07.svg', caption: 'Tokyo · 2022' },
  { src: '/photos/placeholder-08.svg', caption: 'hello world' },
  { src: '/photos/placeholder-09.svg', caption: 'coffee shop' },
  { src: '/photos/placeholder-10.svg', caption: 'long train ride' },
  { src: '/photos/placeholder-11.svg', caption: 'workshop' },
  { src: '/photos/placeholder-12.svg', caption: 'late night push' },
];

export async function loadPool(): Promise<Photo[]> {
  try {
    const res = await fetch('/photos/manifest.json', { cache: 'no-cache' });
    if (!res.ok) return FALLBACK_POOL;
    const entries = (await res.json()) as { file: string; caption: string }[];
    if (!Array.isArray(entries) || entries.length === 0) return FALLBACK_POOL;
    return entries.map((e) => ({ src: `/photos/${e.file}`, caption: e.caption }));
  } catch {
    return FALLBACK_POOL;
  }
}

export function pickRandom<T>(pool: T[], n: number): T[] {
  const copy = pool.slice();
  // Fisher-Yates
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
