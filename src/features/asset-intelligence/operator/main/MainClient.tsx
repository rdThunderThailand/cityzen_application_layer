"use client";

import { useState } from "react";
import { ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/utils/cn";
import { CardGreeting } from "@/components/dashboard/CardGreeting";
import { WeatherCard } from "@/components/basic/WeatherCard";
import Tabs from "@/components/basic/Tabs";
import type { UserProfile } from "@/components/global/mockUserData";
import {
    overviewStats,
    quickActions,
    todayTasks,
    alerts,
    agendaToday,
    announcements,
    type TodayTask,
} from "./mock";

const statusBadgeClass: Record<TodayTask["status"], string> = {
    งานใหม่: "bg-blue-50 text-blue-600",
    กำลังดำเนินการ: "bg-amber-50 text-amber-600",
    รอดำเนินการ: "bg-slate-100 text-slate-600",
    เสร็จสิ้น: "bg-emerald-50 text-emerald-600",
};

export default function MainClient({ user }: { user: UserProfile }) {
    const counts = {
        all: todayTasks.length,
        new: todayTasks.filter((t) => t.status === "งานใหม่").length,
        progress: todayTasks.filter((t) => t.status === "กำลังดำเนินการ").length,
        pending: todayTasks.filter((t) => t.status === "รอดำเนินการ").length,
        done: 15,
    };

    const [statusFilter, setStatusFilter] = useState<string | number>("all");
    const filteredTasks =
        statusFilter === "all"
            ? todayTasks
            : todayTasks.filter((t) =>
                statusFilter === "new" ? t.status === "งานใหม่" :
                    statusFilter === "progress" ? t.status === "กำลังดำเนินการ" :
                        statusFilter === "pending" ? t.status === "รอดำเนินการ" : true
            );

    return (
        <div className="h-full w-full overflow-hidden px-6 py-3 flex flex-col gap-3">
            {/* Greeting row */}
            <div className="shrink-0 flex flex-col lg:flex-row gap-3 items-stretch">
                <CardGreeting
                    className="flex-1"
                    recipient={user.displayName}
                    summary="พร้อมลุยงานวันนี้หรือยังครับ"
                    avatarSrc={user.profileImg}
                    avatarAlt={user.displayName}
                />
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                    <CalendarDays className="w-5 h-5 text-blue-500 shrink-0" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-slate-600">เวรวันนี้</span>
                        <span className="text-[10px] text-slate-400">ปกติ</span>
                    </div>
                    <span className="text-base font-bold text-slate-800 whitespace-nowrap">08:00 - 17:00</span>
                </div>
            </div>

            {/* Main grid: tasks + right column */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-3">

                <div className="flex flex-col gap-3 min-h-0 h-full">
                    {/* Overview */}
                    <div className="shrink-0 flex flex-col gap-2 bg-white p-3 border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-slate-800">ภาพรวมวันนี้</h2>
                            <span className="text-xs text-slate-400">ข้อมูล ณ 07:30 น.</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                            {overviewStats.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-1.5 p-2.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", stat.tone)}>
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                                        <div className="text-[11px] text-slate-500 leading-tight">{stat.title}</div>
                                    </div>
                                    <a href="#" className="flex items-center gap-0.5 text-[11px] font-medium text-[#3B82F6] hover:text-blue-800">
                                        ดูทั้งหมด <ChevronRight className="w-3 h-3" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="shrink-0 flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <h2 className="text-sm font-bold text-slate-800">ทางลัด (Quick Actions)</h2>
                        <div className="grid grid-cols-5 gap-2">
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                    <action.icon className={cn("w-4 h-4", action.tone)} />
                                    <span className="text-[11px] font-medium text-slate-600 text-center leading-tight">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Today tasks */}
                    <div className="flex-1 min-h-0 flex flex-col gap-1.5 p-3 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                        <h2 className="shrink-0 text-sm font-bold text-slate-800">งานของวันนี้</h2>
                        <div className="shrink-0">
                            <Tabs
                                activeValue={statusFilter}
                                onChange={setStatusFilter}
                                tabs={[
                                    { value: "all", title: "ทั้งหมด" },
                                    { value: "new", title: "งานใหม่", count: counts.new },
                                    { value: "progress", title: "กำลังดำเนินการ", count: counts.progress },
                                    { value: "pending", title: "รอดำเนินการ", count: counts.pending },
                                    { value: "done", title: "เสร็จสิ้น", count: counts.done },
                                ]}
                            />
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col divide-y divide-slate-100">
                            {filteredTasks.map((task) => (
                                <a
                                    key={task.id}
                                    href="#"
                                    className="flex items-center gap-3 py-2 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors"
                                >
                                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", task.iconTone)}>
                                        <task.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-slate-800 truncate">{task.title}</span>
                                            {task.priority && (
                                                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600">
                                                    {task.priority}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                            <span>{task.code}</span>
                                            <span>•</span>
                                            <span className="truncate">{task.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                        <span className="text-xs text-slate-400">{task.date}</span>
                                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold", statusBadgeClass[task.status])}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                                </a>
                            ))}
                        </div>
                        <a href="#" className="shrink-0 mx-auto mt-1 flex items-center gap-1 text-xs font-medium text-[#3B82F6] hover:text-blue-800">
                            ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden">
                    {/* Alerts */}
                    <div className="shrink-0 flex flex-col gap-4 px-3 py-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">การแจ้งเตือน</h3>
                            <a href="#" className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6]">
                                ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            {alerts.map((alert, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", alert.tone)}>
                                        <alert.icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-slate-800 leading-snug">{alert.title}</p>
                                        <p className="text-xs text-slate-400 truncate">{alert.subtitle}</p>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{alert.time}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Agenda */}
                    <div className="shrink-0 flex flex-col gap-3 px-3 py-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">ปฏิทิน / เวรวันนี้</h3>
                            <a href="#" className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6]">
                                ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            {agendaToday.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 py-1">
                                    <span className="w-12 text-xs text-slate-400 shrink-0 pt-0.5">{item.time}</span>
                                    <span className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", item.done ? "bg-emerald-500" : "bg-slate-300")} />
                                    <div className="min-w-0 flex-1 flex justify-between">
                                        <p className="text-xs font-semibold text-slate-700 leading-snug">{item.title}</p>
                                        {item.subtitle && <p className="text-[11px] text-emerald-500">{item.subtitle}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="flex-1 min-h-0 flex flex-col gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">ประกาศ / ข้อมูลสำคัญ</h3>
                            <a href="#" className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6]">
                                ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
                            {announcements.map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1 h-20 flex flex-col justify-between py-1">
                                        <p className="text-xs font-bold text-slate-800 leading-snug truncate">{item.title}</p>
                                        <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{item.subtitle}</p>
                                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                                            <CalendarDays className="w-3 h-3" /> {item.date}
                                        </div>
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
