import type { ComponentType } from 'react';
import { TrendingUp, Users, Leaf, ShieldAlert } from 'lucide-react';

export interface ImpactForecastTile {
  icon: ComponentType<{ className?: string }>;
  iconWrapperClass: string;
  label: string;
  value: string;
  unit: string;
}

export const impactForecastTiles: ImpactForecastTile[] = [
  { icon: TrendingUp, iconWrapperClass: 'bg-emerald-50 text-emerald-500', label: 'เศรษฐกิจ', value: '+512.42', unit: 'ล้านบาท' },
  { icon: Users, iconWrapperClass: 'bg-blue-50 text-blue-500', label: 'สังคม', value: '+856K', unit: 'คน' },
  { icon: Leaf, iconWrapperClass: 'bg-teal-50 text-teal-500', label: 'สิ่งแวดล้อม', value: '+18%', unit: 'คุณภาพดีขึ้น' },
  { icon: ShieldAlert, iconWrapperClass: 'bg-rose-50 text-rose-500', label: 'ความเสี่ยง', value: '-32%', unit: 'ความเสียหายลดลง' },
];

export interface ImpactChartSeries {
  key: string;
  label: string;
  colorClass: string;
  strokeHex: string;
  data: number[];
  endLabel: string;
}

export const impactChartXLabels = ['วันนี้', '1 วัน', '3 วัน', '7 วัน', '30 วัน'];

export const impactChartSeries: ImpactChartSeries[] = [
  {
    key: 'approve',
    label: 'กรณีอนุมัติ',
    colorClass: 'text-emerald-500',
    strokeHex: '#10b981',
    data: [380, 420, 430, 470, 512],
    endLabel: '512.42 อบ.',
  },
  {
    key: 'current',
    label: 'กรณีปัจจุบัน',
    colorClass: 'text-slate-400',
    strokeHex: '#94a3b8',
    data: [300, 340, 320, 350, 312],
    endLabel: '312.12 อบ.',
  },
  {
    key: 'reject',
    label: 'กรณีไม่อนุมัติ',
    colorClass: 'text-rose-500',
    strokeHex: '#f43f5e',
    data: [150, 180, 140, 170, 120],
    endLabel: '-312.18 อบ.',
  },
];

export const impactChartYMax = 1000;
