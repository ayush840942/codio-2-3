
import { htmlLearningContent } from './htmlContent';
import { cssLearningContent } from './cssContent';
import { javascriptLearningContent } from './javascriptContent';
import { reactLearningContent } from './reactContent';
import { oopLearningContent } from './oopContent';
import { databaseLearningContent } from './databaseContent';
import { advancedLearningContent } from './advancedContent';
import { defaultLearningContent } from './defaultContent';
import { LevelLearningContent } from './types';
import { FileText, Palette, Zap, Layers, Cpu, Database, Rocket, Code, Terminal, Smartphone, Box, Globe } from 'lucide-react';
import { 
  htmlTopics, 
  cssTopics, 
  javascriptTopics, 
  reactTopics, 
  oopTopics, 
  databaseTopics, 
  advancedTopics 
} from './levelTopics';
import { 
  generateDetailedContent, 
  generateHTMLContent, 
  generateCSSContent, 
  generateAdvancedContent 
} from './contentGenerators';
import {
  generateCppContent,
  generateCSharpContent,
  generateDartContent,
  generatePythonContent,
  generateTypeScriptContent,
  generateGoContent,
  generateKotlinContent,
  generateSwiftContent
} from './newLanguagesContent';

// Topic arrays for new languages
const pythonTopics = ['Variables', 'Functions', 'Lists', 'Dictionaries', 'Classes', 'Loops', 'Conditionals', 'File I/O', 'Modules', 'Exceptions'];
const typescriptTopics = ['Types', 'Interfaces', 'Functions', 'Classes', 'Generics', 'Enums', 'Union Types', 'Type Guards', 'Decorators', 'Modules'];
const cppTopics = ['Variables', 'Functions', 'Classes', 'Pointers', 'Arrays', 'References', 'Inheritance', 'Polymorphism', 'Templates', 'STL'];
const csharpTopics = ['Variables', 'Methods', 'Classes', 'Properties', 'LINQ', 'Interfaces', 'Generics', 'Async/Await', 'Events', 'Delegates'];
const dartTopics = ['Variables', 'Functions', 'Classes', 'Widgets', 'Async', 'Null Safety', 'Collections', 'Streams', 'Mixins', 'Extensions'];
const goTopics = ['Variables', 'Functions', 'Structs', 'Goroutines', 'Channels', 'Interfaces', 'Packages', 'Error Handling', 'Slices', 'Maps'];
const kotlinTopics = ['Variables', 'Functions', 'Classes', 'Null Safety', 'Data Classes', 'Coroutines', 'Extensions', 'Sealed Classes', 'Lambdas', 'Collections'];
const swiftTopics = ['Variables', 'Functions', 'Classes', 'Optionals', 'Structs', 'Enums', 'Protocols', 'Closures', 'Generics', 'Error Handling'];

// Generate detailed 3-4 page content for each level (1-280)
const generateDetailedLearningContent = (levelId: number): LevelLearningContent => {
  // HTML Levels (1-10)
  if (levelId >= 1 && levelId <= 10) {
    const topic = htmlTopics[levelId - 1];
    return generateHTMLContent(levelId, topic);
  }
  
  // CSS Levels (11-20)
  if (levelId >= 11 && levelId <= 20) {
    const topic = cssTopics[levelId - 11];
    return generateCSSContent(levelId, topic);
  }
  
  // JavaScript Levels (21-40)
  if (levelId >= 21 && levelId <= 40) {
    const topic = javascriptTopics[(levelId - 21) % javascriptTopics.length];
    return generateDetailedContent(levelId, 'JavaScript', Zap, topic);
  }
  
  // Python Levels (41-50)
  if (levelId >= 41 && levelId <= 50) {
    const topic = pythonTopics[(levelId - 41) % pythonTopics.length];
    return generatePythonContent(levelId, topic);
  }
  
  // TypeScript Levels (51-60)
  if (levelId >= 51 && levelId <= 60) {
    const topic = typescriptTopics[(levelId - 51) % typescriptTopics.length];
    return generateTypeScriptContent(levelId, topic);
  }
  
  // C++ Levels (61-70)
  if (levelId >= 61 && levelId <= 70) {
    const topic = cppTopics[(levelId - 61) % cppTopics.length];
    return generateCppContent(levelId, topic);
  }
  
  // C# Levels (71-80)
  if (levelId >= 71 && levelId <= 80) {
    const topic = csharpTopics[(levelId - 71) % csharpTopics.length];
    return generateCSharpContent(levelId, topic);
  }
  
  // Dart Levels (81-90)
  if (levelId >= 81 && levelId <= 90) {
    const topic = dartTopics[(levelId - 81) % dartTopics.length];
    return generateDartContent(levelId, topic);
  }
  
  // Go Levels (91-100)
  if (levelId >= 91 && levelId <= 100) {
    const topic = goTopics[(levelId - 91) % goTopics.length];
    return generateGoContent(levelId, topic);
  }
  
  // Kotlin Levels (101-110)
  if (levelId >= 101 && levelId <= 110) {
    const topic = kotlinTopics[(levelId - 101) % kotlinTopics.length];
    return generateKotlinContent(levelId, topic);
  }
  
  // Swift Levels (111-120)
  if (levelId >= 111 && levelId <= 120) {
    const topic = swiftTopics[(levelId - 111) % swiftTopics.length];
    return generateSwiftContent(levelId, topic);
  }
  
  // React Levels (121-140)
  if (levelId >= 121 && levelId <= 140) {
    const topic = reactTopics[(levelId - 121) % reactTopics.length];
    return generateDetailedContent(levelId, 'React', Layers, topic);
  }
  
  // OOP Levels (141-155)
  if (levelId >= 141 && levelId <= 155) {
    const topic = oopTopics[(levelId - 141) % oopTopics.length];
    return generateDetailedContent(levelId, 'OOP', Cpu, topic);
  }
  
  // Database Levels (156-170)
  if (levelId >= 156 && levelId <= 170) {
    const topic = databaseTopics[(levelId - 156) % databaseTopics.length];
    return generateDetailedContent(levelId, 'Database', Database, topic);
  }
  
  // Advanced Levels (171-280)
  if (levelId >= 171 && levelId <= 280) {
    const topicIndex = (levelId - 171) % advancedTopics.length;
    const currentTopic = advancedTopics[topicIndex];
    return generateAdvancedContent(levelId, currentTopic);
  }
  
  // Fallback
  return defaultLearningContent;
};

// Create the complete learning content object for all 280 levels
export const levelLearningContent: Record<string, LevelLearningContent> = {
  default: defaultLearningContent
};

// Generate detailed content for all 280 levels
for (let i = 1; i <= 280; i++) {
  levelLearningContent[String(i)] = generateDetailedLearningContent(i);
}

console.log(`Generated detailed learning content for all 280 levels across 12 programming languages`);

export * from './types';
