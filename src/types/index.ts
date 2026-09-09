export type ProjectVisualTheme =
  | 'default'
  | 'chess'
  | 'assembly'
  | 'animal-game'
  | 'hash-map';

export interface Project {
  id: string;
  title: string;
  projectType?: string;
  visualTheme?: ProjectVisualTheme;
  description: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  demoLabel?: string;
  image?: string;
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
