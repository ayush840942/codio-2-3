
import { LevelLearningContent, LearningConcept } from './types';
import { Code, Cpu, Smartphone, Zap, Box, Terminal, Layers, Globe } from 'lucide-react';

// C++ Learning Content Generator
export const generateCppContent = (levelId: number, topic: string): LevelLearningContent => {
  const concepts: LearningConcept[] = [
    {
      name: topic,
      description: `Master ${topic} in C++ - a powerful systems programming language`,
      example: getCppExample(topic),
      tips: getCppTips(topic)
    }
  ];

  return {
    title: `C++: ${topic}`,
    topic: 'C++',
    icon: Cpu,
    introduction: `Learn ${topic} in C++, one of the most powerful and widely-used programming languages for systems, games, and high-performance applications.`,
    pages: [
      {
        title: `Understanding ${topic}`,
        content: `C++ is a compiled language known for its performance and control over system resources. ${topic} is a fundamental concept that every C++ developer must master.`,
        concepts,
        visualExample: getCppExample(topic),
        practiceHint: `Try implementing ${topic} step by step!`
      },
      {
        title: 'Key Concepts',
        content: getCppExplanation(topic),
        concepts: [
          {
            name: 'Memory Management',
            description: 'C++ gives you direct control over memory allocation',
            example: 'int* ptr = new int(10);\ndelete ptr;',
            tips: ['Always delete what you new', 'Use smart pointers when possible']
          }
        ],
        visualExample: getCppExample(topic),
        practiceHint: 'Practice makes perfect!'
      },
      {
        title: 'Practical Application',
        content: `Now let's apply ${topic} in a real-world scenario. C++ is used in game engines, operating systems, and embedded systems.`,
        concepts,
        visualExample: getCppExample(topic),
        practiceHint: 'Complete the puzzle to reinforce your learning!'
      }
    ],
    summary: `Great job! You've learned about ${topic} in C++. This knowledge is essential for systems programming.`,
    objectives: [`Understand ${topic}`, 'Write efficient C++ code', 'Apply concepts to real problems'],
    learningObjectives: [`Master ${topic} in C++`]
  };
};

// C# Learning Content Generator
export const generateCSharpContent = (levelId: number, topic: string): LevelLearningContent => {
  return {
    title: `C#: ${topic}`,
    topic: 'C#',
    icon: Layers,
    introduction: `Master ${topic} in C#, the versatile language for Windows, web, and game development with Unity.`,
    pages: [
      {
        title: `Understanding ${topic}`,
        content: `C# is a modern, object-oriented language developed by Microsoft. ${topic} is essential for building robust .NET applications.`,
        concepts: [
          {
            name: topic,
            description: `Learn how ${topic} works in C#`,
            example: getCSharpExample(topic),
            tips: getCSharpTips(topic)
          }
        ],
        visualExample: getCSharpExample(topic),
        practiceHint: 'Follow along with the examples!'
      },
      {
        title: 'Core Concepts',
        content: getCSharpExplanation(topic),
        concepts: [
          {
            name: 'Type Safety',
            description: 'C# is strongly typed for reliability',
            example: 'string name = "Player";\nint score = 100;',
            tips: ['Use var for type inference', 'Leverage nullable types with ?']
          }
        ],
        visualExample: getCSharpExample(topic),
        practiceHint: 'Try modifying the examples!'
      },
      {
        title: 'Real-World Usage',
        content: `Apply ${topic} in game development, web APIs, or desktop applications.`,
        concepts: [
          {
            name: topic,
            description: `Practical applications of ${topic}`,
            example: getCSharpExample(topic),
            tips: ['Used in Unity game development', 'Powers ASP.NET web apps']
          }
        ],
        visualExample: getCSharpExample(topic),
        practiceHint: 'Complete the challenge!'
      }
    ],
    summary: `Excellent! You've mastered ${topic} in C#. This prepares you for .NET and Unity development.`,
    objectives: [`Understand ${topic}`, 'Write clean C# code', 'Build real applications'],
    learningObjectives: [`Apply ${topic} in C# projects`]
  };
};

