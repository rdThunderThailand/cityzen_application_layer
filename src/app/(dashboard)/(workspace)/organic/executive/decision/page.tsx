"use client";

import { CardMetric } from "@/components/dashboard/CardMetric";
import { wasteData } from "../../../../../../../migration/seed_waste_data";
import Tabs from "@/components/basic/Tabs";
import { decisionTabs } from "./tabs/tabsData";
import CardGreeting from "@/components/dashboard/CardGreeting";
import CardScoreGauge from "@/components/dashboard/CardScoreGauge";
import CardTrend from "@/components/dashboard/CardTrend";
import { defaultUser } from "@/components/global/mockUserData";
import { headerTrendItems } from "../../../../../../../migration/seed_trend_items";
import { WandSparkles, ChevronDown, Send, Target, FileText, TrendingUp, Users, ShieldCheck, ChevronsRight, Settings, Plus, Image, Mic } from "lucide-react";
import { AIDropdown } from "@/components/basic/AIDropdown";
import { useState } from "react";

export default function Decision() {
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

                {/* Metric Banner Card */}
                <div className="w-full h-[128px] bg-white rounded-2xl shadow-sm border border-slate-100 grid mb-4 overflow-hidden" style={{ gridTemplateColumns: '35% 1fr 1fr 1fr 1fr' }}>
                    {/* Column 1: Vision & Title */}
                    <div className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors h-full">
                        <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5 text-blue-700" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] text-slate-500 leading-none">วิสัยทัศน์การตัดสินใจวันนี้</p>
                            <h2 className="text-[17px] font-bold text-slate-800 leading-snug mt-1">ตัดสินใจอย่างแม่นยำ<br />รวดเร็ว โปร่งใส</h2>
                            <p className="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-1">เพื่อความปลอดภัยของประชาชน การบริหารทรัพยากรอย่างคุ้มค่า</p>
                        </div>
                    </div>

                    {/* Column 2: Urgent Action Items */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center">
                                <FileText className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <span className="text-red-500 text-[11px] font-medium">เร่งด่วน 2 เรื่อง</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">6</p>
                            <p className="text-[11px] text-slate-400 mt-1">เรื่องที่รอการตัดสินใจ</p>
                        </div>
                    </div>

                    {/* Column 3: Economic Impact */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="text-emerald-500 text-[11px] font-medium">ผลบวก</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">512.42</p>
                            <p className="text-[11px] text-slate-400 mt-1">คาดการณ์ผลกระทบ (ล้านบาท)</p>
                        </div>
                    </div>

                    {/* Column 4: Public Beneficiaries */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center">
                                <Users className="w-3.5 h-3.5 text-amber-600" />
                            </div>
                            <span className="text-emerald-500 text-[11px] font-medium">เพิ่มขึ้น 18%</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">856,250</p>
                            <p className="text-[11px] text-slate-400 mt-1">ประชาชนได้รับประโยชน์ (คน)</p>
                        </div>
                    </div>

                    {/* Column 5: Confidence Index */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-purple-50 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                            </div>
                            <span className="text-emerald-500 text-[11px] font-medium">ระดับสูง</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">88%</p>
                            <p className="text-[11px] text-slate-400 mt-1">ความเชื่อมั่นคาดการณ์</p>
                        </div>
                    </div>
                </div>

                <Tabs tabs={decisionTabs} />
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