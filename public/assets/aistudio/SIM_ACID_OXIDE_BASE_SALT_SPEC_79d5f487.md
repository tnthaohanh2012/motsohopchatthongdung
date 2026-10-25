# SIM_ACID_OXIDE_BASE_SALT_SPEC.md
## SimBot — Interactive Chemistry Simulation for Grade 8 (KHTN 8, Kết nối tri thức)

**Artifact status:** Drafted from the uploaded scanned textbook and supporting chemistry references; source pages visually inspected.  
**Primary deliverable:** One self-contained `index.html` that works offline in a desktop browser.  
**Technical artifact language:** English.  
**Learner-facing languages:** Vietnamese and English; Vietnamese is the default.  
**Target session:** 15–20 minutes.  
**Topic:** Grade 8 KHTN, Lessons 8–11 — Acid; Base and pH; Oxide; Salt.  
**Network/API dependency:** None for the offline application.  
**Evidence labels:** `TEXTBOOK` = visible in uploaded SGK; `EXTERNAL` = checked against cited chemistry references; `DESIGN` = product design choice; `INFERENCE` = likely learning need inferred from the confirmed Table 2.

---

## 1. Project state and non-negotiable decisions

```yaml
project:
  name: "SimBot — Acid, Oxide, Base, Salt"
  subject: "KHTN 8 / Chemistry"
  grade: 8
  curriculum: "Kết nối tri thức với cuộc sống"
  lessons: [8, 9, 10, 11]
  session_minutes: "15-20"
  deployment_primary: "single self-contained index.html; offline"
  learner_languages: ["vi", "en"]
  default_language: "vi"
  particle_model: ["formula-building", "particle-and-ion-model"]
  reaction_scope: "expanded, but every reaction must be validated"
  teacher_observations: "Not provided"
  student_voice:
    evidence: "Student feedback supplied in project intake"
    statements:
      - "Difficulty remembering valencies of acid radicals"
      - "Difficulty presenting reaction products/results"
  no_wifi_required: true
```

### 1.1 Confirmed learning objectives
By the end of the activity, a learner should be able to:
1. Classify common substances as acid, base, oxide, or salt.
2. Construct simple chemical formulas using element/ion valencies, including `OH⁻` and the acid radicals listed in the textbook.
3. Use the textbook's simplified solubility table to predict whether a salt or hydroxide is soluble and whether a precipitate is expected.
4. Predict products for supported reaction patterns and balance the equations.
5. Carry out a guided virtual-lab sequence: predict → mix/select conditions → observe → explain → write the equation.
6. Explain observations such as colour change, gas formation, and precipitate formation using the displayed particle/ion model.

### 1.2 Learning difficulties to address
- Confusing acid, oxide, base, and salt.
- Confusing names, formulae, and substance classes.
- Remembering valencies of elements and acid radicals.
- Predicting products and completing equations.
- Deciding which ionic combinations produce a precipitate.
- Connecting visible observations to chemical explanations.
- Limited access to hands-on experimentation.  
These are design inputs from the confirmed project brief; they are not claims that every learner has the same difficulty.

---

## 2. Source basis and evidence boundaries

### 2.1 Uploaded textbook
**Source:** User-uploaded `SGK KHTN 8 KNTT.pdf`, scanned-image PDF. Relevant printed textbook pages were inspected visually; the file did not provide a reliable full-text layer.

| Printed page | Lesson/content observed | How the SPEC uses it |
|---|---|---|
| 35–38 | Lesson 8: Acid — acid definition, `H⁺`, acid radicals, acid reactions, common acids and uses | Core classification, acid formula recognition, safe virtual reactions |
| 39–43 | Lesson 9: Base and pH — hydroxide group, naming, solubility examples, acid/base reaction, pH scale | Base classification, `OH⁻`, pH and neutralisation activities |
| 44–47 | Lesson 10: Oxide — definition, naming, oxide classes, acid/base oxide reactions | Oxide classification and reaction-pattern activities |
| 48–52 | Lesson 11: Salt — salt formula/name, acid radicals, solubility table, chemical properties, preparation, relation among inorganic compounds | Salt formula building, solubility prediction, precipitation and reaction lab |

