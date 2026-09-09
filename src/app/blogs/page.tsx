import BlogCard from '@/app/components/blogs/BlogCard';
import { getAllBlogs } from '@/lib/blogs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Tim's Devfolio",
  description:
    'Notes on software engineering, computer science, and the lessons behind the projects I build.',
};

function Blogs() {
  const blogs = getAllBlogs();

  return (
    <section className='container max-w-5xl py-16 sm:py-20'>
      <header className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
          Field notes
        </p>
        <h1 className='mt-3 text-4xl font-bold tracking-tight sm:text-5xl'>
          Blog
        </h1>
        <p className='mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300'>
          Notes on software engineering, computer science, and the lessons
          behind the projects I build.
        </p>
      </header>

      <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
}

export default Blogs;
