export interface MDXQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface MDXFrontMatter {
  // Fixed
  __resourcePath: string;
  // Calculated
  readingTime: {
    text: string;
    minutes: number;
  };
  wordCount: number;
  /**
   * ID Of this post
   */
  id: number;
  /**
   * Parent ID of this post
   */
  parent: string | number;
  slug: string;
  /**
   * Content language
   */
  lang: string;
  link: string;
  title: string;
  /**
   * Layout to be used
   */
  layout?: 'default' | 'newsletter';
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
  /**
   * Main featured image
   */
  image: string;
  tags: string[];
  categories: string[];
  url: string;
  /**
   * Content type (es Image, article, slideshow, etc)
   */
  type: string;
  pinned?: boolean;
  hidden?: boolean;
  author?: string;
}
