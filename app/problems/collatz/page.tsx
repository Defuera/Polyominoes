'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CollatzTabType } from '@/types/collatz';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import CollatzTabs from '@/components/Collatz/CollatzTabs';
import ExploreMode from '@/components/Collatz/ExploreMode';
import RaceMode from '@/components/Collatz/RaceMode';
import CompareMode from '@/components/Collatz/CompareMode';
import LearnContent from '@/components/Collatz/LearnContent';

export default function CollatzPage() {
  const [activeTab, setActiveTab] = useState<CollatzTabType>('explore');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Language Switcher & Back Button */}
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-purple-600 font-semibold"
          >
            ← Back to Problems
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-3 drop-shadow-lg">
            🎢 Collatz Conjecture
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            The simplest unsolved problem in mathematics!
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Pick any number, follow the rules, and watch the magic happen
          </p>
        </header>

        {/* Tabs */}
        <CollatzTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 min-h-[600px]">
          {activeTab === 'explore' && <ExploreMode />}
          {activeTab === 'race' && <RaceMode />}
          {activeTab === 'compare' && <CompareMode />}
          {activeTab === 'learn' && <LearnContent />}
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-gray-600">
          <p className="text-sm">
            Built with ❤️ for exploring mathematics | Nobody knows why this works!
          </p>
        </footer>
      </div>
    </div>
  );
}
