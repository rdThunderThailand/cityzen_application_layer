import React from 'react';
import { ArrowRight, Utensils, Users } from 'lucide-react';

export const OutcomeSocialImpact = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">ผลลัพธ์ด้านสังคม (Social Impact)</h3>

                <div className="grid grid-cols-2 gap-4 mt-9">

                    {/* Food Donation */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                            <Utensils className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-slate-700 mb-1">อาหารที่บริจาค</span>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-xl font-bold text-slate-800">1,243</span>
                                <span className="text-[11px] font-semibold text-slate-600">Meals</span>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-600">เพิ่มขึ้น 22%</span>
                            <span className="text-[9px] text-slate-400">จากช่วงก่อน</span>
                        </div>
                    </div>

                    {/* Beneficiaries */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-slate-700 mb-1">ผู้ได้รับประโยชน์</span>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-xl font-bold text-slate-800">3,729</span>
                                <span className="text-[11px] font-semibold text-slate-600">คน</span>
                            </div>
                            <span className="text-[9px] font-medium text-slate-500">มูลค่าประมาณ</span>
                            <span className="text-[10px] font-bold text-emerald-600">62,150 บาท</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                    <span className="text-[10px] font-bold">ดูรายละเอียดสังคม</span>
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};
