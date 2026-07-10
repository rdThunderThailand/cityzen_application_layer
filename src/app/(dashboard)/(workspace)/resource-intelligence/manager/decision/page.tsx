"use client";

import React, { useState } from 'react';
import { DecisionSummaryMetrics } from '@/features/resource-intelligence/manager/decision/components/DecisionSummaryMetrics';
import { DecisionList } from '@/features/resource-intelligence/manager/decision/components/DecisionList';
import { DecisionBottomSection } from '@/features/resource-intelligence/manager/decision/components/DecisionBottomSection';
import { DecisionRightSidebar } from '@/features/resource-intelligence/manager/decision/components/DecisionRightSidebar';
import { ChevronDown, ChevronDownIcon, ChevronsRight, Image, Mic, Plus, Settings } from 'lucide-react';
import { AIDropdown } from '@/components/basic/AIDropdown';

export default function DecisionPage() {
    const [activeAI, setActiveAI] = useState<string | null>(null);
    return (
        <div className="w-full h-screen flex relative overflow-hidden bg-slate-50/50">
            <div className="flex-1 px-6 transition-all duration-300 pt-4 h-full flex flex-col min-h-0">
                
                {/* Top Bar */}
                <div className="w-full flex justify-between mb-3 shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[15px] font-bold text-slate-800">เรื่องที่ต้องตัดสินใจวันนี้</h2>
                        <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">4 เรื่อง</span>
                        <p className="text-[11px] text-slate-500 font-medium">กรุณาพิจารณาและอนุมัติ</p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button className="flex items-center gap-2 text-[11px] font-medium text-slate-500 hover:text-slate-700 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                            เรียงตามความสำคัญ
                            <ChevronDownIcon className="w-3.5 h-3.5" />
                        </button>
                        <AIDropdown
                            selectedValue={activeAI}
                            onChange={setActiveAI}
                        />
                    </div>
                </div>

                {/* Summary Metrics */}
                <div className="shrink-0 mb-3">
                    <DecisionSummaryMetrics />
                </div>

                {/* Main Content Area — fills remaining height */}
                <div className="flex gap-4 flex-1 min-h-0 mb-3">
                    <DecisionList />
                    <DecisionRightSidebar />
                </div>

                {/* Decision Bottom Section */}
                <div className="shrink-0 pb-4">
                    <DecisionBottomSection />
                </div>
            </div>

            {/* AI panel slide-out */}
            {activeAI && (
                <div className="w-[380px] shrink-0 border-l-2 border-gray-200 bg-white backdrop-blur-md p-4 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
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
                            <div className="flex items-center gap-3 text-slate-400">
                                <button className="hover:text-slate-600 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button className="hover:text-slate-600 transition-colors">
                                    <Image className="w-4 h-4" />
                                </button>
                            </div>
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
