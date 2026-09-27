import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Trash2, X } from 'lucide-react';

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl ${
              toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-200'
                : toast.type === 'delete'
                ? 'bg-rose-950/80 border-rose-500/30 text-rose-200'
                : toast.type === 'error'
                ? 'bg-amber-950/80 border-amber-500/30 text-amber-200'
                : 'bg-indigo-950/80 border-indigo-500/30 text-indigo-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {toast.type === 'delete' && <Trash2 className="w-5 h-5 text-rose-400 shrink-0" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-amber-400 shrink-0" />}
              {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0" />}
              
              <span className="text-sm font-medium text-slate-100">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
