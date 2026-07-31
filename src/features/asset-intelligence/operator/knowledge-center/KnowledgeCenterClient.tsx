"use client";

import { useState } from "react";
import { Search, Filter, ChevronRight, Eye, CalendarDays, MessageCircleQuestion, Sparkles, X, User2 } from "lucide-react";
import { cn } from "@/utils/cn";
import Tabs from "@/components/basic/Tabs";
import { CardData } from "@/components/dashboard/CardData";
import {
    categories,
    articles,
    faqs,
    popularArticles,
    announcementsFeed,
    latestUpdates,
} from "./mock";

export default function KnowledgeCenterClient() {
    const [tab, setTab] = useState<string | number>("recommended");
    const [showTip, setShowTip] = useState(true);

    return (
        <div className="w-full px-6 py-4 flex flex-col gap-4">

            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        placeholder="ค้นหาความรู้, คู่มือ, ขั้นตอนการทำงาน..."
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 shrink-0">
                    <Filter className="w-4 h-4" /> ตัวกรอง
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-4 items-start">
                <div className="flex flex-col gap-4 min-w-0 max-w-[60vw]">

                    <div>
                        <h2 className="text-sm font-bold text-slate-800 mb-3">หมวดหมู่ความรู้</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {categories.map((c, i) => (
                                <button key={i} className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", c.tone)}>
                                        <c.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{c.title}</span>
                                    <span className="text-[10px] text-slate-400">{c.count} รายการ</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <Tabs
                            activeValue={tab}
                            onChange={setTab}
                            tabs={[
                                { value: "recommended", title: "แนะนำสำหรับคุณ" },
                                { value: "popular", title: "ยอดนิยม" },
                                { value: "latest", title: "อัปเดตล่าสุด" },
                                { value: "all", title: "ทั้งหมด" },
                            ]}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {articles.map((a, i) => (
                                <a key={i} href="#" className="flex gap-2 rounded-lg overflow-hidden border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="flex-shrink-0 w-28 bg-slate-100">
                                        <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col gap-1 p-3 pt-0">
                                        <span className={cn("self-start px-2 py-0.5 rounded-full text-[10px] font-semibold", a.tagTone)}>{a.tag}</span>
                                        <h3 className="text-sm font-bold text-slate-800 leading-snug">{a.title}</h3>
                                        <p className="text-xs text-slate-400 leading-snug line-clamp-2">{a.description}</p>
                                        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                                            <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {a.date}</span>
                                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {a.views}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <a href="#" className="mx-auto flex items-center gap-1 text-xs font-medium text-blue-600">
                            ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                            <h3 className="text-sm font-bold text-slate-800">คำถามที่พบบ่อย (FAQ)</h3>
                            <div className="flex flex-col gap-2.5">
                                {faqs.map((q, i) => (
                                    <a key={i} href="#" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600">
                                        <MessageCircleQuestion className="w-4 h-4 text-blue-400 shrink-0" /> {q}
                                    </a>
                                ))}
                            </div>
                            <a href="#" className="flex items-center gap-1 text-xs font-medium text-blue-600 mt-1">
                                ดูคำถามทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        <div className="flex flex-col gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                            <h3 className="text-sm font-bold text-slate-800">ไม่พบคำตอบที่ต้องการ?</h3>
                            <p className="text-xs text-slate-400">ค้นหาจากผู้ดูแลระบบหรือส่งคำถามที่ยังขาดข้อมูลอยู่เพื่อขอความช่วยเหลือ</p>
                            <div className="flex items-center gap-2 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <User2 className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <button className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold">
                                        ค้นหาผู้ดูแล
                                    </button>
                                    <button className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold">
                                        ส่งคำถาม / ขอความช่วยเหลือ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="flex flex-col gap-4 w-full h-full">
                    <CardData
                        heading="ความรู้ยอดนิยม"
                        variant="number"
                        items={popularArticles.map((title) => ({ title }))}
                    />

                    <CardData
                        heading="ประกาศ / ข่าวสาร"
                        variant="icon"
                        items={announcementsFeed.map((a) => ({ title: a.title, subtitle: a.time, icon: a.icon, iconClassName: a.tone }))}
                    />

                    <CardData
                        heading="อัปเดตล่าสุด"
                        variant="icon"
                        items={latestUpdates.map((u) => ({ title: u.title, subtitle: u.time, icon: u.icon, iconClassName: u.tone }))}
                    />
                </div>
            </div>

            {showTip && (
                <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
                    <span className="text-xs text-blue-700 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 shrink-0" />
                        เคล็ดลับ: คุณสามารถบันทึกความรู้ที่เป็นประโยชน์ไว้ในรายการโปรด โดยคลิกที่ไอคอนดาว
                    </span>
                    <button onClick={() => setShowTip(false)} className="text-blue-400 hover:text-blue-600 shrink-0">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
