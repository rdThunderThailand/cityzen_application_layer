import React from 'react';
import { Leaf, Truck, Recycle, Users, Building2, AlertTriangle, ArrowUp } from 'lucide-react';
import { CardMetric } from '@/components/dashboard/CardMetric';

export const OperationKPICards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Card 1 */}
            <CardMetric
                title="Organic Generated (วันนี้)"
                value={524}
                unit="kg"
                icon={Leaf}
                classNameForIcon="bg-emerald-50 text-emerald-500"
                subValue={14}
                subUnit={<span className="text-slate-400 font-normal">% จากเมื่อวาน (460 kg)</span>}
            />

            {/* Card 2 */}
            <CardMetric
                title="Pickup Scheduled (วันนี้)"
                value="14:00"
                unit="น."
                icon={Truck}
                classNameForIcon="bg-emerald-50 text-emerald-500"
                action={
                    <div className="flex flex-col ">
                        <span className="text-[10px] font-semibold text-slate-500">1 รอบ</span>
                        <span className="text-[9px] text-slate-400 truncate">Tou Green Waste Co., Ltd.</span>
                    </div>
                }
            />

            {/* Card 3 */}
            <CardMetric
                title="Generator Active"
                value={24}
                unit="จุด"
                icon={Recycle}
                classNameForIcon="bg-emerald-50 text-emerald-500"
                subUnit={<span className="text-slate-400 font-normal">จากทั้งหมด 28 จุด</span>}
            />

            {/* Card 4 */}
            <CardMetric
                title="Staff on Duty"
                value={18}
                unit="คน"
                icon={Users}
                classNameForIcon="bg-emerald-50 text-emerald-500"
                subUnit={<span className="text-slate-400 font-normal">จากทั้งหมด 22 คน</span>}
            />

            {/* Card 5 */}
            <CardMetric
                title="Storage Utilization"
                value="72%"
                icon={Building2}
                classNameForIcon="bg-emerald-50 text-emerald-500"
                subUnit={<span className="text-emerald-600 font-bold">ปกติ</span>}
            />

            {/* Card 6 */}
            <CardMetric
                title="Incidents"
                value={0}
                icon={AlertTriangle}
                classNameForIcon="bg-rose-50 text-rose-500"
                subUnit={<span className="text-slate-400 font-normal">เหตุการณ์</span>}
            />
        </div>
    );
};
