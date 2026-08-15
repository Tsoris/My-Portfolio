import { projects } from '@/contents/projects';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import ProjectVisual from '@/app/components/projects/ProjectVisual';

const Projects = () => {
  if (projects.length === 0) {
    return (
      <section className='container max-w-3xl mx-auto px-4 py-20 text-center'>
        <h1 className='text-4xl font-bold mb-6'>Projects</h1>
        <p className='text-lg text-secondary mb-8'>
          I&apos;m currently preparing detailed case studies of my work. Check
          back soon, or contact me to learn more about what I&apos;m building.
        </p>
        <Link
          href='/contact'
          className='inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors'
        >
          Contact Me
        </Link>
      </section>
    );
  }

  return (
    <div className='container max-w-7xl mx-auto py-20'>
      <h1 className='text-4xl font-bold mb-4 text-center'>My Projects</h1>
      <p className='text-lg text-secondary mb-24 text-center'>
        Here are some of my recent projects. Click on the links to view the code
        or live demo.
      </p>
      {/* This div contains logic to create Project Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {projects.map((project) => (
          <article
            key={project.title}
            className='bg-white dark:bg-dark/50 rounded-lg shadow-md p-6'
          >
            <ProjectVisual project={project} />

            <h3 className='text-xl font-semibold mb-2'>{project.title}</h3>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>
              {project.description}
            </p>
            <div className='flex flex-wrap gap-2 mb-4'>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm'
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className='flex gap-4 mt-2'>
              <Link
                href={project.githubLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-secondary hover:text-primary transition-colors'
              >
                <FaGithub className='w-5 h-5' /> <span>Code</span>
              </Link>

              <Link
                href={project.demoLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-secondary hover:text-primary transition-colors'
              >
                <FaExternalLinkAlt className='w-5 h-5' /> <span>Live Demo</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;
