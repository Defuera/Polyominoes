import { Polyomino } from '@/types/polyomino';
import { normalizePolyomino, areEquivalent } from './normalizer';

/**
 * Check if a polyomino is connected (all squares touch edge-to-edge)
 */
export function isConnected(coords: Polyomino): boolean {
  if (coords.length <= 1) return true;

  const visited = new Set<string>();
  const queue: Polyomino = [coords[0]];
  visited.add(JSON.stringify(coords[0]));

  const coordSet = new Set(coords.map((c) => JSON.stringify(c)));

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;

    // Check all 4 adjacent cells
    const neighbors: Polyomino = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (const neighbor of neighbors) {
      const neighborStr = JSON.stringify(neighbor);
      if (coordSet.has(neighborStr) && !visited.has(neighborStr)) {
        visited.add(neighborStr);
        queue.push(neighbor);
      }
    }
  }

  return visited.size === coords.length;
}

/**
 * Validate if a shape matches one of the known polyominoes
 */
export function isValidPolyomino(
  coords: Polyomino,
  validShapes: Polyomino[]
): boolean {
  if (!isConnected(coords)) return false;

  const normalized = normalizePolyomino(coords);

  return validShapes.some((shape) => areEquivalent(normalized, shape));
}

/**
 * Check if polyomino already exists in a list (accounting for transformations)
 */
export function isDuplicate(poly: Polyomino, existingPolys: Polyomino[]): boolean {
  return existingPolys.some((existing) => areEquivalent(poly, existing));
}
