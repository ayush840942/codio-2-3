
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const DB_QUERY_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'SELECT * FROM users', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: 'WHERE age > 18', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: 'ORDER BY last_name ASC', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: 'LIMIT 10;', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4'],
  hint: "Create a SQL query to select users over 18, ordered by last name",
  description: "Learn about SQL querying basics",
  expectedOutput: `[Table with 10 users over 18 ordered by last name]`
};

export const RELATION_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'SELECT users.name, orders.product', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: 'FROM users', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: 'JOIN orders', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: 'ON users.id = orders.user_id', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: 'WHERE orders.amount > 100;', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5'],
  hint: "Create a SQL query that joins users and orders tables",
  description: "Learn about relational databases and SQL joins",
  expectedOutput: `[Table showing user names and their ordered products over $100]`
};

export const NOSQL_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'db.users.find({', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  age: { $gt: 18 },', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  interests: "programming"', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '}).sort({ name: 1 })', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '.limit(10);', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5'],
  hint: "Create a MongoDB query to find users with specific criteria",
  description: "Learn about NoSQL databases and MongoDB queries",
  expectedOutput: `[10 documents of users over 18 interested in programming]`
};
