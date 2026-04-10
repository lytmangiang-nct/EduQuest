import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Mail,
  Lock,
  Globe,
  User,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Scenario {
  id: number;
  title: string;
  sender: string;
  content: string;
  isPhishing: boolean;
  explanation: string;
  clues: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Cảnh báo tài khoản",
    sender: "security-alert@facebook-support.com",
    content: "Tài khoản của bạn đã bị đăng nhập từ một thiết bị lạ. Vui lòng nhấn vào liên kết này để xác minh danh tính ngay lập tức: http://facebook-verify-account.net/login",
    isPhishing: true,
    explanation: "Email này sử dụng tên miền giả mạo (facebook-verify-account.net) và liên kết không an toàn (http thay vì https).",
    clues: ["Tên miền lạ", "Liên kết không an toàn", "Yêu cầu khẩn cấp"]
  },
  {
    id: 2,
    title: "Xác nhận đơn hàng",
    sender: "noreply@shopee.vn",
    content: "Đơn hàng #SHP123456 của bạn đã được thanh toán thành công. Bạn có thể theo dõi trạng thái đơn hàng trong ứng dụng Shopee chính thức.",
    isPhishing: false,
    explanation: "Email từ địa chỉ chính thức của Shopee và không yêu cầu bạn nhấn vào bất kỳ liên kết lạ nào bên ngoài ứng dụng.",
    clues: ["Địa chỉ email chính thức", "Không yêu cầu thông tin nhạy cảm"]
  },
  {
    id: 3,
    title: "Quà tặng tri ân",
    sender: "admin@nganhang-vietcombank.com.vn",
    content: "Chúc mừng! Bạn là khách hàng may mắn nhận được phần quà 5.000.000đ. Hãy nhập mã OTP vừa gửi về điện thoại vào trang web sau để nhận thưởng: https://vcb-reward.com",
    isPhishing: true,
    explanation: "Ngân hàng không bao giờ yêu cầu bạn nhập mã OTP vào một trang web lạ để nhận thưởng. Đây là hình thức lừa đảo chiếm đoạt tài khoản.",
    clues: ["Yêu cầu mã OTP", "Trang web lạ", "Quà tặng quá lớn"]
  },
  {
    id: 4,
    title: "Cập nhật mật khẩu",
    sender: "no-reply@accounts.google.com",
    content: "Mật khẩu tài khoản Google của bạn vừa được thay đổi. Nếu không phải bạn thực hiện, hãy nhấn vào nút bên dưới để bảo mật tài khoản.",
    isPhishing: false,
    explanation: "Đây là thông báo bảo mật tiêu chuẩn từ Google. Địa chỉ người gửi là chính xác.",
    clues: ["Địa chỉ email chính thức", "Thông báo bảo mật thông thường"]
  }
];

interface SecurityGameProps {
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

export const SecurityGame: React.FC<SecurityGameProps> = ({ onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentScenario = SCENARIOS[currentIndex];

  const handleChoice = (choice: boolean) => {
    if (userChoice !== null) return;
    setUserChoice(choice);
    if (choice === currentScenario.isPhishing) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserChoice(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 p-8 rounded-3xl border border-slate-700 max-w-md w-full text-center shadow-2xl"
      >
        <ShieldCheck className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
        <h2 className="text-3xl font-black mb-2 dark:text-[var(--heading)]">Hoàn thành!</h2>
        <p className="text-slate-400 mb-8">Bạn đã hoàn thành thử thách Thám tử An ninh mạng.</p>
        
        <div className="text-5xl font-black text-sky-400 mb-2">
          {score}/{SCENARIOS.length}
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Điểm số của bạn</p>

        <button 
          onClick={() => onComplete(score, SCENARIOS.length)}
          className="w-full py-4 bg-sky-500 hover:bg-sky-600 rounded-2xl font-bold transition-all shadow-lg shadow-sky-500/20"
        >
          Nhận thưởng & Quay lại
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 dark:text-[var(--heading)]">
            <ShieldAlert className="text-rose-500" />
            Thám tử An ninh
          </h2>
          <p className="text-slate-400 text-sm">Phân biệt tin nhắn thật và lừa đảo (Phishing)</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tiến độ</span>
          <p className="text-lg font-black text-white">{currentIndex + 1}/{SCENARIOS.length}</p>
        </div>
      </div>

      <motion.div 
        key={currentIndex}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl"
      >
        {/* Email Header */}
        <div className="bg-slate-900/50 p-6 border-b border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{currentScenario.title}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-500">Từ: <span className="text-slate-300">{currentScenario.sender}</span></p>
                <div className="w-1 h-1 bg-slate-700 rounded-full" />
                <p className="text-xs text-slate-500">Đến: <span className="text-slate-300">me@student.edu.vn</span></p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <Mail className="w-3 h-3" /> INBOX
            </div>
            <div className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <Globe className="w-3 h-3" /> EXTERNAL
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div className="p-8 min-h-[200px] bg-slate-800">
          <div className="p-6 bg-slate-900/30 rounded-2xl border border-slate-700/50 italic text-slate-300 leading-relaxed">
            "{currentScenario.content}"
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-slate-900/50 border-t border-slate-700">
          {!showExplanation ? (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleChoice(false)}
                className="py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-2xl font-bold text-emerald-400 transition-all flex flex-col items-center gap-2"
              >
                <ShieldCheck className="w-6 h-6" />
                AN TOÀN
              </button>
              <button 
                onClick={() => handleChoice(true)}
                className="py-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-2xl font-bold text-rose-400 transition-all flex flex-col items-center gap-2"
              >
                <AlertTriangle className="w-6 h-6" />
                LỪA ĐẢO
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-6"
            >
              <div className={cn(
                "p-4 rounded-2xl flex items-center gap-4",
                userChoice === currentScenario.isPhishing ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-rose-500/10 border border-rose-500/20"
              )}>
                {userChoice === currentScenario.isPhishing ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-500 shrink-0" />
                )}
                <div>
                  <p className={cn("font-bold", userChoice === currentScenario.isPhishing ? "text-emerald-400" : "text-rose-400")}>
                    {userChoice === currentScenario.isPhishing ? "Chính xác!" : "Sai rồi!"}
                  </p>
                  <p className="text-sm text-slate-400">
                    Đây là {currentScenario.isPhishing ? "một tin nhắn lừa đảo" : "một tin nhắn an toàn"}.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2 text-sky-400 mb-2">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Phân tích</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{currentScenario.explanation}</p>
                <div className="flex flex-wrap gap-2">
                  {currentScenario.clues.map((clue, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-900 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-700">
                      # {clue}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleNext}
                className="w-full py-4 bg-sky-500 hover:bg-sky-600 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                {currentIndex < SCENARIOS.length - 1 ? "Tiếp tục" : "Xem kết quả"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      <button 
        onClick={onClose}
        className="mt-8 mx-auto block text-slate-500 hover:text-white font-bold transition-colors"
      >
        Hủy bỏ thử thách
      </button>
    </div>
  );
};
