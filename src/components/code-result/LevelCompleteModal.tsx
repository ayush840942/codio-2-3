import React, { useEffect, useState } from 'react';
import { Star, Sparkles, PartyPopper, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface LevelCompleteModalProps {
  show: boolean;
  xpReward: number;
  onNextLevel?: () => void;
}

const CONGRATS_MESSAGES = [
  "INCREDIBLE!",
  "YOU'RE A PRO!",
  "CODING MASTER!",
  "BRAVO!",
  "PURE GENIUS!",
  "LEVEL UP!",
  "FANTASTIC!",
  "SUPERB WORK!"
];

const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({ show, xpReward, onNextLevel }) => {
  const { playCartoonSuccess } = useSoundEffects();
  const [dialogue, setDialogue] = useState("");
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('settings_sound') === 'false');

  useEffect(() => {
    if (show) {
      const randomMsg = CONGRATS_MESSAGES[Math.floor(Math.random() * CONGRATS_MESSAGES.length)];
      setDialogue(randomMsg);

      // Defer any non-critical actions to avoid locking the rendering thread.
      setTimeout(() => {
        triggerCelebration();
      }, 500); // Wait 500ms to ensure the modal paints fully first without white-screening
    }
  }, [show]);

  const triggerCelebration = async () => {
    // We removed Haptics and Audio from the initial mount entirely to avoid WebView thread locking.
    // The playLevelComplete() already played an audio sound in PuzzleVerification, 
    // so we skip playing another massive audio file synchronously here.
  };

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    localStorage.setItem('settings_sound', newState ? 'false' : 'true');
    window.dispatchEvent(new Event('storage'));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 font-draw overflow-hidden">
      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none opacity-10">
        <h1 className="text-[20vw] font-black text-white italic rotate-[-10deg] leading-none">
          BOOM!
        </h1>
      </div>

      <div className="w-full max-w-sm sm:max-w-md relative z-20 animate-in zoom-in duration-300">
        <DrawnCard className="bg-white p-8 sm:p-10 relative overflow-visible shadow-comic-lg border-4 border-black">
          <button
            onClick={toggleMute}
            className="absolute -top-4 -right-4 w-12 h-12 bg-white border-3 border-black rounded-2xl shadow-comic-sm z-50 flex items-center justify-center active:scale-95 transition-transform"
          >
            {isMuted ? <VolumeX className="w-6 h-6 text-cc-pink" /> : <Volume2 className="w-6 h-6 text-black" />}
          </button>

          <div className="text-center relative z-10">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <div className="absolute inset-0 bg-cc-yellow/40 rounded-full opacity-50" />

              <div className="absolute -right-24 -top-4 z-50 pointer-events-none animate-in fade-in slide-in-from-left duration-500 delay-300">
                <div className="relative bg-cc-yellow border-3 border-black p-4 rounded-2xl shadow-comic flex items-center justify-center rotate-[8deg] min-w-[140px]">
                  <p className="text-black font-black text-xl italic uppercase tracking-tighter leading-none">
                    "{dialogue}"
                  </p>
                  <div className="absolute -left-3 bottom-3 w-6 h-6 bg-cc-yellow border-l-3 border-b-3 border-black rotate-[45deg]" />
                </div>
              </div>

              <div className="relative z-10 flex justify-center mt-2">
                <div className="relative">
                  <img
                    src="/cloud-mascot.jpg"
                    alt="Winner Mascot sticker"
                    className="w-44 h-44 object-contain scale-110 rounded-[40px]"
                  />
                  <div className="absolute inset-0 border-4 border-black rounded-[40px] pointer-events-none transform -rotate-2" />
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-cc-pink border-3 border-black p-2 rounded-xl shadow-comic-sm -rotate-[15deg] z-20">
                <PartyPopper className="w-8 h-8 text-black" />
              </div>
            </div>

            <h2 className="text-[3.5rem] sm:text-[4.5rem] font-black text-black leading-[0.8] tracking-tighter mb-6 italic uppercase"
              style={{ textShadow: '6px 6px 0px rgba(0,0,0,0.1)' }}>
              VICTORY!
            </h2>

            <div className="bg-cc-green/10 border-4 border-dashed border-cc-green/30 rounded-3xl p-6 mb-8 relative">
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-cc-yellow border-3 border-black rounded-2xl flex items-center justify-center shadow-comic-sm rotate-2">
                  <Star className="h-10 w-10 text-black fill-black" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-black/40 uppercase tracking-[0.2em]">XP EARNED</p>
                  <p className="text-5xl font-black text-black leading-none tracking-tighter">+{xpReward}</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-10 h-10 text-cc-yellow fill-cc-yellow" />
              </div>
            </div>

            <DrawnButton
              onClick={onNextLevel}
              className="w-full h-18 text-2xl bg-cc-green text-black border-4 border-black shadow-comic-lg font-black uppercase tracking-widest relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
              <div className="flex items-center justify-center gap-3">
                NEXT LEVEL <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" strokeWidth={4} />
              </div>
            </DrawnButton>
          </div>
        </DrawnCard>
      </div>
    </div>
  );
};

export default LevelCompleteModal;
