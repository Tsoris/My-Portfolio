import { estimateReadTime, getPublishedPostBySlug } from '@/lib/cms';
import { ArrowLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 300;

const getPost = cache(getPublishedPostBySlug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: 'Article not found' };
  }

  const title = `${post.title} | Tim's Devfolio`;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      images: [],
    },
    twitter: {
      card: 'summary',
      title,
      description: post.excerpt,
      images: [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className='container mx-auto max-w-3xl py-16'>
      <Link
        href='/blogs'
        className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary'
      >
        <ArrowLeftIcon className='h-4 w-4' /> Back to all posts
      </Link>
      <header className='mt-10 border-b border-gray-200 pb-10 dark:border-gray-800'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
          {post.title}
        </h1>
        <p className='mt-5 text-xl text-gray-600 dark:text-gray-300'>
          {post.excerpt}
        </p>
        <div className='mt-6 flex items-center gap-5 text-sm text-gray-500'>
          <span className='flex items-center gap-2'>
            <CalendarDaysIcon className='h-4 w-4' />
            {(post.publishedAt ?? post.createdAt).toLocaleDateString()}
          </span>
          <span>{estimateReadTime(post.content)}</span>
        </div>
      </header>
      <div className='blog-content py-10'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
