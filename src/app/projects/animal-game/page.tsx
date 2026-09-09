import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaBullseye, FaCheck } from 'react-icons/fa';
import PrivateCodeAction from '@/app/components/projects/PrivateCodeAction';
import AnimalGameDemo from './AnimalGameDemo';

const title = 'AnimalGame | Tim’s Devfolio';
const description =
  'A Python strategy-game engine featuring polymorphic pieces, movement validation, captures, turns, and win-state detection.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: 'summary', title, description, images: [] },
};

const technologies = [
  'Python',
  'Object-Oriented Design',
  'Unit Testing',
  'Game Logic',
];

const pieceMovementDetails = [
  {
    name: 'Pika',
    image: '/projects/animal-game/pieces/pika.png',
    movement:
      'Slides up to four squares orthogonally or one square diagonally.',
    imageClassName: 'scale-110',
  },
  {
    name: 'Trilobite',
    image: '/projects/animal-game/pieces/trilobite.png',
    movement: 'Slides up to two squares diagonally or one square orthogonally.',
    imageClassName: 'scale-95',
  },
  {
    name: 'Wombat',
    image: '/projects/animal-game/pieces/wombat.png',
    movement: 'Jumps one square in any orthogonal or diagonal direction.',
    imageClassName: 'scale-110',
  },
  {
    name: 'Beluga',
    image: '/projects/animal-game/pieces/beluga.png',
    movement: 'Jumps three squares diagonally or one square orthogonally.',
    imageClassName: 'scale-105',
  },
];

const AnimalGamePage = () => (
  <div className='container mx-auto max-w-6xl py-12 sm:py-20'>
    <Link
      href='/projects'
      className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary'
    >
      <FaArrowLeft className='h-3.5 w-3.5' /> Back to projects
    </Link>

    <header className='mb-10 max-w-4xl'>
      <p className='mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 dark:text-orange-300'>
        Object-oriented game engine
      </p>
      <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
        AnimalGame
      </h1>
      <p className='mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300'>
        A two-player strategy game on a 7×7 board, built in Python around four
        polymorphic piece types with distinct movement and capture rules.
      </p>
      <div className='mt-6 flex flex-wrap gap-2'>
        {technologies.map((technology) => (
          <span
            key={technology}
            className='rounded-full bg-purple-700/10 px-3 py-1 text-sm text-purple-700 dark:bg-orange-300/10 dark:text-orange-200'
          >
            {technology}
          </span>
        ))}
      </div>
    </header>

    <div className='mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200'>
      This playable demo recreates the Python engine&apos;s rules in the
      browser. You control both teams so you can explore movement, blocking,
      captures, turn changes, and the win condition.
    </div>

    <section className='mb-6 flex items-start gap-4 rounded-xl border border-purple-200 bg-gradient-to-r from-orange-50 to-purple-50 p-5 text-purple-950 dark:border-purple-800 dark:from-orange-950/40 dark:to-purple-950/40 dark:text-purple-100'>
      <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-700 text-white dark:bg-purple-400 dark:text-purple-950'>
        <FaBullseye className='h-5 w-5' />
      </span>
      <div>
        <h2 className='font-semibold'>Objective</h2>
        <p className='mt-1 leading-7'>
          Capture the opposing team&apos;s Beluga. The first player to capture
          it wins the game.
        </p>
      </div>
    </section>

    <AnimalGameDemo />

    <section className='py-16' aria-labelledby='movement-mechanics-heading'>
      <div className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Movement mechanics
        </p>
        <h2 id='movement-mechanics-heading' className='mt-3 text-3xl font-bold'>
          How sliding and jumping differ
        </h2>
      </div>

      <div className='mt-8 grid gap-6 md:grid-cols-2'>
        <article className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-dark/50'>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 dark:bg-blue-400/10 dark:text-blue-200'>
            S
          </div>
          <h3 className='text-xl font-semibold'>Sliding</h3>
          <p className='mt-3 leading-7 text-gray-600 dark:text-gray-300'>
            A sliding piece can move any nonzero distance up to its maximum, but
            cannot slide through other pieces. It may capture an opponent on the
            first occupied square, but it cannot move through that piece.
          </p>
        </article>

        <article className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-dark/50'>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700 dark:bg-purple-400/10 dark:text-purple-200'>
            J
          </div>
          <h3 className='text-xl font-semibold'>Jumping</h3>
          <p className='mt-3 leading-7 text-gray-600 dark:text-gray-300'>
            A jumping piece must travel its full listed distance. Pieces between
            its starting square and destination do not block it, though it still
            cannot land on a friendly piece.
          </p>
        </article>
      </div>

      <p className='mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100'>
        <strong>Note:</strong> A jump of one square and a slide of one square
        produce the same possible destinations because there are no intervening
        squares that could block the move.
      </p>
    </section>

    <section className='grid gap-6 pb-16 md:grid-cols-2 lg:grid-cols-4'>
      {pieceMovementDetails.map((piece) => (
        <article
          key={piece.name}
          className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-dark/50'
        >
          <div className='flex h-40 items-center justify-center bg-gradient-to-br from-orange-100 via-slate-100 to-purple-100 dark:from-orange-950/60 dark:via-slate-900 dark:to-purple-950/60'>
            <div className='relative h-32 w-32'>
              <Image
                src={piece.image}
                alt={`${piece.name} game piece`}
                fill
                sizes='128px'
                className={`object-contain ${piece.imageClassName}`}
              />
            </div>
          </div>
          <div className='p-6'>
            <h2 className='text-lg font-semibold'>{piece.name}</h2>
            <p className='mt-3 leading-7 text-gray-600 dark:text-gray-300'>
              {piece.movement}
            </p>
          </div>
        </article>
      ))}
    </section>

    <section className='grid gap-10 border-t border-gray-200 py-12 dark:border-gray-700 md:grid-cols-[1fr_1.4fr]'>
      <div>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Engineering approach
        </p>
        <h2 className='mt-3 text-3xl font-bold'>
          Rules modeled as reusable behavior
        </h2>
      </div>
      <div className='space-y-5 leading-7 text-gray-600 dark:text-gray-300'>
        <p>
          A shared Piece base class centralizes board boundaries, occupancy
          checks, sliding paths, and jumping destinations. Each concrete piece
          combines those behaviors according to its own movement rules.
        </p>
        <p>
          The AnimalGame controller owns the board, validates turns, performs
          moves and captures, converts algebraic coordinates, and detects a win
          when a Beluga is captured.
        </p>
        <div className='flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'>
          <FaCheck className='h-4 w-4 shrink-0' />
          <p>
            10 unit tests pass across movement, blocking, captures, turns, and
            wins.
          </p>
        </div>
        <PrivateCodeAction />
      </div>
    </section>
  </div>
);

export default AnimalGamePage;
