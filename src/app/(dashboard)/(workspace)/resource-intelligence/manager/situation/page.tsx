'use client'

import React, { useState } from 'react';
import { Sprout, BarChart3, UsersRound, PieChart, AlertTriangle } from 'lucide-react';
import { SituationMapCard } from '@/features/resource-intelligence/manager/situation/components/SituationMapCard';
import { SituationSourceCard } from '@/features/resource-intelligence/manager/situation/components/SituationSourceCard';
import { SituationIssuesCard } from '@/features/resource-intelligence/manager/situation/components/SituationIssuesCard';
import { SituationCauseCard } from '@/features/resource-intelligence/manager/situation/components/SituationCauseCard';
import { SituationTrendCard } from '@/features/resource-intelligence/manager/situation/components/SituationTrendCard';
import { SituationForecastCard } from '@/features/resource-intelligence/manager/situation/components/SituationForecastCard';
import { ManagerFilterBar } from '@/features/resource-intelligence/manager/components/ManagerFilterBar';

export default function Situation() {
    const [activeTab, setActiveTab] = useState('ภาพรวมสถานการณ์');
    const [activeAI, setActiveAI] = useState<string | null>(null);
    const tabs = ['ภาพรวมสถานการณ์', 'แหล่งกำเนิดขยะ', 'แนวโน้มและการคาดการณ์', 'พื้นที่และจุดเสี่ยง', 'สาเหตุหลัก', 'เปรียบเทียบช่วงเวลา'];

    return (
        <div className="w-full h-screen flex flex-col px-6 overflow-hidden bg-slate-50/50">
            <ManagerFilterBar activeAI={activeAI} onAIChange={setActiveAI} />
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4 mb-3 shrink-0">
                <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-600 mb-1.5 text-xs font-medium">
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        Organic Generated (วันนี้)
                    </div>
                    <div className="text-xl font-bold text-slate-800 mb-0.5">524 kg</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">↑ 14% <span className="text-slate-400 font-normal">จากเมื่อวาน (460 kg)</span></div>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-600 mb-1.5 text-xs font-medium">
                        <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                        เฉลี่ย 7 วัน
                    </div>
                    <div className="text-xl font-bold text-slate-800 mb-0.5">489 kg</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">↑ 9% <span className="text-slate-400 font-normal">จากค่าเฉลี่ย 7 วัน</span></div>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-600 mb-1.5 text-xs font-medium">
                        <UsersRound className="w-3.5 h-3.5 text-blue-500" />
                        Waste per Guest (7 วัน)
                    </div>
                    <div className="text-xl font-bold text-slate-800 mb-0.5">0.36 kg</div>
                    <div className="text-[10px] text-slate-500 font-semibold">↓ -0.05 <span className="text-slate-400 font-normal">จากค่าเฉลี่ย 7 วัน</span></div>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-slate-600 mb-1.5 text-xs font-medium">
                        <PieChart className="w-3.5 h-3.5 text-emerald-600" />
                        สัดส่วนตามแหล่งกำเนิด (วันนี้)
                    </div>
                    <button className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 text-left flex items-center gap-1">
                        ดูรายละเอียดด้านล่าง →
                    </button>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-slate-600 mb-1.5 text-xs font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                        ประเด็นที่ต้องสนใจ
                    </div>
                    <div className="text-xl font-bold text-slate-800">3 <span className="text-sm font-medium text-slate-600">เรื่อง</span></div>
                    <button className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 text-left flex items-center gap-1">
                        ดูรายละเอียด →
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-200 mb-3 px-2 shrink-0">
                {tabs.map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2.5 text-xs font-semibold transition-colors relative ${
                            activeTab === tab ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Grid Content - fills remaining height */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0 pb-4">
                {/* Left Col - Map (5 cols) */}
                <div className="lg:col-span-5 flex flex-col min-h-0">
                    <SituationMapCard />
                </div>
                
                {/* Middle Col - Sources & Causes (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-3 min-h-0">
                    <SituationSourceCard />
                    <SituationCauseCard />
                </div>
                
                {/* Right Col - Issues (3 cols) */}
                <div className="lg:col-span-3 flex flex-col min-h-0">
                    <SituationIssuesCard />
                </div>

                {/* Bottom Row - Trend & Forecast */}
                <div className="lg:col-span-12 bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col lg:flex-row gap-4 shrink-0 h-[200px]">
                    <div className="flex-1 min-w-0">
                        <SituationTrendCard />
                    </div>
                    <div className="w-full lg:w-[280px] shrink-0">
                        <SituationForecastCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
