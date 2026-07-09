"use client";

import { CardMetric } from "@/components/dashboard/CardMetric";
import { wasteData } from "../../../../../../../migration/seed_waste_data";
import Tabs from "@/components/basic/Tabs";
import { dailyBriefTabs } from "./tabs/tabsData";
import CardGreeting from "@/components/dashboard/CardGreeting";
import CardScoreGauge from "@/components/dashboard/CardScoreGauge";
import CardTrend from "@/components/dashboard/CardTrend";
import { defaultUser } from "@/components/global/mockUserData";
import { headerTrendItems } from "../../../../../../../migration/seed_trend_items";
import { WandSparkles, ChevronDown, Send, ChevronsRight, Settings, Plus, Image, Mic } from "lucide-react";
import { AIDropdown } from "@/components/basic/AIDropdown";
import { useState } from "react";

export default function DailyBrief() {
    const [activeAI, setActiveAI] = useState<string | null>(null);
    return (
        <div className="w-full flex relative flex-1">
            <div className={`flex-1 px-6 transition-all duration-300`}>
                {/* AI dropdown */}
                <div className="w-full flex justify-end mt-4 mb-3">
                    <AIDropdown
                        selectedValue={activeAI}
                        onChange={setActiveAI}
                    />
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
                <Tabs tabs={dailyBriefTabs} />
            </div>

            {/* AI panel */}
            {/* AI panel */}
            {activeAI && (
                <div className="-z-1 w-[380px] shrink-0 border-l-2 border-gray-200 bg-white backdrop-blur-md p-4 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
                    {/* Header Navigation Utilities */}
                    <div className="flex justify-between items-center mb-6">
                        <button className="flex items-center gap-1 rounded-lg bg-slate-600 px-3 py-1.5 text-xs text-white hover:bg-slate-700 transition-colors font-medium">
                            <span>แชทใหม่</span>
                            <ChevronDown className="w-3.5 h-3.5 text-white/80" />
                        </button>
                        <button onClick={() => setActiveAI(null)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1">
                            <ChevronsRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Central Empty State Content */}
                    <div className="flex flex-col items-center justify-center flex-1 text-center py-20">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 mb-2">AI</span>
                        <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                            เวอร์ชันทดสอบ <br />
                            กำลังอยู่ระหว่างการพัฒนา
                        </h4>
                        <p className="text-xs text-slate-400 mt-3 max-w-[240px] mx-auto leading-relaxed">
                            อยู่ระหว่างการพัฒนาและปรับปรุงฟังก์ชันบางอย่างอาจยังไม่พร้อมให้บริการ
                        </p>
                    </div>

                    {/* Interactive Bottom Input Container */}
                    <div className="w-full border border-slate-100 rounded-2xl p-4 bg-white shadow-sm mt-auto">
                        <input
                            type="text"
                            placeholder="ถามคำถามเกี่ยวกับเอกสารนี้"
                            className="bg-transparent w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none mb-3"
                        />
                        <div className="flex justify-between items-center">
                            {/* Left Side Actions */}
                            <div className="flex items-center gap-3 text-slate-400">
                                <button className="hover:text-slate-600 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button className="hover:text-slate-600 transition-colors">
                                    <Image className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-2">
                                <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-100 rounded-md px-2 py-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    <span>สูงสุด</span>
                                    <ChevronDown className="w-3 h-3 text-slate-400" />
                                </div>
                                <button className="bg-slate-800 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-slate-700 transition-colors">
                                    <Mic className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}