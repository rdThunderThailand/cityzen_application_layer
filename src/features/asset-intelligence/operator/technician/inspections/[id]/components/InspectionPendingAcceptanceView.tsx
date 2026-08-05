"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  Image as ImageIcon,
  Info,
  PenTool,
  Phone,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProgressPercent, getStepVisualState } from "../statusView";
import { InspectionOrder, InspectionOrderPatch } from "../types";

interface InspectionPendingAcceptanceViewProps {
  inspectionOrder: InspectionOrder;
  advanceStatus: (patch?: InspectionOrderPatch) => void;
  onBack: () => void;
  onReturnToHome: () => void;
}

export function InspectionPendingAcceptanceView({ inspectionOrder, advanceStatus, onBack, onReturnToHome }: InspectionPendingAcceptanceViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";
  const [evidenceTab, setEvidenceTab] = useState<'before' | 'after' | 'docs'>('before');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessNotification && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (showSuccessNotification && countdown === 0) {
      advanceStatus();
    }
    return () => clearTimeout(timer);
  }, [showSuccessNotification, countdown, advanceStatus]);

  return (
    <div className="flex-1 p-8 w-full pb-40">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500 flex-wrap">
          <Link href="/dashboard/assets/officer/technician/inspections" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>ตรวจสอบหน้างาน</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="hover:text-blue-600 transition-colors cursor-pointer">รายละเอียดใบงาน</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-800">รอตรวจรับ</span>
        </div>

        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none">
            รอตรวจรับ
          </h1>
          <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-orange-100 text-orange-600 border border-orange-200">
            Pending Acceptance
          </span>
        </div>
        <p className="text-[14px] font-medium text-slate-500 -mt-3">คุณได้ส่งงานเพื่อตรวจรับเรียบร้อยแล้ว</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Top Summary Card with Horizontal Timeline */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col gap-6">

            {/* WO Info */}
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-[80px] h-[80px] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shrink-0 border border-slate-200 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[70%] h-[50%] bg-white rounded-md shadow-sm border border-slate-200 relative overflow-hidden flex flex-col justify-evenly px-2">
                    <div className="w-full h-[3px] bg-slate-200"></div>
                    <div className="w-full h-[3px] bg-slate-200"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[14px] font-black text-blue-900 tracking-tight">{inspectionOrder.woNumber}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100">
                    รอตรวจรับ
                  </span>
                </div>
                <h2 className="text-[16px] font-black text-[#1e293b] mb-1">{inspectionOrder.assetName}</h2>
                <p className="text-[12px] font-medium text-slate-500">{inspectionOrder.assetLocation}</p>
              </div>

              <div className="hidden md:block w-[1px] h-12 bg-slate-200 mx-2"></div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">📍</span>
                    สถานที่
                  </span>
                  <span className="text-[12px] font-bold text-slate-700 pl-5 line-clamp-1">{inspectionOrder.location}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">👤</span>
                    ผู้แจ้ง
                  </span>
                  <span className="text-[12px] font-bold text-slate-700 pl-5 truncate">{inspectionOrder.reporterName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">📅</span>
                    กำหนดตรวจสอบ
                  </span>
                  <span className="text-[12px] font-bold text-slate-700 pl-5">{inspectionOrder.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-slate-100"></div>

            {/* Horizontal Timeline */}
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute top-[15px] left-[40px] right-[40px] h-[2px] bg-slate-100 z-0"></div>
              <div className="absolute top-[15px] left-[40px] right-[180px] h-[2px] bg-emerald-400 z-0"></div>

              {inspectionOrder.timeline.slice(0, 6).map((step, idx) => {
                const state = getStepVisualState(step.status, inspectionOrder.status);
                return (
                  <div key={step.status} className="flex flex-col items-center gap-2 z-10 w-[120px]">
                    <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center bg-white border-[2px] ${state === 'completed' ? 'border-emerald-500 text-emerald-500' :
                        state === 'active' ? 'border-amber-400 bg-amber-400 text-white' :
                          'border-slate-200 text-slate-300'
                      }`}>
                      {state === 'completed' ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="font-black text-[14px]">{idx + 1}</span>}
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className={`text-[12px] font-bold ${state === 'active' ? 'text-amber-500' : state === 'completed' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {state === 'active' ? <>ส่งเมื่อ<br />{step.at}</> : state === 'pending' ? "รอทำรายการ" : step.at}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Column 1: Summary */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col h-full">
                <h3 className="text-[15px] font-black text-[#1e293b] mb-5">สรุปผลการดำเนินงาน</h3>

                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-[12px] font-bold">ปัญหาที่พบ (Root Cause)</span>
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 pl-5.5">{inspectionOrder.rootCause}</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <PenTool className="w-4 h-4" />
                      <span className="text-[12px] font-bold">การแก้ไข</span>
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 pl-5.5 leading-snug">{inspectionOrder.resolution}</span>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100 my-1"></div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[12px] font-bold text-slate-900">ผลการตรวจวัดหลังดำเนินการ</span>

                    {inspectionOrder.resultMetrics.map((metric) => (
                      <div key={metric.label} className="flex justify-between items-center text-[12px]">
                        <span className="font-medium text-slate-500">{metric.label}</span>
                        <span className="font-bold text-slate-800">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-[1px] bg-slate-100 my-1"></div>

                  <div className="flex justify-between items-center text-[12px]">
                    <span className="font-medium text-slate-500">เริ่มดำเนินการ</span>
                    <span className="font-bold text-slate-800">09:40 น.</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="font-medium text-slate-500">เสร็จสิ้น</span>
                    <span className="font-bold text-slate-800">10:30 น.</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="font-bold text-slate-600">รวมเวลาในการดำเนินงาน</span>
                    <span className="font-bold text-slate-800">50 นาที</span>
                  </div>

                </div>

                <button className="w-full mt-6 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  ดูรายละเอียดทั้งหมด
                </button>
              </div>
            </div>

            {/* Column 2: Evidence Tabs */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col h-full">
                <h3 className="text-[15px] font-black text-[#1e293b] mb-4">หลักฐานการดำเนินงาน</h3>

                {/* Custom Tab Bar */}
                <div className="flex items-center border-b border-slate-200 mb-5">
                  <button
                    onClick={() => setEvidenceTab('before')}
                    className={`flex-1 pb-2 border-b-2 text-[12px] transition-colors ${evidenceTab === 'before' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
                  >รูปก่อนดำเนินการ</button>
                  <button
                    onClick={() => setEvidenceTab('after')}
                    className={`flex-1 pb-2 border-b-2 text-[12px] transition-colors ${evidenceTab === 'after' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
                  >รูปหลังดำเนินการ</button>
                  <button
                    onClick={() => setEvidenceTab('docs')}
                    className={`flex-1 pb-2 border-b-2 text-[12px] transition-colors ${evidenceTab === 'docs' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
                  >เอกสาร / อื่น ๆ</button>
                </div>

                {evidenceTab === 'before' && (
                  <div className="flex flex-col flex-1">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {inspectionOrder.evidence.filter((e) => e.kind === "photo").slice(0, 2).map((photo) => (
                        <div key={photo.id} className="w-full h-[100px] bg-slate-100 rounded-xl relative overflow-hidden group border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photo.url} alt={photo.title} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${photo.grayscale ? "grayscale opacity-80" : ""}`} />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 flex-1">
                      {inspectionOrder.evidence.filter((e) => e.kind === "photo").slice(2, 5).map((photo) => (
                        <div key={photo.id} className="w-full h-[100px] bg-slate-100 rounded-xl relative overflow-hidden group border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {evidenceTab === 'after' && (
                  <div className="flex flex-col flex-1 items-center justify-center text-slate-400">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-[13px] font-medium">รูปภาพหลังดำเนินการ</p>
                  </div>
                )}

                {evidenceTab === 'docs' && (
                  <div className="flex flex-col flex-1 items-center justify-center text-slate-400">
                    <FileText className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-[13px] font-medium">เอกสารแนบ</p>
                  </div>
                )}

                <button className="w-full mt-6 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  ดูรูปภาพทั้งหมด (12)
                </button>
              </div>
            </div>

            {/* Column 3: Status & Approver */}
            <div className="flex flex-col gap-6">

              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 h-full flex flex-col">
                <h3 className="text-[15px] font-black text-[#1e293b] mb-4">สถานะการตรวจรับ</h3>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3 mb-6">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-black text-orange-800">อยู่ระหว่างรอการตรวจรับ</span>
                    <span className="text-[12px] font-medium text-orange-600">ระบบได้แจ้งหัวหน้างานเรียบร้อยแล้ว</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex flex-col gap-3">
                    <span className="text-[12px] font-bold text-slate-900">ผู้ตรวจรับ</span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inspectionOrder.approver.name)}&background=random&color=fff`} alt={inspectionOrder.approver.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-black text-slate-900 line-clamp-1">{inspectionOrder.approver.name}</span>
                        <span className="text-[10px] font-bold text-slate-500">{inspectionOrder.approver.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] font-bold text-blue-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{inspectionOrder.approver.phone}</span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100"></div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-slate-900">ส่งตรวจรับเมื่อ</span>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[12px] font-medium">20 พ.ค. 2567 10:35 น.</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-slate-900">หมายเหตุจากผู้ตรวจรับ</span>
                    <span className="text-[12px] font-medium text-slate-500">-</span>
                  </div>
                </div>

                {/* Bottom Info Notice */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 mt-6">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-black text-blue-900">หากมีการตีกลับงาน</span>
                    <span className="text-[11px] font-medium text-blue-700 leading-relaxed">
                      งานนี้จะถูกส่งกลับมาให้คุณแก้ไขและส่งตรวจรับอีกครั้ง
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <PendingAcceptanceSidebar
            inspectionOrder={inspectionOrder}
            onSimulateApproval={() => setShowSuccessNotification(true)}
          />
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            กลับไปหน้ารายการใบงาน
          </button>

          <div className="hidden md:flex items-center gap-2 text-[13px] font-medium text-slate-500">
            <Info className="w-4 h-4 text-slate-400" />
            ระบบจะแจ้งเตือนเมื่อมีการตรวจรับหรือส่งกลับแก้ไข
          </div>

          <button onClick={onReturnToHome} className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            กลับสู่หน้างานของฉัน
          </button>
        </div>
      </div>

      {/* Success Notification Overlay */}
      {showSuccessNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[400px] w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white stroke-[3]" />
              </div>
            </div>
            <h2 className="text-[24px] font-black text-slate-900 mb-2">อนุมัติปิดงานเรียบร้อย!</h2>
            <p className="text-[14px] font-medium text-slate-500 mb-8">
              ผู้ตรวจรับได้ทำการตรวจสอบและอนุมัติการดำเนินงานของคุณเรียบร้อยแล้ว
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 2) * 100}%` }}
              ></div>
            </div>
            <button
              onClick={() => advanceStatus()}
              className="mt-6 px-6 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-[13px] hover:bg-slate-200 transition-colors"
            >
              ข้ามไปเลย
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Right Sidebar Component
function PendingAcceptanceSidebar({ inspectionOrder, onSimulateApproval }: { inspectionOrder: InspectionOrder; onSimulateApproval: () => void }) {
  const steps = inspectionOrder.timeline.slice(0, 6);
  const progressPercent = getProgressPercent(inspectionOrder.status);

  return (
    <>
      {/* WO Summary */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-6">รายละเอียดใบงาน</h3>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">เลขที่ใบงาน</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">{inspectionOrder.woNumber}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">ประเภทงาน</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">{inspectionOrder.taskType}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[12px] font-bold text-slate-500">ความเร่งด่วน</span>
            <span className="text-[12px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded">สูง</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">วันที่แจ้ง</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">{inspectionOrder.woDate}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">สถานที่</span>
            <span className="text-[12px] font-bold text-slate-800 text-right line-clamp-2 w-[160px]">{inspectionOrder.location}</span>
          </div>
        </div>

        <button className="w-full mt-6 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          ดูรายละเอียดใบงาน
        </button>
      </div>

      {/* Vertical Progress */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-black text-slate-900">ความคืบหน้างาน</h3>
          <span className="text-[14px] font-black text-blue-900">{progressPercent}%</span>
        </div>

        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6">
          <div className="h-full bg-[#1D4ED8] rounded-full" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <div className="relative">
          <div className="absolute top-[14px] bottom-[14px] left-[11px] w-[2px] bg-[#E2E8F0] z-0"></div>

          <div className="flex flex-col gap-5 relative z-10">
            {steps.map((step, idx) => {
              const state = getStepVisualState(step.status, inspectionOrder.status);
              return (
                <div key={step.status} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${state === 'completed' ? "bg-emerald-500 text-white" :
                      state === 'active' ? "bg-amber-400 text-white" :
                        "bg-white text-slate-400 border-[2px] border-[#E2E8F0]"
                    }`}>
                    {state === 'active' ? <span className="text-[10px] font-black">{idx + 1}</span> : <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className={`text-[12px] font-bold ${state === 'active' ? 'text-amber-500' : 'text-slate-800'}`}>
                      {step.label}
                    </span>
                    <span className={`text-[10px] font-medium ${state === 'active' ? 'text-slate-500 text-right' : 'text-slate-500'}`}>
                      {state === 'active' ? <><span>{step.at}</span><br /><span className="text-amber-500">รอตรวจรับ</span></> : state === 'pending' ? "รอทำรายการ" : step.at}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col gap-3">
        <h3 className="text-[14px] font-black text-slate-900 mb-2">การดำเนินการที่คุณทำได้</h3>

        <button className="w-full py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-3 px-4">
          <Edit3 className="w-4 h-4 text-blue-600" />
          แก้ไขข้อมูลล่าสุด
        </button>
        <button className="w-full py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-3 px-4">
          <Plus className="w-4 h-4 text-blue-600" />
          เพิ่มเอกสาร / รูปภาพ
        </button>
        <button className="w-full py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-3 px-4">
          <PenTool className="w-4 h-4 text-blue-600" />
          เพิ่มหมายเหตุ
        </button>

        <div className="w-full h-[1px] bg-slate-100 my-2"></div>
        <button
          onClick={onSimulateApproval}
          className="w-full py-2.5 rounded-[10px] border-2 border-dashed border-emerald-200 text-emerald-600 font-bold text-[13px] hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          จำลองการอนุมัติ (Demo)
        </button>
      </div>

    </>
  );
}
