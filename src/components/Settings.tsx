import React from 'react';
import { motion } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Type, 
  Palette, 
  Check, 
  Layout, 
  ArrowLeft,
  Save,
  LogOut,
  RotateCcw
} from 'lucide-react';
import { cn } from '../lib/utils';

interface UserSettings {
  darkMode: boolean;
  textColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large' | 'xl';
}

interface SettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
  onBack: () => void;
  onLogout: () => void;
  darkMode: boolean;
}

const FONTS = [
  { id: 'font-sans', name: 'Inter (Mặc định)', class: 'font-sans' },
  { id: 'font-lexend', name: 'Lexend (Dễ đọc)', class: 'font-lexend' },
  { id: 'font-montserrat', name: 'Montserrat (Hiện đại)', class: 'font-montserrat' },
  { id: 'font-serif', name: 'Playfair (Cổ điển)', class: 'font-serif' },
  { id: 'font-mono', name: 'JetBrains Mono (Lập trình)', class: 'font-mono' },
];

const SIZES = [
  { id: 'small', name: 'Nhỏ', value: '14px' },
  { id: 'medium', name: 'Vừa', value: '16px' },
  { id: 'large', name: 'Lớn', value: '18px' },
  { id: 'xl', name: 'Rất lớn', value: '20px' },
];

