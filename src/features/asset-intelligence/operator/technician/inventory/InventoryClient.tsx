"use client";

import { TechnicianInventoryItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianInventory } from "./mock";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Edit,
  Filter,
  MoreVertical,
  PackageSearch,
  Plus,
  RefreshCw,
  Search,
  Upload,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";

export default function InventoryClient() {
  const [inventory, setInventory] = useState<TechnicianInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [activeTab, setActiveTab] = useState<'ทั้งหมด' | 'มีสต๊อก' | 'สต๊อกต่ำ' | 'สต๊อกหมด'>('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("หมวดหมู่ทั้งหมด");
  const [warehouseFilter, setWarehouseFilter] = useState("คลังทั้งหมด");
  const [statusFilter, setStatusFilter] = useState("สถานะทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // In a real app, you would pass the supabase client. 
    getTechnicianInventory().then((data) => {
      setInventory(data);
      setLoading(false);
    });
  }, []);

  // Unique values for dropdowns based on data
  const categories = ["หมวดหมู่ทั้งหมด", ...Array.from(new Set(inventory.map(i => i.category)))];
  const warehouses = ["คลังทั้งหมด", ...Array.from(new Set(inventory.map(i => i.warehouse)))];
  const statuses = ["สถานะทั้งหมด", "มีสต๊อก", "สต๊อกต่ำ", "สต๊อกหมด"];

  const filteredInventory = inventory.filter(item => {
    // 1. Tab Filter
    if (activeTab !== "ทั้งหมด" && item.status !== activeTab) return false;

    // 2. Dropdown Filters
    if (categoryFilter !== "หมวดหมู่ทั้งหมด" && item.category !== categoryFilter) return false;
    if (warehouseFilter !== "คลังทั้งหมด" && item.warehouse !== warehouseFilter) return false;
    if (statusFilter !== "สถานะทั้งหมด" && item.status !== statusFilter) return false;

    // 3. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.id.toLowerCase().includes(q) &&
        !item.name.toLowerCase().includes(q) &&
        !item.category.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredInventory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats for top cards
  const stats = {
    all: inventory.length,
    inStock: inventory.filter(i => i.status === 'มีสต๊อก').length,
    lowStock: inventory.filter(i => i.status === 'สต๊อกต่ำ').length,
    outOfStock: inventory.filter(i => i.status === 'สต๊อกหมด').length,
    totalValue: inventory.reduce((sum, item) => sum + item.totalValue, 0),
  };

  return (
    <div className="min-h-full flex-1 bg-[#F8FAFC] w-full p-6 pb-40 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none mb-2">
            อะไหล่ / คลัง
          </h1>
          <p className="text-[14px] font-medium text-slate-500">
            จัดการอะไหล่และวัสดุคงคลังทั้งหมด
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาอะไหล่, รหัสอะไหล่, หมวดหมู่..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="px-4 py-2 rounded-[12px] bg-white border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
            <Upload className="w-4 h-4 text-blue-600" />
            นำเข้าอะไหล่
          </button>
          <button className="px-4 py-2 rounded-[12px] bg-white border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            ปรับปรุงสต๊อก
          </button>
          <button className="px-6 py-2 rounded-[12px] bg-blue-600 text-white font-bold text-[13px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            เพิ่มอะไหล่ใหม่
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* All Items */}
        <div className="bg-[#f8faff] rounded-[16px] p-5 flex items-center gap-4 border border-[#eff4ff]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#e5edff]">
            <PackageSearch className="w-7 h-7 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-blue-900 mb-0.5">รายการอะไหล่ทั้งหมด</span>
            <span className="text-[28px] font-black text-blue-950 leading-none tracking-tight">{stats.all}</span>
            <span className="text-[11px] font-bold text-blue-900 mt-1">รายการ</span>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-[#f5fdf9] rounded-[16px] p-5 flex items-center gap-4 border border-[#ecfcf4]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#e0f9ed]">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-emerald-900 mb-0.5">มีสต๊อกพร้อมใช้</span>
            <span className="text-[28px] font-black text-emerald-950 leading-none tracking-tight">{stats.inStock}</span>
            <span className="text-[11px] font-bold text-emerald-900 mt-1">รายการ</span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-[#fffbf5] rounded-[16px] p-5 flex items-center gap-4 border border-[#fff6ea]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#ffeed5]">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[12px] font-bold text-amber-900 mb-0.5">สต๊อกต่ำ</span>
            <span className="text-[28px] font-black text-amber-950 leading-none tracking-tight">{stats.lowStock}</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] font-bold text-amber-900">รายการ</span>
              <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
                ดูรายการ <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-[#fff6f6] rounded-[16px] p-5 flex items-center gap-4 border border-[#ffebeb]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#ffe0e0]">
            <XCircle className="w-7 h-7 text-rose-500" />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[12px] font-bold text-rose-900 mb-0.5">สต๊อกหมด</span>
            <span className="text-[28px] font-black text-rose-950 leading-none tracking-tight">{stats.outOfStock}</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] font-bold text-rose-900">รายการ</span>
              <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
                ดูรายการ <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-[#fbf8ff] rounded-[16px] p-5 flex items-center gap-4 border border-[#f5edff]">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#efe5ff]">
            <ClipboardList className="w-7 h-7 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-purple-900 mb-0.5">มูลค่าคงคลังรวม</span>
            <span className="text-[24px] font-black text-purple-950 leading-none tracking-tight">
              {stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] font-bold text-purple-900 mt-1">บาท</span>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">

        {/* Tabs */}
        <div className="flex items-center gap-8 px-6 border-b border-slate-200">
          {(['ทั้งหมด', 'มีสต๊อก', 'สต๊อกต่ำ', 'สต๊อกหมด'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาอะไหล่, รหัสอะไหล่, หมวดหมู่..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[160px]"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={warehouseFilter}
                  onChange={(e) => setWarehouseFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[140px]"
                >
                  {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[140px]"
                >
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <button className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-blue-600 font-bold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" /> ตัวกรอง
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('หมวดหมู่ทั้งหมด');
              setWarehouseFilter('คลังทั้งหมด');
              setStatusFilter('สถานะทั้งหมด');
              setActiveTab('ทั้งหมด');
            }}
            className="text-[12px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <XCircle className="w-3.5 h-3.5" /> ล้างตัวกรอง
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
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">รหัสอะไหล่</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">ชื่ออะไหล่</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">หมวดหมู่</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">หน่วย</th>
                <th className="px-4 py-4 text-left text-[12px] font-bold text-slate-500 whitespace-nowrap">คลัง</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">สต๊อกคงเหลือ</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">สต๊อกขั้นต่ำ</th>
                <th className="px-4 py-4 text-right text-[12px] font-bold text-slate-500 whitespace-nowrap">มูลค่าต่อหน่วย (บาท)</th>
                <th className="px-4 py-4 text-right text-[12px] font-bold text-slate-500 whitespace-nowrap">มูลค่ารวม (บาท)</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">สถานะ</th>
                <th className="px-4 py-4 text-center text-[12px] font-bold text-slate-500 whitespace-nowrap">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              ) : filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                    ไม่พบข้อมูลที่ตรงกับตัวกรอง
                  </td>
                </tr>
              ) : paginatedInventory.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-bold text-blue-600">{item.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-slate-50" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                          <PackageSearch className="w-4 h-4 text-slate-400" />
                        </div>
                      )}
                      <span className="text-[12px] font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-medium text-slate-600">{item.category}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-[12px] font-medium text-slate-600">{item.unit}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-medium text-slate-600">{item.warehouse}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-[13px] font-black ${item.stockRem === 0 ? 'text-rose-600' :
                        item.stockRem <= item.stockMin ? 'text-amber-600' :
                          'text-emerald-600'
                      }`}>
                      {item.stockRem}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-[12px] font-medium text-slate-500">{item.stockMin}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-[12px] font-medium text-slate-700">
                      {item.unitValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-[12px] font-medium text-slate-700">
                      {item.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold inline-block ${item.status === 'มีสต๊อก' ? 'bg-[#f0fdf4] text-emerald-600' :
                        item.status === 'สต๊อกต่ำ' ? 'bg-[#fffbeb] text-amber-600' :
                          'bg-[#fef2f2] text-rose-600'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-7 h-7 rounded text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
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
