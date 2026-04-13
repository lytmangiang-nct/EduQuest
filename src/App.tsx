import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  BookOpen, 
  Gamepad2, 
  ShoppingBag, 
  User as UserIcon, 
  ChevronRight, 
  Star,
  Zap,
  LayoutGrid,
  Database,
  Network,
  Code2,
  Coins,
  Play,
  Flame,
  LogOut,
  Edit2,
  RefreshCw,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Sun,
  Moon,
  Palette,
  Home,
  Layout,
  GraduationCap,
  FileBadge
} from 'lucide-react';
import { TOPICS, BADGES, ACHIEVEMENTS, SHOP_ITEMS, Topic, Badge, ShopItem } from './data/curriculum';
import { MASCOTS, Mascot } from './data/mascots';
import { Quiz } from './components/Quiz';
import { Shop } from './components/Shop';
import { BinaryGame } from './components/BinaryGame';
import { SQLFillGame } from './components/SQLFillGame';
import { SmartBrickGame } from './components/SmartBrickGame';
import { AIChatbot } from './components/AIChatbot';
import { LearningMap } from './components/LearningMap';
import { SecurityGame } from './components/SecurityGame';
import { MascotOverlay } from './components/MascotOverlay';
import { Leaderboard } from './components/Leaderboard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Profile } from './components/Profile';
import { Auth } from './components/Auth';
import { Settings } from './components/Settings';
import { Certificate } from './components/Certificate';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { cn } from './lib/utils';
import { auth, db, syncUserProfile, handleFirestoreError, OperationType } from './lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface GradeProgress {
  completedTopics: string[];
  unlockedTopics: string[];
}

interface UserState {
  xp: number;
  coins: number;
  completedTopics: string[];
  unlockedTopics: string[];
  currentGrade: 10 | 11 | 12;
  gradeProgress: {
    10: GradeProgress;
    11: GradeProgress;
    12: GradeProgress;
  };
  totalCompletions: number;
  earnedBadges: string[];
  inventory: string[];
  streak: number;
  lastLogin: string | null;
  studyHistory: string[]; // List of dates YYYY-MM-DD
  totalStudyTime: number; // In minutes
  displayName: string | null;
  avatar: string;
  unlockedMascots: string[];
  activeMascotId: string;
  achievementProgress: { [key: string]: number }; // Raw progress (e.g. total perfect DB quizzes)
  achievementCompletions: { [key: string]: number }; // Number of times fully earned
  consecutivePerfectQuizzes: number;
  earnedAchievements: string[];
  settings: {
    darkMode: boolean;
    textColor: string;
    fontFamily: string;
    fontSize: 'small' | 'medium' | 'large' | 'xl';
  };
}

