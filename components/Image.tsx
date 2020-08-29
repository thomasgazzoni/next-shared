import React from 'react';

type ImageProps = {
  src: string;
};

const Image: React.FunctionComponent<ImageProps> = ({ src }) => {
  const isHttp = src.startsWith('http');

  return (
    <div className="relative">
      <div className="ratio-holder" style={{ paddingTop: '45%' }} />
      {!isHttp && (
        <img
          className="absolute h-full w-full top-0 blur-image"
          src={require(`images/${src}?lqip`)}
        />
      )}
      <div
        className="absolute w-full h-full top-0 z-10 bg-no-repeat"
        style={{
          backgroundImage: `url(${
            isHttp ? src : require(`images/${src}?webp`)
          }`,
        }}
      />
      <style jsx>{`
        .blur-image img {
          filter: blur(25px);
        }
      `}</style>
    </div>
  );
};

export default Image;
