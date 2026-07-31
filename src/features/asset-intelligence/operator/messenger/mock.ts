export interface Conversation {
    id: string;
    name: string;
    subtitle: string;
    time: string;
    unread?: number;
    avatar: string;
    isGroup?: boolean;
}

export const conversations: Conversation[] = [
    { id: "1", name: "ทีมซ่อมบำรุงไฟฟ้า", subtitle: "สวัสดีครับ พรุ่งนี้มีงานเปลี่ยนหลอดไฟ", time: "10:30", unread: 3, avatar: "🛠️", isGroup: true },
    { id: "2", name: "หัวหน้ากองช่าง", subtitle: "ช่วยส่งเอกสารเพิ่มเติมหน่อยครับ", time: "09:15", unread: 2, avatar: "👨‍💼" },
    { id: "3", name: "ฝ่ายประชาสัมพันธ์", subtitle: "ปิดปรับปรุงระบบตรวจ 1 วัน", time: "08:45", unread: 1, avatar: "📣" },
    { id: "4", name: "ศูนย์บริการประชาชน", subtitle: "ประชาชนแจ้งไฟฟ้าดับ ซอย 5", time: "เมื่อวาน", avatar: "❤️" },
    { id: "5", name: "ทีมตรวจสอบอาคาร", subtitle: "นัดตรวจอาคารเรียน 3 เวลา 10.00 น.", time: "เมื่อวาน", avatar: "🏢" },
    { id: "6", name: "ฝ่ายจัดซื้อจัดจ้าง", subtitle: "ขออนุมัติจัดซื้อหลอดไฟ LED เพิ่มเติม", time: "2 วัน", avatar: "📦" },
    { id: "7", name: "IT Support", subtitle: "ระบบ Mobile App เวอร์ชันใหม่พร้อมใช้งาน", time: "2 วัน", avatar: "🎧" },
    { id: "8", name: "กลุ่มเวรดึก", subtitle: "เวรดึก 21.00 - 06.00 น.", time: "3 วัน", avatar: "🌙" },
    { id: "9", name: "ฝ่ายการเงิน", subtitle: "เอกสารเบิกจ่ายเดือนกุมภาพันธ์", time: "3 วัน", avatar: "💰" },
    { id: "10", name: "กองสาธารณสุข", subtitle: "ขอความร่วมมือพ่นยากันยุงรอบ", time: "4 วัน", avatar: "➕" },
];

export interface ChatMessage {
    id: string;
    sender: string;
    self?: boolean;
    text?: string;
    time: string;
    reactions?: number;
    attachment?: { name: string; size: string };
}

export const messages: ChatMessage[] = [
    { id: "1", sender: "เอกชัย ช่างไฟ", text: "สวัสดีครับทุกคน\nวันนี้มีงานเปลี่ยนหลอดไฟ LED ถนนเส้นหลัก 5 จุดครับ", time: "09:08", reactions: 2 },
    { id: "2", sender: "วิเกรานห์ หัวหน้าทีม", text: "รับทราบครับ\nจะแบ่งทีมออกเป็น 2 ชุด\nชุด A รับผิดชอบจุด 1-3\nชุด B รับผิดชอบจุด 4-5", time: "09:10", reactions: 3 },
    { id: "3", sender: "ธนวัณย์ ช่างไฟ", text: "ผมอยู่ชุด A ครับ", time: "09:12", reactions: 1 },
    { id: "4", sender: "me", self: true, text: "ผมอยู่ชุด B ครับ", time: "09:13" },
    { id: "5", sender: "เอกชัย ช่างไฟ", text: "อย่าลืมเช็คอุปกรณ์และความปลอดภัยก่อนเริ่มงานด้วยนะครับ", time: "09:15", reactions: 2 },
    { id: "6", sender: "วิเกรานห์ หัวหน้าทีม", time: "09:18", attachment: { name: "แผนผังจุดติดตั้งหลอดไฟ.pdf", size: "2.4 MB" }, reactions: 2 },
];

export const members = [
    { name: "วิเกรานห์ หัวหน้าทีม", role: "หัวหน้าทีม", online: true },
    { name: "เอกชัย ช่างไฟ", role: "ออนไลน์", online: true },
    { name: "ธนวัณย์ ช่างไฟ", role: "ออนไลน์", online: true },
    { name: "ศุกรณ์ ช่างไฟ", role: "ออฟไลน์", online: false },
    { name: "กิตติพงษ์ ช่างไฟ", role: "ออฟไลน์", online: false },
];

export const sharedFiles = [
    { name: "แผนผังจุดติดตั้งหลอดไฟ.pdf", time: "09:18" },
    { name: "ตารางเวรซ่อมบำรุง.xlsx", time: "เมื่อวาน" },
    { name: "รูปหน้างาน 20240519_01.jpg", time: "2 วัน" },
    { name: "คู่มือความปลอดภัย.pdf", time: "3 วัน" },
];

export const sharedLinks = [
    { title: "แบบฟอร์มแจ้งซ่อมไฟฟ้า", url: "https://cityzen.go.th/form/electric" },
];