**Textbook alignment rules**
- Keep Grade 8 vocabulary and lesson scope as the primary learning path.
- Use the textbook's `H⁺` notation for the introductory acid model, while explaining that the displayed particles are a simplified teaching model.
- The textbook's solubility table is the learner-facing authority for the required core activity. Any expanded rule must be marked as an extension and checked against a reliable chemistry source.
- The simulation must not claim that a phenomenon, equation, condition, or quantitative value came from the textbook if it was added by the designer.
- The source PDF is scanned. The pages above were visually reviewed, but fine-print transcription of every cell in the solubility table is not asserted. The implementation should encode a verified, explicit subset and label its scope.

### 2.2 External chemistry references checked
1. **OpenStax, Chemistry 2e, “4.2 Classifying Chemical Reactions.”** Explains precipitation, acid–base reactions, solubility rules, and examples of molecular/net ionic equations.  
   https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions
2. **OpenStax, Chemistry 2e, “15.1 Precipitation and Dissolution.”** Provides ion-level dissolution and precipitation examples, including `BaSO₄`, `AgCl`, and hydroxides.  
   https://openstax.org/books/chemistry-2e/pages/15-1-precipitation-and-dissolution
3. **Royal Society of Chemistry Education, “How to teach acids and bases.”** Discusses particle explanations for acid/alkali behaviour and neutralisation; useful pedagogical context.  
   https://edu.rsc.org/cpd/acids-and-bases/2000001.article
4. **Chemistry LibreTexts, “Precipitation and Solubility Rules.”** Cross-check for common ionic-compound solubility patterns and exceptions.  
   https://chem.libretexts.org/Bookshelves/General_Chemistry/Book%3A_General_Chemistry%3A_Principles_Patterns_and_Applications_%28Averill%29/04%3A_Reactions_in_Aqueous_Solution/4.05%3A_Precipitation_Reactions

These sources support the general reaction/solubility model. They do not replace the uploaded textbook as the Grade 8 curriculum scope.

---

## 3. Product concept and learning flow

Build an interactive virtual chemistry workbench, not a passive dashboard. The simulation workspace should occupy at least 60% of the main viewport on desktop. Keep controls compact and provide a clear experiment/result area.

### 3.1 Main navigation
1. **Classify / Phân loại**
2. **Valency & Formula / Hóa trị và công thức**
3. **Solubility / Độ tan**
4. **Reaction Lab / Phòng thí nghiệm phản ứng**
5. **Review / Ôn tập**

A learner can complete the recommended 15–20 minute path without visiting every optional extension.

### 3.2 Suggested 15–20 minute lesson path
- 2 minutes — classify 6 example substances.
- 3 minutes — build 3 formulae from cation/anion or element/valency cards.
- 3 minutes — predict solubility for selected salts/hydroxides.
- 6–8 minutes — complete 2–3 guided reactions, with prediction before reveal.
- 2–3 minutes — answer a short mixed review and see misconceptions to revisit.

This timing is a design estimate, not a textbook claim.

### 3.3 Core interaction loop
**Choose substances → make a prediction → perform a virtual action → observe → inspect particle model → write/balance equation → receive feedback → save evidence of learning.**

Every activity must capture at least one meaningful learner action and provide actionable feedback.

---

## 4. Required functional modules

### 4.1 Module A — Classify substances
- Drag a substance card into Acid, Base, Oxide, or Salt.
- Each card shows name, formula, class, and a “Why?” explanation after submission.
- Provide examples spanning all four groups, with familiar Grade 8 compounds first.
- Allow a learner to reveal the formula only after making an initial classification, to avoid turning every question into a lookup.
- Feedback must distinguish a rule from an example; do not imply that every compound containing hydrogen is an acid or that every oxygen-containing compound is an oxide.

**Initial verified substance bank**
- Acids: hydrochloric acid `HCl`, nitric acid `HNO₃`, sulfuric acid `H₂SO₄`, acetic acid `CH₃COOH`.
- Bases: sodium hydroxide `NaOH`, calcium hydroxide `Ca(OH)₂`, copper(II) hydroxide `Cu(OH)₂`, iron(II) hydroxide `Fe(OH)₂`.
- Oxides: calcium oxide `CaO`, copper(II) oxide `CuO`, carbon dioxide `CO₂`, sulfur dioxide `SO₂`, zinc oxide `ZnO`, aluminium oxide `Al₂O₃`, carbon monoxide `CO`.
- Salts: sodium chloride `NaCl`, copper(II) sulfate `CuSO₄`, calcium carbonate `CaCO₃`, barium chloride `BaCl₂`, sodium sulfate `Na₂SO₄`, zinc chloride `ZnCl₂`, ammonium chloride `NH₄Cl`.

