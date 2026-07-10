"use client";

import { useState } from "react";
import { ChevronDown, ChevronsRight, Settings, Plus, Image, Mic, Building2, Truck, Sparkles } from "lucide-react";
import { AIDropdown } from "@/components/basic/AIDropdown";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { HotelMapCard } from "@/features/resource-intelligence/manager/components/HotelMapCard";
import { OrganicWasteTrendCard } from "@/features/resource-intelligence/manager/components/OrganicWasteTrendCard";
import { wasteData } from "../../../../../../../migration/manager/daily-brief/seed_waste_data";
import { cardEventData } from "../../../../../../../migration/manager/daily-brief/seed_event_data";
import { opsToday } from "../../../../../../../migration/manager/daily-brief/seed_ops_today";
import { outcomeSummary } from "../../../../../../../migration/manager/daily-brief/seed_outcome_summary";
import { RiRobot2Fill } from "react-icons/ri";

const getToneClasses = (tone: string) => {
    switch(tone) {
        case 'rose': return { bg: 'bg-rose-50', iconBg: 'bg-rose-50', iconText: 'text-rose-600', badgeText: 'text-rose-700' };
        case 'amber': return { bg: 'bg-amber-50', iconBg: 'bg-amber-50', iconText: 'text-amber-600', badgeText: 'text-amber-700' };
        case 'emerald': return { bg: 'bg-emerald-50', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', badgeText: 'text-emerald-700' };
        case 'blue': default: return { bg: 'bg-blue-50', iconBg: 'bg-blue-50', iconText: 'text-blue-600', badgeText: 'text-blue-700' };
    }
};

export default function DailyBrief() {
    const [activeAI, setActiveAI] = useState<string | null>(null);

    return (
        <div className="w-full flex relative flex-1">
            <div className={`flex-1 px-6 transition-all duration-300 pb-8`}>
                {/* AI dropdown */}
                <div className="w-full flex justify-end mt-4">
                    <AIDropdown
                        selectedValue={activeAI}
                        onChange={setActiveAI}
                    />
                </div>

                <div className="flex flex-col  gap-4 w-full mt-3">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 ">
                        {/* 5 Metric Tiles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                            {wasteData.map((item, index) => (
                                <CardMetric key={index} {...item} className="h-60 bg-white hover:shadow-md transition-shadow duration-200" />
                            ))}
                        </div>

                        {/* AI Executive Brief Banner */}
                        <div className="bg-white border border-slate-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                            <div className="flex gap-4 items-start flex-1">
                                <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <RiRobot2Fill className="w-7 h-7 text-blue-800" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-base font-bold text-slate-800 tracking-tight">AI Executive Brief</h2>
                                        <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">BETA</span>
                                    </div>
                                    <div className="text-sm text-slate-700 leading-[1.6] font-medium max-w-150">
                                        วันนี้ปริมาณ Organic Waste สูงกว่าค่าเฉลี่ย 14% สาเหตุหลักมาจาก Breakfast Buffet และ Banquet Hall หากแนวโน้มยังคงเดิม ต้นทุนกำจัดขยะเดือนนี้จะเพิ่มประมาณ 38,000 บาท แนะนำให้เพิ่มรอบเก็บเวลา 13:00 และตรวจสอบ Buffet Line B    
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">Insight</span>
                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">Prediction</span>
                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">Recommendation</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block shrink-0">
                                <img src="/mockPic.png" alt="AI Illustration" className="h-[200px] w-[350px] mr-20 " />
                            </div>
                        </div>

                        {/* 3-column row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Map */}
                            <HotelMapCard />

                            {/* ประเด็นสำคัญวันนี้ */}
                            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 h-full overflow-hidden flex flex-col">
                                <h3 className="text-sm font-semibold text-slate-800 mb-3">ประเด็นสำคัญวันนี้</h3>
                                <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                                    {cardEventData.map((item, idx) => {
                                        const tones = getToneClasses(item.badgeTone);
                                        return (
                                            <div key={idx} className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${tones.iconBg} ${tones.iconText}`}>
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-slate-800">{item.title}</span>
                                                        <span className="text-xs text-slate-500 line-clamp-1">{item.subtitle}</span>
                                                    </div>
                                                </div>
                                                <span className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-md ${tones.bg} ${tones.badgeText}`}>
                                                    {item.badgeText}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* แนวโน้มปริมาณขยะอินทรีย์ */}
                            <OrganicWasteTrendCard />
                        </div>

                        {/* Bottom 2-col row */}
                        <div className="flex gap-4 justify-baseline">
                            {/* การดำเนินงานวันนี้ */}
                            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex-1">
                                <h3 className="text-sm font-semibold text-slate-800 mb-4">การดำเนินงานวันนี้</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                    {opsToday.map((item, idx) => (
                                        <div key={idx} className="flex flex-col gap-1.5 p-2 bg-slate-50 rounded-lg">
                                            <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm text-slate-500">
                                                <item.icon className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="text-[11px] font-medium text-slate-500 mt-1 truncate">{item.label}</div>
                                            <div className="text-sm font-bold text-slate-900">{item.value}</div>
                                            <div className="text-[9px] text-slate-400 truncate">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* สรุปผลลัพธ์ล่าสุด */}
                            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4">
                                <h3 className="text-sm font-semibold text-slate-800 mb-4">สรุปผลลัพธ์ล่าสุด (7 วัน)</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {outcomeSummary.map((item, idx) => (
                                        <div key={idx} className="flex flex-col gap-1.5 p-2 bg-slate-50 rounded-lg">
                                            <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm text-slate-500">
                                                <item.icon className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="text-xs font-medium text-slate-500 mt-1 truncate">{item.label}</div>
                                            <div className="text-sm font-bold text-slate-900">{item.value}</div>
                                            <div className="text-[9px] text-slate-400 truncate">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
            
                </div>
            </div>

            {/* AI panel (exactly as-is) */}
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
    );
}