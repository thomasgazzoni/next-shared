export type ToastItem = {
  id: number;
  content: string;
  options: ToastOptions;
};

export type ToastOptions = {
  appearance: 'info' | 'error' | 'warning' | 'success';
};
