import { Building2, Truck, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const opsToday = [
    { icon: Building2, label: "Active Generators", value: "24", sub: "จุดทั้งหมด 32 จุด" },
    { icon: Truck, label: "Pickup Scheduled", value: "1 รอบ", sub: "เวลา 14:00 น." },
    { icon: Users, label: "Staff On Duty", value: "18 คน", sub: "ปฏิบัติงาน" },
    { icon: AlertTriangle, label: "Incidents", value: "0 เหตุการณ์", sub: "วันนี้" },
    { icon: CheckCircle2, label: "Equipment Status", value: "ปกติ", sub: "พร้อมใช้งาน 100%" },
];
