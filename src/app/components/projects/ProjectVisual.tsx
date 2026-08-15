import type { Project } from '@/types';
import Image from 'next/image';

interface ProjectVisualProps {
  project: Project;
}

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

  return (
    <div
      aria-hidden
      className='aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 flex flex-col justify-between text-white'
    >
      <span className='text-xs font-medium uppercase tracking-[0.2em] text-blue-300'>
        Full-stack portfolio
      </span>
      <div>
        <p className='text-3xl font-bold tracking-tight'>Devfolio</p>
        <p className='mt-2 text-sm text-slate-300'>
          Next.js · TypeScript · PostgreSQL
        </p>
      </div>
    </div>
  );
};

export default ProjectVisual;
