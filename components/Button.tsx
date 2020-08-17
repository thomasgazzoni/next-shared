import React, { ReactNode } from 'react';

export const ButtonType = {
  primary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded',
  secondary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded',
  basic: 'bg-white hover:bg-gray-700 text-gray-700 font-bold rounded',
  delete: 'bg-red-300 hover:bg-red-500 text-white font-bold rounded',
};

export const ButtonSize = {
  sm: 'py-2 px-4 text-xs',
  lg: 'py-3 px-6 text-lg',
};

interface IProps {
  size?: keyof typeof ButtonSize;
  type?: keyof typeof ButtonType;
  children: ReactNode;
}

function Button({ size, type, children }: IProps) {
  const classNames = ButtonType[type] + ' ' + ButtonSize[size];

  return <button className={classNames}>{children}</button>;
}

export default Button;
