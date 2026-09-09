'use client';

import { FormEvent, useState } from 'react';

interface Entry {
  key: string;
  value: string;
}
interface OpenSlot {
  entry: Entry | null;
  tombstone: boolean;
}
interface OpenState {
  capacity: number;
  buckets: OpenSlot[];
  size: number;
  lastProbe: number[];
  resized: boolean;
}
interface ChainState {
  capacity: number;
  buckets: Entry[][];
  size: number;
  lastBucket: number | null;
  resized: boolean;
}

const INITIAL_CAPACITY = 11;
const SAMPLE_ENTRIES: Entry[] = [
  { key: 'cat', value: '12' },
  { key: 'act', value: '24' },
  { key: 'tac', value: '36' },
];

const hashKey = (key: string) =>
  Array.from(key).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );

const isPrime = (value: number) => {
  if (value < 2) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;
  for (let factor = 3; factor * factor <= value; factor += 2) {
    if (value % factor === 0) return false;
  }
  return true;
};

const nextPrime = (value: number) => {
  let candidate = Math.max(2, value);
  while (!isPrime(candidate)) candidate += 1;
  return candidate;
};

const createOpenState = (capacity = INITIAL_CAPACITY): OpenState => ({
  capacity,
  buckets: Array.from({ length: capacity }, () => ({
    entry: null,
    tombstone: false,
  })),
  size: 0,
  lastProbe: [],
  resized: false,
});

const insertOpenWithoutResize = (state: OpenState, entry: Entry): OpenState => {
  const buckets = state.buckets.map((bucket) => ({
    entry: bucket.entry ? { ...bucket.entry } : null,
    tombstone: bucket.tombstone,
  }));
  const start = hashKey(entry.key) % state.capacity;
  const probes: number[] = [];
  let firstTombstone: number | null = null;

  for (let step = 0; step < state.capacity; step += 1) {
    const index = (start + step * step) % state.capacity;
    if (probes.includes(index)) continue;
    probes.push(index);
    const bucket = buckets[index];

    if (bucket.entry && !bucket.tombstone && bucket.entry.key === entry.key) {
      bucket.entry = entry;
      return { ...state, buckets, lastProbe: probes };
    }
    if (bucket.tombstone && firstTombstone === null) firstTombstone = index;
    if (!bucket.entry) {
      const destination = firstTombstone ?? index;
      buckets[destination] = { entry, tombstone: false };
      return { ...state, buckets, size: state.size + 1, lastProbe: probes };
    }
  }

  if (firstTombstone !== null) {
    buckets[firstTombstone] = { entry, tombstone: false };
    return { ...state, buckets, size: state.size + 1, lastProbe: probes };
  }
  return { ...state, lastProbe: probes };
};

const resizeOpen = (state: OpenState, requestedCapacity: number) => {
  let resizedState = createOpenState(nextPrime(requestedCapacity));
  state.buckets.forEach((bucket) => {
    if (bucket.entry && !bucket.tombstone) {
      resizedState = insertOpenWithoutResize(resizedState, bucket.entry);
    }
  });
  return { ...resizedState, lastProbe: [], resized: true };
};

const putOpen = (state: OpenState, entry: Entry) => {
  const workingState =
    state.size / state.capacity >= 0.5
      ? resizeOpen(state, state.capacity * 2)
      : { ...state, resized: false };
  return insertOpenWithoutResize(workingState, entry);
};

const removeOpen = (state: OpenState, key: string): OpenState => {
  const buckets = state.buckets.map((bucket) => ({
    entry: bucket.entry ? { ...bucket.entry } : null,
    tombstone: bucket.tombstone,
  }));
  const start = hashKey(key) % state.capacity;
  const probes: number[] = [];

  for (let step = 0; step < state.capacity; step += 1) {
    const index = (start + step * step) % state.capacity;
    if (probes.includes(index)) continue;
    probes.push(index);
    const bucket = buckets[index];
    if (!bucket.entry) break;
    if (!bucket.tombstone && bucket.entry.key === key) {
      bucket.tombstone = true;
      return {
        ...state,
        buckets,
        size: state.size - 1,
        lastProbe: probes,
        resized: false,
      };
    }
  }
  return { ...state, lastProbe: probes, resized: false };
};

const createChainState = (capacity = INITIAL_CAPACITY): ChainState => ({
  capacity,
  buckets: Array.from({ length: capacity }, () => []),
  size: 0,
  lastBucket: null,
  resized: false,
});

const insertChainWithoutResize = (
  state: ChainState,
  entry: Entry,
): ChainState => {
  const buckets = state.buckets.map((bucket) =>
    bucket.map((existingEntry) => ({ ...existingEntry })),
  );
  const index = hashKey(entry.key) % state.capacity;
  const existingIndex = buckets[index].findIndex(
    (existingEntry) => existingEntry.key === entry.key,
  );
  if (existingIndex >= 0) {
    buckets[index][existingIndex] = entry;
    return { ...state, buckets, lastBucket: index };
  }
  buckets[index].unshift(entry);
  return { ...state, buckets, size: state.size + 1, lastBucket: index };
};

