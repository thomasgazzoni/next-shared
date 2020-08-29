import NextLink from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import cx from 'classnames';

export default function Link({
  href,
  title,
  children,
  className,
  hrefAs,
  ...others
}: AnchorHTMLAttributes<{}> & {
  hrefAs?: string;
}) {
  const isInternalLink =
    !!href && (href.startsWith('/') || href.startsWith('#'));

  const classes = cx(
    'hover:underline',
    className?.includes('text-default') ? '' : 'text-primary',
    className,
  );

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref as={hrefAs}>
        <a title={title} className={classes} {...others}>
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <a href={href} title={title} className={classes} target="blank" {...others}>
      {children}
    </a>
  );
}
