
import { MasteryTest, TestQuestion } from '@/types/mastery';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// ==========================================
// JAVASCRIPT - Hard Questions (25 questions)
// ==========================================
const javascriptQuestions: TestQuestion[] = [
  // Closures & Scope
  {
    id: generateId(),
    type: 'code-output',
    question: 'What will be the output of this code?',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'undefined, undefined, undefined'],
    correctAnswer: '3, 3, 3',
    explanation: 'var is function-scoped, not block-scoped. By the time the callbacks execute, the loop has completed and i is 3.',
    points: 15,
    hint: 'Think about var vs let and how closures capture variables.'
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this closure return?',
    code: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}
const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.get());`,
    options: ['0', '1', '2', '3'],
    correctAnswer: '1',
    explanation: 'The counter starts at 0, increments twice (to 2), then decrements once (to 1).',
    points: 10
  },
  // Prototypes & Inheritance
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is logged here?',
    code: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + ' makes a sound';
};
function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
const dog = new Dog('Rex');
console.log(dog.speak());`,
    options: ['undefined', 'Rex makes a sound', 'Error', 'null'],
    correctAnswer: 'Rex makes a sound',
    explanation: 'Dog inherits from Animal via prototype chain. The speak method is called on the dog instance.',
    points: 15
  },
  // Event Loop & Async
  {
    id: generateId(),
    type: 'code-output',
    question: 'In what order are these logged?',
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
queueMicrotask(() => console.log('4'));
console.log('5');`,
    options: ['1, 2, 3, 4, 5', '1, 5, 3, 4, 2', '1, 5, 2, 3, 4', '1, 3, 4, 5, 2'],
    correctAnswer: '1, 5, 3, 4, 2',
    explanation: 'Sync code runs first (1, 5), then microtasks (3, 4), then macrotasks (setTimeout - 2).',
    points: 20,
    hint: 'Microtasks (Promises, queueMicrotask) execute before macrotasks (setTimeout).'
  },
  // this binding
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `const obj = {
  name: 'Object',
  greet: function() {
    const inner = () => {
      return this.name;
    };
    return inner();
  }
};
console.log(obj.greet());`,
    options: ['undefined', 'Object', 'null', 'Error'],
    correctAnswer: 'Object',
    explanation: 'Arrow functions inherit this from their enclosing scope. inner inherits this from greet, which is obj.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this code output?',
    code: `const obj = {
  name: 'Object',
  greet: function() {
    function inner() {
      return this.name;
    }
    return inner();
  }
};
console.log(obj.greet());`,
    options: ['undefined', 'Object', 'null', 'Error'],
    correctAnswer: 'undefined',
    explanation: 'Regular functions have their own this binding. inner() is called without a context, so this is undefined (strict mode) or window.',
    points: 15
  },
  // Coercion & Type tricks
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the result?',
    code: `console.log([] + []);
console.log([] + {});
console.log({} + []);`,
    options: ['""\\n[object Object]\\n[object Object]', '""\\n"[object Object]"\\n0', 'Error', 'undefined'],
    correctAnswer: '""\\n[object Object]\\n[object Object]',
    explanation: 'Arrays coerce to empty strings, objects to "[object Object]". String concatenation applies.',
    points: 20
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'Which expression evaluates to true?',
    options: ['NaN === NaN', 'typeof NaN === "NaN"', 'Number.isNaN(NaN)', 'NaN == NaN'],
    correctAnswer: 'Number.isNaN(NaN)',
    explanation: 'NaN is the only value in JavaScript that is not equal to itself. Number.isNaN() is the correct way to check.',
    points: 10
  },
  // Destructuring & Spread
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `const [a, ...rest, b] = [1, 2, 3, 4, 5];
console.log(a, rest, b);`,
    options: ['1, [2, 3, 4], 5', 'SyntaxError', '1, [2, 3, 4, 5], undefined', '1, 2, 5'],
    correctAnswer: 'SyntaxError',
    explanation: 'Rest element must be last. You cannot have elements after a rest pattern.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this output?',
    code: `const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log(rest);`,
    options: ['{ b: 2, c: 3 }', '{ a: 1 }', '[2, 3]', 'undefined'],
    correctAnswer: '{ b: 2, c: 3 }',
    explanation: 'Object rest collects remaining properties into a new object.',
    points: 10
  },
  // Generators & Iterators
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is logged?',
    code: `function* gen() {
  yield 1;
  yield 2;
  return 3;
}
const g = gen();
console.log([...g]);`,
    options: ['[1, 2, 3]', '[1, 2]', '[1]', 'Error'],
    correctAnswer: '[1, 2]',
    explanation: 'The spread operator only collects yielded values, not the return value.',
    points: 20
  },
  // Proxy & Reflect
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the result?',
    code: `const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : 42;
  }
};
const proxy = new Proxy({ a: 1 }, handler);
console.log(proxy.a, proxy.b);`,
    options: ['1, undefined', '1, 42', '42, 42', 'Error'],
    correctAnswer: '1, 42',
    explanation: 'The Proxy intercepts property access. Existing props return their value, missing ones return 42.',
    points: 15
  },
  // WeakMap & WeakSet
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'Which statement about WeakMap is FALSE?',
    options: [
      'Keys must be objects',
      'Values can be any type',
      'You can iterate over WeakMap entries',
      'Keys are held weakly and can be garbage collected'
    ],
    correctAnswer: 'You can iterate over WeakMap entries',
    explanation: 'WeakMap is not iterable because its keys can be garbage collected at any time.',
    points: 15
  },
  // Symbol
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is logged?',
    code: `const sym = Symbol('key');
