"use client";

import { Header } from "@/components/global/Header";
import SideBarBlock from "@/components/global/SideBarBlock";

export default function DashboardLayout({ children }: { children: React.ReactNode }){
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