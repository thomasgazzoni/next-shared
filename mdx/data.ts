import fs from 'fs';
import { parseMDXFrontMatter } from './parser';
import { readMDXFrontMatter } from './reader';
import { MDXFrontMatter } from './types';

export function getDirectoryFrontMatter(
  fields: Array<keyof MDXFrontMatter>,
  ...path: string[]
) {
  const fileDir = `${process.cwd()}/${path.join('/')}`;
  const files = fs.readdirSync(fileDir);
  const list: MDXFrontMatter[] = [];
  files.forEach(fileName => {
    list.push(getFileFrontMatter(fields, ...path, fileName));
  });
  return list;
}

export function getFileFrontMatter(
  fields: Array<keyof MDXFrontMatter>,
  ...path: string[]
) {
  const fileName = `${process.cwd()}/${path.join('/')}`;
  const fileContents = fs.readFileSync(fileName, 'utf8');
  const frontMatter = readMDXFrontMatter(fileContents) as MDXFrontMatter;
  frontMatter.__resourcePath = fileName;
  const meta = parseMDXFrontMatter(frontMatter, fileContents);
  const result: any = Object.keys(meta).reduce(
    (acc, field) => ({
      ...acc,
      [field]: fields.includes(field as any) ? meta[field] : undefined,
    }),
    {},
  );
  return result;
}
