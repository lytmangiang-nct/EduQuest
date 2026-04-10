import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Trophy, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'normal' | 'hard';

interface BinaryGameProps {
  onComplete: (xp: number, coins: number) => void;
  onClose: () => void;
}

export const BinaryGame: React.FC<BinaryGameProps> = ({ onComplete, onClose }) => {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [target, setTarget] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [fallingBits, setFallingBits] = useState<{ id: number; value: number; x: number; y: number }[]>([]);
  
  const gameLoopRef = useRef<number | null>(null);
  const nextIdRef = useRef(0);

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setGameState('playing');
    setScore(0);
    
    const time = diff === 'easy' ? 30 : diff === 'normal' ? 25 : 20;
    const maxTarget = diff === 'easy' ? 15 : diff === 'normal' ? 31 : 63;
    
    setTimeLeft(time);
    setCurrentValue(0);
    setTarget(Math.floor(Math.random() * maxTarget) + 1);
    setFallingBits([]);
  };

  useEffect(() => {
    if (gameState !== 'playing' || !difficulty) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('end');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, difficulty]);

  useEffect(() => {
    if (gameState !== 'playing' || !difficulty) return;

    const spawnIntervalTime = difficulty === 'easy' ? 1040 : difficulty === 'normal' ? 780 : 520;
    const speed = difficulty === 'easy' ? 1.05 : difficulty === 'normal' ? 1.4 : 1.75;

    const spawnBit = () => {
      const newBit = {
        id: nextIdRef.current++,
        value: Math.random() > 0.5 ? 1 : 0,
        x: Math.random() * 80 + 10, // 10% to 90%
        y: -10,
      };
      setFallingBits(prev => [...prev, newBit]);
    };

    const spawnInterval = setInterval(spawnBit, spawnIntervalTime);

    const updateBits = () => {
      setFallingBits(prev => 
        prev
          .map(bit => ({ ...bit, y: bit.y + speed }))
          .filter(bit => bit.y < 110)
      );
      gameLoopRef.current = requestAnimationFrame(updateBits);
    };

    gameLoopRef.current = requestAnimationFrame(updateBits);

    return () => {
      clearInterval(spawnInterval);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, difficulty]);

  const handleCatch = (bitId: number, value: number) => {
    setFallingBits(prev => prev.filter(b => b.id !== bitId));
    
    const newValue = currentValue + (value === 1 ? 1 : 0);
    const maxTarget = difficulty === 'easy' ? 15 : difficulty === 'normal' ? 31 : 63;
    
    if (newValue === target) {
      setScore(prev => prev + 1);
      setCurrentValue(0);
      setTarget(Math.floor(Math.random() * maxTarget) + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 }
      });
    } else if (newValue > target) {
      setCurrentValue(0); // Reset if overflow
    } else {
      setCurrentValue(newValue);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden relative min-h-[500px] flex flex-col">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <Gamepad2 className="text-sky-400" />
          <h2 className="font-bold dark:text-[var(--heading)]">Binary Catcher</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950">
        {gameState === 'start' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-30">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              👾
            </motion.div>
            <h3 className="text-3xl font-black mb-4 dark:text-[var(--heading)]">Thu thập số Nhị phân</h3>
            <p className="text-slate-400 mb-8">Hứng các bit <span className="text-sky-400 font-bold">1</span> để đạt được số mục tiêu. Tránh làm tổng vượt quá mục tiêu!</p>
            
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              {[
                { id: 'easy', label: 'Dễ', color: 'bg-emerald-500' },
                { id: 'normal', label: 'Bình thường', color: 'bg-sky-500' },
                { id: 'hard', label: 'Khó', color: 'bg-rose-500' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => startGame(d.id as Difficulty)}
                  className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-500 transition-all group"
                >
                  <p className="font-bold text-sm mb-1">{d.label}</p>
                  <div className={`h-1 w-full rounded-full ${d.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Mục tiêu</p>
                <p className="text-2xl font-black text-sky-400">{target}</p>
              </div>
              <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Hiện tại</p>
                <p className="text-2xl font-black text-white">{currentValue}</p>
              </div>
              <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Thời gian</p>
                <p className="text-2xl font-black text-rose-400">{timeLeft}s</p>
              </div>
            </div>

            <div className="absolute inset-0">
              {fallingBits.map(bit => (
                <motion.button
                  key={bit.id}
                  onClick={() => handleCatch(bit.id, bit.value)}
                  style={{ left: `${bit.x}%`, top: `${bit.y}%` }}
                  className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-lg border-2 transition-transform hover:scale-110 ${
                    bit.value === 1 
                      ? 'bg-sky-500 border-sky-300 text-white' 
                      : 'bg-slate-700 border-slate-500 text-slate-400'
                  }`}
                >
                  {bit.value}
                </motion.button>
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/50 px-6 py-2 rounded-full border border-slate-700 backdrop-blur-sm">
              <span className="text-sm font-bold text-slate-400">Điểm: </span>
              <span className="text-xl font-black text-yellow-400">{score}</span>
            </div>
          </>
        )}

        {gameState === 'end' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-30 bg-slate-950/80 backdrop-blur-sm">
            <Trophy className="w-20 h-20 text-yellow-400 mb-4" />
            <h3 className="text-3xl font-black mb-2 dark:text-[var(--heading)]">Hết giờ!</h3>
            <p className="text-slate-400 mb-8">Bạn đã ghi được <span className="text-white font-bold">{score}</span> điểm.</p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-500 font-bold uppercase">XP Nhận</p>
                <p className="text-2xl font-black text-sky-400">+{Math.floor(score * 20 * (difficulty === 'hard' ? 2 : difficulty === 'normal' ? 1.5 : 1))}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-500 font-bold uppercase">Coins Nhận</p>
                <p className="text-2xl font-black text-yellow-400">+{Math.floor(score * 5 * (difficulty === 'hard' ? 2 : difficulty === 'normal' ? 1.5 : 1))}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setGameState('start')}
                className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-colors"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
              <button 
                onClick={() => onComplete(
                  Math.floor(score * 20 * (difficulty === 'hard' ? 2 : difficulty === 'normal' ? 1.5 : 1)), 
                  Math.floor(score * 5 * (difficulty === 'hard' ? 2 : difficulty === 'normal' ? 1.5 : 1))
                )}
                className="px-10 py-4 bg-sky-500 hover:bg-sky-600 rounded-2xl font-black transition-all"
              >
                NHẬN THƯỞNG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
