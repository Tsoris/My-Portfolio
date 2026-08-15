'use client';

import type { BlogPostRecord, PostStatusValue } from '@/lib/cms';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostEditorProps {
  action: (formData: FormData) => void | Promise<void>;
  post?: BlogPostRecord | null;
}

const starterContent = `# Your article title

Start writing your article here.

## A useful section

Markdown supports **bold text**, links, lists, code, and more.`;

export default function PostEditor({ action, post }: PostEditorProps) {
  const [content, setContent] = useState(post?.content ?? starterContent);
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [status, setStatus] = useState<PostStatusValue>(
    post?.status ?? 'DRAFT',
  );

  return (
    <form action={action} className='mt-8 space-y-6'>
      {post && <input type='hidden' name='id' value={post.id} />}
      <div className='grid gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-[2fr_1fr]'>
        <label className='grid gap-2 font-medium'>
          Title
          <input
            required
            minLength={3}
            maxLength={160}
            name='title'
            defaultValue={post?.title}
            placeholder='A clear, specific title'
            className='rounded-lg border border-gray-300 bg-transparent px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700'
          />
        </label>
        <label className='grid gap-2 font-medium'>
          Status
          <select
            name='status'
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as PostStatusValue)
            }
            className='rounded-lg border border-gray-300 bg-transparent px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700'
          >
            <option value='DRAFT'>Draft</option>
            <option value='PUBLISHED'>Published</option>
          </select>
        </label>
        <label className='grid gap-2 font-medium md:col-span-2'>
          Slug
          <input
            name='slug'
            defaultValue={post?.slug}
            placeholder='generated-from-the-title'
            className='rounded-lg border border-gray-300 bg-transparent px-3 py-2 font-mono text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700'
          />
        </label>
        <label className='grid gap-2 font-medium md:col-span-2'>
          Excerpt
          <textarea
            required
            minLength={10}
            maxLength={320}
            name='excerpt'
            defaultValue={post?.excerpt}
            rows={3}
            placeholder='A short summary shown on the blog listing.'
            className='resize-y rounded-lg border border-gray-300 bg-transparent px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700'
          />
        </label>
      </div>

      <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
        <div className='flex border-b border-gray-200 dark:border-gray-800'>
          {(['write', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              type='button'
              onClick={() => setMode(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize ${
                mode === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {mode === 'write' ? (
          <textarea
            required
            minLength={20}
            name='content'
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className='min-h-[430px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 outline-none'
            aria-label='Post content in Markdown'
          />
        ) : (
          <div className='blog-content min-h-[430px] p-6'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className='flex items-center justify-between gap-4'>
        <p className='text-sm text-gray-500'>
          {status === 'PUBLISHED'
            ? 'Saving will make this post public.'
            : 'This post will remain private.'}
        </p>
        <button
          type='submit'
          className='rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary/90'
        >
          {post ? 'Save changes' : 'Create post'}
        </button>
      </div>
    </form>
  );
}
