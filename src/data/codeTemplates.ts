export interface ProjectTemplate {
    id: string;
    name: string;
    description: string;
    language: string;
    category: 'web' | 'python' | 'javascript' | 'cpp' | 'java' | 'game';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    files: Record<string, string>;
    preview?: string;
}

export const TEMPLATES: ProjectTemplate[] = [
    // Web Templates
    {
        id: 'landing-page',
        name: 'Modern Landing Page',
        description: 'Beautiful responsive landing page with hero section',
        language: 'html',
        category: 'web',
        difficulty: 'beginner',
        files: {
            'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Product</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <h1 class="logo">🚀 MyApp</h1>
            <button class="cta-btn">Get Started</button>
        </div>
    </nav>
    
    <section class="hero">
        <div class="container">
            <h1 class="hero-title">Build Anything You Imagine</h1>
            <p class="hero-subtitle">The most powerful code editor in your pocket</p>
            <button class="hero-btn">Start Building →</button>
        </div>
    </section>
    
    <section class="features">
        <div class="container">
            <div class="feature-card">
                <div class="icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Instant code execution</p>
            </div>
            <div class="feature-card">
                <div class="icon">🎨</div>
                <h3>Beautiful UI</h3>
                <p>Stunning interface</p>
            </div>
            <div class="feature-card">
                <div class="icon">🔒</div>
                <h3>Secure</h3>
                <p>Your code is safe</p>
            </div>
        </div>
    </section>
    
    <script src="script.js"></script>
</body>
</html>`,
            'styles.css': `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.navbar {
    padding: 20px 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.cta-btn {
    background: white;
    color: #667eea;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
}

.cta-btn:hover {
    transform: scale(1.05);
}

.hero {
    text-align: center;
    padding: 100px 20px;
}

.hero-title {
    font-size: 48px;
    margin-bottom: 20px;
    animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
    font-size: 20px;
    opacity: 0.9;
    margin-bottom: 30px;
    animation: fadeInUp 1s ease;
}

.hero-btn {
    background: white;
    color: #667eea;
    border: none;
    padding: 16px 40px;
    border-radius: 30px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    animation: fadeInUp 1.2s ease;
    transition: all 0.3s;
}

.hero-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.features {
    padding: 60px 20px;
}

.features .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.feature-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 40px 30px;
    border-radius: 20px;
    text-align: center;
    transition: transform 0.3s;
}

.feature-card:hover {
    transform: translateY(-10px);
}

.icon {
    font-size: 48px;
    margin-bottom: 15px;
}

.feature-card h3 {
    font-size: 24px;
    margin-bottom: 10px;
}

.feature-card p {
    opacity: 0.8;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 32px;
    }
    
    .hero-subtitle {
        font-size: 16px;
    }
}`,
            'script.js': `// Add smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add click animations
document.querySelectorAll('.cta-btn, .hero-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        alert('🎉 Welcome! Start building amazing things!');
    });
});

// Animate feature cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

console.log('🚀 Landing page loaded successfully!');`
        }
    },

    // Python Templates
    {
        id: 'python-calculator',
        name: 'Smart Calculator',
        description: 'Advanced calculator with history and functions',
        language: 'python',
        category: 'python',
        difficulty: 'beginner',
        files: {
            'main.py': `# Smart Calculator with History
import math

class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a, b):
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a, b):
        result = a * b
        self.history.append(f"{a} × {b} = {result}")
        return result
    
    def divide(self, a, b):
        if b == 0:
            return "Error: Division by zero!"
        result = a / b
        self.history.append(f"{a} ÷ {b} = {result}")
        return result
    
    def power(self, a, b):
        result = a ** b
        self.history.append(f"{a}^{b} = {result}")
        return result
    
    def sqrt(self, a):
        result = math.sqrt(a)
        self.history.append(f"√{a} = {result}")
        return result
    
    def show_history(self):
        print("\\n📊 Calculation History:")
        for calc in self.history:
            print(f"  {calc}")

# Demo
calc = Calculator()

print("🧮 Smart Calculator")
print("=" * 40)

print(f"10 + 5 = {calc.add(10, 5)}")
print(f"20 - 8 = {calc.subtract(20, 8)}")
print(f"6 × 7 = {calc.multiply(6, 7)}")
print(f"100 ÷ 4 = {calc.divide(100, 4)}")
print(f"2^8 = {calc.power(2, 8)}")
print(f"√144 = {calc.sqrt(144)}")

calc.show_history()

print("\\n✨ Calculator ready for more calculations!")`
        }
    },

    // JavaScript Templates
    {
        id: 'todo-app',
        name: 'Todo List App',
        description: 'Interactive todo list with local storage',
        language: 'javascript',
        category: 'javascript',
        difficulty: 'intermediate',
        files: {
            'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #667eea;
            margin-bottom: 20px;
            text-align: center;
        }
        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        input {
            flex: 1;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover { background: #5568d3; }
        .todo-list {
            list-style: none;
        }
        .todo-item {
            background: #f5f5f5;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
        }
        .todo-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .todo-item.completed {
            opacity: 0.6;
            text-decoration: line-through;
        }
        .delete-btn {
            background: #ff6b6b;
            padding: 8px 16px;
            font-size: 14px;
        }
        .delete-btn:hover { background: #ff5252; }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ My Tasks</h1>
        <div class="input-group">
            <input type="text" id="todoInput" placeholder="Add a new task...">
            <button onclick="addTodo()">Add</button>
        </div>
        <ul class="todo-list" id="todoList"></ul>
    </div>
    <script src="app.js"></script>
</body>
</html>`,
            'app.js': `let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        li.innerHTML = '<span onclick="toggleTodo(' + index + ')" style="cursor: pointer; flex: 1;">' +
            todo.text + '</span>' +
            '<button class="delete-btn" onclick="deleteTodo(' + index + ')">Delete</button>';
        list.appendChild(li);
    });
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        todos.push({ text, completed: false });
        input.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Enter key support
document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initial render
renderTodos();
console.log('📝 Todo app loaded!');`
        }
    }
];

export const getTemplatesByCategory = (category: string) => {
    return TEMPLATES.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
    return TEMPLATES.find(t => t.id === id);
};
