import React from 'react';
import Toast from './Toast';
import { ToastItem } from './types';

const ToastContainer = ({ toasts }: { toasts: ToastItem[] }) => {
  return (
    <div className="fixed top-0 right-0 mr-3 z-50">
      {toasts.map(item => (
        <Toast key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ToastContainer;
