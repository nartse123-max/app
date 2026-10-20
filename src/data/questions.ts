import { QuestionData } from '../utils/khmerNumerals';

export const INITIAL_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    num1: 3,
    num2: 2,
    answer: 5,
    options: [4, 5, 6],
    itemType: 'apple',
    itemNameKhmer: 'ផ្លែប៉ោម',
  },
  {
    id: 2,
    num1: 4,
    num2: 4,
    answer: 8,
    options: [7, 8, 9],
    itemType: 'banana',
    itemNameKhmer: 'ផ្លែចេក',
  },
  {
    id: 3,
    num1: 2,
    num2: 5,
    answer: 7,
    options: [6, 7, 8],
    itemType: 'candy',
    itemNameKhmer: 'ស្ករគ្រាប់',
  },
  {
    id: 4,
    num1: 6,
    num2: 3,
    answer: 9,
    options: [8, 9, 10],
    itemType: 'balloon',
    itemNameKhmer: 'ប៉េងប៉ោង',
  },
  {
    id: 5,
    num1: 5,
    num2: 5,
    answer: 10,
    options: [8, 9, 10],
    itemType: 'mango',
    itemNameKhmer: 'ផ្លែស្វាយ',
  },
  {
    id: 6,
    num1: 1,
    num2: 6,
    answer: 7,
    options: [5, 7, 8],
    itemType: 'star',
    itemNameKhmer: 'ផ្កាយ',
  },
  {
    id: 7,
    num1: 4,
    num2: 2,
    answer: 6,
    options: [5, 6, 7],
    itemType: 'apple',
    itemNameKhmer: 'ផ្លែប៉ោម',
  },
  {
    id: 8,
    num1: 7,
    num2: 3,
    answer: 10,
    options: [8, 9, 10],
    itemType: 'balloon',
    itemNameKhmer: 'ប៉េងប៉ោង',
  },
  {
    id: 9,
    num1: 3,
    num2: 5,
    answer: 8,
    options: [6, 8, 9],
    itemType: 'mango',
    itemNameKhmer: 'ផ្លែស្វាយ',
  },
  {
    id: 10,
    num1: 2,
    num2: 2,
    answer: 4,
    options: [3, 4, 5],
    itemType: 'star',
    itemNameKhmer: 'ផ្កាយ',
  },
];

// Shuffle helper
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const ITEMS: Array<{ type: QuestionData['itemType']; name: string }> = [
  { type: 'apple', name: 'ផ្លែប៉ោម' },
  { type: 'banana', name: 'ផ្លែចេក' },
  { type: 'candy', name: 'ស្ករគ្រាប់' },
  { type: 'balloon', name: 'ប៉េងប៉ោង' },
  { type: 'mango', name: 'ផ្លែស្វាយ' },
  { type: 'star', name: 'ផ្កាយ' },
];

/**
 * Generate 10 addition questions where both numbers and answer are <= 10
 */
export function generateGrade2Questions(): QuestionData[] {
  const validPairs: [number, number][] = [];
  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      if (a + b <= 10) {
        validPairs.push([a, b]);
      }
    }
  }

  const chosenPairs = shuffleArray(validPairs).slice(0, 10);
  const questions: QuestionData[] = [];

  chosenPairs.forEach((pair, i) => {
    const sum = pair[0] + pair[1];

    // Generate 2 distractors that are <= 10, >= 1, and != sum
    const possibleDistractors: number[] = [];
    for (let candidate = 1; candidate <= 10; candidate++) {
      if (candidate !== sum) {
        possibleDistractors.push(candidate);
      }
    }

    // Prefer numbers close to sum (e.g. ±1 or ±2)
    possibleDistractors.sort((a, b) => Math.abs(a - sum) - Math.abs(b - sum));
    const distractors = shuffleArray(possibleDistractors.slice(0, 4)).slice(0, 2);

    const options = shuffleArray([sum, distractors[0], distractors[1]]);
    const item = ITEMS[i % ITEMS.length];

    questions.push({
      id: i + 1,
      num1: pair[0],
      num2: pair[1],
      answer: sum,
      options,
      itemType: item.type,
      itemNameKhmer: item.name,
    });
  });

  return questions;
}
