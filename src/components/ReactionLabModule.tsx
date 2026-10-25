import React, { useState } from 'react';
import { SUBSTANCES } from '../data/chemistryData';
import { TRANSLATIONS } from '../data/translations';
import { findReaction } from '../utils/chemistryCalculators';
import { ReactionEvidence } from '../types/chemistry';
import { sounds } from '../utils/soundEffects';
import { celebration } from './CelebrationEffects';
import { 
  FlaskConical, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  Eye, 
  BookOpen, 
  Play, 
  RefreshCw,
  Thermometer,
  TestTube2,
  Flame,
  ChevronDown,
  ChevronUp,
  Droplet,
  Wrench,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface ReactionLabProps {
  language: 'vi' | 'en';
}

export const ReactionLabModule: React.FC<ReactionLabProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  // Full comprehensive chemical reagent bank with official IUPAC names
  const reagentCategories = {
    acid: [
      { id: 'hcl', label: 'HCl', name_vi: 'Hydrochloric acid (Axit clohiđric)', name_en: 'Hydrochloric acid' },
      { id: 'h2so4', label: 'H₂SO₄', name_vi: 'Sulfuric acid (Axit sunfuric)', name_en: 'Sulfuric acid' },
      { id: 'hno3', label: 'HNO₃', name_vi: 'Nitric acid (Axit nitric)', name_en: 'Nitric acid' },
      { id: 'h3po4', label: 'H₃PO₄', name_vi: 'Phosphoric acid (Axit photphoric)', name_en: 'Phosphoric acid' },
      { id: 'ch3cooh', label: 'CH₃COOH', name_vi: 'Acetic acid (Giấm ăn)', name_en: 'Acetic acid' },
      { id: 'h2s', label: 'H₂S', name_vi: 'Hydrogen sulfide (Mùi trứng thối)', name_en: 'Hydrogen sulfide' },
      { id: 'h2so3', label: 'H₂SO₃', name_vi: 'Sulfurous acid (Axit sunfurơ)', name_en: 'Sulfurous acid' },
      { id: 'h2co3', label: 'H₂CO₃', name_vi: 'Carbonic acid (Axit cacbonic)', name_en: 'Carbonic acid' },
      { id: 'hbr', label: 'HBr', name_vi: 'Hydrobromic acid (Axit bromhiđric)', name_en: 'Hydrobromic acid' }
    ],
    base: [
      { id: 'naoh', label: 'NaOH', name_vi: 'Sodium hydroxide (Xút ăn da)', name_en: 'Sodium hydroxide' },
      { id: 'koh', label: 'KOH', name_vi: 'Potassium hydroxide (Kiềm kali)', name_en: 'Potassium hydroxide' },
      { id: 'ca_oh_2', label: 'Ca(OH)₂', name_vi: 'Calcium hydroxide (Nước vôi trong)', name_en: 'Calcium hydroxide' },
      { id: 'ba_oh_2', label: 'Ba(OH)₂', name_vi: 'Barium hydroxide', name_en: 'Barium hydroxide' },
      { id: 'cu_oh_2', label: 'Cu(OH)₂', name_vi: 'Copper(II) hydroxide (kết tủa xanh lam)', name_en: 'Copper(II) hydroxide' },
      { id: 'fe_oh_2', label: 'Fe(OH)₂', name_vi: 'Iron(II) hydroxide (trắng xanh)', name_en: 'Iron(II) hydroxide' },
      { id: 'fe_oh_3', label: 'Fe(OH)₃', name_vi: 'Iron(III) hydroxide (nâu đỏ)', name_en: 'Iron(III) hydroxide' },
      { id: 'al_oh_3', label: 'Al(OH)₃', name_vi: 'Aluminium hydroxide (keo trắng)', name_en: 'Aluminium hydroxide' },
      { id: 'mg_oh_2', label: 'Mg(OH)₂', name_vi: 'Magnesium hydroxide (trắng)', name_en: 'Magnesium hydroxide' },
      { id: 'zn_oh_2', label: 'Zn(OH)₂', name_vi: 'Zinc hydroxide (lưỡng tính)', name_en: 'Zinc hydroxide' }
    ],
    oxide: [
      { id: 'cuo', label: 'CuO', name_vi: 'Copper(II) oxide (bột đen)', name_en: 'Copper(II) oxide' },
      { id: 'cao', label: 'CaO', name_vi: 'Calcium oxide (Vôi sống tỏa nhiệt)', name_en: 'Calcium oxide' },
      { id: 'fe2o3', label: 'Fe₂O₃', name_vi: 'Iron(III) oxide (Gỉ sắt nâu đỏ)', name_en: 'Iron(III) oxide' },
      { id: 'feo', label: 'FeO', name_vi: 'Iron(II) oxide (bột đen)', name_en: 'Iron(II) oxide' },
      { id: 'fe3o4', label: 'Fe₃O₄', name_vi: 'Iron(II,III) oxide (Oxit sắt từ)', name_en: 'Magnetite' },
      { id: 'co2', label: 'CO₂', name_vi: 'Carbon dioxide (Khí cacbonic)', name_en: 'Carbon dioxide' },
      { id: 'so2', label: 'SO₂', name_vi: 'Sulfur dioxide (Khí mùi hắc)', name_en: 'Sulfur dioxide' },
      { id: 'so3', label: 'SO₃', name_vi: 'Sulfur trioxide (háo nước)', name_en: 'Sulfur trioxide' },
      { id: 'p2o5', label: 'P₂O₅', name_vi: 'Diphosphorus pentoxide (hút ẩm)', name_en: 'Diphosphorus pentoxide' },
      { id: 'zno', label: 'ZnO', name_vi: 'Zinc oxide (bột trắng)', name_en: 'Zinc oxide' },
      { id: 'al2o3', label: 'Al₂O₃', name_vi: 'Aluminium oxide (màng oxit nhôm)', name_en: 'Aluminium oxide' },
      { id: 'na2o', label: 'Na₂O', name_vi: 'Sodium oxide', name_en: 'Sodium oxide' },
      { id: 'co', label: 'CO', name_vi: 'Carbon monoxide (khí độc không tạo muối)', name_en: 'Carbon monoxide' }
    ],
    salt: [
      { id: 'cuso4', label: 'CuSO₄', name_vi: 'Copper(II) sulfate (lam ngọc)', name_en: 'Copper(II) sulfate' },
      { id: 'bacl2', label: 'BaCl₂', name_vi: 'Barium chloride (thuốc thử sulfate)', name_en: 'Barium chloride' },
      { id: 'na2so4', label: 'Na₂SO₄', name_vi: 'Sodium sulfate', name_en: 'Sodium sulfate' },
      { id: 'caco3', label: 'CaCO₃', name_vi: 'Calcium carbonate (Đá vôi)', name_en: 'Calcium carbonate' },
      { id: 'na2co3', label: 'Na₂CO₃', name_vi: 'Sodium carbonate (Soda sủi bọt)', name_en: 'Sodium carbonate' },
      { id: 'nahco3', label: 'NaHCO₃', name_vi: 'Sodium hydrogencarbonate (Baking soda)', name_en: 'Sodium hydrogencarbonate' },
      { id: 'fecl3', label: 'FeCl₃', name_vi: 'Iron(III) chloride (vàng nâu)', name_en: 'Iron(III) chloride' },
      { id: 'fecl2', label: 'FeCl₂', name_vi: 'Iron(II) chloride (xanh lục nhạt)', name_en: 'Iron(II) chloride' },
      { id: 'cucl2', label: 'CuCl₂', name_vi: 'Copper(II) chloride (xanh lam lá)', name_en: 'Copper(II) chloride' },
      { id: 'agno3', label: 'AgNO₃', name_vi: 'Silver nitrate (thuốc thử halide)', name_en: 'Silver nitrate' },
      { id: 'agcl', label: 'AgCl', name_vi: 'Silver chloride (kết tủa vón trắng)', name_en: 'Silver chloride' },
      { id: 'nacl', label: 'NaCl', name_vi: 'Sodium chloride (Muối ăn)', name_en: 'Sodium chloride' },
      { id: 'kno3', label: 'KNO₃', name_vi: 'Potassium nitrate', name_en: 'Potassium nitrate' },
      { id: 'ki', label: 'KI', name_vi: 'Potassium iodide (Tạo mưa vàng)', name_en: 'Potassium iodide' },
      { id: 'pb_no3_2', label: 'Pb(NO₃)₂', name_vi: 'Lead(II) nitrate (Tạo mưa vàng)', name_en: 'Lead(II) nitrate' },
      { id: 'baso4', label: 'BaSO₄', name_vi: 'Barium sulfate (kết tủa trắng trơ)', name_en: 'Barium sulfate' },
      { id: 'zncl2', label: 'ZnCl₂', name_vi: 'Zinc chloride', name_en: 'Zinc chloride' },
      { id: 'nh4cl', label: 'NH₄Cl', name_vi: 'Ammonium chloride', name_en: 'Ammonium chloride' }
    ],
    metal: [
      { id: 'mg', label: 'Mg', name_vi: 'Magnesium (Dải magie sủi bọt mạnh)', name_en: 'Magnesium metal' },
      { id: 'zn', label: 'Zn', name_vi: 'Zinc (Mảnh kẽm đẩy Cu)', name_en: 'Zinc metal' },
      { id: 'fe', label: 'Fe', name_vi: 'Iron (Đinh sắt khử acid)', name_en: 'Iron metal' },
      { id: 'cu', label: 'Cu', name_vi: 'Copper (Lá đồng đỏ trơ trong HCl)', name_en: 'Copper metal' },
      { id: 'al', label: 'Al', name_vi: 'Aluminium (Lá nhôm sôi bọt mãnh liệt)', name_en: 'Aluminium metal' },
      { id: 'na', label: 'Na', name_vi: 'Sodium (Kim loại kiềm nổ bốc cháy)', name_en: 'Sodium metal' },
      { id: 'k', label: 'K', name_vi: 'Potassium (Kim loại kiềm lửa tím hoa cà)', name_en: 'Potassium metal' }
    ]
  };

  const [activeTab, setActiveTab] = useState<'reagents' | 'tools'>('reagents');
  const [reagentCategory, setReagentCategory] = useState<'all' | 'acid' | 'base' | 'oxide' | 'salt' | 'metal'>('all');
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(true); // Drawer toggle

  const [reagentAId, setReagentAId] = useState<string>('pb_no3_2');
  const [reagentBId, setReagentBId] = useState<string>('ki');
  const [vesselType, setVesselType] = useState<'flask' | 'beaker' | 'testtube'>('flask');
  const [userPrediction, setUserPrediction] = useState<ReactionEvidence | null>(null);

  // Reaction State
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [isMixed, setIsMixed] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(25);

  // Tools in action
  const [isStirring, setIsStirring] = useState<boolean>(false);
  const [burnerActive, setBurnerActive] = useState<boolean>(false);
  const [litmusDipped, setLitmusDipped] = useState<boolean>(false);
  const [phenolphthaleinAdded, setPhenolphthaleinAdded] = useState<boolean>(false);
  const [splintTested, setSplintTested] = useState<boolean>(false);

  const matchedReaction = findReaction(reagentAId, reagentBId);
  const substanceA = SUBSTANCES.find(s => s.id === reagentAId) || SUBSTANCES[0];
  const substanceB = SUBSTANCES.find(s => s.id === reagentBId) || SUBSTANCES[1];

  const handleSelectReagent = (id: string) => {
    sounds.playClick();
    if (isMixed) {
      handleResetExperiment();
    }
    if (id === reagentAId) return;
    if (!reagentAId) {
      setReagentAId(id);
    } else if (!reagentBId || reagentBId === id) {
      setReagentBId(id);
    } else {
      setReagentAId(reagentBId);
      setReagentBId(id);
    }
    setUserPrediction(null);
  };

  const handleStartReaction = () => {
    setIsReacting(true);
    sounds.playPour();

    setTimeout(() => {
      setIsReacting(false);
      setIsMixed(true);

      const isExothermic = matchedReaction?.id === 'R01' || matchedReaction?.id === 'R02' || matchedReaction?.id === 'R21' || matchedReaction?.id === 'R25' || matchedReaction?.id === 'R23';
      const isExplosion = matchedReaction?.id === 'R21' || matchedReaction?.id === 'R25'; // Na or K violent reaction

      if (isExplosion) {
        sounds.playExplosion();
        setTemperature(75);
      } else if (matchedReaction?.expected_evidence.includes('gas')) {
        sounds.playFizz();
        setTemperature(isExothermic ? 45 : 28);
      } else if (matchedReaction?.expected_evidence.includes('precipitate')) {
        sounds.playSnap();
        setTemperature(26);
      } else {
        sounds.playSuccess();
        setTemperature(isExothermic ? 39 : 25);
      }

      // Check if user prediction is correct -> celebration with fireworks & applause
      if (userPrediction && matchedReaction?.expected_evidence.includes(userPrediction)) {
        setTimeout(() => {
          sounds.playApplause();
          celebration.burst();
        }, 500);
      }
    }, 1100);
  };

  const handleStir = () => {
    sounds.playClick();
    setIsStirring(true);
    setTimeout(() => setIsStirring(false), 800);
  };

  const handleToggleBurner = () => {
    sounds.playClick();
    const next = !burnerActive;
    setBurnerActive(next);
    if (next) {
      sounds.playFizz();
      setTemperature(t => t + 22);
    } else {
      setTemperature(25);
    }
  };

  const handleDipLitmus = () => {
    sounds.playClick();
    setLitmusDipped(true);
  };

  const handleAddPhenolphthalein = () => {
    sounds.playPour();
    setPhenolphthaleinAdded(true);
  };

  const handleTestSplint = () => {
    sounds.playClick();
    setSplintTested(true);
    if (matchedReaction?.expected_evidence.includes('gas') && (
      matchedReaction.id === 'R01' || 
      matchedReaction.id === 'R12' || 
      matchedReaction.id === 'R17' || 
      matchedReaction.id === 'R21' || 
      matchedReaction.id === 'R23' || 
      matchedReaction.id === 'R25' || 
      matchedReaction.id === 'R26' || 
      matchedReaction.id === 'R27' || 
      matchedReaction.id === 'R28'
    )) {
      setTimeout(() => {
        sounds.playExplosion();
      }, 350);
    }
  };

  const handleResetExperiment = () => {
    sounds.playClick();
    setIsMixed(false);
    setIsReacting(false);
    setUserPrediction(null);
    setTemperature(25);
    setIsStirring(false);
    setBurnerActive(false);
    setLitmusDipped(false);
    setPhenolphthaleinAdded(false);
    setSplintTested(false);
  };

  const isPredictionCorrect = userPrediction !== null && matchedReaction && (
    matchedReaction.expected_evidence.includes(userPrediction)
  );

  // Litmus color computation
  const getLitmusColor = () => {
    if (!isMixed) {
      if (substanceA.class === 'acid') return 'bg-rose-500 text-white';
      if (substanceA.class === 'base') return 'bg-blue-600 text-white';
      return 'bg-purple-400 text-white';
    }
    if (matchedReaction?.id === 'R02' || matchedReaction?.id === 'R03' || matchedReaction?.id === 'R38') return 'bg-purple-400 text-white'; // neutral
    if (['R01', 'R06', 'R12', 'R14', 'R17', 'R23', 'R26', 'R27', 'R28', 'R33', 'R34'].includes(matchedReaction?.id || '')) {
      return 'bg-rose-500 text-white';
    }
    if (['R08', 'R10', 'R18', 'R21', 'R25', 'R36', 'R37'].includes(matchedReaction?.id || '')) {
      return 'bg-blue-600 text-white';
    }
    return 'bg-purple-400 text-white';
  };

  // Compile full reagent list with colorful category metadata
  const allReagentsList = [
    ...reagentCategories.acid.map(r => ({ ...r, type: 'acid' as const, badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' })),
    ...reagentCategories.base.map(r => ({ ...r, type: 'base' as const, badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' })),
    ...reagentCategories.oxide.map(r => ({ ...r, type: 'oxide' as const, badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' })),
    ...reagentCategories.salt.map(r => ({ ...r, type: 'salt' as const, badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' })),
    ...reagentCategories.metal.map(r => ({ ...r, type: 'metal' as const, badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' }))
  ];

  const filteredReagents = reagentCategory === 'all'
    ? allReagentsList
    : allReagentsList.filter(r => r.type === reagentCategory);

  // Check specific visual effects
  const isGoldenRain = isMixed && matchedReaction?.id === 'R22'; // PbI2 golden rain
  const isPotassiumLilac = isMixed && matchedReaction?.id === 'R25'; // K flame violet
  const isSodiumExplosion = isMixed && matchedReaction?.id === 'R21'; // Na pop flame

  return (
    <div className="space-y-6">
      {/* Top Controls Bar with Colorful Gradient Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 bg-white/70 backdrop-blur-md p-4 rounded-3xl shadow-sm border">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 animate-pulse shadow-md"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight bg-gradient-to-r from-blue-700 via-purple-700 to-rose-600 bg-clip-text text-transparent">
              {language === 'vi' ? 'Phòng Thí Nghiệm Hóa Học Ảo KHTN 8' : 'Virtual Chemistry Reaction Laboratory'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            {language === 'vi' 
              ? 'Bình phản ứng trung tâm — Danh mục 45+ hóa chất chuẩn danh pháp IUPAC & đầy đủ dụng cụ' 
              : 'Central reaction apparatus — 45+ reagents with IUPAC nomenclature and interactive instruments'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle Support Drawer Button with Vivid Gradient */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsTrayOpen(o => !o);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-102 transition-all cursor-pointer active:scale-98"
          >
            <Wrench className="w-4 h-4" />
            <span>{isTrayOpen ? (language === 'vi' ? 'Ẩn thanh hỗ trợ' : 'Hide Tool Shelf') : (language === 'vi' ? 'Hiện thanh hóa chất & dụng cụ' : 'Show Tool Shelf')}</span>
            {isTrayOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Reset button */}
          <button
            onClick={handleResetExperiment}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-black text-slate-700 bg-white border-2 border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>

      {/* Safety Notice with Vivid Amber Glow */}
      <div className="flex items-center gap-2.5 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/80 rounded-2xl text-xs text-amber-950 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <span className="font-bold leading-relaxed">{t.virtualLabSafetyNotice}</span>
      </div>

      {/* COLLAPSIBLE TOOL & CHEMICAL SUPPORT SHELF (THANH HỖ TRỢ ĐẦY ĐỦ CÁC CHẤT VÀ DỤNG CỤ) */}
      {isTrayOpen && (
        <div className="bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/20 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 shadow-xl transition-all space-y-4">
          {/* Support Tray Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('reagents');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'reagents'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-102'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                <span>{language === 'vi' ? '1. Tủ hóa chất IUPAC (45+ chất)' : '1. Chemical Rack (45+ IUPAC Reagents)'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('tools');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'tools'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25 scale-102'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>{language === 'vi' ? '2. Bộ dụng cụ thí nghiệm' : '2. Lab Instruments'}</span>
              </button>
            </div>

            {/* Vessel Selector Toggle */}
            <div className="flex items-center gap-1.5 text-xs bg-slate-100 p-1 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-bold px-2">{language === 'vi' ? 'Bình chứa:' : 'Vessel:'}</span>
              <button
                onClick={() => {
                  sounds.playClick();
                  setVesselType('flask');
                }}
                className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${vesselType === 'flask' ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Bình tam giác
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setVesselType('beaker');
                }}
                className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${vesselType === 'beaker' ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Cốc thủy tinh
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setVesselType('testtube');
                }}
                className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${vesselType === 'testtube' ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Ống nghiệm
              </button>
            </div>
          </div>

          {/* Tab 1: Comprehensive IUPAC Reagents */}
          {activeTab === 'reagents' && (
            <div className="space-y-3.5">
              {/* Category Filter Pills with Distinct Vibrant Colors */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {(['all', 'acid', 'base', 'oxide', 'salt', 'metal'] as const).map(catKey => {
                  const getTabColors = () => {
                    if (reagentCategory !== catKey) return 'bg-slate-100 text-slate-600 hover:bg-slate-200';
                    if (catKey === 'all') return 'bg-slate-900 text-white shadow-sm';
                    if (catKey === 'acid') return 'bg-rose-600 text-white shadow-md shadow-rose-600/30';
                    if (catKey === 'base') return 'bg-blue-600 text-white shadow-md shadow-blue-600/30';
                    if (catKey === 'oxide') return 'bg-purple-600 text-white shadow-md shadow-purple-600/30';
                    if (catKey === 'salt') return 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30';
                    return 'bg-amber-600 text-white shadow-md shadow-amber-600/30';
                  };

                  return (
                    <button
                      key={catKey}
                      onClick={() => {
                        sounds.playClick();
                        setReagentCategory(catKey);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl font-black transition-all cursor-pointer ${getTabColors()}`}
                    >
                      {catKey === 'all' && (language === 'vi' ? '🌈 Tất cả (45+ chất)' : '🌈 All Substances (45+)')}
                      {catKey === 'acid' && '🔴 Acid (Axit)'}
                      {catKey === 'base' && '🔵 Base (Bazơ)'}
                      {catKey === 'oxide' && '🟣 Oxide (Oxit)'}
                      {catKey === 'salt' && '🟢 Muối (Salts)'}
                      {catKey === 'metal' && '🟡 Kim loại & Đơn chất'}
                    </button>
                  );
                })}
              </div>

              {/* Chemical Reagents Grid with High Contrast IUPAC Names */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-64 overflow-y-auto pr-1.5">
                {filteredReagents.map(r => {
                  const isA = r.id === reagentAId;
                  const isB = r.id === reagentBId;
                  const isSelected = isA || isB;

                  const getBorderColor = () => {
                    if (isA) return 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 scale-102';
                    if (isB) return 'border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400 scale-102';
                    if (r.type === 'acid') return 'border-rose-200 bg-rose-50/60 hover:bg-rose-100/70 text-slate-900';
                    if (r.type === 'base') return 'border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-slate-900';
                    if (r.type === 'oxide') return 'border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-slate-900';
                    if (r.type === 'salt') return 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 text-slate-900';
                    return 'border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-slate-900';
                  };

                  return (
                    <button
                      key={r.id}
                      onClick={() => handleSelectReagent(r.id)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer relative flex flex-col justify-between ${getBorderColor()}`}
                    >
                      <div className="font-mono text-base font-black tracking-wide">{r.label}</div>
                      <div className={`text-[10px] truncate mt-1 font-semibold ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                        {language === 'vi' ? r.name_vi : r.name_en}
                      </div>
                      {isA && (
                        <span className="absolute top-1.5 right-1.5 text-[9px] bg-white text-blue-900 px-1.5 py-0.5 rounded-full font-black shadow-xs">
                          #1
                        </span>
                      )}
                      {isB && (
                        <span className="absolute top-1.5 right-1.5 text-[9px] bg-white text-purple-900 px-1.5 py-0.5 rounded-full font-black shadow-xs">
                          #2
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Interactive Lab Instruments */}
          {activeTab === 'tools' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {/* Tool 1: Litmus */}
              <button
                onClick={handleDipLitmus}
                className="p-3.5 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl text-left hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <TestTube2 className="w-5 h-5 text-indigo-700 mb-1.5" />
                <div className="font-black text-xs text-indigo-950">Giấy quỳ tím</div>
                <div className="text-[10px] text-indigo-700 font-medium">Nhúng thử môi trường pH</div>
              </button>

              {/* Tool 2: Phenolphthalein */}
              <button
                onClick={handleAddPhenolphthalein}
                className="p-3.5 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl text-left hover:border-pink-400 hover:shadow-md transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <Droplet className="w-5 h-5 text-pink-600 mb-1.5" />
                <div className="font-black text-xs text-pink-950">Phenolphthalein</div>
                <div className="text-[10px] text-pink-700 font-medium">Nhỏ giọt hóa hồng kiềm</div>
              </button>

              {/* Tool 3: Stirring rod */}
              <button
                onClick={handleStir}
                className="p-3.5 bg-gradient-to-br from-slate-50 to-cyan-50 border-2 border-slate-200 rounded-2xl text-left hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <RefreshCw className={`w-5 h-5 text-cyan-700 mb-1.5 ${isStirring ? 'animate-spin' : ''}`} />
                <div className="font-black text-xs text-slate-900">Đũa khuấy thủy tinh</div>
                <div className="text-[10px] text-slate-600 font-medium">Hòa tan đều dung dịch</div>
              </button>

              {/* Tool 4: Bunsen Burner */}
              <button
                onClick={handleToggleBurner}
                className={`p-3.5 border-2 rounded-2xl text-left transition-all cursor-pointer shadow-xs active:scale-98 ${
                  burnerActive
                    ? 'bg-gradient-to-br from-orange-500 to-rose-600 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 text-orange-950 hover:border-orange-400'
                }`}
              >
                <Flame className={`w-5 h-5 mb-1.5 ${burnerActive ? 'text-yellow-200 animate-bounce' : 'text-orange-600'}`} />
                <div className="font-black text-xs">Đèn cồn đun nhiệt</div>
                <div className={`text-[10px] font-medium ${burnerActive ? 'text-white/90' : 'text-orange-700'}`}>
                  {burnerActive ? 'Đang cháy rực lửa!' : 'Bật ngọn lửa đèn cồn'}
                </div>
              </button>

              {/* Tool 5: Glowing Wooden Splint */}
              <button
                onClick={handleTestSplint}
                className="p-3.5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl text-left hover:border-amber-400 hover:shadow-md transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <Sparkles className="w-5 h-5 text-amber-600 mb-1.5" />
                <div className="font-black text-xs text-amber-950">Que đóm thử khí</div>
                <div className="text-[10px] text-amber-700 font-medium">Kiểm tra tiếng nổ H₂/CO₂</div>
              </button>

              {/* Tool 6: Digital Thermometer */}
              <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl text-left shadow-xs">
                <Thermometer className="w-5 h-5 text-emerald-600 mb-1.5" />
                <div className="font-black text-xs text-emerald-950">Nhiệt kế điện tử</div>
                <div className="font-mono font-black text-sm text-emerald-800">{temperature}°C</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CENTRAL PROMINENT REACTION VIEWPORT (CHO MỘT CÁI BÌNH Ở GIỮA MÀN HÌNH) */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-black rounded-3xl p-6 sm:p-10 border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[530px] lab-glow">
        {/* Colorful Laboratory Particle Atmosphere in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Top Floating Reagents Badge with Vivid Glow */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 z-10 text-white text-xs pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="font-black text-slate-400 uppercase tracking-wider text-[11px]">{language === 'vi' ? 'Hóa chất trong bình:' : 'In flask:'}</span>
            <span className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-mono font-black text-sm text-white shadow-lg shadow-blue-500/30 border border-blue-400/50">
              {substanceA.formula}
            </span>
            <span className="text-amber-400 font-black text-base">+</span>
            <span className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-mono font-black text-sm text-white shadow-lg shadow-purple-500/30 border border-purple-400/50">
              {substanceB.formula}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 text-emerald-400 shadow-inner">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span className="font-black">{temperature}°C</span>
            </span>

            {litmusDipped && (
              <span className={`px-3 py-1.5 rounded-xl font-black text-xs shadow-md border ${getLitmusColor()}`}>
                Quỳ tím: {getLitmusColor().includes('rose') ? '🔴 Hóa Đỏ' : getLitmusColor().includes('blue') ? '🔵 Hóa Xanh' : '🟣 Giữ Tím'}
              </span>
            )}
          </div>
        </div>

        {/* Central Stage: Prominent Reaction Vessel */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          {/* Flame from Bunsen burner under vessel if active */}
          {burnerActive && (
            <div className="absolute -bottom-10 flex flex-col items-center z-0 animate-flame-flicker">
              <div className="w-10 h-16 bg-gradient-to-t from-orange-600 via-amber-400 to-transparent rounded-full blur-xs opacity-95"></div>
              <div className="w-16 h-5 bg-slate-700 rounded-t-xl border border-slate-600 shadow-lg"></div>
            </div>
          )}

          {/* Dropper Pouring Liquid Animation */}
          {isReacting && (
            <div className="absolute -top-14 z-30 flex flex-col items-center animate-bounce duration-300">
              <div className="w-6 h-20 bg-white/30 backdrop-blur-md rounded-t-sm border border-white/60 shadow-xl"></div>
              <div className="w-3 h-10 bg-cyan-400 rounded-b-full shadow-cyan-400/80 shadow-lg"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-300 mt-2 animate-ping"></div>
            </div>
          )}

          {/* Fire / Violent Explosion & Sparks effect (Sodium Na or Potassium K or splint test) */}
          {isMixed && (isSodiumExplosion || isPotassiumLilac || splintTested) && (
            <div className="absolute -top-20 z-30 flex flex-col items-center">
              <div className="text-5xl animate-bounce">
                {isPotassiumLilac ? '💜 💥 ⚡' : '💥 🔥 ⚡'}
              </div>
              <div className={`w-28 h-28 rounded-full blur-xl animate-ping ${isPotassiumLilac ? 'bg-purple-500/50' : 'bg-orange-500/50'}`}></div>
            </div>
          )}

          {/* Golden Rain Shimmering Falling Crystals (PbI₂ Golden Rain Experiment) */}
          {isGoldenRain && (
            <div className="absolute -top-8 inset-x-0 z-30 flex justify-around pointer-events-none">
              <span className="text-yellow-300 text-xl animate-gold-shimmer">✨</span>
              <span className="text-amber-300 text-2xl animate-gold-shimmer delay-100">⭐</span>
              <span className="text-yellow-400 text-xl animate-gold-shimmer delay-200">✨</span>
              <span className="text-yellow-200 text-lg animate-gold-shimmer delay-300">⭐</span>
            </div>
          )}

          {/* Litmus Strip Dipped Directly into Fluid */}
          {litmusDipped && (
            <div className="absolute top-2 z-20 w-4 h-32 rounded-sm border border-white/50 shadow-lg flex flex-col justify-end overflow-hidden">
              <div className="h-16 bg-purple-400 w-full"></div>
              <div className={`h-16 w-full ${getLitmusColor()}`}></div>
            </div>
          )}

          {/* Main Reaction Flask / Vessel in Center */}
          <div
            className={`relative border-4 border-white/50 bg-white/5 backdrop-blur-md flex flex-col justify-end p-2.5 overflow-hidden shadow-2xl transition-all duration-700 ${
              vesselType === 'flask'
                ? 'w-60 h-76 rounded-b-[70px] rounded-t-xl' // Conical Erlenmeyer flask
                : vesselType === 'beaker'
                ? 'w-52 h-68 rounded-b-3xl rounded-t-md' // Beaker shape
                : 'w-32 h-68 rounded-b-full rounded-t-sm' // Test tube
            }`}
          >
            {/* Graduated markings */}
            <div className="absolute top-10 left-3 flex flex-col gap-6 text-[9px] font-mono text-white/40 select-none pointer-events-none">
              <span>- 150ml</span>
              <span>- 100ml</span>
              <span>- 50ml</span>
              <span>- 25ml</span>
            </div>

            {/* Specular glass reflection bar */}
            <div className="absolute inset-y-0 left-5 w-2.5 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-full pointer-events-none"></div>

            {/* Liquid Level & Dynamic Colors */}
            <div
              className={`w-full rounded-b-[60px] transition-all duration-1000 relative flex flex-col justify-end overflow-hidden ${
                isMixed
                  ? phenolphthaleinAdded && (matchedReaction?.id === 'R08' || matchedReaction?.id === 'R10' || matchedReaction?.id === 'R18' || substanceA.class === 'base')
                    ? 'h-52 bg-gradient-to-t from-fuchsia-600 via-pink-600 to-purple-500' // Vivid Magenta in Base
                    : isGoldenRain
                    ? 'h-52 bg-gradient-to-t from-amber-400 via-yellow-400 to-yellow-200' // Golden Rain PbI2
                    : matchedReaction?.expected_evidence.includes('precipitate')
                    ? matchedReaction.id === 'R10' || matchedReaction.id === 'R37'
                      ? 'h-52 bg-gradient-to-t from-sky-400 via-blue-600 to-blue-400' // Cu(OH)2 Blue
                      : matchedReaction.id === 'R18'
                      ? 'h-52 bg-gradient-to-t from-amber-950 via-red-900 to-amber-900' // Fe(OH)3 Red-brown
                      : matchedReaction.id === 'R36'
                      ? 'h-52 bg-gradient-to-t from-emerald-100 via-green-200 to-slate-200' // Fe(OH)2 White-green
                      : 'h-52 bg-gradient-to-t from-slate-100 via-slate-200 to-white/70' // BaSO4 / AgCl / CaCO3 White
                    : matchedReaction?.expected_evidence.includes('color_change')
                    ? matchedReaction.id === 'R17' || matchedReaction.id === 'R26'
                      ? 'h-52 bg-gradient-to-t from-emerald-400 to-teal-300' // FeCl2 / FeSO4 pale green
                      : 'h-52 bg-gradient-to-t from-emerald-600 to-teal-400'
                    : 'h-52 bg-gradient-to-t from-cyan-600/70 to-blue-300/50'
                  : 'h-28 bg-gradient-to-t from-blue-600/50 to-cyan-300/40'
              } ${isStirring ? 'scale-y-95 duration-100' : ''}`}
            >
              {/* Meniscus wave */}
              <div className="absolute top-0 inset-x-0 h-4 bg-white/40 rounded-full blur-2xs"></div>

              {/* Sủi bọt khí (Bubbles) Rising Animation */}
              {isMixed && matchedReaction?.expected_evidence.includes('gas') && (
                <div className="absolute inset-0 flex justify-around items-end pb-4 overflow-hidden pointer-events-none">
                  <span className="w-4 h-4 bg-white/95 rounded-full animate-bubble-1 shadow-md"></span>
                  <span className="w-5 h-5 bg-white/95 rounded-full animate-bubble-2 shadow-md"></span>
                  <span className="w-3.5 h-3.5 bg-white/95 rounded-full animate-bubble-3 shadow-md"></span>
                  <span className="w-4.5 h-4.5 bg-white/95 rounded-full animate-bubble-4 shadow-md"></span>
                </div>
              )}

              {/* Golden Rain Sparkle flecks inside solution */}
              {isGoldenRain && (
                <div className="absolute inset-0 flex flex-wrap justify-around items-center p-2 pointer-events-none">
                  <span className="text-yellow-100 text-sm animate-gold-shimmer">✨</span>
                  <span className="text-yellow-200 text-base animate-gold-shimmer delay-100">✨</span>
                  <span className="text-amber-100 text-xs animate-gold-shimmer delay-200">✨</span>
                  <span className="text-yellow-300 text-sm animate-gold-shimmer delay-300">✨</span>
                </div>
              )}

              {/* Solid Precipitate Clustered at Bottom */}
              {isMixed && matchedReaction?.expected_evidence.includes('precipitate') && (
                <div className="w-full flex flex-col items-center pb-3">
                  <div
                    className={`w-40 h-14 rounded-b-3xl shadow-2xl flex items-center justify-center font-black text-xs text-center p-1 border ${
                      matchedReaction.id === 'R10' || matchedReaction.id === 'R37'
                        ? 'bg-sky-400 text-sky-950 border-sky-300'
                        : matchedReaction.id === 'R18'
                        ? 'bg-amber-950 text-amber-100 border-amber-800'
                        : matchedReaction.id === 'R36'
                        ? 'bg-emerald-200 text-emerald-950 border-emerald-300'
                        : isGoldenRain
                        ? 'bg-yellow-400 text-yellow-950 border-yellow-200 shadow-yellow-400/60'
                        : 'bg-white text-slate-900 border-slate-200'
                    }`}
                  >
                    <span>
                      {matchedReaction.id === 'R10' && 'Cu(OH)₂↓ (Xanh lam)'}
                      {matchedReaction.id === 'R37' && 'Cu(OH)₂↓ (Xanh lam)'}
                      {matchedReaction.id === 'R11' && 'BaSO₄↓ (Trắng sữa)'}
                      {matchedReaction.id === 'R33' && 'BaSO₄↓ (Trắng sữa)'}
                      {matchedReaction.id === 'R07' && 'CaCO₃↓ (Nước vôi đục)'}
                      {matchedReaction.id === 'R15' && 'AgCl↓ (Vón trắng)'}
                      {matchedReaction.id === 'R34' && 'AgCl↓ (Vón trắng)'}
                      {matchedReaction.id === 'R18' && 'Fe(OH)₃↓ (Nâu đỏ)'}
                      {matchedReaction.id === 'R36' && 'Fe(OH)₂↓ (Trắng xanh)'}
                      {isGoldenRain && 'PbI₂↓ (Mưa vàng lấp lánh)'}
                    </span>
                  </div>
                </div>
              )}

              {/* Metal piece with copper coating */}
              {isMixed && matchedReaction?.expected_evidence.includes('metal_displacement') && (
                <div className="flex flex-col items-center pb-3">
                  <div className="w-24 h-16 bg-gradient-to-b from-amber-600 to-red-600 border-2 border-amber-300 rounded-xl shadow-2xl flex items-center justify-center text-[10px] font-black text-white text-center p-1">
                    Lớp Cu đỏ cam bám ngoài
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls: Predict & Start Reaction */}
        {!isMixed ? (
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-5 text-white space-y-3.5 z-10 shadow-xl">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{language === 'vi' ? 'Dự đoán hiện tượng trước khi trộn:' : 'Predict observation before mixing:'}</span>
              </span>
              <span className="text-slate-300 text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full">
                (Đoán trúng có pháo hoa & vỗ tay! 👏)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserPrediction('gas');
                }}
                className={`p-2.5 rounded-xl font-black border transition-all cursor-pointer ${
                  userPrediction === 'gas' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 scale-102' 
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
              >
                🫧 Sủi bọt khí (Gas)
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserPrediction('precipitate');
                }}
                className={`p-2.5 rounded-xl font-black border transition-all cursor-pointer ${
                  userPrediction === 'precipitate' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 scale-102' 
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
              >
                🧪 Xuất hiện kết tủa
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserPrediction('neutralization');
                }}
                className={`p-2.5 rounded-xl font-black border transition-all cursor-pointer ${
                  userPrediction === 'neutralization' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 scale-102' 
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
              >
                🌡️ Trung hòa / Tỏa nhiệt
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserPrediction('color_change');
                }}
                className={`p-2.5 rounded-xl font-black border transition-all cursor-pointer ${
                  userPrediction === 'color_change' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 scale-102' 
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
              >
                🎨 Đổi màu dung dịch
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserPrediction('metal_displacement');
                }}
                className={`p-2.5 rounded-xl font-black border transition-all cursor-pointer ${
                  userPrediction === 'metal_displacement' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 scale-102' 
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
              >
                🪙 Kim loại bám ngoài
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setUserPrediction('no_net_ionic_reaction');
                }}
                className={`p-2.5 rounded-xl font-black border transition-all cursor-pointer ${
                  userPrediction === 'no_net_ionic_reaction' 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 scale-102' 
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
              >
                ⚪ Không có phản ứng
              </button>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleStartReaction}
                disabled={isReacting}
                className="flex items-center gap-2.5 px-7 py-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-black rounded-2xl text-xs transition-transform active:scale-95 cursor-pointer shadow-xl shadow-teal-500/30 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{language === 'vi' ? 'Tiến hành trộn hóa chất vào bình' : 'Pour into flask'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Bottom Announcement when reaction has occurred */
          <div className="w-full max-w-2xl bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-4 sm:p-5 text-white flex items-center justify-between z-10 text-xs shadow-xl">
            <div className="flex items-center gap-3">
              {isPredictionCorrect ? (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg">
                  ✓
                </div>
              ) : (
                <Sparkles className="w-8 h-8 text-amber-400" />
              )}
              <div>
                <span className="font-black text-base block">
                  {isPredictionCorrect ? 'Dự đoán chính xác! 👏 🎉' : 'Phản ứng đã diễn ra xong!'}
                </span>
                <span className="text-slate-300 text-[11px] font-medium">
                  {language === 'vi' ? 'Xem phương trình hóa học và phân tích chi tiết bên dưới' : 'See balanced chemical equation below'}
                </span>
              </div>
            </div>

            <button
              onClick={handleResetExperiment}
              className="px-5 py-2.5 bg-white text-slate-900 font-black rounded-xl text-xs hover:bg-slate-100 transition-all cursor-pointer shadow-md active:scale-95"
            >
              Làm lại mẫu mới
            </button>
          </div>
        )}
      </div>

      {/* REACTION SCIENTIFIC RESULTS & BALANCED EQUATION (PTHH) */}
      {isMixed && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-md space-y-4 animate-fadeIn">
          {!matchedReaction ? (
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl text-amber-950 text-xs space-y-1.5">
              <div className="font-black text-sm flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>{t.noVerifiedRule}</span>
              </div>
              <p className="leading-relaxed font-medium">
                {language === 'vi'
                  ? 'Tổ hợp này chưa nằm trong 38 phản ứng mẫu của chương trình KHTN 8. Hệ thống bảo đảm tính khoa học chuẩn xác, không tự ý suy diễn ngoài sách giáo khoa.'
                  : 'No verified reaction in curriculum scope.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Highlighted Balanced Chemical Equation (PTHH) with Gradient Background */}
              <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl shadow-xs">
                <span className="text-xs font-black text-indigo-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'vi' ? 'Phương trình hóa học (PTHH đã cân bằng):' : 'Balanced Chemical Equation:'}</span>
                </span>
                <div className="font-mono text-base sm:text-xl font-black text-slate-950 tracking-wide bg-white p-4 rounded-xl border-2 border-indigo-200 shadow-sm overflow-x-auto">
                  {matchedReaction.equation_balanced}
                </div>
              </div>

              {/* Observation vs Explanation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Observation ("What I Saw") */}
                <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>{t.whatISaw}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {language === 'vi' ? matchedReaction.observation_vi : matchedReaction.observation_en}
                  </p>
                </div>

                {/* Explanation ("What It Means") */}
                <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-2">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{t.whatItMeans}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {language === 'vi' ? matchedReaction.explanation_vi : matchedReaction.explanation_en}
                  </p>
                </div>
              </div>

              {/* Ion breakdown */}
              {matchedReaction.key_ions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-4 bg-blue-50/80 rounded-2xl border-2 border-blue-200">
                    <span className="font-black text-blue-900 block uppercase tracking-wider text-[11px]">{t.activeIons}</span>
                    <span className="font-mono text-slate-950 font-black mt-1.5 block text-sm">
                      {matchedReaction.key_ions.reacting.join(' + ')} → {matchedReaction.key_ions.productFormed}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200">
                    <span className="font-black text-slate-600 block uppercase tracking-wider text-[11px]">{t.spectatorIons}</span>
                    <span className="font-mono text-slate-700 font-extrabold mt-1.5 block text-sm">
                      {matchedReaction.key_ions.spectator.length > 0
                        ? matchedReaction.key_ions.spectator.join(', ')
                        : (language === 'vi' ? 'Không có (Tất cả ion tham gia phản ứng)' : 'None')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
