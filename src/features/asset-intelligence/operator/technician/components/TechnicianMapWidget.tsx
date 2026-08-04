"use client";

import { ArrowRight } from "lucide-react";

export function TechnicianMapWidget() {
  const mapMarkers = [
    { id: 1, x: "40%", y: "45%", color: "bg-amber-500", number: 1 },
    { id: 2, x: "25%", y: "20%", color: "bg-emerald-500", number: 2 },
    { id: 3, x: "80%", y: "60%", color: "bg-rose-500", number: 3 },
    { id: 4, x: "70%", y: "15%", color: "bg-emerald-500", number: 4 },
    { id: 5, x: "85%", y: "85%", color: "bg-blue-600", number: 5 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[350px] overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
        <h2 className="text-[15px] font-bold text-slate-800">งานบนแผนที่ (วันนี้)</h2>
        <button className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1">
          ดูแผนที่ทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 relative bg-slate-100 overflow-hidden">
        {/* Mock Map Background */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-multiply"
          style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/100.92,13.28,13/800x600?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}')` }}
        />

        {/* Roads Overlay (CSS based) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 Q150,200 400,100 T800,300" stroke="#000" strokeWidth="4" fill="none" />
            <path d="M200,0 L200,600" stroke="#000" strokeWidth="3" fill="none" strokeDasharray="10,10" />
            <path d="M0,400 L800,400" stroke="#000" strokeWidth="6" fill="none" />
            <path d="M500,0 L700,600" stroke="#000" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Map Location Name */}
        <div className="absolute top-[30%] left-[30%] text-[14px] font-bold text-slate-800 opacity-60">
          บางแสน
        </div>

        {/* Markers */}
        {mapMarkers.map(marker => (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
            style={{ left: marker.x, top: marker.y }}
          >
            <div className={`w-8 h-8 ${marker.color} rounded-full flex items-center justify-center text-white font-bold text-[13px] border-2 border-white shadow-md relative z-10 group-hover:scale-110 transition-transform`}>
              {marker.number}
            </div>
            {/* Pin point tail */}
            <div className={`w-3 h-3 ${marker.color} absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 z-0`} />

            {/* Ping effect */}
            {marker.number === 1 && (
              <div className={`absolute inset-0 ${marker.color} rounded-full animate-ping opacity-75`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
