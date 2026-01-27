
export interface CodingPuzzle {
  id: number;
  title: string;
  level: string;
  concept: string;
  description: string;
  expectedOutput: string;
  starterCode: string;
  answerCode: string;
}

export const codingPuzzles: CodingPuzzle[] = [
  // BEGINNER LEVEL (1-15)
  {
    id: 1,
    title: "Hello, World!",
    level: "Beginner",
    concept: "Basic Output",
    description: "Your first mission: Make the computer say hello to the world!",
    expectedOutput: "Hello, World!",
    starterCode: "# Write a program that prints 'Hello, World!'\nprint(___)",
    answerCode: "print('Hello, World!')"
  },
  {
    id: 2,
    title: "The Name Game",
    level: "Beginner",
    concept: "Variables",
    description: "Store your name in a variable and introduce yourself!",
    expectedOutput: "My name is [your name]",
    starterCode: "# Store your name and print an introduction\nname = ___\nprint(___)",
    answerCode: "name = 'Alice'\nprint('My name is', name)"
  },
  {
    id: 3,
    title: "Math Wizard",
    level: "Beginner",
    concept: "Basic Arithmetic",
    description: "Cast a spell to add two magical numbers together!",
    expectedOutput: "15",
    starterCode: "# Add 8 and 7\nresult = ___ + ___\nprint(result)",
    answerCode: "result = 8 + 7\nprint(result)"
  },
  {
    id: 4,
    title: "Age Calculator",
    level: "Beginner",
    concept: "Input/Output",
    description: "Create a program that asks for someone's age and tells them how old they are!",
    expectedOutput: "You are 25 years old",
    starterCode: "# Get user's age and display it\nage = input(___)\nprint(___)",
    answerCode: "age = input('What is your age? ')\nprint('You are', age, 'years old')"
  },
  {
    id: 5,
    title: "Temperature Converter",
    level: "Beginner",
    concept: "Mathematical Operations",
    description: "Help travelers by converting Celsius to Fahrenheit!",
    expectedOutput: "32°C is 89.6°F",
    starterCode: "# Convert 32°C to Fahrenheit\ncelsius = 32\nfahrenheit = (celsius * ___) + ___\nprint(___)",
    answerCode: "celsius = 32\nfahrenheit = (celsius * 9/5) + 32\nprint(f'{celsius}°C is {fahrenheit}°F')"
  },
  {
    id: 6,
    title: "Lucky Number",
    level: "Beginner",
    concept: "Random Numbers",
    description: "Generate a random lucky number between 1 and 100!",
    expectedOutput: "Your lucky number is: 42",
    starterCode: "import random\n# Generate a random number between 1 and 100\nlucky = random.randint(___)\nprint(___)",
    answerCode: "import random\nlucky = random.randint(1, 100)\nprint('Your lucky number is:', lucky)"
  },
  {
    id: 7,
    title: "String Detective",
    level: "Beginner",
    concept: "String Length",
    description: "Count the letters in a secret message!",
    expectedOutput: "The message has 13 characters",
    starterCode: "# Count characters in 'Hello, World!'\nmessage = 'Hello, World!'\nlength = ___\nprint(___)",
    answerCode: "message = 'Hello, World!'\nlength = len(message)\nprint('The message has', length, 'characters')"
  },
  {
    id: 8,
    title: "Circle Calculator",
    level: "Beginner",
    concept: "Constants and Math",
    description: "Calculate the area of a circle with radius 5!",
    expectedOutput: "Area: 78.54",
    starterCode: "import math\n# Calculate area of circle with radius 5\nradius = 5\narea = math.pi * ___\nprint(___)",
    answerCode: "import math\nradius = 5\narea = math.pi * radius ** 2\nprint(f'Area: {area:.2f}')"
  },
  {
    id: 9,
    title: "Text Transformer",
    level: "Beginner",
    concept: "String Methods",
    description: "Transform text to uppercase like a superhero!",
    expectedOutput: "PYTHON IS AWESOME",
    starterCode: "# Convert 'python is awesome' to uppercase\ntext = 'python is awesome'\nresult = text.___\nprint(result)",
    answerCode: "text = 'python is awesome'\nresult = text.upper()\nprint(result)"
  },
  {
    id: 10,
    title: "Boolean Explorer",
    level: "Beginner",
    concept: "Boolean Values",
    description: "Discover the truth about True and False!",
    expectedOutput: "True False",
    starterCode: "# Print True and False values\nis_learning = ___\nis_bored = ___\nprint(is_learning, is_bored)",
    answerCode: "is_learning = True\nis_bored = False\nprint(is_learning, is_bored)"
  },
  {
    id: 11,
    title: "List Creator",
    level: "Beginner",
    concept: "Lists",
    description: "Create a list of your three favorite colors!",
    expectedOutput: "['red', 'blue', 'green']",
    starterCode: "# Create a list of three colors\ncolors = [___, ___, ___]\nprint(colors)",
    answerCode: "colors = ['red', 'blue', 'green']\nprint(colors)"
  },
  {
    id: 12,
    title: "List Inspector",
    level: "Beginner",
    concept: "List Access",
    description: "Find the first item in a treasure list!",
    expectedOutput: "gold",
    starterCode: "# Get the first item from the list\ntreasures = ['gold', 'silver', 'bronze']\nfirst_treasure = treasures[___]\nprint(first_treasure)",
    answerCode: "treasures = ['gold', 'silver', 'bronze']\nfirst_treasure = treasures[0]\nprint(first_treasure)"
  },
  {
    id: 13,
    title: "Dictionary Builder",
    level: "Beginner",
    concept: "Dictionaries",
    description: "Create a dictionary with your personal info!",
    expectedOutput: "{'name': 'Alice', 'age': 25}",
    starterCode: "# Create a dictionary with name and age\nperson = {'name': ___, 'age': ___}\nprint(person)",
    answerCode: "person = {'name': 'Alice', 'age': 25}\nprint(person)"
  },
  {
    id: 14,
    title: "Comment Master",
    level: "Beginner",
    concept: "Comments",
    description: "Add helpful comments to explain your code!",
    expectedOutput: "42",
    starterCode: "# Add a comment explaining what this code does\nanswer = 42\nprint(answer)",
    answerCode: "# This stores the answer to life, universe, and everything\nanswer = 42\nprint(answer)"
  },
  {
    id: 15,
    title: "Type Detective",
    level: "Beginner",
    concept: "Data Types",
    description: "Discover the type of different variables!",
    expectedOutput: "<class 'int'> <class 'str'>",
    starterCode: "# Print the types of these variables\nnumber = 42\ntext = 'hello'\nprint(type(___), type(___))",
    answerCode: "number = 42\ntext = 'hello'\nprint(type(number), type(text))"
  },

  // EASY LEVEL (16-30)
  {
    id: 16,
    title: "Age Checker",
    level: "Easy",
    concept: "If Statements",
    description: "Check if someone is old enough to vote!",
    expectedOutput: "You can vote!",
    starterCode: "# Check if age 20 can vote (18+)\nage = 20\nif age ___:\n    print('You can vote!')\nelse:\n    print('Too young to vote')",
    answerCode: "age = 20\nif age >= 18:\n    print('You can vote!')\nelse:\n    print('Too young to vote')"
  },
  {
    id: 17,
    title: "Grade Calculator",
    level: "Easy",
    concept: "If-Elif-Else",
    description: "Convert a number grade to a letter grade!",
    expectedOutput: "Grade: B",
    starterCode: "# Convert score 85 to letter grade\nscore = 85\nif score >= 90:\n    grade = 'A'\nelif score >= ___:\n    grade = 'B'\nelse:\n    grade = 'C'\nprint('Grade:', grade)",
    answerCode: "score = 85\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelse:\n    grade = 'C'\nprint('Grade:', grade)"
  },
  {
    id: 18,
    title: "Number Guesser",
    level: "Easy",
    concept: "Comparison Operators",
    description: "Compare a guess with the secret number!",
    expectedOutput: "Too low!",
    starterCode: "# Compare guess 5 with secret number 8\nguess = 5\nsecret = 8\nif guess ___ secret:\n    print('Too low!')\nelif guess ___ secret:\n    print('Too high!')\nelse:\n    print('Correct!')",
    answerCode: "guess = 5\nsecret = 8\nif guess < secret:\n    print('Too low!')\nelif guess > secret:\n    print('Too high!')\nelse:\n    print('Correct!')"
  },
  {
    id: 19,
    title: "Password Validator",
    level: "Easy",
    concept: "Logical Operators",
    description: "Check if a password meets the requirements!",
    expectedOutput: "Password accepted",
    starterCode: "# Check if password is valid (length >= 8 and contains 'a')\npassword = 'password123'\nif len(password) >= 8 ___ 'a' ___ password:\n    print('Password accepted')\nelse:\n    print('Password rejected')",
    answerCode: "password = 'password123'\nif len(password) >= 8 and 'a' in password:\n    print('Password accepted')\nelse:\n    print('Password rejected')"
  },
  {
    id: 20,
    title: "Countdown Timer",
    level: "Easy",
    concept: "While Loops",
    description: "Create a countdown from 5 to 1!",
    expectedOutput: "5 4 3 2 1 Blast off!",
    starterCode: "# Countdown from 5 to 1\ncount = 5\nwhile count ___:\n    print(count)\n    count ___\nprint('Blast off!')",
    answerCode: "count = 5\nwhile count > 0:\n    print(count)\n    count -= 1\nprint('Blast off!')"
  },
  {
    id: 21,
    title: "Number Collector",
    level: "Easy",
    concept: "For Loops",
    description: "Print all numbers from 1 to 5!",
    expectedOutput: "1 2 3 4 5",
    starterCode: "# Print numbers 1 to 5\nfor i in range(___, ___):\n    print(i)",
    answerCode: "for i in range(1, 6):\n    print(i)"
  },
  {
    id: 22,
    title: "List Explorer",
    level: "Easy",
    concept: "Iterating Lists",
    description: "Print each fruit in the basket!",
    expectedOutput: "apple banana orange",
    starterCode: "# Print each fruit\nfruits = ['apple', 'banana', 'orange']\nfor fruit in ___:\n    print(fruit)",
    answerCode: "fruits = ['apple', 'banana', 'orange']\nfor fruit in fruits:\n    print(fruit)"
  },
  {
    id: 23,
    title: "Sum Calculator",
    level: "Easy",
    concept: "Accumulator Pattern",
    description: "Calculate the sum of numbers 1 to 10!",
    expectedOutput: "Sum: 55",
    starterCode: "# Calculate sum of 1 to 10\ntotal = 0\nfor i in range(1, 11):\n    total ___ i\nprint('Sum:', total)",
    answerCode: "total = 0\nfor i in range(1, 11):\n    total += i\nprint('Sum:', total)"
  },
  {
    id: 24,
    title: "Even Finder",
    level: "Easy",
    concept: "Modulo Operator",
    description: "Find all even numbers from 1 to 10!",
    expectedOutput: "2 4 6 8 10",
    starterCode: "# Print even numbers 1 to 10\nfor i in range(1, 11):\n    if i % 2 ___:\n        print(i)",
    answerCode: "for i in range(1, 11):\n    if i % 2 == 0:\n        print(i)"
  },
  {
    id: 25,
    title: "Shopping List Manager",
    level: "Easy",
    concept: "List Methods",
    description: "Add items to your shopping list!",
    expectedOutput: "['milk', 'bread', 'eggs']",
    starterCode: "# Start with empty list and add items\nshopping = []\nshopping.___(___)\nshopping.___(___)\nshopping.___(___)\nprint(shopping)",
    answerCode: "shopping = []\nshopping.append('milk')\nshopping.append('bread')\nshopping.append('eggs')\nprint(shopping)"
  },
  {
    id: 26,
    title: "String Slicer",
    level: "Easy",
    concept: "String Slicing",
    description: "Extract the first 5 characters from a word!",
    expectedOutput: "Pytho",
    starterCode: "# Get first 5 characters of 'Python'\nword = 'Python'\nfirst_five = word[___]\nprint(first_five)",
    answerCode: "word = 'Python'\nfirst_five = word[:5]\nprint(first_five)"
  },
  {
    id: 27,
    title: "Word Counter",
    level: "Easy",
    concept: "String Split",
    description: "Count the number of words in a sentence!",
    expectedOutput: "Word count: 4",
    starterCode: "# Count words in 'Python is really fun'\nsentence = 'Python is really fun'\nwords = sentence.___()\ncount = len(words)\nprint('Word count:', count)",
    answerCode: "sentence = 'Python is really fun'\nwords = sentence.split()\ncount = len(words)\nprint('Word count:', count)"
  },
  {
    id: 28,
    title: "Maximum Finder",
    level: "Easy",
    concept: "Built-in Functions",
    description: "Find the largest number in a list!",
    expectedOutput: "Maximum: 89",
    starterCode: "# Find max in [23, 89, 12, 45]\nnumbers = [23, 89, 12, 45]\nmaximum = ___(numbers)\nprint('Maximum:', maximum)",
    answerCode: "numbers = [23, 89, 12, 45]\nmaximum = max(numbers)\nprint('Maximum:', maximum)"
  },
  {
    id: 29,
    title: "List Reverser",
    level: "Easy",
    concept: "List Slicing",
    description: "Reverse a list of numbers!",
    expectedOutput: "[5, 4, 3, 2, 1]",
    starterCode: "# Reverse [1, 2, 3, 4, 5]\nnumbers = [1, 2, 3, 4, 5]\nreversed_nums = numbers[___]\nprint(reversed_nums)",
    answerCode: "numbers = [1, 2, 3, 4, 5]\nreversed_nums = numbers[::-1]\nprint(reversed_nums)"
  },
  {
    id: 30,
    title: "Character Counter",
    level: "Easy",
    concept: "String Count Method",
    description: "Count how many times 'a' appears in a word!",
    expectedOutput: "Letter 'a' appears 3 times",
    starterCode: "# Count 'a' in 'banana'\nword = 'banana'\ncount = word.___(___)\nprint(f\"Letter 'a' appears {count} times\")",
    answerCode: "word = 'banana'\ncount = word.count('a')\nprint(f\"Letter 'a' appears {count} times\")"
  },

  // MODERATE LEVEL (31-45)
  {
    id: 31,
    title: "Function Factory",
    level: "Moderate",
    concept: "Functions",
    description: "Create a function that greets someone by name!",
    expectedOutput: "Hello, Alice!",
    starterCode: "# Create a greeting function\ndef greet(___):\n    return ___\n\nresult = greet('Alice')\nprint(result)",
    answerCode: "def greet(name):\n    return f'Hello, {name}!'\n\nresult = greet('Alice')\nprint(result)"
  },
  {
    id: 32,
    title: "Calculator Builder",
    level: "Moderate",
    concept: "Function Parameters",
    description: "Build a function that adds two numbers!",
    expectedOutput: "Result: 15",
    starterCode: "# Create an addition function\ndef add(___, ___):\n    return ___\n\nresult = add(7, 8)\nprint('Result:', result)",
    answerCode: "def add(a, b):\n    return a + b\n\nresult = add(7, 8)\nprint('Result:', result)"
  },
  {
    id: 33,
    title: "List Processor",
    level: "Moderate",
    concept: "Functions with Lists",
    description: "Create a function that finds the average of a list!",
    expectedOutput: "Average: 15.0",
    starterCode: "# Function to calculate average\ndef average(numbers):\n    total = ___(numbers)\n    count = ___(numbers)\n    return ___\n\nresult = average([10, 15, 20])\nprint('Average:', result)",
    answerCode: "def average(numbers):\n    total = sum(numbers)\n    count = len(numbers)\n    return total / count\n\nresult = average([10, 15, 20])\nprint('Average:', result)"
  },
  {
    id: 34,
    title: "Prime Detective",
    level: "Moderate",
    concept: "Complex Logic",
    description: "Check if a number is prime!",
    expectedOutput: "17 is prime: True",
    starterCode: "# Check if 17 is prime\ndef is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, ___):\n        if n % i == 0:\n            return ___\n    return ___\n\nresult = is_prime(17)\nprint('17 is prime:', result)",
    answerCode: "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, n):\n        if n % i == 0:\n            return False\n    return True\n\nresult = is_prime(17)\nprint('17 is prime:', result)"
  },
  {
    id: 35,
    title: "Fibonacci Generator",
    level: "Moderate",
    concept: "Recursive Thinking",
    description: "Generate the first 10 Fibonacci numbers!",
    expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
    starterCode: "# Generate first 10 Fibonacci numbers\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(___) + fibonacci(___)\n\nfib_list = [fibonacci(i) for i in range(10)]\nprint(fib_list)",
    answerCode: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nfib_list = [fibonacci(i) for i in range(10)]\nprint(fib_list)"
  },
  {
    id: 36,
    title: "Word Reverser",
    level: "Moderate",
    concept: "String Manipulation",
    description: "Reverse each word in a sentence!",
    expectedOutput: "nohtyP si emsewa",
    starterCode: "# Reverse each word in 'Python is awesome'\ndef reverse_words(sentence):\n    words = sentence.___()\n    reversed_words = [word[___] for word in words]\n    return ' '.join(___)\n\nresult = reverse_words('Python is awesome')\nprint(result)",
    answerCode: "def reverse_words(sentence):\n    words = sentence.split()\n    reversed_words = [word[::-1] for word in words]\n    return ' '.join(reversed_words)\n\nresult = reverse_words('Python is awesome')\nprint(result)"
  },
  {
    id: 37,
    title: "Frequency Counter",
    level: "Moderate",
    concept: "Dictionaries",
    description: "Count the frequency of each character!",
    expectedOutput: "{'h': 1, 'e': 1, 'l': 3, 'o': 2}",
    starterCode: "# Count character frequency in 'hello'\ndef char_frequency(text):\n    freq = {}\n    for char in text:\n        if char in freq:\n            freq[char] ___\n        else:\n            freq[char] = ___\n    return freq\n\nresult = char_frequency('hello')\nprint(result)",
    answerCode: "def char_frequency(text):\n    freq = {}\n    for char in text:\n        if char in freq:\n            freq[char] += 1\n        else:\n            freq[char] = 1\n    return freq\n\nresult = char_frequency('hello')\nprint(result)"
  },
  {
    id: 38,
    title: "List Flattener",
    level: "Moderate",
    concept: "Nested Lists",
    description: "Flatten a nested list into a single list!",
    expectedOutput: "[1, 2, 3, 4, 5, 6]",
    starterCode: "# Flatten [[1, 2], [3, 4], [5, 6]]\ndef flatten_list(nested_list):\n    flat = []\n    for sublist in nested_list:\n        for item in ___:\n            flat.___(___)\n    return flat\n\nresult = flatten_list([[1, 2], [3, 4], [5, 6]])\nprint(result)",
    answerCode: "def flatten_list(nested_list):\n    flat = []\n    for sublist in nested_list:\n        for item in sublist:\n            flat.append(item)\n    return flat\n\nresult = flatten_list([[1, 2], [3, 4], [5, 6]])\nprint(result)"
  },
  {
    id: 39,
    title: "Palindrome Checker",
    level: "Moderate",
    concept: "String Algorithms",
    description: "Check if a word reads the same forwards and backwards!",
    expectedOutput: "racecar is palindrome: True",
    starterCode: "# Check if 'racecar' is a palindrome\ndef is_palindrome(word):\n    return word == word[___]\n\nresult = is_palindrome('racecar')\nprint('racecar is palindrome:', result)",
    answerCode: "def is_palindrome(word):\n    return word == word[::-1]\n\nresult = is_palindrome('racecar')\nprint('racecar is palindrome:', result)"
  },
  {
    id: 40,
    title: "Number Sorter",
    level: "Moderate",
    concept: "Sorting Algorithms",
    description: "Sort a list of numbers in ascending order!",
    expectedOutput: "[1, 3, 5, 7, 9]",
    starterCode: "# Sort [9, 1, 5, 3, 7]\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = ___, ___\n    return arr\n\nresult = bubble_sort([9, 1, 5, 3, 7])\nprint(result)",
    answerCode: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nresult = bubble_sort([9, 1, 5, 3, 7])\nprint(result)"
  },
  {
    id: 41,
    title: "Password Generator",
    level: "Moderate",
    concept: "Random and Strings",
    description: "Generate a random 8-character password!",
    expectedOutput: "Password: aB3xY9kL",
    starterCode: "import random\nimport string\n\n# Generate 8-character password\ndef generate_password(length):\n    chars = string.ascii_letters + string.digits\n    password = ''.join(random.___(chars) for _ in range(___))\n    return password\n\nresult = generate_password(8)\nprint('Password:', result)",
    answerCode: "import random\nimport string\n\ndef generate_password(length):\n    chars = string.ascii_letters + string.digits\n    password = ''.join(random.choice(chars) for _ in range(length))\n    return password\n\nresult = generate_password(8)\nprint('Password:', result)"
  },
  {
    id: 42,
    title: "Anagram Detector",
    level: "Moderate",
    concept: "String Comparison",
    description: "Check if two words are anagrams!",
    expectedOutput: "listen and silent are anagrams: True",
    starterCode: "# Check if 'listen' and 'silent' are anagrams\ndef are_anagrams(word1, word2):\n    return sorted(___) == sorted(___)\n\nresult = are_anagrams('listen', 'silent')\nprint('listen and silent are anagrams:', result)",
    answerCode: "def are_anagrams(word1, word2):\n    return sorted(word1) == sorted(word2)\n\nresult = are_anagrams('listen', 'silent')\nprint('listen and silent are anagrams:', result)"
  },
  {
    id: 43,
    title: "Matrix Addition",
    level: "Moderate",
    concept: "2D Lists",
    description: "Add two 2x2 matrices together!",
    expectedOutput: "[[6, 8], [10, 12]]",
    starterCode: "# Add two 2x2 matrices\ndef add_matrices(m1, m2):\n    result = []\n    for i in range(len(m1)):\n        row = []\n        for j in range(len(m1[i])):\n            row.append(m1[i][j] ___ m2[i][j])\n        result.append(row)\n    return result\n\nmatrix1 = [[1, 2], [3, 4]]\nmatrix2 = [[5, 6], [7, 8]]\nresult = add_matrices(matrix1, matrix2)\nprint(result)",
    answerCode: "def add_matrices(m1, m2):\n    result = []\n    for i in range(len(m1)):\n        row = []\n        for j in range(len(m1[i])):\n            row.append(m1[i][j] + m2[i][j])\n        result.append(row)\n    return result\n\nmatrix1 = [[1, 2], [3, 4]]\nmatrix2 = [[5, 6], [7, 8]]\nresult = add_matrices(matrix1, matrix2)\nprint(result)"
  },
  {
    id: 44,
    title: "Caesar Cipher",
    level: "Moderate",
    concept: "Encryption",
    description: "Encrypt a message using Caesar cipher with shift 3!",
    expectedOutput: "Encrypted: khoor",
    starterCode: "# Encrypt 'hello' with Caesar cipher (shift 3)\ndef caesar_cipher(text, shift):\n    result = ''\n    for char in text:\n        if char.isalpha():\n            shifted = ord(char) + ___\n            if char.islower():\n                result += chr((shifted - ord('a')) % 26 + ord('a'))\n            else:\n                result += chr((shifted - ord('A')) % 26 + ord('A'))\n        else:\n            result += char\n    return result\n\nencrypted = caesar_cipher('hello', 3)\nprint('Encrypted:', encrypted)",
    answerCode: "def caesar_cipher(text, shift):\n    result = ''\n    for char in text:\n        if char.isalpha():\n            shifted = ord(char) + shift\n            if char.islower():\n                result += chr((shifted - ord('a')) % 26 + ord('a'))\n            else:\n                result += chr((shifted - ord('A')) % 26 + ord('A'))\n        else:\n            result += char\n    return result\n\nencrypted = caesar_cipher('hello', 3)\nprint('Encrypted:', encrypted)"
  },
  {
    id: 45,
    title: "Binary Converter",
    level: "Moderate",
    concept: "Number Systems",
    description: "Convert decimal 42 to binary!",
    expectedOutput: "42 in binary: 101010",
    starterCode: "# Convert 42 to binary\ndef decimal_to_binary(n):\n    if n == 0:\n        return '0'\n    binary = ''\n    while n > 0:\n        binary = str(n % ___) + binary\n        n = n // ___\n    return binary\n\nresult = decimal_to_binary(42)\nprint('42 in binary:', result)",
    answerCode: "def decimal_to_binary(n):\n    if n == 0:\n        return '0'\n    binary = ''\n    while n > 0:\n        binary = str(n % 2) + binary\n        n = n // 2\n    return binary\n\nresult = decimal_to_binary(42)\nprint('42 in binary:', result)"
  },

  // INTERMEDIATE LEVEL (46-60)
  {
    id: 46,
    title: "Class Builder",
    level: "Intermediate",
    concept: "Classes",
    description: "Create a Dog class with name and breed attributes!",
    expectedOutput: "Buddy is a Golden Retriever",
    starterCode: "# Create a Dog class\nclass Dog:\n    def __init__(self, ___, ___):\n        self.name = ___\n        self.breed = ___\n    \n    def introduce(self):\n        return f'{self.name} is a {self.breed}'\n\ndog = Dog('Buddy', 'Golden Retriever')\nprint(dog.introduce())",
    answerCode: "class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n    \n    def introduce(self):\n        return f'{self.name} is a {self.breed}'\n\ndog = Dog('Buddy', 'Golden Retriever')\nprint(dog.introduce())"
  },
  {
    id: 47,
    title: "Bank Account",
    level: "Intermediate",
    concept: "Class Methods",
    description: "Create a bank account that can deposit and withdraw money!",
    expectedOutput: "Balance: $150",
    starterCode: "# Create BankAccount class\nclass BankAccount:\n    def __init__(self, initial_balance=0):\n        self.balance = ___\n    \n    def deposit(self, amount):\n        self.balance ___ amount\n    \n    def withdraw(self, amount):\n        self.balance ___ amount\n    \n    def get_balance(self):\n        return f'Balance: ${self.balance}'\n\naccount = BankAccount(100)\naccount.deposit(75)\naccount.withdraw(25)\nprint(account.get_balance())",
    answerCode: "class BankAccount:\n    def __init__(self, initial_balance=0):\n        self.balance = initial_balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        self.balance -= amount\n    \n    def get_balance(self):\n        return f'Balance: ${self.balance}'\n\naccount = BankAccount(100)\naccount.deposit(75)\naccount.withdraw(25)\nprint(account.get_balance())"
  },
  {
    id: 48,
    title: "Inheritance Explorer",
    level: "Intermediate",
    concept: "Inheritance",
    description: "Create a Cat class that inherits from Animal!",
    expectedOutput: "Whiskers says: Meow!",
    starterCode: "# Animal and Cat classes with inheritance\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self, sound):\n        return f'{self.name} says: {sound}!'\n\nclass Cat(___):\n    def meow(self):\n        return self.___(___)\n\ncat = Cat('Whiskers')\nprint(cat.meow())",
    answerCode: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self, sound):\n        return f'{self.name} says: {sound}!'\n\nclass Cat(Animal):\n    def meow(self):\n        return self.speak('Meow')\n\ncat = Cat('Whiskers')\nprint(cat.meow())"
  },
  {
    id: 49,
    title: "Exception Handler",
    level: "Intermediate",
    concept: "Exception Handling",
    description: "Handle division by zero safely!",
    expectedOutput: "Error: Cannot divide by zero",
    starterCode: "# Safe division function\ndef safe_divide(a, b):\n    try:\n        result = a / b\n        return result\n    except ___:\n        return 'Error: Cannot divide by zero'\n\nresult = safe_divide(10, 0)\nprint(result)",
    answerCode: "def safe_divide(a, b):\n    try:\n        result = a / b\n        return result\n    except ZeroDivisionError:\n        return 'Error: Cannot divide by zero'\n\nresult = safe_divide(10, 0)\nprint(result)"
  },
  {
    id: 50,
    title: "File Reader",
    level: "Intermediate",
    concept: "File Operations",
    description: "Read and count lines in a text file!",
    expectedOutput: "File has 3 lines",
    starterCode: "# Count lines in a file\ndef count_lines(filename):\n    try:\n        with open(filename, ___) as file:\n            lines = file.___()\n            return f'File has {len(lines)} lines'\n    except FileNotFoundError:\n        return 'File not found'\n\n# Assuming file exists with 3 lines\nresult = count_lines('sample.txt')\nprint(result)",
    answerCode: "def count_lines(filename):\n    try:\n        with open(filename, 'r') as file:\n            lines = file.readlines()\n            return f'File has {len(lines)} lines'\n    except FileNotFoundError:\n        return 'File not found'\n\nresult = count_lines('sample.txt')\nprint(result)"
  },
  {
    id: 51,
    title: "List Comprehension Master",
    level: "Intermediate",
    concept: "List Comprehensions",
    description: "Create a list of squares for even numbers 1-10!",
    expectedOutput: "[4, 16, 36, 64, 100]",
    starterCode: "# Squares of even numbers 1-10\nsquares = [x**2 for x in range(1, 11) if x % 2 ___]\nprint(squares)",
    answerCode: "squares = [x**2 for x in range(1, 11) if x % 2 == 0]\nprint(squares)"
  },
  {
    id: 52,
    title: "Dictionary Comprehension",
    level: "Intermediate",
    concept: "Dictionary Comprehensions",
    description: "Create a dictionary mapping numbers to their squares!",
    expectedOutput: "{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}",
    starterCode: "# Dictionary of number: square pairs\nsquares_dict = {x: ___ for x in range(1, 6)}\nprint(squares_dict)",
    answerCode: "squares_dict = {x: x**2 for x in range(1, 6)}\nprint(squares_dict)"
  },
  {
    id: 53,
    title: "Lambda Function",
    level: "Intermediate",
    concept: "Lambda Functions",
    description: "Use lambda to sort a list of tuples by second element!",
    expectedOutput: "[('d', 1), ('b', 2), ('c', 3), ('a', 4)]",
    starterCode: "# Sort by second element of tuple\ndata = [('a', 4), ('b', 2), ('c', 3), ('d', 1)]\nsorted_data = sorted(data, key=lambda x: x[___])\nprint(sorted_data)",
    answerCode: "data = [('a', 4), ('b', 2), ('c', 3), ('d', 1)]\nsorted_data = sorted(data, key=lambda x: x[1])\nprint(sorted_data)"
  },
  {
    id: 54,
    title: "Map Filter Reduce",
    level: "Intermediate",
    concept: "Functional Programming",
    description: "Use map to square numbers and filter evens!",
    expectedOutput: "[4, 16, 36]",
    starterCode: "# Square and filter even results\nnumbers = [1, 2, 3, 4, 5, 6]\nsquared = list(map(lambda x: ___, numbers))\nevens = list(filter(lambda x: ___, squared))\nprint(evens)",
    answerCode: "numbers = [1, 2, 3, 4, 5, 6]\nsquared = list(map(lambda x: x**2, numbers))\nevens = list(filter(lambda x: x % 2 == 0, squared))\nprint(evens)"
  },
  {
    id: 55,
    title: "Generator Function",
    level: "Intermediate",
    concept: "Generators",
    description: "Create a generator that yields first n squares!",
    expectedOutput: "[0, 1, 4, 9, 16]",
    starterCode: "# Generator for first n squares\ndef square_generator(n):\n    for i in range(n):\n        yield ___\n\nsquares = list(square_generator(5))\nprint(squares)",
    answerCode: "def square_generator(n):\n    for i in range(n):\n        yield i**2\n\nsquares = list(square_generator(5))\nprint(squares)"
  },
  {
    id: 56,
    title: "Decorator Design",
    level: "Intermediate",
    concept: "Decorators",
    description: "Create a decorator that times function execution!",
    expectedOutput: "Function took 0.001 seconds",
    starterCode: "import time\n\n# Timer decorator\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = ___\n        end = time.time()\n        print(f'Function took {end-start:.3f} seconds')\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    time.sleep(0.001)\n    return 'Done'\n\nslow_function()",
    answerCode: "import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f'Function took {end-start:.3f} seconds')\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    time.sleep(0.001)\n    return 'Done'\n\nslow_function()"
  },
  {
    id: 57,
    title: "Context Manager",
    level: "Intermediate",
    concept: "Context Managers",
    description: "Create a context manager for timing code blocks!",
    expectedOutput: "Block executed in 0.001 seconds",
    starterCode: "import time\nfrom contextlib import contextmanager\n\n# Timer context manager\n@contextmanager\ndef timer():\n    start = time.time()\n    yield\n    end = time.time()\n    print(f'Block executed in {___-___:.3f} seconds')\n\nwith timer():\n    time.sleep(0.001)",
    answerCode: "import time\nfrom contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    start = time.time()\n    yield\n    end = time.time()\n    print(f'Block executed in {end-start:.3f} seconds')\n\nwith timer():\n    time.sleep(0.001)"
  },
  {
    id: 58,
    title: "Regular Expression",
    level: "Intermediate",
    concept: "Regular Expressions",
    description: "Extract all email addresses from text!",
    expectedOutput: "['test@example.com', 'user@domain.org']",
    starterCode: "import re\n\n# Extract emails from text\ntext = 'Contact test@example.com or user@domain.org for help'\npattern = r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'\nemails = re.___(pattern, text)\nprint(emails)",
    answerCode: "import re\n\ntext = 'Contact test@example.com or user@domain.org for help'\npattern = r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'\nemails = re.findall(pattern, text)\nprint(emails)"
  },
  {
    id: 59,
    title: "JSON Parser",
    level: "Intermediate",
    concept: "JSON Handling",
    description: "Parse JSON and extract specific values!",
    expectedOutput: "Name: Alice, Age: 30",
    starterCode: "import json\n\n# Parse JSON data\njson_data = '{\"name\": \"Alice\", \"age\": 30, \"city\": \"New York\"}'\ndata = json.___(json_data)\nprint(f\"Name: {data[___]}, Age: {data[___]}\")",
    answerCode: "import json\n\njson_data = '{\"name\": \"Alice\", \"age\": 30, \"city\": \"New York\"}'\ndata = json.loads(json_data)\nprint(f\"Name: {data['name']}, Age: {data['age']}\")"
  },
  {
    id: 60,
    title: "Thread Pool",
    level: "Intermediate",
    concept: "Threading",
    description: "Use threading to execute tasks concurrently!",
    expectedOutput: "All tasks completed",
    starterCode: "import threading\nimport time\n\n# Worker function\ndef worker(name):\n    print(f'Worker {name} starting')\n    time.sleep(1)\n    print(f'Worker {name} finished')\n\n# Create threads\nthreads = []\nfor i in range(3):\n    t = threading.___(target=worker, args=(i,))\n    threads.append(t)\n    t.___()\n\nfor t in threads:\n    t.___()\n\nprint('All tasks completed')",
    answerCode: "import threading\nimport time\n\ndef worker(name):\n    print(f'Worker {name} starting')\n    time.sleep(1)\n    print(f'Worker {name} finished')\n\nthreads = []\nfor i in range(3):\n    t = threading.Thread(target=worker, args=(i,))\n    threads.append(t)\n    t.start()\n\nfor t in threads:\n    t.join()\n\nprint('All tasks completed')"
  },

  // HARD LEVEL (61-75)
  {
    id: 61,
    title: "Abstract Factory",
    level: "Hard",
    concept: "Design Patterns",
    description: "Implement the Abstract Factory pattern!",
    expectedOutput: "Creating Windows Button",
    starterCode: "from abc import ABC, abstractmethod\n\n# Abstract factory pattern\nclass GUIFactory(ABC):\n    @abstractmethod\n    def create_button(self):\n        pass\n\nclass WindowsFactory(GUIFactory):\n    def create_button(self):\n        return ___\n\nclass WindowsButton:\n    def render(self):\n        return 'Creating Windows Button'\n\nfactory = WindowsFactory()\nbutton = factory.create_button()\nprint(button.render())",
    answerCode: "from abc import ABC, abstractmethod\n\nclass GUIFactory(ABC):\n    @abstractmethod\n    def create_button(self):\n        pass\n\nclass WindowsFactory(GUIFactory):\n    def create_button(self):\n        return WindowsButton()\n\nclass WindowsButton:\n    def render(self):\n        return 'Creating Windows Button'\n\nfactory = WindowsFactory()\nbutton = factory.create_button()\nprint(button.render())"
  },
  {
    id: 62,
    title: "Binary Search Tree",
    level: "Hard",
    concept: "Data Structures",
    description: "Implement a Binary Search Tree with insert and search!",
    expectedOutput: "Found 15: True",
    starterCode: "# Binary Search Tree implementation\nclass TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, val):\n        if not self.root:\n            self.root = TreeNode(val)\n        else:\n            self._insert_recursive(self.root, val)\n    \n    def _insert_recursive(self, node, val):\n        if val < node.val:\n            if node.left:\n                self._insert_recursive(___, val)\n            else:\n                node.left = TreeNode(val)\n        else:\n            if node.right:\n                self._insert_recursive(___, val)\n            else:\n                node.right = TreeNode(val)\n    \n    def search(self, val):\n        return self._search_recursive(self.root, val)\n    \n    def _search_recursive(self, node, val):\n        if not node:\n            return False\n        if node.val == val:\n            return True\n        elif val < node.val:\n            return self._search_recursive(___, val)\n        else:\n            return self._search_recursive(___, val)\n\nbst = BST()\nbst.insert(10)\nbst.insert(5)\nbst.insert(15)\nprint('Found 15:', bst.search(15))",
    answerCode: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, val):\n        if not self.root:\n            self.root = TreeNode(val)\n        else:\n            self._insert_recursive(self.root, val)\n    \n    def _insert_recursive(self, node, val):\n        if val < node.val:\n            if node.left:\n                self._insert_recursive(node.left, val)\n            else:\n                node.left = TreeNode(val)\n        else:\n            if node.right:\n                self._insert_recursive(node.right, val)\n            else:\n                node.right = TreeNode(val)\n    \n    def search(self, val):\n        return self._search_recursive(self.root, val)\n    \n    def _search_recursive(self, node, val):\n        if not node:\n            return False\n        if node.val == val:\n            return True\n        elif val < node.val:\n            return self._search_recursive(node.left, val)\n        else:\n            return self._search_recursive(node.right, val)\n\nbst = BST()\nbst.insert(10)\nbst.insert(5)\nbst.insert(15)\nprint('Found 15:', bst.search(15))"
  },
  {
    id: 63,
    title: "Graph Traversal",
    level: "Hard",
    concept: "Graph Algorithms",
    description: "Implement Breadth-First Search on a graph!",
    expectedOutput: "BFS traversal: [0, 1, 2, 3, 4]",
    starterCode: "from collections import deque\n\n# BFS implementation\nclass Graph:\n    def __init__(self):\n        self.graph = {}\n    \n    def add_edge(self, u, v):\n        if u not in self.graph:\n            self.graph[u] = []\n        self.graph[u].append(v)\n    \n    def bfs(self, start):\n        visited = set()\n        queue = deque([___])\n        result = []\n        \n        while queue:\n            node = queue.___\n            if node not in visited:\n                visited.add(node)\n                result.append(node)\n                \n                for neighbor in self.graph.get(node, []):\n                    if neighbor not in visited:\n                        queue.___(neighbor)\n        \n        return result\n\ng = Graph()\ng.add_edge(0, 1)\ng.add_edge(0, 2)\ng.add_edge(1, 3)\ng.add_edge(2, 4)\nprint('BFS traversal:', g.bfs(0))",
    answerCode: "from collections import deque\n\nclass Graph:\n    def __init__(self):\n        self.graph = {}\n    \n    def add_edge(self, u, v):\n        if u not in self.graph:\n            self.graph[u] = []\n        self.graph[u].append(v)\n    \n    def bfs(self, start):\n        visited = set()\n        queue = deque([start])\n        result = []\n        \n        while queue:\n            node = queue.popleft()\n            if node not in visited:\n                visited.add(node)\n                result.append(node)\n                \n                for neighbor in self.graph.get(node, []):\n                    if neighbor not in visited:\n                        queue.append(neighbor)\n        \n        return result\n\ng = Graph()\ng.add_edge(0, 1)\ng.add_edge(0, 2)\ng.add_edge(1, 3)\ng.add_edge(2, 4)\nprint('BFS traversal:', g.bfs(0))"
  },
  {
    id: 64,
    title: "Dynamic Programming",
    level: "Hard",
    concept: "Dynamic Programming",
    description: "Solve the coin change problem using dynamic programming!",
    expectedOutput: "Minimum coins for 11: 3",
    starterCode: "# Coin change problem\ndef min_coins(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = ___\n    \n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i:\n                dp[i] = min(dp[i], dp[___] + ___)\n    \n    return dp[amount] if dp[amount] != float('inf') else -1\n\ncoins = [1, 3, 4]\namount = 11\nresult = min_coins(coins, amount)\nprint(f'Minimum coins for {amount}: {result}')",
    answerCode: "def min_coins(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    \n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n    \n    return dp[amount] if dp[amount] != float('inf') else -1\n\ncoins = [1, 3, 4]\namount = 11\nresult = min_coins(coins, amount)\nprint(f'Minimum coins for {amount}: {result}')"
  },
  {
    id: 65,
    title: "Quick Sort",
    level: "Hard",
    concept: "Advanced Sorting",
    description: "Implement the Quick Sort algorithm!",
    expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
    starterCode: "# Quick Sort implementation\ndef quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, ___)\n        quick_sort(arr, ___, high)\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    \n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = ___, ___\n    \n    arr[i + 1], arr[high] = ___, ___\n    return i + 1\n\narr = [3, 6, 8, 10, 1, 2, 1]\nquick_sort(arr, 0, len(arr) - 1)\nprint(arr)",
    answerCode: "def quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    \n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    \n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return i + 1\n\narr = [3, 6, 8, 10, 1, 2, 1]\nquick_sort(arr, 0, len(arr) - 1)\nprint(arr)"
  },
  {
    id: 66,
    title: "LRU Cache",
    level: "Hard",
    concept: "Caching",
    description: "Implement a Least Recently Used (LRU) cache!",
    expectedOutput: "Cache miss: fetching data for key1",
    starterCode: "from collections import OrderedDict\n\n# LRU Cache implementation\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n    \n    def get(self, key):\n        if key in self.cache:\n            # Move to end (most recently used)\n            self.cache.move_to_end(key)\n            return self.cache[key]\n        return None\n    \n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        elif len(self.cache) >= self.capacity:\n            # Remove least recently used\n            self.cache.popitem(___)\n        \n        self.cache[key] = value\n\ncache = LRUCache(2)\ncache.put('key1', 'value1')\nresult = cache.get('key2')\nif result is None:\n    print('Cache miss: fetching data for key2')",
    answerCode: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n    \n    def get(self, key):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n            return self.cache[key]\n        return None\n    \n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        elif len(self.cache) >= self.capacity:\n            self.cache.popitem(last=False)\n        \n        self.cache[key] = value\n\ncache = LRUCache(2)\ncache.put('key1', 'value1')\nresult = cache.get('key2')\nif result is None:\n    print('Cache miss: fetching data for key2')"
  },
  {
    id: 67,
    title: "Observer Pattern",
    level: "Hard",
    concept: "Design Patterns",
    description: "Implement the Observer pattern for event handling!",
    expectedOutput: "Observer 1 notified with: Hello World",
    starterCode: "# Observer pattern implementation\nclass Subject:\n    def __init__(self):\n        self._observers = []\n    \n    def attach(self, observer):\n        self._observers.append(observer)\n    \n    def notify(self, message):\n        for observer in self._observers:\n            observer.___(message)\n\nclass Observer:\n    def __init__(self, name):\n        self.name = name\n    \n    def update(self, message):\n        print(f'Observer {self.name} notified with: {message}')\n\nsubject = Subject()\nobserver1 = Observer('1')\nsubject.attach(observer1)\nsubject.notify('Hello World')",
    answerCode: "class Subject:\n    def __init__(self):\n        self._observers = []\n    \n    def attach(self, observer):\n        self._observers.append(observer)\n    \n    def notify(self, message):\n        for observer in self._observers:\n            observer.update(message)\n\nclass Observer:\n    def __init__(self, name):\n        self.name = name\n    \n    def update(self, message):\n        print(f'Observer {self.name} notified with: {message}')\n\nsubject = Subject()\nobserver1 = Observer('1')\nsubject.attach(observer1)\nsubject.notify('Hello World')"
  },
  {
    id: 68,
    title: "Heap Implementation",
    level: "Hard",
    concept: "Data Structures",
    description: "Implement a Min Heap data structure!",
    expectedOutput: "Min element: 1",
    starterCode: "# Min Heap implementation\nclass MinHeap:\n    def __init__(self):\n        self.heap = []\n    \n    def parent(self, i):\n        return (i - 1) // 2\n    \n    def left_child(self, i):\n        return 2 * i + 1\n    \n    def right_child(self, i):\n        return 2 * i + 2\n    \n    def insert(self, value):\n        self.heap.append(value)\n        self._heapify_up(len(self.heap) - 1)\n    \n    def _heapify_up(self, i):\n        while i > 0 and self.heap[i] < self.heap[self.parent(i)]:\n            self.heap[i], self.heap[self.parent(i)] = ___, ___\n            i = self.parent(i)\n    \n    def get_min(self):\n        return self.heap[0] if self.heap else None\n\nheap = MinHeap()\nheap.insert(3)\nheap.insert(1)\nheap.insert(2)\nprint('Min element:', heap.get_min())",
    answerCode: "class MinHeap:\n    def __init__(self):\n        self.heap = []\n    \n    def parent(self, i):\n        return (i - 1) // 2\n    \n    def left_child(self, i):\n        return 2 * i + 1\n    \n    def right_child(self, i):\n        return 2 * i + 2\n    \n    def insert(self, value):\n        self.heap.append(value)\n        self._heapify_up(len(self.heap) - 1)\n    \n    def _heapify_up(self, i):\n        while i > 0 and self.heap[i] < self.heap[self.parent(i)]:\n            self.heap[i], self.heap[self.parent(i)] = self.heap[self.parent(i)], self.heap[i]\n            i = self.parent(i)\n    \n    def get_min(self):\n        return self.heap[0] if self.heap else None\n\nheap = MinHeap()\nheap.insert(3)\nheap.insert(1)\nheap.insert(2)\nprint('Min element:', heap.get_min())"
  },
  {
    id: 69,
    title: "Async Programming",
    level: "Hard",
    concept: "Asynchronous Programming",
    description: "Implement async functions with await!",
    expectedOutput: "Async task completed",
    starterCode: "import asyncio\n\n# Async function implementation\nasync def fetch_data(delay):\n    print('Fetching data...')\n    await asyncio.___(delay)\n    return 'Data fetched'\n\nasync def main():\n    result = await fetch_data(1)\n    print(result)\n    print('Async task completed')\n\n# Run the async function\nasyncio.run(main())",
    answerCode: "import asyncio\n\nasync def fetch_data(delay):\n    print('Fetching data...')\n    await asyncio.sleep(delay)\n    return 'Data fetched'\n\nasync def main():\n    result = await fetch_data(1)\n    print(result)\n    print('Async task completed')\n\nasyncio.run(main())"
  },
  {
    id: 70,
    title: "Metaclass Magic",
    level: "Hard",
    concept: "Metaclasses",
    description: "Create a metaclass that adds a method to all instances!",
    expectedOutput: "MyClass says hello",
    starterCode: "# Metaclass implementation\nclass HelloMeta(type):\n    def __new__(cls, name, bases, attrs):\n        attrs['say_hello'] = lambda self: f'{name} says hello'\n        return super().__new__(cls, name, bases, attrs)\n\nclass MyClass(metaclass=___):\n    pass\n\nobj = MyClass()\nprint(obj.say_hello())",
    answerCode: "class HelloMeta(type):\n    def __new__(cls, name, bases, attrs):\n        attrs['say_hello'] = lambda self: f'{name} says hello'\n        return super().__new__(cls, name, bases, attrs)\n\nclass MyClass(metaclass=HelloMeta):\n    pass\n\nobj = MyClass()\nprint(obj.say_hello())"
  },
  {
    id: 71,
    title: "Memory Profiler",
    level: "Hard",
    concept: "Performance Optimization",
    description: "Profile memory usage of a function!",
    expectedOutput: "Memory usage: 1000 bytes",
    starterCode: "import sys\n\n# Memory profiling\ndef memory_usage(func):\n    def wrapper(*args, **kwargs):\n        before = sys.getsizeof(locals())\n        result = func(*args, **kwargs)\n        after = sys.getsizeof(___)\n        print(f'Memory usage: {after - before} bytes')\n        return result\n    return wrapper\n\n@memory_usage\ndef create_list():\n    return list(range(1000))\n\ncreate_list()",
    answerCode: "import sys\n\ndef memory_usage(func):\n    def wrapper(*args, **kwargs):\n        before = sys.getsizeof(locals())\n        result = func(*args, **kwargs)\n        after = sys.getsizeof(result)\n        print(f'Memory usage: {after - before} bytes')\n        return result\n    return wrapper\n\n@memory_usage\ndef create_list():\n    return list(range(1000))\n\ncreate_list()"
  },
  {
    id: 72,
    title: "Coroutine Pipeline",
    level: "Hard",
    concept: "Coroutines",
    description: "Create a data processing pipeline using coroutines!",
    expectedOutput: "Processing: 1, 4, 9",
    starterCode: "# Coroutine pipeline\ndef coroutine(func):\n    def wrapper(*args, **kwargs):\n        cr = func(*args, **kwargs)\n        next(cr)\n        return cr\n    return wrapper\n\n@coroutine\ndef squarer(target):\n    while True:\n        value = (yield)\n        target.send(value ** 2)\n\n@coroutine\ndef printer():\n    while True:\n        value = (yield)\n        print(f'Processing: {value}', end=', ')\n\npipeline = squarer(printer())\nfor i in [1, 2, 3]:\n    pipeline.___(i)",
    answerCode: "def coroutine(func):\n    def wrapper(*args, **kwargs):\n        cr = func(*args, **kwargs)\n        next(cr)\n        return cr\n    return wrapper\n\n@coroutine\ndef squarer(target):\n    while True:\n        value = (yield)\n        target.send(value ** 2)\n\n@coroutine\ndef printer():\n    while True:\n        value = (yield)\n        print(f'Processing: {value}', end=', ')\n\npipeline = squarer(printer())\nfor i in [1, 2, 3]:\n    pipeline.send(i)"
  },
  {
    id: 73,
    title: "Custom Iterator",
    level: "Hard",
    concept: "Iterators",
    description: "Create a custom iterator for even numbers!",
    expectedOutput: "0 2 4 6 8",
    starterCode: "# Custom iterator for even numbers\nclass EvenNumbers:\n    def __init__(self, limit):\n        self.limit = limit\n        self.current = 0\n    \n    def __iter__(self):\n        return ___\n    \n    def __next__(self):\n        if self.current < self.limit:\n            result = self.current\n            self.current += ___\n            return result\n        else:\n            raise ___\n\nfor num in EvenNumbers(10):\n    print(num, end=' ')",
    answerCode: "class EvenNumbers:\n    def __init__(self, limit):\n        self.limit = limit\n        self.current = 0\n    \n    def __iter__(self):\n        return self\n    \n    def __next__(self):\n        if self.current < self.limit:\n            result = self.current\n            self.current += 2\n            return result\n        else:\n            raise StopIteration\n\nfor num in EvenNumbers(10):\n    print(num, end=' ')"
  },
  {
    id: 74,
    title: "Singleton Pattern",
    level: "Hard",
    concept: "Design Patterns",
    description: "Implement the Singleton pattern!",
    expectedOutput: "Same instance: True",
    starterCode: "# Singleton pattern implementation\nclass Singleton:\n    _instance = None\n    \n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return ___\n    \n    def __init__(self):\n        if not hasattr(self, 'initialized'):\n            self.data = 'Singleton Data'\n            self.initialized = True\n\ns1 = Singleton()\ns2 = Singleton()\nprint('Same instance:', s1 is s2)",
    answerCode: "class Singleton:\n    _instance = None\n    \n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n    \n    def __init__(self):\n        if not hasattr(self, 'initialized'):\n            self.data = 'Singleton Data'\n            self.initialized = True\n\ns1 = Singleton()\ns2 = Singleton()\nprint('Same instance:', s1 is s2)"
  },
  {
    id: 75,
    title: "Trie Data Structure",
    level: "Hard",
    concept: "Advanced Data Structures",
    description: "Implement a Trie for word storage and search!",
    expectedOutput: "Word 'cat' found: True",
    starterCode: "# Trie implementation\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end_word = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    \n    def insert(self, word):\n        node = self.root\n        for char in word:\n            if char not in node.children:\n                node.children[char] = TrieNode()\n            node = node.children[char]\n        node.is_end_word = ___\n    \n    def search(self, word):\n        node = self.root\n        for char in word:\n            if char not in node.children:\n                return False\n            node = node.children[char]\n        return node.___\n\ntrie = Trie()\ntrie.insert('cat')\ntrie.insert('car')\nprint(\"Word 'cat' found:\", trie.search('cat'))",
    answerCode: "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end_word = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    \n    def insert(self, word):\n        node = self.root\n        for char in word:\n            if char not in node.children:\n                node.children[char] = TrieNode()\n            node = node.children[char]\n        node.is_end_word = True\n    \n    def search(self, word):\n        node = self.root\n        for char in word:\n            if char not in node.children:\n                return False\n            node = node.children[char]\n        return node.is_end_word\n\ntrie = Trie()\ntrie.insert('cat')\ntrie.insert('car')\nprint(\"Word 'cat' found:\", trie.search('cat'))"
  },

  // ADVANCED LEVEL (76-90)
  {
    id: 76,
    title: "Database ORM",
    level: "Advanced",
    concept: "Object-Relational Mapping",
    description: "Create a simple ORM for database operations!",
    expectedOutput: "User saved: Alice",
    starterCode: "# Simple ORM implementation\nclass Model:\n    def __init__(self):\n        self._data = {}\n    \n    def save(self):\n        print(f'{self.__class__.__name__} saved: {self._data}')\n    \n    def __setattr__(self, name, value):\n        if name.startswith('_'):\n            super().__setattr__(name, value)\n        else:\n            if not hasattr(self, '_data'):\n                super().__setattr__('_data', {})\n            self._data[name] = value\n    \n    def __getattr__(self, name):\n        return self._data.get(name)\n\nclass User(___):\n    pass\n\nuser = User()\nuser.name = 'Alice'\nuser.save()",
    answerCode: "class Model:\n    def __init__(self):\n        self._data = {}\n    \n    def save(self):\n        print(f'{self.__class__.__name__} saved: {self._data}')\n    \n    def __setattr__(self, name, value):\n        if name.startswith('_'):\n            super().__setattr__(name, value)\n        else:\n            if not hasattr(self, '_data'):\n                super().__setattr__('_data', {})\n            self._data[name] = value\n    \n    def __getattr__(self, name):\n        return self._data.get(name)\n\nclass User(Model):\n    pass\n\nuser = User()\nuser.name = 'Alice'\nuser.save()"
  },
  {
    id: 77,
    title: "Web Scraper",
    level: "Advanced",
    concept: "Web Scraping",
    description: "Create a web scraper with error handling!",
    expectedOutput: "Page title extracted",
    starterCode: "import requests\nfrom bs4 import BeautifulSoup\n\n# Web scraper implementation\nclass WebScraper:\n    def __init__(self, base_url):\n        self.base_url = base_url\n        self.session = requests.Session()\n    \n    def get_page_title(self, url):\n        try:\n            response = self.session.___(url)\n            response.raise_for_status()\n            soup = BeautifulSoup(response.text, 'html.parser')\n            title = soup.find('title')\n            return title.text if title else 'No title found'\n        except requests.RequestException as e:\n            return f'Error: {e}'\n\n# Simulated usage\nscraper = WebScraper('https://example.com')\nprint('Page title extracted')",
    answerCode: "import requests\nfrom bs4 import BeautifulSoup\n\nclass WebScraper:\n    def __init__(self, base_url):\n        self.base_url = base_url\n        self.session = requests.Session()\n    \n    def get_page_title(self, url):\n        try:\n            response = self.session.get(url)\n            response.raise_for_status()\n            soup = BeautifulSoup(response.text, 'html.parser')\n            title = soup.find('title')\n            return title.text if title else 'No title found'\n        except requests.RequestException as e:\n            return f'Error: {e}'\n\nscraper = WebScraper('https://example.com')\nprint('Page title extracted')"
  },
  {
    id: 78,
    title: "Neural Network",
    level: "Advanced",
    concept: "Machine Learning",
    description: "Implement a simple neural network from scratch!",
    expectedOutput: "Neural network trained",
    starterCode: "import numpy as np\n\n# Simple neural network\nclass NeuralNetwork:\n    def __init__(self, input_size, hidden_size, output_size):\n        self.W1 = np.random.randn(input_size, hidden_size)\n        self.W2 = np.random.randn(hidden_size, output_size)\n    \n    def sigmoid(self, x):\n        return 1 / (1 + np.exp(-x))\n    \n    def forward(self, X):\n        self.z1 = np.dot(X, self.W1)\n        self.a1 = self.sigmoid(self.z1)\n        self.z2 = np.dot(self.a1, self.W2)\n        return self.sigmoid(___)\n    \n    def train(self, X, y, epochs):\n        for _ in range(epochs):\n            output = self.forward(X)\n            # Simplified training step\n            pass\n        print('Neural network trained')\n\nnn = NeuralNetwork(2, 3, 1)\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\ny = np.array([[0], [1], [1], [0]])\nnn.train(X, y, 1000)",
    answerCode: "import numpy as np\n\nclass NeuralNetwork:\n    def __init__(self, input_size, hidden_size, output_size):\n        self.W1 = np.random.randn(input_size, hidden_size)\n        self.W2 = np.random.randn(hidden_size, output_size)\n    \n    def sigmoid(self, x):\n        return 1 / (1 + np.exp(-x))\n    \n    def forward(self, X):\n        self.z1 = np.dot(X, self.W1)\n        self.a1 = self.sigmoid(self.z1)\n        self.z2 = np.dot(self.a1, self.W2)\n        return self.sigmoid(self.z2)\n    \n    def train(self, X, y, epochs):\n        for _ in range(epochs):\n            output = self.forward(X)\n            # Simplified training step\n            pass\n        print('Neural network trained')\n\nnn = NeuralNetwork(2, 3, 1)\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\ny = np.array([[0], [1], [1], [0]])\nnn.train(X, y, 1000)"
  },
  {
    id: 79,
    title: "Blockchain Simulator",
    level: "Advanced",
    concept: "Blockchain Technology",
    description: "Create a simple blockchain with proof of work!",
    expectedOutput: "Block mined: 000abc123",
    starterCode: "import hashlib\nimport time\n\n# Blockchain implementation\nclass Block:\n    def __init__(self, data, previous_hash):\n        self.timestamp = time.time()\n        self.data = data\n        self.previous_hash = previous_hash\n        self.nonce = 0\n        self.hash = self.calculate_hash()\n    \n    def calculate_hash(self):\n        block_string = f'{self.timestamp}{self.data}{self.previous_hash}{self.nonce}'\n        return hashlib.sha256(block_string.encode()).hexdigest()\n    \n    def mine_block(self, difficulty):\n        target = '0' * difficulty\n        while self.hash[:difficulty] != target:\n            self.nonce += 1\n            self.hash = self.___\n        print(f'Block mined: {self.hash[:9]}')\n\nclass Blockchain:\n    def __init__(self):\n        self.chain = [self.create_genesis_block()]\n        self.difficulty = 3\n    \n    def create_genesis_block(self):\n        return Block('Genesis Block', '0')\n    \n    def add_block(self, data):\n        previous_block = self.chain[-1]\n        new_block = Block(data, previous_block.hash)\n        new_block.___(self.difficulty)\n        self.chain.append(new_block)\n\nblockchain = Blockchain()\nblockchain.add_block('Transaction 1')",
    answerCode: "import hashlib\nimport time\n\nclass Block:\n    def __init__(self, data, previous_hash):\n        self.timestamp = time.time()\n        self.data = data\n        self.previous_hash = previous_hash\n        self.nonce = 0\n        self.hash = self.calculate_hash()\n    \n    def calculate_hash(self):\n        block_string = f'{self.timestamp}{self.data}{self.previous_hash}{self.nonce}'\n        return hashlib.sha256(block_string.encode()).hexdigest()\n    \n    def mine_block(self, difficulty):\n        target = '0' * difficulty\n        while self.hash[:difficulty] != target:\n            self.nonce += 1\n            self.hash = self.calculate_hash()\n        print(f'Block mined: {self.hash[:9]}')\n\nclass Blockchain:\n    def __init__(self):\n        self.chain = [self.create_genesis_block()]\n        self.difficulty = 3\n    \n    def create_genesis_block(self):\n        return Block('Genesis Block', '0')\n    \n    def add_block(self, data):\n        previous_block = self.chain[-1]\n        new_block = Block(data, previous_block.hash)\n        new_block.mine_block(self.difficulty)\n        self.chain.append(new_block)\n\nblockchain = Blockchain()\nblockchain.add_block('Transaction 1')"
  },
  {
    id: 80,
    title: "Chat Server",
    level: "Advanced",
    concept: "Network Programming",
    description: "Create a multi-client chat server using sockets!",
    expectedOutput: "Chat server started on port 8888",
    starterCode: "import socket\nimport threading\n\n# Chat server implementation\nclass ChatServer:\n    def __init__(self, host='localhost', port=8888):\n        self.host = host\n        self.port = port\n        self.clients = []\n        self.nicknames = []\n    \n    def broadcast(self, message):\n        for client in self.clients:\n            try:\n                client.___(message)\n            except:\n                self.remove_client(client)\n    \n    def remove_client(self, client):\n        if client in self.clients:\n            index = self.clients.index(client)\n            self.clients.remove(client)\n            nickname = self.nicknames[index]\n            self.nicknames.remove(nickname)\n            self.broadcast(f'{nickname} left the chat'.encode('utf-8'))\n            client.close()\n    \n    def handle_client(self, client):\n        while True:\n            try:\n                message = client.recv(1024)\n                self.broadcast(message)\n            except:\n                self.remove_client(client)\n                break\n    \n    def start_server(self):\n        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        server.bind((self.host, self.port))\n        server.listen()\n        print(f'Chat server started on port {self.port}')\n\nchat_server = ChatServer()\nchat_server.start_server()",
    answerCode: "import socket\nimport threading\n\nclass ChatServer:\n    def __init__(self, host='localhost', port=8888):\n        self.host = host\n        self.port = port\n        self.clients = []\n        self.nicknames = []\n    \n    def broadcast(self, message):\n        for client in self.clients:\n            try:\n                client.send(message)\n            except:\n                self.remove_client(client)\n    \n    def remove_client(self, client):\n        if client in self.clients:\n            index = self.clients.index(client)\n            self.clients.remove(client)\n            nickname = self.nicknames[index]\n            self.nicknames.remove(nickname)\n            self.broadcast(f'{nickname} left the chat'.encode('utf-8'))\n            client.close()\n    \n    def handle_client(self, client):\n        while True:\n            try:\n                message = client.recv(1024)\n                self.broadcast(message)\n            except:\n                self.remove_client(client)\n                break\n    \n    def start_server(self):\n        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        server.bind((self.host, self.port))\n        server.listen()\n        print(f'Chat server started on port {self.port}')\n\nchat_server = ChatServer()\nchat_server.start_server()"
  },
  {
    id: 81,
    title: "Data Pipeline",
    level: "Advanced",
    concept: "Data Engineering",
    description: "Build a data processing pipeline with transformations!",
    expectedOutput: "Pipeline processed 1000 records",
    starterCode: "from functools import reduce\n\n# Data pipeline implementation\nclass DataPipeline:\n    def __init__(self):\n        self.transformations = []\n    \n    def add_transformation(self, func):\n        self.transformations.append(func)\n        return self\n    \n    def process(self, data):\n        return reduce(lambda d, func: func(d), self.transformations, data)\n\n# Sample transformations\ndef filter_positive(data):\n    return [x for x in data if x > 0]\n\ndef multiply_by_two(data):\n    return [x * 2 for x in data]\n\ndef sum_all(data):\n    return sum(data)\n\n# Create pipeline\npipeline = DataPipeline()\npipeline.___(filter_positive).___(multiply_by_two).___(sum_all)\n\nresult = pipeline.process([-1, 2, -3, 4, 5])\nprint(f'Pipeline processed {len([x for x in [-1, 2, -3, 4, 5] if x > 0])} records')",
    answerCode: "from functools import reduce\n\nclass DataPipeline:\n    def __init__(self):\n        self.transformations = []\n    \n    def add_transformation(self, func):\n        self.transformations.append(func)\n        return self\n    \n    def process(self, data):\n        return reduce(lambda d, func: func(d), self.transformations, data)\n\ndef filter_positive(data):\n    return [x for x in data if x > 0]\n\ndef multiply_by_two(data):\n    return [x * 2 for x in data]\n\ndef sum_all(data):\n    return sum(data)\n\npipeline = DataPipeline()\npipeline.add_transformation(filter_positive).add_transformation(multiply_by_two).add_transformation(sum_all)\n\nresult = pipeline.process([-1, 2, -3, 4, 5])\nprint(f'Pipeline processed {len([x for x in [-1, 2, -3, 4, 5] if x > 0])} records')"
  },
  {
    id: 82,
    title: "Microservice Architecture",
    level: "Advanced",
    concept: "Microservices",
    description: "Create a simple microservice with REST API!",
    expectedOutput: "User service started on port 5000",
    starterCode: "from flask import Flask, jsonify, request\n\n# Microservice implementation\nclass UserService:\n    def __init__(self):\n        self.app = Flask(__name__)\n        self.users = {}\n        self.setup_routes()\n    \n    def setup_routes(self):\n        @self.app.route('/users', methods=['GET'])\n        def get_users():\n            return jsonify(self.users)\n        \n        @self.app.route('/users', methods=['POST'])\n        def create_user():\n            user_data = request.json\n            user_id = len(self.users) + 1\n            self.users[user_id] = user_data\n            return jsonify({'id': user_id, 'user': user_data}), 201\n        \n        @self.app.route('/health', methods=['GET'])\n        def health_check():\n            return jsonify({'status': 'healthy'})\n    \n    def run(self, port=5000):\n        print(f'User service started on port {port}')\n        # self.app.run(port=port)  # Commented out for demo\n\nuser_service = UserService()\nuser_service.run()",
    answerCode: "from flask import Flask, jsonify, request\n\nclass UserService:\n    def __init__(self):\n        self.app = Flask(__name__)\n        self.users = {}\n        self.setup_routes()\n    \n    def setup_routes(self):\n        @self.app.route('/users', methods=['GET'])\n        def get_users():\n            return jsonify(self.users)\n        \n        @self.app.route('/users', methods=['POST'])\n        def create_user():\n            user_data = request.json\n            user_id = len(self.users) + 1\n            self.users[user_id] = user_data\n            return jsonify({'id': user_id, 'user': user_data}), 201\n        \n        @self.app.route('/health', methods=['GET'])\n        def health_check():\n            return jsonify({'status': 'healthy'})\n    \n    def run(self, port=5000):\n        print(f'User service started on port {port}')\n        # self.app.run(port=port)\n\nuser_service = UserService()\nuser_service.run()"
  },
  {
    id: 83,
    title: "Distributed Cache",
    level: "Advanced",
    concept: "Distributed Systems",
    description: "Implement a distributed cache with consistent hashing!",
    expectedOutput: "Cache distributed across 3 nodes",
    starterCode: "import hashlib\n\n# Distributed cache implementation\nclass ConsistentHash:\n    def __init__(self, nodes=None, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        \n        if nodes:\n            for node in nodes:\n                self.add_node(node)\n    \n    def _hash(self, key):\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n    \n    def add_node(self, node):\n        for i in range(self.replicas):\n            key = self._hash(f'{node}:{i}')\n            self.ring[key] = node\n            self.sorted_keys.append(key)\n        self.sorted_keys.sort()\n    \n    def get_node(self, key):\n        if not self.ring:\n            return None\n        \n        hash_key = self._hash(key)\n        for ring_key in self.sorted_keys:\n            if hash_key <= ring_key:\n                return self.ring[ring_key]\n        return self.ring[self.sorted_keys[0]]\n\nclass DistributedCache:\n    def __init__(self, nodes):\n        self.hash_ring = ConsistentHash(nodes)\n        self.caches = {node: {} for node in nodes}\n    \n    def put(self, key, value):\n        node = self.hash_ring.___(key)\n        self.caches[node][key] = value\n    \n    def get(self, key):\n        node = self.hash_ring.___(key)\n        return self.caches[node].get(key)\n\ncache = DistributedCache(['node1', 'node2', 'node3'])\nprint('Cache distributed across 3 nodes')",
    answerCode: "import hashlib\n\nclass ConsistentHash:\n    def __init__(self, nodes=None, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        \n        if nodes:\n            for node in nodes:\n                self.add_node(node)\n    \n    def _hash(self, key):\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n    \n    def add_node(self, node):\n        for i in range(self.replicas):\n            key = self._hash(f'{node}:{i}')\n            self.ring[key] = node\n            self.sorted_keys.append(key)\n        self.sorted_keys.sort()\n    \n    def get_node(self, key):\n        if not self.ring:\n            return None\n        \n        hash_key = self._hash(key)\n        for ring_key in self.sorted_keys:\n            if hash_key <= ring_key:\n                return self.ring[ring_key]\n        return self.ring[self.sorted_keys[0]]\n\nclass DistributedCache:\n    def __init__(self, nodes):\n        self.hash_ring = ConsistentHash(nodes)\n        self.caches = {node: {} for node in nodes}\n    \n    def put(self, key, value):\n        node = self.hash_ring.get_node(key)\n        self.caches[node][key] = value\n    \n    def get(self, key):\n        node = self.hash_ring.get_node(key)\n        return self.caches[node].get(key)\n\ncache = DistributedCache(['node1', 'node2', 'node3'])\nprint('Cache distributed across 3 nodes')"
  },
  {
    id: 84,
    title: "Event Sourcing",
    level: "Advanced",
    concept: "Event-Driven Architecture",
    description: "Implement event sourcing for state management!",
    expectedOutput: "Account balance: $150",
    starterCode: "from datetime import datetime\n\n# Event sourcing implementation\nclass Event:\n    def __init__(self, event_type, data):\n        self.event_type = event_type\n        self.data = data\n        self.timestamp = datetime.now()\n\nclass EventStore:\n    def __init__(self):\n        self.events = []\n    \n    def append(self, event):\n        self.events.___(event)\n    \n    def get_events(self, aggregate_id=None):\n        if aggregate_id:\n            return [e for e in self.events if e.data.get('aggregate_id') == aggregate_id]\n        return self.events\n\nclass BankAccount:\n    def __init__(self, account_id, event_store):\n        self.account_id = account_id\n        self.event_store = event_store\n        self.balance = 0\n        self.replay_events()\n    \n    def deposit(self, amount):\n        event = Event('deposit', {'aggregate_id': self.account_id, 'amount': amount})\n        self.event_store.append(event)\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        event = Event('withdraw', {'aggregate_id': self.account_id, 'amount': amount})\n        self.event_store.append(event)\n        self.balance -= amount\n    \n    def replay_events(self):\n        events = self.event_store.get_events(self.account_id)\n        for event in events:\n            if event.event_type == 'deposit':\n                self.balance += event.data['amount']\n            elif event.event_type == 'withdraw':\n                self.balance -= event.data['amount']\n\nevent_store = EventStore()\naccount = BankAccount('acc_123', event_store)\naccount.deposit(200)\naccount.withdraw(50)\nprint(f'Account balance: ${account.balance}')",
    answerCode: "from datetime import datetime\n\nclass Event:\n    def __init__(self, event_type, data):\n        self.event_type = event_type\n        self.data = data\n        self.timestamp = datetime.now()\n\nclass EventStore:\n    def __init__(self):\n        self.events = []\n    \n    def append(self, event):\n        self.events.append(event)\n    \n    def get_events(self, aggregate_id=None):\n        if aggregate_id:\n            return [e for e in self.events if e.data.get('aggregate_id') == aggregate_id]\n        return self.events\n\nclass BankAccount:\n    def __init__(self, account_id, event_store):\n        self.account_id = account_id\n        self.event_store = event_store\n        self.balance = 0\n        self.replay_events()\n    \n    def deposit(self, amount):\n        event = Event('deposit', {'aggregate_id': self.account_id, 'amount': amount})\n        self.event_store.append(event)\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        event = Event('withdraw', {'aggregate_id': self.account_id, 'amount': amount})\n        self.event_store.append(event)\n        self.balance -= amount\n    \n    def replay_events(self):\n        events = self.event_store.get_events(self.account_id)\n        for event in events:\n            if event.event_type == 'deposit':\n                self.balance += event.data['amount']\n            elif event.event_type == 'withdraw':\n                self.balance -= event.data['amount']\n\nevent_store = EventStore()\naccount = BankAccount('acc_123', event_store)\naccount.deposit(200)\naccount.withdraw(50)\nprint(f'Account balance: ${account.balance}')"
  },
  {
    id: 85,
    title: "Load Balancer",
    level: "Advanced",
    concept: "System Design",
    description: "Implement a round-robin load balancer!",
    expectedOutput: "Request routed to server2",
    starterCode: "import random\n\n# Load balancer implementation\nclass LoadBalancer:\n    def __init__(self, servers):\n        self.servers = servers\n        self.current_index = 0\n    \n    def round_robin(self):\n        server = self.servers[self.current_index]\n        self.current_index = (self.current_index + 1) % len(self.servers)\n        return server\n    \n    def random_choice(self):\n        return random.choice(self.servers)\n    \n    def route_request(self, strategy='round_robin'):\n        if strategy == 'round_robin':\n            return self.___\n        elif strategy == 'random':\n            return self.___\n        else:\n            return self.servers[0]\n\nservers = ['server1', 'server2', 'server3']\nlb = LoadBalancer(servers)\nserver = lb.route_request()\nprint(f'Request routed to {server}')",
    answerCode: "import random\n\nclass LoadBalancer:\n    def __init__(self, servers):\n        self.servers = servers\n        self.current_index = 0\n    \n    def round_robin(self):\n        server = self.servers[self.current_index]\n        self.current_index = (self.current_index + 1) % len(self.servers)\n        return server\n    \n    def random_choice(self):\n        return random.choice(self.servers)\n    \n    def route_request(self, strategy='round_robin'):\n        if strategy == 'round_robin':\n            return self.round_robin()\n        elif strategy == 'random':\n            return self.random_choice()\n        else:\n            return self.servers[0]\n\nservers = ['server1', 'server2', 'server3']\nlb = LoadBalancer(servers)\nserver = lb.route_request()\nprint(f'Request routed to {server}')"
  },
  {
    id: 86,
    title: "GraphQL Resolver",
    level: "Advanced",
    concept: "API Design",
    description: "Create a GraphQL resolver with nested queries!",
    expectedOutput: "User resolver executed",
    starterCode: "# GraphQL resolver implementation\nclass GraphQLResolver:\n    def __init__(self):\n        self.users = {\n            1: {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'},\n            2: {'id': 2, 'name': 'Bob', 'email': 'bob@example.com'}\n        }\n        self.posts = {\n            1: {'id': 1, 'title': 'Hello World', 'user_id': 1},\n            2: {'id': 2, 'title': 'GraphQL Basics', 'user_id': 2}\n        }\n    \n    def resolve_user(self, user_id):\n        return self.users.get(user_id)\n    \n    def resolve_posts_by_user(self, user_id):\n        return [post for post in self.posts.values() if post['user_id'] == user_id]\n    \n    def resolve_user_with_posts(self, user_id):\n        user = self.___(user_id)\n        if user:\n            user['posts'] = self.___(user_id)\n        return user\n\nresolver = GraphQLResolver()\nuser_with_posts = resolver.resolve_user_with_posts(1)\nprint('User resolver executed')",
    answerCode: "class GraphQLResolver:\n    def __init__(self):\n        self.users = {\n            1: {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'},\n            2: {'id': 2, 'name': 'Bob', 'email': 'bob@example.com'}\n        }\n        self.posts = {\n            1: {'id': 1, 'title': 'Hello World', 'user_id': 1},\n            2: {'id': 2, 'title': 'GraphQL Basics', 'user_id': 2}\n        }\n    \n    def resolve_user(self, user_id):\n        return self.users.get(user_id)\n    \n    def resolve_posts_by_user(self, user_id):\n        return [post for post in self.posts.values() if post['user_id'] == user_id]\n    \n    def resolve_user_with_posts(self, user_id):\n        user = self.resolve_user(user_id)\n        if user:\n            user['posts'] = self.resolve_posts_by_user(user_id)\n        return user\n\nresolver = GraphQLResolver()\nuser_with_posts = resolver.resolve_user_with_posts(1)\nprint('User resolver executed')"
  },
  {
    id: 87,
    title: "Container Orchestrator",
    level: "Advanced",
    concept: "DevOps",
    description: "Simulate a container orchestration system!",
    expectedOutput: "Container deployed to node1",
    starterCode: "import random\n\n# Container orchestrator simulation\nclass Container:\n    def __init__(self, name, image, resources):\n        self.name = name\n        self.image = image\n        self.resources = resources\n        self.status = 'pending'\n    \n    def start(self):\n        self.status = 'running'\n    \n    def stop(self):\n        self.status = 'stopped'\n\nclass Node:\n    def __init__(self, name, capacity):\n        self.name = name\n        self.capacity = capacity\n        self.used_resources = 0\n        self.containers = []\n    \n    def can_schedule(self, container):\n        return self.used_resources + container.resources <= self.capacity\n    \n    def schedule_container(self, container):\n        if self.can_schedule(container):\n            self.containers.append(container)\n            self.used_resources += container.resources\n            container.start()\n            return True\n        return False\n\nclass Orchestrator:\n    def __init__(self):\n        self.nodes = []\n    \n    def add_node(self, node):\n        self.nodes.append(node)\n    \n    def deploy_container(self, container):\n        for node in self.nodes:\n            if node.can_schedule(container):\n                node.___(container)\n                return f'Container deployed to {node.name}'\n        return 'No available nodes'\n\norchestrator = Orchestrator()\norchestrator.add_node(Node('node1', 100))\norchestrator.add_node(Node('node2', 100))\n\ncontainer = Container('web-app', 'nginx', 30)\nresult = orchestrator.deploy_container(container)\nprint(result)",
    answerCode: "import random\n\nclass Container:\n    def __init__(self, name, image, resources):\n        self.name = name\n        self.image = image\n        self.resources = resources\n        self.status = 'pending'\n    \n    def start(self):\n        self.status = 'running'\n    \n    def stop(self):\n        self.status = 'stopped'\n\nclass Node:\n    def __init__(self, name, capacity):\n        self.name = name\n        self.capacity = capacity\n        self.used_resources = 0\n        self.containers = []\n    \n    def can_schedule(self, container):\n        return self.used_resources + container.resources <= self.capacity\n    \n    def schedule_container(self, container):\n        if self.can_schedule(container):\n            self.containers.append(container)\n            self.used_resources += container.resources\n            container.start()\n            return True\n        return False\n\nclass Orchestrator:\n    def __init__(self):\n        self.nodes = []\n    \n    def add_node(self, node):\n        self.nodes.append(node)\n    \n    def deploy_container(self, container):\n        for node in self.nodes:\n            if node.can_schedule(container):\n                node.schedule_container(container)\n                return f'Container deployed to {node.name}'\n        return 'No available nodes'\n\norchestrator = Orchestrator()\norchestrator.add_node(Node('node1', 100))\norchestrator.add_node(Node('node2', 100))\n\ncontainer = Container('web-app', 'nginx', 30)\nresult = orchestrator.deploy_container(container)\nprint(result)"
  },
  {
    id: 88,
    title: "Stream Processor",
    level: "Advanced",
    concept: "Real-time Processing",
    description: "Build a real-time data stream processor!",
    expectedOutput: "Processed 5 events in window",
    starterCode: "import time\nfrom collections import deque\n\n# Stream processor implementation\nclass StreamProcessor:\n    def __init__(self, window_size_seconds=5):\n        self.window_size = window_size_seconds\n        self.events = deque()\n    \n    def add_event(self, event):\n        current_time = time.time()\n        event['timestamp'] = current_time\n        self.events.append(event)\n        self._cleanup_old_events(current_time)\n    \n    def _cleanup_old_events(self, current_time):\n        while self.events and current_time - self.events[0]['timestamp'] > self.window_size:\n            self.events.___\n    \n    def get_window_count(self):\n        current_time = time.time()\n        self._cleanup_old_events(current_time)\n        return len(self.events)\n    \n    def process_window(self):\n        count = self.get_window_count()\n        return f'Processed {count} events in window'\n\nprocessor = StreamProcessor()\nfor i in range(5):\n    processor.add_event({'data': f'event_{i}'})\n\nresult = processor.process_window()\nprint(result)",
    answerCode: "import time\nfrom collections import deque\n\nclass StreamProcessor:\n    def __init__(self, window_size_seconds=5):\n        self.window_size = window_size_seconds\n        self.events = deque()\n    \n    def add_event(self, event):\n        current_time = time.time()\n        event['timestamp'] = current_time\n        self.events.append(event)\n        self._cleanup_old_events(current_time)\n    \n    def _cleanup_old_events(self, current_time):\n        while self.events and current_time - self.events[0]['timestamp'] > self.window_size:\n            self.events.popleft()\n    \n    def get_window_count(self):\n        current_time = time.time()\n        self._cleanup_old_events(current_time)\n        return len(self.events)\n    \n    def process_window(self):\n        count = self.get_window_count()\n        return f'Processed {count} events in window'\n\nprocessor = StreamProcessor()\nfor i in range(5):\n    processor.add_event({'data': f'event_{i}'})\n\nresult = processor.process_window()\nprint(result)"
  },
  {
    id: 89,
    title: "Circuit Breaker",
    level: "Advanced",
    concept: "Fault Tolerance",
    description: "Implement a circuit breaker pattern for resilience!",
    expectedOutput: "Circuit breaker opened",
    starterCode: "import time\nimport random\n\n# Circuit breaker implementation\nclass CircuitBreaker:\n    def __init__(self, failure_threshold=5, timeout=60):\n        self.failure_threshold = failure_threshold\n        self.timeout = timeout\n        self.failure_count = 0\n        self.last_failure_time = None\n        self.state = 'closed'  # closed, open, half-open\n    \n    def call(self, func, *args, **kwargs):\n        if self.state == 'open':\n            if time.time() - self.last_failure_time > self.timeout:\n                self.state = 'half-open'\n            else:\n                raise Exception('Circuit breaker is open')\n        \n        try:\n            result = func(*args, **kwargs)\n            self._on_success()\n            return result\n        except Exception as e:\n            self._on_failure()\n            raise e\n    \n    def _on_success(self):\n        self.failure_count = 0\n        self.state = 'closed'\n    \n    def _on_failure(self):\n        self.failure_count += 1\n        self.last_failure_time = time.time()\n        \n        if self.failure_count >= self.failure_threshold:\n            self.state = ___\n            print('Circuit breaker opened')\n\ndef unreliable_service():\n    if random.random() < 0.8:\n        raise Exception('Service failed')\n    return 'Success'\n\ncb = CircuitBreaker(failure_threshold=3)\nfor i in range(5):\n    try:\n        cb.call(unreliable_service)\n    except:\n        pass",
    answerCode: "import time\nimport random\n\nclass CircuitBreaker:\n    def __init__(self, failure_threshold=5, timeout=60):\n        self.failure_threshold = failure_threshold\n        self.timeout = timeout\n        self.failure_count = 0\n        self.last_failure_time = None\n        self.state = 'closed'\n    \n    def call(self, func, *args, **kwargs):\n        if self.state == 'open':\n            if time.time() - self.last_failure_time > self.timeout:\n                self.state = 'half-open'\n            else:\n                raise Exception('Circuit breaker is open')\n        \n        try:\n            result = func(*args, **kwargs)\n            self._on_success()\n            return result\n        except Exception as e:\n            self._on_failure()\n            raise e\n    \n    def _on_success(self):\n        self.failure_count = 0\n        self.state = 'closed'\n    \n    def _on_failure(self):\n        self.failure_count += 1\n        self.last_failure_time = time.time()\n        \n        if self.failure_count >= self.failure_threshold:\n            self.state = 'open'\n            print('Circuit breaker opened')\n\ndef unreliable_service():\n    if random.random() < 0.8:\n        raise Exception('Service failed')\n    return 'Success'\n\ncb = CircuitBreaker(failure_threshold=3)\nfor i in range(5):\n    try:\n        cb.call(unreliable_service)\n    except:\n        pass"
  },
  {
    id: 90,
    title: "Message Queue",
    level: "Advanced",
    concept: "Message Queuing",
    description: "Implement a message queue with pub/sub pattern!",
    expectedOutput: "Subscriber received: Hello World",
    starterCode: "from collections import defaultdict, deque\nimport threading\n\n# Message queue implementation\nclass MessageQueue:\n    def __init__(self):\n        self.queues = defaultdict(deque)\n        self.subscribers = defaultdict(list)\n        self.lock = threading.Lock()\n    \n    def publish(self, topic, message):\n        with self.lock:\n            self.queues[topic].append(message)\n            for subscriber in self.subscribers[topic]:\n                subscriber.___(message)\n    \n    def subscribe(self, topic, callback):\n        with self.lock:\n            self.subscribers[topic].append(callback)\n    \n    def get_message(self, topic):\n        with self.lock:\n            if self.queues[topic]:\n                return self.queues[topic].___\n            return None\n\nclass Subscriber:\n    def __init__(self, name):\n        self.name = name\n    \n    def handle_message(self, message):\n        print(f'Subscriber {self.name} received: {message}')\n\nmq = MessageQueue()\nsubscriber = Subscriber('A')\nmq.subscribe('news', subscriber.handle_message)\nmq.publish('news', 'Hello World')",
    answerCode: "from collections import defaultdict, deque\nimport threading\n\nclass MessageQueue:\n    def __init__(self):\n        self.queues = defaultdict(deque)\n        self.subscribers = defaultdict(list)\n        self.lock = threading.Lock()\n    \n    def publish(self, topic, message):\n        with self.lock:\n            self.queues[topic].append(message)\n            for subscriber in self.subscribers[topic]:\n                subscriber(message)\n    \n    def subscribe(self, topic, callback):\n        with self.lock:\n            self.subscribers[topic].append(callback)\n    \n    def get_message(self, topic):\n        with self.lock:\n            if self.queues[topic]:\n                return self.queues[topic].popleft()\n            return None\n\nclass Subscriber:\n    def __init__(self, name):\n        self.name = name\n    \n    def handle_message(self, message):\n        print(f'Subscriber {self.name} received: {message}')\n\nmq = MessageQueue()\nsubscriber = Subscriber('A')\nmq.subscribe('news', subscriber.handle_message)\nmq.publish('news', 'Hello World')"
  },

  // EXPERT LEVEL (91-105)
  {
    id: 91,
    title: "Quantum Algorithm",
    level: "Expert",
    concept: "Quantum Computing",
    description: "Simulate a quantum algorithm for searching!",
    expectedOutput: "Quantum search completed",
    starterCode: "import math\nimport random\n\n# Quantum algorithm simulation\nclass QuantumState:\n    def __init__(self, n_qubits):\n        self.n_qubits = n_qubits\n        self.amplitudes = [1/math.sqrt(2**n_qubits)] * (2**n_qubits)\n    \n    def measure(self):\n        probabilities = [abs(amp)**2 for amp in self.amplitudes]\n        return random.choices(range(len(probabilities)), weights=probabilities)[0]\n\nclass GroverAlgorithm:\n    def __init__(self, n_qubits, target):\n        self.n_qubits = n_qubits\n        self.target = target\n        self.state = QuantumState(n_qubits)\n    \n    def oracle(self):\n        # Mark the target state\n        self.state.amplitudes[self.target] *= -1\n    \n    def diffusion(self):\n        # Amplitude amplification\n        avg = sum(self.state.amplitudes) / len(self.state.amplitudes)\n        for i in range(len(self.state.amplitudes)):\n            self.state.amplitudes[i] = 2 * avg - self.state.amplitudes[i]\n    \n    def search(self):\n        iterations = int(math.pi / 4 * math.sqrt(2**self.n_qubits))\n        for _ in range(iterations):\n            self.___\n            self.___\n        result = self.state.measure()\n        print('Quantum search completed')\n        return result\n\ngrover = GroverAlgorithm(3, 5)\nresult = grover.search()",
    answerCode: "import math\nimport random\n\nclass QuantumState:\n    def __init__(self, n_qubits):\n        self.n_qubits = n_qubits\n        self.amplitudes = [1/math.sqrt(2**n_qubits)] * (2**n_qubits)\n    \n    def measure(self):\n        probabilities = [abs(amp)**2 for amp in self.amplitudes]\n        return random.choices(range(len(probabilities)), weights=probabilities)[0]\n\nclass GroverAlgorithm:\n    def __init__(self, n_qubits, target):\n        self.n_qubits = n_qubits\n        self.target = target\n        self.state = QuantumState(n_qubits)\n    \n    def oracle(self):\n        self.state.amplitudes[self.target] *= -1\n    \n    def diffusion(self):\n        avg = sum(self.state.amplitudes) / len(self.state.amplitudes)\n        for i in range(len(self.state.amplitudes)):\n            self.state.amplitudes[i] = 2 * avg - self.state.amplitudes[i]\n    \n    def search(self):\n        iterations = int(math.pi / 4 * math.sqrt(2**self.n_qubits))\n        for _ in range(iterations):\n            self.oracle()\n            self.diffusion()\n        result = self.state.measure()\n        print('Quantum search completed')\n        return result\n\ngrover = GroverAlgorithm(3, 5)\nresult = grover.search()"
  },
  {
    id: 92,
    title: "Compiler Frontend",
    level: "Expert",
    concept: "Compiler Design",
    description: "Build a lexer and parser for a simple language!",
    expectedOutput: "Parsed expression: (+ 2 3)",
    starterCode: "import re\n\n# Compiler frontend implementation\nclass Token:\n    def __init__(self, type_, value):\n        self.type = type_\n        self.value = value\n    \n    def __repr__(self):\n        return f'Token({self.type}, {self.value})'\n\nclass Lexer:\n    def __init__(self, text):\n        self.text = text\n        self.pos = 0\n        self.tokens = []\n    \n    def tokenize(self):\n        patterns = [\n            ('NUMBER', r'\\d+'),\n            ('PLUS', r'\\+'),\n            ('MINUS', r'-'),\n            ('LPAREN', r'\\('),\n            ('RPAREN', r'\\)'),\n            ('WHITESPACE', r'\\s+')\n        ]\n        \n        regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in patterns)\n        \n        for match in re.finditer(regex, self.text):\n            token_type = match.lastgroup\n            token_value = match.group()\n            \n            if token_type != 'WHITESPACE':\n                self.tokens.append(Token(token_type, token_value))\n        \n        return self.tokens\n\nclass Parser:\n    def __init__(self, tokens):\n        self.tokens = tokens\n        self.pos = 0\n    \n    def parse_expression(self):\n        if self.current_token().type == 'LPAREN':\n            self.pos += 1  # consume '('\n            op = self.current_token().value\n            self.pos += 1  # consume operator\n            left = self.___\n            right = self.___\n            self.pos += 1  # consume ')'\n            return f'({op} {left} {right})'\n        elif self.current_token().type == 'NUMBER':\n            value = self.current_token().value\n            self.pos += 1\n            return value\n    \n    def current_token(self):\n        return self.tokens[self.pos] if self.pos < len(self.tokens) else None\n\ncode = '(+ 2 3)'\nlexer = Lexer(code)\ntokens = lexer.tokenize()\nparser = Parser(tokens)\nast = parser.parse_expression()\nprint(f'Parsed expression: {ast}')",
    answerCode: "import re\n\nclass Token:\n    def __init__(self, type_, value):\n        self.type = type_\n        self.value = value\n    \n    def __repr__(self):\n        return f'Token({self.type}, {self.value})'\n\nclass Lexer:\n    def __init__(self, text):\n        self.text = text\n        self.pos = 0\n        self.tokens = []\n    \n    def tokenize(self):\n        patterns = [\n            ('NUMBER', r'\\d+'),\n            ('PLUS', r'\\+'),\n            ('MINUS', r'-'),\n            ('LPAREN', r'\\('),\n            ('RPAREN', r'\\)'),\n            ('WHITESPACE', r'\\s+')\n        ]\n        \n        regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in patterns)\n        \n        for match in re.finditer(regex, self.text):\n            token_type = match.lastgroup\n            token_value = match.group()\n            \n            if token_type != 'WHITESPACE':\n                self.tokens.append(Token(token_type, token_value))\n        \n        return self.tokens\n\nclass Parser:\n    def __init__(self, tokens):\n        self.tokens = tokens\n        self.pos = 0\n    \n    def parse_expression(self):\n        if self.current_token().type == 'LPAREN':\n            self.pos += 1\n            op = self.current_token().value\n            self.pos += 1\n            left = self.parse_expression()\n            right = self.parse_expression()\n            self.pos += 1\n            return f'({op} {left} {right})'\n        elif self.current_token().type == 'NUMBER':\n            value = self.current_token().value\n            self.pos += 1\n            return value\n    \n    def current_token(self):\n        return self.tokens[self.pos] if self.pos < len(self.tokens) else None\n\ncode = '(+ 2 3)'\nlexer = Lexer(code)\ntokens = lexer.tokenize()\nparser = Parser(tokens)\nast = parser.parse_expression()\nprint(f'Parsed expression: {ast}')"
  },
  {
    id: 93,
    title: "Distributed Consensus",
    level: "Expert",
    concept: "Distributed Algorithms",
    description: "Implement the Raft consensus algorithm!",
    expectedOutput: "Leader elected: node_1",
    starterCode: "import random\nimport time\n\n# Raft consensus algorithm\nclass RaftNode:\n    def __init__(self, node_id, peers):\n        self.node_id = node_id\n        self.peers = peers\n        self.state = 'follower'  # follower, candidate, leader\n        self.current_term = 0\n        self.voted_for = None\n        self.log = []\n        self.votes_received = 0\n    \n    def start_election(self):\n        self.state = 'candidate'\n        self.current_term += 1\n        self.voted_for = self.node_id\n        self.votes_received = 1\n        \n        # Request votes from peers\n        for peer in self.peers:\n            if peer.vote_for(self.current_term, self.node_id):\n                self.votes_received += 1\n        \n        # Check if won election\n        if self.votes_received > len(self.peers) // 2:\n            self.state = ___\n            print(f'Leader elected: {self.node_id}')\n    \n    def vote_for(self, term, candidate_id):\n        if term > self.current_term:\n            self.current_term = term\n            self.voted_for = None\n            self.state = 'follower'\n        \n        if self.voted_for is None and term == self.current_term:\n            self.voted_for = candidate_id\n            return True\n        return False\n\n# Simulate cluster\nnodes = []\nfor i in range(5):\n    node = RaftNode(f'node_{i}', [])\n    nodes.append(node)\n\n# Set peers for each node\nfor node in nodes:\n    node.peers = [n for n in nodes if n != node]\n\n# Start election\nnodes[1].start_election()",
    answerCode: "import random\nimport time\n\nclass RaftNode:\n    def __init__(self, node_id, peers):\n        self.node_id = node_id\n        self.peers = peers\n        self.state = 'follower'\n        self.current_term = 0\n        self.voted_for = None\n        self.log = []\n        self.votes_received = 0\n    \n    def start_election(self):\n        self.state = 'candidate'\n        self.current_term += 1\n        self.voted_for = self.node_id\n        self.votes_received = 1\n        \n        for peer in self.peers:\n            if peer.vote_for(self.current_term, self.node_id):\n                self.votes_received += 1\n        \n        if self.votes_received > len(self.peers) // 2:\n            self.state = 'leader'\n            print(f'Leader elected: {self.node_id}')\n    \n    def vote_for(self, term, candidate_id):\n        if term > self.current_term:\n            self.current_term = term\n            self.voted_for = None\n            self.state = 'follower'\n        \n        if self.voted_for is None and term == self.current_term:\n            self.voted_for = candidate_id\n            return True\n        return False\n\nnodes = []\nfor i in range(5):\n    node = RaftNode(f'node_{i}', [])\n    nodes.append(node)\n\nfor node in nodes:\n    node.peers = [n for n in nodes if n != node]\n\nnodes[1].start_election()"
  },
  {
    id: 94,
    title: "Memory Allocator",
    level: "Expert",
    concept: "Systems Programming",
    description: "Implement a custom memory allocator!",
    expectedOutput: "Memory allocated at address 1000",
    starterCode: "# Custom memory allocator\nclass MemoryBlock:\n    def __init__(self, address, size, is_free=True):\n        self.address = address\n        self.size = size\n        self.is_free = is_free\n        self.next = None\n\nclass MemoryAllocator:\n    def __init__(self, total_size):\n        self.total_size = total_size\n        self.free_list = MemoryBlock(0, total_size)\n    \n    def allocate(self, size):\n        current = self.free_list\n        \n        while current:\n            if current.is_free and current.size >= size:\n                # Split block if necessary\n                if current.size > size:\n                    new_block = MemoryBlock(current.address + size, current.size - size)\n                    new_block.next = current.next\n                    current.next = new_block\n                    current.size = size\n                \n                current.is_free = False\n                print(f'Memory allocated at address {current.address}')\n                return current.address\n            \n            current = current.next\n        \n        print('Out of memory')\n        return None\n    \n    def deallocate(self, address):\n        current = self.free_list\n        \n        while current:\n            if current.address == address and not current.is_free:\n                current.is_free = True\n                self._coalesce()\n                print(f'Memory deallocated at address {address}')\n                return\n            current = current.next\n        \n        print('Invalid address')\n    \n    def _coalesce(self):\n        current = self.free_list\n        \n        while current and current.next:\n            if current.is_free and current.next.is_free and \\\n               current.address + current.size == current.next.address:\n                current.size += current.next.size\n                current.next = current.next.next\n            else:\n                current = current.next\n\nallocator = MemoryAllocator(1024)\nptr1 = allocator.___(100)\nptr2 = allocator.___(200)",
    answerCode: "class MemoryBlock:\n    def __init__(self, address, size, is_free=True):\n        self.address = address\n        self.size = size\n        self.is_free = is_free\n        self.next = None\n\nclass MemoryAllocator:\n    def __init__(self, total_size):\n        self.total_size = total_size\n        self.free_list = MemoryBlock(0, total_size)\n    \n    def allocate(self, size):\n        current = self.free_list\n        \n        while current:\n            if current.is_free and current.size >= size:\n                if current.size > size:\n                    new_block = MemoryBlock(current.address + size, current.size - size)\n                    new_block.next = current.next\n                    current.next = new_block\n                    current.size = size\n                \n                current.is_free = False\n                print(f'Memory allocated at address {current.address}')\n                return current.address\n            \n            current = current.next\n        \n        print('Out of memory')\n        return None\n    \n    def deallocate(self, address):\n        current = self.free_list\n        \n        while current:\n            if current.address == address and not current.is_free:\n                current.is_free = True\n                self._coalesce()\n                print(f'Memory deallocated at address {address}')\n                return\n            current = current.next\n        \n        print('Invalid address')\n    \n    def _coalesce(self):\n        current = self.free_list\n        \n        while current and current.next:\n            if current.is_free and current.next.is_free and \\\n               current.address + current.size == current.next.address:\n                current.size += current.next.size\n                current.next = current.next.next\n            else:\n                current = current.next\n\nallocator = MemoryAllocator(1024)\nptr1 = allocator.allocate(100)\nptr2 = allocator.allocate(200)"
  },
  {
    id: 95,
    title: "AI Planning System",
    level: "Expert",
    concept: "Artificial Intelligence",
    description: "Implement an AI planning algorithm using A*!",
    expectedOutput: "Plan found: ['move_to_A', 'pickup_block', 'move_to_B']",
    starterCode: "import heapq\n\n# AI Planning with A* search\nclass State:\n    def __init__(self, robot_pos, block_pos, goal_pos):\n        self.robot_pos = robot_pos\n        self.block_pos = block_pos\n        self.goal_pos = goal_pos\n    \n    def __eq__(self, other):\n        return (self.robot_pos, self.block_pos) == (other.robot_pos, other.block_pos)\n    \n    def __hash__(self):\n        return hash((self.robot_pos, self.block_pos))\n    \n    def is_goal(self):\n        return self.block_pos == self.goal_pos\n\nclass Planner:\n    def __init__(self):\n        self.actions = ['move_to_A', 'move_to_B', 'pickup_block', 'drop_block']\n    \n    def get_successors(self, state):\n        successors = []\n        \n        # Move actions\n        for pos in ['A', 'B']:\n            if state.robot_pos != pos:\n                new_state = State(pos, state.block_pos, state.goal_pos)\n                successors.append((f'move_to_{pos}', new_state))\n        \n        # Pickup action\n        if state.robot_pos == state.block_pos and state.block_pos != 'robot':\n            new_state = State(state.robot_pos, 'robot', state.goal_pos)\n            successors.append(('pickup_block', new_state))\n        \n        # Drop action\n        if state.block_pos == 'robot':\n            new_state = State(state.robot_pos, state.robot_pos, state.goal_pos)\n            successors.append(('drop_block', new_state))\n        \n        return successors\n    \n    def heuristic(self, state):\n        if state.block_pos == 'robot':\n            return 1 if state.robot_pos != state.goal_pos else 0\n        return 2 if state.block_pos != state.goal_pos else 0\n    \n    def plan(self, initial_state):\n        frontier = [(0, 0, initial_state, [])]\n        visited = set()\n        \n        while frontier:\n            _, cost, state, path = heapq.___(frontier)\n            \n            if state in visited:\n                continue\n            \n            visited.add(state)\n            \n            if state.is_goal():\n                print(f'Plan found: {path}')\n                return path\n            \n            for action, next_state in self.get_successors(state):\n                if next_state not in visited:\n                    new_cost = cost + 1\n                    priority = new_cost + self.heuristic(next_state)\n                    heapq.heappush(frontier, (priority, new_cost, next_state, path + [action]))\n        \n        return None\n\nplanner = Planner()\ninitial = State('start', 'A', 'B')\nplan = planner.plan(initial)",
    answerCode: "import heapq\n\nclass State:\n    def __init__(self, robot_pos, block_pos, goal_pos):\n        self.robot_pos = robot_pos\n        self.block_pos = block_pos\n        self.goal_pos = goal_pos\n    \n    def __eq__(self, other):\n        return (self.robot_pos, self.block_pos) == (other.robot_pos, other.block_pos)\n    \n    def __hash__(self):\n        return hash((self.robot_pos, self.block_pos))\n    \n    def is_goal(self):\n        return self.block_pos == self.goal_pos\n\nclass Planner:\n    def __init__(self):\n        self.actions = ['move_to_A', 'move_to_B', 'pickup_block', 'drop_block']\n    \n    def get_successors(self, state):\n        successors = []\n        \n        for pos in ['A', 'B']:\n            if state.robot_pos != pos:\n                new_state = State(pos, state.block_pos, state.goal_pos)\n                successors.append((f'move_to_{pos}', new_state))\n        \n        if state.robot_pos == state.block_pos and state.block_pos != 'robot':\n            new_state = State(state.robot_pos, 'robot', state.goal_pos)\n            successors.append(('pickup_block', new_state))\n        \n        if state.block_pos == 'robot':\n            new_state = State(state.robot_pos, state.robot_pos, state.goal_pos)\n            successors.append(('drop_block', new_state))\n        \n        return successors\n    \n    def heuristic(self, state):\n        if state.block_pos == 'robot':\n            return 1 if state.robot_pos != state.goal_pos else 0\n        return 2 if state.block_pos != state.goal_pos else 0\n    \n    def plan(self, initial_state):\n        frontier = [(0, 0, initial_state, [])]\n        visited = set()\n        \n        while frontier:\n            _, cost, state, path = heapq.heappop(frontier)\n            \n            if state in visited:\n                continue\n            \n            visited.add(state)\n            \n            if state.is_goal():\n                print(f'Plan found: {path}')\n                return path\n            \n            for action, next_state in self.get_successors(state):\n                if next_state not in visited:\n                    new_cost = cost + 1\n                    priority = new_cost + self.heuristic(next_state)\n                    heapq.heappush(frontier, (priority, new_cost, next_state, path + [action]))\n        \n        return None\n\nplanner = Planner()\ninitial = State('start', 'A', 'B')\nplan = planner.plan(initial)"
  },
  {
    id: 96,
    title: "Virtual Machine",
    level: "Expert",
    concept: "Virtual Machines",
    description: "Build a simple stack-based virtual machine!",
    expectedOutput: "VM execution completed, result: 15",
    starterCode: "# Stack-based virtual machine\nclass VirtualMachine:\n    def __init__(self):\n        self.stack = []\n        self.memory = [0] * 256\n        self.pc = 0  # program counter\n        self.instructions = []\n    \n    def load_program(self, instructions):\n        self.instructions = instructions\n        self.pc = 0\n    \n    def push(self, value):\n        self.stack.append(value)\n    \n    def pop(self):\n        return self.stack.pop() if self.stack else 0\n    \n    def execute(self):\n        while self.pc < len(self.instructions):\n            opcode, *args = self.instructions[self.pc]\n            \n            if opcode == 'PUSH':\n                self.push(args[0])\n            elif opcode == 'ADD':\n                b = self.pop()\n                a = self.pop()\n                self.push(a + b)\n            elif opcode == 'MUL':\n                b = self.___\n                a = self.___\n                self.push(a * b)\n            elif opcode == 'HALT':\n                break\n            \n            self.pc += 1\n        \n        result = self.pop() if self.stack else 0\n        print(f'VM execution completed, result: {result}')\n        return result\n\n# Program: (3 + 2) * 3 = 15\nprogram = [\n    ('PUSH', 3),\n    ('PUSH', 2),\n    ('ADD',),\n    ('PUSH', 3),\n    ('MUL',),\n    ('HALT',)\n]\n\nvm = VirtualMachine()\nvm.load_program(program)\nresult = vm.execute()",
    answerCode: "class VirtualMachine:\n    def __init__(self):\n        self.stack = []\n        self.memory = [0] * 256\n        self.pc = 0\n        self.instructions = []\n    \n    def load_program(self, instructions):\n        self.instructions = instructions\n        self.pc = 0\n    \n    def push(self, value):\n        self.stack.append(value)\n    \n    def pop(self):\n        return self.stack.pop() if self.stack else 0\n    \n    def execute(self):\n        while self.pc < len(self.instructions):\n            opcode, *args = self.instructions[self.pc]\n            \n            if opcode == 'PUSH':\n                self.push(args[0])\n            elif opcode == 'ADD':\n                b = self.pop()\n                a = self.pop()\n                self.push(a + b)\n            elif opcode == 'MUL':\n                b = self.pop()\n                a = self.pop()\n                self.push(a * b)\n            elif opcode == 'HALT':\n                break\n            \n            self.pc += 1\n        \n        result = self.pop() if self.stack else 0\n        print(f'VM execution completed, result: {result}')\n        return result\n\nprogram = [\n    ('PUSH', 3),\n    ('PUSH', 2),\n    ('ADD',),\n    ('PUSH', 3),\n    ('MUL',),\n    ('HALT',)\n]\n\nvm = VirtualMachine()\nvm.load_program(program)\nresult = vm.execute()"
  },
  {
    id: 97,
    title: "Garbage Collector",
    level: "Expert",
    concept: "Memory Management",
    description: "Implement a mark-and-sweep garbage collector!",
    expectedOutput: "Garbage collection completed, freed 2 objects",
    starterCode: "# Mark and sweep garbage collector\nclass GCObject:\n    def __init__(self, value, refs=None):\n        self.value = value\n        self.refs = refs or []\n        self.marked = False\n        self.id = id(self)\n\nclass GarbageCollector:\n    def __init__(self):\n        self.objects = []\n        self.roots = []\n    \n    def allocate(self, value, refs=None):\n        obj = GCObject(value, refs)\n        self.objects.append(obj)\n        return obj\n    \n    def add_root(self, obj):\n        self.roots.append(obj)\n    \n    def mark_phase(self):\n        # Mark all reachable objects\n        for root in self.roots:\n            self._mark_object(root)\n    \n    def _mark_object(self, obj):\n        if obj and not obj.marked:\n            obj.marked = True\n            for ref in obj.refs:\n                self._mark_object(ref)\n    \n    def sweep_phase(self):\n        # Sweep unmarked objects\n        freed_count = 0\n        self.objects = [obj for obj in self.objects if obj.marked or (setattr(obj, 'marked', False) or self._increment_freed(freed_count := freed_count + 1))[1]]\n        # Simplified: count freed objects\n        freed_count = sum(1 for obj in self.objects if not obj.marked)\n        self.objects = [obj for obj in self.objects if obj.marked]\n        return freed_count\n    \n    def collect(self):\n        # Reset marks\n        for obj in self.objects:\n            obj.marked = False\n        \n        self.mark_phase()\n        freed_count = self.___\n        \n        print(f'Garbage collection completed, freed {freed_count} objects')\n        return freed_count\n\ngc = GarbageCollector()\n\n# Create objects\nobj1 = gc.allocate('A')\nobj2 = gc.allocate('B')\nobj3 = gc.allocate('C', [obj1])\nobj4 = gc.allocate('D')  # Unreachable\nobj5 = gc.allocate('E')  # Unreachable\n\n# Set up references\nobj1.refs = [obj2]\ngc.add_root(obj3)\n\n# Run garbage collection\ngc.collect()",
    answerCode: "class GCObject:\n    def __init__(self, value, refs=None):\n        self.value = value\n        self.refs = refs or []\n        self.marked = False\n        self.id = id(self)\n\nclass GarbageCollector:\n    def __init__(self):\n        self.objects = []\n        self.roots = []\n    \n    def allocate(self, value, refs=None):\n        obj = GCObject(value, refs)\n        self.objects.append(obj)\n        return obj\n    \n    def add_root(self, obj):\n        self.roots.append(obj)\n    \n    def mark_phase(self):\n        for root in self.roots:\n            self._mark_object(root)\n    \n    def _mark_object(self, obj):\n        if obj and not obj.marked:\n            obj.marked = True\n            for ref in obj.refs:\n                self._mark_object(ref)\n    \n    def sweep_phase(self):\n        freed_count = sum(1 for obj in self.objects if not obj.marked)\n        self.objects = [obj for obj in self.objects if obj.marked]\n        return freed_count\n    \n    def collect(self):\n        for obj in self.objects:\n            obj.marked = False\n        \n        self.mark_phase()\n        freed_count = self.sweep_phase()\n        \n        print(f'Garbage collection completed, freed {freed_count} objects')\n        return freed_count\n\ngc = GarbageCollector()\n\nobj1 = gc.allocate('A')\nobj2 = gc.allocate('B')\nobj3 = gc.allocate('C', [obj1])\nobj4 = gc.allocate('D')\nobj5 = gc.allocate('E')\n\nobj1.refs = [obj2]\ngc.add_root(obj3)\n\ngc.collect()"
  },
  {
    id: 98,
    title: "Database Engine",
    level: "Expert",
    concept: "Database Systems",
    description: "Build a simple database engine with B+ tree indexing!",
    expectedOutput: "Query executed: found 2 records",
    starterCode: "# Simple database engine with B+ tree\nclass BPlusTreeNode:\n    def __init__(self, leaf=False):\n        self.keys = []\n        self.values = []  # For leaf nodes\n        self.children = []  # For internal nodes\n        self.leaf = leaf\n        self.next = None  # For leaf nodes\n\nclass BPlusTree:\n    def __init__(self, degree=3):\n        self.root = BPlusTreeNode(leaf=True)\n        self.degree = degree\n    \n    def insert(self, key, value):\n        # Simplified insertion\n        if self.root.leaf:\n            self._insert_into_leaf(self.root, key, value)\n        else:\n            # Handle internal node insertion\n            pass\n    \n    def _insert_into_leaf(self, node, key, value):\n        if key in node.keys:\n            idx = node.keys.index(key)\n            node.values[idx] = value\n        else:\n            # Insert in sorted order\n            idx = 0\n            while idx < len(node.keys) and node.keys[idx] < key:\n                idx += 1\n            node.keys.insert(idx, key)\n            node.values.insert(idx, value)\n    \n    def search(self, key):\n        return self._search_recursive(self.root, key)\n    \n    def _search_recursive(self, node, key):\n        if node.leaf:\n            if key in node.keys:\n                idx = node.keys.index(key)\n                return node.values[idx]\n            return None\n        else:\n            # Navigate to appropriate child\n            return None\n    \n    def range_query(self, start_key, end_key):\n        results = []\n        # Start from leftmost leaf\n        current = self._find_leaf(start_key)\n        \n        while current:\n            for i, key in enumerate(current.keys):\n                if start_key <= key <= end_key:\n                    results.append((key, current.values[i]))\n                elif key > end_key:\n                    return results\n            current = current.next\n        \n        return results\n    \n    def _find_leaf(self, key):\n        current = self.root\n        while not current.leaf:\n            # Navigate to appropriate child\n            current = current.children[0] if current.children else current\n        return current\n\nclass SimpleDB:\n    def __init__(self):\n        self.index = BPlusTree()\n        self.data = {}\n    \n    def insert(self, key, record):\n        self.data[key] = record\n        self.index.___(key, record)\n    \n    def select(self, start_key, end_key):\n        results = self.index.___(start_key, end_key)\n        print(f'Query executed: found {len(results)} records')\n        return results\n\ndb = SimpleDB()\ndb.insert(1, {'name': 'Alice', 'age': 25})\ndb.insert(2, {'name': 'Bob', 'age': 30})\ndb.insert(3, {'name': 'Charlie', 'age': 35})\n\nresults = db.select(1, 2)",
    answerCode: "class BPlusTreeNode:\n    def __init__(self, leaf=False):\n        self.keys = []\n        self.values = []\n        self.children = []\n        self.leaf = leaf\n        self.next = None\n\nclass BPlusTree:\n    def __init__(self, degree=3):\n        self.root = BPlusTreeNode(leaf=True)\n        self.degree = degree\n    \n    def insert(self, key, value):\n        if self.root.leaf:\n            self._insert_into_leaf(self.root, key, value)\n        else:\n            pass\n    \n    def _insert_into_leaf(self, node, key, value):\n        if key in node.keys:\n            idx = node.keys.index(key)\n            node.values[idx] = value\n        else:\n            idx = 0\n            while idx < len(node.keys) and node.keys[idx] < key:\n                idx += 1\n            node.keys.insert(idx, key)\n            node.values.insert(idx, value)\n    \n    def search(self, key):\n        return self._search_recursive(self.root, key)\n    \n    def _search_recursive(self, node, key):\n        if node.leaf:\n            if key in node.keys:\n                idx = node.keys.index(key)\n                return node.values[idx]\n            return None\n        else:\n            return None\n    \n    def range_query(self, start_key, end_key):\n        results = []\n        current = self._find_leaf(start_key)\n        \n        while current:\n            for i, key in enumerate(current.keys):\n                if start_key <= key <= end_key:\n                    results.append((key, current.values[i]))\n                elif key > end_key:\n                    return results\n            current = current.next\n        \n        return results\n    \n    def _find_leaf(self, key):\n        current = self.root\n        while not current.leaf:\n            current = current.children[0] if current.children else current\n        return current\n\nclass SimpleDB:\n    def __init__(self):\n        self.index = BPlusTree()\n        self.data = {}\n    \n    def insert(self, key, record):\n        self.data[key] = record\n        self.index.insert(key, record)\n    \n    def select(self, start_key, end_key):\n        results = self.index.range_query(start_key, end_key)\n        print(f'Query executed: found {len(results)} records')\n        return results\n\ndb = SimpleDB()\ndb.insert(1, {'name': 'Alice', 'age': 25})\ndb.insert(2, {'name': 'Bob', 'age': 30})\ndb.insert(3, {'name': 'Charlie', 'age': 35})\n\nresults = db.select(1, 2)"
  },
  {
    id: 99,
    title: "Cryptographic Protocol",
    level: "Expert",
    concept: "Cryptography",
    description: "Implement RSA encryption from scratch!",
    expectedOutput: "RSA encryption successful",
    starterCode: "import random\nimport math\n\n# RSA encryption implementation\nclass RSA:\n    def __init__(self, key_size=8):\n        self.key_size = key_size\n        self.public_key = None\n        self.private_key = None\n        self.generate_keys()\n    \n    def is_prime(self, n):\n        if n < 2:\n            return False\n        for i in range(2, int(math.sqrt(n)) + 1):\n            if n % i == 0:\n                return False\n        return True\n    \n    def generate_prime(self, bits):\n        while True:\n            n = random.getrandbits(bits)\n            if self.is_prime(n):\n                return n\n    \n    def gcd(self, a, b):\n        while b:\n            a, b = b, a % b\n        return a\n    \n    def mod_inverse(self, e, phi):\n        # Extended Euclidean Algorithm\n        def extended_gcd(a, b):\n            if a == 0:\n                return b, 0, 1\n            gcd, x1, y1 = extended_gcd(b % a, a)\n            x = y1 - (b // a) * x1\n            y = x1\n            return gcd, x, y\n        \n        gcd, x, _ = extended_gcd(e, phi)\n        return x % phi if gcd == 1 else None\n    \n    def generate_keys(self):\n        # Generate two prime numbers\n        p = self.generate_prime(self.key_size // 2)\n        q = self.generate_prime(self.key_size // 2)\n        \n        n = p * q\n        phi = (p - 1) * (q - 1)\n        \n        # Choose e\n        e = 65537  # Common choice\n        while self.gcd(e, phi) != 1:\n            e += 2\n        \n        # Calculate d\n        d = self.___(e, phi)\n        \n        self.public_key = (e, n)\n        self.private_key = (d, n)\n    \n    def encrypt(self, message, public_key=None):\n        if public_key is None:\n            public_key = self.public_key\n        \n        e, n = public_key\n        # Convert message to integer\n        m = int.from_bytes(message.encode(), 'big')\n        \n        # Encrypt: c = m^e mod n\n        ciphertext = pow(m, e, n)\n        return ciphertext\n    \n    def decrypt(self, ciphertext):\n        d, n = self.private_key\n        \n        # Decrypt: m = c^d mod n\n        m = pow(ciphertext, d, n)\n        \n        # Convert back to string\n        try:\n            message = m.to_bytes((m.bit_length() + 7) // 8, 'big').decode()\n            return message\n        except:\n            return str(m)\n\nrsa = RSA()\nmessage = \"Hello\"\nencrypted = rsa.encrypt(message)\ndecrypted = rsa.decrypt(encrypted)\n\nif decrypted == message:\n    print('RSA encryption successful')\nelse:\n    print('RSA encryption failed')",
    answerCode: "import random\nimport math\n\nclass RSA:\n    def __init__(self, key_size=8):\n        self.key_size = key_size\n        self.public_key = None\n        self.private_key = None\n        self.generate_keys()\n    \n    def is_prime(self, n):\n        if n < 2:\n            return False\n        for i in range(2, int(math.sqrt(n)) + 1):\n            if n % i == 0:\n                return False\n        return True\n    \n    def generate_prime(self, bits):\n        while True:\n            n = random.getrandbits(bits)\n            if self.is_prime(n):\n                return n\n    \n    def gcd(self, a, b):\n        while b:\n            a, b = b, a % b\n        return a\n    \n    def mod_inverse(self, e, phi):\n        def extended_gcd(a, b):\n            if a == 0:\n                return b, 0, 1\n            gcd, x1, y1 = extended_gcd(b % a, a)\n            x = y1 - (b // a) * x1\n            y = x1\n            return gcd, x, y\n        \n        gcd, x, _ = extended_gcd(e, phi)\n        return x % phi if gcd == 1 else None\n    \n    def generate_keys(self):\n        p = self.generate_prime(self.key_size // 2)\n        q = self.generate_prime(self.key_size // 2)\n        \n        n = p * q\n        phi = (p - 1) * (q - 1)\n        \n        e = 65537\n        while self.gcd(e, phi) != 1:\n            e += 2\n        \n        d = self.mod_inverse(e, phi)\n        \n        self.public_key = (e, n)\n        self.private_key = (d, n)\n    \n    def encrypt(self, message, public_key=None):\n        if public_key is None:\n            public_key = self.public_key\n        \n        e, n = public_key\n        m = int.from_bytes(message.encode(), 'big')\n        \n        ciphertext = pow(m, e, n)\n        return ciphertext\n    \n    def decrypt(self, ciphertext):\n        d, n = self.private_key\n        \n        m = pow(ciphertext, d, n)\n        \n        try:\n            message = m.to_bytes((m.bit_length() + 7) // 8, 'big').decode()\n            return message\n        except:\n            return str(m)\n\nrsa = RSA()\nmessage = \"Hello\"\nencrypted = rsa.encrypt(message)\ndecrypted = rsa.decrypt(encrypted)\n\nif decrypted == message:\n    print('RSA encryption successful')\nelse:\n    print('RSA encryption failed')"
  },
  {
    id: 100,
    title: "Operating System Scheduler",
    level: "Expert",
    concept: "Operating Systems",
    description: "Implement a multi-level feedback queue scheduler!",
    expectedOutput: "Process P1 completed at time 10",
    starterCode: "from collections import deque\n\n# Multi-level feedback queue scheduler\nclass Process:\n    def __init__(self, pid, burst_time, arrival_time=0):\n        self.pid = pid\n        self.burst_time = burst_time\n        self.remaining_time = burst_time\n        self.arrival_time = arrival_time\n        self.queue_level = 0\n        self.last_executed = 0\n\nclass MLFQScheduler:\n    def __init__(self, num_queues=3):\n        self.num_queues = num_queues\n        self.queues = [deque() for _ in range(num_queues)]\n        self.time_quantum = [2 ** i for i in range(num_queues)]  # 1, 2, 4, ...\n        self.current_time = 0\n        self.completed_processes = []\n    \n    def add_process(self, process):\n        self.queues[0].append(process)\n    \n    def schedule(self):\n        while any(self.queues):\n            executed = False\n            \n            # Check each queue from highest to lowest priority\n            for level in range(self.num_queues):\n                if self.queues[level]:\n                    process = self.queues[level].popleft()\n                    executed = True\n                    \n                    # Execute process for time quantum or until completion\n                    execution_time = min(self.time_quantum[level], process.remaining_time)\n                    process.remaining_time -= execution_time\n                    self.current_time += execution_time\n                    \n                    if process.remaining_time == 0:\n                        # Process completed\n                        print(f'Process {process.pid} completed at time {self.current_time}')\n                        self.completed_processes.append(process)\n                    else:\n                        # Move to next queue level or stay in current\n                        if level < self.num_queues - 1:\n                            process.queue_level = level + 1\n                            self.queues[___].append(process)\n                        else:\n                            self.queues[level].append(process)\n                    \n                    break  # Execute only one process per time slice\n            \n            if not executed:\n                self.current_time += 1  # Idle time\n    \n    def aging(self):\n        # Promote processes that have been waiting too long\n        for level in range(1, self.num_queues):\n            processes_to_promote = []\n            remaining_processes = deque()\n            \n            while self.queues[level]:\n                process = self.queues[level].popleft()\n                if self.current_time - process.last_executed > 10:  # Aging threshold\n                    process.queue_level = max(0, level - 1)\n                    processes_to_promote.append(process)\n                else:\n                    remaining_processes.append(process)\n            \n            # Put back remaining processes\n            self.queues[level] = remaining_processes\n            \n            # Promote aged processes\n            for process in processes_to_promote:\n                self.queues[process.queue_level].append(process)\n\n# Create scheduler and processes\nscheduler = MLFQScheduler()\nscheduler.add_process(Process('P1', 10))\nscheduler.add_process(Process('P2', 5))\nscheduler.add_process(Process('P3', 8))\n\n# Run scheduler\nscheduler.schedule()",
    answerCode: "from collections import deque\n\nclass Process:\n    def __init__(self, pid, burst_time, arrival_time=0):\n        self.pid = pid\n        self.burst_time = burst_time\n        self.remaining_time = burst_time\n        self.arrival_time = arrival_time\n        self.queue_level = 0\n        self.last_executed = 0\n\nclass MLFQScheduler:\n    def __init__(self, num_queues=3):\n        self.num_queues = num_queues\n        self.queues = [deque() for _ in range(num_queues)]\n        self.time_quantum = [2 ** i for i in range(num_queues)]\n        self.current_time = 0\n        self.completed_processes = []\n    \n    def add_process(self, process):\n        self.queues[0].append(process)\n    \n    def schedule(self):\n        while any(self.queues):\n            executed = False\n            \n            for level in range(self.num_queues):\n                if self.queues[level]:\n                    process = self.queues[level].popleft()\n                    executed = True\n                    \n                    execution_time = min(self.time_quantum[level], process.remaining_time)\n                    process.remaining_time -= execution_time\n                    self.current_time += execution_time\n                    \n                    if process.remaining_time == 0:\n                        print(f'Process {process.pid} completed at time {self.current_time}')\n                        self.completed_processes.append(process)\n                    else:\n                        if level < self.num_queues - 1:\n                            process.queue_level = level + 1\n                            self.queues[level + 1].append(process)\n                        else:\n                            self.queues[level].append(process)\n                    \n                    break\n            \n            if not executed:\n                self.current_time += 1\n    \n    def aging(self):\n        for level in range(1, self.num_queues):\n            processes_to_promote = []\n            remaining_processes = deque()\n            \n            while self.queues[level]:\n                process = self.queues[level].popleft()\n                if self.current_time - process.last_executed > 10:\n                    process.queue_level = max(0, level - 1)\n                    processes_to_promote.append(process)\n                else:\n                    remaining_processes.append(process)\n            \n            self.queues[level] = remaining_processes\n            \n            for process in processes_to_promote:\n                self.queues[process.queue_level].append(process)\n\nscheduler = MLFQScheduler()\nscheduler.add_process(Process('P1', 10))\nscheduler.add_process(Process('P2', 5))\nscheduler.add_process(Process('P3', 8))\n\nscheduler.schedule()"
  },
  {
    id: 101,
    title: "Distributed Hash Table",
    level: "Expert",
    concept: "Distributed Systems",
    description: "Implement a distributed hash table with consistent hashing!",
    expectedOutput: "DHT: Key 'user123' stored on node node_2",
    starterCode: "import hashlib\nimport bisect\n\n# Distributed Hash Table implementation\nclass DHTNode:\n    def __init__(self, node_id):\n        self.node_id = node_id\n        self.data = {}\n        self.successors = []\n        self.predecessors = []\n    \n    def store(self, key, value):\n        self.data[key] = value\n        print(f'DHT: Key \\'{key}\\' stored on node {self.node_id}')\n    \n    def retrieve(self, key):\n        return self.data.get(key)\n    \n    def remove(self, key):\n        return self.data.pop(key, None)\n\nclass ConsistentHashRing:\n    def __init__(self):\n        self.ring = {}\n        self.sorted_keys = []\n        self.nodes = {}\n        self.virtual_nodes = 150  # Number of virtual nodes per physical node\n    \n    def _hash(self, key):\n        return int(hashlib.sha1(str(key).encode()).hexdigest(), 16)\n    \n    def add_node(self, node):\n        self.nodes[node.node_id] = node\n        \n        # Add virtual nodes\n        for i in range(self.virtual_nodes):\n            virtual_key = self._hash(f'{node.node_id}:{i}')\n            self.ring[virtual_key] = node.node_id\n            bisect.insort(self.sorted_keys, virtual_key)\n    \n    def remove_node(self, node_id):\n        if node_id not in self.nodes:\n            return\n        \n        # Remove virtual nodes\n        keys_to_remove = []\n        for key, nid in self.ring.items():\n            if nid == node_id:\n                keys_to_remove.append(key)\n        \n        for key in keys_to_remove:\n            del self.ring[key]\n            self.sorted_keys.remove(key)\n        \n        del self.nodes[node_id]\n    \n    def get_node(self, key):\n        if not self.ring:\n            return None\n        \n        hash_key = self._hash(key)\n        \n        # Find the first node clockwise\n        idx = bisect.bisect_right(self.sorted_keys, hash_key)\n        if idx == len(self.sorted_keys):\n            idx = 0\n        \n        node_id = self.ring[self.sorted_keys[idx]]\n        return self.nodes[node_id]\n\nclass DistributedHashTable:\n    def __init__(self):\n        self.hash_ring = ConsistentHashRing()\n        self.replication_factor = 3\n    \n    def add_node(self, node_id):\n        node = DHTNode(node_id)\n        self.hash_ring.add_node(node)\n        return node\n    \n    def put(self, key, value):\n        primary_node = self.hash_ring.___(key)\n        if primary_node:\n            primary_node.store(key, value)\n            \n            # Store replicas (simplified)\n            # In a real implementation, we'd store on successor nodes\n    \n    def get(self, key):\n        node = self.hash_ring.___(key)\n        return node.retrieve(key) if node else None\n    \n    def delete(self, key):\n        node = self.hash_ring.___(key)\n        return node.remove(key) if node else None\n\n# Create DHT with multiple nodes\ndht = DistributedHashTable()\ndht.add_node('node_1')\ndht.add_node('node_2')\ndht.add_node('node_3')\n\n# Store and retrieve data\ndht.put('user123', {'name': 'Alice', 'email': 'alice@example.com'})\nuser_data = dht.get('user123')",
    answerCode: "import hashlib\nimport bisect\n\nclass DHTNode:\n    def __init__(self, node_id):\n        self.node_id = node_id\n        self.data = {}\n        self.successors = []\n        self.predecessors = []\n    \n    def store(self, key, value):\n        self.data[key] = value\n        print(f'DHT: Key \\'{key}\\' stored on node {self.node_id}')\n    \n    def retrieve(self, key):\n        return self.data.get(key)\n    \n    def remove(self, key):\n        return self.data.pop(key, None)\n\nclass ConsistentHashRing:\n    def __init__(self):\n        self.ring = {}\n        self.sorted_keys = []\n        self.nodes = {}\n        self.virtual_nodes = 150\n    \n    def _hash(self, key):\n        return int(hashlib.sha1(str(key).encode()).hexdigest(), 16)\n    \n    def add_node(self, node):\n        self.nodes[node.node_id] = node\n        \n        for i in range(self.virtual_nodes):\n            virtual_key = self._hash(f'{node.node_id}:{i}')\n            self.ring[virtual_key] = node.node_id\n            bisect.insort(self.sorted_keys, virtual_key)\n    \n    def remove_node(self, node_id):\n        if node_id not in self.nodes:\n            return\n        \n        keys_to_remove = []\n        for key, nid in self.ring.items():\n            if nid == node_id:\n                keys_to_remove.append(key)\n        \n        for key in keys_to_remove:\n            del self.ring[key]\n            self.sorted_keys.remove(key)\n        \n        del self.nodes[node_id]\n    \n    def get_node(self, key):\n        if not self.ring:\n            return None\n        \n        hash_key = self._hash(key)\n        \n        idx = bisect.bisect_right(self.sorted_keys, hash_key)\n        if idx == len(self.sorted_keys):\n            idx = 0\n        \n        node_id = self.ring[self.sorted_keys[idx]]\n        return self.nodes[node_id]\n\nclass DistributedHashTable:\n    def __init__(self):\n        self.hash_ring = ConsistentHashRing()\n        self.replication_factor = 3\n    \n    def add_node(self, node_id):\n        node = DHTNode(node_id)\n        self.hash_ring.add_node(node)\n        return node\n    \n    def put(self, key, value):\n        primary_node = self.hash_ring.get_node(key)\n        if primary_node:\n            primary_node.store(key, value)\n    \n    def get(self, key):\n        node = self.hash_ring.get_node(key)\n        return node.retrieve(key) if node else None\n    \n    def delete(self, key):\n        node = self.hash_ring.get_node(key)\n        return node.remove(key) if node else None\n\ndht = DistributedHashTable()\ndht.add_node('node_1')\ndht.add_node('node_2')\ndht.add_node('node_3')\n\ndht.put('user123', {'name': 'Alice', 'email': 'alice@example.com'})\nuser_data = dht.get('user123')"
  },
  {
    id: 102,
    title: "Container Runtime",
    level: "Expert",
    concept: "System Containers",
    description: "Build a simplified container runtime with isolation!",
    expectedOutput: "Container started with PID 12345",
    starterCode: "import os\nimport subprocess\nimport tempfile\nimport shutil\n\n# Simplified container runtime\nclass Container:\n    def __init__(self, image_path, command):\n        self.image_path = image_path\n        self.command = command\n        self.container_id = None\n        self.root_fs = None\n        self.pid = None\n    \n    def setup_filesystem(self):\n        # Create container root filesystem\n        self.root_fs = tempfile.mkdtemp(prefix='container_')\n        \n        # Copy image files to container fs (simplified)\n        if os.path.exists(self.image_path):\n            shutil.copytree(self.image_path, f'{self.root_fs}/app', dirs_exist_ok=True)\n        \n        # Create basic directory structure\n        os.makedirs(f'{self.root_fs}/proc', exist_ok=True)\n        os.makedirs(f'{self.root_fs}/sys', exist_ok=True)\n        os.makedirs(f'{self.root_fs}/tmp', exist_ok=True)\n    \n    def create_namespaces(self):\n        # In a real implementation, we'd use clone() with namespace flags\n        # This is a simplified simulation\n        pass\n    \n    def setup_cgroups(self):\n        # Set up control groups for resource limiting\n        # Simplified implementation\n        pass\n    \n    def start(self):\n        try:\n            self.setup_filesystem()\n            self.create_namespaces()\n            self.setup_cgroups()\n            \n            # Start the container process\n            # In reality, this would involve chroot, setting up namespaces, etc.\n            proc = subprocess.Popen(\n                self.command,\n                cwd=self.root_fs,\n                stdout=subprocess.PIPE,\n                stderr=subprocess.PIPE\n            )\n            \n            self.pid = proc.pid\n            self.container_id = f'container_{self.pid}'\n            \n            print(f'Container started with PID {self.pid}')\n            return self.container_id\n            \n        except Exception as e:\n            print(f'Failed to start container: {e}')\n            return None\n    \n    def stop(self):\n        if self.pid:\n            try:\n                os.kill(self.pid, 15)  # SIGTERM\n                print(f'Container {self.container_id} stopped')\n            except ProcessLookupError:\n                print('Container already stopped')\n    \n    def cleanup(self):\n        if self.root_fs and os.path.exists(self.root_fs):\n            shutil.rmtree(self.root_fs)\n\nclass ContainerRuntime:\n    def __init__(self):\n        self.containers = {}\n    \n    def run_container(self, image_path, command):\n        container = Container(image_path, command)\n        container_id = container.___\n        \n        if container_id:\n            self.containers[container_id] = container\n        \n        return container_id\n    \n    def stop_container(self, container_id):\n        if container_id in self.containers:\n            self.containers[container_id].stop()\n            self.containers[container_id].cleanup()\n            del self.containers[container_id]\n    \n    def list_containers(self):\n        return list(self.containers.keys())\n\n# Create runtime and start a container\nruntime = ContainerRuntime()\ncontainer_id = runtime.run_container('/tmp/test_image', ['echo', 'Hello from container'])",
    answerCode: "import os\nimport subprocess\nimport tempfile\nimport shutil\n\nclass Container:\n    def __init__(self, image_path, command):\n        self.image_path = image_path\n        self.command = command\n        self.container_id = None\n        self.root_fs = None\n        self.pid = None\n    \n    def setup_filesystem(self):\n        self.root_fs = tempfile.mkdtemp(prefix='container_')\n        \n        if os.path.exists(self.image_path):\n            shutil.copytree(self.image_path, f'{self.root_fs}/app', dirs_exist_ok=True)\n        \n        os.makedirs(f'{self.root_fs}/proc', exist_ok=True)\n        os.makedirs(f'{self.root_fs}/sys', exist_ok=True)\n        os.makedirs(f'{self.root_fs}/tmp', exist_ok=True)\n    \n    def create_namespaces(self):\n        pass\n    \n    def setup_cgroups(self):\n        pass\n    \n    def start(self):\n        try:\n            self.setup_filesystem()\n            self.create_namespaces()\n            self.setup_cgroups()\n            \n            proc = subprocess.Popen(\n                self.command,\n                cwd=self.root_fs,\n                stdout=subprocess.PIPE,\n                stderr=subprocess.PIPE\n            )\n            \n            self.pid = proc.pid\n            self.container_id = f'container_{self.pid}'\n            \n            print(f'Container started with PID {self.pid}')\n            return self.container_id\n            \n        except Exception as e:\n            print(f'Failed to start container: {e}')\n            return None\n    \n    def stop(self):\n        if self.pid:\n            try:\n                os.kill(self.pid, 15)\n                print(f'Container {self.container_id} stopped')\n            except ProcessLookupError:\n                print('Container already stopped')\n    \n    def cleanup(self):\n        if self.root_fs and os.path.exists(self.root_fs):\n            shutil.rmtree(self.root_fs)\n\nclass ContainerRuntime:\n    def __init__(self):\n        self.containers = {}\n    \n    def run_container(self, image_path, command):\n        container = Container(image_path, command)\n        container_id = container.start()\n        \n        if container_id:\n            self.containers[container_id] = container\n        \n        return container_id\n    \n    def stop_container(self, container_id):\n        if container_id in self.containers:\n            self.containers[container_id].stop()\n            self.containers[container_id].cleanup()\n            del self.containers[container_id]\n    \n    def list_containers(self):\n        return list(self.containers.keys())\n\nruntime = ContainerRuntime()\ncontainer_id = runtime.run_container('/tmp/test_image', ['echo', 'Hello from container'])"
  },
  {
    id: 103,
    title: "Language Model",
    level: "Expert",
    concept: "Natural Language Processing",
    description: "Implement a simple transformer-based language model!",
    expectedOutput: "Language model training completed",
    starterCode: "import math\nimport random\n\n# Simplified transformer language model\nclass MultiHeadAttention:\n    def __init__(self, d_model, num_heads):\n        self.d_model = d_model\n        self.num_heads = num_heads\n        self.d_k = d_model // num_heads\n        \n        # Weight matrices (simplified)\n        self.W_q = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_model)]\n        self.W_k = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_model)]\n        self.W_v = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_model)]\n    \n    def attention(self, Q, K, V):\n        # Simplified attention mechanism\n        seq_len = len(Q)\n        attention_scores = [[0] * seq_len for _ in range(seq_len)]\n        \n        # Calculate attention scores\n        for i in range(seq_len):\n            for j in range(seq_len):\n                score = sum(Q[i][k] * K[j][k] for k in range(self.d_k))\n                attention_scores[i][j] = score / math.sqrt(self.d_k)\n        \n        # Apply softmax (simplified)\n        for i in range(seq_len):\n            max_score = max(attention_scores[i])\n            exp_scores = [math.exp(score - max_score) for score in attention_scores[i]]\n            sum_exp = sum(exp_scores)\n            attention_scores[i] = [score / sum_exp for score in exp_scores]\n        \n        # Apply attention to values\n        output = [[0] * self.d_k for _ in range(seq_len)]\n        for i in range(seq_len):\n            for j in range(self.d_k):\n                output[i][j] = sum(attention_scores[i][k] * V[k][j] for k in range(seq_len))\n        \n        return output\n\nclass TransformerBlock:\n    def __init__(self, d_model, num_heads, d_ff):\n        self.attention = MultiHeadAttention(d_model, num_heads)\n        self.d_model = d_model\n        self.d_ff = d_ff\n        \n        # Feed forward network weights\n        self.W1 = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_ff)]\n        self.W2 = [[random.uniform(-0.1, 0.1) for _ in range(d_ff)] for _ in range(d_model)]\n    \n    def layer_norm(self, x):\n        # Simplified layer normalization\n        return x\n    \n    def feed_forward(self, x):\n        # Simple feed forward network\n        hidden = [[0] * self.d_ff for _ in range(len(x))]\n        for i in range(len(x)):\n            for j in range(self.d_ff):\n                hidden[i][j] = max(0, sum(x[i][k] * self.W1[j][k] for k in range(self.d_model)))\n        \n        output = [[0] * self.d_model for _ in range(len(x))]\n        for i in range(len(x)):\n            for j in range(self.d_model):\n                output[i][j] = sum(hidden[i][k] * self.W2[j][k] for k in range(self.d_ff))\n        \n        return output\n    \n    def forward(self, x):\n        # Multi-head attention\n        attn_output = self.attention.attention(x, x, x)\n        \n        # Add & norm\n        x = self.layer_norm([[x[i][j] + attn_output[i][j] for j in range(len(x[i]))] for i in range(len(x))])\n        \n        # Feed forward\n        ff_output = self.feed_forward(x)\n        \n        # Add & norm\n        output = self.layer_norm([[x[i][j] + ff_output[i][j] for j in range(len(x[i]))] for i in range(len(x))])\n        \n        return output\n\nclass LanguageModel:\n    def __init__(self, vocab_size, d_model=512, num_heads=8, num_layers=6):\n        self.vocab_size = vocab_size\n        self.d_model = d_model\n        self.num_layers = num_layers\n        \n        # Embedding layer\n        self.embeddings = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(vocab_size)]\n        \n        # Transformer blocks\n        self.blocks = [TransformerBlock(d_model, num_heads, d_model * 4) for _ in range(num_layers)]\n        \n        # Output projection\n        self.output_proj = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(vocab_size)]\n    \n    def embed(self, tokens):\n        return [self.embeddings[token] for token in tokens]\n    \n    def forward(self, tokens):\n        # Embedding\n        x = self.embed(tokens)\n        \n        # Transformer blocks\n        for block in self.blocks:\n            x = block.___(x)\n        \n        # Output projection (simplified)\n        logits = [[sum(x[i][j] * self.output_proj[k][j] for j in range(self.d_model)) for k in range(self.vocab_size)] for i in range(len(x))]\n        \n        return logits\n    \n    def train_step(self, input_tokens, target_tokens):\n        # Forward pass\n        logits = self.forward(input_tokens)\n        \n        # Calculate loss (simplified cross-entropy)\n        loss = 0\n        for i, target in enumerate(target_tokens):\n            if i < len(logits):\n                max_logit = max(logits[i])\n                exp_logits = [math.exp(logit - max_logit) for logit in logits[i]]\n                sum_exp = sum(exp_logits)\n                prob = exp_logits[target] / sum_exp\n                loss -= math.log(max(prob, 1e-10))\n        \n        return loss / len(target_tokens)\n\n# Create and train a simple language model\nvocab_size = 1000\nmodel = LanguageModel(vocab_size, d_model=128, num_heads=4, num_layers=2)\n\n# Sample training data (token indices)\ninput_tokens = [1, 2, 3, 4]\ntarget_tokens = [2, 3, 4, 5]\n\n# Training loop (simplified)\nfor epoch in range(10):\n    loss = model.train_step(input_tokens, target_tokens)\n    \nprint('Language model training completed')",
    answerCode: "import math\nimport random\n\nclass MultiHeadAttention:\n    def __init__(self, d_model, num_heads):\n        self.d_model = d_model\n        self.num_heads = num_heads\n        self.d_k = d_model // num_heads\n        \n        self.W_q = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_model)]\n        self.W_k = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_model)]\n        self.W_v = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_model)]\n    \n    def attention(self, Q, K, V):\n        seq_len = len(Q)\n        attention_scores = [[0] * seq_len for _ in range(seq_len)]\n        \n        for i in range(seq_len):\n            for j in range(seq_len):\n                score = sum(Q[i][k] * K[j][k] for k in range(self.d_k))\n                attention_scores[i][j] = score / math.sqrt(self.d_k)\n        \n        for i in range(seq_len):\n            max_score = max(attention_scores[i])\n            exp_scores = [math.exp(score - max_score) for score in attention_scores[i]]\n            sum_exp = sum(exp_scores)\n            attention_scores[i] = [score / sum_exp for score in exp_scores]\n        \n        output = [[0] * self.d_k for _ in range(seq_len)]\n        for i in range(seq_len):\n            for j in range(self.d_k):\n                output[i][j] = sum(attention_scores[i][k] * V[k][j] for k in range(seq_len))\n        \n        return output\n\nclass TransformerBlock:\n    def __init__(self, d_model, num_heads, d_ff):\n        self.attention = MultiHeadAttention(d_model, num_heads)\n        self.d_model = d_model\n        self.d_ff = d_ff\n        \n        self.W1 = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(d_ff)]\n        self.W2 = [[random.uniform(-0.1, 0.1) for _ in range(d_ff)] for _ in range(d_model)]\n    \n    def layer_norm(self, x):\n        return x\n    \n    def feed_forward(self, x):\n        hidden = [[0] * self.d_ff for _ in range(len(x))]\n        for i in range(len(x)):\n            for j in range(self.d_ff):\n                hidden[i][j] = max(0, sum(x[i][k] * self.W1[j][k] for k in range(self.d_model)))\n        \n        output = [[0] * self.d_model for _ in range(len(x))]\n        for i in range(len(x)):\n            for j in range(self.d_model):\n                output[i][j] = sum(hidden[i][k] * self.W2[j][k] for k in range(self.d_ff))\n        \n        return output\n    \n    def forward(self, x):\n        attn_output = self.attention.attention(x, x, x)\n        \n        x = self.layer_norm([[x[i][j] + attn_output[i][j] for j in range(len(x[i]))] for i in range(len(x))])\n        \n        ff_output = self.feed_forward(x)\n        \n        output = self.layer_norm([[x[i][j] + ff_output[i][j] for j in range(len(x[i]))] for i in range(len(x))])\n        \n        return output\n\nclass LanguageModel:\n    def __init__(self, vocab_size, d_model=512, num_heads=8, num_layers=6):\n        self.vocab_size = vocab_size\n        self.d_model = d_model\n        self.num_layers = num_layers\n        \n        self.embeddings = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(vocab_size)]\n        \n        self.blocks = [TransformerBlock(d_model, num_heads, d_model * 4) for _ in range(num_layers)]\n        \n        self.output_proj = [[random.uniform(-0.1, 0.1) for _ in range(d_model)] for _ in range(vocab_size)]\n    \n    def embed(self, tokens):\n        return [self.embeddings[token] for token in tokens]\n    \n    def forward(self, tokens):\n        x = self.embed(tokens)\n        \n        for block in self.blocks:\n            x = block.forward(x)\n        \n        logits = [[sum(x[i][j] * self.output_proj[k][j] for j in range(self.d_model)) for k in range(self.vocab_size)] for i in range(len(x))]\n        \n        return logits\n    \n    def train_step(self, input_tokens, target_tokens):\n        logits = self.forward(input_tokens)\n        \n        loss = 0\n        for i, target in enumerate(target_tokens):\n            if i < len(logits):\n                max_logit = max(logits[i])\n                exp_logits = [math.exp(logit - max_logit) for logit in logits[i]]\n                sum_exp = sum(exp_logits)\n                prob = exp_logits[target] / sum_exp\n                loss -= math.log(max(prob, 1e-10))\n        \n        return loss / len(target_tokens)\n\nvocab_size = 1000\nmodel = LanguageModel(vocab_size, d_model=128, num_heads=4, num_layers=2)\n\ninput_tokens = [1, 2, 3, 4]\ntarget_tokens = [2, 3, 4, 5]\n\nfor epoch in range(10):\n    loss = model.train_step(input_tokens, target_tokens)\n    \nprint('Language model training completed')"
  },
  {
    id: 104,
    title: "Distributed Transaction",
    level: "Expert",
    concept: "Distributed Systems",
    description: "Implement two-phase commit protocol for distributed transactions!",
    expectedOutput: "Transaction committed across all nodes",
    starterCode: "import time\nimport random\nfrom enum import Enum\n\n# Two-phase commit protocol\nclass TransactionState(Enum):\n    INIT = 'init'\n    PREPARED = 'prepared'\n    COMMITTED = 'committed'\n    ABORTED = 'aborted'\n\nclass Participant:\n    def __init__(self, node_id):\n        self.node_id = node_id\n        self.state = TransactionState.INIT\n        self.transaction_log = []\n        self.data = {}\n    \n    def prepare(self, transaction_id, operations):\n        try:\n            # Simulate some processing time\n            time.sleep(random.uniform(0.01, 0.05))\n            \n            # Simulate failure (10% chance)\n            if random.random() < 0.1:\n                self.state = TransactionState.ABORTED\n                return False\n            \n            # Prepare the transaction\n            self.transaction_log.append({\n                'transaction_id': transaction_id,\n                'operations': operations,\n                'state': 'prepared'\n            })\n            \n            self.state = TransactionState.PREPARED\n            print(f'Node {self.node_id}: Prepared transaction {transaction_id}')\n            return True\n            \n        except Exception as e:\n            self.state = TransactionState.ABORTED\n            print(f'Node {self.node_id}: Failed to prepare transaction {transaction_id}: {e}')\n            return False\n    \n    def commit(self, transaction_id):\n        try:\n            # Find the transaction in log\n            for entry in self.transaction_log:\n                if entry['transaction_id'] == transaction_id:\n                    # Apply the operations\n                    for op in entry['operations']:\n                        if op['type'] == 'set':\n                            self.data[op['key']] = op['value']\n                        elif op['type'] == 'delete':\n                            self.data.pop(op['key'], None)\n                    \n                    entry['state'] = 'committed'\n                    self.state = TransactionState.COMMITTED\n                    print(f'Node {self.node_id}: Committed transaction {transaction_id}')\n                    return True\n            \n            return False\n            \n        except Exception as e:\n            self.state = TransactionState.ABORTED\n            print(f'Node {self.node_id}: Failed to commit transaction {transaction_id}: {e}')\n            return False\n    \n    def abort(self, transaction_id):\n        # Remove transaction from log\n        self.transaction_log = [entry for entry in self.transaction_log if entry['transaction_id'] != transaction_id]\n        self.state = TransactionState.ABORTED\n        print(f'Node {self.node_id}: Aborted transaction {transaction_id}')\n\nclass TransactionCoordinator:\n    def __init__(self):\n        self.participants = []\n        self.transaction_counter = 0\n    \n    def add_participant(self, participant):\n        self.participants.append(participant)\n    \n    def execute_transaction(self, operations_per_node):\n        transaction_id = self.transaction_counter\n        self.transaction_counter += 1\n        \n        print(f'Starting transaction {transaction_id}')\n        \n        # Phase 1: Prepare\n        prepare_responses = []\n        for i, participant in enumerate(self.participants):\n            operations = operations_per_node.get(i, [])\n            response = participant.___(transaction_id, operations)\n            prepare_responses.append(response)\n        \n        # Check if all participants prepared successfully\n        all_prepared = all(prepare_responses)\n        \n        if all_prepared:\n            # Phase 2: Commit\n            print(f'All nodes prepared. Committing transaction {transaction_id}')\n            commit_responses = []\n            \n            for participant in self.participants:\n                response = participant.___(transaction_id)\n                commit_responses.append(response)\n            \n            if all(commit_responses):\n                print('Transaction committed across all nodes')\n                return True\n            else:\n                print('Some nodes failed to commit. Transaction partially committed.')\n                return False\n        else:\n            # Phase 2: Abort\n            print(f'Some nodes failed to prepare. Aborting transaction {transaction_id}')\n            for participant in self.participants:\n                participant.___(transaction_id)\n            return False\n\n# Create coordinator and participants\ncoordinator = TransactionCoordinator()\ncoordinator.add_participant(Participant('node_1'))\ncoordinator.add_participant(Participant('node_2'))\ncoordinator.add_participant(Participant('node_3'))\n\n# Execute a distributed transaction\noperations = {\n    0: [{'type': 'set', 'key': 'user_1', 'value': {'balance': 100}}],\n    1: [{'type': 'set', 'key': 'user_2', 'value': {'balance': 50}}],\n    2: [{'type': 'set', 'key': 'transaction_log', 'value': {'transfer': 25}}]\n}\n\nresult = coordinator.execute_transaction(operations)",
    answerCode: "import time\nimport random\nfrom enum import Enum\n\nclass TransactionState(Enum):\n    INIT = 'init'\n    PREPARED = 'prepared'\n    COMMITTED = 'committed'\n    ABORTED = 'aborted'\n\nclass Participant:\n    def __init__(self, node_id):\n        self.node_id = node_id\n        self.state = TransactionState.INIT\n        self.transaction_log = []\n        self.data = {}\n    \n    def prepare(self, transaction_id, operations):\n        try:\n            time.sleep(random.uniform(0.01, 0.05))\n            \n            if random.random() < 0.1:\n                self.state = TransactionState.ABORTED\n                return False\n            \n            self.transaction_log.append({\n                'transaction_id': transaction_id,\n                'operations': operations,\n                'state': 'prepared'\n            })\n            \n            self.state = TransactionState.PREPARED\n            print(f'Node {self.node_id}: Prepared transaction {transaction_id}')\n            return True\n            \n        except Exception as e:\n            self.state = TransactionState.ABORTED\n            print(f'Node {self.node_id}: Failed to prepare transaction {transaction_id}: {e}')\n            return False\n    \n    def commit(self, transaction_id):\n        try:\n            for entry in self.transaction_log:\n                if entry['transaction_id'] == transaction_id:\n                    for op in entry['operations']:\n                        if op['type'] == 'set':\n                            self.data[op['key']] = op['value']\n                        elif op['type'] == 'delete':\n                            self.data.pop(op['key'], None)\n                    \n                    entry['state'] = 'committed'\n                    self.state = TransactionState.COMMITTED\n                    print(f'Node {self.node_id}: Committed transaction {transaction_id}')\n                    return True\n            \n            return False\n            \n        except Exception as e:\n            self.state = TransactionState.ABORTED\n            print(f'Node {self.node_id}: Failed to commit transaction {transaction_id}: {e}')\n            return False\n    \n    def abort(self, transaction_id):\n        self.transaction_log = [entry for entry in self.transaction_log if entry['transaction_id'] != transaction_id]\n        self.state = TransactionState.ABORTED\n        print(f'Node {self.node_id}: Aborted transaction {transaction_id}')\n\nclass TransactionCoordinator:\n    def __init__(self):\n        self.participants = []\n        self.transaction_counter = 0\n    \n    def add_participant(self, participant):\n        self.participants.append(participant)\n    \n    def execute_transaction(self, operations_per_node):\n        transaction_id = self.transaction_counter\n        self.transaction_counter += 1\n        \n        print(f'Starting transaction {transaction_id}')\n        \n        prepare_responses = []\n        for i, participant in enumerate(self.participants):\n            operations = operations_per_node.get(i, [])\n            response = participant.prepare(transaction_id, operations)\n            prepare_responses.append(response)\n        \n        all_prepared = all(prepare_responses)\n        \n        if all_prepared:\n            print(f'All nodes prepared. Committing transaction {transaction_id}')\n            commit_responses = []\n            \n            for participant in self.participants:\n                response = participant.commit(transaction_id)\n                commit_responses.append(response)\n            \n            if all(commit_responses):\n                print('Transaction committed across all nodes')\n                return True\n            else:\n                print('Some nodes failed to commit. Transaction partially committed.')\n                return False\n        else:\n            print(f'Some nodes failed to prepare. Aborting transaction {transaction_id}')\n            for participant in self.participants:\n                participant.abort(transaction_id)\n            return False\n\ncoordinator = TransactionCoordinator()\ncoordinator.add_participant(Participant('node_1'))\ncoordinator.add_participant(Participant('node_2'))\ncoordinator.add_participant(Participant('node_3'))\n\noperations = {\n    0: [{'type': 'set', 'key': 'user_1', 'value': {'balance': 100}}],\n    1: [{'type': 'set', 'key': 'user_2', 'value': {'balance': 50}}],\n    2: [{'type': 'set', 'key': 'transaction_log', 'value': {'transfer': 25}}]\n}\n\nresult = coordinator.execute_transaction(operations)"
  },
  {
    id: 105,
    title: "Quantum Error Correction",
    level: "Expert",
    concept: "Quantum Computing",
    description: "Implement quantum error correction using the 3-qubit bit-flip code!",
    expectedOutput: "Quantum error correction successful",
    starterCode: "import random\nimport math\n\n# Quantum error correction - 3-qubit bit-flip code\nclass Qubit:\n    def __init__(self, alpha=1.0, beta=0.0):\n        # Quantum state: alpha|0⟩ + beta|1⟩\n        self.alpha = alpha\n        self.beta = beta\n        self.normalize()\n    \n    def normalize(self):\n        norm = math.sqrt(abs(self.alpha)**2 + abs(self.beta)**2)\n        if norm > 0:\n            self.alpha /= norm\n            self.beta /= norm\n    \n    def measure(self):\n        # Probabilistic measurement\n        prob_zero = abs(self.alpha)**2\n        return 0 if random.random() < prob_zero else 1\n    \n    def apply_x_gate(self):\n        # Pauli-X gate (bit flip)\n        self.alpha, self.beta = self.beta, self.alpha\n    \n    def apply_error(self, error_prob=0.1):\n        if random.random() < error_prob:\n            self.apply_x_gate()\n            return True\n        return False\n\nclass QuantumErrorCorrection:\n    def __init__(self):\n        self.qubits = []\n    \n    def encode_logical_qubit(self, logical_qubit):\n        # Encode 1 logical qubit into 3 physical qubits\n        # |ψ⟩ = α|0⟩ + β|1⟩ → α|000⟩ + β|111⟩\n        self.qubits = [\n            Qubit(logical_qubit.alpha, logical_qubit.beta),\n            Qubit(logical_qubit.alpha, logical_qubit.beta),\n            Qubit(logical_qubit.alpha, logical_qubit.beta)\n        ]\n        \n        print('Logical qubit encoded into 3 physical qubits')\n    \n    def apply_errors(self, error_prob=0.1):\n        errors = []\n        for i, qubit in enumerate(self.qubits):\n            error_occurred = qubit.apply_error(error_prob)\n            errors.append(error_occurred)\n            if error_occurred:\n                print(f'Error applied to qubit {i}')\n        return errors\n    \n    def measure_syndrome(self):\n        # Measure parity checks for error detection\n        # In a real implementation, this would use ancilla qubits\n        measurements = [qubit.measure() for qubit in self.qubits]\n        \n        # Calculate syndrome\n        s1 = measurements[0] ^ measurements[1]  # Check qubits 0 and 1\n        s2 = measurements[1] ^ measurements[2]  # Check qubits 1 and 2\n        \n        syndrome = (s1 << 1) | s2\n        print(f'Syndrome: {syndrome:02b}')\n        return syndrome\n    \n    def correct_error(self, syndrome):\n        # Error correction based on syndrome\n        if syndrome == 0b00:\n            print('No error detected')\n        elif syndrome == 0b01:\n            print('Error detected on qubit 2, correcting...')\n            self.qubits[2].apply_x_gate()\n        elif syndrome == 0b10:\n            print('Error detected on qubit 0, correcting...')\n            self.qubits[0].apply_x_gate()\n        elif syndrome == 0b11:\n            print('Error detected on qubit 1, correcting...')\n            self.qubits[1].apply_x_gate()\n    \n    def decode_logical_qubit(self):\n        # Majority vote to determine logical state\n        measurements = [qubit.measure() for qubit in self.qubits]\n        logical_bit = 1 if sum(measurements) >= 2 else 0\n        \n        # Reconstruct logical qubit (simplified)\n        if logical_bit == 0:\n            return Qubit(1.0, 0.0)  # |0⟩\n        else:\n            return Qubit(0.0, 1.0)  # |1⟩\n    \n    def run_error_correction(self, logical_qubit):\n        print('Starting quantum error correction...')\n        \n        # Step 1: Encode\n        self.___(logical_qubit)\n        \n        # Step 2: Apply errors\n        errors = self.apply_errors(error_prob=0.3)\n        \n        # Step 3: Error detection and correction\n        syndrome = self.___\n        self.___(syndrome)\n        \n        # Step 4: Decode\n        corrected_qubit = self.___\n        \n        print('Quantum error correction successful')\n        return corrected_qubit\n\n# Test the quantum error correction\nqec = QuantumErrorCorrection()\n\n# Create a logical qubit in superposition\nlogical_qubit = Qubit(1/math.sqrt(2), 1/math.sqrt(2))  # |+⟩ state\n\n# Run error correction\ncorrected_qubit = qec.run_error_correction(logical_qubit)",
    answerCode: "import random\nimport math\n\nclass Qubit:\n    def __init__(self, alpha=1.0, beta=0.0):\n        self.alpha = alpha\n        self.beta = beta\n        self.normalize()\n    \n    def normalize(self):\n        norm = math.sqrt(abs(self.alpha)**2 + abs(self.beta)**2)\n        if norm > 0:\n            self.alpha /= norm\n            self.beta /= norm\n    \n    def measure(self):\n        prob_zero = abs(self.alpha)**2\n        return 0 if random.random() < prob_zero else 1\n    \n    def apply_x_gate(self):\n        self.alpha, self.beta = self.beta, self.alpha\n    \n    def apply_error(self, error_prob=0.1):\n        if random.random() < error_prob:\n            self.apply_x_gate()\n            return True\n        return False\n\nclass QuantumErrorCorrection:\n    def __init__(self):\n        self.qubits = []\n    \n    def encode_logical_qubit(self, logical_qubit):\n        self.qubits = [\n            Qubit(logical_qubit.alpha, logical_qubit.beta),\n            Qubit(logical_qubit.alpha, logical_qubit.beta),\n            Qubit(logical_qubit.alpha, logical_qubit.beta)\n        ]\n        \n        print('Logical qubit encoded into 3 physical qubits')\n    \n    def apply_errors(self, error_prob=0.1):\n        errors = []\n        for i, qubit in enumerate(self.qubits):\n            error_occurred = qubit.apply_error(error_prob)\n            errors.append(error_occurred)\n            if error_occurred:\n                print(f'Error applied to qubit {i}')\n        return errors\n    \n    def measure_syndrome(self):\n        measurements = [qubit.measure() for qubit in self.qubits]\n        \n        s1 = measurements[0] ^ measurements[1]\n        s2 = measurements[1] ^ measurements[2]\n        \n        syndrome = (s1 << 1) | s2\n        print(f'Syndrome: {syndrome:02b}')\n        return syndrome\n    \n    def correct_error(self, syndrome):\n        if syndrome == 0b00:\n            print('No error detected')\n        elif syndrome == 0b01:\n            print('Error detected on qubit 2, correcting...')\n            self.qubits[2].apply_x_gate()\n        elif syndrome == 0b10:\n            print('Error detected on qubit 0, correcting...')\n            self.qubits[0].apply_x_gate()\n        elif syndrome == 0b11:\n            print('Error detected on qubit 1, correcting...')\n            self.qubits[1].apply_x_gate()\n    \n    def decode_logical_qubit(self):\n        measurements = [qubit.measure() for qubit in self.qubits]\n        logical_bit = 1 if sum(measurements) >= 2 else 0\n        \n        if logical_bit == 0:\n            return Qubit(1.0, 0.0)\n        else:\n            return Qubit(0.0, 1.0)\n    \n    def run_error_correction(self, logical_qubit):\n        print('Starting quantum error correction...')\n        \n        self.encode_logical_qubit(logical_qubit)\n        \n        errors = self.apply_errors(error_prob=0.3)\n        \n        syndrome = self.measure_syndrome()\n        self.correct_error(syndrome)\n        \n        corrected_qubit = self.decode_logical_qubit()\n        \n        print('Quantum error correction successful')\n        return corrected_qubit\n\nqec = QuantumErrorCorrection()\n\nlogical_qubit = Qubit(1/math.sqrt(2), 1/math.sqrt(2))\n\ncorrected_qubit = qec.run_error_correction(logical_qubit)"
  }
];

export default codingPuzzles;
