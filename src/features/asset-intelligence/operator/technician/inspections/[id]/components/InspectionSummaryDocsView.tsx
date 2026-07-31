"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  CloudUpload,
  Download,
  FileText,
  Grid,
  Info,
  List,
  MoreHorizontal,
  Phone
} from "lucide-react";
import Link from "next/link";

interface InspectionSummaryDocsViewProps {
  detail: TechnicianInspectionDetail;
  onTabChange?: (tab: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function InspectionSummaryDocsView({ detail, onTabChange, onBack, onNext }: InspectionSummaryDocsViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";

  const docs = [
    { id: 1, type: "pdf", color: "bg-red-500", name: "รายงานการตรวจสอบและบำรุงรักษา.pdf", sub: "รายงานผลการตรวจสอบระบบ", docType: "รายงาน", uploader: "สมชาย ช่างเทคนิค", date: "20 พ.ค. 2567 10:30 น.", size: "1.2 MB" },
    { id: 2, type: "xls", color: "bg-emerald-500", name: "ตารางบันทึกการวัดค่า.xlsx", sub: "ผลการวัดอุณหภูมิ และกระแสไฟฟ้า", docType: "ข้อมูลการวัด", uploader: "สมชาย ช่างเทคนิค", date: "20 พ.ค. 2567 10:29 น.", size: "28 KB" },
    { id: 3, type: "pdf", color: "bg-red-500", name: "ใบเสนอราคาอะไหล่.pdf", sub: "ใบเสนอราคาจากผู้จำหน่าย", docType: "เอกสารอ้างอิง", uploader: "สมชาย ช่างเทคนิค", date: "20 พ.ค. 2567 10:25 น.", size: "0.8 MB" },
    { id: 4, type: "jpg", color: "bg-blue-500", name: "แผนผังจุดติดตั้ง.jpg", sub: "ตำแหน่งติดตั้งเครื่องปรับอากาศ", docType: "แผนผัง / แบบแปลน", uploader: "สมชาย ช่างเทคนิค", date: "20 พ.ค. 2567 10:20 น.", size: "1.5 MB" },
    { id: 5, type: "zip", color: "bg-slate-500", name: "เอกสารเพิ่มเติม.zip", sub: "รวมเอกสารเพิ่มเติม", docType: "อื่นๆ", uploader: "สมชาย ช่างเทคนิค", date: "20 พ.ค. 2567 10:15 น.", size: "5.6 MB" },
  ];

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
          <span className="text-slate-800">เอกสารแนบ</span>
        </div>

        <div>
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-1.5">
            เอกสารแนบ
          </h1>
          <p className="text-[14px] font-medium text-slate-500">ดูและจัดการเอกสารที่เกี่ยวข้องกับการดำเนินงาน</p>
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
                <span className="text-[14px] font-black text-blue-900 tracking-tight">{detail.woNumber}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  ปิดงานแล้ว (Closed)
                </span>
              </div>
              <h2 className="text-[16px] font-black text-[#1e293b] mb-1">{detail.assetName}</h2>
              <p className="text-[12px] font-medium text-slate-500">{detail.assetLocation}</p>
            </div>

            <div className="hidden md:block w-[1px] h-12 bg-slate-200 mx-2"></div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">📍</span>
                  สถานที่
                </span>
                <span className="text-[12px] font-bold text-slate-700 pl-5 line-clamp-1">{detail.location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">👤</span>
                  ผู้แจ้ง
                </span>
                <span className="text-[12px] font-bold text-slate-700 pl-5 truncate">{detail.reporterName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">📅</span>
                  กำหนดตรวจสอบ
                </span>
                <span className="text-[12px] font-bold text-slate-700 pl-5">{detail.dueDate}</span>
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
            <button
              onClick={() => onTabChange && onTabChange('costs')}
              className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >ค่าใช้จ่ายอื่นๆ (ถ้ามี)</button>
            <button className="pb-3 border-b-2 border-blue-600 text-[14px] font-black text-blue-600">เอกสารแนบ</button>
          </div>

          {/* Docs Table Card */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col p-5">

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-black text-slate-900">เอกสารแนบ (5 รายการ)</h3>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg border border-blue-200 text-blue-600 text-[12px] font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 bg-white">
                  <CloudUpload className="w-4 h-4" />
                  อัปโหลดเอกสาร
                </button>
                <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold text-[12px] hover:bg-slate-50 transition-colors flex items-center gap-2 bg-white">
                  จัดเรียง: ล่าสุด
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                  <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-md bg-white shadow-sm text-blue-600">
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-5 w-[60px]"></th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[280px]">ชื่อเอกสาร</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[140px]">ประเภทเอกสาร</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[140px]">อัปโหลดโดย</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[140px]">วันที่อัปโหลด</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-slate-500 w-[100px]">ขนาดไฟล์</th>
                    <th className="py-3 px-5 text-[11px] font-bold text-slate-500 w-[100px] text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5">
                        <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-white shrink-0`}>
                          <span className="text-[10px] font-black uppercase tracking-wider">{item.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 flex flex-col justify-center">
                        <span className="text-[13px] font-black text-[#1e293b] mb-0.5 hover:text-blue-600 cursor-pointer transition-colors">{item.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">{item.sub}</span>
                      </td>
                      <td className="py-4 px-4 text-[12px] font-medium text-slate-600">{item.docType}</td>
                      <td className="py-4 px-4 text-[12px] font-medium text-slate-600">{item.uploader}</td>
                      <td className="py-4 px-4 text-[11px] font-medium text-slate-500">
                        {item.date.split(' ').slice(0, 3).join(' ')}<br />
                        {item.date.split(' ').slice(3).join(' ')}
                      </td>
                      <td className="py-4 px-4 text-[12px] font-medium text-slate-600">{item.size}</td>
                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-md transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <Info className="w-3.5 h-3.5" />
              <span>รองรับไฟล์ทุกประเภท (ขนาดสูงสุดต่อไฟล์ 50 MB)</span>
            </div>

          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <SummaryDocsSidebar detail={detail} />
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <div className="flex-1">
            {/* Empty space to align right buttons */}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onBack} className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              ย้อนกลับ
            </button>
            <button
              onClick={onNext}
              className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[3] text-white" />
              </div>
              บันทึกและเสร็จสิ้น
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// Right Sidebar Component
function SummaryDocsSidebar({ detail }: { detail: TechnicianInspectionDetail }) {
  const steps = [
    { label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "completed" },
    { label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "completed" },
    { label: "ถึงหน้างาน", date: "20 พ.ค. 2567 09:35", status: "completed" },
    { label: "กำลังดำเนินการ", date: "20 พ.ค. 2567 09:40", status: "completed" },
    { label: "สรุปผลและหลักฐาน", date: "20 พ.ค. 2567 10:30", status: "completed" },
    { label: "ส่งตรวจรับ", date: "20 พ.ค. 2567 10:35", status: "completed" },
    { label: "ปิดงานแล้ว", date: "20 พ.ค. 2567 14:25", status: "closed" },
  ];

  return (
    <>
      {/* WO Summary */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-6">สรุปรายละเอียดใบงาน</h3>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">เลขที่ใบงาน</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">{detail.woNumber}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">ประเภทงาน</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">{detail.taskType}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[12px] font-bold text-slate-500">ความเร่งด่วน</span>
            <span className="text-[12px] font-black text-rose-600">สูง</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">วันที่แจ้ง</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">{detail.woDate}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">ผู้แจ้ง</span>
            <span className="text-[12px] font-bold text-blue-600 text-right">{detail.reporterName} ({detail.reporterDept})</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">สถานที่</span>
            <span className="text-[12px] font-bold text-slate-800 text-right line-clamp-2 w-[160px]">{detail.location}</span>
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
          <span className="text-[14px] font-black text-blue-900">100%</span>
        </div>

        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6">
          <div className="h-full bg-[#1D4ED8] rounded-full" style={{ width: `100%` }}></div>
        </div>

        <div className="relative">
          <div className="absolute top-[14px] bottom-[14px] left-[11px] w-[2px] bg-[#E2E8F0] z-0"></div>

          <div className="flex flex-col gap-5 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${step.status === 'completed' || step.status === 'closed' ? "bg-emerald-500 text-white" : "bg-white text-slate-400 border-[2px] border-[#E2E8F0]"
                  }`}>
                  {step.status === 'closed' ? <span className="text-[10px] font-black">7</span> : <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className={`text-[12px] font-bold text-slate-800`}>
                    {step.label}
                  </span>
                  <span className={`text-[10px] font-medium text-slate-500`}>
                    {step.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technician Info */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-5">ผู้รับผิดชอบงาน</h3>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border border-slate-200 shrink-0 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent("สมชาย ช่างเทคนิค")}&background=random&color=fff`} alt="สมชาย ช่างเทคนิค" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black text-slate-900">สมชาย ช่างเทคนิค</span>
            <span className="text-[11px] font-bold text-slate-500 mt-0.5">เจ้าหน้าที่ช่าง</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[13px] font-bold text-blue-600 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
          <Phone className="w-4 h-4 shrink-0" />
          <span>081-234-5678</span>
        </div>
      </div>

    </>
  );
}
