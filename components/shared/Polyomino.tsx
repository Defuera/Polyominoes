'use client';

import { Polyomino as PolyominoType } from '@/types/polyomino';
import { getBoundingBox, normalizePolyomino } from '@/lib/algorithms/normalizer';

interface PolyominoProps {
  coords: PolyominoType;
  cellSize?: number;
  className?: string;
  activeColor?: string;
}

export default function Polyomino({
  coords,
  cellSize = 20,
  className = '',
  activeColor = 'bg-purple-600',
}: PolyominoProps) {
  const normalized = normalizePolyomino(coords);
  const { width, height } = getBoundingBox(normalized);

  if (width === 0 || height === 0) return null;

  return (
    <div
      className={`inline-grid gap-0.5 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
      }}
    >
      {Array.from({ length: height }).map((_, y) =>
        Array.from({ length: width }).map((_, x) => {
          const isFilled = normalized.some(([cx, cy]) => cx === x && cy === y);
          return (
            <div
              key={`${x}-${y}`}
              className={`border border-gray-200 ${
                isFilled ? activeColor : 'bg-white'
              }`}
              style={{ width: cellSize, height: cellSize }}
            />
          );
        })
      )}
    </div>
  );
}
