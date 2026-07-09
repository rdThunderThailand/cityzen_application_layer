import { NavItem } from "@/components/global/SideBarBlock";
import {
    Split,
    Camera,
    SquareKanban,
    UsersRound,
    Megaphone,
    LaptopMinimalCheck,
} from 'lucide-react';


export const executiveNavigationItems: NavItem[] = [
    { label: "Daily Brief", labelTh: "ภาพรวมวันนี้", href: "/organic/executive/daily-brief", icon: SquareKanban },
    { label: "Situation", labelTh: "สถานการณ์", href: "/organic/executive/situation", icon: Camera },
    { label: "Decision", labelTh: "การตัดสินใจ", href: "/organic/executive/decision", icon: Split },
    { label: "War Room", labelTh: "ศูนย์ปฏิบัติการ", href: "/organic/executive/war-room", icon: UsersRound },
    { label: "Communication", labelTh: "การสื่อสาร", href: "/organic/executive/communication", icon: Megaphone },
    { label: "Outcome", labelTh: "ผลลัพธ์", href: "/organic/executive/outcome", icon: LaptopMinimalCheck },
];