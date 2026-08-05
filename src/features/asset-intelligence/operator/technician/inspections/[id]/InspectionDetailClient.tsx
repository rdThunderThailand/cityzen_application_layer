"use client";

import { Edit3 } from "lucide-react";
import { useState } from "react";
import { InspectionArrivedView } from "./components/InspectionArrivedView";
import { InspectionClosedView } from "./components/InspectionClosedView";
import { InspectionDetailHeader } from "./components/InspectionDetailHeader";
import { InspectionDetailHeaderSummary } from "./components/InspectionDetailHeaderSummary";
import { InspectionDetailInfo } from "./components/InspectionDetailInfo";
import { InspectionDetailMap } from "./components/InspectionDetailMap";
import { InspectionDetailSidebar } from "./components/InspectionDetailSidebar";
import { InspectionInProgressView } from "./components/InspectionInProgressView";
import { InspectionNavigatingView } from "./components/InspectionNavigatingView";
import { InspectionPendingAcceptanceView } from "./components/InspectionPendingAcceptanceView";
import { InspectionSendApprovalView } from "./components/InspectionSendApprovalView";
import { InspectionSummaryCostsView } from "./components/InspectionSummaryCostsView";
import { InspectionSummaryDocsView } from "./components/InspectionSummaryDocsView";
import { InspectionSummaryPartsView } from "./components/InspectionSummaryPartsView";
import { InspectionSummaryView } from "./components/InspectionSummaryView";
import { ViewState, viewStateForStatus } from "./statusView";
import { INSPECTION_ORDER_STATUS_ORDER, InspectionOrder, InspectionOrderPatch } from "./types";

interface InspectionDetailClientProps {
  initialInspectionOrder: InspectionOrder;
}

type SummaryTabType = "summary" | "evidence";

