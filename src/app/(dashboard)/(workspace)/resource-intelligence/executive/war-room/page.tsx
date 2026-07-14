"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronsRight, Settings, Plus, Image, Mic } from "lucide-react";
import { cn } from "@/utils/cn";
import { AIDropdown } from "@/components/basic/AIDropdown";
import CardData from "@/components/dashboard/CardData";
import { CardMetric } from "@/components/dashboard/CardMetric";
import CardWMap from "@/components/dashboard/CardWMap";
import CardDataHorizontal from "@/components/dashboard/cardDataHorizontal";
import CardDataMedia from "@/components/dashboard/cardDataMedia";
import { warRoomOverviewStats } from "../../../../../../../migration/executive/war-room/seed_overview";
import { warRoomIncidentData } from "../../../../../../../migration/executive/war-room/seed_incidents";
import { warRoomMissionData } from "../../../../../../../migration/executive/war-room/seed_missions";
import { warRoomResourceData } from "../../../../../../../migration/executive/war-room/seed_resources";
import { warRoomCctvData } from "../../../../../../../migration/executive/war-room/seed_cctv";
import { warRoomAppointmentData } from "../../../../../../../migration/executive/war-room/seed_appointments";
import { warRoomAgencyData } from "../../../../../../../migration/executive/war-room/seed_agencies";
import { warRoomUrgentOrderData } from "../../../../../../../migration/executive/war-room/seed_urgent_orders";

export default function WarRoom() {
    const [activeAI, setActiveAI] = useState<string | null>(null);

    return (
        <div className="w-full flex relative flex-1">
            <div className="flex-1 px-6 transition-all duration-300 pb-4">
                {/* AI dropdown */}
                <div className="w-full flex justify-end mt-4">
                    <AIDropdown
                        selectedValue={activeAI}
                        onChange={setActiveAI}
                    />
                </div>

                {/* Overview stat cards */}
                <div className="flex gap-4 mt-3">
                    {warRoomOverviewStats.map((stat, index) => (
                        <CardMetric
                            key={index}
                            {...stat}
                            showChevron
                            className={cn(stat.className, "flex-1 bg-white hover:shadow-md transition-shadow duration-200")}
                        />
                    ))}
                </div>

                {/* Map + Incidents + Missions row */}
                <div className="flex flex-col lg:flex-row gap-4 mt-4 items-stretch">
                    <CardWMap
                        className="flex-1 min-w-0 max-w-none"
                        title="แผนที่สถานการณ์แบบเรียลไทม์"
                        legendTitle="ประเภทเหตุการณ์"
                    />

                    <CardData
                        heading={warRoomIncidentData.heading}
                        allDataHref={warRoomIncidentData.allDataHref}
                        variant={warRoomIncidentData.variant}
                        items={warRoomIncidentData.items}
                        maxItems={warRoomIncidentData.maxItems}
                        className="w-full lg:w-[380px] shrink-0"
                    />

                    {/* Missions with progress bars — no existing component supports progress bars, so composed inline */}
                    <div className="w-full lg:w-[360px] shrink-0 flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                            <h3 className="text-sm font-semibold text-slate-800 truncate">{warRoomMissionData.heading}</h3>
                            <a
                                href={warRoomMissionData.allDataHref}
                                className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                            >
                                ดูทั้งหมด
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            {warRoomMissionData.items.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 bg-slate-50 text-slate-600 rounded-lg shrink-0">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <span className="text-xs font-semibold text-slate-800 truncate">{item.title}</span>
                                                <span className="text-xs font-semibold text-slate-600 shrink-0">{item.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full rounded-full", item.barColorClass)}
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-slate-400 shrink-0">{item.completed}/{item.total} การกิจ</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Resources + CCTV row */}
                <div className="flex flex-col lg:flex-row gap-4 mt-4 items-stretch">
                    <CardDataHorizontal
                        heading={warRoomResourceData.heading}
                        allDataHref={warRoomResourceData.allDataHref}
                        items={warRoomResourceData.items}
                        className="flex-1 min-w-0"
                    />
                    <CardDataMedia
                        heading={warRoomCctvData.heading}
                        allDataHref={warRoomCctvData.allDataHref}
                        items={warRoomCctvData.items}
                        maxItems={4}
                        className="w-full lg:w-[560px] shrink-0"
                    />
                </div>

                {/* Appointments + Agencies + Urgent orders row */}
                <div className="flex flex-col lg:flex-row gap-4 mt-4 items-stretch">
                    <CardData
                        heading={warRoomAppointmentData.heading}
                        allDataHref={warRoomAppointmentData.allDataHref}
                        variant={warRoomAppointmentData.variant}
                        items={warRoomAppointmentData.items}
                        className="flex-1 min-w-0"
                    />
                    <CardDataHorizontal
                        heading={warRoomAgencyData.heading}
                        allDataHref={warRoomAgencyData.allDataHref}
                        items={warRoomAgencyData.items}
                        className="w-full lg:w-[340px] shrink-0"
                    />
                    <CardData
                        heading={warRoomUrgentOrderData.heading}
                        allDataHref={warRoomUrgentOrderData.allDataHref}
                        variant={warRoomUrgentOrderData.variant}
                        items={warRoomUrgentOrderData.items}
                        className="w-full lg:w-[340px] shrink-0"
                    />
                </div>
            </div>

            {/* AI panel */}
            {activeAI && (
                <div className="-z-1 mt-3 w-[380px] shrink-0 border-l-2 border-gray-200 bg-white backdrop-blur-md p-4 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
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
