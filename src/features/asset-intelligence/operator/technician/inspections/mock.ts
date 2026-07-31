import { TechnicianInspectionStats, TechnicianInspectionItem } from '../types';

export const getTechnicianInspectionStats = async (): Promise<TechnicianInspectionStats> => {
  return {
    pending: 15,
    inspecting: 6,
    inspected: 32,
    issueFound: 8,
    canceled: 2,
  };
};

export const getTechnicianInspections = async (): Promise<TechnicianInspectionItem[]> => {
  const baseTasks: TechnicianInspectionItem[] = [
    {
      id: 'ins1',
      woNumber: 'WO-6705-00123',
      woDate: '20 พ.ค. 2567 09:15',
      assetName: 'เครื่องปรับอากาศ แบบแขวน',
      assetLocation: 'อาคารสำนักงาน ชั้น 2',
      location: 'อาคารสำนักงาน ชั้น 2 ห้อง 201',
      reporterName: 'น.ส. กานต์พิชชา',
      reporterDept: 'กองคลัง',
      status: 'รอดำเนินการตรวจสอบ',
      statusBg: 'bg-orange-50',
      statusColor: 'text-orange-600',
      priority: 'สูง',
      priorityColor: 'text-rose-600',
      appointmentDate: '20 พ.ค. 2567',
      appointmentTime: '09:15 น.',
      dueDate: '21 พ.ค. 2567',
      dueTime: '17:00 น.',
      actionText: 'ตรวจสอบ'
    },
    {
      id: 'ins2',
      woNumber: 'WO-6705-00119',
      woDate: '19 พ.ค. 2567 16:30',
      assetName: 'ปั๊มน้ำซอยโอ่ง ขนาด 3 HP',
      assetLocation: 'สถานีสูบน้ำหนองมน',
      location: 'สถานีสูบน้ำ หนองมน',
      reporterName: 'นายเอกชัย',
      reporterDept: 'กองช่าง',
      status: 'กำลังตรวจสอบ',
      statusBg: 'bg-blue-50',
      statusColor: 'text-blue-600',
      priority: 'ปานกลาง',
      priorityColor: 'text-orange-500',
      appointmentDate: '19 พ.ค. 2567',
      appointmentTime: '16:30 น.',
      dueDate: '20 พ.ค. 2567',
      dueTime: '16:00 น.',
      actionText: 'บันทึกผล'
    },
    {
      id: 'ins3',
      woNumber: 'WO-6705-00118',
      woDate: '19 พ.ค. 2567 10:05',
      assetName: 'ไฟฟ้าส่องสว่างถนน LED 120W',
      assetLocation: 'ถนนบางแสนสาย 2',
      location: 'ถนนบางแสน สาย 2',
      reporterName: 'ร.ต.ท. วัฒนา',
      reporterDept: 'ฝ่ายป้องกันฯ',
      status: 'ตรวจสอบแล้ว',
      statusBg: 'bg-emerald-50',
      statusColor: 'text-emerald-600',
      priority: 'สูง',
      priorityColor: 'text-rose-600',
      appointmentDate: '19 พ.ค. 2567',
      appointmentTime: '10:05 น.',
      dueDate: '19 พ.ค. 2567',
      dueTime: '18:00 น.',
      actionText: 'ดูรายละเอียด'
    }
  ];

  const manyTasks: TechnicianInspectionItem[] = [];
  for (let i = 0; i < 15; i++) {
    const baseItem = baseTasks[i % baseTasks.length];
    const woSuffix = (123 - i).toString().padStart(5, '0');
    manyTasks.push({
      ...baseItem,
      id: `ins${i + 1}`,
      woNumber: `WO-6705-${woSuffix}`,
    });
  }
  return manyTasks;
};