const resizeChain = (state: ChainState, requestedCapacity: number) => {
  let resizedState = createChainState(nextPrime(requestedCapacity));
  state.buckets.flat().forEach((entry) => {
    resizedState = insertChainWithoutResize(resizedState, entry);
  });
  return { ...resizedState, lastBucket: null, resized: true };
};

const putChain = (state: ChainState, entry: Entry) => {
  const workingState =
    state.size / state.capacity >= 1
      ? resizeChain(state, state.capacity * 2)
      : { ...state, resized: false };
  return insertChainWithoutResize(workingState, entry);
};

const removeChain = (state: ChainState, key: string): ChainState => {
  const index = hashKey(key) % state.capacity;
  const buckets = state.buckets.map((bucket) =>
    bucket.map((entry) => ({ ...entry })),
  );
  const previousLength = buckets[index].length;
  buckets[index] = buckets[index].filter((entry) => entry.key !== key);
  return {
    ...state,
    buckets,
    size:
      buckets[index].length === previousLength ? state.size : state.size - 1,
    lastBucket: index,
    resized: false,
  };
};

const createSampleStates = () => {
  let open = createOpenState();
  let chain = createChainState();
  SAMPLE_ENTRIES.forEach((entry) => {
    open = putOpen(open, entry);
    chain = putChain(chain, entry);
  });
  return { open, chain };
};

