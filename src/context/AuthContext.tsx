
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  continueAsGuest: () => Promise<void>;
  loading: boolean;
  initializing: boolean;
  isSubscribed: boolean;
  subscriptionTier: string | null;
  refreshSubscription: () => Promise<void>;
};

const clearUserSpecificData = (userId: string) => {
  if (typeof window === 'undefined') return;

  console.log('Clearing user-specific data for user:', userId);

  // Remove user-specific localStorage items
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes(`_${userId}`)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log('Removed localStorage key:', key);
  });
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');

    // Check for existing guest session in localStorage
    const savedGuest = localStorage.getItem('codio_guest_user');
    const isGuestModeLocal = localStorage.getItem('codio_guest_mode') === 'true';

    if (savedGuest && isGuestModeLocal) {
      try {
        const guestData = JSON.parse(savedGuest);
        setSession(guestData.session);
        setUser(guestData.user);
        setProfile(guestData.profile);
        setIsSubscribed(false);
        setSubscriptionTier('free');
        setInitializing(false);
      } catch (e) {
        console.error('Error loading guest session:', e);
      }
    }

    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event, newSession?.user?.email);

      if (newSession?.user) {
        localStorage.removeItem('codio_guest_user');
        localStorage.removeItem('codio_guest_mode');
      }

      if (event === 'SIGNED_OUT' && user) {
        clearUserSpecificData(user.id);
        setProfile(null);
        console.log('User signed out, clearing profile and user data');
      } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && newSession?.user) {
        if (user && user.id !== newSession.user.id) {
          clearUserSpecificData(user.id);
        }

        // Update state immediately
        setSession(newSession);
        setUser(newSession.user);

        // Fetch profile without delay
        fetchUserProfile(newSession.user.id);
      }

      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    const initAuth = async () => {
      const initTimeout = setTimeout(() => {
        if (initializing) {
          console.warn('Auth initialization timed out, proceeding with current state');
          setInitializing(false);
          if (!session && !user && !profile) {
            const savedGuest = localStorage.getItem('codio_guest_user');
            if (savedGuest) {
              try {
                const guestData = JSON.parse(savedGuest);
                setSession(guestData.session);
                setUser(guestData.user);
                setProfile(guestData.profile);
              } catch (e) { }
            }
          }
        }
      }, 3000);

      try {
        console.log('Initializing auth...');

        // If we already loaded a guest session, skip the Supabase check if offline
        const hasGuest = !!localStorage.getItem('codio_guest_user');
        if (!navigator.onLine && hasGuest) {
          console.log('Offline with guest session, skipping network check');
          clearTimeout(initTimeout);
          setInitializing(false);
          return;
        }

        // Try to get session, but handle offline gracefully
        let session = null;
        let error = null;

        try {
          const result = await supabase.auth.getSession();
          session = result.data?.session;
          error = result.error;
        } catch (networkError: any) {
          console.warn('Network error during session fetch:', networkError);
          // If offline, try to load from localStorage
          if (!navigator.onLine || networkError.message?.includes('fetch') || networkError.message?.includes('network')) {
            console.log('Offline detected, loading cached data');
            if (hasGuest) {
              const guestData = JSON.parse(localStorage.getItem('codio_guest_user') || '{}');
              if (guestData.user) {
                setSession(guestData.session);
                setUser(guestData.user);
                setProfile(guestData.profile);
                clearTimeout(initTimeout);
                setInitializing(false);
                return;
              }
            }
          }
        }

        if (error) {
          console.error('Error getting session:', error);
        }

        if (session) {
          setSession(session);
          setUser(session.user);
          await Promise.all([
            fetchUserProfile(session.user.id),
            checkSubscriptionStatus(session.user.id)
          ]);
        } else if (hasGuest && localStorage.getItem('codio_guest_mode') === 'true') {
          // If no supabase session but has guest, load guest
          const guestData = JSON.parse(localStorage.getItem('codio_guest_user') || '{}');
          if (guestData.user) {
            setSession(guestData.session);
            setUser(guestData.user);
            setProfile(guestData.profile);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Try to load guest data as fallback
        const hasGuest = !!localStorage.getItem('codio_guest_user');
        if (hasGuest) {
          try {
            const guestData = JSON.parse(localStorage.getItem('codio_guest_user') || '{}');
            if (guestData.user) {
              setSession(guestData.session);
              setUser(guestData.user);
              setProfile(guestData.profile);
            }
          } catch (e) {
            console.error('Failed to load guest fallback:', e);
          }
        }
      } finally {
        clearTimeout(initTimeout);
        setInitializing(false);
      }
    };

    initAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSubscriptionStatus = async (userId: string) => {
    try {
      const { data: subscription, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
        setSubscriptionTier(null);
      } else if (subscription) {
        setIsSubscribed(true);
        setSubscriptionTier(subscription.plan_id);
        console.log('Active subscription found:', subscription.plan_id);
      } else {
        setIsSubscribed(false);
        setSubscriptionTier(null);
      }
    } catch (error) {
      console.error('Error in checkSubscriptionStatus:', error);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, user_name, full_name, plan, trial_start_date, created_at, updated_at')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        setProfile({ id: userId, username: null });
      } else if (data) {
        console.log('Profile fetched successfully');
        setProfile(data);
      } else {
        console.log('No profile found - will be created by trigger');
        setProfile({ id: userId, username: null });
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      setProfile({ id: userId, username: null });
    }
  };

  const refreshSubscription = async () => {
    if (user) {
      await Promise.all([
        checkSubscriptionStatus(user.id),
        fetchUserProfile(user.id)
      ]);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);

        // Check for network-related errors
        if (error.message?.includes('fetch') || error.message?.includes('network')) {
          toast.error('Connection Error', {
            description: 'Unable to connect to the server. Please check your internet connection and try again.'
          });
        } else if (error.message?.includes('Invalid login credentials')) {
          toast.error('Invalid Credentials', {
            description: 'Invalid email or password. Please try again.'
          });
        } else if (error.message?.includes('Email not confirmed')) {
          toast.error('Email Not Confirmed', {
            description: 'Please check your email and confirm your account before signing in.'
          });
        } else {
          toast.error('Sign In Failed', {
            description: error.message || 'An error occurred during sign in. Please try again.'
          });
        }
        throw error;
      }

      console.log('Sign in successful');
      toast.success('Welcome back!', {
        description: 'You have successfully signed in.'
      });
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      console.log('Signing up user:', email);
      setLoading(true);

      // Use the current origin for redirect URL
      const redirectUrl = `${window.location.origin}/levels`;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: username ? { username } : undefined
        }
      });

      if (error) {
        console.error('Sign up error:', error);

        // Check for network-related errors
        if (error.message?.includes('fetch') || error.message?.includes('network')) {
          toast.error('Connection Error', {
            description: 'Unable to connect to the server. Please check your internet connection and try again.'
          });
        } else if (error.message?.includes('Password should be at least 6 characters')) {
          toast.error('Invalid Password', {
            description: 'Password should be at least 6 characters long.'
          });
        } else if (error.message?.includes('Unable to validate email address')) {
          toast.error('Invalid Email', {
            description: 'Please enter a valid email address.'
          });
        } else {
          toast.error('Sign Up Failed', {
            description: error.message || 'An error occurred during sign up. Please try again.'
          });
        }
        throw error;
      }

      console.log('Sign up successful');
      toast.success('Account created!', {
        description: 'Please check your email to verify your account.'
      });
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user...');
      setLoading(true);

      // Clear user-specific data before signing out
      if (user) {
        clearUserSpecificData(user.id);
      }

      // Clear all localStorage items
      localStorage.clear();

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }

      // Clear state immediately
      setSession(null);
      setUser(null);
      setProfile(null);

      console.log('Sign out successful');
      toast.success('Signed out successfully');

      // Force redirect to auth page
      window.location.href = '/auth';

    } catch (error) {
      console.error('Error signing out:', error);
      // Force sign out even if there's an error
      setSession(null);
      setUser(null);
      setProfile(null);
      window.location.href = '/auth';
    } finally {
      setLoading(false);
    }
  };

  const continueAsGuest = async () => {
    try {
      console.log('Starting guest mode...');
      setLoading(true);

      // Generate guest ID efficiently using crypto API
      const guestId = crypto.randomUUID();

      const guestUser: User = {
        id: guestId,
        email: 'guest@codio.local',
        app_metadata: { provider: 'guest' },
        user_metadata: { username: 'Guest' },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        role: 'authenticated',
        updated_at: new Date().toISOString()
      } as any;

      const guestSession: Session = {
        access_token: `guest_token_${guestId}`,
        refresh_token: `guest_refresh_${guestId}`,
        expires_in: 2592000, // 30 days in seconds
        token_type: 'bearer',
        user: guestUser
      };

      const guestProfile = {
        id: guestId,
        username: 'Guest',
        plan: 'free',
        xp: 0,
        coins: 100,
        hintPoints: 10
      };

      const guestData = {
        session: guestSession,
        user: guestUser,
        profile: guestProfile
      };

      // Update state first (fast, non-blocking)
      setSession(guestSession);
      setUser(guestUser);
      setProfile(guestProfile);
      setIsSubscribed(false);
      setSubscriptionTier('free');

      // Save to localStorage asynchronously to avoid blocking UI
      const saveToStorage = () => {
        try {
          localStorage.setItem('codio_guest_user', JSON.stringify(guestData));
          localStorage.setItem('codio_guest_mode', 'true');
          console.log('Guest data saved to localStorage');
        } catch (error) {
          console.error('Failed to save guest data to localStorage:', error);
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(saveToStorage);
      } else {
        setTimeout(saveToStorage, 0);
      }

      // Show success toast
      toast.success('Continuing as Guest', {
        description: 'Your progress will be saved locally.'
      });

      console.log('Guest mode activated successfully');
    } catch (error) {
      console.error('Error starting guest session:', error);
      toast.error('Failed to start guest mode', {
        description: 'Please try again or contact support.'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      setProfile,
      signOut,
      signIn,
      signUp,
      continueAsGuest,
      loading,
      initializing,
      isSubscribed,
      subscriptionTier,
      refreshSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
