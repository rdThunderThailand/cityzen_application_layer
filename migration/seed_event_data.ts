import type { CardDataItemProps } from "@/components/dashboard/CardData";

export const cardEventData = {
  heading: 'เหตุการณ์สำคัญวันนี้',
  count: 2,
  items: [
    {
      title: 'ฝนตกหนักต่อเนื่องในพื้นที่กะทู้',
      subtitle: '07:45 น.',
      description: 'ปริมาณน้ำฝนสะสม 120 มม. ระดับน้ำคลองบางใหญ่เริ่มสูงขึ้น',
      locations: ['กะทู้', 'ป่าตอง', 'กมลา'],
      status: 'high_risk', // เสี่ยงสูง
      tone: 'rose',
    },
    {
      title: 'นักท่องเที่ยวเพิ่มขึ้นช่วงไฮซีซั่น',
      subtitle: 'คาดการณ์',
      description: 'สถิตินักท่องเที่ยวปีนี้เพิ่มขึ้น 18% จากสถิติทั้งจังหวัด',
      locations: ['ทั้งจังหวัด'],
      status: 'warning', // เฝ้าระวัง
      tone: 'amber',
    },
    {
      title: 'นักท่องเที่ยวเพิ่มขึ้นช่วงไฮซีซั่น',
      subtitle: 'คาดการณ์',
      description: 'สถิตินักท่องเที่ยวปีนี้เพิ่มขึ้น 18% จากสถิติทั้งจังหวัด',
      locations: ['ทั้งจังหวัด'],
      status: 'warning', // เฝ้าระวัง
      tone: 'blue',
    },
  ] satisfies CardDataItemProps[],
};
