"use client";

import { Footer } from "@/components/global/Footer";
import { Header } from "@/components/global/Header";
import SideBarBlock from "@/components/global/SideBarBlock";
import { usePathname } from "next/navigation";
import type { UserProfile } from "@/components/global/mockUserData";
import type { NavItem } from "@/components/global/SideBarBlock";
import {
    companyAdminNavigationItems,
    departmentAdminNavigationItems,
    executiveNavigationItems,
    operatorTechnicianNavigationItems,
    operatorSupplyOfficerNavigationItems,
    operatorGarbageCollectorNavigationItems,
    operatorNavigationItems,
} from "./navitem";

const navigationItemsByPathPrefix: { prefix: string; items: NavItem[] }[] = [
    { prefix: "/asset-intelligence/company-admin", items: companyAdminNavigationItems },
    { prefix: "/asset-intelligence/department-admin", items: departmentAdminNavigationItems },
    { prefix: "/asset-intelligence/executive", items: executiveNavigationItems },
    { prefix: "/asset-intelligence/operator/main/technician", items: operatorTechnicianNavigationItems },
    { prefix: "/asset-intelligence/operator/main/supply-officer", items: operatorSupplyOfficerNavigationItems },
    { prefix: "/asset-intelligence/operator/main/garbage-collector", items: operatorGarbageCollectorNavigationItems },
    { prefix: "/asset-intelligence/operator", items: operatorNavigationItems },
];

function getNavigationItems(pathname: string): NavItem[] {
    return navigationItemsByPathPrefix.find(({ prefix }) => pathname.startsWith(prefix))?.items ?? [];
}

export default function LayoutShell({ children, user }: { children: React.ReactNode; user?: UserProfile }) {
    const pathname = usePathname();
    const navigationItems = getNavigationItems(pathname);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="shrink-0">
                <SideBarBlock navigationItems={navigationItems} user={user} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                <Header navigationText={navigationItems.find((item) => item.href === pathname)?.label} user={user} />
                <div className="flex-1 min-h-0 flex flex-col overflow-y-auto ">
                    {children}
                </div>
                {/* <Footer className="w-full h-[6vh] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 flex items-center shrink-0 bg-white border-t border-gray-100" content={currentFooterContent} /> */}
            </div>
        </div>
    )
}
