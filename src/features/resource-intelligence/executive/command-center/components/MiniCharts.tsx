'use client';

import React, { useMemo } from 'react';

export function toPoints(data: number[], height: number, amplitude: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map((v, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: height - ((v - min) / range) * amplitude,
  }));
}

export function Sparkline({ data, color }: { data: number[]; color: string }) {
  const dots = useMemo(() => toPoints(data, 30, 28), [data]);
  const linePoints = dots.map(d => `${d.x},${d.y}`).join(' ');

  return (
    <svg viewBox="0 0 100 32" width="100%" height="40" preserveAspectRatio="none">
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="1.6" fill={color} />)}
    </svg>
  );
}

export function TrendChart({ data, labels, color }: { data: number[]; labels: string[]; color: string }) {
  const points = useMemo(() => toPoints(data, 46, 40), [data]);
  const linePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div>
      <svg viewBox="0 0 100 50" width="100%" height="90" preserveAspectRatio="none">
        <polyline points={linePoints} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.8" fill={color} />
        ))}
      </svg>
      <div className="flex justify-between text-[0.65rem] text-slate-400 mt-1">
        {labels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
}

export function Gauge({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 140 76" width="150" height="82">
        <path d="M 12 68 A 58 58 0 0 1 128 68" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" pathLength={100} />
        <path
          d="M 12 68 A 58 58 0 0 1 128 68"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - score}
        />
      </svg>
      <div className="text-[1.6rem] font-bold -mt-[34px]">
        {score}<span className="text-xs text-slate-500 font-medium"> /100</span>
      </div>
    </div>
  );
}

export type InsightType = 'success' | 'info' | 'warning';

const INSIGHT_COLORS: Record<InsightType, string> = {
  success: '#22c55e',
  info: '#3b82f6',
  warning: '#f59e0b',
};

export function InsightIcon({ type }: { type: InsightType }) {
  const color = INSIGHT_COLORS[type];
  if (type === 'success') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="shrink-0">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    );
  }
  if (type === 'warning') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="shrink-0">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="shrink-0">
      <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}
