import React from 'react';
import { ChevronDown, Plus, Minus, ArrowRight } from 'lucide-react';

export const HotelMapCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col h-full min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">แผนที่สถานการณ์จุดกำเนิดขยะ</h3>
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                    โซนทั้งหมด <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
            </div>

            {/* Map Container */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                {/* Map Image */}
                <img 
                    src="/mockHotelMap.png" 
                    alt="Hotel Map" 
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Zoom Controls */}
                <div className="absolute top-3 right-3 flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden z-10">
                    <button className="p-1.5 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-100">
                        <Plus className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-50 text-slate-700 transition-colors">
                        <Minus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Footer / Legend */}
            <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
                        <span className="text-[11px] font-semibold text-slate-700">เสี่ยงสูง</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm"></div>
                        <span className="text-[11px] font-semibold text-slate-700">เฝ้าระวัง</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm"></div>
                        <span className="text-[11px] font-semibold text-slate-700">ปกติ</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-sm"></div>
                        <span className="text-[11px] font-semibold text-slate-700">ไม่มีข้อมูล</span>
                    </div>
                </div>
                
                <button className="flex items-center gap-1 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors ml-auto">
                    ดูแบบเต็มจอ <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default HotelMapCard;
