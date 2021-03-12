import { MDXFrontMatter } from './types';

export function parseMDXFrontMatter(
  meta: Partial<MDXFrontMatter>,
  content: string,
): MDXFrontMatter {
  const readingTime = require('reading-time')(content);
  const filePath = meta.__resourcePath.replace(/.mdx/g, '');

  return {
    ...meta,
    slug: meta.slug || filePath.split('/').pop(),
    link: `/${filePath}`,
    wordCount: content.split(/\s+/gu).length,
    readingTime,
  } as MDXFrontMatter;
}
