export interface Mascot {
  id: string;
  name: string;
  emoji: string;
  personality: string;
  price: number;
  unlockedByDefault: boolean;
}

export const MASCOTS: Mascot[] = [
  {
    id: 'black-cat',
    name: 'Mèo Đen Thông Thái',
    emoji: '🐱',
    personality: 'Thông minh, bí ẩn',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'snow-dog',
    name: 'Chó Tuyết Cổ Vũ',
    emoji: '🐶',
    personality: 'Thân thiện, nhiệt tình',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'grizzly-bear',
    name: 'Gấu Xám Động Viên',
    emoji: '🐻',
    personality: 'Mạnh mẽ, kiên trì',
    price: 150,
    unlockedByDefault: false,
  },
  {
    id: 'bunny',
    name: 'Thỏ Con An Ủi',
    emoji: '🐰',
    personality: 'Dễ thương, nhẹ nhàng',
    price: 0,
    unlockedByDefault: true,
  },
  {
    id: 'yellow-duck',
    name: 'Vịt Vàng Nhắc Nhở',
    emoji: '🦆',
    personality: 'Vui nhộn, lém lỉnh',
    price: 100,
    unlockedByDefault: false,
  },
];

export const getMascotMessage = (mascotId: string, performance: 'perfect' | 'good' | 'average' | 'poor' | 'motivation'): string => {
  switch (mascotId) {
    case 'black-cat':
      if (performance === 'perfect') return "Xuất sắc! Bạn thật sự giỏi Tin học! 💎";
      if (performance === 'good') return "Chúc mừng! Bạn làm rất tốt! 🎉";
      return "Kiến thức là sức mạnh, hãy tiếp tục khám phá.";
    case 'snow-dog':
      if (performance === 'perfect' || performance === 'good') return "Gâu gâu! Bạn làm tuyệt lắm! 🎉";
      if (performance === 'average') return "Khá lắm, cố gắng thêm chút nữa nhé! 🐾";
      return "Đừng buồn, mình luôn ở đây cổ vũ bạn!";
    case 'grizzly-bear':
      return "Cố gắng lên! Bạn đang tiến bộ từng ngày! 💪";
    case 'bunny':
      return "Không sao đâu, thử lại nhé! Mình tin bạn làm được. 💪";
    case 'yellow-duck':
      return "Cạp cạp! Đừng bỏ cuộc! Học thêm chút nữa nhé! 🦆";
    default:
      return "Bạn đã hoàn thành bài học!";
  }
};
