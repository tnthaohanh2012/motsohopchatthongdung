import React, { useState } from 'react';
import { Ion } from '../types/chemistry';
import { IONS } from '../data/chemistryData';
import { TRANSLATIONS } from '../data/translations';
import { calculateFormula, toSubscript } from '../utils/chemistryCalculators';
import { sounds } from '../utils/soundEffects';
import { celebration } from './CelebrationEffects';
import { 
  Check, 
  AlertCircle, 
  Plus, 
  Minus, 
  RotateCcw, 
  Sparkles, 
  Puzzle, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface FormulaBuilderProps {
  language: 'vi' | 'en';
}

interface PracticeChallenge {
  id: string;
  name_vi: string;
  name_en: string;
  cationId: string;
  anionId: string;
  expectedFormula: string;
}

const CHALLENGES: PracticeChallenge[] = [
  { id: 'C01', name_vi: 'Calcium hydroxide (Ca(OH)₂)', name_en: 'Calcium hydroxide', cationId: 'Ca2+', anionId: 'OH-', expectedFormula: 'Ca(OH)₂' },
  { id: 'C02', name_vi: 'Aluminium sulfate (Al₂(SO₄)₃)', name_en: 'Aluminium sulfate', cationId: 'Al3+', anionId: 'SO4_2-', expectedFormula: 'Al₂(SO₄)₃' },
  { id: 'C03', name_vi: 'Calcium phosphate (Ca₃(PO₄)₂)', name_en: 'Calcium phosphate', cationId: 'Ca2+', anionId: 'PO4_3-', expectedFormula: 'Ca₃(PO₄)₂' },
  { id: 'C04', name_vi: 'Sodium sulfate (Na₂SO₄)', name_en: 'Sodium sulfate', cationId: 'Na+', anionId: 'SO4_2-', expectedFormula: 'Na₂SO₄' },
  { id: 'C05', name_vi: 'Iron(III) chloride (FeCl₃)', name_en: 'Iron(III) chloride', cationId: 'Fe3+', anionId: 'Cl-', expectedFormula: 'FeCl₃' },
  { id: 'C06', name_vi: 'Ammonium sulfate ((NH₄)₂SO₄)', name_en: 'Ammonium sulfate', cationId: 'NH4+', anionId: 'SO4_2-', expectedFormula: '(NH₄)₂SO₄' },
  { id: 'C07', name_vi: 'Barium sulfate (BaSO₄)', name_en: 'Barium sulfate', cationId: 'Ba2+', anionId: 'SO4_2-', expectedFormula: 'BaSO₄' },
  { id: 'C08', name_vi: 'Copper(II) hydroxide (Cu(OH)₂)', name_en: 'Copper(II) hydroxide', cationId: 'Cu2+', anionId: 'OH-', expectedFormula: 'Cu(OH)₂' },
  { id: 'C09', name_vi: 'Potassium iodide (KI)', name_en: 'Potassium iodide', cationId: 'K+', anionId: 'I-', expectedFormula: 'KI' },
  { id: 'C10', name_vi: 'Lead(II) nitrate (Pb(NO₃)₂)', name_en: 'Lead(II) nitrate', cationId: 'Pb2+', anionId: 'NO3-', expectedFormula: 'Pb(NO₃)₂' }
];

export const FormulaBuilderModule: React.FC<FormulaBuilderProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const cations = IONS.filter(i => i.type === 'cation');
  const anions = IONS.filter(i => i.type === 'anion');

  const [mode, setMode] = useState<'charge' | 'valency'>('charge');
  const [selectedCationId, setSelectedCationId] = useState<string>('Ca2+');
  const [selectedAnionId, setSelectedAnionId] = useState<string>('OH-');
  const [cationCount, setCationCount] = useState<number>(1);
  const [anionCount, setAnionCount] = useState<number>(2);
  const [activeChallenge, setActiveChallenge] = useState<string | null>('C01');

  const selectedCation = cations.find(c => c.id === selectedCationId) || cations[0];
  const selectedAnion = anions.find(a => a.id === selectedAnionId) || anions[0];

  const buildResult = calculateFormula(
    selectedCation,
    selectedAnion,
    cationCount,
    anionCount
  );

  const handleSelectChallenge = (ch: PracticeChallenge) => {
    sounds.playClick();
    setSelectedCationId(ch.cationId);
    setSelectedAnionId(ch.anionId);
    setCationCount(1);
    setAnionCount(1);
    setActiveChallenge(ch.id);
  };

  const handleAutoNeutralize = () => {
    sounds.playApplause();
    celebration.burst();
    setCationCount(buildResult.recommendedCationCount);
    setAnionCount(buildResult.recommendedAnionCount);
  };

  const changeCationCount = (newCount: number) => {
    sounds.playClick();
    setCationCount(newCount);
    const net = newCount * selectedCation.charge + anionCount * selectedAnion.charge;
    if (net === 0) {
      sounds.playApplause();
      celebration.burst();
    }
  };

  const changeAnionCount = (newCount: number) => {
    sounds.playClick();
    setAnionCount(newCount);
    const net = cationCount * selectedCation.charge + newCount * selectedAnion.charge;
    if (net === 0) {
      sounds.playApplause();
      celebration.burst();
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setCationCount(1);
    setAnionCount(1);
  };

  const cationNeedsParentheses = selectedCation.isPolyatomic && cationCount > 1;
  const anionNeedsParentheses = selectedAnion.isPolyatomic && anionCount > 1;

  // Peg and socket visual calculations
  const totalPositivePegs = cationCount * selectedCation.charge;
  const totalNegativeSockets = anionCount * Math.abs(selectedAnion.charge);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t.builderTitle}
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {t.builderSubtitle}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                sounds.playClick();
                setMode('charge');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                mode === 'charge' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ {t.modeCharge}
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setMode('valency');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                mode === 'valency' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏛️ {t.modeValency}
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>

      {/* Target Challenges Strip */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 border border-blue-200/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-extrabold text-blue-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t.buildTargetPrompt}</span>
          </span>
          <span className="text-[11px] text-blue-700 font-medium">
            {language === 'vi' ? 'Chọn công thức mục tiêu để tập ghép mảnh hóa trị' : 'Select target compound to practice puzzle snapping'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CHALLENGES.map(ch => {
            const isCurrent = activeChallenge === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChallenge(ch)}
                className={`px-3 py-1.5 text-xs rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-600 text-white font-extrabold shadow-sm scale-102'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <span className="font-mono font-black">{ch.expectedFormula}</span>
                <span className="opacity-60">·</span>
                <span className="text-[11px] opacity-90 truncate max-w-[120px]">
                  {language === 'vi' ? ch.name_vi : ch.name_en}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Split Interactive Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Palettes (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Cation Selection Palette */}
          <div className="bg-white border-2 border-blue-200/80 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-blue-100 pb-2">
              <span className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>1. {t.selectCationPrompt}</span>
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Cation (+)
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {cations.map(cat => {
                const isSelected = cat.id === selectedCation.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedCationId(cat.id);
                      setActiveChallenge(null);
                    }}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white font-black shadow-md scale-105'
                        : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-blue-300 hover:bg-white'
                    }`}
                  >
                    <div className="font-mono text-base font-extrabold">{cat.symbol}</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-blue-100' : 'text-blue-600'}`}>
                      {mode === 'charge' ? `+${cat.charge}` : `(${cat.valencyRoman})`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Anion / Acid Radical Selection Palette */}
          <div className="bg-white border-2 border-purple-200/80 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-purple-100 pb-2">
              <span className="text-xs font-black text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>2. {t.selectAnionPrompt}</span>
              </span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Anion (-)
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
              {anions.map(an => {
                const isSelected = an.id === selectedAnion.id;
                return (
                  <button
                    key={an.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedAnionId(an.id);
                      setActiveChallenge(null);
                    }}
                    className={`p-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-600 text-white font-black shadow-md scale-105'
                        : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-purple-300 hover:bg-white'
                    }`}
                  >
                    <div className="font-mono text-sm font-extrabold">{an.symbol}</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-purple-100' : 'text-purple-600'}`}>
                      {mode === 'charge' ? `${an.charge}` : `(${an.valencyRoman})`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Assembly & Puzzle Snap View (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm">
            {/* Live Big Formula Result */}
            <div className="text-center pb-5 border-b border-slate-100">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {t.formulaResult}
              </div>
              <div className="text-5xl font-black font-mono text-slate-900 tracking-tight my-2 drop-shadow-xs">
                {buildResult.formula}
              </div>
              <div className="text-base font-extrabold text-blue-700">
                {language === 'vi' ? buildResult.name_vi : buildResult.name_en}
              </div>
            </div>

            {/* Visual Snap-Together Puzzle Blocks */}
            <div className="my-6 p-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 text-white shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800 pb-2">
                <span className="font-bold flex items-center gap-1.5 text-cyan-400">
                  <Puzzle className="w-4 h-4" />
                  <span>{language === 'vi' ? 'Mô hình ghép mảnh điện tích (Visual Puzzle)' : 'Charge Puzzle Snapping Model'}</span>
                </span>
                <span className="font-mono text-[11px] text-amber-400 font-bold">
                  {totalPositivePegs} chốt dương (+) / {totalNegativeSockets} lỗ cắm (-)
                </span>
              </div>

              {/* Graphical Puzzle Peg Connector Diagram */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-3">
                {/* Cation Puzzle Group */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs font-bold text-blue-300">
                    {cationCount} × {selectedCation.symbol}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center max-w-[200px]">
                    {Array.from({ length: cationCount }).map((_, cIdx) => (
                      <div
                        key={cIdx}
                        className="relative px-3.5 py-3 bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl border border-blue-300 flex items-center justify-between shadow-md"
                      >
                        <span className="font-mono font-black text-white text-base mr-3">
                          {selectedCation.symbol}
                        </span>
                        {/* Visual Protruding Connector Pegs */}
                        <div className="flex flex-col gap-1 -mr-5">
                          {Array.from({ length: selectedCation.charge }).map((_, pIdx) => (
                            <span
                              key={pIdx}
                              className="w-3.5 h-3.5 rounded-full bg-cyan-300 border-2 border-blue-900 shadow-sm flex items-center justify-center text-[9px] font-black text-blue-950"
                              title={`Peg +1`}
                            >
                              +
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xl font-black text-slate-500 mx-2">⚡</div>

                {/* Anion Puzzle Group */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs font-bold text-purple-300">
                    {anionCount} × {selectedAnion.symbol}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center max-w-[200px]">
                    {Array.from({ length: anionCount }).map((_, aIdx) => (
                      <div
                        key={aIdx}
                        className="relative px-3.5 py-3 bg-gradient-to-r from-purple-700 to-fuchsia-600 rounded-xl border border-purple-300 flex items-center justify-between shadow-md"
                      >
                        {/* Matching Socket Notches */}
                        <div className="flex flex-col gap-1 -ml-5 mr-3">
                          {Array.from({ length: Math.abs(selectedAnion.charge) }).map((_, sIdx) => (
                            <span
                              key={sIdx}
                              className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-purple-300 flex items-center justify-center text-[9px] font-black text-fuchsia-300 shadow-inner"
                              title={`Socket -1`}
                            >
                              -
                            </span>
                          ))}
                        </div>
                        <span className="font-mono font-black text-white text-base">
                          {selectedAnion.symbol}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Puzzle Neutrality Status Banner */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                {buildResult.isNeutral ? (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/60 rounded-full text-emerald-300 text-xs font-bold shadow-sm">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'vi' ? 'Khớp hoàn hảo! Mọi chốt cắm đều đã kết nối trung hòa điện tích.' : 'Perfect fit! All puzzle connectors are neutralized.'}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-500/60 rounded-full text-amber-300 text-xs font-bold shadow-sm">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>
                      {totalPositivePegs > totalNegativeSockets
                        ? (language === 'vi' ? `Thừa ${totalPositivePegs - totalNegativeSockets} chốt (+), hãy tăng thêm anion!` : `Excess of ${totalPositivePegs - totalNegativeSockets} (+), add more anions!`)
                        : (language === 'vi' ? `Thừa ${totalNegativeSockets - totalPositivePegs} lỗ (-), hãy tăng thêm cation!` : `Excess of ${totalNegativeSockets - totalPositivePegs} (-), add more cations!`)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Steppers for Quantities */}
            <div className="grid grid-cols-2 gap-4 my-4">
              {/* Cation Count Stepper */}
              <div className="p-4 bg-blue-50/70 border-2 border-blue-200 rounded-2xl flex flex-col items-center">
                <span className="text-xs font-bold text-blue-900 mb-1">
                  Số lượng Cation ({selectedCation.symbol})
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => changeCationCount(Math.max(1, cationCount - 1))}
                    disabled={cationCount <= 1}
                    className="w-9 h-9 rounded-xl bg-white border border-blue-300 flex items-center justify-center text-blue-900 font-bold hover:bg-blue-100 disabled:opacity-40 cursor-pointer shadow-xs"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-2xl font-black text-blue-950 w-8 text-center tabular-nums">
                    {cationCount}
                  </span>
                  <button
                    onClick={() => changeCationCount(Math.min(6, cationCount + 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-blue-300 flex items-center justify-center text-blue-900 font-bold hover:bg-blue-100 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Anion Count Stepper */}
              <div className="p-4 bg-purple-50/70 border-2 border-purple-200 rounded-2xl flex flex-col items-center">
                <span className="text-xs font-bold text-purple-900 mb-1">
                  Số lượng Anion ({selectedAnion.symbol})
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => changeAnionCount(Math.max(1, anionCount - 1))}
                    disabled={anionCount <= 1}
                    className="w-9 h-9 rounded-xl bg-white border border-purple-300 flex items-center justify-center text-purple-900 font-bold hover:bg-purple-100 disabled:opacity-40 cursor-pointer shadow-xs"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-2xl font-black text-purple-950 w-8 text-center tabular-nums">
                    {anionCount}
                  </span>
                  <button
                    onClick={() => changeAnionCount(Math.min(6, anionCount + 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-purple-300 flex items-center justify-center text-purple-900 font-bold hover:bg-purple-100 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Arithmetic Formula Check Banner */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="font-mono font-bold text-slate-800">
                <span className="px-2 py-1 bg-blue-100 text-blue-900 rounded-md">
                  {cationCount} × (+{selectedCation.charge})
                </span>
                <span className="mx-1.5">+</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-900 rounded-md">
                  {anionCount} × ({selectedAnion.charge})
                </span>
                <span className="mx-1.5">=</span>
                <span
                  className={`px-2.5 py-1 rounded-md text-sm ${
                    buildResult.isNeutral
                      ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                      : 'bg-rose-600 text-white font-extrabold shadow-xs'
                  }`}
                >
                  {buildResult.netCharge > 0 ? `+${buildResult.netCharge}` : buildResult.netCharge}
                </span>
              </div>

              {!buildResult.isNeutral && (
                <button
                  onClick={handleAutoNeutralize}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{language === 'vi' ? 'Tự khớp tỉ lệ tối giản' : 'Auto Snap Ratio'}</span>
                </button>
              )}
            </div>

            {/* Parentheses Rule Alert */}
            {(cationNeedsParentheses || anionNeedsParentheses) && (
              <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 flex items-center gap-2">
                <span className="font-black text-indigo-700 text-sm">ⓘ</span>
                <div>
                  <span className="font-extrabold">{language === 'vi' ? 'Lưu ý dấu ngoặc đơn: ' : 'Parentheses Rule: '}</span>
                  {anionNeedsParentheses && (
                    <span>
                      {language === 'vi'
                        ? `Nhóm ${selectedAnion.name_vi} (${selectedAnion.baseGroup}) lặp lại ${anionCount} lần nên phải đặt trong ngoặc: (${selectedAnion.baseGroup})${toSubscript(anionCount)}.`
                        : `Polyatomic group ${selectedAnion.baseGroup} repeats ${anionCount} times: (${selectedAnion.baseGroup})${toSubscript(anionCount)}.`}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
