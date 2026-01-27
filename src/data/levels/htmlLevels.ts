
import { PuzzleLevel } from '@/types/game';

export const htmlLevels: PuzzleLevel[] = [
  {
    id: 6,
    title: "HTML Structure Basics",
    description: "Learn the basic structure of an HTML document",
    difficulty: "easy",
    topic: "HTML",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'fill-blank',
    xpReward: 15,
    attempts: 0,
    theory: `HTML (HyperText Markup Language) is the standard language for creating web pages. It provides the structure and content of websites.

Basic HTML Structure:
• <!DOCTYPE html>: Tells the browser this is an HTML5 document
• <html>: The root element that contains all content
• <head>: Contains metadata (not visible on the page)
• <body>: Contains the visible content

HTML uses tags (like <html>) to mark up content. Most tags come in pairs: an opening tag <tag> and a closing tag </tag>.

Think of HTML like the skeleton of a house - it provides the basic structure that everything else builds upon.`,
    learningObjectives: [
      "Understand what HTML is and its purpose",
      "Learn the basic structure of an HTML document",
      "Practice writing opening and closing tags",
      "Create your first HTML page"
    ],
    concepts: [
      "HTML document structure",
      "Tags and elements",
      "Head and body sections",
      "Proper nesting"
    ],
    practiceHints: [
      "Always close your tags in the reverse order you opened them",
      "Use indentation to make your code easier to read",
      "Every HTML document needs html, head, and body tags"
    ]
  },
  {
    id: 7,
    title: "HTML Headings",
    description: "Learn about heading tags in HTML",
    difficulty: "easy",
    topic: "HTML",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'fill-blank',
    xpReward: 15,
    attempts: 0,
    theory: `HTML headings are used to create titles and organize content hierarchically. They range from <h1> (most important) to <h6> (least important).

Heading Hierarchy:
• <h1>: Main title (use only once per page)
• <h2>: Major section headings
• <h3>: Subsection headings
• <h4>-<h6>: Smaller section headings

Think of headings like an outline:
H1: Book Title
  H2: Chapter Title
    H3: Section Title
      H4: Subsection Title

Search engines use headings to understand page structure, so use them logically!`,
    learningObjectives: [
      "Understand the heading hierarchy",
      "Learn when to use different heading levels",
      "Practice creating structured content",
      "Understand SEO importance of headings"
    ],
    concepts: [
      "Heading hierarchy",
      "Content organization",
      "SEO considerations",
      "Semantic structure"
    ],
    practiceHints: [
      "Don't skip heading levels (don't go from h1 to h3)",
      "Use headings for structure, not just for styling",
      "Only use one h1 per page"
    ]
  },
  {
    id: 8,
    title: "Creating Paragraphs",
    description: "Learn how to create text paragraphs in HTML",
    difficulty: "easy",
    topic: "HTML",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'fill-blank',
    xpReward: 15,
    attempts: 0,
    theory: `The <p> tag is used to create paragraphs in HTML. Paragraphs are the most basic way to add text content to your web page.

Paragraph Features:
• Automatic spacing: Browsers add space above and below paragraphs
• Block element: Paragraphs take up the full width available
• Text wrapping: Long text automatically wraps to the next line
• Multiple paragraphs: Each <p> tag creates a separate paragraph

Best Practices:
• Use paragraphs for blocks of text
• Don't use paragraphs just for spacing
• Keep paragraphs focused on one idea

Example: News articles use multiple paragraphs to organize information into digestible chunks.`,
    learningObjectives: [
      "Learn how to add text content to web pages",
      "Understand paragraph structure and spacing",
      "Practice organizing text into logical blocks",
      "Learn proper paragraph usage"
    ],
    concepts: [
      "Paragraph elements",
      "Block-level elements",
      "Text organization",
      "Content structure"
    ],
    practiceHints: [
      "Each new idea should be in its own paragraph",
      "Don't use empty paragraphs for spacing",
      "Keep paragraphs reasonably short for readability"
    ]
  },
  {
    id: 9,
    title: "HTML Links",
    description: "Learn how to create clickable links in HTML",
    difficulty: "easy",
    topic: "HTML",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'fill-blank',
    xpReward: 20,
    attempts: 0,
    theory: `Links are what make the web "web-like" - they connect pages and sites together. The <a> (anchor) tag creates hyperlinks.

Link Components:
• <a>: The anchor tag that creates the link
• href: The attribute that specifies where the link goes
• Link text: The clickable text users see
• </a>: The closing tag

Types of Links:
• External links: Link to other websites (https://example.com)
• Internal links: Link to other pages on your site (about.html)
• Email links: Open email client (mailto:someone@example.com)
• Phone links: Start phone call (tel:+1234567890)

The href attribute is like an address - it tells the browser where to go when clicked.`,
    learningObjectives: [
      "Learn how to create clickable links",
      "Understand the href attribute",
      "Practice linking to external sites",
      "Learn different types of links"
    ],
    concepts: [
      "Anchor tags",
      "Href attributes",
      "Link destinations",
      "User navigation"
    ],
    practiceHints: [
      "Always include the protocol (http:// or https://) for external links",
      "Use descriptive link text that tells users where they're going",
      "Test your links to make sure they work"
    ]
  },
  {
    id: 10,
    title: "Adding Images",
    description: "Learn how to display images in HTML",
    difficulty: "easy",
    topic: "HTML",
    isCompleted: false,
    isUnlocked: false,
    puzzleType: 'fill-blank',
    xpReward: 20,
    attempts: 0,
    theory: `Images make web pages more engaging and informative. The <img> tag is used to embed images in HTML.

Image Attributes:
• src: The source/path to the image file (required)
• alt: Alternative text for screen readers and accessibility (required)
• width: Sets the width of the image
• height: Sets the height of the image

Important Notes:
• <img> is a self-closing tag (no closing tag needed)
• Always include alt text for accessibility
• Images can be in formats like .jpg, .png, .gif, .svg
• Consider file size for faster loading

The alt attribute is crucial for users who can't see images - screen readers use this text to describe the image.`,
    learningObjectives: [
      "Learn how to add images to web pages",
      "Understand image attributes and their purposes",
      "Practice writing accessible alt text",
      "Learn about image formats and optimization"
    ],
    concepts: [
      "Image elements",
      "Self-closing tags",
      "Accessibility",
      "File paths and sources"
    ],
    practiceHints: [
      "Always write descriptive alt text",
      "Check that your image path is correct",
      "Consider image size for page loading speed"
    ]
  }
];
