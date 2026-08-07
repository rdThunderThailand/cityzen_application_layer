'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { Panel } from '@/features/resource-intelligence/executive/command-center/components/Panel';
import { Gauge, InsightIcon } from './MiniCharts';
import { PROVINCE_TODAY, TOP_SOURCES, PROVINCE_ALERTS } from '@/features/resource-intelligence/executive/command-center/data/province';

function SourceIcon({ sourceKey }: { sourceKey: string }) {
  if (sourceKey === 'hotel') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 21v-6h6v6"></path></svg>;
  }
  if (sourceKey === 'restaurant') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>;
  }
  if (sourceKey === 'market') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v4"></path><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"></path><path d="M2 9h20"></path><path d="M9 21v-6h6v6"></path></svg>;
  }
  if (sourceKey === 'school') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
  }
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
}

function trendText(pct: number) {
  return `${pct >= 0 ? '↑' : '↓'} ${pct >= 0 ? '+' : ''}${pct}%`;
}

export function SidebarLeft() {
  const handleSourcesReport = () => {
    toast('Loading source breakdown report...', { icon: '📊' });
  };
  const handleSeeAllAlerts = () => {
    toast('Loading all alerts & insights...', { icon: '🔔' });
  };

  return (
    <aside className="w-80 flex flex-col gap-4 z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <Panel title="Organic Resource Today" subtitle="ทรัพยากรอินทรีย์วันนี้">
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="text-5xl font-bold text-green-500 leading-none">{PROVINCE_TODAY.totalTons} <span className="text-base text-slate-500 font-medium">ตัน</span></div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-green-500 font-semibold text-sm">{trendText(PROVINCE_TODAY.totalTrendPct)}</span>
            <span className="text-xs text-slate-500">จากเมื่อวาน</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Gauge score={PROVINCE_TODAY.diversionRatePct} color="#22c55e" />
          <div className="flex flex-col gap-0.5 -mt-5">
            <span className="text-[0.7rem] font-bold text-slate-800 tracking-[0.4px]">DIVERSION RATE</span>
            <span className="text-[0.72rem] text-slate-500 mb-1">อัตราการแยกต้นทาง</span>
            <span className="text-green-500 font-semibold text-sm">{trendText(PROVINCE_TODAY.diversionTrendPct)}<span className="text-xs text-slate-500"> จากสัปดาห์ที่แล้ว</span></span>
          </div>
        </div>
      </Panel>

      <Panel title="Top Organic Sources" subtitle="แหล่งกำเนิดอินทรีย์ 5 อันดับ">
        <div className="flex flex-col gap-3">
          {TOP_SOURCES.map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: item.color }}>
                  <SourceIcon sourceKey={item.key} />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-sm font-semibold">{item.tons} ตัน</span>
                <span className="text-sm font-semibold w-10 text-right" style={{ color: item.color }}>{item.pct}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-blue-500 text-[0.78rem] font-medium cursor-pointer mt-3" onClick={handleSourcesReport}>
          ดูรายงานแหล่งกำเนิด →
        </div>
      </Panel>

      <Panel>
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">Alert &amp; Insights</h2>
            <p className="text-xs text-slate-500 mb-4">แจ้งเตือน &amp; ข้อมูลสำคัญ</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {PROVINCE_ALERTS.map((alert, i) => (
            <div key={i} className="flex gap-3 p-3 bg-canvas rounded-lg">
              <InsightIcon type={alert.type} />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold">{alert.title}</span>
                  <span className="text-[0.68rem] text-slate-400 whitespace-nowrap flex-shrink-0">{alert.time}</span>
                </div>
                <span className="text-xs text-slate-500">{alert.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-blue-500 text-[0.78rem] font-medium cursor-pointer mt-3" onClick={handleSeeAllAlerts}>
          ดูทั้งหมด →
        </div>
      </Panel>
    </aside>
  );
}
