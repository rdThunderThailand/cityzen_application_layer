import type { ComponentType } from 'react';
import { Users, Plane, Briefcase, Baby, UserRoundCog } from 'lucide-react';

export interface TargetGroupItem {
  icon: ComponentType<{ className?: string }>;
  iconWrapperClass: string;
  title: string;
  reach: string;
  percentage: number;
  barColorClass: string;
}

export const targetGroupData = {
  heading: 'กลุ่มเป้าหมายหลัก',
  allDataHref: '#',
  items: [
    { icon: Users, iconWrapperClass: 'bg-blue-50 text-blue-500', title: 'ประชาชนทั่วไป', reach: 'เข้าถึง 512,680 คน', percentage: 78, barColorClass: 'bg-blue-500' },
    { icon: Plane, iconWrapperClass: 'bg-purple-50 text-purple-500', title: 'นักท่องเที่ยว', reach: 'เข้าถึง 186,450 คน', percentage: 62, barColorClass: 'bg-purple-500' },
    { icon: Briefcase, iconWrapperClass: 'bg-orange-50 text-orange-500', title: 'ผู้ประกอบการ', reach: 'เข้าถึง 98,320 คน', percentage: 71, barColorClass: 'bg-orange-500' },
    { icon: Baby, iconWrapperClass: 'bg-teal-50 text-teal-500', title: 'เด็กและเยาวชน', reach: 'เข้าถึง 45,680 คน', percentage: 55, barColorClass: 'bg-teal-500' },
    { icon: UserRoundCog, iconWrapperClass: 'bg-emerald-50 text-emerald-500', title: 'ผู้สูงอายุ', reach: 'เข้าถึง 32,120 คน', percentage: 61, barColorClass: 'bg-emerald-500' },
  ] satisfies TargetGroupItem[],
};
