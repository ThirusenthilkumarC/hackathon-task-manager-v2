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
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl border shadow-lg backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#EAF3EA] border-[#CBE0CE] text-[#1B3B2B]'
                : toast.type === 'delete'
                ? 'bg-slate-900 border-slate-800 text-white'
                : toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#1B3B2B] shrink-0" />}
              {toast.type === 'delete' && <Trash2 className="w-4 h-4 text-rose-400 shrink-0" />}
              {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              {toast.type === 'info' && <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />}
              
              <span className="text-xs font-semibold">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-black/5 text-current opacity-70 hover:opacity-100 transition-opacity ml-2 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
