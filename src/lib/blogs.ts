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
    content,
  };
};

export const getAllBlogs = (): Blog[] =>
  getMarkdownFiles()
    .map(readBlogFile)
    .map(({ content: _content, ...blog }) => blog)
    .sort((a, b) => b.date.localeCompare(a.date));

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  const fileName = getMarkdownFiles().find(
    (candidate) => candidate.replace(/\.md$/, '') === slug,
  );

  return fileName ? readBlogFile(fileName) : undefined;
};
