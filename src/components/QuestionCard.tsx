import React from 'react';
import { Check, X, ArrowRight, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { QuestionData, formatNumber } from '../utils/khmerNumerals';
import { VisualCounter } from './VisualCounter';

interface QuestionCardProps {
  question: QuestionData;
  questionNumber: number;
  useKhmerDigits: boolean;
  selectedOption: number | null;
  wrongOptions: number[];
  isCorrect: boolean;
  onSelectOption: (option: number) => void;
  onNextQuestion: () => void;
  isMuted: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  useKhmerDigits,
  selectedOption,
  wrongOptions,
  isCorrect,
  onSelectOption,
  onNextQuestion,
  isMuted,
}) => {
  const { num1, num2, answer, options, itemType, itemNameKhmer } = question;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-4 sm:mt-6 mb-8">
      {/* Main Playful Card */}
      <div className="relative bg-white rounded-3xl p-5 sm:p-8 shadow-xl border-4 border-amber-200/80 transition-all">
        {/* Decorative corner ribbons */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-bold px-4 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1.5 whitespace-nowrap">
          <span>សំណួរទី {formatNumber(questionNumber, useKhmerDigits)}</span>
          <span className="opacity-80">•</span>
          <span>តើផលបូកស្មើនឹងប៉ុន្មាន?</span>
        </div>

        {/* Mascot Reaction Avatar */}
        <div className="flex justify-center mb-2 mt-2">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-4xl sm:text-5xl border-4 shadow-md transition-all duration-300 ${
              isCorrect
                ? 'bg-emerald-100 border-emerald-400 scale-110 animate-bounce'
                : wrongOptions.length > 0
                ? 'bg-rose-100 border-rose-300 animate-wiggle'
                : 'bg-amber-100 border-amber-300 animate-float'
            }`}
          >
            {isCorrect ? '🥳' : wrongOptions.length > 0 ? '🤔' : '🐘'}
          </div>
        </div>

        {/* Big Math Expression Display */}
        <div className="bg-gradient-to-b from-amber-50/90 to-orange-50/50 rounded-2xl p-4 sm:p-6 border-2 border-amber-200 my-4 text-center shadow-inner">
          <div className="text-xs text-amber-800 font-semibold mb-2 flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>ចូរគិតលេខ និងជ្រើសរើសចម្លើយត្រឹមត្រូវ</span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 select-none">
            {/* Number 1 */}
            <div className="min-w-[64px] sm:min-w-[84px] py-2 sm:py-3 px-3 bg-white rounded-2xl border-4 border-amber-300 shadow-sm text-3xl sm:text-5xl font-black text-amber-700 font-fun">
              {formatNumber(num1, useKhmerDigits)}
            </div>

            {/* Plus sign */}
            <span className="text-3xl sm:text-5xl font-black text-orange-500 font-fun">+</span>

            {/* Number 2 */}
            <div className="min-w-[64px] sm:min-w-[84px] py-2 sm:py-3 px-3 bg-white rounded-2xl border-4 border-orange-300 shadow-sm text-3xl sm:text-5xl font-black text-orange-700 font-fun">
              {formatNumber(num2, useKhmerDigits)}
            </div>

            {/* Equal sign */}
            <span className="text-3xl sm:text-5xl font-black text-slate-400 font-fun">=</span>

            {/* Answer Box */}
            <div
              className={`min-w-[64px] sm:min-w-[84px] py-2 sm:py-3 px-3 rounded-2xl border-4 shadow-sm text-3xl sm:text-5xl font-black font-fun transition-all ${
                isCorrect
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                  : 'bg-amber-100/70 border-dashed border-amber-400 text-amber-500'
              }`}
            >
              {isCorrect ? formatNumber(answer, useKhmerDigits) : '?'}
            </div>
          </div>

          {/* Visual Fruit/Dot Counter for Child Assistance */}
          <VisualCounter
            num1={num1}
            num2={num2}
            itemType={itemType}
            itemNameKhmer={itemNameKhmer}
            useKhmerDigits={useKhmerDigits}
            isMuted={isMuted}
          />
        </div>

        {/* FEEDBACK BANNER - EXACT REQUIRED KHMER TEXT */}
        {isCorrect ? (
          <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 text-white rounded-2xl shadow-lg border-2 border-emerald-300 text-center animate-pop">
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black tracking-wide font-fun drop-shadow-sm mb-1">
              <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-spin" />
              <span>ត្រឹមត្រូវ! ពូកែណាស់!</span>
              <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-spin" />
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              កូនឆ្លើយត្រូវហើយ! ទទួលបានផ្កាយរង្វាន់ ⭐
            </p>
          </div>
        ) : wrongOptions.length > 0 ? (
          <div className="mb-6 p-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl shadow-md border-2 border-rose-300 text-center animate-wiggle">
            <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold tracking-wide font-fun mb-0.5">
              <RefreshCw className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '3s' }} />
              <span>សាកល្បងម្ដងទៀត</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-100 font-medium">
              មិនអីទេ! កូនអាចសាកល្បងរាប់ឡើងវិញ ហើយជ្រើសរើសចម្លើយម្តងទៀតណា៎!
            </p>
          </div>
        ) : (
          <div className="mb-4 text-center">
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              សូមជ្រើសរើសចម្លើយមួយក្នុងចំណោមចម្លើយទាំង ៣ ខាងក្រោម៖
            </p>
          </div>
        )}

        {/* 3 ANSWER BUTTONS - EXACT REQUIREMENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {options.map((option, index) => {
            const isOptionSelected = selectedOption === option;
            const isOptionWrong = wrongOptions.includes(option);
            const isOptionCorrect = isCorrect && option === answer;

            // Palette tints for 3 buttons
            const colorThemes = [
              {
                default: 'bg-sky-500 hover:bg-sky-600 text-white border-b-4 border-sky-700 active:border-b-0 active:translate-y-1',
                badge: 'bg-sky-700/60 text-sky-100',
              },
              {
                default: 'bg-amber-500 hover:bg-amber-600 text-white border-b-4 border-amber-700 active:border-b-0 active:translate-y-1',
                badge: 'bg-amber-700/60 text-amber-100',
              },
              {
                default: 'bg-purple-500 hover:bg-purple-600 text-white border-b-4 border-purple-700 active:border-b-0 active:translate-y-1',
                badge: 'bg-purple-700/60 text-purple-100',
              },
            ];

            const theme = colorThemes[index % colorThemes.length];

            let buttonStateClasses = theme.default;
            if (isOptionCorrect) {
              buttonStateClasses = 'bg-emerald-600 text-white border-b-4 border-emerald-800 ring-4 ring-emerald-300 ring-offset-2 scale-105';
            } else if (isOptionWrong) {
              buttonStateClasses = 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed opacity-60 line-through';
            } else if (isCorrect) {
              // Other options when already solved
              buttonStateClasses = 'bg-slate-100 text-slate-400 border-b-4 border-slate-300 opacity-50 cursor-not-allowed';
            }

            return (
              <button
                key={index}
                disabled={isCorrect || isOptionWrong}
                onClick={() => onSelectOption(option)}
                className={`relative py-4 sm:py-6 px-4 rounded-2xl font-black text-2xl sm:text-3xl transition-all duration-150 cursor-pointer select-none flex flex-col items-center justify-center gap-1 shadow-md ${buttonStateClasses}`}
              >
                {/* Option Letter/Number Badge (e.g. ក, ខ, គ or 1, 2, 3) */}
                <span className="absolute top-2 left-2 text-[11px] font-bold px-1.5 py-0.5 rounded-lg bg-black/15 text-white/90">
                  {['ក', 'ខ', 'គ'][index]}
                </span>

                {/* Option Value */}
                <span className="font-fun tracking-tight mt-1">
                  {formatNumber(option, useKhmerDigits)}
                </span>

                {/* Status Indicator Icon */}
                {isOptionCorrect && (
                  <span className="flex items-center gap-1 text-xs font-bold bg-white text-emerald-700 px-2 py-0.5 rounded-full mt-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ត្រឹមត្រូវ</span>
                  </span>
                )}
                {isOptionWrong && (
                  <span className="flex items-center gap-1 text-xs font-bold bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full mt-1">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ខុសហើយ</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* CONTINUE TO NEXT QUESTION BUTTON - APPEARS WHEN ANSWER IS CORRECT */}
        {isCorrect && (
          <div className="mt-6 pt-4 border-t border-slate-100 animate-pop">
            <button
              onClick={onNextQuestion}
              autoFocus
              className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:scale-98 text-white font-black text-lg sm:text-xl shadow-lg border-b-4 border-emerald-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>បន្តទៅសំណួរខាងមុខទៀត</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
