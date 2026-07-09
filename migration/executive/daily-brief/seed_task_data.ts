import type { CardDataItemProps } from "@/components/dashboard/CardData";

export const cardTaskData = {
  heading: 'ภารกิจที่ต้องติดตาม',
  count: 11,
  items: [
    {
      title: 'ติดตามสถานการณ์น้ำป่าในพื้นที่กะทู้',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'urgent', // เร่งด่วน
      time: '08:00 น.',
      tone: 'emerald',
    },
    {
      title: 'อำนวยความสะดวกการจราจรชายหาด',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'urgent_soft', // เร่งด่วน (amber tone)
      time: '09:00 น.',
      tone: 'blue',
    },
    {
      title: 'ตรวจสอบความพร้อมเรือโดยสาร',
      subtitle: 'ศูนย์ป้องกันภัย อบจ.ภูเก็ต',
      status: 'normal', // ปกติ
      time: '10:00 น.',
      tone: 'blue',
    },
  ] satisfies CardDataItemProps[],
};
