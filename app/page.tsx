'use client';

import { I18nProvider, useI18n } from '@/lib/i18n/context';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import ProblemCard from '@/components/home/ProblemCard';
import { PROBLEMS } from '@/lib/data/problems';

function HomeContent() {
  const { t } = useI18n();
  const availableProblems = PROBLEMS.filter((p) => p.metadata.status === 'available');
  const comingSoonProblems = PROBLEMS.filter((p) => p.metadata.status === 'coming-soon');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-600 mb-3 drop-shadow-lg">
            🔢 Interactive Math Explorer
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover the fascinating world of mathematics through interactive visualizations, games, and explorations!
          </p>
        </header>

        {/* Available Problems */}
        {availableProblems.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProblems.map((problem) => (
                <ProblemCard key={problem.metadata.id} problem={problem} />
              ))}
            </div>
          </section>
        )}

        {/* Coming Soon */}
        {comingSoonProblems.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonProblems.map((problem) => (
                <ProblemCard key={problem.metadata.id} problem={problem} />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-600">
          <p className="text-sm">{t.footer}</p>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}
