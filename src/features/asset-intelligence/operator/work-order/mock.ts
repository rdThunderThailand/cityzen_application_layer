import { Wrench, Droplets, ClipboardCheck, CheckCircle2, Zap, Video, Trash2 } from "lucide-react";

export interface WorkOrder {
    id: string;
    code: string;
    title: string;
    type: string;
    address: string;
    date: string;
    priority: "ด่วน" | "สำคัญ" | "ปกติ";
    status: "งานใหม่" | "ระหว่างดำเนินการ" | "รอตรวจสอบ" | "เสร็จสิ้น";
    icon: typeof Wrench;
    iconTone: string;
}

export const priorityBadge: Record<WorkOrder["priority"], string> = {
    ด่วน: "bg-rose-50 text-rose-600",
    สำคัญ: "bg-amber-50 text-amber-600",
    ปกติ: "bg-slate-100 text-slate-600",
};

export const statusBadge: Record<WorkOrder["status"], string> = {
    งานใหม่: "bg-blue-50 text-blue-600",
    ระหว่างดำเนินการ: "bg-amber-50 text-amber-600",
    รอตรวจสอบ: "bg-violet-50 text-violet-600",
    เสร็จสิ้น: "bg-emerald-50 text-emerald-600",
};

export const workOrders: WorkOrder[] = [
    { id: "1", code: "WO-2567-0521", title: "ตรวจสอบไฟฟ้าส่องสว่าง ถนนบ้านเหมันตร์ ซ.5", type: "ระบบไฟฟ้า", address: "ถนนบ้านเหมันตร์ ซอย 5 ต.บางรักน้อย อ.บางบัวทอง จ.นนทบุรี", date: "วันนี้ 09:00", priority: "ด่วน", status: "งานใหม่", icon: Zap, iconTone: "bg-amber-50 text-amber-500" },
    { id: "2", code: "WO-2567-0522", title: "เปลี่ยนหลอดไฟ LED สวนสาธารณะหนองหาด", type: "ระบบไฟฟ้า", address: "สวนสาธารณะหนองหาด เขตหนองจอก กรุงเทพฯ", date: "วันนี้ 11:00", priority: "สำคัญ", status: "ระหว่างดำเนินการ", icon: Wrench, iconTone: "bg-blue-50 text-blue-500" },
    { id: "3", code: "WO-2567-0523", title: "ตรวจเช็คเครื่องสูบน้ำ สถานีสูบน้ำวังตาล", type: "ระบบน้ำ", address: "สถานีสูบน้ำวังตาล ต.บ้านสวน อ.เมือง จ.สมุทรสาคร", date: "วันนี้ 13:00", priority: "ปกติ", status: "ระหว่างดำเนินการ", icon: Droplets, iconTone: "bg-sky-50 text-sky-500" },
    { id: "4", code: "INSP-2567-0345", title: "สำรวจป้ายจราจรชำรุด บริเวณถนนสุขาภิบาล 4", type: "งานตรวจสอบ", address: "ถนนสุขาภิบาล 4 เขตสายไหม กรุงเทพฯ", date: "พรุ่งนี้ 10:00", priority: "ปกติ", status: "งานใหม่", icon: ClipboardCheck, iconTone: "bg-violet-50 text-violet-500" },
    { id: "5", code: "TASK-2567-0156", title: "เก็บข้อมูลเครื่องชั่งน้ำหนักตลาดเทศบาล", type: "งานเอกสาร", address: "ตลาดเทศบาลเมืองบางพลี จ.สมุทรปราการ", date: "24 พ.ค. 67", priority: "ปกติ", status: "รอตรวจสอบ", icon: CheckCircle2, iconTone: "bg-emerald-50 text-emerald-500" },
    { id: "6", code: "WO-2567-0524", title: "ล้างทำความสะอาดตะแกรงระบายน้ำ", type: "ระบบน้ำ", address: "ถนนประชาร่วมใจ เขตห้วยขวาง กรุงเทพฯ", date: "25 พ.ค. 67", priority: "ปกติ", status: "รอตรวจสอบ", icon: Wrench, iconTone: "bg-blue-50 text-blue-500" },
    { id: "7", code: "WO-2567-0525", title: "ซ่อมแซมสัญญาณไฟจราจร ถนนพระราม 2", type: "ระบบไฟฟ้า", address: "ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ", date: "วันนี้ 14:30", priority: "ด่วน", status: "งานใหม่", icon: Zap, iconTone: "bg-amber-50 text-amber-500" },
    { id: "8", code: "WO-2567-0526", title: "ตรวจสอบกล้องวงจรปิด บริเวณสวนสาธารณะ", type: "งานตรวจสอบ", address: "สวนสาธารณะเบญจกิติ เขตคลองเตย กรุงเทพฯ", date: "วันนี้ 15:00", priority: "สำคัญ", status: "ระหว่างดำเนินการ", icon: Video, iconTone: "bg-violet-50 text-violet-500" },
    { id: "9", code: "TASK-2567-0157", title: "เก็บขยะตกค้าง ถนนเจริญนคร", type: "งานสิ่งแวดล้อม", address: "ถนนเจริญนคร เขตคลองสาน กรุงเทพฯ", date: "พรุ่งนี้ 09:00", priority: "ปกติ", status: "งานใหม่", icon: Trash2, iconTone: "bg-emerald-50 text-emerald-500" },
    { id: "10", code: "WO-2567-0527", title: "ซ่อมท่อประปาแตก ซอยลาดพร้าว 80", type: "ระบบน้ำ", address: "ซอยลาดพร้าว 80 เขตวังทองหลาง กรุงเทพฯ", date: "26 พ.ค. 67", priority: "ด่วน", status: "ระหว่างดำเนินการ", icon: Droplets, iconTone: "bg-sky-50 text-sky-500" },
    { id: "11", code: "INSP-2567-0346", title: "ตรวจสอบโครงสร้างสะพานลอย ถนนรัชดาภิเษก", type: "งานตรวจสอบ", address: "ถนนรัชดาภิเษก เขตดินแดง กรุงเทพฯ", date: "27 พ.ค. 67", priority: "สำคัญ", status: "รอตรวจสอบ", icon: ClipboardCheck, iconTone: "bg-violet-50 text-violet-500" },
    { id: "12", code: "WO-2567-0528", title: "เปลี่ยนหลอดไฟถนนสายบางนา-ตราด", type: "ระบบไฟฟ้า", address: "ถนนบางนา-ตราด กม.12 จ.สมุทรปราการ", date: "20 พ.ค. 67", priority: "ปกติ", status: "เสร็จสิ้น", icon: Wrench, iconTone: "bg-blue-50 text-blue-500" },
];

export const relatedDocs = [
    { title: "คู่มือการปฏิบัติงานภาคสนาม", size: "2.3 MB" },
    { title: "ขั้นตอนการตรวจสอบระบบไฟฟ้า", size: "1.8 MB" },
    { title: "แบบฟอร์มรายงานผลการซ่อมบำรุง", size: "1.2 MB" },
];

export const summaryStats = [
    { label: "งานที่ได้รับมอบหมาย", value: "18 รายการ" },
    { label: "งานเสร็จเดือนนี้", value: "12 รายการ" },
    { label: "งานค้างดำเนินการ", value: "6 รายการ" },
    { label: "SLA สำเร็จ", value: "92%" },
];
