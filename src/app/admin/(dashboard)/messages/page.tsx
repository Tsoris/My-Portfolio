import {
  archiveMessageAction,
  markMessageReadAction,
} from '@/app/admin/actions';
import { listMessages } from '@/lib/cms';
import { ArchiveBoxIcon, CheckIcon } from '@heroicons/react/24/outline';

export default async function AdminMessagesPage() {
  const messages = await listMessages();

  return (
    <div className='mx-auto max-w-6xl'>
      <header>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Inbox
        </p>
        <h1 className='mt-2 text-3xl font-bold'>Messages</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>
          Contact submissions saved in Supabase.
        </p>
      </header>
      <div className='mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
        {messages.length === 0 && (
          <div className='p-10 text-center text-gray-500'>
            No active messages yet.
          </div>
        )}
        {messages.map((message) => (
          <article
            key={message.id}
            className='grid gap-4 border-b border-gray-200 p-5 last:border-0 dark:border-gray-800 md:grid-cols-[220px_1fr_auto]'
          >
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='font-semibold'>{message.name}</h2>
                {!message.readAt && (
                  <span className='rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
                    Unread
                  </span>
                )}
              </div>
              <a
                href={`mailto:${message.email}`}
                className='mt-1 block text-sm text-gray-500 hover:text-primary'
              >
                {message.email}
              </a>
            </div>
            <p className='text-gray-700 dark:text-gray-200'>
              {message.message}
            </p>
            <div className='flex items-start gap-2 md:justify-end'>
              {!message.readAt && (
                <form action={markMessageReadAction}>
                  <input type='hidden' name='id' value={message.id} />
                  <button
                    type='submit'
                    className='rounded-lg border border-gray-200 p-2 text-gray-500 hover:border-primary hover:text-primary dark:border-gray-700'
                    aria-label={`Mark message from ${message.name} as read`}
                  >
                    <CheckIcon className='h-4 w-4' />
                  </button>
                </form>
              )}
              <form action={archiveMessageAction}>
                <input type='hidden' name='id' value={message.id} />
                <button
                  type='submit'
                  className='rounded-lg border border-gray-200 p-2 text-gray-500 hover:border-primary hover:text-primary dark:border-gray-700'
                  aria-label={`Archive message from ${message.name}`}
                >
                  <ArchiveBoxIcon className='h-4 w-4' />
                </button>
              </form>
              <time className='ml-2 pt-2 text-sm text-gray-500'>
                {message.createdAt.toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
