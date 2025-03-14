import { create } from "zustand";

interface Toast {
  id: number;
  message: string;
  success: boolean;
}
interface ToastStore {
  toasts: Toast[];
  showToast: (message: string, success: boolean) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (message, success) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, success }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 5000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
