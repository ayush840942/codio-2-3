
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const CSS_FLEXBOX_PUZZLE = {
  blocks: [
    { id: 'block1', content: '<div style="display: flex; justify-content: center">', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  <div style="background: red; width: 50px; height: 50px"></div>', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  <div style="background: blue; width: 50px; height: 50px"></div>', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  <div style="background: green; width: 50px; height: 50px"></div>', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '</div>', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5'],
  hint: "Use flexbox to center the colored squares horizontally",
  description: "Learn about CSS Flexbox for layout",
  expectedOutput: `[Three colored squares centered horizontally]`
};

export const CSS_GRID_PUZZLE = {
  blocks: [
    { id: 'block1', content: '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  <div style="background: red; height: 50px"></div>', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  <div style="background: blue; height: 50px"></div>', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '  <div style="background: green; height: 50px; grid-column: span 2"></div>', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '</div>', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5'],
  hint: "Use CSS Grid to create a layout with a spanning element",
  description: "Learn about CSS Grid for complex layouts",
  expectedOutput: `[Two colored squares in first row, one spanning the second row]`
};

export const CSS_ANIMATION_PUZZLE = {
  blocks: [
    { id: 'block1', content: '<style>', type: 'code' as const, isPlaced: false },
    { id: 'block2', content: '  @keyframes slide {', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '    from { transform: translateX(0); }', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '    to { transform: translateX(100px); }', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '  .box { animation: slide 2s infinite alternate; }', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '</style>', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '<div class="box" style="width: 50px; height: 50px; background: blue"></div>', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8'],
  hint: "Define a keyframe animation and apply it to an element",
  description: "Learn about CSS animations and transitions",
  expectedOutput: `[A blue square sliding back and forth]`
};
