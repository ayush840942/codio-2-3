import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { useHintPurchase } from '@/hooks/useHintPurchase';

const HintStorePage: React.FC = () => {
  const navigate = useNavigate();
  const { rewards, claimDailyReward, canClaimDaily } = useRewards();
  const { purchaseHints, loading } = useHintPurchase();

  const handleClaimDaily = async () => {
    await claimDailyReward();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-[calc(var(--safe-area-top)+1rem)] space-y-6 max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-black/5"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Button>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Hint Store</h1>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-slate-200">
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Available Hints</p>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-8 h-8 text-pastel-yellow fill-pastel-yellow animate-pulse" />
                <span className="text-5xl font-black">{rewards.hintPoints}</span>
              </div>
            </div>
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-x-10 -translate-y-10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl translate-x-10 translate-y-10" />
          </div>
        </motion.div>

        {/* Daily Freebie */}
        {canClaimDaily() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl p-4 border-2 border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pastel-yellow/30 rounded-2xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 leading-tight">Daily Free Gift</p>
                  <p className="text-xs text-slate-500 font-medium">5 Free Hints</p>
                </div>
              </div>
              <Button
                onClick={handleClaimDaily}
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold px-5 h-10"
              >
                Claim
              </Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-800 px-1">Packs</h2>

          <div className="space-y-3">
            {hintPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <div
                  className={`relative group rounded-[2rem] border-2 transition-all duration-200 active:scale-95 ${pkg.popular
                      ? 'bg-white border-puzzle-purple/50 shadow-lg shadow-puzzle-purple/20'
                      : 'bg-white border-slate-100 shadow-sm'
                    }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-puzzle-purple text-white text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-sm z-10">
                      Most Popular
                    </div>
                  )}

                  <div className="p-4 flex items-center gap-4">
                    {/* Icon Container */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${pkg.popular ? 'bg-puzzle-purple/10' : 'bg-slate-50'
                      }`}>
                      <div className="relative">
                        <Star className={`w-8 h-8 ${pkg.popular ? 'text-puzzle-purple fill-puzzle-purple' : 'text-slate-400'
                          }`} />
                        {pkg.popular && (
                          <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="absolute -top-1 -right-1"
                          >
                            <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-slate-800">{pkg.hintAmount}</span>
                        <span className="text-sm font-bold text-slate-500">Hints</span>
                      </div>
                      {pkg.discount && (
                        <p className="text-xs text-green-500 font-bold">
                          Save {pkg.discount}%
                        </p>
                      )}
                    </div>

                    {/* Price Button */}
                    <Button
                      onClick={() => purchaseHints(pkg)}
                      disabled={loading === pkg.id}
                      className={`h-12 px-6 rounded-2xl font-black min-w-[100px] transition-all ${pkg.popular
                          ? 'bg-puzzle-purple hover:bg-puzzle-purple/90 text-white shadow-md shadow-puzzle-purple/30'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                        }`}
                    >
                      {loading === pkg.id ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        `₹${pkg.price}`
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits text */}
        <div className="flex items-center justify-center gap-6 py-4 opacity-50">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400">Instant</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400">Permanent</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HintStorePage;
