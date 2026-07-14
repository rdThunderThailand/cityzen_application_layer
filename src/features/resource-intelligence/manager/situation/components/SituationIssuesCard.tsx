import React from 'react';
import { ChevronDown, AlertTriangle, AlertCircle, Lock, HeartHandshake } from 'lucide-react';

export const SituationIssuesCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col h-full min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">จุดเสี่ยง / ค่าเบี่ยงเบน</h3>
                <button className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium text-slate-600 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-colors">
                    ทั้งหมด <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4 flex-1">
                {/* Item 1 */}
                <div className="flex gap-3 pb-4 border-b border-slate-50">
                    <div className="mt-0.5">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-slate-800">Breakfast Buffet</span>
                            <span className="text-xs font-bold text-red-500">124 kg</span>
                        </div>
                        <span className="text-[10px] text-red-500 font-medium mb-1">ปริมาณสูงกว่าค่าเฉลี่ย 31%</span>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>ค่าเฉลี่ย 7 วัน: 94 kg</span>
                            <span>วันนี้ 07:00</span>
                        </div>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3 pb-4 border-b border-slate-50">
                    <div className="mt-0.5">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-slate-800">Kitchen B (Main Kitchen)</span>
                            <span className="text-xs font-bold text-orange-500">86 kg</span>
                        </div>
                        <span className="text-[10px] text-orange-500 font-medium mb-1">Storage ใกล้เต็ม 85%</span>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>ความจุเหลือ: 15%</span>
                            <span>วันนี้ 07:15</span>
                        </div>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-3 pb-4 border-b border-slate-50">
                    <div className="mt-0.5">
                        <Lock className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-slate-800">Banquet Hall</span>
                            <span className="text-xs font-bold text-amber-500">96 kg</span>
                        </div>
                        <span className="text-[10px] text-slate-600 font-medium mb-1">ปริมาณเพิ่มขึ้นต่อเนื่อง 3 วัน</span>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>ค่าเฉลี่ย 7 วัน: 72 kg</span>
                            <span>วันนี้ 07:30</span>
                        </div>
                    </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-3 pb-4 border-b border-slate-50">
                    <div className="mt-0.5">
                        <HeartHandshake className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-slate-800">Food Donation</span>
                            <span className="text-xs font-bold text-emerald-600">120 Meals</span>
                        </div>
                        <span className="text-[10px] text-slate-600 font-medium mb-1">เตรียมส่งมอบ 120 Meals</span>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>มูลค่าประมาณ 6,000 บาท</span>
                            <span>วันนี้ 08:00</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className="mt-auto pt-2 text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                ดูรายการทั้งหมด →
            </button>
        </div>
    );
};
