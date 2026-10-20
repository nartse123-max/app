import React from 'react';
import { Star, CheckCircle, Sparkles } from 'lucide-react';
import { formatNumber } from '../utils/khmerNumerals';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  useKhmerDigits: boolean;
  questionStatuses: Array<'pending' | 'correct' | 'retried'>;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  useKhmerDigits,
  questionStatuses,
}) => {
  const progressPercent = Math.min(100, Math.round(((currentIndex) / totalQuestions) * 100));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-4 sm:mt-6">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-100">
        {/* Top Text Indicator */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600 mb-2">
          <div className="flex items-center gap-1.5 text-amber-700">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>
              សំណួរទី{' '}
              <span className="text-base sm:text-lg font-black text-amber-600">
                {formatNumber(currentIndex + 1, useKhmerDigits)}
              </span>{' '}
              ក្នុងចំណោម{' '}
              <span className="text-base sm:text-lg font-black text-slate-700">
                {formatNumber(totalQuestions, useKhmerDigits)}
              </span>
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
            {formatNumber(progressPercent, useKhmerDigits)}% សម្រេចបាន
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-3 sm:h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${Math.max(6, progressPercent)}%` }}
          />
        </div>

        {/* 10 Step Stars Bar */}
        <div className="grid grid-cols-10 gap-1 sm:gap-2 mt-3 pt-2 border-t border-slate-100">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const status = questionStatuses[idx] || 'pending';
            const isCurrent = idx === currentIndex;

            let badgeClasses = 'bg-slate-100 text-slate-400 border-slate-200';
            if (status === 'correct') {
              badgeClasses = 'bg-emerald-500 text-white border-emerald-600 shadow-sm scale-105';
            } else if (status === 'retried') {
              badgeClasses = 'bg-amber-400 text-white border-amber-500';
            } else if (isCurrent) {
              badgeClasses = 'bg-amber-500 text-white ring-2 ring-amber-300 ring-offset-1 font-bold animate-pulse';
            }

            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl border text-[10px] sm:text-xs transition-all duration-200 ${badgeClasses}`}
                title={`សំណួរ ${formatNumber(idx + 1, useKhmerDigits)}`}
              >
                {status === 'correct' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                ) : status === 'retried' ? (
                  <Star className="w-3.5 h-3.5 text-white fill-white" />
                ) : (
                  <span>{formatNumber(idx + 1, useKhmerDigits)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
