import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
import { useState, useEffect } from 'react';

interface GoogleUser {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    idToken: string;
    accessToken: string;
}

interface SignInResult {
    success: boolean;
    user?: GoogleUser;
    error?: any;
}

export const useNativeGoogleAuth = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const isNative = Capacitor.isNativePlatform();

    useEffect(() => {
        setIsInitialized(true);
    }, []);

    const signIn = async (): Promise<SignInResult> => {
        try {
            console.log('Starting native Google Sign-In...');
            const result = await GoogleAuth.signIn();

            console.log('Google Sign-In successful:', result);

            return {
                success: true,
                user: {
                    id: result.id,
                    email: result.email,
                    name: result.name,
                    imageUrl: result.imageUrl || '',
                    idToken: result.authentication.idToken,
                    accessToken: result.authentication.accessToken
                }
            };
        } catch (error) {
            console.error('Google Sign-In error:', error);
            return { success: false, error };
        }
    };

    const signOut = async () => {
        try {
            await GoogleAuth.signOut();
            console.log('Google Sign-Out successful');
            return { success: true };
        } catch (error) {
            console.error('Google Sign-Out error:', error);
            return { success: false, error };
        }
    };

    const refresh = async () => {
        try {
            const result = await GoogleAuth.refresh();
            return {
                success: true,
                accessToken: result.accessToken
            };
        } catch (error) {
            console.error('Token refresh error:', error);
            return { success: false, error };
        }
    };

    return {
        isInitialized,
        isNative,
        signIn,
        signOut,
        refresh
    };
};
