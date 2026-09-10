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

const readBlogFile = (fileName: string): BlogPost => {
  const slug = fileName.replace(/\.md$/, '');
  const filePath = path.join(blogDirectory, fileName);
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
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
  const posts = getMarkdownFiles().map(readBlogFile);
  const seriesTotals = new Map<string, number>();

  posts.forEach(({ series }) => {
    if (series) {
      seriesTotals.set(series.name, (seriesTotals.get(series.name) ?? 0) + 1);
    }
  });

  return posts.map((post) => ({
    ...post,
    series: post.series
      ? {
          ...post.series,
          total: seriesTotals.get(post.series.name) ?? 1,
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
