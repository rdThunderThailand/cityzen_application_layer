"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Search,
    ChevronRight,
    ChevronLeft,
    List,
    LayoutGrid,
    Map as MapIcon,
    Filter,
    MapPin,
    FileText,
    ListChecks,
    BellRing,
    Clock,
    CheckCircle2,
    CircleGauge,
    Circle,
} from "lucide-react";
import { cn } from "@/utils/cn";
import Tabs from "@/components/basic/Tabs";
import Dropdown from "@/components/basic/Dropdown";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { workOrders, priorityBadge, statusBadge, relatedDocs, summaryStats } from "./mock";

const WEEKDAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const THAI_MONTHS = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const PAGE_SIZE_OPTIONS = [
    { value: 6, label: "6 / หน้า" },
    { value: 12, label: "12 / หน้า" },
];

export default function WorkOrderClient() {
    const [view, setView] = useState<"list" | "grid" | "map">("list");
    const [activeTab, setActiveTab] = useState<string | number>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [today] = useState(() => new Date());
    const [calendarDate, setCalendarDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

    const counts = {
        all: 18,
        new: 5,
        progress: 8,
        review: 3,
    };

    const filtered = useMemo(() => {
        if (activeTab === "all") return workOrders;
        if (activeTab === "new") return workOrders.filter((w) => w.status === "งานใหม่");
        if (activeTab === "progress") return workOrders.filter((w) => w.status === "ระหว่างดำเนินการ");
        if (activeTab === "review") return workOrders.filter((w) => w.status === "รอตรวจสอบ");
        if (activeTab === "done") return workOrders.filter((w) => w.status === "เสร็จสิ้น");
        return workOrders;
    }, [activeTab]);

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, pageSize]);

    useEffect(() => {
        setCurrentPage((page) => Math.min(page, totalPages));
    }, [totalPages]);

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, currentPage, pageSize]);

    const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const rangeEnd = Math.min(currentPage * pageSize, totalItems);
    const pageNumbers = useMemo(
        () => Array.from({ length: totalPages }, (_, i) => i + 1),
        [totalPages]
    );

    const calendarYear = calendarDate.getFullYear();
    const calendarMonth = calendarDate.getMonth();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay();
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const isToday = (day: number) =>
        calendarYear === today.getFullYear() &&
        calendarMonth === today.getMonth() &&
        day === today.getDate();

    const goToPrevMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth - 1, 1));
    const goToNextMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth + 1, 1));

    return (
        <div className="h-full w-full overflow-hidden px-6 py-3 flex flex-col gap-3">
            <div className="shrink-0 mb-3">
                <Tabs
                    activeValue={activeTab}
                    onChange={setActiveTab}
                    tabs={[
                        { value: "all", title: "ทั้งหมด", count: counts.all },
                        { value: "new", title: "งานใหม่", count: counts.new },
                        { value: "progress", title: "งานระหว่างดำเนินการ", count: counts.progress },
                        { value: "review", title: "งานรอการตรวจสอบ", count: counts.review },
                        { value: "done", title: "งานเสร็จสิ้น" },
                    ]}
                />
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
                <div className="flex flex-col gap-4 min-h-0 h-full min-w-0">
                    {/* Search + sort */}
                    <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                placeholder="ค้นหางาน, เลขที่งาน, สถานที่..."
                                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <Dropdown
                            className="w-full sm:w-[240px]"
                            placeholder="จัดเรียง: วันที่สร้าง (ใหม่ → เก่า)"
                            options={[
                                { value: "new", label: "วันที่สร้าง (ใหม่ → เก่า)" },
                                { value: "old", label: "วันที่สร้าง (เก่า → ใหม่)" },
                                { value: "priority", label: "ความสำคัญ" },
                            ]}
                        />
                    </div>

                    {/* Filters */}
                    <div className="shrink-0 flex flex-wrap gap-3 justify-between">
                        <div className="flex flex-wrap gap-3">
                            <Dropdown className="w-[160px]" placeholder="ประเภทงาน" />
                            <Dropdown className="w-[160px]" placeholder="ระดับความสำคัญ" />
                            <Dropdown className="w-[160px]" placeholder="สถานะ" />
                            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <Filter className="w-4 h-4" /> ตัวกรองเพิ่มเติม
                            </button>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 shrink-0">
                            {([
                                { key: "list", icon: List },
                                { key: "grid", icon: LayoutGrid },
                                { key: "map", icon: MapIcon },
                            ] as const).map(({ key, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setView(key)}
                                    className={cn(
                                        "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
                                        view === key ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stat chips */}
                    <div className="shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "งานทั้งหมด", value: 18, icon: ListChecks, tone: "bg-blue-100 text-blue-600", className: "bg-blue-50" },
                            { label: "งานด่วน", value: 2, icon: BellRing, tone: "bg-rose-100 text-rose-600", className: "bg-rose-50" },
                            { label: "ใกล้ครบกำหนด SLA", value: 3, icon: Clock, tone: "bg-amber-100 text-amber-600", className: "bg-amber-50" },
                            { label: "รอตรวจสอบ", value: 3, icon: CheckCircle2, tone: "bg-violet-100 text-violet-600", className: "bg-violet-50" },
                        ].map((chip, i) => (
                            <CardMetric
                                key={i}
                                title={chip.label}
                                value={chip.value}
                                subtitle="รายการ"
                                icon={chip.icon}
                                classNameForIcon={chip.tone}
                                className={chip.className}
                            />
                        ))}
                    </div>

                    {/* List / grid / map + pagination */}
                    <div className="flex-1 min-h-0 flex flex-col bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                        <div className={cn("flex-1 min-h-0 overflow-y-auto overflow-x-hidden", view !== "list" && "p-3")}>
                            {view === "list" && (
                                <div className="flex flex-col divide-y divide-slate-100">
                                    {paginated.map((wo) => (
                                        <a key={wo.id} href="#" className="flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors">
                                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", wo.iconTone)}>
                                                <wo.icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 w-fit", priorityBadge[wo.priority])}>
                                                    {wo.priority}
                                                </p>
                                                <h1 className="text-sm font-semibold text-slate-800 truncate">{wo.title}</h1>

                                                <div className="flex flex-col text-xs text-slate-400 mt-1">
                                                    <div className="flex items-center gap-1">
                                                        <CircleGauge className="w-3 h-3" />
                                                        <p className="truncate">{wo.code}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <p className="truncate">{wo.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 shrink-0">
                                                <span className="text-xs text-slate-400 whitespace-nowrap">{wo.date}</span>
                                                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap", statusBadge[wo.status])}>
                                                    {wo.status}
                                                </span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                                        </a>
                                    ))}
                                    {paginated.length === 0 && (
                                        <div className="p-6 text-center text-sm text-slate-400">ไม่พบงานในหมวดนี้</div>
                                    )}
                                </div>
                            )}

                            {view === "grid" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {paginated.map((wo) => (
                                        <a key={wo.id} href="#" className="flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between">
                                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", wo.iconTone)}>
                                                    <wo.icon className="w-4.5 h-4.5" />
                                                </div>
                                                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold", priorityBadge[wo.priority])}>{wo.priority}</span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-800 line-clamp-2">{wo.title}</p>
                                            <p className="text-xs text-slate-400 truncate">{wo.code} • {wo.address}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs text-slate-400">{wo.date}</span>
                                                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold", statusBadge[wo.status])}>{wo.status}</span>
                                            </div>
                                        </a>
                                    ))}
                                    {paginated.length === 0 && (
                                        <div className="col-span-full p-6 text-center text-sm text-slate-400">ไม่พบงานในหมวดนี้</div>
                                    )}
                                </div>
                            )}

                            {view === "map" && (
                                <div className="w-full h-full min-h-[200px] rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center text-slate-400 text-sm">
                                    แผนที่ตำแหน่งงาน (ตัวอย่าง)
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="shrink-0 flex items-center justify-between flex-wrap gap-3 px-3 py-2.5 border-t border-slate-100">
                            <span className="text-xs text-slate-400">
                                {totalItems === 0
                                    ? "ไม่พบรายการ"
                                    : `แสดง ${rangeStart} - ${rangeEnd} จาก ${totalItems} รายการ`}
                            </span>
                            <div className="flex items-center gap-3">
                                <Dropdown
                                    className="w-[110px]"
                                    placeholder="10 / หน้า"
                                    selectedValue={pageSize}
                                    onChange={(value) => setPageSize(Number(value))}
                                    options={PAGE_SIZE_OPTIONS}
                                />
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    {pageNumbers.map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setCurrentPage(p)}
                                            className={cn(
                                                "w-8 h-8 flex items-center justify-center rounded-md text-sm",
                                                p === currentPage
                                                    ? "bg-blue-600 text-white font-semibold"
                                                    : "text-slate-500 hover:bg-slate-100"
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden">
                    {/* Mini calendar */}
                    <div className="shrink-0 flex flex-col gap-4 px-3 py-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">ปฏิทินงานของฉัน</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูทั้งหมด</a>
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="button" onClick={goToPrevMonth} className="text-slate-400 hover:text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                            <span className="text-xs font-semibold text-slate-700">{THAI_MONTHS[calendarMonth]} {calendarYear + 543}</span>
                            <button type="button" onClick={goToNextMonth} className="text-slate-400 hover:text-slate-600"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                        <div className="grid grid-cols-7 gap-y-1 text-center">
                            {WEEKDAYS.map((d) => (
                                <span key={d} className="text-[10px] text-slate-400">{d}</span>
                            ))}
                            {Array.from({ length: firstWeekday }).map((_, i) => <span key={`pad-${i}`} />)}
                            {monthDays.map((d) => (
                                <span
                                    key={d}
                                    className={cn(
                                        "text-xs w-5.5 h-5.5 mx-auto flex items-center justify-center rounded-full",
                                        isToday(d) && "bg-blue-600 text-white font-bold"
                                    )}
                                >
                                    {d}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-between gap-2 px-4">
                            <div className="flex items-center gap-1">
                                <Circle className="w-2 h-2 text-blue-500 bg-blue-600 rounded-full" />
                                <p className="text-xs">งานวันนี้</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Circle className="w-2 h-2 text-red-500 bg-red-600 rounded-full" />
                                <p className="text-xs">งานวันนี้</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Circle className="w-2 h-2 text-yellow-500 bg-yellow-500 rounded-full" />
                                <p className="text-xs">ใกล้ครบ SLA</p>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="shrink-0 flex flex-col gap-4 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">สรุปงานของฉัน</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูทั้งหมด</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            {summaryStats.map((s, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">{s.label}</span>
                                    <span className={cn("font-semibold", s.label.includes("SLA") ? "text-emerald-600" : "text-slate-800")}>{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="shrink-0 flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">ตำแหน่งงานภาคสนาม</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูแผน</a>
                        </div>
                        <div className="w-full h-24 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <button className="w-full py-1.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                            เปิดแผนที่ทั้งหมด
                        </button>
                    </div>

                    {/* Docs */}
                    <div className="flex-1 min-h-0 flex flex-col gap-3 px-3 py-4 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">เอกสารที่เกี่ยวข้อง</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูทั้งหมด</a>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-3">
                            {relatedDocs.map((doc, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-md bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-slate-700 truncate">{doc.title}</p>
                                        <p className="text-xs text-slate-400">PDF • {doc.size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}