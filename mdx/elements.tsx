import Callout from '../components/Callout';
import Code from '../components/Code';
import Link from '../components/Link';

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

const DocsHeading = ({ size, ...props }: any) => (
  <h2
    className={`${size} font-bold leading-tight group`}
    style={{ paddingTop: '90px', marginTop: '-90px' }}
    {...props}
  >
    <div className="pt-8">
      {props.children}
      {props.id && (
        <a
          aria-label="anchor"
          className="text-primary font-normal outline-none ml-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
          href={`#${props.id}`}
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
  h3: props => <DocsHeading size="text-2xl" {...props} />,
  h4: props => <DocsHeading size="text-lg" {...props} />,
  br: props => <div className="h-1" {...props} />,
  hr: props => <hr className="my-4 w-full" {...props} />,
  a: Link,
  p: props => <p {...props} />,
  ul: props => <ul className="list-disc pt-2 pl-2 ml-2" {...props} />,
  ol: props => <ol className="list-decimal pt-2 pl-2 ml-2" {...props} />,
  li: props => <li className="p-1" {...props} />,
  inlineCode: Code,
  blockquote: Callout,
  section: props => <div className="post-chapter" {...props} />,
  iframe: props => <iframe className="w-full my-4 text-center" {...props} />,
  table: Table,
  th: THead,
};

export default MDXComponents;
