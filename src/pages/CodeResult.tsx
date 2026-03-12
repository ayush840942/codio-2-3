import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileHeader from "@/components/MobileHeader";
import { useGame } from '@/context/GameContext';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import LevelCompleteModal from '@/components/code-result/LevelCompleteModal';
import CodeResultHeader from '@/components/code-result/CodeResultHeader';
import GeneratedCode from '@/components/code-result/GeneratedCode';
import CodeExplanation from '@/components/code-result/CodeExplanation';

// Sample generated code for Level 1
const LEVEL_1_CODE = {
  javascript: `// JavaScript code
let name = "John";
let age = 25;
let isStudent = true;

console.log(name);
console.log(age); `,
  python: `# Python code
name = "John"
age = 25
is_student = True

print(name)
print(age)`,
  java: `// Java code
public class Variables {
  public static void main(String[] args) {
        String name = "John";
        int age = 25;
        boolean isStudent = true;

    System.out.println(name);
    System.out.println(age);
  }
} `
};

// Sample generated code for Level 2
const LEVEL_2_CODE = {
  javascript: `// JavaScript code
let count = 10;
let price = 9.99;
let message = "Hello";
let isActive = false;

console.log(typeof count);     // "number"
console.log(typeof price);     // "number"
console.log(typeof message);   // "string"`,
  python: `# Python code
count = 10
price = 9.99
message = "Hello"
is_active = False

print(type(count))    # <class 'int'>
print(type(price))    # <class 'float'>
print(type(message))  # <class 'str'>`,
  java: `// Java code
public class DataTypes {
    public static void main(String[] args) {
        int count = 10;
        float price = 9.99f;
        String message = "Hello";
        boolean isActive = false;
        
        System.out.println(((Object)count).getClass().getName());
        System.out.println(((Object)price).getClass().getName());
        System.out.println(message.getClass().getName());
    }
}`
};

const generatedCode = {
  1: LEVEL_1_CODE,
  2: LEVEL_2_CODE
};

type Explanation = {
  title: string;
  content: string;
  code: string;
};

// Sample explanations for Level 1
const LEVEL_1_EXPLANATION: Explanation[] = [
  {
    title: "Variables Declaration",
    content: "Variables are containers for storing data values. In this example, we declare variables with different data types.",
    code: `string name = "John";   // String variable
int age = 25;           // Integer variable
boolean isStudent = true;  // Boolean variable`
  },
  {
    title: "Printing Values",
    content: "After declaring variables, we can use them in our program. Here, we're printing their values to the console.",
    code: `print(name);  // Outputs: John
print(age);   // Outputs: 25`
  },
  {
    title: "Data Types",
    content: "Each variable has a specific data type that determines what kind of data it can store:",
    code: `string    // For text values
int       // For whole numbers
float     // For decimal numbers
boolean   // For true/false values`
  }
];

// Sample explanations for Level 2
const LEVEL_2_EXPLANATION: Explanation[] = [
  {
    title: "Different Data Types",
    content: "Programming languages use different data types to store different kinds of values efficiently.",
    code: `int count = 10;            // Integer type
float price = 9.99;       // Floating-point type
string message = "Hello";  // String type
boolean isActive = false;  // Boolean type`
  },
  {
    title: "Type Checking",
    content: "You can check the type of a variable using typeof or similar functions, depending on the language.",
    code: `print(typeof(count));   // Output: integer
print(typeof(price));   // Output: float
print(typeof(message)); // Output: string`
  },
  {
    title: "Type Conversion",
    content: "Sometimes you need to convert between types. This is called type conversion or casting.",
    code: `// Convert string to int
string numText = "42";
int num = parseInt(numText);

// Convert int to string
int age = 25;
string ageText = age.toString();`
  }
];

const explanations = {
  1: LEVEL_1_EXPLANATION,
  2: LEVEL_2_EXPLANATION
};

const CodeResult = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { gameState } = useGame();

  const [showCelebration, setShowCelebration] = useState(true);

  const currentLevel = gameState.levels.find(level => level.id === Number(levelId));
  const code = generatedCode[Number(levelId) as keyof typeof generatedCode];
  const levelExplanations = explanations[Number(levelId) as keyof typeof explanations];

  useEffect(() => {
    // Hide celebration after 3 seconds
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!currentLevel || !code || !levelExplanations) {
    return (
      <div className="min-h-[100dvh] bg-puzzle-light">
        <NavBar />
        <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 text-center bg-background" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
          <MobileHeader title="Not Found" showBack />
          <h1 className="text-2xl font-bold mb-4">Level Not Found</h1>
          <Button onClick={() => navigate('/levels')}>Back to Level Map</Button>
        </div>
      </div>
    );
  }

  const handleNextLevel = () => {
    const nextLevelId = currentLevel.id + 1;
    const nextLevel = gameState.levels.find(level => level.id === nextLevelId);

    if (nextLevel && nextLevel.isUnlocked) {
      navigate(`/puzzle/${nextLevelId}`);
    } else {
      navigate('/levels');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-puzzle-light via-white to-puzzle-purple/5">
      <NavBar />
      <MobileHeader title={`Level ${levelId} Done!`} showBack />

      <LevelCompleteModal show={showCelebration} xpReward={currentLevel.xpReward} />

      <div className="max-w-4xl mx-auto px-4 py-6" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>
        <CodeResultHeader currentLevel={currentLevel} onNextLevel={handleNextLevel} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GeneratedCode code={code} levelInfo={currentLevel} />
          </div>

          <div>
            <CodeExplanation explanations={levelExplanations} onNextLevel={handleNextLevel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeResult;
