import type { Project } from '@/types';
import Link from 'next/link';
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaLock,
} from 'react-icons/fa';

interface ProjectActionsProps {
  project: Project;
}

const ProjectActions = ({ project }: ProjectActionsProps) => {
  const isExternalDemo = project.demoLink?.startsWith('http');

  return (
    <div className='flex flex-wrap gap-4 pt-4'>
      {project.githubLink ? (
        <Link
          href={project.githubLink}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 text-secondary hover:text-primary transition-colors'
        >
          <FaGithub className='h-5 w-5' /> <span>Code</span>
        </Link>
      ) : (
        <span
          className='flex items-center gap-2 text-gray-400 dark:text-gray-500'
          title='Coursework source is kept private for academic integrity'
        >
          <FaLock className='h-4 w-4' /> <span>Private Source</span>
        </span>
      )}

      {project.demoLink ? (
        <Link
          href={project.demoLink}
          target={isExternalDemo ? '_blank' : undefined}
          rel={isExternalDemo ? 'noopener noreferrer' : undefined}
          className='flex items-center gap-2 text-secondary hover:text-primary transition-colors'
        >
          {isExternalDemo ? (
            <FaExternalLinkAlt className='h-5 w-5' />
          ) : (
            <FaArrowRight className='h-4 w-4' />
          )}
          <span>{project.demoLabel ?? 'Live Demo'}</span>
        </Link>
      ) : (
        <span className='text-gray-400 dark:text-gray-500'>
          Demo Coming Soon
        </span>
      )}
    </div>
  );
};

export default ProjectActions;
