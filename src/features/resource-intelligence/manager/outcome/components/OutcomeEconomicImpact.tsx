import React from 'react';
import { ArrowRight, Bitcoin, TrendingDown, Target } from 'lucide-react';

export const OutcomeEconomicImpact = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">ผลลัพธ์ด้านเศรษฐกิจ</h3>

                <div className="grid grid-cols-3 gap-2 px-5">

                    {/* Management Cost */}
                    <div className="flex flex-col gap-1 pr-2 border-r border-slate-100">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                                <Bitcoin className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-[9px] font-medium text-slate-700 leading-tight">ต้นทุนการจัดการ</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-slate-800">186,540</span>
                        </div>
                        <span className="text-[9px] font-semibold text-slate-500 ">บาท</span>
                        <span className="text-[9px] font-bold text-emerald-600">ลดลง 15%</span>
                        <span className="text-[10px] text-slate-400">จากช่วงก่อน</span>
                    </div>

                    {/* Cost Savings */}
                    <div className="flex flex-col gap-1 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                                <TrendingDown className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-[9px] font-medium text-slate-700 leading-tight">ประหยัดต้นทุน</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-slate-800">32,860</span>
                        </div>
                        <span className="text-[9px] font-semibold text-slate-500 mb-1">บาท</span>
                        <span className="text-[10px] text-slate-400 leading-tight mt-1">จากการลดปริมาณ<br />และลดเที่ยววิ่งส่ง</span>
                    </div>

                    {/* ROI */}
                    <div className="flex flex-col gap-1 pl-2">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                                <Target className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="text-[9px] font-medium text-slate-700 leading-tight">ROI จากโครงการ</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-slate-800">186%</span>
                        </div>
                        <span className='h-4.5'></span>
                        <span className="text-[10px] text-slate-400 leading-tight mt-1">ผลตอบแทน<br/>จากค่าใช้จ่าย</span>
                    </div>

                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                    <span className="text-[10px] font-bold">ดูรายละเอียดเศรษฐกิจ</span>
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};
