import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Award, GripVertical, BookOpen, Play } from 'lucide-react';
import { Question, Topic } from '../data/curriculum';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';

type Difficulty = 'easy' | 'normal' | 'hard';

interface QuizProps {
  topic: Topic;
  onComplete: (score: number, total: number, difficulty: Difficulty) => void;
  onClose: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ topic, onComplete, onClose }) => {
  const [showTheory, setShowTheory] = useState(!!topic.theory);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillAnswer, setFillAnswer] = useState('');
  const [sortingItems, setSortingItems] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState<{question: Question, selected: number | string | number[]}[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (difficulty) {
      // Select and shuffle questions based on difficulty
      let pool = [...topic.questions];
      let count = 10;

      if (difficulty === 'easy') {
        count = 10;
        pool.sort((a, b) => {
          const order: Record<string, number> = { easy: 0, medium: 1, hard: 2 };
          return (order[a.difficulty || 'easy'] || 0) - (order[b.difficulty || 'easy'] || 0);
        });
      } else if (difficulty === 'normal') {
        count = 15;
        pool.sort((a, b) => {
          const aDiff = a.difficulty || 'easy';
          const bDiff = b.difficulty || 'easy';
          if (aDiff === 'medium' && bDiff !== 'medium') return -1;
          if (bDiff === 'medium' && aDiff !== 'medium') return 1;
          return 0;
        });
      } else {
        count = 20;
        pool.sort((a, b) => {
          const order: Record<string, number> = { hard: 0, medium: 1, easy: 2 };
          return (order[a.difficulty || 'easy'] || 0) - (order[b.difficulty || 'easy'] || 0);
        });
      }

      // Take a slightly larger pool to randomize from
      const topPoolSize = Math.min(pool.length, Math.max(count, Math.floor(count * 1.3)));
      let selectedPool = pool.slice(0, topPoolSize);
      
      // Shuffle the selected pool
      for (let i = selectedPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedPool[i], selectedPool[j]] = [selectedPool[j], selectedPool[i]];
      }

      // Final selection and shuffle options
      const finalQuestions = selectedPool.slice(0, count).map(q => {
        if (q.type === 'true-false' || q.type === 'sorting' || q.type === 'fill-in-the-blank') return q;
        
        const optionsWithIndices = q.options.map((opt, idx) => ({ opt, idx }));
        for (let i = optionsWithIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
        }
        
        return {
          ...q,
          options: optionsWithIndices.map(item => item.opt),
          correctAnswer: optionsWithIndices.findIndex(item => item.idx === q.correctAnswer)
        };
      });

      setQuestions(finalQuestions);
    }
  }, [difficulty, topic.questions]);

  useEffect(() => {
    if (currentQuestion?.type === 'sorting') {
      // Shuffle indices for sorting
      const indices = currentQuestion.options.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setSortingItems(indices);
    }
  }, [currentQuestionIndex, currentQuestion]);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    let correct = false;
    if (currentQuestion.type === 'sorting') {
      const correctOrder = currentQuestion.correctAnswer as number[];
      correct = JSON.stringify(sortingItems) === JSON.stringify(correctOrder);
    } else if (currentQuestion.type === 'fill-in-the-blank') {
      const answer = (currentQuestion.correctAnswer as string).toLowerCase().trim();
      correct = fillAnswer.toLowerCase().trim() === answer;
    } else {
      correct = selectedOption === currentQuestion.correctAnswer;
    }

    if (correct) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectQuestions(prev => [...prev, { 
        question: currentQuestion, 
        selected: currentQuestion.type === 'sorting' ? sortingItems : currentQuestion.type === 'fill-in-the-blank' ? fillAnswer : selectedOption!
      }]);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setFillAnswer('');
      setSortingItems([]);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      let isLastCorrect = false;
      if (currentQuestion.type === 'sorting') {
        isLastCorrect = JSON.stringify(sortingItems) === JSON.stringify(currentQuestion.correctAnswer);
      } else if (currentQuestion.type === 'fill-in-the-blank') {
        isLastCorrect = fillAnswer.toLowerCase().trim() === (currentQuestion.correctAnswer as string).toLowerCase().trim();
      } else {
        isLastCorrect = selectedOption === currentQuestion.correctAnswer;
      }
        
      if (score + (isLastCorrect ? 1 : 0) === questions.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  if (showTheory && topic.theory) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 max-w-2xl w-full mx-auto shadow-2xl shadow-slate-200/50 dark:shadow-none"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold dark:text-[var(--heading)]">{topic.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Lý thuyết trọng tâm</p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="markdown-body">
            <ReactMarkdown>{topic.theory}</ReactMarkdown>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-white rounded-2xl font-bold transition-colors"
          >
            Quay lại
          </button>
          <button 
            onClick={() => setShowTheory(false)}
            className="flex-[2] py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
          >
            <Play className="w-4 h-4 fill-white" />
            BẮT ĐẦU KIỂM TRA
          </button>
        </div>
      </motion.div>
    );
  }

  if (!difficulty || questions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 max-w-md w-full mx-auto shadow-2xl shadow-slate-200/50 dark:shadow-none"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-[var(--heading)]">Chọn độ khó</h2>
        <div className="space-y-4">
          {[
            { id: 'easy', label: 'Dễ', desc: 'Thưởng tiêu chuẩn', color: 'bg-emerald-500' },
            { id: 'normal', label: 'Bình thường', desc: 'Thưởng x1.5', color: 'bg-blue-500' },
            { id: 'hard', label: 'Khó', desc: 'Thưởng x2.0', color: 'bg-rose-500' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id as Difficulty)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 hover:border-blue-500 transition-all text-left group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg dark:text-[var(--heading)]">{d.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{d.desc}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${d.color} group-hover:scale-125 transition-transform`} />
              </div>
            </button>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors font-bold"
        >
          Hủy bỏ
        </button>
      </motion.div>
    );
  }

  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl text-center max-w-2xl w-full mx-auto border border-slate-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <Award className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2 dark:text-[var(--heading)]">Hoàn thành!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Bạn đã hoàn thành chủ đề: <br/><span className="text-slate-800 dark:text-[var(--heading)] font-semibold">{topic.title}</span></p>
        
        <div className="text-5xl font-black text-blue-500 mb-4">
          {score}/{questions.length}
        </div>
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-8 tracking-widest">Độ khó: {difficulty === 'easy' ? 'Dễ' : difficulty === 'normal' ? 'Bình thường' : 'Khó'}</p>

        {incorrectQuestions.length > 0 && (
          <div className="mb-8 text-left">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-[var(--heading)]">
              <BookOpen className="w-5 h-5 text-rose-500" />
              Phần cần ôn tập ({incorrectQuestions.length})
            </h3>
            <div className="space-y-4">
              {incorrectQuestions.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <p className="font-medium mb-2 dark:text-slate-200">{item.question.text}</p>
                  <div className="text-sm space-y-1">
                    <p className="text-rose-500">
                      <span className="font-bold">Bạn chọn:</span> {
                        item.question.type === 'multiple-choice' || item.question.type === 'true-false' || !item.question.type
                          ? item.question.options[item.selected as number]
                          : String(item.selected)
                      }
                    </p>
                    <p className="text-emerald-500">
                      <span className="font-bold">Đáp án đúng:</span> {
                        item.question.type === 'multiple-choice' || item.question.type === 'true-false' || !item.question.type
                          ? item.question.options[item.question.correctAnswer as number]
                          : String(item.question.correctAnswer)
                      }
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 italic">
                    {item.question.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => onComplete(score, questions.length, difficulty)}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold transition-colors shadow-lg shadow-blue-500/20"
        >
          Nhận thưởng & Quay lại
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-blue-500 uppercase tracking-wider">{topic.title}</span>
          <span className="text-sm text-slate-400 dark:text-slate-500">Câu hỏi {currentQuestionIndex + 1}/{questions.length}</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div 
        key={currentQuestionIndex}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 mb-6 shadow-sm"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-medium leading-relaxed dark:text-[var(--heading)] flex-1">{currentQuestion.text}</h3>
          {currentQuestion.difficulty && (
            <span className={`ml-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              currentQuestion.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-500' :
              currentQuestion.difficulty === 'medium' ? 'bg-blue-500/10 text-blue-500' :
              'bg-rose-500/10 text-rose-500'
            }`}>
              {currentQuestion.difficulty === 'easy' ? 'Dễ' : currentQuestion.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
            </span>
          )}
        </div>

        {currentQuestion.type === 'sorting' ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest mb-4">Kéo thả để sắp xếp:</p>
            <Reorder.Group axis="y" values={sortingItems} onReorder={setSortingItems} className="space-y-3">
              {sortingItems.map((index) => (
                <Reorder.Item
                  key={index}
                  value={index}
                  dragListener={!isAnswered}
                  className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 flex items-center gap-4 transition-all ${
                    isAnswered 
                      ? (currentQuestion.correctAnswer as number[])[sortingItems.indexOf(index)] === index
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : 'border-rose-500/50 bg-rose-500/5'
                      : 'border-slate-100 dark:border-slate-700 hover:border-blue-500/30 cursor-grab active:cursor-grabbing'
                  }`}
                >
                  {!isAnswered && <GripVertical className="w-5 h-5 text-slate-400" />}
                  <code className="text-blue-600 dark:text-blue-400 font-mono">{currentQuestion.options[index]}</code>
                  {isAnswered && (
                    <div className="ml-auto">
                      {(currentQuestion.correctAnswer as number[])[sortingItems.indexOf(index)] === index ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  )}
                </Reorder.Item>
              ))}
            </Reorder.Group>
            {isAnswered && JSON.stringify(sortingItems) !== JSON.stringify(currentQuestion.correctAnswer) && (
              <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase mb-2">Thứ tự đúng:</p>
                <div className="space-y-1">
                  {(currentQuestion.correctAnswer as number[]).map((idx, i) => (
                    <div key={i} className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
                      {i + 1}. {currentQuestion.options[idx]}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : currentQuestion.type === 'fill-in-the-blank' ? (
          <div className="space-y-4">
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => !isAnswered && setFillAnswer(e.target.value)}
              placeholder="Nhập đáp án của bạn..."
              className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 transition-all outline-none ${
                isAnswered
                  ? fillAnswer.toLowerCase().trim() === (currentQuestion.correctAnswer as string).toLowerCase().trim()
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                    : 'border-rose-500 bg-rose-500/10 text-rose-600'
                  : 'border-slate-100 dark:border-slate-700 focus:border-blue-500'
              }`}
              disabled={isAnswered}
            />
            {isAnswered && fillAnswer.toLowerCase().trim() !== (currentQuestion.correctAnswer as string).toLowerCase().trim() && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase">Đáp án đúng:</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{currentQuestion.correctAnswer as string}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                  selectedOption === index 
                    ? isAnswered 
                      ? index === currentQuestion.correctAnswer 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-rose-500 bg-rose-500/10'
                      : 'border-blue-500 bg-blue-500/10'
                    : isAnswered && index === currentQuestion.correctAnswer
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500/30 dark:text-[var(--heading)]'
                }`}
              >
                <span>{option}</span>
                {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle2 className="text-emerald-500 w-5 h-5" />}
                {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && <XCircle className="text-rose-500 w-5 h-5" />}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300"
            >
              <p className="font-bold text-blue-500 mb-1">Giải thích:</p>
              {currentQuestion.explanation}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-between items-center">
        <button 
          onClick={onClose}
          className="px-6 py-3 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors font-bold"
        >
          Thoát
        </button>
        
        {!isAnswered ? (
          <button 
            onClick={handleCheckAnswer}
            disabled={
              (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false' || !currentQuestion.type) && selectedOption === null ||
              (currentQuestion.type === 'fill-in-the-blank' && fillAnswer.trim() === '')
            }
            className={`px-8 py-3 rounded-2xl font-bold transition-all text-white ${
              (currentQuestion.type === 'sorting' || (currentQuestion.type === 'fill-in-the-blank' && fillAnswer.trim() !== '') || (selectedOption !== null)) ? 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            Kiểm tra
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
