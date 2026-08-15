import { signIn } from '@/auth';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function AdminSignInPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950'>
      <section className='w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900'>
        <p className='mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Devfolio admin
        </p>
        <h1 className='text-3xl font-bold'>Welcome back</h1>
        <p className='mt-3 text-gray-600 dark:text-gray-300'>
          Sign in with the authorized GitHub account to manage messages and blog
          posts.
        </p>
        <form
          className='mt-8'
          action={async () => {
            'use server';
            await signIn('github', { redirectTo: '/admin' });
          }}
        >
          <button
            type='submit'
            className='flex w-full items-center justify-center gap-3 rounded-lg bg-gray-950 px-4 py-3 font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200'
          >
            <FaGithub className='text-xl' />
            Continue with GitHub
          </button>
        </form>
        <Link
          href='/'
          className='mt-6 block text-center text-sm text-gray-500 hover:text-primary'
        >
          Return to portfolio
        </Link>
      </section>
    </div>
  );
}
