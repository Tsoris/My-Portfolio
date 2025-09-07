import { string } from 'zod';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface Timeline {
  title: string;
  org: string;
  href?: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  icon?: React.ReactNode;
}
