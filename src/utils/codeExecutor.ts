
import { PuzzleBlockData } from '@/components/PuzzleBlock';

export const executeCode = (
  blocks: PuzzleBlockData[],
  expectedOutput: string
): { output: string; isCorrect: boolean; error?: string } => {
  try {
    const consoleLogs: string[] = [];
    
    // Create a safe execution environment
    const mockConsole = {
      log: (...args: any[]) => {
        const output = args.map(arg => {
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');
        consoleLogs.push(output);
      }
    };
    
    // Validate that blocks are arranged correctly
    if (!blocks || blocks.length === 0) {
      return { 
        output: "No code blocks arranged", 
        isCorrect: false,
        error: "Please arrange some code blocks first"
      };
    }
    
    // Create code from arranged blocks in the correct order
    const code = blocks.map(block => {
      // Ensure we have valid block content
      if (!block || !block.content) {
        return '// Invalid block';
      }
      return block.content;
    }).join('\n');
    
    // If these are pure code snippet blocks (e.g., HTML/CSS), treat as text, not JS
    const allCodeBlocks = blocks.every(b => b.type === 'code');
    if (allCodeBlocks) {
      const output = code.trim();
      const normalize = (s: string) => (s || '')
        .replace(/\r/g, '')
        .split('\n')
        .map(line => line.trimEnd())
        .join('\n')
        .replace(/\s+/g, ' ')
        .trim();
      const normalizedExpected = normalize(String(expectedOutput));
      const normalizedActual = normalize(output);
      const isCorrect = normalizedActual === normalizedExpected;
      return { 
        output: output || 'No output produced',
        isCorrect,
        error: isCorrect ? undefined : `Expected: "${expectedOutput}", Got: "${output}"`
      };
    }

    // Execute the code safely for JS blocks
    try {
      // Replace console.log calls in the code with our mock
      const safeCode = code.replace(/console\.log/g, 'mockConsole.log');
      
      // Create a safe function that executes the code
      const executeFunction = new Function('mockConsole', `
        try {
          ${safeCode}
        } catch (error) {
          mockConsole.log('Runtime Error: ' + error.message);
        }
      `);
      
      executeFunction(mockConsole);
    } catch (execError) {
      console.error('Code execution error:', execError);
      return { 
        output: `Execution Error: ${String(execError)}`, 
        isCorrect: false,
        error: String(execError),
      };
    }
    
    const output = consoleLogs.join('\n');
    const trimmedExpectedOutput = String(expectedOutput || "").trim();
    const actualOutput = output.trim();
    
    console.log('Expected output (trimmed):', `"${trimmedExpectedOutput}"`);
    console.log('Actual output (trimmed):', `"${actualOutput}"`);
    
    // Improved comparison logic
    let isCorrect = false;
    
    // Direct string comparison (most reliable)
    if (actualOutput === trimmedExpectedOutput) {
      isCorrect = true;
    } 
    // Case-insensitive comparison for flexibility
    else if (actualOutput.toLowerCase() === trimmedExpectedOutput.toLowerCase()) {
      isCorrect = true;
    }
    // Check if output contains expected content (for multi-line outputs)
    else if (trimmedExpectedOutput.includes('\n') && actualOutput.includes(trimmedExpectedOutput)) {
      isCorrect = true;
    }
    // Handle simple HTML output by normalizing whitespace
    else if (trimmedExpectedOutput.includes('<') && 
             actualOutput.replace(/\s+/g, ' ').trim() === trimmedExpectedOutput.replace(/\s+/g, ' ').trim()) {
      isCorrect = true;
    }
    
    return { 
      output: actualOutput || "No output produced", 
      isCorrect,
      error: isCorrect ? undefined : `Expected: "${trimmedExpectedOutput}", Got: "${actualOutput}"`
    };
    
  } catch (error) {
    console.error('Code executor error:', error);
    return { 
      output: `System Error: ${String(error)}`, 
      isCorrect: false,
      error: String(error)
    };
  }
};

// Enhanced block arrangement validation with better error messages
export const validateBlockArrangement = (
  blocks: PuzzleBlockData[],
  expectedBlocks: PuzzleBlockData[]
): { isValid: boolean; message: string; hint?: string } => {
  if (!blocks || blocks.length === 0) {
    return { 
      isValid: false, 
      message: "Please arrange some code blocks to continue",
      hint: "Drag blocks from the available blocks area into the solution area"
    };
  }
  
  if (!expectedBlocks || expectedBlocks.length === 0) {
    return { isValid: true, message: "Block arrangement is valid" };
  }
  
  // Check if all required blocks are present
  const requiredBlockContents = expectedBlocks.map(b => b.content.trim());
  const placedBlockContents = blocks.map(b => b.content?.trim() || '');
  
  // Find missing blocks
  const missingBlocks = requiredBlockContents.filter(required => 
    !placedBlockContents.some(placed => placed === required)
  );
  
  if (missingBlocks.length > 0) {
    return { 
      isValid: false, 
      message: `Missing ${missingBlocks.length} required block(s). Use all available blocks.`,
      hint: "Make sure you've dragged all the code blocks into the solution area"
    };
  }
  
  // Check for extra blocks that shouldn't be there
  const extraBlocks = placedBlockContents.filter(placed => 
    placed && !requiredBlockContents.some(required => required === placed)
  );
  
  if (extraBlocks.length > 0) {
    return { 
      isValid: false, 
      message: `${extraBlocks.length} block(s) don't belong. Remove incorrect blocks.`,
      hint: "Click on blocks in the solution area to remove them"
    };
  }
  
  // Check block count matches
  if (blocks.length !== expectedBlocks.length) {
    return {
      isValid: false,
      message: `Wrong number of blocks. Expected ${expectedBlocks.length}, got ${blocks.length}.`,
      hint: "Check if you have the correct number of blocks arranged"
    };
  }
  
  // For exact order checking - provide specific position feedback
  let firstMismatchIndex = -1;
  for (let i = 0; i < expectedBlocks.length; i++) {
    if (blocks[i]?.content?.trim() !== expectedBlocks[i].content.trim()) {
      firstMismatchIndex = i;
      break;
    }
  }
  
  if (firstMismatchIndex !== -1) {
    const position = firstMismatchIndex + 1;
    const positionText = position === 1 ? '1st' : position === 2 ? '2nd' : position === 3 ? '3rd' : `${position}th`;
    return { 
      isValid: false, 
      message: `Check the order of your blocks. The ${positionText} block seems incorrect.`,
      hint: "The order of code blocks matters! Think about what should execute first."
    };
  }
  
  return { isValid: true, message: "Block arrangement looks good!" };
};

// Helper function to provide hints about block arrangement
export const getArrangementHint = (
  blocks: PuzzleBlockData[],
  expectedBlocks: PuzzleBlockData[],
  expectedOutput: string
): string => {
  if (!blocks || blocks.length === 0) {
    return "Start by dragging code blocks into the solution area.";
  }
  
  const validation = validateBlockArrangement(blocks, expectedBlocks);
  if (!validation.isValid) {
    return validation.message;
  }
  
  // If arrangement is valid but output is wrong, provide execution hint
  const { output, isCorrect } = executeCode(blocks, expectedOutput);
  if (!isCorrect) {
    return `Your code produces: "${output}" but should produce: "${expectedOutput}". Check your logic!`;
  }
  
  return "Your solution looks correct! Click 'Check Solution' to verify.";
};
