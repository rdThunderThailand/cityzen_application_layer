import { TechnicianHistoryItem } from '../types';

export const getTechnicianHistory = async (): Promise<TechnicianHistoryItem[]> => {
  return [
    { workOrderId: 'WO-6705-00123', equipmentName: 'เครื่องปรับอากาศ แบบแขวน', equipmentSubtext: 'แอร์สำนักงาน ชั้น 2 ห้อง 201', location: 'อาคารสำนักงาน', locationSubtext: 'ชั้น 2 ห้อง 201', jobType: 'ซ่อมแซม', startDate: '20 พ.ค. 2567', startTime: '09:15', endDate: '20 พ.ค. 2567', endTime: '14:25', operatorName: 'สมชาย ช.', operatorRole: 'ช่างเทคนิค', status: 'เสร็จสิ้น', cost: 1850.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1527357039063-95627230da37?w=150&h=150&fit=crop', operatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    { workOrderId: 'WO-6705-00120', equipmentName: 'ปั๊มน้ำ', equipmentSubtext: 'ระบบปั๊มน้ำ อาคาร A ชั้น 1', location: 'อาคาร A', locationSubtext: 'ชั้น 1', jobType: 'ซ่อมแซม', startDate: '19 พ.ค. 2567', startTime: '13:30', endDate: '19 พ.ค. 2567', endTime: '16:45', operatorName: 'วิชัย ช.', operatorRole: 'ช่างเทคนิค', status: 'เสร็จสิ้น', cost: 2300.00, rating: 4.0, image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=150&h=150&fit=crop', operatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  ];
};