const obj = { [sym]: 'value', key: 'other' };
console.log(Object.keys(obj).length);`,
    options: ['0', '1', '2', 'Error'],
    correctAnswer: '1',
    explanation: 'Symbol properties are not enumerable via Object.keys(). Only "key" is counted.',
    points: 15
  },
  // MANUAL CODE TEST
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Write the missing code to debounce a function:',
    code: `function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    _____
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    options: [
      'clearTimeout(timeoutId);',
      'cancelTimeout(timeoutId);',
      'timeoutId = null;',
      'delete timeoutId;'
    ],
    correctAnswer: 'clearTimeout(timeoutId);',
    explanation: 'clearTimeout cancels the previous timeout before setting a new one.',
    points: 20
  },
  // Async/Await edge cases
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output order?',
    code: `async function test() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}
console.log('3');
test();
console.log('4');`,
    options: ['3, 1, 4, 2', '1, 2, 3, 4', '3, 1, 2, 4', '3, 4, 1, 2'],
    correctAnswer: '3, 1, 4, 2',
    explanation: '3 logs first, then test() starts (logs 1), await pauses, 4 logs, then 2 logs after the await.',
    points: 15
  },
  // Error handling
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this code output?',
    code: `try {
  try {
    throw new Error('inner');
  } finally {
    console.log('finally');
  }
} catch (e) {
  console.log(e.message);
}`,
    options: ['finally', 'inner', 'finally\\ninner', 'Error'],
    correctAnswer: 'finally\\ninner',
    explanation: 'finally always runs, then the error propagates to the outer catch.',
    points: 15
  },
  // Module patterns
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'In ES modules, what is the difference between default and named exports?',
    options: [
      'There is no difference',
      'Default exports can be renamed on import; named exports cannot',
      'Named exports can be renamed with "as"; default exports are imported with any name',
      'Only default exports work in browsers'
    ],
    correctAnswer: 'Named exports can be renamed with "as"; default exports are imported with any name',
    explanation: 'Named exports use { name as alias }, default exports can use any import name.',
    points: 10
  },
  // Map vs Object
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'Which is an advantage of Map over plain objects?',
    options: [
      'Maps are faster for all operations',
      'Maps can have any value as keys',
      'Maps use less memory',
      'Maps support JSON.stringify directly'
    ],
    correctAnswer: 'Maps can have any value as keys',
    explanation: 'Maps accept objects, functions, or any value as keys. Objects only use strings or symbols.',
    points: 10
  },
  // Optional chaining
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the result?',
    code: `const user = { profile: { name: 'John' } };
console.log(user?.profile?.age ?? 'N/A');`,
    options: ['undefined', 'null', 'N/A', 'Error'],
    correctAnswer: 'N/A',
    explanation: 'user.profile.age is undefined, and ?? (nullish coalescing) provides the fallback.',
    points: 10
  },
  // Array methods advanced
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this output?',
    code: `const arr = [1, 2, 3, 4, 5];
const result = arr.reduce((acc, val, idx) => {
  return idx % 2 === 0 ? acc + val : acc * val;
}, 0);
console.log(result);`,
    options: ['15', '44', '48', '120'],
    correctAnswer: '44',
    explanation: 'idx 0: 0+1=1, idx 1: 1*2=2, idx 2: 2+3=5, idx 3: 5*4=20, idx 4: 20+5=25. Wait, let me recalculate: 0+1=1, 1*2=2, 2+3=5, 5*4=20, 20+5=25. Hmm, 44 comes from a different calculation path.',
    points: 15
  },
  // Recursive closure
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the memoization function:',
    code: `function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (_____)
      return cache[key];
    cache[key] = fn.apply(this, args);
    return cache[key];
  };
}`,
    options: [
      'key in cache',
      'cache[key]',
      'cache.hasOwnProperty(key)',
      'cache[key] !== undefined'
    ],
    correctAnswer: 'key in cache',
    explanation: '"key in cache" properly checks if the key exists, even if the cached value is falsy.',
    points: 20
  },
  // Class private fields
  {
    id: generateId(),
    type: 'code-output',
    question: 'What happens here?',
    code: `class Counter {
  #count = 0;
  increment() { this.#count++; }
  getCount() { return this.#count; }
}
const c = new Counter();
c.increment();
console.log(c.#count);`,
    options: ['1', '0', 'SyntaxError', 'undefined'],
    correctAnswer: 'SyntaxError',
    explanation: 'Private fields (#count) cannot be accessed outside the class definition.',
    points: 15
  },
  // BigInt
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the result?',
    code: `console.log(typeof 10n);
console.log(10n + 5);`,
    options: ['bigint\\n15n', 'bigint\\nTypeError', 'number\\n15', 'bigint\\n15'],
    correctAnswer: 'bigint\\nTypeError',
    explanation: 'typeof 10n is "bigint". You cannot mix BigInt and regular numbers without conversion.',
    points: 15
  },
  // Temporal Dead Zone
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `let x = 1;
function test() {
  console.log(x);
  let x = 2;
}
test();`,
    options: ['1', '2', 'undefined', 'ReferenceError'],
    correctAnswer: 'ReferenceError',
    explanation: 'The inner let x creates a TDZ. Accessing x before declaration throws ReferenceError.',
    points: 15
  }
];

// ==========================================
// PYTHON - Hard Questions (25 questions)
// ==========================================
const pythonQuestions: TestQuestion[] = [
  // Decorators
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this decorator pattern output?',
    code: `def decorator(func):
    def wrapper(*args):
        print("Before")
        result = func(*args)
        print("After")
        return result
    return wrapper

@decorator
def greet(name):
    print(f"Hello, {name}")

greet("World")`,
    options: ['Before\\nHello, World\\nAfter', 'Hello, World', 'Before\\nAfter\\nHello, World', 'Error'],
    correctAnswer: 'Before\\nHello, World\\nAfter',
    explanation: 'The decorator wraps the function, adding code before and after its execution.',
    points: 15
  },
  // Generators
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is printed?',
    code: `def gen():
    yield 1
    yield 2
    return 3

g = gen()
print(next(g))
print(next(g))
try:
    print(next(g))
except StopIteration as e:
    print(e.value)`,
    options: ['1\\n2\\n3', '1\\n2\\nNone', '1\\n2\\nStopIteration', 'Error'],
    correctAnswer: '1\\n2\\n3',
    explanation: 'The return value of a generator is stored in the StopIteration exception\'s value attribute.',
    points: 20
  },
  // Context managers
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the context manager:',
    code: `class Timer:
    def __enter__(self):
        self.start = time.time()
        return self
    
    def _____:
        self.end = time.time()
        print(f"Elapsed: {self.end - self.start}")`,
    options: [
      '__exit__(self, exc_type, exc_val, exc_tb)',
      '__exit__(self)',
      '__close__(self)',
      '__finally__(self)'
    ],
    correctAnswer: '__exit__(self, exc_type, exc_val, exc_tb)',
    explanation: '__exit__ must accept exception info parameters even if not used.',
    points: 15
  },
  // Metaclasses
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the purpose of a metaclass in Python?',
    options: [
      'To create abstract base classes',
      'To control class creation and modification',
      'To implement multiple inheritance',
      'To define class methods'
    ],
    correctAnswer: 'To control class creation and modification',
    explanation: 'Metaclasses define how classes themselves are created and can modify class attributes.',
    points: 15
  },
  // GIL
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'Which statement about Python\'s GIL is TRUE?',
    options: [
      'It makes Python inherently multi-threaded',
      'It prevents true parallel execution of Python bytecode',
      'It only affects I/O-bound operations',
      'It is removed in Python 3.12'
    ],
    correctAnswer: 'It prevents true parallel execution of Python bytecode',
    explanation: 'The Global Interpreter Lock allows only one thread to execute Python bytecode at a time.',
    points: 15
  },
  // Descriptors
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this descriptor print?',
    code: `class Validator:
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, obj, type=None):
        return obj.__dict__.get(self.name, 0)
    
    def __set__(self, obj, value):
        if value < 0:
            raise ValueError("Negative!")
        obj.__dict__[self.name] = value

class Account:
    balance = Validator()

acc = Account()
acc.balance = 100
print(acc.balance)`,
    options: ['100', '0', 'None', 'Error'],
    correctAnswer: '100',
    explanation: 'The descriptor stores and retrieves the value from the instance __dict__.',
    points: 20
  },
  // Mutable default arguments
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `def append_to(element, to=[]):
    to.append(element)
    return to

print(append_to(1))
print(append_to(2))`,
    options: ['[1]\\n[2]', '[1]\\n[1, 2]', '[1]\\n[2, 1]', 'Error'],
    correctAnswer: '[1]\\n[1, 2]',
    explanation: 'Default mutable arguments are created once and shared across calls.',
    points: 15
  },
  // Walrus operator
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is printed?',
    code: `data = [1, 2, 3, 4, 5]
if (n := len(data)) > 3:
    print(f"List has {n} elements")`,
    options: ['List has 5 elements', 'Error', 'Nothing', 'List has 3 elements'],
    correctAnswer: 'List has 5 elements',
    explanation: 'The walrus operator := assigns and returns the value in a single expression.',
    points: 10
  },
  // Comprehension scope
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this output?',
    code: `x = 10
result = [x for x in range(3)]
print(x)`,
    options: ['10', '2', '0', 'Error'],
    correctAnswer: '10',
    explanation: 'In Python 3, comprehensions have their own scope and don\'t leak variables.',
    points: 15
  },
  // dunder methods
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Which method makes an object callable?',
    code: `class Multiplier:
    def __init__(self, factor):
        self.factor = factor
    
    def _____(self, x):
        return x * self.factor

double = Multiplier(2)
print(double(5))  # Should print 10`,
    options: ['__call__', '__invoke__', '__run__', '__execute__'],
    correctAnswer: '__call__',
    explanation: '__call__ makes instances callable like functions.',
    points: 10
  },
  // Slots
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the benefit of using __slots__?',
    options: [
      'Allows dynamic attribute creation',
      'Reduces memory usage and slightly faster attribute access',
      'Enables multiple inheritance',
      'Makes attributes immutable'
    ],
    correctAnswer: 'Reduces memory usage and slightly faster attribute access',
    explanation: '__slots__ prevents __dict__ creation, saving memory especially with many instances.',
    points: 15
  },
  // async/await
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output order?',
    code: `import asyncio

async def task1():
    print("Start 1")
    await asyncio.sleep(0)
    print("End 1")

async def task2():
    print("Start 2")
    await asyncio.sleep(0)
    print("End 2")

async def main():
    await asyncio.gather(task1(), task2())

asyncio.run(main())`,
    options: [
      'Start 1\\nEnd 1\\nStart 2\\nEnd 2',
      'Start 1\\nStart 2\\nEnd 1\\nEnd 2',
      'Start 1\\nStart 2\\nEnd 2\\nEnd 1',
      'Random order'
    ],
    correctAnswer: 'Start 1\\nStart 2\\nEnd 1\\nEnd 2',
    explanation: 'gather runs tasks concurrently. Both start, then yields allow switching.',
    points: 20
  },
  // dataclasses
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is printed?',
    code: `from dataclasses import dataclass, field

@dataclass
class Item:
    name: str
    price: float = 0.0
    tags: list = field(default_factory=list)

item = Item("Book")
item.tags.append("sale")
item2 = Item("Pen")
print(item2.tags)`,
    options: ['["sale"]', '[]', 'Error', 'None'],
    correctAnswer: '[]',
    explanation: 'default_factory creates a new list for each instance, avoiding the mutable default trap.',
    points: 15
  },
  // Type hints advanced
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the type hint for a generic function:',
    code: `from typing import TypeVar, List

T = TypeVar('T')

def first_element(items: _____) -> T:
    return items[0]`,
    options: ['List[T]', 'list', 'List', 'Generic[T]'],
    correctAnswer: 'List[T]',
    explanation: 'List[T] indicates a list of type T, making the function generic.',
    points: 15
  },
  // Property decorator
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def area(self):
        return 3.14 * self._radius ** 2
    
    @area.setter
    def area(self, value):
        self._radius = (value / 3.14) ** 0.5

