import type { Project } from '@/types';
import { getProjectTheme } from './ProjectVisual';

interface ProjectTechnologiesProps {
  project: Project;
}

const ProjectTechnologies = ({ project }: ProjectTechnologiesProps) => {
  const { technologyClassName } = getProjectTheme(project);

  return (
    <div className='flex flex-wrap content-start self-start gap-2 mb-4 border-t border-gray-200 pt-4 dark:border-gray-700'>
      {project.technologies.map((technology, index) => (
        <span
          key={`${project.id}-${technology}-${index}`}
          className={`${technologyClassName} rounded-full px-3 py-1 text-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none`}
        >
          {technology}
        </span>
      ))}
    </div>
  );
};

export default ProjectTechnologies;
