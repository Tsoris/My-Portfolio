import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'portfolio_website',
    title: 'Portfolio Website',
    description:
      'Personal portfolio built with modern web technologies, featuring responsive design, animations, and integration with Supabase + Resend for contact form handling.',
    technologies: [
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'SupaBase',
      'Resend',
    ],
    githubLink: 'https://github.com/Tsoris/My-Portfolio',
    demoLink: 'https://demo.com',
    image: '/projects/portfolio-website.png',
  },

  {
    id: 'email_sorter_app',
    title: 'Email Sorter Application',
    description:
      'Flask-based email sorter that integrates with Gmail API to categorize messages into intuitive folders using rule-based filters and NLP techniques.',
    technologies: ['Python', 'Flask', 'REST API design', 'Gmail API'],
    githubLink: 'https://github.com/Tsoris/AI-Email-Sorter',
    demoLink: 'https://demo.com',
    image: '/projects/email-sorter.png',
  },
];
