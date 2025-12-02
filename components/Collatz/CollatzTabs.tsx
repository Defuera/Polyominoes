'use client';

import { CollatzTabType } from '@/types/collatz';

interface CollatzTabsProps {
  activeTab: CollatzTabType;
  onTabChange: (tab: CollatzTabType) => void;
}

export default function CollatzTabs({ activeTab, onTabChange }: CollatzTabsProps) {
  const tabs: { id: CollatzTabType; label: string; icon: string }[] = [
    { id: 'explore', label: 'Explore', icon: '🚀' },
    { id: 'race', label: 'Race', icon: '🏁' },
    { id: 'compare', label: 'Compare', icon: '🔍' },
    { id: 'learn', label: 'Learn', icon: '📚' },
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
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}
