'use client';

import { TabType } from '@/types/polyomino';
import { useI18n } from '@/lib/i18n/context';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  const { t } = useI18n();

  const tabs: { id: TabType; label: string }[] = [
    { id: 'explorer', label: t.tabs.explorer },
    { id: 'chart', label: t.tabs.chart },
    { id: 'game', label: t.tabs.game },
    { id: 'learn', label: t.tabs.learn },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-200
            shadow-md hover:shadow-lg hover:-translate-y-0.5
            ${
              activeTab === tab.id
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <div className="text-base">{tab.label}</div>
        </button>
      ))}
    </div>
  );
}
