
import { useState } from 'react';
import { toast } from "sonner";
import { Plan } from '@/types/subscription';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from './useRazorpay';
import { useSoundEffects } from './useSoundEffects';
import { useAuthSecurity } from './useAuthSecurity';
import { useAuth } from '@/context/AuthContext';
import { useRewards } from '@/context/RewardsContext';
import { secureGenerateOrderId, secureRecordPurchase } from '@/services/securePaymentService';

type SecureSubscriptionMetadata = {
  type: string;
  hintAmount?: number;
};

export const useSecureSubscription = (user: User | null) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { refreshSubscription } = useAuth();
  const { refreshRewards } = useRewards();
  const { processPayment } = useRazorpay();
  const {
    playPaymentProcessing,
    playPurchaseSuccess,
    playSubscriptionActivated,
    playHintPurchased,
    playError
  } = useSoundEffects();
  const {
    requireEmailVerification,
    logSecurityEvent,
    canAttemptLogin
  } = useAuthSecurity();

  const handleSubscribe = async (plan: Plan, metadata?: SecureSubscriptionMetadata): Promise<number> => {
    if (!user) {
      console.log('User not authenticated, redirecting to auth');
      playError();
      toast.error("Authentication Required", {
        description: "Please sign in to continue with your purchase"
      });
      navigate('/auth');
      return 0;
    }

    // Verify email for purchases over $50
    if (plan.price > 50) {
      const canProceed = await requireEmailVerification('make purchases over $50');
      if (!canProceed) {
        return 0;
      }
    }

    console.log('Starting secure subscription process for plan:', plan.id, 'user:', user.email);
    setLoading(plan.id);
    setIsProcessing(true);
    playPaymentProcessing();

    try {
      // Universal USD Pricing Logic
      const currency = 'USD';
      const amount = plan.price; // Use the plan price directly
      const amountInSubunits = Math.round(amount * 100);

      console.log(`Using universal USD Pricing: ${amount} ${currency}`);

      console.log(`Detected region currency: ${currency}, final amount: ${amount}`);

      // Log security event for purchase attempt
      await logSecurityEvent('purchase_attempt', {
        plan_id: plan.id,
        amount: amountInSubunits,
        currency,
        metadata
      });

      // Generate order ID with dynamic currency
      const orderData = await secureGenerateOrderId(amountInSubunits, user, metadata, currency);
      console.log('Secure order created with data:', orderData);

      // Create payment with enhanced security and dynamic currency
      const response = await processPayment({
        key: orderData.key_id,
        amount: amountInSubunits,
        currency: currency,
        name: "Codio",
        description: `${plan.name} - ${metadata?.type === 'hint-purchase' ? 'Hint Points' : 'Premium Subscription'}`,
        order_id: orderData.order_id,
        handler: async function () { }, // Will be overridden
        prefill: {
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Doodle Master',
          email: user.email || undefined,
          contact: user.phone || '9111111111' // Defaulting to a generic 10-digit number if missing
        },
        theme: {
          color: '#FFD93D', // Yellow to match Comic Theme
        },
        modal: {
          escape: true,
          backdrop: true
        }
      });

      console.log('Payment successful:', response);

      // Log successful payment
      await logSecurityEvent('payment_success', {
        plan_id: plan.id,
        amount: amountInSubunits,
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id
      });

      // Play victory sound early for immediate feedback
      if (metadata?.type === 'hint-purchase') {
        playHintPurchased();
      } else {
        playSubscriptionActivated();
      }

      console.log('Recording purchase in database...');
      // Record the purchase/subscription with enhanced security
      await secureRecordPurchase(
        user,
        plan.id,
        plan.price,
        response.razorpay_payment_id,
        response.razorpay_order_id,
        metadata?.hintAmount
      );

      console.log('Refreshing application state...');
      // Update local storage for immediate offline access
      if (metadata?.type !== 'hint-purchase') {
        localStorage.setItem('codio_premium', 'true');
        localStorage.setItem('codio_subscription_plan', plan.id || 'premium');
      }

      // We use a small delay to allow database replication/triggers if necessary
      await new Promise(resolve => setTimeout(resolve, 500));
      await Promise.all([
        refreshSubscription(),
        refreshRewards()
      ]);

      // Play success celebration
      playPurchaseSuccess();

      if (metadata?.type === 'hint-purchase' && metadata.hintAmount) {
        toast.success("Hints Purchased Successfully!", {
          description: `Successfully added ${metadata.hintAmount} hint points. Balance refreshed!`
        });
        return metadata.hintAmount;
      } else {
        toast.success(`Premium Activated!`, {
          description: `You now have full access to ${plan.name} features.`
        });
        navigate('/levels');
        return 1;
      }
    } catch (error) {
      console.error('Secure subscription process error:', error);
      playError();

      // Log security event for failed payment
      await logSecurityEvent('payment_failed', {
        plan_id: plan.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

      if (!errorMessage.includes('cancelled by user')) {
        toast.error("Transaction Failed", {
          description: errorMessage.includes('Payment server returned invalid response')
            ? "Payment service temporarily unavailable. Please try again in a few moments."
            : errorMessage // Use the real error message here for better debugging
        });
      }

      return 0;
    } finally {
      setLoading(null);
      setIsProcessing(false);
    }
  };

  return { loading, isProcessing, handleSubscribe };
};
