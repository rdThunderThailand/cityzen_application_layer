"use client";

import { TechnicianReportData } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianReportData } from "./mock";
import {
  AlertTriangle,
  ArrowUp,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileBarChart,
  FileCheck,
  FileClock,
  FileSpreadsheet,
  FileText,
  Search
} from "lucide-react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import CostReportView from "./CostReportView";
import MaintenanceReportView from "./MaintenanceReportView";

export default function ReportsClient() {
  const [data, setData] = useState<TechnicianReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ภาพรวม");

  useEffect(() => {
    getTechnicianReportData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (activeTab === "การซ่อมบำรุง") {
    return (
      <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40">
        <MaintenanceReportView onBack={() => setActiveTab("ภาพรวม")} />
      </div>
    );
  }

  if (activeTab === "ค่าใช้จ่าย") {
    return (
      <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40">
        <CostReportView onBack={() => setActiveTab("ภาพรวม")} />
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40 flex items-center justify-center">
        <span className="text-[14px] font-bold text-slate-400">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }

  const { metrics, workOrdersChart, jobTypeChart, costChart, topEquipment, topLocations, costsByJobType, popularReports, recentDownloads } = data;

  return (
    <TechnicianPageLayout
      title="รายงาน"
      description="สรุปข้อมูลและวิเคราะห์ภาพรวมการทำงาน"
      breadcrumbs={[{ label: "หน้าหลัก", href: "#" }, { label: "รายงาน" }]}
      headerActions={
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหารายงาน..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>
          <button className="px-5 py-2.5 bg-white border border-blue-200 text-blue-600 rounded-lg font-bold text-[13px] flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap">
            <CalendarDays className="w-4 h-4" /> ปรับช่วงข้อมูล
          </button>
        </div>
      }
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        <CardMetric
          title="ใบงานทั้งหมด"
          value={metrics.totalWorkOrders}
          subtitle="ใบงาน"
          icon={FileText}
          classNameForIcon="bg-blue-50 text-blue-600"
          className="max-h-180 gap-2 p-5"
          subValue={12}
          subUnit="% จากเดือนที่แล้ว"
          status="เพิ่มขึ้น"
        />
        <CardMetric
          title="ซ่อมสำเร็จ"
          value={metrics.completed}
          subtitle="ใบงาน"
          icon={CheckCircle2}
          classNameForIcon="bg-emerald-50 text-emerald-600"
          className="max-h-180 gap-2 p-5"
          action={
            <div className="w-full flex justify-end">
              <span className="text-[11px] font-bold text-emerald-600">{metrics.completedPercent}</span>
            </div>
          }
        />
        <CardMetric
          title="กำลังดำเนินการ"
          value={metrics.inProgress}
          subtitle="ใบงาน"
          icon={Clock}
          classNameForIcon="bg-orange-50 text-orange-500"
          className="max-h-180 gap-2 p-5"
          subValue={20}
          subUnit="% จากเดือนที่แล้ว"
          status="ลดลง"
        />
        <CardMetric
          title="ล่าช้า"
          value={metrics.delayed}
          subtitle="ใบงาน"
          icon={AlertTriangle}
          classNameForIcon="bg-rose-50 text-rose-500"
          className="max-h-180 gap-2 p-5"
          action={
            <div className="w-full flex justify-end">
              <div className="flex items-center gap-1 text-rose-600">
                <span className="text-[11px] font-bold">เพิ่มขึ้น 2 ใบงาน</span>
                <ArrowUp className="w-3 h-3" />
              </div>
            </div>
          }
        />
        <CardMetric
          title="ค่าใช้จ่ายรวม"
          value="85,450.00"
          subtitle="บาท"
          icon={Banknote}
          classNameForIcon="bg-purple-50 text-purple-600"
          className="max-h-180 gap-2 p-5"
          subValue={8}
          subUnit="% จากเดือนที่แล้ว"
          status="ลดลง"
        />
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-2 mt-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {(['ภาพรวม', 'การซ่อมบำรุง', 'ค่าใช้จ่าย', 'อะไหล่', 'เครื่องมือ', 'ผู้ปฏิบัติงาน'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-[13px] font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-9 pr-10 py-2 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[120px]">
              <option>เดือนนี้</option>
              <option>เดือนที่แล้ว</option>
              <option>ปีนี้</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              value="1 - 31 พ.ค. 2567"
              readOnly
              className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 focus:outline-none min-w-[180px] cursor-pointer"
            />
            <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">

        {/* Work Orders Line Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-1.5">จำนวนใบงาน <span className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[10px] cursor-help">i</span></h3>
          </div>

          <div className="flex items-center gap-6 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-blue-600"></div>
              <span className="text-[12px] font-bold text-slate-600">ใบงานทั้งหมด</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-emerald-500"></div>
              <span className="text-[12px] font-bold text-slate-600">ซ่อมสำเร็จ</span>
            </div>
          </div>

          <div className="flex-1 min-h-0 relative flex">
            <div className="flex-1 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workOrdersChart} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="total" name="ใบงานทั้งหมด" stroke="#2563eb" strokeWidth={3} dot={{ r: 3, strokeWidth: 0, fill: '#2563eb' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="completed" name="ซ่อมสำเร็จ" stroke="#10b981" strokeWidth={3} dot={{ r: 3, strokeWidth: 0, fill: '#10b981' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Right Label Column to match image */}
            <div className="flex flex-col justify-between items-end pb-8 pt-4 shrink-0 pl-2">
              <div className="flex flex-col items-end">
                <span className="text-[18px] font-black text-blue-600 leading-none">{metrics.totalWorkOrders}</span>
                <span className="text-[10px] font-medium text-slate-400 mt-0.5">ใบงาน</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[18px] font-black text-emerald-500 leading-none">{metrics.completed}</span>
                <span className="text-[10px] font-medium text-slate-400 mt-0.5">ใบงาน</span>
              </div>
              <div className="h-6"></div> {/* Spacer */}
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Job Type Donut Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[14px] font-bold text-slate-800">สัดส่วนประเภทงาน</h3>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center relative">
            <div className="w-[180px] h-[180px] shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobTypeChart}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {jobTypeChart.map((entry, index) => (
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
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[11px] font-bold text-slate-500 mb-0.5">รวม</span>
                <span className="text-[28px] font-black text-slate-900 leading-none">{metrics.totalWorkOrders}</span>
                <span className="text-[10px] font-medium text-slate-500 mt-1">ใบงาน</span>
              </div>
            </div>

            {/* Legend inside flex */}
            <div className="flex flex-col gap-4 ml-6 w-full max-w-[140px]">
              {jobTypeChart.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[11px] font-bold text-slate-700 leading-tight">{item.name}</span>
                    </div>
                    <span className="text-[12px] font-black text-slate-900 ml-2">{item.value}%</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 ml-4.5 pl-0.5">({item.count} ใบงาน)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Cost Bar Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800">ค่าใช้จ่ายรวม (บาท)</h3>
            <span className="text-[16px] font-black text-blue-900">{metrics.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex-1 min-h-0 -ml-4 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costChart} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} tickFormatter={(val) => val >= 1000 ? `${val / 1000}K` : val} />
                <RechartsTooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number | string) => [`${Number(value || 0).toLocaleString()} บาท`, 'ค่าใช้จ่าย']}
                />
                <Bar dataKey="cost" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {costChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#2563eb' : '#bfdbfe'} />
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

      {/* Bottom Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">

        {/* Top Equipment */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
          <h3 className="text-[14px] font-bold text-slate-800 mb-4">5 อุปกรณ์ที่มีการซ่อมมากที่สุด</h3>
          <div className="flex flex-col gap-3">
            {topEquipment.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {item.image && <img src={item.image} alt={item.name} className="w-8 h-8 rounded border border-slate-200 object-cover shrink-0" />}
                <span className="text-[12px] font-bold text-slate-700 truncate flex-1">{item.name}</span>
                <span className="text-[12px] font-bold text-blue-600 shrink-0">{item.count} ใบงาน</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-5 flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
          <h3 className="text-[14px] font-bold text-slate-800 mb-4">5 สถานที่ที่มีการแจ้งซ่อมมากที่สุด</h3>
          <div className="flex flex-col gap-4">
            {topLocations.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</div>
                <span className="text-[12px] font-bold text-slate-700 truncate flex-1">{item.name}</span>
                <span className="text-[12px] font-bold text-blue-600 shrink-0">{item.count} ใบงาน</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-5 flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Costs by Job Type */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
          <h3 className="text-[14px] font-bold text-slate-800 mb-4">ค่าใช้จ่ายตามประเภทงาน</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-[11px] font-bold text-slate-500 pb-2">ประเภทงาน</th>
                <th className="text-right text-[11px] font-bold text-slate-500 pb-2">ค่าใช้จ่าย (บาท)</th>
                <th className="text-right text-[11px] font-bold text-slate-500 pb-2">สัดส่วน</th>
              </tr>
            </thead>
            <tbody>
              {costsByJobType.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50">
                  <td className="py-3 text-[12px] font-bold text-slate-700">{item.type}</td>
                  <td className="py-3 text-[12px] font-medium text-slate-700 text-right">{item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 text-[12px] font-bold text-slate-900 text-right">{item.percent}</td>
                </tr>
              ))}
              <tr>
                <td className="py-3 text-[12px] font-black text-slate-900">รวมทั้งหมด</td>
                <td className="py-3 text-[13px] font-black text-blue-900 text-right">{metrics.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td className="py-3 text-[12px] font-black text-slate-900 text-right">100%</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-auto pt-3 flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
              ดูรายงานเพิ่มเติม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Popular Reports & Recent Downloads */}
        <div className="flex flex-col gap-6">

          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-3">รายงานยอดนิยม</h3>
            <div className="flex flex-col gap-2">
              {popularReports.map((report, idx) => {
                const icons = [<FileBarChart key="0" />, <FileCheck key="1" />, <Banknote key="2" />, <FileSpreadsheet key="3" />, <FileClock key="4" />];
                return (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600 w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">
                        {icons[idx]}
                      </div>
                      <span className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700">{report}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">ดาวน์โหลดล่าสุด</h3>
            <div className="flex flex-col gap-4">
              {recentDownloads.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {doc.type === 'PDF' ? <FileText className="w-4 h-4 text-red-500" /> : <FileSpreadsheet className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-blue-700 hover:underline cursor-pointer leading-tight">{doc.title}</span>
                    <span className="text-[10px] font-medium text-slate-400 mt-0.5">{doc.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </TechnicianPageLayout>
  );
}
