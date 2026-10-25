export interface TranslationSchema {
  appTitle: string;
  appSubtitle: string;
  gradeBadge: string;
  curriculumBadge: string;
  offlineReady: string;
  qaTestsButton: string;

  // Nav
  navClassify: string;
  navValency: string;
  navSolubility: string;
  navReactionLab: string;
  navReview: string;

  // Common actions
  predictFirst: string;
  showResult: string;
  reset: string;
  resetAll: string;
  undo: string;
  checkAnswer: string;
  nextQuestion: string;
  showHint: string;
  hideHint: string;
  whyExplanation: string;
  observation: string;
  chemicalExplanation: string;
  chemicalEquation: string;
  particleModel: string;
  schematicNotice: string;
  virtualLabSafetyNotice: string;
  noVerifiedRule: string;
  coreScope: string;
  extensionScope: string;
  dragOrClickInstruction: string;
  revealFormula: string;
  hideFormula: string;
  filterAll: string;

  // Substance classes
  classAcid: string;
  classBase: string;
  classOxide: string;
  classSalt: string;
  classAcidDesc: string;
  classBaseDesc: string;
  classOxideDesc: string;
  classSaltDesc: string;

  // Formula builder
  builderTitle: string;
  builderSubtitle: string;
  modeCharge: string;
  modeValency: string;
  selectedCation: string;
  selectedAnion: string;
  selectCationPrompt: string;
  selectAnionPrompt: string;
  ratioNotice: string;
  netCharge: string;
  formulaResult: string;
  compoundName: string;
  smallestRatio: string;
  parenthesesRule: string;
  neutralityVerified: string;
  neutralityFailed: string;
  buildTargetPrompt: string;
  tryCompounds: string;

  // Solubility
  solubilityTitle: string;
  solubilitySubtitle: string;
  solubilityLegendS: string;
  solubilityLegendI: string;
  solubilityLegendSS: string;
  solubilityLegendDash: string;
  solubilityCationLabel: string;
  solubilityAnionLabel: string;
  predictPrecipitatePrompt: string;
  stateDissolved: string;
  statePrecipitate: string;
  stateGas: string;
  stateNoReaction: string;
  particleHydratedIons: string;
  particlePrecipitateLattice: string;
  mixedPairTitle: string;

  // Lab
  labTitle: string;
  labSubtitle: string;
  reagentRack: string;
  selectReagentsPrompt: string;
  reagentA: string;
  reagentB: string;
  clearSelection: string;
  startReaction: string;
  stirAction: string;
  predictedEvidencePrompt: string;
  predBubbles: string;
  predPrecipitate: string;
  predColorChange: string;
  predNeutral: string;
  predMetalDeposit: string;
  predNoChange: string;
  whatISaw: string;
  whatItMeans: string;
  spectatorIons: string;
  activeIons: string;
  balancedEquationLabel: string;
  unbalancedEquationLabel: string;

  // Review
  reviewTitle: string;
  reviewSubtitle: string;
  quickCheck: string;
  fullTest: string;
  questionCount: string;
  scoreByObjective: string;
  objClassification: string;
  objValency: string;
  objSolubility: string;
  objReaction: string;
  objLabReasoning: string;
  yourAnswer: string;
  correctAnswer: string;
  misconceptionsFound: string;
  noMisconceptions: string;
  recommendedPractice: string;
  retakeQuiz: string;

  // QA test suite
  qaTitle: string;
  qaSubtitle: string;
  runAllTests: string;
  testPassed: string;
  testFailed: string;
  testSummary: string;
  close: string;
}

