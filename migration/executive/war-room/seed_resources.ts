import { Users, Truck, Anchor, Zap, Building2, ShieldCheck } from 'lucide-react';
import type { CardDataHorizontalItemProps } from '@/components/dashboard/cardDataHorizontal';

export const warRoomResourceData = {
  heading: 'ทรัพยากรที่พร้อมใช้งาน',
  allDataHref: '#',
  items: [
    { title: 'เจ้าหน้าที่', subtitle: '856 คน', icon: Users, statusLabel: 'พร้อมใช้งาน 92%', isOnline: true },
    { title: 'รถบรรทุก', subtitle: '28 คัน', icon: Truck, statusLabel: 'พร้อมใช้งาน 80%', isOnline: true },
    { title: 'เรือกู้ภัย', subtitle: '12 ลำ', icon: Anchor, statusLabel: 'พร้อมใช้งาน 92%', isOnline: true },
    { title: 'เครื่องสูบน้ำ', subtitle: '36 เครื่อง', icon: Zap, statusLabel: 'พร้อมใช้งาน 87%', isOnline: true },
    { title: 'ศูนย์พักพิง', subtitle: '8 แห่ง', icon: Building2, statusLabel: 'พร้อมใช้งาน 75%', isOnline: true },
    { title: 'รถถังน้ำ', subtitle: '4 คัน', icon: ShieldCheck, statusLabel: 'พร้อมใช้งาน 100%', isOnline: true },
  ] as CardDataHorizontalItemProps[],
};
