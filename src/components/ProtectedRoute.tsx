import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLoadingScreen from '@/components/loading/AppLoadingScreen';
import { SignInRequired } from '@/components/auth/SignInRequired';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowGuest?: boolean;
  feature?: string;
  featureKey?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowGuest = false,
  feature = "this feature",
  featureKey
}) => {
  const { user, loading, initializing, isSubscribed, subscriptionTier } = useAuth();
  const { hasFeature } = useSubscriptionFeatures();

  const isAdmin = localStorage.getItem('admin_authenticated') === 'true';

  // Distinguish between a real authenticated user and a guest user
  const isRealUser = user && user.app_metadata?.provider !== 'guest' && user.app_metadata?.provider !== undefined;
  const isGuestModeLocal = localStorage.getItem('codio_guest_mode') === 'true';
  const isGuestUser = user && (user.app_metadata?.provider === 'guest' || user.email === 'guest@codio.local');
  const isGuest = isGuestModeLocal || isGuestUser;

  // Only show the app-wide loading screen on initial initialization
  if (initializing && !isAdmin) {
    return <AppLoadingScreen message="Authenticating..." />;
  }

  // Always allow admin
  if (isAdmin) {
    return <>{children}</>;
  }

  // Check feature restrictions if a key is provided
  if (featureKey && !hasFeature(featureKey)) {
    // If signed in but no feature access -> Upgrade Required
    if (isRealUser) {
      return <SignInRequired feature={feature} isUpgrade={true} />;
    }
    // If guest or not signed in -> Sign In Required
    return <SignInRequired feature={feature} />;
  }

  // Always allow real authenticated users if feature check passed
  if (isRealUser) {
    return <>{children}</>;
  }

  // For guests, only allow access if the route is explicitly marked
  if (isGuest) {
    if (allowGuest) {
      return <>{children}</>;
    }
    // Show sign-in required for restricted features in guest mode
    return <SignInRequired feature={feature} />;
  }

  // Check if onboarding is complete
  const onboardingComplete = localStorage.getItem('codio_onboarding_complete') === 'true';

  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  // If not signed in at all
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;
