import { Check, Info, X } from 'lucide-react';
import type { ToastMessage } from '../types/product';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 right-4 sm:right-6 z-[60] flex flex-col gap-2 max-w-xs sm:max-w-sm w-[calc(100vw-2rem)] sm:w-auto pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 bg-[#24221F] text-[#F7F5F0] px-4 py-3 border border-[#3E3A34] shadow-lg text-sm transition-all duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.tone === 'success' ? (
              <Check className="w-4 h-4 text-[#B49A70] shrink-0" aria-hidden="true" />
            ) : (
              <Info className="w-4 h-4 text-[#B49A70] shrink-0" aria-hidden="true" />
            )}
            <span className="truncate">{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="text-[#B5AEA4] hover:text-white transition-colors p-0.5 shrink-0"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
