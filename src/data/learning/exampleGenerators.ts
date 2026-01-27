
// Example generators for different programming topics

export const getAdvancedExample = (levelId: number, topic: string): string => {
  const examples = {
    'Algorithm Design': `
// Advanced Algorithm Design Pattern
class OptimalPathFinder {
  constructor(grid) {
    this.grid = grid;
    this.memo = new Map();
  }
  
  findPath(start, end) {
    return this.dijkstra(start, end);
  }
  
  dijkstra(start, end) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();
    
    // Implementation details...
    return this.reconstructPath(previous, end);
  }
}`,
    'Data Structures': `
// Advanced Data Structure Implementation
class BalancedBST {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    this.root = this._insert(this.root, value);
    this.root = this._balance(this.root);
  }
  
  _balance(node) {
    if (!node) return null;
    
    const balanceFactor = this._getBalanceFactor(node);
    
    if (balanceFactor > 1) {
      return this._rotateRight(node);
    }
    if (balanceFactor < -1) {
      return this._rotateLeft(node);
    }
    
    return node;
  }
}`,
    'System Architecture': `
// Microservices Architecture Pattern
class ServiceRegistry {
  constructor() {
    this.services = new Map();
    this.healthChecks = new Map();
  }
  
  register(serviceName, endpoint, healthCheck) {
    this.services.set(serviceName, {
      endpoint,
      instances: [],
      loadBalancer: new RoundRobinBalancer()
    });
    
    this.healthChecks.set(serviceName, healthCheck);
  }
  
  discover(serviceName) {
    const service = this.services.get(serviceName);
    return service?.loadBalancer.getNext();
  }
}`,
    'Security Patterns': `
// Advanced Security Implementation
class SecureTokenManager {
  constructor(secretKey) {
    this.secretKey = secretKey;
    this.blacklist = new Set();
  }
  
  generateToken(payload, expiresIn = '1h') {
    const header = { alg: 'HS256', typ: 'JWT' };
    const claims = {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: this.calculateExpiration(expiresIn)
    };
    
    return this.sign(header, claims);
  }
  
  validateToken(token) {
    if (this.blacklist.has(token)) {
      throw new Error('Token revoked');
    }
    
    return this.verify(token);
  }
}`
  };
  
  return examples[topic] || `
// Advanced ${topic} Example
class Advanced${topic.replace(/\s+/g, '')} {
  constructor() {
    this.config = this.loadConfiguration();
  }
  
  execute() {
    console.log('Executing advanced ${topic.toLowerCase()}');
    return this.processAdvancedLogic();
  }
  
  processAdvancedLogic() {
    // Advanced implementation details
    return 'Success';
  }
}`;
};

export const getHTMLExample = (levelId: number, complexity: string = 'basic'): string => {
  const examples = {
    basic: [
      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
      '<h1>Main Title</h1>\n<h2>Subtitle</h2>\n<p>This is a paragraph.</p>',
      '<a href="https://example.com" target="_blank">Visit Example</a>',
      '<img src="image.jpg" alt="Descriptive text" width="300" height="200">',
      '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>',
      '<form action="/submit" method="post">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n  <button type="submit">Submit</button>\n</form>',
      '<table>\n  <thead>\n    <tr><th>Name</th><th>Age</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>John</td><td>25</td></tr>\n  </tbody>\n</table>',
      '<nav>\n  <ul>\n    <li><a href="#home">Home</a></li>\n    <li><a href="#about">About</a></li>\n  </ul>\n</nav>',
      '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Page description">',
      '<button aria-label="Close dialog" tabindex="0">×</button>'
    ],
    intermediate: [
      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Advanced Structure</title>\n</head>\n<body>\n  <header>\n    <h1>Site Title</h1>\n  </header>\n  <main>\n    <section>\n      <h2>Content Section</h2>\n    </section>\n  </main>\n</body>\n</html>',
      '<article>\n  <header>\n    <h1>Article Title</h1>\n    <time datetime="2024-01-15">January 15, 2024</time>\n  </header>\n  <p>Article content...</p>\n</article>',
      '<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/" aria-current="page">Home</a></li>\n    <li><a href="/about">About</a></li>\n  </ul>\n</nav>',
      '<figure>\n  <img src="chart.jpg" alt="Sales data chart showing 20% increase">\n  <figcaption>Q4 sales increased by 20%</figcaption>\n</figure>',
      '<ol>\n  <li>Preparation\n    <ul>\n      <li>Gather materials</li>\n      <li>Set up workspace</li>\n    </ul>\n  </li>\n  <li>Execution</li>\n</ol>',
      '<form>\n  <fieldset>\n    <legend>Personal Information</legend>\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" autocomplete="email" required>\n  </fieldset>\n</form>',
      '<table>\n  <caption>Employee Data</caption>\n  <thead>\n    <tr>\n      <th scope="col">Name</th>\n      <th scope="col">Department</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">John Doe</th>\n      <td>Engineering</td>\n    </tr>\n  </tbody>\n</table>',
      '<header>\n  <nav aria-label="Main">\n    <ul>\n      <li><a href="#main" class="skip-link">Skip to main content</a></li>\n    </ul>\n  </nav>\n</header>\n<main id="main">\n  <h1>Main Content</h1>\n</main>',
      '<head>\n  <meta name="description" content="Comprehensive guide to HTML best practices">\n  <meta name="keywords" content="HTML, web development, accessibility">\n  <meta property="og:title" content="HTML Guide">\n</head>',
      '<div role="alert" aria-live="polite">\n  <p>Form submitted successfully!</p>\n</div>'
    ]
  };
  
  const levelExamples = examples[complexity as keyof typeof examples] || examples.basic;
  return levelExamples[levelId - 1] || levelExamples[0];
};

