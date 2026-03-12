
import requests
import os
import json

# API Key provided by user
API_KEY = "sk_230425c145a92f87d30c25cbcf81ac075298b6e666a54ff8"

# Voice ID for "Cute/Gamified Girl"
# "Mimi" is often used for this style, or "Nicole" (whispery), "Glinda" (expressive).
# Let's try to list voices first or just use a known one.
# "Rachel" is the default. "Domi" is strong.
# Let's use "Glinda" or similar if we can find it, otherwise "Rachel" with specific settings.
# Actually, the user wants "cute". "Mimi" (Australian, Childish) might be good if available.
# Let's default to a generic "Female" ID if specific ones aren't guaranteed, but ElevenLabs public voices are standard.
# "21m00Tcm4TlvDq8ikWAM" is Rachel (American, calm).
# "MF3mGyEYCl7XYWbV9V6O" is Elli (American, clear).
# "Jessica" - Playful, Bright, Warm, Cute
VOICE_ID = "cgSgspJ2msm6clMCkdW9" 

TEXT_TO_SAY = "Great job! You are a coding star!"

OUTPUT_DIR = "public/sounds"
OUTPUT_FILE = "level_success_voice.mp3"

def generate_audio():
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": API_KEY
    }
    
    data = {
        "text": TEXT_TO_SAY,
        "model_id": "eleven_multilingual_v2", # Trying multilingual v2
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.5, # Exaggerate style for "gamified"
            "use_speaker_boost": True
        }
    }
    
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    print(f"Generating audio for: '{TEXT_TO_SAY}'...")
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        file_path = os.path.join(OUTPUT_DIR, OUTPUT_FILE)
        with open(file_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        print(f"Success! Audio saved to {file_path}")
    else:
        print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    generate_audio()
