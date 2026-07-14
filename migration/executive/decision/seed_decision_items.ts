import type { ComponentType } from 'react';
import { AlertTriangle, Waves, Wind, Briefcase, Construction, Syringe } from 'lucide-react';

export type DecisionUrgencyKey = 'urgent' | 'important' | 'normal';
export type DecisionImpactKey = 'high' | 'medium' | 'low';

export interface DecisionItem {
  icon: ComponentType<{ className?: string }>;
  iconWrapperClass: string;
  urgency: DecisionUrgencyKey;
  title: string;
  department: string;
  areas: string;
  budgetLabel: string;
  impact: DecisionImpactKey;
  impactValue: string;
}

export const decisionUrgencyConfig: Record<DecisionUrgencyKey, { label: string; className: string }> = {
  urgent: { label: 'เร่งด่วน', className: 'bg-rose-50 text-rose-600' },
  important: { label: 'สำคัญ', className: 'bg-amber-50 text-amber-600' },
  normal: { label: 'ปกติ', className: 'bg-slate-100 text-slate-500' },
};

export const decisionImpactConfig: Record<DecisionImpactKey, { label: string; className: string }> = {
  high: { label: 'ผลกระทบสูง', className: 'text-rose-500' },
  medium: { label: 'ผลกระทบปานกลาง', className: 'text-amber-500' },
  low: { label: 'ผลกระทบต่ำ', className: 'text-slate-400' },
};

export const decisionItemData = {
  heading: 'เรื่องเพื่อการตัดสินใจ',
  allDataHref: '#',
  items: [
    {
      icon: AlertTriangle,
      iconWrapperClass: 'bg-rose-50 text-rose-500',
      urgency: 'urgent',
      title: 'ขออนุมัติแผนรับมือฝนตกหนักต่อเนื่อง',
      department: 'สำนักงานป้องกันและบรรเทาสาธารณภัยจังหวัด',
      areas: 'กะทู้, ป่าตอง, เกาะแก้ว',
      budgetLabel: 'งบประมาณ 186.75 อบ.',
      impact: 'high',
      impactValue: '186.75 อบ.',
    },
    {
      icon: Waves,
      iconWrapperClass: 'bg-blue-50 text-blue-500',
      urgency: 'urgent',
      title: 'ขออนุมัติติดตั้งระบบระบายน้ำและแนวป้องกันน้ำท่วม',
      department: 'สำนักงานโยธาธิการและผังเมืองจังหวัด',
      areas: 'เมืองภูเก็ต',
      budgetLabel: 'งบประมาณ 128.10 อบ.',
      impact: 'high',
      impactValue: '128.10 อบ.',
    },
    {
      icon: Wind,
      iconWrapperClass: 'bg-emerald-50 text-emerald-500',
      urgency: 'important',
      title: 'ขออนุมัติมาตรการลดฝุ่น PM2.5',
      department: 'สำนักงานสิ่งแวดล้อมและควบคุมมลพิษที่ 15',
      areas: 'ทั้งจังหวัด',
      budgetLabel: 'งบประมาณ 88.12 อบ.',
      impact: 'medium',
      impactValue: '88.12 อบ.',
    },
    {
      icon: Briefcase,
      iconWrapperClass: 'bg-orange-50 text-orange-500',
      urgency: 'important',
      title: 'ขออนุมัติโครงการพัฒนาทักษะอาชีพประชาชน',
      department: 'สำนักงานพัฒนาฝีมือแรงงานจังหวัด',
      areas: 'อ.ถลาง, อ.กะทู้',
      budgetLabel: 'งบประมาณ 63.20 อบ.',
      impact: 'medium',
      impactValue: '63.20 อบ.',
    },
    {
      icon: Construction,
      iconWrapperClass: 'bg-slate-100 text-slate-500',
      urgency: 'normal',
      title: 'ขออนุมัติซ่อมแซมถนนสายหลัก 5 สาย',
      department: 'แขวงทางหลวงภูเก็ต',
      areas: 'รวม 5 สายทาง',
      budgetLabel: 'งบประมาณ 45.30 อบ.',
      impact: 'low',
      impactValue: '25.60 อบ.',
    },
    {
      icon: Syringe,
      iconWrapperClass: 'bg-rose-50 text-rose-400',
      urgency: 'normal',
      title: 'ขออนุมัติจัดซื้อครุภัณฑ์โรงพยาบาล',
      department: 'สำนักงานสาธารณสุขจังหวัด',
      areas: 'รพ.วชิระภูเก็ต, รพ.ฉลอง',
      budgetLabel: 'งบประมาณ 18.75 อบ.',
      impact: 'low',
      impactValue: '20.65 อบ.',
    },
  ] satisfies DecisionItem[],
};
