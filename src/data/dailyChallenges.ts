
// Daily challenges seeded by date — same puzzle for all users each day
export interface DailyPuzzle {
    id: string;
    date: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    language: string;
    starterCode: string;
    solution: string;
    expectedOutput: string;
    concept: string;
    shareText: string;
}

// Pool of 30 daily challenges — all JavaScript so they execute client-side
const challengePool: Omit<DailyPuzzle, 'id' | 'date'>[] = [
    {
        title: 'Sum of Two Numbers',
        description: 'Write a function add(a, b) that returns the sum of two numbers. Call it with (3, 4) and log the result.',
        difficulty: 'easy', language: 'JavaScript', concept: 'Functions',
        starterCode: 'function add(a, b) {\n  // your code here\n}\n\nconsole.log(add(3, 4));',
        solution: 'function add(a, b) { return a + b; } console.log(add(3, 4));',
        expectedOutput: '7',
        shareText: "solved today's Codio Daily: \"Sum of Two Numbers\"",
    },
    {
        title: 'Reverse a String',
        description: 'Write a function reverse(s) that returns the reversed string. Test with "hello".',
        difficulty: 'easy', language: 'JavaScript', concept: 'Strings',
        starterCode: 'function reverse(s) {\n  // your code here\n}\n\nconsole.log(reverse("hello"));',
        solution: 'function reverse(s) { return s.split("").reverse().join(""); } console.log(reverse("hello"));',
        expectedOutput: 'olleh',
        shareText: "solved today's Codio Daily: \"Reverse a String\"",
    },
    {
        title: 'FizzBuzz',
        description: 'For numbers 1-15: print "Fizz" if divisible by 3, "Buzz" if by 5, "FizzBuzz" if both, else the number.',
        difficulty: 'easy', language: 'JavaScript', concept: 'Loops & Conditionals',
        starterCode: 'for (let i = 1; i <= 15; i++) {\n  // your code here\n}',
        solution: 'for (let i = 1; i <= 15; i++) { if (i % 15 === 0) console.log("FizzBuzz"); else if (i % 3 === 0) console.log("Fizz"); else if (i % 5 === 0) console.log("Buzz"); else console.log(i); }',
        expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
        shareText: "solved today's Codio Daily: \"FizzBuzz\"",
    },
    {
        title: 'Count Vowels',
        description: 'Write countVowels(s) that returns the number of vowels in a string. Test with "hello world".',
        difficulty: 'easy', language: 'JavaScript', concept: 'String Manipulation',
        starterCode: 'function countVowels(s) {\n  // your code here\n}\n\nconsole.log(countVowels("hello world"));',
        solution: 'function countVowels(s) { return (s.match(/[aeiou]/gi) || []).length; } console.log(countVowels("hello world"));',
        expectedOutput: '3',
        shareText: "solved today's Codio Daily: \"Count Vowels\"",
    },
    {
        title: 'Find the Maximum',
        description: 'Write findMax(nums) without using Math.max(). Test with [3, 1, 9, 2, 7].',
        difficulty: 'easy', language: 'JavaScript', concept: 'Loops',
        starterCode: 'function findMax(nums) {\n  // your code here\n}\n\nconsole.log(findMax([3, 1, 9, 2, 7]));',
        solution: 'function findMax(nums) { let m = nums[0]; for (const n of nums) { if (n > m) m = n; } return m; } console.log(findMax([3, 1, 9, 2, 7]));',
        expectedOutput: '9',
        shareText: "solved today's Codio Daily: \"Find the Maximum\"",
    },
    {
        title: 'Palindrome Check',
        description: 'Write isPalindrome(s) that returns true if s reads the same forwards and backwards. Test with "racecar".',
        difficulty: 'easy', language: 'JavaScript', concept: 'String Operations',
        starterCode: 'function isPalindrome(s) {\n  // your code here\n}\n\nconsole.log(isPalindrome("racecar"));',
        solution: 'function isPalindrome(s) { return s === s.split("").reverse().join(""); } console.log(isPalindrome("racecar"));',
        expectedOutput: 'true',
        shareText: "solved today's Codio Daily: \"Palindrome Check\"",
    },
    {
        title: 'Factorial',
        description: 'Write factorial(n) that returns n! Test with factorial(5).',
        difficulty: 'easy', language: 'JavaScript', concept: 'Recursion',
        starterCode: 'function factorial(n) {\n  // your code here\n}\n\nconsole.log(factorial(5));',
        solution: 'function factorial(n) { if (n <= 1) return 1; return n * factorial(n - 1); } console.log(factorial(5));',
        expectedOutput: '120',
        shareText: "solved today's Codio Daily: \"Factorial\"",
    },
    {
        title: 'Sum of Array',
        description: 'Write sumArray(nums) that returns the sum of all numbers in the array. Test with [1, 2, 3, 4, 5].',
        difficulty: 'easy', language: 'JavaScript', concept: 'Arrays',
        starterCode: 'function sumArray(nums) {\n  // your code here\n}\n\nconsole.log(sumArray([1, 2, 3, 4, 5]));',
        solution: 'function sumArray(nums) { return nums.reduce((a, b) => a + b, 0); } console.log(sumArray([1, 2, 3, 4, 5]));',
        expectedOutput: '15',
        shareText: "solved today's Codio Daily: \"Sum of Array\"",
    },
    {
        title: 'Fibonacci',
        description: 'Write fib(n) that returns the nth Fibonacci number using iteration. Test with fib(8).',
        difficulty: 'medium', language: 'JavaScript', concept: 'Loops',
        starterCode: 'function fib(n) {\n  // your code here\n}\n\nconsole.log(fib(8));',
        solution: 'function fib(n) { if (n <= 1) return n; let a = 0, b = 1; for (let i = 2; i <= n; i++) { [a, b] = [b, a + b]; } return b; } console.log(fib(8));',
        expectedOutput: '21',
        shareText: "solved today's Codio Daily: \"Fibonacci\"",
    },
    {
        title: 'Valid Brackets',
        description: 'Write isValid(s) that checks if brackets are balanced. Test with isValid("()[]{}").',
        difficulty: 'medium', language: 'JavaScript', concept: 'Stacks',
        starterCode: 'function isValid(s) {\n  // your code here\n}\n\nconsole.log(isValid("()[]{}"));',
        solution: 'function isValid(s) { const stack = []; const map = { ")": "(", "}": "{", "]": "[" }; for (const c of s) { if (map[c]) { if (stack.pop() !== map[c]) return false; } else stack.push(c); } return stack.length === 0; } console.log(isValid("()[]{}"));',
        expectedOutput: 'true',
        shareText: "solved today's Codio Daily: \"Valid Brackets\"",
    },
    {
        title: 'Two Sum',
        description: 'Write twoSum(nums, target) that finds two indices whose values sum to target. Test with ([2, 7, 11, 15], 9).',
        difficulty: 'medium', language: 'JavaScript', concept: 'Hash Maps',
        starterCode: 'function twoSum(nums, target) {\n  // your code here\n}\n\nconsole.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));',
        solution: 'function twoSum(nums, target) { const seen = {}; for (let i = 0; i < nums.length; i++) { const comp = target - nums[i]; if (seen[comp] !== undefined) return [seen[comp], i]; seen[nums[i]] = i; } } console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));',
        expectedOutput: '[0,1]',
        shareText: "solved today's Codio Daily: \"Two Sum\"",
    },
    {
        title: 'Flatten Array',
        description: 'Write flatten(arr) that flattens a nested array one level deep. Test with [[1,2],[3,4],[5]].',
        difficulty: 'medium', language: 'JavaScript', concept: 'Arrays',
        starterCode: 'function flatten(arr) {\n  // your code here\n}\n\nconsole.log(JSON.stringify(flatten([[1,2],[3,4],[5]])));',
        solution: 'function flatten(arr) { return arr.reduce((acc, cur) => acc.concat(cur), []); } console.log(JSON.stringify(flatten([[1,2],[3,4],[5]])));',
        expectedOutput: '[1,2,3,4,5]',
        shareText: "solved today's Codio Daily: \"Flatten Array\"",
    },
    {
        title: 'Remove Duplicates',
        description: 'Write removeDups(arr) that removes duplicate values from an array. Test with [1,2,2,3,3,4].',
        difficulty: 'medium', language: 'JavaScript', concept: 'Sets',
        starterCode: 'function removeDups(arr) {\n  // your code here\n}\n\nconsole.log(JSON.stringify(removeDups([1,2,2,3,3,4])));',
        solution: 'function removeDups(arr) { return [...new Set(arr)]; } console.log(JSON.stringify(removeDups([1,2,2,3,3,4])));',
        expectedOutput: '[1,2,3,4]',
        shareText: "solved today's Codio Daily: \"Remove Duplicates\"",
    },
    {
        title: 'Count Words',
        description: 'Write countWords(str) that counts unique words. Log the count for "the quick brown fox jumps over the lazy dog".',
        difficulty: 'medium', language: 'JavaScript', concept: 'Objects',
        starterCode: 'function countWords(str) {\n  // your code here\n}\n\nconsole.log(countWords("the quick brown fox jumps over the lazy dog"));',
        solution: 'function countWords(str) { const words = str.split(" "); const counts = {}; for (const w of words) counts[w] = (counts[w] || 0) + 1; return Object.keys(counts).length; } console.log(countWords("the quick brown fox jumps over the lazy dog"));',
        expectedOutput: '8',
        shareText: "solved today's Codio Daily: \"Count Words\"",
    },
    {
        title: 'Longest Word',
        description: 'Write longestWord(str) that returns the longest word. Test with "The quick brown fox".',
        difficulty: 'medium', language: 'JavaScript', concept: 'String Manipulation',
        starterCode: 'function longestWord(str) {\n  // your code here\n}\n\nconsole.log(longestWord("The quick brown fox"));',
        solution: 'function longestWord(str) { return str.split(" ").reduce((a, b) => a.length >= b.length ? a : b); } console.log(longestWord("The quick brown fox"));',
        expectedOutput: 'quick',
        shareText: "solved today's Codio Daily: \"Longest Word\"",
    },
    {
        title: 'Binary Search',
        description: 'Write binarySearch(nums, target) that returns the index or -1. Test with ([1,3,5,7,9], 7).',
        difficulty: 'hard', language: 'JavaScript', concept: 'Binary Search',
        starterCode: 'function binarySearch(nums, target) {\n  // your code here\n}\n\nconsole.log(binarySearch([1,3,5,7,9], 7));',
        solution: 'function binarySearch(nums, target) { let l = 0, r = nums.length - 1; while (l <= r) { const m = (l + r) >> 1; if (nums[m] === target) return m; nums[m] < target ? l = m + 1 : r = m - 1; } return -1; } console.log(binarySearch([1,3,5,7,9], 7));',
        expectedOutput: '3',
        shareText: "solved today's Codio Daily: \"Binary Search\"",
    },
    {
        title: 'Deep Clone',
        description: 'Write deepClone(obj) that creates a deep copy without using JSON.parse/stringify. Test and log result.',
        difficulty: 'hard', language: 'JavaScript', concept: 'Objects & Recursion',
        starterCode: 'function deepClone(obj) {\n  // your code here\n}\n\nconst original = { a: 1, b: { c: 2 } };\nconst clone = deepClone(original);\nclone.b.c = 99;\nconsole.log(original.b.c);',
        solution: 'function deepClone(obj) { if (typeof obj !== "object" || obj === null) return obj; const copy = Array.isArray(obj) ? [] : {}; for (const k in obj) copy[k] = deepClone(obj[k]); return copy; } const original = { a: 1, b: { c: 2 } }; const clone = deepClone(original); clone.b.c = 99; console.log(original.b.c);',
        expectedOutput: '2',
        shareText: "solved today's Codio Daily: \"Deep Clone\"",
    },
    {
        title: 'Climbing Stairs',
        description: 'You can climb 1 or 2 steps. Write climbStairs(n) to return distinct ways to reach top. Test with n=5.',
        difficulty: 'hard', language: 'JavaScript', concept: 'Dynamic Programming',
        starterCode: 'function climbStairs(n) {\n  // your code here\n}\n\nconsole.log(climbStairs(5));',
        solution: 'function climbStairs(n) { if (n <= 2) return n; let a = 1, b = 2; for (let i = 3; i <= n; i++) [a, b] = [b, a + b]; return b; } console.log(climbStairs(5));',
        expectedOutput: '8',
        shareText: "solved today's Codio Daily: \"Climbing Stairs\"",
    },
    {
        title: 'Anagram Check',
        description: 'Write isAnagram(s, t) that returns true if they are anagrams. Test with ("listen","silent").',
        difficulty: 'medium', language: 'JavaScript', concept: 'Sorting',
        starterCode: 'function isAnagram(s, t) {\n  // your code here\n}\n\nconsole.log(isAnagram("listen", "silent"));',
        solution: 'function isAnagram(s, t) { return s.split("").sort().join("") === t.split("").sort().join(""); } console.log(isAnagram("listen", "silent"));',
        expectedOutput: 'true',
        shareText: "solved today's Codio Daily: \"Anagram Check\"",
    },
    {
        title: 'Capitalize Words',
        description: 'Write capitalize(str) that capitalizes the first letter of each word. Test with "hello world from codio".',
        difficulty: 'easy', language: 'JavaScript', concept: 'Strings',
        starterCode: 'function capitalize(str) {\n  // your code here\n}\n\nconsole.log(capitalize("hello world from codio"));',
        solution: 'function capitalize(str) { return str.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" "); } console.log(capitalize("hello world from codio"));',
        expectedOutput: 'Hello World From Codio',
        shareText: "solved today's Codio Daily: \"Capitalize Words\"",
    },
    {
        title: 'Power Function',
        description: 'Write power(base, exp) without using Math.pow(). Test with power(2, 10).',
        difficulty: 'easy', language: 'JavaScript', concept: 'Recursion',
        starterCode: 'function power(base, exp) {\n  // your code here\n}\n\nconsole.log(power(2, 10));',
        solution: 'function power(base, exp) { if (exp === 0) return 1; return base * power(base, exp - 1); } console.log(power(2, 10));',
        expectedOutput: '1024',
        shareText: "solved today's Codio Daily: \"Power Function\"",
    },
    {
        title: 'Array Chunk',
        description: 'Write chunk(arr, size) that splits an array into chunks of given size. Test with ([1,2,3,4,5], 2).',
        difficulty: 'medium', language: 'JavaScript', concept: 'Arrays',
        starterCode: 'function chunk(arr, size) {\n  // your code here\n}\n\nconsole.log(JSON.stringify(chunk([1,2,3,4,5], 2)));',
        solution: 'function chunk(arr, size) { const result = []; for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size)); return result; } console.log(JSON.stringify(chunk([1,2,3,4,5], 2)));',
        expectedOutput: '[[1,2],[3,4],[5]]',
        shareText: "solved today's Codio Daily: \"Array Chunk\"",
    },
    {
        title: 'Is Prime',
        description: 'Write isPrime(n) that returns true if n is prime. Test with isPrime(17).',
        difficulty: 'easy', language: 'JavaScript', concept: 'Math',
        starterCode: 'function isPrime(n) {\n  // your code here\n}\n\nconsole.log(isPrime(17));',
        solution: 'function isPrime(n) { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false; return true; } console.log(isPrime(17));',
        expectedOutput: 'true',
        shareText: "solved today's Codio Daily: \"Is Prime\"",
    },
    {
        title: 'Object Values Sum',
        description: 'Write sumValues(obj) that sums all numeric values. Test with {a:1,b:2,c:3,d:4}.',
        difficulty: 'easy', language: 'JavaScript', concept: 'Objects',
        starterCode: 'function sumValues(obj) {\n  // your code here\n}\n\nconsole.log(sumValues({a:1,b:2,c:3,d:4}));',
        solution: 'function sumValues(obj) { return Object.values(obj).reduce((a, b) => a + b, 0); } console.log(sumValues({a:1,b:2,c:3,d:4}));',
        expectedOutput: '10',
        shareText: "solved today's Codio Daily: \"Object Values Sum\"",
    },
    {
        title: 'Merge Arrays Unique',
        description: 'Write mergeUnique(a, b) that merges two arrays keeping only unique values. Test with ([1,2,3],[2,3,4]).',
        difficulty: 'medium', language: 'JavaScript', concept: 'Sets',
        starterCode: 'function mergeUnique(a, b) {\n  // your code here\n}\n\nconsole.log(JSON.stringify(mergeUnique([1,2,3],[2,3,4])));',
        solution: 'function mergeUnique(a, b) { return [...new Set([...a, ...b])]; } console.log(JSON.stringify(mergeUnique([1,2,3],[2,3,4])));',
        expectedOutput: '[1,2,3,4]',
        shareText: "solved today's Codio Daily: \"Merge Arrays Unique\"",
    },
    {
        title: 'String Compress',
        description: 'Write compress(s) that compresses consecutive characters e.g. "aaabb" → "a3b2". Test with "aabcccdddd".',
        difficulty: 'hard', language: 'JavaScript', concept: 'String Manipulation',
        starterCode: 'function compress(s) {\n  // your code here\n}\n\nconsole.log(compress("aabcccdddd"));',
        solution: 'function compress(s) { let result = ""; let i = 0; while (i < s.length) { let count = 1; while (i + count < s.length && s[i + count] === s[i]) count++; result += s[i] + count; i += count; } return result; } console.log(compress("aabcccdddd"));',
        expectedOutput: 'a2b1c3d4',
        shareText: "solved today's Codio Daily: \"String Compress\"",
    },
    {
        title: 'Memoize',
        description: 'Write memoize(fn) that caches results. Apply it to a slow add function and log memoize(add)(2,3).',
        difficulty: 'hard', language: 'JavaScript', concept: 'Closures',
        starterCode: 'function memoize(fn) {\n  // your code here\n}\n\nconst add = (a, b) => a + b;\nconst memoAdd = memoize(add);\nconsole.log(memoAdd(2, 3));',
        solution: 'function memoize(fn) { const cache = {}; return (...args) => { const key = JSON.stringify(args); if (cache[key] === undefined) cache[key] = fn(...args); return cache[key]; }; } const add = (a, b) => a + b; const memoAdd = memoize(add); console.log(memoAdd(2, 3));',
        expectedOutput: '5',
        shareText: "solved today's Codio Daily: \"Memoize\"",
    },
    {
        title: 'Throttle',
        description: 'Log "hello" and "world" with console.log and show they both appear with a counter.',
        difficulty: 'easy', language: 'JavaScript', concept: 'Console Output',
        starterCode: 'let counter = 0;\nfor (let i = 0; i < 5; i++) {\n  // increment and log counter\n}\nconsole.log(counter);',
        solution: 'let counter = 0; for (let i = 0; i < 5; i++) { counter++; } console.log(counter);',
        expectedOutput: '5',
        shareText: "solved today's Codio Daily: \"Counter\"",
    },
    {
        title: 'Array Intersection',
        description: 'Write intersect(a, b) that returns common elements. Test with ([1,2,3,4],[2,4,6]).',
        difficulty: 'medium', language: 'JavaScript', concept: 'Arrays',
        starterCode: 'function intersect(a, b) {\n  // your code here\n}\n\nconsole.log(JSON.stringify(intersect([1,2,3,4],[2,4,6])));',
        solution: 'function intersect(a, b) { const setB = new Set(b); return a.filter(x => setB.has(x)); } console.log(JSON.stringify(intersect([1,2,3,4],[2,4,6])));',
        expectedOutput: '[2,4]',
        shareText: "solved today's Codio Daily: \"Array Intersection\"",
    },
    {
        title: 'Debounce Simulate',
        description: 'Write a function that returns squared numbers of an array using map. Test with [1,2,3,4,5].',
        difficulty: 'easy', language: 'JavaScript', concept: 'Array Methods',
        starterCode: 'function squareAll(nums) {\n  // your code here\n}\n\nconsole.log(JSON.stringify(squareAll([1,2,3,4,5])));',
        solution: 'function squareAll(nums) { return nums.map(n => n * n); } console.log(JSON.stringify(squareAll([1,2,3,4,5])));',
        expectedOutput: '[1,4,9,16,25]',
        shareText: "solved today's Codio Daily: \"Square All\"",
    },
    {
        title: 'Pipe Functions',
        description: 'Write pipe(...fns) that chains functions left-to-right. Test: pipe(x=>x*2, x=>x+1)(5).',
        difficulty: 'hard', language: 'JavaScript', concept: 'Functional Programming',
        starterCode: 'function pipe(...fns) {\n  // your code here\n}\n\nconsole.log(pipe(x => x * 2, x => x + 1)(5));',
        solution: 'function pipe(...fns) { return x => fns.reduce((v, fn) => fn(v), x); } console.log(pipe(x => x * 2, x => x + 1)(5));',
        expectedOutput: '11',
        shareText: "solved today's Codio Daily: \"Pipe Functions\"",
    },
];

// Seed by date so all users get the same challenge each day
export const getTodaysDailyChallenge = (): DailyPuzzle => {
    const today = new Date();
    const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const index = dayOfYear % challengePool.length;
    const dateStr = today.toISOString().split('T')[0];
    return {
        id: `daily_${dateStr}`,
        date: dateStr,
        ...challengePool[index],
    };
};

export const getPastChallenges = (n: number): DailyPuzzle[] => {
    const today = new Date();
    return Array.from({ length: n }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (i + 1));
        const dayOfYear = Math.floor(
            (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000
        );
        const dateStr = d.toISOString().split('T')[0];
        return {
            id: `daily_${dateStr}`,
            date: dateStr,
            ...challengePool[dayOfYear % challengePool.length],
        };
    });
};
