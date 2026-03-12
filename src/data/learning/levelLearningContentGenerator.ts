
import { LevelLearningContent, LearningPage, LearningConcept } from './types';
import { generateLevelPuzzle } from '@/utils/levelPuzzleGenerator';
import { FileText, Palette, Zap, Layers, Cpu, Database, Rocket, Code, Shield, Terminal } from 'lucide-react';
import { getLevelConfig } from '@/utils/levelManifest';

const getTopicIcon = (topic: string) => {
  if (topic.includes('HTML')) return FileText;
  if (topic.includes('CSS')) return Palette;
  if (topic.includes('JavaScript')) return Zap;
  if (topic.includes('React')) return Layers;
  if (topic.includes('OOP') || topic.includes('Algorithm') || topic.includes('Data Structure')) return Cpu;
  if (topic.includes('Database')) return Database;
  if (topic.includes('Security') || topic.includes('Crypto')) return Shield;
  if (topic.includes('Terminal') || topic.includes('DevOps')) return Terminal;
  if (topic.includes('Programming Fundamentals')) return Code;
  return Rocket;
};

/**
 * Generates structured learning content that is 100% synchronized with the actual puzzle.
 * This ensures that if a puzzle is HTML, the learning concept is also HTML.
 */
const generateDetailedLearningContent = (levelId: number): LevelLearningContent => {
  const { topic, difficulty } = getLevelConfig(levelId);
  const icon = getTopicIcon(topic);

  // Use generateLevelPuzzle to get the ACTUAL puzzle content being taught
  const puzzle = generateLevelPuzzle(levelId);

  const concepts: LearningConcept[] = [
    {
      name: topic,
      description: `In Level ${levelId}, you will practice **${topic}**. ${puzzle.description}`,
      example: puzzle.blocks[0]?.content || '',
      tips: puzzle.hints
    }
  ];

  const bugExercise = {
    question: `For level ${levelId} — which line of code is written correctly?`,
    options: [
      puzzle.blocks[0]?.content || '',
      (puzzle.blocks[0]?.content || '').replace('(', '').replace('"', ''),
      (puzzle.blocks[0]?.content || '') + ' // error'
    ].sort(() => Math.random() - 0.5),
    correctAnswer: puzzle.blocks[0]?.content || '',
    type: 'multiple-choice' as const
  };

  return {
    title: `${topic} — Level ${levelId}`,
    topic,
    icon,
    introduction: `Level ${levelId}: ${puzzle.title}. ${puzzle.description}`,
    pages: [
      {
        title: `What is ${topic}?`,
        content: `**${topic}** is your goal for this level. ${puzzle.description}\n\nStudy the concept below before attempting the puzzle.`,
        theory: `In ${difficulty} level programming, ${topic} is fundamental. You will use it to ${puzzle.description.toLowerCase()}.`,
        concepts,
        visualExample: puzzle.blocks.map(b => b.content).join('\n') + `\n// Expected: ${puzzle.expectedOutput}`,
        practiceHint: puzzle.hints[0] || 'Take your time and think through each step carefully.'
      },
      {
        title: 'Knowledge Check (Find the Bug)',
        content: `Test your understanding of **${topic}** before solving the puzzle. Which option is correct?`,
        type: 'interactive' as const,
        interactionType: 'multiple-choice' as const,
        exercise: bugExercise,
        concepts: [],
        visualExample: '',
        practiceHint: 'Look for syntax errors: wrong operators, misspelled keywords, or wrong method names!'
      },
      {
        title: 'Application Challenge',
        content: 'Apply what you have learned! Arrange the code blocks to produce the correct output.',
        concepts: [
          {
            name: 'Your Goal',
            description: `Complete the level ${levelId} challenge`,
            example: `Expected output:\n${puzzle.expectedOutput}`,
            tips: [
              `This level tests your knowledge of: ${topic}`,
              'Check your indentation carefully',
              'Match the target output exactly'
            ]
          }
        ],
        visualExample: `Target output:\n${puzzle.expectedOutput}`,
        practiceHint: puzzle.hints[1] || 'Remember what you learned in the previous steps!'
      }
    ],
    summary: `Great job completing Level ${levelId}! You've mastered another part of ${topic}.`,
    objectives: [
      `Understand and apply ${topic}`,
      `Produce the correct output: "${puzzle.expectedOutput}"`
    ]
  };
};

export const generateLevelLearningContent = generateDetailedLearningContent;
