
/**
 * Utility for Gamified Voice (Text-to-Speech)
 * Uses ElevenLabs API if key is present, otherwise falls back to browser's SpeechSynthesis.
 */

// Define the API Key constant from env
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
// Default Voice ID (e.g., 'Rachel', 'Adam', or a custom game character voice)
// You can replace this with a specific voice ID from ElevenLabs
const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Example: "Bella" - soft and friendly

export const playGamifiedWelcome = async (text: string) => {
    try {
        // Check if API key is available
        if (!ELEVENLABS_API_KEY) {
            console.warn('ElevenLabs API Key missing, falling back to browser speech.');
            playBrowserSpeech(text);
            return;
        }

        console.log('Generating voice with ElevenLabs...');

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('ElevenLabs API Error:', errorData);
            playBrowserSpeech(text);
            return;
        }

        // Get the audio blob and play it
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        // Play audio
        await audio.play();
        console.log('ElevenLabs voice playing successfully.');

    } catch (error) {
        console.error('Error playing gamified voice:', error);
        playBrowserSpeech(text);
    }
};

const playBrowserSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        // Try to find a friendly voice
        const voices = window.speechSynthesis.getVoices();
        const friendlyVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English'));
        if (friendlyVoice) utterance.voice = friendlyVoice;

        utterance.rate = 1.1; // Slightly faster/more energetic
        utterance.pitch = 1.1; // Slightly higher pitch

        window.speechSynthesis.speak(utterance);
        console.log('Browser fallback voice playing.');
    } else {
        console.log('Text-to-speech not supported in this browser.');
    }
};
