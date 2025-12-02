'use client';

import { useState } from 'react';
import { TabType } from '@/types/polyomino';
import { useI18n } from '@/lib/i18n/context';
import Tabs from '@/components/shared/Tabs';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Explorer from '@/components/Explorer/Explorer';
import GrowthChart from '@/components/Chart/GrowthChart';
import GameMode from '@/components/Game/GameMode';
import LearnContent from '@/components/Learn/LearnContent';
import Link from 'next/link';

export default function PolyominoesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('explorer');
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
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
          <h1 className="text-5xl md:text-6xl font-bold text-purple-600 mb-3 drop-shadow-lg">
            🧩 {t.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </header>

        {/* Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 min-h-[600px]">
          {activeTab === 'explorer' && <Explorer />}
          {activeTab === 'chart' && <GrowthChart />}
          {activeTab === 'game' && <GameMode />}
          {activeTab === 'learn' && <LearnContent />}
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-gray-600">
          <p className="text-sm">{t.footer}</p>
        </footer>
      </div>
    </div>
  );
}
