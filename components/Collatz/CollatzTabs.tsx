'use client';

import { CollatzTabType } from '@/types/collatz';
import { useI18n } from '@/lib/i18n/context';

interface CollatzTabsProps {
  activeTab: CollatzTabType;
  onTabChange: (tab: CollatzTabType) => void;
}

export default function CollatzTabs({ activeTab, onTabChange }: CollatzTabsProps) {
  const { t } = useI18n();

  const tabs: { id: CollatzTabType; label: string }[] = [
    { id: 'explore', label: t.collatz.tabs.explore },
    { id: 'race', label: t.collatz.tabs.race },
    { id: 'compare', label: t.collatz.tabs.compare },
    { id: 'learn', label: t.collatz.tabs.learn },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-200
            ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