// Dart Learning Content Generator
export const generateDartContent = (levelId: number, topic: string): LevelLearningContent => {
  return {
    title: `Dart: ${topic}`,
    topic: 'Dart',
    icon: Smartphone,
    introduction: `Learn ${topic} in Dart, the language powering Flutter for beautiful cross-platform mobile apps.`,
    pages: [
      {
        title: `Dart Fundamentals: ${topic}`,
        content: `Dart is an optimized language for building fast apps on any platform. ${topic} is crucial for Flutter development.`,
        concepts: [
          {
            name: topic,
            description: `Understanding ${topic} in Dart`,
            example: getDartExample(topic),
            tips: getDartTips(topic)
          }
        ],
        visualExample: getDartExample(topic),
        practiceHint: 'Experiment with the code!'
      },
      {
        title: 'Flutter Integration',
        content: `${topic} plays a key role in building Flutter widgets and managing app state.`,
        concepts: [
          {
            name: 'Flutter Widgets',
            description: 'Everything in Flutter is a widget',
            example: 'Widget build(BuildContext context) {\n  return Container();\n}',
            tips: ['Widgets are immutable', 'Use StatefulWidget for dynamic content']
          }
        ],
        visualExample: getDartExample(topic),
        practiceHint: 'Think about mobile UI!'
      },
      {
        title: 'Building Mobile Apps',
        content: `Use ${topic} to create stunning cross-platform applications with Flutter.`,
        concepts: [
          {
            name: topic,
            description: `Apply ${topic} in mobile development`,
            example: getDartExample(topic),
            tips: ['Hot reload speeds development', 'One codebase for iOS and Android']
          }
        ],
        visualExample: getDartExample(topic),
        practiceHint: 'Complete the Flutter challenge!'
      }
    ],
    summary: `Amazing! You've learned ${topic} in Dart. You're ready to build Flutter apps!`,
    objectives: [`Master ${topic}`, 'Understand Dart syntax', 'Build Flutter widgets'],
    learningObjectives: [`Create mobile apps using ${topic}`]
  };
};

// Python Learning Content Generator
export const generatePythonContent = (levelId: number, topic: string): LevelLearningContent => {
  return {
    title: `Python: ${topic}`,
    topic: 'Python',
    icon: Terminal,
    introduction: `Master ${topic} in Python, the world's most popular programming language for AI, data science, and web development.`,
    pages: [
      {
        title: `Python Basics: ${topic}`,
        content: `Python is known for its readable syntax and versatility. ${topic} is fundamental to becoming a Python developer.`,
        concepts: [
          {
            name: topic,
            description: `Learn ${topic} the Python way`,
            example: getPythonExample(topic),
            tips: getPythonTips(topic)
          }
        ],
        visualExample: getPythonExample(topic),
        practiceHint: 'Python makes coding fun!'
      },
      {
        title: 'Pythonic Patterns',
        content: `Python emphasizes code readability. Let's explore ${topic} using Pythonic patterns.`,
        concepts: [
          {
            name: 'List Comprehensions',
            description: 'Elegant way to create lists',
            example: 'squares = [x**2 for x in range(10)]',
            tips: ['More readable than loops', 'Can include conditions']
          }
        ],
        visualExample: getPythonExample(topic),
        practiceHint: 'Write Pythonic code!'
      },
      {
        title: 'Real Applications',
        content: `Apply ${topic} in data analysis, machine learning, or web development with Django/Flask.`,
        concepts: [
          {
            name: topic,
            description: `${topic} in production Python`,
            example: getPythonExample(topic),
            tips: ['Used in AI/ML', 'Powers data science workflows']
          }
        ],
        visualExample: getPythonExample(topic),
        practiceHint: 'Build something amazing!'
      }
    ],
    summary: `Fantastic! You've mastered ${topic} in Python. The possibilities are endless!`,
    objectives: [`Understand ${topic}`, 'Write Pythonic code', 'Apply in real projects'],
    learningObjectives: [`Use ${topic} in Python applications`]
  };
};

