"use client";

import { TechnicianDocumentItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianDocuments } from "./mock";
import {
  Book,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CloudDownload,
  Download,
  File,
  FileCheck,
  FileCode,
  FileSignature,
  FileSpreadsheet,
  FileText,
  Filter,
  MoreVertical,
  Plus,
  Search
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DocumentsClient() {
  const [documents, setDocuments] = useState<TechnicianDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ทั้งหมด");
  const [typeFilter, setTypeFilter] = useState("ทั้งหมด");
  const [equipmentFilter, setEquipmentFilter] = useState("ทั้งหมด");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // In a real app, you would pass the supabase client. 
    getTechnicianDocuments().then((data) => {
      setDocuments(data);
      setLoading(false);
    });
  }, []);

  // Unique values for dropdowns based on data
  const categories = ["ทั้งหมด", ...Array.from(new Set(documents.map(d => d.category)))];
  const fileTypes = ["ทั้งหมด", ...Array.from(new Set(documents.map(d => d.fileType)))];
  const equipments = ["ทั้งหมด", ...Array.from(new Set(documents.map(d => d.equipment)))];

  const filteredDocs = documents.filter(item => {
    // 1. Dropdown Filters
    if (categoryFilter !== "ทั้งหมด" && item.category !== categoryFilter) return false;
    if (typeFilter !== "ทั้งหมด" && item.fileType !== typeFilter) return false;
    if (equipmentFilter !== "ทั้งหมด" && item.equipment !== equipmentFilter) return false;

    // 2. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.documentName.toLowerCase().includes(q) &&
        !item.documentSubtext.toLowerCase().includes(q) &&
        !item.equipment.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredDocs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedDocs = filteredDocs.slice(startIndex, startIndex + itemsPerPage);

  const getCategoryBadgeStyles = (category: string) => {
    switch (category) {
      case 'คู่มือการใช้งาน': return 'bg-[#ecfdf5] text-emerald-600';
      case 'คู่มือซ่อมบำรุง': return 'bg-[#fffbeb] text-amber-600';
      case 'เอกสารมาตรฐาน (SOP)': return 'bg-[#f5edff] text-purple-600';
      case 'แบบฟอร์ม / ฟอร์แมต': return 'bg-[#eff6ff] text-blue-600';
      case 'เอกสารอ้างอิง': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF': return <div className="w-8 h-8 rounded shrink-0 bg-red-50 flex items-center justify-center"><FileText className="w-4 h-4 text-red-500" /></div>;
      case 'DOCX': return <div className="w-8 h-8 rounded shrink-0 bg-blue-50 flex items-center justify-center"><FileSignature className="w-4 h-4 text-blue-500" /></div>;
      case 'XLSX': return <div className="w-8 h-8 rounded shrink-0 bg-green-50 flex items-center justify-center"><FileSpreadsheet className="w-4 h-4 text-green-500" /></div>;
      default: return <div className="w-8 h-8 rounded shrink-0 bg-slate-100 flex items-center justify-center"><File className="w-4 h-4 text-slate-500" /></div>;
    }
  };

  return (
    <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <div className="flex flex-col">
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
            เอกสาร / คู่มือ
          </h1>
          <p className="text-[14px] font-medium text-slate-500">
            จัดเก็บและเข้าถึงเอกสาร คู่มือ และไฟล์อ้างอิงของอุปกรณ์และระบบต่างๆ
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาเอกสาร, คู่มือ, หมายเลขอุปกรณ์..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> อัปโหลดเอกสาร
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* All Docs */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">เอกสารทั้งหมด</span>
              <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">256</span>
              <span className="text-[11px] font-medium text-slate-500 mt-1">รายการ</span>
            </div>
          </div>
          <div className="mt-auto flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
              ดูทั้งหมด <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* User Manuals */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <Book className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">คู่มือการใช้งาน</span>
              <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">128</span>
              <span className="text-[11px] font-medium text-slate-500 mt-1">รายการ</span>
            </div>
          </div>
          <div className="mt-auto flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
              ดูทั้งหมด <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Maintenance Manuals */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">คู่มือซ่อมบำรุง</span>
              <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">64</span>
              <span className="text-[11px] font-medium text-slate-500 mt-1">รายการ</span>
            </div>
          </div>
          <div className="mt-auto flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
              ดูทั้งหมด <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* SOPs */}
        <div className="bg-white rounded-[16px] p-5 flex flex-col border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <ClipboardList className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">เอกสารมาตรฐาน (SOP)</span>
              <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">32</span>
              <span className="text-[11px] font-medium text-slate-500 mt-1">รายการ</span>
            </div>
          </div>
          <div className="mt-auto flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
              ดูทั้งหมด <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Frequent Downloads */}
        <div className="bg-[#f8faff] rounded-[16px] p-5 flex flex-col border border-[#e5edff] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#e5edff] shadow-sm">
              <CloudDownload className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-slate-600 mb-0.5">ไฟล์ดาวน์โหลดบ่อย</span>
              <span className="text-[28px] font-black text-slate-900 leading-none tracking-tight">89</span>
              <span className="text-[11px] font-medium text-slate-500 mt-1">ครั้ง (เดือนนี้)</span>
            </div>
          </div>
          <div className="mt-auto flex justify-end">
            <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
              ดูสถิติ <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Column (Table Area) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">

            {/* Filters Bar */}
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex flex-col md:flex-row md:items-end gap-3 w-full">

                <div className="relative w-full md:w-64 shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="ค้นหาเอกสาร, คู่มือ, คำสำคัญ..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="flex items-end gap-3 flex-wrap">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500 ml-1">หมวดหมู่</span>
                    <div className="relative">
                      <select
                        value={categoryFilter}
                        onChange={(e) => {
                          setCategoryFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[140px]"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500 ml-1">ประเภทเอกสาร</span>
                    <div className="relative">
                      <select
                        value={typeFilter}
                        onChange={(e) => {
                          setTypeFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[120px]"
                      >
                        {fileTypes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500 ml-1">อุปกรณ์ / ระบบ</span>
                    <div className="relative">
                      <select
                        value={equipmentFilter}
                        onChange={(e) => {
                          setEquipmentFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[140px]"
                      >
                        {equipments.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <button className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-blue-600 font-bold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm h-[41px]">
                    <Filter className="w-4 h-4" /> ตัวกรอง
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-6 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ชื่อเอกสาร</th>
                    <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">หมวดหมู่</th>
                    <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">อุปกรณ์ / ระบบ</th>
                    <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ประเภทไฟล์</th>
                    <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">อัปเดตล่าสุด</th>
                    <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ขนาดไฟล์</th>
                    <th className="px-6 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                        กำลังโหลดข้อมูล...
                      </td>
                    </tr>
                  ) : filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                        ไม่พบเอกสารที่ตรงกับตัวกรอง
                      </td>
                    </tr>
                  ) : paginatedDocs.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon(item.fileType)}
                          <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-blue-700 hover:underline cursor-pointer">{item.documentName}</span>
                            {item.documentSubtext && <span className="text-[11px] font-medium text-slate-500">{item.documentSubtext}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold inline-block ${getCategoryBadgeStyles(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-[#1e293b]">{item.equipment}</span>
                          {item.equipmentSubtext && <span className="text-[11px] font-medium text-slate-500">{item.equipmentSubtext}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[12px] font-bold text-slate-700">{item.fileType}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-[#1e293b]">{item.lastUpdatedDate}</span>
                          <span className="text-[11px] font-medium text-slate-500">{item.lastUpdatedTime}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[12px] font-medium text-slate-600">{item.fileSize}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="w-8 h-8 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors bg-white shadow-sm">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors">
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

        {/* Right Column (Widgets Area) */}
        <div className="lg:col-span-1 flex flex-col gap-6">

          {/* Categories Widget */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">หมวดหมู่เอกสาร</h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Book className="w-4 h-4 text-emerald-500" />
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">คู่มือการใช้งาน</span>
                </div>
                <span className="text-[12px] font-bold text-slate-700">128</span>
              </div>

              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-4 h-4 text-amber-500" />
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">คู่มือซ่อมบำรุง</span>
                </div>
                <span className="text-[12px] font-bold text-slate-700">64</span>
              </div>

              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-4 h-4 text-purple-500" />
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">เอกสารมาตรฐาน (SOP)</span>
                </div>
                <span className="text-[12px] font-bold text-slate-700">32</span>
              </div>

              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-4 h-4 text-blue-500" />
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">แบบฟอร์ม / ฟอร์แมต</span>
                </div>
                <span className="text-[12px] font-bold text-slate-700">18</span>
              </div>

              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileCode className="w-4 h-4 text-slate-400" />
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">เอกสารอ้างอิง</span>
                </div>
                <span className="text-[12px] font-bold text-slate-700">12</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
              <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูหมวดหมู่ทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Recent Documents Widget */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">เอกสารล่าสุด</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><FileText className="w-4 h-4 text-red-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-blue-700 hover:underline cursor-pointer leading-tight">คู่มือการใช้งาน WO-6705.pdf</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-0.5">20 พ.ค. 2567</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5"><FileSignature className="w-4 h-4 text-blue-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-blue-700 hover:underline cursor-pointer leading-tight">เช็คลิสต์การบำรุงรักษา.docx</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-0.5">18 พ.ค. 2567</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5"><FileText className="w-4 h-4 text-red-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-blue-700 hover:underline cursor-pointer leading-tight">คู่มือการซ่อมบำรุง WO-6705.pdf</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-0.5">18 พ.ค. 2567</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5"><FileSpreadsheet className="w-4 h-4 text-green-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-blue-700 hover:underline cursor-pointer leading-tight">PM Log_พ.ค.2567.xlsx</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-0.5">17 พ.ค. 2567</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5"><FileText className="w-4 h-4 text-red-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-blue-700 hover:underline cursor-pointer leading-tight">Wiring Diagram WO-6705.pdf</span>
                  <span className="text-[11px] font-medium text-slate-400 mt-0.5">16 พ.ค. 2567</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
              <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูเอกสารล่าสุดทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
