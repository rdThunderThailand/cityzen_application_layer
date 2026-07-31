import { TechnicianRequestItem } from '../types';

export const getTechnicianRequests = async (): Promise<TechnicianRequestItem[]> => {
  return [
    { id: 'RQ-6705-0056', asset: 'เครื่องปรับอากาศ แบบแขวน', location: 'อาคารสำนักงาน ชั้น 2', reporter: 'น.ส. กานต์พิชชา', urgency: 'สูง', status: 'รอดำเนินการ', date: '20 พ.ค. 2567 09:15 น.', dueDate: '21 พ.ค. 2567 17:00 น.', dateTop: '20 พ.ค. 2567', dateBottom: '09:15 น.', dueTop: '21 พ.ค. 2567', dueBottom: '17:00 น.', iconBg: 'bg-orange-100 text-orange-600', type: 'ซ่อมแซม', image: 'https://images.unsplash.com/photo-1527357039063-95627230da37?w=150&h=150&fit=crop' },
    { id: 'RQ-6705-0055', asset: 'ปั๊มน้ำหอยโข่ง ขนาด 3 HP', location: 'สถานีสูบน้ำหนองมน', reporter: 'นายเอกชัย', urgency: 'ปานกลาง', status: 'กำลังดำเนินการ', date: '19 พ.ค. 2567 16:30 น.', dueDate: '20 พ.ค. 2567 16:00 น.', dateTop: '19 พ.ค. 2567', dateBottom: '16:30 น.', dueTop: '20 พ.ค. 2567', dueBottom: '16:00 น.', iconBg: 'bg-purple-100 text-purple-600', type: 'บำรุงรักษา', image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=150&h=150&fit=crop' },
  ];
};
