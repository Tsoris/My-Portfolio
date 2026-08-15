import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'devfolio',
    title: "Tim's Devfolio",
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
    githubLink: 'https://github.com/Tsoris/My-Portfolio',
    demoLink: 'https://tims-devfolio.vercel.app',
  },
];
