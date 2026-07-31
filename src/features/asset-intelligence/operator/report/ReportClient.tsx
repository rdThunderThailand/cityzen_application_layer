"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Plus, MapPin, Image as ImageIcon, ListChecks, Clock, Loader2, CheckCircle2, AlertTriangle, Hash, UserCheck, RefreshCw, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import Tabs from "@/components/basic/Tabs";
import Dropdown from "@/components/basic/Dropdown";
import { CardMetric } from "@/components/dashboard/CardMetric";
import { reports, priorityBadge, statusBadge, activityHistory, type ReportItem } from "./mock";

const DETAIL_TABS = [
    { value: "detail", title: "รายละเอียด" },
    { value: "actions", title: "การดำเนินการ" },
    { value: "files", title: "ไฟล์แนบ" },
    { value: "contact", title: "ประวัติการติดต่อ" },
];

const PAGE_SIZE_OPTIONS = [
    { value: 5, label: "5 / หน้า" },
    { value: 10, label: "10 / หน้า" },
];

export default function ReportClient() {
    const [tab, setTab] = useState<string | number>("all");
    const [selected, setSelected] = useState<ReportItem>(reports[0]);
    const [detailTab, setDetailTab] = useState<string | number>("detail");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const counts = {
        all: reports.length,
        mine: 12,
        pending: reports.filter((r) => r.status === "รอดำเนินการ").length,
        progress: reports.filter((r) => r.status === "กำลังดำเนินการ").length,
        done: reports.filter((r) => r.status === "เสร็จสิ้น").length,
    };

    const totalItems = reports.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    useEffect(() => {
        setCurrentPage((page) => Math.min(page, totalPages));
    }, [totalPages]);

    const paginatedReports = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return reports.slice(start, start + pageSize);
    }, [currentPage, pageSize]);

    const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const rangeEnd = Math.min(currentPage * pageSize, totalItems);
    const pageNumbers = useMemo(
        () => Array.from({ length: totalPages }, (_, i) => i + 1),
        [totalPages]
    );

    return (
        <div className="h-full w-full overflow-hidden px-6 py-3 flex flex-col gap-3">
            <div className="shrink-0 flex items-center justify-between gap-10">
                <Tabs
                    activeValue={tab}
                    onChange={setTab}
                    tabs={[
                        { value: "all", title: "ทั้งหมด", count: counts.all },
                        { value: "mine", title: "ของฉัน", count: counts.mine },
                        { value: "pending", title: "รอดำเนินการ", count: counts.pending },
                        { value: "progress", title: "กำลังดำเนินการ", count: counts.progress },
                        { value: "done", title: "เสร็จสิ้น", count: counts.done },
                    ]}
                />
                <button className="flex items-center w-full max-w-[185px] gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" /> แจ้งเหตุ / สร้างคำขอ
                </button>
            </div>


            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        placeholder="ค้นหาเลขที่, เรื่อง, สถานที่..."
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <Dropdown className="w-full sm:w-[150px]" placeholder="ทั้งหมด" />
                <Dropdown className="w-full sm:w-[150px]" placeholder="ทั้งหมด" />
                <Dropdown className="w-full sm:w-[150px]" placeholder="ทั้งหมด" />
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg whitespace-nowrap">
                    ตัวกรองเพิ่มเติม
                </button>
            </div>

            <div className="shrink-0 grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                    { label: "ทั้งหมด", value: 28, icon: ListChecks, tone: "bg-blue-100 text-blue-600", className: "bg-blue-50" },
                    { label: "รอดำเนินการ", value: 10, icon: Clock, tone: "bg-amber-100 text-amber-600", className: "bg-amber-50" },
                    { label: "กำลังดำเนินการ", value: 6, icon: Loader2, tone: "bg-blue-100 text-blue-600", className: "bg-blue-50" },
                    { label: "เสร็จสิ้น", value: 20, icon: CheckCircle2, tone: "bg-emerald-100 text-emerald-600", className: "bg-emerald-50" },
                    { label: "เกินกำหนด", value: 3, icon: AlertTriangle, tone: "bg-rose-100 text-rose-600", className: "bg-rose-50" },
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

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-3">
                {/* List */}
                <div className="flex flex-col gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm h-full min-h-0 overflow-hidden">
                    <div className="shrink-0 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800">รายการแจ้งเหตุ / คำขอ</h3>
                        <Dropdown className="w-[110px]" placeholder="เรียงล่าสุด" />
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col divide-y divide-slate-100">
                        {paginatedReports.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => setSelected(r)}
                                className={cn(
                                    "flex items-start gap-3 py-3 text-left px-2 -mx-2 rounded-lg transition-colors",
                                    selected.id === r.id ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-slate-50"
                                )}
                            >
                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", r.iconTone)}>
                                    <r.icon className="w-4.5 h-4.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0", priorityBadge[r.priority])}>{r.priority}</span>
                                        <span className="text-sm font-semibold text-slate-800 truncate">{r.title}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{r.code}</p>
                                    <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                        <MapPin className="w-3 h-3 shrink-0" /> {r.address}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-[11px] text-slate-400 whitespace-nowrap">{r.time}</span>
                                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap", statusBadge[r.status])}>{r.status}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="shrink-0 flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100">
                        <span className="text-xs text-slate-400">
                            {totalItems === 0
                                ? "ไม่พบรายการ"
                                : `แสดง ${rangeStart} - ${rangeEnd} จาก ${totalItems} รายการ`}
                        </span>
                        <div className="flex items-center gap-2">
                            <Dropdown
                                className="w-[100px]"
                                placeholder="5 / หน้า"
                                selectedValue={pageSize}
                                onChange={(value) => {
                                    setPageSize(Number(value));
                                    setCurrentPage(1);
                                }}
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

                {/* Detail */}
                <div className="flex flex-col gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm h-full min-h-0 overflow-hidden">
                    <div className="shrink-0 flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-start gap-3 min-w-0">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", selected.iconTone)}>
                                <selected.icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold", priorityBadge[selected.priority])}>{selected.priority}</span>
                                <h3 className="text-base font-bold text-slate-800 mt-1">{selected.title}</h3>
                                <div className="flex items-center justify-between gap-3 mt-1 flex-wrap">
                                    <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                                        <MapPin className="w-3 h-3 shrink-0" /> {selected.address}
                                    </p>
                                    <p className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                                        <Hash className="w-3 h-3 shrink-0" /> {selected.code}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold shrink-0", statusBadge[selected.status])}>{selected.status}</span>
                    </div>

                    <div className="shrink-0">
                        <Tabs activeValue={detailTab} onChange={setDetailTab} tabs={DETAIL_TABS} />
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-4">

                    {detailTab === "detail" ? (
                        <div className="flex w-full gap-20">
                            {/* Field list */}
                            <div className="flex flex-col gap-4 text-sm min-w-0 w-full">
                                <div className="w-[18vw] flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <p className="text-xs text-slate-400">ประเภทคำร้อง</p>
                                        <p className="font-medium text-slate-500">{selected.type}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-slate-400">ความเร่งด่วน</p>
                                        <p className="font-medium text-rose-500">{selected.priority}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-slate-400">ผู้แจ้ง</p>
                                        <p className="font-medium text-slate-500">{selected.reporter}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-slate-400">ช่องทางการแจ้ง</p>
                                        <p className="font-medium text-slate-500">{selected.channel}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-slate-400">เบอร์ติดต่อ</p>
                                        <p className="font-medium text-slate-500">{selected.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">รายละเอียด</p>
                                    <p className="text-slate-600 leading-relaxed">{selected.description}</p>
                                </div>
                            </div>

                            {/* Map + photos */}
                            <div className="flex flex-col gap-2 w-full h-65">
                                <div className="flex flex-col gap-1 flex-1 min-h-0">
                                    <div className="flex items-center justify-between shrink-0">
                                        <span className="text-xs font-semibold text-slate-500">ตำแหน่งที่เกิดเหตุ</span>
                                        <a href="#" className="text-xs font-medium text-blue-600">ดูแผนที่เต็ม</a>
                                    </div>
                                    <div className="w-full flex-1 min-h-0 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 flex-1 min-h-0">
                                    <div className="flex items-center justify-between shrink-0">
                                        <span className="text-xs font-semibold text-slate-500">รูปภาพ ({selected.photos.length})</span>
                                        <a href="#" className="text-xs font-medium text-blue-600">ดูทั้งหมด</a>
                                    </div>
                                    {selected.photos.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0">
                                            {selected.photos.map((p, i) => (
                                                <div key={i} className="h-full rounded-lg overflow-hidden bg-slate-100">
                                                    <img src={p} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex-1 min-h-0 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300">
                                            <ImageIcon className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-slate-400 py-6 text-center">ยังไม่มีข้อมูลในส่วนนี้</div>
                    )}

                    <div className="flex flex-col gap-3 -mt-5">
                        <span className="text-xs font-semibold text-slate-500">ประวัติการดำเนินการ</span>
                        <div className="flex flex-col">
                            {activityHistory.map((a, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <span className={cn("w-2.5 h-2.5 rounded-full", a.tone)} />
                                        {i < activityHistory.length - 1 && <span className="w-px flex-1 bg-slate-200" />}
                                    </div>
                                    <div className="pb-4 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                                        <p className="text-xs text-slate-400">{a.by}</p>
                                        <p className="text-[11px] text-slate-300">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>

                    <div className="shrink-0 flex justify-between gap-3 pt-2 border-t border-slate-100">
                        <button className="flex w-full items-center justify-center gap-1.5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                            <UserCheck className="w-4 h-4" /> รับงานนี้
                        </button>
                        <button className="flex w-full items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                            <RefreshCw className="w-4 h-4" /> ติดตามความคืบหน้า
                        </button>
                        <button className="flex w-full items-center justify-center gap-1.5 py-2.5 rounded-lg border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition-colors">
                            <XCircle className="w-4 h-4" /> ยกเลิกรายการ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
