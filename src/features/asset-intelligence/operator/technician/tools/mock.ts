import { TechnicianToolItem } from '../types';

export const getTechnicianTools = async (): Promise<TechnicianToolItem[]> => {
  return [
    { id: 'TL-0001', name: 'มัลติมิเตอร์ดิจิตอล', enName: 'Digital Multimeter', category: 'เครื่องมือวัดไฟฟ้า', brandModel: 'FLUKE 117', serialNumber: '55990088', status: 'พร้อมใช้งาน', location: 'กล่องเครื่องมือหลัก', calibrationDate: '15 มิ.ย. 2567', calibrationStatusText: 'เหลือ 25 วัน', isOverdue: false, image: 'https://images.unsplash.com/photo-1588508065123-287b28e018ea?w=150&h=150&fit=crop' },
    { id: 'TL-0002', name: 'แคลมป์มิเตอร์', enName: 'Clamp Meter', category: 'เครื่องมือวัดไฟฟ้า', brandModel: 'FLUKE 325', serialNumber: '32560019', status: 'ถูกใช้งาน', location: 'หน้างาน อาคาร A ชั้น 2', calibrationDate: '10 มิ.ย. 2567', calibrationStatusText: 'เหลือ 20 วัน', isOverdue: false, image: 'https://images.unsplash.com/photo-1527357039063-95627230da37?w=150&h=150&fit=crop' },
  ];
};
