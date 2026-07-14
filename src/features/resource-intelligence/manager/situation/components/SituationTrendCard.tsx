import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '11 ก.ค.', actual: 440, average: 440 },
  { date: '12 ก.ค.', actual: 460, average: 420 },
  { date: '13 ก.ค.', actual: 610, average: 440 },
  { date: '14 ก.ค.', actual: 440, average: 470 },
  { date: '15 ก.ค.', actual: 260, average: 450 },
  { date: '16 ก.ค.', actual: 370, average: 400 },
  { date: '17 ก.ค.', actual: 440, average: 440 },
  { date: '18 ก.ค.', actual: 524, average: 450, forecast: 524 }, // Today
  { date: '19 ก.ค.', forecast: 530, average: 450 },
  { date: '20 ก.ค.', forecast: 550, average: 450 },
  { date: '21 ก.ค.', forecast: 500, average: 450 },
  { date: '22 ก.ค.', forecast: 460, average: 450 },
  { date: '23 ก.ค.', forecast: 470, average: 450 },
  { date: '24 ก.ค.', forecast: 470, average: 450 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-3 text-xs">
        <p className="font-bold text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-6 mb-1">
            <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-slate-600">{entry.name}</span>
            </div>
            <span className="font-semibold text-slate-800">{entry.value} kg</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom dot to render the "วันนี้" (Today) tag exactly as designed
const CustomDot = (props: any) => {
    const { cx, cy, payload, value } = props;
    
    // Do not render dots for missing/future data points
    if (value === undefined || value === null) return null;
    
    // Only render the special tag for Today (18 ก.ค.)
    if (payload.date === '18 ก.ค.') {
        return (
            <g>
                <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#10b981" strokeWidth={2.5} />
                <rect x={cx - 15} y={cy - 25} width={30} height={14} fill="#10b981" rx={3} />
                <text x={cx} y={cy - 16} fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">วันนี้</text>
                <text x={cx} y={cy - 30} fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">{payload.actual}</text>
            </g>
        );
    }
    
    // Default dots for other data points
    return <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="none" />;
};

export const SituationTrendCard = () => {
    return (
        <div className="flex flex-col h-full min-h-[100px] w-full">
            <h3 className="text-sm font-bold text-slate-800 mb-4 text-[#1e293b]">แนวโน้มปริมาณขยะ</h3>
            
            {/* Legend */}
            <div className="flex items-center gap-6 mb-6">
                <span className="text-[10px] text-slate-500 font-semibold">kg</span>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-emerald-500"></div>
                    <span className="text-[10px] text-slate-600">ปริมาณขยะ (kg)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-slate-300"></div>
                    <span className="text-[10px] text-slate-600">ค่าเฉลี่ย 7 วัน (kg)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-blue-400"></div>
                    <span className="text-[10px] text-slate-600">คาดการณ์ (kg)</span>
                </div>
            </div>

            <div className="w-full flex-1 min-h-0 relative -ml-6">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 9, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
                            domain={[0, 800]}
                            ticks={[0, 200, 400, 600, 800]}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }} />
                        
                        <Line 
                            name="ปริมาณขยะ"
                            type="linear" 
                            dataKey="actual" 
                            stroke="#10b981" 
                            strokeWidth={2.5}
                            dot={<CustomDot />}
                            activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                            isAnimationActive={false}
                        />
                        
                        <Line 
                            name="ค่าเฉลี่ย 7 วัน"
                            type="linear" 
                            dataKey="average" 
                            stroke="#cbd5e1" 
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            dot={false}
                            activeDot={false}
                            isAnimationActive={false}
                        />
                        
                        <Line 
                            name="คาดการณ์"
                            type="linear" 
                            dataKey="forecast" 
                            stroke="#60a5fa" 
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={{ r: 3, fill: '#60a5fa', strokeWidth: 0 }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
