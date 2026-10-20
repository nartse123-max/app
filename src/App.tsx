import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultsScreen } from './components/ResultsScreen';
import { INITIAL_QUESTIONS, generateGrade2Questions } from './data/questions';
import { QuestionData } from './utils/khmerNumerals';
import { playSuccessSound, playErrorSound, playFanfareSound, playClickSound } from './utils/audio';
import { BookOpen, Sparkles, Smile, Star } from 'lucide-react';

export default function App() {
  const [questions, setQuestions] = useState<QuestionData[]>(INITIAL_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [useKhmerDigits, setUseKhmerDigits] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Per-question tracking
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [wrongOptions, setWrongOptions] = useState<number[]>([]);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean>(false);
  const [hasRetriedCurrent, setHasRetriedCurrent] = useState<boolean>(false);

  // Question statuses for progress bar and results
  const [questionStatuses, setQuestionStatuses] = useState<Array<'pending' | 'correct' | 'retried'>>(
    Array(10).fill('pending')
  );

  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // Trigger fanfare when quiz finishes
  useEffect(() => {
    if (isQuizComplete) {
      playFanfareSound(isMuted);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isQuizComplete, isMuted]);

  const currentQuestion = questions[currentIndex];

  // Handle student clicking one of the 3 answer buttons
  const handleSelectOption = (option: number) => {
    if (isCurrentCorrect) return; // Already solved
    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      // CORRECT ANSWER
      playSuccessSound(isMuted);
      setIsCurrentCorrect(true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {
        // Safe fallback
      }

      const pointsEarned = hasRetriedCurrent ? 5 : 10;
      setScore((prev) => prev + pointsEarned);

      if (!hasRetriedCurrent) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
      }

      setQuestionStatuses((prev) => {
        const next = [...prev];
        next[currentIndex] = hasRetriedCurrent ? 'retried' : 'correct';
        return next;
      });
    } else {
      // INCORRECT ANSWER
      playErrorSound(isMuted);
      setWrongOptions((prev) => (prev.includes(option) ? prev : [...prev, option]));
      setHasRetriedCurrent(true);
      setStreak(0);
    }
  };

  // Student clicks "Continue / បន្តទៅសំណួរខាងមុខទៀត"
  const handleNextQuestion = () => {
    playClickSound(isMuted);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setWrongOptions([]);
      setIsCurrentCorrect(false);
      setHasRetriedCurrent(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  // Replay exact same 10 questions
  const handleRestartSame = () => {
    playClickSound(isMuted);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setWrongOptions([]);
    setIsCurrentCorrect(false);
    setHasRetriedCurrent(false);
    setQuestionStatuses(Array(10).fill('pending'));
    setIsQuizComplete(false);
  };

  // Generate 10 new Grade 2 questions
  const handleStartNew = () => {
    playClickSound(isMuted);
    const newQuestions = generateGrade2Questions();
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setWrongOptions([]);
    setIsCurrentCorrect(false);
    setHasRetriedCurrent(false);
    setQuestionStatuses(Array(10).fill('pending'));
    setIsQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-amber-100/60 flex flex-col justify-between">
      <div>
        {/* Playful Header */}
        <Header
          score={score}
          streak={streak}
          useKhmerDigits={useKhmerDigits}
          onToggleDigits={() => setUseKhmerDigits(!useKhmerDigits)}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          onReset={handleRestartSame}
        />

        {/* Floating background decorative blobs */}
        <div className="fixed top-20 left-4 text-4xl opacity-20 pointer-events-none select-none animate-float">
          🎈
        </div>
        <div className="fixed top-40 right-6 text-4xl opacity-20 pointer-events-none select-none animate-float" style={{ animationDelay: '1.5s' }}>
          ⭐
        </div>
        <div className="fixed bottom-20 left-8 text-4xl opacity-20 pointer-events-none select-none animate-float" style={{ animationDelay: '2.5s' }}>
          🍎
        </div>

        {/* Content based on state */}
        {!isQuizComplete ? (
          <main>
            {/* Progress Bar & Steps */}
            <ProgressBar
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              useKhmerDigits={useKhmerDigits}
              questionStatuses={questionStatuses}
            />

            {/* Current Question Card with 3 buttons */}
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                useKhmerDigits={useKhmerDigits}
                selectedOption={selectedOption}
                wrongOptions={wrongOptions}
                isCorrect={isCurrentCorrect}
                onSelectOption={handleSelectOption}
                onNextQuestion={handleNextQuestion}
                isMuted={isMuted}
              />
            )}
          </main>
        ) : (
          <main>
            <ResultsScreen
              score={score}
              totalQuestions={questions.length}
              questionStatuses={questionStatuses}
              questions={questions}
              useKhmerDigits={useKhmerDigits}
              onRestartSame={handleRestartSame}
              onStartNew={handleStartNew}
            />
          </main>
        )}
      </div>

      {/* Child-friendly Educational Footer */}
      <footer className="w-full py-4 px-4 text-center text-xs text-amber-800/80 border-t border-amber-200/50 bg-white/70 backdrop-blur-sm mt-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span>🇰🇭 កម្មវិធីលំហាត់គណិតវិទ្យាថ្នាក់ទី២ តាមកម្មវិធីសិក្សាកម្ពុជា</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <Smile className="w-3.5 h-3.5 text-amber-500" />
              <span>រៀនបណ្តើរ លេងបណ្តើរ</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>ពូកែគណិតវិទ្យា</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
