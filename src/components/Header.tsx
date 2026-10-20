import React from 'react';
import { Volume2, VolumeX, Star, Flame, RotateCcw } from 'lucide-react';
import { formatNumber } from '../utils/khmerNumerals';

interface HeaderProps {
  score: number;
  streak: number;
  useKhmerDigits: boolean;
  onToggleDigits: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  score,
  streak,
  useKhmerDigits,
  onToggleDigits,
  isMuted,
  onToggleMute,
  onReset,
}) => {
  return (
    <header className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white shadow-lg rounded-b-3xl px-4 py-3 sm:py-4 transition-all">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Mascot & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-amber-200 transform hover:scale-105 transition-transform animate-float select-none">
            🐘
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide backdrop-blur-sm">
                ថ្នាក់ទី២ • Grade 2
              </span>
              <span className="bg-emerald-500/80 text-xs px-2 py-0.5 rounded-full font-bold">
                បូកត្រឹម ១០
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold font-moul tracking-wide drop-shadow-sm leading-tight mt-0.5">
              ល្បងប្រាជ្ញាគណិតវិទ្យា
            </h1>
          </div>
        </div>

        {/* Action Controls & Score Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap ml-auto">
          {/* Score Badge */}
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/30 shadow-inner">
            <Star className="w-5 h-5 text-yellow-200 fill-yellow-300 animate-pulse" />
            <div className="text-right">
              <span className="text-[10px] block opacity-90 font-medium">ពិន្ទុ</span>
              <span className="text-base sm:text-lg font-black leading-none">
                {formatNumber(score, useKhmerDigits)}
              </span>
            </div>
          </div>

          {/* Streak Badge (if > 1) */}
          {streak > 1 && (
            <div className="flex items-center gap-1 bg-amber-500/40 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-yellow-300/40 animate-bounce">
              <Flame className="w-4 h-4 text-yellow-300 fill-yellow-400" />
              <span className="text-xs font-bold text-yellow-100">
                x{formatNumber(streak, useKhmerDigits)}
              </span>
            </div>
          )}

          {/* Numeral Toggle Button */}
          <button
            onClick={onToggleDigits}
            title={useKhmerDigits ? 'ប្ដូរទៅលេខអារ៉ាប់ (1, 2, 3)' : 'ប្ដូរទៅលេខខ្មែរ (១, ២, ៣)'}
            className="flex items-center gap-1 bg-white/25 hover:bg-white/35 active:scale-95 px-2.5 py-1.5 rounded-2xl text-xs font-bold border border-white/30 transition-all cursor-pointer shadow-sm"
          >
            <span className="text-sm">{useKhmerDigits ? '១២៣' : '123'}</span>
            <span className="hidden sm:inline opacity-90 text-[11px]">
              {useKhmerDigits ? 'លេខខ្មែរ' : 'អារ៉ាប់'}
            </span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'បើកសំឡេង' : 'បិទសំឡេង'}
            aria-label={isMuted ? 'បើកសំឡេង' : 'បិទសំឡេង'}
            className="w-9 h-9 flex items-center justify-center bg-white/25 hover:bg-white/35 active:scale-95 rounded-2xl border border-white/30 transition-all cursor-pointer shadow-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-100" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>

          {/* Restart Button */}
          <button
            onClick={onReset}
            title="ចាប់ផ្ដើមឡើងវិញ"
            aria-label="ចាប់ផ្ដើមឡើងវិញ"
            className="w-9 h-9 flex items-center justify-center bg-white/25 hover:bg-white/35 active:scale-95 rounded-2xl border border-white/30 transition-all cursor-pointer shadow-sm text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
