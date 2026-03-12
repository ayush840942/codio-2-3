import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { auth } from '@/integrations/firebase/client';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  User as FirebaseUser
} from 'firebase/auth';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { toDatabaseId } from '@/utils/idMapping';

// The hybrid user type to support Firebase User state while satisfying the old interface
type HybridUser = {
  id: string,
  email?: string | null,
  user_metadata?: any,
  [key: string]: any
};

type AuthContextType = {
  session: any | null;
  user: HybridUser | null;
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
  startTrial: () => Promise<boolean>;
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
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<HybridUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);

  // Sync isSubscribed and tier with trial status - with periodic refresh for expiry
  useEffect(() => {
    const updateSubscriptionState = () => {
      if (!user) return;

      const trialKey = `codio_trial_start_${user.id}`;
      const trialStartStr = localStorage.getItem(trialKey);

      if (trialStartStr) {
        const startDate = new Date(trialStartStr);
        const now = new Date();
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysUsed = Math.floor((now.getTime() - startDate.getTime()) / msPerDay);
        const isTrialActive = daysUsed >= 0 && daysUsed < 7;

        if (isTrialActive) {
          // Trial is active - check if we need to update state
          // Only update if not already subscribed or if tier is not 'trial'
          if (!isSubscribed || (subscriptionTier !== 'trial' && subscriptionTier !== 'premium-monthly' && subscriptionTier !== 'premium-yearly')) {
            console.log('Trial detected as active, updating state');
            setIsSubscribed(true);
            setSubscriptionTier('trial');
          }
        } else {
          // Trial has expired
          if (subscriptionTier === 'trial') {
            console.log('Trial detected as expired, resetting state');
            setIsSubscribed(false);
            setSubscriptionTier(null);
            toast.info('Your trial has expired. Upgrade to keep premium perks!', {
              duration: 5000,
            });
          }
        }
      }
    };

    // Initial check
    updateSubscriptionState();

    // Set up check every minute to handle expiry in real-time
    const interval = setInterval(updateSubscriptionState, 60000);

    return () => clearInterval(interval);
  }, [user?.id, isSubscribed, subscriptionTier]);

  useEffect(() => {
    console.log('AuthProvider: Setting up Firebase auth state listener');

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

    // Set up the Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser?.email);

      const isGuestModeLocal = localStorage.getItem('codio_guest_mode') === 'true';

      if (isGuestModeLocal && !firebaseUser) {
        console.log('Ignoring null session because guest mode is active');
        return;
      }

      if (firebaseUser) {
        localStorage.removeItem('codio_guest_user');
        localStorage.removeItem('codio_guest_mode');

        const hybridUser: HybridUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          user_metadata: {
            full_name: firebaseUser.displayName,
            avatar_url: firebaseUser.photoURL
          }
        };

        if (user && user.id !== firebaseUser.uid) {
          clearUserSpecificData(user.id);
        }

        // Generate a fake session to satisfy older Supabase checks
        const fakeSession = {
          access_token: await firebaseUser.getIdToken(),
          user: hybridUser
        };

        setSession(fakeSession);
        setUser(hybridUser);

        // Setup Supabase bridging session silently behind the scenes if possible
        // This is optional if we bypass RLS for now or use the custom JWT approach

        fetchUserProfile(firebaseUser.uid);
      } else {
        if (user && !isGuestModeLocal) {
          clearUserSpecificData(user.id);
          setProfile(null);
          setSession(null);
          setUser(null);
          console.log('User signed out, clearing profile and user data');
        }
      }
    });

    const initAuth = async () => {
      const initTimeout = setTimeout(() => {
        if (initializing) {
          console.warn('Auth initialization timed out, proceeding with current state');
          setInitializing(false);
          // Fallback to guest if possible
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
      }, 1500);

      try {
        console.log('Initializing auth...');
        const hasGuest = !!localStorage.getItem('codio_guest_user');

        const currentUser = auth.currentUser;

        if (currentUser) {
          const hybridUser: HybridUser = {
            id: currentUser.uid,
            email: currentUser.email,
            user_metadata: {
              full_name: currentUser.displayName,
              avatar_url: currentUser.photoURL
            }
          };
          const fakeSession = {
            access_token: await currentUser.getIdToken(),
            user: hybridUser
          };
          setSession(fakeSession);
          setUser(hybridUser);
          await Promise.all([
            fetchUserProfile(currentUser.uid),
            checkSubscriptionStatus(currentUser.uid)
          ]);
        } else if (hasGuest && localStorage.getItem('codio_guest_mode') === 'true') {
          const guestData = JSON.parse(localStorage.getItem('codio_guest_user') || '{}');
          if (guestData.user) {
            setSession(guestData.session);
            setUser(guestData.user);
            setProfile(guestData.profile);
          }
        }
      } catch (err: any) {
        console.error('Error initializing auth:', err);
        // Fallback to cached guest data if offline/error
        const hasGuest = !!localStorage.getItem('codio_guest_user');
        if (hasGuest) {
          try {
            const guestData = JSON.parse(localStorage.getItem('codio_guest_user') || '{}');
            if (guestData.user) {
              setSession(guestData.session);
              setUser(guestData.user);
              setProfile(guestData.profile);
            }
          } catch (e) { }
        }
      } finally {
        clearTimeout(initTimeout);
        setInitializing(false);
      }
    };

    initAuth();

    // Check subscription status when app becomes visible (e.g. after return from purchase)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user) {
        console.log('App became visible, refreshing subscription status...');
        checkSubscriptionStatus(user.id);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user?.id]); // Depend on user.id to re-register when user changes

  // Real-time Profile Subscription
  useEffect(() => {
    if (!user) return;

    const dbId = toDatabaseId(user.id);
    console.log('Setting up real-time profile listener for:', dbId);

    const profileSubscription = supabase
      .channel(`profile_realtime_${dbId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${dbId}`
        },
        (payload) => {
          console.log('Real-time profile update received:', payload);
          if (payload.new) {
            setProfile(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up profile listener');
      supabase.removeChannel(profileSubscription);
    };
  }, [user?.id]);

  const checkSubscriptionStatus = async (userId: string) => {
    try {
      // Check for active subscription in user_subscriptions table
      const { data: subscriptions, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', toDatabaseId(userId))
        .eq('status', 'active')
        .order('end_date', { ascending: false });

      if (error) {
        console.error('Error checking subscription:', error);
        return;
      }

      if (subscriptions && subscriptions.length > 0) {
        const sub = subscriptions[0];
        const now = new Date();
        const endDate = new Date(sub.end_date);

        if (endDate > now) {
          setIsSubscribed(true);
          setSubscriptionTier(sub.plan_id as any);
          return;
        } else {
          // Update expired subscription
          await supabase
            .from('user_subscriptions')
            .update({ status: 'expired' })
            .eq('id', sub.id);
        }
      }

      setIsSubscribed(false);
      setSubscriptionTier('free');
    } catch (err) {
      console.error('Failed to check subscription:', err);
    }
  };

  const startTrial = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      // Check if user has already used a trial in their profile
      if (profile?.trial_start_date) {
        console.log('User has already used their trial:', profile.trial_start_date);
        return false;
      }

      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      const { error } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: toDatabaseId(user.id),
          plan_id: 'trial',
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          amount: 0
        });

      if (error) throw error;

      // Update profile with trial info
      await supabase
        .from('profiles')
        .update({
          plan: 'trial',
          trial_start_date: startDate.toISOString()
        })
        .eq('id', toDatabaseId(user.id));

      // Update localStorage immediately for instant UI feedback
      localStorage.setItem(`codio_trial_start_${user.id}`, startDate.toISOString());

      await checkSubscriptionStatus(user.id);
      return true;
    } catch (err) {
      console.error('Error starting trial:', err);
      return false;
    }
  };

  const fetchUserProfile = async (userId: string, retries = 5) => {
    try {
      console.log(`Fetching profile for user: ${userId} (Attempt ${6 - retries})`);

      const dbId = toDatabaseId(userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', dbId)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        if (retries > 0) {
          const delay = Math.min(1000 * (6 - retries), 5000);
          console.log(`Retrying profile fetch in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchUserProfile(userId, retries - 1);
        }
      }

      if (data) {
        console.log('Profile fetched successfully');
        setProfile(data);
        return;
      }

      // If no profile found, try to proactively create it one last time if it's a first-time user
      if (retries === 0) {
        console.log('No profile found after retries. Proactively creating fallback profile.');
        const fbUser = auth.currentUser;
        const dbId = toDatabaseId(userId);
        const newProfile = {
          id: dbId,
          user_id: dbId,
          username: fbUser?.displayName?.split(' ')[0].toLowerCase() || fbUser?.email?.split('@')[0] || `user_${userId.substring(0, 5)}`,
          full_name: fbUser?.displayName || null,
          avatar_url: fbUser?.photoURL || null,
          updated_at: new Date().toISOString()
        };

        const { data: created, error: createError } = await supabase
          .from('profiles')
          .upsert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Proactive profile creation failed:', createError);
          // Last resort fallback state
          setProfile(newProfile);
        } else {
          setProfile(created);
        }
      } else {
        // Retry logic for potential database replication lag
        const delay = 1000;
        console.log(`Profile not found yet (NULL), retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchUserProfile(userId, retries - 1);
      }
    } catch (error) {
      console.error('Unexpected error in fetchUserProfile:', error);
      if (retries > 0) {
        return fetchUserProfile(userId, retries - 1);
      }
    }
  };

  const refreshSubscription = async () => {
    if (user) {
      await checkSubscriptionStatus(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      // Firebase's onAuthStateChanged listener handles state updates automatically.

      console.log('Sign in successful');
      toast.success('Welcome back!', {
        description: 'You have successfully signed in.'
      });
    } catch (error: any) {
      console.error('Sign in failed:', error);

      // Check for network-related errors
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        toast.error('Connection Error', {
          description: 'Unable to connect to the server. Please check your internet connection and try again.'
        });
      } else if (error.code === 'auth/invalid-login-credentials' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Invalid Credentials', {
          description: 'Invalid email or password. Please try again.'
        });
      } else {
        toast.error('Sign In Failed', {
          description: error.message || 'An error occurred during sign in. Please try again.'
        });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      console.log('Signing up user:', email);
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newFirebaseUser = userCredential.user;

      // Ensure Profile is proactively created in Supabase database
      if (newFirebaseUser) {
        // Send verification email
        try {
          await sendEmailVerification(newFirebaseUser);
          console.log('Verification email sent');
        } catch (verifErr) {
          console.error('Error sending verification email:', verifErr);
        }

        try {
          console.log('Creating profile for new user:', newFirebaseUser.uid);
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: newFirebaseUser.uid,
              username: username || email.split('@')[0],
              full_name: username || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (profileError) {
            console.log('Profile creation note:', profileError.message);
          } else {
            console.log('Profile created successfully');
          }
        } catch (profileErr) {
          console.log('Profile creation fallback:', profileErr);
        }
      }

      console.log('Sign up successful');
      toast.success('Account created!', {
        description: 'Welcome to Codio!'
      });
    } catch (error: any) {
      console.error('Sign up failed:', error);

      // Check for network-related errors
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        toast.error('Connection Error', {
          description: 'Unable to connect to the server. Please check your internet connection and try again.'
        });
      } else if (error.code === 'auth/weak-password') {
        toast.error('Invalid Password', {
          description: 'Password should be at least 6 characters long.'
        });
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid Email', {
          description: 'Please enter a valid email address.'
        });
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error('Email Exists', {
          description: 'An account with this email already exists.'
        });
      } else {
        toast.error('Sign Up Failed', {
          description: error.message || 'An error occurred during sign up. Please try again.'
        });
      }
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

      // Sign out from Firebase
      await firebaseSignOut(auth);
      await supabase.auth.signOut(); // Just in case there's a dangling supabase session.

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

      const guestUser: HybridUser = {
        id: guestId,
        email: 'guest@codio.local',
        user_metadata: { username: 'Guest' },
      };

      const guestSession: any = {
        access_token: `guest_token_${guestId}`,
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

      // Save guest mode flag synchronously to prevent race conditions with onAuthStateChange listener
      localStorage.setItem('codio_guest_mode', 'true');

      // Update state first (fast, non-blocking)
      setSession(guestSession);
      setUser(guestUser);
      setProfile(guestProfile);
      setIsSubscribed(false);
      setSubscriptionTier('free');

      // Save full profile object to localStorage asynchronously to avoid blocking UI
      const saveToStorage = () => {
        try {
          localStorage.setItem('codio_guest_user', JSON.stringify(guestData));
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
    } catch (error: any) {
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
      refreshSubscription,
      startTrial
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
