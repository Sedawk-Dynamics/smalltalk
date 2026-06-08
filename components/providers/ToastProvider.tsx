"use client";

/** Minimal toast notification system (no external dep). */
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type Toast = { id: number; message: string; variant: "success" | "info" };
type ToastContextType = {
  toast: (message: string, variant?: "success" | "info") => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const toast = useCallback(
    (message: string, variant: "success" | "info" = "success") => {
      const id = ++idRef.current;
      setToasts((t) => [...t, { id, message, variant }]);
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 3200);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[200] flex w-[min(92vw,380px)] -translate-x-1/2 flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="glass-dark pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white shadow-soft"
            >
              {t.variant === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan" />
              ) : (
                <Info className="h-5 w-5 shrink-0 text-glow" />
              )}
              <span className="flex-1">{t.message}</span>
              <button
                aria-label="Dismiss"
                onClick={() =>
                  setToasts((x) => x.filter((i) => i.id !== t.id))
                }
                className="opacity-60 transition hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
