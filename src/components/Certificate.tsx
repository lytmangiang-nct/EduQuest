import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Download, 
  X, 
  ShieldCheck, 
  Star, 
  Share2, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  Sun,
  Moon,
  Medal,
  GraduationCap
} from 'lucide-react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { MASCOTS } from '../data/mascots';

interface CertificateProps {
  userName: string;
  rank?: number;
  xp: number;
  streak: number;
  completedTopicsCount: number;
  onClose: () => void;
  mascotId?: string;
  type?: 'honor' | 'graduation';
  grade?: number;
}

export const Certificate: React.FC<CertificateProps> = ({ 
  userName, 
  rank = 1, 
  xp, 
  streak, 
  completedTopicsCount, 
  onClose,
  mascotId = 'black-cat',
  type = 'honor',
  grade = 10
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const mascot = MASCOTS.find(m => m.id === mascotId) || MASCOTS[0];

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 300 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: isDark ? '#0f172a' : '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `${type === 'honor' ? 'honor-certificate' : 'graduation-diploma'}-${userName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: type === 'honor' ? 'EduQuest Honor Certificate' : 'EduQuest Graduation Diploma',
          text: type === 'honor' 
            ? `Tôi vừa lọt vào Top ${rank} trên bảng xếp hạng EduQuest Tin Học!`
            : `Tôi vừa chính thức tốt nghiệp khóa học EduQuest Tin Học!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const getRankTitle = (r: number) => {
    if (type === 'graduation') return 'TỐT NGHIỆP KHÓA HỌC (GRADUATE)';
    switch (r) {
      case 1: return 'HUYỀN THOẠI (LEGENDARY)';
      case 2: return 'CHIẾN BINH TIN HỌC';
      case 3: return 'CHUYÊN GIA DỮ LIỆU';
      default: return `HỌC VIÊN XUẤT SẮC (TOP ${r})`;
    }
  };

  const getInspirationalQuote = (r: number) => {
    if (type === 'graduation') return "Hành trình vạn dặm bắt đầu từ một bước chân. Bạn đã hoàn thành xuất sắc chặng đường này!";
    if (r === 1) return "Sự kiên trì và trí tuệ đã đưa bạn đến đỉnh cao. Hãy tiếp tục tỏa sáng!";
    if (r <= 3) return "Thành công không phải là điểm đến, mà là hành trình không ngừng học hỏi.";
    return "Mỗi bước đi nhỏ đều góp phần tạo nên những thành tựu lớn lao.";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md print:p-0 print:bg-white"
    >
      <div className="relative max-w-5xl w-full flex flex-col items-center">
        
        {/* Controls - Hidden during print */}
        <div className="flex gap-3 mb-6 print:hidden">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all backdrop-blur-md border border-white/10 flex items-center gap-2"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-xs font-bold uppercase tracking-wider">{isDark ? 'Nền sáng' : 'Nền tối'}</span>
          </button>
          <button 
            onClick={handleDownload}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Tải về</span>
          </button>
          <button 
            onClick={handleShare}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Chia sẻ</span>
          </button>
          <button 
            onClick={onClose}
            className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl transition-all shadow-lg shadow-rose-500/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Content */}
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          ref={certificateRef}
          className={cn(
            "w-full aspect-[1.414/1] relative overflow-hidden shadow-2xl transition-colors duration-500",
            isDark ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
          )}
        >
          {/* Professional Decorative Border */}
          <div className="absolute inset-0 border-[24px] border-double border-amber-500/20 pointer-events-none" />
          <div className="absolute inset-8 border-4 border-amber-500/30 pointer-events-none" />
          <div className="absolute inset-12 border border-amber-500/10 pointer-events-none" />
          
          {/* Corner Patterns (SVG) */}
          <svg className="absolute top-0 left-0 w-48 h-48 text-amber-500/20" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" />
            <path d="M10 10 L40 10 L10 40 Z" fill="currentColor" opacity="0.5" />
          </svg>
          <svg className="absolute top-0 right-0 w-48 h-48 text-amber-500/20 rotate-90" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-48 h-48 text-amber-500/20 rotate-180" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-48 h-48 text-amber-500/20 -rotate-90" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" />
          </svg>

          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            {type === 'honor' ? <Award className="w-[600px] h-[600px]" /> : <GraduationCap className="w-[600px] h-[600px]" />}
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center p-20 text-center">
            {/* Header */}
            <div className="mb-8">
              <motion.div 
                animate={{ 
                  filter: ["drop-shadow(0 0 0px rgba(245,158,11,0))", "drop-shadow(0 0 20px rgba(245,158,11,0.5))", "drop-shadow(0 0 0px rgba(245,158,11,0))"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6 shadow-2xl mx-auto relative"
              >
                {type === 'honor' ? <Award className="w-14 h-14 text-white" /> : <GraduationCap className="w-14 h-14 text-white" />}
                {/* Mascot floating next to badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-16 top-0 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center text-3xl border-2 border-amber-500/30"
                >
                  {mascot.emoji}
                </motion.div>
              </motion.div>
              <h1 className="text-5xl font-black tracking-[0.2em] mb-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-clip-text text-transparent">
                {type === 'honor' ? 'GIẤY CHỨNG NHẬN DANH DỰ' : `BẰNG TỐT NGHIỆP LỚP ${grade}`}
              </h1>
              <div className="h-1 w-64 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
              <p className="text-lg font-bold uppercase tracking-[0.3em] opacity-60">
                {type === 'honor' ? 'Vinh danh người học xuất sắc lọt vào Top 5' : 'Vinh danh sự nỗ lực và kiên trì học tập'}
              </p>
            </div>

            {/* Recipient */}
            <div className="mb-8 space-y-4">
              <p className="text-xl italic opacity-70">Hệ thống EduQuest Tin Học trân trọng vinh danh</p>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black uppercase tracking-tight"
              >
                {userName}
              </motion.h2>
              <div className="inline-block px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <span className="text-amber-500 font-black tracking-widest uppercase">{getRankTitle(rank)}</span>
              </div>
            </div>

            {/* Achievement Highlights */}
            <div className="grid grid-cols-3 gap-12 w-full max-w-3xl mb-8 py-6 border-y border-amber-500/10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Star className="w-6 h-6 fill-blue-500" />
                </div>
                <p className="text-2xl font-black">{xp.toLocaleString()}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Tổng điểm XP</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Flame className="w-6 h-6 fill-orange-500" />
                </div>
                <p className="text-2xl font-black">{streak} Ngày</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Chuỗi học tập</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-2xl font-black">{completedTopicsCount}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Bài học đã xong</p>
              </div>
            </div>

            {/* Quote */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-xl italic opacity-80 leading-relaxed">
                "{getInspirationalQuote(rank)}"
              </p>
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between items-end px-12">
              <div className="text-left space-y-3">
                <div className="w-48 h-px bg-amber-500/30" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Ngày cấp: {new Date().toLocaleDateString('vi-VN') ?? '06/04/2026'}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Mã số: EQ-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <ShieldCheck className="w-24 h-24 opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black tracking-widest uppercase">BAN QUẢN TRỊ EDUQUEST</p>
                  <p className="text-[10px] italic opacity-50">Hệ thống học tập thông minh</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-slate-400 text-sm italic">
          {type === 'honor' 
            ? 'Giấy chứng nhận này được cấp tự động dựa trên thành tích thực tế của người dùng.'
            : 'Bằng tốt nghiệp này ghi nhận sự hoàn thành xuất sắc các nội dung học tập.'}
        </p>
      </div>
    </motion.div>
  );
};
