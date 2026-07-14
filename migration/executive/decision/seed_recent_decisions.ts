import type { ComponentType } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export type RecentDecisionStatusKey = 'approved' | 'in_progress';

export interface RecentDecisionItem {
  status: RecentDecisionStatusKey;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  timestamp: string;
  budgetLabel: string;
}

export const recentDecisionStatusConfig: Record<RecentDecisionStatusKey, { label: string; className: string; iconWrapperClass: string }> = {
  approved: { label: 'อนุมัติ', className: 'text-emerald-500', iconWrapperClass: 'bg-emerald-50 text-emerald-500' },
  in_progress: { label: 'อยู่ระหว่างดำเนินการ', className: 'text-blue-500', iconWrapperClass: 'bg-blue-50 text-blue-500' },
};

export const recentDecisionData = {
  heading: 'สรุปการตัดสินใจล่าสุด',
  allDataHref: '#',
  items: [
    {
      status: 'approved',
      icon: CheckCircle2,
      title: 'โครงการปรับปรุงระบบไฟฟ้าแสงสว่าง',
      description: 'งบประมาณ 12.50 อบ.',
      timestamp: '17 ก.ค. 2567 14:35 น.',
      budgetLabel: 'งบประมาณ 12.50 อบ.',
    },
    {
      status: 'in_progress',
      icon: Clock,
      title: 'แผนจัดการขยะมูลฝอย ประจำปีงบประมาณ',
      description: 'งบประมาณ 8.75 อบ.',
      timestamp: '17 ก.ค. 2567 11:20 น.',
      budgetLabel: 'งบประมาณ 8.75 อบ.',
    },
    {
      status: 'approved',
      icon: CheckCircle2,
      title: 'จัดซื้อวัคซีนป้องกันไข้เลือดออก',
      description: 'งบประมาณ 5.40 อบ.',
      timestamp: '16 ก.ค. 2567 09:10 น.',
      budgetLabel: 'งบประมาณ 5.40 อบ.',
    },
  ] satisfies RecentDecisionItem[],
};
