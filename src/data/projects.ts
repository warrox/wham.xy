export type Project =
  | {
      n: number;
      name: string;
      year: string;
      tagline?: string;
      media: {
        type: 'youtube';
        id: string;
        orientation?: 'landscape' | 'portrait';
        frame?: 'iphone';
      };
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
        orientation?: 'landscape' | 'portrait';
        frame?: 'iphone';
        hoverToPlay?: boolean;
      };
    };

// TODO: confirm external URLs for Arcads / RainPath / MVP Boom.
export const PROJECTS: Project[] = [
  {
    n: 1,
    name: 'Arcads',
    year: 'March 2026',
    tagline: 'video asset pipeline — upload, transcode, stream',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/arcads.webm', type: 'video/webm' },
        { src: '/projects/arcads.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/arcads-poster.jpg',
      href: 'https://arcads.ai',
      hoverToPlay: true,
    },
  },
  {
    n: 2,
    name: 'RainPath AI',
    year: '2026',
    tagline: 'AI-powered digital pathology platform',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/rainpath.webm', type: 'video/webm' },
        { src: '/projects/rainpath.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/rainpath-poster.jpg',
      href: 'https://rainpath.ai',
      hoverToPlay: true,
    },
  },
  {
    n: 3,
    name: 'MVP Boom',
    year: 'Feb 2026',
    tagline: 'real-time live-typing iOS messaging',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/mvpboom.webm', type: 'video/webm' },
        { src: '/projects/mvpboom.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/mvpboom-poster.jpg',
      href: 'https://mvpboom.com',
      orientation: 'portrait',
      frame: 'iphone',
    },
  },
  {
    n: 4,
    name: 'Basalt',
    year: '2022',
    tagline: 'applied LLM infrastructure',
    media: {
      type: 'youtube',
      id: '842DZgwHHx8',
      orientation: 'portrait',
      frame: 'iphone',
    },
  },
];
