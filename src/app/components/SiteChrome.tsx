'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './homepage/Footer';
import NavBar from './homepage/NavBar';

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <main className='min-h-screen'>{children}</main>;
  }

  return (
    <>
      <NavBar />
      <main className='min-h-screen pt-24'>{children}</main>
      <Footer />
    </>
  );
}
