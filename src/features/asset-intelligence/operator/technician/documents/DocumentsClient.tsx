"use client";

import { TechnicianDocumentItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianDocuments } from "./mock";
import {
  Book,
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
  MoreVertical,
  Plus,
  Search
} from "lucide-react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { TechnicianMetricCard } from "../components/shared/TechnicianMetricCard";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianTable } from "../components/shared/TechnicianTable";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
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
    <TechnicianPageLayout
      title="เอกสารและคู่มือ"
      description="จัดเก็บและเข้าถึงเอกสาร คู่มือ และไฟล์อ้างอิงของอุปกรณ์และระบบต่างๆ"
      breadcrumbs={[{ label: "หน้าหลัก", href: "#" }, { label: "เอกสารและคู่มือ" }]}
      headerActions={
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
      }
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TechnicianMetricCard
          title="เอกสารทั้งหมด"
          value="256"
          subtitle="รายการ"
          icon={<FileText className="w-6 h-6" />}
          actionLabel="ดูทั้งหมด"
          onActionClick={() => {}}
        />
        <TechnicianMetricCard
          title="คู่มือการใช้งาน"
          value="128"
          subtitle="รายการ"
          icon={<Book className="w-6 h-6" />}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          actionLabel="ดูทั้งหมด"
          onActionClick={() => {}}
        />
        <TechnicianMetricCard
          title="คู่มือซ่อมบำรุง"
          value="64"
          subtitle="รายการ"
          icon={<FileCheck className="w-6 h-6" />}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
          actionLabel="ดูทั้งหมด"
          onActionClick={() => {}}
        />
        <TechnicianMetricCard
          title="เอกสารมาตรฐาน (SOP)"
          value="32"
          subtitle="รายการ"
          icon={<ClipboardList className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
          actionLabel="ดูทั้งหมด"
          onActionClick={() => {}}
        />
        <TechnicianMetricCard
          title="ไฟล์ดาวน์โหลดบ่อย"
          value="89"
          subtitle="ครั้ง (เดือนนี้)"
          icon={<CloudDownload className="w-6 h-6" />}
          iconBgColor="bg-white border border-[#e5edff] shadow-sm"
          iconColor="text-blue-600"
          className="bg-[#f8faff] border-[#e5edff]"
          actionLabel="ดูสถิติ"
          onActionClick={() => {}}
        />
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Column (Table Area) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            
            <TechnicianFilterBar
              searchQuery={searchQuery}
              searchPlaceholder="ค้นหาเอกสาร, คู่มือ, คำสำคัญ..."
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
                },
                {
                  label: "ประเภทเอกสาร",
                  value: typeFilter,
                  options: fileTypes,
                  onChange: (val) => {
                    setTypeFilter(val);
                    setCurrentPage(1);
                  },
                  minWidth: "120px",
                },
                {
                  label: "อุปกรณ์ / ระบบ",
                  value: equipmentFilter,
                  options: equipments,
                  onChange: (val) => {
                    setEquipmentFilter(val);
                    setCurrentPage(1);
                  },
                }
              ]}
            />

            <TechnicianTable
              minWidth="1000px"
              loading={loading}
              empty={!loading && filteredDocs.length === 0}
              emptyText="ไม่พบเอกสารที่ตรงกับตัวกรอง"
              columns={[
                { header: "ชื่อเอกสาร" },
                { header: "หมวดหมู่" },
                { header: "อุปกรณ์ / ระบบ" },
                { header: "ประเภทไฟล์" },
                { header: "อัปเดตล่าสุด" },
                { header: "ขนาดไฟล์" },
                { header: "การดำเนินการ", align: "center" },
              ]}
            >
              {paginatedDocs.map((item, idx) => (
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
    </TechnicianPageLayout>
  );
}
