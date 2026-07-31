"use client";

import { TechnicianSettingsData } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianSettingsData } from "./mock";
import {
  ArrowRight,
  Bell,
  BellRing,
  Building2,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  CloudUpload,
  Database,
  Edit,
  FileDigit,
  FileText,
  ListTodo,
  PiggyBank,
  Ruler,
  Settings as SettingsIcon,
  Tags,
  UploadCloud,
  UserPlus,
  Users,
  Wrench
} from "lucide-react";
import { useEffect, useState } from "react";

// Icon mapping helper
const getIconComponent = (iconName: string, className: string) => {
  switch (iconName) {
    case "Building2": return <Building2 className={className} />;
    case "Users": return <Users className={className} />;
    case "Bell": return <Bell className={className} />;
    case "FileText": return <FileText className={className} />;
    case "CloudUpload": return <CloudUpload className={className} />;
    case "UserPlus": return <UserPlus className={className} />;
    case "Edit": return <Edit className={className} />;
    case "BellRing": return <BellRing className={className} />;
    case "Database": return <Database className={className} />;
    default: return <SettingsIcon className={className} />;
  }
};

export default function SettingsClient() {
  const [data, setData] = useState<TechnicianSettingsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Vertical Tab State
  const [activeTab, setActiveTab] = useState("ทั่วไป");

  // Form State
  const [language, setLanguage] = useState("");
  const [timezone, setTimezone] = useState("");
  const [dateFormat, setDateFormat] = useState("");
  const [timeFormat, setTimeFormat] = useState("");
  const [currency, setCurrency] = useState("");
  const [defaultPage, setDefaultPage] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("");
  const [themeColor, setThemeColor] = useState("");

  useEffect(() => {
    getTechnicianSettingsData().then((res) => {
      setData(res);
      setLanguage(res.generalConfig.language);
      setTimezone(res.generalConfig.timezone);
      setDateFormat(res.generalConfig.dateFormat);
      setTimeFormat(res.generalConfig.timeFormat);
      setCurrency(res.generalConfig.currency);
      setDefaultPage(res.generalConfig.defaultPage);
      setItemsPerPage(res.generalConfig.itemsPerPage);
      setThemeColor(res.generalConfig.themeColor);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-full flex-1 bg-[#F8FAFC] flex items-center justify-center">
        <span className="text-[14px] font-bold text-slate-400">กำลังโหลดการตั้งค่า...</span>
      </div>
    );
  }

  const { mainSettings, recentActivities, systemInfo } = data;

  const sidebarTabs = [
    { id: "ทั่วไป", icon: SettingsIcon },
    { id: "เลขที่เอกสาร", icon: FileDigit },
    { id: "การอนุมัติ", icon: CheckCircle },
    { id: "งบประมาณ", icon: PiggyBank },
    { id: "หน่วยนับ", icon: Ruler },
    { id: "สถานะรายการ", icon: ListTodo },
    { id: "ประเภทงานซ่อม", icon: Wrench },
    { id: "แท็ก (Tags)", icon: Tags },
  ];

  const themeColors = [
    { id: "blue", color: "#2563eb" },
    { id: "green", color: "#10b981" },
    { id: "purple", color: "#8b5cf6" },
    { id: "orange", color: "#f59e0b" },
    { id: "navy", color: "#312e81" },
    { id: "gray", color: "#64748b" },
  ];

  return (
    <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40 flex flex-col gap-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col mb-2">
        <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
          ตั้งค่า
        </h1>
        <p className="text-[14px] font-medium text-slate-500">
          จัดการการตั้งค่าระบบและข้อมูลพื้นฐาน
        </p>
      </div>

      {/* Top Section: Main Settings */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-[15px] font-bold text-slate-800 mb-5">การตั้งค่าหลัก</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mainSettings.map((setting) => (
            <div key={setting.id} className="flex flex-col rounded-[16px] border border-slate-100 bg-white p-5 cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group relative overflow-hidden">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${setting.bgClass}`}>
                {getIconComponent(setting.icon, `w-5 h-5 ${setting.colorClass}`)}
              </div>
              <span className="text-[13px] font-bold text-slate-800 mb-1">{setting.title}</span>
              <span className="text-[11px] font-medium text-slate-500 leading-relaxed pr-2">{setting.description}</span>
              <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section: System Settings */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-[15px] font-bold text-slate-800 mb-5">การตั้งค่าระบบ</h3>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Vertical Tabs Sidebar */}
          <div className="flex flex-col w-full md:w-[220px] shrink-0 border-r border-slate-100 pr-4">
            {sidebarTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-bold transition-colors w-full text-left mb-1 ${isActive
                    ? "bg-[#eff6ff] text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  {tab.id}
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="flex-1 flex flex-col">
            <h4 className="text-[14px] font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              {activeTab}
            </h4>

            {activeTab === "ทั่วไป" ? (
              <div className="flex flex-col xl:flex-row gap-12">

                {/* Left Column Form Fields */}
                <div className="flex-1 flex flex-col gap-6 max-w-lg">
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">ภาษา</span>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option>ไทย</option>
                        <option>English</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">เขตเวลา</span>
                    <div className="relative">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option>(GMT+07:00) กรุงเทพฯ</option>
                        <option>(GMT+08:00) สิงคโปร์</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">รูปแบบวันที่</span>
                    <div className="relative">
                      <select
                        value={dateFormat}
                        onChange={(e) => setDateFormat(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option>31/12/2567 (วว/ดด/ปปปป)</option>
                        <option>2024-12-31 (ปปปป-ดด-วว)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">รูปแบบเวลา</span>
                    <div className="relative">
                      <select
                        value={timeFormat}
                        onChange={(e) => setTimeFormat(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option>24 ชั่วโมง (13:30)</option>
                        <option>12 ชั่วโมง (01:30 PM)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">สกุลเงิน</span>
                    <div className="relative">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option>บาท (THB)</option>
                        <option>US Dollar (USD)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Right Column Form Fields */}
                <div className="flex-1 flex flex-col gap-6 max-w-lg">

                  <div className="grid grid-cols-[130px_1fr] items-start gap-4">
                    <span className="text-[12px] font-bold text-slate-600 pt-3">โลโก้หน่วยงาน</span>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl bg-[#f8faff] flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition-colors group">
                      <UploadCloud className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[13px] font-bold text-blue-600 mb-1">อัปโหลดโลโก้</span>
                      <span className="text-[10px] font-medium text-slate-400">รองรับไฟล์ .png, .jpg ขนาดไม่เกิน 2MB</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">ธีมสีหลัก</span>
                    <div className="flex items-center gap-4">
                      {themeColors.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setThemeColor(t.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${themeColor === t.id ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' : 'hover:scale-110 ring-1 ring-slate-200'
                            }`}
                          style={{ backgroundColor: t.color }}
                        >
                          {themeColor === t.id && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">หน้าเริ่มต้นเมื่อเข้าสู่ระบบ</span>
                    <div className="relative">
                      <select
                        value={defaultPage}
                        onChange={(e) => setDefaultPage(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option>หน้าหลัก</option>
                        <option>รายงาน</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                    <span className="text-[12px] font-bold text-slate-600">จำนวนรายการต่อหน้า</span>
                    <div className="relative">
                      <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option>10 รายการ</option>
                        <option>20 รายการ</option>
                        <option>50 รายการ</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm py-20 border-2 border-dashed border-slate-100 rounded-xl">
                กำลังพัฒนาเนื้อหาสำหรับแท็บ {activeTab}
              </div>
            )}

            {/* Save Button */}
            {activeTab === "ทั่วไป" && (
              <div className="mt-8 flex justify-end">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm">
                  บันทึกการตั้งค่า
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Bottom Section: Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Activities */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-800 mb-5">กิจกรรมล่าสุด</h3>
          <div className="flex flex-col gap-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-center gap-4 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${act.iconBg}`}>
                  {getIconComponent(act.icon, `w-5 h-5 ${act.iconColor}`)}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[13px] font-bold text-slate-800">{act.action}</span>
                  <span className="text-[11px] font-medium text-slate-500">{act.user}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-bold text-slate-600">{act.date}</span>
                  <span className="text-[10px] font-medium text-slate-400">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end pt-4 border-t border-slate-100">
            <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group">
              ดูประวัติทั้งหมด <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-800 mb-5">ข้อมูลระบบ</h3>
          <div className="flex flex-col gap-5 flex-1">

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-[12px] font-bold text-slate-600">เวอร์ชันระบบ</span>
              <span className="text-[13px] font-bold text-slate-800">{systemInfo.version}</span>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-[12px] font-bold text-slate-600">ฐานข้อมูล</span>
              <span className="text-[13px] font-bold text-slate-800">{systemInfo.database}</span>
            </div>

            <div className="flex flex-col gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-600">พื้นที่จัดเก็บข้อมูล</span>
                <span className="text-[11px] font-bold text-slate-800">
                  {systemInfo.storageUsed} {systemInfo.storageUnit} / {systemInfo.storageTotal} {systemInfo.storageUnit} ({((systemInfo.storageUsed / systemInfo.storageTotal) * 100).toFixed(2)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(systemInfo.storageUsed / systemInfo.storageTotal) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-[12px] font-bold text-slate-600">สำรองข้อมูลล่าสุด</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-slate-600">{systemInfo.lastBackup}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  สำเร็จ
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-600">อัปเดตล่าสุด</span>
              <span className="text-[12px] font-medium text-slate-600">{systemInfo.lastUpdate}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