const COLORS = [
  { id: 'default', name: 'Mặc định', light: '#1e293b', dark: '#93c5fd' },
  { id: 'blue', name: 'Xanh dương', light: '#2563eb', dark: '#60a5fa' },
  { id: 'green', name: 'Xanh lá', light: '#16a34a', dark: '#4ade80' },
  { id: 'purple', name: 'Tím', light: '#7c3aed', dark: '#a78bfa' },
  { id: 'orange', name: 'Cam', light: '#ea580c', dark: '#fb923c' },
];

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdate, onBack, onLogout, darkMode }) => {
  const [tempSettings, setTempSettings] = React.useState<UserSettings>(settings);

  // Apply preview effect
  React.useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Font Family
    body.style.setProperty('--current-font', `var(--${tempSettings.fontFamily})`);
    
    // Font Size
    const sizeMap = { small: '14px', medium: '16px', large: '18px', xl: '20px' };
    body.style.setProperty('--current-size', sizeMap[tempSettings.fontSize]);
    
    // Text Color
    if (tempSettings.textColor === 'default') {
      body.style.removeProperty('--current-text-color');
    } else {
      const color = COLORS.find(c => c.id === tempSettings.textColor);
      if (color) {
        body.style.setProperty('--current-text-color', tempSettings.darkMode ? color.dark : color.light);
      }
    }

    // Dark Mode class
    if (tempSettings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Cleanup preview on unmount if not saved
    return () => {
      // Restore original settings
      body.style.setProperty('--current-font', `var(--${settings.fontFamily})`);
      body.style.setProperty('--current-size', sizeMap[settings.fontSize]);
      if (settings.textColor === 'default') {
        body.style.removeProperty('--current-text-color');
      } else {
        const color = COLORS.find(c => c.id === settings.textColor);
        if (color) {
          body.style.setProperty('--current-text-color', settings.darkMode ? color.dark : color.light);
        }
      }
      if (settings.darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
  }, [tempSettings, settings]);

  const handleSave = () => {
    onUpdate(tempSettings);
    onBack();
  };

  const handleReset = () => {
    setTempSettings({
      darkMode: false,
      textColor: 'default',
      fontFamily: 'font-sans',
      fontSize: 'medium'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
        <h1 className="text-3xl font-black dark:text-white">Tùy chỉnh giao diện</h1>
        <div className="w-20" /> {/* Spacer */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Theme Mode */}
          <section className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-black mb-4 flex items-center gap-2 dark:text-white">
              <Layout className="w-5 h-5 text-blue-500" />
              Chế độ hiển thị
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTempSettings(prev => ({ ...prev, darkMode: false }))}
                className={cn(
                  "flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold",
                  !tempSettings.darkMode 
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-500/10" 
                    : "border-slate-100 dark:border-slate-700 text-slate-500 hover:border-slate-200 dark:hover:border-slate-600"
                )}
              >
                <Sun className="w-5 h-5" />
                Sáng
              </button>
              <button
                onClick={() => setTempSettings(prev => ({ ...prev, darkMode: true }))}
                className={cn(
                  "flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold",
                  tempSettings.darkMode 
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-500/10" 
                    : "border-slate-100 dark:border-slate-700 text-slate-500 hover:border-slate-200 dark:hover:border-slate-600"
                )}
              >
                <Moon className="w-5 h-5" />
                Tối
              </button>
            </div>
          </section>

          {/* Font Family */}
          <section className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-black mb-4 flex items-center gap-2 dark:text-white">
              <Type className="w-5 h-5 text-indigo-500" />
              Phông chữ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FONTS.map(font => (
                <button
                  key={font.id}
                  onClick={() => setTempSettings(prev => ({ ...prev, fontFamily: font.id }))}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left",
                    tempSettings.fontFamily === font.id
                      ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-500/10"
                      : "border-slate-100 dark:border-slate-700 text-slate-500 hover:border-slate-200 dark:hover:border-slate-600",
                    font.class
                  )}
                >
                  <span className="font-bold">{font.name}</span>
                  {tempSettings.fontFamily === font.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </section>

          {/* Font Size */}
          <section className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-black mb-4 flex items-center gap-2 dark:text-white">
              <Type className="w-5 h-5 text-emerald-500 scale-110" />
              Kích thước chữ
            </h2>
            <div className="flex flex-wrap gap-3">
              {SIZES.map(size => (
                <button
                  key={size.id}
                  onClick={() => setTempSettings(prev => ({ ...prev, fontSize: size.id as any }))}
                  className={cn(
                    "px-6 py-3 rounded-2xl border-2 transition-all font-bold",
                    tempSettings.fontSize === size.id
                      ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-500/10"
                      : "border-slate-100 dark:border-slate-700 text-slate-500 hover:border-slate-200 dark:hover:border-slate-600"
                  )}
                  style={{ fontSize: size.value }}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </section>

          {/* Text Color */}
          <section className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-black mb-4 flex items-center gap-2 dark:text-white">
              <Palette className="w-5 h-5 text-rose-500" />
              Màu chữ chính
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {COLORS.map(color => (
                <button
                  key={color.id}
                  onClick={() => setTempSettings(prev => ({ ...prev, textColor: color.id }))}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all",
                    tempSettings.textColor === color.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                      : "border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600"
                  )}
                >
                  <div 
                    className="w-8 h-8 rounded-full shadow-inner border border-slate-200 dark:border-slate-600"
                    style={{ backgroundColor: tempSettings.darkMode ? color.dark : color.light }}
                  />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              LƯU CÀI ĐẶT
            </button>
            <button
              onClick={handleReset}
              className="px-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-4 rounded-2xl font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              KHÔI PHỤC
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <div className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                  Xem trước
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black dark:text-white">Tiêu đề mẫu</h3>
                    <p className="text-xs text-slate-400">Đây là phụ đề mẫu</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="leading-relaxed">
                    EduQuest giúp bạn học tập hiệu quả hơn với các bài giảng tương tác và trò chơi trí tuệ.
                  </p>
                  <p className="leading-relaxed opacity-70">
                    Hãy thử thay đổi phông chữ và kích thước để tìm ra giao diện phù hợp nhất với mắt của bạn.
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-blue-500" />
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Tiến độ học tập</span>
                    <span>66%</span>
                  </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-black text-sm shadow-lg shadow-blue-500/20">
                  NÚT BẤM MẪU
                </button>
              </div>
            </div>
            
            <p className="mt-6 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed px-4">
              Giao diện sẽ được áp dụng ngay lập tức cho toàn bộ ứng dụng sau khi bạn nhấn lưu.
            </p>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
              <button 
                onClick={onLogout}
                className="w-full py-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-2xl font-black transition-all flex items-center justify-center gap-3 group"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                ĐĂNG XUẤT TÀI KHOẢN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
