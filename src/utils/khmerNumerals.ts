/**
 * Khmer Numerals and Grade 2 localized helpers
 */

export const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

export function toKhmerDigits(num: number | string): string {
  const str = num.toString();
  return str.replace(/[0-9]/g, (digit) => khmerDigits[parseInt(digit, 10)]);
}

export function formatNumber(num: number, useKhmerDigits: boolean): string {
  if (useKhmerDigits) {
    return toKhmerDigits(num);
  }
  return num.toString();
}

export interface QuestionData {
  id: number;
  num1: number;
  num2: number;
  answer: number;
  options: number[];
  itemType: 'apple' | 'star' | 'balloon' | 'banana' | 'mango' | 'candy';
  itemNameKhmer: string;
}

export const FRUIT_EMOJIS: Record<string, string> = {
  apple: '🍎',
  star: '⭐',
  balloon: '🎈',
  banana: '🍌',
  mango: '🥭',
  candy: '🍬',
};
