import React from 'react';
import { ArrowRight, TreePine, Droplet, Zap, ArrowUp } from 'lucide-react';

export const OutcomeEnvironmentalImpact = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-[13px] font-bold text-slate-800 mb-6">ผลลัพธ์ด้านสิ่งแวดล้อม</h3>
                
                <div className="grid grid-cols-4 gap-2">
                    
                    {/* Carbon Saving */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center mb-2">
                            <TreePine className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[9px] font-medium text-slate-500 mb-1 leading-tight h-6">Carbon Saving</span>
                        <span className="text-[14px] font-bold text-slate-800">2,314</span>
                        <span className="text-[8px] font-semibold text-slate-500 mb-1">kgCO₂e</span>
                        <div className="flex items-center gap-0.5 text-emerald-600">
                            <ArrowUp className="w-2.5 h-2.5" />
                            <span className="text-[9px] font-bold">18%</span>
                        </div>
                    </div>

                    {/* Trees */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center mb-2">
                            <TreePine className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[9px] font-medium text-slate-500 mb-1 leading-tight h-6">เทียบเท่าการปลูกต้นไม้</span>
                        <span className="text-[14px] font-bold text-slate-800">165</span>
                        <span className="text-[8px] font-semibold text-slate-500 mb-1">ต้น</span>
                        <span className="text-[9px] text-slate-600 font-medium">ใน 18 วัน</span>
                    </div>

                    {/* Water */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center mb-2">
                            <Droplet className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="text-[9px] font-medium text-slate-500 mb-1 leading-tight h-6">น้ำที่ประหยัดได้</span>
                        <span className="text-[14px] font-bold text-slate-800">185,120</span>
                        <span className="text-[8px] font-semibold text-slate-500 mb-1">ลิตร</span>
                        <div className="flex items-center gap-0.5 text-emerald-600">
                            <ArrowUp className="w-2.5 h-2.5" />
                            <span className="text-[9px] font-bold">14%</span>
                        </div>
                    </div>

                    {/* Energy */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center mb-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="text-[9px] font-medium text-slate-500 mb-1 leading-tight h-6">พลังงานที่ประหยัดได้</span>
                        <span className="text-[14px] font-bold text-slate-800">2,845</span>
                        <span className="text-[8px] font-semibold text-slate-500 mb-1">kWh</span>
                        <div className="flex items-center gap-0.5 text-emerald-600">
                            <ArrowUp className="w-2.5 h-2.5" />
                            <span className="text-[9px] font-bold">11%</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                    <span className="text-[10px] font-bold">ดูรายละเอียดสิ่งแวดล้อม</span>
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};
