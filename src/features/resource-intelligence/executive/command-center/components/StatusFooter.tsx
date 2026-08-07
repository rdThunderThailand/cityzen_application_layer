'use client';

import React, { useState } from 'react';

const STATS = [
  {
    key: 'gps',
    label: 'GPS',
    value: '124 คัน',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17h14M5 17a2 2 0 1 0 4 0M5 17a2 2 0 1 1 4 0m6 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0M3 17V9l2-5h14l2 5v8"></path></svg>,
  },
  {
    key: 'bin',
    label: 'Bin',
    value: '532 จุด',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  },
  {
    key: 'sensor',
    label: 'Sensor',
    value: '86 จุด',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h4l2-6 4 12 2-6h8"></path></svg>,
  },
  {
    key: 'factory',
    label: 'โรงงาน',
    value: '6 แห่ง',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 21V9l6 4V9l6 4V9l6 4v8Z"></path><path d="M2 21h20"></path></svg>,
  },
];

function stamp() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function StatusFooter() {
  const [lastUpdated, setLastUpdated] = useState(() => stamp());

  return (
    <div className="bg-white/95 rounded-2xl shadow-md py-3 px-6 flex items-center justify-between gap-4 flex-shrink-0 flex-wrap">
      <div className="flex items-center gap-6 flex-wrap">
        <span className="text-[0.78rem] font-semibold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
          ระบบเชื่อมต่อ
        </span>
        {STATS.map(stat => (
          <span key={stat.key} className="flex items-center gap-1.5 text-[0.78rem] text-slate-500">
            {stat.icon}
            {stat.label} <span className="font-bold text-slate-800">{stat.value}</span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer" onClick={() => setLastUpdated(stamp())} title="Refresh">
          อัพเดตล่าสุด {lastUpdated}
          <svg className="text-slate-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-live-pulse"></span>
          ข้อมูลจากทุกภาคส่วนแบบเรียลไทม์
        </span>
      </div>
    </div>
  );
}
