"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'รีไซเคิล / ทำปุ๋ย', value: 5560, percent: '60%', color: '#10B981' }, // emerald-500
    { name: 'บริจาคอาหาร', value: 1243, percent: '13%', color: '#3B82F6' }, // blue-500
    { name: 'อาหารสัตว์', value: 1389, percent: '15%', color: '#F59E0B' }, // amber-500
    { name: 'ฝังกลบ', value: 1064, percent: '12%', color: '#8B5CF6' }, // violet-500
];

export const OutcomeProportionChart = () => {
    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-0 h-full flex flex-col justify-between overflow-hidden">
            <div className="p-5 pb-0">
                <h3 className="text-[14px] font-bold text-indigo-900 tracking-tight mb-6">สัดส่วนการจัดการ Organic Waste</h3>
                
                <div className="flex items-center gap-4">
                    <div className="w-[140px] h-[140px] shrink-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="#ffffff"
                                    strokeWidth={3}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                                    formatter={(value: number) => [`${value} kg`, 'ปริมาณ']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xl font-bold text-slate-800 leading-none">9,256</span>
                            <span className="text-[10px] font-semibold text-slate-500 mt-1">kg</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                        {data.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div 
                                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-[11px] font-medium text-slate-700">{item.name}</span>
                                </div>
                                <div className="flex items-baseline gap-1.5 text-right">
                                    <span className="text-[10px] text-slate-500">{item.value.toLocaleString()} kg</span>
                                    <span className="text-[10px] font-medium text-slate-400 w-8">({item.percent})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full border-t border-slate-100 py-3 mt-6 flex justify-center">
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors">
                    <span className="text-[11px] font-bold">ดูรายละเอียด</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
