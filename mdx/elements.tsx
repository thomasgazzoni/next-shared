import Link from '../components/Link';
import Callout from '../components/Callout';
import LazyImage from '@gaz/components/common/LazyImage';

const Table = props => <table className="text-left" {...props} />;

const THead = props => {
  return (
    <th
      className="font-semibold"
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      {...props}
    />
  );
};

// const TData = props => (
//   <Box
//     as="td"
//     p={2}
//     borderTopWidth="1px"
//     borderColor="inherit"
//     fontSize="sm"
//     whiteSpace="normal"
//     {...props}
//   />
// );

const Quote = props => {
  return <Callout {...props} />;
};

const DocsHeading = ({ size, ...props }: any) => (
  <h2
    className={`${size} font-bold`}
    css={{
      scrollMarginTop: '100px',
      scrollSnapMargin: '100px', // Safari
      '&[id]': {
        pointerEvents: 'none',
      },
      '&[id]:before': {
        display: 'block',
        height: ' 6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`,
      },
      '&[id]:hover a': { opacity: 1 },
    }}
    {...props}
  >
    <div className="pointer-events-auto">
      {props.children}
      {props.id && (
        <a
          aria-label="anchor"
          color="blue.500"
          className="text-primary font-normal outline-none opacity-0 ml-2 focus:opacity-100"
        >
          #
        </a>
      )}
    </div>
  </h2>
);

const MDXComponents = {
  h1: props => <h1 className="text-lg" {...props} />,
  h2: props => <DocsHeading size="text-3xl" {...props} />,
  h3: props => <DocsHeading size="text-xl" {...props} />,
  h4: props => <DocsHeading size="text-lg" {...props} />,
  br: props => <div className="h-1" {...props} />,
  hr: props => <hr className="my-4 w-full" {...props} />,
  table: Table,
  th: THead,
  a: Link,
  img: props => <LazyImage {...props} />,
  p: props => <p {...props} />,
  ul: props => <ul className="list-decimal pt-2 pb-6" {...props} />,
  ol: props => <ol className="list-disc pt-2 pb-6" {...props} />,
  li: props => <li className="p-1" {...props} />,
  blockquote: Quote,
  section: props => <div className="post-chapter" {...props} />,
  iframe: props => <iframe className="w-full my-4 text-center" {...props} />,
};

export default MDXComponents;