export const TRANSLATIONS: Record<'vi' | 'en', TranslationSchema> = {
  vi: {
    appTitle: 'SimBot: Hóa học vô cơ 8',
    appSubtitle: 'Mô phỏng tương tác: Acid, Base & pH, Oxide, Muối — KHTN 8 (Kết nối tri thức)',
    gradeBadge: 'KHTN 8',
    curriculumBadge: 'Kết nối tri thức',
    offlineReady: 'Chạy độc lập (Offline)',
    qaTestsButton: 'Kiểm thử chuẩn (T01–T18)',

    navClassify: 'Phân loại',
    navValency: 'Hóa trị & Công thức',
    navSolubility: 'Độ tan & Kết tủa',
    navReactionLab: 'Phòng thí nghiệm phản ứng',
    navReview: 'Ôn tập & Đánh giá',

    predictFirst: 'Dự đoán trước khi thực hiện',
    showResult: 'Xem kết quả thực nghiệm',
    reset: 'Làm lại',
    resetAll: 'Khởi động lại toàn bộ',
    undo: 'Hoàn tác',
    checkAnswer: 'Kiểm tra câu trả lời',
    nextQuestion: 'Câu tiếp theo',
    showHint: 'Gợi ý giải thích',
    hideHint: 'Ẩn gợi ý',
    whyExplanation: 'Vì sao xếp vào nhóm này?',
    observation: 'Hiện tượng quan sát được (Mắt thấy)',
    chemicalExplanation: 'Bản chất hóa học (Giải thích)',
    chemicalEquation: 'Phương trình hóa học',
    particleModel: 'Mô hình hạt & ion (Minh họa)',
    schematicNotice: 'Mô hình hạt mang tính trực quan sư phạm, đơn giản hóa trạng thái solvat hóa ion.',
    virtualLabSafetyNotice: 'Lưu ý: Đây là mô phỏng học tập. Khi làm thí nghiệm thực tế tại phòng thực hành trường học, phải tuân thủ nghiêm ngặt quy tắc an toàn và có sự hướng dẫn của giáo viên.',
    noVerifiedRule: 'Chưa có dữ liệu đã kiểm chứng cho tổ hợp này trong chương trình Lớp 8.',
    coreScope: 'Trọng tâm SGK',
    extensionScope: 'Kiến thức mở rộng',
    dragOrClickInstruction: 'Nhấp hoặc kéo thả thẻ chất vào đúng nhóm chất tương ứng:',
    revealFormula: 'Hiện công thức',
    hideFormula: 'Ẩn công thức (đoán theo tên)',
    filterAll: 'Tất cả các chất',

    classAcid: 'Acid (Axit)',
    classBase: 'Base (Bazơ)',
    classOxide: 'Oxide (Oxit)',
    classSalt: 'Muối (Salt)',
    classAcidDesc: 'Gồm nguyên tử H liên kết với gốc axit. Tan trong nước tạo H⁺ làm quỳ tím hóa đỏ.',
    classBaseDesc: 'Gồm nguyên tử kim loại (hoặc NH₄⁺) liên kết với nhóm hiđroxit (-OH). Kiềm làm quỳ hóa xanh.',
    classOxideDesc: 'Hợp chất gồm 2 nguyên tố, trong đó có một nguyên tố là Oxi (O).',
    classSaltDesc: 'Gồm nguyên tử kim loại (hoặc NH₄⁺) liên kết với một hay nhiều gốc axit.',

    builderTitle: 'Lập công thức hóa học theo hóa trị / điện tích',
    builderSubtitle: 'Ghép cation và anion để tạo phân tử trung hòa điện tích với tỉ lệ số nguyên tử tối giản',
    modeCharge: 'Chế độ Điện tích Ion (Charge)',
    modeValency: 'Chế độ Hóa trị La Mã (Valency)',
    selectedCation: 'Cation đã chọn',
    selectedAnion: 'Anion / Gốc axit đã chọn',
    selectCationPrompt: 'Chọn 1 Cation (kim loại / H⁺ / NH₄⁺)',
    selectAnionPrompt: 'Chọn 1 Anion (OH⁻ / gốc axit)',
    ratioNotice: 'Tỉ lệ ion ghép nối',
    netCharge: 'Tổng điện tích hệ phân tử',
    formulaResult: 'Công thức hóa học tạo thành',
    compoundName: 'Tên gọi hợp chất',
    smallestRatio: 'Quy tắc: Tỉ lệ chỉ số nguyên tử x : y phải là các số nguyên dương tối giản.',
    parenthesesRule: 'Quy tắc dấu ngoặc: Khi nhóm nguyên tử đa nguyên tử (OH, SO₄, NO₃,...) lặp lại từ 2 lần trở lên, phải đặt trong dấu ngoặc đơn.',
    neutralityVerified: 'Phân tử trung hòa điện tích hoàn toàn (Tổng điện tích = 0). Hợp chất hợp lệ!',
    neutralityFailed: 'Chưa trung hòa điện tích! Hãy điều chỉnh tỉ lệ số lượng ion.',
    buildTargetPrompt: 'Thử thách lập công thức mẫu:',
    tryCompounds: 'Hợp chất mẫu cần luyện tập',

    solubilityTitle: 'Bảng tính tan & Dự đoán kết tủa',
    solubilitySubtitle: 'Tra cứu tính tan của các muối và bazơ trong nước theo bảng tính tan SGK KHTN 8',
    solubilityLegendS: 'Tan tốt (S)',
    solubilityLegendI: 'Không tan / Kết tủa (I)',
    solubilityLegendSS: 'Ít tan (SS)',
    solubilityLegendDash: 'Không tồn tại / Bị thủy phân (-)',
    solubilityCationLabel: 'Chọn Cation:',
    solubilityAnionLabel: 'Chọn Anion:',
    predictPrecipitatePrompt: 'Dự đoán: Tổ hợp ion này trong nước có tạo kết tủa không?',
    stateDissolved: 'Dung dịch trong suốt (Các ion tan tự do)',
    statePrecipitate: 'Xuất hiện kết tủa lắng đọng (Chất không tan)',
    stateGas: 'Chất khí bay lên / Không bền',
    stateNoReaction: 'Không có hiện tượng kết tủa',
    particleHydratedIons: 'Các ion tự do phân tán cách xa nhau và được bao bọc bởi các phân tử nước.',
    particlePrecipitateLattice: 'Các ion hút nhau tạo thành mạng tinh thể chất rắn lắng xuống đáy ống nghiệm.',
    mixedPairTitle: 'Kết quả phối hợp ion:',

    labTitle: 'Phòng thí nghiệm phản ứng hóa học',
    labSubtitle: 'Chọn hóa chất, đưa ra dự đoán hiện tượng trước khi trộn, quan sát thí nghiệm và giải thích bản chất',
    reagentRack: 'Giá hóa chất phòng thí nghiệm',
    selectReagentsPrompt: 'Chọn 2 hóa chất cần làm thí nghiệm (nhấp để đưa vào bàn thao tác):',
    reagentA: 'Hóa chất 1 (Trong ống nghiệm)',
    reagentB: 'Hóa chất 2 (Ống nhỏ giọt / thêm vào)',
    clearSelection: 'Đổi hóa chất khác',
    startReaction: 'Tiến hành phản ứng (Thêm & Trộn)',
    stirAction: 'Khuấy đều dung dịch',
    predictedEvidencePrompt: 'Bước 1: Dự đoán hiện tượng sẽ quan sát được bằng mắt:',
    predBubbles: 'Sủi bọt khí (Có chất khí thoát ra)',
    predPrecipitate: 'Xuất hiện chất kết tủa',
    predColorChange: 'Dung dịch đổi màu / kim loại bám ngoài',
    predNeutral: 'Không thấy chất rắn hay khí, chỉ tỏa nhiệt trung hòa',
    predMetalDeposit: 'Kim loại mới bám trên vật liệu',
    predNoChange: 'Dung dịch vẫn trong suốt, không có phản ứng thực tế',
    whatISaw: 'Hiện tượng mắt thấy (What I saw)',
    whatItMeans: 'Bản chất hóa học (What it means)',
    spectatorIons: 'Ion khán giả (Không tham gia tạo sản phẩm chính):',
    activeIons: 'Quá trình ion thực tế diễn ra:',
    balancedEquationLabel: 'Phương trình hóa học (Đã cân bằng hệ số):',
    unbalancedEquationLabel: 'Sơ đồ phản ứng (Chưa cân bằng):',

    reviewTitle: 'Ôn tập & Đánh giá năng lực hóa học',
    reviewSubtitle: 'Kiểm tra kiến thức theo 5 mục tiêu bài học và phát hiện các quan niệm sai lầm cần khắc phục',
    quickCheck: 'Kiểm tra nhanh (3 câu)',
    fullTest: 'Bài luyện tập đầy đủ (10 câu)',
    questionCount: 'Câu hỏi',
    scoreByObjective: 'Kết quả theo từng mục tiêu học tập',
    objClassification: 'Phân loại chất (Acid, Base, Oxide, Muối)',
    objValency: 'Hóa trị & Lập công thức hóa học',
    objSolubility: 'Dự đoán độ tan & Sự tạo kết tủa',
    objReaction: 'Dự đoán sản phẩm & Cân bằng phương trình',
    objLabReasoning: 'Tư duy thí nghiệm (Hiện tượng vs Bản chất)',
    yourAnswer: 'Câu trả lời của bạn',
    correctAnswer: 'Đáp án chính xác',
    misconceptionsFound: 'Quan niệm cần lưu ý được phát hiện:',
    noMisconceptions: 'Tuyệt vời! Bạn nắm rất vững kiến thức và không mắc lỗi quan niệm nào.',
    recommendedPractice: 'Gợi ý rèn luyện tiếp theo:',
    retakeQuiz: 'Làm lại bài kiểm tra',

    qaTitle: 'Bộ kiểm thử chất lượng tự động (Acceptance Tests T01–T18)',
    qaSubtitle: 'Xác minh độc lập các cổng khoa học, tính cân bằng nguyên tử, bảng tan và tính độc lập offline',
    runAllTests: 'Chạy lại toàn bộ kiểm thử (Run Tests)',
    testPassed: 'ĐẠT (PASS)',
    testFailed: 'CHƯA ĐẠT (FAIL)',
    testSummary: 'Tổng kết kiểm thử',
    close: 'Đóng'
  },
  en: {
    appTitle: 'SimBot: Inorganic Chemistry Lab',
    appSubtitle: 'Interactive Workbench: Acid, Base & pH, Oxide, Salt — Grade 8 Natural Sciences',
    gradeBadge: 'Grade 8 Science',
    curriculumBadge: 'Standard Curriculum',
    offlineReady: 'Offline Ready (Standalone)',
    qaTestsButton: 'Standard QA Tests (T01–T18)',

    navClassify: 'Classify',
    navValency: 'Valency & Formula',
    navSolubility: 'Solubility & Precipitates',
    navReactionLab: 'Reaction Lab',
    navReview: 'Review & Progress',

    predictFirst: 'Predict before performing action',
    showResult: 'Reveal experimental evidence',
    reset: 'Reset experiment',
    resetAll: 'Restart entire session',
    undo: 'Undo',
    checkAnswer: 'Check answer',
    nextQuestion: 'Next question',
    showHint: 'Show explanation hint',
    hideHint: 'Hide hint',
    whyExplanation: 'Why does it belong to this group?',
    observation: 'Observed evidence (What I saw)',
    chemicalExplanation: 'Chemical explanation (What it means)',
    chemicalEquation: 'Chemical equation',
    particleModel: 'Particle & Ion Model (Schematic)',
    schematicNotice: 'Schematic particle model visually simplified for pedagogical clarity.',
    virtualLabSafetyNotice: 'Note: This is a virtual simulation. In real laboratory settings, always adhere strictly to safety rules under teacher supervision.',
    noVerifiedRule: 'No verified experimental rule is configured for this specific combination in Grade 8 scope.',
    coreScope: 'Core Curriculum',
    extensionScope: 'Extension Topic',
    dragOrClickInstruction: 'Click or drag substance cards into their matching category:',
    revealFormula: 'Show chemical formula',
    hideFormula: 'Hide formula (guess from name)',
    filterAll: 'All substances',

    classAcid: 'Acid',
    classBase: 'Base',
    classOxide: 'Oxide',
    classSalt: 'Salt',
    classAcidDesc: 'Contains H atoms bonded to an acid radical. Dissociates into H⁺ turning litmus red.',
    classBaseDesc: 'Contains metal cations (or NH₄⁺) bonded to hydroxide (-OH) groups. Alkalis turn litmus blue.',
    classOxideDesc: 'Binary compound consisting of two elements, one of which is Oxygen (O).',
    classSaltDesc: 'Compound consisting of metal cations (or NH₄⁺) bonded to one or more acid radicals.',

    builderTitle: 'Chemical Formula Builder by Valency / Charge',
    builderSubtitle: 'Combine cations and anions to form an electrically neutral molecule with lowest integer ratio',
    modeCharge: 'Ion Charge Mode',
    modeValency: 'Roman Valency Mode',
    selectedCation: 'Selected Cation',
    selectedAnion: 'Selected Anion / Acid Radical',
    selectCationPrompt: 'Select 1 Cation (metal / H⁺ / NH₄⁺)',
    selectAnionPrompt: 'Select 1 Anion (OH⁻ / acid radical)',
    ratioNotice: 'Stoichiometric ratio',
    netCharge: 'Net molecular charge',
    formulaResult: 'Resulting chemical formula',
    compoundName: 'Compound chemical name',
    smallestRatio: 'Rule: The subscript ratio x : y must be the smallest whole-number ratio.',
    parenthesesRule: 'Parentheses Rule: When a polyatomic group (OH, SO₄, NO₃,...) repeats 2 or more times, enclose it in parentheses.',
    neutralityVerified: 'Electrically neutral molecule (Net charge = 0). Valid compound!',
    neutralityFailed: 'Non-neutral charge! Adjust ion counts to balance charges.',
    buildTargetPrompt: 'Formula building challenges:',
    tryCompounds: 'Practice targets',

    solubilityTitle: 'Solubility Matrix & Precipitation Predictor',
    solubilitySubtitle: 'Inspect solubility of salts and bases in aqueous solution using verified textbook rules',
    solubilityLegendS: 'Soluble (S)',
    solubilityLegendI: 'Insoluble / Precipitate (I)',
    solubilityLegendSS: 'Slightly Soluble (SS)',
    solubilityLegendDash: 'Decomposes / Non-existent (-)',
    solubilityCationLabel: 'Choose Cation:',
    solubilityAnionLabel: 'Choose Anion:',
    predictPrecipitatePrompt: 'Predict: Will this aqueous ionic pairing form an insoluble precipitate?',
    stateDissolved: 'Clear solution (Free hydrated ions)',
    statePrecipitate: 'Precipitate forms (Insoluble solid settles)',
    stateGas: 'Gas evolves / Decomposition',
    stateNoReaction: 'No precipitation occurs',
    particleHydratedIons: 'Hydrated ions remain separated and dispersed among water molecules.',
    particlePrecipitateLattice: 'Oppositely charged ions aggregate into a solid crystal lattice sinking to the bottom.',
    mixedPairTitle: 'Combined ion outcome:',

    labTitle: 'Virtual Chemistry Reaction Lab',
    labSubtitle: 'Select reagents, predict observable evidence before mixing, observe dynamic reactions and inspect underlying chemistry',
    reagentRack: 'Laboratory Reagent Rack',
    selectReagentsPrompt: 'Select 2 reagents to test (click to place on bench):',
    reagentA: 'Reagent 1 (In reaction vessel)',
    reagentB: 'Reagent 2 (Dropper / added substance)',
    clearSelection: 'Change reagents',
    startReaction: 'Initiate reaction (Add & Mix)',
    stirAction: 'Stir mixture',
    predictedEvidencePrompt: 'Step 1: Predict what visible evidence you will observe:',
    predBubbles: 'Gas bubbles / Effervescence',
    predPrecipitate: 'Precipitate formation',
    predColorChange: 'Color shift / metal coating',
    predNeutral: 'Solution stays clear, neutralization heat only',
    predMetalDeposit: 'New metal deposit forms',
    predNoChange: 'No visible reaction; ions remain dissolved',
    whatISaw: 'Visual Observation (What I saw)',
    whatItMeans: 'Scientific Explanation (What it means)',
    spectatorIons: 'Spectator ions (remain dissolved in solution):',
    activeIons: 'Net ionic process:',
    balancedEquationLabel: 'Balanced Chemical Equation:',
    unbalancedEquationLabel: 'Unbalanced Reaction Scheme:',

    reviewTitle: 'Review & Competency Assessment',
    reviewSubtitle: 'Assess your understanding across 5 key objectives and diagnose common conceptual misunderstandings',
    quickCheck: 'Quick Check (3 questions)',
    fullTest: 'Full Practice (10 questions)',
    questionCount: 'Question',
    scoreByObjective: 'Performance by Learning Objective',
    objClassification: 'Substance Classification (Acid, Base, Oxide, Salt)',
    objValency: 'Valency & Formula Construction',
    objSolubility: 'Solubility & Precipitation Prediction',
    objReaction: 'Product Prediction & Balancing Equations',
    objLabReasoning: 'Lab Inquiry (Observation vs Explanation)',
    yourAnswer: 'Your choice',
    correctAnswer: 'Correct answer',
    misconceptionsFound: 'Identified Misconceptions to Address:',
    noMisconceptions: 'Outstanding work! Strong conceptual mastery with zero misconceptions detected.',
    recommendedPractice: 'Recommended Next Practice:',
    retakeQuiz: 'Retake assessment',

    qaTitle: 'Automated Acceptance Tests (T01–T18 Regression Suite)',
    qaSubtitle: 'Independent verification of scientific gates, atom balances, solubility logic, and offline safety',
    runAllTests: 'Execute All QA Tests',
    testPassed: 'PASS',
    testFailed: 'FAIL',
    testSummary: 'Test Summary',
    close: 'Close'
  }
};
