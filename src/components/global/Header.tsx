import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bell, Scan, ChevronDown, Settings, Info, LogOut } from "lucide-react";
import { cn } from "../../utils/cn";
import { defaultUser } from "./mockUserData";
import { WeatherCard } from "../basic/WeatherCard";
import { executiveNavigationItems } from "@/app/(dashboard)/(workspace)/resource-intelligence/executive/navItem";


export interface HeaderProps {
    navigationText?: string; // Overrides the auto-derived page title when set
}

export const Header = ({
    navigationText,
}: HeaderProps) => {
    const pathname = usePathname();
    const currentPageLabel = executiveNavigationItems.find((item) => item.href === pathname)?.label;
    const displayText = navigationText ?? currentPageLabel ?? 'สวัสดี';

    const [now, setNow] = useState(new Date());
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Live clock, ticks every second
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close the profile dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const dateText = now.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
    const timeText = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    return (
        <div className="w-full shadow-md min-h-[8vh] px-4 py-2 flex items-center justify-between gap-3">
            <div className="flex flex-col justify-center min-w-0">
                <h3 className="text-lg font-semibold text-slate-800 leading-tight uppercase truncate">{displayText} สรุปภาพรวมจังหวัดภูเก็ต</h3>
                <p className="text-xs text-slate-400" suppressHydrationWarning>{dateText} | {timeText}</p>
            </div>

            <div className="flex items-center gap-3 md:gap-6 shrink-0">
                <WeatherCard />

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen((prev) => !prev)}
                        className="flex gap-3 items-center cursor-pointer"
                    >
                        <img
                            src={defaultUser.profileImg}
                            alt="userprofile"
                            className="w-11 h-11 rounded-full object-cover shrink-0 bg-gray-200"
                        />
                        <div className="text-left leading-tight">
                            <p className="text-sm font-bold">{defaultUser.name}</p>
                            <p className="text-[11px] text-slate-400">{defaultUser.role}</p>
                        </div>
                        <ChevronDown className={cn(
                            "w-4 h-4 text-slate-400 transition-transform duration-200",
                            isProfileOpen ? "rotate-180" : ""
                        )} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                            {/* Company Info */}
                            <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-100">
                                <img
                                    src={defaultUser.companyLogo}
                                    alt="companyImg"
                                    className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-200"
                                />
                                <p className="text-sm font-semibold text-slate-800 truncate">{defaultUser.companyName}</p>
                            </div>

                            {/* Other Tabs */}
                            <button
                                onClick={() => console.log("Settings clicked")}
                                className="flex items-center gap-3 px-3 py-2 w-full text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 cursor-pointer"
                            >
                                <Settings className="w-4 h-4" />
                                <span>ตั้งค่า</span>
                            </button>

                            <button
                                onClick={() => console.log("Information clicked")}
                                className="flex items-center gap-3 px-3 py-2 w-full text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 cursor-pointer"
                            >
                                <Info className="w-4 h-4" />
                                <span>ข้อมูล</span>
                            </button>

                            <button
                                onClick={() => console.log("Logout clicked")}
                                className="flex items-center gap-3 px-3 py-2 w-full text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>ออกจากระบบ</span>
                            </button>
                        </div>
                    )}
                </div>

                <Bell className="w-6 h-6" />
                <Scan />

            </div>
        </div>
    );
};

export default Header;
