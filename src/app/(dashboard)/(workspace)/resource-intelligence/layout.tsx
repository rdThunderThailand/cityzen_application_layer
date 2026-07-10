"use client";

import { Footer } from "@/components/global/Footer";
import { Header } from "@/components/global/Header";
import SideBarBlock from "@/components/global/SideBarBlock";
import { footerContent, managerFooterContent } from "./footerContent";
import { usePathname } from "next/navigation";
import { executiveNavigationItems } from "./executive/navItem";
import { managerNavigationItems } from "./manager/navItem";

const FULL_CANVAS_ROUTES = new Set(["/resource-intelligence/executive/storyboard"]);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (FULL_CANVAS_ROUTES.has(pathname)) {
        return <>{children}</>;
    }

    const isManager = pathname.startsWith("/resource-intelligence/manager");
    const navigationItems = isManager ? managerNavigationItems : executiveNavigationItems;
    const currentFooterContent = isManager ? managerFooterContent : footerContent;

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="shrink-0">
                <SideBarBlock navigationItems={navigationItems} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {children}
                </div>
                <Footer className="w-full h-[6vh] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 flex items-center shrink-0 bg-white border-t border-gray-100" content={currentFooterContent} />
            </div>
        </div>
    )
}