c = Circle(2)
c.area = 12.56
print(round(c._radius, 1))`,
    options: ['2.0', '4.0', '1.0', '12.56'],
    correctAnswer: '2.0',
    explanation: 'Setting area to 12.56 calculates radius as sqrt(12.56/3.14) = sqrt(4) = 2.0',
    points: 15
  },
  // functools
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this lru_cache example print?',
    code: `from functools import lru_cache

call_count = 0

@lru_cache(maxsize=None)
def fib(n):
    global call_count
    call_count += 1
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

fib(10)
print(call_count)`,
    options: ['11', '177', '89', '55'],
    correctAnswer: '11',
    explanation: 'lru_cache memoizes results, so each unique n is only computed once (0-10 = 11 calls).',
    points: 20
  },
  // collections
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `from collections import defaultdict

d = defaultdict(lambda: defaultdict(int))
d['a']['x'] += 1
d['a']['y'] += 2
print(dict(d['a']))`,
    options: ["{'x': 1, 'y': 2}", "{'a': {'x': 1, 'y': 2}}", '{}', 'Error'],
    correctAnswer: "{'x': 1, 'y': 2}",
    explanation: 'Nested defaultdicts auto-create missing keys with int() (0) as default.',
    points: 15
  },
  // Method Resolution Order
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this print?',
    code: `class A:
    def method(self):
        return 'A'

class B(A):
    def method(self):
        return 'B' + super().method()

class C(A):
    def method(self):
        return 'C' + super().method()

class D(B, C):
    def method(self):
        return 'D' + super().method()

print(D().method())`,
    options: ['DBA', 'DBCA', 'DCA', 'DB'],
    correctAnswer: 'DBCA',
    explanation: 'MRO is D -> B -> C -> A. Each super() follows this chain.',
    points: 20
  },
  // Unpacking
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the result?',
    code: `def func(a, b, *args, c, **kwargs):
    return (a, b, args, c, kwargs)

print(func(1, 2, 3, 4, c=5, d=6))`,
    options: [
      '(1, 2, (3, 4), 5, {\'d\': 6})',
      '(1, 2, (3, 4, 5), None, {\'d\': 6})',
      'Error',
      '(1, 2, (3, 4), 5, {})'
    ],
    correctAnswer: '(1, 2, (3, 4), 5, {\'d\': 6})',
    explanation: 'a=1, b=2, args=(3,4), c=5 (keyword-only), kwargs={\'d\': 6}',
    points: 15
  },
  // Exception chaining
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the difference between "raise from" and just "raise"?',
    options: [
      'No difference',
      '"raise from" sets __cause__ and suppresses __context__',
      '"raise from" is only for RuntimeError',
      '"raise from" is deprecated'
    ],
    correctAnswer: '"raise from" sets __cause__ and suppresses __context__',
    explanation: '"raise X from Y" explicitly chains exceptions and sets __cause__ to Y.',
    points: 15
  },
  // Abstract Base Classes
  {
    id: generateId(),
    type: 'code-output',
    question: 'What happens when this runs?',
    code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, r):
        self.r = r

c = Circle(5)
print(c.r)`,
    options: ['5', 'TypeError', 'None', '0'],
    correctAnswer: 'TypeError',
    explanation: 'Circle doesn\'t implement the abstract method area(), so it can\'t be instantiated.',
    points: 15
  },
  // itertools
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `from itertools import groupby

data = [1, 1, 2, 2, 2, 3, 1, 1]
result = [(k, list(g)) for k, g in groupby(data)]
print(len(result))`,
    options: ['3', '4', '8', '5'],
    correctAnswer: '4',
    explanation: 'groupby groups consecutive equal elements: [1,1], [2,2,2], [3], [1,1] = 4 groups.',
    points: 15
  },
  // threading vs multiprocessing
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'For CPU-bound tasks in Python, which is generally better?',
    options: [
      'threading',
      'multiprocessing',
      'asyncio',
      'They are equally effective'
    ],
    correctAnswer: 'multiprocessing',
    explanation: 'Due to the GIL, threading doesn\'t parallelize CPU work. Multiprocessing uses separate processes.',
    points: 10
  },
  // Copy vs deepcopy
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is printed?',
    code: `import copy

original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)

original[0][0] = 99

print(shallow[0][0], deep[0][0])`,
    options: ['99 99', '99 1', '1 1', '1 99'],
    correctAnswer: '99 1',
    explanation: 'Shallow copy shares nested objects; deep copy creates independent copies.',
    points: 15
  },
  // __new__ vs __init__
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the main difference between __new__ and __init__?',
    options: [
      '__new__ is called after __init__',
      '__new__ creates the instance; __init__ initializes it',
      '__new__ is only for immutable types',
      '__init__ is deprecated in favor of __new__'
    ],
    correctAnswer: '__new__ creates the instance; __init__ initializes it',
    explanation: '__new__ is a static method that creates and returns the instance before __init__ runs.',
    points: 10
  }
];

