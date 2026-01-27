import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Star, Gift, Trophy } from 'lucide-react';
import { HintPackage, hintPackages } from '@/data/hintPackages';

interface GameStyleHintStoreProps {
  loading: string | null;
  onPurchase: (pkg: HintPackage) => void;
  currentHints: number;
}

const GameStyleHintStore: React.FC<GameStyleHintStoreProps> = ({ 
  loading, 
  onPurchase,
  currentHints 
}) => {
  const packages = [
    {
      id: '10-hints',
      name: 'Starter Pack',
      hints: 10,
      price: 49,
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-600',
      popular: false
    },
    {
      id: '25-hints',
      name: 'Power Pack',
      hints: 25,
      price: 99,
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-400 to-purple-600',
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: '50-hints',
      name: 'Pro Pack',
      hints: 50,
      price: 149,
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-600',
      popular: false,
      badge: 'Best Value'
    },
    {
      id: '100-hints',
      name: 'Ultimate Pack',
      hints: 100,
      price: 249,
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-pink-400 to-red-600',
      popular: false,
      badge: 'Premium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Balance */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden"
      >
        <Card className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-90 mb-1">Your Hint Balance</p>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                  <span className="text-4xl font-bold">{currentHints}</span>
                  <span className="text-lg opacity-80">hints</span>
                </div>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <Gift className="h-10 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Hint Store</h2>
        <p className="text-gray-600">Power up your learning journey!</p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 gap-4">
        {packages.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={`relative overflow-hidden border-2 ${
              pkg.popular ? 'border-purple-500 shadow-lg shadow-purple-200' : 'border-gray-200'
            }`}>
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {pkg.badge}
                  </div>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {pkg.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-bold text-gray-900">
                        {pkg.hints}
                      </span>
                      <span className="text-gray-600">hints</span>
                    </div>
                    
                    {/* Price and Button */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{pkg.price}
                      </div>
                      <Button
                        onClick={() => {
                          const hintPkg = hintPackages.find(p => p.hintAmount === pkg.hints);
                          if (hintPkg) onPurchase(hintPkg);
                        }}
                        disabled={loading === pkg.id}
                        className={`bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all`}
                      >
                        {loading === pkg.id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Buying...</span>
                          </div>
                        ) : (
                          'Buy Now'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-semibold text-blue-900">
              Hints never expire
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-semibold text-purple-900">
              Instant delivery
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameStyleHintStore;
