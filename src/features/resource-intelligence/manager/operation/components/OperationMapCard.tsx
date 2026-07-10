import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Crosshair, ChevronDown } from 'lucide-react';

export const OperationMapCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 h-full">
            <h3 className="text-[13px] font-bold text-slate-800 mb-4">แผนที่การปฏิบัติการ (Real-time)</h3>
            
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-medium text-slate-600">ปกติ</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-[10px] font-medium text-slate-600">รอดำเนินการ</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] font-medium text-slate-600">กำลังเก็บ</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    <span className="text-[10px] font-medium text-slate-600">เสร็จสิ้น</span>
                </div>
            </div>

            <div className="relative w-full aspect-[2/1] bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                {/* Map Image (mockPlan.png) */}
                <Image 
                    src="/mockPlan.png" 
                    alt="Operation Map" 
                    fill 
                    className="object-cover opacity-80"
                />

                {/* Map Controls */}
                <div className="absolute right-3 top-3 flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <button className="p-1.5 hover:bg-slate-50 transition-colors border-b border-slate-100">
                        <Plus className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-50 transition-colors border-b border-slate-100">
                        <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-50 transition-colors">
                        <Crosshair className="w-4 h-4 text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <button className="text-[11px] font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 px-4 py-1.5 rounded-lg transition-colors">
                    ดูแบบเต็มจอ
                </button>
                <button className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    ทั้งหมด
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