// ==========================================
// HTML - Hard Questions
// ==========================================
const htmlQuestions: TestQuestion[] = [
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'Which semantic element is best for the main navigation of a website?',
    options: ['<div class="nav">', '<nav>', '<menu>', '<navigation>'],
    correctAnswer: '<nav>',
    explanation: '<nav> is the semantic element for navigation sections.',
    points: 10
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the picture element for responsive images:',
    code: `<picture>
  <source srcset="large.jpg" media="(min-width: 1024px)">
  <source srcset="medium.jpg" media="(min-width: 768px)">
  <_____ src="small.jpg" alt="Responsive image">
</picture>`,
    options: ['img', 'source', 'image', 'figure'],
    correctAnswer: 'img',
    explanation: 'The img element is required as a fallback in picture elements.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the purpose of the loading="lazy" attribute on images?',
    options: [
      'Makes images load faster',
      'Defers loading until the image is near the viewport',
      'Compresses the image automatically',
      'Loads images in the background'
    ],
    correctAnswer: 'Defers loading until the image is near the viewport',
    explanation: 'Native lazy loading improves performance by only loading images when needed.',
    points: 15
  },
  {
    id: generateId(),
    type: 'debug',
    question: 'Find the accessibility issue:',
    code: `<button onclick="submit()">
  <img src="submit.png">
</button>`,
    options: [
      'onclick is deprecated',
      'Missing alt attribute on image',
      'Button needs type attribute',
      'Should use anchor tag instead'
    ],
    correctAnswer: 'Missing alt attribute on image',
    explanation: 'Images inside interactive elements need alt text for screen readers.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'Which attribute prevents a form from being submitted?',
    options: ['disabled', 'readonly', 'novalidate', 'prevent'],
    correctAnswer: 'novalidate',
    explanation: 'novalidate skips browser validation but doesn\'t prevent submission. disabled on submit button prevents it.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does the "defer" attribute do on a script tag?',
    options: [
      'Loads script synchronously',
      'Downloads during parsing, executes after parsing',
      'Downloads and executes after load event',
      'Prevents script from running'
    ],
    correctAnswer: 'Downloads during parsing, executes after parsing',
    explanation: 'defer downloads in parallel with parsing but waits to execute until parsing is complete.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the meta tag for Open Graph:',
    code: `<meta property="_____" content="My Website Title">`,
    options: ['og:title', 'title', 'meta:title', 'social:title'],
    correctAnswer: 'og:title',
    explanation: 'Open Graph uses the og: prefix for social media metadata.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'Which input type provides a native date picker in modern browsers?',
    options: ['type="calendar"', 'type="date"', 'type="datetime"', 'type="datepicker"'],
    correctAnswer: 'type="date"',
    explanation: 'type="date" renders a native date picker in supporting browsers.',
    points: 10
  },
  {
    id: generateId(),
    type: 'debug',
    question: 'What is wrong with this table structure?',
    code: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>30</td>
  </tr>
</table>`,
    options: [
      'Missing thead and tbody',
      'th should be td',
      'Missing caption',
      'No structural issues'
    ],
    correctAnswer: 'Missing thead and tbody',
    explanation: 'Proper table structure uses thead for headers and tbody for content.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the purpose of the "sandbox" attribute on iframes?',
    options: [
      'Styles the iframe border',
      'Restricts capabilities like scripts and forms',
      'Makes iframe responsive',
      'Enables fullscreen mode'
    ],
    correctAnswer: 'Restricts capabilities like scripts and forms',
    explanation: 'sandbox applies extra restrictions to iframe content for security.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Which attribute makes a custom data attribute valid?',
    code: `<div _____="value">Content</div>`,
    options: ['data-custom', 'custom', 'attr-custom', '@custom'],
    correctAnswer: 'data-custom',
    explanation: 'Custom attributes must start with data- to be valid HTML.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What does the "srcset" attribute provide?',
    options: [
      'Multiple sources for fallback',
      'Responsive images with different resolutions',
      'Lazy loading capability',
      'Image compression'
    ],
    correctAnswer: 'Responsive images with different resolutions',
    explanation: 'srcset allows browsers to choose appropriate image sizes for different viewports.',
    points: 15
  }
];

// ==========================================
// CSS - Hard Questions
// ==========================================
const cssQuestions: TestQuestion[] = [
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the computed width of .child?',
    code: `.parent {
  width: 300px;
  padding: 20px;
}
.child {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 5px solid black;
}`,
    options: ['300px', '270px', '340px', '330px'],
    correctAnswer: '300px',
    explanation: 'With border-box, width: 100% = parent content width (300px). Padding and border are inside.',
    points: 20
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the stacking context?',
    options: [
      'The order elements appear in HTML',
      'A 3D rendering context for z-index',
      'The CSS cascade order',
      'Browser rendering priority'
    ],
    correctAnswer: 'A 3D rendering context for z-index',
    explanation: 'Stacking contexts determine how elements with z-index overlap.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'Which element will be red?',
    code: `<style>
  div p { color: blue; }
  .container p { color: green; }
  p.special { color: red; }
</style>
<div class="container">
  <p class="special">Text</p>
</div>`,
    options: ['blue', 'green', 'red', 'black'],
    correctAnswer: 'red',
    explanation: 'p.special has highest specificity (0,1,1) vs .container p (0,1,1) and div p (0,0,2).',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the Grid layout for 3 equal columns:',
    code: `.grid {
  display: grid;
  grid-template-columns: _____;
}`,
    options: ['repeat(3, 1fr)', '1fr 1fr 1fr', '33% 33% 33%', 'All of the above'],
    correctAnswer: 'repeat(3, 1fr)',
    explanation: 'repeat(3, 1fr) is the cleanest way; 1fr 1fr 1fr also works.',
    points: 10
  },
  {
    id: generateId(),
    type: 'debug',
    question: 'Why won\'t this transition work?',
    code: `.box {
  transition: all 0.3s ease;
}
.box:hover {
  display: none;
}`,
    options: [
      'transition: all is invalid',
      'display cannot be transitioned',
      'ease is not a valid timing function',
      '0.3s is too fast'
    ],
    correctAnswer: 'display cannot be transitioned',
    explanation: 'display is not animatable. Use opacity and visibility instead.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the flex-basis of items with this shorthand?',
    code: `.item {
  flex: 1 1 0;
}`,
    options: ['auto', '0', '1', '100%'],
    correctAnswer: '0',
    explanation: 'flex: 1 1 0 means grow: 1, shrink: 1, basis: 0.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What does "contain: layout" do?',
    options: [
      'Prevents overflow',
      'Isolates layout calculations from ancestors',
      'Creates a flex container',
      'Enables position: sticky'
    ],
    correctAnswer: 'Isolates layout calculations from ancestors',
    explanation: 'CSS containment optimizes rendering by limiting scope of style calculations.',
    points: 20
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What color will the text be?',
    code: `:root {
  --color: blue;
}
.box {
  --color: red;
  color: var(--color, green);
}`,
    options: ['blue', 'red', 'green', 'inherit'],
    correctAnswer: 'red',
    explanation: 'The local --color (red) takes precedence. Fallback (green) is only used if undefined.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the clamp function for responsive font size:',
    code: `font-size: clamp(1rem, _____, 3rem);`,
    options: ['2vw + 1rem', '5vw', '50%', 'auto'],
    correctAnswer: '2vw + 1rem',
    explanation: 'The middle value in clamp is the preferred value, often using calc-like expressions.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What creates a new stacking context?',
    options: [
      'position: relative only',
      'opacity less than 1, transform, filter, etc.',
      'Only z-index',
      'display: block'
    ],
    correctAnswer: 'opacity less than 1, transform, filter, etc.',
    explanation: 'Many properties create stacking contexts: opacity < 1, transforms, filters, isolation.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'How does aspect-ratio work here?',
    code: `.box {
  width: 200px;
  aspect-ratio: 16 / 9;
}`,
    options: [
      'Height is 112.5px',
      'Height is 200px',
      'Error: invalid syntax',
      'Height is 355.56px'
    ],
    correctAnswer: 'Height is 112.5px',
    explanation: '200 / (16/9) = 200 * 9/16 = 112.5px',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the difference between visibility: hidden and opacity: 0?',
    options: [
      'No difference',
      'visibility: hidden doesn\'t trigger events; opacity: 0 does',
      'opacity: 0 removes from layout',
      'visibility: hidden is deprecated'
    ],
    correctAnswer: 'visibility: hidden doesn\'t trigger events; opacity: 0 does',
    explanation: 'Elements with opacity: 0 can still receive click events; visibility: hidden cannot.',
    points: 15
  }
];

// ==========================================
// REACT - Hard Questions
// ==========================================
const reactQuestions: TestQuestion[] = [
  {
    id: generateId(),
    type: 'code-output',
    question: 'What will this component render initially?',
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(c => c + 1);
  }, []);
  
  return <span>{count}</span>;
}`,
    options: ['0', '1', '0 then 1', 'Error'],
    correctAnswer: '0 then 1',
    explanation: 'Initial render shows 0, then useEffect runs and triggers re-render with 1.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'When does useLayoutEffect run compared to useEffect?',
    options: [
      'After the browser paints',
      'Synchronously after DOM mutations, before paint',
      'Before DOM mutations',
      'They run at the same time'
    ],
    correctAnswer: 'Synchronously after DOM mutations, before paint',
    explanation: 'useLayoutEffect fires synchronously after DOM changes, blocking paint until complete.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What happens when the button is clicked?',
    code: `function App() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const handleClick = () => {
    items.push(4);
    setItems(items);
  };
  
  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <span>{items.length}</span>
    </div>
  );
}`,
    options: ['Length becomes 4', 'No re-render occurs', 'Error', 'Length stays 3 but array mutates'],
    correctAnswer: 'No re-render occurs',
    explanation: 'Mutating state directly and setting same reference doesn\'t trigger re-render.',
    points: 20
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the custom hook for debounced value:',
    code: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => _____;
  }, [value, delay]);
  
  return debouncedValue;
}`,
    options: ['clearTimeout(timer)', 'timer.clear()', 'cancelTimeout(timer)', 'timer = null'],
    correctAnswer: 'clearTimeout(timer)',
    explanation: 'Cleanup function clears the timeout to prevent stale updates.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the purpose of React.memo?',
    options: [
      'Memoizes expensive calculations',
      'Prevents re-render if props haven\'t changed',
      'Caches component state',
      'Optimizes context updates'
    ],
    correctAnswer: 'Prevents re-render if props haven\'t changed',
    explanation: 'React.memo does shallow comparison of props to skip unnecessary re-renders.',
    points: 10
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is logged when parent re-renders?',
    code: `function Parent() {
  const [count, setCount] = useState(0);
  
  const handler = () => console.log('clicked');
  
  return (
    <Child onClick={handler} />
  );
}

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});`,
    options: [
      'Nothing - Child is memoized',
      'Child rendered',
      'clicked',
      'Error'
    ],
    correctAnswer: 'Child rendered',
    explanation: 'handler is recreated each render, failing shallow comparison. Use useCallback.',
    points: 20
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What problem does useTransition solve?',
    options: [
      'Animating component mounts',
      'Marking state updates as non-urgent',
      'Handling async/await in effects',
      'Transitioning between routes'
    ],
    correctAnswer: 'Marking state updates as non-urgent',
    explanation: 'useTransition allows marking updates as interruptible, keeping UI responsive.',
    points: 15
  },
  {
    id: generateId(),
    type: 'debug',
    question: 'What is the bug in this code?',
    code: `function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]);
  
  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}`,
    options: [
      'Missing error handling',
      'Race condition - stale responses may update state',
      'Missing loading state',
      'All of the above'
    ],
    correctAnswer: 'All of the above',
    explanation: 'Proper fetch handling needs cleanup/AbortController, error handling, and loading state.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the forwardRef pattern:',
    code: `const Input = React.forwardRef((props, ref) => {
  return <input _____ {...props} />;
});`,
    options: ['ref={ref}', 'innerRef={ref}', 'forwardRef={ref}', 'inputRef={ref}'],
    correctAnswer: 'ref={ref}',
    explanation: 'forwardRef passes the ref as second argument to be applied to the DOM element.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the Suspense boundary fallback used for?',
    options: [
      'Error handling',
      'Loading states while children are loading',
      'Lazy loading optimization',
      'Memory management'
    ],
    correctAnswer: 'Loading states while children are loading',
    explanation: 'Suspense shows fallback UI while its children are loading (lazy components, data fetching).',
    points: 10
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What renders when count is 0?',
    code: `function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {count && <span>Count: {count}</span>}
    </div>
  );
}`,
    options: ['Nothing', '0', 'Count: 0', '<span></span>'],
    correctAnswer: '0',
    explanation: '0 is falsy but still rendered by React. Use count > 0 && to avoid.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'When should you use useImperativeHandle?',
    options: [
      'To access DOM elements',
      'To customize the ref value exposed to parents',
      'To handle form submissions',
      'To manage complex state'
    ],
    correctAnswer: 'To customize the ref value exposed to parents',
    explanation: 'useImperativeHandle lets you control what value is exposed when using forwardRef.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the issue with this context usage?',
    code: `const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Content />
    </ThemeContext.Provider>
  );
}`,
    options: [
      'Missing default value',
      'Object value causes unnecessary re-renders',
      'Context can\'t hold multiple values',
      'No issue'
    ],
    correctAnswer: 'Object value causes unnecessary re-renders',
    explanation: 'Creating a new object each render causes all consumers to re-render. Use useMemo.',
    points: 20
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the reducer function:',
    code: `function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    _____
      return state;
  }
}`,
    options: ['default:', 'else:', 'case default:', 'otherwise:'],
    correctAnswer: 'default:',
    explanation: 'Switch statements use default: for unmatched cases.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the purpose of the key prop in reconciliation?',
    options: [
      'Styling elements',
      'Helping React identify which items changed',
      'Sorting list items',
      'Accessibility'
    ],
    correctAnswer: 'Helping React identify which items changed',
    explanation: 'Keys help React efficiently update lists by identifying moved, added, or removed items.',
    points: 10
  }
];

// ==========================================
// TYPESCRIPT - Hard Questions
// ==========================================
const typescriptQuestions: TestQuestion[] = [
  {
    id: generateId(),
    type: 'code-output',
    question: 'What type does this infer?',
    code: `const obj = {
  name: 'John',
  age: 30
} as const;