All examples must be stored as data records, not duplicated hard-coded UI text.

### 4.2 Module B — Valency and formula builder
- Provide element/ion/group tiles with charge or valency.
- Let learners combine tiles to make a neutral formula.
- Support parentheses when a polyatomic group is repeated, e.g. `Ca(OH)₂`, `Al₂(SO₄)₃`, `Ca₃(PO₄)₂`.
- Include at minimum the acid radicals visible in the textbook:
  - chloride `Cl⁻`
  - bromide `Br⁻`
  - iodide `I⁻`
  - nitrate `NO₃⁻`
  - sulfate `SO₄²⁻`
  - hydrogensulfate `HSO₄⁻`
  - sulfite `SO₃²⁻`
  - acetate `CH₃COO⁻`
  - sulfide `S²⁻`
  - carbonate `CO₃²⁻`
  - hydrogencarbonate `HCO₃⁻`
  - phosphate `PO₄³⁻`
  - hydrogenphosphate `HPO₄²⁻`
  - dihydrogenphosphate `H₂PO₄⁻`
- Include hydroxide `OH⁻` and ammonium `NH₄⁺`.
- Give hints in stages: identify charges → find the smallest whole-number ratio → add parentheses if a group repeats → verify total charge is zero.
- Formula validation must be based on charge balance and a vetted allowed-ion list, not string guessing.
- Provide both “build by charge” and “build by valency” modes, with wording suitable for Grade 8.
- The app must not teach a wrong formula merely because a charge ratio is mathematically possible; every generated compound must also pass the configured chemical-data allowlist.

### 4.3 Module C — Solubility and precipitation predictor
- Learner selects one or two aqueous substances, predicts soluble/insoluble products, then reveals the result.
- Display the relevant cation/anion pairing and the rule used.
- Use distinct states:
  - `dissolved`: represented by separated hydrated ions in a simplified model;
  - `precipitate`: represented by solid particles settling/collecting;
  - `gas`: shown only for verified gas-producing reactions;
  - `no net ionic reaction`: no precipitate/gas/weakly ionised product is predicted under the activity's stated conditions.
- Do not equate “two solutions were mixed” with “a reaction definitely occurred.”
- Label all aqueous-state predictions as applying to the activity's assumed ordinary classroom conditions and concentrations.
- If a prediction depends on concentration or special conditions not modeled, show “outside this model” instead of fabricating a definitive outcome.

**Core simplified rules**
- All nitrate salts in the configured core set are soluble.
- Sodium and potassium salts in the configured core set are soluble.
- Most chlorides in the configured set are soluble; include explicitly configured exceptions such as `AgCl` only in the extension set.
- Sulfates may have important exceptions; encode each listed salt explicitly rather than extrapolating from an incomplete rule.
- Most carbonates and phosphates in the configured core set are insoluble except alkali-metal/ammonium salts; encode the allowed examples explicitly.
- Many metal hydroxides are insoluble; `NaOH` is soluble, and `Ca(OH)₂` is treated according to the textbook's stated level/table and the chosen simulation task.
- Never implement a vague “all other compounds” fallback as scientifically certain. Unknown combinations must return `Not configured / Chưa có dữ liệu đã kiểm chứng`.

### 4.4 Module D — Reaction lab
- A virtual bench with selectable test tubes/beakers, droppers, reagent bottles, stir action, and reset.
- Reagents are data-driven and limited to the verified reaction bank.
- Before mixing, ask for the predicted observation and product class.
- After mixing, show only evidence supported by the selected reaction record: precipitate, gas bubbles, colour change, neutralisation/product, or “no visible change in this model.”
- Provide a molecular equation, balanced equation, and a simplified particle/ion view when appropriate.
- Provide a “Show explanation” action, not an automatic wall of text.
- Keep observation separate from interpretation. Example: “a blue solid appears” is the observation; “copper(II) hydroxide precipitate forms” is the explanation.
- No physical chemical handling is requested; this is a virtual lab. Include a reminder that real lab experiments require teacher supervision and real laboratory safety rules.

