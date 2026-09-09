import type { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import TemperatureDemo from './TemperatureDemo';

const title = 'Temperature Data Parser | Tim’s Devfolio';
const description =
  'An x86 assembly coursework project that parses signed temperatures from an ASCII file and restores their chronological order.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [],
  },
};

const technologies = ['x86 Assembly', 'MASM', 'Irvine32', 'File I/O'];

const TemperatureDataParserPage = () => (
  <div className='container mx-auto max-w-5xl py-12 sm:py-20'>
    <Link
      href='/projects'
      className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary'
    >
      <FaArrowLeft className='h-3.5 w-3.5' /> Back to projects
    </Link>

    <header className='mb-10 max-w-3xl'>
      <p className='mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-300'>
        Systems programming coursework
      </p>
      <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
        Temperature Data Parser
      </h1>
      <p className='mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300'>
        A 32-bit x86 assembly utility that reads 24 signed temperatures from a
        comma-delimited ASCII file, converts them into integers, and restores
        their chronological order.
      </p>
      <div className='mt-6 flex flex-wrap gap-2'>
        {technologies.map((technology) => (
          <span
            key={technology}
            className='rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-700 dark:bg-amber-300/10 dark:text-amber-200'
          >
            {technology}
          </span>
        ))}
      </div>
    </header>

    <div className='mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200'>
      This interactive demo recreates the program&apos;s input and output
      behavior in the browser. The original MASM/Irvine32 executable runs on
      Windows and will be shown here in a future video demonstration.
    </div>

    <TemperatureDemo />

    <section className='grid gap-6 py-16 md:grid-cols-3'>
      {[
        [
          '1. Read',
          'Load the comma-delimited ASCII data into a fixed-size file buffer.',
        ],
        [
          '2. Parse',
          'Convert characters into signed integers and store 24 SDWORD values.',
        ],
        [
          '3. Restore',
          'Traverse the array backward and display the readings in chronological order.',
        ],
      ].map(([heading, body]) => (
        <article
          key={heading}
          className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-dark/50'
        >
          <h2 className='text-lg font-semibold'>{heading}</h2>
          <p className='mt-3 leading-7 text-gray-600 dark:text-gray-300'>
            {body}
          </p>
        </article>
      ))}
    </section>

    <section className='grid gap-10 border-t border-gray-200 py-12 dark:border-gray-700 md:grid-cols-[1fr_1.4fr]'>
      <div>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Implementation
        </p>
        <h2 className='mt-3 text-3xl font-bold'>
          Working close to the hardware
        </h2>
      </div>
      <div className='space-y-5 leading-7 text-gray-600 dark:text-gray-300'>
        <p>
          The parser builds each number one digit at a time, tracks whether it
          is negative, and writes the converted value into an array using string
          instructions. A separate procedure walks that array in reverse.
        </p>
        <p>
          The program also uses custom input and display macros, stack-based
          procedure parameters, register preservation, and error handling for
          unsuccessful file operations.
        </p>
        <div className='flex items-start gap-3 rounded-xl bg-gray-100 p-4 text-sm dark:bg-gray-800'>
          <FaLock className='mt-1 h-4 w-4 shrink-0' />
          <p>
            The complete source remains private to protect the academic
            integrity of an assignment that may be reused in future classes.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default TemperatureDataParserPage;
