import React from "react";

interface TableColumn {
  header: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface TechnicianTableProps {
  columns: TableColumn[];
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  empty?: boolean;
  emptyText?: string;
  emptyMessage?: string;
  minWidth?: string;
}

export function TechnicianTable({
  columns,
  children,
  loading = false,
  loadingText = "กำลังโหลดข้อมูล...",
  empty = false,
  emptyText = "ไม่พบข้อมูล",
  emptyMessage,
  minWidth = "1000px",
}: TechnicianTableProps) {
  const displayEmptyText = emptyMessage || emptyText;

  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ minWidth }}>
        <thead>
          <tr className="bg-white border-b border-slate-100">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-4 text-[12px] font-bold text-slate-500 whitespace-nowrap ${
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                } ${idx === 0 ? 'pl-6' : ''} ${idx === columns.length - 1 ? 'pr-6' : ''}`}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                {loadingText}
              </td>
            </tr>
          ) : empty ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-[14px] font-bold text-slate-400">
                {displayEmptyText}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
