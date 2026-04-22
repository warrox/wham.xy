import type { PostItColor } from '../components/PostIt';

export type PostItEntry = {
  text: string;
  color: PostItColor;
};

export const POSTIT_POOL: PostItEntry[] = [
  { text: 'READY!\n🍒', color: 'yellow' },
  { text: 'new\nhigh\nscore', color: 'cyan' },
  { text: '1UP ★', color: 'pink' },
  { text: 'be\nright\nback ☺', color: 'yellow' },
  { text: 'pac\nmania ✺', color: 'cyan' },
  { text: 'GAME\nON', color: 'pink' },
  { text: 'coin\ninserted', color: 'yellow' },
  { text: 'level\nup!', color: 'cyan' },
  { text: 'press\nstart', color: 'pink' },
  { text: 'hi\nscore\n049850', color: 'yellow' },
];
