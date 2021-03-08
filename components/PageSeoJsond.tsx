import { AppConfig, MenuConfig, SocialConfig } from 'config/app';
import React from 'react';
import { stripHtml } from 'string-strip-html';
import { MDXFrontMatter, MDXQuestion } from '../mdx/types';
import Head from 'next/head';
import slugify from '../utils/slugify';

function makeArticleSchema(url: string, post: MDXFrontMatter) {
  const description = stripHtml(post?.excerpt || '').result;
  const headline = stripHtml(post?.title || '').result;
  const dateModified = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : '';
  const datePublished = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : '';

  return {
    '@type': 'Article',
    '@id': `${url}/#article`,
    isPartOf: {
      '@id': `${url}/#webpage`,
    },
    author: {
      '@id': `${url}/#person`,
    },
    publisher: { '@id': `${url}/#organization` },
    headline: headline,
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@id': `${url}/#webpage`,
    },
    commentCount: 0,
    image: {
      '@id': `${url}/#primaryimage`,
    },
    articleSection: 'Exchange Reviews',
    inLanguage: 'en-US',
    // potentialAction: [
    //   {
    //     '@type': 'CommentAction',
    //     name: 'Comment',
    //     target: [`${url}/nexo-review/#respond`],
    //   },
    // ],
  };
}

function makeJobSchema(job) {
  const description = stripHtml(job.description).result;
  return {
    '@type': 'JobPosting',
    datePosted: job.postedAt,
    description: description,
    title: job.title,
    image: job.company.logo,
    workHours: 'Flexible',
    // validThrough: addDaysToDate(job.postedAt, 60),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company.name,
      sameAs: job.company.website || null,
      logo: job.company.logo,
    },
  };
}

function makeReviewSchema(data) {
  return {
    '@type': 'Product',
    image: 'http://www.example.com/iphone-case.jpg',
    name: 'The Catcher in the Rye',
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4',
      },
      name: 'iPhone 6 Case Plus',
      author: {
        '@type': 'Person',
        name: 'Linus Torvalds',
      },
      datePublished: '2016-04-04',
      reviewBody:
        'I loved this case, it is strurdy and lightweight. Only issue is that it smudges.',
      publisher: {
        '@type': 'Organization',
        name: 'iPhone 6 Cases Inc.',
      },
    },
  };
}

function makeWebPageSchema(url: string, title: string, desc: string) {
  const description = stripHtml(desc).result;
  return {
    '@type': 'WebPage',
    '@id': `${url}/#webpage`,
    url: `${url}/`,
    inLanguage: 'en-US',
    name: title,
    isPartOf: { '@id': `${url}/#website` },
    primaryImageOfPage: {
      '@id': `${url}/#primaryimage`,
    },
    datePublished: '2020-09-10T05:07:39+00:00',
    dateModified: '2021-01-01T19:05:27+00:00',
    description: description || '',
    breadcrumb: { '@id': `${url}/#breadcrumb` },
    potentialAction: [{ '@type': 'ReadAction', target: [`${url}/`] }],
  };
}

function makeBreadcrumbSchema(url: string, title: string, pathname: string) {
  const paths = pathname.split('/').filter(Boolean);
  paths.pop();

  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'WebPage',
          '@id': `${AppConfig.WebSiteUrl}/`,
          url: `${AppConfig.WebSiteUrl}/`,
          name: 'Home',
        },
      },
      ...paths.map((path, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          '@id': `${AppConfig.WebSiteUrl}/${path}`,
          url: `${AppConfig.WebSiteUrl}/${path}`,
          name: MenuConfig.find(i => i.href.includes(path))?.title || '',
        },
      })),
      {
        '@type': 'ListItem',
        position: paths.length,
        item: {
          '@type': 'WebPage',
          '@id': `${url}/`,
          url: `${url}/`,
          name: title,
        },
      },
    ],
  };
}

function makeFaqSchema(url: string, questions: MDXQuestion[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}/#faq`,
    isPartOf: { '@id': `${url}/#website` },
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@id': `${url}/#webpage`,
    },
    mainEntity: questions.map((item, index) => ({
      '@type': 'Question',
      '@id': `${url}/#${slugify(item.question)}`,
      position: index + 1,
      url: `${url}/#${item.id}`,
      name: stripHtml(item.question).result,
      answerCount: 1,
      inLanguage: 'en-US',
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer).result,
      },
    })),
  };
}

function makePersonSchema(url: string) {
  return {
    '@type': 'Person',
    '@id': `${url}/#person`,
    name: `${AppConfig.AuthorName}`,
    image: {
      '@type': 'ImageObject',
      '@id': `${url}/#personlogo`,
      inLanguage: 'en-US',
      url: `${AppConfig.AuthorLogo}`,
      caption: `${AppConfig.AuthorName}`,
    },
    description: `${AppConfig.AuthorDescription}`,
    sameAs: SocialConfig.map(item => item.href),
  };
}

function makeOrganizationSchema(url: string) {
  return {
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: `${AppConfig.AuthorName}`,
    url: `${url}/#organization`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${url}/#orglogo`,
      inLanguage: 'en-US',
      url: `${AppConfig.BlogLogo}`,
      caption: `${AppConfig.AuthorName}`,
    },
    image: { '@id': `${url}/#orglogo` },
    sameAs: SocialConfig.map(item => item.href),
  };
}

interface IProps {
  type: 'article' | 'webpage' | 'job' | 'review' | 'faq';
  title: string;
  description: string;
  pathname: string;
  primaryImage?: string;
  article?: MDXFrontMatter;
  questions?: MDXQuestion[];
}

export default function PageSeoJsonSchema({
  type,
  title,
  description,
  pathname,
  primaryImage,
  article,
  questions,
}: IProps) {
  const url = `${AppConfig.WebSiteUrl}${pathname}`.replace(/\/$/, '');

  let mainContent;
  switch (type) {
    case 'article':
      mainContent = makeArticleSchema(url, article);
      break;
    case 'review':
      mainContent = makeReviewSchema(article);
      break;
    case 'faq':
      mainContent = makeFaqSchema(url, questions);
      break;
    default:
      break;
  }

  const defaultSchema = [
    {
      '@type': 'WebSite',
      '@id': `${AppConfig.WebSiteUrl}/#website`,
      url: `${AppConfig.WebSiteUrl}/`,
      name: `${AppConfig.BlogName}`,
      description: `${AppConfig.BlogDescription}`,
      publisher: { '@id': `${AppConfig.WebSiteUrl}/#person` },
      inLanguage: 'en-US',
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: `${AppConfig.WebSiteUrl}/?s={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      ],
    },
    {
      '@type': 'ImageObject',
      '@id': `${url}/#primaryimage`,
      url: primaryImage || AppConfig.BlogLogo,
      inLanguage: 'en-US',
      width: 1200,
      height: 600,
      caption: title,
    },
  ];

  const jsonSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...defaultSchema,
      mainContent,
      makeWebPageSchema(url, title, description),
      makeBreadcrumbSchema(url, title, pathname),
      makePersonSchema(url),
      makeOrganizationSchema(url),
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonSchema),
        }}
      />
    </Head>
  );
}