// TypeScript Learning Content Generator
export const generateTypeScriptContent = (levelId: number, topic: string): LevelLearningContent => {
  return {
    title: `TypeScript: ${topic}`,
    topic: 'TypeScript',
    icon: Code,
    introduction: `Learn ${topic} in TypeScript, JavaScript with superpowers - type safety for large-scale applications.`,
    pages: [
      {
        title: `TypeScript Essentials: ${topic}`,
        content: `TypeScript adds static typing to JavaScript, catching errors before runtime. ${topic} is essential for type-safe development.`,
        concepts: [
          {
            name: topic,
            description: `Type-safe ${topic} in TypeScript`,
            example: getTypeScriptExample(topic),
            tips: getTypeScriptTips(topic)
          }
        ],
        visualExample: getTypeScriptExample(topic),
        practiceHint: 'Types are your friend!'
      },
      {
        title: 'Type System Deep Dive',
        content: `TypeScript's type system helps prevent bugs. Let's explore ${topic} with proper typing.`,
        concepts: [
          {
            name: 'Interfaces',
            description: 'Define object shapes',
            example: 'interface User {\n  name: string;\n  age: number;\n}',
            tips: ['Interfaces are open for extension', 'Use for object types']
          }
        ],
        visualExample: getTypeScriptExample(topic),
        practiceHint: 'Define your types!'
      },
      {
        title: 'Production TypeScript',
        content: `Apply ${topic} in React, Node.js, or any JavaScript project for better maintainability.`,
        concepts: [
          {
            name: topic,
            description: `Enterprise-grade ${topic}`,
            example: getTypeScriptExample(topic),
            tips: ['Used in enterprise apps', 'Powers Angular and modern React']
          }
        ],
        visualExample: getTypeScriptExample(topic),
        practiceHint: 'Build type-safe apps!'
      }
    ],
    summary: `Excellent! You've learned ${topic} in TypeScript. Your code is now more robust!`,
    objectives: [`Master ${topic}`, 'Understand TypeScript types', 'Write safer code'],
    learningObjectives: [`Implement ${topic} with type safety`]
  };
};

// Go Learning Content Generator
export const generateGoContent = (levelId: number, topic: string): LevelLearningContent => {
  return {
    title: `Go: ${topic}`,
    topic: 'Go',
    icon: Zap,
    introduction: `Master ${topic} in Go, the language designed at Google for simplicity, concurrency, and performance.`,
    pages: [
      {
        title: `Go Fundamentals: ${topic}`,
        content: `Go combines the efficiency of compiled languages with the ease of dynamic languages. ${topic} is key to Go programming.`,
        concepts: [
          {
            name: topic,
            description: `Simple and efficient ${topic} in Go`,
            example: getGoExample(topic),
            tips: getGoTips(topic)
          }
        ],
        visualExample: getGoExample(topic),
        practiceHint: 'Keep it simple, Go style!'
      },
      {
        title: 'Concurrency in Go',
        content: `Go excels at concurrent programming. Let's see how ${topic} relates to goroutines and channels.`,
        concepts: [
          {
            name: 'Goroutines',
            description: 'Lightweight concurrent functions',
            example: 'go func() {\n  fmt.Println("Hello")\n}()',
            tips: ['Goroutines are cheap', 'Use channels for communication']
          }
        ],
        visualExample: getGoExample(topic),
        practiceHint: 'Think concurrent!'
      },
      {
        title: 'Building Services',
        content: `Apply ${topic} in cloud services, APIs, and microservices - Go's primary domain.`,
        concepts: [
          {
            name: topic,
            description: `${topic} in production Go`,
            example: getGoExample(topic),
            tips: ['Powers Docker and Kubernetes', 'Great for microservices']
          }
        ],
        visualExample: getGoExample(topic),
        practiceHint: 'Build scalable services!'
      }
    ],
    summary: `Outstanding! You've mastered ${topic} in Go. You're ready for cloud-native development!`,
    objectives: [`Understand ${topic}`, 'Write idiomatic Go', 'Build concurrent systems'],
    learningObjectives: [`Apply ${topic} in Go services`]
  };
};

