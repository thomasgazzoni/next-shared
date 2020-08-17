import React, {
  useState,
  useContext,
  useCallback,
  PropsWithChildren,
  ReactNode,
  FC,
} from 'react';
import ToastContainer from './ToastContainer';
import { ToastOptions, ToastItem } from './types';

let id = 1;

// *** Context

type AddToastFn = (message: string, options?: ToastOptions) => void;
type RemoveToastFn = (id: number) => void;

interface ToastContext {
  addToast: AddToastFn;
  removeToast: RemoveToastFn;
}

const ToastContext = React.createContext<ToastContext>(null);

// *** Provider

interface ToastProvider {
  children?: ReactNode;
}

export const ToastProvider: FC<ToastProvider> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast: AddToastFn = useCallback(
    (content, options) => {
      setToasts(toasts => [
        ...toasts,
        {
          id: id++,
          content,
          options,
        },
      ]);
    },
    [setToasts],
  );

  const removeToast: RemoveToastFn = useCallback(
    id => {
      setToasts(toasts => toasts.filter(t => t.id !== id));
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

// *** Hooks

export const useToast = () => {
  return useContext(ToastContext);
};
