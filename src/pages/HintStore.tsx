import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { useRewards } from '@/context/RewardsContext';
import {
  ArrowLeft,
  Star,
  Sparkles,
  Gift,
  Zap,
  Check
} from 'lucide-react';
import { hintPackages } from '@/data/hintPackages';
import MobileHeader from '@/components/MobileHeader';
import { useHintPurchase } from '@/hooks/useHintPurchase';
import PaymentLoadingOverlay from '@/components/loading/PaymentLoadingOverlay';

const HintStorePage: React.FC = () => {
  const navigate = useNavigate();
  const { rewards, claimDailyReward, canClaimDaily } = useRewards();
  const { purchaseHints, loading, isProcessing } = useHintPurchase();

  const handleClaimDaily = async () => {
    await claimDailyReward();
  };

  return (
    <div className="min-h-[100dvh] pb-32">
      <PaymentLoadingOverlay isVisible={isProcessing} />
      <div className="px-6 space-y-12 max-w-md mx-auto" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
        {/* Unified Mobile Header */}
        <MobileHeader
          title="Hint Shop"
          showBack
          showStats
        />


        {/* Balance Card - Comic Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
        >
          <div className="bg-black rounded-[3rem] p-10 text-white relative overflow-hidden shadow-comic-lg border-4 border-black">
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-cc-blue text-xs font-black uppercase tracking-widest mb-4 italic">Available Credits</p>
              <div className="flex items-center gap-4 mb-2 relative">
                <div className="relative">
                  <Star className="w-16 h-16 text-cc-yellow fill-cc-yellow rotate-12 shadow-comic relative z-10" strokeWidth={3} />
                  <div className="absolute inset-0 bg-white/70 blur-xl rounded-full" />
                </div>
                <span className="text-7xl font-black tracking-tighter relative z-10">{rewards.hintPoints}</span>
              </div>
            </div>

            {/* Scribble decorations */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-cc-pink/30 rounded-full blur-3xl -translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-cc-blue/30 rounded-full blur-3xl translate-x-12 translate-y-12" />
          </div>
        </motion.div>

        {/* Daily Freebie - Sticker Style */}
        {canClaimDaily() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DrawnCard className="bg-cc-pink/10 border-4 border-black p-6 flex items-center justify-between shadow-comic rotate-[-1deg]">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-cc-yellow border-4 border-black rounded-2xl flex items-center justify-center shadow-comic-sm rotate-[-5deg]">
                  <Gift className="w-10 h-10 text-black px-1" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-xl font-black text-black leading-tight uppercase">Daily Gift!</p>
                  <p className="text-xs text-black/40 font-black italic uppercase tracking-widest">+15 Credits</p>
                </div>
              </div>
              <DrawnButton
                onClick={handleClaimDaily}
                className="bg-black text-white px-8 h-14 text-xl shadow-comic border-2 border-white/20"
              >
                CLAIM
              </DrawnButton>
            </DrawnCard>
          </motion.div>
        )}

        <div className="space-y-8 pb-12">
          <h2 className="text-3xl font-black text-black px-2 uppercase tracking-tighter italic">Hint Packs</h2>

          <div className="space-y-5">
            {hintPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <DrawnCard
                  className={`relative p-0 overflow-hidden border-4 border-black shadow-comic-lg rotate-[${index % 2 === 0 ? '1deg' : '-1deg'}] ${pkg.popular ? 'ring-4 ring-cc-blue/20 ring-offset-4 ring-offset-transparent' : ''
                    }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cc-pink border-3 border-black text-black text-[10px] font-black uppercase tracking-widest py-1.5 px-6 rounded-xl shadow-comic-sm z-10 italic">
                      SUPER DEAL!
                    </div>
                  )}

                  <div className="p-6 flex items-center gap-6 bg-white/60">
                    {/* Icon Container */}
                    <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shrink-0 border-4 border-black shadow-comic ${pkg.popular ? 'bg-cc-blue rotate-3' : 'bg-cc-green -rotate-3'
                      }`}>
                      <div className="relative">
                        <Star className="w-12 h-12 text-black fill-white" strokeWidth={3} />
                        {pkg.popular && (
                          <div className="absolute -top-3 -right-3">
                            <Sparkles className="w-8 h-8 text-black fill-cc-yellow shadow-comic-sm" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-black tracking-tighter">{pkg.hintAmount}</span>
                        <span className="text-sm font-black text-black/30 uppercase italic">Credits</span>
                      </div>
                      {pkg.discount && (
                        <div className="inline-block px-3 py-1 bg-cc-green border-2 border-black rounded-lg text-[10px] font-black text-black uppercase mt-2 tracking-widest">
                          -{pkg.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Price Button */}
                    <DrawnButton
                      onClick={() => purchaseHints(pkg)}
                      disabled={loading === pkg.id}
                      className={`h-16 px-6 text-2xl min-w-[120px] border-4 shadow-comic ${pkg.popular ? 'bg-cc-yellow' : 'bg-white'
                        }`}
                    >
                      {loading === pkg.id ? (
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        `$${pkg.price}`
                      )}
                    </DrawnButton>
                  </div>
                </DrawnCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Footer */}
        <div className="flex flex-col items-center gap-4 py-8 opacity-40">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-8 h-8 text-black" strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-widest">Instant</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Check className="w-8 h-8 text-black" strokeWidth={4} />
              <span className="text-[10px] font-black uppercase tracking-widest">Forever</span>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest italic text-center leading-relaxed">
            All digital goods are final sale<br />
            Secured by Codio High-Logic System
          </p>
        </div>

      </div>
    </div>
  );
};

export default HintStorePage;
