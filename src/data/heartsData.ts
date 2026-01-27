export const HEARTS_CONFIG = {
    MAX_HEARTS: 3,
    REFILL_TIME_MS: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    XP_COST_PER_HEART: 100,
    HEARTS_PER_PURCHASE: 1,
} as const;

export type HeartsConfig = typeof HEARTS_CONFIG;
