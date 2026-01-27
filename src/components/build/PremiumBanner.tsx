
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface PremiumBannerProps {
  user: User | null;
  loading: string | null;
  onUpgrade: () => void;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({ user, loading, onUpgrade }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="mb-4"
    >
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-center md:text-left">
              <Crown className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="font-bold text-purple-900 text-sm md:text-base">Unlock Premium Features</h3>
                <p className="text-xs md:text-sm text-purple-700">Advanced templates, unlimited exports, and more!</p>
              </div>
            </div>
            <Button 
              onClick={onUpgrade} 
              disabled={loading === 'premium-monthly'} 
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 text-xs md:text-sm w-full md:w-auto whitespace-nowrap"
            >
              {loading === 'premium-monthly' ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                'Upgrade ₹49/month'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumBanner;
