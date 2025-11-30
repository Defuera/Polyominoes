'use client';

import { useI18n } from '@/lib/i18n/context';

interface NSelectorProps {
  selectedN: number;
  onSelect: (n: number) => void;
  maxN?: number;
}

export default function NSelector({ selectedN, onSelect, maxN = 6 }: NSelectorProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {Array.from({ length: maxN }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onSelect(n)}
          className={`
            px-5 py-2.5 rounded-lg font-semibold transition-all duration-200
            border-2 ${
              selectedN === n
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
            }
          `}
        >
          <div className="text-sm font-normal opacity-75">
            {(t.polyominoNames as Record<number, string>)[n]}
          </div>
          <div className="text-lg">{n} {n !== 1 ? t.explorer.square_plural : t.explorer.square}</div>
        </button>
      ))}
    </div>
  );
}
