export type Project =
  | {
      n: number;
      name: string;
      year: string;
      tagline?: string;
      media: { type: 'youtube'; id: string };
    }
  | {
      n: number;
      name: string;
      year: string;
      tagline?: string;
      media: { type: 'link'; src: string; href: string };
    };

// TODO: replace __TO_FILL__ with the real YouTube video id for Basalt.
// TODO: confirm external URLs for Arcads / RainPath / MVP Boom.
export const PROJECTS: Project[] = [
  {
    n: 1,
    name: 'Basalt',
    year: '2024—',
    tagline: 'applied LLM infrastructure',
    media: { type: 'youtube', id: '__TO_FILL__' },
  },
  {
    n: 2,
    name: 'Arcads',
    year: '2023',
    media: {
      type: 'link',
      src: '/projects/arcads.svg',
      href: 'https://arcads.ai',
    },
  },
  {
    n: 3,
    name: 'RainPath AI',
    year: '2023',
    media: {
      type: 'link',
      src: '/projects/rainpath.svg',
      href: 'https://rainpath.ai',
    },
  },
  {
    n: 4,
    name: 'MVP Boom',
    year: '2022',
    media: {
      type: 'link',
      src: '/projects/mvpboom.svg',
      href: 'https://mvpboom.com',
    },
  },
];
