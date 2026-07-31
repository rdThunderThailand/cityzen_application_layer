"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import {
  ArrowLeft,
  Camera,
  Car,
  Check,
  ChevronDown,
  ChevronRight,
  Droplets,
  Info,
  MapPin,
  Play,
  Sun,
  Wind,
  X
} from "lucide-react";
import Link from "next/link";
import Map, { Marker, NavigationControl, Source } from "./MockMap";

interface InspectionArrivedViewProps {
  detail: TechnicianInspectionDetail;
  onBack: () => void;
  onStartInspection: () => void;
}

export function InspectionArrivedView({ detail, onBack, onStartInspection }: InspectionArrivedViewProps) {
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
          <span className="text-slate-800">ถึงหน้างาน</span>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none">
              ถึงหน้างานแล้ว
            </h1>
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
          <p className="text-[14px] font-medium text-slate-500">เริ่มตรวจสอบและบันทึกข้อมูลหน้างานได้เลย</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Top Summary & Timeline */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <ArrivedHeaderSummary detail={detail} />
          </div>

          {/* Middle Row: Arrival Confirm, Map, Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 1. Arrival Confirm */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
              <h3 className="text-[14px] font-black text-slate-900 mb-6">ยืนยันการถึงหน้างาน</h3>

              <div className="flex justify-between items-start mb-4">
                <span className="text-[12px] font-bold text-slate-500">เวลาเช็คอิน</span>
                <div className="flex flex-col items-end text-right">
                  <span className="text-[13px] font-black text-slate-800">20 พ.ค. 2567</span>
                  <span className="text-[13px] font-black text-slate-800">09:35 น.</span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-4">
                <span className="text-[12px] font-bold text-slate-500">ตำแหน่งปัจจุบัน</span>
                <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-slate-800">13.7565, 100.5018</span>
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 mt-1">ดูบนแผนที่</button>
                </div>
              </div>

              <div className="flex justify-between items-start mb-6">
                <span className="text-[12px] font-bold text-slate-500">ความแม่นยำ</span>
                <span className="text-[13px] font-bold text-slate-800">± 12 เมตร</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-3 mb-6">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[13px] font-bold text-emerald-800">คุณอยู่ในพื้นที่หน้างาน</span>
                  <span className="text-[11px] font-medium text-emerald-600">ภายในรัศมี 50 เมตร</span>
                </div>
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <button className="w-full py-2.5 rounded-[10px] bg-blue-600 text-white font-bold text-[13px] hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                  ยืนยันถึงหน้างาน
                </button>
                <button className="w-full py-2.5 rounded-[10px] border border-slate-200 text-blue-600 font-bold text-[13px] hover:bg-slate-50 transition-colors bg-white">
                  ยังไม่ถึงหน้างาน
                </button>
              </div>
            </div>

            {/* 2. Map */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col p-2">
              <div className="flex-1 bg-slate-100 rounded-xl relative overflow-hidden">
                <ArrivedMiniMap detail={detail} />
              </div>
              <div className="p-3 pb-2 flex flex-col">
                <h4 className="text-[13px] font-black text-slate-800 leading-tight mb-1">{detail.location}</h4>
                <p className="text-[11px] font-medium text-slate-500 leading-tight mb-2">ถ.แสนสุข ต.แสนสุข อ.เมืองชลบุรี จ.ชลบุรี 20130</p>
                <div className="flex justify-end">
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    นำทาง <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Photos */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-black text-slate-900">ถ่ายภาพหน้างาน <span className="text-slate-500 font-bold">(ก่อนดำเนินการ)</span></h3>
                <span className="text-[11px] font-bold text-slate-400">* อย่างน้อย 3 รูป</span>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-1">
                {/* Photo 1 */}
                <div className="bg-slate-100 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop" alt="AC Unit" className="w-full h-full object-cover" />
                  <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100 transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Photo 2 */}
                <div className="bg-slate-100 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1581092921461-7031e4bf0e5e?q=80&w=300&auto=format&fit=crop" alt="Specs" className="w-full h-full object-cover grayscale opacity-80" />
                  <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100 transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Photo 3 */}
                <div className="bg-slate-100 rounded-xl relative overflow-hidden group border border-slate-200 h-[100px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop" alt="Multimeter" className="w-full h-full object-cover" />
                  <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white/90 rounded-md flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm opacity-100 transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Upload Button */}
                <button className="bg-slate-50 border-2 border-dashed border-slate-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl flex flex-col items-center justify-center gap-1.5 text-blue-600 transition-colors h-[100px]">
                  <Camera className="w-5 h-5" />
                  <span className="text-[12px] font-bold">เพิ่มรูปภาพ</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Row: Notes, Tools, Weather */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Notes */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
              <h3 className="text-[14px] font-black text-slate-900 mb-3">หมายเหตุหน้างาน <span className="text-slate-400 font-bold">(ถ้ามี)</span></h3>
              <div className="relative flex-1">
                <textarea
                  className="w-full h-full min-h-[80px] border-none resize-none text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  placeholder="ระบุรายละเอียดเพิ่มเติม เช่น อาการที่พบ สภาพแวดล้อม ข้อสังเกตเบื้องต้น"
                ></textarea>
                <div className="absolute bottom-0 right-0 text-[11px] font-medium text-slate-400">0 / 500</div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
              <h3 className="text-[14px] font-black text-slate-900 mb-3">เครื่องมือที่ใช้</h3>
              <div className="flex-1 flex flex-col">
                <button className="w-full h-10 border border-slate-200 rounded-[10px] flex items-center justify-between px-3 hover:bg-slate-50 transition-colors">
                  <span className="text-[13px] font-medium text-slate-400">เลือกเครื่องมือที่ใช้ (ถ้ามี)</span>
                  <ChevronDown className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>

            {/* Weather */}
            <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
              <h3 className="text-[14px] font-black text-slate-900 mb-4">สภาพอากาศ</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-amber-500 fill-amber-500" />
                  <span className="text-[14px] font-black text-slate-800">แดดออก</span>
                </div>
                <span className="text-[20px] font-black text-slate-800">32°C</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500">
                  <Droplets className="w-3.5 h-3.5 text-slate-400" />
                  <span>ความชื้น <span className="text-slate-800 ml-1">65%</span></span>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500">
                  <Wind className="w-3.5 h-3.5 text-slate-400" />
                  <span>ลม <span className="text-slate-800 ml-1">6 กม./ชม.</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[360px] shrink-0 flex flex-col gap-6">
          <ArrivedSidebar detail={detail} />
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center justify-between px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <button onClick={onBack} className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
            ย้อนกลับ
          </button>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              บันทึกชั่วคราว
            </button>
            <button
              onClick={onStartInspection}
              className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              เริ่มตรวจสอบหน้างาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map Component for Middle Area
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ArrivedMiniMap({ detail: _detail }: { detail: TechnicianInspectionDetail }) {
  // Approximate coordinates
  const siteCoords = [100.9248, 13.2818];
  const userCoords = [100.9240, 13.2810]; // Slightly off center

  return (
    <Map
      initialViewState={{
        longitude: siteCoords[0],
        latitude: siteCoords[1],
        zoom: 15.5,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: '100%', height: '100%' }}
      attributionControl={false}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      {/* Accuracy Radius */}
      <Source id="accuracy-radius" type="geojson" data={{
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[
            // extremely rough circle approx 50m radius
            [100.9240, 13.2815], [100.9245, 13.2810], [100.9240, 13.2805], [100.9235, 13.2810], [100.9240, 13.2815]
          ]] // Just a visual placeholder, Mapbox GL JS usually uses turf.js for circles
        }
      }}>
        {/* We'll fake the radius with a div marker to make it perfectly round instead since GeoJSON circle needs turf */}
      </Source>

      {/* Faked Radius using Marker to ensure perfect circle */}
      <Marker longitude={userCoords[0]} latitude={userCoords[1]} anchor="center">
        <div className="relative flex items-center justify-center">
          <div className="w-[120px] h-[120px] rounded-full bg-blue-500/10 border border-blue-500/20 absolute"></div>
          {/* User Dot */}
          <div className="w-5 h-5 bg-blue-600 rounded-full border-[3px] border-white shadow-md relative z-10"></div>
          <span className="absolute -bottom-6 whitespace-nowrap text-[11px] font-bold text-blue-700 bg-white/80 px-1.5 py-0.5 rounded shadow-sm">35 เมตร</span>
        </div>
      </Marker>

      {/* Site Pin */}
      <Marker longitude={siteCoords[0]} latitude={siteCoords[1]} anchor="bottom">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full shadow-md border border-slate-100 px-2 py-1 mb-1 flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <MapPin className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-slate-700 pr-1">ตำแหน่งหน้างาน</span>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white relative drop-shadow-sm"></div>
        </div>
      </Marker>
    </Map>
  );
}

