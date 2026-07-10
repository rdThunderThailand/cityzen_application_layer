import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export const CommunicationAISummary = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden flex h-full">
            <div className="p-5 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-emerald-100 text-emerald-600 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                        <span className="text-[10px] font-bold">AI</span>
                    </div>
                    <h3 className="text-[13px] font-bold text-slate-800">สรุป AI</h3>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                    พนักงานส่วนใหญ่ให้ความร่วมมือดี แนะนำตรวจสอบการแยกขยะที่ Buffet Line B 
                    และติดตามผลรอบเก็บเวลา 13:00 น. ในช่วง 3 วันข้างหน้า
                </p>
            </div>
            <div className="w-1/3 relative bg-slate-50 min-h-[120px]">
                <Image 
                    src="/mockPic.png" 
                    alt="AI Summary Illustration" 
                    fill 
                    className="object-cover"
                />
            </div>
        </div>
    );
};
