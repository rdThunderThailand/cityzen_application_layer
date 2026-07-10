import React from 'react';
import { Leaf, Cloud, Bitcoin, Utensils, Star, ArrowDown, ArrowUp } from 'lucide-react';

export const OutcomeKPICards = () => {
    return (
        <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                
                {/* Card 1 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">ปริมาณ Organic Waste</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-bold text-slate-800">9,256</span>
                        <span className="text-[11px] font-semibold text-slate-600">kg</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-emerald-600">
                            <ArrowDown className="w-3 h-3" />
                            <span className="text-[9px] font-bold">ลดลง 12%</span>
                        </div>
                        <span className="text-[8px] text-slate-400">จากช่วง 1 - 18 มิ.ย. 67</span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">
                            <Cloud className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">Carbon Saving</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-bold text-slate-800">2,314</span>
                        <span className="text-[11px] font-semibold text-slate-600">kgCO₂e</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-emerald-600">
                            <ArrowUp className="w-3 h-3" />
                            <span className="text-[9px] font-bold">เพิ่มขึ้น 18%</span>
                        </div>
                        <span className="text-[8px] text-slate-400">จากช่วง 1 - 18 มิ.ย. 67</span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">
                            <Bitcoin className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">ต้นทุนการจัดการ</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-bold text-slate-800">186,540</span>
                        <span className="text-[11px] font-semibold text-slate-600">บาท</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-emerald-600">
                            <ArrowDown className="w-3 h-3" />
                            <span className="text-[9px] font-bold">ลดลง 15%</span>
                        </div>
                        <span className="text-[8px] text-slate-400">จากช่วง 1 - 18 มิ.ย. 67</span>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">
                            <Utensils className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">Food Donation</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-bold text-slate-800">1,243</span>
                        <span className="text-[11px] font-semibold text-slate-600">Meals</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-emerald-600">
                            <ArrowUp className="w-3 h-3" />
                            <span className="text-[9px] font-bold">เพิ่มขึ้น 22%</span>
                        </div>
                        <span className="text-[8px] text-slate-400">จากช่วง 1 - 18 มิ.ย. 67</span>
                    </div>
                </div>

                {/* Card 5 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between relative">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center">
                            <Star className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">Organization Score</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-slate-800">92</span>
                            <span className="text-[11px] font-semibold text-slate-600">/ 100</span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full">ระดับ A</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold text-emerald-600">เพิ่มขึ้น 6 คะแนน</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
