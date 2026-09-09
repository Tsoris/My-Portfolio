import type { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PrivateCodeAction from '@/app/components/projects/PrivateCodeAction';
import HashMapDemo from './HashMapDemo';

const title = 'HashMap Collision Strategies | Tim’s Devfolio';
const description =
  'A side-by-side exploration of Python hash maps implemented with quadratic probing and separate chaining.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: 'summary', title, description, images: [] },
};

const technologies = [
  'Python',
  'Hash Tables',
  'Quadratic Probing',
  'Separate Chaining',
];

const HashMapCollisionStrategiesPage = () => (
  <div className='container mx-auto max-w-6xl py-12 sm:py-20'>
    <Link
      href='/projects'
      className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary'
    >
      <FaArrowLeft className='h-3.5 w-3.5' /> Back to projects
    </Link>

    <header className='mb-10 max-w-4xl'>
      <p className='mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300'>
        Data structures coursework
      </p>
      <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
        HashMap Collision Strategies
      </h1>
      <p className='mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300'>
        Two hash-map implementations built in Python to explore how open
        addressing and separate chaining solve the same collision problem in
        fundamentally different ways.
      </p>
      <div className='mt-6 flex flex-wrap gap-2'>
        {technologies.map((technology) => (
          <span
            key={technology}
            className='rounded-full bg-cyan-700/10 px-3 py-1 text-sm text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-200'
          >
            {technology}
          </span>
        ))}
      </div>
    </header>

    <div className='mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200'>
      This browser recreation applies identical operations to both structures.
      Try the sample anagrams to see an intentional collision, then insert or
      remove your own keys.
    </div>

    <HashMapDemo />

    <section className='py-16' aria-labelledby='bucket-index-heading'>
      <div className='grid gap-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-700 dark:bg-dark/50 md:grid-cols-[1fr_auto] md:items-center sm:p-9'>
        <div className='max-w-2xl'>
          <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
            From key to bucket
          </p>
          <h2 id='bucket-index-heading' className='mt-3 text-3xl font-bold'>
            How hashing selects an index
          </h2>
          <p className='mt-4 leading-7 text-gray-600 dark:text-gray-300'>
            The hash function first converts a key into an integer. Taking that
            value modulo the map&apos;s current capacity keeps the result within
            the bucket array and produces the key&apos;s initial, or home,
            index.
          </p>
        </div>
        <code className='rounded-xl border border-cyan-200 bg-cyan-50 px-6 py-5 text-center font-mono text-base font-semibold text-cyan-900 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-100 sm:text-lg'>
          index = hash(key) % capacity
        </code>
      </div>
    </section>

    <section className='grid gap-6 pb-8 md:grid-cols-2'>
      <article className='rounded-xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-700 dark:bg-dark/50'>
        <p className='text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300'>
          Strategy one
        </p>
        <h2 className='mt-3 text-2xl font-bold'>Open addressing</h2>
        <p className='mt-4 leading-7 text-gray-600 dark:text-gray-300'>
          Every entry lives directly in the bucket array. A collision starts a
          quadratic probe sequence, removals leave tombstones, and the table
          grows once its load factor reaches 0.50.
        </p>
        <p className='mt-4 rounded-lg bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 dark:bg-cyan-950/40 dark:text-cyan-100'>
          <strong>Why tombstones matter:</strong> A tombstone marks a removed
          slot as previously occupied, preserving the probe sequence. A lookup
          can continue past that slot to find a key displaced by an earlier
          collision and stops only when it reaches a truly empty bucket.
        </p>
      </article>
      <article className='rounded-xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-700 dark:bg-dark/50'>
        <p className='text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700 dark:text-indigo-300'>
          Strategy two
        </p>
        <h2 className='mt-3 text-2xl font-bold'>Separate chaining</h2>
        <p className='mt-4 leading-7 text-gray-600 dark:text-gray-300'>
          Each bucket owns a linked list, so colliding entries remain together
          in a chain. The structure tolerates a higher load factor and grows
          when the number of entries reaches its capacity.
        </p>
      </article>
    </section>

    <section className='pb-16' aria-labelledby='strategy-comparison-heading'>
      <h2 id='strategy-comparison-heading' className='sr-only'>
        Hash map strategy comparison
      </h2>
      <div className='overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-dark/50'>
        <table className='w-full min-w-[46rem] border-collapse text-left'>
          <thead>
            <tr className='border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/70'>
              <th scope='col' className='px-6 py-4 text-sm font-semibold'>
                Comparison
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-sm font-semibold text-indigo-700 dark:text-indigo-300'
              >
                Separate chaining
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-sm font-semibold text-cyan-700 dark:text-cyan-300'
              >
                Open addressing
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {[
              [
                'Collision handling',
                'Store multiple entries at a bucket',
                'Probe for another slot',
              ],
              [
                'Entry location',
                'Outside the array, referenced by each bucket',
                'Directly in the array',
              ],
              ['Memory overhead', 'Higher', 'Lower'],
              ['Cache locality', 'Worse', 'Better'],
              ['Deletion', 'Easy', 'More complicated'],
              ['Can exceed table capacity?', 'Yes', 'No'],
              [
                'High load factor',
                'More tolerant',
                'Performance drops quickly',
              ],
              [
                'Main issue',
                'Long chains',
                'Long probe sequences and clustering',
              ],
            ].map(([property, separateChaining, openAddressing]) => (
              <tr key={property} className='align-top'>
                <th
                  scope='row'
                  className='px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100'
                >
                  {property}
                </th>
                <td className='px-6 py-4 text-sm leading-6 text-gray-600 dark:text-gray-300'>
                  {separateChaining}
                </td>
                <td className='px-6 py-4 text-sm leading-6 text-gray-600 dark:text-gray-300'>
                  {openAddressing}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className='grid gap-10 border-t border-gray-200 py-12 dark:border-gray-700 md:grid-cols-[1fr_1.4fr]'>
      <div>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Engineering focus
        </p>
        <h2 className='mt-3 text-3xl font-bold'>The tradeoffs behind O(1)</h2>
      </div>
      <div className='space-y-5 leading-7 text-gray-600 dark:text-gray-300'>
        <p>
          Both maps implement insertion, lookup, removal, clearing, resizing,
          load-factor tracking, and retrieval of stored key-value pairs. Prime
          capacities help distribute entries when a table grows.
        </p>
        <p>
          The project also uses the separate-chaining map to calculate one or
          more modes and their frequency from a dynamic array.
        </p>
        <PrivateCodeAction />
      </div>
    </section>
  </div>
);

export default HashMapCollisionStrategiesPage;
