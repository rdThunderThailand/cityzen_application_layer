import React from 'react';
import { CheckCircle2, Clock, AlertCircle, CheckCheck, TrendingUp } from 'lucide-react';
import { CardMetric } from '@/components/dashboard/CardMetric';

export const DecisionSummaryMetrics = () => {
    return (
        <div className="w-full flex flex-col">
            <div className="grid grid-cols-5 gap-3">
                <CardMetric
                    title="รอพิจารณา"
                    value={4}
                    icon={CheckCircle2}
                    classNameForIcon="bg-emerald-50 text-emerald-500"
                    subUnit={<span className="text-slate-400 font-normal">เรื่อง</span>}
                />

                <CardMetric
                    title="ใกล้ครบกำหนด"
                    value={1}
                    icon={Clock}
                    classNameForIcon="bg-amber-50 text-amber-500"
                    subUnit={<span className="text-slate-400 font-normal">เรื่อง</span>}
                />

                <CardMetric
                    title="เกินกำหนด"
                    value={0}
                    icon={AlertCircle}
                    classNameForIcon="bg-rose-50 text-rose-500"
                    subUnit={<span className="text-slate-400 font-normal">เรื่อง</span>}
                />

                <CardMetric
                    title="อนุมัติแล้ววันนี้"
                    value={2}
                    icon={CheckCheck}
                    classNameForIcon="bg-blue-50 text-blue-500"
                    subUnit={<span className="text-slate-400 font-normal">เรื่อง</span>}
                />

                <CardMetric
                    title="มูลค่ารวมที่ต้องอนุมัติ"
                    value="38,000"
                    icon={TrendingUp}
                    classNameForIcon="bg-purple-50 text-purple-500"
                    subUnit={<span className="text-slate-400 font-normal">บาท</span>}
                />
            </div>
        </div>
    );
};
