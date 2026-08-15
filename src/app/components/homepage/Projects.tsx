'use client';
import { projects } from '@/contents/projects';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cardHoverArticle, cardReveal, listStagger } from '@/utils/animations';
import ProjectVisual from '@/app/components/projects/ProjectVisual';

const MotionArticle = motion('article');

function Projects() {
  return (
    <section className='py-20 container max-w-7xl mx-auto px-4'>
      <h2 className='text-3xl font-bold mb-12 text-center'>
        Featured Projects
      </h2>

      {projects.length === 0 ? (
        <div className='mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-dark/50'>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            I&apos;m currently preparing the project case studies I want to
            share here.
          </p>
          <Link
            href='/contact'
            className='mt-6 inline-block text-primary font-medium hover:underline'
          >
            Contact me about my work
          </Link>
        </div>
      ) : (
        <motion.div
          variants={listStagger}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.05 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-8'
        >
          {projects.map((project, i) => (
            <MotionArticle
              key={project.id}
              variants={cardReveal}
              whileHover={cardHoverArticle.whileHover}
              whileTap={cardHoverArticle.whileTap}
              transition={cardHoverArticle.transition}
              className='bg-white dark:bg-dark/50 rounded-lg shadow-md p-6'
            >
              <ProjectVisual project={project} />

              <h3 className='text-xl font-semibold mb-2'>{project.title}</h3>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                {project.description}
              </p>

              <div className='flex flex-wrap gap-2 mb-4'>
                {project.technologies.map((tech, idx) => (
                  <span
                    key={`${project.id}-${tech}-${idx}`}
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
                  <FaExternalLinkAlt className='w-5 h-5' />{' '}
                  <span>Live Demo</span>
                </Link>
              </div>
            </MotionArticle>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Projects;