### 4.5 Module E — Review and progress
- 8–12 short mixed questions for a full run; offer a 3-question quick check.
- Question types: classification, valency/formula, solubility, predict products, balance equation, interpret observation.
- Score by objective rather than only one total score.
- Show: correct answers, misconception tags, attempts, hint use, and one recommended next practice.
- Do not shame the learner or use punitive language.
- Persist progress in memory only during the current page session; local persistence is optional and must not be required for offline operation.

---

## 5. Scientific content model

### 5.1 Canonical data record schema
Use a single source of truth for each substance and reaction. Suggested structures:

```js
substances: [{
  id, name_vi, name_en, formula, class,
  ions_or_constituents, state_default, solubility_tag,
  valency_or_charge, source_tags, grade_scope, notes
}]

reactions: [{
  id, reactants, conditions, products,
  equation_unbalanced, equation_balanced,
  reaction_type, expected_observations,
  particle_model, applicability_limits,
  feedback_rules, source_tags, confidence
}]
```

Use stable IDs. Every reaction needs balanced atom counts and, where ionic species are shown, charge conservation.

### 5.2 Core reaction bank — verified equations
The following equations are a starting allowlist. The implementation team must programmatically check atom balance and manually review states/observations before release.

| ID | Pattern | Balanced equation | Expected evidence |
|---|---|---|---|
| R01 | Metal + acid | `Mg + 2HCl → MgCl₂ + H₂↑` | Gas bubbles; magnesium consumed |
| R02 | Acid + base | `HCl + NaOH → NaCl + H₂O` | Neutralisation; no precipitate expected |
| R03 | Acid + base | `H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O` | Neutralisation; calcium sulfate has limited solubility, so state/concentration should be qualified |
| R04 | Acid + basic oxide | `CuO + H₂SO₄ → CuSO₄ + H₂O` | Black CuO solid decreases; blue copper sulfate solution may form |
| R05 | Acid + basic oxide | `Fe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O` | Iron(III) oxide solid decreases; avoid overpromising exact solution colour |
| R06 | Acid + carbonate | `CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O` | Gas bubbles; solid carbonate consumed |
| R07 | Acid oxide + base | `CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O` | White precipitate/cloudiness; valid for limewater test under suitable conditions |
| R08 | Acid oxide + base | `CO₂ + 2NaOH → Na₂CO₃ + H₂O` | No precipitate expected for soluble sodium carbonate |
| R09 | Metal + salt | `Zn + CuSO₄ → ZnSO₄ + Cu` | Copper deposits on zinc; blue solution colour may fade |
| R10 | Salt + base | `CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄` | Blue precipitate |
| R11 | Salt + salt | `BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl` | White precipitate |
| R12 | Salt + acid | `CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O` | Gas bubbles; same verified reaction pattern as R06, used in a different task |
| R13 | Base + acid oxide | `2NaOH + SO₂ → Na₂SO₃ + H₂O` | No precipitate expected in this simplified soluble-product case; mark as extension |
| R14 | Acid + metal oxide | `CuO + 2HCl → CuCl₂ + H₂O` | Black solid decreases |
| R15 | Salt + salt (extension) | `AgNO₃ + NaCl → AgCl↓ + NaNO₃` | White precipitate; extension example supported by OpenStax solubility discussion |
| R16 | Salt + salt (no net ionic reaction) | `NaCl(aq) + KNO₃(aq) → no net ionic reaction` | No precipitate or gas predicted; ions remain in solution |

**Important implementation notes**
- R03 is not a simple “everything remains dissolved” case; do not promise a perfectly clear solution. If the app cannot model concentration-dependent precipitation, either exclude R03 from the first build or show a qualified note and avoid assigning a definite precipitate amount.
- R06 and R12 are the same chemistry and should share a single underlying reaction record with different instructional contexts.
- The “extension” label must be visible in the learner UI.
- Do not add unreviewed reactions by composing arbitrary pairs of substances at runtime.
- Use the reaction allowlist for prediction, observation, particle animation, equation display, and expected-value tests.
- Do not state that a reaction is instantaneous or complete unless the modeled conditions justify that claim.

