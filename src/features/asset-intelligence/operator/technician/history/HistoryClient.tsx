"use client";

import { TechnicianHistoryItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianHistory } from "./mock";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  MoreVertical,
  Star,
  Wrench,
  XCircle
} from "lucide-react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianTable } from "../components/shared/TechnicianTable";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
import { useEffect, useState } from "react";

export default function HistoryClient() {
  const [historyItems, setHistoryItems] = useState<TechnicianHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [jobTypeFilter, setJobTypeFilter] = useState("ทั้งหมด");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // In a real app, you would pass the supabase client. 
    getTechnicianHistory().then((data) => {
      setHistoryItems(data);
      setLoading(false);
    });
  }, []);

  // Unique values for dropdowns based on data
  const statuses = ["ทั้งหมด", "เสร็จสิ้น", "กำลังดำเนินการ", "ยกเลิก"];
  const jobTypes = ["ทั้งหมด", ...Array.from(new Set(historyItems.map(h => h.jobType)))];

  const filteredHistory = historyItems.filter(item => {
    // 1. Dropdown Filters
    if (statusFilter !== "ทั้งหมด" && item.status !== statusFilter) return false;
    if (jobTypeFilter !== "ทั้งหมด" && item.jobType !== jobTypeFilter) return false;

    // 2. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.workOrderId.toLowerCase().includes(q) &&
        !item.equipmentName.toLowerCase().includes(q) &&
        !item.location.toLowerCase().includes(q) &&
        !item.operatorName.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredHistory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating: number) => {
    if (rating === 0) return <span className="text-[12px] font-medium text-slate-400">-</span>;
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
            />
          ))}
        </div>
        <span className="text-[12px] font-bold text-slate-700">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <TechnicianPageLayout
      title="ประวัติการซ่อม"
      description="ดูประวัติการซ่อมบำรุงทั้งหมดของอุปกรณ์และระบบ"
      breadcrumbs={[{ label: "หน้าหลัก", href: "#" }, { label: "ประวัติการซ่อม" }]}
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CardMetric
          title="ใบงานที่ซ่อมเสร็จแล้ว"
          value="128"
          subtitle="ใบงาน"
          icon={FileText}
          classNameForIcon="bg-blue-50 text-blue-600"
          className="max-h-180 gap-2 p-5"
          subValue={12}
          subUnit="%"
          status="เดือนที่ 28 ใบงาน"
        />
        <CardMetric
          title="ซ่อมสำเร็จ"
          value="122"
          subtitle="ใบงาน"
          icon={CheckCircle2}
          classNameForIcon="bg-emerald-50 text-emerald-600"
          className="max-h-180 gap-2 p-5"
          subValue={10}
          subUnit="%"
          status="เดือนที่ 26 ใบงาน"
        />
        <CardMetric
          title="กำลังดำเนินการ"
          value="6"
          subtitle="ใบงาน"
          icon={Clock}
          classNameForIcon="bg-orange-50 text-orange-500"
          className="max-h-180 gap-2 p-5"
          subValue={-20}
          subUnit="%"
          status="เดือนที่ 2 ใบงาน"
        />
        <CardMetric
          title="เฉลี่ยเวลาซ่อม"
          value="2.45"
          subtitle="ชั่วโมง"
          icon={Calendar}
          classNameForIcon="bg-purple-50 text-purple-600"
          className="max-h-180 gap-2 p-5"
          subValue={8}
          subUnit="%"
          status="เดือนที่"
        />
        <CardMetric
          title="ความพึงพอใจเฉลี่ย"
          value="4.6 / 5"
          subtitle="จาก 32 รีวิว"
          icon={Star}
          classNameForIcon="bg-amber-50 text-amber-500"
          className="max-h-180 gap-2 p-5"
          subValue={9}
          subUnit="%"
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm flex flex-col mt-6">
        <TechnicianFilterBar
          searchQuery={searchQuery}
          searchPlaceholder="ค้นหาใบงาน, อุปกรณ์, สถานที่..."
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          filters={[
            {
              label: "สถานะ:",
              value: statusFilter,
              options: statuses,
              onChange: (val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              },
            },
            {
              label: "ประเภทงาน:",
              value: jobTypeFilter,
              options: jobTypes,
              onChange: (val) => {
                setJobTypeFilter(val);
                setCurrentPage(1);
              },
            }
          ]}
          onClearFilters={() => {
            setSearchQuery("");
            setStatusFilter("ทั้งหมด");
            setJobTypeFilter("ทั้งหมด");
            setCurrentPage(1);
          }}
          extraActions={
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 ml-1">ช่วงวันที่:</span>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  type="text"
                  value="01/05/2567 - 20/05/2567"
                  readOnly
                  className="pl-9 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 focus:outline-none min-w-[220px] cursor-pointer"
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          }
        />

        <TechnicianTable
          minWidth="1400px"
          loading={loading}
          empty={!loading && filteredHistory.length === 0}
          emptyText="ไม่พบข้อมูลที่ตรงกับตัวกรอง"
          columns={[
            { header: "เลขที่ใบงาน" },
            { header: "อุปกรณ์ / ระบบ" },
            { header: "สถานที่" },
            { header: "ประเภทงาน" },
            { header: "วันที่เริ่มงาน" },
            { header: "วันที่เสร็จงาน" },
            { header: "ผู้ดำเนินการ" },
            { header: "สถานะ", align: "center" },
            { header: "ค่าใช้จ่ายรวม (บาท)", align: "right" },
            { header: "คะแนนความพึงพอใจ", align: "center" },
            { header: "การดำเนินการ", align: "center" },
          ]}
        >
          {paginatedHistory.map((item, idx) => (
            <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {item.status === 'เสร็จสิ้น' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : item.status === 'กำลังดำเนินการ' ? (
                    <Clock className="w-4 h-4 text-amber-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )}
                  <span className="text-[12px] font-bold text-blue-600">{item.workOrderId}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.equipmentName} className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                      <Wrench className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#1e293b]">{item.equipmentName}</span>
                    <span className="text-[11px] font-medium text-slate-500">{item.equipmentSubtext}</span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#1e293b]">{item.location}</span>
                  <span className="text-[11px] font-medium text-slate-500">{item.locationSubtext}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-[12px] font-medium text-slate-700">{item.jobType}</span>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#1e293b]">{item.startDate}</span>
                  <span className="text-[11px] font-medium text-slate-500">{item.startTime}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                {item.endDate !== '-' ? (
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#1e293b]">{item.endDate}</span>
                    <span className="text-[11px] font-medium text-slate-500">{item.endTime}</span>
                  </div>
                ) : (
                  <span className="text-[12px] font-medium text-slate-400">-</span>
                )}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  {item.operatorAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.operatorAvatar} alt={item.operatorName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#1e293b]">{item.operatorName}</span>
                    <span className="text-[10px] font-medium text-slate-500">{item.operatorRole}</span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[11px] font-black inline-block ${item.status === 'เสร็จสิ้น' ? 'bg-[#ecfdf5] text-emerald-600' :
                    item.status === 'กำลังดำเนินการ' ? 'bg-[#fffbeb] text-amber-500' :
                      'bg-[#fef2f2] text-rose-500'
                  }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-4 text-right">
                {item.cost > 0 ? (
                  <span className="text-[12px] font-medium text-slate-700">
                    {item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                ) : (
                  <span className="text-[12px] font-medium text-slate-400">-</span>
                )}
              </td>
              <td className="px-4 py-4 flex items-center justify-center">
                {renderStars(item.rating)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button className="px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors whitespace-nowrap bg-white shadow-sm">
                    ดูรายละเอียด
                  </button>
                  <button className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors">
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
