import type { CardDataProps } from '@/components/dashboard/CardData';

export const warRoomIncidentData: CardDataProps = {
  heading: 'เหตุการณ์สำคัญวันนี้',
  allDataHref: '#',
  variant: 'accent',
  maxItems: 5,
  items: [
    {
      title: 'น้ำท่วมขังในพื้นที่เศรษฐกิจ (กะทู้)',
      subtitle: '07:45 น.',
      description: 'ปริมาณฝนสะสม 120 มม.',
      effectedPeople: 'ผลกระทบ: 2,100 คน',
      status: 'critical',
      tone: 'rose',
    },
    {
      title: 'ดินสไลด์ ถนนกะทู้-ป่าตอง',
      subtitle: '08:10 น.',
      description: 'ปิดเส้นทางบางส่วน',
      effectedPeople: 'ผลกระทบ: 2,100 คน',
      status: 'high_warning',
      tone: 'amber',
    },
    {
      title: 'ไฟไหม้ป่าเนินบริเวณตลาดเก่า',
      subtitle: '06:30 น.',
      description: 'ควบคุมได้ 60%',
      effectedPeople: 'ผลกระทบ: 2,100 คน',
      status: 'warning',
      tone: 'amber',
    },
    {
      title: 'PM2.5 เกินมาตรฐาน',
      subtitle: '08:00 น.',
      description: 'ค่าเฉลี่ย 85 µg/m³',
      effectedPeople: 'ผลกระทบ: 2,100 คน',
      status: 'warning',
      tone: 'amber',
    },
    {
      title: 'จุดเสี่ยงน้ำท่วมยังซ้ำซาก',
      subtitle: '07:30 น.',
      description: 'คาดการณ์ 12:00 น.',
      effectedPeople: 'ผลกระทบ: 2,100 คน',
      status: 'normal',
      tone: 'emerald',
    },
  ],
};
