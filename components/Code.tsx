import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

function Code({ children }: IProps) {
  return <span className="bg-secondary font-mono p-1 rounded">{children}</span>;
}

export default Code;
