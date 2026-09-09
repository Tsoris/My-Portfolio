import BlogCard from '@/app/components/blogs/BlogCard';
import { getAllBlogs } from '@/lib/blogs';
import Link from 'next/link';

function Blogs() {
  const blogs = getAllBlogs();

  return (
    <section className='py-20 container max-w-7xl mx-auto px-4'>
      <h2 className='text-3xl font-bold mb-12 text-center'>
        Latest Blog Posts
      </h2>

      {blogs.length === 0 ? (
        <div className='mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-dark/50'>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            I&apos;m working on my first articles. Check back soon for practical
            notes from my software development journey.
          </p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
          <div className='text-center mt-12'>
            <Link
              href='/blogs'
              className='inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors'
            >
              View All Posts
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Blogs;
