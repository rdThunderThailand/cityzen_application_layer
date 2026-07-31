import { TechnicianInspectionDetail } from '../../types';

export const getTechnicianInspectionDetail = async (id?: string): Promise<TechnicianInspectionDetail | null> => {
  return {
    id: id || 'WO-6705-00123',
    woNumber: id || 'WO-6705-00123',
    status: 'รอดำเนินการตรวจสอบ',
    statusBg: 'bg-orange-50',
    statusColor: 'text-orange-600',
    assetName: 'เครื่องปรับอากาศ แบบแขวน',
    assetLocation: 'อาคารสำนักงาน ชั้น 2',
    location: 'อาคารสำนักงาน ชั้น 2 ห้อง 201',
    reporterName: 'น.ส. กานต์พิชชา',
    reporterDept: 'กองคลัง',
    reporterPhone: '081-234-5678',
    woDate: '20 พ.ค. 2567 09:15 น.',
    dueDate: '20 พ.ค. 2567 17:00 น.',
    priority: 'สูง',
    priorityColor: 'text-rose-600',
    assignerName: 'น.ส. วราภรณ์ จันทร์ศรี (หัวหน้างาน)',
    assignerDept: 'กองช่าง เทศบาลเมืองแสนสุข',
    taskType: 'ซ่อมบำรุง',
    notes: 'ลูกค้าแจ้งว่าแอร์ไม่เย็น มีเสียงดัง และน้ำหยดจากตัวเครื่อง กรุณาตรวจเช็คระบบการทำงานและแก้ไขให้แล้วเสร็จตามกำหนด ขอบคุณค่ะ',
    notesDate: '20 พ.ค. 2567 09:15 น.',
    progressPercent: 0,
  };
};
