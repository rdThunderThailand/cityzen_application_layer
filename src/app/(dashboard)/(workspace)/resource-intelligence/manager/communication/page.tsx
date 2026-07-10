"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronsRight, Image as ImageIcon, Mic, Plus, Settings, PlusCircle } from 'lucide-react';
import { AIDropdown } from '@/components/basic/AIDropdown';

import { CommunicationKPICards } from '@/features/resource-intelligence/manager/communication/components/CommunicationKPICards';
import { CommunicationTabs } from '@/features/resource-intelligence/manager/communication/components/CommunicationTabs';
import { CommunicationMessageList } from '@/features/resource-intelligence/manager/communication/components/CommunicationMessageList';
import { CommunicationMessageDetails } from '@/features/resource-intelligence/manager/communication/components/CommunicationMessageDetails';
import { CommunicationComments } from '@/features/resource-intelligence/manager/communication/components/CommunicationComments';
import { CommunicationAISummary } from '@/features/resource-intelligence/manager/communication/components/CommunicationAISummary';
import { CommunicationAudience } from '@/features/resource-intelligence/manager/communication/components/CommunicationAudience';
import { CommunicationChannels } from '@/features/resource-intelligence/manager/communication/components/CommunicationChannels';

export default function CommunicationPage() {
    const [activeAI, setActiveAI] = useState<string | null>(null);

    return (
        <div className="w-full flex relative flex-1 min-h-screen bg-slate-50/50">
            <div className="flex-1 px-6 transition-all duration-300 pb-8 pt-6 overflow-x-hidden">
                
                {/* Header Section */}
                <div className="w-full flex justify-between items-center mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">COMMUNICATION</h2>
                            <span className="text-xl font-bold text-slate-600">การสื่อสาร</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 justify-end">
                        <button className="flex items-center gap-1.5 border border-emerald-600 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg text-[11px] font-bold transition-colors">
                            <PlusCircle className="w-3.5 h-3.5" />
                            สร้างการสื่อสารใหม่
                        </button>
                        <AIDropdown
                            selectedValue={activeAI}
                            onChange={setActiveAI}
                        />
                    </div>
                </div>

                {/* KPI Cards */}
                <CommunicationKPICards />

                {/* Tabs */}
                <CommunicationTabs />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    
                    {/* Left Column (Message List & Comments) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <CommunicationMessageList />
                        <CommunicationComments />
                    </div>

                    {/* Right Column (Message Details, Audience/Channels, AI Summary) */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                        
                        {/* Top Section of Right Column */}
                        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
                            <div className="lg:col-span-5">
                                <CommunicationMessageDetails  isOpenAIDropdown={activeAI} />
                            </div>
                            <div className="lg:col-span-3 flex flex-col gap-4">
                                <CommunicationAudience />
                                <CommunicationChannels isOpenAIDropdown={activeAI} />
                            </div>
                        </div>

                        {/* Bottom Section of Right Column */}
                        <CommunicationAISummary />
                        
                    </div>

                </div>
            </div>

            {/* AI panel slide-out */}
            {activeAI && (
                <div className="-z-1 mt-3 w-[380px] shrink-0 border-l-2 border-gray-200 bg-white backdrop-blur-md p-4 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <button className="flex items-center gap-1 rounded-lg bg-slate-600 px-3 py-1.5 text-xs text-white hover:bg-slate-700 transition-colors font-medium">
                            <span>แชทใหม่</span>
                            <ChevronDown className="w-3.5 h-3.5 text-white/80" />
                        </button>
                        <button onClick={() => setActiveAI(null)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1">
                            <ChevronsRight className="w-5 h-5" />
                        </button>
                    </div>

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
                                    <ImageIcon className="w-4 h-4" />
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
