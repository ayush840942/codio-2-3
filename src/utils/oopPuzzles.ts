
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const CLASS_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'class Car {', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  constructor(brand) {', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '    this.brand = brand', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: 'const myCar = new Car("Toyota")', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: 'console.log(myCar.brand)', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
  hint: "Create a class with a constructor and instantiate it",
  description: "Learn about classes in JavaScript",
  expectedOutput: `Toyota`
};

export const INHERITANCE_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'class Animal {', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  constructor(name) {', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '    this.name = name', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  speak() {', type: 'function' as const, isPlaced: false },
    { id: 'block6', content: '    return `${this.name} makes a noise`', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: 'class Dog extends Animal {', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '  speak() {', type: 'function' as const, isPlaced: false },
    { id: 'block11', content: '    return `${this.name} barks`', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block14', content: 'const dog = new Dog("Rex")', type: 'code' as const, isPlaced: false },
    { id: 'block15', content: 'console.log(dog.speak())', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15'],
  hint: "Create a base class and extend it with a subclass",
  description: "Learn about inheritance in object-oriented programming",
  expectedOutput: `Rex barks`
};

export const POLYMORPHISM_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'class Shape {', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  area() {', type: 'function' as const, isPlaced: false },
    { id: 'block3', content: '    return 0', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: 'class Circle extends Shape {', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '  constructor(radius) {', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '    super()', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '    this.radius = radius', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '  area() {', type: 'function' as const, isPlaced: false },
    { id: 'block12', content: '    return Math.PI * this.radius * this.radius', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block14', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block15', content: 'const circle = new Circle(5)', type: 'code' as const, isPlaced: false },
    { id: 'block16', content: 'console.log(circle.area().toFixed(2))', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15', 'block16'],
  hint: "Override methods in subclasses to achieve polymorphic behavior",
  description: "Learn about polymorphism in object-oriented programming",
  expectedOutput: `78.54`
};

export const ENCAPSULATION_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'class BankAccount {', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  constructor(owner, balance) {', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '    this._owner = owner', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '    this._balance = balance', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '  deposit(amount) {', type: 'function' as const, isPlaced: false },
    { id: 'block7', content: '    this._balance += amount', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '  get balance() {', type: 'function' as const, isPlaced: false },
    { id: 'block10', content: '    return this._balance', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: 'const account = new BankAccount("John", 1000)', type: 'code' as const, isPlaced: false },
    { id: 'block14', content: 'account.deposit(500)', type: 'code' as const, isPlaced: false },
    { id: 'block15', content: 'console.log(account.balance)', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15'],
  hint: "Use private properties and getter methods to encapsulate data",
  description: "Learn about encapsulation in object-oriented programming",
  expectedOutput: `1500`
};
