import type { ComponentType } from 'react';
import { LifeBuoy, Ban, UsersRound, Package, Search, Home } from 'lucide-react';

export interface WarRoomMissionItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  progress: number;
  completed: number;
  total: number;
  barColorClass: string;
}

export const warRoomMissionData = {
  heading: 'ภารกิจปฏิบัติการที่กำลังดำเนินการ',
  allDataHref: '#',
  items: [
    {
      icon: LifeBuoy,
      title: 'ช่วยเหลือผู้ประสบภัยน้ำท่วม',
      progress: 75,
      completed: 6,
      total: 8,
      barColorClass: 'bg-blue-500',
    },
    {
      icon: Ban,
      title: 'เปิดเส้นทางคมนาคม',
      progress: 60,
      completed: 3,
      total: 5,
      barColorClass: 'bg-amber-500',
    },
    {
      icon: UsersRound,
      title: 'อพยพประชาชน',
      progress: 80,
      completed: 4,
      total: 5,
      barColorClass: 'bg-emerald-500',
    },
    {
      icon: Package,
      title: 'แจกจ่ายสิ่งของจำเป็น',
      progress: 90,
      completed: 5,
      total: 5,
      barColorClass: 'bg-blue-500',
    },
    {
      icon: Search,
      title: 'ตรวจสอบโครงสร้างพื้นฐาน',
      progress: 40,
      completed: 2,
      total: 5,
      barColorClass: 'bg-slate-400',
    },
    {
      icon: Home,
      title: 'จัดเตรียมศูนย์พักพิง',
      progress: 70,
      completed: 4,
      total: 6,
      barColorClass: 'bg-blue-500',
    },
  ] satisfies WarRoomMissionItem[],
};
