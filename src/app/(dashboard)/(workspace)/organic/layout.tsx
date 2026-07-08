"use client";

import { Header } from "@/components/global/Header";
import SideBarBlock from "@/components/global/SideBarBlock";
import { usePathname } from "next/navigation";

const FULL_CANVAS_ROUTES = new Set(["/organic/owner/storyboard"]);

export default function DashboardLayout({ children }: { children: React.ReactNode }){
    const pathname = usePathname();

    if (FULL_CANVAS_ROUTES.has(pathname)) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen max-w-screen">
            <div className="">
                <SideBarBlock/>
            </div>
            <div className="w-full">
                <Header/>
                {children}
            </div>
        </div>
    )
}
