'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

interface ProjectActionPopoverProps {
  icon: ReactNode;
  label: string;
  dialogLabel: string;
  message: ReactNode;
  actionHref: string;
  actionLabel: string;
  className?: string;
}

const ProjectActionPopover = ({
  icon,
  label,
  dialogLabel,
  message,
  actionHref,
  actionLabel,
  className = '',
}: ProjectActionPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isExternalAction = actionHref.startsWith('http');

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closePopover = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative inline-flex ${className}`}>
      <button
        ref={triggerRef}
        type='button'
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={() => setIsOpen((current) => !current)}
        className='flex items-center gap-2 text-secondary transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'
      >
        {icon}
        <span>{label}</span>
      </button>

      {isOpen && (
        <div
          id={popoverId}
          role='region'
          aria-label={dialogLabel}
          className='absolute bottom-full left-0 z-30 mb-3 w-[min(21rem,calc(100vw-3rem))] rounded-xl border border-gray-200 bg-white p-5 text-left shadow-xl dark:border-gray-700 dark:bg-gray-900'
        >
          <div className='text-sm leading-6 text-gray-700 dark:text-gray-200'>
            {message}
          </div>
          <div className='mt-4 flex items-center gap-4 text-sm font-medium'>
            <Link
              href={actionHref}
              target={isExternalAction ? '_blank' : undefined}
              rel={isExternalAction ? 'noopener noreferrer' : undefined}
              className='rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90'
            >
              {actionLabel}
            </Link>
            <button
              type='button'
              onClick={closePopover}
              className='rounded-sm text-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectActionPopover;
