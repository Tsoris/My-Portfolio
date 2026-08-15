import { signOut } from '@/auth';
import { requireAdmin } from '@/lib/admin-auth';
import {
  ArrowLeftStartOnRectangleIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className='min-h-screen bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-white lg:grid lg:grid-cols-[240px_1fr]'>
      <aside className='border-b border-gray-800 bg-gray-950 text-white lg:min-h-screen lg:border-b-0 lg:border-r'>
        <div className='flex items-center justify-between px-5 py-5 lg:block'>
          <div>
            <p className='text-lg font-bold text-primary'>Devfolio Admin</p>
            <p className='mt-1 text-xs text-gray-400'>{session.user?.email}</p>
          </div>
          <Link
            href='/'
            className='flex items-center gap-2 text-sm text-gray-300 hover:text-white lg:mt-6'
          >
            <HomeIcon className='h-4 w-4' /> Portfolio
          </Link>
        </div>
        <nav className='flex gap-2 overflow-x-auto px-3 pb-4 lg:grid lg:pb-0'>
          <AdminLink href='/admin/messages' label='Messages'>
            <EnvelopeIcon className='h-5 w-5' />
          </AdminLink>
          <AdminLink href='/admin/posts' label='Posts'>
            <DocumentTextIcon className='h-5 w-5' />
          </AdminLink>
          <AdminLink href='/admin/posts/new' label='New post'>
            <PlusCircleIcon className='h-5 w-5' />
          </AdminLink>
        </nav>
        <form
          className='hidden px-3 pt-6 lg:block'
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button
            type='submit'
            className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-900 hover:text-white'
          >
            <ArrowLeftStartOnRectangleIcon className='h-5 w-5' /> Sign out
          </button>
        </form>
      </aside>
      <section className='min-w-0 p-4 sm:p-8 lg:p-10'>{children}</section>
    </div>
  );
}

function AdminLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className='flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-900 hover:text-white'
    >
      {children}
      {label}
    </Link>
  );
}
