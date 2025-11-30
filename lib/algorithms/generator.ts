import { Polyomino, Coordinate } from '@/types/polyomino';
import { normalizePolyomino, areEquivalent } from './normalizer';
import { isConnected } from './validator';

/**
 * Generate all unique polyominoes of size n
 * Uses Redelmeier's algorithm
 */
export function generatePolyominoes(n: number): Polyomino[] {
  if (n === 0) return [];
  if (n === 1) return [[[0, 0]]];

  const results: Polyomino[] = [];
  const seen = new Set<string>();

  // Start with a single cell
  const initial: Polyomino = [[0, 0]];

  function explore(current: Polyomino, untried: Set<string>) {
    if (current.length === n) {
      // Normalize and check if we've seen this shape before
      const normalized = normalizePolyomino(current);
      const key = JSON.stringify(normalized);

      // Check all rotations/reflections
      let isDuplicate = false;
      for (const seenKey of seen) {
        const seenShape = JSON.parse(seenKey) as Polyomino;
        if (areEquivalent(normalized, seenShape)) {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        seen.add(key);
        results.push(normalized);
      }
      return;
    }

    // Get all neighbors of current cells
    const neighbors = new Set<string>();
    for (const [x, y] of current) {
      // Check 4 adjacent cells
      const adjacent: Coordinate[] = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      for (const coord of adjacent) {
        const key = JSON.stringify(coord);
        const alreadyInCurrent = current.some(([cx, cy]) => cx === coord[0] && cy === coord[1]);
        if (!alreadyInCurrent && !untried.has(key)) {
          neighbors.add(key);
        }
      }
    }

    // Try each neighbor
    const neighborsArray = Array.from(neighbors).map((s) => JSON.parse(s) as Coordinate);

    for (let i = 0; i < neighborsArray.length; i++) {
      const neighbor = neighborsArray[i];
      const newCurrent = [...current, neighbor];

      // Create new untried set that excludes cells we've already considered
      const newUntried = new Set(untried);
      for (let j = 0; j < i; j++) {
        newUntried.add(JSON.stringify(neighborsArray[j]));
      }

      explore(newCurrent, newUntried);
    }
  }

  explore(initial, new Set());
  return results;
}

/**
 * Generate polyominoes for multiple sizes
 */
export function generatePolyominoesUpTo(maxN: number): Record<number, Polyomino[]> {
  const result: Record<number, Polyomino[]> = {};

  for (let n = 1; n <= maxN; n++) {
    result[n] = generatePolyominoes(n);
  }

  return result;
}
