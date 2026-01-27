export interface PuzzleHintContent {
    level_id: number;
    hints: {
        encouragement: string;
        direction: string;
        specific: string;
        solution: string;
    };
}

export const localPuzzleHints: Record<number, PuzzleHintContent> = {
    1: {
        level_id: 1,
        hints: {
            encouragement: "You've got this! Just typing 'Hello, World!' is the first step of every great coder.",
            direction: "Look at the starter code. You need to put a string inside the print() function.",
            specific: "Type 'Hello, World!' (don't forget the quotes and exclamation mark) inside the parentheses.",
            solution: "print('Hello, World!')"
        }
    },
    2: {
        level_id: 2,
        hints: {
            encouragement: "Variables are like containers! You're doing great.",
            direction: "Create a variable named 'name' and assign your name to it as a string.",
            specific: "Set name = 'YourName' and then print 'My name is', name.",
            solution: "name = 'Alice'\nprint('My name is', name)"
        }
    },
    3: {
        level_id: 3,
        hints: {
            encouragement: "Math is easy for a wizard like you!",
            direction: "Use the + operator to sum 8 and 7.",
            specific: "Update the code to result = 8 + 7.",
            solution: "result = 8 + 7\nprint(result)"
        }
    },
    4: {
        level_id: 4,
        hints: {
            encouragement: "Getting input makes your programs interactive!",
            direction: "Use input() to get the age and then print it.",
            specific: "age = input('What is your age? ') and then print out the result.",
            solution: "age = input('What is your age? ')\nprint('You are', age, 'years old')"
        }
    },
    5: {
        level_id: 5,
        hints: {
            encouragement: "Converting values is a common programming task!",
            direction: "The formula is (Celsius * 9/5) + 32.",
            specific: "Update the fahrenheit variable using the formula: fahrenheit = (celsius * 9/5) + 32.",
            solution: "celsius = 32\nfahrenheit = (celsius * 9/5) + 32\nprint(f'{celsius}°C is {fahrenheit}°F')"
        }
    },
    6: {
        level_id: 6,
        hints: {
            encouragement: "Randomness adds fun to games!",
            direction: "Use random.randint(1, 100) to get a number between 1 and 100.",
            specific: "Call random.randint with 1 and 100 as arguments.",
            solution: "import random\nlucky = random.randint(1, 100)\nprint('Your lucky number is:', lucky)"
        }
    },
    7: {
        level_id: 7,
        hints: {
            encouragement: "Counting characters is a basic string operation!",
            direction: "Use the len() function to find the length of the string.",
            specific: "Set length = len(message).",
            solution: "message = 'Hello, World!'\nlength = len(message)\nprint('The message has', length, 'characters')"
        }
    },
    8: {
        level_id: 8,
        hints: {
            encouragement: "Using math constants like Pi makes your code more accurate!",
            direction: "The area of a circle is Pi * r^2. Use math.pi and the ** operator.",
            specific: "Set area = math.pi * radius ** 2.",
            solution: "import math\nradius = 5\narea = math.pi * radius ** 2\nprint(f'Area: {area:.2f}')"
        }
    },
    9: {
        level_id: 9,
        hints: {
            encouragement: "String methods allow you to transform text easily!",
            direction: "Use the .upper() method to convert the string to uppercase.",
            specific: "Set result = text.upper().",
            solution: "text = 'python is awesome'\nresult = text.upper()\nprint(result)"
        }
    },
    10: {
        level_id: 10,
        hints: {
            encouragement: "Booleans represent the core of logic!",
            direction: "Assign True or False values to the variables.",
            specific: "is_learning = True and is_bored = False.",
            solution: "is_learning = True\nis_bored = False\nprint(is_learning, is_bored)"
        }
    }
};

export const getLocalHint = (levelId: number, type: string): string | null => {
    const levelHints = localPuzzleHints[levelId];
    if (!levelHints) return null;
    return (levelHints.hints as any)[type] || null;
};
