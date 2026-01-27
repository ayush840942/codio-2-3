
import { BookOpen, Code2 } from 'lucide-react';
import { LevelLearningContent } from './types';

export const htmlLearningContent: Record<string, LevelLearningContent> = {
  '1': {
    topic: 'HTML',
    title: 'HTML Fundamentals: Building Web Structure',
    icon: BookOpen,
    introduction: "Welcome to your web development journey! HTML is the foundation of every website. Think of it as the skeleton that gives structure to web content.",
    objectives: [
      'Understand what HTML is and why it matters',
      'Learn the basic structure of HTML elements',
      'Master opening and closing tags',
      'Create your first HTML element'
    ],
    pages: [
      {
        title: 'What is HTML?',
        content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using a series of elements.',
        concepts: [
          { 
            name: 'Markup Language', 
            description: 'A system for annotating text to indicate its structure and formatting',
            example: 'Like adding bold, italic, or headings to a document',
            tips: ['HTML uses tags to mark up content', 'Tags tell the browser how to display content']
          },
          { 
            name: 'Web Structure', 
            description: 'HTML provides the basic structure that browsers understand',
            example: 'Headers, paragraphs, lists, links, and images',
            tips: ['Every webpage starts with HTML', 'CSS and JavaScript enhance HTML']
          }
        ],
        visualExample: 'Think of HTML like building blocks - each element is a block that can contain text, images, or other elements.',
        practiceHint: 'Try to identify different elements when you visit websites!'
      },
      {
        title: 'HTML Elements and Tags',
        content: 'HTML elements are the building blocks of web pages. They consist of tags that wrap around content to give it meaning and structure.',
        concepts: [
          { 
            name: 'HTML Elements', 
            description: 'Complete units consisting of opening tag, content, and closing tag',
            example: '<h1>Welcome</h1> - This is a complete heading element',
            tips: ['Elements can contain other elements', 'Some elements are self-closing']
          },
          { 
            name: 'Opening Tags', 
            description: 'Start an HTML element and are enclosed in angle brackets',
            example: '<h1>, <p>, <div>',
            tips: ['Always start with <', 'Element name goes inside brackets']
          },
          { 
            name: 'Closing Tags', 
            description: 'End an HTML element and include a forward slash',
            example: '</h1>, </p>, </div>',
            tips: ['Always include the forward slash', 'Must match the opening tag']
          }
        ],
        visualExample: '<tagname>Content goes here</tagname>',
        practiceHint: 'Remember: every opening tag needs a closing tag!'
      },
      {
        title: 'Common HTML Elements',
        content: 'Let\'s explore the most frequently used HTML elements that you\'ll encounter in web development.',
        concepts: [
          { 
            name: 'Headings (h1-h6)', 
            description: 'Used to create titles and subtitles on web pages',
            example: '<h1>Main Title</h1>, <h2>Subtitle</h2>',
            tips: ['h1 is the largest', 'h6 is the smallest', 'Use them in order']
          },
          { 
            name: 'Paragraphs (p)', 
            description: 'Used for blocks of text content',
            example: '<p>This is a paragraph of text.</p>',
            tips: ['Browsers add spacing between paragraphs', 'Good for readable text blocks']
          },
          { 
            name: 'Links (a)', 
            description: 'Create clickable links to other pages or resources',
            example: '<a href="https://example.com">Click here</a>',
            tips: ['href attribute specifies the destination', 'Can link to other pages or sections']
          }
        ],
        visualExample: 'Each element serves a specific purpose in organizing content.',
        practiceHint: 'Start with simple elements like headings and paragraphs!'
      },
      {
        title: 'Ready to Practice!',
        content: 'Now that you understand HTML basics, you\'re ready to create your first HTML element. Remember the structure: opening tag, content, closing tag.',
        concepts: [
          { 
            name: 'Best Practices', 
            description: 'Write clean, readable HTML code',
            example: 'Use proper indentation and consistent naming',
            tips: ['Always close your tags', 'Use meaningful element names', 'Keep your code organized']
          },
          { 
            name: 'Common Mistakes', 
            description: 'Avoid these frequent HTML errors',
            example: 'Forgetting closing tags, mismatched tags, incorrect nesting',
            tips: ['Double-check your tags', 'Use proper nesting', 'Validate your HTML']
          }
        ],
        visualExample: 'Your task: Create an h1 element with the text "Hello World!"',
        practiceHint: 'Think: <opening tag> + content + <closing tag>'
      }
    ],
    summary: 'HTML is the foundation of web development. Master elements, tags, and structure to build amazing websites!',
  },
  '2': {
    topic: 'HTML',
    title: 'HTML Attributes: Adding Information to Elements',
    icon: Code2,
    introduction: "Attributes provide additional information about HTML elements. They are like adjectives that describe and modify elements, making them more powerful and functional.",
    objectives: [
      'Understand what HTML attributes are',
      'Learn common attribute syntax',
      'Master essential attributes like src, href, class, and id',
      'Practice using attributes effectively'
    ],
    pages: [
      {
        title: 'Understanding Attributes',
        content: 'HTML attributes provide extra information about elements. They are always specified in the opening tag and come in name/value pairs.',
        concepts: [
          { 
            name: 'Attribute Syntax', 
            description: 'Attributes follow the pattern: name="value"',
            example: 'class="my-style" id="unique-name" src="image.jpg"',
            tips: ['Always use quotes around values', 'Separate multiple attributes with spaces']
          },
          { 
            name: 'Global Attributes', 
            description: 'Attributes that can be used on any HTML element',
            example: 'class, id, style, title',
            tips: ['class for styling groups', 'id for unique identification']
          }
        ],
        visualExample: '<element attribute="value">Content</element>',
        practiceHint: 'Think of attributes as properties that describe the element!'
      },
      {
        title: 'Essential Attributes',
        content: 'Let\'s explore the most important HTML attributes you\'ll use regularly in web development.',
        concepts: [
          { 
            name: 'src Attribute', 
            description: 'Specifies the source URL for images, videos, and other media',
            example: '<img src="photo.jpg" alt="A beautiful sunset">',
            tips: ['Required for img elements', 'Can be relative or absolute URLs']
          },
          { 
            name: 'href Attribute', 
            description: 'Defines the destination of a link',
            example: '<a href="https://example.com">Visit Example</a>',
            tips: ['Used with <a> tags', 'Can link to other pages, files, or sections']
          },
          { 
            name: 'alt Attribute', 
            description: 'Provides alternative text for images',
            example: '<img src="logo.png" alt="Company Logo">',
            tips: ['Important for accessibility', 'Describes image content for screen readers']
          }
        ],
        visualExample: 'Attributes add functionality and meaning to basic elements.',
        practiceHint: 'Each attribute serves a specific purpose - learn what each one does!'
      },
      {
        title: 'Styling Attributes',
        content: 'The class and id attributes are fundamental for styling and JavaScript interaction.',
        concepts: [
          { 
            name: 'Class Attribute', 
            description: 'Groups elements together for styling with CSS',
            example: '<p class="intro">This is an introduction paragraph.</p>',
            tips: ['Can be used on multiple elements', 'CSS targets classes with .classname']
          },
          { 
            name: 'ID Attribute', 
            description: 'Provides a unique identifier for an element',
            example: '<div id="header">Page header content</div>',
            tips: ['Must be unique on the page', 'CSS targets IDs with #idname']
          },
          { 
            name: 'Multiple Classes', 
            description: 'Elements can have multiple CSS classes',
            example: '<button class="btn primary large">Click me</button>',
            tips: ['Separate multiple classes with spaces', 'More flexible styling options']
          }
        ],
        visualExample: 'Classes are like tags you put on items to group them; IDs are like unique serial numbers.',
        practiceHint: 'Use classes for styling groups of elements, IDs for unique elements!'
      },
      {
        title: 'Practice Time!',
        content: 'You\'re now ready to use attributes! Remember: attributes go in the opening tag and provide extra information about the element.',
        concepts: [
          { 
            name: 'Attribute Best Practices', 
            description: 'Write clean, semantic HTML with meaningful attributes',
            example: 'Use descriptive class names, always include alt text for images',
            tips: ['Choose meaningful names', 'Be consistent with naming conventions']
          },
          { 
            name: 'Common Mistakes', 
            description: 'Avoid these frequent attribute errors',
            example: 'Missing quotes, typos in attribute names, duplicate IDs',
            tips: ['Always quote attribute values', 'Check spelling carefully', 'Keep IDs unique']
          }
        ],
        visualExample: 'Your task: Add appropriate attributes to make elements more functional.',
        practiceHint: 'Think about what information each element needs to work properly!'
      }
    ],
    summary: 'Attributes make HTML elements more powerful and functional. Master them to create rich, interactive web content!',
  }
};
