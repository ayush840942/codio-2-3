import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, Sparkles, Star } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { toast } from 'sonner';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState<boolean | null>(null);
  const { user, continueAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const referralCode = searchParams.get('ref');

  useEffect(() => {
    // Only redirect if it's a real authenticated user
    // Guests should be allowed to stay on the Auth page to sign in/up
    if (user && user.email !== 'guest@codio.local') {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const redirectUrl = `${window.location.origin}/`;
      const signUpData: any = {
        email: email.trim(),
        password,
        options: { emailRedirectTo: redirectUrl }
      };

      if (referralCode) {
        signUpData.options.data = { referral_code: referralCode };
      }

      const { error } = await supabase.auth.signUp(signUpData);
      if (error) throw error;
      setError('Check your email for verification link!');
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = async () => {
    try {
      setLoading(true);
      setError('');
      await continueAsGuest();
      // Small delay to ensure state is fully set before navigation
      await new Promise(resolve => setTimeout(resolve, 100));
      navigate('/');
    } catch (error: any) {
      console.error('Guest mode error:', error);
      setError('Failed to start guest mode. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');

      const isNative = Capacitor.isNativePlatform();

      if (isNative) {
        // Use native Google Sign-In for mobile
        console.log('Using native Google Sign-In...');

        try {
          const result = await GoogleAuth.signIn();
          console.log('Native Google Sign-In successful, syncing with Supabase...');

          if (!result.authentication.idToken) {
            throw new Error('No ID token returned from Google Sign-In');
          }

          // Sign in to Supabase with the ID token
          const { data, error: sbError } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: result.authentication.idToken,
            access_token: result.authentication.accessToken
          });

          if (sbError) throw sbError;

          console.log('Supabase session established:', data);

          // Mark onboarding as complete since they are signing in
          localStorage.setItem('codio_onboarding_complete', 'true');
          localStorage.removeItem('codio_guest_mode');
          localStorage.removeItem('codio_guest_user');

          toast.success('Welcome back!');

          // Use a small delay to allow AuthContext to process the session change
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 100);

        } catch (nativeError: any) {
          console.error('Native Google Sign-In or Supabase sync failed:', nativeError);
          // Don't show the error if the user just cancelled the sign-in
          if (nativeError.message !== 'HANDLED_EXTERNALLY' && nativeError.message !== 'CANCELLED') {
            setError(nativeError.message || 'Failed to sign in with Google. Please try again.');
          }
        }
      } else {
        // Use Supabase OAuth for web
        console.log('Using Supabase OAuth for web...');
        const redirectTo = `${window.location.origin}/`;

        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo
          },
        });

        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  // Floating decorative elements
  const FloatingElement = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [-10, 10, -10],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Sparkles className="w-6 h-6 text-primary/30" />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 border-study shadow-studypal relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <div className="text-[5rem] font-black tracking-tighter leading-[0.85] text-slate-900 mb-2">
            Codio
          </div>
          <div className="text-xl font-bold text-slate-400">Codio AI Edition</div>
        </motion.div>

        <div className="relative mb-12 flex justify-center">
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-32 relative"
          >
            <img src="/logo-robot.jpg" alt="Codio Mascot" className="w-full h-full object-cover rounded-[2rem] shadow-lg border-study" />
            <div className="absolute -bottom-2 -right-2 bg-pastel-yellow w-10 h-10 rounded-full flex items-center justify-center border-study shadow-sm">
              <Sparkles className="w-5 h-5 text-slate-800" />
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleGuestMode}
              className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-slate-900 font-black text-lg border-study shadow-sm"
            >
              Continue as Guest
            </Button>

            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-14 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg border-study shadow-sm flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsSignUp(false)}
              className="flex-1 h-16 rounded-full border-study font-bold text-slate-700 bg-slate-50/50"
            >
              Login
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsSignUp(true)}
              className="flex-1 h-16 rounded-full border-study font-bold text-slate-700 bg-slate-50/50"
            >
              Join
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSignUp !== null && (
          // Modals or logic for email/pass hidden unless user wants real auth
          // For now I'll keep it simple to match the screenshot "Begin" feel but provide entry for real auth
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setIsSignUp(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-card rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-muted-foreground">
                  {isSignUp ? 'Start your coding journey' : 'Continue your progress'}
                </p>
              </div>

              <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl border-2 border-border bg-secondary/50 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={isSignUp ? "Create password (min 6 chars)" : "Enter password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={isSignUp ? 6 : undefined}
                      className="h-12 rounded-xl border-2 border-border bg-secondary/50 focus:border-primary focus:ring-primary pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </form>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <Alert className={`rounded-xl ${error.includes('Check your email')
                    ? 'bg-puzzle-green/10 border-puzzle-green/30'
                    : 'bg-destructive/10 border-destructive/30'
                    }`}>
                    <AlertDescription className={
                      error.includes('Check your email')
                        ? 'text-puzzle-green'
                        : 'text-destructive'
                    }>
                      {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full mt-4 text-center text-sm text-muted-foreground"
              >
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <span className="text-primary font-semibold">
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Auth Interface (Hidden initially to match "Begin" look) */}
      <div className="mt-8 text-slate-500 text-xs font-bold uppercase tracking-widest opacity-40">
        © 2026 Codio Learning
      </div>
    </div>
  );
};

export default Auth;
