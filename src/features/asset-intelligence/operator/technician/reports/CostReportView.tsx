"use client";

import { TechnicianCostReportData } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianCostReportData } from "./mock";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  MoreVertical,
  Receipt,
  Save,
  ShoppingCart,
  Wallet,
  Wrench
} from "lucide-react";
import { TechnicianMetricCard } from "../components/shared/TechnicianMetricCard";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianTable } from "../components/shared/TechnicianTable";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function CostReportView({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<TechnicianCostReportData | null>(null);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter States
  const [costTypeFilter, setCostTypeFilter] = useState("ทั้งหมด");
  const [categoryFilter, setCategoryFilter] = useState("ทั้งหมด");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [locationFilter, setLocationFilter] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getTechnicianCostReportData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <span className="text-[14px] font-bold text-slate-400">กำลังโหลดข้อมูลค่าใช้จ่าย...</span>
      </div>
    );
  }

  const { metrics, trendChart, typeDonutChart, comparisonChart, categoryDonutChart, summary, topCosts, costList } = data;

  // Pagination Logic
  const totalItems = costList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedList = costList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getCostTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'ค่าซ่อมบำรุง': return 'bg-[#eff6ff] text-blue-600 border border-blue-100';
      case 'ค่าอะไหล่': return 'bg-[#ecfdf5] text-emerald-600 border border-emerald-100';
      case 'ค่าใช้จ่ายอื่นๆ': return 'bg-[#fffbeb] text-amber-600 border border-amber-100';
      case 'ค่าแรง / บริการ': return 'bg-[#f5edff] text-purple-600 border border-purple-100';
      default: return 'bg-[#f8fafc] text-slate-600 border border-slate-200';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'อนุมัติแล้ว': return 'text-emerald-500 bg-emerald-50';
      case 'รออนุมัติ': return 'text-amber-500 bg-amber-50';
      case 'ไม่อนุมัติ': return 'text-rose-500 bg-rose-50';
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
            <span className="font-bold text-slate-800">ค่าใช้จ่าย</span>
          </div>
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
            ค่าใช้จ่าย
          </h1>
          <p className="text-[14px] font-medium text-slate-500">
            สรุปข้อมูลค่าใช้จ่ายในการดำเนินงานและการบำรุงรักษา
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
        <TechnicianMetricCard
          title="ค่าใช้จ่ายรวม"
          value={metrics.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          subtitle="บาท"
          icon={<Wallet className="w-6 h-6 text-blue-600" />}
          trend={{ value: metrics.totalCostTrend, isPositive: false, label: "" }}
        />
        <TechnicianMetricCard
          title="ค่าซ่อมบำรุง"
          value={metrics.maintenanceCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          subtitle="บาท"
          icon={<Wrench className="w-6 h-6 text-emerald-600" />}
          iconBgColor="bg-emerald-50"
          trend={{ value: metrics.maintenanceCostTrend, isPositive: false, label: "" }}
        />
        <TechnicianMetricCard
          title="ค่าอะไหล่"
          value={metrics.partsCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          subtitle="บาท"
          icon={<ShoppingCart className="w-6 h-6 text-orange-500" />}
          iconBgColor="bg-orange-50"
          trend={{ value: metrics.partsCostTrend, isPositive: true, label: "" }}
        />
        <TechnicianMetricCard
          title="ค่าใช้จ่ายอื่นๆ"
          value={metrics.otherCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          subtitle="บาท"
          icon={<FileText className="w-6 h-6 text-purple-600" />}
          iconBgColor="bg-purple-50"
          trend={{ value: metrics.otherCostTrend, isPositive: false, label: "" }}
        />
        <TechnicianMetricCard
          title="ค่าใช้จ่ายเฉลี่ยต่อวัน"
          value={metrics.dailyAverage.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          subtitle="บาท/วัน"
          icon={<Receipt className="w-6 h-6 text-rose-500" />}
          iconBgColor="bg-rose-50"
          trend={{ value: metrics.dailyAverageTrend, isPositive: false, label: "" }}
        />
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <TechnicianFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="ค้นหาเลขที่ใบเสร็จ, ผู้จำหน่าย..."
          filters={[
            {
              label: "ประเภทค่าใช้จ่าย",
              value: costTypeFilter,
              options: ["ทั้งหมด", "ค่าซ่อมบำรุง", "ค่าอะไหล่"],
              onChange: setCostTypeFilter,
              minWidth: "160px"
            },
            {
              label: "หมวดหมู่",
              value: categoryFilter,
              options: ["ทั้งหมด", "ซ่อมแซม", "อะไหล่แอร์"],
              onChange: setCategoryFilter,
              minWidth: "160px"
            },
            {
              label: "สถานะการอนุมัติ",
              value: statusFilter,
              options: ["ทั้งหมด", "อนุมัติแล้ว", "รออนุมัติ"],
              onChange: setStatusFilter,
              minWidth: "160px"
            },
            {
              label: "สถานที่",
              value: locationFilter,
              options: ["ทั้งหมด", "อาคารสำนักงาน"],
              onChange: setLocationFilter,
              minWidth: "160px"
            }
          ]}
          onClearFilters={() => {
            setCostTypeFilter("ทั้งหมด");
            setCategoryFilter("ทั้งหมด");
            setStatusFilter("ทั้งหมด");
            setLocationFilter("ทั้งหมด");
            setSearchQuery("");
          }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Trend Line Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800">แนวโน้มค่าใช้จ่ายรวม</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 text-[11px] font-bold text-slate-600 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer">
                <option>รายเดือน</option>
                <option>รายปี</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-1 rounded-full bg-blue-600"></div>
            <span className="text-[12px] font-bold text-slate-600">ค่าใช้จ่ายรวม (บาท)</span>
          </div>

          <div className="flex-1 min-h-0 relative -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendChart} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} tickFormatter={(val) => val >= 1000 ? `${val / 1000}K` : val} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
                  formatter={(value: number | string) => [`${(Number(value) || 0).toLocaleString()} บาท`, 'ค่าใช้จ่าย']}
                />
                <Line type="monotone" dataKey="cost" name="ค่าใช้จ่ายรวม" stroke="#2563eb" strokeWidth={3}
                  dot={(props: { cx?: number; cy?: number; payload?: { month: string; cost: number; active?: boolean } }) => {
                    const { cx = 0, cy = 0, payload } = props;
                    if (payload?.active) {
                      return (
                        <g key={`dot-${payload.month}`}>
                          <circle cx={cx} cy={cy} r={6} fill="#2563eb" stroke="white" strokeWidth={2} />
                          <text x={cx} y={cy - 15} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">
                            {payload.month} 2567
                          </text>
                          <text x={cx} y={cy - 28} textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="900">
                            {payload.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })} บาท
                          </text>
                        </g>
                      );
                    }
                    return <circle key={`dot-${payload?.month || cx}`} cx={cx} cy={cy} r={4} fill="#2563eb" stroke="white" strokeWidth={2} />;
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Type Donut Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[14px] font-bold text-slate-800">สัดส่วนค่าใช้จ่ายตามประเภท</h3>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center relative">
            <div className="w-[180px] h-[180px] shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeDonutChart}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
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
                    formatter={(value: number | string) => [`${(Number(value) || 0).toLocaleString()} บาท`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                <span className="text-[11px] font-bold text-slate-500 mb-0.5">รวม</span>
                <span className="text-[18px] font-black text-slate-900 leading-none">{metrics.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-[10px] font-medium text-slate-500 mt-1">บาท</span>
              </div>
            </div>

            {/* Legend inside flex */}
            <div className="flex flex-col gap-3 ml-4 w-full max-w-[160px]">
              {typeDonutChart.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[11px] font-bold text-slate-700 leading-tight">{item.name}</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-900">{item.percent}</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 ml-4.5 pl-0.5">{item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })} บาท</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Grouped Bar Chart */}
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800">เปรียบเทียบค่าใช้จ่าย</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 text-[11px] font-bold text-slate-600 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer">
                <option>เทียบกับเดือนที่แล้ว</option>
                <option>เทียบกับปีที่แล้ว</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#93c5fd]"></div>
              <span className="text-[11px] font-bold text-slate-600">เม.ย. 2567</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#2563eb]"></div>
              <span className="text-[11px] font-bold text-slate-600">พ.ค. 2567</span>
            </div>
          </div>

          <div className="flex-1 min-h-0 -ml-4 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonChart} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} dy={10}
                  tickFormatter={(val) => {
                    if (val === 'ค่าใช้จ่ายอื่นๆ / ค่าแรง / บริการ') return 'ค่าใช้จ่ายอื่นๆ / ค่าแรง / บริการ';
                    return val;
                  }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dx={-10} tickFormatter={(val) => val >= 1000 ? `${val / 1000}K` : val} />
                <RechartsTooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number | string) => [`${(Number(value) || 0).toLocaleString()} บาท`, 'ค่าใช้จ่าย']}
                />
                <Bar dataKey="prevMonth" fill="#93c5fd" radius={[4, 4, 0, 0]} maxBarSize={20} name="เม.ย. 2567" />
                <Bar dataKey="currMonth" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={20} name="พ.ค. 2567" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Cost Data Table */}
        <div className="lg:col-span-3 bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-slate-800">รายการค่าใช้จ่าย</h3>
          </div>

          <TechnicianTable
            minWidth="1000px"
            loading={false}
            columns={[
              { header: "เลขที่เอกสาร" },
              { header: "วันที่เอกสาร" },
              { header: "ประเภทค่าใช้จ่าย" },
              { header: "หมวดหมู่" },
              { header: "รายละเอียด" },
              { header: "สถานที่" },
              { header: "ผู้จำหน่าย" },
              { header: "จำนวนเงิน (บาท)", align: "right" },
              { header: "สถานะการอนุมัติ", align: "center" },
              { header: "การดำเนินการ", align: "center" }
            ]}
          >
            {paginatedList.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[12px] font-bold text-slate-800">{item.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-bold text-slate-800">{item.date}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center justify-center whitespace-nowrap ${getCostTypeBadgeStyle(item.costType)}`}>
                    {item.costType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-medium text-slate-600">{item.category}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-bold text-slate-800">{item.details}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-medium text-slate-600">{item.location}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-medium text-slate-600">{item.vendor}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[12px] font-bold text-slate-800">
                    {item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center justify-center whitespace-nowrap ${getStatusBadgeStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TechnicianTable>

          {/* Pagination */}
          <TechnicianPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onItemsPerPageChange={() => {}}
          />

        </div>

        {/* Right Column Lists */}
        <div className="flex flex-col gap-6">

          {/* Summary Widget */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">สรุปค่าใช้จ่าย</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-600">งบประมาณ (พ.ค. 2567)</span>
                <span className="text-[12px] font-black text-slate-900">{summary.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-600">ค่าใช้จ่ายรวม</span>
                <span className="text-[12px] font-black text-rose-600">{summary.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-600">งบคงเหลือ</span>
                <span className="text-[12px] font-black text-emerald-600">{summary.remaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[12px] font-bold text-slate-600">% การใช้จ่ายต่องบประมาณ</span>
                <span className="text-[12px] font-black text-slate-900">{summary.percentUsed}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${summary.percentUsed}%` }}></div>
              </div>
            </div>
          </div>

          {/* Category Donut Widget */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col items-center">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4 w-full">สัดส่วนค่าใช้จ่ายตามหมวดหมู่</h3>
            <div className="w-[140px] h-[140px] shrink-0 relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDonutChart}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryDonutChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    formatter={(value: number | string) => [`${(Number(value) || 0).toLocaleString()} บาท`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-500 mb-0.5">รวม</span>
                <span className="text-[14px] font-black text-slate-900 leading-none">{metrics.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-[9px] font-medium text-slate-500 mt-1">บาท</span>
              </div>
            </div>

            {/* Legend inside flex */}
            <div className="flex flex-col gap-2 w-full">
              {categoryDonutChart.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[10px] font-bold text-slate-700 leading-tight">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-900">{item.percent}</span>
                  </div>
                  <span className="text-[9px] font-medium text-slate-500 ml-4.5 pl-0.5">{item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })} บาท</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center w-full">
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูรายละเอียดทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Top 5 Costs Widget */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">5 ค่าใช้จ่ายสูงสุด</h3>
            <div className="flex flex-col gap-3">
              {topCosts.map((item, idx) => (
                <div key={item.id} className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{idx + 1}</div>
                    <span className="text-[11px] font-bold text-slate-700 flex-1 leading-tight">{item.name}</span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[11px] font-bold text-slate-900">{item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 flex justify-end">
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูรายการทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
