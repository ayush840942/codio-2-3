
-- Create a table to store all puzzle levels in the database
CREATE TABLE IF NOT EXISTS public.puzzle_levels (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  topic TEXT NOT NULL,
  puzzle_type TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for the puzzle_levels table
ALTER TABLE public.puzzle_levels ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read puzzle levels
CREATE POLICY "Anyone can view puzzle levels" 
  ON public.puzzle_levels 
  FOR SELECT 
  USING (true);

-- Insert all 200 levels into the database
INSERT INTO public.puzzle_levels (id, title, description, difficulty, topic, puzzle_type, xp_reward) VALUES
-- Basic Programming (1-5)
(1, 'What is a Variable?', 'Learn the fundamental concept of variables in programming', 'easy', 'Basic Programming', 'fill-blank', 10),
(2, 'Understanding Data Types', 'Learn about different types of data in programming', 'easy', 'Basic Programming', 'fill-blank', 10),
(3, 'Basic Math Operations', 'Learn how computers perform mathematical calculations', 'easy', 'Basic Programming', 'fill-blank', 10),
(4, 'True or False', 'Understanding boolean values in programming', 'easy', 'Basic Programming', 'fill-blank', 10),
(5, 'Making Decisions', 'Learn how programs make decisions using if statements', 'easy', 'Basic Programming', 'fill-blank', 15),

-- HTML (6-10)
(6, 'HTML Structure Basics', 'Learn the basic structure of an HTML document', 'easy', 'HTML', 'fill-blank', 15),
(7, 'HTML Headings', 'Learn about heading tags in HTML', 'easy', 'HTML', 'fill-blank', 15),
(8, 'Creating Paragraphs', 'Learn how to create text paragraphs in HTML', 'easy', 'HTML', 'fill-blank', 15),
(9, 'HTML Links', 'Learn how to create clickable links in HTML', 'easy', 'HTML', 'fill-blank', 20),
(10, 'Adding Images', 'Learn how to display images in HTML', 'easy', 'HTML', 'fill-blank', 20),

-- CSS (11-15)
(11, 'What is CSS?', 'Understanding the purpose of CSS in web development', 'easy', 'CSS', 'fill-blank', 15),
(12, 'CSS Selectors', 'Learn how to select HTML elements to style them', 'easy', 'CSS', 'fill-blank', 20),
(13, 'Changing Colors', 'Learn how to change text and background colors', 'easy', 'CSS', 'fill-blank', 20),
(14, 'CSS Box Model', 'Understanding how elements take up space', 'medium', 'CSS', 'fill-blank', 25),
(15, 'CSS Classes', 'Learn how to create reusable styles with classes', 'medium', 'CSS', 'fill-blank', 25),

-- JavaScript (16-20)
(16, 'JavaScript Variables', 'Learn how to store data in JavaScript', 'easy', 'JavaScript', 'fill-blank', 20),
(17, 'JavaScript Functions', 'Learn how to create reusable blocks of code', 'medium', 'JavaScript', 'fill-blank', 25),
(18, 'JavaScript Arrays', 'Learn how to store multiple values in one variable', 'medium', 'JavaScript', 'fill-blank', 25),
(19, 'JavaScript Loops', 'Learn how to repeat actions in your code', 'medium', 'JavaScript', 'fill-blank', 30),
(20, 'JavaScript Objects', 'Learn how to group related data together', 'medium', 'JavaScript', 'fill-blank', 30),

-- React (21-25)
(21, 'What is React?', 'Understanding the React library for building user interfaces', 'medium', 'React', 'fill-blank', 25),
(22, 'React Components', 'Learn about the building blocks of React applications', 'medium', 'React', 'fill-blank', 30),
(23, 'JSX Syntax', 'Understanding JSX - the syntax React uses', 'medium', 'React', 'fill-blank', 30),
(24, 'React Props', 'Learn how to pass data between components', 'hard', 'React', 'fill-blank', 35),
(25, 'React State', 'Understanding how components remember information', 'hard', 'React', 'fill-blank', 35),

-- Advanced Programming (26-30)
(26, 'Understanding APIs', 'Learn how applications communicate with each other', 'hard', 'Advanced', 'fill-blank', 40),
(27, 'Database Fundamentals', 'Understanding how applications store and retrieve data', 'hard', 'Advanced', 'fill-blank', 40),
(28, 'Version Control with Git', 'Learn how developers track changes in their code', 'hard', 'Advanced', 'fill-blank', 45),
(29, 'Software Testing', 'Understanding how to verify code works correctly', 'hard', 'Advanced', 'fill-blank', 45),
(30, 'Code Deployment', 'Learn how applications are published for users', 'hard', 'Advanced', 'fill-blank', 50),

-- Database (31-35)
(31, 'SQL Basics', 'Write basic SQL queries', 'medium', 'Database', 'fill-blank', 45),
(32, 'Database Relationships', 'Understand one-to-many and many-to-many relationships', 'hard', 'Database', 'drag-drop', 55),
(33, 'NoSQL Databases', 'Learn about document-based databases', 'hard', 'Database', 'debug', 60),
(34, 'Database Optimization', 'Optimizing database queries', 'hard', 'Database', 'reorder', 70),
(35, 'Data Modeling', 'Design efficient database schemas', 'hard', 'Database', 'drag-drop', 65),

-- Data Structures (36-50)
(36, 'Arrays Fundamentals', 'Learn how to manipulate arrays efficiently', 'medium', 'Data Structures', 'drag-drop', 45),
(37, 'Objects in Programming', 'Master working with objects', 'medium', 'Data Structures', 'fill-blank', 50),
(38, 'Linked Lists', 'Create and manipulate linked lists', 'medium', 'Data Structures', 'fill-blank', 55),
(39, 'Stack and Queue', 'Implement stack and queue data structures', 'medium', 'Data Structures', 'reorder', 55),
(40, 'Hash Tables', 'Understand hash tables and hash functions', 'hard', 'Data Structures', 'debug', 60),
(41, 'Binary Trees', 'Implement and traverse binary trees', 'hard', 'Data Structures', 'drag-drop', 65),
(42, 'Heap Data Structure', 'Implement a heap for priority operations', 'hard', 'Data Structures', 'drag-drop', 65),
(43, 'Graph Theory', 'Understanding graphs and their applications', 'hard', 'Data Structures', 'debug', 70),
(44, 'Trie Data Structure', 'Implement efficient string searching', 'hard', 'Data Structures', 'reorder', 65),
(45, 'Balanced Trees', 'Learn about AVL and Red-Black trees', 'hard', 'Data Structures', 'debug', 75),
(46, 'Disjoint Set Union', 'Union-Find data structure', 'hard', 'Data Structures', 'fill-blank', 70),
(47, 'Segment Trees', 'Range query data structures', 'hard', 'Data Structures', 'drag-drop', 80),
(48, 'Fenwick Tree', 'Binary Indexed Trees for prefix sums', 'hard', 'Data Structures', 'reorder', 75),
(49, 'Sparse Table', 'Static range query optimization', 'hard', 'Data Structures', 'debug', 80),
(50, 'Suffix Arrays', 'String processing with suffix arrays', 'hard', 'Data Structures', 'fill-blank', 85),

-- Algorithms (51-70)
(51, 'Sorting Algorithms', 'Implement basic sorting algorithms', 'hard', 'Algorithms', 'reorder', 65),
(52, 'Search Algorithms', 'Implement search algorithms', 'hard', 'Algorithms', 'drag-drop', 65),
(53, 'Big O Notation', 'Analyze algorithm efficiency', 'hard', 'Algorithms', 'fill-blank', 60),
(54, 'Graph Algorithms', 'Solve problems using graph theory', 'hard', 'Algorithms', 'debug', 70),
(55, 'Dynamic Programming', 'Solve complex problems with dynamic programming', 'hard', 'Algorithms', 'reorder', 70),
(56, 'Greedy Algorithms', 'Optimal solutions with greedy approach', 'hard', 'Algorithms', 'fill-blank', 65),
(57, 'Divide and Conquer', 'Break problems into smaller parts', 'hard', 'Algorithms', 'drag-drop', 70),
(58, 'Backtracking', 'Systematic solution space exploration', 'hard', 'Algorithms', 'debug', 75),
(59, 'String Algorithms', 'Pattern matching and string processing', 'hard', 'Algorithms', 'reorder', 70),
(60, 'Number Theory', 'Mathematical algorithms in programming', 'hard', 'Algorithms', 'fill-blank', 75),
(61, 'Geometric Algorithms', 'Computational geometry problems', 'hard', 'Algorithms', 'drag-drop', 80),
(62, 'Network Flow', 'Maximum flow and minimum cut', 'hard', 'Algorithms', 'debug', 85),
(63, 'Linear Programming', 'Optimization with linear constraints', 'hard', 'Algorithms', 'reorder', 90),
(64, 'Approximation Algorithms', 'Near-optimal solutions for hard problems', 'hard', 'Algorithms', 'fill-blank', 85),
(65, 'Randomized Algorithms', 'Algorithms using randomness', 'hard', 'Algorithms', 'debug', 80),
(66, 'Parallel Algorithms', 'Concurrent algorithm design', 'hard', 'Algorithms', 'drag-drop', 90),
(67, 'Quantum Algorithms', 'Introduction to quantum computing', 'hard', 'Algorithms', 'fill-blank', 100),
(68, 'Advanced DP', 'Complex dynamic programming patterns', 'hard', 'Algorithms', 'reorder', 95),
(69, 'Game Theory', 'Algorithms in competitive scenarios', 'hard', 'Algorithms', 'debug', 90),
(70, 'Computational Complexity', 'P vs NP and complexity classes', 'hard', 'Algorithms', 'fill-blank', 100),

-- Web Development (71-85)
(71, 'HTTP Methods', 'Learn about GET, POST, PUT, DELETE requests', 'medium', 'Web Development', 'fill-blank', 40),
(72, 'REST APIs', 'Understanding RESTful API design principles', 'medium', 'Web Development', 'drag-drop', 45),
(73, 'JSON Data Format', 'Working with JSON for data exchange', 'easy', 'Web Development', 'fill-blank', 35),
(74, 'Web Security Basics', 'Understanding HTTPS, CORS, and basic security', 'hard', 'Web Development', 'debug', 55),
(75, 'Authentication', 'Learn about user authentication methods', 'hard', 'Web Development', 'drag-drop', 60),
(76, 'GraphQL Basics', 'Query APIs with GraphQL', 'hard', 'Web Development', 'drag-drop', 65),
(77, 'WebSockets', 'Real-time communication protocols', 'medium', 'Web Development', 'fill-blank', 50),
(78, 'Progressive Web Apps', 'Building offline-capable web apps', 'hard', 'Web Development', 'reorder', 70),
(79, 'Web Performance', 'Optimizing web application performance', 'hard', 'Web Development', 'debug', 65),
(80, 'Browser APIs', 'Using modern browser capabilities', 'medium', 'Web Development', 'drag-drop', 55),
(81, 'Microservices', 'Distributed web architecture', 'hard', 'Web Development', 'reorder', 80),
(82, 'API Gateway', 'Managing API traffic and security', 'hard', 'Web Development', 'debug', 75),
(83, 'Server-Side Rendering', 'SSR vs CSR trade-offs', 'hard', 'Web Development', 'fill-blank', 70),
(84, 'Content Delivery Networks', 'CDN configuration and optimization', 'medium', 'Web Development', 'drag-drop', 60),
(85, 'Web Accessibility', 'Building inclusive web applications', 'medium', 'Web Development', 'fill-blank', 55),

-- Testing (86-95)
(86, 'Unit Testing Basics', 'Writing your first unit tests', 'medium', 'Testing', 'fill-blank', 40),
(87, 'Test-Driven Development', 'Learn the TDD approach to coding', 'hard', 'Testing', 'reorder', 55),
(88, 'Integration Testing', 'Testing how components work together', 'hard', 'Testing', 'debug', 60),
(89, 'End-to-End Testing', 'Testing complete user workflows', 'hard', 'Testing', 'drag-drop', 65),
(90, 'Performance Testing', 'Load and stress testing applications', 'hard', 'Testing', 'fill-blank', 70),
(91, 'Test Automation', 'Automated testing pipelines', 'hard', 'Testing', 'reorder', 65),
(92, 'Mocking and Stubbing', 'Isolating components for testing', 'medium', 'Testing', 'debug', 50),
(93, 'Security Testing', 'Testing for vulnerabilities', 'hard', 'Testing', 'drag-drop', 75),
(94, 'A/B Testing', 'Statistical testing for features', 'medium', 'Testing', 'fill-blank', 55),
(95, 'Code Coverage', 'Measuring test effectiveness', 'medium', 'Testing', 'reorder', 50),

-- Security (96-110)
(96, 'Input Validation', 'Validating user input securely', 'medium', 'Security', 'fill-blank', 45),
(97, 'SQL Injection Prevention', 'Protecting against SQL injection attacks', 'hard', 'Security', 'debug', 60),
(98, 'XSS Protection', 'Preventing Cross-Site Scripting attacks', 'hard', 'Security', 'drag-drop', 65),
(99, 'Encryption Basics', 'Understanding data encryption', 'hard', 'Security', 'fill-blank', 70),
(100, 'OAuth & JWT', 'Modern authentication protocols', 'hard', 'Security', 'reorder', 75),
(101, 'HTTPS Implementation', 'Securing web communications', 'medium', 'Security', 'fill-blank', 50),
(102, 'Password Security', 'Secure password handling', 'medium', 'Security', 'debug', 55),
(103, 'API Security', 'Securing REST and GraphQL APIs', 'hard', 'Security', 'drag-drop', 70),
(104, 'OWASP Top 10', 'Common web vulnerabilities', 'hard', 'Security', 'reorder', 75),
(105, 'Cryptographic Protocols', 'Advanced encryption techniques', 'hard', 'Security', 'fill-blank', 80),
(106, 'Blockchain Security', 'Security in distributed systems', 'hard', 'Security', 'debug', 85),
(107, 'Network Security', 'Protecting network communications', 'hard', 'Security', 'drag-drop', 75),
(108, 'Container Security', 'Securing containerized applications', 'hard', 'Security', 'reorder', 80),
(109, 'Cloud Security', 'Security in cloud environments', 'hard', 'Security', 'fill-blank', 85),
(110, 'Zero Trust Architecture', 'Modern security frameworks', 'hard', 'Security', 'debug', 90),

-- DevOps (111-125)
(111, 'Git Version Control', 'Managing code with Git', 'easy', 'DevOps', 'fill-blank', 30),
(112, 'Docker Containers', 'Containerizing applications with Docker', 'hard', 'DevOps', 'drag-drop', 60),
(113, 'CI/CD Pipelines', 'Continuous Integration and Deployment', 'hard', 'DevOps', 'reorder', 65),
(114, 'Cloud Services', 'Deploying to cloud platforms', 'hard', 'DevOps', 'debug', 70),
(115, 'Monitoring & Logging', 'Application monitoring and logging', 'medium', 'DevOps', 'fill-blank', 50),
(116, 'Kubernetes Orchestration', 'Container orchestration at scale', 'hard', 'DevOps', 'drag-drop', 80),
(117, 'Infrastructure as Code', 'Managing infrastructure with code', 'hard', 'DevOps', 'reorder', 75),
(118, 'Service Mesh', 'Microservices communication', 'hard', 'DevOps', 'debug', 85),
(119, 'GitOps Workflows', 'Git-driven deployment strategies', 'hard', 'DevOps', 'fill-blank', 70),
(120, 'Serverless Computing', 'Functions as a Service deployment', 'hard', 'DevOps', 'drag-drop', 75),
(121, 'Site Reliability Engineering', 'SRE principles and practices', 'hard', 'DevOps', 'reorder', 80),
(122, 'Chaos Engineering', 'Testing system resilience', 'hard', 'DevOps', 'debug', 85),
(123, 'Performance Monitoring', 'Application performance management', 'medium', 'DevOps', 'fill-blank', 60),
(124, 'Security in DevOps', 'DevSecOps practices', 'hard', 'DevOps', 'drag-drop', 80),
(125, 'Multi-Cloud Strategy', 'Managing multiple cloud providers', 'hard', 'DevOps', 'reorder', 90),

-- Mobile Development (126-140)
(126, 'Mobile First Design', 'Designing for mobile devices first', 'medium', 'Mobile Development', 'fill-blank', 40),
(127, 'React Native Basics', 'Building mobile apps with React Native', 'hard', 'Mobile Development', 'drag-drop', 55),
(128, 'Flutter Development', 'Cross-platform mobile development', 'hard', 'Mobile Development', 'reorder', 60),
(129, 'Progressive Web Apps', 'Web apps that feel native', 'medium', 'Mobile Development', 'fill-blank', 45),
(130, 'Mobile Performance', 'Optimizing apps for mobile devices', 'hard', 'Mobile Development', 'debug', 65),
(131, 'Push Notifications', 'Engaging users with notifications', 'medium', 'Mobile Development', 'drag-drop', 50),
(132, 'Offline Storage', 'Data persistence in mobile apps', 'medium', 'Mobile Development', 'fill-blank', 55),
(133, 'Touch Gestures', 'Implementing touch interactions', 'medium', 'Mobile Development', 'reorder', 50),
(134, 'Camera Integration', 'Accessing device camera features', 'medium', 'Mobile Development', 'debug', 55),
(135, 'Location Services', 'GPS and location-based features', 'medium', 'Mobile Development', 'drag-drop', 60),
(136, 'Mobile Security', 'Securing mobile applications', 'hard', 'Mobile Development', 'fill-blank', 70),
(137, 'App Store Deployment', 'Publishing to app stores', 'medium', 'Mobile Development', 'reorder', 55),
(138, 'Mobile Analytics', 'Tracking app usage and performance', 'medium', 'Mobile Development', 'debug', 50),
(139, 'Cross-Platform Testing', 'Testing across different devices', 'hard', 'Mobile Development', 'drag-drop', 65),
(140, 'Mobile Accessibility', 'Making apps accessible to everyone', 'medium', 'Mobile Development', 'fill-blank', 60),

-- AI/ML (141-160)
(141, 'Machine Learning Basics', 'Introduction to machine learning concepts', 'medium', 'AI/ML', 'fill-blank', 50),
(142, 'Neural Networks', 'Understanding neural network fundamentals', 'hard', 'AI/ML', 'drag-drop', 70),
(143, 'Data Preprocessing', 'Preparing data for machine learning', 'medium', 'AI/ML', 'reorder', 55),
(144, 'Model Training', 'Training machine learning models', 'hard', 'AI/ML', 'debug', 75),
(145, 'AI Ethics', 'Ethical considerations in AI development', 'medium', 'AI/ML', 'fill-blank', 60),
(146, 'Deep Learning', 'Advanced neural network architectures', 'hard', 'AI/ML', 'drag-drop', 80),
(147, 'Computer Vision', 'Image recognition and processing', 'hard', 'AI/ML', 'reorder', 85),
(148, 'Natural Language Processing', 'Processing human language', 'hard', 'AI/ML', 'debug', 80),
(149, 'Reinforcement Learning', 'Learning through interaction', 'hard', 'AI/ML', 'fill-blank', 90),
(150, 'Model Deployment', 'Deploying ML models to production', 'hard', 'AI/ML', 'drag-drop', 75),
(151, 'Transfer Learning', 'Leveraging pre-trained models', 'hard', 'AI/ML', 'reorder', 70),
(152, 'Generative AI', 'Creating new content with AI', 'hard', 'AI/ML', 'debug', 95),
(153, 'MLOps Practices', 'ML operations and lifecycle', 'hard', 'AI/ML', 'fill-blank', 80),
(154, 'Feature Engineering', 'Creating meaningful model inputs', 'medium', 'AI/ML', 'drag-drop', 65),
(155, 'Model Evaluation', 'Assessing model performance', 'medium', 'AI/ML', 'reorder', 60),
(156, 'Hyperparameter Tuning', 'Optimizing model parameters', 'hard', 'AI/ML', 'debug', 75),
(157, 'Ensemble Methods', 'Combining multiple models', 'hard', 'AI/ML', 'fill-blank', 80),
(158, 'Time Series Analysis', 'Analyzing temporal data', 'hard', 'AI/ML', 'drag-drop', 85),
(159, 'Recommendation Systems', 'Building personalized recommendations', 'hard', 'AI/ML', 'reorder', 90),
(160, 'AI in Production', 'Scaling AI systems', 'hard', 'AI/ML', 'debug', 100),

-- Advanced Topics (161-180)
(161, 'Distributed Systems', 'Building scalable distributed applications', 'hard', 'Advanced', 'debug', 90),
(162, 'System Design', 'Designing large-scale systems', 'hard', 'Advanced', 'drag-drop', 95),
(163, 'Microservices Architecture', 'Breaking down monolithic applications', 'hard', 'Advanced', 'reorder', 85),
(164, 'Event-Driven Architecture', 'Asynchronous system design', 'hard', 'Advanced', 'fill-blank', 80),
(165, 'API Design Patterns', 'Best practices for API development', 'hard', 'Advanced', 'debug', 75),
(166, 'Database Sharding', 'Horizontal database scaling', 'hard', 'Advanced', 'drag-drop', 90),
(167, 'Caching Strategies', 'Implementing effective caching', 'hard', 'Advanced', 'reorder', 70),
(168, 'Message Queues', 'Asynchronous communication patterns', 'hard', 'Advanced', 'fill-blank', 75),
(169, 'Load Balancing', 'Distributing traffic efficiently', 'hard', 'Advanced', 'debug', 80),
(170, 'Service Discovery', 'Dynamic service location', 'hard', 'Advanced', 'drag-drop', 85),
(171, 'Circuit Breaker Pattern', 'Handling service failures gracefully', 'hard', 'Advanced', 'reorder', 80),
(172, 'CQRS and Event Sourcing', 'Advanced data patterns', 'hard', 'Advanced', 'fill-blank', 95),
(173, 'Consensus Algorithms', 'Distributed agreement protocols', 'hard', 'Advanced', 'debug', 100),
(174, 'Eventual Consistency', 'Managing distributed data consistency', 'hard', 'Advanced', 'drag-drop', 90),
(175, 'CAP Theorem', 'Trade-offs in distributed systems', 'hard', 'Advanced', 'reorder', 85),
(176, 'Reactive Programming', 'Event-driven programming paradigms', 'hard', 'Advanced', 'fill-blank', 80),
(177, 'Functional Programming', 'Advanced functional concepts', 'hard', 'Advanced', 'debug', 85),
(178, 'Domain-Driven Design', 'Modeling complex business domains', 'hard', 'Advanced', 'drag-drop', 90),
(179, 'Hexagonal Architecture', 'Clean architecture patterns', 'hard', 'Advanced', 'reorder', 85),
(180, 'Serverless Architecture', 'Building with serverless patterns', 'hard', 'Advanced', 'fill-blank', 80),

-- Master Level (181-200)
(181, 'Compiler Design', 'Building programming language compilers', 'hard', 'Master Level', 'debug', 120),
(182, 'Operating System Internals', 'Understanding OS architecture', 'hard', 'Master Level', 'fill-blank', 115),
(183, 'Computer Graphics', '3D rendering and graphics programming', 'hard', 'Master Level', 'drag-drop', 110),
(184, 'Quantum Computing', 'Introduction to quantum algorithms', 'hard', 'Master Level', 'reorder', 130),
(185, 'Blockchain Protocols', 'Designing blockchain systems', 'hard', 'Master Level', 'debug', 125),
(186, 'Game Engine Development', 'Building game engines from scratch', 'hard', 'Master Level', 'fill-blank', 120),
(187, 'High-Performance Computing', 'Optimizing for extreme performance', 'hard', 'Master Level', 'drag-drop', 125),
(188, 'Cryptocurrency Development', 'Creating digital currencies', 'hard', 'Master Level', 'reorder', 130),
(189, 'Virtual Reality Programming', 'Building immersive VR experiences', 'hard', 'Master Level', 'debug', 120),
(190, 'Robotics Programming', 'Controlling robotic systems', 'hard', 'Master Level', 'fill-blank', 125),
(191, 'Embedded Systems', 'Programming for embedded devices', 'hard', 'Master Level', 'drag-drop', 115),
(192, 'Network Protocol Design', 'Creating new network protocols', 'hard', 'Master Level', 'reorder', 120),
(193, 'Bioinformatics Algorithms', 'Computational biology problems', 'hard', 'Master Level', 'debug', 125),
(194, 'Cryptographic Systems', 'Designing secure cryptographic protocols', 'hard', 'Master Level', 'fill-blank', 130),
(195, 'Autonomous Systems', 'Programming self-driving systems', 'hard', 'Master Level', 'drag-drop', 135),
(196, 'Space Programming', 'Software for space exploration', 'hard', 'Master Level', 'reorder', 140),
(197, 'Brain-Computer Interfaces', 'Programming neural interfaces', 'hard', 'Master Level', 'debug', 145),
(198, 'Quantum Machine Learning', 'ML on quantum computers', 'hard', 'Master Level', 'fill-blank', 150),
(199, 'Programming Language Design', 'Creating new programming languages', 'hard', 'Master Level', 'drag-drop', 140),
(200, 'The Ultimate Challenge', 'Master all programming concepts', 'hard', 'Master Level', 'debug', 200)

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  difficulty = EXCLUDED.difficulty,
  topic = EXCLUDED.topic,
  puzzle_type = EXCLUDED.puzzle_type,
  xp_reward = EXCLUDED.xp_reward,
  updated_at = now();
