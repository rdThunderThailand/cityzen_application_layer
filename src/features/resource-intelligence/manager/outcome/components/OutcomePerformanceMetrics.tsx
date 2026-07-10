import React from 'react';
import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';

const metrics = [
    { name: 'Waste per Guest', value: '0.36 kg', percent: 60, trend: 'down', change: '0.05 (12%)' },
    { name: 'การแยกขยะถูกต้อง', value: '94%', percent: 94, trend: 'up', change: '8%' },
    { name: 'Storage Utilization', value: '72%', percent: 72, trend: 'down', change: '6%' },
    { name: 'Pickup On-time', value: '98%', percent: 98, trend: 'up', change: '5%' },
    { name: 'Food Donation Rate', value: '13.4%', percent: 13.4, trend: 'up', change: '2.4%' },
];

export const OutcomePerformanceMetrics = () => {
    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-0 h-full flex flex-col justify-between overflow-hidden">
            <div className="p-5 pb-0">
                <h3 className="text-[14px] font-bold text-indigo-900 tracking-tight mb-5">ประสิทธิภาพการดำเนินงาน</h3>
                
                <div className="flex text-[9px] font-bold text-slate-400 mb-4 border-b border-slate-50 pb-2">
                    <div className="w-[45%]">ตัวชี้วัด</div>
                    <div className="w-[30%]">ผลลัพธ์</div>
                    <div className="w-[25%] text-right">เทียบกับช่วงก่อน</div>
                </div>

                <div className="flex flex-col gap-4.5 mb-2">
                    {metrics.map((item, index) => (
                        <div key={index} className="flex items-center text-[11px] mb-1">
                            <div className="w-[45%] font-medium text-slate-700 truncate pr-2">
                                {item.name}
                            </div>
                            
                            <div className="w-[30%] flex items-center gap-3">
                                <span className="font-bold text-slate-800 w-10">{item.value}</span>
                                <div className="flex-1 max-w-[60px] h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                    <div 
                                        className="h-full bg-emerald-500 rounded-full" 
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="w-[25%] flex justify-end">
                                <div className={`flex items-center gap-1 font-bold ${
                                    item.trend === 'up' ? 'text-emerald-600' : 'text-emerald-600'
                                }`}>
                                    {item.trend === 'up' ? (
                                        <ArrowUp className="w-2.5 h-2.5" />
                                    ) : (
                                        <ArrowDown className="w-2.5 h-2.5" />
                                    )}
                                    <span className="text-[10px]">{item.change}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full border-t border-slate-100 py-3 mt-4 flex justify-center">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors">
                    <span className="text-[11px] font-bold">ดูรายละเอียด</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
