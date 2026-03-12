import React, { useEffect, useRef, useState } from 'react';

export const BackgroundMusic: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isEnabled, setIsEnabled] = useState(() => localStorage.getItem('settings_music') !== 'false');

    useEffect(() => {
        // Initialize audio
        if (!audioRef.current) {
            // Updated to be offline-ready: No external URLs
            // Placeholder for local music loop path: '/music/bg_loop.mp3'
            // For now, we initialize without a source to prevent network errors
            audioRef.current = new Audio();
            audioRef.current.loop = true;
            audioRef.current.volume = 0; // Start muted for fade-in
        }

        const audio = audioRef.current;

        const startMusic = async () => {
            if (isEnabled) {
                try {
                    await audio.play();
                    // Gentle fade-in
                    let vol = 0;
                    const interval = setInterval(() => {
                        vol += 0.05;
                        if (vol >= 0.2) {
                            audio.volume = 0.2;
                            clearInterval(interval);
                        } else {
                            audio.volume = vol;
                        }
                    }, 200);
                } catch (err) {
                    console.warn('BGM Auto-play blocked. Waiting for interaction.');
                }
            }
        };

        const stopMusic = () => {
            // Gentle fade-out
            let vol = audio.volume;
            const interval = setInterval(() => {
                vol -= 0.05;
                if (vol <= 0) {
                    audio.volume = 0;
                    audio.pause();
                    clearInterval(interval);
                } else {
                    audio.volume = vol;
                }
            }, 100);
        };

        if (isEnabled) {
            startMusic();
        } else {
            stopMusic();
        }

        // Handle interaction trigger for browsers
        const handleInteraction = () => {
            if (isEnabled && audio.paused) {
                startMusic();
            }
            window.removeEventListener('click', handleInteraction);
        };
        window.addEventListener('click', handleInteraction);

        // Subscribing to storage changes (if user toggles it in settings)
        const handleStorageChange = () => {
            const musicSetting = localStorage.getItem('settings_music') !== 'false';
            setIsEnabled(musicSetting);
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('storage', handleStorageChange);
            audio.pause();
        };
    }, [isEnabled]);

    return null; // Side-effect only component
};
