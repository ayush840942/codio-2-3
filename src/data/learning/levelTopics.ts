
// Topic definitions for different level ranges

export interface TopicConfig {
  title: string;
  focus: string;
}

export const htmlTopics: TopicConfig[] = [
  { title: 'HTML Document Structure', focus: 'DOCTYPE, html, head, body elements' },
  { title: 'Text Formatting Elements', focus: 'headings, paragraphs, emphasis, strong' },
  { title: 'Links and Navigation', focus: 'anchor tags, href attributes, internal/external links' },
  { title: 'Images and Media', focus: 'img tags, alt attributes, responsive images' },
  { title: 'Lists and Organization', focus: 'ordered/unordered lists, nested lists, definition lists' },
  { title: 'Forms and Input Elements', focus: 'form structure, input types, validation' },
  { title: 'Tables and Data Display', focus: 'table structure, headers, accessibility' },
  { title: 'Semantic HTML Elements', focus: 'nav, header, main, section, article, aside, footer' },
  { title: 'Meta Information and SEO', focus: 'meta tags, title, description, keywords' },
  { title: 'HTML Accessibility Features', focus: 'ARIA labels, semantic markup, screen readers' }
];

export const cssTopics: TopicConfig[] = [
  { title: 'CSS Selectors and Specificity', focus: 'element, class, ID, attribute selectors' },
  { title: 'Box Model Mastery', focus: 'margin, padding, border, content areas' },
  { title: 'Typography and Text Styling', focus: 'fonts, spacing, alignment, readability' },
  { title: 'Colors and Backgrounds', focus: 'color theory, gradients, images, patterns' },
  { title: 'Flexbox Layout System', focus: 'flex containers, items, alignment, ordering' },
  { title: 'CSS Grid Layout', focus: 'grid containers, tracks, areas, responsive grids' },
  { title: 'Positioning and Z-index', focus: 'static, relative, absolute, fixed, sticky' },
  { title: 'Responsive Design Principles', focus: 'media queries, mobile-first, breakpoints' },
  { title: 'CSS Animations and Transitions', focus: 'keyframes, timing, easing, performance' },
  { title: 'Advanced CSS Techniques', focus: 'custom properties, calc(), modern features' }
];

export const javascriptTopics: TopicConfig[] = [
  { title: 'Variables and Data Types', focus: 'let, const, var, primitives, objects' },
  { title: 'Functions and Scope', focus: 'declarations, expressions, arrow functions, closures' },
  { title: 'Arrays and Methods', focus: 'creation, iteration, transformation, functional programming' },
  { title: 'Objects and Properties', focus: 'creation, access, methods, this keyword' },
  { title: 'Conditionals and Logic', focus: 'if/else, switch, ternary, boolean logic' },
  { title: 'Loops and Iteration', focus: 'for, while, do-while, for...in, for...of' },
  { title: 'Event Handling', focus: 'DOM events, listeners, delegation, preventDefault' },
  { title: 'DOM Manipulation', focus: 'selection, modification, creation, traversal' },
  { title: 'String Methods', focus: 'manipulation, searching, formatting, templates' },
  { title: 'Number Operations', focus: 'arithmetic, Math object, parsing, formatting' },
  { title: 'Promises and Async', focus: 'callbacks, promises, async/await, error handling' },
  { title: 'Error Handling', focus: 'try/catch, throw, custom errors, debugging' },
  { title: 'Classes and Objects', focus: 'ES6 classes, inheritance, static methods' },
  { title: 'Modules and Imports', focus: 'ES6 modules, import/export, bundling' },
  { title: 'JSON and APIs', focus: 'parsing, stringifying, fetch, REST APIs' },
  { title: 'Local Storage', focus: 'localStorage, sessionStorage, cookies' },
  { title: 'Regular Expressions', focus: 'patterns, matching, replacement, validation' },
  { title: 'Array Destructuring', focus: 'assignment, rest operator, nested destructuring' },
  { title: 'Spread Operator', focus: 'arrays, objects, function calls, cloning' },
  { title: 'Template Literals', focus: 'string interpolation, multiline, tagged templates' }
];

