"use client";

import { Footer } from "@/components/global/Footer";
import { Header } from "@/components/global/Header";
import SideBarBlock from "@/components/global/SideBarBlock";
import { footerContent, managerFooterContent } from "./footerContent";
import { usePathname } from "next/navigation";
import { executiveNavigationItems } from "./executive/navItem";
import { managerNavigationItems } from "./manager/navItem";
import type { NavItem } from "@/components/global/SideBarBlock";
import type { FooterProps } from "@/components/global/Footer";
import type { UserProfile } from "@/components/global/mockUserData";

const FULL_CANVAS_PREFIX = "/resource-intelligence/executive/storyboard";
const FULL_CANVAS_PREFIX2 = "/resource-intelligence/manager/storyboard";

export default function LayoutShell({ children, user }: { children: React.ReactNode; user?: UserProfile }) {
    const pathname = usePathname();

    if (pathname.startsWith(FULL_CANVAS_PREFIX) || pathname.startsWith(FULL_CANVAS_PREFIX2)) {
        return <>{children}</>;
    }

    const isManager = pathname.startsWith("/resource-intelligence/manager");
    const navigationItems = isManager ? managerNavigationItems : executiveNavigationItems;
    const currentFooterContent = isManager ? managerFooterContent : footerContent;

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="shrink-0">
                <SideBarBlock navigationItems={navigationItems} user={user} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                <Header navigationText={navigationItems.find((item) => item.href === pathname)?.label} user={user} />
                <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
                    {children}
                </div>
                <Footer className="w-full h-[6vh] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 flex items-center shrink-0 bg-white border-t border-gray-100" content={currentFooterContent} />
            </div>
        </div>
    )
}
