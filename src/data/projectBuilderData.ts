export interface ProjectStep {
    id: string;
    title: string;
    instruction: string;
    starterCode: string;
    solution: string;
    hint: string;
}

export interface BuildProject {
    id: string;
    title: string;
    description: string;
    emoji: string;
    color: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    language: string;
    estimatedTime: string;
    isPremium: boolean;
    tags: string[];
    steps: ProjectStep[];
    portfolioUrl?: string;
}

export const buildProjects: BuildProject[] = [
    {
        id: 'proj_calculator',
        title: 'Build a Calculator',
        description: 'Create a functional calculator with add, subtract, multiply, and divide.',
        emoji: '🧮', color: 'bg-pastel-blue', difficulty: 'beginner', language: 'Python',
        estimatedTime: '20 min', isPremium: false,
        tags: ['Functions', 'Arithmetic', 'Input/Output'],
        steps: [
            {
                id: 's1', title: 'Addition Function',
                instruction: 'Write a function add(a, b) that returns a + b.',
                starterCode: 'def add(a, b):\n    pass',
                solution: 'def add(a, b):\n    return a + b',
                hint: 'Use the + operator to add two numbers.'
            },
            {
                id: 's2', title: 'All Operations',
                instruction: 'Add subtract, multiply, and divide functions.',
                starterCode: 'def subtract(a, b):\n    pass\n\ndef multiply(a, b):\n    pass\n\ndef divide(a, b):\n    pass',
                solution: 'def subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b == 0: return "Error: Division by zero"\n    return a / b',
                hint: 'Remember to handle division by zero!'
            },
            {
                id: 's3', title: 'Main Calculator',
                instruction: 'Write a calculator() function that takes an operator (+,-,*,/) and two numbers.',
                starterCode: 'def calculator(op, a, b):\n    # Handle all 4 operations\n    pass',
                solution: 'def calculator(op, a, b):\n    ops = {"+": add, "-": subtract, "*": multiply, "/": divide}\n    return ops.get(op, lambda a,b: "Invalid op")(a, b)',
                hint: 'Use a dictionary to map operators to functions.'
            }
        ]
    },
    {
        id: 'proj_todo',
        title: 'Build a To-Do List',
        description: 'Create a command-line to-do app with add, complete, and delete features.',
        emoji: '📝', color: 'bg-pastel-mint', difficulty: 'beginner', language: 'Python',
        estimatedTime: '25 min', isPremium: false,
        tags: ['Lists', 'Functions', 'CRUD'],
        steps: [
            {
                id: 's1', title: 'Create the List',
                instruction: 'Create a tasks list and a function to add tasks.',
                starterCode: 'tasks = []\n\ndef add_task(task):\n    pass',
                solution: 'tasks = []\n\ndef add_task(task):\n    tasks.append({"task": task, "done": False})',
                hint: 'Store each task as a dict with "task" and "done" keys.'
            },
            {
                id: 's2', title: 'Complete a Task',
                instruction: 'Write complete_task(index) to mark a task as done.',
                starterCode: 'def complete_task(index):\n    pass',
                solution: 'def complete_task(index):\n    if 0 <= index < len(tasks):\n        tasks[index]["done"] = True',
                hint: 'Access the task by index and set done = True.'
            },
            {
                id: 's3', title: 'Show All Tasks',
                instruction: 'Write show_tasks() that prints each task with ✓ or ○.',
                starterCode: 'def show_tasks():\n    pass',
                solution: 'def show_tasks():\n    for i, t in enumerate(tasks):\n        mark = "✓" if t["done"] else "○"\n        print(f"{i}. {mark} {t[\'task\']}")',
                hint: 'Use enumerate and an f-string to format the output.'
            }
        ]
    },
    {
        id: 'proj_number_guessing',
        title: 'Number Guessing Game',
        description: 'Build a game where the player tries to guess a secret number.',
        emoji: '🎮', color: 'bg-pastel-yellow', difficulty: 'beginner', language: 'Python',
        estimatedTime: '15 min', isPremium: false,
        tags: ['Loops', 'Random', 'User Input'],
        steps: [
            {
                id: 's1', title: 'Generate Secret Number',
                instruction: 'Use random.randint to generate a secret number between 1 and 100.',
                starterCode: 'import random\n\n# Generate a secret number between 1 and 100\nsecret = ___',
                solution: 'import random\n\nsecret = random.randint(1, 100)',
                hint: 'Use random.randint(low, high) to generate a random integer.'
            },
            {
                id: 's2', title: 'Guessing Loop',
                instruction: 'Add a while loop letting the player guess until they get it right.',
                starterCode: 'attempts = 0\nguess = None\n\nwhile guess != secret:\n    # Get input and give hints\n    pass',
                solution: 'attempts = 0\nguess = None\n\nwhile guess != secret:\n    guess = int(input("Guess: "))\n    attempts += 1\n    if guess < secret: print("Too low!")\n    elif guess > secret: print("Too high!")',
                hint: 'Compare guess to secret and print a hint each time.'
            }
        ]
    },
    // PREMIUM PROJECTS
    {
        id: 'proj_web_scraper',
        title: 'Build a Web Scraper',
        description: 'Extract data from websites using Python\'s requests and BeautifulSoup.',
        emoji: '🕷️', color: 'bg-pastel-lavender', difficulty: 'intermediate', language: 'Python',
        estimatedTime: '40 min', isPremium: true,
        tags: ['HTTP', 'HTML Parsing', 'Data Extraction'],
        steps: [
            {
                id: 's1', title: 'Fetch a Web Page',
                instruction: 'Use requests.get() to fetch a URL and print the status code.',
                starterCode: 'import requests\n\nurl = "https://example.com"\n# Fetch the page\nresponse = ___\nprint(response.status_code)',
                solution: 'import requests\n\nurl = "https://example.com"\nresponse = requests.get(url)\nprint(response.status_code)',
                hint: 'Use requests.get(url) to send an HTTP GET request.'
            }
        ]
    },
    {
        id: 'proj_api',
        title: 'Build a REST API',
        description: 'Create a simple REST API with Flask — the skill every backend dev needs.',
        emoji: '🔌', color: 'bg-pastel-pink', difficulty: 'intermediate', language: 'Python',
        estimatedTime: '45 min', isPremium: true,
        tags: ['Flask', 'REST', 'JSON', 'HTTP'],
        steps: [
            {
                id: 's1', title: 'Hello World API',
                instruction: 'Create a Flask app with a /hello endpoint that returns JSON.',
                starterCode: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route("/hello")\ndef hello():\n    # Return JSON\n    pass',
                solution: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route("/hello")\ndef hello():\n    return jsonify({"message": "Hello, World!"})',
                hint: 'Use jsonify() to convert a dict to a JSON response.'
            }
        ]
    },
    {
        id: 'proj_chatbot',
        title: 'Build a Simple Chatbot',
        description: 'Create a rule-based chatbot that can answer common questions.',
        emoji: '🤖', color: 'bg-pastel-cyan', difficulty: 'advanced', language: 'Python',
        estimatedTime: '60 min', isPremium: true,
        tags: ['NLP', 'Dictionaries', 'String Matching'],
        steps: [
            {
                id: 's1', title: 'Response Dictionary',
                instruction: 'Build a dictionary mapping keywords to responses.',
                starterCode: 'responses = {\n    "hello": "Hi there! How can I help?",\n    # Add more mappings\n}',
                solution: 'responses = {\n    "hello": "Hi there! How can I help?",\n    "bye": "Goodbye! Have a great day!",\n    "help": "I can answer questions. Just type!",\n}',
                hint: 'Map common words users might say to bot responses.'
            }
        ]
    },
];

export const getFreeProjects = () => buildProjects.filter(p => !p.isPremium);
export const getPremiumProjects = () => buildProjects.filter(p => p.isPremium);
