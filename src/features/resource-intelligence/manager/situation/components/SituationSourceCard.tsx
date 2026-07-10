import React from 'react';

export const SituationSourceCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">สัดส่วนตามแหล่งกำเนิด (วันนี้)</h3>
                <span className="text-xs font-semibold text-slate-500">รวม 524 kg</span>
            </div>
            
            <div className="flex items-center gap-6 mt-4">
                {/* SVG Donut Mock */}
                <div className="relative w-28 h-28 shrink-0 ml-2">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {/* Green 41% */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="148.2" />
                        {/* Blue 27% */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="183.3" className="rotate-[147deg] origin-center" />
                        {/* Orange 16% */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="211" className="rotate-[244deg] origin-center" />
                        {/* Purple 9% */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="228.5" className="rotate-[301deg] origin-center" />
                        {/* Gray 7% */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#cbd5e1" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="233.6" className="rotate-[333deg] origin-center" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-slate-800 leading-none">524</span>
                        <span className="text-[10px] font-semibold text-slate-500">kg</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-slate-700 font-medium truncate max-w-[100px]">อาหารจากไลน์อาหาร</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold">214 kg</span>
                            <span className="text-slate-400 w-6 text-right">(41%)</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-slate-700 font-medium truncate max-w-[100px]">ครัว (เตรียมอาหาร)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold">142 kg</span>
                            <span className="text-slate-400 w-6 text-right">(27%)</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span className="text-slate-700 font-medium truncate max-w-[100px]">ห้องจัดเลี้ยง</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold">84 kg</span>
                            <span className="text-slate-400 w-6 text-right">(16%)</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-slate-700 font-medium truncate max-w-[100px]">ห้องพัก (Room Service)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold">48 kg</span>
                            <span className="text-slate-400 w-6 text-right">(9%)</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            <span className="text-slate-700 font-medium truncate max-w-[100px]">พื้นที่ส่วนกลาง</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-semibold">36 kg</span>
                            <span className="text-slate-400 w-6 text-right">(7%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