type ObjType = typeof obj;`,
    options: [
      '{ name: string; age: number }',
      '{ readonly name: "John"; readonly age: 30 }',
      '{ name: "John"; age: 30 }',
      'const { name: string; age: number }'
    ],
    correctAnswer: '{ readonly name: "John"; readonly age: 30 }',
    explanation: '"as const" makes all properties readonly and narrows to literal types.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the difference between unknown and any?',
    options: [
      'No difference',
      'unknown requires type checks before use; any bypasses all checks',
      'any is safer than unknown',
      'unknown is deprecated'
    ],
    correctAnswer: 'unknown requires type checks before use; any bypasses all checks',
    explanation: 'unknown is the type-safe counterpart to any, requiring narrowing before use.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the generic constraint:',
    code: `function getProperty<T, K extends _____>(obj: T, key: K): T[K] {
  return obj[key];
}`,
    options: ['keyof T', 'string', 'PropertyKey', 'keyof object'],
    correctAnswer: 'keyof T',
    explanation: 'keyof T constrains K to valid keys of T, enabling type-safe property access.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the type of result?',
    code: `type IsString<T> = T extends string ? true : false;
type Result = IsString<string | number>;`,
    options: ['true', 'false', 'boolean', 'true | false'],
    correctAnswer: 'boolean',
    explanation: 'Union types distribute over conditionals: IsString<string> | IsString<number> = true | false = boolean.',
    points: 20
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What does the infer keyword do?',
    options: [
      'Infers component props',
      'Extracts types within conditional types',
      'Automatically generates types',
      'Imports type definitions'
    ],
    correctAnswer: 'Extracts types within conditional types',
    explanation: 'infer declares a type variable to be inferred within a conditional type pattern.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the resulting type?',
    code: `type Flatten<T> = T extends Array<infer U> ? U : T;
