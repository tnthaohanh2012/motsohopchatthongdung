import React, { useState, useEffect } from 'react';
import { runAcceptanceTests } from '../utils/chemistryCalculators';
import { TestCaseResult } from '../types/chemistry';
import { TRANSLATIONS } from '../data/translations';
import { CheckCircle2, XCircle, RefreshCw, X, ShieldCheck } from 'lucide-react';

import { sounds } from '../utils/soundEffects';

interface QATestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'vi' | 'en';
}

export const QATestRunnerModal: React.FC<QATestRunnerModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const t = TRANSLATIONS[language];

  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const executeTests = () => {
    sounds.playClick();
    setIsRunning(true);
    setTimeout(() => {
      const res = runAcceptanceTests();
      setTestResults(res);
      setIsRunning(false);
      sounds.playSuccess();
    }, 250);
  };

  useEffect(() => {
    if (isOpen && testResults.length === 0) {
      executeTests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const passedCount = testResults.filter(r => r.status === 'PASS').length;
  const failedCount = testResults.filter(r => r.status === 'FAIL').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {t.qaTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {t.qaSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white text-xs">
          <div className="flex items-center gap-4">
            <span className="text-slate-600 font-medium">
              {t.testSummary}:
            </span>
            <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {passedCount} / {testResults.length} {t.testPassed}
            </span>
            {failedCount > 0 && (
              <span className="font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                {failedCount} {t.testFailed}
              </span>
            )}
          </div>

          <button
            onClick={executeTests}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{t.runAllTests}</span>
          </button>
        </div>

        {/* Test Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5 divide-y divide-slate-100">
          {testResults.map(test => (
            <div key={test.id} className="pt-2.5 first:pt-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  {test.status === 'PASS' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="font-mono text-blue-600">{test.id}</span>
                      <span>{language === 'vi' ? test.description_vi : test.description_en}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      <span className="font-semibold text-slate-700">Expected:</span> {test.expected}
                      <span className="mx-1.5 text-slate-300">|</span>
                      <span className="font-semibold text-slate-700">Actual:</span> {test.actual}
                    </div>
                    {test.details && (
                      <div className="text-[11px] text-slate-600 mt-1 italic">
                        {test.details}
                      </div>
                    )}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                    test.status === 'PASS'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {test.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-300 transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
