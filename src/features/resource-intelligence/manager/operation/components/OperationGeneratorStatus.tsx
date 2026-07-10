import React from 'react';
import { ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

const generatorData = [
    { id: 1, name: 'Breakfast Buffet', kg: 124, trend: 'up', percent: 31, maxBar: 150 },
    { id: 2, name: 'Kitchen B (Main Kitchen)', kg: 86, trend: 'up', percent: 19, maxBar: 150 },
    { id: 3, name: 'Banquet Hall', kg: 96, trend: 'up', percent: 12, maxBar: 150 },
    { id: 4, name: 'Lobby Lounge', kg: 24, trend: 'down', percent: 5, maxBar: 150 },
    { id: 5, name: 'Staff Canteen', kg: 18, trend: 'down', percent: 8, maxBar: 150 },
];

export const OperationGeneratorStatus = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-3 h-full">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[13px] font-bold text-slate-800">สถานะจุดกำเนิดขยะ (Generator)</h3>
                <button className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                    ดูทั้งหมด
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {generatorData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/2 pr-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                            <span className="text-[11px] font-semibold text-slate-700 truncate">{item.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 w-1/2 justify-end">
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                <div 
                                    className="h-full bg-emerald-500 rounded-full" 
                                    style={{ width: `${(item.kg / item.maxBar) * 100}%` }}
                                />
                            </div>
                            <span className="text-[11px] font-bold text-slate-800 w-10 text-right">{item.kg} kg</span>
                            <div className={`flex items-center gap-0.5 text-[9px] font-bold w-10 justify-end ${item.trend === 'up' ? 'text-rose-500' : 'text-emerald-500'}`}>
                                {item.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {item.percent}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-2">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[11px] font-bold transition-colors">
                    ดูรายละเอียดทั้งหมด
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
