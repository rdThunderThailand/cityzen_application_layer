"use client";

import { TechnicianToolItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianTools } from "./mock";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  MoreVertical,
  PenTool,
  Wrench
} from "lucide-react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianTable } from "../components/shared/TechnicianTable";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
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
    <TechnicianPageLayout
      title="เครื่องมือของฉัน"
      description="จัดการและติดตามเครื่องมือที่ได้รับมอบหมาย"
    >

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CardMetric
          title="เครื่องมือทั้งหมด"
          value={stats.all}
          subtitle="รายการ"
          icon={Briefcase}
          classNameForIcon="bg-blue-50 text-blue-600"
          className="max-h-180 gap-2 p-5"
        />
        <CardMetric
          title="พร้อมใช้งาน"
          value={stats.ready}
          subtitle="รายการ"
          icon={CheckCircle2}
          classNameForIcon="bg-emerald-50 text-emerald-600"
          className="max-h-180 gap-2 p-5"
        />
        <CardMetric
          title="ถูกใช้งาน"
          value={stats.inUse}
          subtitle="รายการ"
          icon={Wrench}
          classNameForIcon="bg-amber-50 text-amber-500"
          className="max-h-180 gap-2 p-5"
        />
        <CardMetric
          title="ต้องตรวจสอบ"
          value={stats.inspect}
          subtitle="รายการ"
          icon={AlertCircle}
          classNameForIcon="bg-rose-50 text-rose-500"
          className="max-h-180 gap-2 p-5"
        />
        <CardMetric
          title="ครบกำหนดสอบเทียบ"
          value={stats.calibrationDue}
          subtitle="รายการ"
          icon={Calendar}
          classNameForIcon="bg-purple-50 text-purple-600"
          className="max-h-180 gap-2 p-5"
          action={
            <div className="w-full flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-900">รายการ</span>
              <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
                ดูทั้งหมด <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          }
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col mt-6">

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
        <TechnicianFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          searchPlaceholder="ค้นหาเครื่องมือ, รหัสครุภัณฑ์..."
          filters={[
            {
              label: "ประเภทเครื่องมือ",
              value: typeFilter,
              options: types,
              onChange: (val) => {
                setTypeFilter(val);
                setCurrentPage(1);
              },
              minWidth: "140px"
            },
            {
              label: "สถานะ",
              value: statusFilter,
              options: statuses,
              onChange: (val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              },
              minWidth: "120px"
            },
            {
              label: "ตำแหน่ง",
              value: locationFilter,
              options: locations,
              onChange: (val) => {
                setLocationFilter(val);
                setCurrentPage(1);
              },
              minWidth: "140px"
            }
          ]}
          onClearFilters={() => {
            setSearchQuery("");
            setTypeFilter("ประเภทเครื่องมือ");
            setStatusFilter("สถานะ");
            setLocationFilter("ตำแหน่ง");
          }}
          extraActions={
            <button className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-blue-600 font-bold text-[13px] hover:bg-slate-50 flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 shadow-sm">
              <Download className="w-4 h-4" /> ส่งออกข้อมูล
            </button>
          }
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <TechnicianTable
            minWidth="1200px"
            loading={loading}
            emptyMessage="ไม่พบข้อมูลที่ตรงกับตัวกรอง"
            columns={[
              { header: <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />, align: "center", width: "48px" },
              { header: "เครื่องมือ" },
              { header: "รหัสครุภัณฑ์" },
              { header: "ประเภท" },
              { header: "ยี่ห้อ / รุ่น" },
              { header: "หมายเลขซีเรียล" },
              { header: "สถานะ", align: "center" },
              { header: "ตำแหน่ง" },
              { header: "วันครบกำหนดสอบเทียบ", align: "center" },
              { header: "การดำเนินการ", align: "center" }
            ]}
          >
            {paginatedTools.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
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
          </TechnicianTable>
        </div>

        {/* Pagination */}
        <TechnicianPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          startIndex={startIndex}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />

      </div>

    </TechnicianPageLayout>
  );
}
