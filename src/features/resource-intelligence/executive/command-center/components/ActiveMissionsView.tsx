'use client';

import React, { useMemo, useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import toast from 'react-hot-toast';
import { Panel } from '@/features/resource-intelligence/executive/command-center/components/Panel';
import { useDashboard } from '@/features/resource-intelligence/executive/command-center/DashboardContext';
import { useVoiceCommands } from '@/features/resource-intelligence/executive/command-center/hooks/useVoiceCommands';
import { Sparkline } from './MiniCharts';
import { MISSIONS, MISSION_KPIS, MISSION_TIMELINE, Mission, MissionIcon, MissionKpiIcon, getMissionStats } from '@/features/resource-intelligence/executive/command-center/data/missions';

function MissionTypeIcon({ type }: { type: MissionIcon }) {
  if (type === 'home') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>;
  }
  if (type === 'store') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 7v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7l-3-5z"></path><line x1="3" y1="7" x2="21" y2="7"></line><path d="M16 11a4 4 0 0 1-8 0"></path></svg>;
  }
  if (type === 'school') {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
  }
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
}

function KpiIcon({ type }: { type: MissionKpiIcon }) {
  if (type === 'leaf') {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>;
  }
  if (type === 'coin') {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
  }
  if (type === 'cloud') {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>;
  }
  if (type === 'piggy') {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="13" rx="8" ry="6"></ellipse><circle cx="16" cy="12" r="1" fill="currentColor"></circle><path d="M12 7V4"></path><path d="M9 19l-1 2"></path><path d="M15 19l1 2"></path><path d="M4 12H2"></path></svg>;
  }
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
}

