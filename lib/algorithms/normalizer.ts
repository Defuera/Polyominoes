import { Coordinate, Polyomino } from '@/types/polyomino';

/**
 * Normalize a polyomino to its canonical form (top-left corner at 0,0)
 */
export function normalizePolyomino(coords: Polyomino): Polyomino {
  if (coords.length === 0) return [];

  const minX = Math.min(...coords.map((c) => c[0]));
  const minY = Math.min(...coords.map((c) => c[1]));

  return coords
    .map(([x, y]): Coordinate => [x - minX, y - minY])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/**
 * Get all rotations and reflections of a polyomino
 */
export function getTransformations(coords: Polyomino): Polyomino[] {
  const transformations: Polyomino[] = [];

  // Original
  transformations.push(normalizePolyomino(coords));

  // Rotate 90°
  transformations.push(normalizePolyomino(coords.map(([x, y]): Coordinate => [-y, x])));

  // Rotate 180°
  transformations.push(normalizePolyomino(coords.map(([x, y]): Coordinate => [-x, -y])));

  // Rotate 270°
  transformations.push(normalizePolyomino(coords.map(([x, y]): Coordinate => [y, -x])));

  // Reflect horizontally
  transformations.push(normalizePolyomino(coords.map(([x, y]): Coordinate => [-x, y])));

  // Reflect vertically
  transformations.push(normalizePolyomino(coords.map(([x, y]): Coordinate => [x, -y])));

  // Reflect diagonally
  transformations.push(normalizePolyomino(coords.map(([x, y]): Coordinate => [y, x])));

  // Reflect anti-diagonally
  transformations.push(normalizePolyomino(coords.map(([x, y]): Coordinate => [-y, -x])));

  return transformations;
}

/**
 * Check if two polyominoes are equivalent (same shape, possibly rotated/reflected)
 */
export function areEquivalent(poly1: Polyomino, poly2: Polyomino): boolean {
  if (poly1.length !== poly2.length) return false;

  const transformations = getTransformations(poly1);
  const poly2Str = JSON.stringify(normalizePolyomino(poly2));

  return transformations.some((t) => JSON.stringify(t) === poly2Str);
}

/**
 * Get bounding box dimensions of a polyomino
 */
export function getBoundingBox(coords: Polyomino): { width: number; height: number } {
  if (coords.length === 0) return { width: 0, height: 0 };

  const normalized = normalizePolyomino(coords);
  const maxX = Math.max(...normalized.map((c) => c[0]));
  const maxY = Math.max(...normalized.map((c) => c[1]));

  return { width: maxX + 1, height: maxY + 1 };
}
