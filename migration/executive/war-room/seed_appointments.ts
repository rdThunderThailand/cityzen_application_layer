import type { CardDataProps } from '@/components/dashboard/CardData';

export const warRoomAppointmentData: CardDataProps = {
  heading: 'นัดหมายสำคัญวันนี้',
  allDataHref: '#',
  variant: 'time',
  items: [
    {
      time: '08:25',
      title: 'ศูนย์ป้องกันภัย ระดับน้ำคลองบางใหญ่เพิ่มสูงขึ้น',
      subtitle: 'พื้นที่: กะทู้, ป่าตอง, กมลา',
    },
    {
      time: '08:15',
      title: 'ฝ่ายปกครอง อพยพประชาชน 120 คน เข้าศูนย์พักพิง',
      subtitle: 'พื้นที่: ต.กะทู้',
    },
    {
      time: '08:05',
      title: 'แขวงทางหลวงภูเก็ต เปิดการจราจรบางส่วนแล้ว',
      subtitle: 'เส้นทาง: ถ.เทพกระษัตรี (ขาออกเมือง)',
    },
  ],
};
