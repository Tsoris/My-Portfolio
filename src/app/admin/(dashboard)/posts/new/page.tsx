import { savePostAction } from '@/app/admin/actions';
import PostEditor from '@/app/admin/components/PostEditor';

export default function NewPostPage() {
  return (
    <div className='mx-auto max-w-6xl'>
      <header>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Publishing
        </p>
        <h1 className='mt-2 text-3xl font-bold'>New post</h1>
      </header>
      <PostEditor action={savePostAction} />
    </div>
  );
}
