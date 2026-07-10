import React from 'react';
import { Settings, CheckCircle2, TrendingUp, AlertTriangle, FileText, UserPlus, Sliders, History } from 'lucide-react';

export const DecisionRightSidebar = () => {
    return (
        <div className="w-[280px] shrink-0 flex flex-col gap-4 overflow-y-auto min-h-0">

            {/* ข้อมูลประกอบการตัดสินใจ */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">ข้อมูลประกอบการตัดสินใจ</h3>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-50 pb-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                                <TrendingUp className="w-3 h-3 text-blue-600" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-600 mt-1">ปริมาณขยะเพิ่มขึ้นต่อเนื่อง 3 วัน</span>
                        </div>
                        <button className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold mt-1 whitespace-nowrap">
                            ดูแนวโน้ม
                        </button>
                    </div>

                    <div className="flex items-start justify-between gap-2 border-b border-slate-50 pb-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                                <FileText className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-600 mt-1">ต้นทุนกำจัดขยะสูงขึ้น 12%</span>
                        </div>
                        <button className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold mt-1 whitespace-nowrap">
                            ดูรายละเอียด
                        </button>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                                <AlertTriangle className="w-3 h-3 text-rose-600" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-600 mt-1">ข้อร้องเรียนเรื่องกลิ่นเพิ่มขึ้น 2 ครั้ง</span>
                        </div>
                        <button className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold mt-1 whitespace-nowrap">
                            ดูรายละเอียด
                        </button>
                    </div>
                </div>
            </div>

            {/* การดำเนินการด่วน */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">การดำเนินการด่วน</h3>
                
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-semibold text-slate-600">สร้างการอนุมัติใหม่</span>
                    </button>
                    
                    <button className="flex flex-col items-center justify-center gap-2 p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                        <UserPlus className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-semibold text-slate-600">มอบหมายงาน</span>
                    </button>
                    
                    <button className="flex flex-col items-center justify-center gap-2 p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                        <Sliders className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-semibold text-slate-600">ตั้งค่าการอนุมัติ</span>
                    </button>
                    
                    <button className="flex flex-col items-center justify-center gap-2 p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                        <History className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-semibold text-slate-600">ประวัติการอนุมัติ</span>
                    </button>
                </div>
            </div>
            
           
        </div>
    );
};
