"use client";

import React from 'react';
import { ChevronDown, ArrowRight, ArrowDown } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const mockData = [
    { name: '1 ก.ค.', current: 400, previous: 450 },
    { name: '3 ก.ค.', current: 300, previous: 400 },
    { name: '5 ก.ค.', current: 500, previous: 550 },
    { name: '7 ก.ค.', current: 400, previous: 420 },
    { name: '9 ก.ค.', current: 350, previous: 480 },
    { name: '11 ก.ค.', current: 550, previous: 600 },
    { name: '13 ก.ค.', current: 450, previous: 500 },
    { name: '15 ก.ค.', current: 600, previous: 700 },
    { name: '17 ก.ค.', current: 480, previous: 550 },
    { name: '18 ก.ค.', current: 514, previous: 584 },
];

export const OutcomeTrendChart = () => {
    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-0 h-full flex flex-col justify-between overflow-hidden">
            <div className="p-4 pb-0">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[14px] font-bold text-indigo-900 tracking-tight">แนวโน้มปริมาณ Organic Waste</h3>
                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer">
                        <span className="text-[11px] text-slate-600 font-medium">รายวัน</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-3 px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                        <span className="text-[11px] font-medium text-slate-700">ช่วงนี้ (1 - 18 ก.ค. 67)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                        <span className="text-[11px] font-medium text-slate-500">ช่วงก่อน (1 - 18 มิ.ย. 67)</span>
                    </div>
                </div>
                
                <div className="relative w-full h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fill: '#64748B', fontWeight: 500 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fill: '#64748B', fontWeight: 500 }}
                                domain={[0, 800]}
                                ticks={[0, 200, 400, 600, 800]}
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="previous" 
                                stroke="#94A3B8" 
                                strokeWidth={2} 
                                strokeDasharray="4 4"
                                fill="none"
                                dot={{ r: 3.5, fill: '#94A3B8', strokeWidth: 0 }}
                                activeDot={{ r: 5 }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="current" 
                                stroke="#10B981" 
                                strokeWidth={2} 
                                fillOpacity={1}
                                fill="url(#colorCurrent)"
                                dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {/* Overlay Stats */}
                    <div className="absolute right-4 top-[22%] bg-white border border-slate-200 rounded-lg shadow-sm px-2.5 py-1.5 flex flex-col items-center">
                        <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-slate-200 rotate-45"></div>
                        <div className="relative z-10 flex flex-col items-center gap-0.5">
                            <span className="text-[10px] text-emerald-700 font-medium tracking-tight">เฉลี่ย <span className="font-bold text-emerald-800">514 kg</span></span>
                            <div className="flex items-center gap-0.5 text-emerald-600">
                                <ArrowDown className="w-3 h-3" />
                                <span className="text-[11px] font-bold">12%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute right-4 top-[55%] bg-white border border-slate-200 rounded-lg shadow-sm px-2.5 py-1.5 flex flex-col items-center">
                        <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l border-b border-slate-200 rotate-45"></div>
                        <div className="relative z-10">
                            <span className="text-[10px] text-slate-600 font-medium tracking-tight">เฉลี่ย <span className="font-bold text-slate-700">584 kg</span></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-4 mb-4 mt-3 bg-[#f4fbf7] rounded-xl p-3 flex items-center justify-between border border-emerald-50">
                <span className="text-[11px] text-emerald-700 font-medium tracking-tight">
                    แนวโน้มลดลงอย่างต่อเนื่อง โดยเฉพาะหลังมาตรการเพิ่มรอบเก็บเวลา 13:00 น.
                </span>
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors shrink-0 pl-2">
                    <span className="text-[11px] font-bold">ดูรายละเอียด</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
