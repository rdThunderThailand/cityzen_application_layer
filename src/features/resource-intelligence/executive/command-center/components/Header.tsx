'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useVoiceCommands } from '@/features/resource-intelligence/executive/command-center/hooks/useVoiceCommands';
import { useWeather } from '@/features/resource-intelligence/executive/command-center/hooks/useWeather';
import { useDashboard } from '@/features/resource-intelligence/executive/command-center/DashboardContext';

const THAI_DAYS = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

function formatThaiDate(date: Date) {
  const day = THAI_DAYS[date.getDay()];
  const dateNum = date.getDate();
  const month = THAI_MONTHS[date.getMonth()];
  const buddhistYear = date.getFullYear() + 543;
  return `${day}ที่ ${dateNum} ${month} ${buddhistYear}`;
}

function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return {
    time: `${hours}:${minutes.toString().padStart(2, '0')}`,
    amPm,
  };
}

// getSnapshot must return a cached, stable value between store updates
// (not a fresh Date.now() every call) or useSyncExternalStore re-renders
// forever trying to "catch up" to an always-different snapshot.
let clockTimestamp = 0;
const clockListeners = new Set<() => void>();
let clockIntervalId: ReturnType<typeof setInterval> | null = null;

function subscribeToClock(callback: () => void) {
  clockTimestamp = Date.now();
  clockListeners.add(callback);
  if (clockIntervalId === null) {
    clockIntervalId = setInterval(() => {
      clockTimestamp = Date.now();
      clockListeners.forEach(listener => listener());
    }, 30_000);
  }
  callback(); // sync the freshly-set timestamp in immediately after mount

  return () => {
    clockListeners.delete(callback);
    if (clockListeners.size === 0 && clockIntervalId !== null) {
      clearInterval(clockIntervalId);
      clockIntervalId = null;
    }
  };
}

function getClockSnapshot() {
  return clockTimestamp;
}

// 0 is a falsy sentinel meaning "not yet mounted" so server and first
// client render agree, avoiding a hydration mismatch on the live clock.
function getServerClockSnapshot() {
  return 0;
}

export function Header() {
  const timestamp = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerClockSnapshot);
  const now = timestamp ? new Date(timestamp) : null;

  const { time, amPm } = now ? formatTime(now) : { time: '', amPm: '' };
  const { listening, lang, setLang, startListening } = useVoiceCommands();
  const { weather, error: weatherError } = useWeather();
  const { missionsViewActive, setMissionsView } = useDashboard();

  return (
    <header className="h-header bg-white flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center gap-6">
        <Link
          href="/resource-intelligence/executive"
          aria-label="กลับไปหน้าหลักผู้บริหาร"
          className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-70"
        >
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-[1px]">CITYZEN</span>
            <span className="text-xs text-slate-500">จากใจประชาชน เพื่อประชาชน</span>
          </div>
        </Link>
        <div className="flex flex-col border-l-2 border-slate-200 pl-6">
          <span className="text-xl font-bold text-blue-500">PHUKET</span>
          <span className="text-sm text-slate-500">จังหวัดภูเก็ต</span>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-500">{now ? formatThaiDate(now) : ''}</span>
          <div className="text-[1.75rem] font-bold flex items-baseline gap-1">
            {time} <span className="text-base font-semibold">{amPm}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="flex flex-col">
            <span className="font-semibold text-green-500">NORMAL</span>
            <span className="text-xs text-slate-500">สถานะปกติ</span>
          </div>
        </div>
        <div className="text-xs font-semibold tracking-[1px] text-slate-800">
          ONE CITY • ONE COMMAND • ONE TRUTH
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className={`flex items-center gap-2 border border-slate-200 bg-canvas text-slate-800 text-[0.8rem] font-semibold px-4 py-2 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${missionsViewActive ? 'bg-red-500 border-red-500 text-white animate-mic-pulse' : ''}`}
          onClick={() => setMissionsView(!missionsViewActive)}
          title="View active missions"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
          Missions
        </button>
        <div className="flex items-center gap-2">
          <div className="flex border border-slate-200 rounded-full overflow-hidden">
            <button
              type="button"
              className={`border-0 bg-transparent text-slate-500 text-[0.7rem] font-bold px-2.5 py-1.5 cursor-pointer ${lang === 'th-TH' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setLang('th-TH')}
            >
              TH
            </button>
            <button
              type="button"
              className={`border-0 bg-transparent text-slate-500 text-[0.7rem] font-bold px-2.5 py-1.5 cursor-pointer ${lang === 'en-US' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setLang('en-US')}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className={`flex items-center gap-2 border border-slate-200 bg-canvas text-slate-800 text-[0.8rem] font-semibold px-4 py-2 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${listening ? 'bg-red-500 border-red-500 text-white animate-mic-pulse' : ''}`}
            onClick={startListening}
            title="Push to speak a command"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            {listening ? 'Listening…' : 'Voice'}
          </button>
        </div>
        <div className="flex items-center gap-4 bg-canvas px-6 py-3 rounded-2xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span className="text-2xl font-bold">{weather ? `${weather.temperatureC}°c` : weatherError ? '—°c' : '...'}</span>
          <div className="flex flex-col text-xs text-slate-500">
            <span>Humidity {weather ? `${weather.humidityPct}%` : '—'}</span>
            <span>Wind {weather ? `${weather.windKph} km/h` : '—'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
