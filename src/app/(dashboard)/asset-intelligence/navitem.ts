import { NavItem } from "@/components/global/SideBarBlock";
import {
    Split,
    Camera,
    SquareKanban,
    UsersRound,
    Megaphone,
    LaptopMinimalCheck,
    HouseIcon,
    FolderKanban,
    Repeat,
    RefreshCcwDot,
    FolderOpen,
    FileText,
    MessageCircle,
    MessageSquareText,
    BookOpen,
    BellPlus,
    Calendar,
    BellDot,
    Wrench,
} from 'lucide-react';

export const companyAdminNavigationItems: NavItem[] = [
    { label: "Company Admin", href: "/asset-intelligence/company-admin", icon: SquareKanban },
];

export const departmentAdminNavigationItems: NavItem[] = [
    { label: "Department Admin", href: "/asset-intelligence/department-admin", icon: Camera },
];

export const executiveNavigationItems: NavItem[] = [
    { label: "Executive", href: "/asset-intelligence/executive", icon: SquareKanban },
];

export const operatorNavigationItems: NavItem[] = [
    { label: "หน้าหลัก", href: "/asset-intelligence/operator/main", icon: HouseIcon },
    { label: "งานของฉัน", href: "/asset-intelligence/operator/work-order", icon: FolderKanban },
    { label: "ปฏิทิน / เวร", href: "/asset-intelligence/operator/schedule", icon: Calendar },
    { label: "แจ้งเหตุ / คำขอ", href: "/asset-intelligence/operator/report", icon: BellPlus },
    { label: "ศูนย์ความรู้", href: "/asset-intelligence/operator/knowledge-center", icon: BookOpen },
    { label: "ข้อความ", href: "/asset-intelligence/operator/messenger", icon: MessageSquareText },
    { label: "ไฟล์ของฉัน", href: "/asset-intelligence/operator/file", icon: FolderOpen },
];

export const operatorTechnicianNavigationItems: NavItem[] = [
    { label: "หน้าหลัก", href: "/asset-intelligence/operator/main/technician-officer", icon: HouseIcon },
    { label: "งานของฉัน", href: "/asset-intelligence/operator/main/technician-officer/#my-work", icon: FolderKanban },
    { label: "ใบงานทั้งหมด", href: "/asset-intelligence/operator/main/technician-officer/#all-work", icon: FolderKanban },
    { label: "แผนบำรุงรักษา (PM)", href: "/asset-intelligence/operator/main/technician-officer/#pm", icon: FolderKanban },
    { label: "แจ้งซ่อม / คำขอ", href: "/asset-intelligence/operator/main/technician-officer/#request", icon: RefreshCcwDot },
    { label: "ตรวจสอบหน้างาน", href: "/asset-intelligence/operator/main/technician-officer/#inspection", icon: BellDot },
    { label: "อะไหล่ / คลัง", href: "/asset-intelligence/operator/main/technician-officer/#inventory", icon: Repeat },
    { label: "เครื่องมือของฉัน", href: "/asset-intelligence/operator/main/technician-officer/#vendor", icon: UsersRound },
    { label: "ประวัติการซ่อม", href: "/asset-intelligence/operator/main/technician-officer/#vendor", icon: Wrench },
    { label: "เอกสาร / คู่มือ", href: "/asset-intelligence/operator/main/technician-officer/#documents", icon: FolderOpen },
    { label: "รายงาน", href: "/asset-intelligence/operator/main/technician-officer/#report", icon: FileText },
];

export const operatorSupplyOfficerNavigationItems: NavItem[] = [
    { label: "หน้าหลัก", href: "/asset-intelligence/operator/main/supply-officer", icon: HouseIcon },
    { label: "ทะเบียนครุภัณฑ์", href: "/asset-intelligence/operator/main/supply-officer/#register", icon: FolderKanban },
    { label: "รับเข้า / จัดหา", href: "/asset-intelligence/operator/main/supply-officer/#receive", icon: RefreshCcwDot },
    { label: "โอนย้าย / จำหน่าย", href: "/asset-intelligence/operator/main/supply-officer/#transfer", icon: Repeat },
    { label: "ตรวจนับครุภัณฑ์", href: "/asset-intelligence/operator/main/supply-officer/#inspection", icon: SquareKanban },
    { label: "เอกสาร / สัญญา", href: "/asset-intelligence/operator/main/supply-officer/#documents", icon: FolderOpen },
    { label: "ผู้จำหน่าย / คู่ค้า", href: "/asset-intelligence/operator/main/supply-officer/#vendor", icon: UsersRound },
    { label: "รายงาน", href: "/asset-intelligence/operator/main/supply-officer/#report", icon: FileText },
];

export const operatorGarbageCollectorNavigationItems: NavItem[] = [
    { label: "Garbage Collector", labelTh: "ภาพรวมวันนี้", href: "/asset-intelligence/operator/main/garbage-collector", icon: SquareKanban },
];
