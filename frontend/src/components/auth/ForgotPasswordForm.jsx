import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { forgotPassword } from '../../auth/auth';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = forgotPassword(email);
      setLoading(false);

      if (res.success) {
        setSuccessMsg(res.message);
      } else {
        setError(res.error);
      }
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 px-4 flex flex-col justify-center min-h-[450px]">
      {/* Top Logo / Brand Badge */}
      <div className="flex items-center justify-center gap-2.5 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-[#EAF3EA] border border-[#CBE0CE] flex items-center justify-center text-[#1B3B2B] shadow-xs">
          <Rocket className="w-5 h-5 text-[#1B3B2B]" />
        </div>
        <span className="text-lg font-extrabold text-slate-900 tracking-tight">
          Hackathon Task Manager
        </span>
      </div>

      {/* Headings */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Forgot your password?
        </h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
          Enter your email and we'll help you reset your password.
        </p>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-2xl bg-[#EAF3EA] border border-[#CBE0CE] text-[#1B3B2B] text-xs font-semibold flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#1B3B2B] mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Reset Link Sent!</p>
            <p className="text-slate-600 font-normal leading-normal">{successMsg}</p>
          </div>
        </motion.div>
      )}

      {/* Error Notification */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full px-5 py-3.5 rounded-full saas-input text-sm text-slate-900 placeholder:text-slate-400 shadow-xs"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          className="w-full py-3.5 px-6 rounded-full bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send Reset Link</span>
          )}
        </motion.button>
      </form>

      {/* Back to Sign In Link */}
      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
};
