import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { ClassifyModule } from './components/ClassifyModule';
import { FormulaBuilderModule } from './components/FormulaBuilderModule';
import { SolubilityModule } from './components/SolubilityModule';
import { ReactionLabModule } from './components/ReactionLabModule';
import { ReviewModule } from './components/ReviewModule';
import { QATestRunnerModal } from './components/QATestRunnerModal';
import { CelebrationCanvas } from './components/CelebrationEffects';
import { TRANSLATIONS } from './data/translations';
import { BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [activeModule, setActiveModule] = useState<'classify' | 'valency' | 'solubility' | 'reactionLab' | 'review'>('classify');
  const [isQAModalOpen, setIsQAModalOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900 relative">
      {/* Global Fireworks & Confetti celebration canvas */}
      <CelebrationCanvas />

      {/* Universal Top Navigation conforming to Top Bar Contract */}
      <TopBar
        language={language}
        onLanguageChange={setLanguage}
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        onOpenQAModal={() => setIsQAModalOpen(true)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeModule === 'classify' && <ClassifyModule language={language} />}
        {activeModule === 'valency' && <FormulaBuilderModule language={language} />}
        {activeModule === 'solubility' && <SolubilityModule language={language} />}
        {activeModule === 'reactionLab' && <ReactionLabModule language={language} />}
        {activeModule === 'review' && <ReviewModule language={language} />}
      </main>

      {/* Footer conforming to anti-slop guidelines */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-800">SimBot Chemistry</span>
            <span aria-hidden="true">·</span>
            <span>KHTN 8 (Kết nối tri thức với cuộc sống, Bài 8–11)</span>
            <span aria-hidden="true">·</span>
            <span>{t.offlineReady}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsQAModalOpen(true)}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
            >
              {t.qaTestsButton}
            </button>
            <span aria-hidden="true">·</span>
            <span>Grade 8 Virtual Chemistry Workbench</span>
          </div>
        </div>
      </footer>

      {/* Acceptance Test Runner Modal (T01 - T18) */}
      <QATestRunnerModal
        isOpen={isQAModalOpen}
        onClose={() => setIsQAModalOpen(false)}
        language={language}
      />
    </div>
  );
}
