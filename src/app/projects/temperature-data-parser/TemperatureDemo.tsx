'use client';

import { FormEvent, useState } from 'react';

const SAMPLE_INPUT =
  '42,40,37,35,32,29,27,25,24,22,20,18,16,15,14,12,10,8,6,4,2,0,-2,-5';

const parseTemperatures = (value: string) => {
  const entries = value.split(',').map((entry) => entry.trim());

  if (entries.length !== 24) {
    throw new Error(
      `Enter exactly 24 values. You currently have ${entries.length}.`,
    );
  }

  if (entries.some((entry) => !/^-?\d+$/.test(entry))) {
    throw new Error('Use signed whole numbers separated by commas.');
  }

  if (entries.some((entry) => entry.length > 4)) {
    throw new Error('Each value can contain at most four characters.');
  }

  return entries.map(Number).reverse();
};

const TemperatureDemo = () => {
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [output, setOutput] = useState(() => parseTemperatures(SAMPLE_INPUT));
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setOutput(parseTemperatures(input));
      setError('');
    } catch (caughtError) {
      setOutput([]);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'The values could not be processed.',
      );
    }
  };

  const resetDemo = () => {
    setInput(SAMPLE_INPUT);
    setOutput(parseTemperatures(SAMPLE_INPUT));
    setError('');
  };

  return (
    <section
      aria-labelledby='demo-heading'
      className='overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-xl'
    >
      <div className='flex items-center justify-between border-b border-slate-700 px-5 py-3'>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-3 rounded-full bg-red-400' />
          <span className='h-3 w-3 rounded-full bg-amber-300' />
          <span className='h-3 w-3 rounded-full bg-emerald-400' />
        </div>
        <span className='font-mono text-xs uppercase tracking-[0.18em] text-slate-400'>
          Browser recreation
        </span>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6 p-5 sm:p-8'>
        <div>
          <div className='mb-2 flex flex-wrap items-end justify-between gap-2'>
            <label
              id='demo-heading'
              htmlFor='temperature-input'
              className='font-mono text-sm font-semibold text-amber-300'
            >
              Reversed temperature file
            </label>
            <span className='text-xs text-slate-400'>
              24 comma-separated values
            </span>
          </div>
          <textarea
            id='temperature-input'
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-describedby='temperature-help temperature-error'
            rows={4}
            spellCheck={false}
            className='w-full resize-y rounded-lg border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-6 text-slate-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
          />
          <p id='temperature-help' className='mt-2 text-xs text-slate-400'>
            Edit the sample values, then run the same input-to-output behavior
            as the assembly program.
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <button
            type='submit'
            className='cursor-pointer rounded-lg bg-amber-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'
          >
            Parse and restore order
          </button>
          <button
            type='button'
            onClick={resetDemo}
            className='cursor-pointer rounded-lg border border-slate-600 px-5 py-2.5 font-medium text-slate-200 transition hover:border-slate-400 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300'
          >
            Reset sample
          </button>
        </div>

        <div aria-live='polite'>
          <p className='mb-2 font-mono text-sm font-semibold text-emerald-300'>
            Correct chronological order
          </p>
          {error ? (
            <p
              id='temperature-error'
              role='alert'
              className='rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200'
            >
              {error}
            </p>
          ) : (
            <output className='block min-h-16 break-words rounded-lg border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-6 text-slate-200'>
              {output.join(',')}
            </output>
          )}
        </div>
      </form>
    </section>
  );
};

export default TemperatureDemo;
