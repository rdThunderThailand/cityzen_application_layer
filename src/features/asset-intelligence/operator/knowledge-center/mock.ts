import { BookOpen, ListChecks, Scale, FileStack, Megaphone, PlayCircle, Wrench, GraduationCap, ShieldAlert } from "lucide-react";

export const categories = [
    { title: "คู่มือการปฏิบัติงาน", count: 32, icon: BookOpen, tone: "bg-blue-50 text-blue-600" },
    { title: "ขั้นตอนการทำงาน", count: 28, icon: ListChecks, tone: "bg-emerald-50 text-emerald-600" },
    { title: "กฎหมาย / ระเบียบ", count: 18, icon: Scale, tone: "bg-violet-50 text-violet-600" },
    { title: "แบบฟอร์ม / เอกสาร", count: 26, icon: FileStack, tone: "bg-amber-50 text-amber-600" },
    { title: "ข่าวสาร / ประกาศ", count: 15, icon: Megaphone, tone: "bg-rose-50 text-rose-600" },
    { title: "วิดีโอสอนการทำงาน", count: 12, icon: PlayCircle, tone: "bg-sky-50 text-sky-600" },
];

export interface Article {
    title: string;
    tag: string;
    tagTone: string;
    description: string;
    date: string;
    views: string;
    image: string;
}

export const articles: Article[] = [
    { title: "คู่มือการใช้งานระบบ Work Orders", tag: "คู่มือ", tagTone: "bg-blue-50 text-blue-600", description: "คู่มือสำหรับการสร้างงาน มอบหมายงาน และติดตามสถานะ", date: "อัปเดตล่าสุด 15 พ.ค. 2567", views: "1.2K", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=60" },
    { title: "ขั้นตอนการขอเบิกวัสดุ - ครุภัณฑ์", tag: "ขั้นตอน", tagTone: "bg-emerald-50 text-emerald-600", description: "แนวปฏิบัติในการขอเบิกวัสดุครุภัณฑ์ของหน่วยงาน", date: "อัปเดตล่าสุด 10 พ.ค. 2567", views: "856", image: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=400&q=60" },
    { title: "ระเบียบการใช้รถราชการ พ.ศ. 2566", tag: "ระเบียบ", tagTone: "bg-violet-50 text-violet-600", description: "ระเบียบและแนวปฏิบัติในการใช้รถราชการอย่างถูกต้อง", date: "อัปเดตล่าสุด 2 พ.ค. 2567", views: "692", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=60" },
    { title: "แบบฟอร์มรายงานการตรวจสอบงาน", tag: "เอกสาร", tagTone: "bg-amber-50 text-amber-600", description: "ดาวน์โหลดแบบฟอร์มรายงานการตรวจสอบงานประจำวัน", date: "อัปเดตล่าสุด 1 พ.ค. 2567", views: "543", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=60" },
    { title: "ประกาศวันหยุดราชการ ประจำปี 2567", tag: "ประกาศ", tagTone: "bg-rose-50 text-rose-600", description: "ประกาศวันหยุดราชการและวันหยุดนักขัตฤกษ์ ประจำปี", date: "อัปเดตล่าสุด 30 เม.ย. 2567", views: "1.1K", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=60" },
    { title: "วิธีใช้งานแอปพลิเคชัน Inspection", tag: "วิดีโอ", tagTone: "bg-sky-50 text-sky-600", description: "สอนวิธีใช้งานแอป Inspection สำหรับเจ้าหน้าที่ภาคสนาม", date: "อัปเดตล่าสุด 28 เม.ย. 2567", views: "732", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=60" },
];

export const faqs = [
    "ลืมรหัสผ่าน ต้องทำอย่างไร?",
    "จะดาวน์โหลดแอปได้จากที่ไหน?",
    "สามารถเพิ่มผู้ใช้งานหน่วยงานได้หรือไม่?",
    "ต้องการเปลี่ยนข้อมูลส่วนตัวทำอย่างไร?",
];

export const popularArticles = [
    "ขั้นตอนการแจ้งซ่อมและตำแหน่งงาน",
    "วิธีการสแกน QR Code ครุภัณฑ์",
    "การบันทึกเวลาปฏิบัติงาน (Check-in)",
    "แนวทางการปฏิบัติงานนอกสถานที่",
    "วิธีการรายงานอุบัติเหตุ",
];

export const announcementsFeed = [
    { title: "แจ้งปิดปรับปรุงระบบสำรอง", time: "วันจันทร์ที่ 25 พ.ค. 2567 เวลา 22:00 - 02:00 น.", icon: Wrench, tone: "bg-amber-50 text-amber-500" },
    { title: "อบรมการใช้งานระบบ Work Orders", time: "สำหรับหน่วยงานที่ยังไม่ได้ลงทะเบียน วันที่ 30 พ.ค. 2567", icon: GraduationCap, tone: "bg-blue-50 text-blue-500" },
    { title: "ประกาศนโยบายการรักษาความปลอดภัยข้อมูล", time: "มีผลบังคับใช้ตั้งแต่วันที่ 1 มิ.ย. 2567 เป็นต้นไป", icon: ShieldAlert, tone: "bg-rose-50 text-rose-500" },
];

export const latestUpdates = [
    { title: "คู่มือการใช้งานระบบ Work Orders", time: "15 นาทีที่แล้ว", icon: BookOpen, tone: "bg-blue-50 text-blue-500" },
    { title: "ขั้นตอนการขอเบิกวัสดุ - ครุภัณฑ์", time: "1 ชั่วโมงที่แล้ว", icon: ListChecks, tone: "bg-emerald-50 text-emerald-500" },
    { title: "แบบฟอร์มรายงานการตรวจสอบงาน", time: "เมื่อวาน", icon: FileStack, tone: "bg-amber-50 text-amber-500" },
    { title: "วิธีการใช้งานแอป Inspection", time: "3 วันที่แล้ว", icon: PlayCircle, tone: "bg-sky-50 text-sky-500" },
];