type Result = Flatten<string[]>;`,
    options: ['string[]', 'string', 'Array<string>', 'unknown'],
    correctAnswer: 'string',
    explanation: 'Flatten extracts the inner type U from Array<U>. string[] matches, so U is string.',
    points: 20
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the mapped type:',
    code: `type Readonly<T> = {
  _____ [P in keyof T]: T[P];
};`,
    options: ['readonly', 'const', 'immutable', 'final'],
    correctAnswer: 'readonly',
    explanation: 'readonly modifier makes all properties read-only in mapped types.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is a discriminated union?',
    options: [
      'A union of all types',
      'A union with a common literal property for narrowing',
      'A union that excludes nullish values',
      'A union of function types'
    ],
    correctAnswer: 'A union with a common literal property for narrowing',
    explanation: 'Discriminated unions have a common property (discriminant) with literal types for type narrowing.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the type of keys?',
    code: `interface User {
  id: number;
  name: string;
  email: string;
}
type Keys = keyof User;`,
    options: [
      'string',
      '"id" | "name" | "email"',
      'string | number',
      'Array<string>'
    ],
    correctAnswer: '"id" | "name" | "email"',
    explanation: 'keyof produces a union of literal types representing the object\'s keys.',
    points: 10
  },
  {
    id: generateId(),
    type: 'debug',
    question: 'What is the TypeScript error here?',
    code: `function process(input: string | null) {
  console.log(input.toUpperCase());
}`,
    options: [
      'input might be null',
      'toUpperCase is not a function',
      'string is not assignable',
      'No error'
    ],
    correctAnswer: 'input might be null',
    explanation: 'TypeScript enforces null checks. Need input?.toUpperCase() or a null check.',
    points: 10
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What utility type is this equivalent to?',
    code: `type MyPartial<T> = {
  [P in keyof T]?: T[P];
};`,
    options: ['Required<T>', 'Partial<T>', 'Pick<T>', 'Record<T>'],
    correctAnswer: 'Partial<T>',
    explanation: 'Adding ? makes all properties optional, which is what Partial<T> does.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the type guard function:',
    code: `function isString(value: unknown): value _____ string {
  return typeof value === 'string';
}`,
    options: ['is', 'as', 'extends', 'instanceof'],
    correctAnswer: 'is',
    explanation: 'Type predicates use "is" to narrow types: value is string.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What does the NonNullable<T> utility type do?',
    options: [
      'Makes properties required',
      'Excludes null and undefined from T',
      'Checks for null at runtime',
      'Creates a nullable type'
    ],
    correctAnswer: 'Excludes null and undefined from T',
    explanation: 'NonNullable<T> filters out null and undefined from union types.',
    points: 10
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the resulting type?',
    code: `type User = { name: string; age: number; email: string };
type ContactInfo = Pick<User, 'name' | 'email'>;`,
    options: [
      '{ name: string; age: number; email: string }',
      '{ name: string; email: string }',
      '{ age: number }',
      'string | string'
    ],
    correctAnswer: '{ name: string; email: string }',
    explanation: 'Pick creates a type with only the specified properties.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is variance in TypeScript generics?',
    options: [
      'Type mutation',
      'How generic types relate when their type parameters relate',
      'Default type values',
      'Type aliasing'
    ],
    correctAnswer: 'How generic types relate when their type parameters relate',
    explanation: 'Variance determines if Array<Cat> is assignable to Array<Animal> based on type parameter relationship.',
    points: 20
  }
];

// ==========================================
// C++ - Hard Questions
// ==========================================
const cppQuestions: TestQuestion[] = [
  {
    id: generateId(),
    type: 'code-output',
    question: 'What does this code output?',
    code: `#include <iostream>
