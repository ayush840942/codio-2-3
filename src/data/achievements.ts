export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'streak' | 'levels' | 'xp' | 'special';
    requirement: number;
    reward: { type: 'xp' | 'hearts'; amount: number };
}

export const ACHIEVEMENTS: Achievement[] = [
    // Streak achievements
    { id: 'streak_3', title: 'Getting Started', description: '3 day streak', icon: '🔥', category: 'streak', requirement: 3, reward: { type: 'xp', amount: 25 } },
    { id: 'streak_7', title: 'Week Warrior', description: '7 day streak', icon: '⚡', category: 'streak', requirement: 7, reward: { type: 'xp', amount: 50 } },
    { id: 'streak_14', title: 'Consistent Coder', description: '14 day streak', icon: '💪', category: 'streak', requirement: 14, reward: { type: 'hearts', amount: 3 } },
    { id: 'streak_30', title: 'Code Legend', description: '30 day streak', icon: '🏆', category: 'streak', requirement: 30, reward: { type: 'xp', amount: 200 } },
    { id: 'streak_100', title: 'Unstoppable', description: '100 day streak', icon: '👑', category: 'streak', requirement: 100, reward: { type: 'xp', amount: 500 } },

    // Level achievements
    { id: 'level_1', title: 'First Steps', description: 'Complete 1 level', icon: '🎯', category: 'levels', requirement: 1, reward: { type: 'xp', amount: 10 } },
    { id: 'level_10', title: 'Rising Star', description: 'Complete 10 levels', icon: '⭐', category: 'levels', requirement: 10, reward: { type: 'xp', amount: 50 } },
    { id: 'level_25', title: 'Code Apprentice', description: 'Complete 25 levels', icon: '📚', category: 'levels', requirement: 25, reward: { type: 'hearts', amount: 2 } },
    { id: 'level_50', title: 'Code Expert', description: 'Complete 50 levels', icon: '🎓', category: 'levels', requirement: 50, reward: { type: 'xp', amount: 150 } },
    { id: 'level_100', title: 'Code Master', description: 'Complete 100 levels', icon: '🏅', category: 'levels', requirement: 100, reward: { type: 'xp', amount: 300 } },

    // XP achievements
    { id: 'xp_100', title: 'XP Seeker', description: 'Earn 100 XP', icon: '✨', category: 'xp', requirement: 100, reward: { type: 'hearts', amount: 1 } },
    { id: 'xp_500', title: 'XP Hunter', description: 'Earn 500 XP', icon: '💫', category: 'xp', requirement: 500, reward: { type: 'hearts', amount: 2 } },
    { id: 'xp_1000', title: 'XP Champion', description: 'Earn 1000 XP', icon: '🌟', category: 'xp', requirement: 1000, reward: { type: 'hearts', amount: 3 } },
    { id: 'xp_5000', title: 'XP Legend', description: 'Earn 5000 XP', icon: '💎', category: 'xp', requirement: 5000, reward: { type: 'xp', amount: 500 } },

    // Special achievements
    { id: 'first_perfect', title: 'Perfect Score', description: 'Complete a level on first try', icon: '💯', category: 'special', requirement: 1, reward: { type: 'xp', amount: 25 } },
    { id: 'night_owl', title: 'Night Owl', description: 'Practice after midnight', icon: '🦉', category: 'special', requirement: 1, reward: { type: 'xp', amount: 15 } },
    { id: 'early_bird', title: 'Early Bird', description: 'Practice before 7 AM', icon: '🐦', category: 'special', requirement: 1, reward: { type: 'xp', amount: 15 } },
];
