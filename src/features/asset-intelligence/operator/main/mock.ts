import {
    CalendarCheck,
    BellRing,
    Clock,
    CheckCircle2,
    FolderOpen,
    ClipboardPlus,
    ScanLine,
    Wrench,
    Camera,
    MapPinned,
    LogIn,
    LogOut,
    FileUp,
    FolderPlus,
    Plus,
    Lightbulb,
    Droplets,
    Trash2,
    Video,
    Megaphone,
} from "lucide-react";

export const overviewStats = [
    { title: "งานของวันนี้", value: 8, unit: "รายการ", icon: CalendarCheck, tone: "bg-blue-50 text-blue-600" },
    { title: "งานด่วน", value: 2, unit: "รายการ", icon: BellRing, tone: "bg-rose-50 text-rose-600" },
    { title: "ใกล้ครบกำหนด SLA", value: 3, unit: "รายการ", icon: Clock, tone: "bg-amber-50 text-amber-600" },
    { title: "รอการตรวจสอบ", value: 1, unit: "รายการ", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
    { title: "แจ้งเหตุผล", value: 4, unit: "รายการ", icon: FolderOpen, tone: "bg-violet-50 text-violet-600" },
];

export const quickActions = [
    { label: "แจ้งเหตุ / คำขอ", icon: ClipboardPlus, tone: "text-blue-600" },
    { label: "สแกน QR", icon: ScanLine, tone: "text-slate-700" },
    { label: "รับงาน", icon: Wrench, tone: "text-amber-600" },
    { label: "ถ่ายรูปหน้างาน", icon: Camera, tone: "text-violet-600" },
    { label: "เปิดแผนที่", icon: MapPinned, tone: "text-blue-600" },
    { label: "ลงเวลาเข้างาน", icon: LogIn, tone: "text-emerald-600" },
    { label: "ลงเวลาออกงาน", icon: LogOut, tone: "text-rose-600" },
    { label: "ส่งรายงาน", icon: FileUp, tone: "text-slate-700" },
    { label: "สร้างเอกสาร", icon: FolderPlus, tone: "text-amber-600" },
    { label: "เพิ่มเติม", icon: Plus, tone: "text-slate-400" },
];

export interface TodayTask {
    id: string;
    title: string;
    code: string;
    location: string;
    status: "งานใหม่" | "กำลังดำเนินการ" | "รอดำเนินการ" | "เสร็จสิ้น";
    priority?: "ด่วน";
    date: string;
    icon: typeof Lightbulb;
    iconTone: string;
}

export const todayTasks: TodayTask[] = [
    { id: "WO-2567-0521", code: "WO-2567-0521", title: "ตรวจสอบไฟฟ้าส่องสว่าง ถนนบ้านเหมันตร์ ซ.5", location: "พื้นที่ซ้ำเดิม", status: "งานใหม่", priority: "ด่วน", date: "วันนี้ 09:00", icon: Lightbulb, iconTone: "bg-amber-50 text-amber-500" },
    { id: "WO-2567-0522", code: "WO-2567-0522", title: "เปลี่ยนหลอดไฟ LED สวนสาธารณะหนองหาด", location: "พื้นที่ครบรุ่", status: "กำลังดำเนินการ", date: "วันนี้ 11:00", icon: Wrench, iconTone: "bg-blue-50 text-blue-500" },
    { id: "WO-2567-0523", code: "WO-2567-0523", title: "ตรวจเช็คเครื่องสูบน้ำ สถานีสูบน้ำวังตาล", location: "พื้นที่ซ้ำเดิม", status: "งานใหม่", date: "วันนี้ 13:00", icon: Droplets, iconTone: "bg-sky-50 text-sky-500" },
    { id: "TASK-2567-0156", code: "TASK-2567-0156", title: "เก็บข้อมูลถังขยะสาธารณะ ประจำเดือน พ.ค. 2567", location: "พื้นที่ในกรุงเทพ", status: "รอดำเนินการ", date: "พรุ่งนี้ 08:00", icon: Trash2, iconTone: "bg-emerald-50 text-emerald-500" },
    { id: "WO-2567-0524", code: "WO-2567-0524", title: "ตรวจสอบการทำงานระบบ CCTV บริเวณตลาดต้นพยอม", location: "พื้นที่ริมเมือง", status: "รอดำเนินการ", date: "23 พ.ค. 67", icon: Video, iconTone: "bg-violet-50 text-violet-500" },
];

export const alerts = [
    { title: "มีงานด่วนที่ต้องดำเนินการ", subtitle: "ตรวจสอบไฟฟ้าส่องสว่าง ถนนบ้านเหมันตร์ ซ.5", time: "15 นาทีที่แล้ว", icon: CalendarCheck, tone: "bg-rose-50 text-rose-500" },
    { title: "ใกล้ครบกำหนด SLA", subtitle: "งานเปลี่ยนหลอดไฟ LED สวนสาธารณะหนองหาด", time: "35 นาทีที่แล้ว", icon: Clock, tone: "bg-amber-50 text-amber-500" },
    { title: "หัวหน้างานมอบหมายงานให้คุณ", subtitle: "ตรวจเช็คเครื่องสูบน้ำ สถานีสูบน้ำวังตาล", time: "1 ชั่วโมงที่แล้ว", icon: BellRing, tone: "bg-blue-50 text-blue-500" },
    { title: "งานของคุณได้รับการอนุมัติ", subtitle: "รายงานผลการตรวจสอบระบบ CCTV", time: "2 ชั่วโมงที่แล้ว", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-500" },
    { title: "ประกาศจากองค์กร", subtitle: "ประชุมเเจ้งแนวทางการทำงานใหม่ วันที่ 24 พ.ค. 67", time: "3 ชั่วโมงที่แล้ว", icon: Megaphone, tone: "bg-violet-50 text-violet-500" },
];

export const agendaToday = [
    { time: "08:00", title: "เริ่มปฏิบัติงาน", subtitle: "ลงเวลาแล้ว 07:58", done: true },
    { time: "09:00", title: "ตรวจสอบไฟฟ้าส่องสว่าง ถนนบ้านเหมันตร์ ซ.5", subtitle: "", done: false },
    { time: "13:00", title: "ตรวจเช็คเครื่องสูบน้ำ สถานีสูบน้ำวังตาล", subtitle: "", done: false },
    { time: "16:30", title: "สรุปรายงานประจำวัน", subtitle: "", done: false },
    { time: "17:00", title: "สิ้นสุดเวร", subtitle: "", done: false },
];

export const announcements = [
    {
        title: "โครงการปรับปรุงระบบไฟฟ้าแสงสว่าง",
        subtitle: "ตั้งแต่วันที่ 20 - 31 พฤษภาคม 2567 โปรดวางแผนการปฏิบัติงานล่วงหน้า",
        date: "20 พ.ค. 67",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=60",
    },
    {
        title: "โครงการปรับปรุงระบบไฟฟ้าแสงสว่าง",
        subtitle: "ตั้งแต่วันที่ 20 - 31 พฤษภาคม 2567 โปรดวางแผนการปฏิบัติงานล่วงหน้า",
        date: "20 พ.ค. 67",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=60",
    },
];
