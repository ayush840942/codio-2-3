
export type LevelTopic =
    | 'HTML'
    | 'CSS'
    | 'JavaScript'
    | 'Python'
    | 'TypeScript'
    | 'React'
    | 'Database'
    | 'Algorithms'
    | 'Data Structures'
    | 'Web Development'
    | 'Programming Fundamentals'
    | 'Advanced Programming'
    | 'Mastery';

export interface LevelConfig {
    id: number;
    topic: LevelTopic;
    difficulty: 'easy' | 'medium' | 'hard';
}

export const getLevelConfig = (levelId: number): LevelConfig => {
    let topic: LevelTopic = 'Programming Fundamentals';
    let difficulty: 'easy' | 'medium' | 'hard' = 'easy';

    // Topic Mapping based on the new 9-tier structure (Approximate ranges)
    if (levelId <= 15) topic = 'Programming Fundamentals';
    else if (levelId <= 30) topic = 'HTML';
    else if (levelId <= 45) topic = 'CSS';
    else if (levelId <= 70) topic = 'JavaScript';
    else if (levelId <= 100) topic = 'Python';
    else if (levelId <= 120) topic = 'TypeScript';
    else if (levelId <= 140) topic = 'React';
    else if (levelId <= 180) topic = 'Advanced Programming';
    else if (levelId <= 220) topic = 'Data Structures';
    else if (levelId <= 250) topic = 'Algorithms';
    else topic = 'Mastery';

    // Difficulty Mapping
    if (levelId <= 60) difficulty = 'easy';
    else if (levelId <= 180) difficulty = 'medium';
    else difficulty = 'hard';

    return { id: levelId, topic, difficulty };
};

export const getTopicLabel = (topic: LevelTopic): string => {
    return topic;
};
