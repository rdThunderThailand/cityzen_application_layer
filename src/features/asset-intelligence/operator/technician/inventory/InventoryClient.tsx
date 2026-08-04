"use client";

import { TechnicianInventoryItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianInventory } from "./mock";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Edit,
  MoreVertical,
  PackageSearch,
  Plus,
  RefreshCw,
  Search,
  Upload,
  XCircle
} from "lucide-react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianTable } from "../components/shared/TechnicianTable";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
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
    <TechnicianPageLayout
      title="อะไหล่ / คลัง"
      description="จัดการอะไหล่และวัสดุคงคลังทั้งหมด"
      breadcrumbs={[{ label: "หน้าหลัก", href: "#" }, { label: "อะไหล่ / คลัง" }]}
      headerActions={
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
      }
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CardMetric
          title="รายการอะไหล่ทั้งหมด"
          value={stats.all.toString()}
          subtitle="รายการ"
          icon={PackageSearch}
          classNameForIcon="bg-blue-50 text-blue-600"
          className="max-h-180 gap-2 p-5"
        />
        <CardMetric
          title="มีสต๊อกพร้อมใช้"
          value={stats.inStock.toString()}
          subtitle="รายการ"
          icon={CheckCircle2}
          classNameForIcon="bg-emerald-50 text-emerald-600"
          className="max-h-180 gap-2 p-5"
        />
        <CardMetric
          title="สต๊อกต่ำ"
          value={stats.lowStock.toString()}
          subtitle="รายการ"
          icon={AlertTriangle}
          classNameForIcon="bg-orange-50 text-orange-500"
          className="max-h-180 gap-2 p-5"
          action={
            <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
              ดูรายการ <ChevronRight className="w-3 h-3" />
            </button>
          }
        />
        <CardMetric
          title="สต๊อกหมด"
          value={stats.outOfStock.toString()}
          subtitle="รายการ"
          icon={XCircle}
          classNameForIcon="bg-rose-50 text-rose-500"
          className="max-h-180 gap-2 p-5"
          action={
            <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
              ดูรายการ <ChevronRight className="w-3 h-3" />
            </button>
          }
        />
        <CardMetric
          title="มูลค่าคงคลังรวม"
          value={stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          subtitle="บาท"
          icon={ClipboardList}
          classNameForIcon="bg-purple-50 text-purple-600 "
          className="max-h-180 gap-2 p-5"
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col mt-6">

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

        <TechnicianFilterBar
          searchQuery={searchQuery}
          searchPlaceholder="ค้นหาอะไหล่, รหัสอะไหล่, หมวดหมู่..."
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          filters={[
            {
              label: "หมวดหมู่",
              value: categoryFilter,
              options: categories,
              onChange: (val) => {
                setCategoryFilter(val);
                setCurrentPage(1);
              },
              minWidth: "160px",
            },
            {
              label: "คลัง",
              value: warehouseFilter,
              options: warehouses,
              onChange: (val) => {
                setWarehouseFilter(val);
                setCurrentPage(1);
              },
            },
            {
              label: "สถานะ",
              value: statusFilter,
              options: statuses,
              onChange: (val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              },
            }
          ]}
          onClearFilters={() => {
            setSearchQuery('');
            setCategoryFilter('หมวดหมู่ทั้งหมด');
            setWarehouseFilter('คลังทั้งหมด');
            setStatusFilter('สถานะทั้งหมด');
            setActiveTab('ทั้งหมด');
          }}
        />

        <TechnicianTable
          minWidth="1200px"
          loading={loading}
          empty={!loading && filteredInventory.length === 0}
          emptyText="ไม่พบข้อมูลที่ตรงกับตัวกรอง"
          columns={[
            { header: <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />, align: "center", width: "3rem" },
            { header: "รหัสอะไหล่" },
            { header: "ชื่ออะไหล่" },
            { header: "หมวดหมู่" },
            { header: "หน่วย", align: "center" },
            { header: "คลัง" },
            { header: "สต๊อกคงเหลือ", align: "center" },
            { header: "สต๊อกขั้นต่ำ", align: "center" },
            { header: "มูลค่าต่อหน่วย (บาท)", align: "right" },
            { header: "มูลค่ารวม (บาท)", align: "right" },
            { header: "สถานะ", align: "center" },
            { header: "จัดการ", align: "center" },
          ]}
        >
          {paginatedInventory.map((item, idx) => (
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
                    // eslint-disable-next-line @next/next/no-img-element
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
        </TechnicianTable>

        <TechnicianPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
        />
      </div>
    </TechnicianPageLayout>
  );
}
