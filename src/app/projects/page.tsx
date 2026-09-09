'use client';

import { projects } from '@/contents/projects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cardHoverArticle, cardReveal, listStagger } from '@/utils/animations';
import ProjectActions from '@/app/components/projects/ProjectActions';
import ProjectVisual from '@/app/components/projects/ProjectVisual';
import ProjectTechnologies from '@/app/components/projects/ProjectTechnologies';

const MotionArticle = motion('article');

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
    </div>
  );
};

export default Projects;
