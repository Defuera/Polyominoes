'use client';

import { useState } from 'react';
import { POLYOMINO_DATA } from '@/lib/data/polyominoes';
import { useI18n } from '@/lib/i18n/context';
import NSelector from './NSelector';
import ShapeCard from './ShapeCard';

export default function Explorer() {
  const { t } = useI18n();
  const [selectedN, setSelectedN] = useState(5);
  const shapes = POLYOMINO_DATA[selectedN] || [];

  return (
    <div className="space-y-6">
      <NSelector selectedN={selectedN} onSelect={setSelectedN} maxN={6} />

      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-2">
          {(t.polyominoNames as Record<number, string>)[selectedN]}
        </h2>
        <p className="text-lg text-gray-600">
          {shapes.length} {shapes.length !== 1 ? t.explorer.title_plural : t.explorer.title} {t.explorer.with} {selectedN} {selectedN !== 1 ? t.explorer.square_plural : t.explorer.square}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shapes.map((shape, index) => (
          <ShapeCard key={index} shape={shape} index={index} />
        ))}
      </div>

      {shapes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No shapes available for {selectedN} squares yet.</p>
          <p className="text-sm mt-2">Try selecting a different number!</p>
        </div>
      )}
    </div>
  );
}
