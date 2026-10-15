interface BlogTheme {
  card: string;
  seriesBanner: string;
  tag: string;
  titleHover: string;
  action: string;
  headingMarker: string;
  subheading: string;
  link: string;
  blockquote: string;
  codeLabel: string;
}

const defaultTheme: BlogTheme = {
  card: 'border-gray-200 bg-white shadow-gray-950/10 dark:border-gray-700 dark:bg-dark/50',
  seriesBanner: 'border-primary/20 bg-primary/10 text-primary',
  tag: 'bg-primary/10 text-primary',
  titleHover: 'group-hover:text-primary',
  action: 'text-primary',
  headingMarker: 'bg-primary',
  subheading: 'border-primary/25 text-primary dark:border-primary/40',
  link: 'text-primary decoration-primary/40 hover:decoration-primary',
  blockquote: 'border-primary bg-primary/5',
  codeLabel: 'before:text-blue-300',
};

const seriesThemes: Record<string, BlogTheme> = {
  'Analysis of Algorithms': {
    card: 'border-teal-200 bg-gradient-to-br from-white via-white to-teal-50/80 shadow-teal-950/10 dark:border-teal-900/70 dark:from-zinc-900 dark:via-zinc-900 dark:to-teal-950/40',
    seriesBanner:
      'border-teal-600 bg-gradient-to-r from-teal-700 to-cyan-800 text-white dark:border-teal-800 dark:from-teal-950 dark:to-cyan-950 dark:text-teal-200',
    tag: 'bg-teal-100 text-teal-800 dark:bg-teal-400/10 dark:text-teal-200',
    titleHover: 'group-hover:text-teal-700 dark:group-hover:text-teal-300',
    action: 'text-teal-700 dark:text-teal-300',
    headingMarker: 'bg-teal-600 dark:bg-teal-400',
    subheading:
      'border-teal-300 text-teal-800 dark:border-teal-700 dark:text-teal-300',
    link: 'text-teal-700 decoration-teal-500/50 hover:decoration-teal-700 dark:text-teal-300 dark:hover:decoration-teal-300',
    blockquote:
      'border-teal-600 bg-teal-50 dark:border-teal-400 dark:bg-teal-950/30',
    codeLabel: 'before:text-teal-300',
  },
  'Revisiting Data Structures': {
    card: 'border-violet-200 bg-gradient-to-br from-white via-white to-violet-50/80 shadow-violet-950/10 dark:border-violet-900/70 dark:from-zinc-900 dark:via-zinc-900 dark:to-violet-950/40',
    seriesBanner:
      'border-violet-500 bg-violet-600 text-white dark:border-violet-800 dark:bg-violet-500/15 dark:text-violet-200',
    tag: 'bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-200',
    titleHover: 'group-hover:text-violet-600 dark:group-hover:text-violet-300',
    action: 'text-violet-600 dark:text-violet-300',
    headingMarker: 'bg-violet-600 dark:bg-violet-400',
    subheading:
      'border-violet-300 text-violet-700 dark:border-violet-700 dark:text-violet-300',
    link: 'text-violet-700 decoration-violet-400/50 hover:decoration-violet-700 dark:text-violet-300 dark:hover:decoration-violet-300',
    blockquote:
      'border-violet-500 bg-violet-50 dark:border-violet-400 dark:bg-violet-950/30',
    codeLabel: 'before:text-violet-300',
  },
};

export const getBlogTheme = (seriesName?: string): BlogTheme =>
  (seriesName && seriesThemes[seriesName]) || defaultTheme;
