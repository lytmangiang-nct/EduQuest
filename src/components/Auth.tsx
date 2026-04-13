import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Github, 
  Chrome,
  AlertCircle,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Moon,
  Image as ImageIcon
} from 'lucide-react';
import { 
  auth, 
  db 
} from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail,
  signInWithPopup,
  signInAnonymously,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { cn } from '../lib/utils';

interface AuthProps {
  onSuccess: (userData: any) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

type AuthMode = 'login' | 'signup' | 'forgot-password';

export const Auth: React.FC<AuthProps> = ({ onSuccess, darkMode, onToggleDarkMode }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [bgIndex, setBgIndex] = useState(0);

  const backgrounds = [
    { name: 'Mặc định', class: darkMode ? "bg-[#020617]" : "bg-[#f8fafc]" },
    { name: 'Đại dương', class: "bg-gradient-to-br from-blue-600 to-cyan-500" },
    { name: 'Hoàng hôn', class: "bg-gradient-to-br from-orange-500 to-rose-500" },
    { name: 'Rừng xanh', class: "bg-gradient-to-br from-emerald-600 to-teal-500" },
    { name: 'Huyền bí', class: "bg-gradient-to-br from-purple-600 to-indigo-700" },
  ];

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      try {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      } catch (pErr) {
        console.warn('Persistence error:', pErr);
        // Continue anyway, persistence might be blocked by browser settings
      }
      
      if (mode === 'signup') {
        if (!username.trim()) throw new Error('Vui lòng nhập tên người dùng');
        if (password.length < 6) throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
        if (password !== confirmPassword) throw new Error('Mật khẩu xác nhận không khớp');
        if (!validateEmail(email)) throw new Error('Email không hợp lệ');

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: username });
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: username,
          email: user.email,
          avatar: '👨‍💻',
          xp: 0,
          coins: 0,
          streak: 0,
          completedTopicsCount: 0,
          createdAt: new Date().toISOString()
        });

        onSuccess({ displayName: username, email: user.email, uid: user.uid });
      } else if (mode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        onSuccess({ ...userData, displayName: user.displayName || userData.displayName });
      } else if (mode === 'forgot-password') {
        if (!validateEmail(email)) throw new Error('Email không hợp lệ');
        await sendPasswordResetEmail(auth, email);
        setMessage('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
        setTimeout(() => setMode('login'), 3000);
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      let errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      
      if (err.code === 'auth/email-already-in-use') errorMessage = 'Email này đã được sử dụng.';
      if (err.code === 'auth/invalid-credential') errorMessage = 'Email hoặc mật khẩu không chính xác.';
      if (err.code === 'auth/user-not-found') errorMessage = 'Không tìm thấy tài khoản với email này.';
      if (err.code === 'auth/wrong-password') errorMessage = 'Mật khẩu không chính xác.';
      if (err.code === 'auth/operation-not-allowed') errorMessage = 'Phương thức đăng nhập này chưa được bật. Vui lòng liên hệ quản trị viên.';
      if (err.code === 'auth/popup-blocked') errorMessage = 'Cửa sổ đăng nhập bị chặn. Vui lòng cho phép popup và thử lại.';
      if (err.message) errorMessage = err.message;
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          avatar: user.photoURL || '👨‍💻',
          xp: 0,
          coins: 0,
          streak: 0,
          completedTopicsCount: 0,
          createdAt: new Date().toISOString()
        });
      }
      
      const userData = userDoc.exists() ? userDoc.data() : { displayName: user.displayName };
      onSuccess(userData);
    } catch (err: any) {
      console.error('Google Login Error:', err);
      if (err.code === 'auth/popup-blocked') {
        setError('Cửa sổ đăng nhập bị chặn. Vui lòng cho phép popup và thử lại.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Đăng nhập bằng Google chưa được cấu hình đúng. Vui lòng thử cách khác.');
      } else {
        setError('Không thể đăng nhập bằng Google. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      
      onSuccess({ 
        uid: user.uid, 
        displayName: 'Khách', 
        avatar: '👤',
        xp: 0,
        coins: 0,
        streak: 0
      });
    } catch (err: any) {
      console.error('Anonymous Login Error:', err);
      setError('Không thể đăng nhập chế độ khách. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4 transition-all duration-700 relative overflow-hidden",
      backgrounds[bgIndex].class
    )}>
      <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
        <button 
          onClick={() => setBgIndex((prev) => (prev + 1) % backgrounds.length)}
          className={cn(
            "p-3 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center gap-2 border-2",
            darkMode 
              ? "bg-white text-slate-950 border-white hover:bg-slate-100" 
              : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
          )}
          title="Đổi hình nền"
        >
          <ImageIcon className="w-6 h-6" />
          <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Đổi nền</span>
        </button>

        <button 
          onClick={onToggleDarkMode}
          className={cn(
            "p-3 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center gap-2 border-2",
            darkMode 
              ? "bg-white text-slate-950 border-white hover:bg-slate-100" 
              : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
          )}
          title={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-amber-500 fill-amber-500" />
          ) : (
            <Moon className="w-6 h-6 text-blue-400 fill-blue-400" />
          )}
          <span className="text-xs font-black uppercase tracking-widest hidden sm:block">
            {darkMode ? 'Sáng' : 'Tối'}
          </span>
        </button>
      </div>

      {bgIndex === 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight dark:text-white mb-2">
            EduQuest <span className="text-blue-500">Tin Học</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {mode === 'login' ? 'Chào mừng bạn quay trở lại!' : 
             mode === 'signup' ? 'Bắt đầu hành trình chinh phục tri thức' : 
             'Khôi phục quyền truy cập tài khoản'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </motion.div>
              )}

              {message && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Tên người dùng</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ví dụ: Minh Anh"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:border-blue-500 outline-none transition-all font-bold dark:text-white"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:border-blue-500 outline-none transition-all font-bold dark:text-white"
                  required
                />
              </div>
            </div>

            {mode !== 'forgot-password' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mật khẩu</label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setMode('forgot-password')}
                      className="text-[10px] font-black text-blue-500 hover:text-blue-600 uppercase tracking-widest"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-12 py-4 focus:border-blue-500 outline-none transition-all font-bold dark:text-white"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Xác nhận mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:border-blue-500 outline-none transition-all font-bold dark:text-white"
                    required
                  />
                </div>
              </div>
            )}

            {mode !== 'forgot-password' && (
              <div className="flex items-center justify-between ml-1 py-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-6 h-6">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-700 rounded-xl peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                    <CheckCircle2 className="absolute inset-0 w-6 h-6 text-white scale-0 peer-checked:scale-75 transition-transform" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">Ghi nhớ đăng nhập</span>
                </label>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span className="uppercase tracking-widest">
                    {mode === 'login' ? 'Đăng nhập' : mode === 'signup' ? 'Tạo tài khoản' : 'Gửi yêu cầu'}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {mode !== 'forgot-password' && (
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
                  <span className="bg-white dark:bg-[#1a2333] px-4 text-slate-400">Hoặc</span>
                </div>
              </div>
            )}

            {mode !== 'forgot-password' && (
              <div className="flex flex-col gap-3">
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500/50 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 dark:text-white"
                >
                  <Chrome className="w-5 h-5 text-blue-500" />
                  Tiếp tục với Google
                </button>
                <button 
                  type="button"
                  onClick={handleAnonymousLogin}
                  disabled={loading}
                  className="w-full bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-xs uppercase tracking-widest"
                >
                  <UserIcon className="w-4 h-4" />
                  Dùng thử chế độ khách
                </button>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {mode === 'login' ? 'Chưa có tài khoản?' : 
               mode === 'signup' ? 'Đã có tài khoản?' : 
               'Quay lại trang'}
              {' '}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-blue-500 hover:text-blue-600 underline underline-offset-4"
              >
                {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
          Bằng cách tiếp tục, bạn đồng ý với <br />
          <span className="text-slate-500 dark:text-slate-300">Điều khoản & Chính sách bảo mật</span> của chúng tôi
        </p>
      </motion.div>
    </div>
  );
};
