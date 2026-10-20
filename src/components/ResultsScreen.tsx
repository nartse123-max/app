import React, { useState } from 'react';
import { Star, Award, RotateCcw, Sparkles, CheckCircle2, AlertCircle, Printer, Heart } from 'lucide-react';
import { QuestionData, formatNumber } from '../utils/khmerNumerals';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  questionStatuses: Array<'pending' | 'correct' | 'retried'>;
  questions: QuestionData[];
  useKhmerDigits: boolean;
  onRestartSame: () => void;
  onStartNew: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  questionStatuses,
  questions,
  useKhmerDigits,
  onRestartSame,
  onStartNew,
}) => {
  const [studentName, setStudentName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  // Stats calculation
  const firstTryCorrect = questionStatuses.filter((s) => s === 'correct').length;
  const retriedCount = questionStatuses.filter((s) => s === 'retried').length;

  // Star rating (1 to 3 stars)
  let starsCount = 1;
  let titleMessage = 'បានល្អហើយ! ចូរបន្តហ្វឹកហាត់បន្ថែម!';
  let subMessage = 'កូនព្យាយាមបានល្អណាស់ សាកល្បងលេងម្តងទៀតដើម្បីទទួលបានពិន្ទុកាន់តែខ្ពស់!';

  if (firstTryCorrect >= 8) {
    starsCount = 3;
    titleMessage = 'អស្ចារ្យណាស់! ពូកែគណិតវិទ្យាខ្លាំងណាស់!';
    subMessage = 'កូនឆ្លើយត្រូវស្ទើរតែទាំងអស់លើកដំបូង! សក្តិសមជាសិស្សឆ្នើមថ្នាក់ទី២!';
  } else if (firstTryCorrect >= 5) {
    starsCount = 2;
    titleMessage = 'ល្អប្រសើរណាស់! ខិតខំបន្តិចទៀតនឹងបានពិន្ទុពេញ!';
    subMessage = 'កូនឆ្លើយបានត្រឹមត្រូវច្រើនណាស់ ពូកែណាស់!';
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 animate-pop">
      {/* Main Results Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        {/* Decorative Top Arch */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Mascot / Trophy */}
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-3xl shadow-xl flex items-center justify-center text-6xl border-4 border-white animate-bounce">
            🏆
          </div>
          <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md border-2 border-white">
            ១០/១០ សម្រេច
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-4xl font-bold font-moul text-amber-600 drop-shadow-sm mb-2">
          លទ្ធផលចុងក្រោយ
        </h2>

        {/* Congratulatory Evaluation */}
        <p className="text-lg sm:text-xl font-bold text-slate-700 font-fun mb-1">
          {titleMessage}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          {subMessage}
        </p>

        {/* 3 Large Animated Stars */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          {[1, 2, 3].map((starIndex) => {
            const isFilled = starIndex <= starsCount;
            return (
              <div
                key={starIndex}
                className={`transform transition-all duration-300 ${
                  isFilled ? 'scale-110' : 'opacity-30 grayscale'
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 ${
                    isFilled
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-200 animate-wiggle'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                  style={{ animationDelay: `${starIndex * 0.2}s` }}
                >
                  <Star
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${
                      isFilled ? 'text-amber-800 fill-amber-500' : 'text-slate-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Score Summary Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-8">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <span className="text-xs text-amber-700 font-semibold block mb-1">ពិន្ទុសរុប</span>
            <span className="text-3xl font-black text-amber-600 font-fun">
              {formatNumber(score, useKhmerDigits)}
            </span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
            <span className="text-xs text-emerald-700 font-semibold block mb-1">ត្រូវលើកទី១</span>
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-black text-emerald-600 font-fun">
                {formatNumber(firstTryCorrect, useKhmerDigits)}
              </span>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
            <span className="text-xs text-orange-700 font-semibold block mb-1">បានសាកល្បងម្ដងទៀត</span>
            <div className="flex items-center justify-center gap-1">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-black text-orange-600 font-fun">
                {formatNumber(retriedCount, useKhmerDigits)}
              </span>
            </div>
          </div>
        </div>

        {/* CERTIFICATE SECTION */}
        <div className="mb-8 p-5 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl border-2 border-amber-300 text-left">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-amber-900 text-sm sm:text-base">
                វិញ្ញាបនបត្រសរសើរ ថ្នាក់ទី២
              </h3>
            </div>
            <button
              onClick={() => setShowCertificate(!showCertificate)}
              className="text-xs font-bold text-amber-700 bg-white px-3 py-1.5 rounded-xl border border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              {showCertificate ? 'លាក់វិញ្ញាបនបត្រ' : 'បង្ហាញវិញ្ញាបនបត្រ'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <input
              type="text"
              placeholder="វាយបញ្ចូលឈ្មោះសិស្សនៅទីនេះ..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full sm:flex-1 px-4 py-2 bg-white rounded-xl border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => setShowCertificate(true)}
              className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
            >
              បង្កើតវិញ្ញាបនបត្រ
            </button>
          </div>

          {showCertificate && (
            <div
              id="certificate"
              className="mt-4 p-6 sm:p-8 bg-amber-50/50 rounded-2xl border-4 border-double border-amber-600 text-center relative print:m-0"
            >
              <div className="text-4xl mb-2">🎖️</div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">
                ព្រះរាជាណាចក្រកម្ពុជា • ជាតិ សាសនា ព្រះមហាក្សត្រ
              </h4>
              <h3 className="text-xl sm:text-2xl font-bold font-moul text-amber-900 mb-3">
                លិខិតសរសើរគណិតវិទ្យា
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-2">
                វិញ្ញាបនបត្រនេះផ្តល់ជូនដោយក្តីមោទនភាពចំពោះ៖
              </p>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 font-moul my-2 border-b-2 border-dashed border-amber-400 pb-2 inline-block min-w-[200px]">
                {studentName.trim() || 'សិស្សឆ្នើមថ្នាក់ទី២'}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-md mx-auto">
                បានបំពេញការប្រឡងសាកល្បង <strong>ប្រមាណវិធីបូកត្រឹម ១០</strong> ចំនួន ១០ សំណួរ
                ទទួលបានពិន្ទុ <span className="font-bold text-amber-700">{formatNumber(score, useKhmerDigits)}</span> ពិន្ទុ
                និងកម្រិតផ្កាយ {formatNumber(starsCount, useKhmerDigits)}/៣ ⭐
              </p>
              <div className="mt-4 pt-3 flex justify-between items-center text-[10px] text-slate-500 border-t border-amber-200">
                <span>កាលបរិច្ឆេទ៖ {new Date().toLocaleDateString('km-KH')}</span>
                <span className="font-bold text-amber-800">🐘 ប្អូនដំរីឆ្លាត</span>
              </div>

              <div className="mt-4 flex justify-end print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 text-xs bg-white text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>បោះពុម្ព (Print)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Review List of 10 Questions */}
        <div className="mb-8 text-left">
          <h4 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>ពិនិត្យមើលចម្លើយទាំង ១០ សំណួរឡើងវិញ៖</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {questions.map((q, idx) => {
              const status = questionStatuses[idx];
              return (
                <div
                  key={q.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    status === 'correct'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50/70 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-xs border">
                      {formatNumber(idx + 1, useKhmerDigits)}
                    </span>
                    <span className="font-fun font-bold">
                      {formatNumber(q.num1, useKhmerDigits)} + {formatNumber(q.num2, useKhmerDigits)} = {formatNumber(q.answer, useKhmerDigits)}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border">
                    {status === 'correct' ? '✅ លើកទី១' : '🔄 បានសាកល្បងម្ដងទៀត'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestartSame}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-bold text-base shadow-md border-b-4 border-amber-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>លេងសំណុំនេះឡើងវិញ</span>
          </button>

          <button
            onClick={onStartNew}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-98 text-white font-bold text-base shadow-md border-b-4 border-emerald-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>លេងសំណួរថ្មីៗ (១០ សំណួរ)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
