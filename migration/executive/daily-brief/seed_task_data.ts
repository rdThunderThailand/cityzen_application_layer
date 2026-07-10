import type { CardDataItemProps } from "@/components/dashboard/CardData";

export const cardTaskData = {
  heading: 'ภารกิจที่ต้องติดตาม',
  items: [
    {
      title: 'ติดตามสถานการณ์น้ำป่าในพื้นที่กะทู้',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'urgent',
      time: '08:00 น.',
      tone: 'rose',
    },
    {
      title: 'อำนวยความสะดวกการจราจรชายหาด',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'urgent_soft',
      time: '09:00 น.',
      tone: 'amber',
    },
    {
      title: 'ประสานงานจัดตั้งจุดแจกจ่ายถุงยังชีพ',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'urgent',
      time: '11:15 น.',
      tone: 'emerald',
    },
    {
      title: 'ตรวจสอบความพร้อมเรือโดยสาร',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'normal',
      time: '10:00 น.',
      tone: 'blue',
    },
    {
      title: 'เฝ้าระวังคลื่นลมแรงบริเวณท่าเรืออ่าวฉลอง',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'urgent_soft',
      time: '13:30 น.',
      tone: 'blue',
    },
    {
      title: 'สรุปรายงานสถิตินักท่องเที่ยวรอบวัน',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'normal',
      time: '16:00 น.',
      tone: 'blue',
    },
    {
      title: 'ตรวจสอบระบบกล้อง CCTV รอบตัวเมืองเก่า',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'normal',
      time: '17:30 น.',
      tone: 'blue',
    }
  ] satisfies CardDataItemProps[],
};
