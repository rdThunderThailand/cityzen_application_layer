"use client";

import { TechnicianPreWorkChecklist } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

export function TechnicianChecklistWidget({ initialChecklist }: { initialChecklist: TechnicianPreWorkChecklist[] }) {
  const [checklist, setChecklist] = useState(initialChecklist);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
          score: !item.isChecked ? item.maxScore : 0
        };
      }
      return item;
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 bg-emerald-500 h-full" />
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-slate-800">เช็คลิสต์ก่อนเริ่มงาน</h2>
        <button className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1">
          ดูเช็คลิสต์ทั้งหมด <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        {checklist.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => toggleCheck(item.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                <svg className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-[12px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-emerald-600">{item.score}/{item.maxScore}</span>
              {item.isChecked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
