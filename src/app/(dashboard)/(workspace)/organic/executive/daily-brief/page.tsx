"use client";

import { CardMetric } from "@/components/dashboard/CardMetric";
import { wasteData } from "../../../../../../../migration/seed_waste_data";
import Tabs from "@/components/global/Tabs";
import { executiveTabs } from "./tabs/tabsData";
import CardGreeting from "@/components/dashboard/CardGreeting";
import CardScoreGauge from "@/components/dashboard/CardScoreGauge";
import CardTrend from "@/components/dashboard/CardTrend";
import { defaultUser } from "@/components/global/mockUserData";
import { headerTrendItems } from "../../../../../../../migration/seed_trend_items";
import { WandSparkles } from "lucide-react";

export default function DailyBrief() {
    return(
        <div className="w-full flex">     
            <div className="w-full p-6">
                {/* AI dropdown */}
                <div className="w-full flex justify-end mb-4">
                    <WandSparkles/>
                    <p>AI Executive Assistant</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <CardGreeting
                        className="flex-1 h-[139px]"
                        recipient="ผู้ว่าราชการจังหวัดภูเก็ต"
                        summary="วันนี้จังหวัดภูเก็ตมี 2 เหตุการณ์ที่ต้องเฝ้าระวังเป็นพิเศษ คาดว่าจะมีนักท่องเที่ยวเพิ่มขึ้น 18% จากเมื่อวาน โดยพื้นที่กะทู้และป่าตองมีความเสี่ยงสูงสุด แนะนำติดตามสถานการณ์อย่างใกล้ชิด"
                        avatarSrc={defaultUser.profileImg}
                        avatarAlt={defaultUser.name}
                    />
                    <CardScoreGauge
                        className="h-[139px] w-[160px]"
                        title="สถานะภาพรวมวันนี้"
                        score={82}
                        statusLabel="ปกติ (ดี)"
                    />
                    <CardTrend
                        className="lg:w-[240px] h-[139px]"
                        title="แนวโน้มเทียบกับเมื่อวาน"
                        items={headerTrendItems}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full my-5">
                    {wasteData.map((item, index) => (
                        <CardMetric key={index} {...item} className="bg-white hover:shadow-md transition-shadow duration-200" />
                    ))}
                </div>
                <Tabs tabs={executiveTabs}/>
            </div>

            {/* AI panel */}
            {/* <div className="bg-red-500 w-[350px] min-h-screen">
                Ai
            </div> */}
        </div>
    )
}