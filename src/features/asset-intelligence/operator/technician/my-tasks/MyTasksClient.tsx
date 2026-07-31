"use client";

import { TechnicianMyTaskItem, TechnicianMyTaskStats } from "@/features/asset-intelligence/operator/technician/types";
import { useMemo, useState } from "react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { MyTasksStats } from "./components/MyTasksStats";
import { MyTasksTable } from "./components/MyTasksTable";
import { Sun, Calendar, LayoutList, LayoutGrid, Download } from "lucide-react";

interface MyTasksClientProps {
  stats: TechnicianMyTaskStats;
  initialTasks: TechnicianMyTaskItem[];
}

export function MyTasksClient({ stats, initialTasks }: MyTasksClientProps) {
  const [activeTab, setActiveTab] = useState("รายการงาน");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [typeFilter, setTypeFilter] = useState("ทั้งหมด");
  const [priorityFilter, setPriorityFilter] = useState("ทั้งหมด");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering Logic
  const filteredTasks = useMemo(() => {
    return initialTasks.filter(task => {
      // Basic mock tab filtering (in reality, "งานที่ฉันสร้าง" would filter by reporter, etc.)
      if (activeTab === "งานที่ฉันสร้าง" && task.reporterName !== "นายสมชาย") return false;
      if (activeTab === "งานยกเลิก" && task.status !== "ยกเลิก") return false;
      if (activeTab === "งานที่มอบหมายให้ฉัน" && task.status === "ยกเลิก") return false;

      // Status filter
      if (statusFilter !== "ทั้งหมด" && task.status !== statusFilter) return false;

      // Type filter
      if (typeFilter !== "ทั้งหมด" && task.taskType !== typeFilter) return false;

      // Priority filter
      if (priorityFilter !== "ทั้งหมด" && task.priority !== priorityFilter) return false;

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          task.woNumber.toLowerCase().includes(q) ||
          task.assetName.toLowerCase().includes(q) ||
          task.location.toLowerCase().includes(q) ||
          task.reporterName.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [initialTasks, activeTab, searchQuery, statusFilter, typeFilter, priorityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedTasks.map(t => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <TechnicianPageLayout
      title="งานของฉัน"
      description="ติดตามและจัดการงานที่ได้รับมอบหมาย"
      headerActions={
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800">
            20 พฤษภาคม 2567 <Sun className="w-4 h-4 text-amber-500 ml-1" />
          </div>
          <div className="text-[11px] font-bold text-slate-500 mt-0.5">09:30 น.</div>
        </div>
      }
    >
      <MyTasksStats stats={stats} />

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mt-8 mb-2">
        {["รายการงาน", "งานที่มอบหมายให้ฉัน", "งานที่ฉันสร้าง", "งานยกเลิก"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-[13px] font-bold border-b-2 transition-colors -mb-[1px] ${activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <TechnicianFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          searchPlaceholder="ค้นหาเลขที่ใบงาน, ชื่อครุภัณฑ์, สถานที่, ผู้แจ้ง..."
          filters={[
            {
              label: "สถานะ",
              value: statusFilter,
              options: ["ทั้งหมด", "รอดำเนินการ", "กำลังดำเนินการ", "รออะไหล่", "รออนุมัติ", "เกินกำหนด", "เสร็จสิ้น"],
              onChange: (val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              },
              minWidth: "120px"
            },
            {
              label: "ประเภทงาน",
              value: typeFilter,
              options: ["ทั้งหมด", "แจ้งซ่อม", "บำรุงรักษา (PM)", "ตรวจสอบ"],
              onChange: (val) => {
                setTypeFilter(val);
                setCurrentPage(1);
              },
              minWidth: "120px"
            },
            {
              label: "ลำดับความสำคัญ",
              value: priorityFilter,
              options: ["ทั้งหมด", "ต่ำ", "ปานกลาง", "สูง"],
              onChange: (val) => {
                setPriorityFilter(val);
                setCurrentPage(1);
              },
              minWidth: "120px"
            }
          ]}
          onClearFilters={() => {
            setSearchQuery("");
            setStatusFilter("ทั้งหมด");
            setTypeFilter("ทั้งหมด");
            setPriorityFilter("ทั้งหมด");
            setCurrentPage(1);
          }}
          actionButton={
            <div className="flex items-center gap-3 shrink-0 flex-wrap mt-[18px]">
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-[12px] font-bold text-slate-700">20/05/2567 - 20/05/2567</span>
                <Calendar className="w-4 h-4 text-slate-400 ml-2" />
              </div>

              <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-white">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200">
                <Download className="w-4 h-4" />
                <span className="text-[12px] font-bold">ส่งออก (Excel)</span>
              </button>
            </div>
          }
        />

        {viewMode === "list" ? (
          <MyTasksTable
            tasks={paginatedTasks}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
          />
        ) : (
          <div className="p-12 text-center text-slate-400 font-bold">
            Grid view is currently disabled
          </div>
        )}

        {/* Footer & Pagination */}
        <TechnicianPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTasks.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Info Footer */}
      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start gap-3 mt-6">
        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-blue-600 font-bold text-[10px]">i</span>
        </div>
        <p className="text-[12px] text-blue-800">
          <span className="font-bold">หมายเหตุ:</span> งานที่แสดงเป็นงานที่เกี่ยวข้องกับคุณ คุณสามารถดูงานทั้งหมดได้ที่เมนู &quot;ใบงานทั้งหมด&quot;
        </p>
      </div>
    </TechnicianPageLayout>
  );
}
