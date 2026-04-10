import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  RefreshCw, 
  X, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  RotateCw,
  LayoutGrid
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'SELECT trong SQL dùng để làm gì?',
    options: ['Xóa dữ liệu', 'Chọn dữ liệu', 'Thêm dữ liệu'],
    correctAnswer: 1,
    explanation: 'SELECT được dùng để truy vấn và lấy dữ liệu từ bảng.'
  },
  {
    id: 'q2',
    text: 'Khóa chính (Primary Key) có đặc điểm gì?',
    options: ['Có thể trùng', 'Không được trùng', 'Không cần thiết'],
    correctAnswer: 1,
    explanation: 'Khóa chính dùng để định danh duy nhất mỗi bản ghi và không được trùng lặp.'
  },
  {
    id: 'q3',
    text: 'Lệnh nào dùng để thêm dữ liệu vào bảng?',
    options: ['INSERT', 'DELETE', 'UPDATE'],
    correctAnswer: 0,
    explanation: 'INSERT INTO được dùng để thêm bản ghi mới.'
  },
  {
    id: 'q4',
    text: 'Trong Python, biến dùng để làm gì?',
    options: ['Lưu dữ liệu', 'Xóa dữ liệu', 'In dữ liệu'],
    correctAnswer: 0,
    explanation: 'Biến là vùng nhớ dùng để lưu trữ giá trị trong chương trình.'
  },
  {
    id: 'q5',
    text: 'WHERE trong SQL dùng để làm gì?',
    options: ['Sắp xếp', 'Lọc dữ liệu', 'Nhóm dữ liệu'],
    correctAnswer: 1,
    explanation: 'WHERE dùng để chỉ định điều kiện lọc các bản ghi.'
  },
  {
    id: 'q6',
    text: 'Kiểu dữ liệu nào dùng để lưu số nguyên trong Python?',
    options: ['float', 'str', 'int'],
    correctAnswer: 2,
    explanation: 'int (integer) là kiểu dữ liệu số nguyên.'
  },
  {
    id: 'q7',
    text: 'Hàm nào dùng để in dữ liệu ra màn hình Python?',
    options: ['input()', 'print()', 'output()'],
    correctAnswer: 1,
    explanation: 'print() là hàm xuất dữ liệu chuẩn trong Python.'
  },
  {
    id: 'q8',
    text: 'Để xóa bảng trong SQL, ta dùng lệnh nào?',
    options: ['DELETE TABLE', 'REMOVE TABLE', 'DROP TABLE'],
    correctAnswer: 2,
    explanation: 'DROP TABLE xóa toàn bộ cấu trúc và dữ liệu của bảng.'
  },
  {
    id: 'q9',
    text: 'Cấu trúc rẽ nhánh trong Python là gì?',
    options: ['if-else', 'for-in', 'while'],
    correctAnswer: 0,
    explanation: 'if-else dùng để thực hiện các khối lệnh dựa trên điều kiện.'
  },
  {
    id: 'q10',
    text: 'Toán tử so sánh bằng trong Python là gì?',
    options: ['=', '==', '==='],
    correctAnswer: 1,
    explanation: '== dùng để so sánh giá trị, còn = là toán tử gán.'
  }
];

// Tetris Constants
const COLS = 10;
const ROWS = 15;
const BLOCK_SIZE = 24;

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
];

const COLORS = [
  'bg-sky-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-indigo-500',
  'bg-orange-500',
];

interface SmartBrickGameProps {
  onComplete: (xp: number, coins: number) => void;
  onClose: () => void;
}

