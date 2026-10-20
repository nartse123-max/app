import React, { useState } from 'react';
import { FRUIT_EMOJIS, formatNumber } from '../utils/khmerNumerals';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface VisualCounterProps {
  num1: number;
  num2: number;
  itemType: string;
  itemNameKhmer: string;
  useKhmerDigits: boolean;
  isMuted: boolean;
}

export const VisualCounter: React.FC<VisualCounterProps> = ({
  num1,
  num2,
  itemType,
  itemNameKhmer,
  useKhmerDigits,
  isMuted,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countedItems, setCountedItems] = useState<Set<string>>(new Set());

  const emoji = FRUIT_EMOJIS[itemType] || '⭐';

  // Cap visual items at 30 to keep UI clean if numbers are large, or show tens bundles
  const renderItemPills = (count: number, prefix: string) => {
    // If count > 20, we can show groups of 10s and ones
    if (count > 20) {
      const tens = Math.floor(count / 10);
      const ones = count % 10;
      return (
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-2 bg-amber-50/70 rounded-xl">
          {Array.from({ length: tens }).map((_, tIdx) => (
            <div
              key={`${prefix}-ten-${tIdx}`}
              className="bg-white px-2 py-1 rounded-lg border border-amber-200 text-xs font-bold text-amber-800 shadow-sm flex items-center gap-1"
            >
              <span>{emoji}x{formatNumber(10, useKhmerDigits)}</span>
              <span className="text-[10px] text-amber-600 bg-amber-100 px-1 rounded">១ដប់</span>
            </div>
          ))}
          {ones > 0 && (
            <div className="flex flex-wrap gap-1 items-center justify-center">
              {Array.from({ length: ones }).map((_, oIdx) => {
                const itemId = `${prefix}-one-${oIdx}`;
                const isTapped = countedItems.has(itemId);
                return (
                  <button
                    key={itemId}
                    onClick={() => {
                      playClickSound(isMuted);
                      setCountedItems((prev) => {
                        const next = new Set(prev);
                        if (next.has(itemId)) next.delete(itemId);
                        else next.add(itemId);
                        return next;
                      });
                    }}
                    className={`text-xl p-1 rounded-lg transition-transform active:scale-125 cursor-pointer select-none ${
                      isTapped ? 'bg-amber-200 ring-2 ring-amber-400 scale-110' : 'hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-1 p-2 bg-amber-50/70 rounded-xl max-w-xs">
        {Array.from({ length: count }).map((_, idx) => {
          const itemId = `${prefix}-${idx}`;
          const isTapped = countedItems.has(itemId);
          return (
            <button
              key={itemId}
              onClick={() => {
                playClickSound(isMuted);
                setCountedItems((prev) => {
                  const next = new Set(prev);
                  if (next.has(itemId)) next.delete(itemId);
                  else next.add(itemId);
                  return next;
                });
              }}
              title={`រាប់ទី ${idx + 1}`}
              className={`text-xl sm:text-2xl p-1 rounded-lg transition-all duration-150 active:scale-125 cursor-pointer select-none ${
                isTapped ? 'bg-amber-200 ring-2 ring-amber-400 scale-110' : 'hover:scale-110'
              }`}
            >
              {emoji}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => {
          playClickSound(isMuted);
          setIsOpen(!isOpen);
        }}
        className="mx-auto flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-700 bg-amber-100/80 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm border border-amber-200"
      >
        {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        <span>{isOpen ? 'លាក់រូបភាពជំនួយរាប់' : 'ចុចមើលរូបភាពជំនួយរាប់'}</span>
        <span className="text-base">{emoji}</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-3.5 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-2 border-dashed border-amber-300 animate-pop">
          <div className="flex items-center justify-center gap-1 text-xs text-amber-800 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              ជំនួយរាប់ {itemNameKhmer} (ចុចលើរូបដើម្បីរាប់ម្តងមួយៗ):
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Group 1 */}
            <div className="text-center">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                {itemNameKhmer} {formatNumber(num1, useKhmerDigits)}
              </span>
              {renderItemPills(num1, 'grp1')}
            </div>

            <div className="text-2xl font-black text-amber-500 font-fun">+</div>

            {/* Group 2 */}
            <div className="text-center">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                {itemNameKhmer} {formatNumber(num2, useKhmerDigits)}
              </span>
              {renderItemPills(num2, 'grp2')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