### 5.3 Particle and ion models
- Formula-building mode: discrete ion/group tiles with charge labels, snapping together in a charge-balanced ratio.
- Dissolution mode: show a simple lattice or solid formula unit separating into ions when the compound is marked soluble.
- Precipitation mode: show the relevant ions coming together into a solid cluster; spectator ions remain separated in solution.
- Neutralisation mode: show `H⁺` and `OH⁻` forming water using the textbook's simplified model. Label the animation “schematic particle model.”
- Acid/base labels should not imply that every substance is fully ionised; where the model omits equilibrium/partial ionisation, state that the animation is simplified.
- Never change the number of atoms or charges during an animation. The visual model and equation must represent the same reaction record.

### 5.4 pH model
- Use a horizontal pH scale 0–14.
- Grade 8 categorical rules: pH < 7 acidic; pH = 7 neutral; pH > 7 basic/alkaline.
- Provide sample liquid categories only when appropriate; do not imply the pH values of everyday liquids are fixed across all products or concentrations.
- Do not simulate pH calculations from concentration unless the model and assumptions are explicitly specified. For the first build, the pH module is a scale-reading/classification activity, not a quantitative acid/base equilibrium solver.

### 5.5 Valency and formula checks
- A generated formula must satisfy charge neutrality.
- Polyatomic ions keep their internal atom counts unchanged.
- Add parentheses around a repeated polyatomic group.
- Reduce subscripts to the smallest whole-number ratio.
- Verify each formula against the approved substance/ion set.
- Do not infer chemical stability solely from valency arithmetic; if an unfamiliar combination is not in the allowlist, ask the learner to select a known compound instead of presenting it as a real substance.

---

## 6. Feedback and misconception model

Each feedback item must be bilingual and tied to a specific observable learner action.

| Misconception ID | Example error | Feedback strategy |
|---|---|---|
| M01 | Classifies `CO₂` as a salt because it contains two elements | Explain oxide definition: oxygen combined with one other element |
| M02 | Calls `NaOH` an acid | Point to the metal cation and hydroxide group `OH⁻` |
| M03 | Writes `CaOH₂` | Explain that the hydroxide group repeats, so use `Ca(OH)₂` |
| M04 | Writes a salt formula with non-neutral total charge | Display each ion's charge and ask for the smallest neutral ratio |
| M05 | Assumes every pair of aqueous salts reacts | Ask learner to inspect possible products and the solubility table |
| M06 | Labels a clear mixture as a precipitate | Separate “ions remain dissolved” from “insoluble solid forms” |
| M07 | Gives products but does not balance the equation | Show atom-count comparison, then request correction |
| M08 | Treats observation and explanation as identical | Display two fields: “What I saw” and “What it means” |
| M09 | Treats all oxides as acidic | Revisit acid/basic/amphoteric/neutral oxide categories at Grade 8 depth |
| M10 | Assumes every acid reacts identically with every metal | Restrict reaction claims to validated examples and stated conditions |

Feedback tone:
- First error: short hint.
- Second error: show a worked partial step.
- Repeated error: show the relevant rule and offer a simpler practice.
- Correct answer: concise explanation of why it is correct.
- No punitive or humiliating feedback.

---

## 7. Bilingual UI contract

The technical specification and code identifiers are in English; all learner-facing content must be available in Vietnamese and English.

### 7.1 Required behaviour
- Default locale: `vi`.
- Visible language selector: `Tiếng Việt` / `English`.
- Switching languages must preserve current activity, selected substances, answer, score, and progress.
- All controls, labels, hints, warnings, reaction observations, equations' accompanying explanations, feedback, accessibility labels, empty states, and review messages must be translated.
- Chemical symbols and equations remain unchanged.
- Do not translate formulae, ion charges, units, or chemical symbols.
- Missing translations must fail a QA test rather than silently falling back to English for the whole screen.

