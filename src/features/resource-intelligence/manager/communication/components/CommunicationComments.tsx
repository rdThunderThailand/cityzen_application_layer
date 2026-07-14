import React from 'react';
import { ThumbsUp } from 'lucide-react';

export const CommunicationComments = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 mt-[-5px]">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-[13px] font-bold text-slate-800">การมีส่วนร่วม (ความคิดเห็น / คำตอบ)</h3>
                <span className="text-[10px] font-medium text-slate-500">12 ความคิดเห็น</span>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 overflow-hidden relative">
                        {/* Placeholder avatar */}
                        <div className="absolute inset-0 bg-blue-200"></div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[11px] font-bold text-slate-800 mr-2">Somchai K.</span>
                                <span className="text-[10px] text-slate-500">(หัวหน้าแผนกครัว)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-slate-400">18 ก.ค. 2567, 08:12 น.</span>
                                <div className="flex items-center gap-1 text-emerald-600">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span className="text-[9px] font-bold">3</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-700">รับทราบครับ จะเตรียมขยะให้พร้อมก่อนเวลา 13:00 น.</p>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-rose-100 shrink-0 overflow-hidden relative">
                        {/* Placeholder avatar */}
                        <div className="absolute inset-0 bg-rose-200"></div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[11px] font-bold text-slate-800 mr-2">Nattaya P.</span>
                                <span className="text-[10px] text-slate-500">(แม่บ้าน)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-slate-400">18 ก.ค. 2567, 08:15 น.</span>
                                <div className="flex items-center gap-1 text-emerald-600">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span className="text-[9px] font-bold">2</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-700">ยินดีให้ความร่วมมือค่ะ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
