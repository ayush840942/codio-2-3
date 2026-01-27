
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, Award, RotateCcw, Lightbulb } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MasteryTest, TestQuestion, TestResult } from '@/types/mastery';
import { cn } from '@/lib/utils';

interface MasteryTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: MasteryTest;
  onComplete: (result: TestResult) => void;
}

type TestPhase = 'intro' | 'testing' | 'result';

const MasteryTestModal: React.FC<MasteryTestModalProps> = ({
  isOpen,
  onClose,
  test,
  onComplete
}) => {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(test.timeLimit * 60);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  // Timer
  useEffect(() => {
    if (phase !== 'testing') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setPhase('testing');
    setStartTime(Date.now());
    setTimeRemaining(test.timeLimit * 60);
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const goToNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowHint(false);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Calculate score
    let totalPoints = 0;
    let earnedPoints = 0;
    let correctAnswers = 0;

    test.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (Array.isArray(question.correctAnswer)) {
        if (question.correctAnswer.includes(userAnswer)) {
          earnedPoints += question.points;
          correctAnswers++;
        }
      } else if (userAnswer === question.correctAnswer) {
        earnedPoints += question.points;
        correctAnswers++;
      }
    });

    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const passed = percentage >= test.passingScore;

    const testResult: TestResult = {
      passed,
      score: earnedPoints,
      totalPoints,
      percentage,
      correctAnswers,
      totalQuestions: test.questions.length,
      timeSpent,
      improvements: getImprovements(test.questions, answers),
      certificate: passed ? {
        language: test.language,
        level: test.difficulty,
        issuedAt: new Date().toISOString()
      } : undefined
    };

    setResult(testResult);
    setPhase('result');
    onComplete(testResult);
  }, [answers, test, startTime, onComplete]);

  const getImprovements = (questions: TestQuestion[], userAnswers: Record<string, string>): string[] => {
    const improvements: string[] = [];
    
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      const isCorrect = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.includes(userAnswer)
        : userAnswer === question.correctAnswer;
      
      if (!isCorrect && question.explanation) {
        improvements.push(question.explanation);
      }
    });

    return improvements.slice(0, 3); // Return top 3 improvements
  };

  const resetTest = () => {
    setPhase('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(test.timeLimit * 60);
    setShowHint(false);
    setResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => phase === 'intro' && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{test.title}</h2>
                <p className="text-muted-foreground">{test.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">{test.totalQuestions}</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">{test.timeLimit}</div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">{test.passingScore}%</div>
                  <div className="text-xs text-muted-foreground">To Pass</div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    <p className="font-medium mb-1">Before you begin:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
                      <li>You cannot pause the test once started</li>
                      <li>Each question has one correct answer</li>
                      <li>Use hints wisely - they won't affect your score</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={startTest} className="flex-1">
                  Start Test
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {phase === 'testing' && currentQuestion && (
            <motion.div
              key="testing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {test.questions.length}
                </div>
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                  timeRemaining < 60 ? "bg-red-500/10 text-red-500" : "bg-muted text-foreground"
                )}>
                  <Clock className="w-4 h-4" />
                  {formatTime(timeRemaining)}
                </div>
              </div>

              <Progress value={progress} className="h-1 mb-6" />

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.code && (
                  <pre className="bg-muted p-4 rounded-xl text-sm overflow-x-auto mb-4 font-mono">
                    {currentQuestion.code}
                  </pre>
                )}

                {/* Code Write Question Type */}
                {currentQuestion.type === 'code-write' ? (
                  <div className="space-y-3">
                    <textarea
                      value={answers[currentQuestion.id] || currentQuestion.starterCode || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Write your code here..."
                      className="w-full min-h-[150px] p-4 rounded-xl font-mono text-sm bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary resize-y"
                      spellCheck={false}
                    />
                    {currentQuestion.expectedOutput && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Expected Output:</p>
                        <code className="text-sm text-green-600 dark:text-green-400 font-mono">
                          {currentQuestion.expectedOutput}
                        </code>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Multiple Choice Options */
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option)}
                        className={cn(
                          "w-full p-4 rounded-xl text-left transition-all",
                          "border-2",
                          answers[currentQuestion.id] === option
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card hover:border-primary/50 text-foreground"
                        )}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hint */}
              {currentQuestion.hint && (
                <div className="mb-6">
                  {showHint ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                        <p className="text-sm text-foreground">{currentQuestion.hint}</p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHint(true)}
                      className="text-primary"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Show Hint
                    </Button>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-end">
                <Button
                  onClick={goToNext}
                  disabled={!answers[currentQuestion.id]}
                >
                  {currentQuestionIndex === test.questions.length - 1 ? 'Submit Test' : 'Next Question'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {phase === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 text-center"
            >
              {/* Result icon */}
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
                result.passed
                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                  : "bg-gradient-to-br from-red-500 to-rose-600"
              )}>
                {result.passed ? (
                  <CheckCircle className="w-12 h-12 text-white" />
                ) : (
                  <XCircle className="w-12 h-12 text-white" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">
                {result.passed ? '🎉 Congratulations!' : 'Keep Practicing!'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {result.passed
                  ? `You've mastered ${test.language}!`
                  : `You need ${test.passingScore}% to pass. Try again!`}
              </p>

              {/* Score breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className={cn(
                    "text-3xl font-bold",
                    result.passed ? "text-green-500" : "text-red-500"
                  )}>
                    {result.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="text-3xl font-bold text-foreground">
                    {result.correctAnswers}/{result.totalQuestions}
                  </div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="text-3xl font-bold text-foreground">
                    {formatTime(result.timeSpent)}
                  </div>
                  <div className="text-xs text-muted-foreground">Time</div>
                </div>
              </div>

              {/* Improvements */}
              {!result.passed && result.improvements.length > 0 && (
                <div className="bg-muted/30 rounded-xl p-4 mb-6 text-left">
                  <h4 className="font-medium text-foreground mb-2">Areas to improve:</h4>
                  <ul className="space-y-2">
                    {result.improvements.map((imp, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {result.passed ? (
                  <Button onClick={onClose} className="flex-1">
                    <Award className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={onClose} className="flex-1">
                      Close
                    </Button>
                    <Button onClick={resetTest} className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default MasteryTestModal;
