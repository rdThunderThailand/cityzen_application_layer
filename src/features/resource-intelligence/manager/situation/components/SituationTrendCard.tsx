import React from 'react';

export const SituationTrendCard = () => {
    return (
        <div className="flex flex-col h-full min-h-[100px] w-full">
            <h3 className="text-sm font-bold text-slate-800 mb-4 text-[#1e293b]">แนวโน้มปริมาณขยะ</h3>
            
            {/* Legend */}
            <div className="flex items-center gap-6 mb-6">
                <span className="text-[10px] text-slate-500 font-semibold">kg</span>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-emerald-600"></div>
                    <span className="text-[10px] text-slate-600">ปริมาณขยะ (kg)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-emerald-300"></div>
                    <span className="text-[10px] text-slate-600">ค่าเฉลี่ย 7 วัน (kg)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-slate-400"></div>
                    <span className="text-[10px] text-slate-600">คาดการณ์ (kg)</span>
                </div>
            </div>

            {/* SVG Chart Area */}
            <div className="w-full flex-1 flex min-h-0">
                {/* Y-axis */}
                <div className="flex flex-col justify-between text-[10px] text-slate-500 pr-4 font-medium pb-[32px]">
                    <span>800</span>
                    <span>600</span>
                    <span>400</span>
                    <span>200</span>
                    <span>0</span>
                </div>

                <div className="flex-1 relative flex flex-col min-w-0">
                    <div className="flex-1 relative w-full">
                        <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                            {/* Grid lines */}
                            {[0, 15, 30, 45, 60].map((y, i) => (
                                <line key={i} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
                            ))}

                            {/* Past Data Line (Solid Green) */}
                            <polyline 
                                points="0,35 7,30 14,35 21,20 28,30 35,45 42,35 49,40 56,25" 
                                fill="none" stroke="#10b981" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" 
                            />
                            {/* Forecast Line (Dashed Slate/Blue) */}
                            <polyline 
                                points="56,25 63,40 70,35 77,38 84,37 91,38 100,38" 
                                fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="1, 1.5" strokeLinecap="round" strokeLinejoin="round" 
                            />
                            
                            {/* Past Data Points */}
                            {[[0,35],[7,30],[14,35],[21,20],[28,30],[35,45],[42,35],[49,40]].map((p, i) => (
                                <circle key={i} cx={p[0]} cy={p[1]} r="1" fill="#10b981" />
                            ))}
                            
                            {/* Forecast Data Points */}
                            {[[63,40],[70,35],[77,38],[84,37],[91,38],[100,38]].map((p, i) => (
                                <circle key={i} cx={p[0]} cy={p[1]} r="0.75" fill="#94a3b8" />
                            ))}

                            {/* Today Point */}
                            <circle cx="56" cy="25" r="1.5" fill="#ffffff" stroke="#10b981" strokeWidth="0.5" />
                        </svg>

                        {/* Today Tooltip Mock */}
                        <div className="absolute" style={{ left: '56%', top: '40%', transform: 'translate(-50%, -100%)', marginTop: '-12px' }}>
                            <div className="flex flex-col items-center">
                                <div className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center justify-center shadow-sm">
                                    วันนี้
                                </div>
                                <span className="text-[10px] font-bold text-slate-700 mt-0.5">524</span>
                            </div>
                        </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="relative w-full h-5 text-[9px] text-slate-500 font-medium mt-3">
                        {['11 ก.ค.','12 ก.ค.','13 ก.ค.','14 ก.ค.','15 ก.ค.','16 ก.ค.','17 ก.ค.','18 ก.ค.','19 ก.ค.','20 ก.ค.','21 ก.ค.','22 ก.ค.','23 ก.ค.','24 ก.ค.'].map((label, i) => (
                            <span key={i} className="absolute top-0 transform -translate-x-1/2 whitespace-nowrap" style={{ left: `${(i / 13) * 100}%` }}>
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
