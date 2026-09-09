import { formatBlogDate } from '@/lib/formatBlogDate';
import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllBlogs().map((blog) => ({ slug: blog.slug }));

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  return {
    title: `${blog.title} | Tim's Devfolio`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className='container max-w-3xl py-12 sm:py-16'>
      <Link
        href='/blogs'
        className='inline-flex items-center gap-2 font-medium text-secondary transition-colors hover:text-primary'
      >
        <FaArrowLeft aria-hidden className='h-3.5 w-3.5' />
        All posts
      </Link>

      <header className='mt-10 border-b border-gray-200 pb-8 dark:border-gray-700'>
        <div className='flex flex-wrap gap-2'>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className='mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl'>
          {blog.title}
        </h1>
        <p className='mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300'>
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
      </header>

      <div className='mt-10'>
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className='mb-4 mt-10 text-2xl font-bold tracking-tight'>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className='mb-3 mt-8 text-xl font-semibold'>{children}</h3>
            ),
            p: ({ children }) => (
              <p className='mb-6 text-base leading-8 text-gray-700 dark:text-gray-200'>
                {children}
              </p>
            ),
            ol: ({ children }) => (
              <ol className='mb-6 ml-6 list-decimal space-y-3 text-gray-700 dark:text-gray-200'>
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul className='mb-6 ml-6 list-disc space-y-3 text-gray-700 dark:text-gray-200'>
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className='pl-2 leading-8'>{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className='my-8 border-l-4 border-primary bg-primary/5 px-5 py-4 [&>p]:mb-0'>
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className='font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className='font-semibold text-gray-950 dark:text-white'>
                {children}
              </strong>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
