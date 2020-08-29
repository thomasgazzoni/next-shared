import Link from '../components/Link';
import Callout from '../components/Callout';

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

const Hr = () => {
  return <hr className="my-4 w-full" />;
};

const AlignedImage = props => {
  return (
    <div className="flex items-center justify-center">
      <img {...props} />
    </div>
  );
};

const MDXComponents = {
  h1: props => <h1 className="text-lg" {...props} />,
  h2: props => <DocsHeading size="text-3xl" {...props} />,
  h3: props => <DocsHeading size="text-2xl" {...props} />,
  h4: props => <DocsHeading size="text-lg" {...props} />,
  // inlineCode: props => (
  //   <Code variantColor="yellow" fontSize="0.84em" {...props} />
  // ),
  // kbd: Kbd,
  // br: props => <Box height="24px" {...props} />,
  hr: Hr,
  table: Table,
  th: THead,
  // td: TData,
  a: Link,
  img: props => <AlignedImage {...props} />,
  p: props => <p {...props} />,
  ul: props => <ul className="list-decimal pt-2 pl-2 ml-2" {...props} />,
  ol: props => <ol className="list-disc pt-2 pl-2 ml-2" {...props} />,
  li: props => <li className="p-1" {...props} />,
  blockquote: Quote,
  iframe: props => <iframe className="w-full my-4 text-center" {...props} />,
};

export default MDXComponents;
