"use client";

import { useState } from "react";
import {
    Search,
    SquarePen,
    Filter,
    Star,
    Phone,
    Video,
    MoreHorizontal,
    Paperclip,
    Image as ImageIcon,
    Smile,
    Send,
    Plus,
    UserPlus,
    BellOff,
    LogOut,
    FileText,
    Link as LinkIcon,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/utils/cn";
import Tabs from "@/components/basic/Tabs";
import { conversations, messages, members, sharedFiles, sharedLinks } from "./mock";

export default function MessengerClient() {
    const [activeConvo, setActiveConvo] = useState(conversations[0]);
    const [tab, setTab] = useState<string | number>("all");

    return (
        <div className="w-full h-[calc(100vh-88px)] flex px-6 py-4 gap-0">
            {/* Conversation list */}
            <div className="w-[25vw] shrink-0 flex flex-col border border-slate-100 rounded-l-xl bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 pb-2">
                    <button className="flex items-center gap-1 text-base font-bold text-slate-800">
                        ข้อความ <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white">
                        <SquarePen className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center gap-2 px-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            placeholder="ค้นหาข้อความ, คน, กลุ่ม..."
                            className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-100 rounded-lg outline-none focus:border-blue-400"
                        />
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 shrink-0">
                        <Filter className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="px-2 pt-1">
                    <Tabs
                        activeValue={tab}
                        onChange={setTab}
                        tabs={[
                            { value: "all", title: "ทั้งหมด" },
                            { value: "unread", title: "ยังไม่อ่าน", count: 6 },
                            { value: "fav", title: "รายการโปรด" },
                            { value: "group", title: "กลุ่ม" },
                            { value: "type", title: "ประเภท" },
                        ]}
                    />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveConvo(c)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-2",
                                activeConvo.id === c.id ? "bg-blue-50 border-blue-500" : "border-transparent hover:bg-slate-50"
                            )}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg shrink-0">
                                {c.avatar}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-semibold text-slate-800 truncate">{c.name}</span>
                                    <span className="text-[10px] text-slate-400 shrink-0">{c.time}</span>
                                </div>
                                <p className="text-xs text-slate-400 truncate">{c.subtitle}</p>
                            </div>
                            {c.unread && (
                                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold shrink-0">
                                    {c.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat window */}
            <div className="flex-1 min-w-0 flex flex-col border-t border-b border-slate-100 bg-white">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-base">{activeConvo.avatar}</div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-slate-800">{activeConvo.name}</span>
                                <Star className="w-3.5 h-3.5 text-amber-400" />
                            </div>
                            <span className="text-[11px] text-slate-400">สมาชิก 12 คน</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <Search className="w-4 h-4 cursor-pointer hover:text-slate-600" />
                        <Phone className="w-4 h-4 cursor-pointer hover:text-slate-600" />
                        <Video className="w-4 h-4 cursor-pointer hover:text-slate-600" />
                        <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-slate-600" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                    <div className="flex justify-center">
                        <span className="text-[11px] text-slate-400 bg-slate-50 px-3 py-1 rounded-full">20 พฤษภาคม 2567</span>
                    </div>
                    {messages.map((m) => (
                        <div key={m.id} className={cn("flex gap-2.5", m.self && "flex-row-reverse")}>
                            {!m.self && (
                                <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 flex items-center justify-center text-sm mt-4">
                                    👷
                                </div>
                            )}
                            <div className={cn("flex flex-col gap-1 max-w-[70%]", m.self && "items-end")}>
                                {!m.self && <span className="text-xs font-semibold text-slate-500">{m.sender}</span>}
                                {m.text && (
                                    <div
                                        className={cn(
                                            "px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed",
                                            m.self ? "bg-blue-600 text-white rounded-tr-sm" : "bg-slate-100 text-slate-700 rounded-tl-sm"
                                        )}
                                    >
                                        {m.text}
                                    </div>
                                )}
                                {m.attachment && (
                                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 w-[240px]">
                                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-slate-700 truncate">{m.attachment.name}</p>
                                            <p className="text-[10px] text-slate-400">{m.attachment.size}</p>
                                        </div>
                                    </div>
                                )}
                                <div className={cn("flex items-center gap-2 text-[10px] text-slate-400", m.self && "flex-row-reverse")}>
                                    <span>{m.time}</span>
                                    {m.reactions && (
                                        <span className="flex items-center gap-0.5 bg-white border border-slate-100 rounded-full px-1.5 py-0.5">
                                            👍 {m.reactions}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 px-5 py-3 border-t border-slate-100">
                    <Plus className="w-4.5 h-4.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                    <ImageIcon className="w-4.5 h-4.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                    <Paperclip className="w-4.5 h-4.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                    <input
                        placeholder="พิมพ์ข้อความ..."
                        className="flex-1 text-sm bg-slate-50 border border-slate-100 rounded-full px-4 py-2 outline-none focus:border-blue-400"
                    />
                    <Smile className="w-4.5 h-4.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white shrink-0">
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Group info panel */}
            <div className="w-[20vw] shrink-0 flex flex-col border border-slate-100 rounded-r-xl bg-white shadow-sm overflow-y-auto">
                <div className="flex flex-col items-center gap-2 p-5 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl">{activeConvo.avatar}</div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-slate-800">{activeConvo.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">สมาชิก 12 คน</span>
                    <div className="grid grid-cols-4 gap-3 pt-2 w-full">
                        {[
                            { icon: UserPlus, label: "เพิ่มสมาชิก" },
                            { icon: Search, label: "ค้นหา" },
                            { icon: BellOff, label: "แจ้งเตือน" },
                            { icon: LogOut, label: "ออกจากกลุ่ม", danger: true },
                        ].map((a, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center", a.danger ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-500")}>
                                    <a.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[9px] text-slate-400 text-center leading-tight">{a.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700">สมาชิก (12)</h4>
                        <a href="#" className="text-[11px] font-medium text-blue-600">ดูทั้งหมด</a>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        {members.map((m, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-slate-100 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-slate-700 truncate">{m.name}</p>
                                </div>
                                <span className={cn("text-[10px] shrink-0", m.online ? "text-emerald-500" : "text-slate-300")}>{m.role}</span>
                            </div>
                        ))}
                    </div>
                    <a href="#" className="text-[11px] font-medium text-blue-600">+7 คน</a>
                </div>

                <div className="flex flex-col gap-2 p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700">ไฟล์และสื่อ</h4>
                        <a href="#" className="text-[11px] font-medium text-blue-600">ดูทั้งหมด</a>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        {sharedFiles.map((f, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                                    <FileText className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-slate-700 truncate">{f.name}</p>
                                </div>
                                <span className="text-[10px] text-slate-300 shrink-0">{f.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700">ลิงก์ที่แชร์</h4>
                        <a href="#" className="text-[11px] font-medium text-blue-600">ดูทั้งหมด</a>
                    </div>
                    {sharedLinks.map((l, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <LinkIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-700 truncate">{l.title}</p>
                                <p className="text-[10px] text-blue-400 truncate">{l.url}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
