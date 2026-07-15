"use client";

import { useState } from "react";

type TrendPoint = { x: number; y: number; waste: number };

export function StoryboardTrendChart({
  trendPoints,
  trendLabels,
  trendGridLines,
  trendLinePath,
}: {
  trendPoints: TrendPoint[];
  trendLabels: string[];
  trendGridLines: number[];
  trendLinePath: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <svg viewBox="0 0 700 200" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        {trendGridLines.map((y) => (
          <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#e2e8f0" strokeWidth="1.5" />
        ))}
        <path d={`${trendLinePath} L680 200 L20 200 Z`} fill="#ef4444" fillOpacity="0.1" stroke="none" />
        <path d={trendLinePath} fill="none" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {trendPoints.map((point, index) => (
          <g
            key={point.x}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-pointer"
          >
            <circle cx={point.x} cy={point.y} r="14" fill="transparent" />
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === index ? "9" : "7"}
              fill="#ef4444"
              stroke="white"
              strokeWidth="3"
            />
          </g>
        ))}
      </svg>
      {hoveredIndex !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-slate-100 px-3 py-2 text-xs leading-5 shadow-lg"
          style={{
            left: `${(trendPoints[hoveredIndex].x / 700) * 100}%`,
            top: `${(trendPoints[hoveredIndex].y / 200) * 100}%`,
            marginTop: "-14px",
          }}
        >
          <p className="font-extrabold">{trendLabels[hoveredIndex]}</p>
          <p>ปริมาณขยะ {trendPoints[hoveredIndex].waste} ตัน</p>
        </div>
      )}
    </>
  );
}
