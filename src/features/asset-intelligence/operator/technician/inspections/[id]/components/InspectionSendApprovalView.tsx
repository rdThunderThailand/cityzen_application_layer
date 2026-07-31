"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Info,
  PenTool,
  Phone,
  Send,
  Wrench
} from "lucide-react";
import Link from "next/link";

interface InspectionSendApprovalViewProps {
  detail: TechnicianInspectionDetail;
  onBack: () => void;
  onSubmit: () => void;
}

export function InspectionSendApprovalView({ detail, onBack, onSubmit }: InspectionSendApprovalViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";

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
          <span className="text-slate-800">ส่งตรวจรับ</span>
        </div>

        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none">
            ส่งตรวจรับ
          </h1>
          <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
            พร้อมส่งตรวจรับ
          </span>
        </div>
        <p className="text-[14px] font-medium text-slate-500 -mt-3">ตรวจสอบสรุปผลการดำเนินงานและหลักฐานทั้งหมด ก่อนส่งให้เจ้าหน้าที่ตรวจรับ</p>
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
                  <span className="text-[14px] font-black text-blue-900 tracking-tight">{detail.woNumber}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100">
                    รอตรวจสอบ
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

            <div className="w-full h-[1px] bg-slate-100"></div>

            {/* Horizontal Timeline */}
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute top-[15px] left-[40px] right-[40px] h-[2px] bg-slate-100 z-0"></div>
              <div className="absolute top-[15px] left-[40px] right-[180px] h-[2px] bg-emerald-400 z-0"></div>

              {[
                { id: 1, label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "completed", icon: <Check className="w-4 h-4 stroke-[3]" /> },
                { id: 2, label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "completed", icon: <Check className="w-4 h-4 stroke-[3]" /> },
                { id: 3, label: "ถึงหน้างาน", date: "20 พ.ค. 2567 09:35", status: "completed", icon: <Check className="w-4 h-4 stroke-[3]" /> },
                { id: 4, label: "กำลังดำเนินการ", date: "20 พ.ค. 2567 09:40", status: "completed", icon: <Check className="w-4 h-4 stroke-[3]" /> },
                { id: 5, label: "สรุปผลและหลักฐาน", date: "20 พ.ค. 2567 10:30", status: "completed", icon: <Check className="w-4 h-4 stroke-[3]" /> },
                { id: 6, label: "ส่งตรวจรับ", date: "รอการตรวจรับ", status: "active", icon: <span className="font-black text-[14px]">6</span> },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 z-10 w-[120px]">
                  <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center bg-white border-[2px] ${step.status === 'completed' ? 'border-emerald-500 text-emerald-500' :
                      step.status === 'active' ? 'border-blue-600 bg-blue-600 text-white' :
                        'border-slate-200 text-slate-300'
                    }`}>
                    {step.icon}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className={`text-[12px] font-bold ${step.status === 'active' ? 'text-blue-600' : step.status === 'completed' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {step.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Column 1: Summary */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-[14px] font-black text-[#1e293b]">สรุปผลการดำเนินงาน</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">ดำเนินการเสร็จสิ้น</span>
                </div>

                <div className="p-5 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-[12px] font-bold">ปัญหาที่พบ (Root Cause)</span>
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 pl-5.5">คอยล์ร้อนสกปรก / อุดตัน</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <PenTool className="w-4 h-4" />
                      <span className="text-[12px] font-bold">การแก้ไข</span>
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 pl-5.5">ล้างคอยล์ร้อน / ทำความสะอาดชุดกรองอากาศ</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Wrench className="w-4 h-4" />
                      <span className="text-[12px] font-bold">อุปกรณ์ / อะไหล่ที่ใช้</span>
                    </div>
                    <span className="text-[13px] font-medium text-slate-500 pl-5.5">ไม่มีการเปลี่ยนอะไหล่</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-[12px] font-bold">ผลการตรวจวัด (หลังดำเนินการ)</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-100 gap-1 text-center">
                        <span className="text-[10px] font-bold text-slate-500 line-clamp-1 w-full truncate">อุณหภูมิห้อง (°C)</span>
                        <span className="text-[14px] font-black text-slate-800">24.6</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-100 gap-1 text-center">
                        <span className="text-[10px] font-bold text-slate-500 line-clamp-1 w-full truncate">แรงดันไฟฟ้า (V)</span>
                        <span className="text-[14px] font-black text-slate-800">219</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-100 gap-1 text-center">
                        <span className="text-[10px] font-bold text-slate-500 line-clamp-1 w-full truncate">กระแสไฟฟ้า (A)</span>
                        <span className="text-[14px] font-black text-slate-800">4.0</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-100 gap-1 text-center">
                        <span className="text-[10px] font-bold text-slate-500 line-clamp-1 w-full truncate">ความเย็น (°C)</span>
                        <span className="text-[14px] font-black text-slate-800">11.2</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-[12px] font-bold">ระยะเวลาดำเนินการ</span>
                    </div>
                    <div className="flex items-center gap-4 pl-5.5 mt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400">เริ่มต้น</span>
                        <span className="text-[12px] font-bold text-slate-700">09:40 น.</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400">เสร็จสิ้น</span>
                        <span className="text-[12px] font-bold text-slate-700">10:30 น.</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-auto border-t border-slate-100 bg-slate-50 p-5">
                  <h4 className="text-[12px] font-black text-slate-700 mb-3">ผู้ดำเนินการ</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent("สมชาย ช่างเทคนิค")}&background=random&color=fff`} alt="สมชาย ช่างเทคนิค" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-black text-slate-900">สมชาย ช่างเทคนิค</span>
                        <span className="text-[10px] font-bold text-slate-500">เจ้าหน้าที่ช่าง</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-[40px] w-[80px] bg-white rounded border border-slate-200 flex items-center justify-center opacity-80 mix-blend-multiply">
                        <span className="font-['Caveat'] text-blue-900 text-2xl -rotate-6">สมชาย</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 mt-1">20 พ.ค. 2567 10:30 น.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Column 2: Evidence */}
            <div className="flex flex-col gap-6">

              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5">
                <h3 className="text-[14px] font-black text-[#1e293b] mb-4">หลักฐาน (รูปภาพ / ไฟล์)</h3>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-full h-[80px] bg-slate-100 rounded-xl relative overflow-hidden group cursor-pointer border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&q=80" alt="Before" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm text-blue-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 text-center">ก่อนดำเนินการ - คอยล์ร้อน</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-full h-[80px] bg-slate-100 rounded-xl relative overflow-hidden group cursor-pointer border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80" alt="After" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm text-blue-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 text-center">หลังดำเนินการ - คอยล์ร้อน</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="w-full aspect-square bg-slate-100 rounded-lg relative overflow-hidden group cursor-pointer border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" alt="Detail 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 text-center line-clamp-1">ค่ากระแสไฟฟ้า</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full aspect-square bg-slate-100 rounded-lg relative overflow-hidden group cursor-pointer border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80" alt="Detail 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 text-center line-clamp-1">อุณหภูมิห้องลม</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full aspect-square bg-slate-100 rounded-lg relative overflow-hidden group cursor-pointer border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80" alt="Detail 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 text-center line-clamp-1">สภาพหน้างานหลังดำเนินการ</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5">
                <h3 className="text-[14px] font-black text-[#1e293b] mb-4">เอกสารแนบเพิ่มเติม</h3>
                <div className="flex items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white shrink-0 mr-3">
                    <span className="text-[11px] font-black">PDF</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[12px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">รายงานการตรวจสอบและบำรุงรักษา</span>
                    <span className="text-[10px] font-medium text-slate-500">PDF • 1.2 MB</span>
                  </div>
                  <button className="p-2 rounded-lg border border-slate-200 text-slate-500 bg-white hover:text-blue-600 transition-colors shrink-0 flex items-center gap-1.5 ml-2">
                    <Download className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold hidden sm:block">ดาวน์โหลด</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Column 3: Checklist & Notes */}
            <div className="flex flex-col gap-6">

              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5">
                <h3 className="text-[14px] font-black text-[#1e293b] mb-4">รายการตรวจสอบก่อนส่ง</h3>
                <div className="flex flex-col gap-3">
                  {[
                    "กรอกข้อมูลสรุปผลครบถ้วน",
                    "แนบรูปภาพหลักฐานเรียบร้อย",
                    "ตรวจวัดค่าทางเทคนิคแล้ว",
                    "ทำความสะอาดพื้นที่เรียบร้อย",
                    "อุปกรณ์ทำงานปกติ",
                    "ลูกค้า / หน่วยงานรับทราบผล"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-[13px] font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex-1 flex flex-col">
                <h3 className="text-[14px] font-black text-[#1e293b] mb-3">หมายเหตุเพิ่มเติม</h3>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex-1">
                  <p className="text-[13px] font-medium text-slate-600">
                    เครื่องทำงานปกติ เย็นปกติ ไม่มีเสียงผิดปกติ
                  </p>
                </div>
                <div className="text-right mt-2">
                  <span className="text-[11px] font-bold text-slate-400">33 / 500</span>
                </div>
              </div>

            </div>

          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 mt-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-black text-blue-900">การส่งตรวจรับ</span>
              <span className="text-[13px] font-medium text-blue-700 leading-relaxed">
                เมื่อกดปุ่ม &quot;ส่งตรวจรับ&quot; ระบบจะส่งข้อมูลทั้งหมดไปยังเจ้าหน้าที่ผู้ตรวจรับ เพื่อตรวจสอบและอนุมัติการปิดงาน
              </span>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <SendApprovalSidebar detail={detail} />
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <div className="flex-1">
            <button className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              บันทึกชั่วคราว
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onBack} className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              ย้อนกลับ
            </button>
            <button
              onClick={onSubmit}
              className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              <Send className="w-4 h-4 fill-white" />
              ส่งตรวจรับ
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// Right Sidebar Component
function SendApprovalSidebar({ detail }: { detail: TechnicianInspectionDetail }) {
  const steps = [
    { label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "completed" },
    { label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "completed" },
    { label: "ถึงหน้างาน", date: "20 พ.ค. 2567 09:35", status: "completed" },
    { label: "กำลังดำเนินการ", date: "20 พ.ค. 2567 09:40", status: "completed" },
    { label: "สรุปผลและหลักฐาน", date: "20 พ.ค. 2567 10:30", status: "completed" },
    { label: "ส่งตรวจรับ", date: "รอการตรวจรับ", status: "active" },
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
            <span className="text-[12px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded">สูง</span>
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
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${step.status === 'completed' ? "bg-emerald-500 text-white" :
                    step.status === 'active' ? "bg-blue-600 text-white" :
                      "bg-white text-slate-400 border-[2px] border-[#E2E8F0]"
                  }`}>
                  {step.status === 'active' ? <span className="text-[10px] font-black">6</span> : <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className={`text-[12px] font-bold ${step.status === 'active' ? 'text-blue-600' : 'text-slate-800'}`}>
                    {step.label}
                  </span>
                  <span className={`text-[10px] font-medium ${step.status === 'active' ? 'text-blue-600' : 'text-slate-500'}`}>
                    {step.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approver Info */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-5">ผู้ตรวจรับ (ผู้อนุมัติ)</h3>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border border-slate-200 shrink-0 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent("จิราภรณ์ วงศ์สุวรรณ")}&background=random&color=fff`} alt="จิราภรณ์ วงศ์สุวรรณ" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black text-slate-900 line-clamp-1">นางสาวจิราภรณ์ วงศ์สุวรรณ</span>
            <span className="text-[11px] font-bold text-slate-500 mt-0.5">หัวหน้าฝ่ายอาคารสถานที่</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[13px] font-bold text-blue-600 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
          <Phone className="w-4 h-4 shrink-0" />
          <span>02-123-4567 ต่อ 210</span>
        </div>
      </div>

    </>
  );
}
