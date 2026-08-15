import { estimateReadTime, listPublishedPosts } from '@/lib/cms';
import { ArrowRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const revalidate = 300;

export default async function BlogsPage() {
  const posts = await listPublishedPosts();

  return (
    <section className='container mx-auto max-w-6xl py-20'>
      <header className='mx-auto max-w-3xl text-center'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
          Notes from the work
        </p>
        <h1 className='mt-3 text-4xl font-bold sm:text-5xl'>Blog</h1>
        <p className='mt-5 text-lg text-gray-600 dark:text-gray-300'>
          Practical notes about software engineering, learning, and building
          useful products.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className='mx-auto mt-14 max-w-2xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900'>
          <h2 className='text-xl font-semibold'>The first article is coming</h2>
          <p className='mt-3 text-gray-600 dark:text-gray-300'>
            Check back soon for notes from my software development journey.
          </p>
        </div>
      ) : (
        <div className='mt-14 grid gap-6 md:grid-cols-2'>
          {posts.map((post) => (
            <article
              key={post.id}
              className='group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900'
            >
              <div className='flex items-center gap-4 text-sm text-gray-500'>
                <span className='flex items-center gap-2'>
                  <CalendarDaysIcon className='h-4 w-4' />
                  {(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                </span>
                <span>{estimateReadTime(post.content)}</span>
              </div>
              <h2 className='mt-5 text-2xl font-semibold transition group-hover:text-primary'>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className='mt-3 flex-1 text-gray-600 dark:text-gray-300'>
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className='mt-6 inline-flex items-center gap-2 font-medium text-primary'
              >
                Read article <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
