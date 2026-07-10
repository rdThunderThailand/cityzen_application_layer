import React from 'react';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { wasteTrend7d, wasteTrendSummary } from "../../../../../migration/manager/daily-brief/seed_trend_items";

export const OrganicWasteTrendCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col h-full min-h-[300px]">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">แนวโน้มปริมาณขยะอินทรีย์</h3>
                <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-colors">
                    7 Days <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
            </div>
            
            {/* top part */}
            <div className="flex flex-col gap-3 mb-6 mt-4">
                {wasteTrendSummary.map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs">
                        <span className="w-28 text-slate-600 font-medium">{item.label}</span>
                        <span className="w-14 font-bold text-emerald-600 text-right mr-3">{item.kg} kg</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(item.kg / 800) * 100}%` }} />
                        </div>
                        <div className={`w-14 flex items-center justify-end font-bold text-[11px] ${item.positive === false ? 'text-rose-600' : 'text-slate-400'}`}>
                            {item.deltaText && (
                                <>
                                    {item.deltaText} {item.positive === false && <ArrowUp className="w-3 h-3 ml-0.5" strokeWidth={3} />}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* bottom part - SVG line chart */}
            <div className="mt-auto pt-2">
                <div className="text-[10px] font-semibold text-slate-500 mb-4">ปริมาณขยะ (kg)</div>
                <div className="w-full relative flex h-[120px] mb-8">
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between text-[10px] text-slate-500 pr-3 pb-[1px] font-medium">
                        <span>800</span>
                        <span>600</span>
                        <span>400</span>
                        <span>200</span>
                        <span>0</span>
                    </div>
                    
                    {/* SVG Chart */}
                    <div className="flex-1 relative">
                        <svg viewBox="0 0 100 45" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            
                            {/* Grid lines */}
                            {[10, 18.75, 27.5, 36.25, 45].map((y, i) => (
                                <line key={i} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
                            ))}
                            
                            {(() => {
                                const pts = wasteTrend7d.map((p, idx) => {
                                    const x = (idx / (wasteTrend7d.length - 1)) * 100;
                                    const y = 45 - (p.kg / 800) * 35;
                                    return { x, y, kg: p.kg };
                                });
                                const polylinePoints = pts.map(p => `${p.x},${p.y}`).join(' ');
                                const polygonPoints = `0,45 ${polylinePoints} 100,45`;
                                
                                return (
                                    <>
                                        <polygon points={polygonPoints} fill="url(#trendGradient)" />
                                        <polyline points={polylinePoints} fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        {pts.map((p, i) => (
                                            <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? "2.5" : "2"} fill={i === pts.length - 1 ? "#ffffff" : "#10b981"} stroke={i === pts.length - 1 ? "#10b981" : "none"} strokeWidth={i === pts.length - 1 ? "1.5" : "0"} />
                                        ))}
                                    </>
                                );
                            })()}
                        </svg>
                        
                        {/* X-axis labels */}
                        <div className="absolute top-full left-0 w-full h-6 mt-3">
                            {wasteTrend7d.map((p, idx) => (
                                <span key={idx} className="text-[10px] text-slate-500 font-semibold whitespace-nowrap" style={{ transform: 'translateX(-50%)', left: `${(idx / (wasteTrend7d.length - 1)) * 100}%`, position: 'absolute' }}>
                                    {p.label}
                                </span>
                            ))}
                        </div>

                        {/* Tooltip for last point */}
                        <div 
                            className="absolute bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center justify-center z-10"
                            style={{ 
                                left: '100%', 
                                top: `${((45 - (wasteTrend7d[wasteTrend7d.length - 1].kg / 800) * 35) / 45) * 100}%`,
                                transform: 'translate(-50%, -150%)',
                                marginTop: '-4px'
                            }}
                        >
                            {wasteTrend7d[wasteTrend7d.length - 1].kg}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-emerald-600"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganicWasteTrendCard;