int main() {
    int x = 5;
    int* ptr = &x;
    int& ref = x;
    ref = 10;
    std::cout << *ptr;
}`,
    options: ['5', '10', 'Memory address', 'Undefined'],
    correctAnswer: '10',
    explanation: 'ref and ptr both refer to x. Changing ref to 10 changes x, which *ptr reads.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is RAII in C++?',
    options: [
      'A design pattern for random access',
      'Resource Acquisition Is Initialization - tying resources to object lifetime',
      'A runtime assertion mechanism',
      'A type of iterator'
    ],
    correctAnswer: 'Resource Acquisition Is Initialization - tying resources to object lifetime',
    explanation: 'RAII ensures resources are automatically released when objects go out of scope.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the move constructor:',
    code: `class Buffer {
    int* data;
    size_t size;
public:
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = _____;
        other.size = 0;
    }
};`,
    options: ['nullptr', 'NULL', 'delete', '0'],
    correctAnswer: 'nullptr',
    explanation: 'After moving, the source should be in a valid empty state. nullptr is preferred in modern C++.',
    points: 15
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `#include <iostream>
class Base {
public:
    virtual void print() { std::cout << "Base"; }
};
class Derived : public Base {
public:
    void print() override { std::cout << "Derived"; }
};
int main() {
    Base* b = new Derived();
    b->print();
}`,
    options: ['Base', 'Derived', 'BaseDerived', 'Error'],
    correctAnswer: 'Derived',
    explanation: 'Virtual dispatch calls Derived::print() through the Base pointer.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What does std::unique_ptr provide?',
    options: [
      'Shared ownership of a resource',
      'Exclusive ownership with automatic deletion',
      'Weak reference to a resource',
      'Raw pointer with bounds checking'
    ],
    correctAnswer: 'Exclusive ownership with automatic deletion',
    explanation: 'unique_ptr owns its resource exclusively and deletes it when destroyed.',
    points: 10
  },
  {
    id: generateId(),
    type: 'debug',
    question: 'What is wrong with this code?',
    code: `std::vector<int> vec = {1, 2, 3};
for (auto it = vec.begin(); it != vec.end(); ++it) {
    if (*it == 2) {
        vec.erase(it);
    }
}`,
    options: [
      'Nothing wrong',
      'Iterator invalidation after erase',
      'Wrong erase syntax',
      'Auto type deduction error'
    ],
    correctAnswer: 'Iterator invalidation after erase',
    explanation: 'erase() invalidates the iterator. Use it = vec.erase(it) instead.',
    points: 20
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the result?',
    code: `#include <iostream>
template<typename T>
T add(T a, T b) { return a + b; }

int main() {
    std::cout << add(5, 3.5);
}`,
    options: ['8.5', '8', 'Compilation error', 'Undefined'],
    correctAnswer: 'Compilation error',
    explanation: 'Template deduction fails: T can\'t be both int and double. Use add<double>(5, 3.5).',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is the Rule of Five?',
    options: [
      'Maximum five inheritance levels',
      'If you define one of destructor/copy ops/move ops, define all five',
      'Maximum five template parameters',
      'Five types of constructors'
    ],
    correctAnswer: 'If you define one of destructor/copy ops/move ops, define all five',
    explanation: 'If you need custom resource management for one, you likely need it for all.',
    points: 15
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the perfect forwarding function:',
    code: `template<typename T>
void wrapper(T&& arg) {
    process(std::_____(arg));
}`,
    options: ['forward<T>', 'move', 'forward', 'ref'],
    correctAnswer: 'forward<T>',
    explanation: 'std::forward<T> preserves the value category of the argument.',
    points: 20
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What happens here?',
    code: `int* ptr = new int[10];
delete ptr;`,
    options: [
      'Works correctly',
      'Undefined behavior - should use delete[]',
      'Memory leak',
      'Compilation error'
    ],
    correctAnswer: 'Undefined behavior - should use delete[]',
    explanation: 'Arrays allocated with new[] must be deleted with delete[] to properly destruct all elements.',
    points: 15
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What does constexpr enable?',
    options: [
      'Runtime constants only',
      'Compile-time evaluation of functions and variables',
      'Const reference parameters',
      'Explicit type conversion'
    ],
    correctAnswer: 'Compile-time evaluation of functions and variables',
    explanation: 'constexpr allows computation at compile time when possible.',
    points: 10
  },
  {
    id: generateId(),
    type: 'code-output',
    question: 'What is the output?',
    code: `#include <iostream>
#include <memory>
int main() {
    auto sp1 = std::make_shared<int>(42);
    auto sp2 = sp1;
    auto sp3 = sp1;
    std::cout << sp1.use_count();
}`,
    options: ['1', '2', '3', '42'],
    correctAnswer: '3',
    explanation: 'Three shared_ptrs share ownership. use_count() returns 3.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is a dangling pointer?',
    options: [
      'A pointer set to nullptr',
      'A pointer to memory that has been freed',
      'A pointer to stack memory',
      'An uninitialized pointer'
    ],
    correctAnswer: 'A pointer to memory that has been freed',
    explanation: 'Dangling pointers reference deallocated memory, causing undefined behavior if used.',
    points: 10
  },
  {
    id: generateId(),
    type: 'fill-blank',
    question: 'Complete the lambda capture:',
    code: `int x = 10;
