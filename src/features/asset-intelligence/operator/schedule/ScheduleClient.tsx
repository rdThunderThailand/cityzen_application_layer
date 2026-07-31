"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical, Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import {
    activities,
    leaveRequests,
    teammates,
    shiftTone,
    shiftTime,
    shiftForWeekday,
    type CalendarDay,
} from "./mock";

const WEEKDAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const WEEKDAY_LABELS = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const THAI_MONTHS = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const VIEW_TABS = ["เดือน", "สัปดาห์", "วัน", "รายการ"];

const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const formatThaiDate = (date: Date) => `${date.getDate()} ${THAI_MONTHS[date.getMonth()]} ${date.getFullYear() + 543}`;

export default function ScheduleClient() {
    const [view, setView] = useState("เดือน");
    const [today] = useState(() => new Date());
    const [calendarDate, setCalendarDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

    const calendarYear = calendarDate.getFullYear();
    const calendarMonth = calendarDate.getMonth();

    const monthCells = useMemo(() => {
        const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
        const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay();
        const daysInPrevMonth = new Date(calendarYear, calendarMonth, 0).getDate();

        const cells: CalendarDay[] = [];
        for (let i = firstWeekday - 1; i >= 0; i--) {
            cells.push({ day: daysInPrevMonth - i, inMonth: false });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(calendarYear, calendarMonth, d);
            const shift = shiftForWeekday(date.getDay());
            cells.push({ day: d, inMonth: true, shift, time: shiftTime[shift], selected: isSameDay(date, today) });
        }
        const trailing = (7 - (cells.length % 7)) % 7;
        for (let d = 1; d <= trailing; d++) {
            cells.push({ day: d, inMonth: false });
        }
        return cells;
    }, [calendarYear, calendarMonth, today]);

    const weekStrip = useMemo(() => {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const shift = shiftForWeekday(date.getDay());
            return {
                day: date.getDate(),
                label: WEEKDAY_LABELS[date.getDay()],
                shift,
                time: shiftTime[shift],
                selected: isSameDay(date, today),
            };
        });
    }, [today]);

    const tomorrow = useMemo(() => {
        const d = new Date(today);
        d.setDate(d.getDate() + 1);
        return d;
    }, [today]);

    const todayShift = shiftForWeekday(today.getDay());
    const tomorrowShift = shiftForWeekday(tomorrow.getDay());

    const goToPrevMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth - 1, 1));
    const goToNextMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth + 1, 1));
    const goToToday = () => setCalendarDate(new Date(today.getFullYear(), today.getMonth(), 1));

    return (
        <div className="h-full w-full overflow-hidden px-6 py-3 flex flex-col gap-3">

            <div className="flex-[2.2] min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
                {/* Calendar */}
                <div className="flex flex-col gap-3 min-h-0 h-full">
                    <div className="flex-1 min-h-0 flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm min-w-0 overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={goToPrevMonth} className="text-slate-400 hover:text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                                <span className="text-sm font-bold text-slate-800">{THAI_MONTHS[calendarMonth]} {calendarYear + 543}</span>
                                <button type="button" onClick={goToNextMonth} className="text-slate-400 hover:text-slate-600"><ChevronRight className="w-4 h-4" /></button>
                                <button type="button" onClick={goToToday} className="ml-2 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg">วันนี้</button>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                                {VIEW_TABS.map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setView(v)}
                                        className={cn(
                                            "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                                            view === v ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="shrink-0 grid grid-cols-7 gap-1 text-center">
                            {WEEKDAYS.map((d) => (
                                <span key={d} className="text-xs font-medium text-slate-400">{d}</span>
                            ))}
                        </div>

                        <div className="flex-1 min-h-0 grid grid-cols-7 auto-rows-fr gap-1">
                            {monthCells.map((cell, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1 rounded-lg",
                                        !cell.inMonth && "opacity-40",
                                        cell.selected && "ring-2 ring-blue-500"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "text-xs w-6 h-6 flex items-center justify-center rounded-full font-medium shrink-0",
                                            cell.selected ? "bg-blue-600 text-white" : "text-slate-700"
                                        )}
                                    >
                                        {cell.day}
                                    </span>
                                    {cell.shift && (
                                        <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap", shiftTone[cell.shift].bg, shiftTone[cell.shift].text)}>
                                            {cell.shift !== "หยุด" ? cell.shift : "หยุด"}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="shrink-0 flex items-center gap-4 flex-wrap pt-2 border-t border-slate-100">
                            {(["เช้า", "บ่าย", "ดึก", "หยุด"] as const).map((s) => (
                                <div key={s} className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <span className={cn("w-2 h-2 rounded-full", shiftTone[s].dot)} />
                                    {s === "เช้า" && "เช้า 08.00 - 16.00"}
                                    {s === "บ่าย" && "บ่าย 13.00 - 21.00"}
                                    {s === "ดึก" && "ดึก 21.00 - 05.00"}
                                    {s === "หยุด" && "วันหยุด"}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="shrink-0 flex flex-col gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">ตารางเวรประจำสัปดาห์นี้</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูสัปดาห์</a>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {weekStrip.map((d, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex flex-col items-center gap-1 rounded-lg p-2 border",
                                        d.selected ? "border-blue-500 bg-blue-50" : "border-slate-100"
                                    )}
                                >
                                    <span className="text-[10px] text-slate-400">{d.label}</span>
                                    <span className={cn("text-sm font-bold", d.selected ? "text-blue-600" : "text-slate-700")}>{d.day}</span>
                                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap", shiftTone[d.shift].bg, shiftTone[d.shift].text)}>
                                        {d.shift}
                                    </span>
                                    <span className="text-[9px] text-slate-400 whitespace-nowrap">{d.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden">
                    <div className="shrink-0 flex flex-col gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">เวรของฉัน</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูทั้งหมด</a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">วันนี้ {formatThaiDate(today)}</span>
                            <div className="flex items-center gap-2">
                                <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", shiftTone[todayShift].bg, shiftTone[todayShift].text)}>{todayShift}</span>
                                <span className="text-sm font-bold text-slate-800">{shiftTime[todayShift]} น.</span>
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-3 flex flex-col gap-1">
                            <span className="text-xs text-slate-400">วันถัดไป {formatThaiDate(tomorrow)}</span>
                            <div className="flex items-center gap-2">
                                <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", shiftTone[tomorrowShift].bg, shiftTone[tomorrowShift].text)}>{tomorrowShift}</span>
                                <span className="text-sm font-bold text-slate-800">{shiftTime[tomorrowShift]} น.</span>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 flex flex-col gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <h3 className="text-sm font-bold text-slate-800">สรุปเวลาการทำงาน ({THAI_MONTHS[calendarMonth]})</h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">วันทำงานทั้งหมด</span>
                                <span className="font-semibold text-slate-800">20 วัน</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">ทำงานแล้ว</span>
                                <span className="font-semibold text-slate-800">14 วัน</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">ลาพัก / ลากิจ</span>
                                <span className="font-semibold text-slate-800">1 วัน</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-400">ชั่วโมงรวม</span>
                                <span className="font-semibold text-slate-700">112 ชม.</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: "70%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">เพื่อนร่วมเวรวันนี้</h3>
                            <a href="#" className="text-xs font-medium text-blue-600">ดูทั้งหมด</a>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-3">
                            {teammates.map((m, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="relative shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500">
                                            {m.name.charAt(0)}
                                        </div>
                                        <span className={cn("absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white", m.online ? "bg-emerald-500" : "bg-slate-300")} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-slate-700 truncate">{m.name}</p>
                                        <p className="text-[11px] text-slate-400">{m.time}</p>
                                    </div>
                                    <span className={cn("text-[10px] font-medium shrink-0", m.online ? "text-emerald-500" : "text-slate-400")}>
                                        {m.online ? "ออนไลน์" : "ออฟไลน์"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom row */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm min-h-0 overflow-hidden">
                    <h3 className="shrink-0 text-sm font-bold text-slate-800">กิจกรรม / นัดหมาย</h3>
                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col divide-y divide-slate-100">
                        {activities.map((a, i) => (
                            <div key={i} className="flex items-center gap-3 py-2.5">
                                <span className="text-xs text-slate-400 w-12 shrink-0">{a.time}</span>
                                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                <span className="text-sm text-slate-700 flex-1 min-w-0 truncate">{a.title}</span>
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0", a.tone)}>{a.status}</span>
                                <button className="text-slate-300 hover:text-slate-500 shrink-0"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm min-h-0 overflow-hidden">
                    <h3 className="shrink-0 text-sm font-bold text-slate-800">การลา / คำขอ</h3>
                    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col divide-y divide-slate-100">
                        {leaveRequests.map((r, i) => (
                            <div key={i} className="flex items-center justify-between py-2.5 gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-700 truncate">{r.title}</p>
                                    <p className="text-xs text-slate-400">{r.date}</p>
                                </div>
                                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0", r.tone)}>{r.status}</span>
                            </div>
                        ))}
                    </div>
                    <button className="shrink-0 w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                        <Plus className="w-4 h-4" /> สร้างคำขอใหม่
                    </button>
                </div>
            </div>

        </div>
    );
}