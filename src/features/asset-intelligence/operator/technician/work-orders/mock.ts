import { TechnicianAllWOStats, TechnicianAllWOItem } from '../types';

export const getTechnicianAllWOStats = async (): Promise<TechnicianAllWOStats> => {
  return {
    all: 128,
    pending: 15,
    inProgress: 18,
    waiting: 5,
    completed: 85,
    canceled: 5,
  };
};

export const getTechnicianAllWOs = async (): Promise<TechnicianAllWOItem[]> => {
  return [
    {
      id: 'WO-6705-00123',
      woNumber: 'WO-6705-00123',
      createdDate: '20 พ.ค. 2567 09:15',
      taskType: 'แจ้งซ่อม',
      taskIcon: 'Wrench',
      taskIconColor: 'text-amber-600',
      taskIconBg: 'bg-amber-50',
      assetName: 'เครื่องปรับอากาศ แบบแขวน',
      location: 'อาคารสำนักงาน ชั้น 2 ห้อง 201',
      reporterName: 'น.ส. กานต์พิชชา',
      reporterDept: 'กองคลัง',
      priority: 'สูง',
      priorityColor: 'text-rose-600 bg-rose-50',
      dueDate: '21 พ.ค. 2567',
      dueTime: '17:00 น.',
      createdDateOnly: '20 พ.ค. 2567',
      createdTimeOnly: '09:15 น.',
      assigneeName: 'สมชาย ช่างเทคนิค',
      status: 'กำลังดำเนินการ',
      statusColor: 'text-blue-600',
      statusBg: 'bg-blue-50',
      actionText: 'ดำเนินการต่อ',
    },
    {
      id: 'WO-6705-00122',
      woNumber: 'WO-6705-00122',
      createdDate: '19 พ.ค. 2567 14:00',
      taskType: 'บำรุงรักษา (PM)',
      taskIcon: 'Settings',
      taskIconColor: 'text-blue-600',
      taskIconBg: 'bg-blue-50',
      assetName: 'GEN-25KVA',
      location: 'ศูนย์บริการสาธารณสุข',
      reporterName: 'นายสุวิทย์',
      reporterDept: 'กองช่าง',
      priority: 'ปานกลาง',
      priorityColor: 'text-amber-600 bg-amber-50',
      dueDate: '23 พ.ค. 2567',
      dueTime: '16:00 น.',
      createdDateOnly: '19 พ.ค. 2567',
      createdTimeOnly: '14:00 น.',
      assigneeName: 'สมชาย ช่างเทคนิค',
      status: 'รอดำเนินการ',
      statusColor: 'text-amber-600',
      statusBg: 'bg-amber-50',
      actionText: 'เริ่มงาน',
    },
  ];
};
