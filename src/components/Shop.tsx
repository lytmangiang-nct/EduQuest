import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Coins } from 'lucide-react';
import { SHOP_ITEMS, ShopItem } from '../data/curriculum';
import { MASCOTS, Mascot } from '../data/mascots';

interface ShopProps {
  coins: number;
  inventory: string[];
  unlockedMascots: string[];
  activeMascotId: string;
  onPurchase: (item: ShopItem | Mascot) => void;
  onSelectMascot: (id: string) => void;
  onClose: () => void;
}

export const Shop: React.FC<ShopProps> = ({ 
  coins, 
  inventory, 
  unlockedMascots, 
  activeMascotId, 
  onPurchase, 
  onSelectMascot, 
  onClose 
}) => {
  return (
    <div className="max-w-4xl w-full mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-3 dark:text-[var(--heading)]">
            <ShoppingBag className="text-rose-500" />
            Cửa hàng Vật phẩm
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Dùng điểm tích lũy để đổi lấy những vật phẩm độc đáo.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 shadow-sm">
          <Coins className="text-amber-400 w-6 h-6" />
          <span className="text-2xl font-black text-amber-500 dark:text-amber-400">{coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {SHOP_ITEMS.map((item) => {
          const isOwned = inventory.includes(item.id);
          const canAfford = coins >= item.price;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all"
            >
              <div className="h-32 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-6xl">
                {item.icon}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">{item.type}</span>
                  <h3 className="font-bold text-lg dark:text-[var(--heading)]">{item.name}</h3>
                </div>
                
                <div className="mt-auto">
                  <button
                    disabled={isOwned || !canAfford}
                    onClick={() => onPurchase(item)}
                    className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isOwned 
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                        : canAfford
                          ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    {isOwned ? (
                      'Đã sở hữu'
                    ) : (
                      <>
                        <Coins className="w-4 h-4" />
                        {item.price}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-black mb-2 dark:text-[var(--heading)]">Linh vật đồng hành</h2>
        <p className="text-slate-500 dark:text-slate-400">Chọn linh vật sẽ xuất hiện để động viên bạn sau mỗi bài học.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MASCOTS.map((mascot) => {
          const isUnlocked = unlockedMascots.includes(mascot.id);
          const isActive = activeMascotId === mascot.id;
          const canAfford = coins >= mascot.price;

          return (
            <motion.div
              key={mascot.id}
              whileHover={{ y: -5 }}
              className={`bg-white dark:bg-slate-800 rounded-3xl border overflow-hidden flex flex-col transition-all shadow-sm ${
                isActive ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-100 dark:border-slate-700'
              }`}
            >
              <div className="h-32 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-6xl">
                {mascot.emoji}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">{mascot.personality}</span>
                  <h3 className="font-bold text-lg dark:text-[var(--heading)]">{mascot.name}</h3>
                </div>
                
                <div className="mt-auto">
                  {isUnlocked ? (
                    <button
                      onClick={() => onSelectMascot(mascot.id)}
                      className={`w-full py-3 rounded-2xl font-bold transition-all ${
                        isActive
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {isActive ? 'Đang chọn' : 'Chọn'}
                    </button>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => onPurchase(mascot)}
                      className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-4 h-4" />
                      {mascot.price}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={onClose}
          className="px-10 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-[var(--heading)] rounded-2xl font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          Quay lại Dashboard
        </button>
      </div>
    </div>
  );
};
