import React from 'react';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { wasteTrend7d, wasteTrendSummary } from "../../../../../migration/manager/daily-brief/seed_trend_items";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const CustomDot = (props: any) => {
    const { cx, cy, payload, index } = props;
    const isLast = index === wasteTrend7d.length - 1;
    
    if (isLast) {
        return (
            <g>
                <circle cx={cx} cy={cy} r={4.5} fill="#fff" stroke="#10b981" strokeWidth={2} />
                <rect x={cx - 16} y={cy - 27} width={32} height={15} fill="#10b981" rx={3} />
                <text x={cx} y={cy - 16} fill="#fff" fontSize="9.5" fontWeight="bold" textAnchor="middle">{payload.kg}</text>
                <polygon points={`${cx-4},${cy-12} ${cx+4},${cy-12} ${cx},${cy-7}`} fill="#10b981" />
            </g>
        );
    }
    
    return <circle cx={cx} cy={cy} r={3.5} fill="#10b981" stroke="none" />;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-3 text-xs">
        <p className="font-bold text-slate-800 mb-2">{label}</p>
        <div className="flex items-center justify-between gap-6 mb-1">
          <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color }}></div>
              <span className="text-slate-600">{payload[0].name}</span>
          </div>
          <span className="font-semibold text-slate-800">{payload[0].value} kg</span>
        </div>
      </div>
    );
  }
  return null;
};

export const OrganicWasteTrendCard = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col h-full min-h-0">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">แนวโน้มปริมาณขยะอินทรีย์</h3>
                <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-colors">
                    7 Days <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
            </div>
            
            {/* top part */}
            <div className="flex flex-col gap-2 mb-2">
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
            
            {/* bottom part - Recharts AreaChart */}
            <div className="flex flex-col">
                <div className="text-[10px] font-semibold text-slate-500 ">ปริมาณขยะ (kg)</div>
                <div className="w-full h-[110px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={wasteTrend7d} margin={{ top: 20, right: 15, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="label" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
                                domain={[0, 800]}
                                ticks={[0, 200, 400, 600, 800]}
                            />
                            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }} />
                            <Area 
                                name="ปริมาณขยะ"
                                type="linear" 
                                dataKey="kg" 
                                stroke="#10b981" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorKg)" 
                                dot={<CustomDot />}
                                activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                                isAnimationActive={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OrganicWasteTrendCard;
