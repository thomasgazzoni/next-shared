import fs from 'fs';
import { parseMDXFrontMatter } from './parser';
import { readMDXFrontMatter } from './reader';
import { MDXFrontMatter } from './types';
import globby from 'globby';

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
  const frontMatter = readMDXFrontMatter(fileContents) as MDXFrontMatter;
  frontMatter.__resourcePath = fileName.substring(
    fileName.indexOf('/pages') + 7,
  );

  const meta = parseMDXFrontMatter(frontMatter, fileContents);

  Object.keys(meta).forEach(fieldName => {
    if (!fields.includes(fieldName as any)) {
      delete meta[fieldName];
    }
  });

  return meta;
}
