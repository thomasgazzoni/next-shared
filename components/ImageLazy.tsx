// import 'lazysizes';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import React from 'react';

interface IProps {
  src: string;
  alt: string;
  className?: string;
  isVertical?: boolean;
}

export default function ImageLazy({
  src,
  alt,
  className,
  isVertical = false,
  ...others
}: IProps) {
  const classes = `lazyload blur-up img-fit ${className || ''}`;
  if (src.startsWith('http')) {
    return (
      <div className="overflow-hidden" {...others}>
        <img alt={alt} src={src} className={classes} />;
      </div>
    );
  }

  const responsiveImage = isVertical
    ? require(`images/${src}?sizes[]=400,sizes[]=500`)
    : require(`images/${src}?sizes[]=600,sizes[]=1024,sizes[]=2048`);
  const responsiveImageWebp = isVertical
    ? require(`images/${src}?sizes[]=400,sizes[]=500&format=webp`)
    : require(`images/${src}?sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp`);

  const aspectRatioHolder =
    (responsiveImage.height / responsiveImage.width) * 100;

  return (
    <div className="relative">
      <div
        className="ratio-holder"
        style={{ paddingTop: `${aspectRatioHolder}%` }}
      />
      <picture
        className="absolute h-full w-full top-0 z-10 flex items-center justify-center"
        {...others}
      >
        <source srcSet={responsiveImageWebp.srcSet} type="image/webp" />
        <img
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          width={responsiveImage.width}
          height={responsiveImage.height}
          sizes="(min-width: 1024px) 1024px, 100vw"
          loading="lazy"
        />
      </picture>
      <img
        className="absolute h-full w-full top-0 blur-image"
        src={require(`images/${src}?lqip`)}
      />
    </div>
  );
}