### 7.2 Dictionary structure
```js
const L = {
  vi: {
    appTitle: "SimBot: Phòng thí nghiệm hợp chất vô cơ",
    classify: "Phân loại",
    valency: "Hóa trị và công thức",
    solubility: "Độ tan",
    reactionLab: "Phòng thí nghiệm phản ứng",
    review: "Ôn tập",
    predictFirst: "Dự đoán trước khi trộn",
    showResult: "Hiện kết quả",
    reset: "Làm lại",
    observation: "Hiện tượng quan sát được",
    explanation: "Giải thích hóa học",
    equation: "Phương trình hóa học",
    particleModel: "Mô hình hạt (minh họa)",
    noVerifiedRule: "Chưa có dữ liệu đã kiểm chứng cho tổ hợp này."
  },
  en: {
    appTitle: "SimBot: Inorganic Compounds Lab",
    classify: "Classify",
    valency: "Valency and Formula",
    solubility: "Solubility",
    reactionLab: "Reaction Lab",
    review: "Review",
    predictFirst: "Predict before mixing",
    showResult: "Show result",
    reset: "Reset",
    observation: "Observed evidence",
    explanation: "Chemical explanation",
    equation: "Chemical equation",
    particleModel: "Particle model (schematic)",
    noVerifiedRule: "No verified data is configured for this combination."
  }
};
```
This is a minimum example, not the full dictionary. The implemented dictionary must cover every visible string.

---

## 8. UI, accessibility, and interaction requirements

### 8.1 Layout
- Desktop-first, responsive to a smaller viewport.
- Main simulation/workbench uses ≥60% of the primary workspace when practical.
- Suggested layout: left compact tool palette, central workbench, right result/explanation panel; on narrow screens stack panels.
- Use high contrast and consistent colour semantics, but never use colour alone to communicate class, charge, or reaction result.
- Provide text labels and symbols for precipitate, gas, and no visible reaction.

### 8.2 Controls
- Every visible control must work.
- Include `Reset experiment`, `Undo last action` where feasible, `Show hint`, `Show equation`, `Show particle model`, and `Change language`.
- Add zoom, fit-to-view, reset-view, and fullscreen/exit-fullscreen only if the central workspace is implemented as a pannable/zoomable canvas. If included, test them.
- View navigation must not alter chemical state. Moving the canvas must not accidentally drag a reagent or change the chosen substance.
- Support mouse and keyboard; use touch-friendly targets if touch is available.
- Do not add decorative or inert controls.

### 8.3 Accessibility
- Semantic headings and buttons.
- Keyboard-visible focus.
- Accessible names for drag/drop alternatives; provide click-to-select alternatives.
- Announce result changes with an accessible live region.
- Ensure information conveyed by colours is also stated in text.
- Respect reduced-motion preferences; allow animations to be skipped.

---

## 9. Offline technical architecture

### 9.1 Primary profile
- Deliver a single self-contained `index.html`.
- Inline CSS, JavaScript, translation dictionary, chemistry data, reaction data, and SVG/canvas drawings.
- No external libraries, CDN, fonts, remote API, network fetch, API keys, analytics, or service dependency.
- The page must work by opening the file directly in a modern desktop browser.
- Use relative/local assets only; preferred solution is no external assets at all.
- Avoid browser features that require a server or network.
- Do not store personal data. Keep activity progress in in-memory state; optional local storage must be documented and must not be necessary to run the app.
- Keep all chemistry data in a versioned object so the science can be reviewed separately from rendering.

### 9.2 State model
Minimum state:
```js
state = {
  language: "vi",
  activeModule: "classify",
  currentTaskId: null,
  selectedSubstances: [],
  prediction: null,
  observedResult: null,
  currentEquation: null,
  hintLevel: 0,
  attempts: 0,
  scoreByObjective: {},
  completedTaskIds: [],
  viewport: { zoom: 1, panX: 0, panY: 0, fullscreen: false }
}
```
Changing language or viewport must not reset scientific state. Resetting an experiment clears only the current experiment unless the learner explicitly chooses “Restart session.”

### 9.3 Optional Vercel handoff profile
Offline use is the primary requirement and does not require npm or a build step. If a separately hosted mirror is requested later, create and verify a static hosting configuration rather than claiming that it already exists. The V26 guide also requests a Vercel handoff block; for a hosted mirror, use and verify:
- **Root Directory:** `./` (the directory containing the hosting configuration)
- **Framework Preset:** Vite, only if a Vite wrapper/build is actually used
- **Install Command:** `npm ci`, only when a synchronized npm lockfile exists
- **Build Command:** `npm run build`, only when the package contains that verified script
- **Output Directory:** `dist`, only when the verified build creates it

