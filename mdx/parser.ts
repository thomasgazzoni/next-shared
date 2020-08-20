import { MDXFrontMatter } from './types';

export function parseMDXFrontMatter<T extends MDXFrontMatter>(
  meta: T,
  content: string,
): T {
  const readingTime = require('reading-time')(content);
  const filePath = meta.__resourcePath.replace(/.mdx/g, '');

  return {
    ...meta,
    slug: meta.slug || filePath.split('/').pop(),
    link: `/${filePath}`,
    wordCount: content.split(/\s+/gu).length,
    readingTime,
  };
}
