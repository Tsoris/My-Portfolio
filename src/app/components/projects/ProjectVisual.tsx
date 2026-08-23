import type { Project, ProjectVisualTheme } from '@/types';
import Image from 'next/image';
import type { ComponentType } from 'react';

interface ProjectVisualProps {
  project: Project;
}

type ThemeVisualProps = ProjectVisualProps;

const DefaultProjectVisual = ({ project }: ThemeVisualProps) => (
  <div
    aria-hidden
    className='aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 flex flex-col justify-between text-white'
  >
    <span className='text-xs font-medium uppercase tracking-[0.2em] text-blue-300'>
      {project.projectType ?? 'Featured project'}
    </span>
    <div>
      <p className='text-3xl font-bold tracking-tight'>{project.title}</p>
      <p className='mt-2 text-sm text-slate-300'>
        {project.technologies.slice(0, 3).join(' · ')}
      </p>
    </div>
  </div>
);

const ChessProjectVisual = ({ project }: ThemeVisualProps) => (
  <div
    aria-hidden
    className='relative aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 p-6 text-white'
  >
    <div className='absolute -right-6 top-0 grid h-full aspect-square grid-cols-8 grid-rows-8 rotate-6 scale-110 opacity-70'>
      {Array.from({ length: 64 }, (_, index) => {
        const row = Math.floor(index / 8);
        const column = index % 8;
        const isLightSquare = (row + column) % 2 === 0;

        return (
          <span
            key={index}
            className={isLightSquare ? 'bg-amber-100/20' : 'bg-emerald-950/35'}
          />
        );
      })}
    </div>
    <div className='absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-transparent' />
    <span className='absolute right-8 top-1/2 z-10 -translate-y-1/2 text-8xl text-amber-100/90 drop-shadow-lg'>
      ♞
    </span>

    <div className='relative z-20 flex h-full max-w-[72%] flex-col justify-between'>
      <span className='text-xs font-medium uppercase tracking-[0.2em] text-amber-200'>
        {project.projectType ?? 'Chess project'}
      </span>
      <div>
        <p className='text-3xl font-bold tracking-tight'>{project.title}</p>
        <p className='mt-2 text-sm text-emerald-100'>
          {project.technologies.slice(0, 3).join(' · ')}
        </p>
      </div>
    </div>
  </div>
);

const visualThemeRegistry = {
  default: {
    Visual: DefaultProjectVisual,
    technologyClassName: 'bg-primary/10 text-primary',
  },
  chess: {
    Visual: ChessProjectVisual,
    technologyClassName:
      'bg-emerald-700/10 text-emerald-700 dark:bg-amber-200/10 dark:text-amber-200',
  },
} satisfies Record<
  ProjectVisualTheme,
  {
    Visual: ComponentType<ThemeVisualProps>;
    technologyClassName: string;
  }
>;

export const getProjectTheme = (project: Pick<Project, 'visualTheme'>) =>
  visualThemeRegistry[project.visualTheme ?? 'default'];

const ProjectVisual = ({ project }: ProjectVisualProps) => {
  if (project.image) {
    return (
      <div className='relative aspect-video mb-4 rounded-lg overflow-hidden'>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
    );
  }

  const { Visual } = getProjectTheme(project);

  return <Visual project={project} />;
};

export default ProjectVisual;