const LoadMeter = ({ size, capacity }: { size: number; capacity: number }) => {
  const load = size / capacity;
  return (
    <div>
      <div className='mb-1 flex justify-between text-xs text-slate-400'>
        <span>Load factor</span>
        <span>{load.toFixed(2)}</span>
      </div>
      <div className='h-2 overflow-hidden rounded-full bg-slate-800'>
        <div
          className='h-full rounded-full bg-cyan-400 transition-[width]'
          style={{ width: `${Math.min(load * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};

const HashMapDemo = () => {
  const [sampleStates] = useState(createSampleStates);
  const [openState, setOpenState] = useState(sampleStates.open);
  const [chainState, setChainState] = useState(sampleStates.chain);
  const [keyInput, setKeyInput] = useState('dog');
  const [valueInput, setValueInput] = useState('48');
  const [message, setMessage] = useState(
    'The sample anagrams hash to the same starting bucket.',
  );

  const handleInsert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = keyInput.trim();
    if (!key) return setMessage('Enter a key before inserting.');
    const entry = { key, value: valueInput || '—' };
    const nextOpenState = putOpen(openState, entry);
    const nextChainState = putChain(chainState, entry);
    const hashValue = hashKey(key);
    setOpenState(nextOpenState);
    setChainState(nextChainState);
    setMessage(
      `hash(“${key}”) = ${hashValue}. Open addressing: ${hashValue} % ${nextOpenState.capacity} = ${hashValue % nextOpenState.capacity}. Separate chaining: ${hashValue} % ${nextChainState.capacity} = ${hashValue % nextChainState.capacity}.`,
    );
  };

  const handleRemove = () => {
    const key = keyInput.trim();
    if (!key) return setMessage('Enter the key you want to remove.');
    setOpenState((state) => removeOpen(state, key));
    setChainState((state) => removeChain(state, key));
    setMessage(
      `Removed “${key}” when present. Open addressing leaves a tombstone.`,
    );
  };

  const resetSample = () => {
    const sample = createSampleStates();
    setOpenState(sample.open);
    setChainState(sample.chain);
    setKeyInput('dog');
    setValueInput('48');
    setMessage('The sample anagrams hash to the same starting bucket.');
  };

  const clearMaps = () => {
    setOpenState(createOpenState());
    setChainState(createChainState());
    setMessage('Both maps are empty and ready for new entries.');
  };

  return (
    <section
      aria-labelledby='hash-map-demo-heading'
      className='overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-xl'
    >
      <div className='border-b border-slate-700 p-5 sm:p-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300'>
          Interactive browser recreation
        </p>
        <h2 id='hash-map-demo-heading' className='mt-2 text-2xl font-bold'>
          One operation, two collision strategies
        </h2>
        <form
          onSubmit={handleInsert}
          className='mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]'
        >
          <label className='grid gap-1.5 text-sm'>
            <span className='text-slate-300'>Key</span>
            <input
              value={keyInput}
              onChange={(event) => setKeyInput(event.target.value)}
              className='rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
            />
          </label>
          <label className='grid gap-1.5 text-sm'>
            <span className='text-slate-300'>Value</span>
            <input
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
              className='rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
            />
          </label>
          <button
            type='submit'
            className='mt-auto cursor-pointer rounded-lg bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300'
          >
            Insert
          </button>
          <button
            type='button'
            onClick={handleRemove}
            className='mt-auto cursor-pointer rounded-lg border border-slate-600 px-5 py-2.5 font-medium transition hover:border-red-300 hover:bg-red-400/10 hover:text-red-200'
          >
            Remove
          </button>
        </form>
        <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
          <p aria-live='polite' className='text-sm leading-6 text-slate-300'>
            {message}
          </p>
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={resetSample}
              className='cursor-pointer text-sm text-cyan-300 hover:text-cyan-200'
            >
              Reset sample
            </button>
            <button
              type='button'
              onClick={clearMaps}
              className='cursor-pointer text-sm text-slate-400 hover:text-white'
            >
              Clear maps
            </button>
          </div>
        </div>
      </div>

      <div className='grid lg:grid-cols-2'>
        <article className='border-b border-slate-700 p-5 sm:p-8 lg:border-r lg:border-b-0'>
          <MapHeading
            eyebrow='Open addressing'
            title='Quadratic probing'
            threshold='resize at 0.50'
            size={openState.size}
            capacity={openState.capacity}
          />
          {openState.resized && (
            <p className='mt-3 text-xs text-emerald-300'>
              Resized to the next prime capacity and rehashed active entries.
            </p>
          )}
          <ol className='mt-5 max-h-[32rem] space-y-2 overflow-y-auto pr-1 font-mono text-xs'>
            {openState.buckets.map((bucket, index) => (
              <li
                key={index}
                className={`grid min-h-11 grid-cols-[2.25rem_1fr] items-center rounded-lg border ${openState.lastProbe.includes(index) ? 'border-cyan-400/70 bg-cyan-400/10' : 'border-slate-700 bg-slate-900'}`}
              >
                <span className='text-center text-slate-500'>{index}</span>
                <span className='border-l border-slate-700 px-3 py-2'>
                  {bucket.tombstone ? (
                    <span className='text-amber-300'>TOMBSTONE</span>
                  ) : bucket.entry ? (
                    <>
                      <span className='text-cyan-200'>{bucket.entry.key}</span>
                      <span className='text-slate-500'> : </span>
                      {bucket.entry.value}
                    </>
                  ) : (
                    <span className='text-slate-600'>empty</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className='mt-3 text-xs text-slate-400'>
            Highlighted rows show the latest probe path.
          </p>
        </article>

        <article className='p-5 sm:p-8'>
          <MapHeading
            eyebrow='Separate chaining'
            title='Linked-list buckets'
            threshold='resize at 1.00'
            size={chainState.size}
            capacity={chainState.capacity}
          />
          {chainState.resized && (
            <p className='mt-3 text-xs text-emerald-300'>
              Resized to the next prime capacity and rehashed every chain.
            </p>
          )}
          <ol className='mt-5 max-h-[32rem] space-y-2 overflow-y-auto pr-1 font-mono text-xs'>
            {chainState.buckets.map((bucket, index) => (
              <li
                key={index}
                className={`grid min-h-11 grid-cols-[2.25rem_1fr] items-center rounded-lg border ${chainState.lastBucket === index ? 'border-indigo-400/70 bg-indigo-400/10' : 'border-slate-700 bg-slate-900'}`}
              >
                <span className='text-center text-slate-500'>{index}</span>
                <span className='flex flex-wrap items-center gap-1.5 border-l border-slate-700 px-3 py-2'>
                  {bucket.length ? (
                    bucket.map((entry, entryIndex) => (
                      <span key={entry.key} className='contents'>
                        {entryIndex > 0 && (
                          <span className='text-slate-500'>→</span>
                        )}
                        <span className='rounded bg-indigo-300/10 px-2 py-1 text-indigo-100'>
                          {entry.key}: {entry.value}
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className='text-slate-600'>empty chain</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className='mt-3 text-xs text-slate-400'>
            The highlighted row is the bucket used by the latest operation.
          </p>
        </article>
      </div>
    </section>
  );
};

const MapHeading = ({
  eyebrow,
  title,
  threshold,
  size,
  capacity,
}: {
  eyebrow: string;
  title: string;
  threshold: string;
  size: number;
  capacity: number;
}) => (
  <>
    <div className='flex items-start justify-between gap-4'>
      <div>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300'>
          {eyebrow}
        </p>
        <h3 className='mt-1 text-xl font-bold'>{title}</h3>
      </div>
      <span className='rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200'>
        {threshold}
      </span>
    </div>
    <div className='mt-5 grid grid-cols-2 gap-4 text-sm'>
      <p>
        <span className='text-slate-400'>Size</span> <strong>{size}</strong>
      </p>
      <p>
        <span className='text-slate-400'>Capacity</span>{' '}
        <strong>{capacity}</strong>
      </p>
    </div>
    <div className='mt-3'>
      <LoadMeter size={size} capacity={capacity} />
    </div>
  </>
);

export default HashMapDemo;
