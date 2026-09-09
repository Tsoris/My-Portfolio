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

const AssemblyProjectVisual = ({ project }: ThemeVisualProps) => (
  <div
    aria-hidden
    className='relative aspect-video mb-4 overflow-hidden rounded-lg border border-amber-400/20 bg-slate-950 p-5 font-mono text-slate-100'
  >
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_48%)]' />
    <div className='relative flex h-full flex-col'>
      <div className='mb-4 flex items-center gap-1.5 border-b border-slate-700/80 pb-3'>
        <span className='h-2.5 w-2.5 rounded-full bg-red-400/80' />
        <span className='h-2.5 w-2.5 rounded-full bg-amber-300/80' />
        <span className='h-2.5 w-2.5 rounded-full bg-emerald-400/80' />
        <span className='ml-2 text-[0.65rem] uppercase tracking-[0.18em] text-slate-400'>
          x86 data pipeline
        </span>
      </div>

      <div className='flex flex-1 flex-col justify-center gap-2 text-xs sm:text-sm'>
        <p>
          <span className='text-amber-300'>INPUT</span>{' '}
          <span className='text-slate-400'>ASCII temperature file</span>
        </p>
        <p>
          <span className='text-blue-300'>PARSE</span>{' '}
          <span className='text-slate-400'>signed values into SDWORD[24]</span>
        </p>
        <p>
          <span className='text-emerald-300'>OUTPUT</span>{' '}
          <span className='text-slate-400'>restored chronological order</span>
        </p>
      </div>

      <p className='mt-3 text-sm font-semibold tracking-tight text-white sm:text-base'>
        {project.title}
      </p>
    </div>
  </div>
);

const animalGamePieceOrder = [
  'pika',
  'trilobite',
  'wombat',
  'beluga',
  'wombat',
  'trilobite',
  'pika',
];

const AnimalGameProjectVisual = ({ project }: ThemeVisualProps) => (
  <div
    aria-hidden
    className='relative aspect-video mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-orange-950 via-slate-950 to-purple-950 p-6 text-white'
  >
    <div className='absolute -right-3 top-1/2 grid aspect-square w-[58%] -translate-y-1/2 rotate-3 grid-cols-7 overflow-hidden rounded-md border border-white/10 shadow-2xl'>
      {Array.from({ length: 49 }, (_, index) => {
        const row = Math.floor(index / 7);
        const column = index % 7;
        const isStartingRow = row === 0 || row === 6;
        const isTangerine = row === 6;

        return (
          <span
            key={index}
            className={`flex aspect-square items-center justify-center text-[0.46rem] font-bold sm:text-[0.6rem] ${
              (row + column) % 2 === 0 ? 'bg-white/12' : 'bg-black/20'
            }`}
          >
            {isStartingRow ? (
              <span
                className={`flex h-[72%] w-[72%] items-center justify-center rounded-full shadow-sm ${
                  isTangerine ? 'bg-orange-400' : 'bg-purple-400'
                }`}
              >
                <Image
                  src={`/projects/animal-game/pieces/${animalGamePieceOrder[column]}.png`}
                  alt=''
                  width={48}
                  height={48}
                  className='h-[92%] w-[92%] object-contain'
                />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
    <div className='absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent' />
    <div className='relative z-10 flex h-full max-w-[62%] flex-col justify-between'>
      <span className='text-xs font-medium uppercase tracking-[0.2em] text-orange-200'>
        {project.projectType ?? 'Strategy game'}
      </span>
      <div>
        <p className='text-3xl font-bold tracking-tight'>{project.title}</p>
        <p className='mt-2 text-sm text-purple-100'>
          Python · OOP · Unit tests
        </p>
      </div>
    </div>
  </div>
);

const HashMapProjectVisual = ({ project }: ThemeVisualProps) => (
  <div
    aria-hidden
    className='relative aspect-video mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-cyan-950 via-slate-950 to-indigo-950 p-6 text-white'
  >
    <div className='absolute right-4 top-5 w-[46%] space-y-2 font-mono text-[0.55rem] text-cyan-100/90 sm:text-[0.65rem]'>
      <div className='rounded-md border border-cyan-300/20 bg-cyan-400/10 p-2'>
        <p className='mb-1 text-cyan-300'>quadratic_probe</p>
        <div className='flex gap-1'>
          {[4, 5, 8, 2].map((index, position) => (
            <span
              key={index}
              className={`flex h-6 flex-1 items-center justify-center rounded ${
                position === 3 ? 'bg-emerald-400/30' : 'bg-white/10'
              }`}
            >
              {index}
            </span>
          ))}
        </div>
      </div>
      <div className='rounded-md border border-indigo-300/20 bg-indigo-400/10 p-2'>
        <p className='mb-1 text-indigo-300'>separate_chain</p>
        <p className='truncate rounded bg-white/10 px-2 py-1.5'>
          4 → cat → act → tac
        </p>
      </div>
    </div>
    <div className='absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-transparent' />
    <div className='relative z-10 flex h-full max-w-[62%] flex-col justify-between'>
      <span className='text-xs font-medium uppercase tracking-[0.2em] text-cyan-200'>
        {project.projectType ?? 'Data structures'}
      </span>
      <div>
        <p className='text-2xl font-bold tracking-tight sm:text-3xl'>HashMap</p>
        <p className='mt-2 text-sm text-indigo-100'>Two collision strategies</p>
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
  assembly: {
    Visual: AssemblyProjectVisual,
    technologyClassName:
      'bg-amber-500/10 text-amber-700 dark:bg-amber-300/10 dark:text-amber-200',
  },
  'animal-game': {
    Visual: AnimalGameProjectVisual,
    technologyClassName:
      'bg-purple-700/10 text-purple-700 dark:bg-orange-300/10 dark:text-orange-200',
  },
  'hash-map': {
    Visual: HashMapProjectVisual,
    technologyClassName:
      'bg-cyan-700/10 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-200',
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
