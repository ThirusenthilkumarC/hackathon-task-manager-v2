import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';
import { isAuthenticated } from '../auth/auth';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full bg-white text-slate-900 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-lg bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
        <ForgotPasswordForm />
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
