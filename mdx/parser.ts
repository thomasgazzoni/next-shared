import { MDXFrontMatter } from './types';

export function parseMDXFrontMatter<T extends MDXFrontMatter>(
  meta: T,
  content: string,
): T {
  const readingTime = require('reading-time')(content);
  return {
    ...meta,
    slug:
      meta.slug || meta.__resourcePath.split('/').pop().replace(/.mdx/g, ''),
    wordCount: content.split(/\s+/gu).length,
    readingTime,
  };
}
