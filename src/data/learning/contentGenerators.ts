import { LevelLearningContent } from './types';
import { getExampleForLevel, getAdvancedExample } from './exampleGenerators';
import { FileText, Palette, Zap, Layers, Cpu, Database, Rocket } from 'lucide-react';
import { TopicConfig } from './levelTopics';
import { humorService } from './humorService';

// Helper function to generate comprehensive theory content
const generateTheoryContent = (levelId: number, subject: string, topic: TopicConfig): string => {
  const story = humorService.getStoryBeat(levelId);
  const joke = humorService.getJoke(subject);
  const metaphor = humorService.getMetaphor(topic.title);

  const theories = {
    'HTML': {
      basic: `${story.intro}\n\nListen, HTML is just the skeleton of your site. Without it, you're just floating text in the void. ${topic.title} is like giving your site a spine. \n\n${joke}\n\nThink of it this way: ${metaphor}`,
      advanced: `Alright, veteran. You're diving into the deep end of HTML: ${topic.title}. This is where we stop just making 'pages' and start making 'engines'. \n\n${joke}`
    },
    'CSS': {
      basic: `Time to paint! ${topic.title} is how we make our 'skeleton' look less like a spooky ghost and more like a high-fashion model. \n\n${joke}\n\n${metaphor}`,
      advanced: `Advanced styling mode! We're talking algorithms, layout engines, and performance. ${topic.title} will make your site fly. \n\n${joke}`
    },
    'JavaScript': {
      basic: `JavaScript makes things MOVE. ${topic.title} is the brainpower behind the beauty. \n\n${joke}\n\n${metaphor}`,
      advanced: `The professional zone. We're handling the event loop, async patterns, and memory. ${topic.title} is for the masters. \n\n${joke}`
    }
  };

  const subjectTheories = theories[subject as keyof typeof theories];
  if (!subjectTheories) {
    return `The theory behind ${topic.title} involves understanding fundamental programming concepts and best practices. This includes learning how different components work together, optimization strategies, and real-world application patterns.

Understanding the underlying principles helps developers make informed decisions about implementation approaches and troubleshooting strategies.`;
  }

  return levelId <= 10 ? subjectTheories.basic : subjectTheories.advanced;
};

// Helper function to generate detailed content structure
export const generateDetailedContent = (levelId: number, subject: string, icon: any, topic: TopicConfig): LevelLearningContent => {
  const theoryContent = generateTheoryContent(levelId, subject, topic);

  return {
    title: `${topic.title} - Level ${levelId}`,
    topic: subject,
    icon: icon,
    introduction: humorService.getStoryBeat(levelId).intro,
    theory: theoryContent,
    pages: [
      {
        title: `Cheat Sheet: ${topic.title}`,
        content: `Alright, let's break down ${topic.title.toLowerCase()}. Don't worry, it's easier than trying to find a matching pair of socks in the laundry.`,
        theory: theoryContent,
        concepts: [
          {
            name: 'Theoretical Foundation',
            description: `Understanding the core theory behind ${topic.title.toLowerCase()}.`,
            example: getExampleForLevel(levelId, subject, 'basic'),
            tips: ['Focus on understanding the "why" behind concepts', 'Connect theory to practical applications', 'Build mental models for complex concepts']
          }
        ],
        visualExample: getExampleForLevel(levelId, subject, 'basic'),
        practiceHint: `Take time to understand the theoretical concepts before moving to implementation.`
      },
      {
        title: `Understanding ${topic.title}`,
        content: `Now that you understand the theory, let's explore how ${topic.title.toLowerCase()} works in practice. We'll examine the fundamental concepts and see how they apply in real scenarios.`,
        concepts: [
          {
            name: 'Core Fundamentals',
            description: `Learn the essential concepts and practical application of ${topic.title.toLowerCase()}.`,
            example: getExampleForLevel(levelId, subject, 'basic'),
            tips: ['Start with the basics', 'Practice regularly', 'Understand the why, not just the how']
          }
        ],
        visualExample: getExampleForLevel(levelId, subject, 'basic'),
        practiceHint: `Begin with simple examples to understand the core concepts.`
      },
      {
        title: `Practical Implementation`,
        content: `Let's apply your theoretical knowledge with practical examples and common use cases. You'll learn industry-standard patterns and best practices.`,
        concepts: [
          {
            name: 'Real-World Patterns',
            description: `Discover how ${topic.title.toLowerCase()} is used in professional development.`,
            example: getExampleForLevel(levelId, subject, 'intermediate'),
            tips: ['Follow best practices', 'Consider edge cases', 'Write clean, readable code']
          }
        ],
        visualExample: getExampleForLevel(levelId, subject, 'intermediate'),
        practiceHint: `Practice with realistic scenarios and common patterns.`
      },
      {
        title: `Mastery and Application`,
        content: `Put it all together with comprehensive examples and prepare for the coding challenge. Review key concepts and learn troubleshooting techniques.`,
        concepts: [
          {
            name: 'Professional Mastery',
            description: `Demonstrate complete understanding of ${topic.title.toLowerCase()} in complex scenarios.`,
            example: getExampleForLevel(levelId, subject, 'advanced'),
            tips: ['Combine multiple concepts', 'Solve complex problems', 'Write production-ready code']
          }
        ],
        visualExample: getExampleForLevel(levelId, subject, 'advanced'),
        practiceHint: `Apply your complete knowledge to solve the upcoming puzzle challenge.`
      }
    ],
    summary: humorService.getStoryBeat(levelId).outro,
    objectives: [
      `Actually understand ${topic.title} (No, really)`,
      `Write code that doesn't make the compiler cry`,
      'Become a coding legend',
    ]
  };
};

