'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { generateCollatzData, getRandomNumber } from '@/lib/algorithms/collatz';
import { CollatzSequence, FAMOUS_NUMBERS } from '@/types/collatz';
import { useI18n } from '@/lib/i18n/context';

export default function ExploreMode() {
  const { t } = useI18n();
  const [inputValue, setInputValue] = useState('27');
  const [collatzData, setCollatzData] = useState<CollatzSequence | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [error, setError] = useState('');

  const explore = (num: number) => {
    try {
      if (num < 1 || num > 100000) {
        setError('Please enter a number between 1 and 100,000');
        return;
      }
      setError('');
      const data = generateCollatzData(num);
      setCollatzData(data);
      startAnimation(data.sequence.length);
    } catch (err) {
      setError('Invalid number');
    }
  };

  const handleExplore = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      explore(num);
    }
  };

  const handleRandom = () => {
    const num = getRandomNumber(1, 100);
    setInputValue(num.toString());
    explore(num);
  };

  const startAnimation = (totalSteps: number) => {
    setIsAnimating(true);
    setAnimationStep(0);

    const duration = Math.min(3000, totalSteps * 50); // Max 3 seconds
    const stepDuration = duration / totalSteps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimationStep(currentStep);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, stepDuration);
  };

  // Auto-explore on mount
  useEffect(() => {
    explore(27);
  }, []);

  const getChartData = () => {
    if (!collatzData) return [];

    const visibleSequence = isAnimating
      ? collatzData.sequence.slice(0, animationStep + 1)
      : collatzData.sequence;

    return visibleSequence.map((value, index) => ({
      step: index,
      value,
      isEven: value % 2 === 0,
    }));
  };

  const currentValue = collatzData && isAnimating && animationStep < collatzData.sequence.length
    ? collatzData.sequence[animationStep]
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🎢 Number Roller Coaster
        </h2>
        <p className="text-gray-600">
          Pick any number and watch its journey to 1!
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-semibold text-gray-700">Enter a number:</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExplore()}
              className="w-32 px-4 py-3 text-2xl font-bold text-center border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
              min="1"
              max="100000"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExplore}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              🚀 Start Ride!
            </button>
            <button
              onClick={handleRandom}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              🎲 Random
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-center mt-2 text-sm">{error}</p>
        )}

        {/* Famous Numbers */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Try these famous numbers:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {FAMOUS_NUMBERS.map(({ number, reason }) => (
              <button
                key={number}
                onClick={() => {
                  setInputValue(number.toString());
                  explore(number);
                }}
                className="px-3 py-1 bg-white border-2 border-purple-200 rounded-full text-sm font-semibold text-purple-700 hover:bg-purple-100 transition-colors"
                title={reason}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      {collatzData && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">
              {isAnimating ? animationStep : collatzData.stats.steps}
            </div>
            <div className="text-sm text-blue-600">Steps</div>
          </div>

          <div className="bg-purple-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-800">
              {collatzData.stats.maxValue.toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Highest Point</div>
          </div>

          <div className="bg-green-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-800">
              {collatzData.stats.glideRatio.toFixed(1)}x
            </div>
            <div className="text-sm text-green-600">Glide Ratio</div>
          </div>

          <div className="bg-indigo-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-indigo-800">
              {collatzData.stats.evenCount}
            </div>
            <div className="text-sm text-indigo-600">Even Steps</div>
          </div>

          <div className="bg-pink-100 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-800">
              {collatzData.stats.oddCount}
            </div>
            <div className="text-sm text-pink-600">Odd Steps</div>
          </div>
        </div>
      )}

      {/* Current Value (during animation) */}
      {isAnimating && currentValue && (
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 text-center animate-pulse">
          <div className="text-4xl font-bold text-yellow-800 mb-2">
            {currentValue.toLocaleString()}
          </div>
          <div className="text-sm text-yellow-700">
            {currentValue % 2 === 0 ? '÷ 2 (even)' : '× 3 + 1 (odd)'}
          </div>
        </div>
      )}

      {/* Celebration when finished */}
      {!isAnimating && collatzData && animationStep > 0 && (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-400 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-2xl font-bold text-green-800 mb-1">
            Reached 1!
          </div>
          <div className="text-sm text-green-700">
            The journey took {collatzData.stats.steps} steps and reached as high as {collatzData.stats.maxValue.toLocaleString()}!
          </div>
        </div>
      )}

      {/* Chart */}
      {collatzData && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Journey Visualization
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="step"
                label={{ value: 'Step', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border-2 border-gray-300 rounded-lg shadow-lg">
                        <p className="font-bold">Step {data.step}</p>
                        <p className={`${data.isEven ? 'text-blue-600' : 'text-red-600'}`}>
                          Value: {data.value.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {data.isEven ? '(even - divide by 2)' : '(odd - multiply by 3, add 1)'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 4 }}
                animationDuration={isAnimating ? 0 : 1000}
              />
              {/* Highlight the max point */}
              {!isAnimating && (
                <ReferenceDot
                  x={collatzData.sequence.indexOf(collatzData.stats.maxValue)}
                  y={collatzData.stats.maxValue}
                  r={8}
                  fill="red"
                  stroke="white"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* The Rules */}
      <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3">📋 The Rules</h3>
        <div className="space-y-2 text-gray-700">
          <p>• If the number is <span className="font-bold text-blue-600">even</span>: divide by 2</p>
          <p>• If the number is <span className="font-bold text-red-600">odd</span>: multiply by 3 and add 1</p>
          <p>• Repeat until you reach 1</p>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-gray-700">
            🤔 <span className="font-bold">Mystery:</span> Does every number eventually reach 1?
            Nobody knows for sure! This is an unsolved problem in mathematics.
          </p>
        </div>
      </div>
    </div>
  );
}
