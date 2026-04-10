import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <footer className="max-w-7xl mx-auto px-4 py-12 mt-12 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-black dark:text-white mb-2">EduQuest <span className="text-blue-500">Tin Học</span></h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Nền tảng học tập Tin học tương tác dành cho học sinh THPT. Học tập, vui chơi và thăng tiến!
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>for students</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © 2026 EduQuest Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