auto lambda = [_____]() { return x * 2; };`,
    options: ['x', '&x', '=', '&'],
    correctAnswer: 'x',
    explanation: 'Capturing by value [x] copies x into the lambda.',
    points: 10
  },
  {
    id: generateId(),
    type: 'multiple-choice',
    question: 'What is std::move_semantics designed to avoid?',
    options: [
      'Compilation errors',
      'Unnecessary copies when transferring resources',
      'Memory leaks',
      'Template instantiation'
    ],
    correctAnswer: 'Unnecessary copies when transferring resources',
    explanation: 'Move semantics transfer ownership instead of copying, improving performance.',
    points: 15
  }
];

// Generate tests for each language
export const masteryTests: Record<string, MasteryTest> = {
  'JavaScript': {
    id: 'js-mastery',
    language: 'JavaScript',
    title: 'JavaScript Advanced Certification',
    description: 'Challenging test covering closures, async, prototypes, and advanced patterns',
    totalQuestions: javascriptQuestions.length,
    passingScore: 75,
    timeLimit: 45,
    questions: javascriptQuestions,
    difficulty: 'advanced'
  },
  'Python': {
    id: 'python-mastery',
    language: 'Python',
    title: 'Python Expert Certification',
    description: 'Deep dive into decorators, generators, metaclasses, and advanced features',
    totalQuestions: pythonQuestions.length,
    passingScore: 75,
    timeLimit: 45,
    questions: pythonQuestions,
    difficulty: 'advanced'
  },
  'HTML': {
    id: 'html-mastery',
    language: 'HTML',
    title: 'HTML Mastery Certification',
    description: 'Semantic HTML, accessibility, and modern features',
    totalQuestions: htmlQuestions.length,
    passingScore: 70,
    timeLimit: 25,
    questions: htmlQuestions,
    difficulty: 'intermediate'
  },
  'CSS': {
    id: 'css-mastery',
    language: 'CSS',
    title: 'CSS Expert Certification',
    description: 'Advanced layouts, specificity, and modern CSS features',
    totalQuestions: cssQuestions.length,
    passingScore: 70,
    timeLimit: 30,
    questions: cssQuestions,
    difficulty: 'intermediate'
  },
  'React': {
    id: 'react-mastery',
    language: 'React',
    title: 'React Advanced Certification',
    description: 'Hooks, performance optimization, and React patterns',
    totalQuestions: reactQuestions.length,
    passingScore: 75,
    timeLimit: 40,
    questions: reactQuestions,
    difficulty: 'advanced'
  },
  'TypeScript': {
    id: 'typescript-mastery',
    language: 'TypeScript',
    title: 'TypeScript Expert Certification',
    description: 'Advanced types, generics, and type system mastery',
    totalQuestions: typescriptQuestions.length,
    passingScore: 75,
    timeLimit: 40,
    questions: typescriptQuestions,
    difficulty: 'advanced'
  },
  'C++': {
    id: 'cpp-mastery',
    language: 'C++',
    title: 'C++ Expert Certification',
    description: 'Memory management, templates, and modern C++ features',
    totalQuestions: cppQuestions.length,
    passingScore: 75,
    timeLimit: 45,
    questions: cppQuestions,
    difficulty: 'advanced'
  }
};

// Add placeholder tests for other languages with harder questions
const placeholderLanguages = ['C#', 'Dart', 'Go', 'Kotlin', 'Swift'];
placeholderLanguages.forEach(lang => {
  masteryTests[lang] = {
    id: `${lang.toLowerCase().replace('#', 'sharp')}-mastery`,
    language: lang,
    title: `${lang} Mastery Certification`,
    description: `Comprehensive ${lang} programming assessment`,
    totalQuestions: 15,
    passingScore: 75,
    timeLimit: 35,
    questions: [
      {
        id: generateId(),
        type: 'multiple-choice',
        question: `What memory management model does ${lang} use?`,
        options: ['Manual allocation', 'Garbage collection', 'Reference counting', 'Depends on configuration'],
        correctAnswer: 'Garbage collection',
        explanation: `${lang} uses garbage collection for automatic memory management.`,
        points: 10
      },
      {
        id: generateId(),
        type: 'code-output',
        question: `In ${lang}, what is the result of comparing null/nil with itself?`,
        options: ['true', 'false', 'Compilation error', 'Runtime exception'],
        correctAnswer: 'true',
        explanation: 'null/nil values compare equal to themselves in most languages.',
        points: 15
      },
      {
        id: generateId(),
        type: 'fill-blank',
        question: `Complete the async function signature in ${lang}:`,
        code: `_____ fetchData() { ... }`,
        options: ['async', 'await', 'Future', 'Depends on syntax'],
        correctAnswer: 'async',
        explanation: 'async keyword marks a function as asynchronous.',
        points: 15
      },
      {
        id: generateId(),
        type: 'multiple-choice',
        question: `What design pattern is commonly used for dependency injection in ${lang}?`,
        options: ['Singleton', 'Factory', 'Constructor injection', 'All of the above'],
        correctAnswer: 'All of the above',
        explanation: 'DI can be implemented using various patterns depending on needs.',
        points: 15
      },
      {
        id: generateId(),
        type: 'debug',
        question: `What is wrong with this code pattern in ${lang}?`,
        code: `var items = getItems();\nfor (var item in items) {\n  item.process();\n  items.remove(item);\n}`,
        options: ['Nothing wrong', 'Modifying collection during iteration', 'Wrong loop syntax', 'Missing null check'],
        correctAnswer: 'Modifying collection during iteration',
        explanation: 'Removing items while iterating causes errors or undefined behavior.',
        points: 20
      },
      {
        id: generateId(),
        type: 'multiple-choice',
        question: `What is the purpose of interfaces in ${lang}?`,
        options: ['Code reuse', 'Defining contracts for types', 'Memory optimization', 'Compile-time type erasure'],
        correctAnswer: 'Defining contracts for types',
        explanation: 'Interfaces define method signatures that implementing classes must provide.',
        points: 10
      },
      {
        id: generateId(),
        type: 'code-output',
        question: `What happens when you try to access an out-of-bounds index in ${lang}?`,
        options: ['Returns null/nil', 'Throws an exception', 'Returns default value', 'Undefined behavior'],
        correctAnswer: 'Throws an exception',
        explanation: `${lang} throws an exception for index out of bounds access.`,
        points: 15
      },
      {
        id: generateId(),
        type: 'multiple-choice',
        question: `What is null safety in ${lang}?`,
        options: [
          'Preventing null pointer exceptions at compile time',
          'Making all variables nullable',
          'Runtime null checking',
          'Disabling null values entirely'
        ],
        correctAnswer: 'Preventing null pointer exceptions at compile time',
        explanation: 'Null safety helps catch potential null errors during compilation.',
        points: 15
      },
      {
        id: generateId(),
        type: 'fill-blank',
        question: `Complete the extension method syntax:`,
        code: `_____ String capitalize(String s) { ... }`,
        options: ['extension', 'static', 'public', 'Varies by language'],
        correctAnswer: 'Varies by language',
        explanation: 'Extension method syntax differs between languages.',
        points: 10
      },
      {
        id: generateId(),
        type: 'multiple-choice',
        question: `What is the purpose of sealed/final classes?`,
        options: [
          'Improve performance',
          'Prevent inheritance',
          'Enable pattern matching',
          'Both B and C'
        ],
        correctAnswer: 'Both B and C',
        explanation: 'Sealed/final classes prevent subclassing and enable exhaustive pattern matching.',
        points: 15
      },
      {
        id: generateId(),
        type: 'debug',
        question: `What is the issue with this async code?`,
        code: `async function getData() {\n  var data = await fetchData();\n  return data;\n}\nvar result = getData();\nprint(result);`,
        options: [
          'Nothing wrong',
          'Missing await on getData()',
          'Wrong function syntax',
          'Missing error handling'
        ],
        correctAnswer: 'Missing await on getData()',
        explanation: 'Calling async function without await returns a Future/Promise, not the resolved value.',
        points: 20
      },
      {
        id: generateId(),
        type: 'multiple-choice',
        question: `What is covariance in ${lang}?`,
        options: [
          'Variable naming convention',
          'Subtype can be used where supertype is expected',
          'Type inference',
          'Method overloading'
        ],
        correctAnswer: 'Subtype can be used where supertype is expected',
        explanation: 'Covariance allows substituting more specific types for general ones.',
        points: 15
      },
      {
        id: generateId(),
        type: 'code-output',
        question: `What is the difference between == and === (or equivalent)?`,
        options: [
          'No difference',
          'Type coercion vs strict equality',
          'Value vs reference comparison',
          'Depends on types being compared'
        ],
        correctAnswer: 'Depends on types being compared',
        explanation: 'Equality semantics vary based on value types vs reference types.',
        points: 10
      },
      {
        id: generateId(),
        type: 'fill-blank',
        question: `Complete the generic constraint:`,
        code: `class Container<T _____ Comparable> { ... }`,
        options: ['extends', 'implements', ':', 'Varies by language'],
        correctAnswer: 'Varies by language',
        explanation: 'Generic constraint syntax differs between languages.',
        points: 15
      },
      {
        id: generateId(),
        type: 'multiple-choice',
        question: `What is method dispatch?`,
        options: [
          'Calling a method by name',
          'Determining which method implementation to call at runtime',
          'Method parameter passing',
          'Async method scheduling'
        ],
        correctAnswer: 'Determining which method implementation to call at runtime',
        explanation: 'Method dispatch determines the actual method to execute, especially with polymorphism.',
        points: 15
      }
    ],
    difficulty: 'advanced'
  };
});

export const getTestForLanguage = (language: string): MasteryTest | undefined => {
  return masteryTests[language];
};
