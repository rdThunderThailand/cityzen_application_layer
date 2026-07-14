import type { CardDataItemProps } from "@/components/dashboard/CardData";

export const cardTaskData = {
  heading: 'สิ่งที่ควรให้ความสำคัญ',
  items: [
    { title: 'Breakfast Buffet', subtitle: 'ปริมาณเพิ่มขึ้น 31% จากค่าเฉลี่ย', tone: 'blue' },
    { title: 'Kitchen B (Main Kitchen)', subtitle: 'ความจุถังเก็บใกล้เต็ม 85%', tone: 'blue' },
    { title: 'Pickup Delay', subtitle: 'รถเก็บขยะล่าช้า 18 นาที', tone: 'blue' },
  ] satisfies CardDataItemProps[],
};