Do not introduce Vite, React, or dependencies into the primary offline artifact without a real need. If the static single-file profile is used without a build system, mark the Vercel build fields as not applicable to that profile and do not claim a deployment has been verified. Any hosted profile must be checked independently.

---

## 10. Expected-value tests and QA gates

These are deterministic app acceptance cases, not claims of laboratory measurements.

| Test ID | Input/action | Expected result |
|---|---|---|
| T01 | Classify `HCl` | Acid |
| T02 | Classify `NaOH` | Base; contains hydroxide group |
| T03 | Classify `CO₂` | Oxide; specifically acid oxide in this curriculum model |
| T04 | Classify `NaCl` | Salt |
| T05 | Build calcium hydroxide from `Ca²⁺` and `OH⁻` | `Ca(OH)₂`; charge balance 0 |
| T06 | Build aluminium sulfate from `Al³⁺` and `SO₄²⁻` | `Al₂(SO₄)₃`; charge balance 0 |
| T07 | Build calcium phosphate from `Ca²⁺` and `PO₄³⁻` | `Ca₃(PO₄)₂`; charge balance 0 |
| T08 | Mix `CuSO₄(aq)` and `NaOH(aq)` | `Cu(OH)₂` blue precipitate + `Na₂SO₄(aq)`; balanced equation `CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄` |
| T09 | Mix `BaCl₂(aq)` and `Na₂SO₄(aq)` | `BaSO₄` white precipitate; balanced equation `BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl` |
| T10 | React `Mg` with dilute `HCl` in the model | `Mg + 2HCl → MgCl₂ + H₂↑`; gas bubbles |
| T11 | React `CaCO₃` with `HCl` | `CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O` |
| T12 | Pass `CO₂` into limewater in the configured standard test | `CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O`; cloudiness/white precipitate |
| T13 | Mix `NaCl(aq)` and `KNO₃(aq)` in the simplified aqueous model | No net ionic reaction; no precipitate/gas |
| T14 | Switch Vietnamese to English during a selected reaction | All visible strings switch; selected reagents, prediction, progress and score are unchanged |
| T15 | Reset current experiment | Current experiment resets; completed session progress remains unless “Restart session” was chosen |
| T16 | Try an unconfigured reagent pair | Show “No verified data is configured”; do not invent products |
| T17 | Validate every equation in reaction bank | Atom counts match on both sides; charge conservation checked where ionic |
| T18 | Open `index.html` with network disconnected | All core modules work without network requests |

### 10.1 Scientific acceptance gates
- No reaction can enter the final allowlist without balanced equation, expected observations, conditions/limitations, source tag, and reviewer status.
- Check atom balance automatically for every equation.
- Check total ionic charge for all ion/particle model states.
- Verify each precipitation outcome against the configured solubility data.
- Distinguish “precipitate forms,” “gas forms,” “neutralisation,” “dissolves,” and “no net ionic reaction.”
- Avoid overclaiming colour, reaction speed, or completeness when these depend on concentration, purity, or other conditions.
- A failed or unrun test must be marked `FAIL`, `BLOCKED`, or `NOT RUN`; never report `PASS` without evidence.

### 10.2 Pedagogical acceptance gates
- Each objective has at least two tasks.
- Every task follows predict → act → observe → reason → feedback.
- At least 8 misconception tags are implemented.
- Feedback is actionable and available in both languages.
- Learners can complete core tasks without needing a real laboratory or internet connection.
- Student-facing vocabulary is suitable for Grade 8.

### 10.3 Technical acceptance gates
- File opens locally without a blank screen or uncaught console error.
- No network requests are required for the offline profile.
- All visible controls are functional.
- Language switch preserves state.
- Reset behaviour is scoped and predictable.
- Keyboard interaction and a non-drag alternative exist.
- No claim of Vercel deployment, clean install, or production build unless actually performed.

---

