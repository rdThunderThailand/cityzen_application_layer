import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CommunicationAudience = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 flex flex-col justify-between flex-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-[13px] font-bold text-slate-800">กลุ่มเป้าหมาย</h3>
                <span className="text-[10px] font-medium text-slate-500">3 กลุ่ม</span>
            </div>

            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[11px] font-semibold text-slate-700">แผนกครัว (Kitchen)</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-500 w-8 text-right">8 คน</span>
                        <div className="flex items-center gap-1.5 w-20 justify-end">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[9px] font-bold text-emerald-600">เปิดอ่าน 100%</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[11px] font-semibold text-slate-700">แม่บ้าน (Housekeeping)</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-500 w-8 text-right">10 คน</span>
                        <div className="flex items-center gap-1.5 w-20 justify-end">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[9px] font-bold text-emerald-600">เปิดอ่าน 80%</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[11px] font-semibold text-slate-700">ผู้จัดการแผนก (Department Manager)</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-500 w-8 text-right">6 คน</span>
                        <div className="flex items-center gap-1.5 w-20 justify-end">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[9px] font-bold text-emerald-600">เปิดอ่าน 67%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-2 border-t border-slate-50 pt-4">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[11px] font-bold transition-colors">
                    ดูรายละเอียดกลุ่มเป้าหมาย
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
