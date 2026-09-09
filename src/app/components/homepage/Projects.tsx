'use client';
import { projects } from '@/contents/projects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cardHoverArticle, cardReveal, listStagger } from '@/utils/animations';
import ProjectActions from '@/app/components/projects/ProjectActions';
import ProjectVisual from '@/app/components/projects/ProjectVisual';
import ProjectTechnologies from '@/app/components/projects/ProjectTechnologies';

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
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {projects.map((project) => (
            <MotionArticle
              key={project.id}
              variants={cardReveal}
              whileHover={cardHoverArticle.whileHover}
              whileTap={cardHoverArticle.whileTap}
              transition={cardHoverArticle.transition}
              className='grid row-span-5 grid-rows-subgrid gap-y-0 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-transparent dark:bg-dark/50'
            >
              <ProjectVisual project={project} />

              <h3 className='text-xl font-semibold mb-2'>{project.title}</h3>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                {project.description}
              </p>

              <ProjectTechnologies project={project} />
              <ProjectActions project={project} />
            </MotionArticle>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Projects;
