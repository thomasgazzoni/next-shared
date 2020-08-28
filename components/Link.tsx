import NextLink from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import cx from 'classnames';

export default function Link({
  href,
  title,
  children,
  className,
  hrefAs,
  noStyle,
  ...others
}: AnchorHTMLAttributes<{}> & {
  hrefAs?: string;
  noStyle?: boolean;
}) {
  const isInternalLink =
    !!href && (href.startsWith('/') || href.startsWith('#'));

  const classes = cx(
    !noStyle && 'text-primary',
    !noStyle && 'hover:underline',
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
    <a href={href} title={title} className={classes} {...others}>
      {children}
    </a>
  );
}
