import React from 'react';

export const SituationCauseCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col flex-1">
            <h3 className="text-sm font-bold text-slate-800">สาเหตุหลักที่ทำให้ปริมาณเพิ่มขึ้น</h3>
            
            <div className="flex flex-col gap-3">
                <div className="flex items-center text-[10px] text-slate-400 font-semibold mb-1">
                    <div className="w-6"></div>
                    <div className="flex-1">สาเหตุ</div>
                    <div className="w-16 text-right">ผลกระทบ (kg)</div>
                    <div className="w-12 text-center">แนวโน้ม</div>
                </div>

                {/* Item 1 */}
                <div className="flex items-center text-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px] mr-2">1</div>
                    <div className="flex-1 font-medium text-slate-700 truncate pr-2">ปริมาณแขก Breakfast Buffet เพิ่มขึ้น</div>
                    <div className="w-16 text-right font-bold text-red-500">+68 kg</div>
                    <div className="w-12 ml-2 h-4">
                        <svg viewBox="0 0 40 16" className="w-full h-full overflow-visible">
                            <polyline points="0,12 10,8 20,10 30,2 40,4" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center text-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px] mr-2">2</div>
                    <div className="flex-1 font-medium text-slate-700 truncate pr-2">รายการอาหารเหลือทิ้ง (Buffet Line B)</div>
                    <div className="w-16 text-right font-bold text-red-500">+42 kg</div>
                    <div className="w-12 ml-2 h-4">
                        <svg viewBox="0 0 40 16" className="w-full h-full overflow-visible">
                            <polyline points="0,10 10,12 20,6 30,8 40,2" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center text-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px] mr-2">3</div>
                    <div className="flex-1 font-medium text-slate-700 truncate pr-2">การเตรียมวัตถุดิบเกินความต้องการ</div>
                    <div className="w-16 text-right font-bold text-red-500">+24 kg</div>
                    <div className="w-12 ml-2 h-4">
                        <svg viewBox="0 0 40 16" className="w-full h-full overflow-visible">
                            <polyline points="0,14 10,10 20,12 30,4 40,6" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <button className="mt-auto pt-4 text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                ดูการวิเคราะห์เชิงลึก →
            </button>
        </div>
    );
};
