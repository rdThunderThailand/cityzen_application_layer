"use client";

import { MessageCircle, Phone } from "lucide-react";
import { getStepVisualState, getProgressPercent } from "../statusView";
import { InspectionOrder } from "../types";

export function InspectionDetailSidebar({ inspectionOrder }: { inspectionOrder: InspectionOrder }) {
  const steps = inspectionOrder.timeline.slice(0, 6);
  const progressPercent = getProgressPercent(inspectionOrder.status);

  return (
    <div className="flex flex-col gap-6">

      {/* WO Summary (Purple Box) */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 lg:p-8">
        <h3 className="text-[15px] font-black text-slate-900 mb-8">สรุปรายละเอียดใบงาน</h3>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start gap-4">
            <span className="text-[13px] font-bold text-slate-500 shrink-0">เลขที่ใบงาน</span>
            <span className="text-[13px] font-bold text-slate-800 text-right">{inspectionOrder.woNumber}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[13px] font-bold text-slate-500 shrink-0">ประเภทงาน</span>
            <span className="text-[13px] font-bold text-slate-800 text-right">{inspectionOrder.taskType}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[13px] font-bold text-slate-500 shrink-0">ความเร่งด่วน</span>
            <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[12px] font-bold">
              {inspectionOrder.priority}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[13px] font-bold text-slate-500 shrink-0">วันที่แจ้ง</span>
            <span className="text-[13px] font-bold text-slate-800 text-right">{inspectionOrder.woDate}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[13px] font-bold text-slate-500 shrink-0">ผู้แจ้ง</span>
            <span className="text-[13px] font-bold text-slate-800 text-right">{inspectionOrder.reporterName} ({inspectionOrder.reporterDept})</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[13px] font-bold text-slate-500 shrink-0">สถานที่</span>
            <span className="text-[13px] font-bold text-slate-800 text-right max-w-[160px]">{inspectionOrder.location}</span>
          </div>
        </div>
      </div>

      {/* Progress (Pink Box) */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 lg:p-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-black text-slate-900">ความคืบหน้างาน</h3>
          <span className="text-[15px] font-black text-blue-900">{progressPercent}%</span>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8">
          <div className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-[14px] bottom-[14px] left-[13px] w-[2px] bg-[#E2E8F0] z-0"></div>

          <div className="flex flex-col gap-6 relative z-10">
            {steps.map((step, idx) => {
              const state = getStepVisualState(step.status, inspectionOrder.status);
              const active = state === "active";
              return (
                <div key={step.status} className="flex items-start gap-5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${active ? "bg-[#1D4ED8] text-white" : "bg-white text-slate-700 border-[2px] border-[#E2E8F0]"
                    }`}>
                    <span className="text-[11px] font-black">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex-1 flex justify-between items-start mt-0.5">
                    <p className={`text-[13px] font-bold ${active ? "text-[#1D4ED8]" : "text-slate-700"}`}>
                      {step.label}
                    </p>
                    {state !== "pending" && (
                      <p className={`text-[11px] font-medium mt-0.5 ${active ? "text-slate-500" : "text-slate-400"}`}>
                        {step.at}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reporter Info (Green Box) */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 lg:p-8 flex flex-col gap-5">
        <h3 className="text-[15px] font-black text-slate-900">ผู้แจ้งงาน</h3>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inspectionOrder.reporterName)}&background=random&color=fff`} alt={inspectionOrder.reporterName} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-slate-900 mb-0.5">{inspectionOrder.reporterName} ({inspectionOrder.reporterDept})</p>
            <p className="text-[12px] font-bold text-slate-500">เบอร์โทร: {inspectionOrder.reporterPhone}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 text-blue-600 rounded-[12px] hover:bg-slate-50 transition-colors text-[13px] font-bold shadow-sm bg-white">
            <Phone className="w-4 h-4" />
            <span>โทรออก</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 text-blue-600 rounded-[12px] hover:bg-slate-50 transition-colors text-[13px] font-bold shadow-sm bg-white">
            <MessageCircle className="w-4 h-4" />
            <span>แชท</span>
          </button>
        </div>
      </div>
    </div>
  );
}
