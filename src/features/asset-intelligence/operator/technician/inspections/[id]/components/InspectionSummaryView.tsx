"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  CloudUpload,
  Download,
  FileText,
  Grid,
  List,
  MoreHorizontal,
  Phone,
  Play,
  X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface InspectionSummaryViewProps {
  detail: TechnicianInspectionDetail;
  initialTab?: 'summary' | 'evidence';
  onTabChange?: (tab: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function InspectionSummaryView({ detail, initialTab = 'summary', onTabChange, onBack }: InspectionSummaryViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";

  type TabType = 'summary' | 'evidence' | 'parts' | 'costs' | 'docs';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
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
          <span className="text-slate-800">สรุปผลและหลักฐาน</span>
        </div>

        <div>
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-1.5">
            {activeTab === 'summary' ? 'สรุปผลและหลักฐาน' : 'หลักฐาน (รูปภาพ / ไฟล์)'}
          </h1>
          <p className="text-[14px] font-medium text-slate-500">
            {activeTab === 'summary'
              ? 'ตรวจสอบความถูกต้องของข้อมูล และแนบหลักฐานก่อนส่งตรวจรับ'
              : 'รวบรวมรูปภาพและเอกสารหลักฐานที่ใช้ในการดำเนินงาน'
            }
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Top Summary & Timeline */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden p-8 xl:p-12 lg:p-8">
            <SummaryHeaderSummary detail={detail} />
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-8 border-b border-slate-200 px-2 mt-2">
            <button
              onClick={() => handleTabClick('summary')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'summary' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
            >สรุปผลการตรวจสอบ</button>
            <button
              onClick={() => handleTabClick('evidence')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'evidence' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
            >หลักฐาน (รูปภาพ / ไฟล์)</button>
            <button
              onClick={() => handleTabClick('parts')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'parts' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
            >รายการอะไหล่ที่ใช้</button>
            <button
              onClick={() => handleTabClick('costs')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'costs' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
            >ค่าใช้จ่ายอื่นๆ (ถ้ามี)</button>
            <button
              onClick={() => handleTabClick('docs')}
              className={`pb-3 border-b-2 text-[14px] transition-colors ${activeTab === 'docs' ? 'border-blue-600 font-black text-blue-600' : 'border-transparent font-bold text-slate-500 hover:text-slate-800'}`}
            >เอกสารแนบ</button>
          </div>

          {activeTab === 'summary' && (
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

              {/* Left Col: Forms & Checklists */}
              <div className="flex flex-col gap-6">

                {/* Operation Result */}
                <div className="flex flex-col gap-3">
                  <span className="text-[13px] font-black text-slate-900">ผลการดำเนินการ</span>
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-4 border-emerald-500 bg-white shadow-sm flex items-center justify-center relative"></div>
                      <span className="text-[13px] font-bold text-slate-900">แก้ไขเรียบร้อย</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                      <span className="text-[13px] font-medium text-slate-500">แก้ไขได้บางส่วน</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                      <span className="text-[13px] font-medium text-slate-500">ยังไม่สามารถแก้ไขได้</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                      <span className="text-[13px] font-medium text-slate-500">ยกเลิกงาน</span>
                    </label>
                  </div>
                </div>

                {/* Root Cause */}
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-black text-slate-900">สาเหตุของปัญหา (Root Cause)</span>
                  <div className="w-full h-10 border border-slate-200 rounded-[10px] flex items-center justify-between px-3 cursor-pointer">
                    <span className="text-[13px] font-medium text-slate-700">คอยล์ร้อนสกปรก / อุดตัน</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Actions Taken */}
                <div className="flex flex-col gap-3">
                  <span className="text-[13px] font-black text-slate-900">การแก้ไขที่ดำเนินการ</span>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { label: "ทำความสะอาดคอยล์ร้อน", checked: true },
                      { label: "ตรวจเช็คแรงดันน้ำยา", checked: true },
                      { label: "ทำความสะอาดแผ่นกรองอากาศ", checked: true },
                      { label: "เปลี่ยนคอมเพรสเซอร์", checked: false },
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-2.5 cursor-pointer">
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border border-slate-300 bg-white'}`}>
                          {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-[13px] font-bold ${item.checked ? 'text-slate-800' : 'text-slate-500'}`}>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Test Results */}
                <div className="flex flex-col gap-3 mt-2">
                  <span className="text-[13px] font-black text-slate-900">ผลการทดสอบหลังดำเนินการ</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500">อุณหภูมิที่วัดได้ (°C)</span>
                      <input type="text" defaultValue="16.2" className="w-full h-10 border border-slate-200 rounded-[10px] px-3 text-[13px] font-bold text-slate-800 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500">แรงดันไฟฟ้า (V)</span>
                      <input type="text" defaultValue="220" className="w-full h-10 border border-slate-200 rounded-[10px] px-3 text-[13px] font-bold text-slate-800 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500">กระแสไฟฟ้า (A)</span>
                      <input type="text" defaultValue="4.1" className="w-full h-10 border border-slate-200 rounded-[10px] px-3 text-[13px] font-bold text-slate-800 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500">ความเย็น</span>
                      <div className="w-full h-10 border border-slate-200 rounded-[10px] flex items-center justify-between px-3">
                        <span className="text-[13px] font-bold text-slate-800">ปกติ</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-[13px] font-black text-slate-900">หมายเหตุเพิ่มเติม</span>
                  <div className="relative w-full h-[80px] border border-slate-200 rounded-[10px] p-3">
                    <textarea
                      className="w-full h-full border-none resize-none text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none"
                      defaultValue="เครื่องทำงานปกติ เย็นปกติ ไม่มีเสียงผิดปกติ"
                    ></textarea>
                    <div className="absolute bottom-2 right-3 text-[11px] font-bold text-slate-400">37 / 500</div>
                  </div>
                </div>

              </div>

              {/* Right Col: Photos Grid */}
              <div className="flex flex-col gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <span className="text-[13px] font-black text-slate-900">หลักฐาน (รูปภาพ)</span>

                <div className="grid grid-cols-2 gap-4">
                  <span className="text-[12px] font-bold text-slate-500 text-center">ก่อนดำเนินการ</span>
                  <span className="text-[12px] font-bold text-slate-500 text-center">หลังดำเนินการ</span>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1">
                  {/* Row 1 */}
                  <div className="bg-slate-200 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" alt="Before" className="w-full h-full object-cover grayscale opacity-80" />
                    <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="bg-slate-200 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" alt="After" className="w-full h-full object-cover" />
                    <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Row 2 */}
                  <div className="bg-slate-200 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1581092921461-7031e4bf0e5e?q=80&w=300&auto=format&fit=crop" alt="Before" className="w-full h-full object-cover grayscale opacity-80" />
                    <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="bg-slate-200 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1581092921461-7031e4bf0e5e?q=80&w=300&auto=format&fit=crop" alt="After" className="w-full h-full object-cover" />
                    <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Row 3 */}
                  <div className="bg-slate-200 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop" alt="Before Thermal" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay"></div>
                    <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="bg-slate-200 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop" alt="After Thermal" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay"></div>
                    <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <button className="w-full py-3 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 bg-white">
                    <Camera className="w-4 h-4" />
                    เพิ่มรูปภาพ
                  </button>
                  <span className="text-[11px] font-medium text-slate-400 text-center mt-2">รองรับไฟล์ JPG, PNG ไม่เกิน 10 MB ต่อไฟล์</span>
                </div>
              </div>

            </div>
          )}

          {/* Evidence Tab Content */}
          {activeTab === 'evidence' && (
            <div className="flex flex-col gap-6 w-full">
              {/* Filter / Action Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="px-5 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[13px] shadow-sm">
                    ทั้งหมด (12)
                  </button>
                  <button className="px-5 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors bg-white">
                    รูปภาพ (10)
                  </button>
                  <button className="px-5 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors bg-white">
                    ไฟล์เอกสาร (2)
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-4 py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors flex items-center gap-2 bg-white">
                    <CloudUpload className="w-4 h-4" />
                    เพิ่มหลักฐาน
                  </button>
                  <button className="px-4 py-2.5 rounded-[10px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-2 bg-white">
                    จัดเรียง: ล่าสุด
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    <button className="p-1.5 rounded-md bg-white shadow-sm text-blue-600">
                      <Grid className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Photos Section */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[15px] font-black text-slate-900">รูปภาพ (10)</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[
                    { id: 1, title: "ก่อนดำเนินการ - คอยล์ร้อน", date: "20 พ.ค. 2567 09:41", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", grayscale: true },
                    { id: 2, title: "ก่อนดำเนินการ - คอยล์เย็น", date: "20 พ.ค. 2567 09:41", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", grayscale: true },
                    { id: 3, title: "ป้ายสเปคเครื่อง", date: "20 พ.ค. 2567 09:42", url: "https://images.unsplash.com/photo-1581092921461-7031e4bf0e5e?q=80&w=300&auto=format&fit=crop" },
                    { id: 4, title: "วัดอุณหภูมิก่อนดำเนินการ", date: "20 พ.ค. 2567 09:42", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop" },
                    { id: 5, title: "วัดอุณหภูมิหลังดำเนินการ", date: "20 พ.ค. 2567 10:28", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop" },
                    { id: 6, title: "ตรวจสอบการทำงาน", date: "20 พ.ค. 2567 09:50", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" },
                    { id: 7, title: "สภาพหน้างานหลังดำเนินการ", date: "20 พ.ค. 2567 10:29", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" },
                    { id: 8, title: "ตรวจสอบระบบไฟฟ้า", date: "20 พ.ค. 2567 10:10", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" },
                    { id: 9, title: "หลังดำเนินการ - คอยล์ร้อน", date: "20 พ.ค. 2567 10:15", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" },
                    { id: 10, title: "หลังดำเนินการ - คอยล์เย็น", date: "20 พ.ค. 2567 10:15", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" },
                  ].map((img) => (
                    <div key={img.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
                      <div className="relative h-[110px] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${img.grayscale ? 'grayscale opacity-80' : ''}`} />
                        <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-black/40 backdrop-blur-sm rounded flex items-center justify-center text-[10px] font-black text-white">
                          {img.id}
                        </div>
                        <button className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-3 flex flex-col items-center text-center gap-1 bg-white">
                        <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{img.title}</span>
                        <span className="text-[10px] font-medium text-slate-400">{img.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Files Section */}
              <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-[15px] font-black text-slate-900">ไฟล์เอกสาร (2)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[
                    { id: 1, title: "รายงานการตรวจสอบและบำรุงรักษา", meta: "PDF • 1.2 MB", date: "อัปโหลดเมื่อ 20 พ.ค. 2567 10:30" },
                    { id: 2, title: "ใบเสนอราคาอะไหล่ (ถ้ามี)", meta: "PDF • 0.8 MB", date: "อัปโหลดเมื่อ 20 พ.ค. 2567 10:31" },
                  ].map((doc) => (
                    <div key={doc.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                      <div className="w-10 h-10 rounded bg-rose-100 text-rose-600 flex flex-col items-center justify-center shrink-0 shadow-sm">
                        <span className="text-[10px] font-black leading-none mt-1">PDF</span>
                      </div>
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <span className="text-[12px] font-bold text-slate-900 truncate mb-0.5">{doc.title}</span>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mb-0.5">
                          <span>{doc.meta}</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">{doc.date}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-blue-600 flex items-center justify-center transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Removed Inline Action Buttons for Evidence Tab */}

            </div>
          )}


        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
          <SummarySidebar detail={detail} />
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
            <button onClick={() => {
              if (activeTab === 'evidence') handleTabClick('summary');
              else onBack();
            }} className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              ย้อนกลับ
            </button>
            <button
              onClick={() => {
                if (activeTab === 'summary') handleTabClick('evidence');
                else if (activeTab === 'evidence') handleTabClick('parts');
              }}
              className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              {activeTab === 'summary' ? (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  ถัดไป: หลักฐาน (รูปภาพ / ไฟล์)
                </>
              ) : (
                <>
                  ถัดไป: รายการอะไหล่ที่ใช้
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Top Summary Component (matches original header style)
function SummaryHeaderSummary({ detail }: { detail: TechnicianInspectionDetail }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-[80px] h-[80px] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shrink-0 border border-slate-200 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] h-[50%] bg-white rounded-md shadow-sm border border-slate-200 relative overflow-hidden flex flex-col justify-evenly px-2">
                <div className="w-full h-[2px] bg-slate-200"></div>
                <div className="w-full h-[2px] bg-slate-200"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[15px] font-black text-blue-900 tracking-tight">{detail.woNumber}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                รอดำเนินการตรวจสอบ
              </span>
            </div>
            <h2 className="text-[18px] font-black text-[#1e293b] mb-1">{detail.assetName}</h2>
            <p className="text-[13px] font-medium text-slate-500">{detail.assetLocation}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-1">
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

      <div className="w-full h-[1px] bg-slate-100 my-2"></div>

      {/* Timeline */}
      <div className="relative w-full max-w-5xl pt-4 mx-auto">
        {/* Lines */}
        <div className="absolute top-[30px] left-[8.33%] right-[25%] h-[2px] bg-emerald-500 z-0"></div>
        <div className="absolute top-[30px] left-[75%] right-[8.33%] h-[2px] bg-[#E2E8F0] z-0"></div>

        <div className="flex justify-between relative z-10">
          {[
            { label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "done" },
            { label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "done" },
            { label: "ถึงหน้างาน", date: "20 พ.ค. 2567 09:35", status: "done" },
            { label: "กำลังดำเนินการ", date: "20 พ.ค. 2567 09:40", status: "done" },
            { label: "สรุปผลและหลักฐาน", date: "กำลังดำเนินการ", status: "active" },
            { label: "ส่งตรวจรับ", date: "รอทำรายการ", status: "pending" },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black mb-2.5 z-10 ${step.status === 'done' ? 'bg-white border-2 border-emerald-500 text-emerald-500' :
                  step.status === 'active' ? 'bg-[#1D4ED8] text-white shadow-md shadow-blue-200' : 'bg-white border-2 border-[#E2E8F0] text-slate-400'
                }`}>
                {step.status === 'done' ? <Check className="w-4 h-4 stroke-[3]" /> : (idx + 1)}
              </div>
              <span className={`text-[12px] font-bold ${step.status === 'done' ? 'text-emerald-600' :
                  step.status === 'active' ? 'text-[#1D4ED8]' : 'text-slate-600'
                }`}>{step.label}</span>
              <span className={`text-[10px] font-medium mt-1 ${step.status === 'active' ? 'text-slate-500' : 'text-slate-400'
                }`}>{step.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Right Sidebar Component
function SummarySidebar({ detail }: { detail: TechnicianInspectionDetail }) {
  const steps = [
    { label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "completed" },
    { label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "completed" },
    { label: "ถึงหน้างาน", date: "20 พ.ค. 2567 09:35", status: "completed" },
    { label: "กำลังดำเนินการ", date: "20 พ.ค. 2567 09:40", status: "completed" },
    { label: "สรุปผลและหลักฐาน", date: "กำลังดำเนินการ", status: "active" },
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

        <button className="w-full mt-6 py-2.5 rounded-[10px] border border-slate-200 text-blue-600 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          ดูรายละเอียดใบงาน
        </button>
      </div>

      {/* Vertical Progress */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-black text-slate-900">ความคืบหน้างาน</h3>
          <span className="text-[14px] font-black text-blue-900">83%</span>
        </div>

        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6">
          <div className="h-full bg-[#1D4ED8] rounded-full" style={{ width: `83%` }}></div>
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
                      step.status === 'active' ? "text-[#1D4ED8]" : "text-slate-600"
                    }`}>
                    {step.label}
                  </span>
                  <span className={`text-[10px] font-medium ${step.status === 'active' ? "text-slate-500" : "text-slate-400"
                    }`}>
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

        <div className="flex items-center gap-2 text-[13px] font-bold text-blue-600 bg-white hover:bg-slate-50 cursor-pointer p-2.5 rounded-lg border border-slate-200 transition-colors">
          <Phone className="w-4 h-4 shrink-0" />
          <span>081-234-5678</span>
        </div>
      </div>

    </>
  );
}
