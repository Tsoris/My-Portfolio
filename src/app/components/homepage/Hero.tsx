'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFileAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { motion } from 'framer-motion';
import {
  fadeInDown,
  scaleIn,
  slideInLeft,
  slideInRight,
} from '@/utils/animations';

const ICONS = [
  { href: 'https://github.com/Tsoris', icon: <FaGithub />, label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/timothy-sorisa-9b650580/',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
  },
  {
    href: 'https://x.com/TimSorDevelop',
    icon: <FaTwitter />,
    label: 'Twitter / X',
  },
  {
    href: '/projects/Resume.pdf',
    icon: <FaFileAlt />,
    label: 'Resume',
    tooltip: 'View Resume',
  },
];

function Hero() {
  return (
    <motion.section
      initial='initial'
      animate='animate'
      variants={{
        initial: {},
        animate: { transition: { staggerChildren: 0.3 } },
      }}
      className='py-28 container max-w-7xl mx-auto px-4'
    >
      <div className='max-w-3xl mx-auto text-center'>
        <motion.div
          variants={scaleIn}
          className='flex flex-col items-center mb-4'
        >
          <Image
            src='/profile.png'
            alt='profile image'
            width={100}
            height={100}
            className='
            rounded-full mb-4 w-32 h-32 object-cover object-[center_20%] p-1 ring-2 ring-primary'
          />
        </motion.div>

        <motion.h1
          variants={fadeInDown}
          className='text-4xl md:text-6xl font-bold mb-6'
        >
          Hi, I&apos;m <span className='text-primary'>Timothy Sorisa</span>
        </motion.h1>

        <motion.p
          variants={fadeInDown}
          className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8'
        >
          Full Stack Developer
        </motion.p>

        {/* todo need to link to actual web pages */}

        <motion.div
          variants={{
            initial: {},
            animate: {
              transition: { delayChildren: 0.15, staggerChildren: 0.2 },
            },
          }}
          className='flex justify-center space-x-4 mb-8'
        >
          {ICONS.map(({ href, icon, label, tooltip }) => (
            <motion.div
              key={label}
              variants={fadeInDown}
              whileHover={{
                rotate: [0, -8, 8, -8, 8, 0],
                transition: { duration: 0.6, ease: 'easeInOut' },
              }}
              className='relative group inline-block'
            >
              <Link
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'
              >
                {icon}
              </Link>
              {tooltip && (
                <span className='tooltip tooltip-show'>{tooltip}</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInDown}
          transition={{ delay: 2 }}
          className='flex flex-col md:flex-row justify-center gap-4'
        >
          <motion.div variants={slideInLeft} transition={{ duration: 2 }}>
            <Link
              href='/projects'
              className='bg-primary inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors'
            >
              View Projects
            </Link>
          </motion.div>
          <motion.div variants={slideInRight} transition={{ duration: 2 }}>
            <Link
              href='/contact'
              className='bg-gray-500 inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:text-gray-800 hover:bg-gray-300 transition-colors'
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Hero;
