
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const REACT_PROPS_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'function Greeting(props) {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  return <h1>Hello, {props.name}!</h1>', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '}', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: 'function App() {', type: 'function' as const, isPlaced: false },
    { id: 'block5', content: '  return <Greeting name="World" />', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '}', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6'],
  hint: "Create a component that accepts props and displays them",
  description: "Learn about React props for component communication",
  expectedOutput: `Hello, World!`
};

export const REACT_STATE_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'function Counter() {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  const [count, setCount] = React.useState(0)', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  const increment = () => {', type: 'function' as const, isPlaced: false },
    { id: 'block4', content: '    setCount(count + 1)', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '  }', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '  return (', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '    <div>', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '      <p>Count: {count}</p>', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '      <button onClick={increment}>Increment</button>', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '    </div>', type: 'code' as const, isPlaced: false },
    { id: 'block11', content: '  )', type: 'code' as const, isPlaced: false },
    { id: 'block12', content: '}', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10', 'block11', 'block12'],
  hint: "Use React's useState hook to manage component state",
  description: "Learn about state management in React components",
  expectedOutput: `Count: 0 [Button: Increment]`
};

export const REACT_HOOKS_PUZZLE = {
  blocks: [
    { id: 'block1', content: 'function Timer() {', type: 'function' as const, isPlaced: false },
    { id: 'block2', content: '  const [seconds, setSeconds] = React.useState(0)', type: 'code' as const, isPlaced: false },
    { id: 'block3', content: '  React.useEffect(() => {', type: 'code' as const, isPlaced: false },
    { id: 'block4', content: '    const interval = setInterval(() => {', type: 'code' as const, isPlaced: false },
    { id: 'block5', content: '      setSeconds(seconds => seconds + 1)', type: 'code' as const, isPlaced: false },
    { id: 'block6', content: '    }, 1000)', type: 'code' as const, isPlaced: false },
    { id: 'block7', content: '    return () => clearInterval(interval)', type: 'code' as const, isPlaced: false },
    { id: 'block8', content: '  }, [])', type: 'code' as const, isPlaced: false },
    { id: 'block9', content: '  return <div>Seconds: {seconds}</div>', type: 'code' as const, isPlaced: false },
    { id: 'block10', content: '}', type: 'code' as const, isPlaced: false },
  ],
  solution: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8', 'block9', 'block10'],
  hint: "Use React's useEffect hook for side effects like timers",
  description: "Learn about React hooks for component lifecycle and effects",
  expectedOutput: `Seconds: 0 (incrementing every second)`
};
