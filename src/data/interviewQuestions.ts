export interface InterviewQuestion {
    id: string;
    title: string;
    description: string;
    category: 'Arrays' | 'Strings' | 'Trees' | 'Dynamic Programming' | 'System Design' | 'Sorting';
    difficulty: 'easy' | 'medium' | 'hard';
    starterCode: string;
    solution: string;
    timeComplexity: string;
    spaceComplexity: string;
    companies: string[];
    isPremium: boolean;
    hint: string;
}

export const interviewQuestions: InterviewQuestion[] = [
    // FREE QUESTIONS
    {
        id: 'iq_1', title: 'Two Sum', category: 'Arrays', difficulty: 'easy', isPremium: false,
        description: 'Given an array of integers nums and integer target, return indices of two numbers that add up to target.',
        starterCode: 'def two_sum(nums, target):\n    pass',
        solution: 'def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target-n], i]\n        seen[n] = i',
        timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
        companies: ['Google', 'Amazon', 'Meta'], hint: 'Use a hash map to track seen values.'
    },
    {
        id: 'iq_2', title: 'Reverse a Linked List', category: 'Arrays', difficulty: 'easy', isPremium: false,
        description: 'Reverse a singly linked list.',
        starterCode: 'def reverse_list(head):\n    pass',
        solution: 'def reverse_list(head):\n    prev = None\n    while head:\n        head.next, prev, head = prev, head, head.next\n    return prev',
        timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
        companies: ['Microsoft', 'Apple'], hint: 'Use three pointers: prev, curr, next.'
    },
    {
        id: 'iq_3', title: 'Valid Parentheses', category: 'Strings', difficulty: 'easy', isPremium: false,
        description: 'Given a string of brackets, determine if it\'s valid.',
        starterCode: 'def is_valid(s):\n    pass',
        solution: 'def is_valid(s):\n    stack = []\n    m = {")":"(", "}":"{", "]":"["}\n    for c in s:\n        if c in m:\n            if not stack or stack[-1] != m[c]: return False\n            stack.pop()\n        else: stack.append(c)\n    return not stack',
        timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
        companies: ['Amazon', 'Google'], hint: 'Use a stack — push open brackets, pop on close.'
    },
    {
        id: 'iq_4', title: 'Maximum Subarray', category: 'Dynamic Programming', difficulty: 'easy', isPremium: false,
        description: 'Find the contiguous subarray with the largest sum.',
        starterCode: 'def max_subarray(nums):\n    pass',
        solution: 'def max_subarray(nums):\n    best = cur = nums[0]\n    for n in nums[1:]:\n        cur = max(n, cur + n)\n        best = max(best, cur)\n    return best',
        timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
        companies: ['Amazon', 'Microsoft', 'Apple'], hint: 'Kadane\'s Algorithm — track current and best sum.'
    },
    {
        id: 'iq_5', title: 'Merge Two Sorted Lists', category: 'Arrays', difficulty: 'easy', isPremium: false,
        description: 'Merge two sorted linked lists and return the sorted list.',
        starterCode: 'def merge_lists(l1, l2):\n    pass',
        solution: 'def merge_lists(l1, l2):\n    dummy = ListNode(0)\n    cur = dummy\n    while l1 and l2:\n        if l1.val < l2.val: cur.next = l1; l1 = l1.next\n        else: cur.next = l2; l2 = l2.next\n        cur = cur.next\n    cur.next = l1 or l2\n    return dummy.next',
        timeComplexity: 'O(m+n)', spaceComplexity: 'O(1)',
        companies: ['Google', 'Meta'], hint: 'Use a dummy head node to simplify edge cases.'
    },
    // PREMIUM QUESTIONS
    {
        id: 'iq_6', title: 'LRU Cache', category: 'System Design', difficulty: 'hard', isPremium: true,
        description: 'Design a data structure that follows LRU (Least Recently Used) cache eviction policy.',
        starterCode: 'class LRUCache:\n    def __init__(self, capacity):\n        pass\n    def get(self, key):\n        pass\n    def put(self, key, value):\n        pass',
        solution: '# Use OrderedDict from collections for O(1) operations',
        timeComplexity: 'O(1)', spaceComplexity: 'O(capacity)',
        companies: ['Google', 'Amazon', 'Meta', 'Microsoft'], hint: 'Use a doubly-linked list + hash map.'
    },
    {
        id: 'iq_7', title: 'Word Break', category: 'Dynamic Programming', difficulty: 'medium', isPremium: true,
        description: 'Given a string and a word dictionary, return true if the string can be segmented into dictionary words.',
        starterCode: 'def word_break(s, wordDict):\n    pass',
        solution: 'def word_break(s, wordDict):\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s)+1):\n        for w in wordDict:\n            if dp[i-len(w)] and s[i-len(w):i] == w:\n                dp[i] = True\n    return dp[-1]',
        timeComplexity: 'O(n²)', spaceComplexity: 'O(n)',
        companies: ['Google', 'Meta'], hint: 'Use dynamic programming — dp[i] = can string[0:i] be segmented.'
    },
    {
        id: 'iq_8', title: 'Trapping Rain Water', category: 'Arrays', difficulty: 'hard', isPremium: true,
        description: 'Given heights of bars, compute how much water can be trapped.',
        starterCode: 'def trap(height):\n    pass',
        solution: 'def trap(height):\n    l, r = 0, len(height)-1\n    ml = mr = water = 0\n    while l < r:\n        if height[l] < height[r]:\n            ml = max(ml, height[l]); water += ml - height[l]; l += 1\n        else:\n            mr = max(mr, height[r]); water += mr - height[r]; r -= 1\n    return water',
        timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
        companies: ['Amazon', 'Google', 'Microsoft'], hint: 'Two-pointer approach — track left and right max heights.'
    },
    {
        id: 'iq_9', title: 'Number of Islands', category: 'Trees', difficulty: 'medium', isPremium: true,
        description: 'Given a 2D grid of "1"s (land) and "0"s (water), count the number of islands.',
        starterCode: 'def num_islands(grid):\n    pass',
        solution: 'def num_islands(grid):\n    count = 0\n    def dfs(r, c):\n        if r<0 or c<0 or r>=len(grid) or c>=len(grid[0]) or grid[r][c]!="1": return\n        grid[r][c] = "0"\n        for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]: dfs(r+dr, c+dc)\n    for r in range(len(grid)):\n        for c in range(len(grid[0])):\n            if grid[r][c] == "1": count += 1; dfs(r, c)\n    return count',
        timeComplexity: 'O(m×n)', spaceComplexity: 'O(m×n)',
        companies: ['Amazon', 'Google', 'Microsoft', 'Meta'], hint: 'DFS or BFS from each unvisited land cell.'
    },
    {
        id: 'iq_10', title: 'Merge Intervals', category: 'Sorting', difficulty: 'medium', isPremium: true,
        description: 'Given a list of intervals, merge all overlapping ones.',
        starterCode: 'def merge(intervals):\n    pass',
        solution: 'def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for s, e in intervals[1:]:\n        if s <= merged[-1][1]: merged[-1][1] = max(merged[-1][1], e)\n        else: merged.append([s, e])\n    return merged',
        timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)',
        companies: ['Google', 'Facebook', 'LinkedIn'], hint: 'Sort by start time, then iterate and merge overlapping.'
    },
];

export const getFreeQuestions = () => interviewQuestions.filter(q => !q.isPremium);
export const getPremiumQuestions = () => interviewQuestions.filter(q => q.isPremium);
export const getQuestionsByCategory = (cat: string) => interviewQuestions.filter(q => q.category === cat);
