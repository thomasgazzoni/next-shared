import { MenuConfig } from 'config/app';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import Link from './Link';
import capitalize from '../utils/capitalize';

interface IProps {
  title: string;
  exclude?: string[];
}

export default function Breadcrumb({ title, exclude = [] }: IProps) {
  const { pathname } = useRouter();

  const subPages = pathname.split('/').filter(i => !!i);
  const sections = subPages
    .slice(0, subPages.length - 1)
    .filter(path => !exclude.includes(path))
    .map(path => `/${path}`);

  return (
    subPages.length > 1 && (
      <nav className="py-3 rounded font-sans">
        <ol className="list-reset flex text-grey-dark">
          <li>
            <Link className="text-default" href="/">
              Home
            </Link>
          </li>
          {sections.map(path => (
            <Fragment key={path}>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link className="text-default" href={path}>
                  {MenuConfig.find(i => i.href === path)?.title ||
                    capitalize(path.replace('/', ''))}
                </Link>
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
    )
  );
}
