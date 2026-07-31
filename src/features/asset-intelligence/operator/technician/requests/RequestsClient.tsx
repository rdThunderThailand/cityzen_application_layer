"use client";

import { TechnicianRequestItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianRequests } from "./mock";
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Smartphone,
  User,
  Wrench,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Default chart data for the right sidebar
const CHART_DATA = [
  { name: 'ซ่อมแซม', value: 32, color: '#3b82f6', percent: '57%' },
  { name: 'บำรุงรักษา', value: 16, color: '#10b981', percent: '29%' },
  { name: 'ติดตั้ง', value: 6, color: '#f59e0b', percent: '11%' },
  { name: 'อื่นๆ', value: 2, color: '#6366f1', percent: '3%' },
];

export default function RequestsClient() {
  const [requests, setRequests] = useState<TechnicianRequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [typeFilter, setTypeFilter] = useState("ทั้งหมด");
  const [urgencyFilter, setUrgencyFilter] = useState("ทั้งหมด");
  const [locationFilter, setLocationFilter] = useState("ทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // In a real app, you would pass the supabase client. 
    // Here we just mock it for demonstration.
    getTechnicianRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  // Unique values for dropdowns based on data
  const locations = ["ทั้งหมด", ...Array.from(new Set(requests.map(r => r.location)))];
  const types = ["ทั้งหมด", "ซ่อมแซม", "บำรุงรักษา", "ติดตั้ง", "อื่นๆ"];
  const urgencies = ["ทั้งหมด", "สูง", "ปานกลาง", "ต่ำ"];
  const statuses = ["ทั้งหมด", "รอดำเนินการ", "กำลังดำเนินการ", "เสร็จสิ้น", "ยกเลิก"];

  const filteredRequests = requests.filter(req => {
    // 1. Status Filter
    if (statusFilter !== "ทั้งหมด" && req.status !== statusFilter) return false;
    // 2. Type Filter
    if (typeFilter !== "ทั้งหมด" && req.type !== typeFilter) return false;
    // 3. Urgency Filter
    if (urgencyFilter !== "ทั้งหมด" && req.urgency !== urgencyFilter) return false;
    // 4. Location Filter
    if (locationFilter !== "ทั้งหมด" && req.location !== locationFilter) return false;

    // 5. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!req.id.toLowerCase().includes(q) &&
        !req.asset.toLowerCase().includes(q) &&
        !req.location.toLowerCase().includes(q) &&
        !req.reporter.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats for top cards
  const stats = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'รอดำเนินการ').length,
    inProgress: requests.filter(r => r.status === 'กำลังดำเนินการ').length,
    completed: requests.filter(r => r.status === 'เสร็จสิ้น').length,
    cancelled: requests.filter(r => r.status === 'ยกเลิก').length,
  };

  return (
    <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
            แจ้งซ่อม / คำขอ
          </h1>
          <p className="text-[14px] font-medium text-slate-500">
            จัดการคำขอแจ้งซ่อมและติดตามสถานะการดำเนินการ
          </p>
        </div>

        <button className="px-6 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          สร้างแจ้งซ่อม / คำขอ
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

        {/* All */}
        <div className="bg-[#f8faff] rounded-[16px] p-5 flex items-center gap-4 border border-[#eff4ff]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#e5edff]">
            <FileText className="w-7 h-7 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-900 mb-0.5">ทั้งหมด</span>
            <span className="text-[28px] font-black text-blue-950 leading-none tracking-tight">{stats.all}</span>
            <span className="text-[11px] font-bold text-blue-900 mb-1.5 mt-0.5">รายการ</span>
            <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
              ดูทั้งหมด <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-[#fff9f5] rounded-[16px] p-5 flex items-center gap-4 border border-[#fff2eb]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#ffede0]">
            <Clock className="w-7 h-7 text-orange-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-900 mb-0.5">รอดำเนินการ</span>
            <span className="text-[28px] font-black text-blue-950 leading-none tracking-tight">{stats.pending}</span>
            <span className="text-[11px] font-bold text-blue-900 mt-0.5">รายการ</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-[#fbf8ff] rounded-[16px] p-5 flex items-center gap-4 border border-[#f5edff]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#efe5ff]">
            <Wrench className="w-7 h-7 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-900 mb-0.5">กำลังดำเนินการ</span>
            <span className="text-[28px] font-black text-blue-950 leading-none tracking-tight">{stats.inProgress}</span>
            <span className="text-[11px] font-bold text-blue-900 mt-0.5">รายการ</span>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-[#f5fdf9] rounded-[16px] p-5 flex items-center gap-4 border border-[#ecfcf4]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#e0f9ed]">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-900 mb-0.5">เสร็จสิ้น</span>
            <span className="text-[28px] font-black text-blue-950 leading-none tracking-tight">{stats.completed}</span>
            <span className="text-[11px] font-bold text-blue-900 mt-0.5">รายการ</span>
          </div>
        </div>

        {/* Cancelled */}
        <div className="bg-[#fff6f6] rounded-[16px] p-5 flex items-center gap-4 border border-[#ffebeb]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#ffe0e0]">
            <XCircle className="w-7 h-7 text-rose-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-900 mb-0.5">ยกเลิก</span>
            <span className="text-[28px] font-black text-blue-950 leading-none tracking-tight">{stats.cancelled}</span>
            <span className="text-[11px] font-bold text-blue-900 mt-0.5">รายการ</span>
          </div>
        </div>

      </div>

      {/* Filters Bar */}
      <div className="bg-white border-y md:border border-slate-200 md:rounded-[32px] p-2 flex flex-col xl:flex-row items-center gap-3 shadow-sm mb-6 w-full -mx-6 px-6 md:mx-0 md:px-2">
        <div className="relative flex-1 min-w-[280px] w-full xl:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาเลขที่แจ้งซ่อม, ครุภัณฑ์, สถานที่, ผู้แจ้ง..."
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-slate-200 rounded-[20px] text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">

          <div className="flex flex-col min-w-[110px]">
            <span className="text-[10px] font-bold text-slate-400 ml-3 mb-0.5">สถานะ</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-transparent border-none text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-0 pl-3 pr-8 py-1 cursor-pointer"
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden xl:block"></div>

          <div className="flex flex-col min-w-[110px]">
            <span className="text-[10px] font-bold text-slate-400 ml-3 mb-0.5">ประเภทคำขอ</span>
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none bg-transparent border-none text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-0 pl-3 pr-8 py-1 cursor-pointer"
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden xl:block"></div>

          <div className="flex flex-col min-w-[110px]">
            <span className="text-[10px] font-bold text-slate-400 ml-3 mb-0.5">ความเร่งด่วน</span>
            <div className="relative">
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="w-full appearance-none bg-transparent border-none text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-0 pl-3 pr-8 py-1 cursor-pointer"
              >
                {urgencies.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden xl:block"></div>

          <div className="flex flex-col min-w-[140px]">
            <span className="text-[10px] font-bold text-slate-400 ml-3 mb-0.5">สถานที่</span>
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full appearance-none bg-transparent border-none text-[13px] font-bold text-slate-700 focus:outline-none focus:ring-0 pl-3 pr-8 py-1 cursor-pointer"
              >
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden xl:block"></div>

          <div className="flex flex-col min-w-[180px]">
            <span className="text-[10px] font-bold text-slate-400 ml-3 mb-0.5">ช่วงวันที่แจ้ง</span>
            <div className="px-3 py-1 bg-transparent text-[13px] font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              01/05/2567 - 20/05/2567
            </div>
          </div>

          <div className="flex items-center justify-end shrink-0 gap-2 pl-2">
            <button className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ทั้งหมด');
                setTypeFilter('ทั้งหมด');
                setUrgencyFilter('ทั้งหมด');
                setLocationFilter('ทั้งหมด');
              }}
              className="text-[12px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors whitespace-nowrap px-2"
            >
              ล้างตัวกรอง
            </button>
          </div>

        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column: Data Table */}
        <div className="flex-1 bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="w-12 px-4 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  </th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-600 whitespace-nowrap">เลขที่แจ้งซ่อม</th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-600 whitespace-nowrap">ครุภัณฑ์ / รายการ</th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-600 whitespace-nowrap">สถานที่</th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-600 whitespace-nowrap">ผู้แจ้ง</th>
                  <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-600 whitespace-nowrap">ความเร่งด่วน</th>
                  <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-600 whitespace-nowrap">สถานะ</th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-600 whitespace-nowrap">วันที่แจ้ง</th>
                  <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-600 whitespace-nowrap">กำหนดเสร็จ</th>
                  <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-600 whitespace-nowrap">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
                        กำลังโหลดข้อมูล...
                      </div>
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                      ไม่พบข้อมูลที่ตรงกับตัวกรอง
                    </td>
                  </tr>
                ) : paginatedRequests.map((req, idx) => (
                  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${req.iconBg}`}>
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[12px] font-black text-slate-800">{req.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {req.image ? (
                          <img src={req.image} alt={req.asset} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                            <Wrench className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                        <span className="text-[13px] font-bold text-slate-900 line-clamp-2">{req.asset}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[13px] font-medium text-slate-600">{req.location}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-700">{req.reporter}</span>
                        <span className="text-[11px] font-medium text-slate-500">เจ้าหน้าที่</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-black inline-block ${req.urgency === 'สูง' ? 'text-rose-600 border border-rose-200 bg-white' :
                        req.urgency === 'ปานกลาง' ? 'text-orange-600 border border-orange-200 bg-white' :
                          'text-emerald-600 border border-emerald-200 bg-white'
                        }`}>
                        {req.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-black inline-block ${req.status === 'รอดำเนินการ' ? 'bg-orange-50 text-orange-600' :
                        req.status === 'กำลังดำเนินการ' ? 'bg-purple-50 text-purple-600' :
                          req.status === 'เสร็จสิ้น' ? 'bg-emerald-50 text-emerald-600' :
                            req.status === 'ยกเลิก' ? 'bg-rose-50 text-rose-600' :
                              'bg-slate-100 text-slate-500'
                        }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-700">{req.dateTop}</span>
                        <span className="text-[11px] font-medium text-slate-500">{req.dateBottom}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-700">{req.dueTop}</span>
                        <span className="text-[11px] font-medium text-slate-500">{req.dueBottom}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors whitespace-nowrap">
                          ดูรายละเอียด
                        </button>
                        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-slate-100 p-4 flex items-center justify-between mt-auto bg-white">
            <span className="text-[12px] font-medium text-slate-500">
              แสดง {totalItems === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} จาก {totalItems} รายการ
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value={10}>10 / หน้า</option>
                  <option value={20}>20 / หน้า</option>
                  <option value={50}>50 / หน้า</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= safeCurrentPage - 1 && page <= safeCurrentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg font-bold text-[13px] transition-colors ${safeCurrentPage === page
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === safeCurrentPage - 2 ||
                    page === safeCurrentPage + 2
                  ) {
                    return <span key={page} className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">

          {/* Latest Request Card */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-black text-slate-900">คำขอล่าสุด</h3>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูทั้งหมด <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-black text-slate-900">RQ-6705-0056</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600">
                  รอดำเนินการ
                </span>
              </div>
              <span className="text-[13px] font-bold text-slate-700 leading-snug">
                เครื่องปรับอากาศ แบบแขวน<br />
                <span className="text-[12px] font-medium text-slate-500">อาคารสำนักงาน ชั้น 2</span>
              </span>

              <div className="flex flex-col gap-1 mt-1 bg-slate-50 rounded-lg p-3">
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  แจ้งโดย: น.ส. กานต์พิชชา
                </span>
                <span className="text-[11px] font-bold text-slate-600 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  20 พ.ค. 2567 09:15 น.
                </span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-slate-200 text-blue-600 font-bold text-[12px] hover:bg-blue-50 transition-colors mt-1 shadow-sm">
              ดูรายละเอียด
            </button>
          </div>

          {/* Reporting Channels */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="text-[14px] font-black text-slate-900">ช่องทางการแจ้ง</h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">แอปพลิเคชัน</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">28</span>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">โทรศัพท์</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">16</span>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">Walk-in</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">8</span>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">อีเมล</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">4</span>
              </div>
            </div>
          </div>

          {/* Statistics Chart */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-2">
            <h3 className="text-[14px] font-black text-slate-900">สถิติการแจ้งตามประเภท</h3>
            <span className="text-[11px] font-bold text-slate-400 mb-2">(30 วันล่าสุด)</span>

            <div className="flex items-center gap-3">
              <div className="w-[110px] h-[110px] shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHART_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-2.5 flex-1 pt-1">
                {CHART_DATA.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[11px] font-bold text-slate-700 line-clamp-1">{item.name}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 pl-4.5">{item.value} ({item.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Average Response Time */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-1">
            <h3 className="text-[14px] font-black text-slate-900">เวลาตอบสนองเฉลี่ย</h3>
            <span className="text-[11px] font-bold text-slate-400 mb-2">(30 วันล่าสุด)</span>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[36px] font-black text-[#1e293b] leading-none tracking-tight">2.45</span>
              <span className="text-[14px] font-bold text-slate-600">ชม.</span>
            </div>

            <div className="flex items-center gap-1 mt-2 px-3 py-1.5 bg-emerald-50 rounded-lg w-fit">
              <ArrowDown className="w-4 h-4 text-emerald-600" />
              <span className="text-[12px] font-bold text-emerald-700">ลดลง 12%</span>
              <span className="text-[11px] font-medium text-emerald-600/70 ml-1">จากเดือนก่อนหน้า</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
