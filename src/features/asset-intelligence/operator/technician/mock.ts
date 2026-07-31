import {
  TechnicianSummaryStats,
  TechnicianTaskItem,
  TechnicianMaintenanceOverview,
  TechnicianPreWorkChecklist,
  TechnicianPMPlan,
  TechnicianNotification,
  TechnicianToolsAndSpares,
} from './types';

export const getTechnicianSummaryStats = async (): Promise<TechnicianSummaryStats> => {
  return {
    tasksToday: 5,
    urgentTasks: 2,
    overdueTasks: 1,
    completedThisWeek: 12,
    hoursWorked: 6,
    maxHours: 8,
    progressPercent: 70,
  };
};

export const getTechnicianTasksToday = async (): Promise<TechnicianTaskItem[]> => {
  return [
    {
      id: 'WO-2026-001',
      time: '09:00 น.',
      isUrgent: true,
      title: 'ตรวจสอบแรงดันน้ำปั๊มหลัก อาคาร A',
      location: 'อาคาร A ชั้น B1 ห้องเครื่องปั๊ม',
      assetId: 'PUMP-A-01',
      status: 'กำลังดำเนินการ',
      statusColor: 'text-blue-600',
      statusBg: 'bg-blue-50',
      imgUrl: '/placeholder-asset.png',
    },
    {
      id: 'WO-2026-002',
      time: '11:30 น.',
      isUrgent: false,
      title: 'เปลี่ยนฟิลเตอร์แอร์ ห้องประชุมใหญ่ 1',
      location: 'อาคาร B ชั้น 3 ห้อง 301',
      assetId: 'HVAC-B-301',
      status: 'รอรับงาน',
      statusColor: 'text-amber-600',
      statusBg: 'bg-amber-50',
      imgUrl: '/placeholder-asset.png',
    },
    {
      id: 'WO-2026-003',
      time: '14:00 น.',
      isUrgent: true,
      title: 'แก้ไขระบบไฟฟ้ารอบนอกอาคาร C ดับ',
      location: 'อาคาร C บริเวณลานจอดรถ',
      assetId: 'ELEC-C-OUT',
      status: 'รอรับงาน',
      statusColor: 'text-amber-600',
      statusBg: 'bg-amber-50',
      imgUrl: '/placeholder-asset.png',
    },
    {
      id: 'WO-2026-004',
      time: '16:00 น.',
      isUrgent: false,
      title: 'ตรวจสอบลิฟต์โดยสารหมายเลข 2',
      location: 'อาคาร A ลิฟต์ L2',
      assetId: 'LIFT-A-02',
      status: 'เสร็จสิ้น',
      statusColor: 'text-emerald-600',
      statusBg: 'bg-emerald-50',
      imgUrl: '/placeholder-asset.png',
    },
  ];
};

export const getTechnicianMaintenanceOverview = async (): Promise<TechnicianMaintenanceOverview> => {
  return {
    total: 45,
    items: [
      { label: 'เครื่องปรับอากาศ (HVAC)', count: 18, percent: '40%', color: 'bg-blue-500' },
      { label: 'ระบบไฟฟ้า (Electrical)', count: 12, percent: '26.7%', color: 'bg-amber-500' },
      { label: 'ระบบสุขาภิบาล (Plumbing)', count: 9, percent: '20%', color: 'bg-emerald-500' },
      { label: 'ลิฟต์และอาคาร (Elevator/Building)', count: 6, percent: '13.3%', color: 'bg-purple-500' },
    ],
  };
};

export const getTechnicianPreWorkChecklist = async (): Promise<TechnicianPreWorkChecklist[]> => {
  return [
    { id: '1', title: 'สวมหมวกนิรภัยและรองเท้าเซฟตี้', score: 10, maxScore: 10, isChecked: true },
    { id: '2', title: 'ตรวจเช็กเครื่องมือประจำตัวครบถ้วน', score: 10, maxScore: 10, isChecked: true },
    { id: '3', title: 'ตรวจสอบป้ายเตือนและอุปกรณ์กั้นพื้นที่', score: 10, maxScore: 10, isChecked: false },
    { id: '4', title: 'ตรวจสอบใบอนุญาตทำงาน (Work Permit)', score: 10, maxScore: 10, isChecked: true },
  ];
};

export const getTechnicianPMPlan = async (): Promise<TechnicianPMPlan[]> => {
  return [
    { id: 'PM-01', dateStr: '31 ก.ค. 2026', title: 'บำรุงรักษาตู้ MDB อาคาร A', subtitle: 'ทุก 3 เดือน', relativeDays: 'พรุ่งนี้', relativeColor: 'text-amber-600 bg-amber-50' },
    { id: 'PM-02', dateStr: '02 ส.ค. 2026', title: 'ตรวจเช็กระบบดับเพลิงและสัญญาณเตือน', subtitle: 'ประจำเดือน', relativeDays: 'อีก 3 วัน', relativeColor: 'text-blue-600 bg-blue-50' },
    { id: 'PM-03', dateStr: '05 ส.ค. 2026', title: 'ล้างเครื่องทำความเย็น Chiller #1', subtitle: 'ทุก 6 เดือน', relativeDays: 'อีก 6 วัน', relativeColor: 'text-emerald-600 bg-emerald-50' },
  ];
};

export const getTechnicianNotifications = async (): Promise<TechnicianNotification[]> => {
  return [
    { id: 'N-1', type: 'danger', title: 'งานด่วนที่สุด!', subtitle: 'แจ้งซ่อมลิฟต์ค้าง อาคาร A ชั้น 4', timeAgo: '10 นาทีที่แล้ว' },
    { id: 'N-2', type: 'info', title: 'มอบหมายงานใหม่', subtitle: 'งานตรวจเช็กตู้ไฟฟ้า MDB', timeAgo: '1 ชั่วโมงที่แล้ว' },
    { id: 'N-3', type: 'success', title: 'อนุมัติเบิกอะไหล่', subtitle: 'รายการเบิกสายพานพัดลม Chiller ผ่านการอนุมัติ', timeAgo: '2 ชั่วโมงที่แล้ว' },
  ];
};

export const getTechnicianToolsAndSpares = async (): Promise<TechnicianToolsAndSpares> => {
  return {
    toolCount: 14,
    inventoryCount: 38,
  };
};
