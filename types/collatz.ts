export interface CollatzSequence {
  startNumber: number;
  sequence: number[];
  stats: CollatzStats;
}

export interface CollatzStats {
  steps: number;           // Number of steps to reach 1
  maxValue: number;        // Highest value reached
  evenCount: number;       // Number of even steps
  oddCount: number;        // Number of odd steps
  glideRatio: number;      // maxValue / startNumber
}

export interface CollatzRacer {
  id: string;
  startNumber: number;
  currentStep: number;
  currentValue: number;
  sequence: number[];
  finished: boolean;
  finishTime?: number;
}

export interface CollatzChallenge {
  id: string;
  title: string;
  description: string;
  check: (sequence: CollatzSequence) => boolean;
  hint?: string;
}

export interface CollatzRecord {
  category: 'steps' | 'altitude' | 'glide';
  number: number;
  value: number;
  range: string; // e.g., "under 100"
}

export type CollatzTabType = 'explore' | 'race' | 'records' | 'compare' | 'learn';

// Famous numbers with interesting properties
export const FAMOUS_NUMBERS = [
  { number: 6, reason: 'Quick journey (8 steps)' },
  { number: 27, reason: 'Record holder! 111 steps, reaches 9232' },
  { number: 97, reason: 'Longest under 100 (118 steps)' },
  { number: 7, reason: 'Lucky seven (16 steps)' },
  { number: 15, reason: 'Reaches 160 from just 15!' },
];

// Pre-computed records for quick reference
export const COLLATZ_RECORDS: Record<string, CollatzRecord[]> = {
  under_20: [
    { category: 'steps', number: 18, value: 20, range: 'under 20' },
    { category: 'steps', number: 19, value: 20, range: 'under 20' },
    { category: 'altitude', number: 15, value: 160, range: 'under 20' },
  ],
  under_100: [
    { category: 'steps', number: 97, value: 118, range: 'under 100' },
    { category: 'altitude', number: 27, value: 9232, range: 'under 100' },
    { category: 'glide', number: 27, value: 342, range: 'under 100' },
  ],
};
