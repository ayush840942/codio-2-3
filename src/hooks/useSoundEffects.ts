
import { soundEffects } from '@/utils/soundEffects';

export const useSoundEffects = () => {
  const playBlockClick = () => soundEffects.blockClick();
  const playBlockPlace = () => soundEffects.blockPlace();
  const playBlockRemove = () => soundEffects.blockRemove();
  const playSuccess = () => soundEffects.success();
  const playError = () => soundEffects.error();
  const playRunCode = () => soundEffects.runCode();
  const playLevelComplete = () => soundEffects.levelComplete();
  const playButtonPress = () => soundEffects.buttonPress();
  const playHintReveal = () => soundEffects.hintReveal();
  const playMenuOpen = () => soundEffects.menuOpen();
  const playMenuClose = () => soundEffects.menuClose();
  const playPageTransition = () => soundEffects.pageTransition();
  const playNotification = () => soundEffects.notification();
  const playAchievement = () => soundEffects.achievement();
  const playCardFlip = () => soundEffects.cardFlip();
  const playSwipe = () => soundEffects.swipe();
  const playPurchaseSuccess = () => soundEffects.purchaseSuccess();
  const playPaymentProcessing = () => soundEffects.paymentProcessing();
  const playSubscriptionActivated = () => soundEffects.subscriptionActivated();
  const playHintPurchased = () => soundEffects.hintPurchased();
  const playLevelUnlock = () => soundEffects.levelUnlock();
  const playLoading = () => soundEffects.loading();
  const playStreakBonus = () => soundEffects.streakBonus();
  const playCartoonSuccess = () => soundEffects.playCartoonSuccess();

  return {
    playBlockClick,
    playBlockPlace,
    playBlockRemove,
    playSuccess,
    playError,
    playRunCode,
    playLevelComplete,
    playButtonPress,
    playHintReveal,
    playMenuOpen,
    playMenuClose,
    playPageTransition,
    playNotification,
    playAchievement,
    playCardFlip,
    playSwipe,
    playPurchaseSuccess,
    playPaymentProcessing,
    playSubscriptionActivated,
    playHintPurchased,
    playLevelUnlock,
    playLoading,
    playStreakBonus,
    playCartoonSuccess
  };
};
