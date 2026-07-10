"use client";

import { useState } from "react";
import {
    ArrowDown,
    ArrowUp,
    Calendar,
    ChevronDown,
    ChevronsRight,
    Download,
    Image,
    Mic,
    Plus,
    Settings,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { AIDropdown } from "@/components/basic/AIDropdown";
import Dropdown from "@/components/basic/Dropdown";
import { CardMetric } from "@/components/dashboard/CardMetric";
import {
    periodFilterOptions,
    compareFilterOptions,
    dimensionFilterOptions,
    outcomeFilterDefaults,
} from "../../../../../../../migration/executive/outcome/seed_filters";
import { keyOutcomeStats } from "../../../../../../../migration/executive/outcome/seed_key_outcomes";
import { dimensionRadarData, radarAxisLabels, type RadarSeries } from "../../../../../../../migration/executive/outcome/seed_dimension_radar";
import {
    impactTiles,
    impactChartHeading,
    impactChartXLabels,
    impactChartYMax,
    impactChartSeries,
} from "../../../../../../../migration/executive/outcome/seed_impact";
import { missionCompletionData } from "../../../../../../../migration/executive/outcome/seed_mission_completion";
import { weeklyComparisonData } from "../../../../../../../migration/executive/outcome/seed_weekly_comparison";
import { topProjectData } from "../../../../../../../migration/executive/outcome/seed_top_projects";
import {
    longTermTrendHeading,
    longTermTrendXLabels,
    longTermTrendYMax,
    longTermTrendYMin,
    longTermTrendSeries,
} from "../../../../../../../migration/executive/outcome/seed_long_term_trend";

const LINE_CHART_WIDTH = 600;
const LINE_CHART_HEIGHT = 180;
const GRID_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

function getLinePoints(data: number[], max: number) {
    return data.map((value, index) => ({
        x: data.length === 1 ? 0 : (index / (data.length - 1)) * LINE_CHART_WIDTH,
        y: LINE_CHART_HEIGHT - (max === 0 ? 0 : (value / max) * LINE_CHART_HEIGHT),
    }));
}

const RADAR_SIZE = 260;
const RADAR_CENTER = RADAR_SIZE / 2;
const RADAR_MAX_RADIUS = RADAR_CENTER - 55;
const RADAR_GRID_LEVELS = [0.25, 0.5, 0.75, 1];

function getRadarPoint(value: number, index: number, axisCount: number) {
    const angle = (-90 + (360 / axisCount) * index) * (Math.PI / 180);
    const r = (value / 100) * RADAR_MAX_RADIUS;
    return { x: RADAR_CENTER + r * Math.cos(angle), y: RADAR_CENTER + r * Math.sin(angle) };
}

function RadarChart({ axisLabels, series }: { axisLabels: string[]; series: RadarSeries[] }) {
    const axisCount = axisLabels.length;
    const currentSeries = series[0];

    return (
        <div className="relative w-full h-full">
            <svg viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`} className="w-full h-full">
                {RADAR_GRID_LEVELS.map((level) => {
                    const points = axisLabels.map((_, i) => getRadarPoint(level * 100, i, axisCount));
                    return (
                        <polygon
                            key={level}
                            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth={1}
                        />
                    );
                })}
                {axisLabels.map((_, i) => {
                    const outer = getRadarPoint(100, i, axisCount);
                    return <line key={i} x1={RADAR_CENTER} y1={RADAR_CENTER} x2={outer.x} y2={outer.y} stroke="#e2e8f0" strokeWidth={1} />;
                })}
                {series.map((s) => {
                    const points = s.values.map((v, i) => getRadarPoint(v, i, axisCount));
                    return (
                        <polygon
                            key={s.key}
                            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                            fill={s.fill ? s.colorHex : 'none'}
                            fillOpacity={s.fill ? 0.15 : 0}
                            stroke={s.colorHex}
                            strokeWidth={2}
                            strokeDasharray={s.dashed ? '4 3' : undefined}
                            strokeLinejoin="round"
                        />
                    );
                })}
            </svg>
            {axisLabels.map((label, i) => {
                const pos = getRadarPoint(128, i, axisCount);
                return (
                    <span
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2 text-[9px] leading-tight text-center font-medium text-slate-500"
                        style={{ left: `${(pos.x / RADAR_SIZE) * 100}%`, top: `${(pos.y / RADAR_SIZE) * 100}%`, width: '78px' }}
                    >
                        {label} ({currentSeries.values[i]}%)
                    </span>
                );
            })}
        </div>
    );
}

function DonutChart({ segments, size = 130, strokeWidth = 14 }: { segments: { percentage: number; colorHex: string }[]; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    const arcs = segments.reduce<{ colorHex: string; dash: number; offset: number }[]>((acc, seg) => {
        const previousEnd = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
        const dash = (seg.percentage / 100) * circumference;
        return [...acc, { colorHex: seg.colorHex, dash, offset: previousEnd }];
    }, []);

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
            {arcs.map((arc, index) => (
                <circle
                    key={index}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={arc.colorHex}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
                    strokeDashoffset={-arc.offset}
                    strokeLinecap="round"
                />
            ))}
        </svg>
    );
}

export default function Outcome() {
    const [activeAI, setActiveAI] = useState<string | null>(null);
    const [period, setPeriod] = useState<string | number>(outcomeFilterDefaults.period);
    const [compare, setCompare] = useState<string | number>(outcomeFilterDefaults.compare);
    const [dimension, setDimension] = useState<string | number>(outcomeFilterDefaults.dimension);

    return (
        <div className="w-full flex relative flex-1">
            <div className="flex-1 px-6 transition-all duration-300 pb-4">
                {/* AI dropdown */}
                <div className="w-full flex justify-end mt-4">
                    <AIDropdown
                        selectedValue={activeAI}
                        onChange={setActiveAI}
                    />
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-end gap-4 p-4 border border-slate-100 rounded-xl shadow-sm bg-white mt-3">
                    <div className="flex flex-col gap-1.5">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Calendar className="w-3 h-3" />
                            ช่วงเวลา
                        </span>
                        <Dropdown
                            options={periodFilterOptions}
                            selectedValue={period}
                            onChange={setPeriod}
                            placeholder="เลือกช่วงเวลา"
                            className="w-[230px]"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] text-slate-400">เปรียบเทียบกับ</span>
                        <Dropdown
                            options={compareFilterOptions}
                            selectedValue={compare}
                            onChange={setCompare}
                            placeholder="เลือกช่วงเปรียบเทียบ"
                            className="w-[260px]"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] text-slate-400">มิติการวิเคราะห์</span>
                        <Dropdown
                            options={dimensionFilterOptions}
                            selectedValue={dimension}
                            onChange={setDimension}
                            placeholder="เลือกมิติ"
                            className="w-[200px]"
                        />
                    </div>
                    <button
                        type="button"
                        className="ml-auto flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors shrink-0"
                    >
                        <Download className="w-4 h-4" />
                        ส่งออกรายงาน
                    </button>
                </div>

                {/* Key outcome summary — CardMetric reused per stat, border/shadow stripped via
                    className overrides so all 5 sit as columns inside one shared heading card,
                    matching the reference image (unlike war-room/communication which use separate cards). */}
                <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white mt-4">
                    <h3 className="text-sm font-semibold text-slate-800">สรุปผลลัพธ์สำคัญ</h3>
                    <div className="flex gap-4">
                        {keyOutcomeStats.map((stat, index) => (
                            <CardMetric
                                key={index}
                                {...stat}
                                className={cn(stat.className, "flex-1 border-none shadow-none p-0 min-w-0")}
                            />
                        ))}
                    </div>
                </div>

                {/* Dimension radar + Impact + Mission completion row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 items-stretch">
                    {/* Dimension radar — no radar/spider chart component exists in components/,
                        composed inline as SVG. */}
                    <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                        <h3 className="text-sm font-semibold text-slate-800">{dimensionRadarData.heading}</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                            {dimensionRadarData.series.map((s) => (
                                <span key={s.key} className="flex items-center gap-1 text-[10px] text-slate-500">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.colorHex }} />
                                    {s.label}
                                </span>
                            ))}
                        </div>
                        <div className="w-full aspect-square max-w-[280px] mx-auto py-2">
                            <RadarChart axisLabels={radarAxisLabels} series={dimensionRadarData.series} />
                        </div>
                        <button type="button" className="mt-1 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg py-2 text-center">
                            ดูรายละเอียดรายมิติ
                        </button>
                    </div>

                    {/* Impact on citizens — mini stat tiles (no icon, unlike CardMetric) plus a
                        multi-series line chart; neither has a matching component, composed inline. */}
                    <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                        <h3 className="text-sm font-semibold text-slate-800">ผลกระทบต่อประชาชน (Impact)</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {impactTiles.map((tile, index) => (
                                <div key={index} className="flex flex-col gap-1 min-w-0">
                                    <span className="text-[10px] text-slate-400 truncate">{tile.label}</span>
                                    <span className="text-lg font-bold text-slate-800 truncate">{tile.value}</span>
                                    <span className="text-[10px] text-slate-400">{tile.unit}</span>
                                    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-500">
                                        {tile.trendValue >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                        {tile.trendLabel}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-1">
                            <span className="text-xs font-semibold text-slate-600">{impactChartHeading}</span>
                            <div className="flex items-center gap-3 mt-2 mb-2 flex-wrap">
                                {impactChartSeries.map((s) => (
                                    <span key={s.key} className="flex items-center gap-1 text-[10px] text-slate-500">
                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.colorHex }} />
                                        {s.label}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col justify-between text-[9px] text-slate-300 h-[160px] py-1 shrink-0">
                                    <span>1M</span>
                                    <span>750K</span>
                                    <span>500K</span>
                                    <span>250K</span>
                                    <span>0</span>
                                </div>
                                <svg viewBox={`0 0 ${LINE_CHART_WIDTH} ${LINE_CHART_HEIGHT}`} preserveAspectRatio="none" className="flex-1 h-[160px] min-w-0">
                                    {GRID_FRACTIONS.map((frac) => (
                                        <line key={frac} x1={0} x2={LINE_CHART_WIDTH} y1={frac * LINE_CHART_HEIGHT} y2={frac * LINE_CHART_HEIGHT} stroke="#f1f5f9" strokeWidth={1} />
                                    ))}
                                    {impactChartSeries.map((s) => {
                                        const points = getLinePoints(s.data, impactChartYMax);
                                        return (
                                            <g key={s.key}>
                                                <polyline
                                                    points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                                                    fill="none"
                                                    stroke={s.colorHex}
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                {points.map((p, i) => (
                                                    <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={s.colorHex} />
                                                ))}
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-400 mt-1 pl-8">
                                {impactChartXLabels.map((label, index) => (
                                    <span key={index}>{label}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mission completion — multi-segment donut, no matching component
                        (CardScoreGauge is a single-band semicircle gauge), composed inline. */}
                    <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                        <h3 className="text-sm font-semibold text-slate-800">{missionCompletionData.heading}</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative w-[120px] h-[120px] shrink-0">
                                <DonutChart segments={missionCompletionData.segments.map((s) => ({ percentage: s.percentage, colorHex: s.colorHex }))} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-slate-800">{missionCompletionData.total}</span>
                                    <span className="text-[10px] text-slate-400">{missionCompletionData.totalLabel}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                                {missionCompletionData.segments.map((segment) => (
                                    <div key={segment.key} className="flex items-center justify-between text-xs gap-2">
                                        <span className="flex items-center gap-1.5 text-slate-600 truncate">
                                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: segment.colorHex }} />
                                            {segment.label}
                                        </span>
                                        <span className="font-semibold text-slate-700 shrink-0">{segment.count} ({segment.percentage}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="button" className="mt-1 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg py-2 text-center">
                            ดูรายละเอียดภารกิจ
                        </button>
                    </div>
                </div>

                {/* Weekly comparison + Top projects + Long-term trend row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 items-stretch">
                    {/* Weekly comparison table — no table component exists in components/. */}
                    <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                        <h3 className="text-sm font-semibold text-slate-800">{weeklyComparisonData.heading}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-left text-slate-400">
                                        <th className="font-medium pb-2 pr-2 whitespace-nowrap">ตัวชี้วัด</th>
                                        <th className="font-medium pb-2 pr-2 text-right whitespace-nowrap">สัปดาห์นี้</th>
                                        <th className="font-medium pb-2 pr-2 text-right whitespace-nowrap">สัปดาห์ก่อน</th>
                                        <th className="font-medium pb-2 text-right whitespace-nowrap">เปลี่ยนแปลง</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {weeklyComparisonData.items.map((row, index) => (
                                        <tr key={index}>
                                            <td className="py-2.5 pr-2 text-slate-600 whitespace-nowrap">{row.metric}</td>
                                            <td className="py-2.5 pr-2 text-right font-semibold text-slate-800 whitespace-nowrap">{row.currentWeek}</td>
                                            <td className="py-2.5 pr-2 text-right text-slate-500 whitespace-nowrap">{row.previousWeek}</td>
                                            <td className={cn("py-2.5 text-right font-semibold whitespace-nowrap", row.isPositive ? "text-emerald-500" : "text-rose-500")}>
                                                <span className="inline-flex items-center gap-0.5">
                                                    {row.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                                    {row.changeLabel}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top projects — thumbnail + title + progress bar + secondary value row has
                        no matching CardData variant, composed inline. */}
                    <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                        <h3 className="text-sm font-semibold text-slate-800">{topProjectData.heading}</h3>
                        <div className="flex flex-col divide-y divide-slate-50">
                            {topProjectData.items.map((project, index) => {
                                const maxImpact = topProjectData.items[0].impactPeopleValue;
                                const widthPct = (project.impactPeopleValue / maxImpact) * 100;
                                return (
                                    <div key={index} className="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0">
                                        <img src={project.imageUrl} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0 bg-slate-100" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-800 truncate">{project.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-slate-400 shrink-0 w-16 truncate">{project.impactPeople}</span>
                                                <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden min-w-0">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${widthPct}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-600 shrink-0 whitespace-nowrap">{project.damageReduced}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <button type="button" className="mt-1 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg py-2 text-center">
                            ดูโครงการทั้งหมด
                        </button>
                    </div>

                    {/* Long-term trend — multi-series line chart, no matching chart component. */}
                    <div className="flex flex-col gap-3 p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
                        <h3 className="text-sm font-semibold text-slate-800">{longTermTrendHeading}</h3>
                        <div className="relative">
                            <svg viewBox={`0 0 ${LINE_CHART_WIDTH} ${LINE_CHART_HEIGHT}`} preserveAspectRatio="none" className="w-full h-[160px]">
                                {GRID_FRACTIONS.map((frac) => (
                                    <line key={frac} x1={0} x2={LINE_CHART_WIDTH} y1={frac * LINE_CHART_HEIGHT} y2={frac * LINE_CHART_HEIGHT} stroke="#f1f5f9" strokeWidth={1} />
                                ))}
                                {longTermTrendSeries.map((s) => {
                                    const points = getLinePoints(s.data.map((v) => v - longTermTrendYMin), longTermTrendYMax - longTermTrendYMin);
                                    return (
                                        <polyline
                                            key={s.key}
                                            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                                            fill="none"
                                            stroke={s.colorHex}
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    );
                                })}
                            </svg>
                            {longTermTrendSeries.map((s) => {
                                const points = getLinePoints(s.data.map((v) => v - longTermTrendYMin), longTermTrendYMax - longTermTrendYMin);
                                const last = points[points.length - 1];
                                return (
                                    <span
                                        key={s.key}
                                        className="absolute text-[9px] font-semibold whitespace-nowrap -translate-y-1/2 flex items-center gap-0.5"
                                        style={{
                                            color: s.colorHex,
                                            left: `calc(${(last.x / LINE_CHART_WIDTH) * 100}% + 6px)`,
                                            top: `${(last.y / LINE_CHART_HEIGHT) * 100}%`,
                                        }}
                                    >
                                        {s.endValue}
                                        <ArrowUp className="w-2.5 h-2.5" />
                                        {s.trendLabel}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400">
                            {longTermTrendXLabels.map((label, index) => (
                                <span key={index}>{label}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {longTermTrendSeries.map((s) => (
                                <span key={s.key} className="flex items-center gap-1 text-[10px] text-slate-500">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.colorHex }} />
                                    {s.label}
                                </span>
                            ))}
                        </div>
                        <button type="button" className="mt-1 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg py-2 text-center">
                            ดูแนวโน้มทั้งหมด
                        </button>
                    </div>
                </div>
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
