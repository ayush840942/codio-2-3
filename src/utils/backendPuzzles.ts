
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const NODE_BASICS_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const http = require("http")', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: 'const server = http.createServer((req, res) => {', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  res.statusCode = 200', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  res.setHeader("Content-Type", "text/plain")', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  res.end("Hello World")', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '})', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: 'server.listen(3000, () => {', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '  console.log("Server running at http://localhost:3000/")', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '})', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9'],
  hint: "Create a simple HTTP server with Node.js",
  description: "Learn about Node.js basics and HTTP server creation",
  expectedOutput: `Server running at http://localhost:3000/`
};

export const EXPRESS_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const express = require("express")', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: 'const app = express()', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: 'app.get("/", (req, res) => {', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  res.send("Hello World!")', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '})', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: 'app.get("/users/:id", (req, res) => {', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '  res.send(`User ID: ${req.params.id}`)', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '})', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: 'app.listen(3000, () => {', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '  console.log("Server running on port 3000")', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '})', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11'],
  hint: "Set up Express routes with parameters",
  description: "Learn about Express.js routing and request handling",
  expectedOutput: `Server running on port 3000`
};

export const MIDDLEWARE_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const express = require("express")', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: 'const app = express()', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: 'const loggerMiddleware = (req, res, next) => {', type: 'function' as const, isPlaced: false },
    { id: 'block4', content: '  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  next()', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: 'app.use(loggerMiddleware)', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: 'app.get("/", (req, res) => {', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '  res.send("Hello World")', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '})', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: 'app.listen(3000)', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11'],
  hint: "Create and use middleware functions in Express",
  description: "Learn about middleware functions in Express.js",
  expectedOutput: `2023-05-01T12:00:00.000Z - GET /`
};

export const API_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'async function fetchData() {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  try {', type: 'control' as const, isPlaced: false },
    { id: 'block3', content: '    const response = await fetch("https://api.example.com/data")', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '    if (!response.ok) {', type: 'control' as const, isPlaced: false },
    { id: 'block5', content: '      throw new Error(`HTTP error! status: ${response.status}`)', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '    }', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '    const data = await response.json()', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '    console.log(data)', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '  } catch (error) {', type: 'control' as const, isPlaced: false },
    { id: 'block10', content: '    console.error("Fetching error:", error)', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: 'fetchData()', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13'],
  hint: "Fetch data from an API with proper error handling",
  description: "Learn about API integration with fetch and async/await",
  expectedOutput: `{ "id": 1, "name": "Example Data" }`
};

export const GRAPHQL_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'const query = `', type: 'variable' as const, isPlaced: false },
    { id: 'block2', content: '  query GetUser($id: ID!) {', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '    user(id: $id) {', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '      id', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '      name', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '      email', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '      posts {', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '        title', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '      }', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '    }', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '`', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: 'const variables = { id: "123" }', type: 'variable' as const, isPlaced: false },
    { id: 'block14', content: 'fetch("https://api.example.com/graphql", {', type: 'code' as const, isPlaced: false },
    { id: 'block15', content: '  method: "POST",', type: 'code' as const, isPlaced: false },
    { id: 'block16', content: '  headers: { "Content-Type": "application/json" },', type: 'code' as const, isPlaced: false },
    { id: 'block17', content: '  body: JSON.stringify({ query, variables })', type: 'code' as const, isPlaced: false },
    { id: 'block18', content: '})', type: 'code' as const, isPlaced: false },
    { id: 'block19', content: '.then(res => res.json())', type: 'code' as const, isPlaced: false },
    { id: 'block20', content: '.then(data => console.log(data))', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15', 'block16', 'block17', 'block18', 'block19', 'block20'],
  hint: "Create a GraphQL query and send it to a server",
  description: "Learn about GraphQL API queries",
  expectedOutput: `{ "data": { "user": { "id": "123", "name": "John Doe", "email": "john@example.com", "posts": [{ "title": "Hello World" }] } } }`
};
