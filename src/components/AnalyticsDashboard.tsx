import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart, 
  Pie, 
  Legend,
  LabelList,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { BarChart3, PieChart as PieChartIcon, RefreshCw, TrendingUp, CheckCircle2, Circle, PlayCircle, Calendar } from 'lucide-react';
import { getTopUsers } from '../lib/firebase';
import { TOPICS } from '../data/curriculum';
import { cn } from '../lib/utils';

interface LeaderboardEntry {
  id: string;
  displayName: string;
  xp: number;
  avatar: string;
}

interface AnalyticsDashboardProps {
  user: {
    xp: number;
    completedTopics: string[];
    unlockedTopics: string[];
    studyHistory: string[];
  };
  totalTopics: number;
  darkMode: boolean;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ user, totalTopics, darkMode }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = () => {
    setLoading(true);
    const unsubscribe = getTopUsers((users) => {
      // Take top 8 for the bar chart
      setLeaderboardData(users.slice(0, 8));
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchLeaderboard();
    return () => unsubscribe();
  }, []);

  // Calculate Progress Data
  const completedCount = user.completedTopics.length;
  const inProgressCount = user.unlockedTopics.length - completedCount;
  const notStartedCount = totalTopics - user.unlockedTopics.length;

  const progressData = [
    { name: 'Đã hoàn thành', value: completedCount, color: '#10b981', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { name: 'Đang học', value: inProgressCount, color: '#3b82f6', icon: <PlayCircle className="w-4 h-4 text-blue-400" /> },
    { name: 'Chưa bắt đầu', value: notStartedCount, color: '#475569', icon: <Circle className="w-4 h-4 text-slate-500" /> },
  ].filter(item => item.value > 0);

  // Calculate Study History Data (Last 7 days)
  const getStudyHistoryData = () => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = user.studyHistory.filter(d => d === dateStr).length;
      data.push({
        date: date.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' }),
        count: count
      });
    }
    return data;
  };

  const historyData = getStudyHistoryData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">{label}</p>
          <p className="text-lg font-black text-white">{payload[0].value} {payload[0].name === 'xp' ? 'XP' : 'Bài học'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Bar Chart: Leaderboard */}
      <section className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-bold text-lg dark:text-[var(--heading)]">Bảng xếp hạng trực quan</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">So sánh điểm XP giữa các người học</p>
            </div>
          </div>
          <button 
            onClick={fetchLeaderboard}
            className={cn(
              "p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all",
              loading && "animate-spin"
            )}
          >
            <RefreshCw className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>
        </div>

        <div className="h-[250px] w-full">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={leaderboardData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  {COLORS.map((color, index) => (
                    <linearGradient key={`gradient-${index}`} id={`colorBar-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={color} stopOpacity={0.2}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#f1f5f9"} vertical={false} />
                <XAxis 
                  dataKey="displayName" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
                <Bar 
                  dataKey="xp" 
                  radius={[8, 8, 0, 0]} 
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {leaderboardData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorBar-${index % COLORS.length})`} />
                  ))}
                  <LabelList 
                    dataKey="xp" 
                    position="top" 
                    fill="#94a3b8" 
                    fontSize={10} 
                    fontWeight="bold"
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Line Chart: Study History */}
      <section className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-500/10 rounded-xl">
            <Calendar className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg dark:text-[var(--heading)]">Hoạt động học tập</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Số bài học đã hoàn thành trong 7 ngày qua</p>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={historyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#f1f5f9"} vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: darkMode ? '1px solid #334155' : '1px solid #f1f5f9', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: '#f59e0b', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                name="Bài học"
                stroke="#f59e0b" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCount)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Pie Chart: Progress */}
      <section className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/10 rounded-xl">
            <PieChartIcon className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg dark:text-[var(--heading)]">Tiến trình học tập</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Phân tích trạng thái các bài học</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: darkMode ? '1px solid #334155' : '1px solid #f1f5f9', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: darkMode ? '#fff' : '#1e293b', fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tổng quan</span>
                </div>
                <span className="text-lg font-black dark:text-[var(--heading)]">{totalTopics} Bài học</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${(completedCount / totalTopics) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {progressData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black dark:text-[var(--heading)]">{item.value}</span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">({Math.round((item.value / totalTopics) * 100)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
