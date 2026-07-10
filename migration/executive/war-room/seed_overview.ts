import { UsersRound, CheckCircle2, Building2, Clock, Truck } from 'lucide-react';
import type { CardMetricProps } from '@/components/dashboard/CardMetric';

export const warRoomOverviewStats: CardMetricProps[] = [
  {
    icon: UsersRound,
    value: 5,
    unit: 'เหตุการณ์',
    title: 'เหตุการณ์ที่กำลังติดตาม',
    subtitle: 'เพิ่มขึ้น 1 เหตุการณ์',
    className: '[&_div:first-child]:bg-blue-50 [&_div:first-child]:text-blue-500 border-slate-100',
  },
  {
    icon: CheckCircle2,
    value: 24,
    unit: 'การกิจ',
    title: 'ภารกิจที่กำลังดำเนินการ',
    subtitle: 'แล้วเสร็จ 12 การกิจ',
    className: '[&_div:first-child]:bg-emerald-50 [&_div:first-child]:text-emerald-500 border-slate-100',
  },
  {
    icon: Building2,
    value: 18,
    unit: 'หน่วยงาน',
    title: 'หน่วยงานที่ปฏิบัติการ',
    subtitle: 'พร้อมปฏิบัติการ',
    className: '[&_div:first-child]:bg-purple-50 [&_div:first-child]:text-purple-500 border-slate-100',
  },
  {
    icon: Clock,
    value: 856,
    unit: 'คน',
    title: 'เจ้าหน้าที่ปฏิบัติการ',
    subtitle: 'ปฏิบัติงานอยู่',
    className: '[&_div:first-child]:bg-violet-50 [&_div:first-child]:text-violet-500 border-slate-100',
  },
  {
    icon: Truck,
    value: 132,
    unit: 'คัน',
    title: 'ยานพาหนะเครื่องจักร',
    subtitle: 'พร้อมใช้งาน 88%',
    className: '[&_div:first-child]:bg-rose-50 [&_div:first-child]:text-rose-500 border-slate-100',
  },
];
