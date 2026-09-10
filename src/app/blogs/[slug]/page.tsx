import BlogImage from '@/app/components/blogs/BlogImage';
import { formatBlogDate } from '@/lib/formatBlogDate';
import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';

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
        {blog.series && (
          <div className='mb-5 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary'>
            <FaBookOpen aria-hidden className='shrink-0' />
            <span>{blog.series.name}</span>
            <span className='ml-auto shrink-0'>
              Part {blog.series.position} of {blog.series.total}
            </span>
          </div>
        )}

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
              <h2 className='mb-5 mt-14 flex scroll-mt-24 items-center gap-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white'>
                <span
                  aria-hidden='true'
                  className='h-8 w-1.5 shrink-0 rounded-full bg-primary'
                />
                <span>{children}</span>
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className='mb-4 mt-10 scroll-mt-24 border-b border-primary/25 pb-2 text-2xl font-semibold text-primary dark:border-primary/40'>
                {children}
              </h3>
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
            img: ({ src, alt }) => {
              if (typeof src !== 'string') {
                return null;
              }

              return <BlogImage src={src} alt={alt ?? ''} />;
            },
            em: ({ children }) => (
              <em className='text-sm leading-6 text-gray-600 dark:text-gray-300'>
                {children}
              </em>
            ),
            pre: ({ children }) => (
              <pre className='my-8 overflow-x-auto rounded-xl border border-zinc-700 bg-zinc-950 p-5 text-zinc-100 shadow-lg'>
                {children}
              </pre>
            ),
            code: ({ className, children }) => {
              const language = /language-([\w-]+)/.exec(className ?? '')?.[1];
              const isBlock =
                Boolean(language) || String(children).includes('\n');

              if (!isBlock) {
                return (
                  <code className='rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-gray-900 dark:bg-zinc-700 dark:text-gray-100'>
                    {children}
                  </code>
                );
              }

              return (
                <code
                  className={`${className ?? ''} relative block min-w-max font-mono text-sm leading-7 ${
                    language
                      ? 'pt-7 before:absolute before:top-0 before:left-0 before:text-[0.65rem] before:font-semibold before:tracking-[0.18em] before:text-blue-300 before:uppercase before:content-[attr(data-language)]'
                      : ''
                  }`}
                  data-language={language}
                >
                  {children}
                </code>
              );
            },
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
