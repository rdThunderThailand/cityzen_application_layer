import { Zap, Droplets, TreePine, Trash2, AlertTriangle, Construction } from "lucide-react";

export interface ReportItem {
    id: string;
    code: string;
    title: string;
    type: string;
    priority: "ด่วน" | "ปานกลาง" | "ต่ำ";
    status: "รอดำเนินการ" | "กำลังดำเนินการ" | "เสร็จสิ้น";
    address: string;
    time: string;
    reporter: string;
    channel: string;
    phone: string;
    description: string;
    photos: string[];
    icon: typeof Zap;
    iconTone: string;
}

export const priorityBadge: Record<ReportItem["priority"], string> = {
    ด่วน: "bg-rose-50 text-rose-600",
    ปานกลาง: "bg-amber-50 text-amber-600",
    ต่ำ: "bg-slate-100 text-slate-600",
};

export const statusBadge: Record<ReportItem["status"], string> = {
    รอดำเนินการ: "bg-amber-50 text-amber-600",
    กำลังดำเนินการ: "bg-blue-50 text-blue-600",
    เสร็จสิ้น: "bg-emerald-50 text-emerald-600",
};

export const reports: ReportItem[] = [
    {
        id: "1", code: "REQ-2567-0521", title: "ไฟฟ้าส่องสว่าง ถนนบ้านเหมันตร์ ซ.5 ดับ", type: "ไฟฟ้าและแสงสว่าง",
        priority: "ด่วน", status: "กำลังดำเนินการ", address: "ถนนบ้านเหมันตร์ ซอย 5 อ.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี",
        time: "วันนี้ 09:15", reporter: "นางสาววิภาวี ทำพงษ์", channel: "Mobile Application", phone: "081-234-5678",
        description: "ไฟฟ้าส่องสว่าง 3 ต้น บริเวณถนนบ้านเหมันตร์ ซ.5 ไม่ติดสว่างตั้งแต่เวลากลางคืน",
        photos: [
            "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=300&q=60",
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&q=60",
            "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&q=60",
        ],
        icon: Zap, iconTone: "bg-violet-50 text-violet-500",
    },
    {
        id: "2", code: "REQ-2567-0518", title: "ท่อประปาแตกรั่ว น้ำไหลต่อเนื่อง", type: "ระบบน้ำประปา",
        priority: "ปานกลาง", status: "กำลังดำเนินการ", address: "ซอยประชาอุทิศ 34 แขวงบางมด เขตทุ่งครุ กรุงเทพฯ",
        time: "วันนี้ 08:40", reporter: "นายสมชาย ใจตรง", channel: "โทรศัพท์สายด่วน", phone: "089-111-2233",
        description: "ท่อประปาแตกบริเวณหน้าปากซอย น้ำไหลนองถนนตั้งแต่เช้า",
        photos: [], icon: Droplets, iconTone: "bg-sky-50 text-sky-500",
    },
    {
        id: "3", code: "REQ-2567-0517", title: "กิ่งไม้หักวางขวางถนน", type: "ต้นไม้และภูมิทัศน์",
        priority: "ปานกลาง", status: "เสร็จสิ้น", address: "ถนนเลียบคลองภาษีเจริญฝั่งใต้",
        time: "เมื่อวาน 16:30", reporter: "นายประยุทธ์ วงศ์คำ", channel: "Line Official", phone: "086-555-9988",
        description: "กิ่งไม้ขนาดใหญ่หักวางขวางเลนจราจร กีดขวางการสัญจร",
        photos: [], icon: TreePine, iconTone: "bg-emerald-50 text-emerald-500",
    },
    {
        id: "4", code: "REQ-2567-0516", title: "ถังขยะชำรุด ฝาเปิดไม่ได้", type: "ขยะและความสะอาด",
        priority: "ต่ำ", status: "เสร็จสิ้น", address: "สวนสาธารณะคลองบางพรม",
        time: "เมื่อวาน 15:10", reporter: "นางสาวอรพิน สุขใจ", channel: "Mobile Application", phone: "092-333-4455",
        description: "ฝาถังขยะสาธารณะชำรุด ไม่สามารถเปิด-ปิดได้ตามปกติ",
        photos: [], icon: Trash2, iconTone: "bg-blue-50 text-blue-500",
    },
    {
        id: "5", code: "REQ-2567-0515", title: "ฝาท่อระบายน้ำชำรุด", type: "ระบบระบายน้ำ",
        priority: "ด่วน", status: "กำลังดำเนินการ", address: "ถนนพระราม 2 ซอย 50",
        time: "2 วันที่แล้ว", reporter: "นายวีระ ศรีสุข", channel: "โทรศัพท์สายด่วน", phone: "081-777-6655",
        description: "ฝาท่อระบายน้ำแตกร้าว เสี่ยงอันตรายต่อผู้สัญจร",
        photos: [], icon: AlertTriangle, iconTone: "bg-rose-50 text-rose-500",
    },
    {
        id: "6", code: "REQ-2567-0514", title: "ถนนเป็นหลุมเป็นบ่อ", type: "ถนนและทางเท้า",
        priority: "ปานกลาง", status: "รอดำเนินการ", address: "ถนนกาญจนาภิเษก",
        time: "2 วันที่แล้ว", reporter: "นายสมพงษ์ ทองอยู่", channel: "Mobile Application", phone: "085-444-3322",
        description: "ผิวถนนเป็นหลุมขนาดใหญ่หลายจุด อันตรายต่อการขับขี่",
        photos: [], icon: Construction, iconTone: "bg-amber-50 text-amber-500",
    },
];

export const activityHistory = [
    { title: "สร้างรายการแจ้งเหตุ", by: "นางสาววิภาวี ทำพงษ์", time: "21 พ.ค. 2567 09:15 น.", tone: "bg-emerald-500" },
    { title: "รับเรื่องเข้าระบบ", by: "ระบบอัตโนมัติ", time: "21 พ.ค. 2567 09:15 น.", tone: "bg-blue-500" },
    { title: "มอบหมายงาน", by: "สมชาย ไอดี มอบหมายให้: ทีมไฟฟ้า เขต 2", time: "21 พ.ค. 2567 09:20 น.", tone: "bg-amber-500" },
];
