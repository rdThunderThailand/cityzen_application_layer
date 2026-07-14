import { Clock } from 'lucide-react';
import type { CardDataProps } from '@/components/dashboard/CardData';

export const warRoomUrgentOrderData: CardDataProps = {
  heading: 'คำสั่งการเร่งด่วน',
  allDataHref: '#',
  variant: 'icon',
  items: [
    {
      title: 'อนุมัติจัดซื้อเครื่องสูบน้ำเพิ่ม 20 เครื่อง',
      icon: Clock,
      status: 'urgent_soft',
    },
    {
      title: 'ระดมกำลังอาสาสมัครเพิ่มเติม',
      icon: Clock,
      status: 'urgent_soft',
    },
    {
      title: 'เปิดศูนย์พักพิงชั่วคราวเพิ่มเติม 2 แห่ง',
      icon: Clock,
      status: 'urgent_soft',
    },
  ],
};
