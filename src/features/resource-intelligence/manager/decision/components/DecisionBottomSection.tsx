import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const DecisionBottomSection = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Latest Decisions */}
            <div className="flex-[2] bg-white border border-slate-100 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[13px] font-bold text-slate-800">การตัดสินใจล่าสุด</h3>
                    <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        ดูทั้งหมด
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-4 text-[10px] text-slate-400 font-medium mb-3">
                    <div className="col-span-5">เรื่อง</div>
                    <div className="col-span-2">สถานะ</div>
                    <div className="col-span-3">ผู้ตัดสินใจ</div>
                    <div className="col-span-2">เมื่อเวลา</div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-12 gap-4 items-center border-b border-slate-50 pb-3">
                        <div className="col-span-5 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-[11px] font-semibold text-slate-700">อนุมัติ Food Donation สัปดาห์ที่แล้ว</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-[10px] font-bold text-emerald-600">อนุมัติแล้ว</span>
                        </div>
                        <div className="col-span-3">
                            <span className="text-[11px] text-slate-600">คุณสมชาย วงษ์เจริญ</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-[10px] text-slate-500">17 ก.ค. 67, 09:15</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-[11px] font-semibold text-slate-700">อนุมัติจัดซื้อถังขยะรีไซเคิลเพิ่ม 5 ใบ</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-[10px] font-bold text-emerald-600">อนุมัติแล้ว</span>
                        </div>
                        <div className="col-span-3">
                            <span className="text-[11px] text-slate-600">คุณสมชาย วงษ์เจริญ</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-[10px] text-slate-500">16 ก.ค. 67, 14:20</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* Budget Section */}
            <div className="flex-1 bg-white border border-slate-100 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-bold text-slate-800">วงเงินที่สามารถอนุมัติได้</h3>
                    <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        ดูรายละเอียด
                    </button>
                </div>
                
                <div className="flex items-center justify-between h-full pt-4">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-slate-500 mb-1">วงเงินคงเหลือ</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-slate-800">152,000</span>
                            <span className="text-[12px] font-medium text-slate-500">บาท</span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">จาก 200,000 บาท</span>
                    </div>

                    <div className="relative w-20 h-20 mr-4">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                            <circle 
                                cx="50" cy="50" r="40" fill="transparent" 
                                stroke="#10b981" strokeWidth="8" 
                                strokeDasharray={`${251 * 0.76} 251`} 
                                strokeLinecap="round" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[15px] font-bold text-slate-700">76%</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};
