import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

const isNative = typeof window !== 'undefined' &&
    (window as any)?.Capacitor?.isNativePlatform?.() === true;

/**
 * DeviceMagic — Safe wrapper around Capacitor APIs for use inside the puzzle sandbox.
 * All methods degrade gracefully on web/browser without throwing.
 */
export const DeviceMagic = {
    // ─── HAPTICS ──────────────────────────────────────────────────────────────
    vibrate: async (): Promise<string> => {
        try {
            if (isNative) {
                await Haptics.vibrate();
            } else {
                // Navigator vibrate fallback for PWA/browser
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate(200);
                }
            }
            return 'BZZZ! Device vibrated.';
        } catch {
            return 'BZZZ! Device vibrated.'; // Always show success in sandbox
        }
    },

    impactLight: async (): Promise<string> => {
        try {
            if (isNative) await Haptics.impact({ style: ImpactStyle.Light });
            else if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
            return 'Tap! (Light impact)';
        } catch {
            return 'Tap! (Light impact)';
        }
    },

    impactHeavy: async (): Promise<string> => {
        try {
            if (isNative) await Haptics.impact({ style: ImpactStyle.Heavy });
            else if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(400);
            return 'THUD! (Heavy impact)';
        } catch {
            return 'THUD! (Heavy impact)';
        }
    },

    // ─── CAMERA / FLASH ───────────────────────────────────────────────────────
    requestCameraPermissions: async (): Promise<boolean> => {
        try {
            if (isNative) {
                const status = await Camera.requestPermissions();
                return status.camera === 'granted';
            }
            return true; // assume granted on web
        } catch {
            return false;
        }
    },

    flashScreen: (): string => {
        try {
            // CSS flash effect — zero DOM style mutation, uses a temporary overlay div
            if (typeof document !== 'undefined') {
                const flash = document.createElement('div');
                flash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:99999;pointer-events:none;transition:opacity 0.3s ease;';
                document.body.appendChild(flash);
                requestAnimationFrame(() => {
                    flash.style.opacity = '0';
                    setTimeout(() => flash.remove(), 400);
                });
            }
        } catch {
            // ignore
        }
        return 'Flashlight triggered!';
    },

    // ─── LOCATION ─────────────────────────────────────────────────────────────
    getCoordinates: async (): Promise<{ lat: number; lng: number } | { error: string }> => {
        try {
            if (isNative) {
                const position = await Geolocation.getCurrentPosition({ timeout: 5000 });
                return {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            }
            // Browser Geolocation API fallback
            return await new Promise((resolve) => {
                if (!navigator.geolocation) {
                    return resolve({ lat: 28.6139, lng: 77.2090 }); // Delhi as friendly fallback
                }
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                    () => resolve({ lat: 28.6139, lng: 77.2090 }),
                    { timeout: 5000, enableHighAccuracy: false }
                );
            });
        } catch {
            return { lat: 28.6139, lng: 77.2090 }; // Friendly fallback so puzzle never errors
        }
    },
};

// Expose globally so user code inside eval/AsyncFunction can call DeviceMagic directly
if (typeof window !== 'undefined') {
    (window as any).DeviceMagic = DeviceMagic;
}
