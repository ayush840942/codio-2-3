import { useState, useEffect } from 'react';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

export const useKeyboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) {
            const handleResize = () => {
                if (window.visualViewport) {
                    const isKeyboardOpen = window.visualViewport.height < window.innerHeight * 0.75;
                    setIsOpen(isKeyboardOpen);
                }
            };

            window.visualViewport?.addEventListener('resize', handleResize);
            return () => window.visualViewport?.removeEventListener('resize', handleResize);
        }

        let showListener: any;
        let hideListener: any;

        const setupListeners = async () => {
            showListener = await Keyboard.addListener('keyboardWillShow', (info) => {
                setIsOpen(true);
                setKeyboardHeight(info.keyboardHeight);
            });

            hideListener = await Keyboard.addListener('keyboardWillHide', () => {
                setIsOpen(false);
                setKeyboardHeight(0);
            });
        };

        setupListeners();

        return () => {
            showListener?.remove();
            hideListener?.remove();
        };
    }, []);

    return { isOpen, keyboardHeight };
};
