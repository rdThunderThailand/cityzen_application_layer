"use client";

import { CardMetric } from "@/components/dashboard/CardMetric";
import { wasteData } from "../../../../../../../migration/seed_waste_data";
import Tabs from "@/components/global/Tabs";
import { executiveTabs } from "./tabs/tabsData";

export default function DailyBrief() {
    return(
        <div className="flex">     
            <div className="w-full p-6">
                <div className="flex gap-3">
                    <div className="border border-slate-100 rounded-xl shadow-sm w-full h-[139px]"></div>
                    <div className="border border-slate-100 rounded-xl shadow-sm w-[150px] h-[139px]"></div>
                    <div className="border border-slate-100 rounded-xl shadow-sm w-[225px] h-[139px]"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-7xl my-5">
                    {wasteData.map((item, index) => (
                        <CardMetric key={index} {...item} className="bg-white hover:shadow-md transition-shadow duration-200" />
                    ))}
                </div>
                <Tabs tabs={executiveTabs}/>
            </div>
            <div className="bg-red-500 w-[280px] min-h-screen">
                Ai
            </div>
        </div>
    )
}