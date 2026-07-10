"use client";

import { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    ChevronsRight,
    Settings,
    Plus,
    Image,
    Mic,
    Target,
    FileText,
    TrendingUp,
    Users,
    ShieldCheck,
    MapPin,
    Paperclip,
    Info,
    Star,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { AIDropdown } from "@/components/basic/AIDropdown";
import Tabs, { type TabItem } from "@/components/basic/Tabs";
import {
    decisionItemData,
    decisionUrgencyConfig,
    decisionImpactConfig,
} from "../../../../../../../migration/executive/decision/seed_decision_items";
import {
    impactForecastTiles,
    impactChartSeries,
    impactChartXLabels,
    impactChartYMax,
} from "../../../../../../../migration/executive/decision/seed_impact_forecast";
import { comparisonOptionData } from "../../../../../../../migration/executive/decision/seed_comparison_options";
import {
    recentDecisionData,
    recentDecisionStatusConfig,
} from "../../../../../../../migration/executive/decision/seed_recent_decisions";

const CHART_WIDTH = 300;
const CHART_HEIGHT = 150;
const CHART_GRID_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

function getChartPoints(data: number[], max: number) {
    return data.map((value, index) => ({
        x: data.length === 1 ? 0 : (index / (data.length - 1)) * CHART_WIDTH,
        y: CHART_HEIGHT - (value / max) * CHART_HEIGHT,
    }));
}

function DecisionOverviewPanel() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 items-start mt-4">
            {/* Left: decision items list — no existing component supports the badge + icon +
                right-aligned impact value row shape, so this list is composed inline. */}
            <div className="flex-1 min-w-0 flex flex-col gap-2 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                    <h3 className="text-sm font-semibold text-slate-800">
                        {decisionItemData.heading} ({decisionItemData.items.length})
                    </h3>
                    <a
                        href={decisionItemData.allDataHref}
                        className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                    >
                        ดูทั้งหมด
                        <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                </div>

                <div className="flex flex-col divide-y divide-slate-50">
                    {decisionItemData.items.map((item, index) => {
                        const Icon = item.icon;
                        const urgency = decisionUrgencyConfig[item.urgency];
                        const impact = decisionImpactConfig[item.impact];
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-3 py-3.5 first:pt-1 last:pb-1 px-2 -mx-2 rounded-lg hover:bg-slate-50/60 transition-colors cursor-pointer"
                            >
                                <div className={cn("flex items-center justify-center w-10 h-10 rounded-full shrink-0", item.iconWrapperClass)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className={cn("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1", urgency.className)}>
                                        {urgency.label}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-800 truncate">{item.title}</h4>
                                    <p className="text-xs text-slate-400 mt-0.5 truncate">{item.department}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                        <span className="flex items-center gap-1 truncate">
                                            <MapPin className="w-3 h-3 shrink-0" />
                                            พื้นที่: {item.areas}
                                        </span>
                                        <span className="flex items-center gap-1 truncate shrink-0">
                                            <Paperclip className="w-3 h-3 shrink-0" />
                                            {item.budgetLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0 gap-1 pl-2">
                                    <span className={cn("text-xs font-semibold whitespace-nowrap", impact.className)}>{impact.label}</span>
                                    <span className="text-base font-bold text-slate-800 whitespace-nowrap">{item.impactValue}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right column */}
            <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-4">
                {/* Impact forecast — compact stat tiles + multi-series line chart, no existing
                    chart component in components/ so both are composed inline. */}
                <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                        <h3 className="flex items-center gap-1 text-sm font-semibold text-slate-800">
                            คาดการณ์ผลกระทบหากตัดสินใจ
                            <Info className="w-3.5 h-3.5 text-slate-300" />
                        </h3>
                        <a href="#" className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0">
                            ดูทั้งหมด
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {impactForecastTiles.map((tile, index) => {
                            const TileIcon = tile.icon;
                            return (
                                <div key={index} className="flex flex-col gap-1 p-2 border border-slate-100 rounded-lg min-w-0">
                                    <div className={cn("flex items-center justify-center w-6 h-6 rounded-full shrink-0", tile.iconWrapperClass)}>
                                        <TileIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 truncate">{tile.label}</span>
                                    <span className="text-sm font-bold text-slate-800 truncate">{tile.value}</span>
                                    <span className="text-[9px] text-slate-400 truncate">{tile.unit}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-1">
                        <span className="text-xs font-semibold text-slate-600">ผลกระทบรวมรายวัน (ล้านบาท)</span>

                        <div className="flex items-center gap-3 mt-2 mb-2 flex-wrap">
                            {impactChartSeries.map((series) => (
                                <span key={series.key} className="flex items-center gap-1 text-[10px] text-slate-500">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: series.strokeHex }} />
                                    {series.label}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col justify-between text-[9px] text-slate-300 h-[150px] py-1 shrink-0">
                                <span>1,000</span>
                                <span>750</span>
                                <span>500</span>
                                <span>250</span>
                                <span>0</span>
                            </div>
                            <div className="relative flex-1 h-[150px] pr-14 min-w-0">
                                <svg
                                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                                    preserveAspectRatio="none"
                                    className="w-full h-full"
                                >
                                    {CHART_GRID_FRACTIONS.map((frac) => (
                                        <line
                                            key={frac}
                                            x1={0}
                                            x2={CHART_WIDTH}
                                            y1={frac * CHART_HEIGHT}
                                            y2={frac * CHART_HEIGHT}
                                            stroke="#f1f5f9"
                                            strokeWidth={1}
                                        />
                                    ))}
                                    {impactChartSeries.map((series) => {
                                        const points = getChartPoints(series.data, impactChartYMax);
                                        const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
                                        return (
                                            <g key={series.key}>
                                                <polyline
                                                    points={polylinePoints}
                                                    fill="none"
                                                    stroke={series.strokeHex}
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                {points.map((p, i) => (
                                                    <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={series.strokeHex} />
                                                ))}
                                            </g>
                                        );
                                    })}
                                </svg>
                                {impactChartSeries.map((series) => {
                                    const points = getChartPoints(series.data, impactChartYMax);
                                    const last = points[points.length - 1];
                                    return (
                                        <span
                                            key={series.key}
                                            className="absolute text-[9px] font-semibold whitespace-nowrap -translate-y-1/2"
                                            style={{
                                                color: series.strokeHex,
                                                left: `calc(${(last.x / CHART_WIDTH) * 100}% + 6px)`,
                                                top: `${(last.y / CHART_HEIGHT) * 100}%`,
                                            }}
                                        >
                                            {series.endLabel}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1 pl-8">
                            {impactChartXLabels.map((label, index) => (
                                <span key={index}>{label}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comparison table — no table component exists in components/, composed inline. */}
                <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                        <h3 className="text-sm font-semibold text-slate-800">{comparisonOptionData.heading}</h3>
                        <a
                            href={comparisonOptionData.allDataHref}
                            className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                        >
                            เปรียบเทียบละเอียด
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-left text-slate-400">
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ทางเลือก</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">งบประมาณ</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ผลกระทบ</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ระยะเวลา</th>
                                    <th className="font-medium pb-2 pr-2 whitespace-nowrap">ความเสี่ยง</th>
                                    <th className="font-medium pb-2 whitespace-nowrap">ความคุ้มค่า</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {comparisonOptionData.items.map((option, index) => (
                                    <tr key={index}>
                                        <td className="py-2 pr-2">
                                            <span className="inline-flex items-center gap-1.5">
                                                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                                    {option.label}
                                                </span>
                                                <span className="font-semibold text-slate-700 whitespace-nowrap">{option.title}</span>
                                            </span>
                                        </td>
                                        <td className="py-2 pr-2 text-slate-700 whitespace-nowrap">{option.budget}</td>
                                        <td className={cn("py-2 pr-2 font-semibold whitespace-nowrap", option.impactClassName)}>{option.impactLabel}</td>
                                        <td className="py-2 pr-2 text-slate-700 whitespace-nowrap">{option.duration}</td>
                                        <td className={cn("py-2 pr-2 font-semibold whitespace-nowrap", option.riskClassName)}>{option.riskLabel}</td>
                                        <td className="py-2">
                                            <span className="flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        className={cn(
                                                            "w-3 h-3",
                                                            starIndex < option.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                                                        )}
                                                    />
                                                ))}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent decisions summary — status icon + two-line right-aligned value shape has
                    no matching CardData variant, composed inline. */}
                <div className="flex flex-col gap-2 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2">
                        <h3 className="text-sm font-semibold text-slate-800">{recentDecisionData.heading}</h3>
                        <a
                            href={recentDecisionData.allDataHref}
                            className="flex items-center gap-0.5 text-xs font-medium text-[#3B82F6] hover:text-blue-800 transition-colors duration-150 shrink-0"
                        >
                            ดูทั้งหมด
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="flex flex-col divide-y divide-slate-50">
                        {recentDecisionData.items.map((item, index) => {
                            const statusCfg = recentDecisionStatusConfig[item.status];
                            const StatusIcon = item.icon;
                            return (
                                <div key={index} className="flex items-start gap-3 py-3 first:pt-1 last:pb-1">
                                    <div className={cn("flex items-center justify-center w-8 h-8 rounded-full shrink-0", statusCfg.iconWrapperClass)}>
                                        <StatusIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className={cn("text-sm font-bold", statusCfg.className)}>{statusCfg.label}</span>
                                            <span className="text-[11px] text-slate-400 shrink-0 whitespace-nowrap">{item.timestamp}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 mt-0.5">
                                            <span className="text-xs text-slate-500 truncate">{item.title}</span>
                                            <span className="text-xs font-semibold text-slate-700 shrink-0 whitespace-nowrap">{item.budgetLabel}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

const decisionPageTabs: TabItem[] = [
    { value: 'เรื่องเพื่อการตัดสินใจ', title: 'เรื่องเพื่อการตัดสินใจ', count: decisionItemData.items.length, content: () => <DecisionOverviewPanel /> },
    { value: 'อนุมัติแล้ว', title: 'อนุมัติแล้ว', count: 4, content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
    { value: 'อยู่ระหว่างดำเนินการ', title: 'อยู่ระหว่างดำเนินการ', count: 3, content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
    { value: 'ติดตามผล', title: 'ติดตามผล', count: 8, content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
    { value: 'ทั้งหมด', title: 'ทั้งหมด', content: () => <p className="text-sm text-slate-400 py-6 text-center">อยู่ระหว่างการพัฒนา</p> },
];

export default function Decision() {
    const [activeAI, setActiveAI] = useState<string | null>(null);
    return (
        <div className="w-full flex relative flex-1">
            <div className={`flex-1 px-6 transition-all duration-300 pb-4`}>
                {/* AI dropdown */}
                <div className="w-full flex justify-end mt-4">
                    <AIDropdown
                        selectedValue={activeAI}
                        onChange={setActiveAI}
                    />
                </div>

                {/* Metric Banner Card */}
                <div className="w-full h-[128px] bg-white rounded-2xl shadow-sm border border-slate-100 grid my-4 overflow-hidden" style={{ gridTemplateColumns: '35% 1fr 1fr 1fr 1fr' }}>
                    {/* Column 1: Vision & Title */}
                    <div className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors h-full">
                        <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5 text-blue-700" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] text-slate-500 leading-none">วิสัยทัศน์การตัดสินใจวันนี้</p>
                            <h2 className="text-[17px] font-bold text-slate-800 leading-snug mt-1">ตัดสินใจอย่างแม่นยำ<br />รวดเร็ว โปร่งใส</h2>
                            <p className="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-1">เพื่อความปลอดภัยของประชาชน การบริหารทรัพยากรอย่างคุ้มค่า และการพัฒนาจังหวัดอย่างยั่งยืน</p>
                        </div>
                    </div>

                    {/* Column 2: Urgent Action Items */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center">
                                <FileText className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <span className="text-red-500 text-[11px] font-medium">เร่งด่วน 2 เรื่อง</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">6</p>
                            <p className="text-[11px] text-slate-400 mt-1">เรื่องที่รอการตัดสินใจ</p>
                        </div>
                    </div>

                    {/* Column 3: Economic Impact */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="text-emerald-500 text-[11px] font-medium">ผลบวก</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">512.42</p>
                            <p className="text-[11px] text-slate-400 mt-1">คาดการณ์ผลกระทบ (ล้านบาท)</p>
                        </div>
                    </div>

                    {/* Column 4: Public Beneficiaries */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center">
                                <Users className="w-3.5 h-3.5 text-amber-600" />
                            </div>
                            <span className="text-emerald-500 text-[11px] font-medium">เพิ่มขึ้น 18%</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">856,250</p>
                            <p className="text-[11px] text-slate-400 mt-1">ประชาชนได้รับประโยชน์ (คน)</p>
                        </div>
                    </div>

                    {/* Column 5: Confidence Index */}
                    <div className="px-4 py-3 border-l border-slate-100 flex flex-col justify-between hover:bg-slate-50/50 transition-colors h-full">
                        <div className="flex items-center justify-between">
                            <div className="w-7 h-7 bg-purple-50 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                            </div>
                            <span className="text-emerald-500 text-[11px] font-medium">ระดับสูง</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800 leading-none">88%</p>
                            <p className="text-[11px] text-slate-400 mt-1">ความเชื่อมั่นคาดการณ์</p>
                        </div>
                    </div>
                </div>

                <Tabs tabs={decisionPageTabs} />
            </div>

            {/* AI panel */}
            {activeAI && (
                <div className="-z-1 mt-3 w-[380px] shrink-0 border-l-2 border-gray-200 bg-white backdrop-blur-md p-4 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
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