// Kotlin Learning Content Generator
export const generateKotlinContent = (levelId: number, topic: string): LevelLearningContent => {
  return {
    title: `Kotlin: ${topic}`,
    topic: 'Kotlin',
    icon: Smartphone,
    introduction: `Learn ${topic} in Kotlin, the modern language for Android development and beyond.`,
    pages: [
      {
        title: `Kotlin Basics: ${topic}`,
        content: `Kotlin is a modern, concise language fully interoperable with Java. ${topic} showcases Kotlin's elegance.`,
        concepts: [
          {
            name: topic,
            description: `Modern ${topic} in Kotlin`,
            example: getKotlinExample(topic),
            tips: getKotlinTips(topic)
          }
        ],
        visualExample: getKotlinExample(topic),
        practiceHint: 'Embrace Kotlin elegance!'
      },
      {
        title: 'Kotlin Features',
        content: `Kotlin eliminates boilerplate code. Let's explore ${topic} with null safety and smart casts.`,
        concepts: [
          {
            name: 'Null Safety',
            description: 'No more NullPointerExceptions',
            example: 'val name: String? = null\nval length = name?.length ?: 0',
            tips: ['Use ? for nullable types', 'Elvis operator ?: for defaults']
          }
        ],
        visualExample: getKotlinExample(topic),
        practiceHint: 'Safe and concise!'
      },
      {
        title: 'Android Development',
        content: `Apply ${topic} in Android apps - Kotlin is Google's preferred language for Android.`,
        concepts: [
          {
            name: topic,
            description: `${topic} in Android`,
            example: getKotlinExample(topic),
            tips: ['Official Android language', 'Works with Jetpack Compose']
          }
        ],
        visualExample: getKotlinExample(topic),
        practiceHint: 'Build Android apps!'
      }
    ],
    summary: `Brilliant! You've mastered ${topic} in Kotlin. Android development awaits!`,
    objectives: [`Master ${topic}`, 'Write concise Kotlin', 'Build Android apps'],
    learningObjectives: [`Create Android apps using ${topic}`]
  };
};

// Swift Learning Content Generator
export const generateSwiftContent = (levelId: number, topic: string): LevelLearningContent => {
  return {
    title: `Swift: ${topic}`,
    topic: 'Swift',
    icon: Box,
    introduction: `Master ${topic} in Swift, Apple's powerful language for iOS, macOS, and beyond.`,
    pages: [
      {
        title: `Swift Fundamentals: ${topic}`,
        content: `Swift is safe, fast, and expressive. ${topic} is essential for Apple platform development.`,
        concepts: [
          {
            name: topic,
            description: `Safe and powerful ${topic} in Swift`,
            example: getSwiftExample(topic),
            tips: getSwiftTips(topic)
          }
        ],
        visualExample: getSwiftExample(topic),
        practiceHint: 'Swift makes coding delightful!'
      },
      {
        title: 'Swift Safety Features',
        content: `Swift prioritizes safety without sacrificing performance. Let's explore ${topic} with optionals and guards.`,
        concepts: [
          {
            name: 'Optionals',
            description: 'Handle absence of values safely',
            example: 'var name: String? = "Swift"\nif let unwrapped = name {\n  print(unwrapped)\n}',
            tips: ['Use if let for unwrapping', 'guard let for early exit']
          }
        ],
        visualExample: getSwiftExample(topic),
        practiceHint: 'Safety first!'
      },
      {
        title: 'iOS Development',
        content: `Apply ${topic} in iOS apps with SwiftUI - the future of Apple development.`,
        concepts: [
          {
            name: topic,
            description: `${topic} in SwiftUI`,
            example: getSwiftExample(topic),
            tips: ['SwiftUI is declarative', 'Works across Apple platforms']
          }
        ],
        visualExample: getSwiftExample(topic),
        practiceHint: 'Build beautiful iOS apps!'
      }
    ],
    summary: `Amazing! You've mastered ${topic} in Swift. iOS development is calling!`,
    objectives: [`Understand ${topic}`, 'Write safe Swift code', 'Build iOS apps'],
    learningObjectives: [`Create iOS apps using ${topic}`]
  };
};

// Helper functions for examples
function getCppExample(topic: string): string {
  const examples: Record<string, string> = {
    'Variables': '#include <iostream>\nusing namespace std;\n\nint main() {\n  int age = 25;\n  string name = "Coder";\n  cout << name << " is " << age;\n  return 0;\n}',
    'Functions': 'int add(int a, int b) {\n  return a + b;\n}\n\nint result = add(5, 3);',
    'Classes': 'class Player {\npublic:\n  string name;\n  int score;\n  void addScore(int pts) {\n    score += pts;\n  }\n};',
    'Pointers': 'int value = 10;\nint* ptr = &value;\ncout << *ptr; // 10',
    'Arrays': 'int numbers[5] = {1, 2, 3, 4, 5};\nfor(int i = 0; i < 5; i++) {\n  cout << numbers[i];\n}'
  };
  return examples[topic] || `// ${topic} in C++\n#include <iostream>\nusing namespace std;`;
}

