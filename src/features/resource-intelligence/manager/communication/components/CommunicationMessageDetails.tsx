import React from 'react';
import { Edit2, Copy, Share2, Truck, Leaf, Star } from 'lucide-react';

export interface CommunicationMessageDetailsProps {
    isOpenAIDropdown?: string | null | boolean;
}

export const CommunicationMessageDetails = ({ isOpenAIDropdown }: CommunicationMessageDetailsProps) => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-[15px] font-bold text-slate-800">แจ้งเพิ่มรอบเก็บ Organic Waste</h2>
                   {!isOpenAIDropdown && (<span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-sm">สำคัญ</span>)}
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                    <button className="flex items-center gap-1.5 hover:text-slate-600 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold">แก้ไข</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-slate-600 transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold">คัดลอก</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-slate-600 transition-colors">
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold">แชร์</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-6 text-[12px] text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-800">เรียน ผู้จัดการแผนกครัว และแม่บ้าน</p>
                <p>
                    เนื่องจากปริมาณ Organic Waste วันนี้เพิ่มขึ้น 14% เมื่อเทียบกับค่าเฉลี่ย 
                    จึงขอเพิ่มรอบเก็บเวลา 13:00 น. เพื่อให้การจัดการมีประสิทธิภาพ 
                    และลดความเสี่ยงกลิ่นและการหมักหมมขยะ
                </p>

                <div className="grid grid-cols-3 gap-3 my-2">
                    <div className="border border-emerald-100 bg-emerald-50/30 rounded-lg p-3 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Truck className="w-4 h-4 text-emerald-600" />
                            <span className="text-[10px] text-emerald-700">รอบเก็บเพิ่มเติม</span>
                        </div>
                        <span className="text-[14px] font-bold text-emerald-800">13:00 น.</span>
                        <span className="text-[10px] text-emerald-600 font-medium">วันนี้</span>
                    </div>
                    
                    <div className="border border-slate-100 rounded-lg p-3 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] text-slate-500">รถเก็บขยะ</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-800">Green Waste Co., Ltd.</span>
                        <span className="text-[10px] text-slate-500 font-medium">รถหมายเลข 04</span>
                    </div>

                    <div className="border border-slate-100 rounded-lg p-3 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[10px] text-slate-500">ประเภทขยะ</span>
                        </div>
                        <span className="text-[12px] font-bold text-slate-800">Organic Waste</span>
                        <span className="text-[10px] text-slate-500 font-medium">เท่านั้น</span>
                    </div>
                </div>

                <p>
                    ขอความร่วมมือแยกขยะอินทรีย์ให้ถูกต้อง และแจ้งหากมีปัญหาในการจัดการขยะ
                </p>
                
                <div className="mt-2 text-[10px] text-slate-500">
                    <span className="block mb-0.5">ส่งโดย <span className="font-semibold text-slate-700">คุณสมชาย วงษ์เจริญ</span> (General Manager)</span>
                    <span className="block">18 กรกฎาคม 2567, 08:00 น.</span>
                </div>
            </div>

            <div className="grid grid-cols-4 border-t border-slate-100 pt-5">
                <div className="flex flex-col border-r border-slate-100 items-center justify-center text-center">
                    <span className="text-[10px] font-medium text-slate-500 mb-1">ผู้รับสาร</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[18px] font-bold text-slate-800">24</span>
                        <span className="text-[11px] font-medium text-slate-600">คน</span>
                    </div>
                </div>
                
                <div className="flex flex-col border-r border-slate-100 items-center justify-center text-center">
                    <span className="text-[10px] font-medium text-slate-500 mb-1">เปิดอ่านแล้ว</span>
                    <div className="flex items-baseline gap-1 mb-0.5">
                        <span className="text-[18px] font-bold text-slate-800">20</span>
                        <span className="text-[11px] font-medium text-slate-600">คน</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">83%</span>
                </div>

                <div className="flex flex-col border-r border-slate-100 items-center justify-center text-center">
                    <span className="text-[10px] font-medium text-slate-500 mb-1">การมีส่วนร่วม</span>
                    <div className="flex items-baseline gap-1 mb-0.5">
                        <span className="text-[18px] font-bold text-slate-800">12</span>
                        <span className="text-[11px] font-medium text-slate-600">คน</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">50%</span>
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-medium text-slate-500 mb-2">ความพึงพอใจ</span>
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(i => (
                            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                        <div className="relative w-3.5 h-3.5">
                            <Star className="absolute inset-0 w-3.5 h-3.5 text-slate-200 fill-slate-200" />
                            <div className="absolute inset-0 overflow-hidden w-[60%]">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            </div>
                        </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-800">4.6 / 5</span>
                </div>
            </div>
        </div>
    );
};
