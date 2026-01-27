
import React from 'react';
import ModernOnboardingFlow from './ModernOnboardingFlow';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  return <ModernOnboardingFlow onComplete={onComplete} />;
};

export default OnboardingFlow;
