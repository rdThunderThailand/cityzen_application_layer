import { Trophy } from 'lucide-react';
import type { ComponentType } from 'react';

export interface OutstandingResultItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
}

export const outstandingResultData = {
  heading: 'ผลลัพธ์ที่โดดเด่น',
  items: [
    {
      icon: Trophy,
      title: 'ลดน้ำท่วมขังในเขตเมือง',
      description: 'จุดเสี่ยง 12 จุด ลดลงเหลือ 3 จุด (ลดลง 75%)',
      badge: 'ดีที่สุด',
    },
    {
      icon: Trophy,
      title: 'คุณภาพน้ำแหล่งท่องเที่ยว',
      description: 'อยู่ในเกณฑ์ที่ดีขึ้น 85% (จากพอใช้ เป็น ดี)',
      badge: 'ดีที่สุด',
    },
    {
      icon: Trophy,
      title: 'ความพึงพอใจการบริการ',
      description: 'ด้านสาธารณสุข เพิ่มขึ้น 0.8 คะแนน (จาก 4.2 เป็น 5.0)',
      badge: 'ดีที่สุด',
    },
  ] satisfies OutstandingResultItem[],
};
