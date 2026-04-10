import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Trophy, 
  Flame, 
  Star, 
  Calendar, 
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Edit2,
  CheckCircle2,
  Share2,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { BADGES, ACHIEVEMENTS, BadgeTier } from '../data/curriculum';
import { cn } from '../lib/utils';

interface ProfileProps {
  user: {
    xp: number;
    coins: number;
    completedTopics: string[];
    earnedBadges: string[];
    streak: number;
    displayName: string | null;
    avatar: string;
    studyHistory: string[];
    achievementProgress: { [key: string]: number };
    achievementCompletions: { [key: string]: number };
    earnedAchievements: string[];
    settings: {
      darkMode: boolean;
      textColor: string;
      fontFamily: string;
      fontSize: string;
    };
  };
  onClose: () => void;
  onLogout: () => void;
  onOpenSettings: () => void;
  onUpdateAvatar: (avatar: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const TierColors: Record<BadgeTier, string> = {
  Common: 'border-slate-200 dark:border-slate-700 text-slate-500',
  Rare: 'border-blue-200 dark:border-blue-700 text-blue-500 bg-blue-50/50 dark:bg-blue-900/20',
  Epic: 'border-purple-200 dark:border-purple-700 text-purple-500 bg-purple-50/50 dark:bg-purple-900/20',
  Legendary: 'border-amber-400 dark:border-amber-600 text-amber-600 bg-gradient-to-br from-amber-50 to-purple-50 dark:from-amber-900/20 dark:to-purple-900/20 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
};

export const Profile: React.FC<ProfileProps> = ({ user, onClose, onLogout, onOpenSettings, onUpdateAvatar, darkMode, setDarkMode }) => {
  const [selectedBadge, setSelectedBadge] = React.useState<string | null>(null);
  const [showAvatarPicker, setShowAvatarPicker] = React.useState(false);

  const avatars = ['👨‍💻', '👩‍💻', '🤖', '🚀', '🌟', '🎓', '📚', '💻', '🎮', '💡', '🔥', '🌈', '🐱', '🐶', '🦊', '🐼'];

  const stats = [
    { label: 'Tổng XP', value: user.xp, icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Chuỗi ngày', value: `${user.streak} ngày`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Bài học', value: user.completedTopics.length, icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Huy hiệu', value: user.earnedBadges.length, icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 pb-20">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-md text-white transition-all"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-md text-white transition-all flex items-center gap-2"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            <span className="text-xs font-bold pr-1">{darkMode ? 'Sáng' : 'Tối'}</span>
          </button>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 mb-8">
            <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[2.5rem] border-4 border-white dark:border-slate-800 flex items-center justify-center text-6xl shadow-xl relative group">
              {user.avatar}
              <button 
                onClick={() => setShowAvatarPicker(true)}
                className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                title="Đổi ảnh đại diện"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-black dark:text-[var(--heading)] mb-1">{user.displayName || 'Người dùng'}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Học viên EduQuest • Cấp độ {Math.floor(user.xp / 100) + 1}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onOpenSettings}
                className="px-6 py-3 bg-white dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 hover:border-blue-500 text-slate-700 dark:text-white rounded-2xl font-bold transition-all flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Cài đặt
              </button>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all">
                Chỉnh sửa hồ sơ
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                    onLogout();
                  }
                }}
                className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-rose-500/10 hover:text-rose-500 dark:text-slate-300 rounded-2xl transition-all"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 text-center">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <p className="text-2xl font-black dark:text-[var(--heading)]">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {/* Achievements Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black dark:text-[var(--heading)] flex items-center gap-2">
                  <Trophy className="text-amber-500" />
                  Thành tựu
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement) => {
                  const completions = user.achievementCompletions[achievement.id] || 0;
                  const isMaxLevel = completions >= achievement.maxCompletions;
                  const percentage = Math.min(Math.round((completions / achievement.maxCompletions) * 100), 100);

                  return (
                    <div 
                      key={achievement.id}
                      className={cn(
                        "p-6 rounded-[2rem] border transition-all relative overflow-hidden group",
                        isMaxLevel 
                          ? "bg-gradient-to-br from-amber-500/10 to-purple-500/10 border-amber-500/30 shadow-lg shadow-amber-500/10" 
                          : completions > 0
                          ? "bg-white dark:bg-slate-800 border-blue-100 dark:border-blue-900/30 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-700"
                      )}
                    >
                      {isMaxLevel && (
                        <motion.div 
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 pointer-events-none"
                        />
                      )}
                      
                      <div className="flex items-start gap-4 mb-4 relative z-10">
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-110",
                          isMaxLevel ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : completions > 0 ? "bg-blue-500/10" : "bg-slate-200 dark:bg-slate-700"
                        )}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold dark:text-[var(--heading)]">{achievement.name}</h4>
                            {isMaxLevel && (
                              <span className="px-2 py-0.5 bg-amber-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest animate-pulse">
                                Max Level
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{achievement.description}</p>
                        </div>
                        {completions > 0 && (
                          <div className={cn(
                            "p-1 rounded-full",
                            isMaxLevel ? "bg-amber-500 text-white" : "bg-blue-500 text-white"
                          )}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2 relative z-10">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                          <span className="text-slate-400">{completions} / {achievement.maxCompletions} lần đạt</span>
                          <span className={isMaxLevel ? "text-amber-500" : "text-blue-500"}>{percentage}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className={cn(
                              "h-full rounded-full transition-all",
                              isMaxLevel ? "bg-amber-500" : "bg-blue-500"
                            )}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-[10px] font-bold">
                          Thưởng mỗi lần: {achievement.rewardXp} XP
                        </div>
                        {isMaxLevel && achievement.finalBonusXp && (
                          <div className="px-3 py-1 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black border border-amber-500/30">
                            Bonus Max: +{achievement.finalBonusXp} XP
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black dark:text-[var(--heading)] flex items-center gap-2">
                    <Award className="text-purple-500" />
                    Huy hiệu đã đạt
                  </h3>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {user.earnedBadges.length} / {BADGES.length}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {BADGES.map((badge) => {
                    const isEarned = user.earnedBadges.includes(badge.id);
                    const isLegendary = badge.tier === 'Legendary';

                    return (
                      <motion.div 
                        key={badge.id}
                        whileHover={isEarned ? { scale: 1.05, y: -5 } : {}}
                        onClick={() => isEarned && setSelectedBadge(badge.id)}
                        className={cn(
                          "aspect-square rounded-3xl flex flex-col items-center justify-center p-4 border transition-all cursor-pointer relative group",
                          isEarned 
                            ? cn("bg-white dark:bg-slate-800 shadow-sm", TierColors[badge.tier]) 
                            : "bg-slate-50 dark:bg-slate-900/50 border-dashed border-slate-200 dark:border-slate-800 opacity-40"
                        )}
                      >
                        {isEarned && isLegendary && (
                          <motion.div 
                            animate={{ 
                              opacity: [0.4, 0.8, 0.4],
                              scale: [1, 1.15, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-purple-500/20 to-amber-400/20 rounded-3xl blur-xl"
                          />
                        )}
                        <span className={cn(
                          "text-3xl mb-2 relative z-10",
                          isEarned && isLegendary && "drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-pulse"
                        )}>
                          {badge.icon}
                        </span>
                        <span className={cn(
                          "text-[10px] font-bold text-center leading-tight relative z-10",
                          isEarned && isLegendary ? "text-amber-700 dark:text-amber-300" : "dark:text-slate-300"
                        )}>{badge.name}</span>
                        
                        {isEarned && (
                          <div className={cn(
                            "absolute -top-1 -right-1 px-1.5 py-0.5 text-[8px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
                            isLegendary ? "bg-amber-500 text-white" : "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800"
                          )}>
                            {badge.tier}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black dark:text-[var(--heading)] flex items-center gap-2">
                    <Calendar className="text-blue-500" />
                    Lịch sử học tập
                  </h3>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-700 p-6">
                  <div className="space-y-4">
                    {user.studyHistory.length > 0 ? (
                      user.studyHistory.slice(-5).reverse().map((date, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="font-bold dark:text-slate-200">Đã học ngày {new Date(date).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-500">+50 XP</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-400">Chưa có lịch sử học tập.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 border-t border-slate-100 dark:border-slate-700 pt-8">
          <button 
            onClick={onLogout}
            className="w-full py-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-2xl font-black transition-all flex items-center justify-center gap-3 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            ĐĂNG XUẤT TÀI KHOẢN
          </button>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] max-w-md w-full p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black dark:text-[var(--heading)]">Chọn ảnh đại diện</h3>
                <button 
                  onClick={() => setShowAvatarPicker(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 dark:text-slate-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                {avatars.map((avatar, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onUpdateAvatar(avatar);
                      setShowAvatarPicker(false);
                    }}
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95",
                      user.avatar === avatar 
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-110 border-2 border-blue-400" 
                        : "bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700"
                    )}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowAvatarPicker(false)}
                className="w-full py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-2xl font-bold transition-all"
              >
                Đóng
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] max-w-sm w-full p-8 text-center shadow-2xl"
            >
              <div className="relative mb-6">
                <button 
                  onClick={() => setSelectedBadge(null)}
                  className="absolute -top-4 -right-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors z-20"
                >
                  <X className="w-4 h-4 dark:text-[var(--heading)]" />
                </button>
                {BADGES.find(b => b.id === selectedBadge)?.tier === 'Legendary' && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-yellow-500/20 rounded-full blur-2xl"
                  />
                )}
                <div className="text-7xl relative z-10">{BADGES.find(b => b.id === selectedBadge)?.icon}</div>
              </div>
              
              <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                {BADGES.find(b => b.id === selectedBadge)?.tier} Badge
              </div>
              
              <h3 className="text-2xl font-black dark:text-[var(--heading)] mb-2">{BADGES.find(b => b.id === selectedBadge)?.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">{BADGES.find(b => b.id === selectedBadge)?.description}</p>
              
              <div className="flex gap-3 mb-8">
                <button className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Chia sẻ
                </button>
                <button 
                  onClick={() => setSelectedBadge(null)}
                  className="px-6 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-2xl font-bold transition-all"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
