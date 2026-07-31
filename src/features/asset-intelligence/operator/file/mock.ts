import { Folder, FileText, FileSpreadsheet, FileImage, FileVideo, FileArchive, Presentation } from "lucide-react";

export interface FileRow {
    id: string;
    name: string;
    meta?: string;
    kind: "folder" | "pdf" | "docx" | "xlsx" | "img" | "video" | "pptx" | "zip";
    owner: string;
    modified: string;
    size?: string;
    starred?: boolean;
}

export const fileIcon: Record<FileRow["kind"], { icon: typeof Folder; tone: string }> = {
    folder: { icon: Folder, tone: "text-amber-500" },
    pdf: { icon: FileText, tone: "text-rose-500" },
    docx: { icon: FileText, tone: "text-blue-500" },
    xlsx: { icon: FileSpreadsheet, tone: "text-emerald-500" },
    img: { icon: FileImage, tone: "text-violet-500" },
    video: { icon: FileVideo, tone: "text-pink-500" },
    pptx: { icon: Presentation, tone: "text-orange-500" },
    zip: { icon: FileArchive, tone: "text-slate-500" },
};

export const rows: FileRow[] = [
    { id: "1", name: "งานประจำวัน", meta: "5 ไฟล์", kind: "folder", owner: "ฉัน", modified: "20 พ.ค. 2567 09:15" },
    { id: "2", name: "รายงาน / สรุปผล", meta: "12 ไฟล์", kind: "folder", owner: "ฉัน", modified: "18 พ.ค. 2567 14:30" },
    { id: "3", name: "คู่มือ / ขั้นตอนการทำงาน", meta: "8 ไฟล์", kind: "folder", owner: "ฉัน", modified: "15 พ.ค. 2567 11:05" },
    { id: "4", name: "รูปภาพหน้างาน", meta: "25 ไฟล์", kind: "folder", owner: "ฉัน", modified: "วันนี้ 08:45" },
    { id: "5", name: "เอกสารอ้างอิง", meta: "7 ไฟล์", kind: "folder", owner: "ฉัน", modified: "10 พ.ค. 2567 16:20" },
    { id: "6", name: "รายงานการตรวจสอบระบบไฟฟ้า.pdf", kind: "pdf", owner: "ฉัน", modified: "วันนี้ 09:20", size: "2.4 MB", starred: true },
    { id: "7", name: "แบบฟอร์มแจ้งข้อมูลอุปกรณ์.docx", kind: "docx", owner: "ฉัน", modified: "วันนี้ 08:15", size: "156 KB", starred: true },
    { id: "8", name: "สรุปงานประจำสัปดาห์.xlsx", kind: "xlsx", owner: "ฉัน", modified: "เมื่อวาน 16:45", size: "320 KB", starred: true },
    { id: "9", name: "IMG_20240520_0915.jpg", kind: "img", owner: "ฉัน", modified: "20 พ.ค. 2567 09:15", size: "1.2 MB" },
    { id: "10", name: "วิดีโอแนะนำการใช้งานระบบ.mp4", kind: "video", owner: "ฉัน", modified: "19 พ.ค. 2567 13:20", size: "24.5 MB" },
    { id: "11", name: "แผนผังระบบประปาอากาศ.pdf", kind: "pdf", owner: "ฉัน", modified: "18 พ.ค. 2567 10:10", size: "1.8 MB" },
    { id: "12", name: "นำเสนอผลการดำเนินงาน.pptx", kind: "pptx", owner: "ฉัน", modified: "17 พ.ค. 2567 15:30", size: "5.6 MB" },
    { id: "13", name: "Backup_20240515.zip", kind: "zip", owner: "ฉัน", modified: "15 พ.ค. 2567 09:00", size: "128 MB" },
];

export const storageBreakdown = [
    { label: "เอกสาร", value: 18.7, tone: "bg-blue-500" },
    { label: "รูปภาพ", value: 9.8, tone: "bg-emerald-500" },
    { label: "วิดีโอ", value: 3.2, tone: "bg-violet-500" },
    { label: "อื่นๆ", value: 0.7, tone: "bg-slate-300" },
];

export const quickAccess = [
    { name: "งานประจำวัน", meta: "แก้ไขล่าสุด วันนี้ 09:15", kind: "folder" as const },
    { name: "แบบฟอร์มแจ้งข้อมูลอุปกรณ์.docx", meta: "วันนี้ 08:15", kind: "docx" as const },
    { name: "รายงานการตรวจสอบระบบไฟฟ้า.pdf", meta: "วันนี้ 09:20", kind: "pdf" as const },
    // { name: "รูปภาพหน้างาน", meta: "แก้ไขล่าสุด วันนี้ 08:45", kind: "folder" as const },
    { name: "สรุปงานประจำสัปดาห์.xlsx", meta: "เมื่อวาน 16:45", kind: "xlsx" as const },
];

export const recentActivity = [
    { text: "คุณอัปโหลดไฟล์", file: "รายงานการตรวจสอบระบบไฟฟ้า.pdf", time: "วันนี้ 09:20" },
    { text: "คุณแก้ไขไฟล์", file: "สรุปงานประจำสัปดาห์.xlsx", time: "เมื่อวาน 16:45" },
    { text: "คุณแชร์ไฟล์", file: "แบบฟอร์มแจ้งข้อมูลอุปกรณ์.docx", time: "เมื่อวาน 15:30" },
    // { text: "คุณสร้างโฟลเดอร์", file: "IMG_20240510_1422.jpg", time: "17 พ.ค. 2567" },
];
