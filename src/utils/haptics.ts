import { Capacitor } from '@capacitor/core';
import { Haptics as CapHaptics, ImpactStyle as CapImpactStyle, NotificationType as CapNotificationType } from '@capacitor/haptics';

export const haptics = {
    impact: async (style: CapImpactStyle = CapImpactStyle.Light) => {
        if (Capacitor.isNativePlatform()) {
            try {
                await CapHaptics.impact({ style });
            } catch (e) {
                console.warn('Haptics not available');
            }
        }
    },

    notification: async (type: CapNotificationType = CapNotificationType.Success) => {
        if (Capacitor.isNativePlatform()) {
            try {
                await CapHaptics.notification({ type });
            } catch (e) {
                console.warn('Haptics not available');
            }
        }
    },

    selectionStart: async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await CapHaptics.selectionStart();
            } catch (e) {
                console.warn('Haptics not available');
            }
        }
    },

    selectionChanged: async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await CapHaptics.selectionChanged();
            } catch (e) {
                console.warn('Haptics not available');
            }
        }
    },

    selectionEnd: async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await CapHaptics.selectionEnd();
            } catch (e) {
                console.warn('Haptics not available');
            }
        }
    },

    vibrate: async () => {
        if (Capacitor.isNativePlatform()) {
            try {
                await CapHaptics.vibrate();
            } catch (e) {
                console.warn('Haptics not available');
            }
        }
    }
};
