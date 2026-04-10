import React from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  CheckCircle2, 
  Play, 
  ChevronRight, 
  Star, 
  Trophy,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { TOPICS, Topic } from '../data/curriculum';
import { cn } from '../lib/utils';

interface LearningMapProps {
  topics: Topic[];
  completedTopics: string[];
  unlockedTopics: string[];
  onSelectTopic: (topic: Topic) => void;
  onClose: () => void;
}

export const LearningMap: React.FC<LearningMapProps> = ({ 
  topics,
  completedTopics, 
  unlockedTopics, 
  onSelectTopic,
  onClose 
}) => {
  const progress = Math.round((completedTopics.length / topics.length) * 100);
  
  // Group topics by category for "Chapters"
  const chapters = [
    { id: 'DB', name: 'Chương 1: Cơ sở dữ liệu', icon: '📊', color: 'bg-amber-500' },
    { id: 'NET', name: 'Chương 2: Mạng máy tính', icon: '🌐', color: 'bg-sky-500' },
    { id: 'CS', name: 'Chương 3: Lập trình Python', icon: '🐍', color: 'bg-emerald-500' },
    { id: 'ICT', name: 'Chương 4: Tin học và Xã hội', icon: '🤝', color: 'bg-purple-500' },
  ].filter(chapter => topics.some(t => t.category === chapter.id));

  const getTopicStatus = (id: string) => {
    if (completedTopics.includes(id)) return 'completed';
    if (unlockedTopics.includes(id)) return 'active';
    return 'locked';
  };

  const handleContinue = () => {
    const nextTopic = topics.find(t => unlockedTopics.includes(t.id) && !completedTopics.includes(t.id)) || topics[0];
    onSelectTopic(nextTopic);
  };

  return (
    <div className="max-w-4xl w-full mx-auto pb-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-2xl transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </button>
          <div>
            <h2 className="text-3xl font-black dark:text-[var(--heading)]">Lộ trình học tập</h2>
            <p className="text-slate-500 dark:text-slate-400">Chinh phục từng chặng để trở thành chuyên gia!</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-3xl flex items-center gap-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Tiến độ tổng quát</p>
            <div className="flex items-center gap-3">
              <div className="w-32 h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
              <span className="font-black text-emerald-600 dark:text-emerald-400">{progress}%</span>
            </div>
          </div>
          <button 
            onClick={handleContinue}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-4 h-4 fill-white" />
            TIẾP TỤC
          </button>
        </div>
      </div>

      <div className="relative">
        {/* SVG Path for the roadmap */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-slate-200 dark:bg-slate-800 rounded-full hidden md:block" />

        <div className="space-y-24 relative z-10">
          {chapters.map((chapter, chapterIdx) => (
            <section key={chapter.id} className="space-y-12">
              <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 w-fit mx-auto md:mx-0 shadow-sm">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg", chapter.color)}>
                  {chapter.icon}
                </div>
                <div>
                  <h3 className="font-black text-xl dark:text-[var(--heading)]">{chapter.name}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                    {topics.filter(t => t.category === chapter.id).length} BÀI HỌC
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {topics.filter(t => t.category === chapter.id).map((topic, index) => {
                  const status = getTopicStatus(topic.id);
                  const isEven = index % 2 === 0;

                  return (
                    <div 
                      key={topic.id}
                      className={cn(
                        "flex items-center gap-8",
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      )}
                    >
                      {/* Node */}
                      <div className="relative">
                        <motion.button
                          whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
                          whileTap={status !== 'locked' ? { scale: 0.9 } : {}}
                          onClick={() => status !== 'locked' && onSelectTopic(topic)}
                          className={cn(
                            "w-20 h-20 rounded-[2rem] flex items-center justify-center text-3xl shadow-2xl transition-all border-4 relative z-10",
                            status === 'completed' ? "bg-emerald-500 border-emerald-400 text-white" :
                            status === 'active' ? "bg-blue-500 border-blue-400 text-white animate-pulse" :
                            "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                          )}
                        >
                          {status === 'completed' ? <CheckCircle2 className="w-8 h-8" /> :
                           status === 'active' ? <Star className="w-8 h-8 fill-white" /> :
                           <Lock className="w-8 h-8" />}
                        </motion.button>
                        
                        {/* Connecting Line (Mobile) */}
                        {index < topics.filter(t => t.category === chapter.id).length - 1 && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 w-1 bg-slate-200 dark:bg-slate-800 md:hidden" />
                        )}
                      </div>

                      {/* Content Card */}
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={cn(
                          "flex-1 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-6 rounded-[2rem] hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group shadow-sm",
                          status === 'locked' && "opacity-50 grayscale"
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors dark:text-[var(--heading)]">{topic.title}</h4>
                          {status === 'completed' && <Trophy className="w-5 h-5 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{topic.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-400 dark:text-slate-500">
                            <BookOpen className="w-4 h-4" />
                            {topic.questions.length} Câu hỏi
                          </div>
                          {status !== 'locked' && (
                            <div className="flex items-center gap-1 text-xs font-bold text-blue-500 dark:text-blue-400">
                              BẮT ĐẦU <ChevronRight className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
