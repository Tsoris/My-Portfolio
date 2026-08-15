import { prisma } from '@/lib/db';
import { isAdminDemoMode } from '@/lib/admin-auth';
import { randomUUID } from 'crypto';

export type PostStatusValue = 'DRAFT' | 'PUBLISHED';

export interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatusValue;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  readAt: Date | null;
  archivedAt: Date | null;
  ip: string | null;
  userAgent: string | null;
  source: string | null;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatusValue;
}

interface DemoStore {
  posts: BlogPostRecord[];
  messages: ContactMessageRecord[];
}

const globalForCms = globalThis as typeof globalThis & {
  devfolioDemoStore?: DemoStore;
};

function createDemoStore(): DemoStore {
  const now = new Date();
  return {
    messages: [
      {
        id: 'demo-message-1',
        name: 'Alex Morgan',
        email: 'alex@example.com',
        message:
          'Would you be interested in discussing a frontend engineering role?',
        createdAt: now,
        readAt: null,
        archivedAt: null,
        ip: null,
        userAgent: 'Local preview',
        source: '/contact',
      },
      {
        id: 'demo-message-2',
        name: 'Jamie Lee',
        email: 'jamie@example.com',
        message:
          'I enjoyed your portfolio and wanted to connect about your recent projects.',
        createdAt: new Date(now.getTime() - 86_400_000),
        readAt: new Date(now.getTime() - 72_000_000),
        archivedAt: null,
        ip: null,
        userAgent: 'Local preview',
        source: '/contact',
      },
    ],
    posts: [
      {
        id: 'demo-post-1',
        title: 'What I learned building my portfolio',
        slug: 'building-my-portfolio',
        excerpt:
          'The engineering and design decisions behind this evolving portfolio.',
        content: `# What I learned building my portfolio

A portfolio is more useful when it demonstrates how you think, not only what you have finished.

## Build around real workflows

The contact form, project collection, and publishing tools all started as small practical needs. Connecting those pieces turned the site into a full-stack application.

## Reliability matters

External services fail independently. Email delivery should still work when optional message storage is unavailable, and the interface should explain failures clearly.

## Keep improving

The strongest portfolio is never truly finished. It becomes a record of better decisions over time.`,
        status: 'PUBLISHED',
        createdAt: new Date(now.getTime() - 604_800_000),
        updatedAt: new Date(now.getTime() - 172_800_000),
        publishedAt: new Date(now.getTime() - 172_800_000),
      },
      {
        id: 'demo-post-2',
        title: 'Designing reliable contact forms',
        slug: 'designing-reliable-contact-forms',
        excerpt:
          'A practical look at validation, email delivery, and resilient storage.',
        content: `# Designing reliable contact forms

A contact form looks simple, but its reliability depends on several independent systems.

## Validate at the boundary

Always validate user input on the server, even when the browser already validates the form.

## Separate required and optional work

Email delivery is required. Database archival is useful, but it should not prevent a visitor from contacting you.`,
        status: 'DRAFT',
        createdAt: new Date(now.getTime() - 86_400_000),
        updatedAt: now,
        publishedAt: null,
      },
    ],
  };
}

function demoStore() {
  globalForCms.devfolioDemoStore ??= createDemoStore();
  return globalForCms.devfolioDemoStore;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export async function listMessages(includeArchived = false) {
  if (isAdminDemoMode()) {
    return demoStore()
      .messages.filter((message) => includeArchived || !message.archivedAt)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  return prisma.contactMessage.findMany({
    where: includeArchived ? undefined : { archivedAt: null },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
}

export async function markMessageRead(id: string) {
  if (isAdminDemoMode()) {
    const message = demoStore().messages.find((item) => item.id === id);
    if (message) {
      message.readAt = new Date();
    }
    return;
  }

  await prisma.contactMessage.update({
    where: { id },
    data: { readAt: new Date() },
  });
}

export async function archiveMessage(id: string) {
  if (isAdminDemoMode()) {
    const message = demoStore().messages.find((item) => item.id === id);
    if (message) {
      message.archivedAt = new Date();
    }
    return;
  }

  await prisma.contactMessage.update({
    where: { id },
    data: { archivedAt: new Date() },
  });
}

export async function listAdminPosts() {
  if (isAdminDemoMode()) {
    return [...demoStore().posts].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    );
  }

  return prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' } });
}

export async function getAdminPost(id: string) {
  if (isAdminDemoMode()) {
    return demoStore().posts.find((post) => post.id === id) ?? null;
  }

  return prisma.blogPost.findUnique({ where: { id } });
}

export async function listPublishedPosts(limit?: number) {
  if (isAdminDemoMode()) {
    return demoStore()
      .posts.filter((post) => post.status === 'PUBLISHED')
      .sort(
        (a, b) =>
          (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0),
      )
      .slice(0, limit);
  }

  try {
    return await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    // Keep the public portfolio available when the optional database is paused.
    // eslint-disable-next-line no-console
    console.error('Published posts are temporarily unavailable:', error);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string) {
  if (isAdminDemoMode()) {
    return (
      demoStore().posts.find(
        (post) => post.slug === slug && post.status === 'PUBLISHED',
      ) ?? null
    );
  }

  try {
    return await prisma.blogPost.findFirst({
      where: { slug, status: 'PUBLISHED' },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Published post is temporarily unavailable:', error);
    return null;
  }
}

export async function savePost(input: BlogPostInput, id?: string) {
  const now = new Date();
  const publishedAt = input.status === 'PUBLISHED' ? now : null;

  if (isAdminDemoMode()) {
    if (id) {
      const existing = demoStore().posts.find((post) => post.id === id);
      if (!existing) {
        throw new Error('Post not found');
      }
      Object.assign(existing, input, {
        updatedAt: now,
        publishedAt: existing.publishedAt ?? publishedAt,
      });
      if (input.status === 'DRAFT') {
        existing.publishedAt = null;
      }
      return existing;
    }

    const created: BlogPostRecord = {
      id: randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now,
      publishedAt,
    };
    demoStore().posts.unshift(created);
    return created;
  }

  if (id) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      throw new Error('Post not found');
    }
    return prisma.blogPost.update({
      where: { id },
      data: {
        ...input,
        publishedAt:
          input.status === 'PUBLISHED' ? (existing.publishedAt ?? now) : null,
      },
    });
  }

  return prisma.blogPost.create({
    data: {
      ...input,
      publishedAt,
    },
  });
}

export async function deletePost(id: string) {
  if (isAdminDemoMode()) {
    const store = demoStore();
    store.posts = store.posts.filter((post) => post.id !== id);
    return;
  }

  await prisma.blogPost.delete({ where: { id } });
}
