
import { Palette, Layout } from 'lucide-react';
import { LevelLearningContent } from './types';

export const cssLearningContent: Record<string, LevelLearningContent> = {
  '3': {
    topic: 'CSS',
    title: 'CSS Fundamentals: Styling the Web',
    icon: Palette,
    introduction: "CSS (Cascading Style Sheets) transforms plain HTML into visually stunning web pages. It's the language that controls colors, fonts, layouts, and animations.",
    objectives: [
      'Understand what CSS is and its role',
      'Learn CSS syntax and rule structure',
      'Master basic selectors and properties',
      'Apply styles to HTML elements'
    ],
    pages: [
      {
        title: 'Introduction to CSS',
        content: 'CSS is the styling language of the web. While HTML provides structure, CSS provides the visual presentation that makes websites beautiful and engaging.',
        concepts: [
          { 
            name: 'What CSS Does', 
            description: 'Controls the visual appearance of HTML elements',
            example: 'Colors, fonts, spacing, positioning, animations',
            tips: ['Separates content from presentation', 'Makes maintenance easier']
          },
          { 
            name: 'CSS vs HTML', 
            description: 'HTML is structure, CSS is presentation',
            example: 'HTML: <h1>Title</h1>, CSS: h1 { color: blue; }',
            tips: ['HTML defines what content is', 'CSS defines how it looks']
          }
        ],
        visualExample: 'Think of HTML as a house frame and CSS as the paint, decorations, and furnishing.',
        practiceHint: 'CSS transforms boring HTML into beautiful web pages!'
      },
      {
        title: 'CSS Syntax and Rules',
        content: 'CSS uses a simple syntax consisting of selectors, properties, and values organized into rules.',
        concepts: [
          { 
            name: 'CSS Rule Structure', 
            description: 'selector { property: value; }',
            example: 'p { color: red; font-size: 16px; }',
            tips: ['Selector targets elements', 'Properties define what to change', 'Values specify how to change it']
          },
          { 
            name: 'Selectors', 
            description: 'Target specific HTML elements for styling',
            example: 'p (element), .class (class), #id (ID)',
            tips: ['Be specific to avoid conflicts', 'Use meaningful class names']
          },
          { 
            name: 'Properties and Values', 
            description: 'Define what aspect to change and how',
            example: 'color: blue; font-size: 20px; margin: 10px;',
            tips: ['End each declaration with semicolon', 'Use valid property names']
          }
        ],
        visualExample: 'CSS rules are like instructions: "For all paragraphs, make the text blue and large."',
        practiceHint: 'Remember the pattern: what to style { how to style it; }'
      },
      {
        title: 'Common CSS Properties',
        content: 'Let\'s explore essential CSS properties that you\'ll use frequently to style web pages.',
        concepts: [
          { 
            name: 'Text Properties', 
            description: 'Control text appearance and typography',
            example: 'color, font-size, font-family, text-align',
            tips: ['color sets text color', 'font-size controls text size', 'font-family changes typeface']
          },
          { 
            name: 'Background Properties', 
            description: 'Style element backgrounds',
            example: 'background-color, background-image, background-size',
            tips: ['Use colors or images', 'Can combine multiple background properties']
          },
          { 
            name: 'Spacing Properties', 
            description: 'Control space around and inside elements',
            example: 'margin (outside space), padding (inside space)',
            tips: ['margin creates space between elements', 'padding creates space inside elements']
          }
        ],
        visualExample: 'Each property controls a different visual aspect of elements.',
        practiceHint: 'Start with simple properties like color and font-size!'
      },
      {
        title: 'Ready to Style!',
        content: 'Now you\'re ready to apply CSS styles! Remember: CSS makes HTML beautiful and engaging for users.',
        concepts: [
          { 
            name: 'CSS Best Practices', 
            description: 'Write clean, maintainable CSS code',
            example: 'Use meaningful class names, organize your code, be consistent',
            tips: ['Group related styles', 'Use comments to explain complex rules', 'Keep specificity low']
          },
          { 
            name: 'Testing Your Styles', 
            description: 'Always check how your styles look in the browser',
            example: 'Use browser developer tools to experiment and debug',
            tips: ['Test in different browsers', 'Check responsive behavior', 'Validate your CSS']
          }
        ],
        visualExample: 'Your task: Use CSS to style HTML elements with colors, fonts, and spacing.',
        practiceHint: 'Think about what visual changes would improve the user experience!'
      }
    ],
    summary: 'CSS is the design language of the web. Master selectors, properties, and values to create stunning visual experiences!',
  },
  '4': {
    topic: 'CSS',
    title: 'CSS Layout: Positioning and Flexbox',
    icon: Layout,
    introduction: "Master CSS layout techniques to create professional web layouts. Learn how to position elements and use Flexbox for responsive designs.",
    objectives: [
      'Understand CSS positioning concepts',
      'Learn Flexbox fundamentals',
      'Create responsive layouts',
      'Master alignment and distribution'
    ],
    pages: [
      {
        title: 'CSS Positioning',
        content: 'CSS positioning allows you to control exactly where elements appear on the page, giving you precise control over layout.',
        concepts: [
          { 
            name: 'Static Positioning', 
            description: 'Default positioning - elements flow naturally',
            example: 'position: static; (default behavior)',
            tips: ['Elements follow document flow', 'No special positioning needed']
          },
          { 
            name: 'Relative Positioning', 
            description: 'Position relative to normal position',
            example: 'position: relative; top: 10px; left: 20px;',
            tips: ['Moves from original position', 'Preserves space in document flow']
          }
        ],
        visualExample: 'Think of positioning like moving furniture - relative moves from original spot, absolute places anywhere.',
        practiceHint: 'Start with relative positioning for simple adjustments!'
      },
      {
        title: 'Introduction to Flexbox',
        content: 'Flexbox is a powerful layout method that makes it easy to arrange elements in rows or columns with flexible sizing.',
        concepts: [
          { 
            name: 'Flex Container', 
            description: 'Parent element that holds flex items',
            example: 'display: flex; creates a flex container',
            tips: ['Apply display: flex to parent', 'Controls overall layout direction']
          },
          { 
            name: 'Flex Items', 
            description: 'Child elements inside a flex container',
            example: 'Items automatically become flexible',
            tips: ['Automatically arranged by flexbox rules', 'Can grow and shrink as needed']
          }
        ],
        visualExample: 'Flexbox is like a smart row or column that arranges items automatically.',
        practiceHint: 'Remember: flex goes on the parent, affects the children!'
      },
      {
        title: 'Flexbox Properties',
        content: 'Learn the essential Flexbox properties that control how items are arranged and sized within containers.',
        concepts: [
          { 
            name: 'justify-content', 
            description: 'Controls horizontal alignment of items',
            example: 'justify-content: center; (centers items horizontally)',
            tips: ['flex-start, center, flex-end', 'space-between, space-around']
          },
          { 
            name: 'align-items', 
            description: 'Controls vertical alignment of items',
            example: 'align-items: center; (centers items vertically)',
            tips: ['stretch, flex-start, center, flex-end', 'Controls cross-axis alignment']
          },
          { 
            name: 'flex-direction', 
            description: 'Sets the main axis direction',
            example: 'flex-direction: column; (vertical layout)',
            tips: ['row (default), column', 'Changes main and cross axis']
          }
        ],
        visualExample: 'Flexbox properties are like instructions for arranging items in a container.',
        practiceHint: 'Experiment with different combinations to see how they work together!'
      },
      {
        title: 'Practice Layouts!',
        content: 'You\'re ready to create flexible, responsive layouts! Flexbox makes complex layouts simple and maintainable.',
        concepts: [
          { 
            name: 'Common Patterns', 
            description: 'Typical layout patterns using flexbox',
            example: 'Centered content, equal columns, navigation bars',
            tips: ['Start with simple patterns', 'Build complexity gradually']
          },
          { 
            name: 'Responsive Design', 
            description: 'Flexbox adapts to different screen sizes',
            example: 'Items wrap and resize automatically',
            tips: ['Use flex-wrap for wrapping', 'Combine with media queries']
          }
        ],
        visualExample: 'Your task: Use flexbox to create a centered, responsive layout.',
        practiceHint: 'Think about main axis vs cross axis when using flexbox properties!'
      }
    ],
    summary: 'CSS layout with positioning and Flexbox gives you powerful tools to create professional, responsive web designs!',
  }
};
