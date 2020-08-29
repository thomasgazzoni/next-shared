import React, { ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
}

function ButtonIcon({ icon }: IProps) {
  return <div className="p-3">{icon}</div>;
}

export default ButtonIcon;
