import React from 'react';
import { Leaf, Truck, Recycle, Users, Building2, AlertTriangle, ArrowUp } from 'lucide-react';

export const OperationKPICards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Card 1 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-700">Organic Generated (วันนี้)</span>
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">524</span>
                        <span className="text-[11px] font-semibold text-slate-600">kg</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded text-[10px] font-bold">
                        <ArrowUp className="w-3 h-3" strokeWidth={3} />
                        14%
                    </div>
                    <span className="text-[9px] text-slate-400">จากเมื่อวาน (460 kg)</span>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-700">Pickup Scheduled (วันนี้)</span>
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">14:00</span>
                        <span className="text-[11px] font-semibold text-slate-600">น.</span>
                    </div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-medium text-slate-500">1 รอบ</span>
                    <span className="text-[9px] text-slate-400 truncate">Tou Green Waste Co., Ltd.</span>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <Recycle className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-700">Generator Active</span>
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">24</span>
                        <span className="text-[11px] font-semibold text-slate-600">จุด</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-[10px] text-slate-400">จากทั้งหมด 28 จุด</span>
                </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-700">Staff on Duty</span>
                </div>
                <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">18</span>
                        <span className="text-[11px] font-semibold text-slate-600">คน</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-[10px] text-slate-400">จากทั้งหมด 22 คน</span>
                </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-700">Storage Utilization</span>
                </div>
                <div className="mb-2">
                    <span className="text-2xl font-bold text-slate-800">72%</span>
                </div>
                <div className="flex items-center">
                    <span className="text-[10px] text-emerald-600 font-bold">ปกติ</span>
                </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span className="text-[10px] font-bold text-slate-700">Incidents</span>
                </div>
                <div className="mb-2">
                    <span className="text-2xl font-bold text-slate-800">0</span>
                </div>
                <div className="flex items-center">
                    <span className="text-[10px] text-slate-400 font-medium">เหตุการณ์</span>
                </div>
            </div>
        </div>
    );
};
