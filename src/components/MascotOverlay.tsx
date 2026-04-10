import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { Mascot, getMascotMessage } from '../data/mascots';
import { cn } from '../lib/utils';

interface MascotOverlayProps {
  mascot: Mascot;
  performance: 'perfect' | 'good' | 'average' | 'poor' | 'motivation';
  onClose: () => void;
}

export const MascotOverlay: React.FC<MascotOverlayProps> = ({ mascot, performance, onClose }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const message = getMascotMessage(mascot.id, performance);

  useEffect(() => {
    // Auto-close after 6 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    // Play sound if enabled
    if (soundEnabled) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore if blocked by browser
    }

    return () => clearTimeout(timer);
  }, [onClose, soundEnabled]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-24 right-8 z-[100] flex flex-col items-end pointer-events-none"
    >
      <div className="relative pointer-events-auto">
        {/* Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="bg-white dark:bg-slate-800 text-slate-800 dark:text-[var(--heading)] p-4 rounded-3xl rounded-br-none shadow-2xl mb-4 max-w-xs relative border-2 border-blue-500 dark:border-blue-400"
        >
          <p className="font-bold text-sm leading-relaxed">{message}</p>
          
          {/* Bubble Tail */}
          <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-blue-500 dark:border-blue-400 rotate-45 transform translate-y-1/2 -translate-x-1/2" />
          
          {/* Controls */}
          <div className="absolute -top-3 -right-3 flex gap-1 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled(!soundEnabled);
              }}
              className="w-7 h-7 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-lg border border-slate-100 dark:border-slate-600"
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>

        {/* Mascot Emoji */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="text-7xl drop-shadow-2xl select-none"
        >
          {mascot.emoji}
        </motion.div>
      </div>
    </motion.div>
  );
};
