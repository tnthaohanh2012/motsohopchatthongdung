import React, { useState } from 'react';
import { Substance, SubstanceClass } from '../types/chemistry';
import { SUBSTANCES, MISCONCEPTIONS } from '../data/chemistryData';
import { TRANSLATIONS } from '../data/translations';
import { sounds } from '../utils/soundEffects';
import { celebration } from './CelebrationEffects';
import { 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Info, 
  Flame, 
  Droplets, 
  Sparkles, 
  Atom, 
  ArrowRight,
  TestTube2
} from 'lucide-react';

interface ClassifyModuleProps {
  language: 'vi' | 'en';
}

export const ClassifyModule: React.FC<ClassifyModuleProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const items = SUBSTANCES.filter(s => ['acid', 'base', 'oxide', 'salt'].includes(s.class));

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedSubstanceId, setSelectedSubstanceId] = useState<string>(items[0]?.id || '');
  const [userAssignments, setUserAssignments] = useState<Record<string, SubstanceClass>>({});
  const [feedback, setFeedback] = useState<{
    substanceId: string;
    isCorrect: boolean;
    misconceptionId?: string;
  } | null>(null);
  const [showFormula, setShowFormula] = useState<boolean>(true);
  const [showWhyModal, setShowWhyModal] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [litmusDipped, setLitmusDipped] = useState<boolean>(false);

  const currentSubstance = items.find(s => s.id === selectedSubstanceId) || items[0];

  const handleClassify = (targetClass: SubstanceClass) => {
    if (!currentSubstance) return;

    const isCorrect = currentSubstance.class === targetClass;
    setUserAssignments(prev => ({
      ...prev,
      [currentSubstance.id]: targetClass
    }));

    if (isCorrect) {
      sounds.playApplause();
      celebration.burst();
      if (!userAssignments[currentSubstance.id]) {
        setScore(prev => prev + 1);
      }
    } else {
      sounds.playClick();
    }

    let misconceptionId: string | undefined = undefined;
    if (!isCorrect) {
      if (currentSubstance.class === 'oxide' && targetClass === 'salt') {
        misconceptionId = 'M01';
      } else if (currentSubstance.class === 'base' && targetClass === 'acid') {
        misconceptionId = 'M02';
      } else if (currentSubstance.class === 'acid' && targetClass === 'base') {
        misconceptionId = 'M02';
      } else if (currentSubstance.class === 'oxide') {
        misconceptionId = 'M09';
      }
    }

    setFeedback({
      substanceId: currentSubstance.id,
      isCorrect,
      misconceptionId
    });
  };

  const handleNext = () => {
    sounds.playClick();
    const nextIdx = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIdx);
    setSelectedSubstanceId(items[nextIdx].id);
    setFeedback(null);
    setLitmusDipped(false);
  };

  const handleReset = () => {
    sounds.playClick();
    setUserAssignments({});
    setFeedback(null);
    setCurrentIndex(0);
    setSelectedSubstanceId(items[0]?.id || '');
    setScore(0);
    setLitmusDipped(false);
  };

  // Litmus test color determination
  const getLitmusColor = (sub: Substance) => {
    if (sub.class === 'acid') return 'bg-rose-500 text-white shadow-rose-200';
    if (sub.class === 'base' && sub.state_default === 'aq') return 'bg-blue-600 text-white shadow-blue-200';
    if (sub.class === 'salt') return 'bg-purple-400 text-white shadow-purple-200'; // neutral purple litmus
    return 'bg-purple-300 text-slate-900';
  };

  const activeMisconception = feedback?.misconceptionId
    ? MISCONCEPTIONS.find(m => m.id === feedback.misconceptionId)
    : null;

  const categories: {
    id: SubstanceClass;
    label: string;
    subLabel: string;
    desc: string;
    gradient: string;
    border: string;
    badgeBg: string;
    textColor: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'acid',
      label: t.classAcid,
      subLabel: 'H⁺ + Gốc axit',
      desc: t.classAcidDesc,
      gradient: 'from-rose-500/10 via-red-500/5 to-transparent',
      border: 'border-rose-300 hover:border-rose-500',
      badgeBg: 'bg-rose-600 text-white',
      textColor: 'text-rose-900',
      icon: <Flame className="w-5 h-5 text-rose-600" />
    },
    {
      id: 'base',
      label: t.classBase,
      subLabel: 'Kim loại + OH⁻',
      desc: t.classBaseDesc,
      gradient: 'from-blue-500/10 via-sky-500/5 to-transparent',
      border: 'border-blue-300 hover:border-blue-500',
      badgeBg: 'bg-blue-600 text-white',
      textColor: 'text-blue-900',
      icon: <Droplets className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'oxide',
      label: t.classOxide,
      subLabel: 'Nguyên tố + Oxi',
      desc: t.classOxideDesc,
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      border: 'border-amber-300 hover:border-amber-500',
      badgeBg: 'bg-amber-600 text-white',
      textColor: 'text-amber-900',
      icon: <Atom className="w-5 h-5 text-amber-600" />
    },
    {
      id: 'salt',
      label: t.classSalt,
      subLabel: 'Kim loại + Gốc axit',
      desc: t.classSaltDesc,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      border: 'border-emerald-300 hover:border-emerald-500',
      badgeBg: 'bg-emerald-600 text-white',
      textColor: 'text-emerald-900',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />
    }
  ];

  const assignedInClass = (c: SubstanceClass) => {
    return items.filter(item => userAssignments[item.id] === c);
  };

  return (
    <div className="space-y-6">
      {/* Module Header with Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {language === 'vi' ? 'Bàn thí nghiệm phân loại: Acid, Base, Oxide, Muối' : 'Classification Lab: Acid, Base, Oxide, Salt'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {t.dragOrClickInstruction}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs">
            <span className="text-slate-500">{language === 'vi' ? 'Đã xếp:' : 'Sorted:'}</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {Object.keys(userAssignments).length} / {items.length}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-emerald-600 font-semibold">{language === 'vi' ? 'Điểm:' : 'Score:'}</span>
            <span className="font-mono font-bold text-emerald-700 tabular-nums">{score}</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setShowFormula(prev => !prev);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            {showFormula ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-blue-600" />}
            <span>{showFormula ? t.hideFormula : t.revealFormula}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            title={t.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Specimen Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            {/* Top Specimen Card Badges */}
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                Chất #{currentIndex + 1}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {currentSubstance.grade_scope === 'core' ? t.coreScope : t.extensionScope}
              </span>
            </div>

            {/* Specimen Visual Stage */}
            <div className="relative rounded-xl p-5 bg-gradient-to-b from-slate-50 to-slate-100/80 border border-slate-200/80 text-center my-2 shadow-inner">
              {/* Formula & Name */}
              {showFormula ? (
                <div className="text-4xl font-black text-slate-900 tracking-tight font-mono drop-shadow-xs">
                  {currentSubstance.formula}
                </div>
              ) : (
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest py-3">
                  {language === 'vi' ? '★ ĐOÁN THEO TÊN GỌI ★' : '★ IDENTIFY BY NAME ★'}
                </div>
              )}

              <div className="text-base font-bold text-slate-800 mt-2">
                {language === 'vi' ? currentSubstance.name_vi : currentSubstance.name_en}
              </div>

              {/* State & Appearance Pill */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">
                  {currentSubstance.state_default === 'aq' && 'Dung dịch (aq)'}
                  {currentSubstance.state_default === 's' && 'Chất rắn (s)'}
                  {currentSubstance.state_default === 'g' && 'Chất khí (g)'}
                  {currentSubstance.state_default === 'l' && 'Chất lỏng (l)'}
                </span>
                <span className="text-xs text-slate-500 font-medium truncate max-w-[180px]">
                  {language === 'vi' ? currentSubstance.color_vi : currentSubstance.color_en}
                </span>
              </div>

              {/* Interactive Litmus Paper Test Probe */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    sounds.playPour();
                    setLitmusDipped(true);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                >
                  <TestTube2 className="w-3.5 h-3.5" />
                  <span>{language === 'vi' ? 'Nhúng giấy quỳ tím' : 'Dip Litmus Paper'}</span>
                </button>

                {litmusDipped ? (
                  <div className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 shadow-xs ${getLitmusColor(currentSubstance)}`}>
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    <span>
                      {currentSubstance.class === 'acid' && (language === 'vi' ? 'Hóa đỏ (Axit)' : 'Turns Red (Acid)')}
                      {currentSubstance.class === 'base' && currentSubstance.state_default === 'aq' && (language === 'vi' ? 'Hóa xanh (Kiềm)' : 'Turns Blue (Base)')}
                      {currentSubstance.class === 'salt' && (language === 'vi' ? 'Giữ màu tím (Muối)' : 'Neutral Purple (Salt)')}
                      {currentSubstance.class === 'oxide' && (language === 'vi' ? 'Không đổi màu quỳ khô' : 'No change (Dry oxide)')}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">
                    {language === 'vi' ? 'Quỳ tím chưa nhúng' : 'Litmus ready'}
                  </span>
                )}
              </div>
            </div>

            {/* Classification Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleClassify(cat.id)}
                  className={`p-3 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 cursor-pointer bg-white hover:shadow-md active:scale-95 ${cat.border}`}
                >
                  <div className="flex items-center gap-1.5">
                    {cat.icon}
                    <span className="text-slate-900 text-sm font-extrabold">{cat.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {cat.subLabel}
                  </span>
                </button>
              ))}
            </div>

            {/* Feedback Announcement */}
            {feedback && (
              <div
                className={`mt-4 p-4 rounded-xl border-2 text-xs transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50/90 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {feedback.isCorrect ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-extrabold text-sm">
                      {feedback.isCorrect
                        ? (language === 'vi' ? 'Chính xác xuất sắc!' : 'Spot on! Correct!')
                        : (language === 'vi' ? 'Chưa đúng, hãy xem phân tích:' : 'Not quite right. See analysis:')}
                    </div>
                    <p className="mt-1 leading-relaxed font-medium">
                      {language === 'vi' ? currentSubstance.why_vi : currentSubstance.why_en}
                    </p>

                    {activeMisconception && (
                      <div className="mt-2.5 pt-2 border-t border-amber-200 text-amber-900 bg-amber-100/50 p-2 rounded-lg">
                        <span className="font-bold">
                          {language === 'vi' ? '⚠️ Lưu ý sai lầm thường gặp: ' : '⚠️ Common Misconception: '}
                        </span>
                        {language === 'vi' ? activeMisconception.feedback_vi : activeMisconception.feedback_en}
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-end">
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-transform active:scale-95 cursor-pointer shadow-sm"
                      >
                        <span>{t.nextQuestion}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Substance Quick Deck Strip */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>{language === 'vi' ? 'Danh sách các mẫu chất' : 'Reagent Sample Queue'}</span>
              <span className="text-[11px] text-slate-400 font-normal">
                {language === 'vi' ? 'Nhấp để đổi mẫu' : 'Click to inspect'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {items.map((item, idx) => {
                const assigned = userAssignments[item.id];
                const isSelected = item.id === currentSubstance.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playClick();
                      setCurrentIndex(idx);
                      setSelectedSubstanceId(item.id);
                      setFeedback(null);
                      setLitmusDipped(false);
                    }}
                    className={`px-2 py-1 text-xs rounded-md border font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white font-extrabold shadow-xs scale-105'
                        : assigned
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.formula}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 Colorful Categorized Trays (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(cat => {
            const placed = assignedInClass(cat.id);
            return (
              <div
                key={cat.id}
                className={`bg-white border-2 rounded-2xl p-4 flex flex-col justify-between shadow-xs transition-all relative overflow-hidden bg-gradient-to-br ${cat.gradient} ${cat.border}`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white rounded-lg shadow-xs border border-slate-100">
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900">
                          {cat.label}
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {cat.subLabel}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono font-extrabold text-xs px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 shadow-xs">
                      {placed.length}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {cat.desc}
                  </p>

                  {/* Placed Substance Cards Tray */}
                  <div className="mt-3 min-h-[110px] p-2.5 bg-white/80 backdrop-blur-xs rounded-xl border border-slate-200/80 flex flex-wrap gap-2 content-start shadow-inner">
                    {placed.length === 0 ? (
                      <div className="m-auto text-center py-4 text-xs text-slate-400 italic">
                        {language === 'vi' ? 'Chưa phân loại chất nào vào đây' : 'No substances classified here yet'}
                      </div>
                    ) : (
                      placed.map(sub => (
                        <div
                          key={sub.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-xs hover:border-slate-400 transition-all"
                        >
                          <span className="font-mono text-slate-900">{sub.formula}</span>
                          <button
                            onClick={() => {
                              sounds.playClick();
                              setShowWhyModal(sub.id);
                            }}
                            className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title={t.whyExplanation}
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{language === 'vi' ? 'Dấu hiệu nhận biết:' : 'Diagnostic:'}</span>
                  <span className="font-bold text-slate-800">
                    {cat.id === 'acid' && 'Làm quỳ tím hóa đỏ'}
                    {cat.id === 'base' && 'Làm quỳ tím hóa xanh'}
                    {cat.id === 'oxide' && '2 nguyên tố có Oxi'}
                    {cat.id === 'salt' && 'Kim loại + gốc axit'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info / Why Modal */}
      {showWhyModal && (() => {
        const item = items.find(s => s.id === showWhyModal);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="font-mono font-extrabold text-xl text-slate-900">
                  {item.formula} — {language === 'vi' ? item.name_vi : item.name_en}
                </div>
                <button
                  onClick={() => setShowWhyModal(null)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-1">{t.whyExplanation}</span>
                  <span className="leading-relaxed">
                    {language === 'vi' ? item.why_vi : item.why_en}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">
                    {language === 'vi' ? 'Đặc điểm hóa học & hiện tượng:' : 'Chemical properties:'}
                  </span>
                  <span>{language === 'vi' ? item.explanation_vi : item.explanation_en}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowWhyModal(null)}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {language === 'vi' ? 'Đã hiểu rõ' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
