import { savePostAction } from '@/app/admin/actions';
import PostEditor from '@/app/admin/components/PostEditor';
import { getAdminPost } from '@/lib/cms';
import { notFound } from 'next/navigation';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAdminPost(id);
  if (!post) {
    notFound();
  }

  return (
    <div className='mx-auto max-w-6xl'>
      <header>
        <p className='text-sm font-semibold uppercase tracking-[0.18em] text-primary'>
          Publishing
        </p>
        <h1 className='mt-2 text-3xl font-bold'>Edit post</h1>
      </header>
      <PostEditor action={savePostAction} post={post} />
    </div>
  );
}
