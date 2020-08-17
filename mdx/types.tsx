export interface MDXFrontMatter {
  // Fixed
  __resourcePath: string;
  // Calculated
  readingTime: {
    text: string;
  };
  wordCount: number;
  // From header
  slug: string;
  title: string;
  layout?: 'default' | 'newsletter';
  publishedAt: string;
  updatedAt: string;
  summary: string;
  image: string;
  url: string;
  pinned?: boolean;
  hidden?: boolean;
  author?: string;
}
