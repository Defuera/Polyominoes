'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateCollatzData, getRandomNumber, findLongestInRange } from '@/lib/algorithms/collatz';
import { CollatzSequence } from '@/types/collatz';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function CompareMode() {
  const [sequences, setSequences] = useState<CollatzSequence[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addSequence = (num: number) => {
    if (sequences.length >= 8) {
      alert('Maximum 8 sequences!');
      return;
    }

    if (sequences.some((s) => s.startNumber === num)) {
      alert('This number is already added!');
      return;
    }

    try {
      const data = generateCollatzData(num);
      setSequences([...sequences, data]);
    } catch (err) {
      alert('Invalid number');
    }
  };

  const handleAdd = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num >= 1 && num <= 10000) {
      addSequence(num);
      setInputValue('');
    }
  };

  const clearAll = () => {
    setSequences([]);
  };

  const addRandomSet = () => {
    setSequences([]);
    const count = 6;
    for (let i = 0; i < count; i++) {
      const num = getRandomNumber(1, 100);
      addSequence(num);
    }
  };

  const addTopRecords = () => {
    setSequences([]);
    const records = findLongestInRange(1, 100, 6);
    setSequences(records);
  };

  // Prepare chart data
  const getChartData = () => {
    if (sequences.length === 0) return [];

    const maxLength = Math.max(...sequences.map((s) => s.sequence.length));
    const data: any[] = [];

    for (let step = 0; step < maxLength; step++) {
      const dataPoint: any = { step };
      sequences.forEach((seq) => {
        dataPoint[`n${seq.startNumber}`] = step < seq.sequence.length ? seq.sequence[step] : null;
      });
      data.push(dataPoint);
    }

    return data;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🔍 Compare Sequences
        </h2>
        <p className="text-gray-600">
          Overlay multiple sequences to discover patterns
        </p>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md space-y-4">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Enter number"
            className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 w-40"
            min="1"
            max="10000"
          />

          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            ➕ Add
          </button>

          <button
            onClick={addRandomSet}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            🎲 Random 6
          </button>

          <button
            onClick={addTopRecords}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            🏆 Top Records
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      {/* Legend */}
      {sequences.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-bold text-gray-800 mb-3">Sequences:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sequences.map((seq, index) => (
              <div
                key={seq.startNumber}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="text-sm">
                  <div className="font-bold">
                    Number {seq.startNumber}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {seq.stats.steps} steps • max: {seq.stats.maxValue.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setSequences(sequences.filter((s) => s.startNumber !== seq.startNumber))}
                  className="ml-auto text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
      {sequences.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-2">No sequences to compare yet</p>
          <p className="text-gray-400 text-sm">
            Add some numbers or try the preset options above!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="step"
                label={{ value: 'Step', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
                scale="log"
                domain={['auto', 'auto']}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 0) {
                    return (
                      <div className="bg-white p-3 border-2 border-gray-300 rounded-lg shadow-lg max-w-xs">
                        <p className="font-bold mb-2">Step {label}</p>
                        {payload
                          .filter((p) => p.value !== null)
                          .map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {(entry.value as number).toLocaleString()}
                            </p>
                          ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              {sequences.map((seq, index) => (
                <Line
                  key={seq.startNumber}
                  type="monotone"
                  dataKey={`n${seq.startNumber}`}
                  name={`${seq.startNumber}`}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Stats Comparison */}
      {sequences.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Statistics</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Number</th>
                  <th className="px-4 py-2 text-right">Steps</th>
                  <th className="px-4 py-2 text-right">Max Value</th>
                  <th className="px-4 py-2 text-right">Glide Ratio</th>
                  <th className="px-4 py-2 text-right">Even/Odd</th>
                </tr>
              </thead>
              <tbody>
                {sequences
                  .sort((a, b) => b.stats.steps - a.stats.steps)
                  .map((seq, index) => (
                    <tr key={seq.startNumber} className="border-t">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[sequences.indexOf(seq) % COLORS.length] }}
                          />
                          <span className="font-semibold">{seq.startNumber}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right font-semibold">
                        {seq.stats.steps}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {seq.stats.maxValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {seq.stats.glideRatio.toFixed(1)}x
                      </td>
                      <td className="px-4 py-2 text-right text-sm">
                        {seq.stats.evenCount} / {seq.stats.oddCount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-800">
          <span className="font-bold">💡 Pattern Hunting:</span> Try comparing neighbors like 26 and 27,
          or powers of 2 like 16, 32, 64. Notice how small changes can lead to huge differences!
        </p>
      </div>
    </div>
  );
}
