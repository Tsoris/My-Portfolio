'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

interface SkillCardProps {
  title: string;
  skills: string[];
}

const SkillCard = ({ title, skills }: SkillCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 320,
              damping: 26,
              mass: 0.65,
            }
      }
      className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'
    >
      <FaCode className='h-8 w-8 text-primary mb-4' />
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <ul className='text-secondary space-y-2'>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </motion.article>
  );
};

export default SkillCard;
