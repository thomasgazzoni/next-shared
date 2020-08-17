import React, { ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
}

function IconButton({ icon }: IProps) {
  return <div className="p-3">{icon}</div>;
}

export default IconButton;