export function InspectionDetailClient({ initialInspectionOrder }: InspectionDetailClientProps) {
  const [inspectionOrder, setInspectionOrder] = useState<InspectionOrder>(initialInspectionOrder);
  const [viewOverride, setViewOverride] = useState<ViewState | null>(null);
  const [summaryTab, setSummaryTab] = useState<SummaryTabType>("summary");
  const [lastStatus, setLastStatus] = useState(inspectionOrder.status);

  const advanceStatus = (patch?: InspectionOrderPatch) => {
    setInspectionOrder((prev) => {
      const currentIndex = INSPECTION_ORDER_STATUS_ORDER.indexOf(prev.status);
      const nextStatus = INSPECTION_ORDER_STATUS_ORDER[currentIndex + 1] ?? prev.status;
      return { ...prev, ...patch, status: nextStatus };
    });
  };

  // Real progress always wins over a stale "peeking backward" view once status advances.
  if (inspectionOrder.status !== lastStatus) {
    setLastStatus(inspectionOrder.status);
    setViewOverride(null);
  }

  const viewState = viewOverride ?? viewStateForStatus(inspectionOrder.status);

  // status: summary — สรุปผลตรวจสอบ แท็บภาพรวม/หลักฐาน
  if (viewState === "summary") {
    return (
      <InspectionSummaryView
        inspectionOrder={inspectionOrder}
        initialTab={summaryTab}
        onTabChange={(tab) => {
          if (tab === "parts") setViewOverride("summary_parts");
          else if (tab === "costs") setViewOverride("summary_costs");
          else if (tab === "docs") setViewOverride("summary_docs");
          else setSummaryTab(tab as SummaryTabType);
        }}
        onBack={() => setViewOverride("in_progress")}
      />
    );
  }

  // status: summary — แท็บย่อย "อะไหล่ที่ใช้" (peek จาก summary, ไม่มี status แยก)
  if (viewState === "summary_parts") {
    return (
      <InspectionSummaryPartsView
        inspectionOrder={inspectionOrder}
        onTabChange={(tab) => {
          if (tab === "summary" || tab === "evidence") {
            setSummaryTab(tab as SummaryTabType);
            setViewOverride("summary");
          } else if (tab === "costs") {
            setViewOverride("summary_costs");
          } else if (tab === "docs") {
            setViewOverride("summary_docs");
          }
        }}
        onBack={() => {
          setSummaryTab("evidence");
          setViewOverride("summary");
        }}
        onNext={() => setViewOverride("summary_costs")}
      />
    );
  }

  // status: summary — แท็บย่อย "ค่าใช้จ่าย" (peek จาก summary, ไม่มี status แยก)
  if (viewState === "summary_costs") {
    return (
      <InspectionSummaryCostsView
        inspectionOrder={inspectionOrder}
        onTabChange={(tab) => {
          if (tab === "summary" || tab === "evidence") {
            setSummaryTab(tab as SummaryTabType);
            setViewOverride("summary");
          } else if (tab === "parts") {
            setViewOverride("summary_parts");
          } else if (tab === "docs") {
            setViewOverride("summary_docs");
          }
        }}
        onBack={() => setViewOverride("summary_parts")}
        onNext={() => setViewOverride("summary_docs")}
      />
    );
  }

  // status: summary — แท็บย่อย "เอกสาร/หลักฐานแนบ" (peek จาก summary, กด advanceStatus ที่นี่เพื่อไป submitted)
  if (viewState === "summary_docs") {
    return (
      <InspectionSummaryDocsView
        inspectionOrder={inspectionOrder}
        advanceStatus={advanceStatus}
        onTabChange={(tab) => {
          if (tab === "summary" || tab === "evidence") {
            setSummaryTab(tab as SummaryTabType);
            setViewOverride("summary");
          } else if (tab === "parts") {
            setViewOverride("summary_parts");
          } else if (tab === "costs") {
            setViewOverride("summary_costs");
          }
        }}
        onBack={() => setViewOverride("summary_costs")}
      />
    );
  }

  // status: submitted — ส่งผลตรวจสอบขออนุมัติแล้ว รอกดยืนยันส่ง
  if (viewState === "send_approval") {
    return (
      <InspectionSendApprovalView
        inspectionOrder={inspectionOrder}
        advanceStatus={advanceStatus}
        onBack={() => setViewOverride("summary_docs")}
      />
    );
  }

  // status: pending_approval — ส่งตรวจรับแล้ว รอผู้มอบหมายงานอนุมัติ (ขั้นตอนที่ 6 ในไทม์ไลน์)
  if (viewState === "pending_acceptance") {
    return (
      <InspectionPendingAcceptanceView
        inspectionOrder={inspectionOrder}
        advanceStatus={advanceStatus}
        onBack={() => setViewOverride("default")}
        onReturnToHome={() => setViewOverride("default")}
      />
    );
  }

  // status: closed — งานตรวจสอบเสร็จสิ้น ปิดงานแล้ว
  if (viewState === "closed") {
    return <InspectionClosedView inspectionOrder={inspectionOrder} onBack={() => setViewOverride("default")} />;
  }

  // status: in_progress — ถึงหน้างานแล้วและกำลังตรวจสอบ (ขั้นตอนที่ 4 ในไทม์ไลน์)
  if (viewState === "in_progress") {
    return (
      <InspectionInProgressView
        inspectionOrder={inspectionOrder}
        advanceStatus={advanceStatus}
        onBack={() => setViewOverride("arrived")}
      />
    );
  }

  // status: arrived — ถึงหน้างานแล้ว รอกดเริ่มตรวจสอบ (ขั้นตอนที่ 3 ในไทม์ไลน์)
  if (viewState === "arrived") {
    return (
      <InspectionArrivedView
        inspectionOrder={inspectionOrder}
        advanceStatus={advanceStatus}
        onBack={() => setViewOverride("navigating")}
      />
    );
  }

  // status: traveling — กำลังเดินทางไปหน้างาน (ขั้นตอนที่ 2 ในไทม์ไลน์, มีแผนที่นำทาง)
  if (viewState === "navigating") {
    return (
      <div className="min-h-full flex-1  w-full p-6 pb-40">
        <div className="mb-6">
          <InspectionDetailHeader isNavigating={true} />
        </div>
        <InspectionNavigatingView
          inspectionOrder={inspectionOrder}
          advanceStatus={advanceStatus}
          onCancelNavigation={() => setViewOverride("default")}
        />
      </div>
    );
  }

  // status: accepted (default) — รับงานแล้ว รอกดเริ่มเดินทาง (ขั้นตอนที่ 1 ในไทม์ไลน์, หน้ารายละเอียดหลัก)
  return (
    <div className="min-h-full flex-1 w-full p-6 pb-40">
      <div className="mb-6">
        <InspectionDetailHeader isNavigating={false} />
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Blue Box: Summary & Timeline */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <InspectionDetailHeaderSummary inspectionOrder={inspectionOrder} />
          </div>

          {/* Yellow & Orange Boxes: Info & Map */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side: Info */}
            <div className="flex-[1.1] min-w-[320px] bg-white rounded-[16px] border border-slate-200 shadow-sm lg:p-8">
              <InspectionDetailInfo inspectionOrder={inspectionOrder} />
            </div>

            {/* Right Side: Map */}
            <div className="flex-[1.4] min-w-[320px] bg-white rounded-[16px] border border-slate-200 shadow-sm lg:p-8">
              <InspectionDetailMap inspectionOrder={inspectionOrder} advanceStatus={advanceStatus} />
            </div>
          </div>

          {/* Red Box: Notes Section หมายเหตุจากผู้มอบหมาย*/}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm lg:p-8 ">
            <h3 className="text-[15px] font-black text-slate-900 mb-4">หมายเหตุจากผู้มอบหมายงาน</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
              <p className="text-[14px] text-slate-700 leading-relaxed font-bold max-w-3xl">
                <NotesText inspectionOrder={inspectionOrder} />
              </p>
              <NotesMeta inspectionOrder={inspectionOrder} />
            </div>
          </div>

        </div>

        {/* Right Sidebar (Purple, Pink, Green Boxes) */}
        <div className="w-full xl:w-[380px] shrink-0 mb-6">
          <InspectionDetailSidebar inspectionOrder={inspectionOrder} />
        </div>
      </div>
    </div>
  );
}

function NotesText({ inspectionOrder }: { inspectionOrder: InspectionOrder }) {
  return <>{inspectionOrder.notes}</>;
}

function NotesMeta({ inspectionOrder }: { inspectionOrder: InspectionOrder }) {
  return (
    <div className="flex flex-col items-end shrink-0 gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-bold text-slate-500">บันทึกโดย: {inspectionOrder.assignerName}</span>
        <button className="text-blue-600 hover:text-blue-700 transition-colors">
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
      <span className="text-[12px] font-bold text-slate-500">{inspectionOrder.notesDate}</span>
    </div>
  );
}
