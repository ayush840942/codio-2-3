
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import { LanguageMastery, LANGUAGE_CONFIG } from '@/types/mastery';
import { toast } from 'sonner';

const LANGUAGE_LEVEL_RANGES: Record<string, { start: number; end: number }> = {
  'Basic Programming': { start: 1, end: 6 },
  'HTML': { start: 7, end: 11 },
  'CSS': { start: 12, end: 16 },
  'JavaScript': { start: 17, end: 21 },
  'React': { start: 22, end: 26 },
  'Python': { start: 27, end: 36 },
  'TypeScript': { start: 37, end: 46 },
  'C++': { start: 47, end: 56 },
  'C#': { start: 57, end: 66 },
  'Dart': { start: 67, end: 76 },
  'Go': { start: 77, end: 86 },
  'Kotlin': { start: 87, end: 96 },
  'Swift': { start: 97, end: 106 }
};

interface TestResult {
  language: string;
  passed: boolean;
  score: number;
  attempts: number;
  completedAt?: string;
}

const STORAGE_KEY = 'codio_mastery_tests';

export const useLanguageMastery = () => {
  const { gameState } = useGame();
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestResults = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTestResults(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading test results:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTestResults();
  }, [user]);

  const languageMasteries = useMemo((): LanguageMastery[] => {
    return Object.entries(LANGUAGE_LEVEL_RANGES).map(([language, range]) => {
      const levelsInRange = gameState.levels.filter(
        level => level.id >= range.start && level.id <= range.end
      );
      const completedLevels = levelsInRange.filter(l => l.isCompleted).length;
      const totalLevels = levelsInRange.length;
      const masteryPercent = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;
      const testResult = testResults[language];
      const config = LANGUAGE_CONFIG[language] || { icon: '📚', color: 'from-gray-500 to-gray-600', description: 'Programming language' };

      return {
        language,
        totalLevels,
        completedLevels,
        masteryPercent,
        isMastered: masteryPercent === 100,
        testPassed: testResult?.passed || false,
        testScore: testResult?.score,
        testAttempts: testResult?.attempts || 0,
        masteredAt: testResult?.completedAt,
        icon: config.icon,
        color: config.color,
        description: config.description
      };
    });
  }, [gameState.levels, testResults]);

  const isTestAvailable = useCallback((language: string): boolean => {
    const mastery = languageMasteries.find(m => m.language === language);
    return mastery?.isMastered || false;
  }, [languageMasteries]);

  const hasPassedTest = useCallback((language: string): boolean => {
    const mastery = languageMasteries.find(m => m.language === language);
    return mastery?.testPassed || false;
  }, [languageMasteries]);

  const saveTestResult = useCallback(async (language: string, passed: boolean, score: number): Promise<void> => {
    const currentResult = testResults[language];
    const newAttempts = (currentResult?.attempts || 0) + 1;
    const newResults = {
      ...testResults,
      [language]: { language, passed, score, attempts: newAttempts, completedAt: passed ? new Date().toISOString() : undefined }
    };
    setTestResults(newResults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResults));
    if (passed) toast.success(`🎉 Congratulations! You've mastered ${language}!`);
  }, [testResults]);

  const overallStats = useMemo(() => {
    const totalLanguages = languageMasteries.length;
    const masteredLanguages = languageMasteries.filter(m => m.isMastered).length;
    const certifiedLanguages = languageMasteries.filter(m => m.testPassed).length;
    const totalLevels = languageMasteries.reduce((sum, m) => sum + m.totalLevels, 0);
    const completedLevels = languageMasteries.reduce((sum, m) => sum + m.completedLevels, 0);
    return { totalLanguages, masteredLanguages, certifiedLanguages, totalLevels, completedLevels, overallProgress: totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0 };
  }, [languageMasteries]);

  return { languageMasteries, isTestAvailable, hasPassedTest, saveTestResult, overallStats, isLoading, testResults };
};
