'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

interface BlogImageProps {
  src: string;
  alt: string;
}

const BlogImage = ({ src, alt }: BlogImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type='button'
        onClick={() => setIsOpen(true)}
        className='my-8 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'
        aria-label={`Expand image: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading='lazy'
          className='h-auto w-full transition-transform duration-300 hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none'
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            role='dialog'
            aria-modal='true'
            aria-label={`Expanded image: ${alt}`}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8'
            onClick={() => setIsOpen(false)}
          >
            <button
              ref={closeRef}
              type='button'
              onClick={() => setIsOpen(false)}
              className='absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-6 sm:right-6'
              aria-label='Close expanded image'
            >
              <FaTimes aria-hidden='true' />
            </button>

            <figure className='flex h-full w-full max-w-7xl flex-col items-center justify-center gap-3'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className='min-h-0 w-full flex-1 rounded-xl object-contain shadow-2xl'
              />
              <figcaption className='max-w-3xl text-center text-sm leading-6 text-zinc-200'>
                {alt}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
};

export default BlogImage;
