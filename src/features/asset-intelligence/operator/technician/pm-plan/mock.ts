import { TechnicianPMPlanStats, TechnicianPMFreqSummary, TechnicianPMPlanItem } from '../types';

export const getTechnicianPMPlanStats = async (): Promise<TechnicianPMPlanStats> => {
  return {
    all: 48,
    active: { count: 36, percent: 75 },
    nearingDue: { count: 6, label: "ภายใน 7 วัน" },
    overdue: { count: 3, label: "ต้องดำเนินการ" },
    suspended: { count: 3, percent: 6 },
  };
};

export const getTechnicianPMFreqSummary = async (): Promise<TechnicianPMFreqSummary> => {
  return {
    monthly: { count: 24, percent: '50.0%' },
    quarterly: { count: 12, percent: '25.0%' },
    halfYearly: { count: 8, percent: '16.7%' },
    yearly: { count: 4, percent: '8.3%' },
  };
};

export const getTechnicianPMPlans = async (): Promise<TechnicianPMPlanItem[]> => {
  const baseTasks: TechnicianPMPlanItem[] = [
    {
      id: 'pmp1',
      code: 'PM-6705-00048',
      name: 'บำรุงรักษาเครื่องสูบน้ำ ขนาด 3 HP',
      assetName: 'PUMP-000123',
      location: 'สถานีสูบน้ำหนองมน',
      frequency: 'รายเดือน',
      nextCycleDate: '25 พ.ค. 2567',
      nextCycleRemaining: 'อีก 5 วัน',
      nextCycleColor: 'text-orange-600',
      assigneeName: 'สมชาย ช่างเทคนิค',
      status: 'ใกล้ถึงกำหนด',
      statusColor: 'text-orange-600',
      statusBg: 'bg-orange-50',
      actionText: 'ดูรายละเอียด',
      icon: 'Wrench',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
  ];
  return baseTasks;
};
