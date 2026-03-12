
export interface StoryBeat {
    intro: string;
    outro: string;
}

export const humorService = {
    getJoke: (topic: string): string => {
        const jokes: Record<string, string[]> = {
            'HTML': [
                "Why did the web designer walk out of the restaurant? Because of the table layout!",
                "HTML is like the skeleton. Without CSS, it's just bones. A bit spooky, right?",
                "Why did the HTML tag go to therapy? It had too many unclosed issues."
            ],
            'CSS': [
                "CSS is like makeup. You can look like a movie star or a clown with just one semicolon mistake.",
                "Why was the CSS developer so good at hide and seek? Because they used display: none!",
                "My CSS is like my life: I have no idea why it works on desktop but breaks on mobile."
            ],
            'JavaScript': [
                "JavaScript: Because sometimes '1' + 1 should equal '11', obviously.",
                "Why was the function so stressed? It had too many 'this' problems.",
                "I told a joke about JavaScript... nobody 'awaited' for the punchline."
            ],
            'Python': [
                "Why do Python programmers prefer using snakes? Because they don't like 'C'ing things clearly!",
                "Python: The only language where indenting your life actually makes sense.",
                "Why was the Python script so happy? It found it's perfect 'match' (case)."
            ],
            'General': [
                "There are 10 types of people in the world: those who understand binary, and those who don't.",
                "To understand recursion, you must first understand recursion.",
                "A SQL query walks into a bar, walks up to two tables, and asks... 'Can I join you?'"
            ]
        };
        const category = jokes[topic] || jokes['General'];
        return category[Math.floor(Math.random() * category.length)];
    },

    getMetaphor: (topic: string): string => {
        const metaphors: Record<string, string> = {
            'Variables': "Variables are like empty boxes. You can put your favorite pizza in them, then change it to a salad later (though why would you?).",
            'Functions': "A function is like a pizza delivery guy. You give him an address (input), and he brings you a pizza (output).",
            'Loops': "Loops are like your morning alarm. It keeps screaming at you until you finally get out of bed (the exit condition).",
            'Pointers': "Pointers are like a treasure map. They don't give you the gold; they just tell you where the gold is buried.",
            'Lists': "Lists are like your shopping list. If you forget to add milk, you're going to have a bad breakfast."
        };
        return metaphors[topic] || "It's like building a LEGO set without the manual – challenging, but rewarding!";
    },

    getStoryBeat: (levelId: number): StoryBeat => {
        if (levelId <= 20) {
            return {
                intro: "Welcome, Rookie! You've just entered the 'Hacker Cat' terminal. Let's make some web magic happen!",
                outro: "Not bad! The Hacker Cat is purring. One step closer to becoming a web wizard."
            };
        } else if (levelId <= 40) {
            return {
                intro: "Code Red! The internet is being attacked by giant bugs. Your JS skills are our only hope!",
                outro: "Bugs squashed! But wait... I hear more 'callbacks' coming. Gear up!"
            };
        } else if (levelId <= 140) {
            const stage = Math.floor((levelId - 41) / 25);
            const stories = [
                "Project AI-Companion: Initiated. Let's teach our bot how to speak Python.",
                "Our bot can talk, but can it think? Logic time!",
                "Processing Power Overload! We need to optimize our code before the server melts.",
                "The AI is becoming sentient... and it says your code is 'Beautiful' (PEP 8 style)!"
            ];
            return {
                intro: stories[stage] || "Continuing the AI evolution...",
                outro: "Data processed. The bot is learning... maybe too fast."
            };
        }
        return {
            intro: "You've reached the Elite tier. The Source Code of the Universe is within reach!",
            outro: "Masterful. Even the compiler is impressed."
        };
    }
};
