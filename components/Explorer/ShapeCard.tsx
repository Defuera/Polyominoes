'use client';

import { useState } from 'react';
import Polyomino from '@/components/shared/Polyomino';
import { Polyomino as PolyominoType } from '@/types/polyomino';

interface ShapeCardProps {
  shape: PolyominoType;
  index: number;
}

export default function ShapeCard({ shape, index }: ShapeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        p-4 rounded-lg transition-all duration-300
        cursor-pointer
        ${isHovered ? 'bg-purple-600 scale-105 shadow-xl' : 'bg-gray-50 shadow-md'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white p-3 rounded-md">
        <Polyomino
          coords={shape}
          cellSize={24}
          activeColor={isHovered ? 'bg-green-500' : 'bg-purple-600'}
        />
      </div>
      <div
        className={`mt-2 text-xs font-medium ${
          isHovered ? 'text-white' : 'text-gray-500'
        }`}
      >
        #{index + 1}
      </div>
    </div>
  );
}
