type ProjectBase = {
  n: number;
  name: string;
  year: string;
  tagline?: string;
  description?: string;
};

export type Project = ProjectBase &
  (
    | { media: { type: 'link'; src: string; href: string } }
    | {
        media: {
          type: 'video';
          sources: { src: string; type: string }[];
          poster: string;
          href?: string;
          orientation?: 'landscape' | 'portrait';
          frame?: 'iphone' | 'browser';
          hoverToPlay?: boolean;
        };
      }
  );

export const PROJECTS: Project[] = [
  {
    n: 1,
    name: 'RainPath AI',
    year: '2026',
    tagline: 'AI-powered digital pathology platform',
    description:
      'AI assistant for pathologists analyzing whole-slide images. Built the technical module from scratch. Stack: React / NestJS / AWS.',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/rainpath.webm', type: 'video/webm' },
        { src: '/projects/rainpath.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/rainpath-poster.jpg',
      href: 'https://rainpath.ai',
      frame: 'browser',
      hoverToPlay: true,
    },
  },
  {
    n: 2,
    name: 'Arcads',
    year: 'March 2026',
    tagline: 'video asset pipeline — upload, transcode, stream',
    description:
      'End-to-end video pipeline I built solo: upload anything, auto-transcode for the web (GPU-accelerated when available), stream it back with adaptive quality. Stack: NestJS / Postgres / Redis / MinIO.',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/arcads.webm', type: 'video/webm' },
        { src: '/projects/arcads.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/arcads-poster.jpg',
      href: 'https://arcads.ai',
      frame: 'browser',
      hoverToPlay: true,
    },
  },
  {
    n: 3,
    name: 'aimux',
    year: '2026',
    tagline: 'terminal multiplexer for AI CLIs',
    description:
      'A multiplexer for AI coding agents. Run Claude, Codex, and OpenCode side-by-side in one terminal, switch with vim-style keys. Co-built — Bun + TypeScript.',
    media: {
      type: 'video',
      sources: [
        { src: '/projects/aimux.webm', type: 'video/webm' },
        { src: '/projects/aimux.mp4', type: 'video/mp4' },
      ],
      poster: '/projects/aimux-poster.jpg',
      href: 'https://aimux.sh',
      frame: 'browser',
      hoverToPlay: true,
    },
  },
  {
    n: 4,
    name: 'MVP Boom',
    year: 'Feb 2026',
    tagline: 'real-time live-typing iOS messaging',
    description:
      'iOS messaging reinvented: every keystroke streams live to the recipient. Plus heart rate (HealthKit) and live location. Co-built — React Native / Expo / Fastify / WebSockets.',
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
];
