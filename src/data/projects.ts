export type Project =
  | {
      n: number;
      name: string;
      year: string;
      tagline?: string;
      media: { type: 'youtube'; id: string; orientation?: 'landscape' | 'portrait' };
    }
  | {
      n: number;
      name: string;
      year: string;
      tagline?: string;
      media: { type: 'link'; src: string; href: string };
    }
  | {
      n: number;
      name: string;
      year: string;
      tagline?: string;
      media: {
        type: 'video';
        sources: { src: string; type: string }[];
        poster: string;
        href?: string;
      };
    };

// TODO: confirm external URLs for Arcads / RainPath / MVP Boom.
export const PROJECTS: Project[] = [
  {
    n: 1,
    name: 'Arcads',
    year: '2023',
    tagline: 'video asset pipeline — upload, transcode, stream',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/arcads.webm', type: 'video/webm' },
        { src: '/projects/arcads.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/arcads-poster.jpg',
      href: 'https://arcads.ai',
    },
  },
  {
    n: 2,
    name: 'RainPath AI',
    year: '2023',
    tagline: 'AI-powered digital pathology platform',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/rainpath.webm', type: 'video/webm' },
        { src: '/projects/rainpath.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/rainpath-poster.jpg',
      href: 'https://rainpath.ai',
    },
  },
  {
    n: 3,
    name: 'MVP Boom',
    year: '2022',
    media: {
      type: 'link',
      src: '/projects/mvpboom.svg',
      href: 'https://mvpboom.com',
    },
  },
  {
    n: 4,
    name: 'Basalt',
    year: '2024—',
    tagline: 'applied LLM infrastructure',
    media: { type: 'youtube', id: '842DZgwHHx8', orientation: 'portrait' },
  },
];
