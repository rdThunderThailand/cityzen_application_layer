export type ShiftKind = "เช้า" | "บ่าย" | "ดึก" | "หยุด";

export interface CalendarDay {
    day: number;
    inMonth: boolean;
    shift?: ShiftKind;
    time?: string;
    selected?: boolean;
}

export const shiftTone: Record<ShiftKind, { text: string; bg: string; dot: string }> = {
    เช้า: { text: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    บ่าย: { text: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500" },
    ดึก: { text: "text-violet-700", bg: "bg-violet-50", dot: "bg-violet-500" },
    หยุด: { text: "text-rose-700", bg: "bg-rose-50", dot: "bg-rose-500" },
};

export const shiftTime: Record<ShiftKind, string> = {
    เช้า: "08.00 - 16.00",
    บ่าย: "13.00 - 21.00",
    ดึก: "21.00 - 05.00",
    หยุด: "หยุด",
};

/** Weekly rotation used to derive a shift from a date's day-of-week (0 = Sunday ... 6 = Saturday). */
export const weekdayShiftPattern: ShiftKind[] = ["หยุด", "เช้า", "เช้า", "บ่าย", "บ่าย", "ดึก", "หยุด"];

export const shiftForWeekday = (weekday: number): ShiftKind => weekdayShiftPattern[weekday];

export const activities = [
    { time: "09:00", title: "PM เครื่องสูบน้ำ อาคารสำนักงาน ชั้น 1", status: "ยืนยัน", tone: "bg-emerald-50 text-emerald-600" },
    { time: "14:30", title: "ตรวจเช็คระบบไฟฟ้าสาธารณะ ถนนสุขาภิบาล 5", status: "รอดำเนินการ", tone: "bg-amber-50 text-amber-600" },
    { time: "15:30", title: "ประชุมกับหัวหน้าช่าง ห้องประชุม ชั้น 3", status: "เข้าร่วม", tone: "bg-blue-50 text-blue-600" },
];

export const leaveRequests = [
    { title: "ลาพักผ่อน", date: "วันที่ 10 พ.ค. 2567", status: "รอดำเนินการ", tone: "bg-amber-50 text-amber-600" },
    { title: "เปลี่ยนเวร", date: "วันที่ 18 พ.ค. 2567", status: "อนุมัติแล้ว", tone: "bg-emerald-50 text-emerald-600" },
    { title: "ขอทำงานล่วงเวลา", date: "วันที่ 3 พ.ค. 2567", status: "ไม่อนุมัติ", tone: "bg-rose-50 text-rose-600" },
];

export const teammates = [
    { name: "ณัฐวุฒิ พรหมนา", time: "เช้า 08.00 - 16.00", online: true },
    { name: "วิภาวี วินทร์กล้า", time: "เช้า 08.00 - 16.00", online: true },
    { name: "อนุชา สาริโย", time: "เช้า 08.00 - 16.00", online: true },
    { name: "ธนพล ทองดี", time: "เช้า 08.00 - 16.00", online: false },
    { name: "ธวรรณ แก้วมณี", time: "เช้า 08.00 - 16.00", online: false },
];
