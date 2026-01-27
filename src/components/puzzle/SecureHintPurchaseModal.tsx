
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock } from 'lucide-react';
import DailyRewardModalSection from './modal/DailyRewardModalSection';
import { useSecureHintPurchase } from '@/hooks/useSecureHintPurchase';
import HintPackagesGrid from '../hint-store/HintPackagesGrid';

interface SecureHintPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHintsPurchased?: (amount: number) => void;
}

const SecureHintPurchaseModal: React.FC<SecureHintPurchaseModalProps> = ({ 
  isOpen, 
  onClose, 
  onHintsPurchased 
}) => {
  const handleSuccess = (amount: number) => {
    if (onHintsPurchased) {
      onHintsPurchased(amount);
    }
    setTimeout(() => {
      onClose();
    }, 1500);
  };
  
  const { purchaseHints, loading } = useSecureHintPurchase({ onSuccess: handleSuccess });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar bg-gradient-to-br from-blue-50/20 via-white to-purple-50/20 sm:rounded-2xl p-0">
        <DialogHeader className="p-6 pb-4 text-center">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-puzzle-blue to-puzzle-purple bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Shield className="w-8 h-8 text-puzzle-blue" />
            Secure Hint Purchase
          </DialogTitle>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Lock className="w-3 h-3 mr-1" />
              SSL Encrypted
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              Secure Payment
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="p-4 sm:p-6 pt-0 space-y-8">
          <DailyRewardModalSection />
          
          <HintPackagesGrid 
            loading={loading}
            onPurchase={purchaseHints}
            className="md:grid-cols-3"
          />
          
          <div className="text-center text-sm text-puzzle-gray/70 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800">Secure Transaction</span>
            </div>
            <p className="text-green-700">
              🔒 All payments are processed securely with industry-standard encryption. 
              Hint points are added to your account instantly after successful payment.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecureHintPurchaseModal;
