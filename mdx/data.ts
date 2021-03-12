import fs from 'fs';
import { parseMDXFrontMatter } from './parser';
import { MDXFrontMatter } from './types';
import globby from 'globby';
import matter from 'gray-matter';

export async function getDirectoryFrontMatter(
  fields: Array<keyof MDXFrontMatter>,
  ...path: string[]
) {
  const dirPath = `${process.cwd()}/${path.join('/')}`;

  const pages = await globby([`${dirPath}/**/*.mdx`]);
  const posts: MDXFrontMatter[] = [];

  pages.forEach(fileName => {
    posts.push(getFileFrontMatter(fields, fileName));
  });

  return posts;
}

export function getFileFrontMatter(
  fields: Array<keyof MDXFrontMatter>,
  fileName: string,
) {
  const fileContents = fs.readFileSync(fileName, 'utf8');
  const frontMatter = matter(fileContents);

  const data: Partial<MDXFrontMatter> = {
    excerpt: frontMatter.excerpt,
    lang: frontMatter.language,
    __resourcePath: fileName.substring(fileName.indexOf('/pages') + 7),
    ...frontMatter.data,
  };

  const result = parseMDXFrontMatter(data, frontMatter.content);

  Object.keys(result).forEach(fieldName => {
    if (!fields.includes(fieldName as any)) {
      delete result[fieldName];
    }
  });

  return result;
}
