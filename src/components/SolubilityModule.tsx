import React, { useState } from 'react';
import { IONS, SOLUBILITY_RULES } from '../data/chemistryData';
import { TRANSLATIONS } from '../data/translations';
import { getSolubilityEntry } from '../utils/chemistryCalculators';
import { sounds } from '../utils/soundEffects';
import { celebration } from './CelebrationEffects';
import { Check, AlertCircle, Layers, Droplet, Sparkles, Eye, Info } from 'lucide-react';

interface SolubilityModuleProps {
  language: 'vi' | 'en';
}

export const SolubilityModule: React.FC<SolubilityModuleProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const gridCations = ['H+', 'Na+', 'K+', 'NH4+', 'Mg2+', 'Ca2+', 'Ba2+', 'Zn2+', 'Cu2+', 'Fe2+', 'Fe3+', 'Al3+', 'Ag+'];
  const gridAnions = ['OH-', 'Cl-', 'NO3-', 'SO4_2-', 'CO3_2-', 'PO4_3-', 'S_2-', 'SO3_2-'];

  const [selectedCation, setSelectedCation] = useState<string>('Ba2+');
  const [selectedAnion, setSelectedAnion] = useState<string>('SO4_2-');
  const [userPrediction, setUserPrediction] = useState<'soluble' | 'insoluble' | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);

  const entry = getSolubilityEntry(selectedCation, selectedAnion);

  const catObj = IONS.find(i => i.id === selectedCation);
  const anObj = IONS.find(i => i.id === selectedAnion);

  const handleSelectCell = (cat: string, an: string) => {
    sounds.playClick();
    setSelectedCation(cat);
    setSelectedAnion(an);
    setUserPrediction(null);
    setRevealed(false);
  };

  const handlePredict = (prediction: 'soluble' | 'insoluble') => {
    setUserPrediction(prediction);
    setRevealed(true);
    const isPrecip = entry?.isPrecipitate ?? false;
    if ((prediction === 'insoluble' && isPrecip) || (prediction === 'soluble' && !isPrecip)) {
      sounds.playApplause();
      celebration.burst();
    } else {
      sounds.playClick();
    }
  };

  const isPrecipitate = entry?.isPrecipitate ?? false;
  const isSoluble = entry?.status === 'S';
  const isSlightly = entry?.status === 'SS';

  const isPredictionCorrect = userPrediction !== null && (
    (userPrediction === 'insoluble' && (isPrecipitate || entry?.status === 'I')) ||
    (userPrediction === 'soluble' && (isSoluble || isSlightly))
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t.solubilityTitle}
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {t.solubilitySubtitle}
          </p>
        </div>

        {/* Legend Pills with vibrant indicators */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-emerald-900">{t.solubilityLegendS}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="font-bold text-rose-900">{t.solubilityLegendI}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="font-bold text-amber-900">{t.solubilityLegendSS}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <span className="font-bold text-slate-600">{t.solubilityLegendDash}</span>
          </div>
        </div>
      </div>

      {/* Grid: Left Column Prediction Tank & Right Column Full Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Pair Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
              {t.mixedPairTitle}
            </div>

            {/* Selected Ion Badges */}
            <div className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-2xl border border-blue-100 my-2 shadow-inner">
              <div className="text-center">
                <span className="text-[11px] font-bold text-blue-900 block mb-1">{t.solubilityCationLabel}</span>
                <span className="px-3.5 py-1.5 bg-blue-600 text-white font-mono font-black text-xl rounded-xl shadow-xs inline-block">
                  {catObj?.symbol}
                </span>
                <span className="text-[11px] text-blue-800 font-bold block mt-1">
                  {language === 'vi' ? catObj?.name_vi : catObj?.name_en}
                </span>
              </div>

              <span className="text-2xl font-black text-slate-400">+</span>

              <div className="text-center">
                <span className="text-[11px] font-bold text-purple-900 block mb-1">{t.solubilityAnionLabel}</span>
                <span className="px-3.5 py-1.5 bg-purple-600 text-white font-mono font-black text-xl rounded-xl shadow-xs inline-block">
                  {anObj?.symbol}
                </span>
                <span className="text-[11px] text-purple-800 font-bold block mt-1">
                  {language === 'vi' ? anObj?.name_vi : anObj?.name_en}
                </span>
              </div>
            </div>

            {/* Prediction Prompt */}
            {!revealed ? (
              <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50/80 via-blue-50/60 to-indigo-50/80 border-2 border-cyan-200 rounded-2xl text-center space-y-3 shadow-xs">
                <div className="text-xs font-black text-cyan-950 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t.predictPrecipitatePrompt}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handlePredict('soluble')}
                    className="py-2.5 px-3 bg-white border-2 border-emerald-300 text-emerald-900 rounded-xl text-xs font-black hover:bg-emerald-50 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    💧 {language === 'vi' ? 'Tan trong nước (S)' : 'Soluble (No precipitate)'}
                  </button>
                  <button
                    onClick={() => handlePredict('insoluble')}
                    className="py-2.5 px-3 bg-white border-2 border-rose-300 text-rose-900 rounded-xl text-xs font-black hover:bg-rose-50 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    🧱 {language === 'vi' ? 'Tạo kết tủa (I)' : 'Insoluble (Precipitates)'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {/* Result Announcement */}
                <div
                  className={`p-4 rounded-2xl border-2 text-xs shadow-xs ${
                    isPredictionCorrect
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50/90 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {isPredictionCorrect ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-black text-sm block mb-0.5">
                        {isPredictionCorrect
                          ? (language === 'vi' ? 'Dự đoán chuẩn xác!' : 'Accurate prediction!')
                          : (language === 'vi' ? 'Chưa chính xác.' : 'Incorrect prediction.')}
                      </span>
                      <div className="font-medium text-slate-800">
                        {entry?.status === 'I' && (
                          <span className="text-rose-700 font-bold">{t.statePrecipitate}</span>
                        )}
                        {entry?.status === 'S' && (
                          <span className="text-emerald-700 font-bold">{t.stateDissolved}</span>
                        )}
                        {entry?.status === 'SS' && (
                          <span className="text-amber-700 font-bold">{language === 'vi' ? 'Chất ít tan trong nước.' : 'Slightly soluble.'}</span>
                        )}
                        {entry?.status === '-' && (
                          <span className="text-slate-500 font-bold">{language === 'vi' ? 'Hợp chất không tồn tại hoặc bị phân hủy trong nước.' : 'Unstable / decomposes in water.'}</span>
                        )}
                      </div>

                      {entry?.color_vi && (
                        <div className="mt-1 font-bold text-slate-800">
                          {language === 'vi' ? `Màu sắc kết tủa: ${entry.color_vi}` : `Evidence: ${entry.color_en}`}
                        </div>
                      )}

                      {entry?.note_vi && (
                        <div className="mt-1 text-[11px] text-slate-600 italic">
                          ({language === 'vi' ? entry.note_vi : entry.note_en})
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Microscopic Particle Visual Tank */}
                <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">
                    <span className="font-extrabold flex items-center gap-1.5 text-cyan-400">
                      <Layers className="w-4 h-4" />
                      <span>{t.particleModel}</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      {isPrecipitate ? 'Mạng tinh thể kết tủa' : 'Ion phân tán tự do (aq)'}
                    </span>
                  </div>

                  <div className="relative w-full h-44 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-inner">
                    <div className="absolute inset-x-0 bottom-0 top-6 bg-blue-950/40 border-t border-cyan-500/20"></div>

                    {isPrecipitate ? (
                      /* Precipitate Crystal Lattice clustered at bottom */
                      <div className="relative w-full h-full flex flex-col justify-end items-center pb-2">
                        <div className="text-[11px] text-slate-400 mb-4 italic">
                          {language === 'vi' ? 'Chất lỏng trong suốt phía trên' : 'Clear liquid above'}
                        </div>

                        {/* Clustered Precipitate at bottom */}
                        <div className="flex flex-col items-center">
                          <div className="flex gap-1.5 justify-center">
                            <span className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                              +
                            </span>
                            <span className="w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                              -
                            </span>
                            <span className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                              +
                            </span>
                          </div>
                          <div className="flex gap-1.5 justify-center -mt-1">
                            <span className="w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                              -
                            </span>
                            <span className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                              +
                            </span>
                            <span className="w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                              -
                            </span>
                          </div>
                          <div className="text-[11px] font-mono font-black text-amber-300 mt-2">
                            {catObj?.symbol}{anObj?.symbol} ↓ ({language === 'vi' ? 'Kết tủa rắn lắng đáy' : 'Solid crystal precipitate'})
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Solvated Separated Hydrated Ions Dispersed */
                      <div className="relative w-full h-full p-4 flex flex-wrap items-center justify-around">
                        <div className="flex flex-col items-center animate-bounce duration-1000">
                          <span className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-300 text-white flex items-center justify-center text-xs font-mono font-black shadow-lg">
                            {catObj?.symbol}
                          </span>
                          <span className="text-[9px] text-blue-300 font-bold mt-0.5">aq</span>
                        </div>
                        <div className="flex flex-col items-center animate-pulse duration-700">
                          <span className="w-8 h-8 rounded-full bg-purple-500 border-2 border-purple-300 text-white flex items-center justify-center text-xs font-mono font-black shadow-lg">
                            {anObj?.symbol}
                          </span>
                          <span className="text-[9px] text-purple-300 font-bold mt-0.5">aq</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-300 text-white flex items-center justify-center text-xs font-mono font-black shadow-lg">
                            {catObj?.symbol}
                          </span>
                          <span className="text-[9px] text-blue-300 font-bold mt-0.5">aq</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="w-8 h-8 rounded-full bg-purple-500 border-2 border-purple-300 text-white flex items-center justify-center text-xs font-mono font-black shadow-lg">
                            {anObj?.symbol}
                          </span>
                          <span className="text-[9px] text-purple-300 font-bold mt-0.5">aq</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed font-medium">
                    {isPrecipitate ? t.particlePrecipitateLattice : t.particleHydratedIons}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setUserPrediction(null);
                      setRevealed(false);
                    }}
                    className="px-4 py-2 text-xs font-black text-slate-800 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer shadow-xs"
                  >
                    {language === 'vi' ? 'Thử tổ hợp ion khác' : 'Try another pair'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Full Interactive Solubility Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <h3 className="text-sm font-black text-slate-900">
              {language === 'vi' ? 'Bảng tính tan muối & bazơ (KHTN 8)' : 'Solubility Table for Salts & Bases (Grade 8)'}
            </h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              {language === 'vi' ? 'Nhấp ô để kiểm tra' : 'Click cell to inspect'}
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="p-2 text-left font-black text-slate-800 sticky left-0 bg-slate-50 z-10">
                    Cation \ Anion
                  </th>
                  {gridAnions.map(an => (
                    <th key={an} className="p-2 font-mono font-black text-slate-900 whitespace-nowrap">
                      {IONS.find(i => i.id === an)?.symbol}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {gridCations.map(cat => (
                  <tr key={cat} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2 text-left font-black text-slate-900 sticky left-0 bg-white z-10 whitespace-nowrap border-r border-slate-200">
                      {IONS.find(i => i.id === cat)?.symbol}
                    </td>
                    {gridAnions.map(an => {
                      const cell = getSolubilityEntry(cat, an);
                      const isSelected = selectedCation === cat && selectedAnion === an;
                      const status = cell?.status || '-';

                      let badgeClass = 'text-slate-400 bg-slate-100';
                      if (status === 'S') badgeClass = 'text-emerald-800 bg-emerald-100 hover:bg-emerald-200 font-bold';
                      if (status === 'I') badgeClass = 'text-rose-800 bg-rose-100 hover:bg-rose-200 font-black';
                      if (status === 'SS') badgeClass = 'text-amber-800 bg-amber-100 hover:bg-amber-200 font-bold';

                      return (
                        <td key={an} className="p-1">
                          <button
                            onClick={() => handleSelectCell(cat, an)}
                            className={`w-8 h-8 rounded-lg text-xs font-extrabold transition-all cursor-pointer shadow-2xs ${badgeClass} ${
                              isSelected ? 'ring-3 ring-blue-600 scale-110 z-10 shadow-md' : ''
                            }`}
                            title={`${cat} + ${an} -> ${cell?.status || 'Unknown'}`}
                          >
                            {status}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Rules Summary */}
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
            <div className="font-extrabold text-slate-900 uppercase tracking-wider">
              {language === 'vi' ? 'Quy tắc vàng ghi nhớ nhanh:' : 'Essential Rules to Remember:'}
            </div>
            <ul className="list-disc pl-4 space-y-1 font-medium">
              <li><strong className="text-emerald-700">Tất cả muối Nitrat (-NO₃):</strong> Đều tan tốt trong nước.</li>
              <li><strong className="text-emerald-700">Tất cả muối Natri (Na) & Kali (K):</strong> Đều tan tốt trong nước.</li>
              <li><strong className="text-rose-700">Muối Clorua (-Cl):</strong> Hầu hết tan, ngoại trừ <strong>AgCl</strong> kết tủa vón trắng.</li>
              <li><strong className="text-rose-700">Muối Sunfat (=SO₄):</strong> Hầu hết tan, ngoại trừ <strong>BaSO₄</strong> kết tủa trắng không tan trong axit, <strong>CaSO₄</strong> ít tan.</li>
              <li><strong className="text-rose-700">Muối Cacbonat (=CO₃):</strong> Chỉ tan khi tạo bởi Na, K, NH₄⁺; các kim loại còn lại kết tủa (như đá vôi <strong>CaCO₃</strong>).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
