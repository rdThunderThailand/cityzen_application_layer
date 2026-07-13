import React from 'react';
import { ArrowRight, Truck } from 'lucide-react';

const trucksData = [
    { id: 1, name: 'คันที่ 1', plate: '1ฒอ 1234', status: 'กำลังเก็บ', statusColor: 'text-blue-600 bg-blue-50', round: 'รอบที่ 1', driver: 'นายวิชัย', progress: 75, eta: '10:45 น.' },
    { id: 2, name: 'คันที่ 2', plate: '1ฒอ 5678', status: 'กำลังเก็บ', statusColor: 'text-blue-600 bg-blue-50', round: 'รอบที่ 1', driver: 'นายสมชาย', progress: 60, eta: '11:20 น.' },
    { id: 3, name: 'คันที่ 3', plate: '1ฒอ 9012', status: 'รอจัดเก็บ', statusColor: 'text-amber-600 bg-amber-50', round: 'รอบที่ 1', driver: 'นายอนันต์', progress: 0, eta: '14:00 น.' },
    { id: 4, name: 'คันที่ 4', plate: '1ฒอ 3456', status: 'เสร็จสิ้น', statusColor: 'text-emerald-600 bg-emerald-50', round: 'รอบที่ 1', driver: 'นายธนาพล', progress: 100, eta: 'เสร็จสิ้น' },
];

export const OperationTrucksTable = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-bold text-slate-800">รถเก็บขยะ & รอบการเก็บ</h3>
                <button className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                    ดูทั้งหมด
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-[10px] text-left">
                    <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-medium">
                            <th className="pb-3 px-2">รถเก็บขยะ</th>
                            <th className="pb-3 px-2">ทะเบียน</th>
                            <th className="pb-3 px-2">สถานะ</th>
                            <th className="pb-3 px-2">รอบ</th>
                            <th className="pb-3 px-2">คนขับ</th>
                            <th className="pb-3 px-2 min-w-[100px]">ความคืบหน้า</th>
                            <th className="pb-3 px-2 text-right">คาดว่าจะเสร็จ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {trucksData.map((truck) => (
                            <tr key={truck.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 px-2">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="font-semibold text-slate-700">{truck.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-slate-500">{truck.plate}</td>
                                <td className="py-3 px-2">
                                    <span className={`px-2 py-0.5 rounded-full font-bold ${truck.statusColor}`}>
                                        {truck.status}
                                    </span>
                                </td>
                                <td className="py-3 px-2 text-slate-600">{truck.round}</td>
                                <td className="py-3 px-2 text-slate-600">{truck.driver}</td>
                                <td className="py-3 px-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 font-semibold text-slate-700">{truck.progress}%</span>
                                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-emerald-500 rounded-full" 
                                                style={{ width: `${truck.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-right font-medium text-slate-700">{truck.eta}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[11px] font-bold transition-colors">
                    ดูรถและรอบการเก็บทั้งหมด
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
