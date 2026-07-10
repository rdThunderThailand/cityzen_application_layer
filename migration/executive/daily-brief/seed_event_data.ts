import type { CardDataItemProps } from "@/components/dashboard/CardData";

export const cardEventData = {
  heading: 'เหตุการณ์สำคัญวันนี้',
  items: [
    {
      title: 'ฝนตกหนักต่อเนื่องในพื้นที่กะทู้',
      subtitle: '07:45 น.',
      description: 'ปริมาณน้ำฝนสะสม 120 มม. ระดับน้ำคลองบางใหญ่เริ่มสูงขึ้น',
      locations: ['กะทู้', 'ป่าตอง', 'กมลา'],
      effectedPeople: "ผลกระทบ: 8,560 คน",
      status: 'high_risk', // เสี่ยงสูง
      tone: 'rose',
    },
    {
      title: 'นักท่องเที่ยวเพิ่มขึ้นช่วงไฮซีซั่น',
      subtitle: 'คาดการณ์',
      description: 'สถิตินักท่องเที่ยวปีนี้เพิ่มขึ้น 18% จากสถิติทั้งจังหวัด',
      locations: ['ทั้งจังหวัด'],
      effectedPeople: "ผลกระทบ: 3,890 คน",
      status: 'warning', // เฝ้าระวัง
      tone: 'amber',
    },
    {
      title: 'ระบบท่อส่งน้ำประปาแตกชำรุดชั่วคราว',
      subtitle: '13:00 น.',
      description: 'แรงดันน้ำลดลงและน้ำไม่ไหลในบางพื้นที่ ทีมช่างการประปาเข้าดำเนินการซ่อมแซมเร่งด่วน',
      locations: ['ฉลอง', 'ราไวย์'],
      effectedPeople: "ผลกระทบ: 6,120 คน",
      status: 'warning', // เฝ้าระวัง
      tone: 'amber',
    },
    {
      title: 'รายงานพบผู้ป่วยไข้เลือดออกสะสมสูงกว่าค่าเฉลี่ย',
      subtitle: '09:15 น.',
      description: 'พบคลัสเตอร์ใหม่ในเขตชุมชนเมือง ทีมควบคุมโรคลงพื้นที่พ่นสารเคมีกำจัดยุงลาย',
      locations: ['เมืองภูเก็ต', 'ตลาดใหญ่'],
      effectedPeople: "ผลกระทบ: 1,200 คน",
      status: 'warning', // เฝ้าระวัง
      tone: 'amber',
    },
    {
      title: 'อุบัติเหตุรถบรรทุกชนเสาไฟฟ้า กีดขวางการจราจร',
      subtitle: '11:30 น.',
      description: 'เสาไฟฟ้าล้ม 3 ต้น เจ้าหน้าที่กำลังเร่งย้ายสิ่งกีดขวางและกู้ระบบไฟฟ้า คาดใช้เวลา 2 ชั่วโมง',
      locations: ['ถ.เทพกระษัตรี', 'ถลาง'],
      effectedPeople: "ผลกระทบ: 4,500 คน",
      status: 'high_risk', // เสี่ยงสูง
      tone: 'rose',
    },
    {
      title: 'ตรวจพบดัชนีคุณภาพอากาศ (PM2.5) เริ่มเกินมาตรฐาน',
      subtitle: '15:45 น.',
      description: 'หมอกควันข้ามพรมแดนส่งผลกระทบต่อทัศนวิสัย แจ้งเตือนประชาชนกลุ่มเสี่ยงงดกิจกรรมกลางแจ้ง',
      locations: ['ทั้งจังหวัด'],
      effectedPeople: "ผลกระทบ: 12,400 คน",
      status: 'warning', // เฝ้าระวัง
      tone: 'amber',
    }
  ] satisfies CardDataItemProps[],
};
