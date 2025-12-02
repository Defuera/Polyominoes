export type ProblemId = 'polyominoes' | 'collatz-conjecture' | 'ulam-spiral' | 'number-partitions' | 'riemann-hypothesis' | 'p-adic-numbers' | 'polyiamonds';

export type ProblemDifficulty = 'easy' | 'medium' | 'hard';

export type ProblemCategory = 'geometry' | 'number-theory' | 'combinatorics' | 'primes' | 'analysis';

export interface ProblemMetadata {
  id: ProblemId;
  title: string;
  titleKey: string; // i18n key
  description: string;
  descriptionKey: string; // i18n key
  difficulty: ProblemDifficulty;
  ageRange: string; // e.g., "6+", "14+"
  categories: ProblemCategory[];
  icon: string; // emoji
  estimatedTime: string; // e.g., "15-30 min"
  status: 'available' | 'coming-soon';
  priority: number; // 1-5 stars
}

export interface Problem {
  metadata: ProblemMetadata;
  path: string; // e.g., "/problems/polyominoes"
}