export const generateHTMLContent = (levelId: number, topic: TopicConfig): LevelLearningContent => {
  const theoryContent = generateTheoryContent(levelId, 'HTML', topic);

  return {
    title: `${topic.title} - Level ${levelId}`,
    topic: 'HTML',
    icon: FileText,
    introduction: `Level ${levelId}: Master ${topic.title} to build semantic, accessible web content. ${topic.focus}`,
    theory: theoryContent,
    pages: [
      {
        title: `HTML Theory: ${topic.title}`,
        content: `Welcome to Level ${levelId}! Let's begin with the theoretical foundation of ${topic.title.toLowerCase()} in HTML.`,
        theory: theoryContent,
        concepts: [
          {
            name: 'HTML Theory',
            description: `Understanding the semantic web principles behind ${topic.title.toLowerCase()}.`,
            example: getExampleForLevel(levelId, 'HTML', 'basic'),
            tips: ['Think semantically, not visually', 'Consider accessibility from the start', 'Understand document structure']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'HTML', 'basic'),
        practiceHint: `Focus on understanding why specific HTML elements exist and their semantic meaning.`
      },
      {
        title: `Introduction to ${topic.title}`,
        content: `Now let's explore the practical aspects of ${topic.title.toLowerCase()}. This is a fundamental concept in HTML that every web developer must master.`,
        concepts: [
          {
            name: 'Core Concept',
            description: `Understanding the fundamental principles of ${topic.title.toLowerCase()} and how it fits into modern web development.`,
            example: getExampleForLevel(levelId, 'HTML', 'basic'),
            tips: ['Always use semantic HTML', 'Consider accessibility from the start', 'Validate your HTML structure']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'HTML', 'basic'),
        practiceHint: `Start by understanding the basic structure and purpose of ${topic.title.toLowerCase()}.`
      },
      {
        title: `Practical Implementation`,
        content: `Let's dive into the practical aspects of implementing ${topic.title.toLowerCase()}. You'll learn the most common patterns and techniques used by professional developers.`,
        concepts: [
          {
            name: 'Implementation Patterns',
            description: `Learn the most effective ways to implement ${topic.title.toLowerCase()} in real-world scenarios.`,
            example: getExampleForLevel(levelId, 'HTML', 'intermediate'),
            tips: [`Use ${topic.title.toLowerCase()} effectively`, 'Follow web standards', 'Optimize for performance']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'HTML', 'intermediate'),
        practiceHint: `Practice implementing ${topic.title.toLowerCase()} with different attributes and variations.`
      },
      {
        title: `Real-World Applications`,
        content: `See how ${topic.title.toLowerCase()} is used in real-world projects. Learn common patterns, troubleshooting techniques, and how to integrate with modern development workflows.`,
        concepts: [
          {
            name: 'Production Ready',
            description: `Understand how to use ${topic.title.toLowerCase()} in production environments with proper testing and optimization.`,
            example: getExampleForLevel(levelId, 'HTML', 'advanced'),
            tips: ['Test in multiple browsers', 'Validate with accessibility tools', 'Monitor performance impact']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'HTML', 'advanced'),
        practiceHint: `Apply your knowledge to solve real-world challenges in the upcoming puzzle.`
      }
    ],
    summary: `Excellent work! You've mastered ${topic.title} in HTML. You now understand the theory, core concepts, implementation patterns, and real-world applications. You're ready to apply this knowledge in practical coding challenges.`,
    objectives: [
      `Understand ${topic.title} theory and semantics`,
      `Master ${topic.title} fundamentals`,
      'Implement semantic HTML patterns',
      'Apply accessibility best practices',
      'Create production-ready code'
    ]
  };
};

export const generateCSSContent = (levelId: number, topic: TopicConfig): LevelLearningContent => {
  const theoryContent = generateTheoryContent(levelId, 'CSS', topic);

  return {
    title: `${topic.title} - Level ${levelId}`,
    topic: 'CSS',
    icon: Palette,
    introduction: `Level ${levelId}: Master ${topic.title} to create beautiful, responsive designs. Focus: ${topic.focus}`,
    theory: theoryContent,
    pages: [
      {
        title: `CSS Theory: ${topic.title}`,
        content: `Welcome to Level ${levelId}! Let's start with the theoretical foundation of ${topic.title.toLowerCase()} in CSS.`,
        theory: theoryContent,
        concepts: [
          {
            name: 'CSS Theory',
            description: `Understanding the cascade, specificity, and inheritance principles behind ${topic.title.toLowerCase()}.`,
            example: getExampleForLevel(levelId, 'CSS', 'basic'),
            tips: ['Understand the cascade', 'Learn specificity rules', 'Master inheritance principles']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'CSS', 'basic'),
        practiceHint: `Focus on understanding how CSS rules are applied and why certain styles take precedence.`
      },
      {
        title: `${topic.title} Fundamentals`,
        content: `Now let's explore the practical aspects of ${topic.title.toLowerCase()}. This CSS concept is essential for creating modern, professional web designs.`,
        concepts: [
          {
            name: 'Theory and Concepts',
            description: `Deep dive into the theory behind ${topic.title.toLowerCase()} and understand when and why to use these techniques.`,
            example: getExampleForLevel(levelId, 'CSS', 'basic'),
            tips: ['Understand the cascade', 'Use consistent naming conventions', 'Consider browser compatibility']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'CSS', 'basic'),
        practiceHint: `Start with the basic syntax and understand the underlying principles.`
      },
      {
        title: `Practical Implementation`,
        content: `Learn how to implement ${topic.title.toLowerCase()} effectively in real projects. We'll cover common patterns, best practices, and how to avoid common pitfalls.`,
        concepts: [
          {
            name: 'Implementation Strategies',
            description: `Master the practical aspects of ${topic.title.toLowerCase()} with proven techniques and patterns.`,
            example: getExampleForLevel(levelId, 'CSS', 'intermediate'),
            tips: [`Optimize ${topic.title.toLowerCase()} for performance`, 'Use developer tools for debugging', 'Test across devices']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'CSS', 'intermediate'),
        practiceHint: `Practice with real-world examples and experiment with different approaches.`
      },
      {
        title: `Professional Application`,
        content: `See how ${topic.title.toLowerCase()} is used in professional development environments. Learn about maintenance, scalability, and integration with build tools and frameworks.`,
        concepts: [
          {
            name: 'Production Considerations',
            description: `Understand how to use ${topic.title.toLowerCase()} in large-scale, professional projects.`,
            example: getExampleForLevel(levelId, 'CSS', 'advanced'),
            tips: ['Organize CSS with methodologies like BEM', 'Use CSS preprocessors effectively', 'Implement design systems']
          }
        ],
        visualExample: getExampleForLevel(levelId, 'CSS', 'advanced'),
        practiceHint: `Apply professional-grade techniques in your puzzle solution.`
      }
    ],
    summary: `Outstanding! You've mastered ${topic.title} and understand the theory, fundamentals, practical implementation, and professional applications. You're ready to tackle complex styling challenges with confidence.`,
    objectives: [
      `Understand ${topic.title} theory and principles`,
      `Master ${topic.title} techniques`,
      'Create responsive, accessible designs',
      'Implement modern CSS patterns',
      'Build scalable, maintainable stylesheets'
    ]
  };
};

export const generateAdvancedContent = (levelId: number, topic: TopicConfig): LevelLearningContent => {
  const theoryContent = `Advanced ${topic.title} theory encompasses understanding complex software engineering principles, architectural patterns, and best practices for scalable application development. This includes understanding how different systems interact, performance optimization strategies, and modern development methodologies.

The theoretical foundation involves understanding design patterns, SOLID principles, and how to apply them in real-world scenarios. Advanced topics also cover understanding of distributed systems, microservices architecture, and modern DevOps practices.

Mastering advanced concepts requires understanding both the technical implementation and the business impact of different architectural decisions.`;

  return {
    title: `${topic.title} - Level ${levelId}`,
    topic: 'Advanced',
    icon: Rocket,
    introduction: `Level ${levelId}: Master advanced ${topic.title} concepts for professional software development.`,
    theory: theoryContent,
    pages: [
      {
        title: `Advanced Theory: ${topic.title}`,
        content: `Welcome to Level ${levelId}! Let's explore the advanced theoretical concepts behind ${topic.title.toLowerCase()}.`,
        theory: theoryContent,
        concepts: [
          {
            name: 'Advanced Theory',
            description: `Understanding the complex theoretical foundations of ${topic.title.toLowerCase()}.`,
            example: getAdvancedExample(levelId, topic.title),
            tips: ['Think in systems', 'Consider scalability', 'Apply design patterns']
          }
        ],
        visualExample: getAdvancedExample(levelId, topic.title),
        practiceHint: `Focus on understanding the theoretical principles before diving into implementation.`
      },
      {
        title: `Advanced ${topic.title}`,
        content: `Explore ${topic.title} at an advanced level to build enterprise-grade applications and systems.`,
        concepts: [
          {
            name: `${topic.title} Mastery`,
            description: `Advanced techniques and patterns for implementing ${topic.title} in professional environments.`,
            example: getAdvancedExample(levelId, topic.title),
            tips: [`Master ${topic.title} best practices`, 'Consider scalability and maintainability', 'Stay updated with industry standards']
          }
        ],
        visualExample: getAdvancedExample(levelId, topic.title),
        practiceHint: `Apply advanced ${topic.title} concepts in complex problem-solving scenarios.`
      },
      {
        title: `Professional Implementation`,
        content: `Learn how to implement ${topic.title.toLowerCase()} in enterprise environments with proper architecture, testing, and deployment strategies.`,
        concepts: [
          {
            name: 'Enterprise Patterns',
            description: `Master enterprise-level implementation patterns for ${topic.title.toLowerCase()}.`,
            example: getAdvancedExample(levelId, topic.title),
            tips: ['Design for scale', 'Implement proper testing', 'Consider security implications']
          }
        ],
        visualExample: getAdvancedExample(levelId, topic.title),
        practiceHint: `Think like a senior developer and consider long-term maintainability.`
      },
      {
        title: `System Architecture`,
        content: `Understand how ${topic.title.toLowerCase()} fits into larger system architectures and how to design scalable, maintainable solutions.`,
        concepts: [
          {
            name: 'Architectural Mastery',
            description: `Design and implement systems using advanced ${topic.title.toLowerCase()} concepts.`,
            example: getAdvancedExample(levelId, topic.title),
            tips: ['Think architecturally', 'Plan for growth', 'Consider team collaboration']
          }
        ],
        visualExample: getAdvancedExample(levelId, topic.title),
        practiceHint: `Apply your complete understanding to solve complex architectural challenges.`
      }
    ],
    summary: `Outstanding! You've mastered advanced ${topic.title} theory and implementation. You understand complex systems, architectural patterns, and are ready for senior-level software development!`,
    objectives: [
      `Understand advanced ${topic.title} theory`,
      `Master advanced ${topic.title}`,
      'Design enterprise-level solutions',
      'Implement scalable architectures',
      'Lead technical implementations'
    ]
  };
};