## 11. Safety and scope limits
- This is a virtual simulation for learning, not a substitute for a real teacher-supervised laboratory.
- Do not provide real-world instructions for mixing hazardous chemicals or handling concentrated acids/bases.
- Do not model heat, pressure, or hazardous gas effects unless specifically necessary, validated, and presented safely.
- Reagent selection is limited to the vetted allowlist; arbitrary user-entered chemical combinations are not supported.
- Any future addition of a reagent or reaction requires source review and a new expected-value test.

---

## 12. Build prompt for Google AI Studio Build

Implement the application described in this specification as a polished, interactive, Grade 8 chemistry learning workbench. Treat this SPEC as the single source of truth. Do not remove learning objectives, reactions, scientific limits, bilingual behaviour, test cases, or accessibility requirements.

**Primary deployment target:** one self-contained `index.html` that runs by opening it directly in a modern desktop browser, offline. Inline CSS, JavaScript, SVG/canvas, all data, and all translations. No CDN, network fetch, external fonts, API, secrets, or mandatory dependencies.

Build these working modules:
1. Classify substances as acid, base, oxide, or salt.
2. Construct formulae using charges/valencies, polyatomic acid radicals, hydroxide `OH⁻`, parentheses, and charge neutrality.
3. Predict solubility and precipitate formation from an explicit verified data table.
4. Run a virtual reaction lab with prediction-first interaction, observable evidence, balanced equation, and a schematic particle/ion model.
5. Review learning by objective and show misconception-specific feedback.

Learner UI must be bilingual Vietnamese/English, default Vietnamese. Use a complete `L[lang]` dictionary and a visible language selector. Language switching must preserve activity state. Keep formulae, symbols, charges, and equations unchanged.

Use only the approved substance and reaction data. Do not generate arbitrary reactions. When a combination is not configured, explain that no verified rule is available rather than guessing. Distinguish observations from explanations and precipitate formation from mere mixing. Use the equations and acceptance tests in this SPEC as regression tests.

The main simulation should occupy at least 60% of the desktop workspace where practical. Every visible control must work. Include keyboard alternatives to drag/drop, accessible labels, visible focus, reduced-motion support, and text alternatives to colour cues. If zoom/pan/fullscreen controls are present, implement and test them; viewport navigation must not alter chemistry state.

Before completion, check all expected-value tests, balance every equation, verify particle counts/charges, verify all solubility outcomes, and test the page with the network disconnected. Report each check as PASS, FAIL, BLOCKED, or NOT RUN. Do not claim a build, deployment, or test passed unless it was actually executed and observed.

---

## 13. Final source matrix

| Claim/feature | Evidence basis | Status |
|---|---|---|
| Acid definition and `H⁺` model | Uploaded SGK, Lesson 8, pp. 35–38 | `TEXTBOOK` |
| Base definition, `OH⁻`, pH classification | Uploaded SGK, Lesson 9, pp. 39–43 | `TEXTBOOK` |
| Oxide definition, categories, acid/base oxide patterns | Uploaded SGK, Lesson 10, pp. 44–47 | `TEXTBOOK` |
| Salt formula/name, acid radicals, solubility table and reactions | Uploaded SGK, Lesson 11, pp. 48–52 | `TEXTBOOK` |
| Precipitation requires an insoluble product under the modeled conditions | OpenStax Chemistry 2e 4.2 and 15.1 | `EXTERNAL` |
| Expanded `AgCl` precipitation example | OpenStax Chemistry 2e 4.2 | `EXTERNAL` |
| Particle explanation and neutralisation teaching approach | Royal Society of Chemistry Education | `EXTERNAL` |
| 15–20 minute lesson path, module order, scoring and UI | Project brief and design reasoning | `DESIGN` |
| Difficulties such as formula recall and product presentation | Confirmed project intake | `PROJECT_INPUT` |
| Any reaction not explicitly in the allowlist | Not approved until separately reviewed | `NOT CONFIGURED` |

## 14. Release checklist
- [ ] Readable offline `index.html` generated.
- [ ] All bilingual strings present.
- [ ] Reaction and substance allowlists reviewed.
- [ ] Every equation atom-balanced.
- [ ] Charge balance checked.
- [ ] Solubility/precipitation outcomes verified.
- [ ] All T01–T18 tests run and results recorded.
- [ ] Accessibility and keyboard fallback checked.
- [ ] Network-disconnected test completed.
- [ ] Hosted/Vercel status reported separately from offline readiness.
