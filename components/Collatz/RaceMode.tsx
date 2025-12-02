'use client';

import { useState, useEffect, useRef } from 'react';
import { generateCollatzData, getRandomNumber } from '@/lib/algorithms/collatz';
import { CollatzRacer } from '@/types/collatz';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function RaceMode() {
  const [racers, setRacers] = useState<CollatzRacer[]>([]);
  const [isRacing, setIsRacing] = useState(false);
  const [raceSpeed, setRaceSpeed] = useState(50);
  const raceInterval = useRef<NodeJS.Timeout | null>(null);

  const addRacer = (num: number) => {
    if (racers.length >= 6) {
      alert('Maximum 6 racers!');
      return;
    }

    if (racers.some((r) => r.startNumber === num)) {
      alert('This number is already racing!');
      return;
    }

    const sequence = generateCollatzData(num).sequence;
    const newRacer: CollatzRacer = {
      id: `racer-${Date.now()}`,
      startNumber: num,
      currentStep: 0,
      currentValue: num,
      sequence,
      finished: false,
    };

    setRacers([...racers, newRacer]);
  };

  const startRace = () => {
    if (racers.length < 2) {
      alert('Add at least 2 racers!');
      return;
    }

    // Reset all racers
    setRacers(
      racers.map((racer) => ({
        ...racer,
        currentStep: 0,
        currentValue: racer.startNumber,
        finished: false,
        finishTime: undefined,
      }))
    );

    setIsRacing(true);
  };

  const stopRace = () => {
    setIsRacing(false);
    if (raceInterval.current) {
      clearInterval(raceInterval.current);
      raceInterval.current = null;
    }
  };

  const resetRace = () => {
    stopRace();
    setRacers([]);
  };

  const addRandomRacers = () => {
    const count = 5;
    const numbers = new Set<number>();

    while (numbers.size < count) {
      numbers.add(getRandomNumber(1, 100));
    }

    setRacers([]);
    numbers.forEach((num) => {
      const sequence = generateCollatzData(num).sequence;
      const racer: CollatzRacer = {
        id: `racer-${num}`,
        startNumber: num,
        currentStep: 0,
        currentValue: num,
        sequence,
        finished: false,
      };
      setRacers((prev) => [...prev, racer]);
    });
  };

  useEffect(() => {
    if (isRacing) {
      raceInterval.current = setInterval(() => {
        setRacers((currentRacers) => {
          const updated = currentRacers.map((racer) => {
            if (racer.finished) return racer;

            const nextStep = racer.currentStep + 1;

            if (nextStep >= racer.sequence.length) {
              return {
                ...racer,
                finished: true,
                finishTime: Date.now(),
              };
            }

            return {
              ...racer,
              currentStep: nextStep,
              currentValue: racer.sequence[nextStep],
            };
          });

          // Check if all finished
          if (updated.every((r) => r.finished)) {
            setIsRacing(false);
          }

          return updated;
        });
      }, raceSpeed);
    }

    return () => {
      if (raceInterval.current) {
        clearInterval(raceInterval.current);
      }
    };
  }, [isRacing, raceSpeed]);

  const getProgress = (racer: CollatzRacer) => {
    return (racer.currentStep / (racer.sequence.length - 1)) * 100;
  };

  const sortedRacers = [...racers].sort((a, b) => {
    if (a.finished && !b.finished) return -1;
    if (!a.finished && b.finished) return 1;
    if (a.finished && b.finished) {
      return (a.finishTime || 0) - (b.finishTime || 0);
    }
    return b.currentStep - a.currentStep;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🏁 Race to 1!</h2>
        <p className="text-gray-600">Watch different numbers race to reach 1</p>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-md space-y-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              const num = prompt('Enter a number (1-1000):');
              if (num) {
                const n = parseInt(num, 10);
                if (!isNaN(n) && n >= 1 && n <= 1000) {
                  addRacer(n);
                }
              }
            }}
            disabled={isRacing}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            ➕ Add Racer
          </button>

          <button
            onClick={addRandomRacers}
            disabled={isRacing}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            🎲 Random 5
          </button>

          <button
            onClick={startRace}
            disabled={isRacing || racers.length < 2}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            🚀 Start Race!
          </button>

          <button
            onClick={stopRace}
            disabled={!isRacing}
            className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            ⏸️ Pause
          </button>

          <button
            onClick={resetRace}
            disabled={isRacing}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            🔄 Reset
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-4 justify-center">
          <label className="text-sm font-semibold text-gray-700">Race Speed:</label>
          <input
            type="range"
            min="10"
            max="200"
            value={raceSpeed}
            onChange={(e) => setRaceSpeed(parseInt(e.target.value))}
            disabled={isRacing}
            className="w-48"
          />
          <span className="text-sm text-gray-600">{raceSpeed}ms</span>
        </div>
      </div>

      {/* Race Track */}
      {racers.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">Add some racers to start!</p>
          <p className="text-gray-400 text-sm mt-2">
            Try famous numbers like 27, 97, or 6
          </p>
        </div>
      )}

      {racers.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
          {sortedRacers.map((racer, index) => {
            const progress = getProgress(racer);
            const color = COLORS[index % COLORS.length];

            return (
              <div key={racer.id} className="space-y-2">
                {/* Racer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: color }}
                    >
                      {racer.startNumber}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        Number {racer.startNumber}
                      </div>
                      <div className="text-sm text-gray-600">
                        {racer.finished ? (
                          <span className="text-green-600 font-semibold">
                            ✓ Finished! ({racer.sequence.length - 1} steps)
                          </span>
                        ) : (
                          <span>
                            Step {racer.currentStep} / {racer.sequence.length - 1}
                            {' • '} Current: {racer.currentValue.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {racer.finished && index === 0 && (
                    <div className="text-2xl">🏆</div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full transition-all duration-100 flex items-center justify-end pr-2"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: color,
                    }}
                  >
                    <div className="text-white font-bold text-sm">
                      {racer.finished ? '🏁' : '🏃'}
                    </div>
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-600">
                    {progress.toFixed(0)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Results */}
      {racers.length > 0 && racers.every((r) => r.finished) && (
        <div className="bg-gradient-to-r from-yellow-100 to-green-100 border-2 border-green-400 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-center mb-4">🏆 Race Results!</h3>
          <div className="space-y-2">
            {sortedRacers.map((racer, index) => (
              <div
                key={racer.id}
                className="flex items-center justify-between bg-white rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </div>
                  <div>
                    <div className="font-bold">Number {racer.startNumber}</div>
                    <div className="text-sm text-gray-600">
                      {racer.sequence.length - 1} steps to reach 1
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Max: {Math.max(...racer.sequence).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-bold">💡 Tip:</span> Smaller numbers usually reach 1 faster, but not always!
          Try 27 (111 steps) vs 26 (10 steps) - they're neighbors with very different journeys!
        </p>
      </div>
    </div>
  );
}
