import React from 'react';
import { Check, Truck, User, UserCheck } from 'lucide-react';

export const OperationCollectionProgress = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 h-full">
            <h3 className="text-[13px] font-bold text-slate-800 mb-6">การเก็บขยะวันนี้</h3>
            
            {/* Stepper */}
            <div className="relative flex justify-between mb-8 px-4">
                <div className="absolute top-4 left-8 right-8 h-[2px] bg-slate-100 -z-10"></div>
                <div className="absolute top-4 left-8 w-1/3 h-[2px] bg-emerald-500 -z-10"></div>

                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-sm">
                        <Check className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">วางแผน</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-sm">
                        <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">กำลังดำเนินการ</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white text-slate-300 flex items-center justify-center border-2 border-slate-200">
                        <User className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">เสร็จสิ้น</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white text-slate-300 flex items-center justify-center border-2 border-slate-200">
                        <UserCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">ยืนยัน</span>
                </div>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-700">ความคืบหน้าการเก็บขยะ</span>
                <span className="text-[11px] font-bold text-slate-700">68%</span>
            </div>
            
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }}></div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-medium text-slate-400">ปริมาณที่เก็บแล้ว</span>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-[15px] font-bold text-slate-800">356</span>
                        <span className="text-[9px] font-bold text-slate-600">kg</span>
                    </div>
                </div>
                
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-medium text-slate-400">คงเหลือ</span>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-[15px] font-bold text-slate-800">168</span>
                        <span className="text-[9px] font-bold text-slate-600">kg</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-medium text-slate-400">รอบถัดไป</span>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-[13px] font-bold text-slate-800 mt-0.5">14:00 น.</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-medium text-slate-400">ผู้รับผิดชอบ</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate mt-1">Green Waste Co., Ltd.</span>
                </div>
            </div>
        </div>
    );
};
