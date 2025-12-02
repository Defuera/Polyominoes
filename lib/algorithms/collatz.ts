import { CollatzSequence, CollatzStats } from '@/types/collatz';

/**
 * Generate the complete Collatz sequence for a given starting number
 */
export function generateCollatzSequence(n: number): number[] {
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error('Starting number must be a positive integer');
  }

  const sequence: number[] = [n];
  let current = n;

  // Safety limit to prevent infinite loops
  const MAX_STEPS = 10000;
  let steps = 0;

  while (current !== 1 && steps < MAX_STEPS) {
    current = current % 2 === 0 ? current / 2 : 3 * current + 1;
    sequence.push(current);
    steps++;
  }

  return sequence;
}

/**
 * Calculate statistics for a Collatz sequence
 */
export function calculateStats(sequence: number[]): CollatzStats {
  const startNumber = sequence[0];
  const maxValue = Math.max(...sequence);
  const evenCount = sequence.filter((n) => n % 2 === 0).length;
  const oddCount = sequence.filter((n) => n % 2 === 1).length;

  return {
    steps: sequence.length - 1, // Don't count the starting number
    maxValue,
    evenCount,
    oddCount,
    glideRatio: maxValue / startNumber,
  };
}

/**
 * Generate a complete CollatzSequence object
 */
export function generateCollatzData(startNumber: number): CollatzSequence {
  const sequence = generateCollatzSequence(startNumber);
  const stats = calculateStats(sequence);

  return {
    startNumber,
    sequence,
    stats,
  };
}

/**
 * Get the next value in the Collatz sequence
 */
export function collatzNext(n: number): number {
  return n % 2 === 0 ? n / 2 : 3 * n + 1;
}

/**
 * Generator function for step-by-step animation
 */
export function* collatzGenerator(n: number): Generator<number, void, unknown> {
  let current = n;
  yield current;

  while (current !== 1) {
    current = collatzNext(current);
    yield current;
  }
}

/**
 * Precompute Collatz data for a range of numbers
 */
export function precomputeRange(start: number, end: number): Map<number, CollatzSequence> {
  const results = new Map<number, CollatzSequence>();

  for (let i = start; i <= end; i++) {
    results.set(i, generateCollatzData(i));
  }

  return results;
}

/**
 * Find numbers with the longest stopping time in a range
 */
export function findLongestInRange(start: number, end: number, count: number = 5): CollatzSequence[] {
  const sequences: CollatzSequence[] = [];

  for (let i = start; i <= end; i++) {
    sequences.push(generateCollatzData(i));
  }

  return sequences.sort((a, b) => b.stats.steps - a.stats.steps).slice(0, count);
}

/**
 * Find numbers with the highest altitude in a range
 */
export function findHighestInRange(start: number, end: number, count: number = 5): CollatzSequence[] {
  const sequences: CollatzSequence[] = [];

  for (let i = start; i <= end; i++) {
    sequences.push(generateCollatzData(i));
  }

  return sequences.sort((a, b) => b.stats.maxValue - a.stats.maxValue).slice(0, count);
}

/**
 * Get a random number within a range
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format large numbers for display
 */
export function formatNumber(n: number): string {
  if (n >= 1000000) {
    return `${(n / 1000000).toFixed(1)}M`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}K`;
  }
  return n.toString();
}

/**
 * Check if a sequence reaches a specific value
 */
export function reachesValue(sequence: number[], target: number): boolean {
  return sequence.includes(target);
}

/**
 * Check if a sequence has N consecutive even steps
 */
export function hasConsecutiveEvenSteps(sequence: number[], count: number): boolean {
  let consecutive = 0;
  for (const num of sequence) {
    if (num % 2 === 0) {
      consecutive++;
      if (consecutive >= count) return true;
    } else {
      consecutive = 0;
    }
  }
  return false;
}
