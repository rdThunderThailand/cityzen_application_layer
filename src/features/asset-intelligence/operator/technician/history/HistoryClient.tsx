"use client";

import { TechnicianHistoryItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianHistory } from "./mock";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  MoreVertical,
  RefreshCw,
  Search,
  Star,
  Wrench,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";

export default function HistoryClient() {
  const [historyItems, setHistoryItems] = useState<TechnicianHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [jobTypeFilter, setJobTypeFilter] = useState("ทั้งหมด");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // In a real app, you would pass the supabase client. 
    getTechnicianHistory().then((data) => {
      setHistoryItems(data);
      setLoading(false);
    });
  }, []);

  // Unique values for dropdowns based on data
  const statuses = ["ทั้งหมด", "เสร็จสิ้น", "กำลังดำเนินการ", "ยกเลิก"];
  const jobTypes = ["ทั้งหมด", ...Array.from(new Set(historyItems.map(h => h.jobType)))];

  const filteredHistory = historyItems.filter(item => {
    // 1. Dropdown Filters
    if (statusFilter !== "ทั้งหมด" && item.status !== statusFilter) return false;
    if (jobTypeFilter !== "ทั้งหมด" && item.jobType !== jobTypeFilter) return false;

    // 2. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.workOrderId.toLowerCase().includes(q) &&
        !item.equipmentName.toLowerCase().includes(q) &&
        !item.location.toLowerCase().includes(q) &&
        !item.operatorName.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredHistory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating: number) => {
    if (rating === 0) return <span className="text-[12px] font-medium text-slate-400">-</span>;
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
            />
          ))}
        </div>
        <span className="text-[12px] font-bold text-slate-700">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col mb-2">
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500 mb-4">
          <span className="cursor-pointer hover:text-blue-600">หน้าหลัก</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-slate-800">ประวัติการซ่อม</span>
        </div>
        <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
          ประวัติการซ่อม
        </h1>
        <p className="text-[14px] font-medium text-slate-500">
          ดูประวัติการซ่อมบำรุงทั้งหมดของอุปกรณ์และระบบ
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Completed Work Orders */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">ใบงานที่ซ่อมเสร็จแล้ว</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">128</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">ใบงาน</span>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-[11px] font-medium text-slate-500">เดือนที่ 28 ใบงาน</span>
            <div className="flex items-center gap-1 text-emerald-600">
              <ArrowUp className="w-3 h-3" />
              <span className="text-[11px] font-bold">12%</span>
            </div>
          </div>
        </div>

        {/* Successfully repaired */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">ซ่อมสำเร็จ</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">122</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">ใบงาน</span>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-[11px] font-medium text-slate-500">เดือนที่ 26 ใบงาน</span>
            <div className="flex items-center gap-1 text-emerald-600">
              <ArrowUp className="w-3 h-3" />
              <span className="text-[11px] font-bold">10%</span>
            </div>
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
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">6</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">ใบงาน</span>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-[11px] font-medium text-slate-500">เดือนที่ 2 ใบงาน</span>
            <div className="flex items-center gap-1 text-rose-600">
              <ArrowUp className="w-3 h-3" />
              <span className="text-[11px] font-bold">20%</span>
            </div>
          </div>
        </div>

        {/* Average repair time */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">เฉลี่ยเวลาซ่อม</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">2.45</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">ชั่วโมง</span>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-end pt-4 border-t border-slate-50">
            <div className="flex items-center gap-1 text-emerald-600">
              <span className="text-[11px] font-medium text-slate-500 mr-1">เดือนที่</span>
              <ArrowDown className="w-3 h-3" />
              <span className="text-[11px] font-bold">8%</span>
            </div>
          </div>
        </div>

        {/* Average satisfaction */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">ความพึงพอใจเฉลี่ย</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">4.6 / 5</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">จาก 32 รีวิว</span>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-end pt-4 border-t border-slate-50">
            <div className="flex items-center gap-1 text-emerald-600">
              <ArrowUp className="w-3 h-3" />
              <span className="text-[11px] font-bold">9%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">

        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">

            <div className="relative w-full lg:w-[320px] shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ค้นหาใบงาน, อุปกรณ์, สถานที่..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 ml-1">สถานะ:</span>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[140px]"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 ml-1">ประเภทงาน:</span>
                <div className="relative">
                  <select
                    value={jobTypeFilter}
                    onChange={(e) => {
                      setJobTypeFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[160px]"
                  >
                    {jobTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 ml-1">ช่วงวันที่:</span>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                  <input
                    type="text"
                    value="01/05/2567 - 20/05/2567"
                    readOnly
                    className="pl-9 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 focus:outline-none min-w-[220px] cursor-pointer"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <button className="mt-5 px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-600 font-bold text-[13px] flex items-center gap-2 hover:bg-blue-50 transition-colors">
                <Filter className="w-4 h-4" /> ตัวกรอง
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("ทั้งหมด");
              setJobTypeFilter("ทั้งหมด");
              setCurrentPage(1);
            }}
            className="mt-5 px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" /> ล้างตัวกรอง
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px]">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">เลขที่ใบงาน</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">อุปกรณ์ / ระบบ</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">สถานที่</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ประเภทงาน</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">วันที่เริ่มงาน</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">วันที่เสร็จงาน</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ผู้ดำเนินการ</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">สถานะ</th>
                <th className="px-4 py-4 text-right text-[12px] font-bold text-slate-500 whitespace-nowrap">ค่าใช้จ่ายรวม (บาท)</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">คะแนนความพึงพอใจ</th>
                <th className="px-6 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              ) : filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                    ไม่พบข้อมูลที่ตรงกับตัวกรอง
                  </td>
                </tr>
              ) : paginatedHistory.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === 'เสร็จสิ้น' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : item.status === 'กำลังดำเนินการ' ? (
                        <Clock className="w-4 h-4 text-amber-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                      <span className="text-[12px] font-bold text-blue-600">{item.workOrderId}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.equipmentName} className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Wrench className="w-4 h-4 text-slate-400" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#1e293b]">{item.equipmentName}</span>
                        <span className="text-[11px] font-medium text-slate-500">{item.equipmentSubtext}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#1e293b]">{item.location}</span>
                      <span className="text-[11px] font-medium text-slate-500">{item.locationSubtext}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-medium text-slate-700">{item.jobType}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#1e293b]">{item.startDate}</span>
                      <span className="text-[11px] font-medium text-slate-500">{item.startTime}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {item.endDate !== '-' ? (
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#1e293b]">{item.endDate}</span>
                        <span className="text-[11px] font-medium text-slate-500">{item.endTime}</span>
                      </div>
                    ) : (
                      <span className="text-[12px] font-medium text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {item.operatorAvatar ? (
                        <img src={item.operatorAvatar} alt={item.operatorName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#1e293b]">{item.operatorName}</span>
                        <span className="text-[10px] font-medium text-slate-500">{item.operatorRole}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black inline-block ${item.status === 'เสร็จสิ้น' ? 'bg-[#ecfdf5] text-emerald-600' :
                        item.status === 'กำลังดำเนินการ' ? 'bg-[#fffbeb] text-amber-500' :
                          'bg-[#fef2f2] text-rose-500'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    {item.cost > 0 ? (
                      <span className="text-[12px] font-medium text-slate-700">
                        {item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span className="text-[12px] font-medium text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 flex items-center justify-center">
                    {renderStars(item.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors whitespace-nowrap bg-white shadow-sm">
                        ดูรายละเอียด
                      </button>
                      <button className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors">
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
          <span className="text-[12px] font-medium text-slate-500 pl-2">
            แสดง {totalItems === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} จาก {totalItems} รายการ
          </span>

          <div className="flex items-center gap-4 pr-2">
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
