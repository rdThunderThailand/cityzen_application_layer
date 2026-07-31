"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Upload,
    FolderPlus,
    Search,
    Filter,
    List,
    LayoutGrid,
    Star,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/utils/cn";
import Tabs from "@/components/basic/Tabs";
import Dropdown from "@/components/basic/Dropdown";
import { CardData } from "@/components/dashboard/CardData";
import { rows, fileIcon, storageBreakdown, quickAccess, recentActivity } from "./mock";

const PAGE_SIZE_OPTIONS = [
    { value: 8, label: "8 / หน้า" },
    { value: 16, label: "16 / หน้า" },
];

export default function FileClient() {
    const [view, setView] = useState<"list" | "grid">("list");
    const [tab, setTab] = useState<string | number>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const totalUsed = storageBreakdown.reduce((s, b) => s + b.value, 0);
    const gradientStops = (() => {
        let acc = 0;
        return storageBreakdown.map((b) => {
            const start = (acc / 100) * 360;
            acc += (b.value / totalUsed) * 100;
            const end = (acc / 100) * 360;
            return { ...b, start, end };
        });
    })();
    const conic = gradientStops
        .map((s) => `var(--${s.label}, ${colorVar(s.tone)}) ${s.start}deg ${s.end}deg`)
        .join(", ");

    function colorVar(tone: string) {
        if (tone.includes("blue")) return "#3B82F6";
        if (tone.includes("emerald")) return "#10B981";
        if (tone.includes("violet")) return "#8B5CF6";
        return "#CBD5E1";
    }

    const totalItems = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    useEffect(() => {
        setCurrentPage(1);
    }, [tab, pageSize]);

    useEffect(() => {
        setCurrentPage((page) => Math.min(page, totalPages));
    }, [totalPages]);

    const paginatedRows = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return rows.slice(start, start + pageSize);
    }, [currentPage, pageSize]);

    const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const rangeEnd = Math.min(currentPage * pageSize, totalItems);
    const pageNumbers = useMemo(
        () => Array.from({ length: totalPages }, (_, i) => i + 1),
        [totalPages]
    );

    return (
        <div className="h-full w-full overflow-hidden px-6 py-3 flex flex-col gap-3">

            <div className="shrink-0">
                <Tabs
                    activeValue={tab}
                    onChange={setTab}
                    tabs={[
                        { value: "all", title: "ทั้งหมด" },
                        { value: "docs", title: "เอกสาร" },
                        { value: "images", title: "รูปภาพ" },
                        { value: "video", title: "วิดีโอ" },
                        { value: "shared", title: "ไฟล์ที่แชร์กับฉัน" },
                        { value: "starred", title: "รายการโปรด" },
                        { value: "trash", title: "ถังขยะ" },
                    ]}
                />
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-3">
                <div className="flex flex-col gap-3 min-h-0 h-full min-w-0 w-[60vw]">
                    {/* toolbar */}
                    <div className="shrink-0 flex items-center gap-3 flex-wrap">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4" /> สร้างใหม่ <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50">
                            <Upload className="w-4 h-4" /> อัปโหลด
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50">
                            <FolderPlus className="w-4 h-4" /> สร้างโฟลเดอร์
                        </button>
                        <div className="relative flex-1 min-w-[160px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                placeholder="ค้นหาไฟล์หรือโฟลเดอร์"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
                            <Filter className="w-4 h-4" /> ตัวกรอง
                        </button>
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                            {([{ key: "list", icon: List }, { key: "grid", icon: LayoutGrid }] as const).map(({ key, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setView(key)}
                                    className={cn("w-8 h-8 flex items-center justify-center rounded-md", view === key ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* List / grid + pagination */}
                    <div className="flex-1 min-h-0 flex flex-col bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                        <div className={cn("flex-1 min-h-0 overflow-y-auto overflow-x-auto", view === "grid" && "p-3")}>
                            {view === "list" ? (
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-white z-10">
                                        <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                                            <th className="py-2.5 pl-4 w-8"><input type="checkbox" /></th>
                                            <th className="py-2.5 font-medium">ชื่อ</th>
                                            <th className="py-2.5 font-medium hidden sm:table-cell">เจ้าของ</th>
                                            <th className="py-2.5 font-medium hidden md:table-cell">แก้ไขล่าสุด</th>
                                            <th className="py-2.5 font-medium hidden md:table-cell">ขนาด</th>
                                            <th className="py-2.5 pr-4 w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedRows.map((r) => {
                                            const { icon: Icon, tone } = fileIcon[r.kind];
                                            return (
                                                <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                                    <td className="py-2.5 pl-4"><input type="checkbox" /></td>
                                                    <td className="py-2.5">
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <Icon className={cn("w-4.5 h-4.5 shrink-0", tone)} />
                                                            <div className="min-w-0">
                                                                <p className="font-medium text-slate-700 truncate">{r.name}</p>
                                                                {r.meta && <p className="text-[11px] text-slate-400">{r.meta}</p>}
                                                            </div>
                                                            {r.starred && <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" />}
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 text-slate-500 hidden sm:table-cell">{r.owner}</td>
                                                    <td className="py-2.5 text-slate-500 hidden md:table-cell whitespace-nowrap">{r.modified}</td>
                                                    <td className="py-2.5 text-slate-500 hidden md:table-cell">{r.size ?? "-"}</td>
                                                    <td className="py-2.5 pr-4 text-slate-300"><MoreVertical className="w-4 h-4" /></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {paginatedRows.map((r) => {
                                        const { icon: Icon, tone } = fileIcon[r.kind];
                                        return (
                                            <div key={r.id} className="flex flex-col gap-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                                                <Icon className={cn("w-8 h-8", tone)} />
                                                <p className="text-xs font-medium text-slate-700 truncate">{r.name}</p>
                                                <p className="text-[10px] text-slate-400">{r.size ?? r.meta}</p>
                                            </div>
                                        );
                                    })}
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
                                    placeholder="8 / หน้า"
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

                {/* right sidebar */}
                <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden">
                    <div className="shrink-0 flex flex-col gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">พื้นที่จัดเก็บข้อมูล</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูทั้งหมด</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-20 h-20 rounded-full shrink-0 flex items-center justify-center"
                                style={{ background: `conic-gradient(${conic})` }}
                            >
                                <div className="w-12 h-12 rounded-full bg-white" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-800">32.4 GB</p>
                                <p className="text-xs text-slate-400">จาก 100 GB</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            {storageBreakdown.map((b, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                        <span className={cn("w-2 h-2 rounded-full", b.tone)} /> {b.label}
                                    </span>
                                    <span className="font-medium text-slate-700">{b.value} GB</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-400">ใช้ไป 32%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: "32%" }} />
                            </div>
                        </div>
                        <button className="w-full py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                            จัดการพื้นที่จัดเก็บ
                        </button>
                    </div>

                    <CardData
                        heading="การเข้าถึงล่าสุด"
                        variant="icon"
                        className="shrink-0"
                        items={quickAccess.map((q) => ({
                            title: q.name,
                            subtitle: q.meta,
                            icon: fileIcon[q.kind].icon,
                            iconClassName: cn("bg-slate-50", fileIcon[q.kind].tone),
                        }))}
                    />

                    <CardData
                        heading="กิจกรรมล่าสุด"
                        variant="accent"
                        className="flex-1 min-h-0 overflow-hidden"
                        items={recentActivity.map((a) => ({
                            title: a.file,
                            subtitle: a.text,
                            description: a.time,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}