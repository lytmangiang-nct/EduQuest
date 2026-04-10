import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Crown, FileBadge, Gift, Info, X, Download, Printer } from 'lucide-react';
import { cn } from '../lib/utils';
import { getTopUsers } from '../lib/firebase';
import { Certificate } from './Certificate';

interface LeaderboardEntry {
  id: string;
  displayName: string;
  xp: number;
  avatar: string;
  streak?: number;
  completedTopicsCount?: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentUserXp: number;
  activeMascotId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserXp, activeMascotId = 'black-cat' }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<{ 
    name: string; 
    rank: number; 
    xp: number;
    streak: number;
    completedTopicsCount: number;
  } | null>(null);
  const [showRewardsInfo, setShowRewardsInfo] = useState(false);

  useEffect(() => {
    const unsubscribe = getTopUsers((users) => {
      setEntries(users);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold flex items-center gap-2 dark:text-[var(--heading)]">
            <Trophy className="text-yellow-400 w-5 h-5" />
            Bảng xếp hạng trực tuyến
          </h2>
          <button 
            onClick={() => setShowRewardsInfo(true)}
            className="p-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-500/20 text-blue-500 dark:text-blue-400 rounded-xl transition-all border border-slate-100 dark:border-blue-500/20 flex items-center gap-2 group"
          >
            <Gift className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Phần thưởng</span>
          </button>
        </div>

        <div className="space-y-3 min-h-[200px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-10 space-y-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Đang tải...</p>
            </div>
          ) : entries.length > 0 ? (
            entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-[1.5rem] border transition-all group",
                  entry.xp === currentUserXp // Simple check for current user highlight
                    ? "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/30 ring-1 ring-blue-100 dark:ring-blue-500/20" 
                    : "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center font-black text-sm">
                    {index === 0 ? <Crown className="w-5 h-5 text-yellow-400" /> : 
                     index === 1 ? <Medal className="w-5 h-5 text-slate-300" /> :
                     index === 2 ? <Medal className="w-5 h-5 text-amber-600" /> :
                     <span className="text-slate-400 dark:text-slate-500">{index + 1}</span>}
                  </div>
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    {entry.avatar || '👨‍💻'}
                  </div>
                  <div>
                    <p className={cn("font-bold text-sm", entry.xp === currentUserXp ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-200")}>
                      {entry.displayName}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">{entry.xp} XP</p>
                  </div>
                </div>

                {/* Certificate Button for Top 5 */}
                <button
                  onClick={() => setSelectedCertificate({ 
                    name: entry.displayName, 
                    rank: index + 1, 
                    xp: entry.xp,
                    streak: entry.streak || 0,
                    completedTopicsCount: entry.completedTopicsCount || 0
                  })}
                  className="p-2 bg-white dark:bg-slate-800 hover:bg-blue-500 text-slate-400 hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-md border border-slate-100 dark:border-slate-700"
                  title="Nhận Giấy Chứng Nhận"
                >
                  <FileBadge className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-xs text-slate-400 italic">Chưa có ai trên bảng xếp hạng.</p>
            </div>
          )}
        </div>
        
        <p className="mt-4 text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium italic">
          Bảng xếp hạng tự động cập nhật trực tuyến.
        </p>
      </section>

      {/* Rewards Info Modal */}
      <AnimatePresence>
        {showRewardsInfo && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-xl">
                    <Gift className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-[var(--heading)]">Phần thưởng Bảng xếp hạng</h3>
                </div>
                <button 
                  onClick={() => setShowRewardsInfo(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                      <FileBadge className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 dark:text-[var(--heading)] mb-1">Giấy Chứng Nhận Danh Dự</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        Dành riêng cho <span className="text-blue-500 font-bold">Top 5</span> người chơi xuất sắc nhất. Giấy chứng nhận ghi nhận thành tích, thứ hạng và tổng điểm XP của bạn.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                      <Download className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">Tải về ảnh</span>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                      <Printer className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">In ấn trực tiếp</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-4">
                  <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Cách nhận thưởng:</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Khi lọt vào Top 5, hãy nhấn vào biểu tượng <FileBadge className="inline w-3 h-3 mx-1" /> xuất hiện bên cạnh tên của bạn trên bảng xếp hạng để xem và tải giấy chứng nhận.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowRewardsInfo(false)}
                  className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                  Đã hiểu, tôi sẽ cố gắng!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCertificate && (
          <Certificate
            userName={selectedCertificate.name}
            rank={selectedCertificate.rank}
            xp={selectedCertificate.xp}
            streak={selectedCertificate.streak}
            completedTopicsCount={selectedCertificate.completedTopicsCount}
            onClose={() => setSelectedCertificate(null)}
            mascotId={activeMascotId}
            type="honor"
          />
        )}
      </AnimatePresence>
    </>
  );
};
