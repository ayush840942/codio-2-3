
/**
 * Deterministically maps any string (like a Firebase UID) to a valid UUID v4-like format.
 * This is used to satisfy Supabase's UUID type constraints when using Firebase UIDs.
 */
export const toDatabaseId = (uid: string): string => {
    if (!uid) return '';

    // If it's already a UUID, return as is
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(uid)) return uid;

    // Otherwise, create a deterministic "pseudo-UUID" based on the string hash
    // This ensures the same Firebase UID always maps to the same UUID in Supabase
    let hash = 0;
    for (let i = 0; i < uid.length; i++) {
        const char = uid.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    const part1 = hex;
    const part2 = uid.length.toString(16).padStart(4, '0');
    const part3 = '4' + uid.charCodeAt(0).toString(16).padStart(3, '0').slice(-3); // version 4 indicator
    const part4 = 'a' + uid.charCodeAt(uid.length - 1).toString(16).padStart(3, '0').slice(-3);
    const part5 = Buffer ? '' : '000000000000'; // Fallback if no buffer

    // For a more robust mapping without external libs, we slice the UID if possible or just pad
    const uidHex = Array.from(uid).map(c => c.charCodeAt(0).toString(16)).join('').slice(0, 12).padEnd(12, '0');

    return `${part1}-${part2}-${part3}-${part4}-${uidHex}`;
};