function StatusIcon({ type }: { type: 'total' | 'inProgress' | 'nearComplete' | 'completed' }) {
  if (type === 'total') {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
  }
  if (type === 'inProgress') {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
  }
  if (type === 'nearComplete') {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>;
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
}

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <div className="flex flex-col gap-3 py-4 border-b border-slate-200 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div className="w-[26px] h-[26px] rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: mission.color }}>{mission.id}</div>
          <div>
            <div className="font-bold text-[0.88rem]">{mission.name}</div>
            <div className="text-[0.74rem] text-slate-500 mt-0.5">{mission.description}</div>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mission.color}22`, color: mission.color }}>
          <MissionTypeIcon type={mission.icon} />
        </div>
      </div>
      <div className="grid grid-cols-[0.8fr_1.1fr_1.3fr] gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-[0.62rem] text-slate-400 uppercase tracking-[0.4px]">Progress</span>
          <span className="text-[1.05rem] font-bold" style={{ color: mission.color }}>{mission.progressPct}%</span>
          <div className="w-full h-1.5 rounded-full bg-canvas overflow-hidden mt-0.5">
            <div className="h-full rounded-full" style={{ width: `${mission.progressPct}%`, backgroundColor: mission.color }}></div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[0.62rem] text-slate-400 uppercase tracking-[0.4px]">Target</span>
          <span className="text-[0.7rem] text-slate-500">{mission.targetLabel}</span>
          <span className="font-bold text-[0.9rem]" style={{ color: mission.color }}>{mission.targetValue}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[0.62rem] text-slate-400 uppercase tracking-[0.4px]">ระยะเวลา</span>
          <span className="text-[0.72rem]">{mission.startDate} - {mission.endDate}</span>
          <span className="text-[0.66rem] text-slate-400">(เหลือ {mission.daysRemaining} วัน)</span>
        </div>
      </div>
    </div>
  );
}

export function ActiveMissionsView() {
  const { setMissionsView } = useDashboard();
  const { listening, startListening, stopListening, lastCommand } = useVoiceCommands();

  const stats = useMemo(() => getMissionStats(MISSIONS), []);
  const waveBars = useState(() => Array.from({ length: 26 }, () => 6 + Math.random() * 20))[0];
  const respondedAt = useState(() => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))[0];

  // Named missionById, not missionMap, to avoid shadowing the imported
  // react-map-gl `Map` component with the built-in Map constructor.
  const missionById = useMemo(
    () => Object.fromEntries(MISSIONS.map(m => [m.id, m])) as Record<number, Mission>,
    [],
  );

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="flex-1 flex gap-6 min-h-0">
        <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 text-[0.8rem] font-semibold text-slate-500 cursor-pointer py-1 hover:text-blue-500" onClick={() => setMissionsView(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            กลับสู่ภาพรวมจังหวัด
          </div>

          <div>
            <h1 className="text-[1.6rem] font-extrabold tracking-[0.3px]">ACTIVE MISSIONS</h1>
            <p className="text-[0.85rem] text-slate-500 mt-0.5">ภารกิจที่กำลังดำเนินการ</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/95 rounded-2xl shadow-md p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#dcfce7', color: '#22c55e' }}><StatusIcon type="total" /></div>
              <div>
                <div className="text-2xl font-bold leading-none">{stats.total}</div>
                <div className="text-xs text-slate-500 mt-1">ภารกิจทั้งหมด</div>
              </div>
            </div>
            <div className="bg-white/95 rounded-2xl shadow-md p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}><StatusIcon type="inProgress" /></div>
              <div>
                <div className="text-2xl font-bold leading-none">{stats.inProgress}</div>
                <div className="text-xs text-slate-500 mt-1">กำลังดำเนินการ</div>
              </div>
            </div>
            <div className="bg-white/95 rounded-2xl shadow-md p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ede9fe', color: '#8b5cf6' }}><StatusIcon type="nearComplete" /></div>
              <div>
                <div className="text-2xl font-bold leading-none">{stats.nearComplete}</div>
                <div className="text-xs text-slate-500 mt-1">ใกล้เสร็จสิ้น</div>
              </div>
            </div>
            <div className="bg-white/95 rounded-2xl shadow-md p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}><StatusIcon type="completed" /></div>
              <div>
                <div className="text-2xl font-bold leading-none">{stats.completed}</div>
                <div className="text-xs text-slate-500 mt-1">เสร็จสิ้นแล้ว</div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[340px] relative rounded-2xl overflow-hidden shadow-md">
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              initialViewState={{ longitude: 98.36, latitude: 7.9, zoom: 10.3 }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/light-v11"
            >
              {MISSIONS.map(mission => (
                <Marker key={mission.id} longitude={mission.lon} latitude={mission.lat} anchor="top">
                  <div
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => toast.success(`${mission.name} — ${mission.progressPct}%`, { icon: '🎯' })}
                  >
                    <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-10 h-10 border-2 rounded-full animate-mission-pulse pointer-events-none" style={{ borderColor: mission.color }}></div>
                    <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[0.85rem] shadow-md z-[2]" style={{ backgroundColor: mission.color }}>{mission.id}</div>
                    <div className="bg-white/97 backdrop-blur-[4px] py-2 px-3 rounded-lg shadow-md mt-2 whitespace-nowrap">
                      <div className="text-[0.78rem] font-bold text-slate-800">{mission.name}</div>
                      <div className="flex items-center gap-2 text-[0.72rem] text-slate-500">
                        <span>{mission.areaLabel}</span>
                        <span style={{ color: mission.color, fontWeight: 700 }}>{mission.progressPct}%</span>
                      </div>
                    </div>
                  </div>
                </Marker>
              ))}
            </Map>
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-[4px] flex flex-col items-center justify-center text-[0.65rem] font-bold text-slate-500 shadow-sm z-[5]">
              <span>N</span>
              <span>↑</span>
            </div>
            <button type="button" className="absolute bottom-4 right-4 bg-white/95 py-2.5 px-[18px] rounded-full shadow-md text-[0.8rem] font-semibold flex items-center gap-2 cursor-pointer z-[5] border-0 text-slate-800 hover:bg-white" onClick={() => setMissionsView(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
              ดูภาพรวมแผนที่
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {MISSION_KPIS.map(kpi => (
              <div key={kpi.key} className="bg-white/95 rounded-2xl shadow-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: kpi.color }}><KpiIcon type={kpi.icon} /></span>
                  <span className="text-[0.72rem] text-slate-500">{kpi.label}</span>
                </div>
                <div className="text-[1.3rem] font-bold mb-1" style={{ color: kpi.color }}>
                  {kpi.value}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={kpi.color} strokeWidth="3"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                </div>
                <Sparkline data={kpi.trend} color={kpi.color} />
              </div>
            ))}
          </div>
        </div>

        <aside className="w-[380px] flex-shrink-0 flex flex-col gap-4 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <Panel>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.5px]">Mission Overview</h2>
                <p className="text-xs text-slate-500">ภาพรวมภารกิจ</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-canvas text-slate-500 flex items-center justify-center cursor-pointer" onClick={() => toast('Loading mission analytics...', { icon: '📊' })}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
            </div>
            <div>
              {MISSIONS.map(mission => <MissionCard key={mission.id} mission={mission} />)}
            </div>
          </Panel>

          <Panel title="Mission Timeline (วันนี้)">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-3.5">
                {MISSION_TIMELINE.filter((_, i) => i % 2 === 0).map((entry, i) => {
                  const mission = missionById[entry.missionId];
                  if (!mission) return null;
                  return (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-[0.7rem] text-slate-400 w-[34px] flex-shrink-0 mt-[3px]">{entry.time}</span>
                      <span className="w-2 h-2 rounded-full mt-[5px] flex-shrink-0" style={{ backgroundColor: mission.color }}></span>
                      <div className="flex flex-col">
                        <span className="text-[0.78rem] font-semibold">{mission.name}</span>
                        <span className="text-[0.7rem] text-slate-500">{entry.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-3.5">
                {MISSION_TIMELINE.filter((_, i) => i % 2 === 1).map((entry, i) => {
                  const mission = missionById[entry.missionId];
                  if (!mission) return null;
                  return (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-[0.7rem] text-slate-400 w-[34px] flex-shrink-0 mt-[3px]">{entry.time}</span>
                      <span className="w-2 h-2 rounded-full mt-[5px] flex-shrink-0" style={{ backgroundColor: mission.color }}></span>
                      <div className="flex flex-col">
                        <span className="text-[0.78rem] font-semibold">{mission.name}</span>
                        <span className="text-[0.7rem] text-slate-500">{entry.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-right text-blue-500 text-[0.78rem] cursor-pointer mt-3" onClick={() => toast('Loading full mission schedule...', { icon: '🗓️' })}>
              ดูตารางงานทั้งหมด →
            </div>
          </Panel>
        </aside>
      </div>

      <div className="bg-white/95 rounded-2xl shadow-md py-3.5 px-6 flex items-center gap-5 flex-shrink-0">
        <div className="w-11 h-11 rounded-full bg-green-100 text-green-500 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        </div>
        <div className="flex flex-col min-w-[150px] flex-shrink-0">
          <span className="font-bold text-[0.85rem]">AI COMMANDER</span>
          <span className="text-[0.7rem] text-slate-500">ผู้ช่วยวิเคราะห์อัจฉริยะ</span>
        </div>

        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <span className="self-start bg-green-100 text-slate-800 py-[5px] px-3 rounded-lg text-[0.76rem]">{lastCommand || 'ผู้ว่าฯ ต้องการดู Active Missions'}</span>
          <div className="flex items-baseline gap-2 text-[0.8rem]">
            <span>นี่คือภารกิจที่กำลังดำเนินการทั้งหมด {stats.total} ภารกิจครับ</span>
            <span className="text-[0.68rem] text-slate-400 flex-shrink-0">{respondedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 h-7 flex-shrink-0">
          {waveBars.map((h, i) => <div key={i} className="w-[3px] bg-green-500 rounded-[2px] opacity-70" style={{ height: `${h}px` }}></div>)}
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className={`w-[34px] h-[34px] rounded-full border-2 border-blue-500 text-blue-500 flex items-center justify-center cursor-pointer ${listening ? 'bg-blue-500 text-white' : ''}`}
            onClick={startListening}
            title="Push to speak a command"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
          </div>
          <span className="text-[0.76rem] text-slate-500 whitespace-nowrap">{listening ? 'กำลังฟังคำสั่ง...' : 'กำลังรับคำสั่ง...'}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-canvas py-2 px-3.5 rounded-full text-[0.78rem] font-semibold cursor-pointer border border-slate-200 flex-shrink-0 text-slate-800 hover:bg-slate-200" onClick={stopListening}>
          ยกเลิก
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
      </div>
    </div>
  );
}
