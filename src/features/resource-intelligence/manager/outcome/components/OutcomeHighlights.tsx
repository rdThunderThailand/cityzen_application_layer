import React from 'react';
import { ArrowRight, Trophy, Medal, Leaf, Star, Target } from 'lucide-react';

export const OutcomeHighlights = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
            
            {/* Highlights Section */}
            <div className="flex-1">
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">ไฮไลต์ความสำเร็จ</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                            <Trophy className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-800 mb-1 leading-tight">ลดปริมาณขยะได้ 12%</span>
                            <span className="text-[8px] text-slate-500 leading-tight">จากมาตรการควบคุมที่สอดคล้อง<br/>และการมีส่วนร่วมของพนักงาน</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                            <Medal className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-800 mb-1 leading-tight">บริจาคอาหารเพิ่มขึ้น 22%</span>
                            <span className="text-[8px] text-slate-500 leading-tight">สร้างคุณค่าทางสังคมและลด<br/>Food Waste อย่างมีประสิทธิภาพ</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center shrink-0">
                            <Leaf className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-800 mb-1 leading-tight">ลดคาร์บอน 2,314 kgCO₂e</span>
                            <span className="text-[8px] text-slate-500 leading-tight">เทียบเท่าการปลูกต้นไม้ 165 ต้น<br/>ช่วยลดโลกร้อนอย่างยั่งยืน</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                            <Star className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-800 mb-1 leading-tight">คะแนนองค์กรเพิ่มขึ้น 6 คะแนน</span>
                            <span className="text-[8px] text-slate-500 leading-tight">สะท้อนการดำเนินงานที่โดดเด่นในทุกมิติ<br/>อย่างต่อเนื่อง</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Next Target Section */}
            <div className="w-full lg:w-[280px] shrink-0">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 relative overflow-hidden h-full">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-100 rounded-full opacity-50 pointer-events-none"></div>
                    
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm z-10 relative">
                        <Target className="w-5 h-5 text-emerald-600" />
                    </div>
                    
                    <div className="flex flex-col z-10 relative">
                        <span className="text-[11px] font-bold text-emerald-800 mb-1">เป้าหมายต่อไป</span>
                        <span className="text-[10px] font-bold text-slate-800 mb-1 leading-tight">
                            ลดปริมาณ Organic Waste เพิ่มอีก 15% ภายในเดือนสิงหาคม 2567
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
