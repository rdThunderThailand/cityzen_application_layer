"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
    Settings,
    Plus,
    Image,
    Mic,
    Wrench,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { AIDropdown } from "@/components/basic/AIDropdown";
import { CardMetric } from "@/components/dashboard/CardMetric";
import CardWMapGreen from "@/components/dashboard/CardWMapGreen";
import { getSparklinePoints } from "@/components/dashboard/CardMetricWLineChart";
import { communicationOverviewStats } from "../../../../../../../migration/executive/communication/seed_overview";
import { communicationChannelData } from "../../../../../../../migration/executive/communication/seed_channels";
import { recentMessageData, messagePriorityConfig } from "../../../../../../../migration/executive/communication/seed_messages";
import {
    sentimentBreakdown,
    sentimentConfig,
    sentimentCommentData,
    type SentimentKey,
} from "../../../../../../../migration/executive/communication/seed_sentiment";
import { communicationScheduleData, scheduleStatusConfig } from "../../../../../../../migration/executive/communication/seed_schedule";
import { targetGroupData } from "../../../../../../../migration/executive/communication/seed_target_groups";

const DONUT_RADIUS = 45;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;
const SENTIMENT_ORDER: SentimentKey[] = ['positive', 'neutral', 'negative'];

function SentimentDonut({ positive, neutral, negative }: { positive: number; neutral: number; negative: number }) {
    const values: Record<SentimentKey, number> = { positive, neutral, negative };

    const segments = SENTIMENT_ORDER.reduce<{ key: SentimentKey; dash: number; offset: number }[]>((acc, key) => {
        const previousEnd = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
        const dash = (values[key] / 100) * DONUT_CIRCUMFERENCE;
        return [...acc, { key, dash, offset: previousEnd }];
    }, []);

    return (
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx={60} cy={60} r={DONUT_RADIUS} fill="none" stroke="#f1f5f9" strokeWidth={14} />
            {segments.map((segment) => (
                <circle
                    key={segment.key}
                    cx={60}
                    cy={60}
                    r={DONUT_RADIUS}
                    fill="none"
                    stroke={sentimentConfig[segment.key].colorHex}
                    strokeWidth={14}
                    strokeDasharray={`${segment.dash} ${DONUT_CIRCUMFERENCE - segment.dash}`}
                    strokeDashoffset={-segment.offset}
                    strokeLinecap="round"
                />
            ))}
        </svg>
    );
}

