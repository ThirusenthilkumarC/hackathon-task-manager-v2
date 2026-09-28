import { supabase } from '../lib/supabase';

const USER_KEY = 'hackathon_task_manager_user';
const SESSION_KEY = 'hackathon_task_manager_session';

let currentSession = null;

// Initialize Supabase Auth State Synchronization
export const initAuthListener = (onStateChange) => {
  // 1. Fetch initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    currentSession = session;
    if (session?.user) {
      syncUserToStorage(session.user);
    }
    if (onStateChange) onStateChange(session);
  });

  // 2. Subscribe to auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    currentSession = session;
    if (session?.user) {
      syncUserToStorage(session.user);
    } else if (event === 'SIGNED_OUT') {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(SESSION_KEY);
    }
    if (onStateChange) onStateChange(session);
  });

  return subscription;
};

// Sync user object to local storage for quick synchronous fallback reads
const syncUserToStorage = (supabaseUser) => {
  const userObj = {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'Thiru',
    email: supabaseUser.email,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(userObj));
};

export const getCurrentUser = () => {
  // First check active Supabase session memory
  if (currentSession?.user) {
    return {
      id: currentSession.user.id,
      name: currentSession.user.user_metadata?.full_name || currentSession.user.user_metadata?.name || currentSession.user.email?.split('@')[0] || 'Thiru',
      email: currentSession.user.email,
    };
  }

  // Fallback to local storage
  try {
    const data = localStorage.getItem(USER_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse current user from storage:', e);
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Email Password Login
export const loginWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data?.user) {
      syncUserToStorage(data.user);
    }

    return { success: true, user: getCurrentUser() };
  } catch (err) {
    return { success: false, error: err.message || 'Authentication failed' };
  }
};

// Email Password Signup
export const signUpWithEmail = async (name, email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: name.trim(),
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data?.user) {
      syncUserToStorage(data.user);
    }

    const needsEmailConfirmation = !data.session;

    return {
      success: true,
      needsEmailConfirmation,
      message: needsEmailConfirmation
        ? 'Account created! Please check your email to confirm your account before signing in.'
        : 'Account created successfully!',
      user: getCurrentUser(),
    };
  } catch (err) {
    return { success: false, error: err.message || 'Signup failed' };
  }
};

// Google OAuth Login
export const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || 'Google OAuth failed' };
  }
};

// GitHub OAuth Login
export const signInWithGithub = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || 'GitHub OAuth failed' };
  }
};

// Forgot Password / Reset Link
export const forgotPassword = async (email) => {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: `Password reset link has been sent to ${email}. Check your inbox!`,
    };
  } catch (err) {
    return { success: false, error: err.message || 'Reset password request failed' };
  }
};

// Logout
export const logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.error('Signout error:', e);
  } finally {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_KEY);
    currentSession = null;
  }
};