// Top Summary Component
function ArrivedHeaderSummary({ detail }: { detail: TechnicianInspectionDetail }) {
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
                  รอแจ้งดำเนินการตรวจสอบ
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
            {/* Blue line from 1 to 3 */}
            <div className="absolute top-[14px] left-[8.33%] right-[58.33%] h-[2px] bg-[#1D4ED8] z-0"></div>
            {/* Grey line from 3 to 6 */}
            <div className="absolute top-[14px] left-[41.66%] right-[8.33%] h-[2px] bg-[#E2E8F0] z-0"></div>

            <div className="flex justify-between relative z-10">
              {/* Step 1: Green checkmark */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-white border-[2px] border-emerald-500 flex items-center justify-center text-emerald-500 mb-2 z-10">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[12px] font-bold text-emerald-600">รับงานแล้ว</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:15</span>
              </div>

              {/* Step 2: Green Car outline */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-white border-[2px] border-emerald-500 flex items-center justify-center text-emerald-500 mb-2 z-10">
                  <Car className="w-3.5 h-3.5" />
                </div>
                <span className="text-[12px] font-bold text-emerald-600">กำลังเดินทาง</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:20</span>
              </div>

              {/* Step 3: Blue Map Pin */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white mb-2 z-10 shadow-md shadow-blue-200">
                  <MapPin className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="text-[12px] font-bold text-[#1D4ED8]">ถึงหน้างาน</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:35</span>
              </div>

              {/* Steps 4 to 6 */}
              {["ดำเนินการแก้ไข", "สรุปผลและแนบหลักฐาน", "ส่งตรวจรับ"].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-white border-[2px] border-[#E2E8F0] text-slate-400 text-[11px] font-black flex items-center justify-center mb-2 z-10">
                    {idx + 4}
                  </div>
                  <span className="text-[12px] font-bold text-slate-700">{label}</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-1">ยังไม่เริ่ม</span>
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
function ArrivedSidebar({ detail }: { detail: TechnicianInspectionDetail }) {
  const steps = [
    { label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "completed" },
    { label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "completed" },
    { label: "ถึงหน้างาน", date: "20 พ.ค. 2567 09:35", status: "active" },
    { label: "ดำเนินการแก้ไข", date: "ยังไม่เริ่ม", status: "pending" },
    { label: "สรุปผลและแนบหลักฐาน", date: "ยังไม่เริ่ม", status: "pending" },
    { label: "ส่งตรวจรับ", date: "ยังไม่เริ่ม", status: "pending" },
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

      {/* Travel Summary */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-5">การเดินทาง</h3>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-500">เส้นทาง</span>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-slate-800">สำนักงานเทศบาลเมืองแสนสุข</span>
              <div className="flex justify-center my-0.5">
                <span className="text-slate-300">↓</span>
              </div>
              <span className="text-[12px] font-bold text-slate-800">อาคารสำนักงาน ชั้น 2 ห้อง 201</span>
            </div>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">ระยะทาง</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">12.4 กม.</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">เวลาเดินทาง</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">15 นาที</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">ออกเดินทาง</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">20 พ.ค. 2567 09:20 น.</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12px] font-bold text-slate-500">ถึงหน้างาน</span>
            <span className="text-[12px] font-bold text-slate-800 text-right">20 พ.ค. 2567 09:35 น.</span>
          </div>
        </div>
      </div>

      {/* Vertical Progress */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-black text-slate-900">ความคืบหน้างาน</h3>
          <span className="text-[14px] font-black text-blue-900">33%</span>
        </div>

        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6">
          <div className="h-full bg-[#1D4ED8] rounded-full" style={{ width: `33%` }}></div>
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
                      step.status === 'active' ? "text-slate-500" : "text-slate-400"
                    }`}>
                    {step.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
