import { MenuConfig } from 'config/app';
import { useRouter } from 'next/router';
import React from 'react';
import Link from './Link';

interface IProps {
  title: string;
}

export default function Breadcrumb({ title }: IProps) {
  const { pathname } = useRouter();

  const subPages = pathname.split('/').filter(i => !!i);
  const sections = subPages
    .slice(0, subPages.length - 1)
    .map(path => `/${path}`);

  return (
    subPages.length > 1 && (
      <nav className="py-3 rounded font-sans w-full">
        <ol className="list-reset flex text-grey-dark">
          <li>
            <Link className="text-default" href="/">
              Home
            </Link>
          </li>
          {sections.map(path => (
            <>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li key={path}>
                <Link className="text-default" href={path}>
                  {MenuConfig.find(i => i.href === path)?.title}
                </Link>
              </li>
            </>
          ))}
        </ol>
      </nav>
    )
  );
}
