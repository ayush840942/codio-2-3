import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DailyReward3DProps {
  onClaim: () => void;
}

const DailyReward3D: React.FC<DailyReward3DProps> = ({ onClaim }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-500/30 rounded-3xl blur-xl transform scale-95" />
      
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-3xl p-5 overflow-hidden shadow-xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Sparkle particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <Sparkles className="w-4 h-4 text-white/40" />
            </motion.div>
          ))}
          
          {/* Rotating star */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-20 h-20 text-white/10" />
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Gift className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">Daily Reward</h3>
            </div>
            
            <p className="text-white/80 text-sm mb-4">
              Claim your free hints today!
            </p>
            
            {/* Claim Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onClaim}
                className="bg-white text-amber-600 hover:bg-white/95 font-bold rounded-xl px-6 shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Claim Now
              </Button>
            </motion.div>
          </div>
          
          {/* 3D Gift Box Animation */}
          <motion.div
            className="relative"
            animate={{
              y: [0, -8, 0],
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-20 h-20 relative">
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-black/20 rounded-full blur-sm" />
              
              {/* Gift Box */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,255,255,0.3)',
                      '0 0 40px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-8 h-8 text-white fill-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyReward3D;
