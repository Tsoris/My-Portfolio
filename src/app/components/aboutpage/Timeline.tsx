'use client';

import { timeline } from '@/contents/timeline';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { FaFileAlt } from 'react-icons/fa';

const Timeline = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='mb-16'>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        className='section-title flex items-center justify-center space-x-3'
      >
        <h2>Education &amp; Experience</h2>
        <Link
          href='/Resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='relative group text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'
          aria-label='View resume'
        >
          <FaFileAlt />
          <span className='tooltip tooltip-show'>View Resume</span>
        </Link>
      </motion.div>

      <div className='relative'>
        <motion.div
          aria-hidden
          initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.2,
            ease: 'easeOut',
          }}
          style={{ transformOrigin: 'top' }}
          className='absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blue-500/70 via-zinc-300 to-transparent dark:from-blue-400/80 dark:via-zinc-600/50 md:left-1/2'
        />

        <ul className='space-y-10'>
          {timeline.map((item, index) => {
            const direction = index % 2 === 0 ? 36 : -36;

            return (
              <li
                key={`${item.org}-${item.title}-${item.start}`}
                className='relative group'
              >
                <motion.span
                  aria-hidden
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.25 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : 0.1,
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                  }}
                  className='absolute left-4 -translate-x-1/2 mt-2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-zinc-900 bg-blue-500 dark:bg-blue-400/90 group-hover:scale-125 group-hover:bg-blue-400 dark:group-hover:bg-blue-300 transition md:left-1/2'
                />

                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: direction, y: 12 }
                  }
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.6,
                    delay: shouldReduceMotion ? 0 : 0.08,
                    ease: 'easeOut',
                  }}
                  className={[
                    'md:w-[46%]',
                    index % 2 === 0
                      ? 'md:ml-[54%]'
                      : 'md:mr-[54%] md:text-right',
                  ].join(' ')}
                >
                  <motion.div
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
                    className='bg-white/95 text-zinc-900 border border-zinc-200 backdrop-blur rounded-2xl p-5 shadow-md hover:border-zinc-300 dark:bg-zinc-900/70 dark:text-zinc-100 dark:border-zinc-800 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] dark:hover:border-zinc-700 transition-colors'
                  >
                    <div className='flex items-baseline justify-between gap-3 md:flex-row md:gap-6'>
                      <div className='min-w-0'>
                        <h3 className='text-lg font-medium leading-tight'>
                          {item.title}
                        </h3>
                        <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                          {item.href ? (
                            <a
                              href={item.href}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='underline decoration-dotted underline-offset-4 hover:text-zinc-950 dark:hover:text-zinc-200'
                            >
                              {item.org}
                            </a>
                          ) : (
                            item.org
                          )}
                        </p>
                        {item.location && (
                          <p className='text-xs text-zinc-500 dark:text-zinc-500'>
                            {item.location}
                          </p>
                        )}
                      </div>
                      <span className='shrink-0 text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-zinc-800 dark:text-zinc-300'>
                        {item.start} - {item.end}
                      </span>
                    </div>

                    <ul className='mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed'>
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className='pl-4 relative'>
                          <span
                            aria-hidden
                            className='absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500/70'
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;
