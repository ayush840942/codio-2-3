
import requests
import json

API_KEY = "sk_230425c145a92f87d30c25cbcf81ac075298b6e666a54ff8"

def list_voices():
    url = "https://api.elevenlabs.io/v1/voices"
    headers = {
        "xi-api-key": API_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        voices = response.json()["voices"]
        print(f"Found {len(voices)} voices.")
        for v in voices:
            # Print Name, ID, Category, Labels if relevant
            print(f"Name: {v['name']}, ID: {v['voice_id']}, Category: {v.get('category')}, Labels: {v.get('labels')}")
    else:
        print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    list_voices()
