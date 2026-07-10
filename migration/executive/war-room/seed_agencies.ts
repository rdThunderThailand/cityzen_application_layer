import { ShieldAlert, Landmark, HeartPulse, Shield, Route } from 'lucide-react';
import type { CardDataHorizontalItemProps } from '@/components/dashboard/cardDataHorizontal';

export const warRoomAgencyData = {
  heading: 'หน่วยงานหลักที่ปฏิบัติการ',
  allDataHref: '#',
  items: [
    { title: 'ปภ.ภูเก็ต', icon: ShieldAlert },
    { title: 'ทต.กะทู้', icon: Landmark },
    { title: 'ทต.ป่าตอง', icon: Landmark },
    { title: 'ทต.ฉลอง', icon: Landmark },
    { title: 'สาธารณสุข', icon: HeartPulse },
    { title: 'ตำรวจภูธร', icon: Shield },
    { title: 'แขวงทางหลวง', icon: Route },
  ] as CardDataHorizontalItemProps[],
};
