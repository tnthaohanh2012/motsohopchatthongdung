import React, { useState } from 'react';
import { REVIEW_QUESTIONS, MISCONCEPTIONS } from '../data/chemistryData';
import { TRANSLATIONS } from '../data/translations';
import { LearningObjective, ReviewQuestion } from '../types/chemistry';
import { sounds } from '../utils/soundEffects';
import { celebration } from './CelebrationEffects';
import { CheckCircle2, AlertCircle, RotateCcw, HelpCircle, Award, Target, ArrowRight, Sparkles, BookOpen, Check } from 'lucide-react';

interface ReviewModuleProps {
  language: 'vi' | 'en';
}

export const ReviewModule: React.FC<ReviewModuleProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const [isQuickCheck, setIsQuickCheck] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeQuestions = isQuickCheck ? REVIEW_QUESTIONS.slice(0, 3) : REVIEW_QUESTIONS;
  const currentQ: ReviewQuestion | undefined = activeQuestions[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted || !currentQ) return;
    const isCorrect = optIdx === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playApplause();
      celebration.burst();
    } else {
      sounds.playClick();
    }
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < activeQuestions.length - 1) {
      sounds.playClick();
      setCurrentIndex(i => i + 1);
    } else {
      sounds.playApplause();
      celebration.burst();
      setIsSubmitted(true);
    }
  };

  const handleReset = (quick = isQuickCheck) => {
    sounds.playClick();
    setIsQuickCheck(quick);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowHint(false);
    setIsSubmitted(false);
  };

  const computeObjectiveScores = () => {
    const scores: Record<LearningObjective, { correct: number; total: number }> = {
      classification: { correct: 0, total: 0 },
      valency_formula: { correct: 0, total: 0 },
      solubility: { correct: 0, total: 0 },
      reaction_prediction: { correct: 0, total: 0 },
      lab_reasoning: { correct: 0, total: 0 }
    };

    const encounteredMisconceptions: string[] = [];

    activeQuestions.forEach(q => {
      scores[q.objective].total += 1;
      const userAns = selectedAnswers[q.id];
      if (userAns === q.correctIndex) {
        scores[q.objective].correct += 1;
      } else if (q.misconceptionId && !encounteredMisconceptions.includes(q.misconceptionId)) {
        encounteredMisconceptions.push(q.misconceptionId);
      }
    });

    const totalCorrect = Object.values(scores).reduce((acc, v) => acc + v.correct, 0);

    return {
      scores,
      totalCorrect,
      totalQuestions: activeQuestions.length,
      encounteredMisconceptions
    };
  };

  const { scores, totalCorrect, totalQuestions, encounteredMisconceptions } = computeObjectiveScores();

  const objectiveLabels: Record<LearningObjective, string> = {
    classification: t.objClassification,
    valency_formula: t.objValency,
    solubility: t.objSolubility,
    reaction_prediction: t.objReaction,
    lab_reasoning: t.objLabReasoning
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Vibrant Gradient Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 bg-white/70 backdrop-blur-md p-4 rounded-3xl shadow-sm border">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse shadow-md"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 bg-clip-text text-transparent">
              {t.reviewTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            {t.reviewSubtitle}
          </p>
        </div>

        {/* Quick Check / Full Test Mode Selector */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => handleReset(true)}
              className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                isQuickCheck ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ {t.quickCheck}
            </button>
            <button
              onClick={() => handleReset(false)}
              className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                !isQuickCheck ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📚 {t.fullTest}
            </button>
          </div>

          <button
            onClick={() => handleReset(isQuickCheck)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-slate-700 bg-white border-2 border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>

      {/* IUPAC Standard Badge Notification Banner */}
      <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200/80 rounded-2xl text-xs text-indigo-950 shadow-xs">
        <div className="flex items-center gap-2.5 font-bold">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>
            {language === 'vi' 
              ? 'Tất cả câu hỏi & đáp án tuân thủ nghiêm ngặt danh pháp quốc tế IUPAC theo Chương trình GDPT 2018 (KHTN 8)' 
              : 'All questions and options strictly adhere to standard IUPAC chemical nomenclature'}
          </span>
        </div>
        <span className="hidden sm:inline-block font-mono font-black text-[10px] bg-indigo-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
          IUPAC Standard
        </span>
      </div>

      {/* Active Question Arena */}
      {!isSubmitted && currentQ ? (
        <div className="max-w-3xl mx-auto bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
            <span className="font-mono font-black text-indigo-600 text-sm bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
              {t.questionCount} {currentIndex + 1} / {activeQuestions.length}
            </span>
            <span className="font-black bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-900 border border-purple-200 px-3.5 py-1.5 rounded-full text-xs">
              {objectiveLabels[currentQ.objective]}
            </span>
          </div>

          <div className="text-base sm:text-xl font-black text-slate-900 leading-snug">
            {language === 'vi' ? currentQ.question_vi : currentQ.question_en}
          </div>

          <div className="space-y-3">
            {(language === 'vi' ? currentQ.options_vi : currentQ.options_en).map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;
              const isCorrectOption = idx === currentQ.correctIndex;

              const getOptionStyling = () => {
                if (!hasAnswered) {
                  return 'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40 shadow-xs';
                }
                if (isSelected) {
                  if (isCorrectOption) {
                    return 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 shadow-lg scale-101';
                  }
                  return 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400 shadow-md';
                }
                if (isCorrectOption) {
                  return 'border-emerald-300 bg-emerald-50/60 text-emerald-900';
                }
                return 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              };

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${getOptionStyling()}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-mono font-black shrink-0 ${
                      isSelected && isCorrectOption
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : isSelected
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>
                  {isSelected && isCorrectOption && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Solution Hint */}
          {showHint && (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl text-xs text-amber-950 flex items-start gap-3 shadow-xs">
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm block mb-1">{language === 'vi' ? 'Gợi ý giải bài:' : 'Solution Hint:'}</span>
                <span className="font-medium leading-relaxed">{language === 'vi' ? currentQ.hint_vi : currentQ.hint_en}</span>
              </div>
            </div>
          )}

          {/* Explanation reveal when answered */}
          {selectedAnswers[currentQ.id] !== undefined && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl text-xs text-indigo-950 space-y-1">
              <span className="font-black text-sm flex items-center gap-2 text-indigo-900">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>{language === 'vi' ? 'Giải thích chi tiết chuẩn IUPAC:' : 'Detailed IUPAC Explanation:'}</span>
              </span>
              <p className="leading-relaxed font-medium text-slate-800">
                {language === 'vi' ? currentQ.explanation_vi : currentQ.explanation_en}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                sounds.playClick();
                setShowHint(h => !h);
              }}
              className="text-xs font-black text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {showHint ? t.hideHint : t.showHint}
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-xs font-black transition-all active:scale-95 cursor-pointer shadow-lg shadow-indigo-600/30 disabled:opacity-40"
            >
              <span>{currentIndex === activeQuestions.length - 1 ? (language === 'vi' ? 'Xem kết quả' : 'View Results') : t.nextQuestion}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/20 border-2 border-indigo-200 rounded-3xl p-8 sm:p-10 shadow-xl text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-500/30 animate-bounce">
              <Award className="w-11 h-11" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {language === 'vi' ? 'Hoàn Thành Đánh Giá Năng Lực IUPAC!' : 'IUPAC Assessment Completed!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              {language === 'vi' ? 'Điểm số năng lực Hóa học lớp 8' : 'Overall Grade 8 Competency Score'}
            </p>
            <div className="text-5xl sm:text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 my-4 tabular-nums">
              {totalCorrect} / {totalQuestions}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleReset(isQuickCheck)}
                className="px-8 py-3 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl text-xs font-black hover:from-slate-800 hover:to-indigo-900 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                {t.retakeQuiz}
              </button>
            </div>
          </div>

          {/* Objective Breakdown */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-md">
            <h4 className="text-sm font-black text-slate-900 mb-5 flex items-center gap-2 uppercase tracking-wider">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>{t.scoreByObjective}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {(Object.keys(scores) as LearningObjective[]).map(objKey => {
                const item = scores[objKey];
                if (item.total === 0) return null;
                const pct = Math.round((item.correct / item.total) * 100);
                return (
                  <div key={objKey} className="p-4 bg-gradient-to-br from-slate-50 to-indigo-50/30 border-2 border-slate-200 rounded-2xl">
                    <div className="text-xs font-black text-slate-800 truncate">
                      {objectiveLabels[objKey]}
                    </div>
                    <div className="flex items-baseline justify-between mt-3">
                      <span className="text-2xl font-black font-mono text-slate-950 tabular-nums">
                        {item.correct} / {item.total}
                      </span>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${pct >= 75 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Misconceptions Diagnosis */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-7 shadow-md space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>{t.misconceptionsFound}</span>
            </h4>

            {encounteredMisconceptions.length === 0 ? (
              <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl text-emerald-950 text-xs flex items-center gap-3.5 shadow-xs">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <span className="font-bold text-sm leading-relaxed">{t.noMisconceptions}</span>
              </div>
            ) : (
              <div className="space-y-3.5">
                {encounteredMisconceptions.map(mId => {
                  const m = MISCONCEPTIONS.find(misc => misc.id === mId);
                  if (!m) return null;
                  return (
                    <div key={m.id} className="p-4 sm:p-5 bg-gradient-to-r from-amber-50/90 to-orange-50/80 border-2 border-amber-300 rounded-2xl text-xs space-y-2 shadow-xs">
                      <div className="font-black text-sm text-amber-950 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{language === 'vi' ? m.title_vi : m.title_en}</span>
                      </div>
                      <p className="text-amber-900 leading-relaxed font-medium">
                        {language === 'vi' ? m.feedback_vi : m.feedback_en}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
