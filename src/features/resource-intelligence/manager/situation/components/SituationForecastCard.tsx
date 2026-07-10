import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const SituationForecastCard = () => {
    return (
        <div className="bg-slate-50/70 rounded-xl p-5 flex flex-col h-full min-h-[300px] w-full">
            <h3 className="text-sm font-bold text-emerald-700 mb-6">คาดการณ์ล่วงหน้า</h3>
            
            <div className="flex flex-col gap-5 flex-1 mt-2">
                {/* Item 1 */}
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">พรุ่งนี้ (19 ก.ค.)</span>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-800">560 kg</span>
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] font-bold min-w-[36px] justify-center">
                            <ArrowUp className="w-2.5 h-2.5" strokeWidth={3} />
                            7%
                        </div>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">7 วันข้างหน้า (เฉลี่ย)</span>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-800">548 kg</span>
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] font-bold min-w-[36px] justify-center">
                            <ArrowUp className="w-2.5 h-2.5" strokeWidth={3} />
                            5%
                        </div>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">30 วันข้างหน้า (เฉลี่ย)</span>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-800">492 kg</span>
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] font-bold min-w-[36px] justify-center">
                            <ArrowDown className="w-2.5 h-2.5" strokeWidth={3} />
                            2%
                        </div>
                    </div>
                </div>
            </div>

            <button className="mt-auto pt-4 text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                ดูการคาดการณ์ทั้งหมด →
            </button>
        </div>
    );
};