export default function Communication() {
    const [activeAI, setActiveAI] = useState<string | null>(null);

    return (
        <div className="w-full flex relative flex-1 min-h-0">
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden px-6 transition-all duration-300 pb-4">
                {/* AI dropdown */}
                <div className="w-full flex justify-end mt-4 shrink-0">
                    <AIDropdown
                        selectedValue={activeAI}
                        onChange={setActiveAI}
                    />
                </div>

                {/* Overview stat cards — standalone CardMetric cards directly under the AI
                    button, matching the reference image (no section heading above them). */}
                <div className="shrink-0 flex gap-4 mt-4">
                    {communicationOverviewStats.map((stat, index) => (
                        <CardMetric
                            key={index}
                            {...stat}
                            className={cn(stat.className, "flex-1 bg-white hover:shadow-md transition-shadow duration-200")}
                        />
                    ))}
                </div>

                {/* Channels + Recent messages + Sentiment row */}
                <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 mt-3 items-stretch">
                    {/* Channels — table shape (icon + reach + progress bar + sparkline per row)
                        has no matching CardData variant, composed inline. Reuses the
                        getSparklinePoints helper already exported by CardMetricWLineChart. */}
                    <div className="flex-1 min-w-0 h-full min-h-0 flex flex-col gap-2 p-3 border border-slate-100 rounded-xl shadow-sm bg-white overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                            <h3 className="text-sm font-semibold text-slate-800">{communicationChannelData.heading}</h3>
                        </div>
                        <div className="flex-1 min-h-0 overflow-hidden">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-left text-slate-400">
                                        <th className="font-medium pb-2 pr-2 whitespace-nowrap">ชื่อช่องทาง</th>
                                        <th className="font-medium pb-2 pr-2 text-right whitespace-nowrap">เข้าถึง (คน)</th>
                                        <th className="font-medium pb-2 pr-2 whitespace-nowrap">อัตราการเปิดรับ</th>
                                        <th className="font-medium pb-2 whitespace-nowrap">การมีส่วนร่วม</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {communicationChannelData.items.map((channel, index) => {
                                        const ChannelIcon = channel.icon;
                                        const points = channel.trendData ? getSparklinePoints(channel.trendData) : null;
                                        const polylinePoints = points?.map((p) => `${p.x},${p.y}`).join(' ');
                                        return (
                                            <tr key={index}>
                                                <td className="py-2 pr-2">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <div className={cn("flex items-center justify-center w-7 h-7 rounded-full shrink-0", channel.iconWrapperClass)}>
                                                            <ChannelIcon className="w-4 h-4" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-semibold text-slate-800 truncate">{channel.name}</p>
                                                            {channel.handle && <p className="text-[11px] text-slate-400 truncate">{channel.handle}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 pr-2 text-right font-semibold text-slate-700 whitespace-nowrap">
                                                    {channel.reach.toLocaleString('en-US')}
                                                </td>
                                                <td className="py-2 pr-2 min-w-[110px]">
                                                    {channel.openRate !== null ? (
                                                        <div className="flex flex-col gap-1">
                                                            <span className="font-semibold text-slate-700">{channel.openRate}%</span>
                                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${channel.openRate}%` }} />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-300">-</span>
                                                    )}
                                                </td>
                                                <td className="py-2">
                                                    {channel.engagementRate !== null && points ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-semibold text-slate-700">{channel.engagementRate}%</span>
                                                            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-10 h-5 text-blue-400">
                                                                <polyline
                                                                    points={polylinePoints}
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={3}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-300">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent messages — leading image thumbnail row has no matching CardData
                        variant (CardDataMedia is a panoramic grid, not a list row), composed inline. */}
                    <div className="w-full lg:w-[360px] shrink-0 h-full min-h-0 flex flex-col gap-2 p-3 border border-slate-100 rounded-xl shadow-sm bg-white overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                            <h3 className="text-sm font-semibold text-slate-800">{recentMessageData.heading}</h3>
                            <a
                                href={recentMessageData.allDataHref}
                                className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                            >
                                ดูทั้งหมด
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <div className="flex-1 min-h-0 overflow-hidden flex flex-col divide-y divide-slate-50">
                            {recentMessageData.items.map((message, index) => {
                                const priorityCfg = messagePriorityConfig[message.priority];
                                return (
                                    <div key={index} className="flex items-start gap-2.5 py-2 first:pt-0 last:pb-0">
                                        <img src={message.imageUrl} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0 bg-slate-100" />
                                        <div className="flex-1 min-w-0">
                                            <span className={cn("inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded mb-1", priorityCfg.className)}>
                                                {priorityCfg.label}
                                            </span>
                                            <p className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">{message.title}</p>
                                            <p className="text-[10px] text-slate-400 mt-1">{message.sentAt}</p>
                                            <div className="flex items-center justify-between gap-2 mt-1">
                                                <span className="text-[10px] text-slate-400 truncate">{message.reach}</span>
                                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                                                    {message.statusLabel}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-1" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sentiment — multi-segment donut has no matching component
                        (CardScoreGauge is a single-band semicircle gauge), composed inline. */}
                    <div className="w-full lg:w-[340px] shrink-0 h-full min-h-0 flex flex-col gap-2 p-3 border border-slate-100 rounded-xl shadow-sm bg-white overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                            <h3 className="text-sm font-semibold text-slate-800">{sentimentBreakdown.heading}</h3>
                            <a href={sentimentBreakdown.allDataHref} className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0">
                                ดูทั้งหมด
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        <div className="relative w-full max-w-[110px] aspect-square mx-auto shrink-0">
                            <SentimentDonut positive={sentimentBreakdown.positive} neutral={sentimentBreakdown.neutral} negative={sentimentBreakdown.negative} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-emerald-500">{sentimentBreakdown.positive}%</span>
                                <span className="text-[10px] text-slate-400">เชิงบวก</span>
                            </div>
                        </div>

                        <div className="shrink-0 flex flex-col gap-1">
                            {SENTIMENT_ORDER.map((key) => (
                                <div key={key} className="flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: sentimentConfig[key].colorHex }} />
                                        {sentimentConfig[key].label}
                                    </span>
                                    <span className={cn("font-semibold", sentimentConfig[key].className)}>{sentimentBreakdown[key]}%</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 min-h-0 flex flex-col border-t border-slate-50 pt-2 mt-1 overflow-hidden">
                            <div className="shrink-0 flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-slate-700">{sentimentCommentData.heading}</span>
                                <a href={sentimentCommentData.allDataHref} className="text-[11px] font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150">
                                    ดูทั้งหมด
                                </a>
                            </div>
                            <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
                                {sentimentCommentData.items.map((comment, index) => {
                                    const CommentIcon = comment.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-2">
                                            <CommentIcon className={cn("w-4 h-4 mt-0.5 shrink-0", sentimentConfig[comment.sentiment].className)} />
                                            <div className="min-w-0">
                                                <p className="text-xs text-slate-600 italic leading-snug">&ldquo;{comment.quote}&rdquo;</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">- {comment.source} <span className="ml-1">{comment.timestamp}</span></p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule + Reach map + Target groups row */}
                <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 mt-3 items-stretch">
                    {/* Communication schedule — time + title + status badge row has no matching
                        CardData variant (TimeItem has no status badge slot), composed inline. */}
                    <div className="w-full lg:w-[420px] shrink-0 h-full min-h-0 flex flex-col gap-2 p-3 border border-slate-100 rounded-xl shadow-sm bg-white overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                            <h3 className="text-sm font-semibold text-slate-800">{communicationScheduleData.heading}</h3>
                            <button
                                type="button"
                                className="flex items-center gap-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg px-2.5 py-1 shrink-0"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                สร้างข้อความใหม่
                            </button>
                        </div>

                        <div className="shrink-0 flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span>วันนี้</span>
                            <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <span className="text-slate-500">{communicationScheduleData.dateLabel}</span>
                        </div>

                        <div className="flex-1 min-h-0 overflow-hidden flex flex-col divide-y divide-slate-50">
                            {communicationScheduleData.items.map((item, index) => {
                                const statusCfg = scheduleStatusConfig[item.status];
                                return (
                                    <div key={index} className="flex items-center gap-3 py-1.5 first:pt-1 last:pb-1">
                                        <span className="w-12 text-xs font-semibold text-slate-500 shrink-0">{item.time}</span>
                                        <span className="flex-1 min-w-0 text-xs text-slate-700 truncate">{item.title}</span>
                                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap", statusCfg.className)}>
                                            {statusCfg.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reach map — CardWMapGreen matches the reference image's reach-percentage
                        legend and includes its own "ดูรายอำเภอ" action, so only the update
                        timestamp is composed as a sibling element below the card. */}
                    <div className="flex-1 min-w-0 h-full min-h-0 flex flex-col gap-2 overflow-hidden">
                        <CardWMapGreen className="flex-1 min-h-0 min-w-0 max-w-none" />
                        <div className="shrink-0 flex items-center justify-end px-1">
                            <span className="text-[10px] text-slate-400">ข้อมูลอัปเดตล่าสุด 07:45 น.</span>
                        </div>
                    </div>

                    {/* Target groups — progress-bar row shape has no matching CardData variant,
                        composed inline. */}
                    <div className="w-full lg:w-[340px] shrink-0 h-full min-h-0 flex flex-col gap-2 p-3 border border-slate-100 rounded-xl shadow-sm bg-white overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                            <h3 className="text-sm font-semibold text-slate-800">{targetGroupData.heading}</h3>
                            <a href={targetGroupData.allDataHref} className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0">
                                ดูทั้งหมด
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
                            {targetGroupData.items.map((group, index) => {
                                const GroupIcon = group.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className={cn("flex items-center justify-center w-8 h-8 rounded-full shrink-0", group.iconWrapperClass)}>
                                            <GroupIcon className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <span className="text-xs font-semibold text-slate-800 truncate">{group.title}</span>
                                                <span className="text-xs font-semibold text-slate-600 shrink-0">{group.percentage}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className={cn("h-full rounded-full", group.barColorClass)} style={{ width: `${group.percentage}%` }} />
                                            </div>
                                            <span className="text-[10px] text-slate-400 mt-1 block">{group.reach}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

            {/* AI panel */}
            {activeAI && (
                <div className="-z-1 w-[380px] h-full shrink-0 border-l-2 border-gray-200 bg-white backdrop-blur-md p-4 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
                    {/* Header Navigation Utilities */}
                    <div className="flex justify-between items-center mb-6">
                        <button className="flex items-center gap-1 rounded-lg bg-slate-600 px-3 py-1.5 text-xs text-white hover:bg-slate-700 transition-colors font-medium">
                            <span>แชทใหม่</span>
                            <ChevronDown className="w-3.5 h-3.5 text-white/80" />
                        </button>
                        <button onClick={() => setActiveAI(null)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1">
                            <ChevronsRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Central Empty State Content */}
                    <div className="flex flex-col items-center justify-center flex-1 text-center py-20">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 mb-2">AI</span>
                        <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                            เวอร์ชันทดสอบ <br />
                            กำลังอยู่ระหว่างการพัฒนา
                        </h4>
                        <p className="text-xs text-slate-400 mt-3 max-w-[240px] mx-auto leading-relaxed">
                            อยู่ระหว่างการพัฒนาและปรับปรุงฟังก์ชันบางอย่างอาจยังไม่พร้อมให้บริการ
                        </p>
                    </div>

                    {/* Interactive Bottom Input Container */}
                    <div className="w-full border border-slate-100 rounded-2xl p-4 bg-white shadow-sm mt-auto">
                        <input
                            type="text"
                            placeholder="ถามคำถามเกี่ยวกับเอกสารนี้"
                            className="bg-transparent w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none mb-3"
                        />
                        <div className="flex justify-between items-center">
                            {/* Left Side Actions */}
                            <div className="flex items-center gap-3 text-slate-400">
                                <button className="hover:text-slate-600 transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button className="hover:text-slate-600 transition-colors">
                                    <Image className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-2">
                                <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-100 rounded-md px-2 py-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    <span>สูงสุด</span>
                                    <ChevronDown className="w-3 h-3 text-slate-400" />
                                </div>
                                <button className="bg-slate-800 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-slate-700 transition-colors">
                                    <Mic className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
