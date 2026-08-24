import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'drop-in-chess',
    title: 'Drop In Chess',
    projectType: 'CHESS GAME PLATFORM',
    visualTheme: 'chess',
    description:
      'Jump into curated chess positions and play them out, backed by server-side move validation and game state management.',
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'REST APIs'],
    githubLink: 'https://github.com/Tsoris/drop-in-chess/blob/main/README.md',
  },
  {
    id: 'devfolio',
    title: "Tim's Devfolio",
    projectType: 'Full-Stack Developer Portfolio',
    description:
      'A responsive full-stack portfolio featuring animated interfaces, persistent theming, and a validated contact workflow backed by PostgreSQL and transactional email.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Resend',
      'Framer Motion',
    ],
    githubLink: 'https://github.com/Tsoris/My-Portfolio/blob/main/README.md',
    demoLink: 'https://tims-devfolio.vercel.app/',
  },
];
