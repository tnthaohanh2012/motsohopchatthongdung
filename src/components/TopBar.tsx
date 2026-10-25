import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { sounds } from '../utils/soundEffects';
import { CheckCircle2, Volume2, VolumeX, Sparkles, Flame, Atom, Grid, BookOpen } from 'lucide-react';

interface TopBarProps {
  language: 'vi' | 'en';
  onLanguageChange: (lang: 'vi' | 'en') => void;
  activeModule: 'classify' | 'valency' | 'solubility' | 'reactionLab' | 'review';
  onSelectModule: (module: 'classify' | 'valency' | 'solubility' | 'reactionLab' | 'review') => void;
  onOpenQAModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  language,
  onLanguageChange,
  activeModule,
  onSelectModule,
  onOpenQAModal
}) => {
  const t = TRANSLATIONS[language];
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b-2 border-indigo-100/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-18">
          {/* Zone 1: Wordmark with vibrant gradient logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                onSelectModule('classify');
              }}
              className="text-left group cursor-pointer focus:outline-none flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 group-hover:shadow-indigo-500/30 transition-all">
                Sb
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 group-hover:from-blue-600 group-hover:to-pink-600 transition-all whitespace-nowrap">
                  SimBot Chemistry
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                  KHTN 8 · IUPAC
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links with Colorful Active Pills */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-black">
            <button
              onClick={() => {
                sounds.playClick();
                onSelectModule('classify');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeModule === 'classify'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-md shadow-emerald-500/25 scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>{t.navClassify}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onSelectModule('valency');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeModule === 'valency'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-md shadow-indigo-500/25 scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.navValency}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onSelectModule('solubility');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeModule === 'solubility'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black shadow-md shadow-sky-500/25 scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{t.navSolubility}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onSelectModule('reactionLab');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeModule === 'reactionLab'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-black shadow-md shadow-orange-500/30 scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-200" />
              <span>{t.navReactionLab}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onSelectModule('review');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeModule === 'review'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black shadow-md shadow-purple-500/25 scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.navReview}</span>
            </button>
          </nav>

          {/* Zone 3: Audio toggle + Language Switcher + QA Test modal */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* QA Test Runner Trigger */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenQAModal();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-2 border-emerald-300 rounded-2xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs active:scale-95"
              title="Run acceptance test suite T01-T18"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.qaTestsButton}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
              <button
                onClick={() => {
                  sounds.playClick();
                  onLanguageChange('vi');
                }}
                className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  language === 'vi'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  onLanguageChange('en');
                }}
                className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Mobile horizontal navigation bar */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-100 no-scrollbar text-xs">
          <button
            onClick={() => onSelectModule('classify')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 font-black ${
              activeModule === 'classify' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.navClassify}
          </button>
          <button
            onClick={() => onSelectModule('valency')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 font-black ${
              activeModule === 'valency' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.navValency}
          </button>
          <button
            onClick={() => onSelectModule('solubility')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 font-black ${
              activeModule === 'solubility' ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.navSolubility}
          </button>
          <button
            onClick={() => onSelectModule('reactionLab')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 font-black ${
              activeModule === 'reactionLab' ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.navReactionLab}
          </button>
          <button
            onClick={() => onSelectModule('review')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 font-black ${
              activeModule === 'review' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.navReview}
          </button>
        </div>
      </div>
    </header>
  );
};