export const SmartBrickGame: React.FC<SmartBrickGameProps> = ({ onComplete, onClose }) => {
  const [gameState, setGameState] = useState<'start' | 'question' | 'stacking' | 'gameover'>('start');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState<number[][]>(Array(ROWS).fill(0).map(() => Array(COLS).fill(0)));
  const [activePiece, setActivePiece] = useState<{ shape: number[][], x: number, y: number, colorIndex: number } | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [linesCleared, setLinesCleared] = useState(0);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const initGame = () => {
    setGrid(Array(ROWS).fill(0).map(() => Array(COLS).fill(0)));
    setScore(0);
    setLinesCleared(0);
    setGameState('question');
    pickNewQuestion();
  };

  const pickNewQuestion = () => {
    const random = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrentQuestion(random);
    setFeedback(null);
  };

  const handleAnswer = (index: number) => {
    if (feedback?.show) return;

    const isCorrect = index === currentQuestion?.correctAnswer;
    setFeedback({ isCorrect, show: true });

    setTimeout(() => {
      if (isCorrect) {
        setGameState('stacking');
        spawnPiece();
      } else {
        setScore(prev => Math.max(0, prev - 10));
        pickNewQuestion();
      }
    }, 1500);
  };

  const spawnPiece = () => {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    const shape = SHAPES[shapeIndex];
    const colorIndex = shapeIndex;
    const x = Math.floor(COLS / 2) - Math.floor(shape[0].length / 2);
    const y = 0;

    if (checkCollision(shape, x, y, grid)) {
      setGameState('gameover');
      return;
    }

    setActivePiece({ shape, x, y, colorIndex });
  };

  const checkCollision = (shape: number[][], x: number, y: number, currentGrid: number[][]) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] !== 0) {
          const newX = x + c;
          const newY = y + r;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentGrid[newY][newX] !== 0)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const movePiece = (dx: number, dy: number) => {
    if (!activePiece || gameState !== 'stacking') return;

    if (!checkCollision(activePiece.shape, activePiece.x + dx, activePiece.y + dy, grid)) {
      setActivePiece(prev => prev ? { ...prev, x: prev.x + dx, y: prev.y + dy } : null);
    } else if (dy > 0) {
      lockPiece();
    }
  };

  const rotatePiece = () => {
    if (!activePiece || gameState !== 'stacking') return;

    const rotated = activePiece.shape[0].map((_, i) =>
      activePiece.shape.map(row => row[i]).reverse()
    );

    if (!checkCollision(rotated, activePiece.x, activePiece.y, grid)) {
      setActivePiece(prev => prev ? { ...prev, shape: rotated } : null);
    }
  };

  const lockPiece = () => {
    if (!activePiece) return;

    const newGrid = grid.map(row => [...row]);
    activePiece.shape.forEach((row, r) => {
      row.forEach((value, c) => {
        if (value !== 0) {
          const gridY = activePiece.y + r;
          const gridX = activePiece.x + c;
          if (gridY >= 0) {
            newGrid[gridY][gridX] = activePiece.colorIndex + 1;
          }
        }
      });
    });

    // Clear lines
    let lines = 0;
    const filteredGrid = newGrid.filter(row => row.some(cell => cell === 0));
    lines = ROWS - filteredGrid.length;
    const emptyRows = Array(lines).fill(0).map(() => Array(COLS).fill(0));
    const finalGrid = [...emptyRows, ...filteredGrid];

    setGrid(finalGrid);
    setLinesCleared(prev => prev + lines);
    setScore(prev => prev + (lines * 100) + 20); // 20 for landing, 100 per line
    setActivePiece(null);
    
    if (lines > 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: [COLORS[activePiece.colorIndex].replace('bg-', '#')]
      });
    }

    setGameState('question');
    pickNewQuestion();
  };

  // Game Loop for falling
  useEffect(() => {
    if (gameState === 'stacking' && activePiece) {
      gameLoopRef.current = setInterval(() => {
        movePiece(0, 1);
      }, 800);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, activePiece, grid]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'stacking') return;
      switch (e.key) {
        case 'ArrowLeft': movePiece(-1, 0); break;
        case 'ArrowRight': movePiece(1, 0); break;
        case 'ArrowDown': movePiece(0, 1); break;
        case 'ArrowUp': rotatePiece(); break;
        case ' ': lockPiece(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, activePiece, grid]);

  const handleFinish = () => {
    const xp = score;
    const coins = Math.floor(score / 5);
    onComplete(xp, coins);
  };

  return (
    <div className="w-full max-w-4xl bg-slate-900 rounded-[2.5rem] border border-slate-700 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
      {/* Left Side: Question & Info */}
      <div className="flex-1 p-8 flex flex-col border-r border-slate-800 bg-slate-950">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <LayoutGrid className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg dark:text-[var(--heading)]">Xếp Gạch Thông Minh</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Học tập qua từng khối gạch</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors md:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Gamepad2 className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-black mb-4 dark:text-[var(--heading)]">Sẵn sàng xếp gạch?</h3>
                <p className="text-slate-400 mb-8">Trả lời đúng câu hỏi để nhận khối gạch và ghi điểm bằng cách xếp đầy hàng.</p>
                <button 
                  onClick={initGame}
                  className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
                >
                  BẮT ĐẦU CHƠI
                </button>
              </motion.div>
            )}

            {(gameState === 'question' || gameState === 'stacking') && currentQuestion && (
              <motion.div 
                key="question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                  <p className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Câu hỏi nhận gạch</p>
                  <h4 className="text-xl font-bold text-white leading-relaxed">
                    {currentQuestion.text}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      disabled={gameState !== 'question' || feedback?.show}
                      onClick={() => handleAnswer(idx)}
                      className={cn(
                        "p-4 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between group",
                        feedback?.show && idx === currentQuestion.correctAnswer
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : feedback?.show && idx !== currentQuestion.correctAnswer
                          ? "bg-slate-900 border-slate-800 opacity-50"
                          : "bg-slate-900 border-slate-800 hover:border-indigo-500 hover:bg-slate-800 text-slate-300"
                      )}
                    >
                      <span>{option}</span>
                      {feedback?.show && idx === currentQuestion.correctAnswer && <CheckCircle2 className="w-5 h-5" />}
                      {feedback?.show && idx !== currentQuestion.correctAnswer && feedback.isCorrect === false && <AlertCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  ))}
                </div>

                {feedback?.show && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-slate-500 italic"
                  >
                    {feedback.isCorrect ? "Chính xác! Khối gạch đang rơi..." : `Sai rồi! ${currentQuestion.explanation}`}
                  </motion.p>
                )}

                {gameState === 'stacking' && (
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-center">
                    <p className="text-indigo-400 font-bold text-sm">Sử dụng phím mũi tên để điều khiển khối gạch!</p>
                  </div>
                )}
              </motion.div>
            )}

            {gameState === 'gameover' && (
              <motion.div 
                key="gameover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-rose-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-rose-400" />
                </div>
                <h3 className="text-3xl font-black mb-2 text-white dark:text-[var(--heading)]">Kết Thúc!</h3>
                <p className="text-slate-400 mb-8">Bảng đã đầy. Bạn đã ghi được {score} điểm.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <p className="text-2xl font-black text-white">{linesCleared}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Hàng đã xóa</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <p className="text-2xl font-black text-indigo-400">+{score}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">XP Nhận được</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleFinish}
                    className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
                  >
                    NHẬN THƯỞNG
                  </button>
                  <button 
                    onClick={initGame}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" /> CHƠI LẠI
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side: Tetris Board */}
      <div className="w-full md:w-[320px] bg-slate-900 p-6 flex flex-col items-center justify-center relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full transition-colors hidden md:block">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 w-full flex justify-between items-center px-2">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">Điểm số</p>
            <p className="text-2xl font-black text-white tabular-nums">{score}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Hàng</p>
            <p className="text-2xl font-black text-indigo-400 tabular-nums">{linesCleared}</p>
          </div>
        </div>

        {/* Board Container */}
        <div 
          className="bg-slate-950 border-4 border-slate-800 rounded-xl overflow-hidden relative shadow-inner"
          style={{ 
            width: COLS * BLOCK_SIZE, 
            height: ROWS * BLOCK_SIZE,
            backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)',
            backgroundSize: `${BLOCK_SIZE}px ${BLOCK_SIZE}px`
          }}
        >
          {/* Render Grid */}
          {grid.map((row, r) => (
            row.map((cell, c) => (
              cell !== 0 && (
                <div 
                  key={`cell-${r}-${c}`}
                  className={cn(
                    "absolute border border-slate-900/50 rounded-sm shadow-sm",
                    COLORS[cell - 1]
                  )}
                  style={{
                    width: BLOCK_SIZE,
                    height: BLOCK_SIZE,
                    top: r * BLOCK_SIZE,
                    left: c * BLOCK_SIZE
                  }}
                />
              )
            ))
          ))}

          {/* Render Active Piece */}
          {activePiece && (
            activePiece.shape.map((row, r) => (
              row.map((value, c) => (
                value !== 0 && (
                  <motion.div 
                    key={`active-${r}-${c}`}
                    layoutId={`active-${r}-${c}`}
                    className={cn(
                      "absolute border border-slate-900/50 rounded-sm shadow-lg z-10",
                      COLORS[activePiece.colorIndex]
                    )}
                    style={{
                      width: BLOCK_SIZE,
                      height: BLOCK_SIZE,
                      top: (activePiece.y + r) * BLOCK_SIZE,
                      left: (activePiece.x + c) * BLOCK_SIZE
                    }}
                  />
                )
              ))
            ))
          )}

          {gameState === 'question' && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center z-20">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Đang chờ đáp án...</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="mt-8 grid grid-cols-3 gap-2 md:hidden w-full max-w-[240px]">
          <div />
          <button onClick={() => rotatePiece()} className="p-4 bg-slate-800 rounded-xl flex items-center justify-center"><RotateCw className="w-6 h-6" /></button>
          <div />
          <button onClick={() => movePiece(-1, 0)} className="p-4 bg-slate-800 rounded-xl flex items-center justify-center"><ArrowLeft className="w-6 h-6" /></button>
          <button onClick={() => movePiece(0, 1)} className="p-4 bg-slate-800 rounded-xl flex items-center justify-center"><ArrowDown className="w-6 h-6" /></button>
          <button onClick={() => movePiece(1, 0)} className="p-4 bg-slate-800 rounded-xl flex items-center justify-center"><ArrowRight className="w-6 h-6" /></button>
        </div>
        
        <div className="mt-6 hidden md:block text-center">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Phím điều khiển</p>
          <div className="flex gap-2 mt-2 justify-center">
            <kbd className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold border border-slate-700">← →</kbd>
            <kbd className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold border border-slate-700">↑ Xoay</kbd>
            <kbd className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold border border-slate-700">↓ Rơi</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpCircle = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);
