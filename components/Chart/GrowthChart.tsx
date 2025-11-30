'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { POLYOMINO_COUNTS } from '@/lib/data/polyominoes';
import { useI18n } from '@/lib/i18n/context';

export default function GrowthChart() {
  const { t } = useI18n();
  const [showLog, setShowLog] = useState(true);
  const [maxN, setMaxN] = useState(20);

  const data = Array.from({ length: Math.min(maxN, 28) }, (_, i) => {
    const n = i + 1;
    const count = POLYOMINO_COUNTS[n];
    return {
      n,
      count,
      logCount: Math.log10(count),
      name: t.polyominoNames[n] || `${n}-omino`,
    };
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-3">
          {t.chart.title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.chart.subtitle}
        </p>
      </div>

      <div className="flex justify-center gap-8 flex-wrap items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">{t.chart.linear}</span>
          <button
            onClick={() => setShowLog(!showLog)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
              showLog ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                showLog ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm font-semibold text-gray-700">{t.chart.log}</span>
        </div>

        <div className="flex flex-col gap-2 min-w-[200px]">
          <label className="text-sm font-semibold text-gray-700 text-center">
            {t.chart.showUpTo}{maxN}
          </label>
          <input
            type="range"
            min="10"
            max="28"
            step="1"
            value={maxN}
            onChange={(e) => setMaxN(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>28</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 60, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="n"
              label={{ value: t.chart.xAxis, position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey={showLog ? 'logCount' : 'count'}
              label={{
                value: showLog ? t.chart.yAxisLog : t.chart.yAxisLinear,
                angle: -90,
                position: 'insideLeft',
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border-2 border-purple-600 rounded-lg shadow-lg">
                      <p className="font-semibold text-purple-600">{d.name}</p>
                      <p className="text-sm text-gray-600">
                        N = {d.n} {d.n !== 1 ? t.chart.squares : t.chart.square}
                      </p>
                      <p className="text-lg font-bold mt-1">
                        {d.count.toLocaleString()} {d.count !== 1 ? t.chart.shapes : t.chart.shape}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey={showLog ? 'logCount' : 'count'}
              stroke="#9333ea"
              strokeWidth={3}
              dot={{ fill: '#9333ea', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{t.chart.mysteryTitle}</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>{t.chart.noFormula}</strong> {t.chart.noFormulaAnswer}
          </p>
          <p>
            {t.chart.exactValues}
          </p>
          <p>
            {t.chart.formulaIntro}
          </p>
          <div className="bg-white p-3 rounded-lg border-2 border-purple-200 text-center font-mono text-lg my-2">
            P(n) ≈ λⁿ / n, where λ ≈ 4.0626
          </div>
          <p className="text-sm">
            {t.chart.formulaNote}
          </p>
          <p className="mt-4 text-purple-700 font-semibold">
            {t.chart.hugeNumbers}
          </p>
        </div>
      </div>
    </div>
  );
}
