"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import {
  Activity,
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  Clock,
  PauseCircle,
  Phone,
  Play,
  X
} from "lucide-react";
import Link from "next/link";

interface InspectionInProgressViewProps {
  detail: TechnicianInspectionDetail;
  onBack: () => void;
  onContinue: () => void;
}

export function InspectionInProgressView({ detail, onBack, onContinue }: InspectionInProgressViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";

  return (
    <div className="min-h-full flex-1 bg-slate-50 p-8 xl:p-12 w-full pb-40">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
          <Link href="/dashboard/assets/officer/technician/inspections" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>ตรวจสอบหน้างาน</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="hover:text-blue-600 transition-colors cursor-pointer">รายละเอียดใบงาน</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-800">กำลังดำเนินการ</span>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none">
              กำลังดำเนินการ
            </h1>
            <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
              กำลังดำเนินการตรวจสอบและแก้ไข
            </span>
          </div>
          <p className="text-[14px] font-medium text-slate-500">บันทึกความคืบหน้าและข้อมูลหน้างานอย่างต่อเนื่อง</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Top Summary & Timeline */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <InProgressHeaderSummary detail={detail} />

            {/* Status Bar */}
            <div className="border-t border-slate-100 p-8 xl:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/50">

              {/* Left Group (Blue Box): Time Elapsed */}
              <div className="flex items-start gap-3 min-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-500">เวลาที่ใช้</span>
                  <span className="text-[18px] font-black text-slate-800 leading-tight">00:25:18</span>
                  <span className="text-[11px] font-medium text-slate-400">เริ่มดำเนินการ 09:40 น.</span>
                </div>
              </div>

              {/* Middle Group (Yellow Box): Status & Progress */}
              <div className="flex items-center justify-center gap-8 xl:gap-16 flex-1 border-x border-slate-200 px-6">
                {/* Status */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-500 mb-1">สถานะการทำงาน</span>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                    <span className="text-[14px] font-black text-slate-800 leading-tight">กำลังดำเนินการ</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">กำลังตรวจสอบและแก้ไข</span>
                </div>

                {/* Progress */}
                <div className="flex flex-col min-w-[140px]">
                  <span className="text-[11px] font-bold text-slate-500 mb-1">ความคืบหน้ารวม</span>
                  <span className="text-[18px] font-black text-[#1D4ED8] leading-tight mb-1">42%</span>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1D4ED8]" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>

              {/* Right Group (Red Box): Last Updated & Buttons */}
              <div className="flex items-center gap-6 min-w-fit justify-end">
                {/* Last Updated */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-500 mb-1">อัปเดตล่าสุด</span>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-800" />
                    <span className="text-[14px] font-black text-slate-800 leading-tight">09:55 น.</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <InfoIcon className="w-3 h-3" />
                    บันทึกผลการตรวจวัด
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 text-[12px] font-bold hover:bg-blue-50 transition-colors flex items-center gap-1.5 bg-white">
                    <PauseCircle className="w-4 h-4" />
                    พักงานชั่วคราว
                  </button>
                  <button className="px-4 py-2.5 rounded-[10px] border border-rose-200 text-rose-600 text-[12px] font-bold hover:bg-rose-50 transition-colors flex items-center gap-1.5 bg-rose-50">
                    ยกเลิกงาน
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-8 border-b border-slate-200 px-2 mt-2">
            <button className="pb-3 border-b-2 border-blue-600 text-[14px] font-black text-blue-600">การตรวจสอบ</button>
            <button className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors">การแก้ไข / ผลดำเนินการ</button>
            <button className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors">รายการอะไหล่ที่ใช้</button>
            <button className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors">รูปภาพหน้างาน</button>
            <button className="pb-3 border-b-2 border-transparent text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors">บันทึกการทำงาน</button>
          </div>

          {/* Tab Content: การตรวจสอบ */}
          <div className="flex flex-col gap-6">

            {/* Top Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* 1. Checklist */}
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-black text-slate-900">เช็คลิสต์ตรวจสอบเบื้องต้น</h3>
                  <span className="text-[11px] font-bold text-slate-500">5 รายการ</span>
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  {[
                    { id: 1, label: "ระบบไฟฟ้า / การจ่ายไฟ", status: "ปกติ", statusColor: "text-emerald-600", statusBg: "bg-emerald-50", icon: <Check className="w-3 h-3 stroke-[3]" /> },
                    { id: 2, label: "ความผิดปกติของเสียง", status: "พบปัญหา", statusColor: "text-amber-600", statusBg: "bg-amber-50", icon: <span className="text-[10px] font-black">2</span> },
                    { id: 3, label: "ความเย็น", status: "ปกติ", statusColor: "text-emerald-600", statusBg: "bg-emerald-50", icon: <span className="text-[10px] font-black">3</span> },
                    { id: 4, label: "การระบายน้ำ", status: "พบปัญหา", statusColor: "text-amber-600", statusBg: "bg-amber-50", icon: <span className="text-[10px] font-black">4</span> },
                    { id: 5, label: "รีโมท / การควบคุม", status: "รอการตรวจสอบ", statusColor: "text-slate-500", statusBg: "bg-slate-100", icon: <span className="text-[10px] font-black">5</span> },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-dashed border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-slate-200 text-slate-400 ${item.id === 1 ? 'bg-emerald-50 border-emerald-200 text-emerald-500' : 'bg-white'}`}>
                          {item.icon}
                        </div>
                        <span className="text-[12px] font-bold text-slate-700">{item.label}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.statusBg} ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[12px] hover:bg-blue-50 transition-colors">
                  ดูเช็คลิสต์ทั้งหมด
                </button>
              </div>

              {/* 2. Measurements */}
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-black text-slate-900">ผลการตรวจวัด <span className="text-slate-500 font-bold">(ล่าสุด)</span></h3>
                  <span className="text-[11px] font-bold text-slate-500">09:55 น.</span>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="grid grid-cols-4 gap-2 mb-2 px-1">
                    <span className="text-[10px] font-bold text-slate-400">รายการตรวจวัด</span>
                    <span className="text-[10px] font-bold text-slate-400 text-center">ค่าปกติ</span>
                    <span className="text-[10px] font-bold text-slate-400 text-center">ที่วัดได้</span>
                    <span className="text-[10px] font-bold text-slate-400 text-center">ผลลัพธ์</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {[
                      { name: "แรงดันไฟฟ้า (V)", normal: "220 ± 10%", measured: "221", res: "ปกติ", resBg: "bg-emerald-50", resColor: "text-emerald-600" },
                      { name: "กระแสไฟฟ้า (A)", normal: "-", measured: "4.2", res: "ปกติ", resBg: "bg-emerald-50", resColor: "text-emerald-600" },
                      { name: "อุณหภูมิห้อง (°C)", normal: "24 - 26", measured: "30.2", res: "สูงกว่าปกติ", resBg: "bg-amber-50", resColor: "text-amber-600" },
                      { name: "อุณหภูมิลมคอยล์ (°C)", normal: "10 - 15", measured: "18.7", res: "สูงกว่าปกติ", resBg: "bg-amber-50", resColor: "text-amber-600" },
                      { name: "แรงดันน้ำยา (PSI)", normal: "120 - 150", measured: "98", res: "ต่ำกว่าปกติ", resBg: "bg-rose-50", resColor: "text-rose-600" },
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-4 gap-2 items-center py-1.5 border-b border-slate-50 last:border-0 px-1">
                        <span className="text-[11px] font-bold text-slate-700 truncate">{row.name}</span>
                        <span className="text-[11px] font-medium text-slate-500 text-center">{row.normal}</span>
                        <span className="text-[11px] font-black text-slate-800 text-center">{row.measured}</span>
                        <div className="flex justify-center">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${row.resBg} ${row.resColor} whitespace-nowrap`}>
                            {row.res}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[12px] hover:bg-blue-50 transition-colors">
                  บันทึกผลการตรวจวัด
                </button>
              </div>

              {/* 3. Photos */}
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-black text-slate-900">สภาพอุปกรณ์ ณ ปัจจุบัน</h3>
                  <span className="text-[11px] font-bold text-slate-500">* อัปโหลดล่าสุด 09:55 น.</span>
                </div>

                <div className="grid grid-cols-2 gap-2 flex-1">
                  <div className="bg-slate-100 rounded-lg relative overflow-hidden group border border-slate-200 h-[80px]">
                    <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" alt="AC Unit" className="w-full h-full object-cover" />
                    <button className="absolute top-1 right-1 w-4 h-4 bg-white/90 rounded flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-slate-100 rounded-lg relative overflow-hidden group border border-slate-200 h-[80px]">
                    <img src="https://images.unsplash.com/photo-1581092921461-7031e4bf0e5e?q=80&w=300&auto=format&fit=crop" alt="Specs" className="w-full h-full object-cover grayscale opacity-80" />
                    <button className="absolute top-1 right-1 w-4 h-4 bg-white/90 rounded flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-slate-100 rounded-lg relative overflow-hidden group border border-slate-200 h-[80px]">
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop" alt="Internal" className="w-full h-full object-cover" />
                    <button className="absolute top-1 right-1 w-4 h-4 bg-white/90 rounded flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-slate-100 rounded-lg relative overflow-hidden group border border-slate-200 h-[80px]">
                    {/* Mock thermal image */}
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 opacity-80 mix-blend-multiply absolute inset-0"></div>
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop" alt="Thermal" className="w-full h-full object-cover mix-blend-overlay" />
                    <div className="absolute bottom-1 right-1 bg-black/60 px-1 py-0.5 rounded text-[8px] font-bold text-white">32.0°C</div>
                    <button className="absolute top-1 right-1 w-4 h-4 bg-white/90 rounded flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button className="w-full mt-4 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[12px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5">
                  <Camera className="w-4 h-4" />
                  เพิ่มรูปภาพ
                </button>
              </div>
            </div>

            {/* Bottom Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Logs / Notes */}
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col lg:col-span-1">
                <h3 className="text-[14px] font-black text-slate-900 mb-3">บันทึกการดำเนินงาน / หมายเหตุ</h3>
                <div className="relative flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <textarea
                    className="w-full h-full min-h-[80px] border-none resize-none text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent"
                    defaultValue="ตรวจพบคอยล์ร้อนสกปรกและน้ำทิ้งอุดตัน ทำความสะอาดคอยล์ร้อนและล้างท่อน้ำทิ้ง"
                  ></textarea>
                  <div className="absolute bottom-2 right-3 text-[11px] font-medium text-slate-400">71 / 500</div>
                </div>
              </div>

              {/* Problems & Solutions */}
              <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">

                  {/* Problems */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col gap-4">
                    <h3 className="text-[14px] font-black text-slate-900">ปัญหาที่พบ</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-rose-50 text-rose-700 text-[12px] font-bold rounded-lg border border-rose-100">
                        คอยล์ร้อนสกปรก
                      </span>
                      <span className="px-3 py-1.5 bg-rose-50 text-rose-700 text-[12px] font-bold rounded-lg border border-rose-100">
                        น้ำทิ้งอุดตัน
                      </span>
                    </div>
                    <button className="mt-auto w-fit text-[12px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">
                      <span className="text-xl leading-none">+</span> เพิ่มปัญหา
                    </button>
                  </div>

                  {/* Solutions */}
                  <div className="p-5 flex flex-col gap-4">
                    <h3 className="text-[14px] font-black text-slate-900">แนวทางการแก้ไข</h3>
                    <div className="flex flex-col gap-2">
                      <span className="px-3 py-2 bg-blue-50 text-blue-700 text-[12px] font-bold rounded-lg border border-blue-100">
                        ทำความสะอาดคอยล์ร้อน
                      </span>
                      <span className="px-3 py-2 bg-blue-50 text-blue-700 text-[12px] font-bold rounded-lg border border-blue-100 w-fit">
                        ล้างท่อน้ำทิ้ง
                      </span>
                    </div>
                    <button className="mt-auto w-fit text-[12px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">
                      <span className="text-xl leading-none">+</span> เพิ่มแนวทางการแก้ไข
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <InProgressSidebar detail={detail} />
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center justify-between px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <button onClick={onBack} className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
            ย้อนกลับ
          </button>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              บันทึกชั่วคราว
            </button>
            <button
              onClick={onContinue}
              className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              ดำเนินการต่อ / สรุปผล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Info Icon SVG for inline use
function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
  );
}

// Top Summary Component
function InProgressHeaderSummary({ detail }: { detail: TechnicianInspectionDetail }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col xl:flex-row xl:items-start gap-6 p-8 xl:p-12 lg:p-8">
        <div className="w-[100px] h-[100px] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shrink-0 border border-slate-200 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[70%] h-[50%] bg-white rounded-md shadow-sm border border-slate-200 relative overflow-hidden flex flex-col justify-evenly px-2">
              <div className="w-full h-[3px] bg-slate-200"></div>
              <div className="w-full h-[3px] bg-slate-200"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[16px] font-black text-blue-900 tracking-tight">{detail.woNumber}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600">
                  รอดำเนินการตรวจสอบ
                </span>
              </div>
              <h2 className="text-[20px] font-black text-[#1e293b] mb-1 leading-tight">{detail.assetName}</h2>
              <p className="text-[14px] font-medium text-slate-500">{detail.assetLocation}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400">สถานที่</span>
                <span className="text-[12px] font-bold text-slate-700">{detail.location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400">ผู้แจ้ง</span>
                <span className="text-[12px] font-bold text-slate-700">{detail.reporterName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400">กำหนดตรวจสอบ</span>
                <span className="text-[12px] font-bold text-slate-700">{detail.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-200 my-2"></div>

          {/* Timeline */}
          <div className="relative w-full max-w-5xl">
            {/* The connecting horizontal line segments */}
            {/* Blue line from 1 to 4 */}
            <div className="absolute top-[14px] left-[8.33%] right-[41.66%] h-[2px] bg-[#1D4ED8] z-0"></div>
            {/* Grey line from 4 to 6 */}
            <div className="absolute top-[14px] left-[58.33%] right-[8.33%] h-[2px] bg-[#E2E8F0] z-0"></div>

            <div className="flex justify-between relative z-10">
              {/* Step 1: Green checkmark */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-white border-[2px] border-emerald-500 flex items-center justify-center text-emerald-500 mb-2 z-10">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[12px] font-bold text-emerald-600">รับงานแล้ว</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:15</span>
              </div>

              {/* Step 2: Green car */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-white border-[2px] border-emerald-500 flex items-center justify-center text-emerald-500 mb-2 z-10">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[12px] font-bold text-emerald-600">กำลังเดินทาง</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:20</span>
              </div>

              {/* Step 3: Green Map Pin */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-white border-[2px] border-emerald-500 flex items-center justify-center text-emerald-500 mb-2 z-10">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[12px] font-bold text-emerald-600">ถึงหน้างาน</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:35</span>
              </div>

              {/* Step 4: Active Blue Pin/Play */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white mb-2 z-10 shadow-md shadow-blue-200">
                  <Activity className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[12px] font-bold text-[#1D4ED8]">กำลังดำเนินการ</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">เริ่ม 20 พ.ค. 2567 09:40</span>
              </div>

              {/* Steps 5 to 6 */}
              {["สรุปผลและแนบหลักฐาน", "ส่งตรวจรับ"].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-white border-[2px] border-[#E2E8F0] text-slate-400 text-[11px] font-black flex items-center justify-center mb-2 z-10">
                    {idx + 5}
                  </div>
                  <span className="text-[12px] font-bold text-slate-700">{label}</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-1">รอทำรายการ</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Right Sidebar Component
function InProgressSidebar({ detail }: { detail: TechnicianInspectionDetail }) {
  const steps = [
    { label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "completed" },
    { label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "completed" },
    { label: "ถึงหน้างาน", date: "20 พ.ค. 2567 09:35", status: "completed" },
    { label: "กำลังดำเนินการ", date: "กำลังดำเนินการ", status: "active" },
    { label: "สรุปผลและแนบหลักฐาน", date: "รอทำรายการ", status: "pending" },
    { label: "ส่งตรวจรับ", date: "รอทำรายการ", status: "pending" },
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
      </div>

      {/* Vertical Progress */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-black text-slate-900">ความคืบหน้างาน</h3>
          <span className="text-[14px] font-black text-blue-900">42%</span>
        </div>

        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6">
          <div className="h-full bg-[#1D4ED8] rounded-full" style={{ width: `42%` }}></div>
        </div>

        <div className="relative">
          <div className="absolute top-[14px] bottom-[14px] left-[11px] w-[2px] bg-[#E2E8F0] z-0"></div>

          <div className="flex flex-col gap-5 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${step.status === 'completed' ? "bg-emerald-500 text-white" :
                    step.status === 'active' ? "bg-[#1D4ED8] text-white" : "bg-white text-slate-400 border-[2px] border-[#E2E8F0]"
                  }`}>
                  {step.status === 'completed' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className={`text-[12px] font-bold ${step.status === 'completed' ? "text-slate-800" :
                      step.status === 'active' ? "text-[#1D4ED8]" : "text-slate-700"
                    }`}>
                    {step.label}
                  </span>
                  <span className={`text-[10px] font-medium ${step.status === 'completed' ? "text-slate-500" :
                      step.status === 'active' ? "text-[#1D4ED8]" : "text-slate-400"
                    }`}>
                    {step.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reporter Contact */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-5">ผู้แจ้งงาน</h3>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border border-slate-200 shrink-0 shadow-sm">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(detail.reporterName)}&background=random&color=fff`} alt={detail.reporterName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-slate-900">{detail.reporterName} ({detail.reporterDept})</span>
            <span className="text-[11px] font-medium text-slate-500 mt-0.5">เบอร์โทร: {detail.reporterPhone}</span>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-[10px] border border-slate-200 text-blue-600 font-bold text-[13px] hover:bg-slate-50 transition-colors bg-white flex items-center justify-center gap-2 shadow-sm">
          <Phone className="w-4 h-4" />
          โทรออก
        </button>
      </div>

    </>
  );
}
