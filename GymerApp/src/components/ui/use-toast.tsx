import { useState } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState<{ title: string; description: string }[]>([]);

  const addToast = (newToast: { title: string; description: string }) => {
    setToasts([...toasts, newToast]);
    setTimeout(() => removeToast(newToast), 3000); // auto-remove after 3 seconds
  };

  const removeToast = (toast: { title: string; description: string }) => {
    setToasts(toasts.filter(t => t !== toast));
  };

  return { toasts, addToast };
};
