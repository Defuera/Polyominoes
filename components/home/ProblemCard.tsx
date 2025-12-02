'use client';

import Link from 'next/link';
import { Problem } from '@/types/problem';

interface ProblemCardProps {
  problem: Problem;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

const categoryColors: Record<string, string> = {
  geometry: 'bg-blue-100 text-blue-700',
  'number-theory': 'bg-purple-100 text-purple-700',
  combinatorics: 'bg-pink-100 text-pink-700',
  primes: 'bg-indigo-100 text-indigo-700',
  analysis: 'bg-orange-100 text-orange-700',
};

export default function ProblemCard({ problem }: ProblemCardProps) {
  const { metadata, path } = problem;
  const isAvailable = metadata.status === 'available';

  const CardContent = (
    <div
      className={`
        bg-white rounded-xl shadow-lg p-6 h-full flex flex-col
        transition-all duration-300
        ${isAvailable ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' : 'opacity-75 cursor-not-allowed'}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{metadata.icon}</div>
        {metadata.status === 'coming-soon' && (
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
            Coming Soon
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{metadata.title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 flex-grow">{metadata.description}</p>

      {/* Metadata */}
      <div className="space-y-3">
        {/* Difficulty & Age */}
        <div className="flex gap-2 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[metadata.difficulty]}`}>
            {metadata.difficulty.charAt(0).toUpperCase() + metadata.difficulty.slice(1)}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
            Ages {metadata.ageRange}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
            ⏱️ {metadata.estimatedTime}
          </span>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {metadata.categories.map((category) => (
            <span
              key={category}
              className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category] || 'bg-gray-100 text-gray-700'}`}
            >
              {category.replace('-', ' ')}
            </span>
          ))}
        </div>

        {/* Priority Stars */}
        <div className="flex items-center gap-1 text-yellow-500">
          {'⭐'.repeat(metadata.priority)}
        </div>
      </div>
    </div>
  );

  if (isAvailable) {
    return <Link href={path}>{CardContent}</Link>;
  }

  return CardContent;
}
