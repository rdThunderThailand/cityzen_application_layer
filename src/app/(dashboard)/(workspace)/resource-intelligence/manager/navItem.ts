import { NavItem } from "@/components/global/SideBarBlock";
import {
    Split,
    Camera,
    SquareKanban,
    UsersRound,
    Megaphone,
    LaptopMinimalCheck,
} from 'lucide-react';

export const managerNavigationItems: NavItem[] = [
    { label: "Daily Brief", labelTh: "ภาพรวมวันนี้", href: "/resource-intelligence/manager/daily-brief", icon: SquareKanban },
    { label: "Situation", labelTh: "สถานการณ์", href: "/resource-intelligence/manager/situation", icon: Camera },
    { label: "Decision", labelTh: "การตัดสินใจ", href: "/resource-intelligence/manager/decision", icon: Split },
    // { label: "War Room", labelTh: "ศูนย์ปฏิบัติการ", href: "/resource-intelligence/manager/war-room", icon: UsersRound },
    { label: "Communication", labelTh: "การสื่อสาร", href: "/resource-intelligence/manager/communication", icon: Megaphone },
    { label: "Outcome", labelTh: "ผลลัพธ์", href: "/resource-intelligence/manager/outcome", icon: LaptopMinimalCheck },
];