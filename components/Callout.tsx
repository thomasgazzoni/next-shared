import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

function Callout({ children }: IProps) {
  return (
    <div
      className="bg-info border-l-4 rounded-b px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex items-center">
        <div className="py-1 text-secondary">
          <svg
            className="fill-current h-6 w-6 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default Callout;
