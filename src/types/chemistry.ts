export type SubstanceClass = 'acid' | 'base' | 'oxide' | 'salt';

export type OxideType = 'acid_oxide' | 'basic_oxide' | 'amphoteric_oxide' | 'neutral_oxide';

export interface Substance {
  id: string;
  formula: string;
  name_vi: string;
  name_en: string;
  class: SubstanceClass;
  oxideType?: OxideType;
  state_default: 'aq' | 's' | 'l' | 'g';
  color_vi: string;
  color_en: string;
  explanation_vi: string;
  explanation_en: string;
  ions_or_constituents: string[];
  ph_approx?: number;
  grade_scope: 'core' | 'extension';
  why_vi: string;
  why_en: string;
}

export interface Ion {
  id: string;
  symbol: string;
  name_vi: string;
  name_en: string;
  charge: number; // e.g. +1, +2, -1, -2
  valencyRoman: 'I' | 'II' | 'III';
  type: 'cation' | 'anion';
  isPolyatomic: boolean;
  baseGroup?: string; // e.g. "OH", "SO4", "NO3"
}

export type SolubilityStatus = 'S' | 'I' | 'SS' | '-'; // S: soluble, I: insoluble, SS: slightly soluble, -: unstable/decomposes

export interface SolubilityRuleEntry {
  cationId: string;
  anionId: string;
  status: SolubilityStatus;
  color_vi?: string;
  color_en?: string;
  note_vi?: string;
  note_en?: string;
  isPrecipitate: boolean;
}

export type ReactionEvidence = 
  | 'precipitate'
  | 'gas'
  | 'neutralization'
  | 'color_change'
  | 'metal_displacement'
  | 'no_net_ionic_reaction'
  | 'solid_dissolved';

export interface ReactionRecord {
  id: string;
  name_vi: string;
  name_en: string;
  reactants: string[]; // substance IDs
  products: string[]; // substance IDs or formulas
  conditions_vi?: string;
  conditions_en?: string;
  equation_unbalanced: string;
  equation_balanced: string;
  reaction_type: 'metal_acid' | 'acid_base' | 'acid_basic_oxide' | 'acid_carbonate' | 'acid_oxide_base' | 'metal_salt' | 'salt_base' | 'salt_salt' | 'salt_acid' | 'no_reaction';
  expected_evidence: ReactionEvidence[];
  observation_vi: string;
  observation_en: string;
  explanation_vi: string;
  explanation_en: string;
  particle_animation_type: 'gas_bubbles' | 'precipitate_lattice' | 'neutralization_water' | 'metal_plating' | 'dissolving' | 'ions_remain_dispersed';
  key_ions: {
    reacting: string[];
    spectator: string[];
    productFormed: string;
  };
  grade_scope: 'core' | 'extension';
  applicability_limits_vi?: string;
  applicability_limits_en?: string;
}

export interface Misconception {
  id: string;
  title_vi: string;
  title_en: string;
  example_error_vi: string;
  example_error_en: string;
  feedback_vi: string;
  feedback_en: string;
}

export type LearningObjective = 'classification' | 'valency_formula' | 'solubility' | 'reaction_prediction' | 'lab_reasoning';

export interface ReviewQuestion {
  id: string;
  objective: LearningObjective;
  misconceptionId?: string;
  question_vi: string;
  question_en: string;
  options_vi: string[];
  options_en: string[];
  correctIndex: number;
  explanation_vi: string;
  explanation_en: string;
  hint_vi: string;
  hint_en: string;
}

export interface TestCaseResult {
  id: string;
  description_vi: string;
  description_en: string;
  expected: string;
  actual: string;
  status: 'PASS' | 'FAIL' | 'BLOCKED' | 'NOT RUN';
  details?: string;
}
