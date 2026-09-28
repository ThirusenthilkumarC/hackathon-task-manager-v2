import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignupForm } from '../components/auth/SignupForm';
import { AuthIllustration } from '../components/auth/AuthIllustration';
import { isAuthenticated } from '../auth/auth';

export const Signup = () => {
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
      className="min-h-screen w-full bg-white text-slate-900 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Signup Form */}
        <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
          <SignupForm />
        </div>

        {/* Right Side: Visual Panel */}
        <div className="lg:col-span-6 xl:col-span-7 hidden lg:block">
          <AuthIllustration />
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
