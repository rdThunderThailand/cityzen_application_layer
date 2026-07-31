"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import { Car, Check, Info, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import Map, { Layer, Marker, NavigationControl, Source } from "./MockMap";

interface InspectionNavigatingViewProps {
  detail: TechnicianInspectionDetail;
  onCancelNavigation: () => void;
  onArrived: () => void;
}


export function InspectionNavigatingView({ detail, onCancelNavigation, onArrived }: InspectionNavigatingViewProps) {
  const isSidebarCollapsed = false; // TODO: wire to real layout sidebar state if needed
  const sidebarOffset = isSidebarCollapsed ? "lg:left-20" : "lg:left-64";

  return (
    <div className="flex flex-col xl:flex-row gap-6">

      {/* Left Column (Main Content) */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Top Summary & Timeline */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <NavigatingHeaderSummary detail={detail} />
        </div>

        {/* Map & Travel Info */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col md:flex-row overflow-hidden">
          {/* Left Info Panel */}
          <div className="w-full md:w-[320px] shrink-0 p-8 xl:p-12 lg:p-8 flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
            <h3 className="text-[16px] font-black text-slate-900 mb-6">การเดินทางไปหน้างาน</h3>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="text-[13px] font-bold text-emerald-600">กำลังเดินทาง</span>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-500">เริ่มเดินทางเมื่อ</span>
                <span className="text-[14px] font-black text-slate-800">20 พ.ค. 2567 09:20 น.</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-500">เส้นทางจาก</span>
                <span className="text-[14px] font-black text-slate-800">สำนักงานเทศบาลเมืองแสนสุข</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-500">ระยะทางโดยประมาณ</span>
                <span className="text-[14px] font-black text-slate-800">12.4 กม.</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-500">เวลาโดยประมาณถึง</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-black text-slate-800">09:35 น. (15 นาที)</span>
                  <Info className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            <button
              onClick={onCancelNavigation}
              className="mt-8 w-full py-3 rounded-[12px] border border-rose-200 text-rose-600 font-bold text-[14px] hover:bg-rose-50 transition-colors shadow-sm"
            >
              ยกเลิกการเดินทาง
            </button>
          </div>

          {/* Right Map Panel */}
          <div className="flex-1 bg-slate-100 relative min-h-[400px]">
            <NavigatingLiveMap detail={detail} />
          </div>
        </div>

        {/* Bottom Three Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Auto Notify */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
            <h3 className="text-[14px] font-black text-slate-900 mb-2">แจ้งผู้แจ้งงานอัตโนมัติ</h3>
            <p className="text-[12px] font-medium text-slate-500 mb-6">ระบบได้แจ้งผู้แจ้งงานแล้วเมื่อเริ่มเดินทาง</p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(detail.reporterName)}&background=random&color=fff`} alt={detail.reporterName} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-800">{detail.reporterName}</span>
                  <span className="text-[11px] font-medium text-slate-500">เบอร์โทร: {detail.reporterPhone}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold mb-1">แจ้งแล้ว</span>
                <span className="text-[11px] font-medium text-slate-400">09:20 น.</span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-[10px] border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors mt-auto">
              ดูข้อความที่ส่ง
            </button>
          </div>

          {/* Realtime Tracking */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
            <h3 className="text-[14px] font-black text-slate-900 mb-2">สถานะการติดตามแบบเรียลไทม์</h3>
            <p className="text-[12px] font-medium text-slate-500 mb-6">ผู้แจ้งงานสามารถติดตามการเดินทางได้</p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-700">แชร์ตำแหน่งให้ผู้แจ้ง</span>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-slate-800">เปิดใช้งาน</span>
                  <div className="w-9 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-700">อัปเดตตำแหน่งทุก</span>
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-[12px] font-bold text-slate-800">30 วินาที</span>
                  <span className="text-slate-400">›</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-700">หยุดแชร์ตำแหน่งเมื่อ</span>
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-[12px] font-bold text-slate-800">ปิดงาน</span>
                  <span className="text-slate-400">›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 xl:p-12 flex flex-col">
            <h3 className="text-[14px] font-black text-slate-900 mb-6">เครื่องมือ</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center gap-3 py-2.5 px-4 rounded-[10px] border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm bg-white text-[13px] font-bold text-blue-700">
                <MapPin className="w-4 h-4" />
                เปิด Google Maps
              </button>
              <button className="w-full flex items-center gap-3 py-2.5 px-4 rounded-[10px] border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm bg-white text-[13px] font-bold text-blue-700">
                <Phone className="w-4 h-4" />
                โทรหาผู้แจ้งงาน
              </button>
              <button className="w-full flex items-center gap-3 py-2.5 px-4 rounded-[10px] border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm bg-white text-[13px] font-bold text-blue-700">
                <MessageCircle className="w-4 h-4" />
                ติดต่อศูนย์ควบคุม
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[360px] shrink-0 flex flex-col gap-6">
        <NavigatingSidebar detail={detail} />
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 ${sidebarOffset} right-0 h-20 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex items-center justify-between px-8 md:px-12 transition-all duration-300`}>
        <div className="w-full w-full flex items-center justify-between">
          <button className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-blue-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
            บันทึกชั่วคราว
          </button>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-[12px] border border-slate-200 text-slate-600 font-bold text-[14px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              ยังไม่ถึงหน้างาน
            </button>
            <button
              onClick={onArrived}
              className="px-8 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              ถึงหน้างานแล้ว
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map Component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NavigatingLiveMap({ detail: _detail }: { detail: TechnicianInspectionDetail }) {
  // Same realistic route but focused differently
  const routeCoords = [
    [100.9365, 13.2798], // Start point (near Nong Mon)
    [100.9340, 13.2795],
    [100.9320, 13.2790],
    [100.9300, 13.2800],
    [100.9280, 13.2805],
    [100.9260, 13.2810],
    [100.9248, 13.2818]  // Destination (near Burapha University)
  ];
  const startCoords = routeCoords[0];
  const destCoords = routeCoords[routeCoords.length - 1];

  // Let's pretend the tech is currently at the 3rd point
  const currentCoords = routeCoords[3];

  const routeGeoJSON = {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: routeCoords
    }
  };

  return (
    <Map
      initialViewState={{
        longitude: currentCoords[0],
        latitude: currentCoords[1],
        zoom: 14.5,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: '100%', height: '100%' }}
      attributionControl={false}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      {/* Route Line */}
      <Source id="route-source" type="geojson" data={routeGeoJSON}>
        <Layer
          id="route-layer-casing"
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{ "line-color": "#ffffff", "line-width": 8 }}
        />
        <Layer
          id="route-layer"
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{ "line-color": "#2563EB", "line-width": 5 }}
        />
      </Source>

      {/* Destination Pin */}
      <Marker longitude={destCoords[0]} latitude={destCoords[1]} anchor="bottom">
        <MapPin className="w-8 h-8 text-rose-500 fill-white" />
      </Marker>

      {/* Start Dot */}
      <Marker longitude={startCoords[0]} latitude={startCoords[1]} anchor="center">
        <div className="w-4 h-4 bg-slate-400 rounded-full border-2 border-white"></div>
      </Marker>

      {/* Current Location (Car/Nav arrow) & Popup */}
      <Marker longitude={currentCoords[0]} latitude={currentCoords[1]} anchor="center">
        <div className="relative z-20 flex flex-col items-center">
          {/* Popup Card */}
          <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-slate-100 p-4 w-[240px] flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[13px] font-black text-slate-800">ตำแหน่งปัจจุบัน</h4>
              <span className="text-slate-400">×</span>
            </div>
            <p className="text-[11px] font-bold text-slate-500 leading-tight">ถนนสุขุมวิท ตำบลแสนสุข อำเภอเมืองชลบุรี</p>
            <p className="text-[11px] font-bold text-slate-500 mt-1">อัปเดตล่าสุด 09:22:30 น.</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[12px] font-black text-slate-700">ความเร็ว <span className="text-slate-500">42 กม./ชม.</span></span>
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                <Navigation className="w-3 h-3 text-blue-600 transform rotate-45" />
              </div>
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white drop-shadow-sm"></div>
          </div>

          {/* Navigation Arrow Marker */}
          <div className="w-10 h-10 bg-blue-600 rounded-full border-[3px] border-white shadow-md flex items-center justify-center transform rotate-45">
            <Navigation className="w-5 h-5 text-white fill-white -ml-0.5 -mt-0.5" />
          </div>
        </div>
      </Marker>
    </Map>
  );
}

// Top Summary Component
function NavigatingHeaderSummary({ detail }: { detail: TechnicianInspectionDetail }) {
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
            {/* Blue line from 1 to 2 */}
            <div className="absolute top-[14px] left-[8.33%] right-[75%] h-[2px] bg-[#1D4ED8] z-0"></div>
            {/* Grey line from 2 to 6 */}
            <div className="absolute top-[14px] left-[25%] right-[8.33%] h-[2px] bg-[#E2E8F0] z-0"></div>

            <div className="flex justify-between relative z-10">
              {/* Step 1: Green checkmark */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-white border-[2px] border-emerald-500 flex items-center justify-center text-emerald-500 mb-2 z-10">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-[12px] font-bold text-emerald-600">รับงานแล้ว</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:15</span>
              </div>

              {/* Step 2: Blue car */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center mb-2 z-10">
                  <Car className="w-3.5 h-3.5" />
                </div>
                <span className="text-[12px] font-bold text-[#1D4ED8]">กำลังเดินทาง</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1">20 พ.ค. 2567 09:20</span>
              </div>

              {/* Steps 3 to 6 */}
              {["ถึงหน้างาน", "กำลังตรวจสอบ", "สรุปผลและแนบหลักฐาน", "ส่งตรวจรับ"].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className="w-7 h-7 rounded-full bg-white border-[2px] border-[#E2E8F0] text-slate-400 text-[11px] font-black flex items-center justify-center mb-2 z-10">
                    {idx + 3}
                  </div>
                  <span className="text-[12px] font-bold text-slate-700">{label}</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-1">{idx === 0 ? "รอยืนยัน" : "ยังไม่เริ่ม"}</span>
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
function NavigatingSidebar({ detail }: { detail: TechnicianInspectionDetail }) {
  const steps = [
    { label: "รับงานแล้ว", date: "20 พ.ค. 2567 09:15", status: "completed" },
    { label: "กำลังเดินทาง", date: "20 พ.ค. 2567 09:20", status: "active" },
    { label: "ถึงหน้างาน", date: "รอยืนยัน", status: "pending" },
    { label: "กำลังตรวจสอบ", date: "ยังไม่เริ่ม", status: "pending" },
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

      {/* Static Map */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-1">ตำแหน่งหน้างาน</h3>
        <p className="text-[12px] font-bold text-slate-500 mb-4 line-clamp-2">{detail.location}</p>

        <div className="w-full h-[120px] bg-slate-100 rounded-xl mb-3 border border-slate-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-rose-500" />
          </div>
        </div>

        <button className="w-full text-center text-[12px] font-bold text-blue-600 hover:text-blue-700">
          ดูแผนที่ขนาดใหญ่
        </button>
      </div>

      {/* Vertical Progress */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-black text-slate-900">ความคืบหน้างาน</h3>
          <span className="text-[14px] font-black text-blue-900">16%</span>
        </div>

        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6">
          <div className="h-full bg-[#1D4ED8] rounded-full" style={{ width: `16%` }}></div>
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
