export type ScheduleStatusKey = 'on_track' | 'in_progress' | 'pending';

export interface CommunicationScheduleItem {
  time: string;
  title: string;
  status: ScheduleStatusKey;
}

export const scheduleStatusConfig: Record<ScheduleStatusKey, { label: string; className: string }> = {
  on_track: { label: 'ตามกำหนด', className: 'bg-emerald-50 text-emerald-600' },
  in_progress: { label: 'รอดำเนินการ', className: 'bg-amber-50 text-amber-600' },
  pending: { label: 'รออนุมัติ', className: 'bg-slate-100 text-slate-500' },
};

export const communicationScheduleData = {
  heading: 'ปฏิทินการสื่อสาร',
  dateLabel: '18 กรกฎาคม 2567',
  items: [
    { time: '09:00', title: 'ประชาสัมพันธ์มาตรการช่วยเหลือผู้ประสบภัย', status: 'on_track' },
    { time: '12:00', title: 'เตือนคลื่นลมแรง บริเวณอ่าวไทยตอนบน', status: 'in_progress' },
    { time: '15:00', title: 'แจ้งความคืบหน้า สถานการณ์ฝนและน้ำท่วม', status: 'in_progress' },
    { time: '18:00', title: 'ประชาสัมพันธ์การเปิด-ปิดเส้นทางจราจร', status: 'pending' },
    { time: '20:00', title: 'สรุปสถานการณ์ประจำวัน', status: 'pending' },
  ] satisfies CommunicationScheduleItem[],
};
