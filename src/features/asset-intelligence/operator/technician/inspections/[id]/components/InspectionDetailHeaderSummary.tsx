"use client";

import { getStatusBadgeClass, getStepVisualState } from "../statusView";
import { STATUS_LABELS, InspectionOrder } from "../types";

export function InspectionDetailHeaderSummary({ inspectionOrder }: { inspectionOrder: InspectionOrder }) {
  const steps = inspectionOrder.timeline.slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      {/* Top Info */}
      <div className="flex flex-col xl:flex-row xl:items-start gap-6 lg:gap-8 lg:p-8">
        <div className="w-[100px] h-[100px] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0 border border-slate-200 shadow-inner overflow-hidden">
          {/* Mock image to resemble the AC unit visually if possible, or a nice styled placeholder */}
          <div className="w-[80%] h-[60%] bg-white rounded-md shadow-sm border border-slate-200 flex flex-col justify-evenly p-1 relative">
            <div className="w-full h-[2px] bg-slate-200"></div>
            <div className="w-full h-[2px] bg-slate-200"></div>
            <div className="w-full h-[2px] bg-slate-200"></div>
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        <div className="min-w-[280px]">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[16px] font-black text-blue-900 tracking-tight">{inspectionOrder.woNumber}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadgeClass(inspectionOrder.status)}`}>
              {STATUS_LABELS[inspectionOrder.status]}
            </span>
          </div>
          <h2 className="text-[20px] font-black text-[#1e293b] mb-2 leading-tight">{inspectionOrder.assetName}</h2>
          <p className="text-[14px] font-medium text-slate-500">{inspectionOrder.assetLocation}</p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 xl:pt-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-400">สถานที่</span>
            <span className="text-[13px] font-bold text-slate-700">{inspectionOrder.location}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-400">ผู้แจ้ง</span>
            <span className="text-[13px] font-bold text-slate-700">{inspectionOrder.reporterName} ({inspectionOrder.reporterDept})</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-400">กำหนดตรวจสอบ</span>
            <span className="text-[13px] font-bold text-slate-700">{inspectionOrder.dueDate}</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-[1px] bg-slate-200"></div>

      {/* Timeline */}
      <div className="relative w-full lg:p-8">
        <div className="relative max-w-6xl mx-auto w-full">
          {/* The connecting horizontal line */}
          <div className="absolute top-[18px] left-[8.33%] right-[8.33%] h-[2px] bg-[#E2E8F0] z-0"></div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => {
              const state = getStepVisualState(step.status, inspectionOrder.status);
              const active = state === "active";
              return (
                <div key={step.status} className="flex flex-col items-center flex-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black mb-3 transition-colors ${active ? "bg-[#1D4ED8] text-white" : "bg-white text-slate-700 border-[2px] border-[#E2E8F0]"
                    }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[13px] font-bold text-center ${active ? "text-[#1D4ED8]" : "text-slate-800"}`}>
                    {step.label}
                  </span>
                  <span className={`text-[12px] font-medium text-center mt-1.5 ${active ? "text-slate-500" : "text-slate-400"}`}>
                    {state === "pending" ? "ยังไม่เริ่ม" : step.at}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
