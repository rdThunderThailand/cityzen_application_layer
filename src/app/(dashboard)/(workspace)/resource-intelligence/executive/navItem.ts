import { NavItem } from "@/components/global/SideBarBlock";
import {
    Split,
    Camera,
    SquareKanban,
    UsersRound,
    Megaphone,
    LaptopMinimalCheck,
    Radar,
} from 'lucide-react';


export const executiveNavigationItems: NavItem[] = [
    { label: "Daily Brief", labelTh: "ภาพรวมวันนี้", href: "/resource-intelligence/executive/daily-brief", icon: SquareKanban },
    { label: "Situation", labelTh: "สถานการณ์", href: "/resource-intelligence/executive/situation", icon: Camera },
    { label: "Decision", labelTh: "การตัดสินใจ", href: "/resource-intelligence/executive/decision", icon: Split },
    // { label: "War Room", labelTh: "ศูนย์ปฏิบัติการ", href: "/resource-intelligence/executive/war-room", icon: UsersRound },
    { label: "Communication", labelTh: "การสื่อสาร", href: "/resource-intelligence/executive/communication", icon: Megaphone },
    { label: "Outcome", labelTh: "ผลลัพธ์", href: "/resource-intelligence/executive/outcome", icon: LaptopMinimalCheck },
    { label: "Command Center", labelTh: "ศูนย์บัญชาการ", href: "/resource-intelligence/executive/command-center", icon: Radar },
];