export const reactTopics: TopicConfig[] = [
  { title: 'Components & JSX', focus: 'component structure, props, state, event handling' },
  { title: 'Props & Data Flow', focus: 'passing data between components, state management' },
  { title: 'State Management', focus: 'context API, Redux, MobX' },
  { title: 'Event Handling', focus: 'handling events in React components' },
  { title: 'Conditional Rendering', focus: 'rendering components conditionally' },
  { title: 'Lists & Keys', focus: 'rendering lists, managing keys' },
  { title: 'Forms & Inputs', focus: 'handling form inputs in React' },
  { title: 'useEffect Hook', focus: 'side effects in React components' },
  { title: 'Custom Hooks', focus: 'creating custom hooks in React' },
  { title: 'Context API', focus: 'using context API in React' },
  { title: 'React Router', focus: 'routing in React applications' },
  { title: 'API Integration', focus: 'fetching data from APIs in React' },
  { title: 'useReducer Hook', focus: 'using useReducer in React' },
  { title: 'Memoization', focus: 'optimizing React components with memoization' },
  { title: 'Error Boundaries', focus: 'handling errors in React components' },
  { title: 'Fragments', focus: 'using React fragments' },
  { title: 'Portals', focus: 'using React portals' },
  { title: 'Testing Components', focus: 'testing React components with Jest and Enzyme' },
  { title: 'TypeScript Integration', focus: 'integrating TypeScript with React' },
  { title: 'Performance Optimization', focus: 'optimizing React applications for performance' }
];

export const oopTopics: TopicConfig[] = [
  { title: 'Classes & Objects', focus: 'class structure, inheritance, polymorphism' },
  { title: 'Inheritance', focus: 'inheritance in object-oriented programming' },
  { title: 'Polymorphism', focus: 'polymorphism in object-oriented programming' },
  { title: 'Encapsulation', focus: 'encapsulation in object-oriented programming' },
  { title: 'Abstraction', focus: 'abstraction in object-oriented programming' },
  { title: 'Interfaces', focus: 'interfaces in object-oriented programming' },
  { title: 'Static Methods', focus: 'static methods in object-oriented programming' },
  { title: 'Constructor Patterns', focus: 'constructor patterns in object-oriented programming' },
  { title: 'Method Overriding', focus: 'method overriding in object-oriented programming' },
  { title: 'Access Modifiers', focus: 'access modifiers in object-oriented programming' },
  { title: 'Composition', focus: 'composition in object-oriented programming' },
  { title: 'Design Patterns', focus: 'design patterns in object-oriented programming' },
  { title: 'Factory Pattern', focus: 'factory pattern in object-oriented programming' },
  { title: 'Observer Pattern', focus: 'observer pattern in object-oriented programming' },
  { title: 'Singleton Pattern', focus: 'singleton pattern in object-oriented programming' }
];

export const databaseTopics: TopicConfig[] = [
  { title: 'Database Design', focus: 'database schema design, normalization' },
  { title: 'SQL Queries', focus: 'writing SQL queries, indexing' },
  { title: 'Table Relations', focus: 'relationships between tables' },
  { title: 'Joins & Unions', focus: 'joining and combining tables' },
  { title: 'Indexes & Performance', focus: 'indexing and query optimization' },
  { title: 'Transactions', focus: 'transactions in database systems' },
  { title: 'NoSQL Basics', focus: 'NoSQL database concepts' },
  { title: 'Data Modeling', focus: 'data modeling techniques' },
  { title: 'Query Optimization', focus: 'query optimization techniques' },
  { title: 'Database Security', focus: 'database security measures' },
  { title: 'Backup & Recovery', focus: 'backup and recovery strategies' },
  { title: 'Normalization', focus: 'database normalization' },
  { title: 'Stored Procedures', focus: 'stored procedures in database systems' },
  { title: 'Triggers', focus: 'triggers in database systems' },
  { title: 'Views', focus: 'views in database systems' }
];

export const advancedTopics: TopicConfig[] = [
  { title: 'Algorithm Design', focus: 'algorithm design principles' },
  { title: 'Data Structures', focus: 'data structures and algorithms' },
  { title: 'System Architecture', focus: 'system architecture concepts' },
  { title: 'Microservices', focus: 'microservices architecture' },
  { title: 'API Development', focus: 'API development techniques' },
  { title: 'Security Patterns', focus: 'security patterns and best practices' },
  { title: 'Testing Strategies', focus: 'testing strategies and methodologies' },
  { title: 'DevOps Practices', focus: 'DevOps practices and tools' },
  { title: 'Performance Optimization', focus: 'performance optimization techniques' },
  { title: 'Code Review', focus: 'code review practices' },
  { title: 'Documentation', focus: 'documentation best practices' },
  { title: 'Version Control', focus: 'version control systems' },
  { title: 'Deployment Strategies', focus: 'deployment strategies and tools' },
  { title: 'Monitoring', focus: 'monitoring and logging' },
  { title: 'Scaling', focus: 'scaling strategies' },
  { title: 'Load Balancing', focus: 'load balancing techniques' },
  { title: 'Caching Strategies', focus: 'caching strategies' },
  { title: 'Message Queues', focus: 'message queues and integration' },
  { title: 'Event-Driven Architecture', focus: 'event-driven architecture' },
  { title: 'Clean Code', focus: 'clean code principles' }
];
