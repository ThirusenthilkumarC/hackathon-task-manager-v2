import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { loginWithEmail, signInWithGoogle, signInWithGithub } from '../../auth/auth';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // 'google' | 'github' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    const res = await loginWithEmail(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Failed to sign in. Please check your credentials.');
    }
  };

  const handleGoogleOAuth = async () => {
    setError('');
    setOauthLoading('google');
    const res = await signInWithGoogle();
    if (!res.success) {
      setOauthLoading(null);
      setError(res.error || 'Google OAuth failed. Please check Supabase OAuth configuration.');
    }
  };

  const handleGithubOAuth = async () => {
    setError('');
    setOauthLoading('github');
    const res = await signInWithGithub();
    if (!res.success) {
      setOauthLoading(null);
      setError(res.error || 'GitHub OAuth failed. Please check Supabase OAuth configuration.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-4 px-2 flex flex-col justify-center min-h-[500px]">
      {/* Top Logo / Brand Badge */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-[#EAF3EA] border border-[#CBE0CE] flex items-center justify-center text-[#1B3B2B] shadow-xs">
          <Rocket className="w-5 h-5 text-[#1B3B2B]" />
        </div>
        <span className="text-lg font-extrabold text-slate-900 tracking-tight">
          Hackathon Task Manager
        </span>
      </div>

      {/* Headings */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Welcome back!
        </h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          Sign in to continue managing your tasks and projects.
        </p>
      </div>

      {/* Error Message */}
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
        {/* Email Input */}
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
            disabled={loading || !!oauthLoading}
            className="w-full px-5 py-3.5 rounded-full saas-input text-sm text-slate-900 placeholder:text-slate-400 shadow-xs disabled:opacity-60"
          />
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#1B3B2B] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading || !!oauthLoading}
              className="w-full px-5 py-3.5 pr-12 rounded-full saas-input text-sm text-slate-900 placeholder:text-slate-400 shadow-xs disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading || !!oauthLoading}
          whileHover={{ scale: loading || !!oauthLoading ? 1 : 1.01 }}
          whileTap={{ scale: loading || !!oauthLoading ? 1 : 0.99 }}
          className="w-full py-3.5 px-6 rounded-full bg-[#111827] hover:bg-[#1f2937] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="relative my-7 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <span className="relative px-4 bg-white text-xs font-semibold text-slate-400 uppercase tracking-wider">
          or continue with
        </span>
      </div>

      {/* Social OAuth Buttons */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Google OAuth Button */}
        <motion.button
          type="button"
          disabled={loading || !!oauthLoading}
          whileHover={{ scale: loading || !!oauthLoading ? 1 : 1.01 }}
          whileTap={{ scale: loading || !!oauthLoading ? 1 : 0.99 }}
          onClick={handleGoogleOAuth}
          className="w-full py-3.5 px-5 rounded-full border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-3 shadow-xs cursor-pointer disabled:opacity-60 transition-all"
        >
          {oauthLoading === 'google' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </motion.button>

        {/* GitHub OAuth Button */}
        <motion.button
          type="button"
          disabled={loading || !!oauthLoading}
          whileHover={{ scale: loading || !!oauthLoading ? 1 : 1.01 }}
          whileTap={{ scale: loading || !!oauthLoading ? 1 : 0.99 }}
          onClick={handleGithubOAuth}
          className="w-full py-3.5 px-5 rounded-full border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-3 shadow-xs cursor-pointer disabled:opacity-60 transition-all"
        >
          {oauthLoading === 'github' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
              <span>Connecting to GitHub...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 fill-slate-900 shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Bottom Text Link */}
      <div className="text-center text-xs text-slate-500 font-medium">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-bold text-[#1B3B2B] hover:underline"
        >
          Create account
        </Link>
      </div>
    </div>
  );
};
