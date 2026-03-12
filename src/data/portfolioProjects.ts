export interface ProjectStep {
    id: number;
    title: string;
    instruction: string;
    initialCode: {
        html: string;
        css: string;
        js: string;
    };
    expectedOutputSnippet?: string;
    solutionInfo: {
        html?: string;
        css?: string;
        js?: string;
    };
}

export interface PortfolioProject {
    id: string;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Pro';
    estimatedTimeMin: number;
    icon: string;
    isUnlocked: boolean;
    isPremium: boolean;
    steps: ProjectStep[];
}

export const portfolioProjects: PortfolioProject[] = [
    {
        id: "link-in-bio",
        title: "Link in Bio Page",
        description: "Build a beautiful personal link page to share on your social media profiles.",
        difficulty: "Beginner",
        estimatedTimeMin: 15,
        icon: "🔗",
        isUnlocked: true,
        isPremium: false,
        steps: [
            {
                id: 1,
                title: "The Foundation",
                instruction: "Let's start by adding a profile picture and your name. Use an `<img>` tag and an `<h1>` tag.",
                initialCode: {
                    html: `<div class="container">\n  <!-- Add your image here -->\n\n  <!-- Add your name here -->\n\n</div>`,
                    css: `body {
  font-family: -apple-system, sans-serif;
  background: #f4f4f5;
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.container {
  background: white;
  padding: 2rem;
  border-radius: 24px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}`,
                    js: `// No JS needed yet!`
                },
                expectedOutputSnippet: "<h1",
                solutionInfo: {
                    html: `<div class="container">\n  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />\n  <h1>Alex Developer</h1>\n</div>`
                }
            },
            {
                id: 2,
                title: "Adding Links",
                instruction: "Now, let's add some styled links using the `<a>` tag inside a flex container.",
                initialCode: {
                    html: `<div class="container">
  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
  <h1>Alex Developer</h1>
  <p class="bio">Building the future of mobile coding.</p>
  
  <div class="links">
    <!-- Add at least two <a> tags here -->

  </div>
</div>`,
                    css: `/* Previous CSS remains... */
body { font-family: -apple-system, sans-serif; background: #f4f4f5; display: flex; justify-content: center; padding: 2rem; }
.container { background: white; padding: 2rem; border-radius: 24px; text-align: center; width: 100%; max-width: 400px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
img { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 1rem; }
.bio { color: #52525b; margin-bottom: 2rem; }

/* Let's style the links! */
.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.links a {
  background: #000;
  color: white;
  text-decoration: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: bold;
  transition: transform 0.2s;
}

.links a:hover {
  transform: scale(1.02);
}`,
                    js: `// No JS needed yet!`
                },
                expectedOutputSnippet: "class=\"links\"",
                solutionInfo: {
                    html: `<div class="container">\n  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />\n  <h1>Alex Developer</h1>\n  <p class="bio">Building the future of mobile coding.</p>\n  <div class="links">\n    <a href="#">My Portfolio</a>\n    <a href="#">Twitter / X</a>\n  </div>\n</div>`
                }
            }
        ]
    },
    {
        id: "weather-app",
        title: "Live Weather App",
        description: "Fetch real data from an API and display it in a beautiful glassmorphism card.",
        difficulty: "Intermediate",
        estimatedTimeMin: 30,
        icon: "🌤️",
        isUnlocked: true,
        isPremium: true,
        steps: [
            {
                id: 1,
                title: "The UI Foundation",
                instruction: "Create a glass-like container for our weather data using HTML and CSS backdrop-filter.",
                initialCode: {
                    html: `<div class="app-bg">
  <div class="glass-card">
    <h1 id="city">New York</h1>
    <h2 id="temp">72°F</h2>
    <p id="condition">Sunny</p>
  </div>
</div>`,
                    css: `body { margin: 0; font-family: -apple-system, sans-serif; }
.app-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
}
/* Add glassmorphism to the card */
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 24px;
  color: white;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
h1 { margin: 0 0 0.5rem 0; font-size: 2.5rem; }
h2 { margin: 0 0 0.5rem 0; font-size: 4rem; font-weight: 300; }
p { margin: 0; font-size: 1.2rem; opacity: 0.9; }`,
                    js: `// No JS needed yet!`
                },
                expectedOutputSnippet: "glass-card",
                solutionInfo: {}
            },
            {
                id: 2,
                title: "Fetching Real Data",
                instruction: "Use JavaScript's `fetch` API to get mock weather data and update the DOM elements.",
                initialCode: {
                    html: `<div class="app-bg">\n  <div class="glass-card">\n    <h1 id="city">Loading...</h1>\n    <h2 id="temp">--°</h2>\n    <p id="condition">Please wait</p>\n  </div>\n</div>`,
                    css: `/* CSS is loaded from previous step */ body { margin: 0; font-family: -apple-system, sans-serif; } .app-bg { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0ea5e9, #38bdf8); } .glass-card { background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 3rem; border-radius: 24px; color: white; text-align: center; border: 1px solid rgba(255,255,255,0.3); }`,
                    js: `// We will simulate an API call
async function getWeather() {
  // Try using document.getElementById to update the elements!
  
  setTimeout(() => {
    document.getElementById('city').innerText = "Tokyo";
    document.getElementById('temp').innerText = "65°F";
    document.getElementById('condition').innerText = "Cloudy";
  }, 1000);
}

getWeather();`
                },
                expectedOutputSnippet: "document.getElementById",
                solutionInfo: {}
            }
        ]
    }
];
