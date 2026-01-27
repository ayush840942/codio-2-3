
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Clock, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DailyHintActionsProps {
  canClaim: boolean;
  freeHintDays: number;
  timeRemaining: string;
  canClaimDaily: boolean;
  onClaim: () => void;
}

const DailyHintActions: React.FC<DailyHintActionsProps> = ({
  canClaim,
  freeHintDays,
  timeRemaining,
  canClaimDaily,
  onClaim
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={canClaim ? 'claimable' : 'claimed'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full"
        >
          <Button
            onClick={onClaim}
            disabled={!canClaim}
            className={`
              w-full h-16 font-bold text-lg rounded-3xl transition-all duration-300 border-0 shadow-lg
              ${canClaim
                ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 text-white hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              }
            `}
          >
            <div className="flex items-center justify-center gap-4">
              {canClaim ? (
                <>
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-lg">Claim Daily Reward</span>
                    <span className="text-sm opacity-90 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      5 Free Hints
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  {freeHintDays <= 0 ? (
                    <>
                      <div className="w-8 h-8 bg-slate-400 rounded-2xl flex items-center justify-center">
                        <Gift className="h-4 w-4" />
                      </div>
                      <span>Challenge Complete</span>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-emerald-400 rounded-2xl flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span>Claimed Today</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </Button>
        </motion.div>
      </AnimatePresence>
      
      {timeRemaining && !canClaimDaily && freeHintDays > 0 && (
        <motion.div 
          className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl border border-orange-200 shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-orange-600 font-medium">Next claim in</div>
            <div className="font-mono font-bold text-orange-800 text-xl">{timeRemaining}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DailyHintActions;
