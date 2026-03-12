import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ComicMascot from '@/components/ui/ComicMascot';
import { Monitor, Smartphone, Laptop } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const ModernOnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    reason: '',
    describes: '',
    experience: 'none',
    interest: '',
    platform: ''
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Codio!',
      subtitle: 'To build your personal curriculum, we will ask you a few questions.',
      type: 'welcome' as const,
      pose: 'welcome' as const
    },
    {
      id: 'reason',
      title: 'Why are you learning to code?',
      type: 'choice' as const,
      options: [
        { icon: '💻', label: 'To become a professional developer' },
        { icon: '🍦', label: 'Just for fun' },
        { icon: '📋', label: 'For my current job' },
        { icon: '🌱', label: 'To build apps, websites, or internal tools for work' }
      ]
    },
    {
      id: 'learn',
      title: 'Learn to code',
      subtitle: 'Master the skills to read and write code, build apps and games, and advance your career',
      pose: 'study' as const,
      type: 'info' as const,
    },
    {
      id: 'describes',
      title: 'Which of these describes you best?',
      type: 'choice' as const,
      options: [
        { icon: '🎒', label: 'High school student' },
        { icon: '🎓', label: 'University student' },
        { icon: '💼', label: 'Employee' },
        { icon: '💻', label: 'Self-employed' },
        { icon: '🌱', label: 'None of these' }
      ]
    },
    {
      id: 'languages',
      title: "You'll fit right in",
      subtitle: 'Most of our learners are looking to change their careers',
      type: 'info' as const,
      showLanguages: true
    },
    {
      id: 'experience',
      title: 'How much coding experience do you have?',
      type: 'slider' as const,
      subtitle: "You're about to start your journey"
    },
    {
      id: 'interest',
      title: 'What do you find the most interesting?',
      type: 'choice' as const,
      options: [
        { icon: '👾', label: 'Games' },
        { icon: '💻', label: 'Web apps' },
        { icon: '🌱', label: "I'm not sure" }
      ]
    },
    {
      id: 'captivates',
      title: 'Which aspect of coding captivates you?',
      type: 'choice' as const,
      options: [
        { icon: '🖼️', label: 'How things look (appearance)' },
        { icon: '💻', label: 'How things work (logic)' },
        { icon: '💻💡', label: "I'm intrigued by both" }
      ]
    },
    {
      id: 'platform',
      title: 'Where do you want to learn to code?',
      type: 'choice' as const,
      options: [
        { icon: 'phone', label: 'Mostly on the phone' },
        { icon: 'desktop', label: 'Mostly on the computer' },
        { icon: 'both', label: 'On the phone & computer' }
      ]
    },
    {
      id: 'mission',
      title: '10M+ people have learned Web Development with Codio',
      subtitle: "It's our mission to help you reach your coding goals too",
      type: 'final' as const,
      showPeople: true
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSelect = (field: string, value: string) => {
    setSelections({ ...selections, [field]: value });
    setTimeout(handleNext, 300);
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            {/* Progress Dots */}
            {currentStepData.type !== 'welcome' && (
              <div className="flex justify-center gap-2 mb-12">
                {steps.slice(1).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${idx < currentStep ? 'w-2 bg-purple-600' :
                      idx === currentStep ? 'w-8 bg-purple-600' :
                        'w-2 bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Welcome Screen */}
            {currentStepData.type === 'welcome' && (
              <div className="text-center space-y-8">
                <div className="w-48 h-48 mx-auto flex items-center justify-center">
                  <ComicMascot
                    pose="welcome"
                    size="xl"
                    animated={true}
                  />
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {currentStepData.title}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
            )}

            {/* Info Screens */}
            {currentStepData.type === 'info' && (
              <div className="text-center space-y-8">
                {currentStepData.showLanguages ? (
                  <div className="relative flex items-center justify-center h-64">
                    <ComicMascot pose="study" size="lg" />
                    <div className="absolute top-0 right-12">
                      <div className="text-4xl">JS</div>
                    </div>
                    <div className="absolute top-8 left-8">
                      <div className="text-4xl">🔷</div>
                    </div>
                    <div className="absolute bottom-12 left-16">
                      <div className="text-4xl">🔴</div>
                    </div>
                    <div className="absolute bottom-8 right-8">
                      <div className="text-4xl">🐍</div>
                    </div>
                    <div className="absolute top-16 right-24">
                      <div className="text-4xl">⚛️</div>
                    </div>
                    <div className="absolute bottom-20 right-20">
                      <div className="text-4xl text-orange-600">HTML5</div>
                    </div>
                    <div className="absolute top-24 left-20">
                      <div className="text-4xl">TS</div>
                    </div>
                    <div className="absolute bottom-16 left-24">
                      <div className="text-4xl text-red-600">🔺</div>
                    </div>
                  </div>
                ) : currentStepData.showPeople ? (
                  <div className="space-y-6">
                    <div className="text-6xl">🧑‍💻👩‍💻🧑‍💼</div>
                  </div>
                ) : (
                  <div className="w-48 h-48 mx-auto flex items-center justify-center">
                    <ComicMascot pose={currentStepData.pose || "welcome"} size="xl" />
                  </div>
                )}
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentStepData.title}
                  </h1>
                  <p className="text-base text-gray-600">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
            )}

            {/* Final Screen */}
            {currentStepData.type === 'final' && (
              <div className="text-center space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-5xl">🧑‍💻</div>
                    <ComicMascot pose="winner" size="md" />
                    <div className="text-5xl">👩‍💻</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentStepData.title}
                  </h1>
                  <p className="text-base text-gray-600">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
            )}

            {/* Choice Screens */}
            {currentStepData.type === 'choice' && (
              <div className="space-y-8">
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                  {currentStepData.title}
                </h1>
                <div className="space-y-4">
                  {currentStepData.options?.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSelect(currentStepData.id, option.label)}
                      className="w-full flex items-center gap-4 p-5 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-3xl flex items-center justify-center w-12 h-12">
                        {typeof option.icon === 'string' ? (
                          option.icon
                        ) : option.icon === 'phone' ? (
                          <Smartphone />
                        ) : option.icon === 'desktop' ? (
                          <Monitor />
                        ) : option.icon === 'both' ? (
                          <Laptop />
                        ) : (
                          option.icon
                        )}
                      </div>
                      <span className="text-lg font-medium text-gray-900 text-left">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Slider Screen */}
            {currentStepData.type === 'slider' && (
              <div className="space-y-12">
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                  {currentStepData.title}
                </h1>
                <div className="space-y-8">
                  <div className="flex items-center justify-center">
                    <ComicMascot pose="thinking" size="lg" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span>NONE</span>
                      <span>A LITTLE</span>
                      <span>A LOT</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="0"
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-600"
                      onChange={(e) => setSelections({ ...selections, experience: e.target.value })}
                    />
                  </div>
                  <p className="text-center text-gray-600">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleNext}
          className="w-full py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
        >
          {currentStep === 0 ? "Let's go" :
            currentStep === steps.length - 1 ? 'Get started' :
              'Continue'}
        </Button>
        {currentStep === 2 && (
          <button
            onClick={handleNext}
            className="w-full mt-4 py-4 text-lg font-semibold text-purple-600 hover:text-purple-700"
          >
            I already have an account
          </button>
        )}
      </div>
    </div>
  );
};

export default ModernOnboardingFlow;
