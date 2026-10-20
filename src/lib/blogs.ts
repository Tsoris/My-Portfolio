import type { Blog, BlogPost } from '@/types';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src', 'content', 'blogs');

const getMarkdownFiles = () =>
  fs.readdirSync(blogDirectory).filter((fileName) => fileName.endsWith('.md'));

const getRequiredString = (
  data: Record<string, unknown>,
  field: string,
  fileName: string,
) => {
  const value = data[field];

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing ${field} in blog frontmatter: ${fileName}`);
  }

  return value;
};

const getSeries = (data: Record<string, unknown>, fileName: string) => {
  if (data.series === undefined) {
    return undefined;
  }

  if (
    typeof data.series !== 'object' ||
    data.series === null ||
    !('name' in data.series) ||
    typeof data.series.name !== 'string' ||
    data.series.name.trim() === '' ||
    !('order' in data.series) ||
    typeof data.series.order !== 'number' ||
    !Number.isInteger(data.series.order) ||
    data.series.order < 1
  ) {
    throw new Error(`Invalid series in blog frontmatter: ${fileName}`);
  }

  return {
    name: data.series.name.trim(),
    position: data.series.order,
    total: 0,
  };
};

const readBlogFile = (fileName: string): BlogPost | undefined => {
  const slug = fileName.replace(/\.md$/, '');
  const filePath = path.join(blogDirectory, fileName);
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));

  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    throw new Error(`Invalid draft flag in blog frontmatter: ${fileName}`);
  }

  if (data.draft === true) {
    return undefined;
  }
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === 'string')
    : [];

  return {
    id: slug,
    slug,
    title: getRequiredString(data, 'title', fileName),
    excerpt: getRequiredString(data, 'excerpt', fileName),
    date: getRequiredString(data, 'date', fileName),
    readTime: getRequiredString(data, 'readTime', fileName),
    tags,
    series: getSeries(data, fileName),
    content,
  };
};

const getBlogPosts = (): BlogPost[] => {
  const posts = getMarkdownFiles()
    .map(readBlogFile)
    .filter((post): post is BlogPost => post !== undefined);
  const seriesPosts = new Map<string, BlogPost[]>();

  posts.forEach((post) => {
    if (post.series) {
      const members = seriesPosts.get(post.series.name) ?? [];
      members.push(post);
      seriesPosts.set(post.series.name, members);
    }
  });

  const positions = new Map<string, number>();
  seriesPosts.forEach((members) => {
    // Frontmatter order determines sequence; only visible posts get numbers.
    members.sort(
      (a, b) =>
        a.series!.position - b.series!.position || a.slug.localeCompare(b.slug),
    );
    members.forEach((post, index) => positions.set(post.slug, index + 1));
  });

  return posts.map((post) => ({
    ...post,
    series: post.series
      ? {
          ...post.series,
          position: positions.get(post.slug)!,
          total: seriesPosts.get(post.series.name)!.length,
        }
      : undefined,
  }));
};

export const getAllBlogs = (): Blog[] =>
  getBlogPosts()
    .map(({ content: _content, ...blog }) => blog)
    .sort((a, b) => b.date.localeCompare(a.date));

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return getBlogPosts().find((blog) => blog.slug === slug);
};
