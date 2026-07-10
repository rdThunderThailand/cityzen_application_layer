import React from 'react';
import { ChevronDown, Maximize2, Info, Plus, Minus } from 'lucide-react';

export const SituationMapCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col h-full min-h-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-800">แผนที่แสดงแหล่งกำเนิดขยะ (โซนภายในโรงแรม)</h3>
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-colors">
                        โซนทั้งหมด <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600 border border-slate-200 rounded bg-white shadow-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 gap-4 h-[300px]">
                {/* Left Legend */}
                <div className="w-[120px] shrink-0 flex flex-col gap-2 border-r border-slate-100 pr-2">
                    <div className="text-[10px] font-bold text-slate-500 mb-1">ระดับปริมาณขยะ</div>
                    
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm"></div>
                        <span className="text-[11px] font-medium text-slate-700">สูงมาก</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm"></div>
                        <span className="text-[11px] font-medium text-slate-700">สูง</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm"></div>
                        <span className="text-[11px] font-medium text-slate-700">ปานกลาง</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></div>
                        <span className="text-[11px] font-medium text-slate-700">ต่ำ</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-sm"></div>
                        <span className="text-[11px] font-medium text-slate-700">ไม่มีข้อมูล</span>
                    </div>

                    <button className="mt-auto text-[10px] font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                        ดูข้อมูลรายโซนทั้งหมด →
                    </button>
                </div>

                {/* Map Area */}
                <div className="relative flex-1 rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
                    <img 
                        src="/mockHotelMap.png" 
                        alt="Hotel Map" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Zoom Controls */}
                    <div className="absolute top-2 right-2 flex flex-col bg-white rounded shadow-sm border border-slate-200 overflow-hidden z-10">
                        <button className="p-1 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-100">
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 hover:bg-slate-50 text-slate-700 transition-colors">
                            <Minus className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Map Labels Mock */}
                    {/* Breakfast Buffet */}
                    <div className="absolute top-[20%] left-[45%] flex flex-col items-center bg-white/90 backdrop-blur-sm p-1.5 rounded shadow-sm border border-slate-100/50">
                        <span className="text-[9px] font-bold text-slate-800 leading-tight">Breakfast Buffet</span>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-900">124 kg</span>
                            <span className="text-[9px] font-bold text-red-500">↑ 31%</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-red-600 mt-1 shadow border border-white"></div>
                    </div>

                    {/* Kitchen B */}
                    <div className="absolute top-[40%] left-[25%] flex flex-col items-center bg-white/90 backdrop-blur-sm p-1.5 rounded shadow-sm border border-slate-100/50">
                        <span className="text-[9px] font-bold text-slate-800 leading-tight">Kitchen B</span>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-900">86 kg</span>
                            <span className="text-[9px] font-bold text-orange-500">↑ 18%</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1 shadow border border-white"></div>
                    </div>
                    
                    {/* Banquet Hall */}
                    <div className="absolute top-[50%] left-[65%] flex flex-col items-center bg-white/90 backdrop-blur-sm p-1.5 rounded shadow-sm border border-slate-100/50">
                        <span className="text-[9px] font-bold text-slate-800 leading-tight">Banquet Hall</span>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-900">96 kg</span>
                            <span className="text-[9px] font-bold text-orange-500">↑ 12%</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1 shadow border border-white"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
