"use client";

import { TechnicianMyTaskItem, TechnicianMyTaskStats } from "@/features/asset-intelligence/operator/technician/types";
import { useMemo, useState } from "react";
import { MyTasksHeader } from "./components/MyTasksHeader";
import { MyTasksStats } from "./components/MyTasksStats";
import { MyTasksTable } from "./components/MyTasksTable";
import { MyTasksToolbar } from "./components/MyTasksToolbar";

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
    <div className="min-h-full flex-1 bg-slate-50 w-full p-6 pb-40 space-y-6">
      <MyTasksHeader />
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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <MyTasksToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
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

      {/* Info Footer */}
      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-blue-600 font-bold text-[10px]">i</span>
        </div>
        <p className="text-[12px] text-blue-800">
          <span className="font-bold">หมายเหตุ:</span> งานที่แสดงเป็นงานที่เกี่ยวข้องกับคุณ คุณสามารถดูงานทั้งหมดได้ที่เมนู "ใบงานทั้งหมด"
        </p>
      </div>
    </div>
  );
}