function getCppTips(topic: string): string[] {
  return ['Always initialize variables', 'Use const for unchanging values', 'Prefer references over pointers when possible'];
}

function getCppExplanation(topic: string): string {
  return `${topic} in C++ provides direct control over memory and hardware. This low-level access makes C++ ideal for performance-critical applications like games, operating systems, and embedded systems.`;
}

function getCSharpExample(topic: string): string {
  const examples: Record<string, string> = {
    'Variables': 'string playerName = "Hero";\nint health = 100;\nbool isAlive = true;\nConsole.WriteLine($"{playerName}: {health} HP");',
    'Methods': 'public int CalculateDamage(int base, int modifier) {\n  return base * modifier;\n}',
    'Classes': 'public class Enemy {\n  public string Name { get; set; }\n  public int Health { get; set; }\n  \n  public void TakeDamage(int dmg) {\n    Health -= dmg;\n  }\n}',
    'Properties': 'public class Player {\n  private int _score;\n  public int Score {\n    get => _score;\n    set => _score = value > 0 ? value : 0;\n  }\n}',
    'LINQ': 'var highScores = players\n  .Where(p => p.Score > 1000)\n  .OrderByDescending(p => p.Score)\n  .Take(10);'
  };
  return examples[topic] || `// ${topic} in C#\nusing System;`;
}

function getCSharpTips(topic: string): string[] {
  return ['Use properties instead of public fields', 'Leverage LINQ for collections', 'Use async/await for I/O operations'];
}

function getCSharpExplanation(topic: string): string {
  return `${topic} in C# follows modern OOP principles. C# is used in Unity game development, ASP.NET web applications, and Windows desktop apps.`;
}

function getDartExample(topic: string): string {
  const examples: Record<string, string> = {
    'Variables': 'var name = "Flutter Dev";\nfinal age = 25;\nconst pi = 3.14159;\nprint("Hello, $name!");',
    'Functions': 'int multiply(int a, int b) => a * b;\n\n// Arrow function\nString greet(String name) => "Hello, $name!";',
    'Classes': 'class User {\n  final String name;\n  int score;\n  \n  User(this.name, this.score);\n  \n  void levelUp() => score += 10;\n}',
    'Widgets': 'class MyWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Container(\n      child: Text("Hello Flutter!"),\n    );\n  }\n}',
    'Async': 'Future<String> fetchData() async {\n  await Future.delayed(Duration(seconds: 1));\n  return "Data loaded!";\n}'
  };
  return examples[topic] || `// ${topic} in Dart\nvoid main() {\n  print("Hello Dart!");\n}`;
}

function getDartTips(topic: string): string[] {
  return ['Use final for runtime constants', 'Use const for compile-time constants', 'Embrace null safety with ?'];
}

function getPythonExample(topic: string): string {
  const examples: Record<string, string> = {
    'Variables': 'name = "Pythonista"\nage = 25\nis_developer = True\nprint(f"{name} is {age} years old")',
    'Functions': 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("World"))',
    'Classes': 'class Player:\n    def __init__(self, name):\n        self.name = name\n        self.score = 0\n    \n    def add_points(self, pts):\n        self.score += pts',
    'Lists': 'numbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers]\nprint(squares)  # [1, 4, 9, 16, 25]',
    'Dictionaries': 'player = {\n    "name": "Hero",\n    "level": 10,\n    "items": ["sword", "shield"]\n}\nprint(player["name"])'
  };
  return examples[topic] || `# ${topic} in Python\nprint("Hello Python!")`;
}

function getPythonTips(topic: string): string[] {
  return ['Use meaningful variable names', 'Follow PEP 8 style guide', 'Prefer list comprehensions over loops'];
}

