import { AppConfig, MenuConfig, SocialConfig } from 'config/app';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  NextSeo,
  SocialProfileJsonLd,
} from 'next-seo';
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
  const url = `${AppConfig.WebSiteUrl}${pathname}`;
  const updateDate = updatedAt ? new Date(updatedAt).toISOString() : '';
  const publishedDate = publishedAt ? new Date(publishedAt).toISOString() : '';

  const featuredImage = {
    url: image?.startsWith('http') ? image : `${AppConfig.WebSiteUrl}${image}`,
    alt: title,
  };

  const openGraph = isArticle
    ? {
        type: 'article',
        article: {
          publishedTime: publishedDate,
        },
        images: [featuredImage],
      }
    : {};

  const paths = pathname
    .split('/')
    .slice(1)
    .map(path => ({
      url: `${AppConfig.WebSiteUrl}/${path}`,
      name:
        MenuConfig.find(i => i.lang === lang && i.href.includes(path))?.title ||
        title,
    }));

  return (
    <>
      <NextSeo
        title={`${title} – ${AppConfig.BlogName}`}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          ...openGraph,
        }}
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
      {paths.length && (
        <BreadcrumbJsonLd
          itemListElements={paths.map((item, index) => ({
            position: index + 1,
            item: item.url,
            name: item.name,
          }))}
        />
      )}
      {isArticle && (
        <ArticleJsonLd
          url={url}
          title={title}
          description={description}
          authorName={AppConfig.AuthorName}
          dateModified={updateDate}
          datePublished={publishedDate}
          images={[featuredImage.url]}
          publisherLogo={AppConfig.AuthorAvatar}
          publisherName={AppConfig.AuthorName}
        />
      )}
      <SocialProfileJsonLd
        type="Person"
        name={AppConfig.AuthorName}
        url={AppConfig.WebSiteUrl}
        sameAs={SocialConfig.map(i => i.href)}
      />
    </>
  );
}
