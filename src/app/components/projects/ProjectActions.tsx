import type { Project } from '@/types';
import Link from 'next/link';
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import ComingSoonDemoAction from './ComingSoonDemoAction';
import PrivateCodeAction from './PrivateCodeAction';

interface ProjectActionsProps {
  project: Project;
}

const ProjectActions = ({ project }: ProjectActionsProps) => {
  const isExternalDemo = project.demoLink?.startsWith('http');

  return (
    <div className='pt-4'>
      <div className='flex flex-wrap gap-4'>
        {project.githubLink ? (
          <Link
            href={project.githubLink}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-secondary hover:text-primary transition-colors'
          >
            <FaGithub className='h-5 w-5' /> <span>Code</span>
          </Link>
        ) : project.sourcePrivate ? (
          <PrivateCodeAction />
        ) : null}

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
        ) : project.demoComingSoonLink ? (
          <ComingSoonDemoAction milestoneLink={project.demoComingSoonLink} />
        ) : (
          <span className='text-gray-400 dark:text-gray-500'>
            Demo Coming Soon
          </span>
        )}
      </div>

      {project.demoNote ? (
        <p className='mt-3 text-sm leading-5 text-gray-500 dark:text-gray-400'>
          {project.demoNote}
        </p>
      ) : null}
    </div>
  );
};

export default ProjectActions;
