import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import MobileOptimizedLayout from '@/components/MobileOptimizedLayout';

/**
 * Checks if the onboarding flow has been completed. If not, redirects the user
 * to the onboarding page. Otherwise renders the main mobile layout.
 */
const OnboardingRedirect: React.FC = () => {
    const onboardingComplete = localStorage.getItem('codio_onboarding_complete') === 'true';
    const location = useLocation();

    // Debug logging to verify redirect logic
    // console.log('Onboarding check:', { onboardingComplete, path: location.pathname });

    if (!onboardingComplete && location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" replace />;
    }
    return <MobileOptimizedLayout />;
};

export default OnboardingRedirect;
