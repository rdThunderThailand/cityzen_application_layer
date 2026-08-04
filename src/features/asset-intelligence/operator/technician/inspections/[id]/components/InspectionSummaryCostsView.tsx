"use client";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  Edit3,
  FileText,
  Image as ImageIcon,
  Phone,
  Plus,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { getProgressPercent, getStepVisualState } from "../statusView";
import { InspectionOrder } from "../types";

interface InspectionSummaryCostsViewProps {
  inspectionOrder: InspectionOrder;
  onTabChange?: (tab: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function InspectionSummaryCostsView({ inspectionOrder, onTabChange, onBack, onNext }: InspectionSummaryCostsViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";

  const costs = inspectionOrder.costs;
  const subtotal = costs.reduce((sum, c) => sum + c.amount, 0);
  const vat = subtotal * 0.07;
  const grandTotal = subtotal + vat;

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
          <span className="hover:text-blue-600 transition-colors cursor-pointer">สรุปผลและหลักฐาน</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-800">ค่าใช้จ่ายอื่นๆ (ถ้ามี)</span>
        </div>

        <div>
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-1.5">
            ค่าใช้จ่ายอื่นๆ (ถ้ามี)
          </h1>
          <p className="text-[14px] font-medium text-slate-500">บันทึกค่าใช้จ่ายอื่นๆ ที่เกิดขึ้นนอกเหนือจากการใช้อะไหล่ในการดำเนินงาน (ถ้ามี)</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Top Horizontal WO Summary */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-6">
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
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  ปิดงานแล้ว (Closed)
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

          {/* Tabs Navigation */}
          <div className="flex items-center gap-8 border-b border-slate-200 px-2">
            <button
              onClick={() => onTabChange && onTabChange('summary')}
              className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >สรุปผลการตรวจสอบ</button>
            <button
              onClick={() => onTabChange && onTabChange('evidence')}
              className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >หลักฐาน (รูปภาพ / ไฟล์)</button>
            <button
              onClick={() => onTabChange && onTabChange('parts')}
              className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >รายการอะไหล่ที่ใช้</button>
            <button className="pb-3 border-b-2 border-blue-600 text-[14px] font-black text-blue-600">ค่าใช้จ่ายอื่นๆ (ถ้ามี)</button>
            <button
              onClick={() => onTabChange && onTabChange('docs')}
              className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >เอกสารแนบ</button>
          </div>

          {/* Costs Table Card */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col">
            <div className="p-5 flex items-center justify-between border-b border-slate-100">
              <h3 className="text-[15px] font-black text-slate-900">รายการค่าใช้จ่ายอื่นๆ (ถ้ามี)</h3>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg border border-blue-200 text-blue-600 text-[12px] font-bold hover:bg-blue-50 transition-colors flex items-center gap-1.5 bg-white">
                  <Plus className="w-4 h-4" />
                  เพิ่มค่าใช้จ่าย
                </button>
                <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-400 text-[12px] font-bold flex items-center gap-1.5 bg-slate-50 cursor-not-allowed">
                  <Trash2 className="w-4 h-4" />
                  ลบรายการที่เลือก
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-5 w-[40px]">
                      <div className="w-4 h-4 rounded border border-slate-300 bg-white"></div>
                    </th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[60px]">ลำดับ</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[180px]">ประเภทค่าใช้จ่าย</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 flex-1">รายละเอียด</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[160px]">ผู้ให้บริการ / ร้านค้า</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[120px] text-right">จำนวนเงิน (บาท)</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[160px]">เอกสาร / หลักฐาน</th>
                    <th className="py-3 px-5 text-[11px] font-bold text-slate-500 w-[80px] text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5">
                        <div className="w-4 h-4 rounded border border-slate-300 bg-white"></div>
                      </td>
                      <td className="py-4 px-4 text-[12px] font-bold text-slate-500">{item.id}</td>
                      <td className="py-4 px-4 text-[12px] font-bold text-slate-700">{item.type}</td>
                      <td className="py-4 px-4 text-[12px] font-medium text-slate-500">{item.description}</td>
                      <td className="py-4 px-4 text-[12px] font-bold text-slate-700">{item.provider}</td>
                      <td className="py-4 px-4 text-[12px] font-bold text-slate-900 text-right">{item.amount.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-[12px] font-bold text-blue-600 hover:underline cursor-pointer">
                          {item.documentType === 'pdf' ? <FileText className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                          {item.documentName}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-md transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Subtotal */}
            <div className="flex justify-end border-t border-slate-200 bg-slate-50/30 p-6">
              <div className="w-[320px] flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500">รวมค่าใช้จ่ายอื่นๆ</span>
                  <span className="text-[12px] font-bold text-slate-700">{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500">ภาษีมูลค่าเพิ่ม 7%</span>
                  <span className="text-[12px] font-bold text-slate-700">{vat.toFixed(2)}</span>
                </div>
                <div className="w-full h-[1px] bg-slate-200 my-1"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-black text-blue-600">รวมทั้งสิ้น</span>
                  <span className="text-[16px] font-black text-blue-600">{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col mb-4">
            <h3 className="text-[14px] font-black text-slate-900 mb-3">หมายเหตุเพิ่มเติม</h3>
            <div className="relative flex-1 bg-white border border-slate-200 rounded-xl p-4">
              <textarea
                className="w-full min-h-[60px] border-none resize-none text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none"
                placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)"
              ></textarea>
              <div className="absolute bottom-3 right-4 text-[11px] font-bold text-slate-400">0 / 500</div>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <SummaryCostsSidebar inspectionOrder={inspectionOrder} />
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <div className="flex-1">
            <button className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              บันทึกร่าง
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onBack} className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              ย้อนกลับ
            </button>
            <button
              onClick={onNext}
              className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              ถัดไป: เอกสารแนบ
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// Right Sidebar Component
function SummaryCostsSidebar({ inspectionOrder }: { inspectionOrder: InspectionOrder }) {
  const steps = inspectionOrder.timeline;
  const progressPercent = getProgressPercent(inspectionOrder.status);

  return (
    <>
      {/* WO Summary */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-6">สรุปรายละเอียดใบงาน</h3>

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
            <span className="text-[12px] font-black text-rose-600">{inspectionOrder.priority}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">วันที่แจ้ง</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">{inspectionOrder.woDate}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">ผู้แจ้ง</span>
            <span className="text-[12px] font-bold text-blue-600 text-right">{inspectionOrder.reporterName} ({inspectionOrder.reporterDept})</span>
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
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${state === 'completed' ? "bg-emerald-500 text-white" : state === 'active' ? "bg-[#1D4ED8] text-white" : "bg-white text-slate-400 border-[2px] border-[#E2E8F0]"
                    }`}>
                    {state === 'completed' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className={`text-[12px] font-bold text-slate-800`}>
                      {step.label}
                    </span>
                    <span className={`text-[10px] font-medium text-slate-500`}>
                      {state === 'pending' ? "ยังไม่เริ่ม" : step.at}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Technician Info */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-5">ผู้รับผิดชอบงาน</h3>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border border-slate-200 shrink-0 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inspectionOrder.technician.name)}&background=random&color=fff`} alt={inspectionOrder.technician.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black text-slate-900">{inspectionOrder.technician.name}</span>
            <span className="text-[11px] font-bold text-slate-500 mt-0.5">{inspectionOrder.technician.role}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[13px] font-bold text-blue-600 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
          <Phone className="w-4 h-4 shrink-0" />
          <span>{inspectionOrder.technician.phone}</span>
        </div>
      </div>

    </>
  );
}
