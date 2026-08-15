import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export function isAdminDemoMode() {
  return process.env.ADMIN_DEMO_MODE === 'true' && process.env.VERCEL !== '1';
}

export async function requireAdmin() {
  if (isAdminDemoMode()) {
    return {
      user: {
        name: 'Timothy Sorisa',
        email: 'Local preview mode',
      },
    };
  }

  const session = await auth();
  if (!session?.user) {
    redirect('/admin/sign-in');
  }

  return session;
}
