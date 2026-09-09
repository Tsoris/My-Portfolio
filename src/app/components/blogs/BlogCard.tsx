'use client';

import { formatBlogDate } from '@/lib/formatBlogDate';
import type { Blog } from '@/types';
import { cardHoverArticle } from '@/utils/animations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => (
  <motion.article
    whileHover={cardHoverArticle.whileHover}
    whileTap={cardHoverArticle.whileTap}
    transition={cardHoverArticle.transition}
    className='flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-dark/50'
  >
    <div className='mb-4 flex flex-wrap gap-2'>
      {blog.tags.map((tag) => (
        <span
          key={tag}
          className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'
        >
          {tag}
        </span>
      ))}
    </div>

    <Link href={`/blogs/${blog.slug}`} className='group'>
      <h2 className='text-2xl font-semibold leading-tight transition-colors group-hover:text-primary'>
        {blog.title}
      </h2>
    </Link>

    <p className='mt-4 flex-1 leading-7 text-gray-600 dark:text-gray-300'>
      {blog.excerpt}
    </p>

    <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400'>
      <time dateTime={blog.date} className='flex items-center gap-2'>
        <FaCalendarAlt aria-hidden />
        {formatBlogDate(blog.date)}
      </time>
      <span className='flex items-center gap-2'>
        <FaClock aria-hidden />
        {blog.readTime}
      </span>
    </div>

    <Link
      href={`/blogs/${blog.slug}`}
      className='mt-6 inline-flex items-center gap-2 font-medium text-primary'
    >
      Read article <FaArrowRight aria-hidden className='h-3.5 w-3.5' />
    </Link>
  </motion.article>
);

export default BlogCard;
