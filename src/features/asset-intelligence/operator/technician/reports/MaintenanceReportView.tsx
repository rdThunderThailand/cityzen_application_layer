"use client";

import { TechnicianMaintenanceReportData } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianMaintenanceReportData } from "./mock";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Banknote,
  BarChart2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  MoreVertical,
  RefreshCw,
  Save,
  Wrench
} from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function MaintenanceReportView({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<TechnicianMaintenanceReportData | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter States for the list
  const [dateRange, setDateRange] = useState("1 - 31 พ.ค. 2567");
  const [locationFilter, setLocationFilter] = useState("ทั้งหมด");
  const [jobTypeFilter, setJobTypeFilter] = useState("ทั้งหมด");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");

  useEffect(() => {
    getTechnicianMaintenanceReportData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <span className="text-[14px] font-bold text-slate-400">กำลังโหลดข้อมูลการซ่อมบำรุง...</span>
      </div>
    );
  }

  const { metrics, trendChart, typeDonutChart, costByJobTypeChart, latestMaintenance, topEquipment, averageCost } = data;

  const getJobTypeBadgeStyle = (jobType: string) => {
    switch (jobType) {
      case 'เชิงป้องกัน (PM)': return 'bg-[#eff6ff] text-blue-600 border border-blue-100';
      case 'เชิงแก้ไข (CM)': return 'bg-[#ecfdf5] text-emerald-600 border border-emerald-100';
      case 'ฉุกเฉิน (EM)': return 'bg-[#fffbeb] text-amber-600 border border-amber-100';
      default: return 'bg-[#f5edff] text-purple-600 border border-purple-100';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'เสร็จสิ้น': return 'text-emerald-500 bg-emerald-50';
      case 'กำลังดำเนินการ': return 'text-amber-500 bg-amber-50';
      case 'ยกเลิก': return 'text-rose-500 bg-rose-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 mb-4">
            <span className="cursor-pointer hover:text-blue-600 flex items-center gap-1" onClick={onBack}>
              <ChevronLeft className="w-3.5 h-3.5" /> รายงาน
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-slate-800">การซ่อมบำรุง</span>
          </div>
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
            การซ่อมบำรุง
          </h1>
          <p className="text-[14px] font-medium text-slate-500">
            สรุปข้อมูลการซ่อมบำรุงและประสิทธิภาพการดำเนินงาน
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-blue-200 text-blue-600 rounded-lg font-bold text-[13px] flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap">
            <Download className="w-4 h-4" /> ส่งออกข้อมูล
          </button>
          <button className="px-5 py-2.5 bg-blue-600 border border-blue-600 text-white rounded-lg font-bold text-[13px] flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            <Save className="w-4 h-4" /> บันทึกรายงาน
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Total Jobs */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">งานซ่อมบำรุงทั้งหมด</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">{metrics.totalJobs}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">งาน</span>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-slate-50">
            <div className="flex items-center gap-1 text-emerald-600">
              <span className="text-[11px] font-medium text-slate-500 mr-1">เพิ่มขึ้น</span>
              <span className="text-[11px] font-bold">12% จากเดือนที่แล้ว</span>
              <ArrowUp className="w-3 h-3 ml-auto" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">ซ่อมบำรุงสำเร็จ</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">{metrics.completed}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">งาน</span>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-slate-50 flex justify-end">
            <span className="text-[11px] font-bold text-emerald-600">{metrics.completedPercent}</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">กำลังดำเนินการ</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">{metrics.inProgress}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">งาน</span>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-slate-50">
            <div className="flex items-center gap-1 text-emerald-600">
              <span className="text-[11px] font-medium text-slate-500 mr-1">ลดลง</span>
              <span className="text-[11px] font-bold">20% จากเดือนที่แล้ว</span>
              <ArrowDown className="w-3 h-3 ml-auto" />
            </div>
          </div>
        </div>

        {/* Canceled */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">ยกเลิก / ไม่พบปัญหา</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">{metrics.canceled}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">งาน</span>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-slate-50 flex justify-end">
            <div className="flex items-center gap-1 text-rose-600">
              <span className="text-[11px] font-bold">เพิ่มขึ้น 14% จากเดือนที่แล้ว</span>
              <ArrowUp className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">ค่าใช้จ่ายรวม</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">85,450.00</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">บาท</span>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-slate-50 flex justify-end">
            <div className="flex items-center gap-1 text-emerald-600">
              <span className="text-[11px] font-medium text-slate-500 mr-1">ลดลง</span>
              <span className="text-[11px] font-bold">8% จากเดือนที่แล้ว</span>
              <ArrowDown className="w-3 h-3 ml-auto" />
            </div>
          </div>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap w-full">

          <div className="flex flex-col gap-1 w-full md:w-auto md:flex-1 max-w-[240px]">
            <span className="text-[10px] font-bold text-slate-500 ml-1">ช่วงเวลา</span>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-700 rounded-lg pl-9 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option>1 - 31 พ.ค. 2567</option>
                <option>เดือนที่แล้ว</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-auto md:flex-1 max-w-[180px]">
            <span className="text-[10px] font-bold text-slate-500 ml-1">สถานที่</span>
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option>ทั้งหมด</option>
                <option>อาคารสำนักงาน</option>
                <option>อาคาร A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-auto md:flex-1 max-w-[180px]">
            <span className="text-[10px] font-bold text-slate-500 ml-1">ประเภทงานซ่อม</span>
            <div className="relative">
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option>ทั้งหมด</option>
                <option>เชิงป้องกัน (PM)</option>
                <option>เชิงแก้ไข (CM)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-auto md:flex-1 max-w-[180px]">
            <span className="text-[10px] font-bold text-slate-500 ml-1">สถานะ</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-700 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option>ทั้งหมด</option>
                <option>เสร็จสิ้น</option>
                <option>กำลังดำเนินการ</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-end h-[60px]">
            <button className="px-5 py-2.5 rounded-lg border border-blue-200 bg-white text-blue-600 font-bold text-[13px] flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" /> ตัวกรอง
            </button>
          </div>
        </div>

        <button className="px-4 py-2.5 text-[12px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 mt-5 lg:mt-0">
          <RefreshCw className="w-3.5 h-3.5" /> ล้างตัวกรอง
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Trend Dual-Axis Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800">แนวโน้มงานซ่อมบำรุง</h3>
          </div>

          <div className="flex items-center gap-6 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-blue-600"></div>
              <span className="text-[12px] font-bold text-slate-600">จำนวนงาน</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-emerald-500"></div>
              <span className="text-[12px] font-bold text-slate-600">ค่าใช้จ่าย (บาท)</span>
            </div>
          </div>

          <div className="flex-1 min-h-0 relative flex">
            <div className="flex-1 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendChart} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} domain={[0, 150]} ticks={[0, 30, 60, 90, 120, 150]} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={10} domain={[0, 100000]} ticks={[0, 20000, 40000, 60000, 80000, 100000]} tickFormatter={(val) => val >= 1000 ? `${val / 1000}K` : val} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="jobs" name="จำนวนงาน" stroke="#2563eb" strokeWidth={3} dot={{ r: 3, strokeWidth: 0, fill: '#2563eb' }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="cost" name="ค่าใช้จ่าย" stroke="#10b981" strokeWidth={3} dot={{ r: 3, strokeWidth: 0, fill: '#10b981' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-2 flex justify-end relative z-10">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Job Type Donut Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[14px] font-bold text-slate-800">สัดส่วนประเภทงานซ่อมบำรุง</h3>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center relative">
            <div className="w-[160px] h-[160px] shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeDonutChart}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {typeDonutChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                <span className="text-[11px] font-bold text-slate-500 mb-0.5">รวม</span>
                <span className="text-[24px] font-black text-slate-900 leading-none">{metrics.totalJobs}</span>
                <span className="text-[10px] font-medium text-slate-500 mt-1">งาน</span>
              </div>
            </div>

            {/* Legend inside flex */}
            <div className="flex flex-col gap-4 ml-6 w-full max-w-[150px]">
              {typeDonutChart.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-4.5 pl-0.5">
                    <span className="text-[12px] font-black text-slate-900">{item.count} งาน</span>
                    <span className="text-[10px] font-medium text-slate-400">({item.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 flex justify-end relative z-10">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Cost Bar Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800">ค่าใช้จ่ายตามประเภทงาน (บาท)</h3>
          </div>

          <div className="flex-1 min-h-0 -ml-4 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costByJobTypeChart} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} dy={10}
                  tickFormatter={(val) => val.replace(/ \(.+\)/, '')} // Truncate PM/CM from label for space
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} tickFormatter={(val) => val >= 1000 ? `${val / 1000}K` : val} />
                <RechartsTooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${Number(value || 0).toLocaleString()} บาท`, 'ค่าใช้จ่าย']}
                />
                <Bar dataKey="cost" fill="#93c5fd" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {/* Top value labels */}
                  {costByJobTypeChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#93c5fd" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Latest Maintenance Table */}
        <div className="lg:col-span-3 bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800">รายการซ่อมบำรุงล่าสุด</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">เลขที่ใบงาน</th>
                  <th className="text-left text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">อุปกรณ์ / ระบบ</th>
                  <th className="text-left text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">ประเภทงาน</th>
                  <th className="text-left text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">สถานที่</th>
                  <th className="text-left text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">วันที่เริ่มงาน</th>
                  <th className="text-left text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">สถานะ</th>
                  <th className="text-left text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">ผู้ดำเนินการ</th>
                  <th className="text-right text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">ค่าใช้จ่าย (บาท)</th>
                  <th className="text-center text-[11px] font-bold text-slate-500 pb-3 whitespace-nowrap">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {latestMaintenance.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3 pr-4">
                      <span className="text-[12px] font-bold text-blue-600 cursor-pointer">{item.workOrderId}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        {item.image && <img src={item.image} alt={item.equipmentName} className="w-8 h-8 rounded border border-slate-200 object-cover shrink-0" />}
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-slate-800">{item.equipmentName}</span>
                          <span className="text-[11px] font-medium text-slate-500">{item.equipmentSubtext}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center justify-center whitespace-nowrap ${getJobTypeBadgeStyle(item.jobType)}`}>
                        {item.jobType}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-800">{item.location}</span>
                        <span className="text-[11px] font-medium text-slate-500">{item.locationSubtext}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-800">{item.startDate}</span>
                        <span className="text-[11px] font-medium text-slate-500">{item.startTime}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center justify-center whitespace-nowrap ${getStatusBadgeStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        {item.operatorAvatar ? (
                          <img src={item.operatorAvatar} alt={item.operatorName} className="w-6 h-6 rounded-full border border-slate-200 object-cover shrink-0" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300"></div>
                        )}
                        <span className="text-[12px] font-bold text-slate-800 whitespace-nowrap">{item.operatorName}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <span className="text-[12px] font-medium text-slate-700">
                        {item.cost > 0 ? item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors whitespace-nowrap bg-white shadow-sm">
                          ดูรายละเอียด
                        </button>
                        <button className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center w-full">
            <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายการทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column Lists */}
        <div className="flex flex-col gap-6">

          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">5 อุปกรณ์ที่มีงานซ่อมบำรุงมากที่สุด</h3>
            <div className="flex flex-col gap-3">
              {topEquipment.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</div>
                  {item.image && <img src={item.image} alt={item.name} className="w-8 h-8 rounded border border-slate-200 object-cover shrink-0" />}
                  <span className="text-[12px] font-bold text-slate-700 truncate flex-1">{item.name}</span>
                  <span className="text-[12px] font-bold text-blue-600 shrink-0">{item.count} งาน</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-5 flex justify-end">
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-[#f8faff] rounded-[16px] border border-[#e5edff] shadow-sm p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-start gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#e5edff] shadow-sm">
                <BarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-slate-600 mb-0.5">ค่าใช้จ่ายเฉลี่ยต่อใบงาน</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">{averageCost.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 mt-1">บาท/งาน</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <div className="flex items-center gap-1 text-emerald-600">
                <span className="text-[11px] font-medium text-slate-500 mr-1">ลดลง</span>
                <span className="text-[11px] font-bold">6% จากเดือนที่แล้ว</span>
                <ArrowDown className="w-3 h-3" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
