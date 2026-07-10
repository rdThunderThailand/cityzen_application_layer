import React from 'react';
import { CheckCircle2, Clock, AlertCircle, CheckCheck, TrendingUp } from 'lucide-react';

export const DecisionSummaryMetrics = () => {
    return (
        <div className="w-full flex flex-col mb-8">
            <div className="grid grid-cols-5 gap-3">
                {/* Metric 1 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-[11px] font-semibold text-slate-600">รอพิจารณา</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800 leading-none">4</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">เรื่อง</span>
                </div>

                {/* Metric 2 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-[11px] font-semibold text-slate-600">ใกล้ครบกำหนด</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800 leading-none">1</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">เรื่อง</span>
                </div>

                {/* Metric 3 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-2">
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                        <span className="text-[11px] font-semibold text-slate-600">เกินกำหนด</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800 leading-none">0</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">เรื่อง</span>
                </div>

                {/* Metric 4 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-2">
                        <CheckCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-[11px] font-semibold text-slate-600">อนุมัติแล้ววันนี้</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800 leading-none">2</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">เรื่อง</span>
                </div>

                {/* Metric 5 */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="text-[11px] font-semibold text-slate-600">มูลค่ารวมที่ต้องอนุมัติ</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800 leading-none">38,000</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium">บาท</span>
                </div>
            </div>
        </div>
    );
};
