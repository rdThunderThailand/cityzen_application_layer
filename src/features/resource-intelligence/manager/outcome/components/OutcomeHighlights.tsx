import React from 'react';
import { ArrowRight, Trophy, Medal, Leaf, Star, Target } from 'lucide-react';

export const OutcomeHighlights = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-3 h-full">

            {/* Highlights Section */}
            <div className="flex-1 bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-center min-w-0">
                <h3 className="text-[12px] font-bold text-slate-800 mb-2.5">ไฮไลต์ความสำเร็จ</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                            <Trophy className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-bold text-slate-800 leading-tight truncate">ลดปริมาณขยะได้ 12%</span>
                            <span className="text-[9px] text-slate-500 leading-tight truncate">จากมาตรการควบคุมที่สอดคล้อง</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                            <Medal className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-bold text-slate-800 leading-tight truncate">บริจาคอาหารเพิ่มขึ้น 22%</span>
                            <span className="text-[9px] text-slate-500 leading-tight truncate">สร้างคุณค่าทางสังคมและลด</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center shrink-0">
                            <Leaf className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-bold text-slate-800 leading-tight truncate">ลดคาร์บอน 2,314 kgCO₂e</span>
                            <span className="text-[9px] text-slate-500 leading-tight truncate">เทียบเท่าการปลูกต้นไม้ 165 ต้น</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                            <Star className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-bold text-slate-800 leading-tight truncate">คะแนนองค์กรเพิ่มขึ้น 6 คะแนน</span>
                            <span className="text-[9px] text-slate-500 leading-tight truncate">สะท้อนการดำเนินงานที่โดดเด่น</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Next Target Section */}
            <div className="w-full lg:w-[280px] shrink-0">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex items-start gap-3 relative overflow-hidden h-full">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-100 rounded-full opacity-50 pointer-events-none"></div>

                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm z-10 relative">
                        <Target className="w-4 h-4 text-emerald-600" />
                    </div>

                    <div className="flex flex-col z-10 relative min-w-0">
                        <span className="text-[11px] font-bold text-emerald-800 mb-0.5">เป้าหมายต่อไป</span>
                        <span className="text-[10px] font-bold text-slate-800 leading-tight truncate">
                            ลดปริมาณ Organic Waste เพิ่มอีก 15%
                        </span>
                        <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors mt-1">
                            <span className="text-[10px] font-bold">ดูแผนงาน</span>
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};
