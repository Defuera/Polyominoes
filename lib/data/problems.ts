import { Problem, ProblemMetadata } from '@/types/problem';

export const PROBLEMS_METADATA: ProblemMetadata[] = [
  {
    id: 'polyominoes',
    title: 'Polyominoes Explorer',
    titleKey: 'problems.polyominoes.title',
    description: 'Discover shapes made from squares! Explore, visualize growth, and play games.',
    descriptionKey: 'problems.polyominoes.description',
    difficulty: 'easy',
    ageRange: '6+',
    categories: ['geometry', 'combinatorics'],
    icon: '🧩',
    estimatedTime: '15-30 min',
    status: 'available',
    priority: 5,
  },
  {
    id: 'ulam-spiral',
    title: 'Ulam Spiral',
    titleKey: 'problems.ulam-spiral.title',
    description: 'Discover mysterious patterns in prime numbers arranged in a spiral!',
    descriptionKey: 'problems.ulam-spiral.description',
    difficulty: 'easy',
    ageRange: '6+',
    categories: ['primes', 'number-theory'],
    icon: '🌀',
    estimatedTime: '10-20 min',
    status: 'coming-soon',
    priority: 5,
  },
  {
    id: 'number-partitions',
    title: 'Number Partitions',
    titleKey: 'problems.number-partitions.title',
    description: 'How many ways can you make a number? Explore partition theory!',
    descriptionKey: 'problems.number-partitions.description',
    difficulty: 'medium',
    ageRange: '7+',
    categories: ['combinatorics', 'number-theory'],
    icon: '🔢',
    estimatedTime: '20-40 min',
    status: 'coming-soon',
    priority: 5,
  },
  {
    id: 'polyiamonds',
    title: 'Polyiamonds',
    titleKey: 'problems.polyiamonds.title',
    description: 'Like polyominoes, but with triangles! Discover triangular shapes.',
    descriptionKey: 'problems.polyiamonds.description',
    difficulty: 'easy',
    ageRange: '6+',
    categories: ['geometry', 'combinatorics'],
    icon: '🔺',
    estimatedTime: '15-30 min',
    status: 'coming-soon',
    priority: 3,
  },
  {
    id: 'riemann-hypothesis',
    title: 'Riemann Hypothesis',
    titleKey: 'problems.riemann-hypothesis.title',
    description: 'Explore the million-dollar math problem about prime numbers!',
    descriptionKey: 'problems.riemann-hypothesis.description',
    difficulty: 'hard',
    ageRange: '14+',
    categories: ['primes', 'analysis'],
    icon: '📊',
    estimatedTime: '30-60 min',
    status: 'coming-soon',
    priority: 3,
  },
  {
    id: 'p-adic-numbers',
    title: 'p-adic Numbers',
    titleKey: 'problems.p-adic-numbers.title',
    description: 'Mind-bending alternative number system where infinity is small!',
    descriptionKey: 'problems.p-adic-numbers.description',
    difficulty: 'hard',
    ageRange: '14+',
    categories: ['number-theory', 'analysis'],
    icon: '🔮',
    estimatedTime: '40-60 min',
    status: 'coming-soon',
    priority: 2,
  },
];

export const PROBLEMS: Problem[] = PROBLEMS_METADATA.map((metadata) => ({
  metadata,
  path: `/problems/${metadata.id}`,
}));

export function getProblem(id: string): Problem | undefined {
  return PROBLEMS.find((p) => p.metadata.id === id);
}

export function getAvailableProblems(): Problem[] {
  return PROBLEMS.filter((p) => p.metadata.status === 'available');
}

export function getComingSoonProblems(): Problem[] {
  return PROBLEMS.filter((p) => p.metadata.status === 'coming-soon');
}
