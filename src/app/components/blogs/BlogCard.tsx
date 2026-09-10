'use client';

import { getBlogTheme } from '@/lib/blogThemes';
import { formatBlogDate } from '@/lib/formatBlogDate';
import type { Blog } from '@/types';
import { cardHoverArticle } from '@/utils/animations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const theme = getBlogTheme(blog.series?.name);

  return (
    <motion.article
      whileHover={cardHoverArticle.whileHover}
      whileTap={cardHoverArticle.whileTap}
      transition={cardHoverArticle.transition}
      className={`${theme.card} flex h-full flex-col rounded-xl border p-6 shadow-md`}
    >
      {blog.series && (
        <div
          className={`${theme.seriesBanner} -mx-6 -mt-6 mb-5 flex items-center gap-2 rounded-t-xl border-b px-6 py-3 text-sm font-medium`}
        >
          <FaBookOpen aria-hidden className='shrink-0' />
          <span className='truncate'>{blog.series.name}</span>
          <span className='ml-auto shrink-0'>
            {blog.series.position} of {blog.series.total}
          </span>
        </div>
      )}

      <div className='mb-4 flex flex-wrap gap-2'>
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className={`${theme.tag} rounded-full px-3 py-1 text-xs font-medium`}
          >
            {tag}
          </span>
        ))}
      </div>

      <Link href={`/blogs/${blog.slug}`} className='group'>
        <h2
          className={`${theme.titleHover} text-2xl font-semibold leading-tight transition-colors`}
        >
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
        className={`${theme.action} mt-6 inline-flex items-center gap-2 font-medium`}
      >
        Read article <FaArrowRight aria-hidden className='h-3.5 w-3.5' />
      </Link>
    </motion.article>
  );
};

export default BlogCard;
