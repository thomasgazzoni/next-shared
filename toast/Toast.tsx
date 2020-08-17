import React, { useEffect } from 'react';
import { useToast } from './ToastProvider';
import { ToastItem } from './types';
import cx from 'classnames';

const Toast = ({ id, content, options }: ToastItem) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemoveToast();
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  const handleRemoveToast = () => {
    removeToast(id);
  };

  const className = cx(
    'animate-toast animate-forwards relative bg-default text-default p-4 mt-3 rounded shadow-lg border w-300 duration-300',
    {
      'bg-success text-success': options.appearance === 'success',
      'bg-warning text-warning': options.appearance === 'error',
    },
  );

  return (
    <div onClick={handleRemoveToast} className={className}>
      {content}
    </div>
  );
};

export default Toast;
