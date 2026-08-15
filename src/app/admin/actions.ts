'use server';

import { requireAdmin } from '@/lib/admin-auth';
import {
  archiveMessage,
  deletePost,
  markMessageRead,
  savePost,
  slugify,
} from '@/lib/cms';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const Id = z.string().min(1);
const PostForm = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3).max(160),
  slug: z.string().trim().max(180).optional(),
  excerpt: z.string().trim().min(10).max(320),
  content: z.string().trim().min(20).max(100_000),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export async function markMessageReadAction(formData: FormData) {
  await requireAdmin();
  await markMessageRead(Id.parse(formData.get('id')));
  revalidatePath('/admin/messages');
}

export async function archiveMessageAction(formData: FormData) {
  await requireAdmin();
  await archiveMessage(Id.parse(formData.get('id')));
  revalidatePath('/admin/messages');
}

export async function savePostAction(formData: FormData) {
  await requireAdmin();
  const parsed = PostForm.parse({
    id: formData.get('id') || undefined,
    title: formData.get('title'),
    slug: formData.get('slug') || undefined,
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    status: formData.get('status'),
  });
  const slug = slugify(parsed.slug || parsed.title);

  if (!slug) {
    throw new Error('The title must produce a valid URL slug.');
  }

  const post = await savePost(
    {
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      status: parsed.status,
    },
    parsed.id,
  );

  revalidatePath('/');
  revalidatePath('/blogs');
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath('/admin/posts');
  redirect('/admin/posts?saved=1');
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  await deletePost(Id.parse(formData.get('id')));
  revalidatePath('/');
  revalidatePath('/blogs');
  revalidatePath('/admin/posts');
  redirect('/admin/posts?deleted=1');
}
