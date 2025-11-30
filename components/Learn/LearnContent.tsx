'use client';

import { useI18n } from '@/lib/i18n/context';

export default function LearnContent() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto prose prose-lg">
      <h2 className="text-3xl font-bold text-purple-600">{t.learn.title1}</h2>
      <p>{t.learn.intro}</p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded my-6">
        <p className="font-semibold text-yellow-800 mb-2">Fun Fact:</p>
        <p className="text-yellow-900 m-0">{t.learn.funFactTetris}</p>
      </div>

      <h3 className="text-2xl font-bold text-purple-500 mt-8">{t.learn.namesTitle}</h3>
      <ul>
        <li>{t.learn.monomino}</li>
        <li>{t.learn.domino}</li>
        <li>{t.learn.tromino}</li>
        <li>{t.learn.tetromino}</li>
        <li>{t.learn.pentomino}</li>
        <li>{t.learn.hexomino}</li>
      </ul>

      <h2 className="text-3xl font-bold text-purple-600 mt-10">{t.learn.historyTitle}</h2>
      <p>{t.learn.historyP1}</p>
      <p>{t.learn.historyP2}</p>

      <h2 className="text-3xl font-bold text-purple-600 mt-10">{t.learn.mathTitle}</h2>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.combinatorics}</h3>
      <p>{t.learn.combinatoricsText}</p>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.symmetry}</h3>
      <p>{t.learn.symmetryText}</p>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.tessellation}</h3>
      <p>{t.learn.tessellationText}</p>

      <h2 className="text-3xl font-bold text-purple-600 mt-10">{t.learn.applicationsTitle}</h2>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.videoGames}</h3>
      <p>{t.learn.videoGamesText}</p>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.packing}</h3>
      <p>{t.learn.packingText}</p>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.chemistry}</h3>
      <p>{t.learn.chemistryText}</p>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.art}</h3>
      <p>{t.learn.artText}</p>

      <h3 className="text-2xl font-bold text-purple-500">{t.learn.computerScience}</h3>
      <p>{t.learn.computerScienceText}</p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded my-6">
        <p className="font-semibold text-yellow-800 mb-2">{t.learn.challengeTitle}</p>
        <p className="text-yellow-900 m-0">{t.learn.challengeText}</p>
      </div>

      <h2 className="text-3xl font-bold text-purple-600 mt-10">{t.learn.tryTitle}</h2>
      <p>{t.learn.tryText}</p>

      <p className="text-xl text-center font-semibold text-purple-600 mt-8">
        {t.learn.happyExploring}
      </p>
    </div>
  );
}
