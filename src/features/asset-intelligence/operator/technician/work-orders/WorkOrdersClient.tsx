"use client";

import { TechnicianAllWOItem, TechnicianAllWOStats } from "@/features/asset-intelligence/operator/technician/types";
import { useMemo, useState } from "react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { WorkOrdersStats } from "./components/WorkOrdersStats";
import { WorkOrdersTable } from "./components/WorkOrdersTable";
import { Calendar, LayoutList, LayoutGrid, Download } from "lucide-react";

interface WorkOrdersClientProps {
  stats: TechnicianAllWOStats;
  initialWorkOrders: TechnicianAllWOItem[];
}

export function WorkOrdersClient({ stats, initialWorkOrders }: WorkOrdersClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ทั้งหมด");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [priorityFilter, setPriorityFilter] = useState("ทั้งหมด");
  const [assigneeFilter, setAssigneeFilter] = useState("ทั้งหมด");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering Logic
  const filteredWorkOrders = useMemo(() => {
    return initialWorkOrders.filter(wo => {
      // Type filter
      if (typeFilter !== "ทั้งหมด" && wo.taskType !== typeFilter) return false;

      // Status filter
      if (statusFilter !== "ทั้งหมด" && wo.status !== statusFilter) return false;

      // Priority filter
      if (priorityFilter !== "ทั้งหมด" && wo.priority !== priorityFilter) return false;

      // Assignee filter
      if (assigneeFilter !== "ทั้งหมด" && wo.assigneeName !== assigneeFilter) return false;

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          wo.woNumber.toLowerCase().includes(q) ||
          wo.assetName.toLowerCase().includes(q) ||
          wo.location.toLowerCase().includes(q) ||
          wo.reporterName.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [initialWorkOrders, searchQuery, typeFilter, statusFilter, priorityFilter, assigneeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredWorkOrders.length / itemsPerPage);
  const paginatedWorkOrders = filteredWorkOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedWorkOrders.map(t => t.id));
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
      title="ใบงานทั้งหมด"
      description="จัดการและติดตามสถานะใบงานทั้งหมดในระบบ"
    >
      <WorkOrdersStats stats={stats} />

      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col mt-6">
        <TechnicianFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          searchPlaceholder="ค้นหาเลขที่ใบงาน, ชื่อครุภัณฑ์, สถานที่, ผู้แจ้ง..."
          filters={[
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
              label: "สถานะ",
              value: statusFilter,
              options: ["ทั้งหมด", "รอดำเนินการ", "กำลังดำเนินการ", "รออะไหล่", "รออนุมัติ", "เกินกำหนด", "เสร็จสิ้น", "ยกเลิก"],
              onChange: (val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              },
              minWidth: "120px"
            },
            {
              label: "ผู้รับผิดชอบ",
              value: assigneeFilter,
              options: ["ทั้งหมด", "นายสมชาย (ฉัน)", "นายสมศักดิ์", "นายสมเกียรติ"],
              onChange: (val) => {
                setAssigneeFilter(val);
                setCurrentPage(1);
              },
              minWidth: "120px"
            }
          ]}
          onClearFilters={() => {
            setSearchQuery("");
            setTypeFilter("ทั้งหมด");
            setStatusFilter("ทั้งหมด");
            setPriorityFilter("ทั้งหมด");
            setAssigneeFilter("ทั้งหมด");
            setCurrentPage(1);
          }}
          extraActions={
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
          <WorkOrdersTable
            workOrders={paginatedWorkOrders}
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
          totalItems={filteredWorkOrders.length}
          startIndex={(currentPage - 1) * itemsPerPage}
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