function getTypeScriptExample(topic: string): string {
  const examples: Record<string, string> = {
    'Types': 'let name: string = "TypeScript";\nlet age: number = 25;\nlet active: boolean = true;\nlet items: string[] = ["a", "b", "c"];',
    'Interfaces': 'interface User {\n  name: string;\n  email: string;\n  age?: number; // optional\n}\n\nconst user: User = {\n  name: "Dev",\n  email: "dev@email.com"\n};',
    'Functions': 'function greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconst add = (a: number, b: number): number => a + b;',
    'Generics': 'function identity<T>(arg: T): T {\n  return arg;\n}\n\nconst num = identity<number>(42);\nconst str = identity<string>("hello");',
    'Classes': 'class Player {\n  constructor(\n    public name: string,\n    private score: number = 0\n  ) {}\n  \n  addScore(pts: number): void {\n    this.score += pts;\n  }\n}'
  };
  return examples[topic] || `// ${topic} in TypeScript\nconst message: string = "Hello TypeScript!";`;
}

function getTypeScriptTips(topic: string): string[] {
  return ['Use strict mode for better type checking', 'Prefer interfaces over type aliases for objects', 'Use generics for reusable components'];
}

function getGoExample(topic: string): string {
  const examples: Record<string, string> = {
    'Variables': 'package main\n\nimport "fmt"\n\nfunc main() {\n    name := "Gopher"\n    age := 25\n    fmt.Printf("%s is %d\\n", name, age)\n}',
    'Functions': 'func add(a, b int) int {\n    return a + b\n}\n\nfunc swap(a, b string) (string, string) {\n    return b, a\n}',
    'Structs': 'type Player struct {\n    Name  string\n    Score int\n}\n\nfunc (p *Player) AddScore(pts int) {\n    p.Score += pts\n}',
    'Goroutines': 'go func() {\n    fmt.Println("Hello from goroutine!")\n}()\n\ntime.Sleep(time.Second)',
    'Channels': 'ch := make(chan int)\ngo func() {\n    ch <- 42\n}()\nvalue := <-ch'
  };
  return examples[topic] || `// ${topic} in Go\npackage main\n\nfunc main() {\n    println("Hello Go!")\n}`;
}

function getGoTips(topic: string): string[] {
  return ['Go uses short variable declarations :=', 'Exported names start with uppercase', 'Use goroutines for concurrency'];
}

function getKotlinExample(topic: string): string {
  const examples: Record<string, string> = {
    'Variables': 'val name = "Kotlin" // immutable\nvar score = 0 // mutable\nval greeting: String = "Hello, $name!"',
    'Functions': 'fun greet(name: String): String {\n    return "Hello, $name!"\n}\n\n// Single expression\nfun add(a: Int, b: Int) = a + b',
    'Classes': 'class Player(\n    val name: String,\n    var score: Int = 0\n) {\n    fun addScore(pts: Int) {\n        score += pts\n    }\n}',
    'Null Safety': 'var name: String? = null\nval length = name?.length ?: 0\nname?.let { println(it) }',
    'Data Classes': 'data class User(\n    val name: String,\n    val email: String,\n    val age: Int = 0\n)'
  };
  return examples[topic] || `// ${topic} in Kotlin\nfun main() {\n    println("Hello Kotlin!")\n}`;
}

function getKotlinTips(topic: string): string[] {
  return ['Use val for immutable, var for mutable', 'Leverage null safety operators', 'Use data classes for DTOs'];
}

function getSwiftExample(topic: string): string {
  const examples: Record<string, string> = {
    'Variables': 'let name = "Swift" // constant\nvar score = 0 // variable\nlet greeting = "Hello, \\(name)!"',
    'Functions': 'func greet(name: String) -> String {\n    return "Hello, \\(name)!"\n}\n\nfunc add(_ a: Int, _ b: Int) -> Int {\n    a + b\n}',
    'Classes': 'class Player {\n    let name: String\n    var score: Int\n    \n    init(name: String) {\n        self.name = name\n        self.score = 0\n    }\n}',
    'Optionals': 'var name: String? = nil\nif let unwrapped = name {\n    print(unwrapped)\n}\nlet length = name?.count ?? 0',
    'Structs': 'struct Point {\n    var x: Double\n    var y: Double\n    \n    func distance(to other: Point) -> Double {\n        let dx = x - other.x\n        let dy = y - other.y\n        return (dx*dx + dy*dy).squareRoot()\n    }\n}'
  };
  return examples[topic] || `// ${topic} in Swift\nprint("Hello Swift!")`;
}

function getSwiftTips(topic: string): string[] {
  return ['Use let for constants, var for variables', 'Prefer structs over classes when possible', 'Use guard for early exits'];
}
