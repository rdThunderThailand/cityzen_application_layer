"use client";

import { TechnicianToolItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianTools } from "./mock";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  Filter,
  MoreVertical,
  PenTool,
  Search,
  Wrench
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ToolsClient() {
  const [tools, setTools] = useState<TechnicianToolItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [activeTab, setActiveTab] = useState<'ทั้งหมด' | 'พร้อมใช้งาน' | 'ถูกใช้งาน' | 'ต้องตรวจสอบ' | 'ครบกำหนดสอบเทียบ'>('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ประเภทเครื่องมือ");
  const [statusFilter, setStatusFilter] = useState("สถานะ");
  const [locationFilter, setLocationFilter] = useState("ตำแหน่ง");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // In a real app, you would pass the supabase client. 
    getTechnicianTools().then((data) => {
      setTools(data);
      setLoading(false);
    });
  }, []);

  // Unique values for dropdowns based on data
  const types = ["ประเภทเครื่องมือ", ...Array.from(new Set(tools.map(t => t.category)))];
  const statuses = ["สถานะ", "พร้อมใช้งาน", "ถูกใช้งาน", "ต้องตรวจสอบ"];
  const locations = ["ตำแหน่ง", ...Array.from(new Set(tools.map(t => t.location)))];

  const filteredTools = tools.filter(item => {
    // 1. Tab Filter
    if (activeTab === 'ครบกำหนดสอบเทียบ') {
      if (!item.isOverdue && !item.calibrationStatusText.includes('เหลือ')) return false; // Basic matching for "Due"
    } else if (activeTab !== "ทั้งหมด" && item.status !== activeTab) {
      return false;
    }

    // 2. Dropdown Filters
    if (typeFilter !== "ประเภทเครื่องมือ" && item.category !== typeFilter) return false;
    if (statusFilter !== "สถานะ" && item.status !== statusFilter) return false;
    if (locationFilter !== "ตำแหน่ง" && item.location !== locationFilter) return false;

    // 3. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.id.toLowerCase().includes(q) &&
        !item.name.toLowerCase().includes(q) &&
        !item.enName.toLowerCase().includes(q) &&
        !item.serialNumber.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredTools.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedTools = filteredTools.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats for top cards
  const stats = {
    all: tools.length,
    ready: tools.filter(t => t.status === 'พร้อมใช้งาน').length,
    inUse: tools.filter(t => t.status === 'ถูกใช้งาน').length,
    inspect: tools.filter(t => t.status === 'ต้องตรวจสอบ').length,
    calibrationDue: tools.filter(t => t.isOverdue || t.calibrationStatusText.includes('เหลือ')).length,
  };

  return (
    <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex flex-col">
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
            เครื่องมือของฉัน
          </h1>
          <p className="text-[14px] font-medium text-slate-500">
            จัดการและติดตามเครื่องมือที่ได้รับมอบหมาย
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาเครื่องมือ, รหัสครุภัณฑ์, หมายเลขซีเรียล..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* All Items */}
        <div className="bg-[#f8faff] rounded-[16px] p-5 flex items-center gap-4 border border-[#eff4ff]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#e5edff]">
            <Briefcase className="w-7 h-7 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-900 mb-0.5">เครื่องมือทั้งหมด</span>
            <span className="text-[28px] font-black text-blue-950 leading-none tracking-tight">{stats.all}</span>
            <span className="text-[11px] font-bold text-blue-900 mt-1">รายการ</span>
          </div>
        </div>

        {/* Ready */}
        <div className="bg-[#f5fdf9] rounded-[16px] p-5 flex items-center gap-4 border border-[#ecfcf4]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#e0f9ed]">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-emerald-900 mb-0.5">พร้อมใช้งาน</span>
            <span className="text-[28px] font-black text-emerald-950 leading-none tracking-tight">{stats.ready}</span>
            <span className="text-[11px] font-bold text-emerald-900 mt-1">รายการ</span>
          </div>
        </div>

        {/* In Use */}
        <div className="bg-[#fffbf5] rounded-[16px] p-5 flex items-center gap-4 border border-[#fff6ea]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#ffeed5]">
            <Wrench className="w-7 h-7 text-amber-500" />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[12px] font-bold text-amber-900 mb-0.5">ถูกใช้งาน</span>
            <span className="text-[28px] font-black text-amber-950 leading-none tracking-tight">{stats.inUse}</span>
            <span className="text-[11px] font-bold text-amber-900 mt-1">รายการ</span>
          </div>
        </div>

        {/* Inspect */}
        <div className="bg-[#fff6f6] rounded-[16px] p-5 flex items-center gap-4 border border-[#ffebeb]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#ffe0e0]">
            <AlertCircle className="w-7 h-7 text-rose-500" />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[12px] font-bold text-rose-900 mb-0.5">ต้องตรวจสอบ</span>
            <span className="text-[28px] font-black text-rose-950 leading-none tracking-tight">{stats.inspect}</span>
            <span className="text-[11px] font-bold text-rose-900 mt-1">รายการ</span>
          </div>
        </div>

        {/* Calibration Due */}
        <div className="bg-[#fbf8ff] rounded-[16px] p-5 flex items-center gap-4 border border-[#f5edff]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#efe5ff]">
            <Calendar className="w-7 h-7 text-purple-600" />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[12px] font-bold text-purple-900 mb-0.5">ครบกำหนดสอบเทียบ</span>
            <span className="text-[28px] font-black text-purple-950 leading-none tracking-tight">{stats.calibrationDue}</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] font-bold text-purple-900">รายการ</span>
              <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
                ดูทั้งหมด <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">

        {/* Tabs */}
        <div className="flex items-center gap-8 px-6 border-b border-slate-200">
          {(['ทั้งหมด', 'พร้อมใช้งาน', 'ถูกใช้งาน', 'ต้องตรวจสอบ', 'ครบกำหนดสอบเทียบ'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ค้นหาเครื่องมือ, รหัสครุภัณฑ์..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[140px]"
                >
                  {types.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[120px]"
                >
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={locationFilter}
                  onChange={(e) => {
                    setLocationFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[140px]"
                >
                  {locations.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <button className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-blue-600 font-bold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                <Filter className="w-4 h-4" /> ตัวกรอง
              </button>
            </div>
          </div>

          <button className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-blue-600 font-bold text-[13px] hover:bg-slate-50 flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 shadow-sm">
            <Download className="w-4 h-4" /> ส่งออกข้อมูล
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="w-12 px-4 py-4 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">เครื่องมือ</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">รหัสครุภัณฑ์</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ประเภท</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ยี่ห้อ / รุ่น</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">หมายเลขซีเรียล</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">สถานะ</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ตำแหน่ง</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">วันครบกำหนดสอบเทียบ</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              ) : filteredTools.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                    ไม่พบข้อมูลที่ตรงกับตัวกรอง
                  </td>
                </tr>
              ) : paginatedTools.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                          <PenTool className="w-4 h-4 text-slate-400" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[12px] font-black text-[#1e293b]">{item.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">{item.enName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-bold text-blue-600">{item.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-medium text-slate-600">{item.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-bold text-slate-700">{item.brandModel}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-medium text-slate-600">{item.serialNumber}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black inline-block ${item.status === 'พร้อมใช้งาน' ? 'bg-[#ecfdf5] text-emerald-600 border border-emerald-100' :
                      item.status === 'ถูกใช้งาน' ? 'bg-[#fffbeb] text-amber-600 border border-amber-100' :
                        'bg-[#fef2f2] text-rose-600 border border-rose-100'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-medium text-slate-600">{item.location}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {item.calibrationDate !== '-' ? (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[12px] font-bold text-[#1e293b]">{item.calibrationDate}</span>
                        <span className={`text-[11px] font-black ${item.isOverdue ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {item.calibrationStatusText}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[12px] font-medium text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm bg-white">
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

    </div>
  );
}
