import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutGrid, 
  BookOpen, 
  Gamepad2, 
  ShoppingBag, 
  User as UserIcon,
  LogOut,
  Settings as SettingsIcon,
  Home
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: any) => void;
  onLogout: () => void;
  darkMode: boolean;
  userAvatar: string;
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  onLogout, 
  darkMode,
  userAvatar,
  userName
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: Home },
    { id: 'roadmap', label: 'Lộ trình', icon: BookOpen },
    { id: 'games', label: 'Trò chơi', icon: Gamepad2 },
    { id: 'shop', label: 'Cửa hàng', icon: ShoppingBag },
    { id: 'profile', label: 'Hồ sơ', icon: UserIcon },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r transition-colors duration-300",
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tight dark:text-white">EduQuest</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all group",
                    isActive 
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-500"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-blue-500")} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-md">
              {userAvatar}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate dark:text-white">{userName}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Học sinh</p>
            </div>
          </div>

          <button
            onClick={() => onViewChange('settings')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <SettingsIcon className="w-5 h-5" />
            Cài đặt
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 h-20 border-t z-[100] px-4 flex items-center justify-around transition-colors duration-300",
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      )}>
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                isActive ? "text-blue-500" : "text-slate-400"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-blue-500/10")} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="w-1 h-1 bg-blue-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
