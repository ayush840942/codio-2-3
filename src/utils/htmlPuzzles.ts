
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const HTML_STRUCTURE_PUZZLE = {
  blocks: [
    { id: 'block1', content: '<!DOCTYPE html>', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '<html>', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '<head>', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  <title>My Page</title>', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '</head>', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '<body>', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '  <h1>Hello World</h1>', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '  <p>Welcome to my website!</p>', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '</body>', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '</html>', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10'],
  hint: "Structure your HTML document with the correct nesting",
  description: "Learn about HTML document structure",
  expectedOutput: `Hello World
Welcome to my website!`
};

export const HTML_FORM_PUZZLE = {
  blocks: [
    { id: 'block1', content: '<form action="/submit" method="post">', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  <label for="name">Name:</label>', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  <input type="text" id="name" name="name" required>', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  <label for="email">Email:</label>', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  <input type="email" id="email" name="email" required>', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '  <button type="submit">Submit</button>', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '</form>', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
  hint: "Create a form with proper input fields and labels",
  description: "Learn about HTML forms and input elements",
  expectedOutput: `[A form with name and email fields and a submit button]`
};

export const HTML_SEMANTIC_PUZZLE = {
  blocks: [
    { id: 'block1', content: '<header>', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  <h1>My Website</h1>', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  <nav>', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '    <ul>', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '      <li><a href="/">Home</a></li>', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '      <li><a href="/about">About</a></li>', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '    </ul>', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '  </nav>', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '</header>', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '<main>', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '  <article>', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '    <h2>Welcome</h2>', type: 'code' as const, isPlaced: false },
    { id: 'block13', content: '    <p>Welcome to my semantic HTML page!</p>', type: 'code' as const, isPlaced: false },
    { id: 'block14', content: '  </article>', type: 'code' as const, isPlaced: false },
    { id: 'block15', content: '</main>', type: 'code' as const, isPlaced: false },
    { id: 'block16', content: '<footer>', type: 'code' as const, isPlaced: false },
    { id: 'block17', content: '  <p>&copy; 2023 My Website</p>', type: 'code' as const, isPlaced: false },
    { id: 'block18', content: '</footer>', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15', 'block16', 'block17', 'block18'],
  hint: "Use semantic HTML tags to structure your page",
  description: "Learn about semantic HTML for better accessibility and SEO",
  expectedOutput: `[A webpage with proper semantic structure]`
};
