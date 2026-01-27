
import { PuzzleLevel } from '@/types/game';

export const masteryLevels: PuzzleLevel[] = [
  {
    id: 102,
    title: "Advanced Algorithm Design",
    description: "Master complex algorithmic thinking and optimization",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 103,
    title: "System Architecture",
    description: "Design scalable and maintainable system architectures",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 104,
    title: "Performance Optimization",
    description: "Optimize code for maximum performance and efficiency",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 105,
    title: "Security Implementation",
    description: "Implement robust security measures in applications",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "drag-drop",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 106,
    title: "Database Optimization",
    description: "Master advanced database design and optimization",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 107,
    title: "Microservices Architecture",
    description: "Design and implement microservices systems",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "drag-drop",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 108,
    title: "Machine Learning Integration",
    description: "Integrate ML models into production applications",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 109,
    title: "Real-time Systems",
    description: "Build systems that handle real-time data processing",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "drag-drop",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 110,
    title: "Distributed Computing",
    description: "Master distributed system design and implementation",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "code-completion",
    xpReward: 100,
    attempts: 0
  },
  {
    id: 111,
    title: "Advanced Testing Strategies",
    description: "Implement comprehensive testing frameworks",
    difficulty: "hard",
    topic: "Master Level",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: "drag-drop",
    xpReward: 100,
    attempts: 0
  }
];

// Generate remaining levels (112-200) with varied topics and difficulties
const generateRemainingLevels = (): PuzzleLevel[] => {
  const topics = [
    "Advanced JavaScript", "System Design", "Cloud Computing", 
    "Data Science", "Blockchain", "Game Development",
    "Computer Science", "Software Engineering"
  ];
  
  const difficulties: ("easy" | "medium" | "hard")[] = ["medium", "hard"];
  const puzzleTypes: ("drag-drop" | "multiple-choice" | "code-completion")[] = 
    ["drag-drop", "multiple-choice", "code-completion"];

  const levels: PuzzleLevel[] = [];
  
  for (let i = 112; i <= 200; i++) {
    const topicIndex = (i - 112) % topics.length;
    const difficultyIndex = (i - 112) % difficulties.length;
    const puzzleTypeIndex = (i - 112) % puzzleTypes.length;
    
    levels.push({
      id: i,
      title: `Master Challenge ${i - 101}`,
      description: `Advanced ${topics[topicIndex]} challenge`,
      difficulty: difficulties[difficultyIndex],
      topic: topics[topicIndex],
      isCompleted: false,
      isUnlocked: false,
      puzzleType: puzzleTypes[puzzleTypeIndex],
      xpReward: 80 + (i - 111) * 2,
      attempts: 0
    });
  }
  
  return levels;
};

export const allMasteryLevels = [...masteryLevels, ...generateRemainingLevels()];
