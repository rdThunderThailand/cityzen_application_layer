import { TechnicianInventoryItem } from '../types';

export const getTechnicianInventory = async (): Promise<TechnicianInventoryItem[]> => {
  return [
    { id: 'FAN-001', name: 'พัดลมคอยล์ร้อน 18,000 BTU', category: 'พัดลม', unit: 'ชิ้น', warehouse: 'คลังหลัก', stockRem: 15, stockMin: 5, unitValue: 1250, totalValue: 18750, status: 'มีสต๊อก', image: 'https://images.unsplash.com/photo-1527357039063-95627230da37?w=150&h=150&fit=crop' },
    { id: 'CAP-25UF-450V', name: 'คาปาซิเตอร์ 25uF 450V', category: 'อุปกรณ์ไฟฟ้า', unit: 'ชิ้น', warehouse: 'คลังหลัก', stockRem: 8, stockMin: 10, unitValue: 120, totalValue: 960, status: 'สต๊อกต่ำ', image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=150&h=150&fit=crop' },
    { id: 'COMP-24000BTU', name: 'คอมเพรสเซอร์ 24,000 BTU', category: 'คอมเพรสเซอร์', unit: 'ชิ้น', warehouse: 'คลังหลัก', stockRem: 0, stockMin: 2, unitValue: 5800, totalValue: 0, status: 'สต๊อกหมด', image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?w=150&h=150&fit=crop' },
  ];
};
