"use client";

import { TechnicianAllWOItem, TechnicianAllWOStats } from "@/features/asset-intelligence/operator/technician/types";
import { useMemo, useState } from "react";
import { WorkOrdersHeader } from "./components/WorkOrdersHeader";
import { WorkOrdersStats } from "./components/WorkOrdersStats";
import { WorkOrdersTable } from "./components/WorkOrdersTable";
import { WorkOrdersToolbar } from "./components/WorkOrdersToolbar";

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
    <div className="min-h-full flex-1 bg-slate-50 w-full p-6 pb-40 space-y-6">
      <WorkOrdersHeader />
      <WorkOrdersStats stats={stats} />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <WorkOrdersToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          assigneeFilter={assigneeFilter}
          onAssigneeFilterChange={setAssigneeFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
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
        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-600">แสดง</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 px-2 py-1 outline-none focus:border-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-[12px] font-bold text-slate-600">รายการ</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 transition-colors"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-[13px] transition-colors ${currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 transition-colors"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
