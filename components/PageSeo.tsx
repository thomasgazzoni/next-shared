import { AppConfig, MenuConfig, SocialConfig } from 'config/app';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  NextSeo,
  SocialProfileJsonLd,
} from 'next-seo';
import { Twitter, OpenGraph } from 'next-seo/lib/types';
import React from 'react';

interface IProps {
  isArticle?: boolean;
  title: string;
  description: string;
  updatedAt?: string;
  publishedAt?: string;
  pathname: string;
  image?: string;
  lang?: string;
  relAlternate?: string[];
}

export default function PageSeo({
  isArticle = false,
  title,
  description,
  updatedAt,
  publishedAt,
  pathname,
  image,
  lang = 'en',
  relAlternate = [],
}: IProps) {
  const url = `${AppConfig.WebSiteUrl}${pathname}/`;
  const modifiedDate = updatedAt ? new Date(updatedAt).toISOString() : '';
  const publishedDate = publishedAt ? new Date(publishedAt).toISOString() : '';

  const featuredImage = {
    url: image?.startsWith('http') ? image : `${AppConfig.WebSiteUrl}/${image}`,
    alt: title,
  };

  const openGraph: OpenGraph = isArticle
    ? {
        type: 'article',
        article: {
          modifiedTime: modifiedDate,
          publishedTime: publishedDate,
          authors: [AppConfig.AuthorName],
        },
        images: [featuredImage],
      }
    : {
        type: 'website',
      };

  const twitterGraph: Twitter = isArticle
    ? {
        cardType: 'summary',
      }
    : {};

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        ...openGraph,
      }}
      robotsProps={{
        maxSnippet: -1,
        maxImagePreview: 'large',
        maxVideoPreview: -1,
      }}
      additionalMetaTags={[
        { httpEquiv: 'content-type', content: 'text/html; charset=utf-8' },
        {
          httpEquiv: 'x-ua-compatible',
          content: 'IE=edge',
        },
      ]}
      twitter={twitterGraph}
      languageAlternates={[
        { hrefLang: lang, href: url },
        ...relAlternate
          .map(i => i?.split('|'))
          .filter(Boolean)
          .map(([lang, href]) => ({
            hrefLang: lang,
            href: `${AppConfig.WebSiteUrl}${href}`,
          })),
      ]}
    />
  );
}