const GradeSwitcher = ({ currentGrade, onGradeChange, darkMode }: { currentGrade: number, onGradeChange: (grade: 10 | 11 | 12) => void, darkMode: boolean }) => {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
      {[10, 11, 12].map((grade) => (
        <button
          key={grade}
          onClick={() => onGradeChange(grade as 10 | 11 | 12)}
          className={cn(
            "px-4 py-1.5 rounded-xl text-xs font-black transition-all",
            currentGrade === grade
              ? "bg-white dark:bg-slate-700 text-blue-500 shadow-sm"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          LỚP {grade}
        </button>
      ))}
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('eduquest_user');
    const defaultUser: UserState = {
      xp: 0,
      coins: 0,
      completedTopics: [],
      unlockedTopics: [TOPICS.find(t => t.grade === 10)?.id || ''],
      currentGrade: 10,
      gradeProgress: {
        10: { completedTopics: [], unlockedTopics: [TOPICS.find(t => t.grade === 10)?.id || ''] },
        11: { completedTopics: [], unlockedTopics: [TOPICS.find(t => t.grade === 11)?.id || ''] },
        12: { completedTopics: [], unlockedTopics: [TOPICS.find(t => t.grade === 12)?.id || ''] },
      },
      totalCompletions: 0,
      earnedBadges: [],
      inventory: [],
      streak: 0,
      lastLogin: null,
      studyHistory: [],
      totalStudyTime: 0,
      displayName: null,
      avatar: '👨‍💻',
      unlockedMascots: MASCOTS.filter(m => m.unlockedByDefault).map(m => m.id),
      activeMascotId: 'black-cat',
      achievementProgress: {},
      achievementCompletions: {},
      consecutivePerfectQuizzes: 0,
      earnedAchievements: [],
      settings: {
        darkMode: false,
        textColor: 'default',
        fontFamily: 'font-sans',
        fontSize: 'medium'
      }
    };
    if (!saved) return defaultUser;
    const parsed = JSON.parse(saved);
    return { ...defaultUser, ...parsed };
  });

  const [view, setView] = useState<'dashboard' | 'quiz' | 'shop' | 'games' | 'roadmap' | 'profile' | 'settings' | 'graduation'>('dashboard');
  const filteredTopics = TOPICS.filter(t => t.grade === user.currentGrade);
  const [activeGame, setActiveGame] = useState<'binary' | 'sql' | 'brick' | 'security' | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('eduquest_dark_mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [activeMascotOverlay, setActiveMascotOverlay] = useState<{
    mascot: Mascot;
    performance: 'perfect' | 'good' | 'average' | 'poor' | 'motivation';
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u);
      if (u && !u.isAnonymous) {
        // Fetch user data from Firestore to sync local state
        const path = `users/${u.uid}`;
        try {
          const userDoc = await getDoc(doc(db, 'users', u.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUser(prev => ({
              ...prev,
              ...data,
              displayName: u.displayName || data.displayName || prev.displayName,
              avatar: data.avatar || prev.avatar
            }));
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, path);
        }
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (firebaseUser && user.displayName) {
      syncUserProfile(firebaseUser, user.displayName, user.xp, user.avatar, user.streak, user.completedTopics.length, user.settings);
    }
  }, [firebaseUser, user.xp, user.displayName, user.avatar, user.streak, user.completedTopics.length, user.settings]);

  // Apply UI Settings
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Dark Mode
    if (user.settings.darkMode) {
      root.classList.add('dark');
      setDarkMode(true);
    } else {
      root.classList.remove('dark');
      setDarkMode(false);
    }

    // Font Family
    body.style.setProperty('--current-font', `var(--${user.settings.fontFamily})`);
    
    // Font Size
    const sizeMap = { small: '14px', medium: '16px', large: '18px', xl: '20px' };
    body.style.setProperty('--current-size', sizeMap[user.settings.fontSize]);
    
    // Text Color
    if (user.settings.textColor === 'default') {
      body.style.removeProperty('--current-text-color');
    } else {
      const COLORS = [
        { id: 'default', light: '#1e293b', dark: '#93c5fd' },
        { id: 'blue', light: '#2563eb', dark: '#60a5fa' },
        { id: 'green', light: '#16a34a', dark: '#4ade80' },
        { id: 'purple', light: '#7c3aed', dark: '#a78bfa' },
        { id: 'orange', light: '#ea580c', dark: '#fb923c' },
      ];
      const color = COLORS.find(c => c.id === user.settings.textColor);
      if (color) {
        body.style.setProperty('--current-text-color', user.settings.darkMode ? color.dark : color.light);
      }
    }
  }, [user.settings]);

  // Track study time (every minute)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = user.lastLogin;

    if (lastLogin !== today) {
      setUser(prev => {
        let newStreak = prev.streak;
        if (!lastLogin) {
          newStreak = 1;
        } else {
          const lastDate = new Date(lastLogin);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        }
        return { ...prev, streak: newStreak, lastLogin: today };
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eduquest_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('eduquest_dark_mode', darkMode.toString());
  }, [darkMode]);

  const handleTopicSelect = (topic: Topic) => {
    setActiveTopic(topic);
    setView('quiz');
  };

  const handleGradeChange = (grade: 10 | 11 | 12) => {
    setUser(prev => ({
      ...prev,
      currentGrade: grade,
      completedTopics: prev.gradeProgress[grade].completedTopics,
      unlockedTopics: prev.gradeProgress[grade].unlockedTopics
    }));
  };

  const handleQuizComplete = (score: number, total: number, difficulty: 'easy' | 'normal' | 'hard') => {
    const isPerfect = score === total;
    const performanceRatio = score / total;
    
    setUser(prev => {
      // XP Multiplier for Legendary Badge holders
      const hasLegendary = prev.earnedBadges.some(id => BADGES.find(b => b.id === id)?.tier === 'Legendary');
      const legendaryMultiplier = hasLegendary ? 1.2 : 1;
      
      const xpMultiplier = difficulty === 'hard' ? 2 : difficulty === 'normal' ? 1.5 : 1;
      const xpGained = Math.floor(score * 50 * xpMultiplier * legendaryMultiplier);
      
      const coinsGained = difficulty === 'hard' ? 30 : difficulty === 'normal' ? 20 : 10;
      
      const today = new Date().toISOString().split('T')[0];
      const newCompletedTopics = Array.from(new Set([...prev.completedTopics, activeTopic!.id]));
      
      const currentIndex = filteredTopics.findIndex(t => t.id === activeTopic!.id);
      const nextTopic = filteredTopics[currentIndex + 1];
      const newUnlockedTopics = [...prev.unlockedTopics];
      if (nextTopic && !newUnlockedTopics.includes(nextTopic.id)) {
        newUnlockedTopics.push(nextTopic.id);
      }

      const newGradeProgress = {
        ...prev.gradeProgress,
        [prev.currentGrade]: {
          completedTopics: newCompletedTopics,
          unlockedTopics: newUnlockedTopics
        }
      };

      const newTotalCompletions = prev.totalCompletions + 1;
      const newBadges = [...prev.earnedBadges];
      const newStudyHistory = Array.from(new Set([...prev.studyHistory, today]));
      const newAchievementProgress = { ...prev.achievementProgress };
      const newAchievementCompletions = { ...prev.achievementCompletions };
      const newConsecutivePerfect = isPerfect ? prev.consecutivePerfectQuizzes + 1 : 0;

      // Mascot Logic
      const performance = score === total ? 'perfect' : score >= total * 0.8 ? 'good' : score >= total * 0.5 ? 'average' : 'poor';
      const currentMascot = MASCOTS.find(m => m.id === prev.activeMascotId) || MASCOTS[0];
      
      setTimeout(() => {
        setActiveMascotOverlay({ mascot: currentMascot, performance });
      }, 1000);

      // Achievement: Data Sage (Every perfect DB topic quiz counts as 1/targetValue completion)
      if (activeTopic?.category === 'DB' && isPerfect) {
        newAchievementProgress['data-sage'] = (newAchievementProgress['data-sage'] || 0) + 1;
      }

      // Achievement: Info King (Every quiz >= 95% counts as 1 completion)
      if (performanceRatio >= 0.95) {
        newAchievementProgress['info-king'] = (newAchievementProgress['info-king'] || 0) + 1;
      }

      // Achievement: Streak Master
      newAchievementProgress['streak-master'] = prev.streak;

      // Check for Achievement Rewards
      let achievementXpBonus = 0;
      let achievementCoinBonus = 0;
      const newEarnedAchievements = [...(prev.earnedAchievements || [])];

      ACHIEVEMENTS.forEach(achievement => {
        const currentRaw = newAchievementProgress[achievement.id] || 0;
        const oldCompletions = prev.achievementCompletions[achievement.id] || 0;
        const newCompletions = Math.min(Math.floor(currentRaw / achievement.targetValue), achievement.maxCompletions);
        
        if (newCompletions > oldCompletions) {
          // New completion(s) earned!
          const earnedThisTurn = newCompletions - oldCompletions;
          achievementXpBonus += achievement.rewardXp * earnedThisTurn;
          achievementCoinBonus += achievement.rewardCoins * earnedThisTurn;
          
          newAchievementCompletions[achievement.id] = newCompletions;

          // Final Bonus
          if (newCompletions === achievement.maxCompletions && !newEarnedAchievements.includes(`${achievement.id}-max`)) {
            achievementXpBonus += achievement.finalBonusXp || 0;
            achievementCoinBonus += achievement.finalBonusCoins || 0;
            newEarnedAchievements.push(`${achievement.id}-max`);
            
            // Show special effect or notification?
            console.log(`MAX LEVEL REACHED for ${achievement.name}!`);
          }
        }
      });

      // Check for Badges
      const gradeDataTopics = filteredTopics.filter(t => t.category === 'DB').map(t => t.id);
      const completedGradeDataTopics = gradeDataTopics.filter(id => newCompletedTopics.includes(id)).length;
      
      if (completedGradeDataTopics === gradeDataTopics.length && gradeDataTopics.length > 0 && !newBadges.includes(`db-master-g${prev.currentGrade}`)) {
        newBadges.push(`db-master-g${prev.currentGrade}`);
        // We can keep the general notification or add specific ones
      }

      if (isPerfect && !newBadges.includes('perfect-score')) {
        newBadges.push('perfect-score');
        setNewBadge(BADGES.find(b => b.id === 'perfect-score') || null);
      }

      if (newTotalCompletions >= 10 && prev.streak >= 3 && !newBadges.includes('tech-rookie')) {
        newBadges.push('tech-rookie');
        setNewBadge(BADGES.find(b => b.id === 'tech-rookie') || null);
      }

      // Legendary: Legendary Scholar (30 streak + all topics in current grade)
      if (prev.streak >= 30 && newCompletedTopics.length === filteredTopics.length && !newBadges.includes(`legendary-scholar-g${prev.currentGrade}`)) {
        newBadges.push(`legendary-scholar-g${prev.currentGrade}`);
      }

      // Legendary: SQL God (10 perfect SQL)
      if (activeTopic?.category === 'DB' && isPerfect) {
        const sqlPerfectCount = (prev.achievementProgress['sql-perfect-count'] || 0) + 1;
        newAchievementProgress['sql-perfect-count'] = sqlPerfectCount;
        if (sqlPerfectCount >= 10 && !newBadges.includes('sql-god')) {
          newBadges.push('sql-god');
          setNewBadge(BADGES.find(b => b.id === 'sql-god') || null);
        }
      }

      return {
        ...prev,
        xp: prev.xp + xpGained + achievementXpBonus,
        coins: prev.coins + coinsGained + achievementCoinBonus,
        completedTopics: newCompletedTopics,
        unlockedTopics: newUnlockedTopics,
        gradeProgress: newGradeProgress,
        totalCompletions: newTotalCompletions,
        earnedBadges: newBadges,
        studyHistory: newStudyHistory,
        achievementProgress: newAchievementProgress,
        achievementCompletions: newAchievementCompletions,
        consecutivePerfectQuizzes: newConsecutivePerfect,
        earnedAchievements: newEarnedAchievements
      };
    });

    setView('dashboard');
    setActiveTopic(null);
  };

  const handleGameComplete = (xp: number, coins: number) => {
    setUser(prev => {
      const currentMascot = MASCOTS.find(m => m.id === prev.activeMascotId) || MASCOTS[0];
      setTimeout(() => {
        setActiveMascotOverlay({ mascot: currentMascot, performance: xp > 50 ? 'good' : 'motivation' });
      }, 1000);

      return {
        ...prev,
        xp: prev.xp + xp,
        coins: prev.coins + coins
      };
    });
    setView('dashboard');
    setActiveGame(null);
  };

  const handlePurchase = (item: ShopItem | Mascot) => {
    if (user.coins >= item.price) {
      setUser(prev => {
        if ('emoji' in item) {
          // It's a mascot
          return {
            ...prev,
            coins: prev.coins - item.price,
            unlockedMascots: [...prev.unlockedMascots, item.id],
            activeMascotId: item.id
          };
        } else {
          // It's a regular shop item
          return {
            ...prev,
            coins: prev.coins - item.price,
            inventory: [...prev.inventory, item.id]
          };
        }
      });
    }
  };

  const handleSelectMascot = (id: string) => {
    setUser(prev => ({ ...prev, activeMascotId: id }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DB': return <Database className="w-5 h-5" />;
      case 'NET': return <Network className="w-5 h-5" />;
      case 'CS': return <Code2 className="w-5 h-5" />;
      default: return <LayoutGrid className="w-5 h-5" />;
    }
  };

  const handleCloseBadgeModal = () => {
    setNewBadge(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setFirebaseUser(null);
      localStorage.removeItem('eduquest_user');
      // Reset local user state to default
      setUser({
        xp: 0,
        coins: 0,
        completedTopics: [],
        unlockedTopics: [TOPICS.find(t => t.grade === 10)?.id || 'g10-intro-1'],
        currentGrade: 10,
        gradeProgress: {
          10: { completedTopics: [], unlockedTopics: [TOPICS.find(t => t.grade === 10)?.id || 'g10-intro-1'] },
          11: { completedTopics: [], unlockedTopics: [TOPICS.find(t => t.grade === 11)?.id || 'db-11'] },
          12: { completedTopics: [], unlockedTopics: [TOPICS.find(t => t.grade === 12)?.id || 'ai-12'] }
        },
        totalCompletions: 0,
        earnedBadges: [],
        inventory: [],
        streak: 0,
        lastLogin: null,
        studyHistory: [],
        totalStudyTime: 0,
        displayName: null,
        avatar: '👨‍💻',
        unlockedMascots: MASCOTS.filter(m => m.unlockedByDefault).map(m => m.id),
        activeMascotId: 'black-cat',
        achievementProgress: {},
        achievementCompletions: {},
        consecutivePerfectQuizzes: 0,
        earnedAchievements: [],
        settings: {
          darkMode: false,
          textColor: 'default',
          fontFamily: 'font-sans',
          fontSize: 'medium'
        }
      });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(prev => ({
      ...prev,
      ...userData,
      displayName: userData.displayName || prev.displayName
    }));
  };

  if (loadingAuth) {
    return (
      <div className={cn(
        "min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-500",
        darkMode ? "bg-[#0f172a]" : "bg-[#f8fafc]"
      )}>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!firebaseUser) {
    return (
      <Auth 
        onSuccess={handleAuthSuccess} 
        darkMode={darkMode} 
        onToggleDarkMode={() => {
          const newMode = !darkMode;
          setDarkMode(newMode);
          // If we have a user object (even if not fully logged in yet), update its settings
          if (user) {
            setUser(prev => ({ ...prev, settings: { ...prev.settings, darkMode: newMode } }));
          }
        }} 
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className={cn(
        "min-h-screen flex flex-col lg:flex-row transition-colors duration-300",
        darkMode ? "bg-[#020617] text-slate-100" : "bg-[#f8fafc] text-slate-800"
      )}>
        <Sidebar 
          activeView={view} 
          onViewChange={setView} 
          onLogout={handleLogout}
          darkMode={darkMode}
          userAvatar={user.avatar}
          userName={user.displayName || 'Học sinh'}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="lg:hidden w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Gamepad2 className="text-white w-6 h-6" />
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chào mừng quay lại,</p>
                <h1 className="text-xl font-black tracking-tight dark:text-white">{user.displayName || 'Học sinh'} 👋</h1>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-3 md:gap-4 bg-slate-100 dark:bg-slate-900/50 px-3 md:px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Flame className={cn("w-4 h-4", user.streak > 0 ? "text-orange-500 fill-orange-500" : "text-slate-300 dark:text-slate-600")} />
                  <span className="font-black text-sm">{user.streak}</span>
                </div>
                <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-1.5">
                  <Zap className="text-amber-400 w-4 h-4 fill-amber-400" />
                  <span className="font-black text-sm">{user.xp}</span>
                </div>
                <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-yellow-900 font-bold">C</div>
                  <span className="font-black text-sm">{user.coins}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  const newMode = !darkMode;
                  setDarkMode(newMode);
                  setUser(prev => ({ ...prev, settings: { ...prev.settings, darkMode: newMode } }));
                }}
                className={cn(
                  "p-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 border-2",
                  darkMode 
                    ? "bg-white text-slate-950 border-white hover:bg-slate-100" 
                    : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                )}
                title={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-500 fill-amber-500" /> : <Moon className="w-5 h-5 text-blue-400 fill-blue-400" />}
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 pb-32 lg:pb-8">
            <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Topics */}
              <div className="lg:col-span-8 space-y-8">
                <section>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl font-black flex items-center gap-3 dark:text-white mb-1">
                        <BookOpen className="text-blue-500" />
                        Lộ trình học tập
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Khám phá các bài học Tin học lớp {user.currentGrade}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <GradeSwitcher currentGrade={user.currentGrade} onGradeChange={handleGradeChange} darkMode={darkMode} />
                      <button 
                        onClick={() => setView('roadmap')}
                        className="hidden md:flex text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors items-center gap-1"
                      >
                        XEM BẢN ĐỒ <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTopics.map((topic) => (
                      <motion.button
                        key={topic.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTopicSelect(topic)}
                        className={cn(
                          "p-6 rounded-3xl border-2 text-left transition-all group relative overflow-hidden",
                          user.completedTopics.includes(topic.id)
                            ? "bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20 hover:border-emerald-500/40"
                            : "bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:border-blue-500/50 shadow-sm"
                        )}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={cn(
                            "p-3 rounded-2xl",
                            user.completedTopics.includes(topic.id) 
                              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                              : "bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                          )}>
                            {getCategoryIcon(topic.category)}
                          </div>
                          {user.completedTopics.includes(topic.id) && (
                            <div className="bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-full">HOÀN THÀNH</div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold mb-2 dark:text-[var(--heading)]">{topic.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{topic.description}</p>
                        <div className="flex items-center text-xs font-bold text-blue-500 group-hover:translate-x-1 transition-transform">
                          BẮT ĐẦU HỌC <ChevronRight className="w-4 h-4" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </section>

                <section className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-4">Khu vực Trò chơi!</h2>
                    <p className="text-blue-100 mb-6 max-w-md">Luyện tập phản xạ và kiến thức nhị phân thông qua các trò chơi nhỏ vui nhộn.</p>
                    <button 
                      onClick={() => setView('games')}
                      className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-blue-600" />
                      Chơi ngay
                    </button>
                  </div>
                  <Gamepad2 className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
                </section>
              </div>

              {/* Right Column: Stats & Badges */}
              <div className="lg:col-span-4 space-y-8">
                <AnalyticsDashboard user={user} totalTopics={filteredTopics.length} darkMode={darkMode} />
                
                {/* Quick Theme Toggle Card */}
                <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2 dark:text-white">
                      <Palette className="w-5 h-5 text-indigo-500" />
                      Giao diện
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setDarkMode(false);
                        setUser(prev => ({ ...prev, settings: { ...prev.settings, darkMode: false } }));
                      }}
                      className={cn(
                        "flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-xs",
                        !darkMode 
                          ? "border-blue-500 bg-white text-blue-600 shadow-md shadow-blue-500/10" 
                          : "border-transparent bg-white/50 dark:bg-slate-800 text-slate-400 hover:bg-white dark:hover:bg-slate-700"
                      )}
                    >
                      <Sun className="w-4 h-4" />
                      SÁNG
                    </button>
                    <button
                      onClick={() => {
                        setDarkMode(true);
                        setUser(prev => ({ ...prev, settings: { ...prev.settings, darkMode: true } }));
                      }}
                      className={cn(
                        "flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold text-xs",
                        darkMode 
                          ? "border-blue-500 bg-slate-800 text-blue-400 shadow-md shadow-blue-500/10" 
                          : "border-transparent bg-white/50 dark:bg-slate-800 text-slate-400 hover:bg-white dark:hover:bg-slate-700"
                      )}
                    >
                      <Moon className="w-4 h-4" />
                      TỐI
                    </button>
                  </div>
                </section>

                <Leaderboard currentUserXp={user.xp} activeMascotId={user.activeMascotId} />
                
                <section className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold flex items-center gap-2 dark:text-[var(--heading)]">
                      <Trophy className="text-yellow-400 w-5 h-5" />
                      Thành tích & Danh hiệu
                    </h2>
                    <button 
                      onClick={() => setView('profile')}
                      className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline"
                    >
                      Xem tất cả
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Graduation Diploma Section */}
                    <div className="p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl relative overflow-hidden group">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all",
                            user.completedTopics.length === filteredTopics.length 
                              ? "bg-purple-500 shadow-purple-500/20" 
                              : "bg-slate-200 dark:bg-slate-700 shadow-none"
                          )}>
                            <GraduationCap className={cn("w-6 h-6", user.completedTopics.length === filteredTopics.length ? "text-white" : "text-slate-400")} />
                          </div>
                          <div>
                            <p className="font-bold text-sm dark:text-[var(--heading)]">
                              {user.completedTopics.length === filteredTopics.length ? "Đã tốt nghiệp!" : "Tiến trình tốt nghiệp"}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                              {user.completedTopics.length}/{filteredTopics.length} BÀI HỌC
                            </p>
                          </div>
                        </div>
                        
                        {user.completedTopics.length === filteredTopics.length ? (
                          <button 
                            onClick={() => setView('graduation')}
                            className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                          >
                            <FileBadge className="w-4 h-4" />
                            NHẬN BẰNG TỐT NGHIỆP
                          </button>
                        ) : (
                          <div className="space-y-2">
                            <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(user.completedTopics.length / filteredTopics.length) * 100}%` }}
                                className="h-full bg-purple-500"
                              />
                            </div>
                            <p className="text-[9px] text-slate-400 italic">Hoàn thành tất cả bài học lớp {user.currentGrade} để nhận bằng khen.</p>
                          </div>
                        )}
                      </div>
                      {/* Background decoration */}
                      <Sparkles className="absolute -right-4 -bottom-4 w-16 h-16 text-purple-500/10 rotate-12" />
                    </div>

                    {/* Top Achievements Progress */}
                    <div className="space-y-4">
                      {ACHIEVEMENTS.slice(0, 2).map(achievement => {
                        const completions = user.achievementCompletions[achievement.id] || 0;
                        const isMaxLevel = completions >= achievement.maxCompletions;
                        const percentage = Math.min(Math.round((completions / achievement.maxCompletions) * 100), 100);

                        return (
                          <div key={achievement.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold dark:text-slate-300 flex items-center gap-2">
                                {achievement.icon} {achievement.name}
                                {isMaxLevel && <span className="text-[8px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full">MAX</span>}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                {isMaxLevel ? "Hoàn thành tối đa" : `${completions}/${achievement.maxCompletions}`}
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                className={cn(
                                  "h-full rounded-full",
                                  isMaxLevel ? "bg-amber-500" : completions > 0 ? "bg-emerald-500" : "bg-blue-500"
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {BADGES.slice(0, 4).map((badge) => {
                        const isEarned = user.earnedBadges.includes(badge.id);
                        return (
                          <div 
                            key={badge.id}
                            className={cn(
                              "aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative group",
                              isEarned ? "bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600" : "bg-slate-50/50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 opacity-40"
                            )}
                          >
                            <span className="text-2xl">{badge.icon}</span>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl">
                              <p className="font-bold text-sm text-slate-800 dark:text-[var(--heading)]">{badge.name}</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{badge.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
                  <h2 className="font-bold flex items-center gap-2 mb-6 dark:text-[var(--heading)]">
                    <ShoppingBag className="text-pink-400 w-5 h-5" />
                    Cửa hàng & Vật phẩm
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                          <Coins className="text-yellow-400 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Số dư</p>
                          <p className="font-black text-lg dark:text-[var(--heading)]">{user.coins} Coins</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setView('shop')}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                    
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-3">Kho đồ ({user.inventory.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {user.inventory.length > 0 ? (
                          user.inventory.map(itemId => {
                            const item = SHOP_ITEMS.find(i => i.id === itemId);
                            return (
                              <div key={itemId} className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                {item?.icon}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs text-slate-400 italic">Chưa có vật phẩm nào.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
                  <h2 className="font-bold flex items-center gap-2 mb-6 dark:text-[var(--heading)]">
                    <UserIcon className="text-indigo-400 w-5 h-5" />
                    Hồ sơ học sinh
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/20 relative group">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-lg dark:text-[var(--heading)]">{user.displayName || 'Người dùng mới'}</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">Thành viên từ tháng 3, 2026</p>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Profile 
                user={user} 
                onClose={() => setView('dashboard')} 
                onLogout={handleLogout}
                onOpenSettings={() => setView('settings')}
                onUpdateAvatar={(newAvatar) => setUser(prev => ({ ...prev, avatar: newAvatar }))}
                darkMode={darkMode}
                setDarkMode={(val) => setUser(prev => ({ ...prev, settings: { ...prev.settings, darkMode: val } }))}
              />
            </motion.div>
          )}

          {view === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Settings 
                settings={user.settings}
                onUpdate={(newSettings) => setUser(prev => ({ ...prev, settings: newSettings }))}
                onBack={() => setView('profile')}
                onLogout={handleLogout}
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {view === 'graduation' && (
            <Certificate 
              userName={user.displayName || 'Người học'}
              xp={user.xp}
              streak={user.streak}
              completedTopicsCount={user.completedTopics.length}
              onClose={() => setView('dashboard')}
              mascotId={user.activeMascotId}
              type="graduation"
              grade={user.currentGrade}
            />
          )}

          {view === 'roadmap' && (
            <motion.div 
              key="roadmap"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <LearningMap 
                topics={filteredTopics}
                completedTopics={user.completedTopics}
                unlockedTopics={user.unlockedTopics}
                onSelectTopic={handleTopicSelect}
                onClose={() => setView('dashboard')}
              />
            </motion.div>
          )}

          {view === 'quiz' && activeTopic && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex justify-center items-center min-h-[60vh]"
            >
              <Quiz 
                topic={activeTopic} 
                onComplete={handleQuizComplete} 
                onClose={() => {
                  setView('dashboard');
                  setActiveTopic(null);
                }} 
              />
            </motion.div>
          )}

          {view === 'shop' && (
            <motion.div 
              key="shop"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Shop 
                coins={user.coins} 
                inventory={user.inventory} 
                unlockedMascots={user.unlockedMascots}
                activeMascotId={user.activeMascotId}
                onPurchase={handlePurchase} 
                onSelectMascot={handleSelectMascot}
                onClose={() => setView('dashboard')} 
              />
            </motion.div>
          )}

          {view === 'games' && (
            <motion.div 
              key="games"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex justify-center items-center min-h-[60vh] w-full"
            >
              {!activeGame ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGame('binary')}
                    className="p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] text-center group hover:border-blue-500 transition-all shadow-sm"
                  >
                    <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Gamepad2 className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 dark:text-[var(--heading)]">Binary Catcher</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Hứng các bit nhị phân để đạt mục tiêu.</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGame('sql')}
                    className="p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] text-center group hover:border-amber-500 transition-all shadow-sm"
                  >
                    <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Database className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 dark:text-[var(--heading)]">SQL Fill-in</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Điền từ khóa SQL còn thiếu vào câu lệnh.</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGame('brick')}
                    className="p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] text-center group hover:border-indigo-500 transition-all shadow-sm"
                  >
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <LayoutGrid className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 dark:text-[var(--heading)]">Xếp Gạch</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Trả lời đúng để nhận gạch và xếp đầy hàng.</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGame('security')}
                    className="p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] text-center group hover:border-rose-500 transition-all shadow-sm"
                  >
                    <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <ShieldAlert className="w-10 h-10 text-rose-500" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 dark:text-[var(--heading)]">Thám tử An ninh</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Phân biệt tin nhắn thật và lừa đảo (Phishing).</p>
                  </motion.button>

                  <button 
                    onClick={() => setView('dashboard')}
                    className="md:col-span-2 lg:col-span-3 text-slate-400 font-bold hover:text-blue-500 transition-colors py-4"
                  >
                    Quay lại Dashboard
                  </button>
                </div>
              ) : activeGame === 'binary' ? (
                <BinaryGame 
                  onComplete={handleGameComplete}
                  onClose={() => setActiveGame(null)}
                />
              ) : activeGame === 'sql' ? (
                <SQLFillGame 
                  onComplete={handleGameComplete}
                  onClose={() => setActiveGame(null)}
                />
              ) : activeGame === 'security' ? (
                <SecurityGame 
                  onComplete={handleGameComplete}
                  onClose={() => setActiveGame(null)}
                />
              ) : (
                <SmartBrickGame 
                  onComplete={handleGameComplete}
                  onClose={() => setActiveGame(null)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>


      <Footer darkMode={darkMode} />

      {/* Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChatbot(true)}
        className={cn(
          "fixed bottom-24 md:bottom-8 right-8 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 z-[90] transition-all",
          showChatbot ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="relative">
          <MessageSquare className="text-white w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <Sparkles className="text-white w-2 h-2" />
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {newBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[110] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-800 border-2 border-yellow-500/50 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-[0_0_50px_rgba(234,179,8,0.2)]"
            >
              <div className="text-7xl mb-6 animate-bounce">{newBadge.icon}</div>
              <h2 className="text-3xl font-black text-white mb-2">Danh Hiệu Mới!</h2>
              <p className="text-yellow-400 font-bold text-lg mb-4">{newBadge.name}</p>
              <p className="text-slate-400 mb-8">{newBadge.description}</p>
              <button 
                onClick={handleCloseBadgeModal}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-950 py-4 rounded-2xl font-black transition-all shadow-lg shadow-yellow-500/20"
              >
                TUYỆT VỜI!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeMascotOverlay && (
          <MascotOverlay 
            mascot={activeMascotOverlay.mascot}
            performance={activeMascotOverlay.performance}
            onClose={() => setActiveMascotOverlay(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChatbot && (
          <AIChatbot 
            onClose={() => setShowChatbot(false)} 
            currentGrade={user.currentGrade}
          />
        )}
      </AnimatePresence>
        </div>
      </div>
    </ErrorBoundary>
  );
}