export const getCSSExample = (levelId: number, complexity: string = 'basic'): string => {
  const examples = {
    basic: [
      'h1 {\n  color: #333;\n  font-size: 2rem;\n  margin-bottom: 1rem;\n}',
      '.box {\n  width: 200px;\n  height: 100px;\n  padding: 20px;\n  margin: 10px;\n  border: 2px solid #ccc;\n}',
      'p {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n  color: #444;\n}',
      '.gradient-bg {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n  color: white;\n  padding: 2rem;\n}',
      '.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}',
      '.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  padding: 20px;\n}',
      '.centered {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}',
      '@media (max-width: 768px) {\n  .responsive {\n    width: 100%;\n    padding: 1rem;\n  }\n}',
      '.fade-in {\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n}\n.fade-in:hover {\n  opacity: 1;\n}',
      ':root {\n  --primary-color: #3498db;\n  --secondary-color: #2ecc71;\n}\n.button {\n  background-color: var(--primary-color);\n}'
    ],
    intermediate: [
      '.advanced-selector {\n  /* Advanced selector patterns */\n}\n.parent > .child:nth-child(2n+1) {\n  background-color: #f0f0f0;\n}\n.element[data-type="special"]:hover {\n  transform: scale(1.05);\n}',
      '.complex-box {\n  /* Advanced box model */\n  box-sizing: border-box;\n  width: 300px;\n  padding: 2rem;\n  border: 3px solid #ddd;\n  margin: 1rem auto;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n}',
      '.typography-system {\n  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;\n  font-size: clamp(1rem, 2.5vw, 1.5rem);\n  line-height: 1.5;\n  letter-spacing: -0.02em;\n  text-rendering: optimizeLegibility;\n}',
      '.advanced-gradient {\n  background: conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);\n  background-size: 200% 200%;\n  animation: gradientShift 4s ease infinite;\n}',
      '.flex-advanced {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.flex-header { flex: 0 0 auto; }\n.flex-main { flex: 1 1 auto; }\n.flex-footer { flex: 0 0 auto; }',
      '.grid-advanced {\n  display: grid;\n  grid-template-areas:\n    "header header header"\n    "sidebar main aside"\n    "footer footer footer";\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}'
    ]
  };
  
  const levelExamples = examples[complexity as keyof typeof examples] || examples.basic;
  return levelExamples[levelId - 11] || levelExamples[0];
};

export const getJSExample = (levelId: number, complexity: string = 'basic'): string => {
  const examples = {
    basic: [
      'let name = "John";\nconst age = 25;\nvar isActive = true;\nconsole.log(`Hello, ${name}! You are ${age} years old.`);',
      'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst greetArrow = (name) => `Hello, ${name}!`;\n\nconsole.log(greet("World"));',
      'let fruits = ["apple", "banana", "orange"];\nfruits.push("grape");\nfruits.forEach(fruit => console.log(fruit));\nconst upperFruits = fruits.map(fruit => fruit.toUpperCase());',
      'const person = {\n  name: "John",\n  age: 25,\n  city: "NYC",\n  greet() {\n    return `Hi, I\'m ${this.name} from ${this.city}`;\n  }\n};\nconsole.log(person.greet());',
      'const age = 18;\nif (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}\n\nconst status = age >= 18 ? "Adult" : "Minor";\nconsole.log(status);'
    ],
    intermediate: [
      'const user = { name: "John", age: 25, city: "NYC" };\nconst { name, age, ...rest } = user;\nconst userArray = [name, age, "Developer"];\nconst [userName, userAge, job = "Unknown"] = userArray;',
      'function createCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2',
      'const numbers = [1, 2, 3, 4, 5];\nconst evenNumbers = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconst doubled = numbers.map(n => n * 2);'
    ]
  };
  
  const levelExamples = examples[complexity as keyof typeof examples] || examples.basic;
  return levelExamples[levelId - 21] || levelExamples[0];
};

export const getExampleForLevel = (levelId: number, subject: string, complexity: string): string => {
  if (subject === 'JavaScript') {
    return getJSExample(levelId, complexity);
  } else if (subject === 'CSS') {
    return getCSSExample(levelId, complexity);
  } else if (subject === 'HTML') {
    return getHTMLExample(levelId, complexity);
  }
  return 'console.log("Example code");';
};
