
import { useAuth } from '@/context/AuthContext';
import { useSecureSubscription } from '@/hooks/useSecureSubscription';
import { useRewards } from '@/context/RewardsContext';
import { HintPackage } from '@/data/hintPackages';
import { Plan } from '@/types/subscription';
import { toast } from 'sonner';
import { useAuthSecurity } from './useAuthSecurity';

interface UseSecureHintPurchaseProps {
  onSuccess?: (amount: number) => void;
}

export const useSecureHintPurchase = ({ onSuccess }: UseSecureHintPurchaseProps = {}) => {
  const { user } = useAuth();
  const { loading, handleSubscribe } = useSecureSubscription(user);
  const { addHints } = useRewards();
  const { requireEmailVerification, logSecurityEvent } = useAuthSecurity();

  const purchaseHints = async (pkg: HintPackage) => {
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please sign in to purchase hints"
      });
      return;
    }

    // Verify email for purchases over ₹500
    if (pkg.price > 500) {
      const canProceed = await requireEmailVerification('purchase hints over ₹500');
      if (!canProceed) {
        return;
      }
    }

    try {
      console.log(`Attempting secure hint purchase: ${pkg.name} for ₹${pkg.price}`);
      
      // Log security event
      await logSecurityEvent('hint_purchase_attempt', {
        package_id: pkg.id,
        package_name: pkg.name,
        price: pkg.price,
        hint_amount: pkg.hintAmount
      });
      
      const hintPlan: Plan = {
        id: `hint-${pkg.id}`,
        name: pkg.name,
        price: pkg.price,
        period: 'once',
        description: pkg.description,
        features: []
      };
      
      const result = await handleSubscribe(hintPlan, { 
        type: 'hint-purchase', 
        hintAmount: pkg.hintAmount 
      });
      
      console.log(`Secure hint purchase result: ${result}`);
      
      if (result > 0) {
        // Wait for database update to complete
        await addHints(pkg.hintAmount);
        
        // Log successful purchase
        await logSecurityEvent('hint_purchase_success', {
          package_id: pkg.id,
          hint_amount: pkg.hintAmount,
          price: pkg.price
        });
        
        if (onSuccess) {
          onSuccess(pkg.hintAmount);
        }
        
        toast.success("Hints Purchased Successfully!", {
          description: `You received ${pkg.hintAmount} hint points! They are now available in your account.`
        });
      }
    } catch (error) {
      console.error('Error in secure hint purchase:', error);
      
      // Log failed purchase
      await logSecurityEvent('hint_purchase_failed', {
        package_id: pkg.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      toast.error('Purchase Failed', {
        description: 'There was an error processing your purchase. Please try again or contact support.'
      });
    }
  };

  return { purchaseHints, loading };
};
