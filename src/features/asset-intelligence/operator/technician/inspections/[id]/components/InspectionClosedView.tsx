"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Edit3,
  FileText,
  Image as ImageIcon,
  PenTool,
  Plus,
  Share2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getProgressPercent, getStepVisualState } from "../statusView";
import { InspectionOrder } from "../types";

interface InspectionClosedViewProps {
  inspectionOrder: InspectionOrder;
  onBack: () => void;
}

export function InspectionClosedView({ inspectionOrder, onBack }: InspectionClosedViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";
  const [activeTab, setActiveTab] = useState<'summary' | 'details' | 'evidence' | 'timeline' | 'docs'>('summary');

  // Dynamic Header Content
  const closedAt = inspectionOrder.timeline.find((s) => s.status === "closed")?.at ?? "";
  const tabInfo = {
    summary: { title: "งานปิดแล้ว", subtitle: `งานนี้ดำเนินการเรียบร้อยแล้ว ปิดงานเมื่อวันที่ ${closedAt}` },
    details: { title: "รายละเอียดการดำเนินงาน", subtitle: "แสดงขั้นตอนการดำเนินงานและข้อมูลผลการปฏิบัติงานโดยละเอียด" },
    evidence: { title: "หลักฐาน (รูปภาพ / ไฟล์)", subtitle: "รูปภาพและเอกสารที่เกี่ยวข้องกับการดำเนินงาน" },
    timeline: { title: "ไทม์ไลน์การทำงาน", subtitle: "ประวัติและลำดับขั้นตอนการดำเนินงานทั้งหมด" },
    docs: { title: "เอกสารแนบ", subtitle: "เอกสารต่างๆ ที่เกี่ยวข้องกับใบงาน" }
  };

  return (
    <div className="min-h-full flex-1 bg-slate-50 p-8 xl:p-12 w-full pb-40">

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
          {activeTab !== 'summary' && (
            <>
              <span onClick={() => setActiveTab('summary')} className="hover:text-blue-600 transition-colors cursor-pointer">งานปิดแล้ว</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
            </>
          )}
          <span className="text-slate-800">{tabInfo[activeTab].title}</span>
        </div>

        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none">
            {tabInfo[activeTab].title}
          </h1>
          {activeTab === 'summary' && (
            <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Closed
            </span>
          )}
        </div>
        <p className="text-[14px] font-medium text-slate-500 -mt-3">{tabInfo[activeTab].subtitle}</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Top Summary Card */}
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
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Closed
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

            {/* Horizontal Timeline - Only on Summary Tab */}
            {activeTab === 'summary' && (
              <>
                <div className="w-full h-[1px] bg-slate-100"></div>
                <div className="flex items-center justify-between relative px-2">
                  <div className="absolute top-[15px] left-[30px] right-[30px] h-[2px] bg-emerald-400 z-0"></div>

                  {inspectionOrder.timeline.map((step, idx) => {
                    const state = getStepVisualState(step.status, inspectionOrder.status);
                    return (
                      <div key={step.status} className="flex flex-col items-center gap-2 z-10 w-[100px]">
                        <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center border-[2px] ${state === 'completed' ? 'bg-white border-emerald-500 text-emerald-500' :
                            state === 'active' ? 'border-emerald-600 bg-emerald-600 text-white' :
                              'bg-white border-slate-200 text-slate-300'
                          }`}>
                          {state === 'completed' || state === 'active' ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="font-black text-[14px]">{idx + 1}</span>}
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <span className={`text-[11px] font-bold ${state === 'active' ? 'text-emerald-700' : state === 'completed' ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {step.label}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            {state === 'pending' ? "ยังไม่เริ่ม" : (
                              <>
                                {step.at.split(' ').slice(0, 3).join(' ')}<br />
                                {step.at.split(' ').slice(3).join(' ')}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>

          {/* Custom Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-200 px-2 mt-2">
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'summary' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
            >สรุปงาน</button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'details' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
            >รายละเอียดการดำเนินงาน</button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'evidence' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}>หลักฐาน (รูปภาพ / ไฟล์)</button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'timeline' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}>ไทม์ไลน์การทำงาน</button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'docs' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}>เอกสารแนบ</button>
          </div>

          {/* Tab Content: Summary */}
          {activeTab === 'summary' && (
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

                    <div className="flex flex-col gap-3">
                      <span className="text-[12px] font-bold text-slate-900">ผลการตรวจวัดหลังดำเนินการ</span>

                      <div className="grid grid-cols-4 gap-2">
                        {inspectionOrder.resultMetrics.map((metric) => (
                          <div key={metric.label} className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-100 gap-1 text-center">
                            <span className="text-[8px] font-bold text-slate-500 line-clamp-1 w-full">{metric.label}</span>
                            <span className="text-[12px] font-black text-slate-800">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                      <span className="text-[12px] font-bold text-slate-900">เวลาในการดำเนินงาน</span>

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

                  </div>
                </div>
              </div>

              {/* Column 2: Evidence */}
              <div className="flex flex-col gap-6">
                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col h-full">

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <span className="text-[12px] font-black text-[#1e293b] text-center border-b border-slate-200 pb-2">ก่อนดำเนินการ</span>
                    <span className="text-[12px] font-black text-[#1e293b] text-center border-b border-slate-200 pb-2">หลังดำเนินการ</span>

                    {inspectionOrder.evidence.filter((e) => e.kind === "photo").slice(0, 2).map((photo) => (
                      <div key={photo.id} className="w-full h-[100px] bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.url} alt={photo.title} className={`w-full h-full object-cover ${photo.grayscale ? "grayscale opacity-80" : ""}`} />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 flex-1">
                    {inspectionOrder.evidence.filter((e) => e.kind === "photo").slice(2, 7).map((photo) => (
                      <div key={photo.id} className="w-full h-[80px] bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    ดูรูปภาพทั้งหมด ({inspectionOrder.evidence.length})
                  </button>
                </div>
              </div>

              {/* Column 3: Status & Approver */}
              <div className="flex flex-col gap-6">

                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 h-full flex flex-col">
                  <h3 className="text-[15px] font-black text-[#1e293b] mb-4">ผลการตรวจรับ</h3>

                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-black text-emerald-700">อนุมัติปิดงาน</span>
                      <span className="text-[12px] font-medium text-emerald-600">ตรวจสอบแล้ว งานดำเนินการถูกต้องครบถ้วนตามมาตรฐาน</span>
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
                    </div>

                    <div className="w-full h-[1px] bg-slate-100"></div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold text-slate-900">วันที่ตรวจรับ</span>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[12px] font-medium">{inspectionOrder.approvedAt}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold text-slate-900">หมายเหตุจากผู้ตรวจรับ</span>
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg">
                        <span className="text-[12px] font-medium text-slate-500">{inspectionOrder.approvalNote}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Notice */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col gap-3 mt-6 items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-black text-blue-900">ปิดงานเรียบร้อย</span>
                      <span className="text-[11px] font-medium text-blue-700 leading-relaxed px-4">
                        งานนี้ได้ถูกบันทึกและปิดงานแล้ว ขอบคุณสำหรับการดำเนินงาน
                      </span>
                    </div>
                    <button className="w-full mt-2 py-2 rounded-lg border border-blue-200 text-blue-600 font-bold text-[12px] hover:bg-blue-50 transition-colors bg-white shadow-sm flex items-center justify-center gap-2">
                      <Download className="w-3.5 h-3.5" />
                      ดาวน์โหลดใบปิดงาน (PDF)
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Tab Content: Details */}
          {activeTab === 'details' && (
            <div className="flex flex-col gap-6">

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Operation Info */}
                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 lg:col-span-1">
                  <h3 className="text-[14px] font-black text-[#1e293b] mb-5">ข้อมูลการดำเนินงาน</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> วันที่เริ่มดำเนินการ</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">20 พ.ค. 2567 09:40 น.</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> วันที่เสร็จสิ้น</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">20 พ.ค. 2567 10:30 น.</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> รวมเวลาการดำเนินงาน</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">50 นาที</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><span className="text-[12px]">👤</span> ผู้ดำเนินการ</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">{inspectionOrder.technician.name}</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><span className="text-[12px]">👥</span> ผู้ร่วมดำเนินการ</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">-</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><span className="text-[12px]">☁️</span> สภาพอากาศ</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">แดดออก ร้อน</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><span className="text-[12px]">🌡️</span> อุณหภูมิภายนอก</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">34°C</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-2"><FileText className="w-4 h-4" /> หมายเหตุสภาพแวดล้อม</span>
                      <span className="text-[12px] font-bold text-slate-800 text-right">ปกติ</span>
                    </div>
                  </div>
                </div>

                {/* Right: Operation Steps Timeline */}
                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 lg:col-span-2">
                  <h3 className="text-[14px] font-black text-[#1e293b] mb-6">ขั้นตอนการดำเนินงาน</h3>

                  <div className="relative">
                    <div className="absolute top-[8px] bottom-[8px] left-[7.5px] w-[1px] bg-emerald-200 z-0 border-l border-dashed border-emerald-300"></div>

                    <div className="flex flex-col gap-6 relative z-10">
                      {[
                        { time: "09:40 น.", title: "เริ่มดำเนินการ ตรวจสอบเบื้องต้น", detail: "ตรวจสอบการทำงานของเครื่อง ไม่เย็น คอมเพรสเซอร์ทำงานปกติ แต่ลมร้อน" },
                        { time: "09:45 น.", title: "ตรวจวัดค่าทางไฟฟ้า", detail: "วัดกระแสไฟฟ้า แรงดันไฟฟ้า และค่าความต้านทานต่างๆ" },
                        { time: "09:50 น.", title: "ตรวจสอบระบบทำความเย็น", detail: "ตรวจสอบคอยล์ร้อน คอยล์เย็น น้ำยา และพัดลมระบายความร้อน" },
                        { time: "10:00 น.", title: "ดำเนินการแก้ไข", detail: "ทำความสะอาดคอยล์ร้อน ล้างคอยล์เย็น เติมน้ำยาแอร์" },
                        { time: "10:20 น.", title: "ตรวจสอบหลังแก้ไข", detail: "ทดสอบการทำงานของเครื่อง วัดค่าอุณหภูมิและกระแสไฟฟ้า" },
                        { time: "10:30 น.", title: "เสร็จสิ้นการดำเนินงาน", detail: "ส่งตรวจรับ" }
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-start gap-5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-1 z-10 shadow-[0_0_0_4px_white]">
                            <Check className="w-2.5 h-2.5 stroke-[4]" />
                          </div>
                          <span className="text-[13px] font-black text-slate-800 w-[60px] shrink-0 mt-0.5">{step.time}</span>
                          <div className="flex flex-col gap-1">
                            <span className="text-[13px] font-black text-blue-900">{step.title}</span>
                            <span className="text-[12px] font-medium text-slate-500">{step.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Root Cause */}
                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
                  <h3 className="text-[14px] font-black text-[#1e293b] mb-3">สาเหตุของปัญหา (Root Cause)</h3>
                  <p className="text-[13px] font-medium text-slate-600">{inspectionOrder.rootCause} ทำให้การระบายความร้อนไม่ดี</p>
                </div>
                {/* Fixes */}
                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
                  <h3 className="text-[14px] font-black text-[#1e293b] mb-3">แนวทางการแก้ไข</h3>
                  <p className="text-[13px] font-medium text-slate-600">{inspectionOrder.resolution}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Detailed Tasks */}
                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
                  <h3 className="text-[14px] font-black text-[#1e293b] mb-4">รายละเอียดงานที่ดำเนินการ</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      "ถอดแผ่นกรองอากาศ ทำความสะอาด",
                      "ล้างคอยล์เย็น ด้วยน้ำยาแอร์",
                      "ล้างคอยล์ร้อน ด้วยน้ำยาแอร์",
                      "ตรวจสอบและเติมน้ำยาแอร์ R32 จำนวน 0.5 ลิตร",
                      "ตรวจสอบระบบไฟฟ้าและการทำงานของพัดลมทุกตัว",
                      "ทดสอบการทำงานของเครื่อง ปรับตั้งอุณหภูมิ 25°C"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
                  <h3 className="text-[14px] font-black text-[#1e293b] mb-4">ผลการดำเนินงาน / ผลลัพธ์</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      "เครื่องทำความเย็นได้ปกติ",
                      "อุณหภูมิที่จุดจ่ายลม 11.2 °C",
                      "แรงดันไฟฟ้า 219 V กระแสไฟฟ้า 4.0 A",
                      "ระบบทำงานปกติ ไม่มีเสียงผิดปกติ",
                      "ส่งมอบงานให้ผู้ตรวจรับ"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Content: Evidence */}
          {activeTab === 'evidence' && (
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-2">
                <button className="px-5 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[13px] shadow-sm">ทั้งหมด ({inspectionOrder.evidence.length})</button>
                <button className="px-5 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors bg-white">รูปภาพ ({inspectionOrder.evidence.filter((e) => e.kind === "photo").length})</button>
                <button className="px-5 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors bg-white">ไฟล์เอกสาร ({inspectionOrder.evidence.filter((e) => e.kind === "file").length})</button>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[15px] font-black text-slate-900">รูปภาพ ({inspectionOrder.evidence.filter((e) => e.kind === "photo").length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {inspectionOrder.evidence.filter((e) => e.kind === "photo").map((img) => (
                    <div key={img.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                      <div className="relative h-[110px] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.title} className={`w-full h-full object-cover ${img.grayscale ? 'grayscale opacity-80' : ''}`} />
                      </div>
                      <div className="p-3 flex flex-col items-center text-center gap-1 bg-white">
                        <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{img.title}</span>
                        <span className="text-[10px] font-medium text-slate-400">{img.capturedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Timeline */}
          {activeTab === 'timeline' && (
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 w-full">
              <h3 className="text-[15px] font-black text-[#1e293b] mb-6">ประวัติและลำดับขั้นตอนการดำเนินงานทั้งหมด</h3>
              <div className="flex flex-col gap-6 relative ml-2">
                <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-slate-200"></div>
                {[...inspectionOrder.timeline].reverse().map((step) => (
                  <div key={step.status} className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-slate-800">{step.label}</span>
                      <span className="text-[12px] font-medium text-slate-500">{step.actorName ? `โดย ${step.actorName}` : step.detail}</span>
                      <span className="text-[11px] font-bold text-slate-400 mt-1">{step.at}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Docs */}
          {activeTab === 'docs' && (
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 w-full">
              <h3 className="text-[15px] font-black text-[#1e293b] mb-4">เอกสารแนบ ({inspectionOrder.documents.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inspectionOrder.documents.map((doc) => (
                  <div key={doc.id} className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center gap-4 group cursor-pointer hover:border-blue-300 hover:bg-white transition-colors shadow-sm">
                    <div className="w-10 h-10 rounded bg-rose-100 text-rose-600 flex flex-col items-center justify-center shrink-0 shadow-sm">
                      <span className="text-[10px] font-black leading-none mt-1">PDF</span>
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <span className="text-[12px] font-bold text-slate-900 truncate mb-0.5 group-hover:text-blue-600 transition-colors">{doc.name}</span>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mb-0.5">
                        <span>{doc.fileType.toUpperCase()} • {doc.sizeLabel}</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">อัปโหลดเมื่อ {doc.uploadedAt}</span>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <ClosedSidebar inspectionOrder={inspectionOrder} />
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            กลับไปหน้ารายการใบงาน
          </button>

          <div className="flex items-center gap-4">
            <button className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2">
              <FileText className="w-4 h-4 fill-white" />
              ดูใบรายงาน / ใบปิดงาน
            </button>
            <button className="px-6 py-2.5 rounded-[12px] border border-blue-600 text-blue-600 font-bold text-[14px] hover:bg-blue-50 transition-colors bg-white shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              สร้างใบงานใหม่
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// Right Sidebar Component
function ClosedSidebar({ inspectionOrder }: { inspectionOrder: InspectionOrder }) {
  const steps = inspectionOrder.timeline;
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
            <span className="text-[12px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">ต่ำ</span>
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

        <button className="w-full mt-6 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 bg-white">
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
          <div className="absolute top-[14px] bottom-[14px] left-[11px] w-[2px] bg-[#10b981] z-0"></div>

          <div className="flex flex-col gap-5 relative z-10">
            {steps.map((step) => (
              <div key={step.status} className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors bg-emerald-500 text-white`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className={`text-[12px] font-bold text-slate-800`}>
                    {step.label}
                  </span>
                  <span className={`text-[10px] font-medium text-slate-500`}>
                    {step.at}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col gap-3">
        <h3 className="text-[14px] font-black text-slate-900 mb-2">การดำเนินการต่อไป</h3>

        <button className="w-full py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Edit3 className="w-4 h-4 text-blue-600" />
            สร้างใบงานใหม่จากงานนี้
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
        <button className="w-full py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Share2 className="w-4 h-4 text-blue-600" />
            ส่งต่อให้ทีมอื่น
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

    </>
  );
}
