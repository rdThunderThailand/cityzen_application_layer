"use client";

import { TechnicianRequestItem } from "@/features/asset-intelligence/operator/technician/types";
import { getTechnicianRequests } from "./mock";
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Smartphone,
  User,
  Wrench,
  XCircle
} from "lucide-react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianTable } from "../components/shared/TechnicianTable";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Default chart data for the right sidebar
const CHART_DATA = [
  { name: 'ซ่อมแซม', value: 32, color: '#3b82f6', percent: '57%' },
  { name: 'บำรุงรักษา', value: 16, color: '#10b981', percent: '29%' },
  { name: 'ติดตั้ง', value: 6, color: '#f59e0b', percent: '11%' },
  { name: 'อื่นๆ', value: 2, color: '#6366f1', percent: '3%' },
];

export default function RequestsClient() {
  const [requests, setRequests] = useState<TechnicianRequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [typeFilter, setTypeFilter] = useState("ทั้งหมด");
  const [urgencyFilter, setUrgencyFilter] = useState("ทั้งหมด");
  const [locationFilter, setLocationFilter] = useState("ทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // In a real app, you would pass the supabase client. 
    // Here we just mock it for demonstration.
    getTechnicianRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  // Unique values for dropdowns based on data
  const locations = ["ทั้งหมด", ...Array.from(new Set(requests.map(r => r.location)))];
  const types = ["ทั้งหมด", "ซ่อมแซม", "บำรุงรักษา", "ติดตั้ง", "อื่นๆ"];
  const urgencies = ["ทั้งหมด", "สูง", "ปานกลาง", "ต่ำ"];
  const statuses = ["ทั้งหมด", "รอดำเนินการ", "กำลังดำเนินการ", "เสร็จสิ้น", "ยกเลิก"];

  const filteredRequests = requests.filter(req => {
    // 1. Status Filter
    if (statusFilter !== "ทั้งหมด" && req.status !== statusFilter) return false;
    // 2. Type Filter
    if (typeFilter !== "ทั้งหมด" && req.type !== typeFilter) return false;
    // 3. Urgency Filter
    if (urgencyFilter !== "ทั้งหมด" && req.urgency !== urgencyFilter) return false;
    // 4. Location Filter
    if (locationFilter !== "ทั้งหมด" && req.location !== locationFilter) return false;

    // 5. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!req.id.toLowerCase().includes(q) &&
        !req.asset.toLowerCase().includes(q) &&
        !req.location.toLowerCase().includes(q) &&
        !req.reporter.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  // Pagination Logic
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats for top cards
  const stats = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'รอดำเนินการ').length,
    inProgress: requests.filter(r => r.status === 'กำลังดำเนินการ').length,
    completed: requests.filter(r => r.status === 'เสร็จสิ้น').length,
    cancelled: requests.filter(r => r.status === 'ยกเลิก').length,
  };

  return (
    <TechnicianPageLayout
      title="แจ้งซ่อม / คำขอ"
      description="จัดการคำขอแจ้งซ่อมและติดตามสถานะการดำเนินการ"
      headerActions={
        <button className="px-6 py-2.5 rounded-[12px] bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          สร้างแจ้งซ่อม / คำขอ
        </button>
      }
    >

      {/* Main Layout Grid */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 mt-4">

        {/* Left Column: Metrics + Filter Bar + Data Table */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <CardMetric
              title="ทั้งหมด"
              value={stats.all}
              subtitle="รายการ"
              icon={FileText}
              classNameForIcon="bg-blue-50 text-blue-600"
              className="max-h-180 gap-2 p-5"
              action={
                <div className="w-full">
                  <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors">
                    ดูทั้งหมด <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              }
            />
            <CardMetric
              title="รอดำเนินการ"
              value={stats.pending}
              subtitle="รายการ"
              icon={Clock}
              classNameForIcon="bg-orange-50 text-orange-500"
              className="max-h-180 gap-2 p-5"
            />
            <CardMetric
              title="กำลังดำเนินการ"
              value={stats.inProgress}
              subtitle="รายการ"
              icon={Wrench}
              classNameForIcon="bg-purple-50 text-purple-600"
              className="max-h-180 gap-2 p-5"
            />
            <CardMetric
              title="เสร็จสิ้น"
              value={stats.completed}
              subtitle="รายการ"
              icon={CheckCircle2}
              classNameForIcon="bg-emerald-50 text-emerald-600"
              className="max-h-180 gap-2 p-5"
            />
            <CardMetric
              title="ยกเลิก"
              value={stats.cancelled}
              subtitle="รายการ"
              icon={XCircle}
              classNameForIcon="bg-rose-50 text-rose-500"
              className="max-h-180 gap-2 p-5"
            />
          </div>

          {/* Filter Bar + Data Table (same card, same width) */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-2">
          <TechnicianFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="ค้นหาเลขที่แจ้งซ่อม, ครุภัณฑ์, สถานที่, ผู้แจ้ง..."
            filters={[
              {
                label: "สถานะ",
                value: statusFilter,
                options: statuses,
                onChange: setStatusFilter,
                minWidth: "120px"
              },
              {
                label: "ประเภทคำขอ",
                value: typeFilter,
                options: types,
                onChange: setTypeFilter,
                minWidth: "120px"
              },
              {
                label: "ความเร่งด่วน",
                value: urgencyFilter,
                options: urgencies,
                onChange: setUrgencyFilter,
                minWidth: "120px"
              },
              {
                label: "สถานที่",
                value: locationFilter,
                options: locations,
                onChange: setLocationFilter,
                minWidth: "120px"
              }
            ]}
            extraActions={
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white shrink-0">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-[12px] font-bold text-slate-700">01/05/2567 - 20/05/2567</span>
                <Calendar className="w-4 h-4 text-slate-400 ml-2" />
              </div>
            }
            onClearFilters={() => {
              setSearchQuery("");
              setStatusFilter("ทั้งหมด");
              setTypeFilter("ทั้งหมด");
              setUrgencyFilter("ทั้งหมด");
              setLocationFilter("ทั้งหมด");
            }}
          />

          <TechnicianTable
            minWidth="1000px"
            loading={loading}
            empty={!loading && paginatedRequests.length === 0}
            emptyMessage="ไม่พบข้อมูลที่ตรงกับตัวกรอง"
            columns={[
              { header: <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />, align: "center", width: "48px" },
              { header: "เลขที่แจ้งซ่อม" },
              { header: "ครุภัณฑ์ / รายการ" },
              { header: "สถานที่" },
              { header: "ผู้แจ้ง" },
              { header: "ความเร่งด่วน", align: "center" },
              { header: "สถานะ", align: "center" },
              { header: "วันที่แจ้ง" },
              { header: "กำหนดเสร็จ" },
              { header: "การดำเนินการ", align: "center" }
            ]}
          >
            {paginatedRequests.map((req, idx) => (
              <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${req.iconBg}`}>
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[12px] font-black text-slate-800">{req.id}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {req.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={req.image} alt={req.asset} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                        <Wrench className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                    <span className="text-[13px] font-bold text-slate-900 line-clamp-2">{req.asset}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[13px] font-medium text-slate-600">{req.location}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-700">{req.reporter}</span>
                    <span className="text-[11px] font-medium text-slate-500">เจ้าหน้าที่</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black inline-block ${req.urgency === 'สูง' ? 'text-rose-600 border border-rose-200 bg-white' :
                    req.urgency === 'ปานกลาง' ? 'text-orange-600 border border-orange-200 bg-white' :
                      'text-emerald-600 border border-emerald-200 bg-white'
                    }`}>
                    {req.urgency}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black inline-block ${req.status === 'รอดำเนินการ' ? 'bg-orange-50 text-orange-600' :
                    req.status === 'กำลังดำเนินการ' ? 'bg-purple-50 text-purple-600' :
                      req.status === 'เสร็จสิ้น' ? 'bg-emerald-50 text-emerald-600' :
                        req.status === 'ยกเลิก' ? 'bg-rose-50 text-rose-600' :
                          'bg-slate-100 text-slate-500'
                    }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-700">{req.dateTop}</span>
                    <span className="text-[11px] font-medium text-slate-500">{req.dateBottom}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-700">{req.dueTop}</span>
                    <span className="text-[11px] font-medium text-slate-500">{req.dueBottom}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors whitespace-nowrap">
                      ดูรายละเอียด
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TechnicianTable>

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
        </div>

        {/* Right Column: Widgets */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">

          {/* Latest Request Card */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-black text-slate-900">คำขอล่าสุด</h3>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                ดูทั้งหมด <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-black text-slate-900">RQ-6705-0056</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600">
                  รอดำเนินการ
                </span>
              </div>
              <span className="text-[13px] font-bold text-slate-700 leading-snug">
                เครื่องปรับอากาศ แบบแขวน<br />
                <span className="text-[12px] font-medium text-slate-500">อาคารสำนักงาน ชั้น 2</span>
              </span>

              <div className="flex flex-col gap-1 mt-1 bg-slate-50 rounded-lg p-3">
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  แจ้งโดย: น.ส. กานต์พิชชา
                </span>
                <span className="text-[11px] font-bold text-slate-600 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  20 พ.ค. 2567 09:15 น.
                </span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-slate-200 text-blue-600 font-bold text-[12px] hover:bg-blue-50 transition-colors mt-1 shadow-sm">
              ดูรายละเอียด
            </button>
          </div>

          {/* Reporting Channels */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="text-[14px] font-black text-slate-900">ช่องทางการแจ้ง</h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">แอปพลิเคชัน</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">28</span>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">โทรศัพท์</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">16</span>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">Walk-in</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">8</span>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">อีเมล</span>
                </div>
                <span className="text-[14px] font-black text-slate-900">4</span>
              </div>
            </div>
            
          </div>

          {/* Statistics Chart */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-2">
            <h3 className="text-[14px] font-black text-slate-900">สถิติการแจ้งตามประเภท</h3>
            <span className="text-[11px] font-bold text-slate-400 mb-2">(30 วันล่าสุด)</span>

            <div className="flex items-center gap-3">
              <div className="w-[110px] h-[110px] shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHART_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-2.5 flex-1 pt-1">
                {CHART_DATA.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[11px] font-bold text-slate-700 line-clamp-1">{item.name}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 pl-4.5">{item.value} ({item.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Average Response Time */}
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-5 flex flex-col gap-1">
            <h3 className="text-[14px] font-black text-slate-900">เวลาตอบสนองเฉลี่ย</h3>
            <span className="text-[11px] font-bold text-slate-400 mb-2">(30 วันล่าสุด)</span>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[36px] font-black text-[#1e293b] leading-none tracking-tight">2.45</span>
              <span className="text-[14px] font-bold text-slate-600">ชม.</span>
            </div>

            <div className="flex items-center gap-1 mt-2 px-3 py-1.5 bg-emerald-50 rounded-lg w-fit">
              <ArrowDown className="w-4 h-4 text-emerald-600" />
              <span className="text-[12px] font-bold text-emerald-700">ลดลง 12%</span>
              <span className="text-[11px] font-medium text-emerald-600/70 ml-1">จากเดือนก่อนหน้า</span>
            </div>
          </div>

        </div>

      </div>

    </TechnicianPageLayout>
  );
}
