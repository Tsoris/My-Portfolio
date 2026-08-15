import { deletePostAction } from '@/app/admin/actions';
import { listAdminPosts } from '@/lib/cms';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const [posts, query] = await Promise.all([listAdminPosts(), searchParams]);

  return (
    <div className='mx-auto max-w-6xl'>
      <header className='flex items-end justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
            Publishing
          </p>
          <h1 className='mt-2 text-3xl font-bold'>Blog posts</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Write in Markdown, preview your work, and publish when ready.
          </p>
        </div>
        <Link
          href='/admin/posts/new'
          className='rounded-lg bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90'
        >
          New post
        </Link>
      </header>

      {(query.saved || query.deleted) && (
        <p className='mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/50 dark:text-green-200'>
          {query.deleted ? 'Post deleted.' : 'Post saved successfully.'}
        </p>
      )}

      <div className='mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
        {posts.length === 0 && (
          <div className='p-10 text-center text-gray-500'>
            No posts yet. Create your first draft.
          </div>
        )}
        {posts.map((post) => (
          <article
            key={post.id}
            className='grid gap-4 border-b border-gray-200 p-5 last:border-0 dark:border-gray-800 md:grid-cols-[1fr_auto_auto] md:items-center'
          >
            <div>
              <div className='flex flex-wrap items-center gap-3'>
                <h2 className='font-semibold'>{post.title}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    post.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {post.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className='mt-1 text-sm text-gray-500'>/blog/{post.slug}</p>
            </div>
            <time className='text-sm text-gray-500'>
              Updated {post.updatedAt.toLocaleDateString()}
            </time>
            <div className='flex gap-2'>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className='rounded-lg border border-gray-200 p-2 text-gray-500 hover:border-primary hover:text-primary dark:border-gray-700'
                aria-label={`Edit ${post.title}`}
              >
                <PencilSquareIcon className='h-4 w-4' />
              </Link>
              <form action={deletePostAction}>
                <input type='hidden' name='id' value={post.id} />
                <button
                  type='submit'
                  className='rounded-lg border border-gray-200 p-2 text-gray-500 hover:border-red-500 hover:text-red-500 dark:border-gray-700'
                  aria-label={`Delete ${post.title}`}
                >
                  <TrashIcon className='h-4 w-4' />
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
