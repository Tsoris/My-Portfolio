import Link from 'next/link';

const ContactCTA = () => {
  return (
    <section className='container max-w-7xl mx-auto px-4 py-20'>
      <div className='mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white/90 px-6 py-12 text-center shadow-md dark:border-gray-700 dark:bg-dark/70 sm:px-10'>
        <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
          Let&apos;s connect
        </p>
        <h2 className='text-3xl font-bold sm:text-4xl'>
          Interested in working together?
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300'>
          I&apos;m open to software engineering opportunities and conversations
          about interesting projects.
        </p>
        <Link
          href='/contact'
          className='mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary/90'
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;
