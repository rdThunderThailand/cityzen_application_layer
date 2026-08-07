'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Panel } from '@/features/resource-intelligence/executive/command-center/components/Panel';
import { useDashboard } from '@/features/resource-intelligence/executive/command-center/DashboardContext';
import { useVoiceCommands } from '@/features/resource-intelligence/executive/command-center/hooks/useVoiceCommands';
import { useWeather } from '@/features/resource-intelligence/executive/command-center/hooks/useWeather';
import { InsightIcon } from './MiniCharts';
import { AI_COMMANDER_INSIGHTS, getProvinceSummaryText } from '@/features/resource-intelligence/executive/command-center/data/province';
import { MISSIONS } from '@/features/resource-intelligence/executive/command-center/data/missions';

const FEATURED_MISSION = MISSIONS[0];
const FEATURED_MISSION_STATS = [
  { label: 'เป้าแยกต้นทาง', value: '45%' },
  { label: 'แยกต้นทางแล้ว', value: '31%' },
  { label: 'ลดการปนเปื้อน', value: '-18%' },
];

const SUGGESTION_CHIPS = ['สรุปสถานการณ์วันนี้', 'ซูมไปกะทู้', 'แสดงข้อมูลฝน'];

export function SidebarRight() {
  const { setMissionsView } = useDashboard();
  const { startListening, listening, runCommand } = useVoiceCommands();
  const { weather } = useWeather();

  const handleAiLink = () => {
    toast('Opening AI Commander Insights...', { icon: '🤖' });
  };

  const handleChip = (chip: string) => {
    if (chip === 'แสดงข้อมูลฝน') {
      if (weather) {
        toast(`ฝนวันนี้: ความชื้น ${weather.humidityPct}% ลม ${weather.windKph} km/h อุณหภูมิ ${weather.temperatureC}°C`, { icon: '🌧️', duration: 5000 });
      } else {
        toast.error('Weather data not available yet');
      }
      return;
    }
    runCommand(chip);
  };

  return (
    <aside className="w-80 flex flex-col gap-4 z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <Panel>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">AI COMMANDER</h2>
            <p className="text-xs text-slate-500 mb-4">ผู้ช่วยวิเคราะห์อัจฉริยะ</p>
          </div>
          <div className="w-8 h-8 bg-[#f0f7ff] text-blue-500 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-[0.85rem] leading-[1.5] bg-green-100 text-slate-800 py-3.5 px-4 rounded-lg">
            {getProvinceSummaryText()}
          </div>

          <div className="flex flex-col gap-2.5">
            {AI_COMMANDER_INSIGHTS.map((insight, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[0.78rem] leading-[1.4] text-slate-800">
                <InsightIcon type={insight.type} />
                <span>{insight.title}</span>
              </div>
            ))}
          </div>

          <div className="text-blue-500 font-medium text-right text-sm cursor-pointer" onClick={handleAiLink}>
            ดูข้อแนะนำเพิ่มเติม →
          </div>
        </div>
      </Panel>

      <Panel>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800 mb-1 uppercase tracking-[0.5px]">Active Mission</h2>
            <p className="text-xs text-slate-500 mb-4">ภารกิจที่กำลังดำเนินการ</p>
          </div>
          <span className="text-blue-500 text-xs font-medium cursor-pointer" onClick={() => setMissionsView(true)}>
            ดูทั้งหมด
          </span>
        </div>

        <div className="flex flex-col gap-2 bg-canvas rounded-lg p-3.5">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg text-white flex items-center justify-center flex-shrink-0" style={{ backgroundColor: FEATURED_MISSION.color }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            </div>
            <div>
              <div className="text-[0.85rem] font-bold">{FEATURED_MISSION.name}</div>
              <div className="text-[0.72rem] text-slate-500 mt-0.5">{FEATURED_MISSION.description}</div>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-[0.95rem] font-bold" style={{ color: FEATURED_MISSION.color }}>{FEATURED_MISSION.progressPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${FEATURED_MISSION.progressPct}%`, backgroundColor: FEATURED_MISSION.color }}></div>
          </div>

          <div className="flex justify-between mt-1">
            {FEATURED_MISSION_STATS.map(stat => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-[0.85rem] font-bold">{stat.value}</span>
                <span className="text-[0.65rem] text-slate-500 text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="CITYZEN VOICE" subtitle="สั่งการด้วยเสียงภาษาไทย">
        <div className="flex flex-col items-center gap-4 pt-6 px-0 pb-2">
          <div
            className="w-[100px] h-[100px] rounded-full border-2 border-green-500 flex items-center justify-center relative cursor-pointer"
            onClick={startListening}
            style={{ opacity: listening ? 1 : undefined, boxShadow: listening ? '0 0 0 6px rgba(34,197,94,0.15)' : undefined }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-[2rem] text-green-500">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </div>
          </div>
          <span className="text-sm text-slate-500">{listening ? 'กำลังฟัง...' : 'กดพูด หรือพูดว่า "CityZen"'}</span>

          <div className="flex flex-col gap-2 w-full">
            {SUGGESTION_CHIPS.map(chip => (
              <span key={chip} className="bg-canvas border border-slate-200 rounded-full py-2 px-3.5 text-xs text-slate-500 text-center cursor-pointer hover:border-green-500 hover:text-slate-800" onClick={() => handleChip(chip)}>
                &quot;{chip}&quot;
              </span>
            ))}
          </div>
        </div>
      </Panel>
    </aside>
  );
}
