import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Trophy, RefreshCw, X, Timer, CheckCircle2, AlertCircle, ChevronRight, Keyboard, List, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';

interface SQLQuestion {
  id: string;
  query: string;
  answer: string;
  options: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const SQL_QUESTIONS: SQLQuestion[] = [
  // Easy
  {
    id: 'e1',
    query: '___ * FROM HocSinh',
    answer: 'SELECT',
    options: ['SELECT', 'FROM', 'WHERE', 'SHOW'],
    explanation: 'SELECT được dùng để chọn dữ liệu từ bảng.',
    difficulty: 'easy'
  },
  {
    id: 'e2',
    query: 'SELECT * ___ HocSinh',
    answer: 'FROM',
    options: ['IN', 'FROM', 'TABLE', 'OF'],
    explanation: 'FROM xác định bảng mà dữ liệu được lấy ra.',
    difficulty: 'easy'
  },
  {
    id: 'e3',
    query: '___ INTO HocSinh (Ten, Tuoi) VALUES ("An", 17)',
    answer: 'INSERT',
    options: ['ADD', 'PUT', 'INSERT', 'CREATE'],
    explanation: 'INSERT INTO dùng để thêm bản ghi mới vào bảng.',
    difficulty: 'easy'
  },
  // Medium
  {
    id: 'm1',
    query: 'SELECT * FROM HocSinh ___ diem > 5',
    answer: 'WHERE',
    options: ['IF', 'HAVING', 'WHERE', 'WHEN'],
    explanation: 'WHERE dùng để lọc các bản ghi thỏa mãn điều kiện.',
    difficulty: 'medium'
  },
  {
    id: 'm2',
    query: 'SELECT * FROM HocSinh ___ Ten ASC',
    answer: 'ORDER BY',
    options: ['SORT BY', 'ORDER BY', 'GROUP BY', 'ARRANGE'],
    explanation: 'ORDER BY dùng để sắp xếp kết quả truy vấn.',
    difficulty: 'medium'
  },
  {
    id: 'm3',
    query: '___ HocSinh SET Tuoi = 18 WHERE Id = 1',
    answer: 'UPDATE',
    options: ['CHANGE', 'MODIFY', 'UPDATE', 'SET'],
    explanation: 'UPDATE dùng để cập nhật dữ liệu hiện có trong bảng.',
    difficulty: 'medium'
  },
  {
    id: 'm4',
    query: 'SELECT ___ Ten FROM HocSinh',
    answer: 'DISTINCT',
    options: ['UNIQUE', 'ONLY', 'DISTINCT', 'DIFFERENT'],
    explanation: 'DISTINCT dùng để loại bỏ các giá trị trùng lặp.',
    difficulty: 'medium'
  },
  // Hard
  {
    id: 'h1',
    query: 'SELECT * FROM Lop ___ HocSinh ON Lop.Id = HocSinh.LopId',
    answer: 'JOIN',
    options: ['CONNECT', 'LINK', 'JOIN', 'MERGE'],
    explanation: 'JOIN dùng để kết hợp các hàng từ hai hoặc nhiều bảng.',
    difficulty: 'hard'
  },
  {
    id: 'h2',
    query: 'SELECT LopId, COUNT(*) FROM HocSinh ___ LopId',
    answer: 'GROUP BY',
    options: ['ORDER BY', 'SORT BY', 'GROUP BY', 'COLLECT'],
    explanation: 'GROUP BY dùng để nhóm các hàng có cùng giá trị.',
    difficulty: 'hard'
  },
  {
    id: 'h3',
    query: 'SELECT LopId, AVG(Diem) FROM HocSinh GROUP BY LopId ___ AVG(Diem) > 5',
    answer: 'HAVING',
    options: ['WHERE', 'HAVING', 'IF', 'WHEN'],
    explanation: 'HAVING dùng để lọc dữ liệu sau khi đã nhóm (GROUP BY).',
    difficulty: 'hard'
  },
  {
    id: 'h4',
    query: '___ FROM HocSinh WHERE Id = 10',
    answer: 'DELETE',
    options: ['REMOVE', 'DROP', 'DELETE', 'CLEAR'],
    explanation: 'DELETE dùng để xóa các bản ghi khỏi bảng.',
    difficulty: 'hard'
  }
];

interface SQLFillGameProps {
  onComplete: (xp: number, coins: number) => void;
  onClose: () => void;
}

export const SQLFillGame: React.FC<SQLFillGameProps> = ({ onComplete, onClose }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [mode, setMode] = useState<'choice' | 'input'>('choice');
  const [questions, setQuestions] = useState<SQLQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [hints, setHints] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initGame = (selectedDiff: 'easy' | 'medium' | 'hard') => {
    const filtered = SQL_QUESTIONS.filter(q => q.difficulty === selectedDiff);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setDifficulty(selectedDiff);
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setTime(0);
    setWrongAttempts(0);
    setHints(0);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const handleAnswer = (answer: string) => {
    if (feedback?.show) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = answer.trim().toUpperCase() === currentQuestion.answer.toUpperCase();

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ isCorrect: true, show: true });
      setWrongAttempts(0);
      
      // Play success sound logic could go here
      
      setTimeout(() => {
        nextQuestion();
      }, 1500);
    } else {
      setWrongAttempts(prev => prev + 1);
      setFeedback({ isCorrect: false, show: true });
      
      // If wrong twice, show hint automatically or allow user to see explanation
      if (wrongAttempts + 1 >= 2) {
        setHints(prev => prev + 1);
      }

      setTimeout(() => {
        setFeedback(null);
        setUserInput('');
      }, 1500);
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setUserInput('');
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setGameState('result');
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (score === questions.length) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#fbbf24', '#f472b6']
      });
    }
  };

  const calculateRewards = () => {
    const diffMultiplier = difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1;
    const accuracy = score / questions.length;
    const xp = Math.floor(score * 50 * diffMultiplier * accuracy);
    const coins = Math.floor(score * 10 * diffMultiplier * accuracy);
    return { xp, coins };
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="w-full max-w-3xl bg-slate-900 rounded-[2.5rem] border border-slate-700 overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Database className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg dark:text-[var(--heading)]">SQL Fill-in-the-Blanks</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Thử thách truy vấn dữ liệu</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-8 flex flex-col relative bg-slate-950">
        {gameState === 'start' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-20 h-20 bg-sky-500/20 rounded-3xl flex items-center justify-center mb-6"
            >
              <Database className="w-10 h-10 text-sky-400" />
            </motion.div>
            <h3 className="text-3xl font-black mb-4 dark:text-[var(--heading)]">Sẵn sàng truy vấn?</h3>
            <p className="text-slate-400 mb-8 max-w-md">
              Điền các từ khóa SQL còn thiếu vào chỗ trống để hoàn thành câu lệnh truy vấn chính xác.
            </p>

            <div className="space-y-6 w-full max-w-sm">
              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button 
                  onClick={() => setMode('choice')}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                    mode === 'choice' ? "bg-sky-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  )}
                >
                  <List className="w-4 h-4" /> Trắc nghiệm
                </button>
                <button 
                  onClick={() => setMode('input')}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                    mode === 'input' ? "bg-sky-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  )}
                >
                  <Keyboard className="w-4 h-4" /> Nhập liệu
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => initGame('easy')} className="p-4 bg-slate-800 border border-slate-700 rounded-2xl hover:border-emerald-500 transition-all group">
                  <p className="text-xl mb-1">🌱</p>
                  <p className="text-[10px] font-black text-emerald-400 uppercase">Dễ</p>
                </button>
                <button onClick={() => initGame('medium')} className="p-4 bg-slate-800 border border-slate-700 rounded-2xl hover:border-amber-500 transition-all group">
                  <p className="text-xl mb-1">🔥</p>
                  <p className="text-[10px] font-black text-amber-400 uppercase">Vừa</p>
                </button>
                <button onClick={() => initGame('hard')} className="p-4 bg-slate-800 border border-slate-700 rounded-2xl hover:border-rose-500 transition-all group">
                  <p className="text-xl mb-1">⚡</p>
                  <p className="text-[10px] font-black text-rose-400 uppercase">Khó</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <div className="flex-1 flex flex-col">
            {/* HUD */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
                  <Timer className="w-4 h-4 text-sky-400" />
                  <span className="font-black tabular-nums">{formatTime(time)}</span>
                </div>
                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 mr-2">CÂU</span>
                  <span className="font-black">{currentIndex + 1}/{questions.length}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="font-black text-xl">{score}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full mb-12 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                className="h-full bg-sky-500"
              />
            </div>

            {/* Question Area */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full bg-slate-900/50 border border-slate-800 p-8 rounded-3xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
                <p className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">SQL Query</p>
                <div className="font-mono text-2xl sm:text-3xl text-white leading-relaxed break-all">
                  {currentQuestion.query.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={cn(
                          "inline-block min-w-[120px] border-b-4 mx-2 text-center transition-all",
                          feedback?.show 
                            ? feedback.isCorrect ? "border-emerald-500 text-emerald-400" : "border-rose-500 text-rose-400"
                            : "border-sky-500 text-sky-400"
                        )}>
                          {feedback?.show ? currentQuestion.answer : (userInput || '___')}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="w-full max-w-md">
                {mode === 'choice' ? (
                  <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        disabled={feedback?.show}
                        onClick={() => handleAnswer(option)}
                        className={cn(
                          "py-4 rounded-2xl font-black transition-all border-2",
                          feedback?.show && option === currentQuestion.answer
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                            : feedback?.show && option !== currentQuestion.answer
                            ? "bg-slate-800 border-slate-700 opacity-50"
                            : "bg-slate-800 border-slate-700 hover:border-sky-500 hover:bg-slate-700 text-white"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAnswer(userInput);
                    }}
                    className="relative"
                  >
                    <input 
                      type="text"
                      value={userInput}
                      disabled={feedback?.show}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Nhập từ khóa..."
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 py-4 text-xl font-black text-white focus:border-sky-500 outline-none transition-all uppercase"
                      autoFocus
                    />
                    <button 
                      type="submit"
                      disabled={!userInput || feedback?.show}
                      className="absolute right-2 top-2 bottom-2 px-6 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 text-white rounded-xl font-black transition-all"
                    >
                      GỬI
                    </button>
                  </form>
                )}
              </div>

              {/* Feedback & Explanation */}
              <AnimatePresence>
                {feedback?.show && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 text-center"
                  >
                    <div className={cn(
                      "flex items-center justify-center gap-2 mb-2 font-bold",
                      feedback.isCorrect ? "text-emerald-400" : "text-rose-400"
                    )}>
                      {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      {feedback.isCorrect ? 'CHÍNH XÁC!' : 'CHƯA ĐÚNG!'}
                    </div>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto italic">
                      "{currentQuestion.explanation}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint Button */}
              {!feedback?.show && wrongAttempts >= 1 && (
                <button 
                  onClick={() => {
                    setWrongAttempts(2); // Force hint
                    setHints(prev => prev + 1);
                  }}
                  className="mt-6 flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors text-xs font-bold uppercase"
                >
                  <HelpCircle className="w-4 h-4" /> Xem gợi ý
                </button>
              )}
              
              {wrongAttempts >= 2 && !feedback?.show && (
                <div className="mt-4 p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400 text-xs font-bold">
                  Gợi ý: Từ khóa này bắt đầu bằng "{currentQuestion.answer[0]}"
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-amber-500/20 rounded-[2rem] flex items-center justify-center mb-6 relative">
              <Trophy className="w-12 h-12 text-amber-400" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-black"
              >
                !
              </motion.div>
            </div>
            <h3 className="text-4xl font-black mb-2 dark:text-[var(--heading)]">Hoàn Thành!</h3>
            <p className="text-slate-400 mb-8">Bạn đã chinh phục thử thách SQL trong {formatTime(time)}</p>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-3xl font-black text-white">{score}/{questions.length}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Độ chính xác</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-3xl font-black text-sky-400">+{calculateRewards().xp}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">XP Nhận được</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-sm">
              <button 
                onClick={() => onComplete(calculateRewards().xp, calculateRewards().coins)}
                className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
              >
                NHẬN THƯỞNG <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setGameState('start')}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> CHƠI LẠI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
