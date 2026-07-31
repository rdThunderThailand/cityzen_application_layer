"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import { Edit3 } from "lucide-react";
import { useState } from "react";
import { InspectionArrivedView } from "./components/InspectionArrivedView";
import { InspectionClosedView } from "./components/InspectionClosedView";
import { InspectionDetailHeader } from "./components/InspectionDetailHeader";
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

interface InspectionDetailClientProps {
  detail: TechnicianInspectionDetail;
}

export function InspectionDetailClient({ detail }: InspectionDetailClientProps) {
  type ViewState = 'default' | 'navigating' | 'arrived' | 'in_progress' | 'summary' | 'summary_parts' | 'summary_costs' | 'summary_docs' | 'send_approval' | 'pending_acceptance' | 'closed';
  type SummaryTabType = 'summary' | 'evidence';

  const [viewState, setViewState] = useState<ViewState>('default');
  const [summaryTab, setSummaryTab] = useState<SummaryTabType>('summary');

  if (viewState === 'summary') {
    return (
      <InspectionSummaryView
        detail={detail}
        initialTab={summaryTab}
        onTabChange={(tab) => {
          if (tab === 'parts') setViewState('summary_parts');
          else if (tab === 'costs') setViewState('summary_costs');
          else if (tab === 'docs') setViewState('summary_docs');
          else setSummaryTab(tab as SummaryTabType);
        }}
        onBack={() => setViewState('in_progress')}
        onNext={() => setViewState('summary_parts')}
      />
    );
  }

  if (viewState === 'summary_parts') {
    return (
      <InspectionSummaryPartsView
        detail={detail}
        onTabChange={(tab) => {
          if (tab === 'summary' || tab === 'evidence') {
            setSummaryTab(tab as SummaryTabType);
            setViewState('summary');
          } else if (tab === 'costs') {
            setViewState('summary_costs');
          } else if (tab === 'docs') {
            setViewState('summary_docs');
          }
        }}
        onBack={() => {
          setSummaryTab('evidence');
          setViewState('summary');
        }}
        onNext={() => setViewState('summary_costs')}
      />
    );
  }

  if (viewState === 'summary_costs') {
    return (
      <InspectionSummaryCostsView
        detail={detail}
        onTabChange={(tab) => {
          if (tab === 'summary' || tab === 'evidence') {
            setSummaryTab(tab as SummaryTabType);
            setViewState('summary');
          } else if (tab === 'parts') {
            setViewState('summary_parts');
          } else if (tab === 'docs') {
            setViewState('summary_docs');
          }
        }}
        onBack={() => setViewState('summary_parts')}
        onNext={() => setViewState('summary_docs')}
      />
    );
  }

  if (viewState === 'summary_docs') {
    return (
      <InspectionSummaryDocsView
        detail={detail}
        onTabChange={(tab) => {
          if (tab === 'summary' || tab === 'evidence') {
            setSummaryTab(tab as SummaryTabType);
            setViewState('summary');
          } else if (tab === 'parts') {
            setViewState('summary_parts');
          } else if (tab === 'costs') {
            setViewState('summary_costs');
          }
        }}
        onBack={() => setViewState('summary_costs')}
        onNext={() => setViewState('send_approval')}
      />
    );
  }

  if (viewState === 'send_approval') {
    return (
      <InspectionSendApprovalView
        detail={detail}
        onBack={() => setViewState('summary_docs')}
        onSubmit={() => setViewState('pending_acceptance')}
      />
    );
  }

  if (viewState === 'pending_acceptance') {
    return (
      <InspectionPendingAcceptanceView
        detail={detail}
        onBack={() => setViewState('default')}
        onReturnToHome={() => setViewState('default')}
        onApprovalComplete={() => setViewState('closed')}
      />
    );
  }

  if (viewState === 'closed') {
    return (
      <InspectionClosedView
        detail={detail}
        onBack={() => setViewState('default')}
      />
    );
  }

  if (viewState === 'in_progress') {
    return (
      <InspectionInProgressView
        detail={detail}
        onBack={() => setViewState('arrived')}
        onContinue={() => {
          setSummaryTab('summary');
          setViewState('summary');
        }}
      />
    );
  }

  if (viewState === 'arrived') {
    return (
      <InspectionArrivedView
        detail={detail}
        onBack={() => setViewState('navigating')}
        onStartInspection={() => setViewState('in_progress')}
      />
    );
  }

  if (viewState === 'navigating') {
    return (
      <div className="min-h-full flex-1 bg-slate-50 w-full p-6 pb-40">
        <div className="mb-6">
          <InspectionDetailHeader detail={detail} isNavigating={true} />
        </div>
        <InspectionNavigatingView
          detail={detail}
          onCancelNavigation={() => setViewState('default')}
          onArrived={() => setViewState('arrived')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full flex-1 bg-slate-50 w-full p-6 pb-40">
      <div className="mb-6">
        <InspectionDetailHeader detail={detail} isNavigating={false} />
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Blue Box: Summary & Timeline */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <InspectionDetailHeaderSummary detail={detail} />
          </div>

          {/* Yellow & Orange Boxes: Info & Map */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side: Info */}
            <div className="flex-[1.1] min-w-[320px] bg-white rounded-[16px] border border-slate-200 shadow-sm lg:p-8">
              <InspectionDetailInfo detail={detail} />
            </div>

            {/* Right Side: Map */}
            <div className="flex-[1.4] min-w-[320px] bg-white rounded-[16px] border border-slate-200 shadow-sm lg:p-8">
              <InspectionDetailMap detail={detail} onStartNavigation={() => setViewState('navigating')} />
            </div>
          </div>

          {/* Red Box: Notes Section */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm lg:p-8">
            <h3 className="text-[15px] font-black text-slate-900 mb-4">หมายเหตุจากผู้มอบหมายงาน</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
              <p className="text-[14px] text-slate-700 leading-relaxed font-bold max-w-3xl">
                {detail.notes}
              </p>
              <div className="flex flex-col items-end shrink-0 gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-slate-500">บันทึกโดย: {detail.assignerName}</span>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[12px] font-bold text-slate-500">{detail.notesDate}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar (Purple, Pink, Green Boxes) */}
        <div className="w-full xl:w-[380px] shrink-0">
          <InspectionDetailSidebar detail={detail} />
        </div>
      </div>
    </div>
  );
}

// Extracting the summary part to render inside the unified card
function InspectionDetailHeaderSummary({ detail }: { detail: TechnicianInspectionDetail }) {
  const steps = [
    { label: "รับงานแล้ว", status: "20 พ.ค. 2567 09:15", active: true },
    { label: "กำลังเดินทาง", status: "รอเริ่มเดินทาง", active: false },
    { label: "ถึงหน้างาน", status: "รอยืนยัน", active: false },
    { label: "ดำเนินการแก้ไข", status: "ยังไม่เริ่ม", active: false },
    { label: "สรุปผลและแนบหลักฐาน", status: "ยังไม่เริ่ม", active: false },
    { label: "ส่งตรวจรับ", status: "ยังไม่เริ่ม", active: false },
  ];

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
            <span className="text-[16px] font-black text-blue-900 tracking-tight">{detail.woNumber}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${detail.statusBg} ${detail.statusColor}`}>
              {detail.status}
            </span>
          </div>
          <h2 className="text-[20px] font-black text-[#1e293b] mb-2 leading-tight">{detail.assetName}</h2>
          <p className="text-[14px] font-medium text-slate-500">{detail.assetLocation}</p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 xl:pt-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-400">สถานที่</span>
            <span className="text-[13px] font-bold text-slate-700">{detail.location}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-400">ผู้แจ้ง</span>
            <span className="text-[13px] font-bold text-slate-700">{detail.reporterName} ({detail.reporterDept})</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-400">กำหนดตรวจสอบ</span>
            <span className="text-[13px] font-bold text-slate-700">{detail.dueDate}</span>
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
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black mb-3 transition-colors ${step.active ? "bg-[#1D4ED8] text-white" : "bg-white text-slate-700 border-[2px] border-[#E2E8F0]"
                  }`}>
                  {idx + 1}
                </div>
                <span className={`text-[13px] font-bold text-center ${step.active ? "text-[#1D4ED8]" : "text-slate-800"}`}>
                  {step.label}
                </span>
                <span className={`text-[12px] font-medium text-center mt-1.5 ${step.active ? "text-slate-500" : "text-slate-400"}`}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
