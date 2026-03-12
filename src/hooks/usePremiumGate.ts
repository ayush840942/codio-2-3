import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSubscriptionFeatures } from './useSubscriptionFeatures';

export interface GateResult {
    allowed: boolean;
    reason?: string;
    requiredTier?: 'trial' | 'pro' | 'elite';
}

// ─── Trial Status ────────────────────────────────────────────────────────────
export const useTrialStatus = () => {
    const { user } = useAuth();

    const trialKey = user ? `codio_trial_start_${user.id}` : null;
    const trialDays = 7;

    const getTrialStartDate = (): Date | null => {
        if (!trialKey) return null;
        const raw = localStorage.getItem(trialKey);
        if (!raw) return null;
        return new Date(raw);
    };

    const startTrial = () => {
        if (!trialKey) return;
        if (!localStorage.getItem(trialKey)) {
            localStorage.setItem(trialKey, new Date().toISOString());
        }
    };

    const trialStart = getTrialStartDate();
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;

    const daysUsed = trialStart
        ? Math.floor((now.getTime() - trialStart.getTime()) / msPerDay)
        : 0;

    const daysRemaining = Math.max(0, trialDays - daysUsed);
    const isTrialActive = !!trialStart && daysRemaining > 0;
    const isTrialExpired = !!trialStart && daysRemaining === 0;

    return { isTrialActive, isTrialExpired, daysRemaining, startTrial };
};

// ─── Premium Gate ─────────────────────────────────────────────────────────────
export const usePremiumGate = () => {
    const { isSubscribed, subscriptionTier } = useAuth();
    const { canAccessLevel, hasFeature } = useSubscriptionFeatures();
    const { isTrialActive } = useTrialStatus();

    const checkLevelAccess = useCallback(
        (levelId: number): GateResult => {
            if (isSubscribed) return { allowed: true };
            if (canAccessLevel(levelId)) return { allowed: true };

            return {
                allowed: false,
                reason: `Level ${levelId} requires a Premium subscription.`,
                requiredTier: 'trial',
            };
        },
        [isSubscribed, canAccessLevel]
    );

    const checkFeatureAccess = useCallback(
        (feature: string): GateResult => {
            if (isSubscribed) return { allowed: true };
            if (hasFeature(feature)) return { allowed: true };

            const tier =
                ['memos', 'playground', 'codeBuilder', 'code_battles'].includes(feature)
                    ? 'pro'
                    : 'trial';

            return {
                allowed: false,
                reason: `${feature} requires a ${tier === 'pro' ? 'Pro or Elite' : 'Premium'} subscription.`,
                requiredTier: tier,
            };
        },
        [isSubscribed, hasFeature]
    );

    return { checkLevelAccess, checkFeatureAccess, isSubscribed, subscriptionTier };
};
